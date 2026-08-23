import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { GuidesCarousel } from "@/app/components/GuidesCarousel";
import { getGuidesByDestination } from "@/app/data/guides";
import { LowFareCta } from "@/app/components/LowFareCta";
import { FaqSection, type FaqItem } from "@/app/components/FaqSection";
import { AviasalesWidget } from "@/app/components/AviasalesWidget";
import { AskAiWidget } from "@/app/components/AskAiWidget";
import { CitySubNav } from "@/app/components/CitySubNav";
import { SITE } from "@/app/lib/destination-helpers";
import { clampDescription, clampTitle } from "@/app/lib/seo";
import { SANTORINI, MONTHS, SANTORINI_CATEGORIES } from "@/app/lib/santorini";
import { ATTRACTIONS, RESTAURANTS, BEACHES } from "@/app/data/santorini-places";
import { ArrowRight, Plane, CalendarClock, TrendingDown, CalendarDays, Route } from "lucide-react";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { crumbsForSlug } from "@/app/lib/destination-crumbs";
import { FareCalendarSection } from "@/app/components/FareCalendarSection";

const d = SANTORINI;
const URL = `${SITE}/santorini`;

// Cheapest non-null month (winter fares are null and excluded).
const priced = d.monthlyUsd
  .map((price, i) => ({ month: MONTHS[i], price }))
  .filter((m): m is { month: string; price: number } => m.price != null);
// The SEK-derived min/max/cheapest that fed the chart, the hero pill and two FAQ
// answers are gone with them.

// fare-calendar.ts reads Supabase with cache: "no-store". Without force-static
// that read is a dynamic-server-usage error, the reader swallows it, and the page
// renders with no calendar while the build reports success. Fourth time this trap
// has been hit — see CLAUDE.md.
export const dynamic = "force-static";
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const year = new Date().getFullYear();
  const title = clampTitle(`Cheap Flights to Santorini ${year} — Guide, Prices & Sunsets | Flyamba`);
  const description = clampDescription("Flights to Santorini, Greece — seasonal service to Thira (JTR), reached from the US via a European hub. Compare live fares, plus English guides to Oia, the caldera, cave hotels, beaches and wineries.");
  return {
    title,
    description,
    alternates: { canonical: URL },
    openGraph: { title, description, url: URL, type: "website", images: [d.image] },
    twitter: { card: "summary_large_image", images: [d.image] },
  };
}

const FAQ: FaqItem[] = [
  { q: "When is it cheapest to fly to Santorini?", a: "Spring and autumn — April, May, late September and October — sit well below the July and August peak, and few flights operate at all in winter. We are not going to name a cheapest month with a figure attached: Santorini has no non-stop from the United States and we hold fewer than three months of observed fares from US airports, so any single number would be a guess dressed as a fact." },
  { q: "Are there direct flights to Santorini?", a: "Santorini (JTR) has many seasonal direct flights from European cities such as London, Paris, Milan, Amsterdam and Rome between roughly April and October, plus year-round domestic connections via Athens. Most long-haul travellers connect through Athens." },
  { q: "How many days do you need in Santorini?", a: "Three to four days is ideal for Santorini — enough to see the Oia sunset, walk the Fira-to-Oia caldera trail, take a volcano or catamaran cruise, visit Akrotiri and the wineries, and enjoy a couple of beaches." },
];

function jsonLd() {
  const touristDestination = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Santorini",
    description: d.tagline,
    geo: { "@type": "GeoCoordinates", latitude: 36.4128, longitude: 25.4322 },
    touristType: ["Romance & Honeymoon", "Beach & Sun", "Scenery", "Food & Wine"],
    url: URL,
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return [touristDestination, faq];
}

const NON_STOP = [
  { city: "Athens", price: 95, iata: "ATH", note: "year-round" },
  { city: "London", price: 165, iata: "LGW", note: "seasonal" },
  { city: "Milan", price: 140, iata: "MXP", note: "seasonal" },
  { city: "Paris", price: 175, iata: "ORY", note: "seasonal" },
  { city: "Amsterdam", price: 185, iata: "AMS", note: "seasonal" },
  { city: "Rome", price: 130, iata: "FCO", note: "seasonal" },
];

const WHY = [
  { icon: "🌅", text: "The world's most famous sunset — the whole village of Oia turns gold and pink as the sun sinks behind the caldera." },
  { icon: "🏛️", text: "A living volcano and 'Minoan Pompeii' — hike the crater of Nea Kameni and walk the frescoed streets of Akrotiri." },
  { icon: "🍷", text: "Unique volcanic wines — crisp Assyrtiko and sweet Vinsanto from ancient basket-trained vines, tasted on caldera-edge terraces." },
  { icon: "🏖️", text: "Beaches like nowhere else — red, black and white volcanic sand beneath dramatic sculpted cliffs." },
];

const NEARBY = [
  { city: "Mykonos", href: "/mykonos" },
  { city: "Athens", href: "/athens" },
  { city: "Crete", href: "/crete" },
  { city: "Naxos", href: "/naxos" },
];

// Representative image for each category card on the hub grid.
const CAT_IMAGE: Record<string, string> = {
  "": "/images/santorini/sevardheter/caldera.webp",
  attractions: "/images/santorini/sevardheter/oia-solnedgang.webp",
  restaurants: "/images/santorini/restaurants/restaurant-santorini.avif",
  hotels: "/images/santorini/hotels/hotel-santorini.avif",
  transport: "/images/santorini/sevardheter/fira.webp",
  prices: "/images/santorini/sevardheter/oia.webp",
  weather: "/images/santorini/sevardheter/caldera-utsikten.webp",
  shopping: "/images/santorini/shopping/artisan-shop-santorini.webp",
  beaches: "/images/santorini/beaches/barceloneta-santorini.webp",
  nightlife: "/images/santorini/nattliv/francos-bar.webp",
  "with-kids": "/images/santorini/with-kids/aquarium-santorini.webp",
  "day-trips": "/images/santorini/day-trips/costa-brava-landscape-santorini.webp",
  events: "/images/santorini/sevardheter/imerovigli.webp",
};

const ATTRACTION_PREVIEW = ATTRACTIONS.slice(0, 3).map((p) => ({ name: p.name, blurb: p.description, image: p.image }));
const EAT_PREVIEW = RESTAURANTS.slice(0, 3).map((p) => ({ name: p.name, blurb: p.description, image: p.image }));
const BEACH_PREVIEW = BEACHES.slice(0, 3).map((p) => ({ name: p.name, blurb: p.description, image: p.image }));

function PreviewGrid({ items }: { items: { name: string; blurb: string; image: string }[] }) {
  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-3">
      {items.map((it) => (
        <div key={it.name} className="group overflow-hidden rounded-3xl border border-border bg-card">
          <div className="relative h-44 overflow-hidden">
            <Image src={it.image} alt={it.name} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
          </div>
          <div className="p-5">
            <h3 className="font-serif text-lg font-semibold text-foreground">{it.name}</h3>
            <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">{it.blurb}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SantoriniHub() {
  const categories = SANTORINI_CATEGORIES;
  const gridCats = categories.filter((c) => c.slug);

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
        <Image src={d.image} alt="Cheap flights to Santorini, Greece" fill fetchPriority="high" loading="eager" sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 lg:px-8">
          {/* Trail added with the schema: this page emitted a BreadcrumbList
              while showing no breadcrumb at all. */}
          <div className="mb-4">
            <Breadcrumbs onDark items={crumbsForSlug("santorini")} />
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
            <span className="text-base">{d.countryFlag}</span>
            <span>{d.country}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 tracking-[0.2em] backdrop-blur">{d.iata}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 backdrop-blur">{d.summerTemp}°C summer</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold text-white sm:text-7xl">Cheap Flights to Santorini</h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">{d.tagline}</p>
        </div>
      </section>

      {/* 2. Flight stats bar */}
      <section className="relative z-10 mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-border bg-card px-6 py-4 text-sm font-medium text-foreground shadow-elegant">
          <span>4h 15m from London</span>
          <span className="text-muted-foreground/40">•</span>
          <span>Seasonal nonstops Apr–Oct</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="inline-flex items-center gap-1"><Plane className="h-4 w-4 text-accent" /> {d.iata}</span>
        </div>
      </section>

      {/* Sticky sub-nav */}
      <div className="mt-8">
        <CitySubNav citySlug="santorini" categories={categories} active="" />
      </div>

      {/* 3. Flight search widget */}
      <section id="flights" className="mx-auto mt-10 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <h2 className="mb-3 font-serif text-2xl font-semibold text-foreground sm:text-3xl">Find the Best Flights to Santorini</h2>
        <p className="mb-6 max-w-3xl text-muted-foreground">Santorini has no non-stop service from the United States; the route runs through Athens or another European hub, and the island's schedule is seasonal — most direct European flights run roughly April to October. Compare live fares and book direct. Our AI flight search compares hundreds of routes to find you the cheapest flights to Santorini — just describe your trip and Flyamba does the rest.</p>
        <AviasalesWidget toName={d.tpName} />

        {/* Observed fares by month. Renders nothing below three months —
            see app/components/FareCalendarSection.tsx. */}
        <FareCalendarSection slug="santorini" name="Santorini" />
        <LowFareCta slug="santorini" city="Santorini" />
      </section>

      {/* 4. Booking insights */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Booking insights</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Smart tips for booking Santorini</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarClock, label: "Best time to book", value: "2–3 months ahead" },
            // No "cheapest month": one observed month is a sample, not a season.
            { icon: TrendingDown, label: "Season", value: "April–October; winter service is minimal" },
            { icon: CalendarDays, label: "Best value season", value: "May & October (shoulder)" },
            { icon: Route, label: "Direct flights", value: "Seasonal from London, Paris, Milan" },
          ].map((s) => (
            <div key={s.label} className="rounded-3xl border border-border bg-card p-6">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/15 text-accent"><s.icon className="h-5 w-5" /></div>
              <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</p>
              <p className="mt-1 font-serif text-lg font-semibold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Category grid */}
      <section id="explore" className="mx-auto mt-14 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Complete guide</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Explore Santorini</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {gridCats.map((c) => (
            <Link key={c.slug} href={`/santorini/${c.slug}`} className="group relative h-[180px] overflow-hidden rounded-3xl border border-border">
              <Image src={CAT_IMAGE[c.slug] ?? d.image} alt={`Santorini ${c.label}`} fill sizes="(max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
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
      {/* 8. Why Santorini */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Why Santorini?</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Why Fly to Santorini with Flyamba?</h2>
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
        <AskAiWidget destination="Santorini" />
      </section>

      {/* 10. Preview sections */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Top attractions</h2>
          <Link href="/santorini/attractions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All attractions <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={ATTRACTION_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Where to eat</h2>
          <Link href="/santorini/restaurants" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All restaurants <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={EAT_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Best beaches</h2>
          <Link href="/santorini/beaches" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All beaches <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={BEACH_PREVIEW} />
      </section>

      {/* 11. Nearby */}
      <section id="nearby" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Nearby</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Island-hop from Santorini</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {NEARBY.map((n) => (
            <Link key={n.city} href={n.href} className="group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 transition hover:-translate-y-0.5 hover:border-accent">
              <span className="text-sm font-semibold text-foreground">Flights to {n.city}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </section>

      <FaqSection items={FAQ} city="Santorini" />


      <GuidesCarousel


        guides={getGuidesByDestination("santorini").slice(0, 3)}


        title="Latest Santorini guides"


      />



      {/* 12. SEO footer links */}
      <section className="mx-auto mt-16 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Santorini guides</p>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
          {gridCats.map((c) => (
            <Link key={c.slug} href={`/santorini/${c.slug}`} className="text-muted-foreground transition hover:text-accent">
              Santorini {c.label.toLowerCase()} →
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
