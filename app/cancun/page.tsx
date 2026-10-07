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
import { CATEGORIES } from "@/app/data/cancun-places";
import { ArrowRight, Plane, CalendarClock, TrendingDown, CalendarDays, Route } from "lucide-react";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { crumbsForSlug } from "@/app/lib/destination-crumbs";
import { FareCalendarSection } from "@/app/components/FareCalendarSection";
import { NonstopRoutes } from "@/app/components/NonstopRoutes";
import { fareCopyFor, priceAnswer } from "@/app/lib/fare-copy";

// ── City facts (self-contained) ──────────────────────────────────────────────
const CITY = {
  name: "Cancún",
  country: "Mexico",
  countryFlag: "🇲🇽",
  iata: "CUN",
  tpName: "cancun_mx",
  summerTemp: 30,
  tagline: "Caribbean beaches, Mayan ruins and turquoise cenotes",
  flightTime: "One of the busiest leisure gateways in the Americas",
  hero: "/images/destinations/flights-cancun.avif",
};

// The hand-written non-stop list is gone; NonstopRoutes renders observed fares.

const CATEGORY_IMG: Record<string, string> = {
  attractions: "/images/placeholders/placeholder-attractions.webp",
  beaches: "/images/placeholders/placeholder-beaches.webp",
  restaurants: "/images/placeholders/placeholder-restaurants.webp",
  hotels: "/images/placeholders/placeholder-hotels.webp",
  transport: "/images/placeholders/placeholder-transport.webp",
  prices: "/images/placeholders/placeholder-shopping.webp",
  weather: "/images/placeholders/placeholder-beaches.webp",
  shopping: "/images/placeholders/placeholder-shopping.webp",
  nightlife: "/images/placeholders/placeholder-nightlife.webp",
  "with-kids": "/images/placeholders/placeholder-with-kids.webp",
  "day-trips": "/images/placeholders/placeholder-day-trips.webp",
  events: "/images/placeholders/placeholder-attractions.webp",
};

const WHY = [
  { icon: "🏖️", text: "Laze on some of the Caribbean's most beautiful beaches — powdery white sand and impossibly turquoise water, from calm family shallows to the famous Playa Delfines." },
  { icon: "🏛️", text: "Stand before the wonders of the ancient Maya — the great pyramid of Chichén Itzá, cliff-top Tulum and jungle-shrouded Cobá are all within a day trip." },
  { icon: "💦", text: "Swim in turquoise cenotes, snorkel the world's second-largest reef and drift down underground rivers at the region's spectacular eco-parks." },
  { icon: "🌙", text: "Party at legendary clubs like Coco Bongo, feast on fresh Caribbean lobster and Yucatecan cochinita pibil, then hop a ferry to laid-back Isla Mujeres." },
];

const ATTRACTION_PREVIEW = [
  { name: "Chichén Itzá", blurb: "One of the New Seven Wonders — the great Maya pyramid of Kukulcán.", image: "/images/placeholders/placeholder-attractions.webp" },
  { name: "Tulum Ruins", blurb: "The only Maya city on the sea, perched above a turquoise cove.", image: "/images/placeholders/placeholder-attractions.webp" },
  { name: "Cenote Ik Kil", blurb: "A jaw-dropping open sinkhole ringed by hanging vines and waterfalls.", image: "/images/placeholders/placeholder-attractions.webp" },
];
const BEACH_PREVIEW = [
  { name: "Playa Delfines", blurb: "The showpiece public beach and home of the giant Cancún sign.", image: "/images/placeholders/placeholder-beaches.webp" },
  { name: "Playa Norte", blurb: "Isla Mujeres' glassy, shallow beach, rated the best in Mexico.", image: "/images/placeholders/placeholder-beaches.webp" },
  { name: "Playa Tortugas", blurb: "Calm, shallow and lively — the pick for families with young kids.", image: "/images/placeholders/placeholder-beaches.webp" },
];
const EAT_PREVIEW = [
  { name: "Lorenzillo's", blurb: "Fresh Caribbean lobster on a deck over the lagoon at sunset.", image: "/images/placeholders/placeholder-restaurants.webp" },
  { name: "La Habichuela", blurb: "Refined Yucatecan cuisine in a candlelit tropical garden.", image: "/images/placeholders/placeholder-restaurants.webp" },
  { name: "Los de Pescado", blurb: "Baja-style fish tacos beloved by locals, at rock-bottom prices.", image: "/images/placeholders/placeholder-restaurants.webp" },
];

const NEARBY = [
  { city: "Playa del Carmen", href: "/playa-del-carmen" },
  { city: "Tulum", href: "/tulum" },
  { city: "Cozumel", href: "/cozumel" },
  { city: "Mérida", href: "/merida" },
];

function buildFaq(priceLine: string): FaqItem[] {
  return [
  {
    q: "How much are flights to Cancún?",
    a: priceLine,
  },
  {
    q: "When is the best time to visit Cancún?",
    a: "Late April–May and November are the sweet spots: warm, mostly dry weather, fewer crowds, gentler prices and less seaweed than mid-summer. December–April has the best weather but the highest prices, while September–October is cheapest but wettest, within hurricane season.",
  },
  {
    q: "Which airport should I fly into?",
    a: "Cancún International (CUN) is Mexico's second-busiest airport, about 20 km and a 20–30 minute drive south of the Hotel Zone. Pre-book a shared or private shuttle online, take the ADO bus (~$6), or use an official taxi — and ignore the timeshare touts in arrivals.",
  },
  {
    q: "Should I book an all-inclusive resort?",
    a: "All-inclusive suits travellers who want to relax on-site with meals, drinks and entertainment bundled in. If you plan to tour the ruins, cenotes and islands and sample the local food scene, a room-only stay is often better value and lets you explore Cancún beyond the resort gates.",
  },
  {
    q: "Is Cancún good for day trips?",
    a: "Exceptionally. Chichén Itzá, Tulum and Cobá bring the Maya world within reach, cenotes and the great eco-parks (Xcaret, Xel-Há, Xplor) line the Riviera Maya, and short ferries reach the islands of Isla Mujeres and Cozumel. The cheap ADO buses make independent trips easy.",
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
  const fareCopy = await fareCopyFor("cancun");
  const year = new Date().getFullYear();
  const title = clampTitle(`Cheap Flights to Cancún ${year} — Guide, Prices & Beaches | Flyamba`);
  const description = clampDescription(`Find cheap flights to Cancún, Mexico${fareCopy.amount ? ` from ${fareCopy.amount} round trip from ${fareCopy.originLabel}` : ""}. Compare fares, plus complete English guides to beaches, Mayan ruins, attractions, restaurants, all-inclusive hotels, transport, weather, nightlife, family travel and day trips.`);
  const canonical = `${SITE}/cancun`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website", images: [CITY.hero] },
    twitter: { card: "summary_large_image", images: [CITY.hero] },
  };
}

function jsonLd(FAQ: FaqItem[]) {
  const url = `${SITE}/cancun`;
  const touristDestination = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Cancún",
    description: CITY.tagline,
    geo: { "@type": "GeoCoordinates", latitude: 21.1619, longitude: -86.8515 },
    touristType: ["Beach", "All-Inclusive", "Culture & History", "Family", "Nightlife"],
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

export default async function CancunHub() {
  const guideCategories = CATEGORIES.filter((c) => c.slug);
  const fareCopy = await fareCopyFor("cancun");
  const FAQ = buildFaq(priceAnswer("Cancún", fareCopy));

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
        <SmartImage src={CITY.hero} alt="Cheap flights to Cancún, Mexico" fill fetchPriority="high" loading="eager" sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 lg:px-8">
          {/* Trail added with the schema: this page emitted a BreadcrumbList
              while showing no breadcrumb at all. */}
          <div className="mb-4">
            <Breadcrumbs onDark items={crumbsForSlug("cancun")} />
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
            <span className="text-base">{CITY.countryFlag}</span>
            <span>{CITY.country}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 tracking-[0.2em] backdrop-blur">{CITY.iata}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 backdrop-blur">{CITY.summerTemp}°C tropical</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold text-white sm:text-7xl">Cheap Flights to Cancún</h1>
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
          <span>Heavy service from across the US &amp; Canada</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="inline-flex items-center gap-1"><Plane className="h-4 w-4 text-accent" /> {CITY.iata}</span>
        </div>
      </section>

      {/* Sticky in-page sub-nav */}
      <div className="mt-8">
        <CitySubNav citySlug="cancun" categories={CATEGORIES} active="" />
      </div>

      {/* 3. Flight search widget */}
      <section id="flights" className="mx-auto mt-10 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <h2 className="mb-3 font-serif text-2xl font-semibold text-foreground sm:text-3xl">Find the Best Flights to Cancún</h2>
        <p className="mb-6 max-w-3xl text-muted-foreground">Cancún is one of the easiest long-haul beach escapes to reach, with heavy service from across the US and Canada and connections from Europe and Latin America — making it one of the most popular winter-sun destinations anywhere. Find cheap flights to Cancún, compare airlines and book direct. Our AI flight search compares hundreds of routes to find you the cheapest flights to Cancún — just describe your trip and Flyamba does the rest.</p>
        <AviasalesWidget toName={CITY.tpName} />

        {/* Observed fares by month. Renders nothing below three months —
            see app/components/FareCalendarSection.tsx. */}
        <FareCalendarSection slug="cancun" name="Cancún" />
      </section>

      {/* 4. Booking insights */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Booking insights</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Smart tips for booking Cancún</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarClock, label: "Best time to book", value: "2–4 months ahead" },
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Explore Cancún</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {guideCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/cancun/${c.slug}`}
              className="group relative h-[180px] overflow-hidden rounded-3xl border border-border"
            >
              <SmartImage src={CATEGORY_IMG[c.slug] ?? CITY.hero} alt={`Cancún ${c.label}`} fill sizes="(max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
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
      <NonstopRoutes slug="cancun" name="Cancún" iata="CUN" />

      {/* 8. Why Cancún */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Why Cancún?</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Why Fly to Cancún with Flyamba?</h2>
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
        <AskAiWidget destination="Cancún" />
      </section>

      {/* 10. Preview sections */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Top attractions</h2>
          <Link href="/cancun/attractions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All attractions <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={ATTRACTION_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Best beaches</h2>
          <Link href="/cancun/beaches" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All beaches <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={BEACH_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Where to eat</h2>
          <Link href="/cancun/restaurants" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All restaurants <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={EAT_PREVIEW} />
      </section>

      {/* CTA */}
      <section className="mx-auto mt-16 max-w-4xl px-4 sm:px-6 lg:px-8">
        <FlightCTA destination={{ slug: "cancun", name: "Cancún" }} priceFrom={fareCopy.amount ?? undefined} />
      </section>

      {/* 11. Nearby cities */}
      <section id="nearby" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Nearby</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Explore onward from Cancún</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {NEARBY.map((n) => (
            <Link key={n.city} href={n.href} className="group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 transition hover:-translate-y-0.5 hover:border-accent">
              <span className="text-sm font-semibold text-foreground">Flights to {n.city}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </section>

      <FaqSection items={FAQ} city="Cancún" />


      {/* 12. SEO footer links */}
      <section className="mx-auto mt-16 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Cancún guides</p>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
          {guideCategories.map((c) => (
            <Link key={c.slug} href={`/cancun/${c.slug}`} className="text-muted-foreground transition hover:text-accent">
              Cancún {c.label.toLowerCase()} →
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
