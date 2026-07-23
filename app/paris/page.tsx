import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { AviasalesWidget } from "@/app/components/AviasalesWidget";
import { AskAiWidget } from "@/app/components/AskAiWidget";
import { CitySubNav } from "@/app/components/CitySubNav";
import { CATEGORIES } from "@/app/data/paris-places";
import { SITE } from "@/app/lib/destination-helpers";
import { usd, usd5, usdStr } from "@/app/lib/format";
import { ArrowRight, Plane, CalendarClock, TrendingDown, CalendarDays, Route } from "lucide-react";

// ── Self-contained Paris facts (no rich Destination import) ──────────────────
const CITY = {
  name: "Paris",
  country: "France",
  countryFlag: "🇫🇷",
  iata: "CDG",
  tpName: "paris_fr",
  summerTemp: 22,
  price: 3000, // SEK; ~$286 lowest round-trip
  flightTime: "8h 15m from New York",
  tagline: "The eternal city of light, art and romance",
  image: "/images/destinations/flights-paris.avif",
} as const;

const MONTHLY_SEK: { month: string; sek: number }[] = [
  { month: "Jan", sek: 3000 },
  { month: "Feb", sek: 2800 },
  { month: "Mar", sek: 3100 },
  { month: "Apr", sek: 3400 },
  { month: "May", sek: 3700 },
  { month: "Jun", sek: 4000 },
  { month: "Jul", sek: 4300 },
  { month: "Aug", sek: 4100 },
  { month: "Sep", sek: 3600 },
  { month: "Oct", sek: 3200 },
  { month: "Nov", sek: 2800 },
  { month: "Dec", sek: 3000 },
];

const NON_STOP = [
  { city: "New York", price: 420, iata: "JFK" },
  { city: "Montreal", price: 385, iata: "YUL" },
  { city: "London", price: 78, iata: "LHR" },
  { city: "Los Angeles", price: 565, iata: "LAX" },
  { city: "Dubai", price: 495, iata: "DXB" },
  { city: "Tokyo", price: 720, iata: "HND" },
];

const WHY_PARIS = [
  { icon: "🗼", text: "Home to the world's most visited monuments — the Eiffel Tower, Arc de Triomphe and a magnificently restored Notre-Dame." },
  { icon: "🎨", text: "An art capital without rival: the Louvre, the Musée d'Orsay's Impressionists, the Orangerie and more than 130 museums." },
  { icon: "🥐", text: "A global capital of gastronomy — from three-Michelin-star temples to corner bistros, boulangeries and street-side crêpes." },
  { icon: "💕", text: "Romance at every turn: Seine cruises, café terraces, the Marais, Montmartre and sparkling evening skylines." },
];

const NEARBY = [
  { city: "London", href: "/london" },
  { city: "Amsterdam", href: "/amsterdam" },
  { city: "Brussels", href: "/brussels" },
  { city: "Nice", href: "/nice" },
];

const CATEGORY_CARDS: { slug: string; label: string; blurb: string; image: string }[] = [
  { slug: "attractions", label: "Attractions", blurb: "The Eiffel Tower, Louvre, Notre-Dame and 18 more must-see sights.", image: "/images/paris/sevardheter/eiffeltornet-la-tour-eiffel.webp" },
  { slug: "restaurants", label: "Restaurants", blurb: "From historic bouillons to Michelin-starred neo-bistros.", image: "/images/paris/restauranger/le-comptoir-du-relais.webp" },
  { slug: "hotels", label: "Hotels", blurb: "Palace grande dames, boutique hideaways and stylish budget stays.", image: "/images/paris/hotell/le-bristol.webp" },
  { slug: "transport", label: "Transport", blurb: "The Métro, RER, airports and how to get around the city.", image: "/images/paris/sevardheter/arc-de-triomphe.webp" },
  { slug: "prices", label: "Prices", blurb: "What a trip to Paris really costs, from flights to a daily budget.", image: "/images/destinations/flights-paris.avif" },
  { slug: "weather", label: "Weather", blurb: "When to go — season by season, month by month.", image: "/images/paris/sevardheter/jardin-du-luxembourg.webp" },
  { slug: "shopping", label: "Shopping", blurb: "Grand department stores, Marais boutiques and famous markets.", image: "/images/paris/shopping/galeries-lafayette.webp" },
  { slug: "nightlife", label: "Nightlife", blurb: "Cabarets, jazz cellars, cocktail speakeasies and techno clubs.", image: "/images/paris/nattliv/moulin-rouge.webp" },
  { slug: "with-kids", label: "With Kids", blurb: "Science museums, parks, aquariums and Disneyland Paris.", image: "/images/paris/med-barn/disneyland-paris.webp" },
  { slug: "day-trips", label: "Day Trips", blurb: "Versailles, Giverny, Champagne, Fontainebleau and Chartres.", image: "/images/paris/dagsutflykter/versailles.webp" },
  { slug: "events", label: "Events", blurb: "Festivals, the calendar and the best times to visit.", image: "/images/paris/sevardheter/seine-kryssning-bateaux-parisiens.webp" },
];

const ATTRACTION_PREVIEW = [
  { name: "Eiffel Tower", blurb: "The 330-metre icon of Paris, sparkling every hour after dark.", image: "/images/paris/sevardheter/eiffeltornet-la-tour-eiffel.webp" },
  { name: "The Louvre", blurb: "The world's most visited museum, from the Mona Lisa onward.", image: "/images/paris/sevardheter/louvren-muse-du-louvre.webp" },
  { name: "Montmartre", blurb: "The artists' hilltop crowned by the white domes of Sacré-Cœur.", image: "/images/paris/sevardheter/sacr-cur-montmartre.webp" },
];
const EAT_PREVIEW = [
  { name: "Le Comptoir du Relais", blurb: "The Saint-Germain bistro that defined modern 'bistronomy'.", image: "/images/paris/restauranger/le-comptoir-du-relais.webp" },
  { name: "Bouillon Chartier", blurb: "Cheap French classics under a listed 1896 Belle Époque hall.", image: "/images/paris/restauranger/bouillon-chartier.webp" },
  { name: "Septime", blurb: "Bertrand Grébaut's Michelin-starred, produce-led neo-bistro.", image: "/images/paris/restauranger/septime.webp" },
];
const TRIP_PREVIEW = [
  { name: "Versailles", blurb: "Louis XIV's colossal palace and gardens, 40 minutes away.", image: "/images/paris/dagsutflykter/versailles.webp" },
  { name: "Giverny", blurb: "Monet's water-lily garden and Japanese bridge in Normandy.", image: "/images/paris/dagsutflykter/giverny-monets-hus.webp" },
  { name: "Reims & Champagne", blurb: "A coronation cathedral and cellar tastings, 45 min by TGV.", image: "/images/paris/dagsutflykter/reims.webp" },
];

export function generateMetadata(): Metadata {
  const year = new Date().getFullYear();
  const title = `Cheap Flights to Paris ${year} — Guide, Prices & Attractions | Flyamba`;
  const description =
    "Find cheap flights to Paris, France from around $286. Compare fares, then plan your trip with complete English guides to attractions, restaurants, hotels, transport, weather, shopping, nightlife, family travel and day trips — all prices in USD.";
  const canonical = `${SITE}/paris`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website", images: [CITY.image] },
    twitter: { card: "summary_large_image", images: [CITY.image] },
  };
}

function jsonLd() {
  const url = `${SITE}/paris`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "France" },
      { "@type": "ListItem", position: 3, name: "Paris", item: url },
    ],
  };
  const touristDestination = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Paris",
    description: CITY.tagline,
    geo: { "@type": "GeoCoordinates", latitude: 48.8566, longitude: 2.3522 },
    touristType: ["City Break", "Culture", "Romance", "Food & Wine"],
    url,
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much are flights to Paris?",
        acceptedAnswer: { "@type": "Answer", text: "Round-trip fares to Paris (CDG) start from around $286, with the lowest prices typically in February and November and the highest in July. Booking six to eight weeks ahead usually gets the best deal." },
      },
      {
        "@type": "Question",
        name: "What is the cheapest month to fly to Paris?",
        acceptedAnswer: { "@type": "Answer", text: "February and November are the cheapest months to fly to Paris, with average round-trip fares around $265–267. Summer (June to August) is the most expensive." },
      },
      {
        "@type": "Question",
        name: "Which airports serve Paris?",
        acceptedAnswer: { "@type": "Answer", text: "Paris is served mainly by Charles de Gaulle (CDG), the largest international hub, and Orly (ORY) to the south. Beauvais (BVA) handles some low-cost flights. CDG connects to central Paris in about 35 minutes on the RER B." },
      },
      {
        "@type": "Question",
        name: "How many days do you need in Paris?",
        acceptedAnswer: { "@type": "Answer", text: "Three to four days covers the essential sights — the Eiffel Tower, Louvre, Musée d'Orsay, Notre-Dame, Montmartre and the Marais — with time for cafés and a Seine cruise. Five or more days lets you add day trips such as Versailles or Giverny." },
      },
    ],
  };
  return [breadcrumb, touristDestination, faq];
}

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

export default function ParisHub() {
  const usdMonths = MONTHLY_SEK.map((m) => ({ month: m.month, price: usd5(m.sek) }));
  const min = Math.min(...usdMonths.map((m) => m.price));
  const max = Math.max(...usdMonths.map((m) => m.price));
  const cheapest = MONTHLY_SEK.reduce((a, b) => (b.sek < a.sek ? b : a));

  return (
    <div className="min-h-screen bg-background">
      {jsonLd().map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s).replace(/</g, "\\u003c") }} />
      ))}
      <Navbar transparent />

      {/* 1. Hero */}
      <section className="relative isolate h-[80vh] min-h-[560px] w-full overflow-hidden">
        <Image src={CITY.image} alt="Cheap flights to Paris, France" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
            <span className="text-base">{CITY.countryFlag}</span>
            <span>{CITY.country}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 tracking-[0.2em] backdrop-blur">{CITY.iata}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 backdrop-blur">{CITY.summerTemp}°C summer</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold text-white sm:text-7xl">Cheap Flights to Paris</h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">{CITY.tagline}</p>
        </div>
      </section>

      {/* 2. Flight stats bar */}
      <section className="relative z-10 mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-border bg-card px-6 py-4 text-sm font-medium text-foreground shadow-elegant">
          <span>from <span className="font-serif text-lg text-accent">{usdStr(CITY.price)}</span></span>
          <span className="text-muted-foreground/40">•</span>
          <span>{CITY.flightTime}</span>
          <span className="text-muted-foreground/40">•</span>
          <span>Nonstop flights worldwide</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="inline-flex items-center gap-1"><Plane className="h-4 w-4 text-accent" /> {CITY.iata}</span>
        </div>
      </section>

      {/* Sticky sub-nav */}
      <div className="mt-8">
        <CitySubNav citySlug="paris" categories={CATEGORIES} active="" />
      </div>

      {/* 3. Flight search widget */}
      <section id="flights" className="mx-auto mt-10 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <AviasalesWidget toName={CITY.tpName} />
      </section>

      {/* 4. Booking insights */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Booking insights</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Smart tips for booking Paris</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarClock, label: "Best time to book", value: "6–8 weeks ahead" },
            { icon: TrendingDown, label: "Cheapest month", value: `${cheapest.month === "Feb" ? "February" : cheapest.month} ($${usd(cheapest.sek)} avg)` },
            { icon: CalendarDays, label: "Cheapest day to fly", value: "Tuesday & Wednesday" },
            { icon: Route, label: "Direct flights", value: "Yes — from New York, Montreal, London" },
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Explore Paris</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORY_CARDS.map((c) => (
            <Link key={c.slug} href={`/paris/${c.slug}`} className="group overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-elegant">
              <div className="relative h-44 overflow-hidden">
                <Image src={c.image} alt={`Paris ${c.label}`} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg font-semibold text-foreground">{c.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.blurb}</p>
                <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent">Explore <ArrowRight className="h-3.5 w-3.5" /></p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Price by month (USD) */}
      <section id="cheapest-months" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Prices by month</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">When is it cheapest to fly to Paris?</h2>
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Non-stop to Paris from {NON_STOP.length} cities</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NON_STOP.map((r) => (
            <div key={r.city} className="flex items-center justify-between rounded-3xl border border-border bg-card p-6">
              <div>
                <p className="font-serif text-lg font-semibold text-foreground">{r.city}</p>
                <p className="text-xs text-muted-foreground">{r.iata} → CDG · nonstop</p>
              </div>
              <p className="font-serif text-2xl text-accent">${r.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Why Paris */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Why Paris?</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">A city worth the flight</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_PARIS.map((w) => (
            <div key={w.text} className="rounded-3xl border border-border bg-card p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-xl" aria-hidden>{w.icon}</span>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. AI chat */}
      <section className="mx-auto mt-16 max-w-4xl px-4 sm:px-6 lg:px-8">
        <AskAiWidget destination="Paris" />
      </section>

      {/* 10. Preview sections */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Top attractions</h2>
          <Link href="/paris/attractions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All attractions <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={ATTRACTION_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Where to eat</h2>
          <Link href="/paris/restaurants" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All restaurants <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={EAT_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Best day trips</h2>
          <Link href="/paris/day-trips" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All day trips <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={TRIP_PREVIEW} />
      </section>

      {/* 11. Nearby cities */}
      <section id="nearby" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Nearby</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Fly onward from Paris</h2>
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
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Paris guides</p>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.filter((c) => c.slug).map((c) => (
            <Link key={c.slug} href={`/paris/${c.slug}`} className="text-muted-foreground transition hover:text-accent">
              Paris {c.label.toLowerCase()} →
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
