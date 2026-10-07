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
import { CitySubNav } from "@/app/components/CitySubNav";
import { FaqSection, type FaqItem } from "@/app/components/FaqSection";
import { BANGKOK_CATEGORIES, bangkokHref } from "@/app/lib/bangkok";
import { SITE } from "@/app/lib/destination-helpers";
import { clampDescription, clampTitle } from "@/app/lib/seo";
import { ArrowRight, Plane, CalendarClock, TrendingDown, CalendarDays, Route } from "lucide-react";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { crumbsForSlug } from "@/app/lib/destination-crumbs";
import { FareCalendarSection } from "@/app/components/FareCalendarSection";
import { NonstopRoutes } from "@/app/components/NonstopRoutes";
import { fareCopyFor, priceAnswer } from "@/app/lib/fare-copy";

// ── Self-contained Bangkok facts ──────────────────────────────────────────────
const CITY = {
  name: "Bangkok",
  country: "Thailand",
  flag: "🇹🇭",
  iata: "BKK",
  tpName: "bangkok_th",
  summerTemp: 32,
  tagline: "Temples, street food and buzzing tropical energy",
  image: "/images/destinations/flights-bangkok.avif",
  coordinates: { lat: 13.7563, lng: 100.5018 },
};


const WHY = [
  { icon: "🍜", text: "The undisputed street-food capital of the world — from Michelin-starred stalls to Yaowarat's neon-lit night market." },
  { icon: "🛕", text: "Golden temples and palaces at every turn, from the dazzling Grand Palace to riverside Wat Arun at dawn." },
  { icon: "💸", text: "Astonishing value — world-class food, spas, hotels and transport for a fraction of Western prices." },
  { icon: "🌆", text: "Sky-high rooftop bars, hidden speakeasies and markets that pulse late into the tropical night." },
];

const ATTRACTION_PREVIEW = [
  { name: "Grand Palace", blurb: "The glittering royal complex and the Emerald Buddha.", image: "/images/bangkok/sevardheter/grand-palace.webp" },
  { name: "Wat Arun", blurb: "The porcelain-clad Temple of Dawn on the river.", image: "/images/bangkok/sevardheter/wat-arun.webp" },
  { name: "Chatuchak Market", blurb: "15,000 stalls of crafts, fashion, art and food.", image: "/images/bangkok/sevardheter/chatuchak-weekend-market.webp" },
];
const EAT_PREVIEW = [
  { name: "Jay Fai", blurb: "The Michelin-starred crab omelette cooked over charcoal.", image: "/images/bangkok/restaurants/restaurant-bangkok.avif" },
  { name: "Sorn", blurb: "Three-Michelin-star southern Thai — Thailand's finest.", image: "/images/bangkok/restaurants/restaurant-bangkok.avif" },
  { name: "Thipsamai", blurb: "Bangkok's most famous pad thai since 1966.", image: "/images/bangkok/restaurants/restaurant-bangkok.avif" },
];
const BEACH_PREVIEW = [
  { name: "Koh Larn", blurb: "Turquoise water and white sand off Pattaya.", image: "/images/bangkok/beaches/barceloneta-bangkok.webp" },
  { name: "Bang Saen", blurb: "The closest proper beach, 90 minutes away.", image: "/images/bangkok/strander/bangsaen-beach.webp" },
  { name: "Hua Hin", blurb: "A refined royal resort with markets and golf.", image: "/images/bangkok/beaches/beach-bar-bangkok.webp" },
];

const NEARBY = [
  { city: "Phuket", href: "/phuket" },
  { city: "Chiang Mai", href: "/chiang-mai" },
  { city: "Singapore", href: "/singapore" },
  { city: "Bali", href: "/bali" },
];

// fare-calendar.ts reads Supabase with cache: "no-store". Without force-static
// that read is a dynamic-server-usage error, the reader swallows it, and the page
// renders with no calendar while the build reports success. Fourth time this trap
// has been hit — see CLAUDE.md.
export const dynamic = "force-static";
export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const year = new Date().getFullYear();
  const title = clampTitle(`Cheap Flights to Bangkok ${year} — Guide, Prices & Attractions | Flyamba`);
  const description =
    clampDescription("Find cheap flights to Bangkok, Thailand and plan the perfect trip with complete English guides to temples, street food, hotels, rooftop bars, transport, weather, shopping, beaches, family days and day trips.");
  const canonical = `${SITE}/bangkok`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website", images: [CITY.image] },
    twitter: { card: "summary_large_image", images: [CITY.image] },
  };
}

function buildFaq(priceLine: string): FaqItem[] {
  return [
  {
    q: "How much does a flight to Bangkok cost?",
    a: priceLine,
  },
  {
    q: "Which airlines fly to Bangkok?",
    a: "Thai Airways is the flag carrier, with Bangkok Airways covering regional routes. Emirates, Qatar Airways, Etihad, Singapore Airlines, Cathay Pacific, EVA Air and Japan Airlines all serve Suvarnabhumi, and British Airways and Lufthansa fly nonstop from Europe. Budget options include AirAsia, Scoot and Thai Vietjet.",
  },
  {
    q: "When is the cheapest time to fly to Bangkok?",
    a: "January, February and November — the cool, dry season — tend to run below the annual average. Fares climb from around April and stay high through peak summer.",
  },
  {
    q: "How long is the flight to Bangkok?",
    a: "Within Asia and the Gulf, Bangkok is about 6h from Dubai, 2h 20m from Singapore and 6h from Tokyo. From Europe or the US, total journey time depends on whether your itinerary is non-stop or connects — search live fares above to see real routings for your dates.",
  },
  {
    q: "Which airport does Bangkok use?",
    a: `Suvarnabhumi (${CITY.iata}) handles almost all international flights and reaches the city by Airport Rail Link in about 30 minutes. The older Don Mueang (DMK) serves most budget carriers, so check which one your ticket uses.`,
  },
  ];
}

function jsonLd(FAQ: FaqItem[]) {
  const url = `${SITE}/bangkok`;
  const touristDestination = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Bangkok",
    description: CITY.tagline,
    geo: { "@type": "GeoCoordinates", latitude: CITY.coordinates.lat, longitude: CITY.coordinates.lng },
    touristType: ["City Break", "Culture", "Food & Drink", "Beach & Sun"],
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
            <p className="mt-1 text-sm text-muted-foreground">{it.blurb}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function BangkokHub() {
  const categories = BANGKOK_CATEGORIES.filter((c) => c.slug);
  const fareCopy = await fareCopyFor("bangkok");
  const FAQ = buildFaq(priceAnswer("Bangkok", fareCopy));

  return (
    <div className="min-h-screen bg-background">
      {jsonLd(FAQ).map((s, i) => (
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
        <Image src={CITY.image} alt="Cheap flights to Bangkok, Thailand" fill fetchPriority="high" loading="eager" sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 lg:px-8">
          {/* Trail added with the schema: this page emitted a BreadcrumbList
              while showing no breadcrumb at all. */}
          <div className="mb-4">
            <Breadcrumbs onDark items={crumbsForSlug("bangkok")} />
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
            <span className="text-base">{CITY.flag}</span>
            <span>{CITY.country}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 tracking-[0.2em] backdrop-blur">{CITY.iata}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 backdrop-blur">{CITY.summerTemp}°C tropical</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold text-white sm:text-7xl">Cheap Flights to Bangkok</h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">{CITY.tagline}</p>
        </div>
      </section>

      {/* 2. Flight stats bar */}
      <section className="relative z-10 mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-border bg-card px-6 py-4 text-sm font-medium text-foreground shadow-elegant">
          {fareCopy.amount && (
            <span>from <span className="font-serif text-lg text-accent">{fareCopy.amount}</span> round trip from {fareCopy.originLabel}</span>
          )}
          <span className="text-muted-foreground/40">•</span>
          <span>~11h from Europe</span>
          <span className="text-muted-foreground/40">•</span>
          <span>Nonstop flights worldwide</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="inline-flex items-center gap-1"><Plane className="h-4 w-4 text-accent" /> {CITY.iata}</span>
        </div>
      </section>

      {/* Sticky in-page sub-nav */}
      <div className="mt-8">
        <CitySubNav citySlug="bangkok" categories={BANGKOK_CATEGORIES} active="" />
      </div>

      {/* 3. Flight search widget */}
      <section id="flights" className="mx-auto mt-10 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <h2 className="mb-3 font-serif text-2xl font-semibold text-foreground sm:text-3xl">Find the Best Flights to Bangkok</h2>
        <p className="mb-6 max-w-3xl text-muted-foreground">Bangkok is reachable from the US, the UK and across Europe, though whether a given route is non-stop depends on your airport and the season. Find cheap flights to Bangkok, compare airlines and book direct. Our AI flight search compares hundreds of routes to find you the cheapest flights to Bangkok — just describe your trip and Flyamba does the rest.</p>
        <AviasalesWidget toName={CITY.tpName} />

        {/* Observed fares by month. Renders nothing below three months —
            see app/components/FareCalendarSection.tsx. */}
        <FareCalendarSection slug="bangkok" name="Bangkok" />

        {/* Observed non-stop fares. Renders nothing without evidence —
            absence is "not observed", never "no non-stop exists". */}
        <NonstopRoutes slug="bangkok" name="Bangkok" iata="BKK" />

        <LowFareCta slug="bangkok" city="Bangkok" />
      </section>

      {/* 4. Booking insights */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Booking insights</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Smart tips for booking Bangkok</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarClock, label: "Best time to book", value: "2–3 months ahead" },
            ...(fareCopy.cheapestMonthClause
              ? [{ icon: TrendingDown, label: "Cheapest month we have seen", value: fareCopy.cheapestMonthClause.split(",")[0] }]
              : []),
            { icon: CalendarDays, label: "Cheapest day to fly", value: "Tuesday & Wednesday" },
            // Removed: this card asserted non-stop service we cannot evidence.
            // origin_fares stores price and dates, not stops. It comes back per
            // city once number_of_changes is filled — see supabase/origin-fares-changes.sql.
          ].map((s) => (
            <div key={s.label} className="rounded-3xl border border-border bg-card p-6">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/15 text-accent"><s.icon className="h-5 w-5" /></div>
              <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</p>
              <p className="mt-1 font-serif text-lg font-semibold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Image category cards */}
      <section id="explore" className="mx-auto mt-14 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Complete guide</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Explore Bangkok</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {categories.map((c) => (
            <Link key={c.slug} href={bangkokHref(c.slug)} className="group relative h-[180px] overflow-hidden rounded-3xl border border-border">
              <Image src={c.image} alt={`Bangkok ${c.label}`} fill sizes="(max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 text-white">
                <span className="flex items-center gap-2 font-serif text-xl font-semibold"><span aria-hidden>{c.emoji}</span> {c.label}</span>
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* The month chart that stood here plotted twelve Stockholm SEK estimates.
          FareCalendarSection, mounted after the search widget above, draws the same
          months from observed fares instead — and shows nothing where we hold too
          few. */}
      {/* The authored non-stop table that stood here — invented prices and
          hardcoded stop labels — is gone. NonstopRoutes above renders the
          observed fares instead. */}
      {/* 8. Why Bangkok */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Why Bangkok?</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Why Fly to Bangkok with Flyamba?</h2>
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
        <AskAiWidget destination="Bangkok" />
      </section>

      {/* 10. Preview sections */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Top attractions</h2>
          <Link href="/bangkok/attractions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All attractions <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={ATTRACTION_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Where to eat</h2>
          <Link href="/bangkok/restaurants" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All restaurants <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={EAT_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Beaches &amp; islands</h2>
          <Link href="/bangkok/beaches" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All beaches <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={BEACH_PREVIEW} />
      </section>

      <FaqSection items={FAQ} city="Bangkok" />

      {/* 11. Nearby */}
      <section id="nearby" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Nearby</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Fly onward from Bangkok</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {NEARBY.map((n) => (
            <Link key={n.city} href={n.href} className="group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 transition hover:-translate-y-0.5 hover:border-accent">
              <span className="text-sm font-semibold text-foreground">Flights to {n.city}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </section>

      <GuidesCarousel

        guides={getGuidesByDestination("bangkok").slice(0, 3)}

        title="Latest Bangkok guides"

      />


      {/* 12. SEO footer links */}
      <section className="mx-auto mt-16 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Bangkok guides</p>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.slug} href={bangkokHref(c.slug)} className="text-muted-foreground transition hover:text-accent">
              Bangkok {c.label.toLowerCase()} →
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
