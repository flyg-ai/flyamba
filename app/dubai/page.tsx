import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { AviasalesWidget } from "@/app/components/AviasalesWidget";
import { AskAiWidget } from "@/app/components/AskAiWidget";
import { FlightCTA } from "@/app/components/FlightCTA";
import { SmartImage } from "@/app/components/SmartImage";
import { CitySubNav } from "@/app/components/CitySubNav";
import { SITE } from "@/app/lib/destination-helpers";
import { clampDescription, clampTitle } from "@/app/lib/seo";
import { usd5, usdStr } from "@/app/lib/format";
import { DUBAI, CATEGORIES } from "@/app/data/dubai-places";
import { ArrowRight, Plane, CalendarClock, TrendingDown, CalendarDays, Route } from "lucide-react";

// ── City facts (self-contained) ──────────────────────────────────────────────
const HERO = "/images/destinations/flights-dubai.avif";

// Monthly average round-trip fares seeded in SEK (from DUBAI.monthlyPrices);
// displayed in USD via usd5().
const MONTHLY = DUBAI.monthlyPrices;
const LOWEST_SEK = Math.min(...MONTHLY.map((m) => m.price));

// DXB is one of the world's great aviation hubs, with nonstop service worldwide.
const NON_STOP = [
  { city: "London", price: 430, iata: "LHR" },
  { city: "Paris", price: 470, iata: "CDG" },
  { city: "Singapore", price: 390, iata: "SIN" },
  { city: "Tokyo", price: 620, iata: "HND" },
  { city: "New York", price: 720, iata: "JFK" },
  { city: "Sydney", price: 780, iata: "SYD" },
];

const CATEGORY_IMG: Record<string, string> = {
  attractions: "/images/dubai/attractions/burj-khalifa.webp",
  restaurants: "/images/dubai/restaurants/nobu-dubai.webp",
  hotels: "/images/dubai/hotels/burj-al-arab.webp",
  transport: "/images/dubai/attractions/dubai-marina.webp",
  prices: "/images/dubai/attractions/gold-souk.webp",
  weather: "/images/dubai/attractions/desert-safari.webp",
  shopping: "/images/dubai/shopping/dubai-mall.webp",
  beaches: "/images/dubai/beaches/jbr-beach.webp",
  nightlife: "/images/dubai/nightlife/white-dubai.webp",
  "with-kids": "/images/dubai/with-kids/aquaventure-waterpark.webp",
  "day-trips": "/images/dubai/day-trips/abu-dhabi.webp",
  events: "/images/dubai/attractions/global-village.webp",
};

const WHY = [
  { icon: "🏙️", text: "Marvel at the record-breaking skyline — the world's tallest building, the Palm Jumeirah, the giant Ain Dubai wheel and a fountain show that plays free every evening." },
  { icon: "🏖️", text: "Combine city and sea: long free public beaches at JBR, Kite Beach and Jumeirah, warm Gulf water and stylish beach clubs, all with a Burj Al Arab view." },
  { icon: "🏜️", text: "Head into the desert for dune-bashing, camel rides and a starlit BBQ, or escape to the Hajar Mountains, Abu Dhabi's grand mosque and the fjords of Musandam." },
  { icon: "🍽️", text: "Eat across the whole world for any budget — $3 shawarmas and legendary curry houses, gold-leaf fine dining and Dubai's famous free-flowing weekend brunches." },
];

const ATTRACTION_PREVIEW = [
  { name: "Burj Khalifa & Dubai Mall", blurb: "The world's tallest building above the world's largest mall and the free Fountain show.", image: "/images/dubai/attractions/burj-khalifa.webp" },
  { name: "Palm Jumeirah", blurb: "The famous palm-shaped island, crowned by the Atlantis resorts.", image: "/images/dubai/attractions/palm-jumeirah.webp" },
  { name: "Museum of the Future", blurb: "A calligraphy-wrapped silver ring of immersive tomorrow-gazing.", image: "/images/dubai/attractions/museum-of-the-future.webp" },
];
const EAT_PREVIEW = [
  { name: "Nobu Dubai", blurb: "World-class Japanese-Peruvian fusion with Palm Jumeirah views.", image: "/images/dubai/restaurants/nobu-dubai.webp" },
  { name: "Zuma Dubai", blurb: "The glamorous modern-Japanese izakaya of the DIFC financial district.", image: "/images/dubai/restaurants/zuma.webp" },
  { name: "Al Ustad Special Kabab", blurb: "A legendary, cheap Iranian kebab house going since 1978.", image: "/images/dubai/restaurants/al-ustad-special-kabab.webp" },
];
const BEACH_PREVIEW = [
  { name: "JBR Beach", blurb: "Dubai's liveliest free beach, backed by The Walk's restaurants and watersports.", image: "/images/dubai/beaches/jbr-beach.webp" },
  { name: "Kite Beach", blurb: "The sporty beach for kitesurfing, volleyball and food trucks, with a Burj Al Arab view.", image: "/images/dubai/beaches/kite-beach.webp" },
  { name: "Sunset Beach", blurb: "The best spot for that iconic Burj Al Arab photo — and Dubai's surf beach.", image: "/images/dubai/beaches/sunset-beach-umm-suqeim.webp" },
];

const NEARBY = DUBAI.nearby;

const FAQ = [
  {
    q: "How much are flights to Dubai?",
    a: `Round-trip fares to Dubai start from around ${usdStr(LOWEST_SEK)} in the summer low season (June–August), when the extreme heat keeps demand and prices down. Fares rise through the pleasant winter high season and peak around Christmas and New Year. Booking six to eight weeks ahead and flying midweek gets the best prices.`,
  },
  {
    q: "When is the best time to visit Dubai?",
    a: "November to March is ideal: warm, sunny 24–28°C days, low humidity and cool evenings, perfect for beaches, the desert and sightseeing. Summer (June–September) is brutally hot at 40°C+ but the cheapest time to visit, best spent in air-conditioned malls, indoor parks and hotel pools.",
  },
  {
    q: "Which airport does Dubai use?",
    a: "Dubai International (DXB) is the main airport and the world's busiest for international passengers, just 5 km from the centre and served directly by the Metro Red Line (about $2.50 to Downtown) as well as taxis and ride-hailing. A few budget airlines use the far-flung Al Maktoum (DWC) in the south.",
  },
  {
    q: "Is Dubai expensive to visit?",
    a: "It can be, but it doesn't have to be. Use the cheap Metro and abra, eat at the superb, inexpensive curry houses and shawarma stands of Bur Dubai and Deira, and enjoy the free beaches, souks and Fountain shows, and Dubai is very affordable. Luxury hotels, beach clubs, brunches and alcohol are where costs climb fast.",
  },
  {
    q: "Do I need to book Dubai's attractions in advance?",
    a: "Yes for the big timed-entry sights — the Burj Khalifa and especially the Museum of the Future sell out days or weeks ahead, so book online as soon as your dates are set. Many of Dubai's best experiences, including the souks, the public beaches and the nightly Dubai Fountain show, are completely free.",
  },
];

export function generateMetadata(): Metadata {
  const year = new Date().getFullYear();
  const title = clampTitle(`Cheap Flights to Dubai ${year} — Guide, Prices & Attractions | Flyamba`);
  const description = clampDescription(`Find cheap flights to Dubai, UAE from ${usdStr(LOWEST_SEK)}. Compare fares, plus complete English guides to attractions, restaurants, hotels, transport, weather, shopping, beaches, nightlife, family travel and day trips.`);
  const canonical = `${SITE}/dubai`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website", images: [HERO] },
    twitter: { card: "summary_large_image", images: [HERO] },
  };
}

function jsonLd() {
  const url = `${SITE}/dubai`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "United Arab Emirates" },
      { "@type": "ListItem", position: 3, name: "Dubai", item: url },
    ],
  };
  const touristDestination = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Dubai",
    description: DUBAI.tagline,
    geo: { "@type": "GeoCoordinates", latitude: 25.2048, longitude: 55.2708 },
    touristType: ["City Break", "Beaches", "Luxury", "Shopping", "Desert & Adventure", "Family"],
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
  return [breadcrumb, touristDestination, faqPage];
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

export default function DubaiHub() {
  const guideCategories = CATEGORIES.filter((c) => c.slug);
  const usdMonths = MONTHLY.map((m) => ({ month: m.month, price: usd5(m.price) }));
  const min = Math.min(...usdMonths.map((m) => m.price));
  const max = Math.max(...usdMonths.map((m) => m.price));
  const cheapest = MONTHLY.reduce((a, b) => (b.price < a.price ? b : a));
  const cheapestLabel = { Jan: "January", Feb: "February", Mar: "March", Apr: "April", May: "May", Jun: "June", Jul: "July", Aug: "August", Sep: "September", Oct: "October", Nov: "November", Dec: "December" }[cheapest.month];

  return (
    <div className="min-h-screen bg-background">
      {jsonLd().map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s).replace(/</g, "\\u003c") }} />
      ))}
      <Navbar transparent />

      {/* 1. Hero */}
      <section className="relative isolate h-[80vh] min-h-[560px] w-full overflow-hidden">
        <SmartImage src={HERO} alt="Cheap flights to Dubai, United Arab Emirates" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
            <span className="text-base">{DUBAI.countryFlag}</span>
            <span>{DUBAI.country}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 tracking-[0.2em] backdrop-blur">{DUBAI.iata}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 backdrop-blur">{DUBAI.summerTemp}°C summer</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold text-white sm:text-7xl">Cheap Flights to Dubai</h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">{DUBAI.tagline}</p>
        </div>
      </section>

      {/* 2. Flight stats bar */}
      <section className="relative z-10 mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-border bg-card px-6 py-4 text-sm font-medium text-foreground shadow-elegant">
          <span>from <span className="font-serif text-lg text-accent">{usdStr(LOWEST_SEK)}</span></span>
          <span className="text-muted-foreground/40">•</span>
          <span>Global hub — nonstop worldwide</span>
          <span className="text-muted-foreground/40">•</span>
          <span>Direct from New York, London &amp; Singapore</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="inline-flex items-center gap-1"><Plane className="h-4 w-4 text-accent" /> {DUBAI.iata}</span>
        </div>
      </section>

      {/* Sticky in-page sub-nav */}
      <div className="mt-8">
        <CitySubNav citySlug="dubai" categories={CATEGORIES} active="" />
      </div>

      {/* 3. Flight search widget */}
      <section id="flights" className="mx-auto mt-10 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <h2 className="mb-3 font-serif text-2xl font-semibold text-foreground sm:text-3xl">Find the Best Flights to Dubai</h2>
        <p className="mb-6 max-w-3xl text-muted-foreground">Dubai International (DXB) is one of the world's great aviation hubs, with nonstop flights from New York, London, Paris, Singapore, Tokyo, Sydney and dozens more cities — making Dubai one of the easiest long-haul destinations to reach from anywhere. Find cheap flights to Dubai, compare airlines and book direct. Our AI flight search compares hundreds of routes to find you the cheapest flights to Dubai — just describe your trip and Flyamba does the rest.</p>
        <AviasalesWidget toName={DUBAI.tpName} />
      </section>

      {/* 4. Booking insights */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Booking insights</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Smart tips for booking Dubai</h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">Dubai's price pattern is the reverse of most sun destinations: the cheapest fares come in the fierce heat of summer, which is its low season, while the glorious winter and the Christmas–New Year period are dearest.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarClock, label: "Best time to book", value: "6–8 weeks ahead" },
            { icon: TrendingDown, label: "Cheapest month", value: `${cheapestLabel} (${usdStr(cheapest.price)} avg)` },
            { icon: CalendarDays, label: "Cheapest day to fly", value: "Tuesday & Wednesday" },
            { icon: Route, label: "Direct flights", value: "Yes — a global hub, nonstop worldwide" },
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Explore Dubai</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {guideCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/dubai/${c.slug}`}
              className="group relative h-[180px] overflow-hidden rounded-3xl border border-border"
            >
              <SmartImage src={CATEGORY_IMG[c.slug] ?? HERO} alt={`Dubai ${c.label}`} fill sizes="(max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">When is it cheapest to fly to Dubai?</h2>
        <p className="mt-2 text-sm text-muted-foreground">Average round-trip fare, USD. Note that summer is cheapest — it is Dubai's low season because of the heat.</p>
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Non-stop to Dubai from {NON_STOP.length} major cities</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NON_STOP.map((r) => (
            <div key={r.city} className="flex items-center justify-between rounded-3xl border border-border bg-card p-6">
              <div>
                <p className="font-serif text-lg font-semibold text-foreground">{r.city}</p>
                <p className="text-xs text-muted-foreground">{r.iata} → DXB · nonstop</p>
              </div>
              <p className="font-serif text-2xl text-accent">${r.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Why Dubai */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Why Dubai?</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Why Fly to Dubai with Flyamba?</h2>
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
        <AskAiWidget destination="Dubai" />
      </section>

      {/* 10. Preview sections */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Top attractions</h2>
          <Link href="/dubai/attractions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All attractions <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={ATTRACTION_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Where to eat</h2>
          <Link href="/dubai/restaurants" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All restaurants <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={EAT_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Best beaches</h2>
          <Link href="/dubai/beaches" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All beaches <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={BEACH_PREVIEW} />
      </section>

      {/* CTA */}
      <section className="mx-auto mt-16 max-w-4xl px-4 sm:px-6 lg:px-8">
        <FlightCTA />
      </section>

      {/* 11. Nearby cities */}
      <section id="nearby" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Nearby</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Fly onward from Dubai</h2>
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
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Dubai guides</p>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
          {guideCategories.map((c) => (
            <Link key={c.slug} href={`/dubai/${c.slug}`} className="text-muted-foreground transition hover:text-accent">
              Dubai {c.label.toLowerCase()} →
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
