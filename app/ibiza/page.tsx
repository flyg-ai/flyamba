import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { AviasalesWidget } from "@/app/components/AviasalesWidget";
import { AskAiWidget } from "@/app/components/AskAiWidget";
import { FlightCTA } from "@/app/components/FlightCTA";
import { CitySubNav } from "@/app/components/CitySubNav";
import { SmartImage } from "@/app/components/SmartImage";
import { IBIZA_CATEGORIES, ATTRACTIONS, NIGHTLIFE, BEACHES } from "@/app/data/ibiza-places";
import { SITE } from "@/app/lib/destination-helpers";
import { usd5, usdStr } from "@/app/lib/format";
import { ArrowRight, Plane, CalendarClock, TrendingDown, CalendarDays, Route } from "lucide-react";

// ── Self-contained city facts (Ibiza is not in the rich destinations catalog) ─
const IBIZA = {
  slug: "ibiza",
  name: "Ibiza",
  country: "Spain",
  countryFlag: "🇪🇸",
  iata: "IBZ",
  tpName: "ibiza_es",
  image: "/images/destinations/flights-ibiza.avif",
  tagline: "The White Isle of superclubs and turquoise coves",
  summerTemp: 28,
  coordinates: { lat: 38.9067, lng: 1.4206 },
  // 12-month average round-trip fares in SEK (Jan–Dec). Nulls = winter, when
  // Ibiza has very limited flights. Converted to USD for display.
  monthlyPricesSEK: [null, null, null, 3500, 4200, 5000, 6200, 6000, 5100, 4000, null, null] as (number | null)[],
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Non-null USD monthly prices for the chart + insights.
const USD_MONTHS = IBIZA.monthlyPricesSEK.map((sek, i) => ({
  month: MONTHS[i],
  price: sek == null ? null : usd5(sek),
}));
const NON_NULL = USD_MONTHS.filter((m): m is { month: string; price: number } => m.price != null);
const MIN = Math.min(...NON_NULL.map((m) => m.price));
const MAX = Math.max(...NON_NULL.map((m) => m.price));
const CHEAPEST = NON_NULL.reduce((a, b) => (b.price < a.price ? b : a));
const CHEAPEST_MONTH_FULL: Record<string, string> = { Jan: "January", Feb: "February", Mar: "March", Apr: "April", May: "May", Jun: "June", Jul: "July", Aug: "August", Sep: "September", Oct: "October", Nov: "November", Dec: "December" };
const LOWEST_SEK = Math.min(...IBIZA.monthlyPricesSEK.filter((p): p is number => p != null));

export function generateMetadata(): Metadata {
  const year = new Date().getFullYear();
  const title = `Cheap Flights to Ibiza ${year} — Guide, Beaches, Clubs & Prices | Flyamba`;
  const description = `Find cheap flights to Ibiza, Spain from ${usdStr(LOWEST_SEK)}. Compare live fares, see the month-by-month price calendar, and read complete English guides to Ibiza's beaches, nightlife, restaurants, hotels, attractions, family days out and Formentera day trips.`;
  const canonical = `${SITE}/ibiza`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website", images: [IBIZA.image] },
    twitter: { card: "summary_large_image", images: [IBIZA.image] },
  };
}

// ── JSON-LD ────────────────────────────────────────────────────────────────
function jsonLd() {
  const url = `${SITE}/ibiza`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Spain" },
      { "@type": "ListItem", position: 3, name: "Ibiza", item: url },
    ],
  };
  const touristDestination = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Ibiza",
    description: IBIZA.tagline,
    geo: { "@type": "GeoCoordinates", latitude: IBIZA.coordinates.lat, longitude: IBIZA.coordinates.lng },
    touristType: ["Beach & Sun", "Nightlife", "Island Escape"],
    url,
  };
  return [breadcrumb, touristDestination];
}

// ── Direct routes (USD, indicative one-way seasonal fares) ───────────────────
const NON_STOP = [
  { city: "Barcelona", price: 55, iata: "BCN" },
  { city: "Madrid", price: 65, iata: "MAD" },
  { city: "London", price: 95, iata: "LGW" },
  { city: "Manchester", price: 105, iata: "MAN" },
  { city: "Milan", price: 110, iata: "MXP" },
  { city: "Amsterdam", price: 120, iata: "AMS" },
  { city: "Paris", price: 130, iata: "ORY" },
  { city: "Brussels", price: 115, iata: "BRU" },
];

const WHY_IBIZA = [
  { icon: "🏝️", text: "Turquoise coves and white-sand beaches — from Cala Comte's sunsets to Caribbean-clear Formentera, a short ferry away." },
  { icon: "🌙", text: "The clubbing capital of the world: Pacha, Amnesia, Hï, Ushuaïa and DC-10 headline a summer of the planet's biggest DJs." },
  { icon: "🏛️", text: "Dalt Vila, the UNESCO-listed walled old town, plus salt flats, hippy markets and the mythic rock of Es Vedrà." },
  { icon: "☀️", text: "Long, hot, reliable summers around 28°C, with warm sea and sunshine from May right through to October." },
];

const NEARBY = [
  { city: "Palma", href: "/palma" },
  { city: "Barcelona", href: "/barcelona" },
  { city: "Valencia", href: "/valencia" },
  { city: "Formentera", href: "/formentera" },
];

const ATTRACTION_PREVIEW = ATTRACTIONS.slice(0, 3);
const NIGHTLIFE_PREVIEW = NIGHTLIFE.slice(0, 3);
const BEACH_PREVIEW = BEACHES.slice(0, 3);

function PreviewGrid({ items }: { items: { name: string; description: string; image: string }[] }) {
  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-3">
      {items.map((it) => (
        <div key={it.name} className="group overflow-hidden rounded-3xl border border-border bg-card">
          <div className="relative h-44 overflow-hidden">
            <SmartImage src={it.image} alt={it.name} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
          </div>
          <div className="p-5">
            <h3 className="font-serif text-lg font-semibold text-foreground">{it.name}</h3>
            <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">{it.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function IbizaHub() {
  const gridCategories = IBIZA_CATEGORIES.filter((c) => c.slug);

  return (
    <div className="min-h-screen bg-background">
      {jsonLd().map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s).replace(/</g, "\\u003c") }} />
      ))}
      <Navbar transparent />

      {/* 1. Hero */}
      <section className="relative isolate h-[80vh] min-h-[560px] w-full overflow-hidden">
        <Image src={IBIZA.image} alt="Cheap flights to Ibiza, Spain" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
            <span className="text-base">{IBIZA.countryFlag}</span>
            <span>{IBIZA.country}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 tracking-[0.2em] backdrop-blur">{IBIZA.iata}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 backdrop-blur">{IBIZA.summerTemp}°C summer</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold text-white sm:text-7xl">Cheap Flights to Ibiza</h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">{IBIZA.tagline}</p>
        </div>
      </section>

      {/* 2. Flight stats bar */}
      <section className="relative z-10 mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-border bg-card px-6 py-4 text-sm font-medium text-foreground shadow-elegant">
          <span>from <span className="font-serif text-lg text-accent">{usdStr(LOWEST_SEK)}</span></span>
          <span className="text-muted-foreground/40">•</span>
          <span>2h 05m from Barcelona</span>
          <span className="text-muted-foreground/40">•</span>
          <span>Seasonal nonstop flights across Europe</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="inline-flex items-center gap-1"><Plane className="h-4 w-4 text-accent" /> {IBIZA.iata}</span>
        </div>
      </section>

      {/* Sticky sub-nav */}
      <div className="mt-8">
        <CitySubNav citySlug="ibiza" categories={IBIZA_CATEGORIES} active="" />
      </div>

      {/* 3. Flight search widget */}
      <section id="flights" className="mx-auto mt-10 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <AviasalesWidget toName={IBIZA.tpName} />
      </section>

      {/* 4. Booking insights */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Booking insights</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Smart tips for booking Ibiza</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarClock, label: "Best time to book", value: "8–12 weeks ahead" },
            { icon: TrendingDown, label: "Cheapest month", value: `${CHEAPEST_MONTH_FULL[CHEAPEST.month]} ($${CHEAPEST.price} avg)` },
            { icon: CalendarDays, label: "Cheapest days to fly", value: "Tuesday & Wednesday" },
            { icon: Route, label: "Direct flights", value: "Yes — from London, Barcelona, Madrid, Amsterdam" },
          ].map((s) => (
            <div key={s.label} className="rounded-3xl border border-border bg-card p-6">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/15 text-accent"><s.icon className="h-5 w-5" /></div>
              <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</p>
              <p className="mt-1 font-serif text-lg font-semibold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-3xl text-sm text-muted-foreground">
          Ibiza is a seasonal destination: flights run thick and fast from May to October and thin dramatically over winter, when few
          airlines serve the island. Fares climb steeply into the July–August club season, so travelling in April, May or late September
          means the best prices, warm weather and a calmer island.
        </p>
      </section>

      {/* 5. Category grid → /ibiza/[cat] */}
      <section id="explore" className="mx-auto mt-14 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Complete guide</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Explore Ibiza</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {gridCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/ibiza/${c.slug}`}
              className="group relative h-[180px] overflow-hidden rounded-3xl border border-border"
            >
              <SmartImage src={c.image} alt={`Ibiza ${c.label}`} fill sizes="(max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 text-white">
                <span className="font-serif text-xl font-semibold"><span aria-hidden className="mr-1.5">{c.emoji}</span>{c.label}</span>
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Price by month (USD, null-safe) */}
      <section id="cheapest-months" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Prices by month</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">When is it cheapest to fly to Ibiza?</h2>
        <p className="mt-2 text-sm text-muted-foreground">Average round-trip fare, USD. Winter months (—) have very limited flights to the island.</p>
        <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card p-6">
          <div className="flex h-56 items-end gap-2">
            {USD_MONTHS.map((m) => {
              if (m.price == null) {
                return (
                  <div key={m.month} className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
                    <span className="text-[11px] font-semibold text-muted-foreground/50">—</span>
                    <div className="w-full rounded-t-xl border border-dashed border-border bg-muted/30" style={{ height: 16 }} />
                    <span className="text-[11px] font-semibold text-muted-foreground/60">{m.month}</span>
                  </div>
                );
              }
              const ratio = (m.price - MIN) / (MAX - MIN || 1);
              const h = Math.round(16 + ratio * 152);
              const isMin = m.price === MIN;
              const isMax = m.price === MAX;
              return (
                <div key={m.month} className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
                  <span className={`text-[11px] font-semibold ${isMin ? "text-emerald-600 dark:text-emerald-400" : isMax ? "text-orange-500" : "text-muted-foreground"}`}>${m.price}</span>
                  <div className={`w-full rounded-t-xl ${isMin ? "bg-emerald-500" : isMax ? "bg-orange-500" : "bg-accent/60 group-hover:bg-accent"}`} style={{ height: h }} />
                  <span className="text-[11px] font-semibold text-muted-foreground">{m.month}</span>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            The cheapest flights land in <span className="font-semibold text-foreground">{CHEAPEST_MONTH_FULL[CHEAPEST.month]}</span> (around
            ${CHEAPEST.price}), at the start of the season, while <span className="font-semibold text-foreground">July</span> peaks at about ${MAX}
            {" "}as the clubs open and demand surges. Between November and March, scheduled flights are scarce — many routes simply pause for winter.
          </p>
        </div>
      </section>

      {/* 7. Non-stop cities (USD) */}
      <section id="nonstop" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Direct routes</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Non-stop to Ibiza from {NON_STOP.length} cities</h2>
        <p className="mt-2 text-sm text-muted-foreground">Indicative one-way fares in the summer season; routes are seasonal and busiest June–September.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NON_STOP.map((r) => (
            <div key={r.city} className="flex items-center justify-between rounded-3xl border border-border bg-card p-6">
              <div>
                <p className="font-serif text-lg font-semibold text-foreground">{r.city}</p>
                <p className="text-xs text-muted-foreground">{r.iata} → IBZ · nonstop</p>
              </div>
              <p className="font-serif text-2xl text-accent">${r.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Why Ibiza */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Why Ibiza?</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">An island worth the flight</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_IBIZA.map((w) => (
            <div key={w.text} className="rounded-3xl border border-border bg-card p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-xl" aria-hidden>{w.icon}</span>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. AI chat */}
      <section className="mx-auto mt-16 max-w-4xl px-4 sm:px-6 lg:px-8">
        <AskAiWidget destination="Ibiza" />
      </section>

      {/* 10. Preview sections */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Top attractions</h2>
          <Link href="/ibiza/attractions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All attractions <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={ATTRACTION_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Legendary nightlife</h2>
          <Link href="/ibiza/nightlife" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All clubs &amp; bars <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={NIGHTLIFE_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Best beaches &amp; coves</h2>
          <Link href="/ibiza/beaches" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All beaches <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={BEACH_PREVIEW} />
      </section>

      {/* CTA */}
      <section className="mx-auto mt-16 max-w-4xl px-4 sm:px-6 lg:px-8">
        <FlightCTA />
      </section>

      {/* 11. Nearby */}
      <section id="nearby" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Nearby</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Fly onward from Ibiza</h2>
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
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Ibiza guides</p>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
          {gridCategories.map((c) => (
            <Link key={c.slug} href={`/ibiza/${c.slug}`} className="text-muted-foreground transition hover:text-accent">
              Ibiza {c.label.toLowerCase()} →
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
