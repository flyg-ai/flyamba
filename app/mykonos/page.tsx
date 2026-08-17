import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { FaqSection, type FaqItem } from "@/app/components/FaqSection";
import { SmartImage } from "@/app/components/SmartImage";
import { AviasalesWidget } from "@/app/components/AviasalesWidget";
import { AskAiWidget } from "@/app/components/AskAiWidget";
import { CitySubNav } from "@/app/components/CitySubNav";
import { MYKONOS, CATEGORIES } from "@/app/data/mykonos-places";
import { SITE } from "@/app/lib/destination-helpers";
import { clampDescription, clampTitle } from "@/app/lib/seo";
import { usd5 } from "@/app/lib/format";
import { ArrowRight, Plane, CalendarClock, TrendingDown, CalendarDays, Route } from "lucide-react";

const HERO = "/images/destinations/flights-mykonos.avif";
const usdMonths = MYKONOS.monthlyPrices.map((m) => ({ month: m.month, price: usd5(m.price) }));
const MIN_USD = Math.min(...usdMonths.map((m) => m.price));
const MAX_USD = Math.max(...usdMonths.map((m) => m.price));

export function generateMetadata(): Metadata {
  const year = new Date().getFullYear();
  const title = clampTitle(`Cheap Flights to Mykonos ${year} — Guide, Prices & Attractions | Flyamba`);
  const description = clampDescription(`Find cheap flights to Mykonos, Greece from $${MIN_USD}, plus complete English guides to attractions, beaches, restaurants, hotels, nightlife, transport, weather, shopping, family travel and day trips. Whitewashed lanes, iconic windmills and legendary Aegean nightlife.`);
  const canonical = `${SITE}/mykonos`;
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
    q: "How much are flights to Mykonos?",
    a: `Round-trip fares to Mykonos (JMK) start from around $${MIN_USD} in the cheapest months and average roughly $${MAX_USD} at the height of summer. April is the cheapest month to fly, while July and August are the most expensive — Mykonos has some of the Aegean's most extreme seasonal price swings.`,
  },
  {
    q: "When is the cheapest time to fly to Mykonos?",
    a: `April is the cheapest month, with round-trip fares from about $${MIN_USD}. Booking 12–16 weeks ahead and flying midweek — Monday, Tuesday or Wednesday — early in the morning usually gets the best price. April and September offer almost the same experience as peak summer for half the cost.`,
  },
  {
    q: "Are there non-stop flights to Mykonos?",
    a: "Yes, seasonally. In summer (roughly May–September) many European cities have direct flights to Mykonos, including London, Paris, Rome, Milan, Vienna and Athens, with leading airlines and low-cost carriers. Year-round, the reliable route is via Athens (ATH), a one-hour domestic hop to JMK on Aegean Airlines.",
  },
  {
    q: "What is the best time to visit Mykonos?",
    a: "June and September are the sweet spots — the beach clubs are open and the atmosphere is buzzing, but prices are 20–30% lower and it's less crowded than July–August. For calmer, cheaper trips choose May or October. July and August are peak: hottest, priciest and windiest, with the Meltemi blowing daily.",
  },
];

function jsonLd() {
  const url = `${SITE}/mykonos`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Greece" },
      { "@type": "ListItem", position: 3, name: "Mykonos", item: url },
    ],
  };
  const touristDestination = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Mykonos",
    description: MYKONOS.tagline,
    touristType: ["Beach", "Nightlife", "Luxury"],
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
  { city: "Athens", price: 89, iata: "ATH" },
  { city: "London", price: 149, iata: "LHR" },
  { city: "Paris", price: 179, iata: "CDG" },
  { city: "Rome", price: 129, iata: "FCO" },
  { city: "Milan", price: 139, iata: "MXP" },
  { city: "Vienna", price: 159, iata: "VIE" },
];

const CATEGORY_IMAGES: Record<string, string> = {
  attractions: "/images/mykonos/attractions/vindkvarnarna-kato-mili.webp",
  restaurants: "/images/mykonos/restaurants/scorpios.webp",
  hotels: "/images/mykonos/hotels/cavo-tagoo.webp",
  beaches: "/images/mykonos/beaches/elia-beach.webp",
  transport: "/images/mykonos/attractions/little-venice-alefkandra.webp",
  prices: "/images/mykonos/attractions/chora-mykonos-town.webp",
  weather: "/images/mykonos/beaches/paraga-beach.webp",
  shopping: "/images/mykonos/shopping/matoyianni-street.webp",
  nightlife: "/images/mykonos/nightlife/cavo-paradiso.webp",
  "with-kids": "/images/mykonos/with-kids/mykonos-waterpark.webp",
  "day-trips": "/images/mykonos/day-trips/delos-unesco-ruiner.webp",
  events: "/images/mykonos/attractions/little-venice-alefkandra.webp",
};

const ATTRACTION_PREVIEW = [
  { name: "The Windmills (Kato Mili)", blurb: "Five 16th-century windmills and the island's finest sunset view.", image: "/images/mykonos/attractions/vindkvarnarna-kato-mili.webp" },
  { name: "Little Venice", blurb: "Sea-captains' houses on the waterline — the Aegean's classic sunset spot.", image: "/images/mykonos/attractions/little-venice-alefkandra.webp" },
  { name: "Delos", blurb: "Apollo's birthplace: a UNESCO island of temples and marble lions.", image: "/images/mykonos/attractions/delos-dagstrip.webp" },
];
const EAT_PREVIEW = [
  { name: "Scorpios", blurb: "The cult beach club with a famous sunset ritual on Paraga Beach.", image: "/images/mykonos/restaurants/scorpios.webp" },
  { name: "Kiki's Taverna", blurb: "Off-grid charcoal grilling above a wild northern beach — no electricity.", image: "/images/mykonos/restaurants/kikis-taverna.webp" },
  { name: "Spilia", blurb: "Pristine seafood served inside a natural seaside cave.", image: "/images/mykonos/restaurants/spilia.webp" },
];
const TRIP_PREVIEW = [
  { name: "Delos", blurb: "The sacred archaeological island, 15 minutes by boat.", image: "/images/mykonos/day-trips/delos-unesco-ruiner.webp" },
  { name: "Santorini", blurb: "The caldera and the Oia sunset on a full-day catamaran trip.", image: "/images/mykonos/day-trips/santorini.webp" },
  { name: "Naxos", blurb: "The greenest Cycladic island: long beaches and the Portara gate.", image: "/images/mykonos/day-trips/naxos.webp" },
];

const WHY = [
  { icon: "🌙", text: "World-class nightlife — from Cavo Paradiso and Scorpios to the sunset bars of Little Venice, Mykonos parties day and night." },
  { icon: "🏖️", text: "Legendary beaches — glamorous Psarou and Paradise on the sheltered south, wild windsurf bays like Ftelia on the north." },
  { icon: "🤍", text: "The Cyclades' most photogenic town — whitewashed cubic houses, blue doors, five iconic windmills and pink bougainvillea." },
  { icon: "🏛️", text: "Ancient Delos next door — Apollo's mythical birthplace and one of Greece's greatest archaeological sites, a short boat ride away." },
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

export default function MykonosHub() {
  const categories = CATEGORIES.filter((c) => c.slug);

  return (
    <div className="min-h-screen bg-background">
      {jsonLd().map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s).replace(/</g, "\\u003c") }} />
      ))}
      <Navbar transparent />

      {/* 1. Hero */}
      <section className="relative isolate h-[80vh] min-h-[560px] w-full overflow-hidden">
        <SmartImage src={HERO} alt="Cheap flights to Mykonos, Greece" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
            <span className="text-base">{MYKONOS.countryFlag}</span>
            <span>{MYKONOS.country}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 tracking-[0.2em] backdrop-blur">{MYKONOS.iata}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 backdrop-blur">{MYKONOS.summerTemp}°C summer</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold text-white sm:text-7xl">Cheap Flights to Mykonos</h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">{MYKONOS.tagline}</p>
        </div>
      </section>

      {/* 2. Flight stats bar */}
      <section className="relative z-10 mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-border bg-card px-6 py-4 text-sm font-medium text-foreground shadow-elegant">
          <span>from <span className="font-serif text-lg text-accent">${MIN_USD}</span></span>
          <span className="text-muted-foreground/40">•</span>
          <span>Seasonal nonstop · year-round via Athens</span>
          <span className="text-muted-foreground/40">•</span>
          <span>~1h from Athens · ~4h direct from Northern Europe</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="inline-flex items-center gap-1"><Plane className="h-4 w-4 text-accent" /> {MYKONOS.iata}</span>
        </div>
      </section>

      {/* Sticky sub-nav */}
      <div className="mt-8">
        <CitySubNav citySlug="mykonos" categories={CATEGORIES} active="" />
      </div>

      {/* 3. Flight search widget */}
      <section id="flights" className="mx-auto mt-10 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <h2 className="mb-3 font-serif text-2xl font-semibold text-foreground sm:text-3xl">Find the Best Flights to Mykonos</h2>
        <p className="mb-6 max-w-3xl text-muted-foreground">Flying to Mykonos is easier than ever, with direct routes from New York, London and other major hubs — making Mykonos one of the most popular flight destinations from the US, UK and Europe. Find cheap flights to Mykonos, compare airlines and book direct. Our AI flight search compares hundreds of routes to find you the cheapest flights to Mykonos — just describe your trip and Flyamba does the rest.</p>
        <AviasalesWidget toName={MYKONOS.tpName} />
      </section>

      {/* 4. Booking insights */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Booking insights</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Smart tips for booking Mykonos</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarClock, label: "Best time to book", value: "12–16 weeks ahead" },
            { icon: TrendingDown, label: "Cheapest month", value: `April ($${MIN_USD} avg)` },
            { icon: CalendarDays, label: "Cheapest day to fly", value: "Monday & Tuesday" },
            { icon: Route, label: "Direct flights", value: "Seasonal — or year-round via Athens" },
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Explore Mykonos</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/mykonos/${c.slug}`}
              className="group relative h-[180px] overflow-hidden rounded-3xl border border-border"
            >
              <SmartImage src={CATEGORY_IMAGES[c.slug] ?? HERO} alt={`Mykonos ${c.label}`} fill sizes="(max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">When is it cheapest to fly to Mykonos?</h2>
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

      {/* 7. Non-stop cities (USD) */}
      <section id="nonstop" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Direct routes</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Seasonal non-stop to Mykonos from major cities</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NON_STOP.map((r) => (
            <div key={r.city} className="flex items-center justify-between rounded-3xl border border-border bg-card p-6">
              <div>
                <p className="font-serif text-lg font-semibold text-foreground">{r.city}</p>
                <p className="text-xs text-muted-foreground">{r.iata} → JMK · seasonal nonstop</p>
              </div>
              <p className="font-serif text-2xl text-accent">${r.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Why Mykonos */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Why Mykonos?</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Why Fly to Mykonos with Flyamba?</h2>
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
        <AskAiWidget destination="Mykonos" />
      </section>

      {/* 10. Preview sections */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Top attractions</h2>
          <Link href="/mykonos/attractions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All attractions <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={ATTRACTION_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Where to eat</h2>
          <Link href="/mykonos/restaurants" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All restaurants <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={EAT_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Best day trips</h2>
          <Link href="/mykonos/day-trips" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All day trips <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={TRIP_PREVIEW} />
      </section>

      {/* 11. Nearby cities */}
      <section id="nearby" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Nearby</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Island-hop onward from Mykonos</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {MYKONOS.nearby.map((n) => (
            <Link key={n.city} href={n.href} className="group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 transition hover:-translate-y-0.5 hover:border-accent">
              <span className="text-sm font-semibold text-foreground">Flights to {n.city}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </section>

      <FaqSection items={FAQS} city="Mykonos" />


      {/* 12. SEO footer links */}
      <section className="mx-auto mt-16 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Mykonos guides</p>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.slug} href={`/mykonos/${c.slug}`} className="text-muted-foreground transition hover:text-accent">
              Mykonos {c.label.toLowerCase()} →
            </Link>
          ))}
          {MYKONOS.nearby.map((n) => (
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
