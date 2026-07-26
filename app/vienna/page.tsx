import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { AviasalesWidget } from "@/app/components/AviasalesWidget";
import { AskAiWidget } from "@/app/components/AskAiWidget";
import { FlightCTA } from "@/app/components/FlightCTA";
import { SmartImage } from "@/app/components/SmartImage";
import { CitySubNav } from "@/app/components/CitySubNav";
import { SITE } from "@/app/lib/destination-helpers";
import { usd5, usdStr } from "@/app/lib/format";
import { CATEGORIES } from "@/app/data/vienna-places";
import { ArrowRight, Plane, CalendarClock, TrendingDown, CalendarDays, Route } from "lucide-react";

// ── City facts (self-contained) ──────────────────────────────────────────────
const CITY = {
  name: "Vienna",
  country: "Austria",
  countryFlag: "🇦🇹",
  iata: "VIE",
  tpName: "vienna_at",
  summerTemp: 23,
  tagline: "Imperial palaces, coffee houses and the city of music",
  flightTime: "Nonstop across Europe & beyond",
  hero: "/images/destinations/flights-wien.avif",
};

// Monthly average round-trip fares seeded in SEK; displayed in USD via usd5().
const MONTHLY_SEK: { month: string; sek: number }[] = [
  { month: "Jan", sek: 2800 }, { month: "Feb", sek: 2600 }, { month: "Mar", sek: 2900 },
  { month: "Apr", sek: 3200 }, { month: "May", sek: 3600 }, { month: "Jun", sek: 3900 },
  { month: "Jul", sek: 4200 }, { month: "Aug", sek: 4000 }, { month: "Sep", sek: 3500 },
  { month: "Oct", sek: 3100 }, { month: "Nov", sek: 2700 }, { month: "Dec", sek: 2900 },
];
const LOWEST_SEK = Math.min(...MONTHLY_SEK.map((m) => m.sek));

const NON_STOP = [
  { city: "London", price: 75, iata: "LHR" },
  { city: "Paris", price: 95, iata: "CDG" },
  { city: "Frankfurt", price: 110, iata: "FRA" },
  { city: "New York", price: 430, iata: "JFK" },
  { city: "Chicago", price: 520, iata: "ORD" },
];

const CATEGORY_IMG: Record<string, string> = {
  attractions: "/images/vienna/sevardheter/schonbrunn-slott.webp",
  restaurants: "/images/vienna/restauranger/figlmuller.webp",
  hotels: "/images/vienna/hotell/hotel-sacher-wien.webp",
  transport: "/images/vienna/sevardheter/wiener-staatsoper.webp",
  prices: "/images/vienna/sevardheter/karlskirche.webp",
  weather: "/images/vienna/sevardheter/belvedere.webp",
  shopping: "/images/vienna/shopping/graben.webp",
  nightlife: "/images/vienna/nattliv/loos-american-bar.webp",
  "with-kids": "/images/vienna/med-barn/prater-riesenrad.webp",
  "day-trips": "/images/vienna/dagsutflykter/hallstatt.webp",
  events: "/images/vienna/sevardheter/rathaus.webp",
};

const WHY = [
  { icon: "👑", text: "Walk through the world of the Habsburgs — the vast Schönbrunn and Hofburg palaces, the Imperial Treasury and Empress Sisi's apartments bring six centuries of empire to life." },
  { icon: "🎼", text: "Hear the city that Mozart, Beethoven and Strauss called home, from €13 standing-room tickets at the State Opera to the golden Musikverein and the New Year's Concert." },
  { icon: "☕", text: "Linger in a UNESCO-listed coffee house over a Melange and a slice of Sachertorte, then graze the Naschmarkt — Vienna's café and cake culture is a way of life." },
  { icon: "🎨", text: "See Klimt's golden 'The Kiss' at the Belvedere, Bruegel and Vermeer at the Kunsthistorisches, and Schiele at the Leopold — few cities pack in this much great art." },
];

const ATTRACTION_PREVIEW = [
  { name: "Schönbrunn Palace", blurb: "The Habsburgs' 1,441-room summer palace, gardens and zoo.", image: "/images/vienna/sevardheter/schonbrunn-slott.webp" },
  { name: "St Stephen's Cathedral", blurb: "Vienna's Gothic heart, its tiled roof the city's emblem.", image: "/images/vienna/sevardheter/stephansdom.webp" },
  { name: "Belvedere & Klimt", blurb: "A Baroque palace holding Klimt's golden 'The Kiss'.", image: "/images/vienna/sevardheter/belvedere.webp" },
];
const EAT_PREVIEW = [
  { name: "Figlmüller", blurb: "The plate-swamping Wiener schnitzel, an institution since 1905.", image: "/images/vienna/restauranger/figlmuller.webp" },
  { name: "Café Sacher", blurb: "The birthplace of the Original Sacher-Torte behind the Opera.", image: "/images/vienna/restauranger/caf-sacher.webp" },
  { name: "Plachutta Wollzeile", blurb: "The temple of Tafelspitz, the emperor's favourite boiled beef.", image: "/images/vienna/restauranger/plachutta-wollzeile.webp" },
];

const NEARBY = [
  { city: "Salzburg", href: "/salzburg" },
  { city: "Budapest", href: "/budapest" },
  { city: "Prague", href: "/prague" },
  { city: "Bratislava", href: "/bratislava" },
];

const FAQ = [
  {
    q: "How much are flights to Vienna?",
    a: `Round-trip fares to Vienna start from around ${usdStr(LOWEST_SEK)} in the low season (February and November), rising to roughly $400 during the June–August summer peak. Booking five to seven weeks ahead and flying midweek gets the best prices.`,
  },
  {
    q: "When is the best time to visit Vienna?",
    a: "April–May and September–early October are ideal: mild weather, gardens in bloom or golden, lighter crowds and moderate prices. December is magical for the Christmas markets but busy and pricier, while January and February are cheapest and host the glittering ball season.",
  },
  {
    q: "How do I get from Vienna Airport into the city?",
    a: "Vienna Airport (VIE) is 18 km southeast. The cheapest link is the S7 suburban train to Wien Mitte (about 25 minutes, €4.30); the non-stop City Airport Train (CAT) does it in 16 minutes for €14.90, and mainline trains reach the Hauptbahnhof in 15 minutes. Taxis cost around €35–45.",
  },
  {
    q: "Is Vienna walkable, or do I need public transport?",
    a: "The compact Innere Stadt (1st district) is best explored on foot. For everything else, Vienna has one of Europe's best transport systems — five metro lines and extensive trams and buses on one integrated ticket. A single fare is €2.40, and 24–72 hour and weekly passes offer great value.",
  },
  {
    q: "Do I need to book Vienna's attractions in advance?",
    a: "Book Schönbrunn and the Belvedere online for timed entry, especially in summer and December. Many sights are free, including the churches, the Belvedere and palace gardens, the parks, the Prater and the Central Cemetery, and the State Opera sells €13 standing-room tickets 80 minutes before curtain.",
  },
];

export function generateMetadata(): Metadata {
  const year = new Date().getFullYear();
  const title = `Cheap Flights to Vienna ${year} — Guide, Prices & Attractions | Flyamba`;
  const description = `Find cheap flights to Vienna, Austria from ${usdStr(LOWEST_SEK)}. Compare fares, plus complete English guides to attractions, restaurants, hotels, transport, weather, shopping, nightlife, family travel, day trips and events.`;
  const canonical = `${SITE}/vienna`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website", images: [CITY.hero] },
    twitter: { card: "summary_large_image", images: [CITY.hero] },
  };
}

function jsonLd() {
  const url = `${SITE}/vienna`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Austria" },
      { "@type": "ListItem", position: 3, name: "Vienna", item: url },
    ],
  };
  const touristDestination = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Vienna",
    description: CITY.tagline,
    geo: { "@type": "GeoCoordinates", latitude: 48.2082, longitude: 16.3738 },
    touristType: ["City Break", "Culture", "History", "Music", "Food & Coffee"],
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
  return [breadcrumb, touristDestination, faqPage];
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

export default function ViennaHub() {
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
        <SmartImage src={CITY.hero} alt="Cheap flights to Vienna, Austria" fill priority sizes="100vw" className="object-cover" />
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
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold text-white sm:text-7xl">Cheap Flights to Vienna</h1>
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
          <span>Direct from New York, London &amp; Frankfurt</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="inline-flex items-center gap-1"><Plane className="h-4 w-4 text-accent" /> {CITY.iata}</span>
        </div>
      </section>

      {/* Sticky in-page sub-nav */}
      <div className="mt-8">
        <CitySubNav citySlug="vienna" categories={CATEGORIES} active="" />
      </div>

      {/* 3. Flight search widget */}
      <section id="flights" className="mx-auto mt-10 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <h2 className="mb-3 font-serif text-2xl font-semibold text-foreground sm:text-3xl">Find the Best Flights to Vienna</h2>
        <p className="mb-6 max-w-3xl text-muted-foreground">Flying to Vienna is easy from almost anywhere, with direct routes from New York, London, Frankfurt and other major hubs — making Vienna one of the most rewarding city-break destinations from the US, UK and Europe. Find cheap flights to Vienna, compare airlines and book direct. Our AI flight search compares hundreds of routes to find you the cheapest flights to Vienna — just describe your trip and Flyamba does the rest.</p>
        <AviasalesWidget toName={CITY.tpName} />
      </section>

      {/* 4. Booking insights */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Booking insights</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Smart tips for booking Vienna</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarClock, label: "Best time to book", value: "5–7 weeks ahead" },
            { icon: TrendingDown, label: "Cheapest month", value: `${cheapestLabel} (${usdStr(cheapest.sek)} avg)` },
            { icon: CalendarDays, label: "Cheapest day to fly", value: "Tuesday & Wednesday" },
            { icon: Route, label: "Direct flights", value: "Yes — from New York, London, Frankfurt" },
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Explore Vienna</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {guideCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/vienna/${c.slug}`}
              className="group relative h-[180px] overflow-hidden rounded-3xl border border-border"
            >
              <SmartImage src={CATEGORY_IMG[c.slug] ?? CITY.hero} alt={`Vienna ${c.label}`} fill sizes="(max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">When is it cheapest to fly to Vienna?</h2>
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Non-stop to Vienna from {NON_STOP.length} cities</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NON_STOP.map((r) => (
            <div key={r.city} className="flex items-center justify-between rounded-3xl border border-border bg-card p-6">
              <div>
                <p className="font-serif text-lg font-semibold text-foreground">{r.city}</p>
                <p className="text-xs text-muted-foreground">{r.iata} → VIE · nonstop</p>
              </div>
              <p className="font-serif text-2xl text-accent">${r.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Why Vienna */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Why Vienna?</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Why Fly to Vienna with Flyamba?</h2>
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
        <AskAiWidget destination="Vienna" />
      </section>

      {/* 10. Preview sections */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Top attractions</h2>
          <Link href="/vienna/attractions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All attractions <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={ATTRACTION_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Where to eat</h2>
          <Link href="/vienna/restaurants" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All restaurants <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={EAT_PREVIEW} />
      </section>

      {/* CTA */}
      <section className="mx-auto mt-16 max-w-4xl px-4 sm:px-6 lg:px-8">
        <FlightCTA />
      </section>

      {/* 11. Nearby cities */}
      <section id="nearby" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Nearby</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Fly onward from Vienna</h2>
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
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Vienna guides</p>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
          {guideCategories.map((c) => (
            <Link key={c.slug} href={`/vienna/${c.slug}`} className="text-muted-foreground transition hover:text-accent">
              Vienna {c.label.toLowerCase()} →
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
