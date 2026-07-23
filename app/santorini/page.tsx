import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { AviasalesWidget } from "@/app/components/AviasalesWidget";
import { AskAiWidget } from "@/app/components/AskAiWidget";
import { CitySubNav } from "@/app/components/CitySubNav";
import { SITE } from "@/app/lib/destination-helpers";
import { SANTORINI, MONTHS, SANTORINI_CATEGORIES } from "@/app/lib/santorini";
import { ATTRACTIONS, RESTAURANTS, BEACHES } from "@/app/data/santorini-places";
import { ArrowRight, Plane, CalendarClock, TrendingDown, CalendarDays, Route } from "lucide-react";

const d = SANTORINI;
const URL = `${SITE}/santorini`;

// Cheapest non-null month (winter fares are null and excluded).
const priced = d.monthlyUsd
  .map((price, i) => ({ month: MONTHS[i], price }))
  .filter((m): m is { month: string; price: number } => m.price != null);
const cheapest = priced.reduce((a, b) => (b.price < a.price ? b : a), priced[0]);
const minPrice = Math.min(...priced.map((m) => m.price));
const maxPrice = Math.max(...priced.map((m) => m.price));

export function generateMetadata(): Metadata {
  const year = new Date().getFullYear();
  const title = `Cheap Flights to Santorini ${year} — Guide, Prices & Sunsets | Flyamba`;
  const description = `Find cheap flights to Santorini, Greece from $${minPrice} round-trip. Compare seasonal fares to Thira (JTR), plus complete English guides to Oia, the caldera, restaurants, cave hotels, beaches, nightlife, wineries and island day trips.`;
  return {
    title,
    description,
    alternates: { canonical: URL },
    openGraph: { title, description, url: URL, type: "website", images: [d.image] },
    twitter: { card: "summary_large_image", images: [d.image] },
  };
}

function jsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Greece" },
      { "@type": "ListItem", position: 3, name: "Santorini", item: URL },
    ],
  };
  const touristDestination = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Santorini",
    description: d.tagline,
    geo: { "@type": "GeoCoordinates", latitude: 36.4128, longitude: 25.4322 },
    touristType: ["Romance & Honeymoon", "Beach & Sun", "Scenery", "Food & Wine"],
    url: URL,
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "When is it cheapest to fly to Santorini?",
        acceptedAnswer: { "@type": "Answer", text: `April is the cheapest month to fly to Santorini, with round-trip fares averaging around $${cheapest.price}. Prices climb through the summer, peaking in July and August, before easing again in autumn. Few flights operate in the winter low season.` },
      },
      {
        "@type": "Question",
        name: "Are there direct flights to Santorini?",
        acceptedAnswer: { "@type": "Answer", text: "Santorini (JTR) has many seasonal direct flights from European cities such as London, Paris, Milan, Amsterdam and Rome between roughly April and October, plus year-round domestic connections via Athens. Most long-haul travellers connect through Athens." },
      },
      {
        "@type": "Question",
        name: "How many days do you need in Santorini?",
        acceptedAnswer: { "@type": "Answer", text: "Three to four days is ideal for Santorini — enough to see the Oia sunset, walk the Fira-to-Oia caldera trail, take a volcano or catamaran cruise, visit Akrotiri and the wineries, and enjoy a couple of beaches." },
      },
    ],
  };
  return [breadcrumb, touristDestination, faq];
}

const NON_STOP = [
  { city: "Athens", price: 95, iata: "ATH", note: "year-round" },
  { city: "London", price: 165, iata: "LGW", note: "seasonal" },
  { city: "Milan", price: 140, iata: "MXP", note: "seasonal" },
  { city: "Paris", price: 175, iata: "ORY", note: "seasonal" },
  { city: "Amsterdam", price: 185, iata: "AMS", note: "seasonal" },
  { city: "Rome", price: 130, iata: "FCO", note: "seasonal" },
];

const WHY = [
  { icon: "🌅", text: "The world's most famous sunset — the whole village of Oia turns gold and pink as the sun sinks behind the caldera." },
  { icon: "🏛️", text: "A living volcano and 'Minoan Pompeii' — hike the crater of Nea Kameni and walk the frescoed streets of Akrotiri." },
  { icon: "🍷", text: "Unique volcanic wines — crisp Assyrtiko and sweet Vinsanto from ancient basket-trained vines, tasted on caldera-edge terraces." },
  { icon: "🏖️", text: "Beaches like nowhere else — red, black and white volcanic sand beneath dramatic sculpted cliffs." },
];

const NEARBY = [
  { city: "Mykonos", href: "/mykonos" },
  { city: "Athens", href: "/athens" },
  { city: "Crete", href: "/crete" },
  { city: "Naxos", href: "/naxos" },
];

// Representative image for each category card on the hub grid.
const CAT_IMAGE: Record<string, string> = {
  "": "/images/santorini/sevardheter/caldera.webp",
  attractions: "/images/santorini/sevardheter/oia-solnedgang.webp",
  restaurants: "/images/santorini/restauranger/metaxi-mas.webp",
  hotels: "/images/santorini/hotell/canaves-oia.webp",
  transport: "/images/santorini/sevardheter/fira.webp",
  prices: "/images/santorini/sevardheter/oia.webp",
  weather: "/images/santorini/sevardheter/caldera-utsikten.webp",
  shopping: "/images/santorini/shopping/oia-main-street.webp",
  beaches: "/images/santorini/strander/red-beach.webp",
  nightlife: "/images/santorini/nattliv/francos-bar.webp",
  "with-kids": "/images/santorini/med-barn/kamari-strand.webp",
  "day-trips": "/images/santorini/dagsutflykter/thirasia.webp",
  events: "/images/santorini/sevardheter/imerovigli.webp",
};

const ATTRACTION_PREVIEW = ATTRACTIONS.slice(0, 3).map((p) => ({ name: p.name, blurb: p.description, image: p.image }));
const EAT_PREVIEW = RESTAURANTS.slice(0, 3).map((p) => ({ name: p.name, blurb: p.description, image: p.image }));
const BEACH_PREVIEW = BEACHES.slice(0, 3).map((p) => ({ name: p.name, blurb: p.description, image: p.image }));

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
            <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">{it.blurb}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SantoriniHub() {
  const categories = SANTORINI_CATEGORIES;
  const gridCats = categories.filter((c) => c.slug);

  return (
    <div className="min-h-screen bg-background">
      {jsonLd().map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s).replace(/</g, "\\u003c") }} />
      ))}
      <Navbar transparent />

      {/* 1. Hero */}
      <section className="relative isolate h-[80vh] min-h-[560px] w-full overflow-hidden">
        <Image src={d.image} alt="Cheap flights to Santorini, Greece" fill priority sizes="100vw" className="object-cover" />
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
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold text-white sm:text-7xl">Cheap Flights to Santorini</h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">{d.tagline}</p>
        </div>
      </section>

      {/* 2. Flight stats bar */}
      <section className="relative z-10 mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-border bg-card px-6 py-4 text-sm font-medium text-foreground shadow-elegant">
          <span>from <span className="font-serif text-lg text-accent">${minPrice}</span> round-trip</span>
          <span className="text-muted-foreground/40">•</span>
          <span>4h 15m from London</span>
          <span className="text-muted-foreground/40">•</span>
          <span>Seasonal nonstops Apr–Oct</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="inline-flex items-center gap-1"><Plane className="h-4 w-4 text-accent" /> {d.iata}</span>
        </div>
      </section>

      {/* Sticky sub-nav */}
      <div className="mt-8">
        <CitySubNav citySlug="santorini" categories={categories} active="" />
      </div>

      {/* 3. Flight search widget */}
      <section id="flights" className="mx-auto mt-10 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <AviasalesWidget toName={d.tpName} />
      </section>

      {/* 4. Booking insights */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Booking insights</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Smart tips for booking Santorini</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarClock, label: "Best time to book", value: "2–3 months ahead" },
            { icon: TrendingDown, label: "Cheapest month", value: `${cheapest.month} ($${cheapest.price} avg)` },
            { icon: CalendarDays, label: "Best value season", value: "May & October (shoulder)" },
            { icon: Route, label: "Direct flights", value: "Seasonal from London, Paris, Milan" },
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Explore Santorini</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {gridCats.map((c) => (
            <Link key={c.slug} href={`/santorini/${c.slug}`} className="group relative h-[180px] overflow-hidden rounded-3xl border border-border">
              <Image src={CAT_IMAGE[c.slug] ?? d.image} alt={`Santorini ${c.label}`} fill sizes="(max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 text-white">
                <span className="flex items-center gap-2 font-serif text-xl font-semibold"><span aria-hidden>{c.emoji}</span> {c.label}</span>
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Price by month (non-null only) */}
      <section id="cheapest-months" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Prices by month</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">When is it cheapest to fly to Santorini?</h2>
        <p className="mt-2 text-sm text-muted-foreground">Average round-trip fare, USD. Winter months are omitted — very few flights operate to Santorini between November and March.</p>
        <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card p-6">
          <div className="flex h-56 items-end gap-2">
            {priced.map((m) => {
              const ratio = (m.price - minPrice) / (maxPrice - minPrice || 1);
              const h = Math.round(16 + ratio * 152);
              const isMin = m.price === minPrice;
              const isMax = m.price === maxPrice;
              return (
                <div key={m.month} className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
                  <span className={`text-[11px] font-semibold ${isMin ? "text-emerald-600 dark:text-emerald-400" : isMax ? "text-orange-500" : "text-muted-foreground"}`}>${m.price}</span>
                  <div className={`w-full rounded-t-xl ${isMin ? "bg-emerald-500" : isMax ? "bg-orange-500" : "bg-accent/60 group-hover:bg-accent"}`} style={{ height: h }} />
                  <span className="text-[11px] font-semibold text-muted-foreground">{m.month}</span>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Cheapest: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{cheapest.month} (${cheapest.price})</span> · Peak: <span className="font-semibold text-orange-500">July (${maxPrice})</span></p>
        </div>
      </section>

      {/* 7. Non-stop cities */}
      <section id="nonstop" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Direct routes</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Non-stop to Santorini from {NON_STOP.length} cities</h2>
        <p className="mt-2 text-sm text-muted-foreground">Most European nonstops are seasonal (roughly April–October). Long-haul travellers connect via Athens, which flies to Santorini year-round.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NON_STOP.map((r) => (
            <div key={r.city} className="flex items-center justify-between rounded-3xl border border-border bg-card p-6">
              <div>
                <p className="font-serif text-lg font-semibold text-foreground">{r.city}</p>
                <p className="text-xs text-muted-foreground">{r.iata} → JTR · {r.note}</p>
              </div>
              <p className="font-serif text-2xl text-accent">${r.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Why Santorini */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Why Santorini?</p>
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
        <AskAiWidget destination="Santorini" />
      </section>

      {/* 10. Preview sections */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Top attractions</h2>
          <Link href="/santorini/attractions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All attractions <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={ATTRACTION_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Where to eat</h2>
          <Link href="/santorini/restaurants" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All restaurants <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={EAT_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Best beaches</h2>
          <Link href="/santorini/beaches" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All beaches <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={BEACH_PREVIEW} />
      </section>

      {/* 11. Nearby */}
      <section id="nearby" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Nearby</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Island-hop from Santorini</h2>
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
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Santorini guides</p>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
          {gridCats.map((c) => (
            <Link key={c.slug} href={`/santorini/${c.slug}`} className="text-muted-foreground transition hover:text-accent">
              Santorini {c.label.toLowerCase()} →
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
