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
import { CATEGORIES } from "@/app/data/singapore-places";
import { ArrowRight, Plane, CalendarClock, TrendingDown, CalendarDays, Route } from "lucide-react";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { crumbsForSlug } from "@/app/lib/destination-crumbs";
import { FareCalendarSection } from "@/app/components/FareCalendarSection";

// ── City facts (self-contained) ──────────────────────────────────────────────
const CITY = {
  name: "Singapore",
  country: "Singapore",
  countryFlag: "🇸🇬",
  iata: "SIN",
  tpName: "singapore_sg",
  summerTemp: 32,
  tagline: "A futuristic garden city where cultures and cuisines collide",
  flightTime: "A global hub — Changi",
  hero: "/images/destinations/flights-singapore.avif",
};

// Monthly average round-trip fares seeded in SEK; displayed in USD via usd5().
const MONTHLY_SEK: { month: string; sek: number }[] = [
  { month: "Jan", sek: 7200 }, { month: "Feb", sek: 6800 }, { month: "Mar", sek: 7100 },
  { month: "Apr", sek: 7500 }, { month: "May", sek: 7900 }, { month: "Jun", sek: 8300 },
  { month: "Jul", sek: 8700 }, { month: "Aug", sek: 8500 }, { month: "Sep", sek: 8100 },
  { month: "Oct", sek: 7700 }, { month: "Nov", sek: 7200 }, { month: "Dec", sek: 7500 },
];
const LOWEST_SEK = Math.min(...MONTHLY_SEK.map((m) => m.sek));

const NON_STOP = [
  { city: "Tokyo", price: 290, iata: "HND" },
  { city: "Sydney", price: 340, iata: "SYD" },
  { city: "Dubai", price: 420, iata: "DXB" },
  { city: "London", price: 610, iata: "LHR" },
  { city: "San Francisco", price: 780, iata: "SFO" },
  { city: "New York", price: 920, iata: "JFK" },
];

const CATEGORY_IMG: Record<string, string> = {
  attractions: "/images/singapore/sevardheter/gardens-by-the-bay.webp",
  restaurants: "/images/singapore/restaurants/restaurant-singapore.avif",
  hotels: "/images/singapore/hotels/hotel-singapore.avif",
  transport: "/images/singapore/sevardheter/jewel-changi-airport.webp",
  prices: "/images/singapore/sevardheter/merlion-park.webp",
  weather: "/images/singapore/sevardheter/singapore-botanic-gardens.webp",
  shopping: "/images/singapore/shopping/artisan-shop-singapore.webp",
  beaches: "/images/singapore/beaches/barceloneta-singapore.webp",
  nightlife: "/images/singapore/nattliv/1-altitude.webp",
  "with-kids": "/images/singapore/with-kids/aquarium-singapore.webp",
  "day-trips": "/images/singapore/dagsutflykter/johor-bahru-malaysia.webp",
  events: "/images/singapore/sevardheter/chinatown.webp",
};

const WHY = [
  { icon: "🌳", text: "Marvel at a city built as a garden — the solar Supertrees and biodomes of Gardens by the Bay, the UNESCO Botanic Gardens and rainforest reserves within the metropolis." },
  { icon: "🍜", text: "Eat your way through the world's greatest food city, from Michelin-starred hawker chicken rice for a few dollars to chilli crab, laksa and 3-star fine dining." },
  { icon: "🏙️", text: "Gawp at futuristic icons — the boat-topped Marina Bay Sands, the Merlion, Jewel Changi's indoor waterfall and a skyline of nightly light shows." },
  { icon: "🏖️", text: "Play on Sentosa's beaches and theme parks, meet the world's best zoo, and use Singapore as a springboard to Malaysia, Bali and the rest of Asia." },
];

const ATTRACTION_PREVIEW = [
  { name: "Gardens by the Bay", blurb: "Futuristic Supertrees and misty biodomes on the Marina Bay waterfront.", image: "/images/singapore/sevardheter/gardens-by-the-bay.webp" },
  { name: "Marina Bay Sands", blurb: "Three towers crowned by a boat-shaped SkyPark and infinity pool.", image: "/images/singapore/sevardheter/marina-bay-sands-skypark.webp" },
  { name: "Singapore Zoo", blurb: "Regularly rated the world's best zoo, in cage-free rainforest.", image: "/images/singapore/sevardheter/singapore-zoo.webp" },
];
const EAT_PREVIEW = [
  { name: "Odette", blurb: "Julien Royer's three-Michelin-star modern French flagship.", image: "/images/singapore/restaurants/restaurant-singapore.avif" },
  { name: "Hawker Chan", blurb: "The world's cheapest Michelin meal — soya chicken rice for S$6.", image: "/images/singapore/restaurants/restaurant-singapore.avif" },
  { name: "Long Beach Seafood", blurb: "The self-proclaimed birthplace of black pepper crab.", image: "/images/singapore/restaurants/restaurant-singapore.avif" },
];
const BEACH_PREVIEW = [
  { name: "Palawan Beach", blurb: "Sentosa's family beach and the 'southernmost point of Asia'.", image: "/images/singapore/beaches/beach-bar-singapore.webp" },
  { name: "East Coast Park", blurb: "A 15 km ribbon of cycling paths, barbecues and seafood.", image: "/images/singapore/beaches/beach-sunset-singapore.webp" },
  { name: "Lazarus Island", blurb: "An idyllic, undeveloped white-sand escape by ferry.", image: "/images/singapore/beaches/costa-brava-singapore.webp" },
];

const NEARBY = [
  { city: "Kuala Lumpur", href: "/kuala-lumpur" },
  { city: "Bali", href: "/bali" },
  { city: "Bangkok", href: "/bangkok" },
  { city: "Phuket", href: "/phuket" },
];

const FAQ: FaqItem[] = [
  {
    q: "How much are flights to Singapore?",
    a: `Round-trip fares to Singapore start from around ${usdStr(LOWEST_SEK)} in the low season (February), rising to $800 or more during the June–August and December peaks. As Changi is a major global hub with strong airline competition, booking two to four months ahead and flying midweek secures the best prices.`,
  },
  {
    q: "When is the best time to visit Singapore?",
    a: "Singapore is warm and tropical year-round at around 31–33°C, so there is no bad season. February to April tends to be slightly drier and most comfortable, while November to January is the wettest. Many travellers time a visit around events like the September F1 Night Race or Chinese New Year.",
  },
  {
    q: "Which airport does Singapore use?",
    a: "Singapore Changi Airport (SIN), routinely voted the world's best, is the sole airport and a major global hub. The city centre is under 30 minutes away by MRT (under S$3), taxi or Grab (~S$25–40), and the airport's own Jewel complex, with its indoor waterfall, is worth arriving early for.",
  },
  {
    q: "Is Singapore expensive?",
    a: "Hotels, alcohol, taxis and branded shopping are pricey, but food and transport are outstanding value: a hawker-centre meal costs S$5–8, the MRT a dollar or two, and many top attractions — the gardens, waterfront light shows, temples and beaches — are free. Balance splurges with hawker meals to keep costs down.",
  },
  {
    q: "How do you get around Singapore?",
    a: "The MRT metro is world-class — clean, cheap and reaching almost every attraction — and combines with an extensive bus network using a single contactless tap or EZ-Link card. Honest metered taxis and the Grab app cover the rest, and the compact central districts are very walkable.",
  },
];

// fare-calendar.ts reads Supabase with cache: "no-store". Without force-static
// that read is a dynamic-server-usage error, the reader swallows it, and the page
// renders with no calendar while the build reports success. Fourth time this trap
// has been hit — see CLAUDE.md.
export const dynamic = "force-static";
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const year = new Date().getFullYear();
  const title = clampTitle(`Cheap Flights to Singapore ${year} — Guide, Prices & Attractions | Flyamba`);
  const description = clampDescription(`Find cheap flights to Singapore from ${usdStr(LOWEST_SEK)}. Compare fares, plus complete English guides to attractions, restaurants, hotels, transport, weather, shopping, beaches, nightlife, family travel and day trips.`);
  const canonical = `${SITE}/singapore`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website", images: [CITY.hero] },
    twitter: { card: "summary_large_image", images: [CITY.hero] },
  };
}

function jsonLd() {
  const url = `${SITE}/singapore`;
  const touristDestination = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Singapore",
    description: CITY.tagline,
    geo: { "@type": "GeoCoordinates", latitude: 1.3521, longitude: 103.8198 },
    touristType: ["City Break", "Food & Dining", "Family", "Culture", "Nightlife"],
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

export default function SingaporeHub() {
  const guideCategories = CATEGORIES.filter((c) => c.slug);
  const usdMonths = MONTHLY_SEK.map((m) => ({ month: m.month, price: usd5(m.sek) }));
  const min = Math.min(...usdMonths.map((m) => m.price));
  const max = Math.max(...usdMonths.map((m) => m.price));
  const cheapest = MONTHLY_SEK.reduce((a, b) => (b.sek < a.sek ? b : a));
  const cheapestLabel = { Jan: "January", Feb: "February", Mar: "March", Apr: "April", May: "May", Jun: "June", Jul: "July", Aug: "August", Sep: "September", Oct: "October", Nov: "November", Dec: "December" }[cheapest.month];

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
        <SmartImage src={CITY.hero} alt="Cheap flights to Singapore" fill fetchPriority="high" loading="eager" sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 lg:px-8">
          {/* Trail added with the schema: this page emitted a BreadcrumbList
              while showing no breadcrumb at all. */}
          <div className="mb-4">
            <Breadcrumbs onDark items={crumbsForSlug("singapore")} />
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
            <span className="text-base">{CITY.countryFlag}</span>
            <span>{CITY.country}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 tracking-[0.2em] backdrop-blur">{CITY.iata}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 backdrop-blur">~{CITY.summerTemp}°C year-round</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold text-white sm:text-7xl">Cheap Flights to Singapore</h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">{CITY.tagline}</p>
        </div>
      </section>

      {/* 2. Flight stats bar */}
      <section className="relative z-10 mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-border bg-card px-6 py-4 text-sm font-medium text-foreground shadow-elegant">
          <span>from <span className="font-serif text-lg text-accent">{usdStr(LOWEST_SEK)}</span></span>
          <span className="text-muted-foreground/40">•</span>
          <span>{CITY.flightTime}</span>
          <span className="text-muted-foreground/40">•</span>
          <span>Direct from New York, London, Sydney &amp; Tokyo</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="inline-flex items-center gap-1"><Plane className="h-4 w-4 text-accent" /> {CITY.iata}</span>
        </div>
      </section>

      {/* Sticky in-page sub-nav */}
      <div className="mt-8">
        <CitySubNav citySlug="singapore" categories={CATEGORIES} active="" />
      </div>

      {/* 3. Flight search widget */}
      <section id="flights" className="mx-auto mt-10 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <h2 className="mb-3 font-serif text-2xl font-semibold text-foreground sm:text-3xl">Find the Best Flights to Singapore</h2>
        <p className="mb-6 max-w-3xl text-muted-foreground">Singapore Changi is one of the world's great aviation hubs, with nonstop flights from New York, London, San Francisco, Sydney, Tokyo, Dubai and far beyond — making Singapore one of the best-connected destinations in Asia. Find cheap flights to Singapore, compare airlines and book direct. Our AI flight search compares hundreds of routes to find you the cheapest flights to Singapore — just describe your trip and Flyamba does the rest.</p>
        <AviasalesWidget toName={CITY.tpName} />

        {/* Observed fares by month. Renders nothing below three months —
            see app/components/FareCalendarSection.tsx. */}
        <FareCalendarSection slug="singapore" name="Singapore" />
      </section>

      {/* 4. Booking insights */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Booking insights</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Smart tips for booking Singapore</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarClock, label: "Best time to book", value: "2–4 months ahead" },
            { icon: TrendingDown, label: "Cheapest month", value: `${cheapestLabel} (${usdStr(cheapest.sek)} avg)` },
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

      {/* 5. Category cards */}
      <section id="explore" className="mx-auto mt-14 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Complete guide</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Explore Singapore</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {guideCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/singapore/${c.slug}`}
              className="group relative h-[180px] overflow-hidden rounded-3xl border border-border"
            >
              <SmartImage src={CATEGORY_IMG[c.slug] ?? CITY.hero} alt={`Singapore ${c.label}`} fill sizes="(max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 text-white">
                <span className="flex items-center gap-2 font-serif text-xl font-semibold"><span aria-hidden>{c.emoji}</span>{c.label}</span>
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Price by month (USD) */}
      <section id="cheapest-months" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Prices by month</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">When is it cheapest to fly to Singapore?</h2>
        <p className="mt-2 text-sm text-muted-foreground">Average round-trip fare, USD.</p>
        <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card p-6">
          <div className="flex h-56 items-end gap-2">
            {usdMonths.map((m) => {
              const ratio = (m.price - min) / (max - min || 1);
              const h = Math.round(16 + ratio * 152);
              const isMin = m.price === min;
              const isMax = m.price === max;
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Non-stop to Singapore from {NON_STOP.length} global cities</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NON_STOP.map((r) => (
            <div key={r.city} className="flex items-center justify-between rounded-3xl border border-border bg-card p-6">
              <div>
                <p className="font-serif text-lg font-semibold text-foreground">{r.city}</p>
                <p className="text-xs text-muted-foreground">{r.iata} → SIN · nonstop</p>
              </div>
              <p className="font-serif text-2xl text-accent">${r.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Why Singapore */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Why Singapore?</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Why Fly to Singapore with Flyamba?</h2>
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
        <AskAiWidget destination="Singapore" />
      </section>

      {/* 10. Preview sections */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Top attractions</h2>
          <Link href="/singapore/attractions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All attractions <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={ATTRACTION_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Where to eat</h2>
          <Link href="/singapore/restaurants" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All restaurants <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={EAT_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Best beaches</h2>
          <Link href="/singapore/beaches" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All beaches <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={BEACH_PREVIEW} />
      </section>

      {/* CTA */}
      <section className="mx-auto mt-16 max-w-4xl px-4 sm:px-6 lg:px-8">
        <FlightCTA destination={{ slug: "singapore", name: "Singapore" }} priceFrom={usdStr(LOWEST_SEK)} />
      </section>

      {/* 11. Nearby cities */}
      <section id="nearby" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Nearby</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Fly onward from Singapore</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {NEARBY.map((n) => (
            <Link key={n.city} href={n.href} className="group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 transition hover:-translate-y-0.5 hover:border-accent">
              <span className="text-sm font-semibold text-foreground">Flights to {n.city}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </section>

      <FaqSection items={FAQ} city="Singapore" />


      {/* 12. SEO footer links */}
      <section className="mx-auto mt-16 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Singapore guides</p>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
          {guideCategories.map((c) => (
            <Link key={c.slug} href={`/singapore/${c.slug}`} className="text-muted-foreground transition hover:text-accent">
              Singapore {c.label.toLowerCase()} →
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
