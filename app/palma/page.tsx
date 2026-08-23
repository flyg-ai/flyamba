import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { GuidesCarousel } from "@/app/components/GuidesCarousel";
import { getGuidesByDestination } from "@/app/data/guides";
import { LowFareCta } from "@/app/components/LowFareCta";
import { AviasalesWidget } from "@/app/components/AviasalesWidget";
import { AskAiWidget } from "@/app/components/AskAiWidget";
import { FlightCTA } from "@/app/components/FlightCTA";
import { SmartImage } from "@/app/components/SmartImage";
import { CitySubNav } from "@/app/components/CitySubNav";
import { FaqSection, type FaqItem } from "@/app/components/FaqSection";
import { SITE } from "@/app/lib/destination-helpers";
import { clampDescription, clampTitle } from "@/app/lib/seo";
import { usd5 } from "@/app/lib/format";
import { PALMA_CATEGORIES, ATTRACTIONS, RESTAURANTS, BEACHES } from "@/app/data/palma-places";
import { ArrowRight, Plane, CalendarClock, TrendingDown, CalendarDays, Route } from "lucide-react";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { crumbsForSlug } from "@/app/lib/destination-crumbs";
import { FareCalendarSection } from "@/app/components/FareCalendarSection";

// ── City facts (self-contained; not from the shared destinations catalog) ────
const CITY = {
  slug: "palma",
  name: "Palma",
  country: "Spain",
  countryFlag: "🇪🇸",
  iata: "PMI",
  tpName: "palma_es",
  summerTemp: 28,
  tagline: "Mallorca's elegant capital of beaches, boats and old-town charm",
  hero: "/images/destinations/flights-palma.avif",
  flightTime: "2h 20m from London",
  coordinates: { lat: 39.5696, lng: 2.6502 },
  // Average round-trip fares by month, stored as SEK then shown in USD.
  monthlySek: [3000, 2800, 3200, 3600, 4100, 4400, 5200, 5000, 4100, 3400, 2900, 3100],
};
const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// Hoisted so the FAQ can quote the same figures the price chart renders.
const USD_MONTHS = CITY.monthlySek.map((sek, i) => ({ month: MONTH_LABELS[i], price: usd5(sek) }));
const LOW = Math.min(...USD_MONTHS.map((m) => m.price));
const HIGH = Math.max(...USD_MONTHS.map((m) => m.price));

// fare-calendar.ts reads Supabase with cache: "no-store". Without force-static
// that read is a dynamic-server-usage error, the reader swallows it, and the page
// renders with no calendar while the build reports success. Fourth time this trap
// has been hit — see CLAUDE.md.
export const dynamic = "force-static";
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const year = new Date().getFullYear();
  const title = clampTitle(`Cheap Flights to Palma de Mallorca ${year} — Guide, Prices & Beaches | Flyamba`);
  const description =
    clampDescription("Flights to Palma de Mallorca, Spain — dense low-cost service from across Europe, no US non-stop. Compare live fares, plus complete English guides to Palma's beaches, restaurants, hotels, nightlife and island day trips.");
  const canonical = `${SITE}/palma`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website", images: [CITY.hero] },
    twitter: { card: "summary_large_image", images: [CITY.hero] },
  };
}

function jsonLd() {
  const url = `${SITE}/palma`;
  const touristDestination = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Palma de Mallorca",
    description: CITY.tagline,
    geo: { "@type": "GeoCoordinates", latitude: CITY.coordinates.lat, longitude: CITY.coordinates.lng },
    touristType: ["Beach & Sun", "City Break", "Island Escape"],
    url,
  };
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return [touristDestination, faqPage];
}

// ── Non-stop routes (USD, research-based low round-trip fares) ───────────────
const NON_STOP = [
  { city: "Barcelona", price: 55, iata: "BCN" },
  { city: "London", price: 79, iata: "LGW" },
  { city: "Madrid", price: 65, iata: "MAD" },
  { city: "Manchester", price: 89, iata: "MAN" },
  { city: "Berlin", price: 95, iata: "BER" },
  { city: "Frankfurt", price: 99, iata: "FRA" },
  { city: "Amsterdam", price: 105, iata: "AMS" },
  { city: "Paris", price: 110, iata: "CDG" },
  { city: "Dublin", price: 115, iata: "DUB" },
];

const FAQ: FaqItem[] = [
  {
    q: "How much does a flight to Palma cost?",
    a: "From within Europe, very little — Mallorca is served by one of the densest low-cost networks on the continent and booking six to eight weeks ahead usually beats last-minute fares comfortably. From the United States there is no non-stop, so the fare is really the price of a connection through Madrid, Barcelona or a northern European hub. Search live fares above rather than working from an average.",
  },
  {
    q: "Which airlines fly to Palma?",
    a: "Ryanair, easyJet, Vueling and Eurowings dominate the schedules, alongside Iberia, Air Europa, Jet2, TUI, Lufthansa, Condor, Transavia, KLM and SAS. Palma is one of Europe's busiest summer airports, so competition on the main routes is fierce.",
  },
  {
    q: "When is the cheapest time to fly to Palma?",
    a: "Winter, from November to March, when the island is quiet and the low-cost network is still running. Prices climb from May and peak in July and August; May and October give you warm weather without the peak-season fare. We hold fewer than three months of observed fares from US airports, so this page names a season rather than a month with a price on it.",
  },
  {
    q: "How long is the flight to Palma?",
    a: `Palma is ${CITY.flightTime}, about 55 minutes from Barcelona, 1h 20m from Madrid and roughly 2h 15m from Frankfurt or Amsterdam. Flyamba tracks nonstop routes from ${NON_STOP.length} cities.`,
  },
  {
    q: "Which airport does Palma use?",
    a: `Palma de Mallorca Airport (${CITY.iata}), also known as Son Sant Joan, sits 8 km east of the city and is the island's only commercial airport. Bus A1 reaches the centre in about 15–20 minutes, and A2 serves the Playa de Palma resorts.`,
  },
];

const WHY = [
  { icon: "🏖️", text: "Over 260 beaches and coves ring the island — from the buzzing city sands of Playa de Palma to hidden turquoise calas an hour's drive away." },
  { icon: "🏛️", text: "A film-set old town crowned by the vast La Seu cathedral, laced with Arab baths, patrician palaces and tapas-filled medieval lanes." },
  { icon: "⛰️", text: "The UNESCO-listed Serra de Tramuntana rises minutes from the city — vintage trains, cliff-top drives and honey-stone mountain villages." },
  { icon: "⛵", text: "A true sailing capital, with a vast marina, waterfront dining along the Paseo Marítimo and boat trips to secret bays and sea caves." },
];

const NEARBY = [
  { city: "Ibiza", href: "/ibiza" },
  { city: "Barcelona", href: "/barcelona" },
  { city: "Valencia", href: "/valencia" },
  { city: "Menorca", href: "/menorca" },
];

// Category cards for the "Explore Palma" grid.
const CATEGORY_IMG: Record<string, string> = {
  attractions: "/images/palma/sevardheter/palmas-katedral-la-seu.webp",
  restaurants: "/images/content/photo-1414235077428-338989a2e8c0.avif",
  hotels: "/images/content/photo-1566073771259-6a8506099945.avif",
  transport: "/images/content/photo-1544620347-c4fd4a3d5957.avif",
  prices: "/images/content/photo-1579621970563-ebec7560ff3e.avif",
  weather: "/images/content/photo-1504386106331-3e4e71712b38.avif",
  shopping: "/images/content/photo-1483985988355-763728e1935b.avif",
  beaches: "/images/palma/strander/es-trenc.webp",
  nightlife: "/images/content/photo-1516450360452-9312f5e86fc7.avif",
  "with-kids": "/images/palma/sevardheter/castell-de-bellver.webp",
  "day-trips": "/images/palma/dagsutflykter/sa-calobra.webp",
  events: "/images/content/photo-1533174072545-7a4b6ad7a6c3.avif",
};

function PreviewGrid({ items }: { items: { name: string; blurb: string; image: string; href: string }[] }) {
  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-3">
      {items.map((it) => (
        <Link key={it.name} href={it.href} className="group overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-elegant">
          <div className="relative h-44 overflow-hidden">
            <SmartImage src={it.image} alt={it.name} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
          </div>
          <div className="p-5">
            <h3 className="font-serif text-lg font-semibold text-foreground">{it.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{it.blurb}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function PalmaHub() {
  const categories = PALMA_CATEGORIES.filter((c) => c.slug);
  const usdMonths = CITY.monthlySek.map((sek, i) => ({ month: MONTH_LABELS[i], price: usd5(sek) }));
  const min = Math.min(...usdMonths.map((m) => m.price));
  const max = Math.max(...usdMonths.map((m) => m.price));
  const cheapest = usdMonths.find((m) => m.price === min)!;

  const attractionPreview = ATTRACTIONS.slice(0, 3).map((a) => ({ name: a.name, blurb: a.description, image: a.image, href: `/palma/attractions#${a.slug}` }));
  const eatPreview = RESTAURANTS.slice(0, 3).map((r) => ({ name: r.name, blurb: r.description, image: r.image, href: `/palma/restaurants#${r.slug}` }));
  const beachPreview = BEACHES.slice(0, 3).map((b) => ({ name: b.name, blurb: b.description, image: b.image, href: `/palma/beaches#${b.slug}` }));

  return (
    <div className="min-h-screen bg-background">
      {jsonLd().map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s).replace(/</g, "\\u003c") }} />
      ))}
      <Navbar transparent />

      {/* 1. Hero */}
      <section className="relative isolate h-[80vh] min-h-[560px] w-full overflow-hidden">
        {/* LCP hero. fetchPriority rather than Next 16's `preload` prop:
            `preload` only emits <link rel=preload> in <head>, which `priority`
            already did — it does not set the fetchpriority attribute Lighthouse
            reports as missing. The Image docs say to prefer fetchPriority="high"
            over preload in most cases, and warn against combining them. loading="eager"
            is required too: dropping `priority` makes next/image default to lazy, which
            would otherwise leave the LCP image lazy-loaded. */}
        <Image src={CITY.hero} alt="Cheap flights to Palma de Mallorca, Spain" fill fetchPriority="high" loading="eager" sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 lg:px-8">
          {/* Trail added with the schema: this page emitted a BreadcrumbList
              while showing no breadcrumb at all. */}
          <div className="mb-4">
            <Breadcrumbs onDark items={crumbsForSlug("palma")} />
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
            <span className="text-base">{CITY.countryFlag}</span>
            <span>{CITY.country}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 tracking-[0.2em] backdrop-blur">{CITY.iata}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 backdrop-blur">{CITY.summerTemp}°C summer</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold text-white sm:text-7xl">Cheap Flights to Palma</h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">{CITY.tagline}</p>
        </div>
      </section>

      {/* 2. Flight stats bar */}
      <section className="relative z-10 mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-border bg-card px-6 py-4 text-sm font-medium text-foreground shadow-elegant">
          <span>from <span className="font-serif text-lg text-accent">${min}</span></span>
          <span className="text-muted-foreground/40">•</span>
          <span>{CITY.flightTime}</span>
          <span className="text-muted-foreground/40">•</span>
          <span>Nonstop across Europe</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="inline-flex items-center gap-1"><Plane className="h-4 w-4 text-accent" /> {CITY.iata}</span>
        </div>
      </section>

      {/* Sticky in-page sub-nav */}
      <div className="mt-8">
        <CitySubNav citySlug={CITY.slug} categories={PALMA_CATEGORIES} active="" />
      </div>

      {/* 3. Flight search widget */}
      <section id="flights" className="mx-auto mt-10 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <h2 className="mb-3 font-serif text-2xl font-semibold text-foreground sm:text-3xl">Find the Best Flights to Palma</h2>
        <p className="mb-6 max-w-3xl text-muted-foreground">Palma has no non-stop service from the United States; from the US the route connects through Madrid, Barcelona or a northern European hub. From within Europe it is one of the best-served leisure airports on the continent, busiest from June to September. Compare live fares and book direct. Our AI flight search compares hundreds of routes to find you the cheapest flights to Palma — just describe your trip and Flyamba does the rest.</p>
        <AviasalesWidget toName={CITY.tpName} />

        {/* Observed fares by month. Renders nothing below three months —
            see app/components/FareCalendarSection.tsx. */}
        <FareCalendarSection slug="palma" name="Palma" />
        <LowFareCta slug="palma" city="Palma" />
      </section>

      {/* 4. Booking insights */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Booking insights</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Smart tips for booking Palma</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarClock, label: "Best time to book", value: "6–8 weeks ahead" },
            // No "cheapest month": two observed months is a sample, not a season.
            { icon: TrendingDown, label: "Season", value: "Year-round from Europe; peak June–September" },
            { icon: CalendarDays, label: "Cheapest days to fly", value: "Tuesday & Wednesday" },
            { icon: Route, label: "Direct flights", value: "Yes — from London, Berlin, Barcelona" },
          ].map((s) => (
            <div key={s.label} className="rounded-3xl border border-border bg-card p-6">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/15 text-accent"><s.icon className="h-5 w-5" /></div>
              <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</p>
              <p className="mt-1 font-serif text-lg font-semibold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Palma is one of Europe&apos;s busiest seasonal leisure airports, so fares swing hard with the calendar: winter and shoulder-season
          flights can dip below ${min}, while July and August peak around ${max} round-trip. Budget carriers like Ryanair, easyJet, Vueling and
          Eurowings dominate the short-haul routes from the UK, Germany and the Spanish mainland, and booking mid-week departures a couple of
          months out is the reliable way to keep costs down.
        </p>
      </section>

      {/* 5. Category grid */}
      <section id="explore" className="mx-auto mt-14 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Complete guide</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Explore Palma</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {categories.map((c) => (
            <Link key={c.slug} href={`/palma/${c.slug}`} className="group relative h-[180px] overflow-hidden rounded-3xl border border-border">
              <SmartImage src={CATEGORY_IMG[c.slug] ?? "/images/destinations/placeholder.avif"} alt={`Palma ${c.label}`} fill sizes="(max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 text-white">
                <span className="flex items-center gap-2 font-serif text-xl font-semibold"><span aria-hidden>{c.emoji}</span> {c.label}</span>
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* The month chart that stood here plotted twelve Stockholm SEK estimates as
          a curve. It is not rebuilt: this destination returns under three months of
          observed fares from all four US origins, and FareCalendarSection (mounted
          above) correctly renders nothing below that. */}
      {/* 8. Why Palma */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Why Palma?</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Why Fly to Palma with Flyamba?</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w) => (
            <div key={w.text} className="rounded-3xl border border-border bg-card p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-xl" aria-hidden>{w.icon}</span>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. AI chat */}
      <section className="mx-auto mt-16 max-w-4xl px-4 sm:px-6 lg:px-8">
        <AskAiWidget destination="Palma" />
      </section>

      {/* 10. Preview sections */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Top attractions</h2>
          <Link href="/palma/attractions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All attractions <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={attractionPreview} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Where to eat</h2>
          <Link href="/palma/restaurants" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All restaurants <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={eatPreview} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Best beaches</h2>
          <Link href="/palma/beaches" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All beaches <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={beachPreview} />
      </section>

      {/* CTA */}
      <section className="mx-auto mt-16 max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* No priceFrom: we hold no US fare for Palma. */}
        <FlightCTA destination={{ slug: "palma", name: "Palma" }} />
      </section>

      {/* 11. Nearby */}
      <section id="nearby" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Nearby</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Fly onward from Palma</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {NEARBY.map((n) => (
            <Link key={n.city} href={n.href} className="group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 transition hover:-translate-y-0.5 hover:border-accent">
              <span className="text-sm font-semibold text-foreground">Flights to {n.city}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </section>

      <FaqSection items={FAQ} city="Palma" />

      <GuidesCarousel

        guides={getGuidesByDestination("palma").slice(0, 3)}

        title="Latest Palma guides"

      />


      {/* 12. SEO footer links */}
      <section className="mx-auto mt-16 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Palma guides</p>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.slug} href={`/palma/${c.slug}`} className="text-muted-foreground transition hover:text-accent">
              Palma {c.label.toLowerCase()} →
            </Link>
          ))}
          {NEARBY.map((n) => (
            <Link key={n.city} href={n.href} className="text-muted-foreground transition hover:text-accent">
              Flights to {n.city} →
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
