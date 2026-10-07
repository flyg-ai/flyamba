import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { GuidesCarousel } from "@/app/components/GuidesCarousel";
import { getGuidesByDestination } from "@/app/data/guides";
import { LowFareCta } from "@/app/components/LowFareCta";
import { FaqSection, type FaqItem } from "@/app/components/FaqSection";
import { AviasalesWidget } from "@/app/components/AviasalesWidget";
import { AskAiWidget } from "@/app/components/AskAiWidget";
import { FlightCTA } from "@/app/components/FlightCTA";
import { SmartImage } from "@/app/components/SmartImage";
import { CitySubNav } from "@/app/components/CitySubNav";
import { SITE } from "@/app/lib/destination-helpers";
import { clampDescription, clampTitle } from "@/app/lib/seo";
import { CATEGORIES } from "@/app/data/dubrovnik-places";
import { ArrowRight, Plane, CalendarClock, TrendingDown, CalendarDays, Route } from "lucide-react";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { crumbsForSlug } from "@/app/lib/destination-crumbs";
import { FareCalendarSection } from "@/app/components/FareCalendarSection";
import { NonstopRoutes } from "@/app/components/NonstopRoutes";
import { fareCopyFor, priceAnswer } from "@/app/lib/fare-copy";

// ── City facts (self-contained) ──────────────────────────────────────────────
const CITY = {
  name: "Dubrovnik",
  country: "Croatia",
  countryFlag: "🇭🇷",
  iata: "DBV",
  tpName: "dubrovnik_hr",
  summerTemp: 28,
  tagline: "The pearl of the Adriatic — medieval walls above a turquoise sea",
  flightTime: "Seasonal service from across Europe",
  hero: "/images/destinations/flights-dubrovnik.avif",
};

// The hand-written non-stop list is gone; NonstopRoutes renders observed fares.

const CATEGORY_IMG: Record<string, string> = {
  attractions: "/images/dubrovnik/attractions/gamla-stadens-murar.webp",
  restaurants: "/images/dubrovnik/restaurants/restaurant-dubrovnik.avif",
  hotels: "/images/dubrovnik/hotels/hotel-dubrovnik.avif",
  transport: "/images/dubrovnik/attractions/pile-gate.webp",
  prices: "/images/dubrovnik/attractions/stradun.webp",
  weather: "/images/dubrovnik/attractions/old-town-harbour.webp",
  shopping: "/images/dubrovnik/shopping/artisan-shop-dubrovnik.webp",
  beaches: "/images/dubrovnik/beaches/banje-beach.webp",
  nightlife: "/images/dubrovnik/nightlife/cocktail-bar-dubrovnik.webp",
  "with-kids": "/images/dubrovnik/with-kids/aquarium-dubrovnik.webp",
  "day-trips": "/images/dubrovnik/day-trips/costa-brava-landscape-dubrovnik.webp",
  events: "/images/dubrovnik/attractions/fort-lovrijenac.webp",
};

const WHY = [
  { icon: "🏰", text: "Walk the most complete medieval walls in Europe — an unbroken 1,940 m ring of white limestone wrapped around a car-free Old Town of red roofs and Baroque palaces." },
  { icon: "🌊", text: "Swim in some of the clearest water on the Adriatic — from the iconic Banje Beach beneath the walls to hidden coves, salt lakes on Lokrum and the sandy shores of the Elaphiti islands." },
  { icon: "🐉", text: "Explore the real King's Landing — Dubrovnik played the capital of Westeros throughout Game of Thrones, from the Red Keep at Fort Lovrijenac to Cersei's walk of shame." },
  { icon: "☀️", text: "Soak up warm 28°C summers, ride the cable car to Mount Srđ for sunset, and use the city as a springboard to Montenegro, Bosnia and the islands." },
];

const ATTRACTION_PREVIEW = [
  { name: "Old Town Walls", blurb: "Europe's most complete medieval fortification, walkable in a full 1,940 m circuit.", image: "/images/dubrovnik/attractions/gamla-stadens-murar.webp" },
  { name: "Srđ Cable Car", blurb: "A 4-minute ride to a 778 m summit and a jaw-dropping view over the Old Town.", image: "/images/dubrovnik/attractions/cable-car-srd.webp" },
  { name: "Lokrum Island", blurb: "A lush car-free island of peacocks, a salt lake and an Iron Throne, 10 minutes offshore.", image: "/images/dubrovnik/attractions/lokrum.webp" },
];
const EAT_PREVIEW = [
  { name: "Nautika", blurb: "Dubrovnik's grande-dame fine-dining terrace, with a two-fort view at sunset.", image: "/images/dubrovnik/restaurants/restaurant-dubrovnik.avif" },
  { name: "Proto", blurb: "A storied seafood restaurant trading since 1886, just off Stradun.", image: "/images/dubrovnik/restaurants/restaurant-dubrovnik.avif" },
  { name: "Pantarul", blurb: "Modern Dalmatian home cooking in leafy Lapad, worth the short trip out.", image: "/images/dubrovnik/restaurants/restaurant-dubrovnik.avif" },
];
const BEACH_PREVIEW = [
  { name: "Banje Beach", blurb: "The iconic city beach with a postcard view back to the walls.", image: "/images/dubrovnik/beaches/banje-beach.webp" },
  { name: "Šunj (Lopud)", blurb: "A rare natural sandy beach with shallow water on a car-free island.", image: "/images/dubrovnik/beaches/barceloneta-dubrovnik.webp" },
  { name: "Pasjača Beach", blurb: "A breathtaking hidden strand at the foot of towering Konavle cliffs.", image: "/images/dubrovnik/beaches/beach-bar-dubrovnik.webp" },
];

const NEARBY = [
  { city: "Split", href: "/split" },
  { city: "Hvar", href: "/hvar" },
  { city: "Kotor", href: "/kotor" },
  { city: "Mostar", href: "/mostar" },
];

function buildFaq(priceLine: string): FaqItem[] {
  return [
  {
    q: "How much are flights to Dubrovnik?",
    a: priceLine,
  },
  {
    q: "When is the best time to visit Dubrovnik?",
    a: "May–June and September are ideal: warm 24–28°C days, swimmable sea and lighter crowds than the July–August peak, when the Old Town and cruise traffic are at their busiest and prices highest. April, October and the shoulder months are cheaper and quieter but cooler.",
  },
  {
    q: "How do I get from Dubrovnik Airport to the Old Town?",
    a: "Dubrovnik Airport (DBV) is about 20 km south-east at Čilipi. The official airport shuttle bus runs to the Old Town (Pile Gate) and Gruž harbour in around 30–40 minutes for roughly €10, timed to flights. A taxi costs about €35–40, and a few local buses also serve the airport more cheaply.",
  },
  {
    q: "Is Dubrovnik expensive?",
    a: "Yes — Dubrovnik is one of Croatia's priciest destinations, especially in peak summer. Old Town restaurant mains often run €22–35, the city-walls ticket is €35, and hotels are dear. You can save with bakery breakfasts, the Dubrovnik Pass, apartments with a kitchen, and by eating a lane or two back from Stradun.",
  },
  {
    q: "Do I need to book Dubrovnik's attractions in advance?",
    a: "For summer, booking the city walls and the Srđ cable car online is wise to skip queues and secure a slot around the cruise-ship rush (roughly 11:00–15:00). Game of Thrones tours, kayaking and Montenegro or Mostar day trips also sell out in peak season, so reserve ahead.",
  },
  ];
}

// fare-calendar.ts reads Supabase with cache: "no-store". Without force-static
// that read is a dynamic-server-usage error, the reader swallows it, and the page
// renders with no calendar while the build reports success. Fourth time this trap
// has been hit — see CLAUDE.md.
export const dynamic = "force-static";
export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const fareCopy = await fareCopyFor("dubrovnik");
  const year = new Date().getFullYear();
  const title = clampTitle(`Cheap Flights to Dubrovnik ${year} — Guide, Prices & Attractions | Flyamba`);
  const description = clampDescription(`Find cheap flights to Dubrovnik, Croatia${fareCopy.amount ? ` from ${fareCopy.amount} round trip from ${fareCopy.originLabel}` : ""}. Compare fares, plus complete English guides to attractions, restaurants, hotels, transport, weather, shopping, beaches, nightlife, family travel and day trips.`);
  const canonical = `${SITE}/dubrovnik`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website", images: [CITY.hero] },
    twitter: { card: "summary_large_image", images: [CITY.hero] },
  };
}

function jsonLd(FAQ: FaqItem[]) {
  const url = `${SITE}/dubrovnik`;
  const touristDestination = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Dubrovnik",
    description: CITY.tagline,
    geo: { "@type": "GeoCoordinates", latitude: 42.6407, longitude: 18.1077 },
    touristType: ["City Break", "Beach", "History", "Culture"],
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

export default async function DubrovnikHub() {
  const guideCategories = CATEGORIES.filter((c) => c.slug);
  const fareCopy = await fareCopyFor("dubrovnik");
  const FAQ = buildFaq(priceAnswer("Dubrovnik", fareCopy));

  return (
    <div className="min-h-screen bg-background">
      {jsonLd(FAQ).map((s, i) => (
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
        <SmartImage src={CITY.hero} alt="Cheap flights to Dubrovnik, Croatia" fill fetchPriority="high" loading="eager" sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 lg:px-8">
          {/* Trail added with the schema: this page emitted a BreadcrumbList
              while showing no breadcrumb at all. */}
          <div className="mb-4">
            <Breadcrumbs onDark items={crumbsForSlug("dubrovnik")} />
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
            <span className="text-base">{CITY.countryFlag}</span>
            <span>{CITY.country}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 tracking-[0.2em] backdrop-blur">{CITY.iata}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 backdrop-blur">{CITY.summerTemp}°C summer</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold text-white sm:text-7xl">Cheap Flights to Dubrovnik</h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">{CITY.tagline}</p>
        </div>
      </section>

      {/* 2. Flight stats bar */}
      <section className="relative z-10 mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-border bg-card px-6 py-4 text-sm font-medium text-foreground shadow-elegant">
          {fareCopy.amount && (
            <span>from <span className="font-serif text-lg text-accent">{fareCopy.amount}</span> round trip from {fareCopy.originLabel}</span>
          )}
          <span className="text-muted-foreground/40">•</span>
          <span>{CITY.flightTime}</span>
          <span className="text-muted-foreground/40">•</span>
          <span>Direct from London, Frankfurt &amp; Paris</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="inline-flex items-center gap-1"><Plane className="h-4 w-4 text-accent" /> {CITY.iata}</span>
        </div>
      </section>

      {/* Sticky in-page sub-nav */}
      <div className="mt-8">
        <CitySubNav citySlug="dubrovnik" categories={CATEGORIES} active="" />
      </div>

      {/* 3. Flight search widget */}
      <section id="flights" className="mx-auto mt-10 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <h2 className="mb-3 font-serif text-2xl font-semibold text-foreground sm:text-3xl">Find the Best Flights to Dubrovnik</h2>
        <p className="mb-6 max-w-3xl text-muted-foreground">Dubrovnik Airport (DBV) is well connected across Europe, with direct routes from London, Frankfurt, Paris, Rome and Istanbul, plus a growing list of seasonal summer flights — making the pearl of the Adriatic one of the most popular beach-and-culture escapes from the UK, Europe and, via connections, the US. Find cheap flights to Dubrovnik, compare airlines and book direct. Our AI flight search compares hundreds of routes to find you the cheapest flights to Dubrovnik — just describe your trip and Flyamba does the rest.</p>
        <AviasalesWidget toName={CITY.tpName} />

        {/* Observed fares by month. Renders nothing below three months —
            see app/components/FareCalendarSection.tsx. */}
        <FareCalendarSection slug="dubrovnik" name="Dubrovnik" />
        <LowFareCta slug="dubrovnik" city="Dubrovnik" />
      </section>

      {/* 4. Booking insights */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Booking insights</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Smart tips for booking Dubrovnik</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarClock, label: "Best time to book", value: "6–8 weeks ahead" },
            ...(fareCopy.cheapestMonthClause
              ? [{ icon: TrendingDown, label: "Cheapest month we have seen", value: fareCopy.cheapestMonthClause.split(",")[0] }]
              : []),
            { icon: CalendarDays, label: "Cheapest day to fly", value: "Tuesday & Wednesday" },
            // Removed: this card asserted non-stop service we cannot evidence.
            // origin_fares stores price and dates, not stops. It comes back per
            // city once number_of_changes is filled — see supabase/origin-fares-changes.sql.
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Explore Dubrovnik</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {guideCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/dubrovnik/${c.slug}`}
              className="group relative h-[180px] overflow-hidden rounded-3xl border border-border"
            >
              <SmartImage src={CATEGORY_IMG[c.slug] ?? CITY.hero} alt={`Dubrovnik ${c.label}`} fill sizes="(max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 text-white">
                <span className="flex items-center gap-2 font-serif text-xl font-semibold"><span aria-hidden>{c.emoji}</span>{c.label}</span>
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* The month chart that stood here plotted twelve Stockholm SEK estimates.
          FareCalendarSection, mounted after the search widget above, draws the same
          months from observed fares instead — and shows nothing where we hold too
          few. */}
      {/* Evidence-driven: rows are observed non-stop fares from the cron's
          v2/prices/latest pass. The hand-written table that stood here listed
          six cities with invented prices; this renders nothing when we hold no
          evidence, which is "not observed", never "no non-stop exists". */}
      <NonstopRoutes slug="dubrovnik" name="Dubrovnik" iata="DBV" />

      {/* 8. Why Dubrovnik */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Why Dubrovnik?</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Why Fly to Dubrovnik with Flyamba?</h2>
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
        <AskAiWidget destination="Dubrovnik" />
      </section>

      {/* 10. Preview sections */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Top attractions</h2>
          <Link href="/dubrovnik/attractions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All attractions <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={ATTRACTION_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Where to eat</h2>
          <Link href="/dubrovnik/restaurants" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All restaurants <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={EAT_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Best beaches</h2>
          <Link href="/dubrovnik/beaches" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All beaches <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={BEACH_PREVIEW} />
      </section>

      {/* CTA */}
      <section className="mx-auto mt-16 max-w-4xl px-4 sm:px-6 lg:px-8">
        <FlightCTA destination={{ slug: "dubrovnik", name: "Dubrovnik" }} priceFrom={fareCopy.amount ?? undefined} />
      </section>

      {/* 11. Nearby cities */}
      <section id="nearby" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Nearby</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Fly onward from Dubrovnik</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {NEARBY.map((n) => (
            <Link key={n.city} href={n.href} className="group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 transition hover:-translate-y-0.5 hover:border-accent">
              <span className="text-sm font-semibold text-foreground">Flights to {n.city}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </section>

      <FaqSection items={FAQ} city="Dubrovnik" />


      <GuidesCarousel


        guides={getGuidesByDestination("dubrovnik").slice(0, 3)}


        title="Latest Dubrovnik guides"


      />



      {/* 12. SEO footer links */}
      <section className="mx-auto mt-16 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Dubrovnik guides</p>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
          {guideCategories.map((c) => (
            <Link key={c.slug} href={`/dubrovnik/${c.slug}`} className="text-muted-foreground transition hover:text-accent">
              Dubrovnik {c.label.toLowerCase()} →
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
