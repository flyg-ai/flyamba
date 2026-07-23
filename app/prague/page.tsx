import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { AviasalesWidget } from "@/app/components/AviasalesWidget";
import { AskAiWidget } from "@/app/components/AskAiWidget";
import { CitySubNav } from "@/app/components/CitySubNav";
import { SmartImage } from "@/app/components/SmartImage";
import { PRAGUE_CATEGORIES } from "@/app/data/prague-places";
import { SITE } from "@/app/lib/destination-helpers";
import { usd, usd5, usdStr } from "@/app/lib/format";
import { ArrowRight, Plane, CalendarClock, TrendingDown, CalendarDays, Route } from "lucide-react";

// ── City facts (self-contained; SEK prices → USD for display) ────────────────
const CITY = {
  name: "Prague",
  country: "Czechia",
  countryFlag: "🇨🇿",
  iata: "PRG",
  tpName: "prag_cz",
  summerTemp: 22,
  tagline: "Fairytale spires, cheap beer and Bohemian charm",
  heroImage: "/images/destinations/flights-prag.avif",
  coordinates: { lat: 50.0755, lng: 14.4378 },
  flightTime: "From 8h 30m nonstop",
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// Average round-trip fares seeded in SEK.
const MONTHLY_SEK = [2600, 2400, 2700, 3000, 3400, 3700, 4000, 3800, 3300, 2900, 2500, 2700];

const NON_STOP = [
  { city: "London", price: 79, iata: "LHR" },
  { city: "Paris", price: 99, iata: "CDG" },
  { city: "Amsterdam", price: 89, iata: "AMS" },
  { city: "New York", price: 459, iata: "JFK" },
  { city: "Dubai", price: 389, iata: "DXB" },
  { city: "Doha", price: 429, iata: "DOH" },
];

const ATTRACTION_PREVIEW = [
  { name: "Charles Bridge", blurb: "Prague's iconic Gothic bridge of baroque saints and castle views.", image: "/images/prague/sevardheter/karlsbron.webp" },
  { name: "Prague Castle", blurb: "The largest ancient castle complex in the world, above the Vltava.", image: "/images/prague/sevardheter/pragborgen.webp" },
  { name: "Old Town Square", blurb: "The medieval heart of the city and its Astronomical Clock.", image: "/images/prague/sevardheter/old-town-square.webp" },
];
const EAT_PREVIEW = [
  { name: "Lokál", blurb: "Fresh-tank Pilsner Urquell and proper Czech pub classics.", image: "/images/prague/restauranger/lokl.webp" },
  { name: "Field", blurb: "Prague's Michelin-starred temple to modern Czech produce.", image: "/images/prague/restauranger/field-restaurant.webp" },
  { name: "Café Savoy", blurb: "A restored 1893 grand café under a soaring painted ceiling.", image: "/images/prague/restauranger/caf-savoy.webp" },
];
const NIGHT_PREVIEW = [
  { name: "U Zlatého Tygra", blurb: "A legendary, unspoilt Old Town beer hall pouring perfect pilsner.", image: "/images/prague/nattliv/u-zlatho-tygra.webp" },
  { name: "Hemingway Bar", blurb: "A world-ranked speakeasy of rum, absinthe and classic cocktails.", image: "/images/prague/nattliv/hemingway-bar.webp" },
  { name: "Cross Club", blurb: "An extraordinary industrial art-club built from recycled machinery.", image: "/images/prague/nattliv/cross-club.webp" },
];

const WHY = [
  { icon: "🍺", text: "Some of the world's best and cheapest beer — a half-litre of world-class Czech pilsner costs barely $2." },
  { icon: "🏰", text: "A fairytale skyline of a hundred spires, a hilltop castle and a medieval bridge, all walkable and floodlit by night." },
  { icon: "💶", text: "Outstanding value: a great European capital where your money goes roughly twice as far as in Paris or London." },
  { icon: "🎭", text: "A deep cultural seam of Kafka, Mucha, Mozart and Art Nouveau, plus a buzzing beer-hall and club nightlife." },
];

const NEARBY = [
  { city: "Vienna", href: "/vienna" },
  { city: "Budapest", href: "/budapest" },
  { city: "Berlin", href: "/berlin" },
  { city: "Krakow", href: "/krakow" },
];

const FAQ = [
  {
    q: "How much are flights to Prague?",
    a: `Round-trip fares to Prague (PRG) start from around ${usdStr(Math.min(...MONTHLY_SEK))} in the cheapest months. Prices are lowest in winter (outside the Christmas period) and highest in July and August, so booking 6–8 weeks ahead and flying in the shoulder seasons of spring or autumn gets the best value.`,
  },
  {
    q: "Is there a direct flight to Prague?",
    a: "Yes. Václav Havel Airport Prague (PRG) has nonstop flights from major hubs including London, Paris, Amsterdam, Frankfurt, Madrid and Istanbul, plus long-haul direct services from New York, Dubai, Doha and Seoul. From most of Europe it is a short 1–2 hour hop.",
  },
  {
    q: "What is the cheapest month to fly to Prague?",
    a: `Based on average fares, ${cheapestMonthName()} is typically the cheapest month to fly to Prague, when round-trip prices dip to around ${usdStr(Math.min(...MONTHLY_SEK))}. January and November are also good value, while summer and the Christmas markets season are the most expensive.`,
  },
  {
    q: "How many days do you need in Prague?",
    a: "Three days is enough to see the highlights — Prague Castle, Charles Bridge, the Old Town Square and the Jewish Quarter — at a relaxed pace. Four or five days lets you add the Vyšehrad fortress, Petřín Hill, museums, and a day trip to Kutná Hora or Karlštejn Castle.",
  },
  {
    q: "Is Prague expensive to visit?",
    a: "No — Prague is one of the best-value capitals in Europe. Beer is famously cheap (often under $2 a half-litre), public transport and meals are affordable, and many of the best sights, from the castle grounds to Charles Bridge, are free to explore.",
  },
];

function cheapestMonthIdx() {
  let idx = 0;
  for (let i = 1; i < MONTHLY_SEK.length; i++) if (MONTHLY_SEK[i] < MONTHLY_SEK[idx]) idx = i;
  return idx;
}
function cheapestMonthName() {
  return MONTH_NAMES[cheapestMonthIdx()];
}

export function generateMetadata(): Metadata {
  const year = new Date().getFullYear();
  const title = `Cheap Flights to Prague ${year} — Guide, Prices & Attractions | Flyamba`;
  const description = `Find cheap flights to Prague, Czechia from ${usdStr(Math.min(...MONTHLY_SEK))}. Compare fares to Václav Havel Airport (PRG), plus complete English guides to Prague attractions, restaurants, hotels, transport, weather, shopping, nightlife, family travel and day trips.`;
  const canonical = `${SITE}/prague`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website", images: [CITY.heroImage] },
    twitter: { card: "summary_large_image", images: [CITY.heroImage] },
  };
}

function jsonLd() {
  const url = `${SITE}/prague`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Czechia" },
      { "@type": "ListItem", position: 3, name: "Prague", item: url },
    ],
  };
  const touristDestination = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Prague",
    description: CITY.tagline,
    geo: { "@type": "GeoCoordinates", latitude: CITY.coordinates.lat, longitude: CITY.coordinates.lng },
    touristType: ["City Break", "Culture", "Nightlife"],
    address: { "@type": "PostalAddress", addressLocality: "Prague", addressCountry: "CZ" },
    url,
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return [breadcrumb, touristDestination, faq];
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

export default function PragueHub() {
  const categories = PRAGUE_CATEGORIES.filter((c) => c.slug);
  const usdMonths = MONTHLY_SEK.map((sek, i) => ({ month: MONTHS[i], price: usd5(sek) }));
  const min = Math.min(...usdMonths.map((m) => m.price));
  const max = Math.max(...usdMonths.map((m) => m.price));
  const cheapUsd = usd(Math.min(...MONTHLY_SEK));

  return (
    <div className="min-h-screen bg-background">
      {jsonLd().map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s).replace(/</g, "\\u003c") }} />
      ))}
      <Navbar transparent />

      {/* 1. Hero */}
      <section className="relative isolate h-[80vh] min-h-[560px] w-full overflow-hidden">
        <SmartImage src={CITY.heroImage} alt="Cheap flights to Prague, Czechia" fill priority sizes="100vw" className="object-cover" />
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
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold text-white sm:text-7xl">Cheap Flights to Prague</h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">{CITY.tagline}</p>
        </div>
      </section>

      {/* 2. Flight stats bar */}
      <section className="relative z-10 mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-border bg-card px-6 py-4 text-sm font-medium text-foreground shadow-elegant">
          <span>from <span className="font-serif text-lg text-accent">{usdStr(Math.min(...MONTHLY_SEK))}</span></span>
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
        <CitySubNav citySlug="prague" categories={PRAGUE_CATEGORIES} active="" />
      </div>

      {/* 3. Flight search widget */}
      <section id="flights" className="mx-auto mt-10 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <AviasalesWidget toName={CITY.tpName} />
      </section>

      {/* 4. Booking insights */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Booking insights</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Smart tips for booking Prague</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarClock, label: "Best time to book", value: "6–8 weeks ahead" },
            { icon: TrendingDown, label: "Cheapest month", value: `${cheapestMonthName()} ($${cheapUsd} avg)` },
            { icon: CalendarDays, label: "Cheapest day to fly", value: "Tuesday & Wednesday" },
            { icon: Route, label: "Direct flights", value: "Yes — from New York, London, Dubai" },
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Explore Prague</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/prague/${c.slug}`}
              className="group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-5 transition hover:-translate-y-0.5 hover:border-accent"
            >
              <span className="flex items-center gap-2.5 text-sm font-semibold text-foreground">
                <span className="text-xl" aria-hidden>{c.emoji}</span> {c.label}
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Price by month (USD) */}
      <section id="cheapest-months" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Prices by month</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">When is it cheapest to fly to Prague?</h2>
        <p className="mt-2 text-sm text-muted-foreground">Average round-trip fare, USD. {cheapestMonthName()} is the cheapest month at about ${cheapUsd}.</p>
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

      {/* 7. Non-stop cities */}
      <section id="nonstop" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Direct routes</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Non-stop to Prague from {NON_STOP.length} cities</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NON_STOP.map((r) => (
            <div key={r.city} className="flex items-center justify-between rounded-3xl border border-border bg-card p-6">
              <div>
                <p className="font-serif text-lg font-semibold text-foreground">{r.city}</p>
                <p className="text-xs text-muted-foreground">{r.iata} → PRG · nonstop</p>
              </div>
              <p className="font-serif text-2xl text-accent">${r.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Why Prague */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Why Prague?</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">A city worth the flight</h2>
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
        <AskAiWidget destination="Prague" />
      </section>

      {/* 10. Preview sections */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Top attractions</h2>
          <Link href="/prague/attractions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All attractions <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={ATTRACTION_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Where to eat</h2>
          <Link href="/prague/restaurants" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All restaurants <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={EAT_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">After dark</h2>
          <Link href="/prague/nightlife" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All nightlife <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={NIGHT_PREVIEW} />
      </section>

      {/* 11. CTA */}
      <section className="mx-auto mt-16 max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-accent/10 via-card to-card p-8 text-center sm:p-10">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-accent text-accent-foreground shadow-glow">
            <Plane className="h-6 w-6 -rotate-45" />
          </div>
          <h2 className="mt-5 font-serif text-2xl font-semibold text-foreground sm:text-3xl">Ready to go?</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">Compare live fares to Prague across airlines and book direct — from around {usdStr(Math.min(...MONTHLY_SEK))}.</p>
          <a
            href="https://www.skyscanner.com/flights/prague/"
            target="_blank"
            rel="nofollow noopener"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-glow transition hover:scale-105"
          >
            Find flights to Prague <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* 12. Nearby cities */}
      <section id="nearby" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Nearby</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Fly onward from Prague</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {NEARBY.map((n) => (
            <Link key={n.city} href={n.href} className="group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 transition hover:-translate-y-0.5 hover:border-accent">
              <span className="text-sm font-semibold text-foreground">Flights to {n.city}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </section>

      {/* 13. FAQ */}
      <section className="mx-auto mt-16 max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Good to know</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Prague flight FAQs</h2>
        <div className="mt-8 space-y-5">
          {FAQ.map((f) => (
            <div key={f.q} className="rounded-3xl border border-border bg-card p-6">
              <h3 className="font-serif text-lg font-semibold text-foreground">{f.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 14. SEO footer links */}
      <section className="mx-auto mt-16 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Prague guides</p>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.slug} href={`/prague/${c.slug}`} className="text-muted-foreground transition hover:text-accent">
              Prague {c.label.toLowerCase()} →
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
