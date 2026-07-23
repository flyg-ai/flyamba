import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { SmartImage } from "@/app/components/SmartImage";
import { AviasalesWidget } from "@/app/components/AviasalesWidget";
import { AskAiWidget } from "@/app/components/AskAiWidget";
import { CitySubNav } from "@/app/components/CitySubNav";
import { CATEGORIES } from "@/app/data/athens-places";
import { SITE } from "@/app/lib/destination-helpers";
import { usd5 } from "@/app/lib/format";
import { ArrowRight, Plane, CalendarClock, TrendingDown, CalendarDays, Route } from "lucide-react";

const CITY = {
  name: "Athens",
  country: "Greece",
  flag: "🇬🇷",
  iata: "ATH",
  summerTemp: 32,
  tagline: "The cradle of civilization by the Aegean",
  hero: "/images/destinations/flights-athens.avif",
  heroFallback: "/images/athens/sevardheter/akropolis.webp",
};

// SEK monthly averages (round-trip), converted to USD for display via usd5().
const MONTHLY_SEK = [2800, 2600, 2900, 3300, 3800, 4400, 5000, 4800, 4100, 3500, 2900, 3000];
const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const USD_MONTHS = MONTHLY_SEK.map((sek, i) => ({ month: MONTH_LABELS[i], price: usd5(sek) }));
const LOW = Math.min(...USD_MONTHS.map((m) => m.price));
const HIGH = Math.max(...USD_MONTHS.map((m) => m.price));

const NON_STOP = [
  { city: "London", price: 95, iata: "LHR" },
  { city: "Rome", price: 72, iata: "FCO" },
  { city: "Paris", price: 110, iata: "CDG" },
  { city: "Istanbul", price: 85, iata: "IST" },
  { city: "Dubai", price: 260, iata: "DXB" },
  { city: "New York", price: 520, iata: "JFK" },
];

const ATTRACTION_PREVIEW = [
  { name: "Acropolis & Parthenon", blurb: "The sacred citadel crowned by the Parthenon — the defining monument of Western civilization.", image: "/images/athens/sevardheter/akropolis.webp" },
  { name: "Acropolis Museum", blurb: "A luminous modern museum displaying the Acropolis' original sculptures over ancient ruins.", image: "/images/athens/sevardheter/akropolismuseet.webp" },
  { name: "Plaka", blurb: "The oldest neighbourhood — neoclassical lanes and cafés beneath the Acropolis.", image: "/images/athens/sevardheter/plaka.webp" },
];
const EAT_PREVIEW = [
  { name: "Karamanlidika tou Fani", blurb: "Superb Greek charcuterie, cheeses and meze in a buzzing former deli in Psyrri.", image: "/images/content/photo-1414235077428-338989a2e8c0.avif" },
  { name: "Kostas", blurb: "A cult hole-in-the-wall grilling perfect pork souvlaki since 1946.", image: "/images/content/photo-1414235077428-338989a2e8c0.avif" },
  { name: "Spondi", blurb: "The city's most decorated table — two Michelin stars in leafy Pangrati.", image: "/images/content/photo-1414235077428-338989a2e8c0.avif" },
];
const BEACH_PREVIEW = [
  { name: "Vouliagmeni", blurb: "The Riviera's jewel — a sheltered bay of clear turquoise water backed by pines.", image: "/images/athens/strander/vouliagmeni.webp" },
  { name: "Glyfada", blurb: "The lively, cosmopolitan hub of beach clubs, shops and nightlife.", image: "/images/athens/strander/glyfada.webp" },
  { name: "Lake Vouliagmeni", blurb: "A unique warm, mineral-rich thermal spa lake beneath a sheer cliff.", image: "/images/athens/strander/vouliagmeni-sjo.webp" },
];

const NEARBY = [
  { city: "Santorini", href: "/santorini" },
  { city: "Mykonos", href: "/mykonos" },
  { city: "Rome", href: "/rome" },
  { city: "Istanbul", href: "/istanbul" },
];

const WHY = [
  { icon: "🏛️", text: "Stand where Western civilization began — the Acropolis, the Agora and the world's greatest classical museums, all walkable in a compact centre." },
  { icon: "🍽️", text: "One of Europe's best-value food scenes, from €3 souvlaki and market tavernas to two-Michelin-star tables and world-ranked cocktail bars." },
  { icon: "🏖️", text: "A full Mediterranean coastline on the doorstep — the Athenian Riviera's turquoise beaches are a 40-minute tram or bus ride away." },
  { icon: "⛴️", text: "The perfect gateway: nonstop flights worldwide, plus fast ferries from Piraeus to Santorini, Mykonos and the Saronic isles." },
];

export function generateMetadata(): Metadata {
  const year = new Date().getFullYear();
  const title = `Cheap Flights to Athens ${year} — Guide, Prices & Attractions | Flyamba`;
  const description = `Find cheap flights to Athens, Greece from $${LOW}. Compare fares to ATH, plus complete English guides to the Acropolis, attractions, restaurants, hotels, transport, weather, shopping, the Athenian Riviera beaches, nightlife, family travel and day trips.`;
  const canonical = `${SITE}/athens`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website", images: [CITY.heroFallback] },
    twitter: { card: "summary_large_image", images: [CITY.heroFallback] },
  };
}

function jsonLd() {
  const url = `${SITE}/athens`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Greece" },
      { "@type": "ListItem", position: 3, name: "Athens", item: url },
    ],
  };
  const touristDestination = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Athens",
    description: CITY.tagline,
    geo: { "@type": "GeoCoordinates", latitude: 37.9838, longitude: 23.7275 },
    touristType: ["Culture & History", "City Break", "Beach & Sun"],
    url,
  };
  return [breadcrumb, touristDestination];
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

export default function AthensHub() {
  const gridCategories = CATEGORIES.filter((c) => c.slug); // drop the "Flights" (hub) card

  return (
    <div className="min-h-screen bg-background">
      {jsonLd().map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s).replace(/</g, "\\u003c") }} />
      ))}
      <Navbar transparent />

      {/* 1. Hero */}
      <section className="relative isolate h-[80vh] min-h-[560px] w-full overflow-hidden">
        <SmartImage src={CITY.hero} fallback={CITY.heroFallback} alt="Cheap flights to Athens, Greece" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
            <span className="text-base">{CITY.flag}</span>
            <span>{CITY.country}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 tracking-[0.2em] backdrop-blur">{CITY.iata}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 backdrop-blur">{CITY.summerTemp}°C summer</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold text-white sm:text-7xl">Cheap Flights to Athens</h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">{CITY.tagline}</p>
        </div>
      </section>

      {/* 2. Flight stats bar */}
      <section className="relative z-10 mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-border bg-card px-6 py-4 text-sm font-medium text-foreground shadow-elegant">
          <span>from <span className="font-serif text-lg text-accent">${LOW}</span></span>
          <span className="text-muted-foreground/40">•</span>
          <span>~3h30 from London · ~10h from New York</span>
          <span className="text-muted-foreground/40">•</span>
          <span>Nonstop flights worldwide</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="inline-flex items-center gap-1"><Plane className="h-4 w-4 text-accent" /> {CITY.iata}</span>
        </div>
      </section>

      {/* Sticky sub-nav */}
      <div className="mt-8">
        <CitySubNav citySlug="athens" categories={CATEGORIES} active="" />
      </div>

      {/* 3. Flight search widget */}
      <section id="flights" className="mx-auto mt-10 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <AviasalesWidget toName="aten_gr" />
      </section>

      {/* 4. Booking insights */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Booking insights</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Smart tips for booking Athens</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarClock, label: "Best time to book", value: "6–8 weeks ahead" },
            { icon: TrendingDown, label: "Cheapest month", value: `February ($${LOW} avg)` },
            { icon: CalendarDays, label: "Cheapest day to fly", value: "Tuesday & Wednesday" },
            { icon: Route, label: "Direct flights", value: "Yes — from New York, London, Rome" },
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Explore Athens</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {gridCategories.map((c) => (
            <Link key={c.slug} href={`/athens/${c.slug}`} className="group relative h-[180px] overflow-hidden rounded-3xl border border-border">
              <SmartImage src={c.image} alt={`Athens ${c.label}`} fill sizes="(max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 text-white">
                <span className="flex items-center gap-2 font-serif text-xl font-semibold"><span aria-hidden>{c.emoji}</span> {c.label}</span>
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Price by month */}
      <section id="cheapest-months" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Prices by month</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">When is it cheapest to fly to Athens?</h2>
        <p className="mt-2 text-sm text-muted-foreground">Average round-trip fare, USD.</p>
        <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card p-6">
          <div className="flex h-56 items-end gap-2">
            {USD_MONTHS.map((m) => {
              const ratio = (m.price - LOW) / (HIGH - LOW || 1);
              const h = Math.round(16 + ratio * 152);
              const isMin = m.price === LOW;
              const isMax = m.price === HIGH;
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

      {/* 7. Non-stop cities */}
      <section id="nonstop" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Direct routes</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Non-stop to Athens from {NON_STOP.length} cities</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NON_STOP.map((r) => (
            <div key={r.city} className="flex items-center justify-between rounded-3xl border border-border bg-card p-6">
              <div>
                <p className="font-serif text-lg font-semibold text-foreground">{r.city}</p>
                <p className="text-xs text-muted-foreground">{r.iata} → ATH · nonstop</p>
              </div>
              <p className="font-serif text-2xl text-accent">${r.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Why Athens */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Why Athens?</p>
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
        <AskAiWidget destination="Athens" />
      </section>

      {/* 10. Preview sections */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Top attractions</h2>
          <Link href="/athens/attractions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All attractions <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={ATTRACTION_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Where to eat</h2>
          <Link href="/athens/restaurants" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All restaurants <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={EAT_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Best beaches</h2>
          <Link href="/athens/beaches" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All beaches <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={BEACH_PREVIEW} />
      </section>

      {/* 11. Nearby */}
      <section id="nearby" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Nearby</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Fly onward from Athens</h2>
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
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Athens guides</p>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
          {gridCategories.map((c) => (
            <Link key={c.slug} href={`/athens/${c.slug}`} className="text-muted-foreground transition hover:text-accent">
              Athens {c.label.toLowerCase()} →
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
