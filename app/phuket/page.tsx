import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { FaqSection, type FaqItem } from "@/app/components/FaqSection";
import { AviasalesWidget } from "@/app/components/AviasalesWidget";
import { AskAiWidget } from "@/app/components/AskAiWidget";
import { FlightCTA } from "@/app/components/FlightCTA";
import { SmartImage } from "@/app/components/SmartImage";
import { CitySubNav } from "@/app/components/CitySubNav";
import { SITE } from "@/app/lib/destination-helpers";
import { clampDescription, clampTitle } from "@/app/lib/seo";
import { usd5, usdStr } from "@/app/lib/format";
import { CATEGORIES } from "@/app/data/phuket-places";
import { ArrowRight, Plane, CalendarClock, TrendingDown, CalendarDays, Route } from "lucide-react";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { crumbsForSlug } from "@/app/lib/destination-crumbs";
import { FareCalendarSection } from "@/app/components/FareCalendarSection";
import { fareCopyFor, priceAnswer } from "@/app/lib/fare-copy";

// ── City facts (self-contained) ──────────────────────────────────────────────
const CITY = {
  name: "Phuket",
  country: "Thailand",
  countryFlag: "🇹🇭",
  iata: "HKT",
  tpName: "phuket-city_th",
  summerTemp: 30,
  tagline: "Thailand's beach island of turquoise bays and buzzing nightlife",
  flightTime: "Via Bangkok, Singapore & Dubai",
  hero: "/images/destinations/flights-phuket.avif",
};

// Monthly average round-trip fares seeded in SEK; displayed in USD via usd5().
// The twelve Stockholm SEK estimates are gone with the chart, the hero pill and
// the FAQ answer that quoted them. Prices now come from observed fares — see
// app/lib/fare-copy.ts.

const NON_STOP = [
  { city: "Bangkok", price: 45, iata: "BKK" },
  { city: "Kuala Lumpur", price: 70, iata: "KUL" },
  { city: "Singapore", price: 95, iata: "SIN" },
  { city: "Hong Kong", price: 180, iata: "HKG" },
  { city: "Seoul", price: 290, iata: "ICN" },
  { city: "Dubai", price: 360, iata: "DXB" },
  { city: "Doha", price: 380, iata: "DOH" },
  { city: "Sydney", price: 430, iata: "SYD" },
];

const CATEGORY_IMG: Record<string, string> = {
  attractions: "/images/phuket/sevardheter/big-buddha.webp",
  restaurants: "/images/phuket/sevardheter/soi-romanee.webp",
  hotels: "/images/phuket/strander/surin-beach.webp",
  transport: "/images/phuket/sevardheter/phuket-old-town.webp",
  prices: "/images/phuket/sevardheter/promthep-cape.webp",
  weather: "/images/phuket/strander/kata-beach.webp",
  shopping: "/images/phuket/sevardheter/bangla-road.webp",
  beaches: "/images/phuket/strander/patong-beach.webp",
  nightlife: "/images/phuket/sevardheter/phuket-fantasea.webp",
  "with-kids": "/images/phuket/sevardheter/phuket-aquarium.webp",
  "day-trips": "/images/phuket/dagsutflykter/phi-phi-islands.webp",
  events: "/images/phuket/sevardheter/wat-chalong.webp",
};

const WHY = [
  { icon: "🏝️", text: "Laze on world-class beaches — from lively Patong to gorgeous Nai Harn, Kata and secret Freedom Beach — with warm turquoise water and golden sand." },
  { icon: "🛥️", text: "Sail out to some of the planet's most beautiful islands: Phi Phi's cliffs and Maya Bay, the karsts of Phang Nga Bay and the pristine reefs of the Similans." },
  { icon: "🍜", text: "Eat like royalty for a few dollars — fiery southern-Thai curries, fresh seafood, night-market street food and Old Town's unique Baba cuisine." },
  { icon: "💰", text: "Enjoy outstanding value: cheap, brilliant food, affordable resorts, low-cost tours and massages, and a baht that stretches remarkably far." },
];

const ATTRACTION_PREVIEW = [
  { name: "The Big Buddha", blurb: "A 45-metre marble Buddha crowning the hills, with island-wide views.", image: "/images/phuket/sevardheter/big-buddha.webp" },
  { name: "Old Phuket Town", blurb: "Pastel Sino-Portuguese shophouses, cafés, galleries and street art.", image: "/images/phuket/sevardheter/phuket-old-town.webp" },
  { name: "Phang Nga Bay", blurb: "Towering limestone karsts, hidden lagoons and James Bond Island.", image: "/images/phuket/sevardheter/phang-nga-bay.webp" },
];
const EAT_PREVIEW = [
  { name: "Raya Restaurant", blurb: "Classic Phuketian crab curry in a heritage mansion.", image: "/images/phuket/sevardheter/phuket-old-town.webp" },
  { name: "Tu Kab Khao", blurb: "Refined southern Thai amid gorgeous Peranakan decor.", image: "/images/phuket/sevardheter/soi-romanee.webp" },
  { name: "Rock Salt", blurb: "Beachfront Thai and grills above lovely Nai Harn beach.", image: "/images/phuket/strander/nai-harn-beach.webp" },
];
const BEACH_PREVIEW = [
  { name: "Patong Beach", blurb: "The island's liveliest beach, backed by shops, bars and nightlife.", image: "/images/phuket/strander/patong-beach.webp" },
  { name: "Kata Beach", blurb: "A beautiful all-rounder — swimming, gentle surf and a relaxed vibe.", image: "/images/phuket/strander/kata-beach.webp" },
  { name: "Nai Harn Beach", blurb: "Often rated Phuket's finest — sheltered, swimmable and stunning.", image: "/images/phuket/strander/nai-harn-beach.webp" },
];

const NEARBY = [
  { city: "Krabi", href: "/krabi" },
  { city: "Phi Phi", href: "/phi-phi" },
  { city: "Bangkok", href: "/bangkok" },
  { city: "Koh Samui", href: "/koh-samui" },
];

// A function of the observed fare rather than a constant: this answer goes
// verbatim into FAQPage schema, so a figure baked in at authoring time would
// be a stale claim to Google the moment the cron runs again.
function buildFaq(priceLine: string): FaqItem[] {
  return [
  {
    q: "How much are flights to Phuket?",
    a: priceLine,
  },
  {
    q: "When is the best time to visit Phuket?",
    a: "November to February offers the best weather — sunny, dry and warm around 30°C with calm, clear seas ideal for island trips — but it's the busiest and priciest. April, May, June and October give the best balance of decent weather, fewer crowds and lower prices. The green season (May–October) is cheapest and lush, though seas are rougher, so heed the red flags.",
  },
  {
    q: "Which airport do I fly into and how do I reach the beaches?",
    a: "Phuket International (HKT) sits in the far north of the island. It's about 45–60 minutes by taxi or Grab to Patong, a little over an hour to Kata and Nai Harn, but only 10–30 minutes to the northern beaches. Use the official taxi/Grab counters or a pre-booked private transfer (฿600–1,300) rather than the touts, and download the Grab app for fair, fixed fares.",
  },
  {
    q: "Do I need to book island day trips in advance?",
    a: "In the busy November–April high season it's wise to book popular tours like Phi Phi, Phang Nga Bay and the Similan Islands a day or two ahead, and to compare operators for price and reviews. The Similan Islands are only open mid-October to mid-May. In the green season, check which trips are running, as rougher seas can limit or cancel some excursions.",
  },
  {
    q: "Is it easy to get around Phuket?",
    a: "Phuket is large and spread out, so plan your transport. The Grab app gives the fairest, fixed fares; local taxis and tuk-tuks are convenient but pricey and unmetered, so always agree the fare first. Cheap songthaew buses link the beaches to Phuket Town by day, and hiring a car or private driver suits families. Scooters are cheapest but only for experienced riders — the accident rate is high, so wear a helmet and check your insurance.",
  },
  ];
}

// fare-calendar.ts reads Supabase with cache: "no-store". Without force-static
// that read is a dynamic-server-usage error, the reader swallows it, and the page
// renders with no calendar while the build reports success. Fourth time this trap
// has been hit — see CLAUDE.md.
export const dynamic = "force-static";
export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const fareCopy = await fareCopyFor("phuket");
  const year = new Date().getFullYear();
  const title = clampTitle(`Cheap Flights to Phuket ${year} — Guide, Prices & Beaches | Flyamba`);
  const description = clampDescription(`Find cheap flights to Phuket, Thailand${fareCopy.amount ? ` from ${fareCopy.amount} round trip from ${fareCopy.originLabel}` : ""}. Compare fares, plus complete English guides to beaches, attractions, island day trips, restaurants, hotels, transport, weather, shopping, nightlife and family travel.`);
  const canonical = `${SITE}/phuket`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website", images: [CITY.hero] },
    twitter: { card: "summary_large_image", images: [CITY.hero] },
  };
}

function jsonLd(FAQ: FaqItem[]) {
  const url = `${SITE}/phuket`;
  const touristDestination = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Phuket",
    description: CITY.tagline,
    geo: { "@type": "GeoCoordinates", latitude: 7.8804, longitude: 98.3923 },
    touristType: ["Beach", "Islands", "Nightlife", "Food", "Family"],
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
            <SmartImage src={it.image} alt={it.name} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
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

export default async function PhuketHub() {
  // Read here, on the server, and threaded through the copy below.
  const fareCopy = await fareCopyFor("phuket");
  const FAQ = buildFaq(priceAnswer("Phuket", fareCopy));
  const guideCategories = CATEGORIES.filter((c) => c.slug);

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
        <SmartImage src={CITY.hero} alt="Cheap flights to Phuket, Thailand" fill fetchPriority="high" loading="eager" sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 lg:px-8">
          {/* Trail added with the schema: this page emitted a BreadcrumbList
              while showing no breadcrumb at all. */}
          <div className="mb-4">
            <Breadcrumbs onDark items={crumbsForSlug("phuket")} />
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
            <span className="text-base">{CITY.countryFlag}</span>
            <span>{CITY.country}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 tracking-[0.2em] backdrop-blur">{CITY.iata}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 backdrop-blur">~{CITY.summerTemp}°C tropical</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold text-white sm:text-7xl">Cheap Flights to Phuket</h1>
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
          <span>{CITY.flightTime}</span>
          <span className="text-muted-foreground/40">•</span>
          <span>Connections from the US, UK, Europe &amp; Australia</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="inline-flex items-center gap-1"><Plane className="h-4 w-4 text-accent" /> {CITY.iata}</span>
        </div>
      </section>

      {/* Sticky in-page sub-nav */}
      <div className="mt-8">
        <CitySubNav citySlug="phuket" categories={CATEGORIES} active="" />
      </div>

      {/* 3. Flight search widget */}
      <section id="flights" className="mx-auto mt-10 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <h2 className="mb-3 font-serif text-2xl font-semibold text-foreground sm:text-3xl">Find the Best Flights to Phuket</h2>
        <p className="mb-6 max-w-3xl text-muted-foreground">Phuket is one of Asia's most connected beach destinations, with direct flights from Bangkok, Singapore, Kuala Lumpur, Hong Kong, Dubai, Doha and Sydney, plus easy one-stop routes from the US, UK, Europe and Australia through those hubs. Find cheap flights to Phuket, compare airlines and book direct. Our AI flight search compares hundreds of routes to find you the cheapest flights to Phuket — just describe your trip and Flyamba does the rest.</p>
        <AviasalesWidget toName={CITY.tpName} />

        {/* Observed fares by month. Renders nothing below three months —
            see app/components/FareCalendarSection.tsx. */}
        <FareCalendarSection slug="phuket" name="Phuket" />
      </section>

      {/* 4. Booking insights */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Booking insights</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Smart tips for booking Phuket</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarClock, label: "Best time to book", value: "6–10 weeks ahead" },
            // Only claimed at six observed months or more — fare-copy.ts holds the
            // same threshold the chart uses.
            ...(fareCopy.cheapestMonthClause
              ? [{ icon: TrendingDown, label: "Cheapest month we have seen", value: fareCopy.cheapestMonthClause.split(",")[0] }]
              : []),
            { icon: CalendarDays, label: "Cheapest season", value: "Green season (Jun–Aug)" },
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

      {/* 5. Category cards */}
      <section id="explore" className="mx-auto mt-14 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Complete guide</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Explore Phuket</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {guideCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/phuket/${c.slug}`}
              className="group relative h-[180px] overflow-hidden rounded-3xl border border-border"
            >
              <SmartImage src={CATEGORY_IMG[c.slug] ?? CITY.hero} alt={`Phuket ${c.label}`} fill sizes="(max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 text-white">
                <span className="flex items-center gap-2 font-serif text-xl font-semibold"><span aria-hidden>{c.emoji}</span>{c.label}</span>
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
      {/* 7. Non-stop cities (USD) */}
      <section id="nonstop" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Direct routes</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Non-stop to Phuket from {NON_STOP.length} cities</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NON_STOP.map((r) => (
            <div key={r.city} className="flex items-center justify-between rounded-3xl border border-border bg-card p-6">
              <div>
                <p className="font-serif text-lg font-semibold text-foreground">{r.city}</p>
                <p className="text-xs text-muted-foreground">{r.iata} → HKT · nonstop</p>
              </div>
              <p className="font-serif text-2xl text-accent">${r.price}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Travelling from the US, UK, Europe or Australia? Connect through Bangkok, Singapore, Dubai, Doha or Hong Kong — our AI search finds the cheapest one-stop combination for your dates.</p>
      </section>

      {/* 8. Why Phuket */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Why Phuket?</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Why Fly to Phuket with Flyamba?</h2>
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
        <AskAiWidget destination="Phuket" />
      </section>

      {/* 10. Preview sections */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Top attractions</h2>
          <Link href="/phuket/attractions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All attractions <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={ATTRACTION_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Best beaches</h2>
          <Link href="/phuket/beaches" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All beaches <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={BEACH_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Where to eat</h2>
          <Link href="/phuket/restaurants" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All restaurants <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={EAT_PREVIEW} />
      </section>

      {/* CTA */}
      <section className="mx-auto mt-16 max-w-4xl px-4 sm:px-6 lg:px-8">
        <FlightCTA destination={{ slug: "phuket", name: "Phuket" }} priceFrom={fareCopy.amount ?? undefined} />
      </section>

      {/* 11. Nearby cities */}
      <section id="nearby" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Nearby</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Fly onward from Phuket</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {NEARBY.map((n) => (
            <Link key={n.city} href={n.href} className="group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 transition hover:-translate-y-0.5 hover:border-accent">
              <span className="text-sm font-semibold text-foreground">Flights to {n.city}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </section>

      <FaqSection items={FAQ} city="Phuket" />


      {/* 12. SEO footer links */}
      <section className="mx-auto mt-16 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Phuket guides</p>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
          {guideCategories.map((c) => (
            <Link key={c.slug} href={`/phuket/${c.slug}`} className="text-muted-foreground transition hover:text-accent">
              Phuket {c.label.toLowerCase()} →
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
