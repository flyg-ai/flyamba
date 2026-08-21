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
import { CATEGORIES } from "@/app/data/florence-places";
import { ArrowRight, Plane, CalendarClock, TrendingDown, CalendarDays, Route } from "lucide-react";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { crumbsForSlug } from "@/app/lib/destination-crumbs";

// ── City facts (self-contained) ──────────────────────────────────────────────
const CITY = {
  name: "Florence",
  country: "Italy",
  countryFlag: "🇮🇹",
  iata: "FLR",
  tpName: "florence_it",
  summerTemp: 30,
  tagline: "The cradle of the Renaissance in the heart of Tuscany",
  flightTime: "Direct across Europe",
  hero: "/images/destinations/flights-florens.avif",
};

// Monthly average round-trip fares seeded in SEK; displayed in USD via usd5().
const MONTHLY_SEK: { month: string; sek: number }[] = [
  { month: "Jan", sek: 2900 }, { month: "Feb", sek: 2700 }, { month: "Mar", sek: 3000 },
  { month: "Apr", sek: 3400 }, { month: "May", sek: 3800 }, { month: "Jun", sek: 4300 },
  { month: "Jul", sek: 4900 }, { month: "Aug", sek: 4700 }, { month: "Sep", sek: 4100 },
  { month: "Oct", sek: 3500 }, { month: "Nov", sek: 2900 }, { month: "Dec", sek: 3100 },
];
const LOWEST_SEK = Math.min(...MONTHLY_SEK.map((m) => m.sek));

const NON_STOP = [
  { city: "London", price: 88, iata: "LGW" },
  { city: "Paris", price: 95, iata: "CDG" },
  { city: "Frankfurt", price: 110, iata: "FRA" },
  { city: "Amsterdam", price: 99, iata: "AMS" },
  { city: "Munich", price: 105, iata: "MUC" },
  { city: "New York", price: 520, iata: "JFK" },
];

const CATEGORY_IMG: Record<string, string> = {
  attractions: "/images/florence/sevardheter/brunelleschi-kupolen.webp",
  restaurants: "/images/destinations/placeholder.avif",
  hotels: "/images/destinations/placeholder.avif",
  transport: "/images/florence/sevardheter/ponte-vecchio.webp",
  prices: "/images/florence/sevardheter/uffizierna-galleria-degli-uffizi.webp",
  weather: "/images/florence/sevardheter/piazzale-michelangelo-utsikt.webp",
  shopping: "/images/destinations/placeholder.avif",
  nightlife: "/images/destinations/placeholder.avif",
  "with-kids": "/images/florence/sevardheter/boboli-tradgarden.webp",
  "day-trips": "/images/florence/sevardheter/fiesole.webp",
  events: "/images/florence/sevardheter/piazza-della-signoria.webp",
};

const WHY = [
  { icon: "🎨", text: "Stand before the greatest art of the Renaissance — Michelangelo's David, Botticelli's Venus in the Uffizi and Brunelleschi's dome, all within a walkable centre." },
  { icon: "🍷", text: "Eat and drink Tuscany at its best: the mighty bistecca alla fiorentina, ribollita, truffle panini and Chianti from the hills just beyond the city." },
  { icon: "🚶", text: "Explore one of Europe's most compact historic cities on foot, with almost every masterpiece a 15-minute stroll from the last." },
  { icon: "🌇", text: "Watch the sun set over the terracotta rooftops from Piazzale Michelangelo and San Miniato, one of the finest free views in Italy." },
];

const ATTRACTION_PREVIEW = [
  { name: "Duomo & Dome", blurb: "Brunelleschi's terracotta dome, the symbol of the Renaissance — climb it for the city's best view.", image: "/images/florence/sevardheter/brunelleschi-kupolen.webp" },
  { name: "Uffizi Gallery", blurb: "The world's finest collection of Renaissance painting, from Botticelli to Leonardo.", image: "/images/florence/sevardheter/uffizierna-galleria-degli-uffizi.webp" },
  { name: "Accademia (David)", blurb: "Michelangelo's David, the most famous sculpture on earth, carved from a single block.", image: "/images/florence/sevardheter/galleria-dellaccademia-david.webp" },
];
const EAT_PREVIEW = [
  { name: "Trattoria Mario", blurb: "A boisterous lunch-only institution for bistecca and ribollita by the Mercato Centrale.", image: "/images/destinations/placeholder.avif" },
  { name: "All'Antico Vinaio", blurb: "Florence's legendary schiacciata panini, stuffed to order — expect a queue.", image: "/images/destinations/placeholder.avif" },
  { name: "Trattoria Sostanza", blurb: "An 1869 classic famous for butter-drenched chicken and enormous shared bistecca.", image: "/images/destinations/placeholder.avif" },
];

const NEARBY = [
  { city: "Rome", href: "/rome" },
  { city: "Venice", href: "/venice" },
  { city: "Pisa", href: "/pisa" },
  { city: "Siena", href: "/siena" },
];

const FAQ: FaqItem[] = [
  {
    q: "How much are flights to Florence?",
    a: `Round-trip fares to Florence start from around ${usdStr(LOWEST_SEK)} in the low season (February and November), rising to roughly $465 during the June–August summer peak. Booking six to eight weeks ahead and flying midweek gets the best prices, and it is often cheaper to fly into Rome, Milan or Pisa and take a fast train.`,
  },
  {
    q: "When is the best time to visit Florence?",
    a: "April–May and September–October are ideal: warm 20–25°C days, lighter crowds and moderate prices. Summer is hot, humid and busy, while February and November are cheapest and quietest, perfect for queue-free museums, if cooler and wetter.",
  },
  {
    q: "Which airport should I fly into for Florence?",
    a: "Florence's own Amerigo Vespucci airport (FLR) is small, served mainly by European routes, and linked to the centre by the T2 tram in about 20 minutes. Many international and long-haul travellers instead fly into Pisa (PSA), an hour away by shuttle and train, or into Rome or Milan and connect onward by high-speed train.",
  },
  {
    q: "Do I need to book Florence's attractions in advance?",
    a: "Yes for the big three — the Uffizi, the Accademia (David) and the climb of Brunelleschi's dome all use timed tickets that sell out days ahead. Many sights, including the cathedral itself, the churches, the open-air sculpture of Piazza della Signoria and the viewpoints, are free.",
  },
  {
    q: "Is Florence walkable, or do I need public transport?",
    a: "Florence has no metro, and it barely needs one: the compact historic centre is best explored entirely on foot, with almost every sight within a 15-minute walk. The tram is mainly useful for the airport, and trains from Santa Maria Novella station open up day trips across Tuscany.",
  },
];

export function generateMetadata(): Metadata {
  const year = new Date().getFullYear();
  const title = clampTitle(`Cheap Flights to Florence ${year} — Guide, Prices & Attractions | Flyamba`);
  const description = clampDescription(`Find cheap flights to Florence, Italy from ${usdStr(LOWEST_SEK)}. Compare fares, plus complete English guides to attractions, restaurants, hotels, transport, weather, shopping, nightlife, family travel and Tuscan day trips.`);
  const canonical = `${SITE}/florence`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website", images: [CITY.hero] },
    twitter: { card: "summary_large_image", images: [CITY.hero] },
  };
}

function jsonLd() {
  const url = `${SITE}/florence`;
  const touristDestination = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Florence",
    description: CITY.tagline,
    geo: { "@type": "GeoCoordinates", latitude: 43.7696, longitude: 11.2558 },
    touristType: ["City Break", "Culture", "Art & History", "Food & Wine"],
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

export default function FlorenceHub() {
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
        <SmartImage src={CITY.hero} alt="Cheap flights to Florence, Italy" fill fetchPriority="high" loading="eager" sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 lg:px-8">
          {/* Trail added with the schema: this page emitted a BreadcrumbList
              while showing no breadcrumb at all. */}
          <div className="mb-4">
            <Breadcrumbs onDark items={crumbsForSlug("florence")} />
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
            <span className="text-base">{CITY.countryFlag}</span>
            <span>{CITY.country}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 tracking-[0.2em] backdrop-blur">{CITY.iata}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 backdrop-blur">{CITY.summerTemp}°C summer</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold text-white sm:text-7xl">Cheap Flights to Florence</h1>
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
          <span>Direct from London, Paris &amp; Frankfurt</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="inline-flex items-center gap-1"><Plane className="h-4 w-4 text-accent" /> {CITY.iata}</span>
        </div>
      </section>

      {/* Sticky in-page sub-nav */}
      <div className="mt-8">
        <CitySubNav citySlug="florence" categories={CATEGORIES} active="" />
      </div>

      {/* 3. Flight search widget */}
      <section id="flights" className="mx-auto mt-10 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <h2 className="mb-3 font-serif text-2xl font-semibold text-foreground sm:text-3xl">Find the Best Flights to Florence</h2>
        <p className="mb-6 max-w-3xl text-muted-foreground">Florence's own Amerigo Vespucci airport (FLR) is served by direct flights from London, Paris, Frankfurt and other European hubs, making it easy to reach from across the UK and Europe. Travellers from the US and further afield will often find the cheapest, most frequent options by flying into Rome, Milan or Pisa and connecting onward — Rome to Florence is just 90 minutes by high-speed train. Our AI flight search compares hundreds of routes to find you the cheapest flights to Florence — just describe your trip and Flyamba does the rest.</p>
        <AviasalesWidget toName={CITY.tpName} />
      </section>

      {/* 4. Booking insights */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Booking insights</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Smart tips for booking Florence</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarClock, label: "Best time to book", value: "6–8 weeks ahead" },
            { icon: TrendingDown, label: "Cheapest month", value: `${cheapestLabel} (${usdStr(cheapest.sek)} avg)` },
            { icon: CalendarDays, label: "Cheapest day to fly", value: "Tuesday & Wednesday" },
            { icon: Route, label: "Direct flights", value: "From London, Paris & Frankfurt" },
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Explore Florence</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {guideCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/florence/${c.slug}`}
              className="group relative h-[180px] overflow-hidden rounded-3xl border border-border"
            >
              <SmartImage src={CATEGORY_IMG[c.slug] ?? CITY.hero} alt={`Florence ${c.label}`} fill sizes="(max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">When is it cheapest to fly to Florence?</h2>
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Non-stop to Florence from {NON_STOP.length} cities</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">Florence airport (FLR) focuses on European routes. Long-haul travellers, including most from the US, typically connect via Rome, Milan or Pisa and finish the journey by a short flight or a fast train.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NON_STOP.map((r) => (
            <div key={r.city} className="flex items-center justify-between rounded-3xl border border-border bg-card p-6">
              <div>
                <p className="font-serif text-lg font-semibold text-foreground">{r.city}</p>
                <p className="text-xs text-muted-foreground">{r.iata} → FLR · {r.city === "New York" ? "1 stop" : "nonstop"}</p>
              </div>
              <p className="font-serif text-2xl text-accent">${r.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Why Florence */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Why Florence?</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Why Fly to Florence with Flyamba?</h2>
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
        <AskAiWidget destination="Florence" />
      </section>

      {/* 10. Preview sections */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Top attractions</h2>
          <Link href="/florence/attractions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All attractions <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={ATTRACTION_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Where to eat</h2>
          <Link href="/florence/restaurants" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All restaurants <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={EAT_PREVIEW} />
      </section>

      {/* CTA */}
      <section className="mx-auto mt-16 max-w-4xl px-4 sm:px-6 lg:px-8">
        <FlightCTA destination={{ slug: "florence", name: "Florence" }} priceFrom={usdStr(LOWEST_SEK)} />
      </section>

      {/* 11. Nearby cities */}
      <section id="nearby" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Nearby</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Fly onward from Florence</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {NEARBY.map((n) => (
            <Link key={n.city} href={n.href} className="group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 transition hover:-translate-y-0.5 hover:border-accent">
              <span className="text-sm font-semibold text-foreground">Flights to {n.city}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </section>

      <FaqSection items={FAQ} city="Florence" />


      {/* 12. SEO footer links */}
      <section className="mx-auto mt-16 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Florence guides</p>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
          {guideCategories.map((c) => (
            <Link key={c.slug} href={`/florence/${c.slug}`} className="text-muted-foreground transition hover:text-accent">
              Florence {c.label.toLowerCase()} →
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
