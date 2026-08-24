import type { Metadata } from "next";
import Image from "next/image";
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
import { usd5, usdStr } from "@/app/lib/format";
import { CATEGORIES } from "@/app/data/rome-places";
import { ArrowRight, Plane, CalendarClock, TrendingDown, CalendarDays, Route } from "lucide-react";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { crumbsForSlug } from "@/app/lib/destination-crumbs";
import { FareCalendarSection } from "@/app/components/FareCalendarSection";
import { fareCopyFor, priceAnswer } from "@/app/lib/fare-copy";
import { NonstopRoutes } from "@/app/components/NonstopRoutes";

// ── City facts (self-contained) ──────────────────────────────────────────────
const CITY = {
  name: "Rome",
  country: "Italy",
  countryFlag: "🇮🇹",
  iata: "FCO",
  tpName: "rome_it",
  summerTemp: 26,
  tagline: "Ancient ruins, Renaissance art and la dolce vita",
  flightTime: "Nonstop worldwide",
  hero: "/images/destinations/flights-rom.avif",
};

// Monthly average round-trip fares seeded in SEK; displayed in USD via usd5().
// The twelve Stockholm SEK estimates are gone with the chart, the hero pill and
// the FAQ answer that quoted them. Prices now come from observed fares — see
// app/lib/fare-copy.ts.


const CATEGORY_IMG: Record<string, string> = {
  attractions: "/images/rome/sevardheter/colosseum.webp",
  restaurants: "/images/rome/restauranger/roscioli.webp",
  hotels: "/images/rome/hotels/hotel-rome.avif",
  transport: "/images/rome/sevardheter/spanska-trappan.webp",
  prices: "/images/rome/sevardheter/trevi-fontanen.webp",
  weather: "/images/rome/sevardheter/piazza-navona.webp",
  shopping: "/images/rome/shopping/artisan-shop-rome.webp",
  beaches: "/images/rome/beaches/barceloneta-rome.webp",
  nightlife: "/images/rome/nightlife/cocktail-bar-rome.webp",
  "with-kids": "/images/rome/with-kids/aquarium-rome.webp",
  "day-trips": "/images/rome/dagsutflykter/tivoli-villa-deste-hadrians-villa.webp",
  events: "/images/rome/sevardheter/piazza-del-popolo.webp",
};

const WHY = [
  { icon: "🏛️", text: "Walk through 2,000 years of history — the Colosseum, Roman Forum and Pantheon stand steps apart in a living, open-air museum." },
  { icon: "🍝", text: "Eat some of Italy's best food, from cacio e pepe and carbonara in Trastevere to supplì, pizza al taglio and world-class gelato." },
  { icon: "🎨", text: "See priceless art for free in the city's churches, plus the Vatican Museums, the Sistine Chapel and Bernini's Borghese Gallery." },
  { icon: "☀️", text: "Enjoy warm 26°C summers, golden-stone piazzas and fountains, and la dolce vita from every café terrace at aperitivo hour." },
];

const ATTRACTION_PREVIEW = [
  { name: "Colosseum", blurb: "The world's greatest Roman amphitheatre and Rome's defining monument.", image: "/images/rome/sevardheter/colosseum.webp" },
  { name: "Vatican Museums", blurb: "Miles of masterpieces ending in Michelangelo's Sistine Chapel.", image: "/images/rome/sevardheter/vatikanmuseet.webp" },
  { name: "Trevi Fountain", blurb: "Baroque theatre in stone — toss a coin to ensure your return.", image: "/images/rome/sevardheter/trevi-fontanen.webp" },
];
const EAT_PREVIEW = [
  { name: "Roscioli", blurb: "A revered deli-restaurant with definitive Roman pasta.", image: "/images/rome/restauranger/roscioli.webp" },
  { name: "Armando al Pantheon", blurb: "Family-run classics beside the Pantheon since 1961.", image: "/images/rome/restauranger/armando-al-pantheon.webp" },
  { name: "Da Enzo al 29", blurb: "Beloved Trastevere trattoria worth the queue.", image: "/images/rome/restaurants/restaurant-rome.avif" },
];
const BEACH_PREVIEW = [
  { name: "Sperlonga", blurb: "A whitewashed clifftop town above turquoise water.", image: "/images/rome/beaches/beach-bar-rome.webp" },
  { name: "Lido di Ostia", blurb: "Rome's closest beach, reachable on a city train ticket.", image: "/images/rome/strander/ostia-lido.webp" },
  { name: "Santa Marinella", blurb: "Cleaner, calmer, family-friendly sand up the coast.", image: "/images/rome/beaches/beach-sunset-rome.webp" },
];

const NEARBY = [
  { city: "Florence", href: "/florence" },
  { city: "Naples", href: "/naples" },
  { city: "Athens", href: "/athens" },
  { city: "Barcelona", href: "/barcelona" },
];

// A function of the observed fare rather than a constant: this answer goes
// verbatim into FAQPage schema, so a figure baked in at authoring time would
// be a stale claim to Google the moment the cron runs again.
function buildFaq(priceLine: string): FaqItem[] {
  return [
  {
    q: "How much are flights to Rome?",
    a: priceLine,
  },
  {
    q: "When is the best time to visit Rome?",
    a: "April–May and late September–October are ideal: warm 20–25°C days, lighter crowds and moderate prices. Summer is hot and busy, while February and November are cheapest but cooler and wetter.",
  },
  {
    q: "Which airport should I fly into?",
    a: "Fiumicino (FCO) is Rome's main airport, linked to Termini station by the 32-minute Leonardo Express train (€14). Low-cost carriers often use the smaller Ciampino (CIA), served by shuttle buses to Termini for around €6.",
  },
  {
    q: "Do I need to book Rome's attractions in advance?",
    a: "Yes for the big three — the Colosseum, the Vatican Museums and the Borghese Gallery all use timed tickets that sell out days or weeks ahead. Many sights, including St Peter's, the Pantheon exterior, churches and every piazza, are free.",
  },
  {
    q: "Is Rome walkable, or do I need public transport?",
    a: "The historic centre is best explored on foot, as the three-line metro skirts much of it. Buses and trams fill the gaps; a single ticket is €1.50 for 100 minutes, and 24–72 hour passes offer good value.",
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
  const fareCopy = await fareCopyFor("rome");
  const year = new Date().getFullYear();
  const title = clampTitle(`Cheap Flights to Rome ${year} — Guide, Prices & Attractions | Flyamba`);
  const description = clampDescription(`Find cheap flights to Rome, Italy${fareCopy.amount ? ` from ${fareCopy.amount} round trip from ${fareCopy.originLabel}` : ""}. Compare fares, plus complete English guides to attractions, restaurants, hotels, transport, weather, shopping, beaches, nightlife, family travel and day trips.`);
  const canonical = `${SITE}/rome`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website", images: [CITY.hero] },
    twitter: { card: "summary_large_image", images: [CITY.hero] },
  };
}

function jsonLd(FAQ: FaqItem[]) {
  const url = `${SITE}/rome`;
  const touristDestination = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Rome",
    description: CITY.tagline,
    geo: { "@type": "GeoCoordinates", latitude: 41.9028, longitude: 12.4964 },
    touristType: ["City Break", "Culture", "History", "Food & Wine"],
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

export default async function RomeHub() {
  // Read here, on the server, and threaded through the copy below.
  const fareCopy = await fareCopyFor("rome");
  const FAQ = buildFaq(priceAnswer("Rome", fareCopy));
  const guideCategories = CATEGORIES.filter((c) => c.slug);

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
        <SmartImage src={CITY.hero} alt="Cheap flights to Rome, Italy" fill fetchPriority="high" loading="eager" sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 lg:px-8">
          {/* Trail added with the schema: this page emitted a BreadcrumbList
              while showing no breadcrumb at all. */}
          <div className="mb-4">
            <Breadcrumbs onDark items={crumbsForSlug("rome")} />
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
            <span className="text-base">{CITY.countryFlag}</span>
            <span>{CITY.country}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 tracking-[0.2em] backdrop-blur">{CITY.iata}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 backdrop-blur">{CITY.summerTemp}°C summer</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold text-white sm:text-7xl">Cheap Flights to Rome</h1>
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
          <span>Direct from New York, London &amp; Paris</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="inline-flex items-center gap-1"><Plane className="h-4 w-4 text-accent" /> {CITY.iata}</span>
        </div>
      </section>

      {/* Sticky in-page sub-nav */}
      <div className="mt-8">
        <CitySubNav citySlug="rome" categories={CATEGORIES} active="" />
      </div>

      {/* 3. Flight search widget */}
      <section id="flights" className="mx-auto mt-10 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <h2 className="mb-3 font-serif text-2xl font-semibold text-foreground sm:text-3xl">Find the Best Flights to Rome</h2>
        <p className="mb-6 max-w-3xl text-muted-foreground">Rome is reachable from the US, the UK and across Europe, though whether a given route is non-stop depends on your airport and the season. Find cheap flights to Rome, compare airlines and book direct. Our AI flight search compares hundreds of routes to find you the cheapest flights to Rome — just describe your trip and Flyamba does the rest.</p>
        <AviasalesWidget toName={CITY.tpName} />

        {/* Observed fares by month. Renders nothing below three months —
            see app/components/FareCalendarSection.tsx. */}
        <FareCalendarSection slug="rome" name="Rome" />

        {/* Observed non-stop fares. Renders nothing without evidence —
            absence is "not observed", never "no non-stop exists". */}
        <NonstopRoutes slug="rome" name="Rome" iata="FCO" />
        <LowFareCta slug="rome" city="Rome" />
      </section>

      {/* 4. Booking insights */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Booking insights</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Smart tips for booking Rome</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarClock, label: "Best time to book", value: "6–8 weeks ahead" },
            // Only claimed at six observed months or more — fare-copy.ts holds the
            // same threshold the chart uses.
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Explore Rome</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {guideCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/rome/${c.slug}`}
              className="group relative h-[180px] overflow-hidden rounded-3xl border border-border"
            >
              <SmartImage src={CATEGORY_IMG[c.slug] ?? CITY.hero} alt={`Rome ${c.label}`} fill sizes="(max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
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
      {/* The authored non-stop table that stood here — invented prices and
          hardcoded stop labels — is gone. NonstopRoutes above renders the
          observed fares instead. */}
      {/* 8. Why Rome */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Why Rome?</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Why Fly to Rome with Flyamba?</h2>
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
        <AskAiWidget destination="Rome" />
      </section>

      {/* 10. Preview sections */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Top attractions</h2>
          <Link href="/rome/attractions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All attractions <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={ATTRACTION_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Where to eat</h2>
          <Link href="/rome/restaurants" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All restaurants <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={EAT_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Best beaches</h2>
          <Link href="/rome/beaches" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All beaches <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={BEACH_PREVIEW} />
      </section>

      {/* CTA */}
      <section className="mx-auto mt-16 max-w-4xl px-4 sm:px-6 lg:px-8">
        <FlightCTA destination={{ slug: "rome", name: "Rome" }} priceFrom={fareCopy.amount ?? undefined} />
      </section>

      {/* 11. Nearby cities */}
      <section id="nearby" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Nearby</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Fly onward from Rome</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {NEARBY.map((n) => (
            <Link key={n.city} href={n.href} className="group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 transition hover:-translate-y-0.5 hover:border-accent">
              <span className="text-sm font-semibold text-foreground">Flights to {n.city}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </section>

      <FaqSection items={FAQ} city="Rome" />


      <GuidesCarousel


        guides={getGuidesByDestination("rome").slice(0, 3)}


        title="Latest Rome guides"


      />



      {/* 12. SEO footer links */}
      <section className="mx-auto mt-16 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Rome guides</p>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
          {guideCategories.map((c) => (
            <Link key={c.slug} href={`/rome/${c.slug}`} className="text-muted-foreground transition hover:text-accent">
              Rome {c.label.toLowerCase()} →
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
