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
import { CAPE_TOWN, CATEGORIES } from "@/app/data/cape-town-places";
import { SITE } from "@/app/lib/destination-helpers";
import { clampDescription, clampTitle } from "@/app/lib/seo";
import { usd5 } from "@/app/lib/format";
import { ArrowRight, Plane, CalendarClock, TrendingDown, CalendarDays, Route } from "lucide-react";

const HERO = "/images/destinations/flights-kapstaden.avif";
const usdMonths = CAPE_TOWN.monthlyPrices.map((m) => ({ month: m.month, price: usd5(m.price) }));
const MIN_USD = Math.min(...usdMonths.map((m) => m.price));
const MAX_USD = Math.max(...usdMonths.map((m) => m.price));

export function generateMetadata(): Metadata {
  const year = new Date().getFullYear();
  const title = clampTitle(`Cheap Flights to Cape Town ${year} — Guide, Prices & Attractions | Flyamba`);
  const description = clampDescription(`Find cheap flights to Cape Town, South Africa from $${MIN_USD}, plus complete English guides to attractions, restaurants, hotels, beaches, transport, weather, shopping, nightlife, family travel and day trips. Table Mountain, winelands and Africa's most beautiful city.`);
  const canonical = `${SITE}/cape-town`;
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
    q: "How much are flights to Cape Town?",
    a: `Round-trip fares to Cape Town International (CPT) start from around $${MIN_USD} and average roughly $${MAX_USD} in the peak December–January summer season. July is the cheapest month to fly, as the wet winter lowers demand.`,
  },
  {
    q: "When is the cheapest time to fly to Cape Town?",
    a: `July is the cheapest month, with fares from about $${MIN_USD} round trip. Booking 10–14 weeks ahead and flying midweek (Monday or Tuesday) usually gets the best price.`,
  },
  {
    q: "Are there direct flights to Cape Town?",
    a: "Yes. Cape Town has non-stop flights from several major hubs including London, Amsterdam, Doha, Dubai and Frankfurt, plus frequent domestic links from Johannesburg. From most other cities you'll connect once, often via a Middle Eastern or African hub such as Dubai, Doha, Addis Ababa or Nairobi.",
  },
  {
    q: "What is the best time to visit Cape Town?",
    a: "November to March is Cape Town's warm, dry summer (25–30°C), ideal for beaches, hiking and the winelands. April–May and September–October are pleasant, quieter shoulder seasons, while the June–September winter is wetter but dramatic, with whale watching and lower prices.",
  },
];

function jsonLd() {
  const url = `${SITE}/cape-town`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "South Africa" },
      { "@type": "ListItem", position: 3, name: "Cape Town", item: url },
    ],
  };
  const touristDestination = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Cape Town",
    description: CAPE_TOWN.tagline,
    touristType: ["City Break", "Nature", "Beaches", "Wine"],
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
  { city: "Johannesburg", price: 89, iata: "JNB" },
  { city: "London", price: 649, iata: "LHR" },
  { city: "Amsterdam", price: 699, iata: "AMS" },
  { city: "Doha", price: 619, iata: "DOH" },
  { city: "Dubai", price: 639, iata: "DXB" },
  { city: "Frankfurt", price: 689, iata: "FRA" },
];

const CATEGORY_IMAGES: Record<string, string> = {
  attractions: "/images/cape-town/attractions/table-mountain.webp",
  restaurants: "/images/cape-town/restaurants/restaurant-cape-town.avif",
  hotels: "/images/cape-town/hotels/hotel-cape-town.avif",
  beaches: "/images/cape-town/beaches/camps-bay-beach.webp",
  transport: "/images/cape-town/attractions/chapmans-peak.webp",
  prices: "/images/cape-town/attractions/va-waterfront.webp",
  weather: "/images/cape-town/attractions/lions-head.webp",
  shopping: "/images/cape-town/shopping/artisan-shop-cape-town.webp",
  nightlife: "/images/cape-town/nightlife/cocktail-bar-cape-town.webp",
  "with-kids": "/images/cape-town/with-kids/boulders-pingviner.webp",
  "day-trips": "/images/cape-town/day-trips/stellenbosch-vingardar.webp",
  events: "/images/cape-town/attractions/kirstenbosch.webp",
};

const ATTRACTION_PREVIEW = [
  { name: "Table Mountain", blurb: "The flat-topped landmark towering above the city.", image: "/images/cape-town/attractions/table-mountain.webp" },
  { name: "Boulders Beach Penguins", blurb: "2,000-plus African penguins among the granite boulders.", image: "/images/cape-town/attractions/boulders-beach.webp" },
  { name: "Robben Island", blurb: "Nelson Mandela's prison, guided by former inmates.", image: "/images/cape-town/attractions/robben-island.webp" },
];
const EAT_PREVIEW = [
  { name: "La Colombe", blurb: "Africa's top-ranked restaurant, above Constantia.", image: "/images/cape-town/restaurants/restaurant-cape-town.avif" },
  { name: "Gold Restaurant", blurb: "A 14-dish pan-African feast with live drumming.", image: "/images/cape-town/restaurants/restaurant-cape-town.avif" },
  { name: "Mama Africa", blurb: "Game grills and marimba on buzzing Long Street.", image: "/images/cape-town/restaurants/restaurant-cape-town.avif" },
];
const TRIP_PREVIEW = [
  { name: "Stellenbosch", blurb: "The wine capital, 45 minutes east among the vines.", image: "/images/cape-town/day-trips/stellenbosch-vingardar.webp" },
  { name: "Hermanus", blurb: "World-class land-based whale watching (May–Dec).", image: "/images/cape-town/day-trips/costa-brava-landscape-cape-town.webp" },
  { name: "Franschhoek", blurb: "The Wine Tram and the Cape's finest restaurants.", image: "/images/cape-town/day-trips/girona-cape-town.webp" },
];

const WHY = [
  { icon: "🏔️", text: "Table Mountain — a 1,086-metre plateau you can ride a cableway up or hike, with 360° views over two oceans and the city below." },
  { icon: "🐧", text: "Wildlife on the doorstep: penguins at Boulders Beach, whales at Hermanus, and the Big Five on a day safari from the city." },
  { icon: "🍷", text: "The Cape Winelands — Constantia, Stellenbosch and Franschhoek deliver world-class wine and food within an easy drive." },
  { icon: "🏖️", text: "Dramatic beaches from glamorous Camps Bay and Clifton to surf-friendly Muizenberg, framed by mountains and the Atlantic." },
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

export default function CapeTownHub() {
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
        <SmartImage src={HERO} alt="Cheap flights to Cape Town, South Africa" fill fetchPriority="high" loading="eager" sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
            <span className="text-base">{CAPE_TOWN.countryFlag}</span>
            <span>{CAPE_TOWN.country}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 tracking-[0.2em] backdrop-blur">{CAPE_TOWN.iata}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 backdrop-blur">{CAPE_TOWN.summerTemp}°C summer</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold text-white sm:text-7xl">Cheap Flights to Cape Town</h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">{CAPE_TOWN.tagline}</p>
        </div>
      </section>

      {/* 2. Flight stats bar */}
      <section className="relative z-10 mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-border bg-card px-6 py-4 text-sm font-medium text-foreground shadow-elegant">
          <span>from <span className="font-serif text-lg text-accent">${MIN_USD}</span></span>
          <span className="text-muted-foreground/40">•</span>
          <span>Direct from London, Amsterdam & the Gulf</span>
          <span className="text-muted-foreground/40">•</span>
          <span>~11h from London · one stop from most cities</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="inline-flex items-center gap-1"><Plane className="h-4 w-4 text-accent" /> {CAPE_TOWN.iata}</span>
        </div>
      </section>

      {/* Sticky sub-nav */}
      <div className="mt-8">
        <CitySubNav citySlug="cape-town" categories={CATEGORIES} active="" />
      </div>

      {/* 3. Flight search widget */}
      <section id="flights" className="mx-auto mt-10 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <h2 className="mb-3 font-serif text-2xl font-semibold text-foreground sm:text-3xl">Find the Best Flights to Cape Town</h2>
        <p className="mb-6 max-w-3xl text-muted-foreground">Flying to Cape Town is easier than ever, with direct routes from New York, London and other major hubs — making Cape Town one of the most popular flight destinations from the US, UK and Europe. Find cheap flights to Cape Town, compare airlines and book direct. Our AI flight search compares hundreds of routes to find you the cheapest flights to Cape Town — just describe your trip and Flyamba does the rest.</p>
        <AviasalesWidget toName={CAPE_TOWN.tpName} />
        <LowFareCta slug="cape-town" city="Cape Town" />
      </section>

      {/* 4. Booking insights */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Booking insights</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Smart tips for booking Cape Town</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarClock, label: "Best time to book", value: "10–14 weeks ahead" },
            { icon: TrendingDown, label: "Cheapest month", value: `July ($${MIN_USD} avg)` },
            { icon: CalendarDays, label: "Cheapest day to fly", value: "Monday & Tuesday" },
            { icon: Route, label: "Direct flights", value: "Yes — from London, Amsterdam, Doha" },
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Explore Cape Town</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/cape-town/${c.slug}`}
              className="group relative h-[180px] overflow-hidden rounded-3xl border border-border"
            >
              <SmartImage src={CATEGORY_IMAGES[c.slug] ?? HERO} alt={`Cape Town ${c.label}`} fill sizes="(max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">When is it cheapest to fly to Cape Town?</h2>
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Non-stop to Cape Town from major cities</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NON_STOP.map((r) => (
            <div key={r.city} className="flex items-center justify-between rounded-3xl border border-border bg-card p-6">
              <div>
                <p className="font-serif text-lg font-semibold text-foreground">{r.city}</p>
                <p className="text-xs text-muted-foreground">{r.iata} → CPT · nonstop</p>
              </div>
              <p className="font-serif text-2xl text-accent">${r.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Why Cape Town */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Why Cape Town?</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Why Fly to Cape Town with Flyamba?</h2>
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
        <AskAiWidget destination="Cape Town" />
      </section>

      {/* 10. Preview sections */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Top attractions</h2>
          <Link href="/cape-town/attractions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All attractions <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={ATTRACTION_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Where to eat</h2>
          <Link href="/cape-town/restaurants" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All restaurants <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={EAT_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Best day trips</h2>
          <Link href="/cape-town/day-trips" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All day trips <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={TRIP_PREVIEW} />
      </section>

      {/* 11. Nearby cities */}
      <section id="nearby" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Nearby</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Fly onward from Cape Town</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CAPE_TOWN.nearby.map((n) => (
            <Link key={n.city} href={n.href} className="group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 transition hover:-translate-y-0.5 hover:border-accent">
              <span className="text-sm font-semibold text-foreground">Flights to {n.city}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </section>

      <FaqSection items={FAQS} city="Cape Town" />


      <GuidesCarousel


        guides={getGuidesByDestination("cape-town").slice(0, 3)}


        title="Latest Cape Town guides"


      />



      {/* 12. SEO footer links */}
      <section className="mx-auto mt-16 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Cape Town guides</p>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.slug} href={`/cape-town/${c.slug}`} className="text-muted-foreground transition hover:text-accent">
              Cape Town {c.label.toLowerCase()} →
            </Link>
          ))}
          {CAPE_TOWN.nearby.map((n) => (
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
