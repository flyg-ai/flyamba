import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDestination } from "@/app/data/destinations";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { AviasalesWidget } from "@/app/components/AviasalesWidget";
import { AskAiWidget } from "@/app/components/AskAiWidget";
import { FlightCTA } from "@/app/components/FlightCTA";
import { BARCELONA_SUBPAGES, barcelonaHref } from "@/app/lib/barcelona";
import { SITE, airlineNames, lowestPriceStr } from "@/app/lib/destination-helpers";
import { usd5, usdStr } from "@/app/lib/format";
import { ArrowRight, Plane, CalendarClock, TrendingDown, CalendarDays, Route } from "lucide-react";

const d = getDestination("barcelona")!;

export function generateMetadata(): Metadata {
  const year = new Date().getFullYear();
  const title = `Cheap Flights to Barcelona ${year} — Guide, Prices & Attractions | Flyamba`;
  const description = `Find cheap flights to Barcelona, Spain from ${lowestPriceStr(d)}. Compare prices from ${airlineNames(d)
    .slice(0, 3)
    .join(", ")}, plus complete English guides to attractions, restaurants, hotels, transport, weather, shopping, beaches, nightlife, family travel and day trips.`;
  const canonical = `${SITE}/barcelona`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website", images: [d.image] },
    twitter: { card: "summary_large_image", images: [d.image] },
  };
}

// ── JSON-LD ────────────────────────────────────────────────────────────────
function jsonLd() {
  const url = `${SITE}/barcelona`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Spain" },
      { "@type": "ListItem", position: 3, name: "Barcelona", item: url },
    ],
  };
  const touristDestination = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Barcelona",
    description: d.tagline,
    geo: d.coordinates ? { "@type": "GeoCoordinates", latitude: d.coordinates.lat, longitude: d.coordinates.lng } : undefined,
    touristType: ["Beach & Sun", "City Break", "Culture"],
    url,
  };
  return [breadcrumb, touristDestination];
}

// ── Static preview + non-stop data (USD) ───────────────────────────────────
const NON_STOP = [
  { city: "London", price: 89, iata: "LHR" },
  { city: "Paris", price: 145, iata: "CDG" },
  { city: "New York", price: 489, iata: "JFK" },
  { city: "Chicago", price: 534, iata: "ORD" },
  { city: "Miami", price: 567, iata: "MIA" },
  { city: "Los Angeles", price: 612, iata: "LAX" },
];

const ATTRACTION_PREVIEW = [
  { name: "Sagrada Família", blurb: "Gaudí's unfinished basilica — Barcelona's defining landmark.", image: "https://images.unsplash.com/photo-1583779457094-ab6f8be4a1c8?w=800" },
  { name: "Park Güell", blurb: "Mosaic terraces and gingerbread gatehouses with city views.", image: "https://images.unsplash.com/photo-1509840841025-9088ba78a826?w=800" },
  { name: "Gothic Quarter", blurb: "Medieval lanes, hidden squares and Roman remains.", image: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800" },
];
const EAT_PREVIEW = [
  { name: "Bar Cañete", blurb: "Buzzing marble-counter tapas in El Raval.", image: "https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=800" },
  { name: "La Boqueria", blurb: "The famous market's tucked-away seafood bars.", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800" },
  { name: "Can Solé", blurb: "Century-old paella and seafood in Barceloneta.", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800" },
];
const BEACH_PREVIEW = [
  { name: "Barceloneta", blurb: "The city's most central, liveliest beach.", image: "https://images.unsplash.com/photo-1591792063115-a3e10eaa6a4b?w=800" },
  { name: "Bogatell", blurb: "Wide, calmer and popular with locals.", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800" },
  { name: "Sitges", blurb: "17 beaches in a charming town, 40 min south.", image: "https://images.unsplash.com/photo-1520454974749-611b7248ffdb?w=800" },
];

const NEARBY = [
  { city: "Madrid", href: "/" },
  { city: "Lisbon", href: "/lisbon" },
  { city: "Rome", href: "/" },
  { city: "Valencia", href: "/" },
  { city: "Ibiza", href: "/" },
];

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

export default function BarcelonaHub() {
  if (!d) notFound();
  const categories = BARCELONA_SUBPAGES.filter((p) => p.slug);
  const months = d.monthlyPrices ?? [];
  const usdMonths = months.map((m) => ({ month: m.month, price: usd5(m.price) }));
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
        <Image src={d.image} alt="Cheap flights to Barcelona, Spain" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
            <span className="text-base">{d.countryFlag}</span>
            <span>{d.country}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 tracking-[0.2em] backdrop-blur">{d.iata}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 backdrop-blur">{d.summerTemp}°C summer</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold text-white sm:text-7xl">Cheap Flights to Barcelona</h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">{d.tagline}</p>
        </div>
      </section>

      {/* 2. Flight stats bar */}
      <section className="mx-auto -mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-3xl border border-border bg-card px-6 py-4 text-sm font-medium text-foreground shadow-elegant">
          <span>from <span className="font-serif text-lg text-accent">{usdStr(d.price)}</span></span>
          <span className="text-muted-foreground/40">•</span>
          <span>{d.flightTime}</span>
          <span className="text-muted-foreground/40">•</span>
          <span>Direct flights available</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="inline-flex items-center gap-1"><Plane className="h-4 w-4 text-accent" /> {d.iata}</span>
        </div>
      </section>

      {/* 3. Flight search widget */}
      <section id="flight-search" className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <AviasalesWidget toName={d.tpName || ""} />
      </section>

      {/* 4. Booking insights */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Booking insights</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Smart tips for booking Barcelona</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarClock, label: "Best time to book", value: "6–8 weeks ahead" },
            { icon: TrendingDown, label: "Cheapest month", value: "February ($128 avg)" },
            { icon: CalendarDays, label: "Cheapest day to fly", value: "Tuesday & Wednesday" },
            { icon: Route, label: "Direct flights", value: "Yes — from New York, London, Paris" },
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
      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Complete guide</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Explore Barcelona</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {categories.map((c) => (
            <Link key={c.slug} href={barcelonaHref(c.slug)} className="group relative block h-[180px] overflow-hidden rounded-3xl border border-border">
              <Image src={c.image} alt={`Barcelona ${c.label}`} fill sizes="(max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 text-white">
                <span className="font-serif text-xl font-semibold">{c.label}</span>
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Price by month (USD) */}
      {usdMonths.length > 0 && (
        <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Prices by month</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">When is it cheapest to fly to Barcelona?</h2>
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
      )}

      {/* 7. Non-stop cities (USD) */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Direct routes</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Non-stop to Barcelona from {NON_STOP.length} cities</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NON_STOP.map((r) => (
            <div key={r.city} className="flex items-center justify-between rounded-3xl border border-border bg-card p-6">
              <div>
                <p className="font-serif text-lg font-semibold text-foreground">{r.city}</p>
                <p className="text-xs text-muted-foreground">{r.iata} → BCN · direct</p>
              </div>
              <p className="font-serif text-2xl text-accent">${r.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Why Barcelona */}
      {d.whyVisit && (
        <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Why Barcelona?</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">A city worth the flight</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {d.whyVisit.map((w) => (
              <div key={w.text} className="rounded-3xl border border-border bg-card p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-xl" aria-hidden>{w.icon}</span>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 9. AI chat */}
      <section className="mx-auto mt-16 max-w-4xl px-4 sm:px-6 lg:px-8">
        <AskAiWidget destination="Barcelona" />
      </section>

      {/* 10. Preview sections */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Top attractions</h2>
          <Link href="/barcelona/attractions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All attractions <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={ATTRACTION_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Where to eat</h2>
          <Link href="/barcelona/restaurants" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All restaurants <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={EAT_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Best beaches</h2>
          <Link href="/barcelona/beaches" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All beaches <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={BEACH_PREVIEW} />
      </section>

      {/* CTA */}
      <section className="mx-auto mt-16 max-w-4xl px-4 sm:px-6 lg:px-8">
        <FlightCTA />
      </section>

      {/* 11. Nearby European cities */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Nearby</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Fly onward from Barcelona</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
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
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Barcelona guides</p>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.slug} href={barcelonaHref(c.slug)} className="text-muted-foreground transition hover:text-accent">
              Barcelona {c.label.toLowerCase()} →
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
