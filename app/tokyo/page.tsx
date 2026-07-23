import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { AviasalesWidget } from "@/app/components/AviasalesWidget";
import { AskAiWidget } from "@/app/components/AskAiWidget";
import { CitySubNav } from "@/app/components/CitySubNav";
import { CATEGORIES } from "@/app/data/tokyo-places";
import { usd5, usdStr } from "@/app/lib/format";
import { ArrowRight, Plane, CalendarClock, TrendingDown, CalendarDays, Route } from "lucide-react";

// ── Self-contained Tokyo hub data ────────────────────────────────────────────
const SITE = "https://flyamba.com";
const CITY = "Tokyo";
const SLUG = "tokyo";
const COUNTRY = "Japan";
const IATA = "NRT";
const TP_NAME = "tokyo_jp";
const SUMMER_TEMP = 26;
const TAGLINE = "Neon nights, ancient shrines and the world's best food";
const HERO = "/images/destinations/flights-tokyo.avif";
const FLIGHT_TIME = "11h 30m nonstop from the US West Coast";

// Monthly average round-trip fares, stored as SEK (converted to USD for display).
const MONTHLY_SEK = [
  { month: "Jan", price: 5500 },
  { month: "Feb", price: 5200 },
  { month: "Mar", price: 5800 },
  { month: "Apr", price: 6100 },
  { month: "May", price: 6500 },
  { month: "Jun", price: 6900 },
  { month: "Jul", price: 7200 },
  { month: "Aug", price: 7000 },
  { month: "Sep", price: 6300 },
  { month: "Oct", price: 5800 },
  { month: "Nov", price: 5400 },
  { month: "Dec", price: 5700 },
];

const NON_STOP = [
  { city: "Los Angeles", price: 620, iata: "LAX" },
  { city: "San Francisco", price: 650, iata: "SFO" },
  { city: "New York", price: 780, iata: "JFK" },
  { city: "Seattle", price: 610, iata: "SEA" },
  { city: "London", price: 720, iata: "LHR" },
  { city: "Paris", price: 760, iata: "CDG" },
  { city: "Singapore", price: 420, iata: "SIN" },
  { city: "Bangkok", price: 310, iata: "BKK" },
  { city: "Seoul", price: 190, iata: "ICN" },
];

const WHY_VISIT = [
  { icon: "🍣", text: "The world's greatest food city, with more Michelin stars than anywhere else and unforgettable street eats, sushi, ramen and izakaya." },
  { icon: "⛩️", text: "A mesmerising blend of the ancient and the futuristic — serene shrines and gardens beside neon skyscrapers and robot-run hotels." },
  { icon: "🌸", text: "Spellbinding seasons, from cherry blossom in spring to fiery maples in autumn, plus day trips to Mount Fuji and hot-spring towns." },
  { icon: "🚅", text: "Astonishingly safe, clean and efficient, with the world's best public transport making a megacity of 37 million effortless to explore." },
];

const ATTRACTION_PREVIEW = [
  { name: "Senso-ji Temple", blurb: "Tokyo's oldest temple, approached through the giant Kaminarimon gate and Nakamise market street.", image: "/images/tokyo/sevardheter/senso-ji.webp" },
  { name: "Shibuya Crossing", blurb: "The world's busiest pedestrian scramble beneath a canyon of neon screens.", image: "/images/tokyo/sevardheter/shibuya-crossing.webp" },
  { name: "teamLab Planets", blurb: "An immersive, barefoot digital-art museum of water, light and infinite mirrors.", image: "/images/tokyo/sevardheter/teamlab-planets.webp" },
];
const EAT_PREVIEW = [
  { name: "Sushi Saito", blurb: "A tiny three-star counter many call the finest sushi in Japan.", image: "/images/tokyo/restauranger/sushi-saito.webp" },
  { name: "Ichiran Ramen", blurb: "Solo-booth tonkotsu ramen you customise to the last detail.", image: "/images/tokyo/restauranger/ichiran-ramen.webp" },
  { name: "Omoide Yokocho", blurb: "A smoky warren of tiny yakitori and drinking stalls by Shinjuku Station.", image: "/images/tokyo/restauranger/omoide-yokocho-shinjuku.webp" },
];
const DAYTRIP_PREVIEW = [
  { name: "Hakone & Mt Fuji", blurb: "Hot springs, a volcanic valley and postcard Fuji views on a scenic loop.", image: "/images/tokyo/dagsutflykter/mt-fuji-hakone.webp" },
  { name: "Kamakura", blurb: "A seaside town of ancient temples and the Great Buddha, an hour away.", image: "/images/tokyo/dagsutflykter/kamakura.webp" },
  { name: "Nikko", blurb: "UNESCO-listed golden shrines among cedar forests and waterfalls.", image: "/images/tokyo/dagsutflykter/nikko.webp" },
];

const NEARBY = [
  { city: "Kyoto", href: "/kyoto" },
  { city: "Osaka", href: "/osaka" },
  { city: "Seoul", href: "/seoul" },
  { city: "Bangkok", href: "/bangkok" },
];

const FAQ = [
  { q: "How much does a flight to Tokyo cost?", a: `Round-trip fares to Tokyo (NRT) start from around ${usdStr(5200)} in the cheapest months, rising toward $685 in peak summer. Booking 2–3 months ahead and flying in February or November gets the best prices.` },
  { q: "When is the cheapest time to fly to Tokyo?", a: "February is the cheapest month on average, followed by November and January. Peak prices hit in July and August; spring cherry-blossom season (late March to April) and autumn are also popular and pricier." },
  { q: "How long is the flight to Tokyo?", a: "Tokyo is about 11–12 hours nonstop from the US West Coast, 13–14 hours from the US East Coast, and around 12–14 hours from major European hubs like London and Paris." },
  { q: "Which airport should I fly into for Tokyo?", a: "Tokyo has two airports: Narita (NRT), used by most long-haul international flights, about 60–90 minutes from the centre by Narita Express or Skyliner; and the closer Haneda (HND). Both connect easily to the city." },
  { q: "Do I need a visa to visit Tokyo?", a: "Citizens of the US, UK, EU, Canada, Australia and many other countries can enter Japan visa-free for short tourist stays (typically up to 90 days). Always check the latest requirements before booking." },
];

// ── JSON-LD ──────────────────────────────────────────────────────────────────
function jsonLd() {
  const url = `${SITE}/${SLUG}`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: COUNTRY },
      { "@type": "ListItem", position: 3, name: CITY, item: url },
    ],
  };
  const touristDestination = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: CITY,
    description: TAGLINE,
    geo: { "@type": "GeoCoordinates", latitude: 35.6762, longitude: 139.6503 },
    touristType: ["City Break", "Culture", "Food & Drink"],
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

export function generateMetadata(): Metadata {
  const year = new Date().getFullYear();
  const title = `Cheap Flights to Tokyo ${year} — Guide, Prices & Attractions | Flyamba`;
  const description = `Find cheap flights to Tokyo, Japan from ${usdStr(5200)}. Compare fares, plus complete English guides to attractions, restaurants, hotels, transport, weather, shopping, beaches, nightlife, family travel and day trips.`;
  const canonical = `${SITE}/${SLUG}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website", images: [HERO] },
    twitter: { card: "summary_large_image", images: [HERO] },
  };
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

export default function TokyoHub() {
  const categories = CATEGORIES.filter((c) => c.slug);
  const usdMonths = MONTHLY_SEK.map((m) => ({ month: m.month, price: usd5(m.price) }));
  const min = Math.min(...usdMonths.map((m) => m.price));
  const max = Math.max(...usdMonths.map((m) => m.price));
  const cheapest = usdMonths.reduce((a, b) => (b.price < a.price ? b : a));
  const monthName: Record<string, string> = {
    Jan: "January", Feb: "February", Mar: "March", Apr: "April", May: "May", Jun: "June",
    Jul: "July", Aug: "August", Sep: "September", Oct: "October", Nov: "November", Dec: "December",
  };

  return (
    <div className="min-h-screen bg-background">
      {jsonLd().map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s).replace(/</g, "\\u003c") }} />
      ))}
      <Navbar transparent />

      {/* 1. Hero */}
      <section className="relative isolate h-[80vh] min-h-[560px] w-full overflow-hidden">
        <Image src={HERO} alt="Cheap flights to Tokyo, Japan" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
            <span className="text-base">🇯🇵</span>
            <span>{COUNTRY}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 tracking-[0.2em] backdrop-blur">{IATA}</span>
            <span className="opacity-40">·</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 backdrop-blur">{SUMMER_TEMP}°C summer</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold text-white sm:text-7xl">Cheap Flights to Tokyo</h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">{TAGLINE}</p>
        </div>
      </section>

      {/* 2. Flight stats bar */}
      <section className="relative z-10 mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-border bg-card px-6 py-4 text-sm font-medium text-foreground shadow-elegant">
          <span>from <span className="font-serif text-lg text-accent">{usdStr(5200)}</span></span>
          <span className="text-muted-foreground/40">•</span>
          <span>{FLIGHT_TIME}</span>
          <span className="text-muted-foreground/40">•</span>
          <span>Nonstop flights worldwide</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="inline-flex items-center gap-1"><Plane className="h-4 w-4 text-accent" /> {IATA}</span>
        </div>
      </section>

      {/* Sticky sub-nav */}
      <div className="mt-8">
        <CitySubNav citySlug={SLUG} categories={CATEGORIES} active="" />
      </div>

      {/* 3. Flight search widget */}
      <section id="flights" className="mx-auto mt-10 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <AviasalesWidget toName={TP_NAME} />
      </section>

      {/* 4. Booking insights */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Booking insights</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Smart tips for booking Tokyo</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarClock, label: "Best time to book", value: "2–3 months ahead" },
            { icon: TrendingDown, label: "Cheapest month", value: `${monthName[cheapest.month]} ($${cheapest.price} avg)` },
            { icon: CalendarDays, label: "Cheapest day to fly", value: "Tuesday & Wednesday" },
            { icon: Route, label: "Direct flights", value: "Yes — from LA, New York, London, Bangkok" },
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
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Explore Tokyo</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.slug} href={`/${SLUG}/${c.slug}`} className="group flex items-center gap-4 rounded-3xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-accent hover:shadow-elegant">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent/15 text-2xl" aria-hidden>{c.emoji}</span>
              <span className="flex-1">
                <span className="block font-serif text-lg font-semibold text-foreground">{c.label}</span>
                <span className="text-xs text-muted-foreground">Tokyo {c.label.toLowerCase()} guide</span>
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Price by month */}
      <section id="cheapest-months" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Prices by month</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">When is it cheapest to fly to Tokyo?</h2>
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

      {/* 7. Non-stop cities */}
      <section id="nonstop" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Direct routes</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Non-stop to Tokyo from {NON_STOP.length} cities</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NON_STOP.map((r) => (
            <div key={r.city} className="flex items-center justify-between rounded-3xl border border-border bg-card p-6">
              <div>
                <p className="font-serif text-lg font-semibold text-foreground">{r.city}</p>
                <p className="text-xs text-muted-foreground">{r.iata} → NRT · nonstop</p>
              </div>
              <p className="font-serif text-2xl text-accent">${r.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Why Tokyo */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Why Tokyo?</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">A city worth the flight</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_VISIT.map((w) => (
            <div key={w.text} className="rounded-3xl border border-border bg-card p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-xl" aria-hidden>{w.icon}</span>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. AI chat */}
      <section className="mx-auto mt-16 max-w-4xl px-4 sm:px-6 lg:px-8">
        <AskAiWidget destination="Tokyo" />
      </section>

      {/* 10. Preview sections */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Top attractions</h2>
          <Link href="/tokyo/attractions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All attractions <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={ATTRACTION_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Where to eat</h2>
          <Link href="/tokyo/restaurants" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All restaurants <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={EAT_PREVIEW} />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Best day trips</h2>
          <Link href="/tokyo/day-trips" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">All day trips <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <PreviewGrid items={DAYTRIP_PREVIEW} />
      </section>

      {/* 11. FAQ */}
      <section className="mx-auto mt-16 max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Good to know</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Tokyo flights FAQ</h2>
        <div className="mt-8 space-y-4">
          {FAQ.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-border bg-card p-6">
              <summary className="cursor-pointer list-none font-serif text-lg font-semibold text-foreground">{f.q}</summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 12. Nearby */}
      <section id="nearby" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Nearby</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Fly onward from Tokyo</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {NEARBY.map((n) => (
            <Link key={n.city} href={n.href} className="group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 transition hover:-translate-y-0.5 hover:border-accent">
              <span className="text-sm font-semibold text-foreground">Flights to {n.city}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </section>

      {/* 13. SEO footer links */}
      <section className="mx-auto mt-16 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Tokyo guides</p>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.slug} href={`/${SLUG}/${c.slug}`} className="text-muted-foreground transition hover:text-accent">
              Tokyo {c.label.toLowerCase()} →
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
