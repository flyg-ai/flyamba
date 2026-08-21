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
import { MADRID, CATEGORIES } from "@/app/data/madrid-places";
import { SITE } from "@/app/lib/destination-helpers";
import { clampDescription, clampTitle } from "@/app/lib/seo";
import { usd5 } from "@/app/lib/format";
import { ArrowRight, Plane, CalendarClock, TrendingDown, CalendarDays, Route } from "lucide-react";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { crumbsForSlug } from "@/app/lib/destination-crumbs";

const HERO = "/images/destinations/flights-madrid.avif";
const usdMonths = MADRID.monthlyPrices.map((m) => ({ month: m.month, price: usd5(m.price) }));
const MIN_USD = Math.min(...usdMonths.map((m) => m.price));
const MAX_USD = Math.max(...usdMonths.map((m) => m.price));

export function generateMetadata(): Metadata {
  const year = new Date().getFullYear();
  const title = clampTitle(`Cheap Flights to Madrid ${year} — Guide, Prices & Attractions | Flyamba`);
  const description = clampDescription(`Find cheap flights to Madrid, Spain from $${MIN_USD}, plus complete English guides to attractions, restaurants, hotels, transport, weather, shopping, nightlife, family travel and day trips. World-class art, tapas and nightlife until dawn.`);
  const canonical = `${SITE}/madrid`;
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
    q: "How much are flights to Madrid?",
    a: `Round-trip fares to Madrid-Barajas (MAD) start from around $${MIN_USD} and average roughly $${MAX_USD} in peak summer. February and November are the cheapest months to fly, while July and August are the most expensive.`,
  },
  {
    q: "When is the cheapest time to fly to Madrid?",
    a: `February is the cheapest month, with fares from about $${MIN_USD} round trip. Booking 5–7 weeks ahead and flying midweek usually gets the best price, and autumn (September–October) offers the best balance of weather and value.`,
  },
  {
    q: "Are there non-stop flights to Madrid?",
    a: "Yes. Madrid-Barajas is a major Iberia hub with non-stop flights from cities worldwide, including New York, Miami, London, Paris, Lisbon and hundreds of other destinations across Europe, the Americas and beyond.",
  },
  {
    q: "What is the best time to visit Madrid?",
    a: "April–June and September–October are ideal, with warm, dry, sunny days of 20–28°C and pleasant evenings for outdoor tapas. July and August are very hot (often 35–40°C), while winter is mild, sunny and cheapest.",
  },
];

function jsonLd() {
  const url = `${SITE}/madrid`;
  const touristDestination = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Madrid",
    description: MADRID.tagline,
    touristType: ["City Break", "Culture", "Nightlife"],
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
  return [touristDestination, faqPage];
}

// ── Static data (USD) ────────────────────────────────────────────────────────
const NON_STOP = [
  { city: "London", price: 69, iata: "LHR" },
  { city: "Paris", price: 79, iata: "CDG" },
  { city: "Lisbon", price: 59, iata: "LIS" },
  { city: "New York", price: 379, iata: "JFK" },
  { city: "Miami", price: 429, iata: "MIA" },
  { city: "Rome", price: 89, iata: "FCO" },
];

const CATEGORY_IMAGES: Record<string, string> = {
  attractions: "/images/madrid/attractions/prado-museet.webp",
  restaurants: "/images/madrid/restaurants/restaurant-madrid.avif",
  hotels: "/images/madrid/hotels/hotel-madrid.avif",
  transport: "/images/madrid/attractions/puerta-del-sol.webp",
  prices: "/images/madrid/attractions/mercado-de-san-miguel.webp",
  weather: "/images/madrid/attractions/retiro-parken.webp",
  shopping: "/images/madrid/shopping/artisan-shop-madrid.webp",
  nightlife: "/images/madrid/nightlife/cocktail-bar-madrid.webp",
  "with-kids": "/images/madrid/with-kids/aquarium-madrid.webp",
  "day-trips": "/images/madrid/day-trips/costa-brava-landscape-madrid.webp",
  events: "/images/madrid/attractions/plaza-mayor.webp",
};

const ATTRACTION_PREVIEW = [
  { name: "Prado Museum", blurb: "Velázquez, Goya and one of the world's great art collections.", image: "/images/madrid/attractions/prado-museet.webp" },
  { name: "Royal Palace", blurb: "Western Europe's largest working palace, with 3,418 rooms.", image: "/images/madrid/attractions/palacio-real.webp" },
  { name: "Retiro Park", blurb: "The UNESCO-listed green heart, with a boating lake and glass palace.", image: "/images/madrid/attractions/retiro-parken.webp" },
];
const EAT_PREVIEW = [
  { name: "Sobrino de Botín", blurb: "The world's oldest restaurant, roasting suckling pig since 1725.", image: "/images/madrid/restaurants/restaurant-madrid.avif" },
  { name: "Mercado de San Miguel", blurb: "A 1916 iron-and-glass food hall of gourmet tapas.", image: "/images/madrid/restaurants/restaurant-madrid.avif" },
  { name: "Casa Dani", blurb: "The world's best tortilla española, per National Geographic.", image: "/images/madrid/restaurants/restaurant-madrid.avif" },
];
const TRIP_PREVIEW = [
  { name: "Toledo", blurb: "A UNESCO 'city of three cultures', 33 min by high-speed train.", image: "/images/madrid/day-trips/girona-madrid.webp" },
  { name: "Segovia", blurb: "A colossal Roman aqueduct and a fairy-tale castle, 30 min away.", image: "/images/madrid/day-trips/montserrat-madrid.webp" },
  { name: "El Escorial", blurb: "Philip II's vast monastery-palace in the mountains.", image: "/images/madrid/day-trips/penedes-vineyard-madrid.webp" },
];

const WHY = [
  { icon: "🎨", text: "The Paseo del Arte — the Prado, Reina Sofía and Thyssen-Bornemisza, arguably the densest kilometre of great painting in the world." },
  { icon: "🍽️", text: "Spain's best-value food scene: menús del día, world-champion tortilla, century-old tabernas and the tapas ritual of La Latina." },
  { icon: "🌙", text: "Legendary nightlife — Madrid barely sleeps, from flamenco tablaos and jazz clubs to cocktail bars and clubs open until dawn." },
  { icon: "🚆", text: "The perfect base — Toledo, Segovia, Ávila and more are all reachable in under 90 minutes by high-speed train." },
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

export default function MadridHub() {
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
        <SmartImage src={HERO} alt="Cheap flights to Madrid, Spain" fill fetchPriority="high" loading="eager" sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 lg:px-8">
          {/* Trail added with the schema: this page emitted a BreadcrumbList
              while showing no breadcrumb at all. */}
          <div className="mb-4">
            <Breadcrumbs onDark items={crumbsForSlug("madrid")} />
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
            <span className="text-base">{MADRID.countryFlag}</span>
            <span>{MADRID.country}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 tracking-[0.2em] backdrop-blur">{MADRID.iata}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 backdrop-blur">{MADRID.summerTemp}°C summer</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold text-white sm:text-7xl">Cheap Flights to Madrid</h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">{MADRID.tagline}</p>
        </div>
      </section>

      {/* 2. Flight stats bar */}
      <section className="relative z-10 mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-border bg-card px-6 py-4 text-sm font-medium text-foreground shadow-elegant">
          <span>from <span className="font-serif text-lg text-accent">${MIN_USD}</span></span>
          <span className="text-muted-foreground/40">•</span>
          <span>Iberia hub · nonstop worldwide</span>
          <span className="text-muted-foreground/40">•</span>
          <span>~2h from London · 8h from New York</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="inline-flex items-center gap-1"><Plane className="h-4 w-4 text-accent" /> {MADRID.iata}</span>
        </div>
      </section>

      {/* Sticky sub-nav */}
      <div className="mt-8">
        <CitySubNav citySlug="madrid" categories={CATEGORIES} active="" />
      </div>

      {/* 3. Flight search widget */}
      <section id="flights" className="mx-auto mt-10 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <h2 className="mb-3 font-serif text-2xl font-semibold text-foreground sm:text-3xl">Find the Best Flights to Madrid</h2>
        <p className="mb-6 max-w-3xl text-muted-foreground">Flying to Madrid is easier than ever, with direct routes from New York, London and other major hubs — making Madrid one of the most popular flight destinations from the US, UK and Europe. Find cheap flights to Madrid, compare airlines and book direct. Our AI flight search compares hundreds of routes to find you the cheapest flights to Madrid — just describe your trip and Flyamba does the rest.</p>
        <AviasalesWidget toName={MADRID.tpName} />
        <LowFareCta slug="madrid" city="Madrid" />
      </section>

      {/* 4. Booking insights */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Booking insights</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Smart tips for booking Madrid</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarClock, label: "Best time to book", value: "5–7 weeks ahead" },
            { icon: TrendingDown, label: "Cheapest month", value: `February ($${MIN_USD} avg)` },
            { icon: CalendarDays, label: "Cheapest day to fly", value: "Monday" },
            { icon: Route, label: "Direct flights", value: "Yes — from London, Paris, New York" },
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Explore Madrid</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/madrid/${c.slug}`}
              className="group relative h-[180px] overflow-hidden rounded-3xl border border-border"
            >
              <SmartImage src={CATEGORY_IMAGES[c.slug] ?? HERO} alt={`Madrid ${c.label}`} fill sizes="(max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">When is it cheapest to fly to Madrid?</h2>
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Non-stop to Madrid from major cities</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NON_STOP.map((r) => (
            <div key={r.city} className="flex items-center justify-between rounded-3xl border border-border bg-card p-6">
              <div>
                <p className="font-serif text-lg font-semibold text-foreground">{r.city}</p>
                <p className="text-xs text-muted-foreground">{r.iata} → MAD · nonstop</p>
              </div>
              <p className="font-serif text-2xl text-accent">${r.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Why Madrid */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Why Madrid?</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Why Fly to Madrid with Flyamba?</h2>
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
        <AskAiWidget destination="Madrid" />
      </section>

      {/* 10. Preview sections */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Top attractions</h2>
          <Link href="/madrid/attractions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All attractions <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={ATTRACTION_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Where to eat</h2>
          <Link href="/madrid/restaurants" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All restaurants <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={EAT_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Best day trips</h2>
          <Link href="/madrid/day-trips" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All day trips <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={TRIP_PREVIEW} />
      </section>

      {/* 11. Nearby cities */}
      <section id="nearby" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Nearby</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Fly onward from Madrid</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {MADRID.nearby.map((n) => (
            <Link key={n.city} href={n.href} className="group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 transition hover:-translate-y-0.5 hover:border-accent">
              <span className="text-sm font-semibold text-foreground">Flights to {n.city}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </section>

      <FaqSection items={FAQS} city="Madrid" />


      <GuidesCarousel


        guides={getGuidesByDestination("madrid").slice(0, 3)}


        title="Latest Madrid guides"


      />



      {/* 12. SEO footer links */}
      <section className="mx-auto mt-16 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Madrid guides</p>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.slug} href={`/madrid/${c.slug}`} className="text-muted-foreground transition hover:text-accent">
              Madrid {c.label.toLowerCase()} →
            </Link>
          ))}
          {MADRID.nearby.map((n) => (
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
