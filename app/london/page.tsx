import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { AviasalesWidget } from "@/app/components/AviasalesWidget";
import { AskAiWidget } from "@/app/components/AskAiWidget";
import { CitySubNav } from "@/app/components/CitySubNav";
import { CATEGORIES, ATTRACTIONS, RESTAURANTS } from "@/app/data/london-places";
import { usd, usd5, usdStr } from "@/app/lib/format";
import { ArrowRight, Plane, CalendarClock, TrendingDown, CalendarDays, Route, Clock } from "lucide-react";

// ── City constants (self-contained; no shared Destination type) ──────────────
const SITE = "https://flyamba.com";
const CITY = "London";
const IATA = "LHR";
const TP_NAME = "london_gb";
const COUNTRY = "United Kingdom";
const FLAG = "🇬🇧";
const SUMMER_TEMP = 18;
const TAGLINE = "Royal palaces, world-class museums and endless neighbourhoods";
const HERO_IMAGE = "/images/destinations/flights-london.avif";
const FLIGHT_TIME = "7h 20m from New York";

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTHLY_SEK = [3100, 2900, 3200, 3500, 3800, 4100, 4400, 4200, 3700, 3300, 2900, 3100];

const NON_STOP = [
  { city: "New York", price: 420, iata: "JFK" },
  { city: "Los Angeles", price: 560, iata: "LAX" },
  { city: "Dubai", price: 410, iata: "DXB" },
  { city: "Singapore", price: 680, iata: "SIN" },
  { city: "Paris", price: 95, iata: "CDG" },
  { city: "Amsterdam", price: 90, iata: "AMS" },
  { city: "Dublin", price: 70, iata: "DUB" },
  { city: "Toronto", price: 460, iata: "YYZ" },
];

const NEARBY = [
  { city: "Paris", href: "/paris" },
  { city: "Amsterdam", href: "/amsterdam" },
  { city: "Dublin", href: "/dublin" },
  { city: "Edinburgh", href: "/edinburgh" },
];

const WHY = [
  { icon: "🎭", text: "Unrivalled culture — world-class free museums, more than 240 theatres and centuries of history around every corner." },
  { icon: "👑", text: "Living royal heritage — palaces, the Crown Jewels at the Tower and free pageantry like the Changing of the Guard." },
  { icon: "🌍", text: "Every cuisine on earth — from cheap global street food to more Michelin stars than any other UK city." },
  { icon: "🚇", text: "Effortless to explore — an iconic Tube network and walkable neighbourhoods, each with its own distinct character." },
];

// Category card grid: pair each sub-nav category with an image + blurb.
const CATEGORY_META: Record<string, { image: string; blurb: string }> = {
  attractions: { image: "/images/london/sevardheter/tower-bridge.webp", blurb: "The Tower, museums, palaces and the best views." },
  restaurants: { image: "/images/london/restauranger/dishoom.webp", blurb: "From Dishoom to three-Michelin-star tables." },
  hotels: { image: "/images/london/hotell/the-savoy.webp", blurb: "Where to stay, from grand dames to budget gems." },
  transport: { image: "/images/content/photo-1544620347-c4fd4a3d5957.avif", blurb: "The Tube, buses, Oyster, taxis and airport links." },
  prices: { image: "/images/content/photo-1579621970563-ebec7560ff3e.avif", blurb: "Daily budgets, food, hotels and entry fees." },
  weather: { image: "/images/content/photo-1504386106331-3e4e71712b38.avif", blurb: "Month-by-month climate and the best time to visit." },
  shopping: { image: "/images/london/shopping/harrods.webp", blurb: "Harrods, Oxford Street, markets and the Lanes." },
  nightlife: { image: "/images/london/nattliv/sky-garden.webp", blurb: "Pubs, cocktail bars, clubs and rooftop views." },
  "with-kids": { image: "/images/london/med-barn/london-zoo.webp", blurb: "Museums, the zoo and Harry Potter for families." },
  "day-trips": { image: "/images/london/dagsutflykter/windsor-castle.webp", blurb: "Windsor, Oxford, Bath, Stonehenge and Brighton." },
  events: { image: "/images/content/photo-1533174072545-7a4b6ad7a6c3.avif", blurb: "Festivals and events month by month." },
};

// ── Derived pricing ──────────────────────────────────────────────────────────
const usdMonths = MONTHLY_SEK.map((sek, i) => ({ month: MONTH_LABELS[i], price: usd5(sek) }));
const minUsd5 = Math.min(...usdMonths.map((m) => m.price));
const maxUsd5 = Math.max(...usdMonths.map((m) => m.price));
const fromPrice = Math.min(...MONTHLY_SEK.map((s) => usd(s)));
const cheapestIdx = MONTHLY_SEK.indexOf(Math.min(...MONTHLY_SEK));
const cheapestMonthName = MONTH_NAMES[cheapestIdx];
const cheapestMonthUsd = usd(MONTHLY_SEK[cheapestIdx]);
const dearestIdx = MONTHLY_SEK.indexOf(Math.max(...MONTHLY_SEK));
const dearestMonthName = MONTH_NAMES[dearestIdx];

const FAQS = [
  {
    q: "How much are flights to London?",
    a: `Round-trip fares to London (Heathrow, LHR) start from around ${usdStr(MONTHLY_SEK[cheapestIdx])} in the low season and average higher in summer. From the US East Coast, expect roughly $400–$600 return; from within Europe, nonstop fares can dip below $100.`,
  },
  {
    q: "When is the cheapest time to fly to London?",
    a: `${cheapestMonthName} and November are typically the cheapest months to fly to London, while ${dearestMonthName} and the summer holidays are the most expensive. Booking one to three months ahead and flying midweek (Tuesday or Wednesday) usually secures the best fares.`,
  },
  {
    q: "Which London airport should I fly into?",
    a: "London has six airports. Heathrow (LHR) is the largest and best connected to the centre via the Elizabeth line, Piccadilly line and Heathrow Express. Gatwick (LGW), Stansted (STN) and Luton (LTN) mostly serve budget and European airlines, while London City (LCY) is closest to the centre for short-haul business routes.",
  },
  {
    q: "How many days do you need in London?",
    a: "Three to four days covers the essential sights — the Tower of London, Westminster, the British Museum, a South Bank walk and a couple of neighbourhoods. Five days or more lets you add day trips like Windsor or Oxford and explore areas such as Greenwich, Notting Hill and Shoreditch at a relaxed pace.",
  },
  {
    q: "Is London expensive to visit?",
    a: "London is one of Europe's pricier capitals for hotels and dining, but it's easy to save: most of the world-class museums and galleries are free, an Oyster or contactless card caps daily Tube spending, and markets and pubs offer good-value meals. Budget travellers can manage on around $90–$120 a day excluding accommodation.",
  },
];

export function generateMetadata(): Metadata {
  const year = new Date().getFullYear();
  const title = `Cheap Flights to London ${year} — Guide, Prices & Attractions | Flyamba`;
  const description = `Find cheap flights to London, United Kingdom from ${usdStr(MONTHLY_SEK[cheapestIdx])}. Compare fares to Heathrow (LHR), plus complete English guides to attractions, restaurants, hotels, transport, weather, shopping, nightlife, family travel and day trips.`;
  const canonical = `${SITE}/london`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website", images: [HERO_IMAGE] },
    twitter: { card: "summary_large_image", images: [HERO_IMAGE] },
  };
}

function jsonLd() {
  const url = `${SITE}/london`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "United Kingdom" },
      { "@type": "ListItem", position: 3, name: "London", item: url },
    ],
  };
  const touristDestination = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "London",
    description: TAGLINE,
    geo: { "@type": "GeoCoordinates", latitude: 51.5074, longitude: -0.1278 },
    touristType: ["City Break", "Culture", "History", "Family"],
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
  return [breadcrumb, touristDestination, faqPage];
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

export default function LondonHub() {
  const categories = CATEGORIES.filter((c) => c.slug);
  const attractionPreview = ATTRACTIONS.slice(0, 3).map((a) => ({ name: a.name, blurb: a.description, image: a.image }));
  const eatPreview = RESTAURANTS.slice(0, 3).map((r) => ({ name: r.name, blurb: r.description, image: r.image }));

  return (
    <div className="min-h-screen bg-background">
      {jsonLd().map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s).replace(/</g, "\\u003c") }} />
      ))}
      <Navbar transparent />

      {/* 1. Hero */}
      <section className="relative isolate h-[80vh] min-h-[560px] w-full overflow-hidden">
        <Image src={HERO_IMAGE} alt="Cheap flights to London, United Kingdom" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
            <span className="text-base">{FLAG}</span>
            <span>{COUNTRY}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 tracking-[0.2em] backdrop-blur">{IATA}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 backdrop-blur">{SUMMER_TEMP}°C summer</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold text-white sm:text-7xl">Cheap Flights to London</h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">{TAGLINE}</p>
        </div>
      </section>

      {/* 2. Flight stats bar */}
      <section className="relative z-10 mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-border bg-card px-6 py-4 text-sm font-medium text-foreground shadow-elegant">
          <span>from <span className="font-serif text-lg text-accent">${fromPrice}</span></span>
          <span className="text-muted-foreground/40">•</span>
          <span>{FLIGHT_TIME}</span>
          <span className="text-muted-foreground/40">•</span>
          <span>Nonstop flights worldwide</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="inline-flex items-center gap-1"><Plane className="h-4 w-4 text-accent" /> {IATA}</span>
        </div>
      </section>

      {/* Sticky in-page sub-nav */}
      <div className="mt-8">
        <CitySubNav citySlug="london" categories={CATEGORIES} active="" />
      </div>

      {/* 3. Flight search widget */}
      <section id="flights" className="mx-auto mt-10 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <AviasalesWidget toName={TP_NAME} />
      </section>

      {/* 4. Booking insights */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Booking insights</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Smart tips for booking London</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarClock, label: "Best time to book", value: "1–3 months ahead" },
            { icon: TrendingDown, label: "Cheapest month", value: `${cheapestMonthName} (~$${cheapestMonthUsd} avg)` },
            { icon: CalendarDays, label: "Cheapest day to fly", value: "Tuesday & Wednesday" },
            { icon: Route, label: "Direct flights", value: "Yes — from New York, LA, Dubai & more" },
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Explore London</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => {
            const meta = CATEGORY_META[c.slug];
            if (!meta) return null;
            return (
              <Link key={c.slug} href={`/london/${c.slug}`} className="group overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-elegant">
                <div className="relative h-44 overflow-hidden">
                  <Image src={meta.image} alt={c.label} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-sm">{c.emoji}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold text-foreground">London {c.label.toLowerCase()}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{meta.blurb}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 6. Price by month (USD) */}
      <section id="cheapest-months" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Prices by month</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">When is it cheapest to fly to London?</h2>
        <p className="mt-2 text-sm text-muted-foreground">Average round-trip fare, USD.</p>
        <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card p-6">
          <div className="flex h-56 items-end gap-2">
            {usdMonths.map((m) => {
              const ratio = (m.price - minUsd5) / (maxUsd5 - minUsd5 || 1);
              const h = Math.round(16 + ratio * 152);
              const isMin = m.price === minUsd5;
              const isMax = m.price === maxUsd5;
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Non-stop to London from {NON_STOP.length}+ cities</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NON_STOP.map((r) => (
            <div key={r.city} className="flex items-center justify-between rounded-3xl border border-border bg-card p-6">
              <div>
                <p className="font-serif text-lg font-semibold text-foreground">{r.city}</p>
                <p className="text-xs text-muted-foreground">{r.iata} → {IATA} · nonstop</p>
              </div>
              <p className="font-serif text-2xl text-accent">${r.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Why London */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Why London?</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">A city worth the flight</h2>
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
        <AskAiWidget destination="London" />
      </section>

      {/* 10. Preview sections */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Top attractions</h2>
          <Link href="/london/attractions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All attractions <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={attractionPreview} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Where to eat</h2>
          <Link href="/london/restaurants" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All restaurants <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={eatPreview} />
      </section>

      {/* 11. Nearby cities */}
      <section id="nearby" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Nearby</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Fly onward from London</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {NEARBY.map((n) => (
            <Link key={n.city} href={n.href} className="group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 transition hover:-translate-y-0.5 hover:border-accent">
              <span className="text-sm font-semibold text-foreground">Flights to {n.city}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </section>

      {/* 12. SEO footer links */}
      <section className="mx-auto mt-16 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">London guides</p>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.slug} href={`/london/${c.slug}`} className="text-muted-foreground transition hover:text-accent">
              London {c.label.toLowerCase()} →
            </Link>
          ))}
          {NEARBY.map((n) => (
            <Link key={n.city} href={n.href} className="text-muted-foreground transition hover:text-accent">
              Flights to {n.city} →
            </Link>
          ))}
        </div>
        <p className="mt-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground"><Clock className="h-3.5 w-3.5" /> Prices are indicative round-trip fares and refresh with live search.</p>
      </section>

      <Footer />
    </div>
  );
}
