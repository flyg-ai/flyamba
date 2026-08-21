import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { GuidesCarousel } from "@/app/components/GuidesCarousel";
import { getGuidesByDestination } from "@/app/data/guides";
import { LowFareCta } from "@/app/components/LowFareCta";
import { FaqSection, type FaqItem } from "@/app/components/FaqSection";
import { SmartImage } from "@/app/components/SmartImage";
import { AviasalesWidget } from "@/app/components/AviasalesWidget";
import { AskAiWidget } from "@/app/components/AskAiWidget";
import { CitySubNav } from "@/app/components/CitySubNav";
import { NEW_YORK, CATEGORIES } from "@/app/data/new-york-places";
import { SITE } from "@/app/lib/destination-helpers";
import { clampDescription, clampTitle } from "@/app/lib/seo";
import { usd5 } from "@/app/lib/format";
import { ArrowRight, Plane, CalendarClock, TrendingDown, CalendarDays, Route } from "lucide-react";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { crumbsForSlug } from "@/app/lib/destination-crumbs";

const HERO = "/images/destinations/flights-new-york.avif";
const usdMonths = NEW_YORK.monthlyPrices.map((m) => ({ month: m.month, price: usd5(m.price) }));
const MIN_USD = Math.min(...usdMonths.map((m) => m.price));
const MAX_USD = Math.max(...usdMonths.map((m) => m.price));

export function generateMetadata(): Metadata {
  const year = new Date().getFullYear();
  const title = clampTitle(`Cheap Flights to New York ${year} — Guide, Prices & Attractions | Flyamba`);
  const description = clampDescription(`Find cheap flights to New York, USA from $${MIN_USD}, plus complete English guides to attractions, restaurants, hotels, transport, weather, shopping, nightlife, family travel, day trips and beaches. The city that never sleeps.`);
  const canonical = `${SITE}/new-york`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website", images: [HERO] },
    twitter: { card: "summary_large_image", images: [HERO] },
  };
}

// ── JSON-LD (Breadcrumb + TouristDestination + FAQPage) ──────────────────────
const FAQS: FaqItem[] = [
  {
    q: "How much are flights to New York?",
    a: `Round-trip fares to New York (JFK) start from around $${MIN_USD} and average roughly $${MAX_USD} in peak summer. February is the cheapest month to fly, while July and August are the most expensive.`,
  },
  {
    q: "When is the cheapest time to fly to New York?",
    a: `February is the cheapest month, with fares from about $${MIN_USD} round trip; January is similar. Booking 10–12 weeks ahead and flying Tuesday or Wednesday usually gets the best price.`,
  },
  {
    q: "Are there non-stop flights to New York?",
    a: "Yes. JFK is a major global gateway with non-stop flights from hundreds of cities worldwide, including London, Paris and every major US hub, plus onward links from Newark (EWR) and LaGuardia (LGA).",
  },
  {
    q: "What is the best time to visit New York?",
    a: "April to June and September to November bring the mildest weather (around 15–25°C) — spring blossom or spectacular autumn colour. Summer is hot and humid but lively; December is magical but cold and pricey around the holidays.",
  },
  {
    q: "Do I need a visa or ESTA for New York?",
    a: "Most visa-waiver travellers need an approved ESTA (or the equivalent) rather than a full visa. Apply online well before departure through the official government site, and allow at least 72 hours for approval.",
  },
];

function jsonLd() {
  const url = `${SITE}/new-york`;
  const touristDestination = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "New York",
    description: NEW_YORK.tagline,
    touristType: ["City Break", "Culture", "Nightlife", "Food"],
    url,
  };
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return [touristDestination, faqPage];
}

// ── Static data (USD) ────────────────────────────────────────────────────────
const NON_STOP = [
  { city: "London", price: 389, iata: "LHR" },
  { city: "Paris", price: 419, iata: "CDG" },
  { city: "Los Angeles", price: 149, iata: "LAX" },
  { city: "Miami", price: 119, iata: "MIA" },
  { city: "Chicago", price: 129, iata: "ORD" },
  { city: "Toronto", price: 159, iata: "YYZ" },
];

const CATEGORY_IMAGES: Record<string, string> = {
  attractions: "/images/new-york/attractions/statue-of-liberty.webp",
  restaurants: "/images/new-york/restaurants/restaurant-new-york.avif",
  hotels: "/images/new-york/hotels/hotel-new-york.avif",
  transport: "/images/new-york/attractions/grand-central-terminal.webp",
  prices: "/images/new-york/attractions/times-square.webp",
  weather: "/images/new-york/attractions/central-park.webp",
  shopping: "/images/new-york/shopping/artisan-shop-new-york.webp",
  nightlife: "/images/new-york/nightlife/cocktail-bar-new-york.webp",
  "with-kids": "/images/new-york/with-kids/american-museum-of-natural-history.webp",
  "day-trips": "/images/new-york/day-trips/costa-brava-landscape-new-york.webp",
  beaches: "/images/new-york/beaches/barceloneta-new-york.webp",
};

const ATTRACTION_PREVIEW = [
  { name: "Statue of Liberty", blurb: "America's great symbol, rising from the harbour.", image: "/images/new-york/attractions/statue-of-liberty.webp" },
  { name: "Central Park", blurb: "341 hectares of green in the middle of Manhattan.", image: "/images/new-york/attractions/central-park.webp" },
  { name: "Brooklyn Bridge", blurb: "A sunset walk with the skyline behind you.", image: "/images/new-york/attractions/brooklyn-bridge.webp" },
];
const EAT_PREVIEW = [
  { name: "Katz's Delicatessen", blurb: "Hand-carved pastrami on rye since 1888.", image: "/images/new-york/restaurants/restaurant-new-york.avif" },
  { name: "Le Bernardin", blurb: "Eric Ripert's three-Michelin-star seafood.", image: "/images/new-york/restaurants/restaurant-new-york.avif" },
  { name: "Joe's Pizza", blurb: "The classic Greenwich Village slice since 1975.", image: "/images/new-york/restaurants/restaurant-new-york.avif" },
];
const TRIP_PREVIEW = [
  { name: "Philadelphia", blurb: "The birthplace of the USA, 75 min by train.", image: "/images/new-york/day-trips/girona-new-york.webp" },
  { name: "The Hamptons", blurb: "Glamorous beaches on Long Island's East End.", image: "/images/new-york/day-trips/montserrat-new-york.webp" },
  { name: "Hudson Valley", blurb: "Riverside villages and glorious autumn colour.", image: "/images/new-york/day-trips/penedes-vineyard-new-york.webp" },
];

const WHY = [
  { icon: "🗽", text: "Bucket-list icons — the Statue of Liberty, Empire State Building, Times Square, Central Park and the Brooklyn Bridge, all in one city." },
  { icon: "🎨", text: "World-beating museums — the Met, MoMA, the Guggenheim and the Whitney rank among the finest art collections on earth." },
  { icon: "🍽️", text: "The world's greatest food city — 24,000 restaurants, dozens of Michelin stars, and iconic delis, pizza and street food on every block." },
  { icon: "🌙", text: "Legendary nightlife — hidden speakeasies, historic jazz clubs, Brooklyn warehouse parties and rooftop bars until dawn." },
];

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

export default function NewYorkHub() {
  const categories = CATEGORIES.filter((c) => c.slug);

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
        <SmartImage src={HERO} alt="Cheap flights to New York, USA" fill fetchPriority="high" loading="eager" sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 lg:px-8">
          {/* Trail added with the schema: this page emitted a BreadcrumbList
              while showing no breadcrumb at all. */}
          <div className="mb-4">
            <Breadcrumbs onDark items={crumbsForSlug("new-york")} />
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
            <span className="text-base">{NEW_YORK.countryFlag}</span>
            <span>{NEW_YORK.country}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 tracking-[0.2em] backdrop-blur">{NEW_YORK.iata}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 backdrop-blur">{NEW_YORK.summerTemp}°C summer</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold text-white sm:text-7xl">Cheap Flights to New York</h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">{NEW_YORK.tagline}</p>
        </div>
      </section>

      {/* 2. Flight stats bar */}
      <section className="relative z-10 mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-border bg-card px-6 py-4 text-sm font-medium text-foreground shadow-elegant">
          <span>from <span className="font-serif text-lg text-accent">${MIN_USD}</span></span>
          <span className="text-muted-foreground/40">•</span>
          <span>Major gateway · nonstop worldwide</span>
          <span className="text-muted-foreground/40">•</span>
          <span>~7h from London · 6h from LA</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="inline-flex items-center gap-1"><Plane className="h-4 w-4 text-accent" /> {NEW_YORK.iata}</span>
        </div>
      </section>

      {/* Sticky sub-nav */}
      <div className="mt-8">
        <CitySubNav citySlug="new-york" categories={CATEGORIES} active="" />
      </div>

      {/* 3. Flight search widget */}
      <section id="flights" className="mx-auto mt-10 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <h2 className="mb-3 font-serif text-2xl font-semibold text-foreground sm:text-3xl">Find the Best Flights to New York</h2>
        <p className="mb-6 max-w-3xl text-muted-foreground">Flying to New York is easier than ever, with direct routes from New York, London and other major hubs — making New York one of the most popular flight destinations from the US, UK and Europe. Find cheap flights to New York, compare airlines and book direct. Our AI flight search compares hundreds of routes to find you the cheapest flights to New York — just describe your trip and Flyamba does the rest.</p>
        <AviasalesWidget toName={NEW_YORK.tpName} />
        <LowFareCta slug="new-york" city="New York" />
      </section>

      {/* 4. Booking insights */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Booking insights</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Smart tips for booking New York</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarClock, label: "Best time to book", value: "10–12 weeks ahead" },
            { icon: TrendingDown, label: "Cheapest month", value: `February ($${MIN_USD} avg)` },
            { icon: CalendarDays, label: "Cheapest day to fly", value: "Tuesday & Wednesday" },
            { icon: Route, label: "Direct flights", value: "Yes — from London, Paris, worldwide" },
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Explore New York</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/new-york/${c.slug}`}
              className="group relative h-[180px] overflow-hidden rounded-3xl border border-border"
            >
              <SmartImage src={CATEGORY_IMAGES[c.slug] ?? HERO} alt={`New York ${c.label}`} fill sizes="(max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 text-white">
                <span className="flex items-center gap-2 font-serif text-xl font-semibold"><span aria-hidden>{c.emoji}</span> {c.label}</span>
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Price by month (USD) */}
      <section id="cheapest-months" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Prices by month</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">When is it cheapest to fly to New York?</h2>
        <p className="mt-2 text-sm text-muted-foreground">Average round-trip fare, USD.</p>
        <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card p-6">
          <div className="flex h-56 items-end gap-2">
            {usdMonths.map((m) => {
              const ratio = (m.price - MIN_USD) / (MAX_USD - MIN_USD || 1);
              const h = Math.round(16 + ratio * 152);
              const isMin = m.price === MIN_USD;
              const isMax = m.price === MAX_USD;
              return (
                <div key={m.month} className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
                  <span className={`text-[11px] font-semibold ${isMin ? "text-emerald-600 dark:text-emerald-400" : isMax ? "text-orange-500" : "text-muted-foreground"}`}>${m.price}</span>
                  <div className={`w-full rounded-t-xl ${isMin ? "bg-emerald-500" : isMax ? "bg-orange-500" : "bg-accent/60 group-hover:bg-accent"}`} style={{ height: h }} />
                  <span className="text-[11px] font-semibold text-muted-foreground">{m.month}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Non-stop cities (USD) */}
      <section id="nonstop" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Direct routes</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Non-stop to New York from major cities</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NON_STOP.map((r) => (
            <div key={r.city} className="flex items-center justify-between rounded-3xl border border-border bg-card p-6">
              <div>
                <p className="font-serif text-lg font-semibold text-foreground">{r.city}</p>
                <p className="text-xs text-muted-foreground">{r.iata} → JFK · nonstop</p>
              </div>
              <p className="font-serif text-2xl text-accent">${r.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Why New York */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Why New York?</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Why Fly to New York with Flyamba?</h2>
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
        <AskAiWidget destination="New York" />
      </section>

      {/* 10. Preview sections */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Top attractions</h2>
          <Link href="/new-york/attractions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All attractions <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={ATTRACTION_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Where to eat</h2>
          <Link href="/new-york/restaurants" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All restaurants <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={EAT_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Best day trips</h2>
          <Link href="/new-york/day-trips" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All day trips <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={TRIP_PREVIEW} />
      </section>

      {/* 11. Nearby cities */}
      <section id="nearby" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Nearby</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Fly onward from New York</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {NEW_YORK.nearby.map((n) => (
            <Link key={n.city} href={n.href} className="group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 transition hover:-translate-y-0.5 hover:border-accent">
              <span className="text-sm font-semibold text-foreground">Flights to {n.city}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </section>

      <FaqSection items={FAQS} city="New York" />


      <GuidesCarousel


        guides={getGuidesByDestination("new-york").slice(0, 3)}


        title="Latest New York guides"


      />



      {/* 12. SEO footer links */}
      <section className="mx-auto mt-16 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">New York guides</p>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.slug} href={`/new-york/${c.slug}`} className="text-muted-foreground transition hover:text-accent">
              New York {c.label.toLowerCase()} →
            </Link>
          ))}
          {NEW_YORK.nearby.map((n) => (
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
