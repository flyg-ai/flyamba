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
import { CATEGORIES } from "@/app/data/marrakech-places";
import { ArrowRight, Plane, CalendarClock, TrendingDown, CalendarDays, Route } from "lucide-react";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { crumbsForSlug } from "@/app/lib/destination-crumbs";

// ── City facts (self-contained) ──────────────────────────────────────────────
const CITY = {
  name: "Marrakech",
  country: "Morocco",
  countryFlag: "🇲🇦",
  iata: "RAK",
  tpName: "marrakesh_ma",
  summerTemp: 35,
  tagline: "Souks, palaces and rose-gold ramparts at the edge of the Sahara",
  flightTime: "Nonstop across Europe · 1-stop from the US",
  hero: "/images/destinations/flights-marrakech.avif",
};

// Monthly average round-trip fares seeded in SEK; displayed in USD via usd5().
const MONTHLY_SEK: { month: string; sek: number }[] = [
  { month: "Jan", sek: 3200 }, { month: "Feb", sek: 3000 }, { month: "Mar", sek: 3300 },
  { month: "Apr", sek: 3700 }, { month: "May", sek: 4100 }, { month: "Jun", sek: 4600 },
  { month: "Jul", sek: 5200 }, { month: "Aug", sek: 5000 }, { month: "Sep", sek: 4400 },
  { month: "Oct", sek: 3800 }, { month: "Nov", sek: 3200 }, { month: "Dec", sek: 3400 },
];
const LOWEST_SEK = Math.min(...MONTHLY_SEK.map((m) => m.sek));

const NON_STOP: { city: string; price: number; iata: string; note?: string }[] = [
  { city: "London", price: 55, iata: "LGW" },
  { city: "Paris", price: 62, iata: "ORY" },
  { city: "Madrid", price: 58, iata: "MAD" },
  { city: "Brussels", price: 68, iata: "CRL" },
  { city: "Lisbon", price: 74, iata: "LIS" },
  { city: "Geneva", price: 89, iata: "GVA" },
  { city: "New York", price: 465, iata: "JFK", note: "1 stop (via Casablanca / Europe)" },
  { city: "Boston", price: 485, iata: "BOS", note: "1 stop (via Casablanca / Europe)" },
];

const CATEGORY_IMG: Record<string, string> = {
  attractions: "/images/marrakech/sevardheter/djemaa-el-fna.webp",
  restaurants: "/images/marrakech/restaurants/restaurant-marrakech.avif",
  hotels: "/images/marrakech/hotels/hotel-marrakech.avif",
  transport: "/images/marrakech/sevardheter/koutoubia.webp",
  prices: "/images/marrakech/sevardheter/souker-basarerna.webp",
  weather: "/images/marrakech/sevardheter/majorelle.webp",
  shopping: "/images/marrakech/shopping/artisan-shop-marrakech.webp",
  beaches: "/images/marrakech/beaches/barceloneta-marrakech.webp",
  nightlife: "/images/marrakech/nightlife/cocktail-bar-marrakech.webp",
  "with-kids": "/images/marrakech/with-kids/aquarium-marrakech.webp",
  "day-trips": "/images/marrakech/day-trips/costa-brava-landscape-marrakech.webp",
  events: "/images/marrakech/sevardheter/el-badi-palace.webp",
};

const WHY = [
  { icon: "🕌", text: "Lose yourself in a UNESCO-listed medina — the labyrinthine souks, Koutoubia minaret and hidden riads make one of the world's great living old cities." },
  { icon: "🍽️", text: "Feast on tagines, mechoui lamb, pastilla and mint tea, from a few-dirham street stall on Jemaa el-Fnaa to a candlelit palace banquet." },
  { icon: "🏜️", text: "Ride a camel in the Palmeraie, trek the High Atlas, chase Ourika's waterfalls or watch the sun set over the Agafay Desert — all day-trip close." },
  { icon: "☀️", text: "Enjoy sunshine almost year-round, snow-capped Atlas views, rose-gold ramparts and rooftop sundowners at the gateway to the Sahara." },
];

const ATTRACTION_PREVIEW = [
  { name: "Jemaa el-Fnaa", blurb: "The medina's electric main square — snake charmers by day, food stalls and drummers by night.", image: "/images/marrakech/sevardheter/djemaa-el-fna.webp" },
  { name: "Bahia Palace", blurb: "A dazzling 19th-century palace of tiled courtyards and painted cedar ceilings.", image: "/images/marrakech/sevardheter/bahia-palatset.webp" },
  { name: "Jardin Majorelle", blurb: "A dreamlike cobalt-blue garden saved by Yves Saint Laurent.", image: "/images/marrakech/sevardheter/jardin-majorelle.webp" },
];
const EAT_PREVIEW = [
  { name: "Nomad", blurb: "Modern Moroccan cooking on a chic rooftop over the spice square.", image: "/images/marrakech/restaurants/restaurant-marrakech.avif" },
  { name: "Dar Yacout", blurb: "A theatrical multi-course palace feast in a candlelit riad.", image: "/images/marrakech/restaurants/restaurant-marrakech.avif" },
  { name: "Chez Lamine", blurb: "Legendary pit-roasted mechoui lamb, carved by weight and eaten by hand.", image: "/images/marrakech/restaurants/restaurant-marrakech.avif" },
];
const BEACH_PREVIEW = [
  { name: "Essaouira", blurb: "A breezy Atlantic port with a walled medina, windsurfing and fresh seafood.", image: "/images/marrakech/beaches/beach-bar-marrakech.webp" },
  { name: "Taghazout", blurb: "Morocco's boho surf capital, with mellow point breaks and surf camps.", image: "/images/marrakech/beaches/beach-sunset-marrakech.webp" },
  { name: "Oualidia", blurb: "A calm crescent lagoon famed for safe swimming and fresh oysters.", image: "/images/marrakech/beaches/costa-brava-marrakech.webp" },
];

const NEARBY = [
  { city: "Essaouira", href: "/essaouira" },
  { city: "Fez", href: "/fez" },
  { city: "Casablanca", href: "/casablanca" },
  { city: "Agadir", href: "/agadir" },
];

const FAQ: FaqItem[] = [
  {
    q: "How much are flights to Marrakech?",
    a: `Round-trip fares to Marrakech start from around ${usdStr(LOWEST_SEK)} in the low season (January and November), rising to roughly $500 during the spring peak (March–May). Marrakech is a major low-cost hub, so booking six to eight weeks ahead and flying midweek gets the best prices.`,
  },
  {
    q: "When is the best time to visit Marrakech?",
    a: "Spring (March–May) and autumn (September–October) are ideal: warm, sunny days in the mid-20s to low-30s°C without the brutal summer heat. Summer tops 38–42°C, so plan a pool and coastal escapes, while winter days are mild for sightseeing but the nights turn cold.",
  },
  {
    q: "Which airport does Marrakech use?",
    a: "Marrakech Menara Airport (RAK) sits just 6 km south-west of the centre — about a 15-minute drive to the medina. A petit taxi costs roughly 70–100 MAD (insist on the meter or agree the fare first), the L19 airport bus runs to Jemaa el-Fnaa for around 30 MAD, and pre-booked riad transfers meet you and guide you the last stretch on foot.",
  },
  {
    q: "Do I need to book Marrakech's attractions in advance?",
    a: "Only a few. The Jardin Majorelle uses timed tickets that are worth buying online, and top palace-restaurants like Dar Yacout and Le Tobsil need reserving. Most palaces (Bahia, El Badi, Saadian Tombs) cost just 50–70 MAD cash at the door, and the souks, medina and Jemaa el-Fnaa are free.",
  },
  {
    q: "Is Marrakech walkable, or do I need transport?",
    a: "The car-free medina is best explored on foot — expect to get lost, which is half the fun. Beige petit taxis are cheap for hops to the new town (insist on the meter, ~20–40 MAD), calèches offer scenic rides round the ramparts, and grands taxis or tours reach the Atlas, valleys and coast.",
  },
];

export function generateMetadata(): Metadata {
  const year = new Date().getFullYear();
  const title = clampTitle(`Cheap Flights to Marrakech ${year} — Guide, Prices & Attractions | Flyamba`);
  const description = clampDescription(`Find cheap flights to Marrakech, Morocco from ${usdStr(LOWEST_SEK)}. Compare fares, plus complete English guides to attractions, restaurants, riads, transport, weather, shopping, beaches, nightlife, family travel and Atlas day trips.`);
  const canonical = `${SITE}/marrakech`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website", images: [CITY.hero] },
    twitter: { card: "summary_large_image", images: [CITY.hero] },
  };
}

function jsonLd() {
  const url = `${SITE}/marrakech`;
  const touristDestination = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Marrakech",
    description: CITY.tagline,
    geo: { "@type": "GeoCoordinates", latitude: 31.6295, longitude: -7.9811 },
    touristType: ["City Break", "Culture", "History", "Food", "Markets & Shopping"],
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

export default function MarrakechHub() {
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
        <SmartImage src={CITY.hero} alt="Cheap flights to Marrakech, Morocco" fill fetchPriority="high" loading="eager" sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 lg:px-8">
          {/* Trail added with the schema: this page emitted a BreadcrumbList
              while showing no breadcrumb at all. */}
          <div className="mb-4">
            <Breadcrumbs onDark items={crumbsForSlug("marrakech")} />
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
            <span className="text-base">{CITY.countryFlag}</span>
            <span>{CITY.country}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 tracking-[0.2em] backdrop-blur">{CITY.iata}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 backdrop-blur">{CITY.summerTemp}°C summer</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold text-white sm:text-7xl">Cheap Flights to Marrakech</h1>
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
          <span>Direct from London, Paris &amp; Madrid</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="inline-flex items-center gap-1"><Plane className="h-4 w-4 text-accent" /> {CITY.iata}</span>
        </div>
      </section>

      {/* Sticky in-page sub-nav */}
      <div className="mt-8">
        <CitySubNav citySlug="marrakech" categories={CATEGORIES} active="" />
      </div>

      {/* 3. Flight search widget */}
      <section id="flights" className="mx-auto mt-10 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <h2 className="mb-3 font-serif text-2xl font-semibold text-foreground sm:text-3xl">Find the Best Flights to Marrakech</h2>
        <p className="mb-6 max-w-3xl text-muted-foreground">Flying to Marrakech has never been easier, with cheap nonstop routes from London, Paris, Madrid, Brussels and dozens of other European cities on carriers like Ryanair, easyJet, Wizz Air and Transavia, plus one-stop connections from New York and the wider US via Casablanca or a European hub. Find cheap flights to Marrakech, compare airlines and book direct. Our AI flight search compares hundreds of routes to find you the cheapest fares to Marrakech (RAK) — just describe your trip and Flyamba does the rest.</p>
        <AviasalesWidget toName={CITY.tpName} />
      </section>

      {/* 4. Booking insights */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Booking insights</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Smart tips for booking Marrakech</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarClock, label: "Best time to book", value: "6–8 weeks ahead" },
            { icon: TrendingDown, label: "Cheapest month", value: `${cheapestLabel} (${usdStr(cheapest.sek)} avg)` },
            { icon: CalendarDays, label: "Cheapest day to fly", value: "Tuesday & Wednesday" },
            { icon: Route, label: "Direct flights", value: "Yes — from London, Paris, Madrid" },
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Explore Marrakech</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {guideCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/marrakech/${c.slug}`}
              className="group relative h-[180px] overflow-hidden rounded-3xl border border-border"
            >
              <SmartImage src={CATEGORY_IMG[c.slug] ?? CITY.hero} alt={`Marrakech ${c.label}`} fill sizes="(max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">When is it cheapest to fly to Marrakech?</h2>
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Flights to Marrakech from {NON_STOP.length} cities</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NON_STOP.map((r) => (
            <div key={r.city} className="flex items-center justify-between rounded-3xl border border-border bg-card p-6">
              <div>
                <p className="font-serif text-lg font-semibold text-foreground">{r.city}</p>
                <p className="text-xs text-muted-foreground">{r.iata} → RAK · {r.note ?? "nonstop"}</p>
              </div>
              <p className="font-serif text-2xl text-accent">${r.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Why Marrakech */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Why Marrakech?</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Why Fly to Marrakech with Flyamba?</h2>
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
        <AskAiWidget destination="Marrakech" />
      </section>

      {/* 10. Preview sections */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Top attractions</h2>
          <Link href="/marrakech/attractions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All attractions <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={ATTRACTION_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Where to eat</h2>
          <Link href="/marrakech/restaurants" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All restaurants <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={EAT_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Beaches near Marrakech</h2>
          <Link href="/marrakech/beaches" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All beaches <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={BEACH_PREVIEW} />
      </section>

      {/* CTA */}
      <section className="mx-auto mt-16 max-w-4xl px-4 sm:px-6 lg:px-8">
        <FlightCTA destination={{ slug: "marrakech", name: "Marrakech" }} priceFrom={usdStr(LOWEST_SEK)} />
      </section>

      {/* 11. Nearby cities */}
      <section id="nearby" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Nearby</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Fly onward from Marrakech</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {NEARBY.map((n) => (
            <Link key={n.city} href={n.href} className="group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 transition hover:-translate-y-0.5 hover:border-accent">
              <span className="text-sm font-semibold text-foreground">Flights to {n.city}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </section>

      <FaqSection items={FAQ} city="Marrakech" />


      {/* 12. SEO footer links */}
      <section className="mx-auto mt-16 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Marrakech guides</p>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
          {guideCategories.map((c) => (
            <Link key={c.slug} href={`/marrakech/${c.slug}`} className="text-muted-foreground transition hover:text-accent">
              Marrakech {c.label.toLowerCase()} →
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
