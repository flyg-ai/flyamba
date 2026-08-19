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
import { BALI, CATEGORIES } from "@/app/data/bali-places";
import { SITE } from "@/app/lib/destination-helpers";
import { clampDescription, clampTitle } from "@/app/lib/seo";
import { usd5 } from "@/app/lib/format";
import { ArrowRight, Plane, CalendarClock, TrendingDown, CalendarDays, Route } from "lucide-react";

const HERO = "/images/destinations/flights-bali.avif";
const usdMonths = BALI.monthlyPrices.map((m) => ({ month: m.month, price: usd5(m.price) }));
const MIN_USD = Math.min(...usdMonths.map((m) => m.price));
const MAX_USD = Math.max(...usdMonths.map((m) => m.price));

export function generateMetadata(): Metadata {
  const year = new Date().getFullYear();
  const title = clampTitle(`Cheap Flights to Bali ${year} — Guide, Prices & Attractions | Flyamba`);
  const description = clampDescription(`Find cheap flights to Bali, Indonesia from $${MIN_USD}, plus complete English guides to attractions, beaches, restaurants, hotels, transport, weather, shopping, nightlife, family travel and day trips. Rice terraces, clifftop temples and Indian Ocean surf.`);
  const canonical = `${SITE}/bali`;
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
    q: "How much are flights to Bali?",
    a: `Round-trip fares to Bali's Ngurah Rai / Denpasar airport (DPS) start from around $${MIN_USD} and average roughly $${MAX_USD} in peak season. February is the cheapest month to fly, while July and August (peak dry season) are the most expensive.`,
  },
  {
    q: "Do I need a visa for Bali?",
    a: "Most nationalities can get a Visa on Arrival at Ngurah Rai Airport (DPS) for about $35 (500,000 IDR), valid for 30 days and extendable once. You can also apply for an e-VOA online before you travel. Your passport needs at least six months' validity.",
  },
  {
    q: "When is the best time to visit Bali?",
    a: "April to October is the dry season — the best time for beaches, temples and hiking, with June to September the driest. November to March is the wetter season but still warm, greener and cheaper, with short afternoon downpours rather than all-day rain.",
  },
  {
    q: "How many days do you need in Bali?",
    a: "At least seven days for a first taste: a couple of nights on the beaches of Seminyak or Nusa Dua, three in Ubud for temples, rice fields and a cooking class, and two in Amed or Sidemen for snorkelling and calm. Add Mount Batur, Nusa Penida or the north and you'll want 10–14 days.",
  },
];

function jsonLd() {
  const url = `${SITE}/bali`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Indonesia" },
      { "@type": "ListItem", position: 3, name: "Bali", item: url },
    ],
  };
  const touristDestination = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Bali",
    description: BALI.tagline,
    touristType: ["Beach", "Culture", "Nature", "Wellness"],
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

// ── Static data (USD) ────────────────────────────────────────────────────────
const NON_STOP = [
  { city: "Singapore", price: 95, iata: "SIN" },
  { city: "Kuala Lumpur", price: 85, iata: "KUL" },
  { city: "Perth", price: 185, iata: "PER" },
  { city: "Hong Kong", price: 215, iata: "HKG" },
  { city: "Sydney", price: 265, iata: "SYD" },
  { city: "Doha", price: 445, iata: "DOH" },
];

const CATEGORY_IMAGES: Record<string, string> = {
  attractions: "/images/bali/attractions/tanah-lot.webp",
  beaches: "/images/bali/beaches/barceloneta-bali.webp",
  restaurants: "/images/bali/restaurants/restaurant-bali.avif",
  hotels: "/images/bali/hotels/hotel-bali.avif",
  transport: "/images/bali/attractions/kuta.webp",
  prices: "/images/bali/attractions/tegallalang.webp",
  weather: "/images/bali/attractions/campuhan-ridge-walk.webp",
  shopping: "/images/bali/shopping/artisan-shop-bali.webp",
  nightlife: "/images/bali/nightlife/cocktail-bar-bali.webp",
  "with-kids": "/images/bali/with-kids/aquarium-bali.webp",
  "day-trips": "/images/bali/day-trips/costa-brava-landscape-bali.webp",
  events: "/images/bali/attractions/uluwatu.webp",
};

const ATTRACTION_PREVIEW = [
  { name: "Uluwatu Temple", blurb: "A clifftop temple 70m above the sea, with the sunset Kecak fire dance.", image: "/images/bali/attractions/uluwatu.webp" },
  { name: "Tegallalang Rice Terraces", blurb: "Bali's iconic green staircases carved by the ancient subak system.", image: "/images/bali/attractions/tegallalang.webp" },
  { name: "Mount Batur", blurb: "A pre-dawn hike up an active volcano for sunrise over the caldera.", image: "/images/bali/attractions/mount-batur.webp" },
];
const EAT_PREVIEW = [
  { name: "Locavore", blurb: "Ubud's acclaimed farm-to-table tasting-menu destination.", image: "/images/bali/restaurants/restaurant-bali.avif" },
  { name: "Ibu Oka", blurb: "The island's most famous babi guling (roast suckling pig).", image: "/images/bali/restaurants/restaurant-bali.avif" },
  { name: "Potato Head", blurb: "Iconic Seminyak beach club built from 6,600 recycled shutters.", image: "/images/bali/restaurants/restaurant-bali.avif" },
];
const TRIP_PREVIEW = [
  { name: "Nusa Penida", blurb: "The T-Rex-shaped Kelingking cliff, 45 minutes by boat.", image: "/images/bali/day-trips/girona-bali.webp" },
  { name: "The Gili Islands", blurb: "Car-free islands of white sand and turtle snorkelling.", image: "/images/bali/day-trips/gili-oarna.webp" },
  { name: "Sidemen Valley", blurb: "Unspoilt rice terraces beneath Mount Agung.", image: "/images/bali/day-trips/montserrat-bali.webp" },
];

const WHY = [
  { icon: "🛕", text: "A living Hindu culture — clifftop and lakeside temples, daily offerings, and the mesmerising sunset Kecak fire dance at Uluwatu." },
  { icon: "🌾", text: "Emerald rice terraces and volcanoes — the UNESCO-listed subak paddies of Tegallalang and Jatiluwih, and a sunrise trek up Mount Batur." },
  { icon: "🏄", text: "World-class beaches and surf — from beginner waves at Kuta to Seminyak's sunset beach clubs and the coves of the Bukit Peninsula." },
  { icon: "💆", text: "Exceptional value and wellness — Ubud is Asia's yoga capital, and your money stretches further here than almost anywhere in the region." },
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

export default function BaliHub() {
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
        <SmartImage src={HERO} alt="Cheap flights to Bali, Indonesia" fill fetchPriority="high" loading="eager" sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
            <span className="text-base">{BALI.countryFlag}</span>
            <span>{BALI.country}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 tracking-[0.2em] backdrop-blur">{BALI.iata}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 backdrop-blur">{BALI.summerTemp}°C tropical</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold text-white sm:text-7xl">Cheap Flights to Bali</h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">{BALI.tagline}</p>
        </div>
      </section>

      {/* 2. Flight stats bar */}
      <section className="relative z-10 mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-border bg-card px-6 py-4 text-sm font-medium text-foreground shadow-elegant">
          <span>from <span className="font-serif text-lg text-accent">${MIN_USD}</span></span>
          <span className="text-muted-foreground/40">•</span>
          <span>1-stop from Europe & the US via Asia</span>
          <span className="text-muted-foreground/40">•</span>
          <span>~2.5h from Singapore · non-stop from Australia</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="inline-flex items-center gap-1"><Plane className="h-4 w-4 text-accent" /> {BALI.iata}</span>
        </div>
      </section>

      {/* Sticky sub-nav */}
      <div className="mt-8">
        <CitySubNav citySlug="bali" categories={CATEGORIES} active="" />
      </div>

      {/* 3. Flight search widget */}
      <section id="flights" className="mx-auto mt-10 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <h2 className="mb-3 font-serif text-2xl font-semibold text-foreground sm:text-3xl">Find the Best Flights to Bali</h2>
        <p className="mb-6 max-w-3xl text-muted-foreground">Flying to Bali is easier than ever, with direct routes from New York, London and other major hubs — making Bali one of the most popular flight destinations from the US, UK and Europe. Find cheap flights to Bali, compare airlines and book direct. Our AI flight search compares hundreds of routes to find you the cheapest flights to Bali — just describe your trip and Flyamba does the rest.</p>
        <AviasalesWidget toName={BALI.tpName} />
        <LowFareCta slug="bali" city="Bali" />
      </section>

      {/* 4. Booking insights */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Booking insights</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Smart tips for booking Bali</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarClock, label: "Best time to book", value: "10–14 weeks ahead" },
            { icon: TrendingDown, label: "Cheapest month", value: `February ($${MIN_USD} avg)` },
            { icon: CalendarDays, label: "Cheapest day to fly", value: "Monday & Tuesday" },
            { icon: Route, label: "Best connections", value: "Via Singapore, Doha or Dubai" },
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Explore Bali</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/bali/${c.slug}`}
              className="group relative h-[180px] overflow-hidden rounded-3xl border border-border"
            >
              <SmartImage src={CATEGORY_IMAGES[c.slug] ?? HERO} alt={`Bali ${c.label}`} fill sizes="(max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">When is it cheapest to fly to Bali?</h2>
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

      {/* 7. Non-stop / connecting cities (USD) */}
      <section id="nonstop" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Direct routes</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Fly to Bali from major hubs</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NON_STOP.map((r) => (
            <div key={r.city} className="flex items-center justify-between rounded-3xl border border-border bg-card p-6">
              <div>
                <p className="font-serif text-lg font-semibold text-foreground">{r.city}</p>
                <p className="text-xs text-muted-foreground">{r.iata} → DPS</p>
              </div>
              <p className="font-serif text-2xl text-accent">${r.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Why Bali */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Why Bali?</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Why Fly to Bali with Flyamba?</h2>
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
        <AskAiWidget destination="Bali" />
      </section>

      {/* 10. Preview sections */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Top attractions</h2>
          <Link href="/bali/attractions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All attractions <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={ATTRACTION_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Where to eat</h2>
          <Link href="/bali/restaurants" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All restaurants <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={EAT_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Best day trips</h2>
          <Link href="/bali/day-trips" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All day trips <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={TRIP_PREVIEW} />
      </section>

      {/* 11. Nearby cities */}
      <section id="nearby" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Nearby</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Fly onward from Bali</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {BALI.nearby.map((n) => (
            <Link key={n.city} href={n.href} className="group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 transition hover:-translate-y-0.5 hover:border-accent">
              <span className="text-sm font-semibold text-foreground">Flights to {n.city}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </section>

      <FaqSection items={FAQS} city="Bali" />


      <GuidesCarousel


        guides={getGuidesByDestination("bali").slice(0, 3)}


        title="Latest Bali guides"


      />



      {/* 12. SEO footer links */}
      <section className="mx-auto mt-16 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Bali guides</p>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.slug} href={`/bali/${c.slug}`} className="text-muted-foreground transition hover:text-accent">
              Bali {c.label.toLowerCase()} →
            </Link>
          ))}
          {BALI.nearby.map((n) => (
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
