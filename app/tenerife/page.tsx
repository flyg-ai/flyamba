import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { AviasalesWidget } from "@/app/components/AviasalesWidget";
import { AskAiWidget } from "@/app/components/AskAiWidget";
import { CitySubNav } from "@/app/components/CitySubNav";
import { SmartImage } from "@/app/components/SmartImage";
import { CATEGORIES } from "@/app/data/tenerife-places";
import { SITE } from "@/app/lib/destination-helpers";
import { usd5 } from "@/app/lib/format";
import { ArrowRight, Plane, CalendarClock, TrendingDown, CalendarDays, Route } from "lucide-react";

// ── Self-contained Tenerife facts (USD audience) ─────────────────────────────
const HERO = "/images/destinations/flights-teneriffa.avif";
const IATA = "TFS";
const TP_NAME = "teneriffa_es";
const TAGLINE = "Volcanic peaks and year-round sunshine in the Canaries";
const FROM_PRICE = 89; // USD, typical nonstop from London/Manchester
const FLIGHT_TIME = "4h 30m from London";
const MONTHLY_SEK = [3800, 3500, 3800, 4100, 4500, 4900, 5300, 5100, 4600, 4200, 3700, 3900];
const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const NON_STOP = [
  { city: "London", price: 89, iata: "LGW" },
  { city: "Manchester", price: 95, iata: "MAN" },
  { city: "Madrid", price: 69, iata: "MAD" },
  { city: "Berlin", price: 110, iata: "BER" },
  { city: "Paris", price: 99, iata: "CDG" },
  { city: "Dublin", price: 105, iata: "DUB" },
];

const NEARBY = [
  { city: "Gran Canaria", href: "/gran-canaria" },
  { city: "Lanzarote", href: "/lanzarote" },
  { city: "Madrid", href: "/madrid" },
  { city: "Marrakech", href: "/marrakech" },
];

const WHY = [
  { icon: "🌋", text: "Mount Teide, Spain's highest peak at 3,715 m, crowns a UNESCO national park you reach by cable car above the clouds." },
  { icon: "☀️", text: "Warm year-round — the 'island of eternal spring' averages around 26°C with reliable sunshine in every season." },
  { icon: "🏖️", text: "Golden and black-sand beaches, from family-friendly El Duque to wild, volcanic Benijo in the Anaga mountains." },
  { icon: "👨‍👩‍👧", text: "Siam Park and Loro Parque are repeatedly rated among the very best water and animal parks in the world." },
];

const ATTRACTION_PREVIEW = [
  { name: "Mount Teide", blurb: "Ride the cable car up Spain's highest peak.", image: "/images/tenerife/sevardheter/pico-del-teide.webp", href: "/tenerife/attractions" },
  { name: "Siam Park", blurb: "The world's top-rated water park in Costa Adeje.", image: "/images/tenerife/sevardheter/siam-park.webp", href: "/tenerife/attractions" },
  { name: "Masca Village", blurb: "A cliff-clinging hamlet deep in the Teno mountains.", image: "/images/tenerife/sevardheter/masca.webp", href: "/tenerife/attractions" },
];
const EAT_PREVIEW = [
  { name: "El Rincón de Juan Carlos", blurb: "Two Michelin stars of inventive Canarian cuisine.", image: "/images/barcelona/placeholder.webp", href: "/tenerife/restaurants" },
  { name: "Casa Tomás", blurb: "Legendary ribs and papas at a rustic country tavern.", image: "/images/barcelona/placeholder.webp", href: "/tenerife/restaurants" },
  { name: "Tasca El Callejón", blurb: "Creative Canarian tapas in the capital.", image: "/images/barcelona/placeholder.webp", href: "/tenerife/restaurants" },
];
const BEACH_PREVIEW = [
  { name: "Playa de las Teresitas", blurb: "Golden Saharan sand and calm water near the capital.", image: "/images/tenerife/strander/playa-de-las-teresitas.webp", href: "/tenerife/beaches" },
  { name: "Playa del Duque", blurb: "Costa Adeje's smartest golden-sand beach.", image: "/images/tenerife/strander/playa-del-duque.webp", href: "/tenerife/beaches" },
  { name: "Playa de Benijo", blurb: "Wild black sand and sea stacks in Anaga.", image: "/images/tenerife/strander/playa-de-benijo.webp", href: "/tenerife/beaches" },
];

const FAQS = [
  {
    q: "When is the cheapest time to fly to Tenerife?",
    a: "Fares are lowest in the shoulder months of late spring and autumn, with February also cheap outside the Carnival dates. Winter (the peak winter-sun season) and August are the priciest. Booking 5–7 weeks ahead and flying midweek typically gets the best price.",
  },
  {
    q: "Which airport should I fly into — Tenerife South or North?",
    a: "Tenerife South (TFS) handles most international and holiday flights and is closest to the beach resorts of Costa Adeje, Playa de las Américas and Los Cristianos. Tenerife North (TFN) is better for the capital Santa Cruz, La Laguna and the greener north, and for inter-island flights.",
  },
  {
    q: "Is Tenerife warm all year round?",
    a: "Yes. Tenerife's subtropical climate keeps the southern resorts warm and sunny year-round, averaging around 26°C in summer and a mild 20–22°C even in winter — the most reliable winter-sun beach weather in Europe. The north is cooler and greener, and Mount Teide can be freezing and snow-capped.",
  },
  {
    q: "Do I need a car in Tenerife?",
    a: "Not for a beach-only holiday — the resorts are walkable and served by cheap TITSA buses. But to explore Teide, Masca, Anaga and the north-coast towns at your own pace, a hire car is well worth it, with low daily rates and some of Europe's cheapest fuel.",
  },
  {
    q: "What are the must-see attractions in Tenerife?",
    a: "Mount Teide and its national park, the world-class Siam Park and Loro Parque, the cliff village of Masca, the Los Gigantes cliffs, historic La Laguna and Garachico, and the beaches from golden El Duque to wild Benijo. Whale watching and Teide stargazing are standout experiences.",
  },
];

export function generateMetadata(): Metadata {
  const year = new Date().getFullYear();
  const title = `Cheap Flights to Tenerife ${year} — Guide, Prices & Attractions | Flyamba`;
  const description =
    "Find cheap flights to Tenerife, Spain from $89. Compare fares to Tenerife South (TFS), plus complete English guides to Mount Teide, attractions, restaurants, hotels, transport, weather, shopping, beaches, nightlife, family travel and day trips.";
  const canonical = `${SITE}/tenerife`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website", images: [HERO] },
    twitter: { card: "summary_large_image", images: [HERO] },
  };
}

function jsonLd() {
  const url = `${SITE}/tenerife`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Spain" },
      { "@type": "ListItem", position: 3, name: "Tenerife", item: url },
    ],
  };
  const touristDestination = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Tenerife",
    description: TAGLINE,
    geo: { "@type": "GeoCoordinates", latitude: 28.2916, longitude: -16.6291 },
    touristType: ["Beach & Sun", "Nature", "Family", "Winter Sun"],
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

export default function TenerifeHub() {
  const usdMonths = MONTHLY_SEK.map((sek, i) => ({ month: MONTH_LABELS[i], price: usd5(sek) }));
  const min = Math.min(...usdMonths.map((m) => m.price));
  const max = Math.max(...usdMonths.map((m) => m.price));

  return (
    <div className="min-h-screen bg-background">
      {jsonLd().map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s).replace(/</g, "\\u003c") }} />
      ))}
      <Navbar transparent />

      {/* 1. Hero */}
      <section className="relative isolate h-[80vh] min-h-[560px] w-full overflow-hidden">
        <SmartImage src={HERO} alt="Cheap flights to Tenerife, Spain" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
            <span className="text-base">🇪🇸</span>
            <span>Spain</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 tracking-[0.2em] backdrop-blur">{IATA}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 backdrop-blur">Warm year-round</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold text-white sm:text-7xl">Cheap Flights to Tenerife</h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">{TAGLINE}</p>
        </div>
      </section>

      {/* 2. Flight stats bar */}
      <section className="relative z-10 mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-border bg-card px-6 py-4 text-sm font-medium text-foreground shadow-elegant">
          <span>from <span className="font-serif text-lg text-accent">${FROM_PRICE}</span></span>
          <span className="text-muted-foreground/40">•</span>
          <span>{FLIGHT_TIME}</span>
          <span className="text-muted-foreground/40">•</span>
          <span>Warm year-round</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="inline-flex items-center gap-1"><Plane className="h-4 w-4 text-accent" /> {IATA}</span>
        </div>
      </section>

      {/* Sticky sub-nav */}
      <div className="mt-8">
        <CitySubNav citySlug="tenerife" categories={CATEGORIES} active="" />
      </div>

      {/* 3. Flight search widget */}
      <section id="flights" className="mx-auto mt-10 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <AviasalesWidget toName={TP_NAME} />
      </section>

      {/* 4. Booking insights */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Booking insights</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Smart tips for booking Tenerife</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarClock, label: "Best time to book", value: "5–7 weeks ahead" },
            { icon: TrendingDown, label: "Cheapest month", value: `February ($${min} avg)` },
            { icon: CalendarDays, label: "Cheapest day to fly", value: "Tuesday & Wednesday" },
            { icon: Route, label: "Direct flights", value: "Yes — London, Madrid, Manchester" },
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Explore Tenerife</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {CATEGORIES.filter((c) => c.slug).map((c) => (
            <Link key={c.slug} href={`/tenerife/${c.slug}`} className="group relative h-[180px] overflow-hidden rounded-3xl border border-border">
              <SmartImage src={c.image} alt={`Tenerife ${c.label}`} fill sizes="(max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-xl font-semibold"><span className="mr-1.5" aria-hidden>{c.emoji}</span>{c.label}</span>
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </div>
                <p className="mt-1 text-xs text-white/80">{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Price by month (USD) */}
      <section id="cheapest-months" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Prices by month</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">When is it cheapest to fly to Tenerife?</h2>
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Non-stop to Tenerife from {NON_STOP.length} cities</h2>
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

      {/* 8. Why Tenerife */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Why Tenerife?</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">An island worth the flight</h2>
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
        <AskAiWidget destination="Tenerife" />
      </section>

      {/* 10. Preview sections */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Top attractions</h2>
          <Link href="/tenerife/attractions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All attractions <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={ATTRACTION_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Where to eat</h2>
          <Link href="/tenerife/restaurants" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All restaurants <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={EAT_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Best beaches</h2>
          <Link href="/tenerife/beaches" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All beaches <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={BEACH_PREVIEW} />
      </section>

      {/* 11. FAQ */}
      <section className="mx-auto mt-16 max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Good to know</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Tenerife flight FAQs</h2>
        <div className="mt-8 space-y-4">
          {FAQS.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-border bg-card p-5">
              <summary className="cursor-pointer list-none font-serif text-lg font-semibold text-foreground marker:content-none">{f.q}</summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 12. Nearby */}
      <section id="nearby" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Nearby</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Fly onward from Tenerife</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {NEARBY.map((n) => (
            <Link key={n.city} href={n.href} className="group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 transition hover:-translate-y-0.5 hover:border-accent">
              <span className="text-sm font-semibold text-foreground">Flights to {n.city}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </section>

      {/* 13. SEO footer links */}
      <section className="mx-auto mt-16 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Tenerife guides</p>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.filter((c) => c.slug).map((c) => (
            <Link key={c.slug} href={`/tenerife/${c.slug}`} className="text-muted-foreground transition hover:text-accent">
              Tenerife {c.label.toLowerCase()} →
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
