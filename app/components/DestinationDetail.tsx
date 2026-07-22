import Link from "next/link";
import type { ReactNode } from "react";
import type { Destination } from "@/app/data/destinations";
import { getDestination, destinations } from "@/app/data/destinations";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { AviasalesWidget } from "@/app/components/AviasalesWidget";
import { FaqItem } from "@/app/components/FaqItem";
import { SITE, airlineNames, lowestPriceStr, bestTimeToVisit } from "@/app/lib/destination-helpers";
import {
  Cloud, CloudRain, Plane, Snowflake, Sun, Calendar, ArrowRight, Sparkles, Thermometer,
  Utensils, BedDouble, TrendingDown, TrendingUp, Users, Bell, Shield, CalendarDays, Sunrise,
  Moon, Coins, Languages, Plug, Clock, ShieldCheck, FileCheck, Train, Bus, Car, Footprints,
  MapPin, UtensilsCrossed, Mountain, PartyPopper, BookOpen, Zap, Wallet, Radar, Activity, Circle,
} from "lucide-react";

function LdJson({ data }: { data: unknown }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
  );
}

function buildJsonLd(d: Destination) {
  const url = `${SITE}/${d.slug}`;
  const airlines = airlineNames(d);
  const price = lowestPriceStr(d);
  const flight = d.flightTime ?? `${d.avgFlightHours}h`;
  const cheapest = d.cheapestMonth?.name;
  const priciest = d.priciestMonth?.name;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: d.country },
      { "@type": "ListItem", position: 3, name: d.city, item: url },
    ],
  };
  const touristDestination = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: d.city,
    description: d.tagline,
    ...(d.coordinates ? { geo: { "@type": "GeoCoordinates", latitude: d.coordinates.lat, longitude: d.coordinates.lng } } : {}),
    touristType: ["Beach & Sun", "City Break", "Culture"],
    url,
  };
  const priceLine = cheapest && priciest ? ` Prices are cheapest in ${cheapest} and highest in ${priciest}.` : "";
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: `How much does a flight to ${d.city} cost?`, acceptedAnswer: { "@type": "Answer", text: `Flights to ${d.city} start from ${price}.${priceLine}` } },
      { "@type": "Question", name: `Which airlines fly to ${d.city}?`, acceptedAnswer: { "@type": "Answer", text: `Airlines flying to ${d.city} include ${airlines.join(", ")}.` } },
      { "@type": "Question", name: `How long is the flight to ${d.city} from Europe?`, acceptedAnswer: { "@type": "Answer", text: `Direct flights to ${d.city} take approximately ${flight} from major European hubs.` } },
      { "@type": "Question", name: `What is the best time to visit ${d.city}?`, acceptedAnswer: { "@type": "Answer", text: `The best time to visit ${d.city} is ${bestTimeToVisit(d)}, when temperatures are most pleasant.` } },
      { "@type": "Question", name: `Which airport serves ${d.city}?`, acceptedAnswer: { "@type": "Answer", text: d.airportName ? `${d.city} is served by ${d.airportName}.` : `${d.city} is served by ${d.iata ?? "the local"} airport.` } },
    ],
  };
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Cheap Flights to ${d.city}`,
    url,
    description: `Find cheap flights to ${d.city}, ${d.country}. Compare prices, view the price calendar and book direct with Flyamba.`,
  };
  return [breadcrumb, touristDestination, faqPage, webPage];
}

const iconFor = (i: string) => (i === "sun" ? Sun : i === "rain" ? CloudRain : i === "snow" ? Snowflake : Cloud);
const insightIcon = (i: string) => (i === "calendar" ? CalendarDays : i === "day" ? Calendar : i === "time" ? Sunrise : Moon);
const transportIcon = (i: string) => (i === "metro" ? Train : i === "bus" ? Bus : i === "taxi" ? Car : i === "train" ? Train : Footprints);

const SUB_NAV = [
  { hash: "flights", label: "Flights", icon: Plane },
  { hash: "prices", label: "Prices", icon: TrendingDown },
  { hash: "airlines", label: "Airlines", icon: Plane },
  { hash: "stay", label: "Where to stay", icon: BedDouble },
  { hash: "eat", label: "Eat & drink", icon: UtensilsCrossed },
  { hash: "transport", label: "Getting around", icon: Train },
  { hash: "do", label: "Things to do", icon: MapPin },
  { hash: "trips", label: "Day trips", icon: Mountain },
  { hash: "events", label: "Events", icon: PartyPopper },
  { hash: "guides", label: "Guides", icon: BookOpen },
  { hash: "faq", label: "FAQ", icon: BookOpen },
];

export function DestinationDetail({
  d,
  afterHero,
  beforeFooter,
}: {
  d: Destination;
  afterHero?: ReactNode;
  beforeFooter?: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {buildJsonLd(d).map((schema, i) => (
        <LdJson key={i} data={schema} />
      ))}
      <Navbar transparent />

      {/* Hero */}
      <section className="relative isolate h-[85vh] min-h-[620px] w-full overflow-hidden">
        <img src={d.image} alt={`Cheap flights to ${d.city}, ${d.country} — ${d.tagline}`} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-16 pt-24 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
            {d.countryFlag && <span className="text-base">{d.countryFlag}</span>}
            <span>{d.country}</span>
            {d.iata && (
              <>
                <span className="opacity-40">·</span>
                <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 tracking-[0.2em] backdrop-blur">{d.iata}</span>
              </>
            )}
            {d.summerTemp && (
              <>
                <span className="opacity-40">·</span>
                <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 backdrop-blur">{d.summerTemp}°C summer</span>
              </>
            )}
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold text-white sm:text-7xl">Cheap Flights to {d.city}</h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">{d.tagline}</p>
        </div>
      </section>

      {afterHero}

      {/* Flights */}
      {(d.flightTime || d.airlines) && (
        <section id="flights" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className={`grid gap-10 lg:items-center ${d.whyVisit ? "lg:grid-cols-2" : "lg:grid-cols-1"}`}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Flights</p>
              <h2 className="mt-2 font-serif text-4xl font-semibold text-foreground sm:text-5xl">Book Your Trip to {d.city}</h2>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground">
                <span className="font-serif text-lg text-foreground">From {d.price.toLocaleString()} kr</span>
                <span className="hidden h-1 w-1 rounded-full bg-muted-foreground sm:inline" />
                <span>{d.flightTime ?? `${d.avgFlightHours}h`}</span>
                <span className="hidden h-1 w-1 rounded-full bg-muted-foreground sm:inline" />
                <span>Direct flights</span>
              </div>
              <a href="#flight-search" className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-glow transition hover:scale-[1.02]">
                Search flights <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            {d.whyVisit && (
              <div className="rounded-3xl border border-border bg-gradient-to-br from-accent/10 via-card to-card p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Why {d.city}?</p>
                <ul className="mt-5 space-y-4">
                  {d.whyVisit.map((w) => (
                    <li key={w.text} className="flex items-start gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent/15 text-lg" aria-hidden>{w.icon}</span>
                      <span className="text-sm leading-relaxed text-muted-foreground">{w.text}</span>
                    </li>
                  ))}
                </ul>
                <a href="#do" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-all hover:gap-2.5">
                  Explore {d.city} <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
          <div id="flight-search" className="mt-10 scroll-mt-24">
            <AviasalesWidget toName={d.tpName || ""} />
          </div>
        </section>
      )}

      {/* SEO body text */}
      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Travel guide</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Flying to {d.city} — What You Need to Know</h2>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            {d.city} is one of {d.country}&apos;s most popular destinations for travelers from around the world, drawing
            visitors with {d.tagline.charAt(0).toLowerCase() + d.tagline.slice(1)}. Whether you&apos;re planning a quick
            weekend city break or a longer getaway, finding cheap flights to {d.city} is the first step to an unforgettable trip.
          </p>
          <p>
            Direct flights to {d.city} ({d.iata ?? "the local airport"}) take approximately {d.flightTime ?? `${d.avgFlightHours}h`} from
            major European hubs. Airlines including {airlineNames(d).slice(0, 3).join(", ")} operate regular services, so comparing fares
            across carriers is the easiest way to secure the lowest price. Use the search tool above to see live prices and book direct.
          </p>
          <p>
            The cheapest time to fly to {d.city} is typically {d.cheapestMonth?.name ?? "the off-season"}, when average prices drop
            significantly compared with peak season. Book at least 6–8 weeks in advance for the best deals, and note that midweek
            departures are often cheaper than weekend flights.
          </p>
          <p>
            {d.airportName ?? `${d.city}'s main airport (${d.iata ?? "the local airport"})`} is the main gateway to {d.city}, with fast
            connections into the city centre by metro, bus and taxi. Once you land, {d.city}&apos;s top attractions, restaurants and
            neighbourhoods are all within easy reach.
          </p>
        </div>
      </section>

      {/* Airlines */}
      {d.airlines && (
        <section id="airlines" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Airlines</p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Popular Airlines Flying to {d.city}</h2>
            </div>
            <p className="text-sm text-muted-foreground">Lowest one-way fare, selected routes</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {d.airlines.map((a) => (
              <div key={a.code} className="group rounded-3xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-accent/50 hover:shadow-elegant">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 font-serif text-lg font-semibold text-accent transition group-hover:bg-accent group-hover:text-accent-foreground">{a.code}</span>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-foreground">{a.name}</h3>
                    <p className="text-xs text-muted-foreground">{a.type ?? "Airline"}</p>
                  </div>
                </div>
                <div className="mt-5 flex items-end justify-between">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">From</span>
                  <span className="font-serif text-2xl text-accent">{a.fromPrice.toLocaleString()} kr</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sticky sub-nav */}
      <div className="sticky top-16 z-30 border-y border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SUB_NAV.map((n) => (
            <a key={n.hash} href={`#${n.hash}`} className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:border-accent hover:text-accent">
              <n.icon className="h-3.5 w-3.5" />
              {n.label}
            </a>
          ))}
        </div>
      </div>

      {/* Quick facts strip */}
      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 rounded-3xl border border-border bg-card p-4 shadow-elegant md:grid-cols-4 md:gap-6 md:p-6">
          <QuickFact icon={Thermometer} label="Summer temp" value={d.summerTemp ? `${d.summerTemp}°C` : "—"} />
          <QuickFact icon={Plane} label="Flight time" value={d.flightTime ?? `${d.avgFlightHours}h`} />
          <QuickFact icon={Utensils} label="Food & drink / day" value={d.foodCostPerDay ?? "—"} />
          <QuickFact icon={BedDouble} label="Hotel / night" value={d.hotelCostPerNight ?? "—"} />
        </div>
      </section>

      {/* Practical strip */}
      {d.practicalStrip && (
        <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 rounded-2xl border border-dashed border-border bg-transparent p-6 sm:grid-cols-3 lg:grid-cols-6">
            <StripItem icon={Coins} label="Currency" value={d.practicalStrip.currency} />
            <StripItem icon={Languages} label="Language" value={d.practicalStrip.language} />
            <StripItem icon={Plug} label="Plug" value={d.practicalStrip.plug} />
            <StripItem icon={Clock} label="Timezone" value={d.practicalStrip.timezone} />
            <StripItem icon={ShieldCheck} label="Safety" value={d.practicalStrip.safety} />
            <StripItem icon={FileCheck} label="Visa" value={d.practicalStrip.visa} />
          </div>
        </section>
      )}

      {/* Live search ticker */}
      {d.recentSearches && (
        <section className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-hidden rounded-2xl border border-border bg-card p-4">
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              <Activity className="h-3 w-3" /> Live
            </span>
            <div className="flex gap-6 overflow-x-auto text-xs text-muted-foreground [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {d.recentSearches.map((r, i) => (
                <span key={i} className="whitespace-nowrap">
                  <strong className="text-foreground">{r.from} → {d.city}</strong>
                  <span className="mx-2 opacity-40">·</span>
                  {r.when}
                  <span className="mx-2 opacity-40">·</span>
                  <span className="font-serif text-accent">{r.price.toLocaleString()} kr</span>
                  <span className="mx-2 opacity-40">·</span>
                  {r.ago}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Intro + AI ask */}
      {d.intro && (
        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">About {d.city}</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">A city worth the flight</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{d.intro}</p>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-accent/10 via-card to-card p-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
              <Sparkles className="h-3.5 w-3.5" /> Ask AI about {d.city}
            </div>
            <ul className="space-y-2 text-sm">
              {[`Best beaches near ${d.city}`, `Where locals eat in ${d.city}`, `Nightlife and bars`, `Day trips from ${d.city}`].map((q) => (
                <li key={q}>
                  <button type="button" className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-left text-foreground transition hover:border-accent hover:text-accent">
                    {q} <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Price signals */}
      {(d.cheapestMonth || d.priciestMonth || d.popularMonth) && (
        <section id="prices" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {d.cheapestMonth && <SignalCard tone="good" icon={TrendingDown} title="Cheapest month" headline={d.cheapestMonth.name} badge={`${d.cheapestMonth.savingsPct}% cheaper`} price={`${d.cheapestMonth.price.toLocaleString()} kr`} note={d.cheapestMonth.note} />}
            {d.priciestMonth && <SignalCard tone="warn" icon={TrendingUp} title="Priciest month" headline={d.priciestMonth.name} badge={`+${d.priciestMonth.premiumPct}% pricier`} price={`${d.priciestMonth.price.toLocaleString()} kr`} note={d.priciestMonth.note} />}
            {d.popularMonth && <SignalCard tone="neutral" icon={Users} title="Most popular" headline={d.popularMonth.name} badge="Most travelers" price="Peak demand" note={d.popularMonth.note} />}
          </div>
        </section>
      )}

      {/* Monthly price chart */}
      {d.monthlyPrices && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Prices by month</p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">When Is It Cheapest to Fly to {d.city}?</h2>
            </div>
            <p className="text-sm text-muted-foreground">Average round-trip, economy</p>
          </div>
          <PriceChart data={d.monthlyPrices} />
        </section>
      )}

      {/* Day-of-week + low-price calendar */}
      {d.dayPrices && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="rounded-3xl border border-border bg-card p-8 lg:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Cheapest day to fly</p>
              <h3 className="mt-2 font-serif text-2xl font-semibold text-foreground">{d.cheapestDay ?? "Midweek"} wins</h3>
              <p className="mt-2 text-sm text-muted-foreground">Average one-way fare, {d.city}. Flex your day and save.</p>
              <div className="mt-6 space-y-2">
                {d.dayPrices.map((dp) => {
                  const max = Math.max(...d.dayPrices!.map((x) => x.price));
                  const min = Math.min(...d.dayPrices!.map((x) => x.price));
                  const pct = 20 + ((dp.price - min) / (max - min || 1)) * 80;
                  const isMin = dp.price === min;
                  return (
                    <div key={dp.day} className="flex items-center gap-3">
                      <span className="w-9 text-xs font-semibold text-muted-foreground">{dp.day}</span>
                      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
                        <div className={`h-full rounded-full ${isMin ? "bg-emerald-500 shadow-glow" : "bg-accent/50"}`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className={`w-20 text-right font-serif text-sm ${isMin ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}>{dp.price.toLocaleString()} kr</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {d.monthlyPrices && (
              <div className="rounded-3xl border border-border bg-card p-8 lg:col-span-3">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Low-price calendar</p>
                    <h3 className="mt-2 font-serif text-2xl font-semibold text-foreground">Next 12 months</h3>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Low</span>
                    <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-accent/60" /> Mid</span>
                    <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-orange-500" /> High</span>
                  </div>
                </div>
                <LowPriceCalendar data={d.monthlyPrices} city={d.city} />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Direct routes */}
      {d.directRoutes && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Direct routes</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Non-stop to {d.city} from {d.directRoutes.length} cities</h2>
          <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card">
            <div className="grid grid-cols-12 border-b border-border bg-muted/40 px-6 py-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              <div className="col-span-4">Origin</div>
              <div className="col-span-2">Duration</div>
              <div className="col-span-3">Airlines</div>
              <div className="col-span-1 text-right">/ week</div>
              <div className="col-span-2 text-right">From</div>
            </div>
            {d.directRoutes.map((r) => (
              <div key={r.iata} className="grid grid-cols-12 items-center border-b border-border px-6 py-4 last:border-0 hover:bg-muted/20">
                <div className="col-span-4">
                  <p className="font-serif text-base text-foreground">{r.origin}</p>
                  <p className="text-xs text-muted-foreground">{r.iata}</p>
                </div>
                <div className="col-span-2 text-sm text-foreground">{r.duration}</div>
                <div className="col-span-3 text-xs text-muted-foreground">{r.airlines.join(" · ")}</div>
                <div className="col-span-1 text-right text-sm text-foreground">{r.perWeek}</div>
                <div className="col-span-2 text-right font-serif text-lg text-accent">{r.price.toLocaleString()} kr</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Airline tips */}
      {d.airlineTips && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Airline guide</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Flyamba&apos;s guide to flights to {d.city}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {d.airlineTips.map((a) => (
              <article key={a.name} className="rounded-3xl border border-border bg-card p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/15 font-serif text-xl font-semibold text-accent">{a.code}</span>
                  <h3 className="font-serif text-xl font-semibold text-foreground">{a.name}</h3>
                </div>
                <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                  {a.tips.map((t) => (
                    <li key={t} className="flex gap-2">
                      <span className="mt-1 text-accent">›</span>
                      <span className="leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          {d.proTip && (
            <div className="mt-8 flex flex-col gap-3 rounded-3xl border border-accent/30 bg-accent/8 p-6 sm:flex-row sm:items-center">
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                <Sparkles className="h-3.5 w-3.5" /> Flyamba tip
              </div>
              <p className="text-sm leading-relaxed text-foreground sm:text-base">{d.proTip}</p>
            </div>
          )}
        </section>
      )}

      {/* Booking window */}
      {d.bookingWindow && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 rounded-3xl border border-border bg-card p-8 lg:grid-cols-2 lg:p-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Booking window</p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">When is the best time to book?</h2>
              <p className="mt-4 text-muted-foreground">
                Book <strong className="text-foreground">4–6 weeks before departure</strong> for the sharpest prices. Save up to{" "}
                <span className="text-accent font-semibold">{(d.bookingWindow.lastMinute - d.bookingWindow.best).toLocaleString()} kr</span> vs. last minute.
              </p>
              <div className="mt-8 space-y-4">
                <PriceBar label="Best price (4–6 weeks ahead)" price={d.bookingWindow.best} max={d.bookingWindow.lastMinute} highlight />
                <PriceBar label="Early bird (12+ weeks ahead)" price={d.bookingWindow.goodTime} max={d.bookingWindow.lastMinute} />
                <PriceBar label="Last minute (under 1 week)" price={d.bookingWindow.lastMinute} max={d.bookingWindow.lastMinute} />
              </div>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-accent/15 via-accent/5 to-transparent p-8">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-accent-foreground shadow-glow"><Bell className="h-6 w-6" /></div>
              <h3 className="mt-6 font-serif text-2xl font-semibold text-foreground">Track prices to {d.city}</h3>
              <p className="mt-2 text-sm text-muted-foreground">We&apos;ll watch the fare and ping you the moment it drops. Free, no account required.</p>
              <div className="mt-6 space-y-3">
                <input type="email" placeholder="you@email.com" className="w-full rounded-full border border-border bg-card px-5 py-3 text-sm placeholder:text-muted-foreground focus:border-accent focus:outline-none" />
                <button type="button" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-glow transition hover:scale-[1.02]">
                  Activate price alert <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Insights */}
      {d.insights && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Booking insights</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Smart tips from a million searches</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {d.insights.map((i) => {
              const Icon = insightIcon(i.icon);
              return (
                <div key={i.label} className="group rounded-3xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-accent/50">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/15 text-accent transition group-hover:bg-accent group-hover:text-accent-foreground"><Icon className="h-5 w-5" /></div>
                  <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">{i.label}</p>
                  <p className="mt-1 font-serif text-2xl font-semibold text-foreground">{i.value}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Neighborhoods */}
      {d.neighborhoods && (
        <section id="stay" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Where to stay</p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">The neighborhoods, decoded</h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">Match the district to your trip — first-timers, families, food nerds, night owls.</p>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {d.neighborhoods.map((n) => (
              <article key={n.name} className="group overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-elegant">
                <div className="relative h-44 overflow-hidden">
                  <img src={n.image} alt={n.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-neutral-900 backdrop-blur">{n.pricePerNight}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl font-semibold text-foreground">{n.name}</h3>
                  <p className="text-xs uppercase tracking-widest text-accent">{n.vibe}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{n.bestFor}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Restaurants */}
      {d.restaurants && (
        <section id="eat" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Eat & drink</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Where to Eat &amp; Drink in {d.city}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {d.restaurants.map((r) => (
              <div key={r.name} className="flex items-start gap-4 rounded-3xl border border-border bg-card p-5">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent/15 font-serif text-lg text-accent">{r.priceLevel}</div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <h3 className="font-serif text-lg font-semibold text-foreground">{r.name}</h3>
                    <span className="text-[11px] uppercase tracking-widest text-muted-foreground">{r.type}</span>
                  </div>
                  <p className="text-xs text-accent">{r.area}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{r.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Transport */}
      {d.transport && (
        <section id="transport" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Getting around</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">From the airport & across the city</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {d.transport.map((t) => {
              const Icon = transportIcon(t.icon);
              return (
                <div key={t.mode} className="rounded-3xl border border-border bg-card p-5">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/15 text-accent"><Icon className="h-5 w-5" /></div>
                  <h3 className="mt-4 font-serif text-base font-semibold text-foreground">{t.mode}</h3>
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <span className="rounded-full bg-muted px-2 py-0.5 text-foreground">{t.price}</span>
                    <span className="text-muted-foreground">{t.time}</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{t.note}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Weather */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Weather</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Weather by month</h2>
        <p className="mt-2 text-muted-foreground">Average high temperatures across the year.</p>
        <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-6 lg:grid-cols-12">
          {d.weather.map((w) => {
            const Icon = iconFor(w.icon);
            return (
              <div key={w.month} className="rounded-2xl border border-border bg-card p-4 text-center transition hover:-translate-y-0.5">
                <p className="text-xs font-semibold text-muted-foreground">{w.month}</p>
                <Icon className="mx-auto mt-2 h-5 w-5 text-accent" />
                <p className="mt-2 font-serif text-lg text-foreground">{w.tempC}°</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Things to do */}
      <section id="do" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Sights & experiences</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Top Attractions in {d.city}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {d.thingsToDo.map((t) => (
            <article key={t.title} className="group overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-elegant">
              <div className="relative h-56 overflow-hidden">
                <img src={t.image} alt={`${t.title} in ${d.city}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-foreground">{t.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Day trips */}
      {d.dayTrips && (
        <section id="trips" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Day trips</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Escape the city for a day</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {d.dayTrips.map((t) => (
              <article key={t.name} className="group flex gap-4 overflow-hidden rounded-3xl border border-border bg-card p-4 transition hover:-translate-y-1 hover:shadow-elegant">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
                  <img src={t.image} alt={t.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif text-lg font-semibold text-foreground">{t.name}</h3>
                  <p className="text-[11px] uppercase tracking-widest text-accent">{t.distance} · {t.travelTime}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.note}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Events */}
      {d.events && (
        <section id="events" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Events calendar</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Time your trip around a festival</h2>
          <div className="relative mt-10">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-1/2" />
            <ul className="space-y-6">
              {d.events.map((e, i) => (
                <li key={e.name} className={`relative flex flex-col gap-4 md:flex-row md:items-center ${i % 2 ? "md:flex-row-reverse" : ""}`}>
                  <div className="pl-12 md:w-1/2 md:pl-0 md:pr-10">
                    <div className={`rounded-3xl border border-border bg-card p-5 ${i % 2 ? "md:text-right" : ""}`}>
                      <p className="text-xs font-semibold uppercase tracking-widest text-accent">{e.month}</p>
                      <h3 className="mt-1 font-serif text-lg font-semibold text-foreground">{e.name}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{e.note}</p>
                    </div>
                  </div>
                  <span className="absolute left-4 top-6 grid h-3 w-3 -translate-x-1/2 place-items-center rounded-full bg-accent shadow-glow md:left-1/2">
                    <Circle className="h-2 w-2 fill-accent-foreground text-accent-foreground" />
                  </span>
                  <div className="hidden md:block md:w-1/2" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Long-form guides */}
      {(d.bestTimeToVisit || d.airlinesAirports || d.practicalTips) && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {d.bestTimeToVisit && <GuideBlock icon={Calendar} title={`Best time to visit ${d.city}`} body={d.bestTimeToVisit} />}
            {d.airlinesAirports && <GuideBlock icon={Plane} title="Airlines & airports" body={d.airlinesAirports} />}
            {d.practicalTips && <GuideBlock icon={Shield} title="Practical tips" body={d.practicalTips} />}
          </div>
        </section>
      )}

      {/* Editorial guides */}
      {d.guides && (
        <section id="guides" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Guides & inspiration</p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Read up on {d.city}</h2>
            </div>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {d.guides.map((g) => (
              <article key={g.title} className="group overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-elegant">
                <div className="relative h-40 overflow-hidden">
                  <img src={g.image} alt={g.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-neutral-900 backdrop-blur">{g.category}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold leading-tight text-foreground">{g.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground">{g.readMinutes} min read</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Why Flyamba */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] border border-border bg-card p-8 sm:p-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Why Flyamba</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Book smarter, not louder</h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <WhyPill icon={Zap} title="AI search that gets you" body="Describe your trip in your own words — we'll find the smartest route across airlines and airports." />
            <WhyPill icon={Wallet} title="Always the best price" body="We compare hundreds of fare buckets and show the honest total, bags and seats included." />
            <WhyPill icon={Radar} title="Price watch, always on" body="We track your route silently and ping you the moment it drops. No account needed." />
          </div>
        </div>
      </section>

      {/* FAQ */}
      {d.faqs && (
        <section id="faq" className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">FAQ</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Common questions about flying to {d.city}</h2>
          <div className="mt-8 divide-y divide-border rounded-3xl border border-border bg-card">
            {d.faqs.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </section>
      )}

      {/* Nearby destinations */}
      {d.nearby && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Nearby</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Fly onward from {d.city}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {d.nearby.map((n) => {
              const hasPage = Boolean(getDestination(n.slug));
              const cls = "group flex items-center justify-between rounded-3xl border border-border bg-card p-6 transition";
              const inner = (
                <>
                  <div>
                    <p className="text-2xl">{n.flag}</p>
                    <p className="mt-3 font-serif text-xl font-semibold text-foreground">{n.city}</p>
                    <p className="text-sm text-muted-foreground">{n.country}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">From</p>
                    <p className="font-serif text-lg text-accent">{n.price.toLocaleString()} kr</p>
                    {hasPage && <ArrowRight className="mt-2 ml-auto h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />}
                  </div>
                </>
              );
              return hasPage ? (
                <Link key={n.slug} href={`/${n.slug}`} className={`${cls} hover:-translate-y-1 hover:border-accent`}>{inner}</Link>
              ) : (
                <div key={n.slug} className={cls}>{inner}</div>
              );
            })}
          </div>
        </section>
      )}

      {/* Internal linking — explore other destinations */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Explore</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Explore nearby destinations</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.filter((x) => x.slug !== d.slug).map((x) => (
            <Link key={x.slug} href={`/${x.slug}`} className="group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 transition hover:-translate-y-0.5 hover:border-accent">
              <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                {x.countryFlag && <span aria-hidden>{x.countryFlag}</span>}
                Flights to {x.city}
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </section>

      {beforeFooter}

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-foreground p-10 text-background sm:p-16">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/40 blur-3xl" aria-hidden />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl">Ready to fly to {d.city}?</h2>
              <p className="mt-2 opacity-80">Let Flyamba&apos;s AI find the smartest route — from {d.price.toLocaleString()} kr.</p>
            </div>
            <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-glow transition hover:scale-105">
              <Plane className="h-4 w-4 -rotate-45" /> Search with AI <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ---------------- Sub-components ---------------- */

function QuickFact({ icon: Icon, label, value }: { icon: typeof Sun; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent/15 text-accent"><Icon className="h-5 w-5" /></span>
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="font-serif text-lg font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}

function StripItem({ icon: Icon, label, value }: { icon: typeof Sun; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="text-sm text-foreground">{value}</p>
      </div>
    </div>
  );
}

function SignalCard({ tone, icon: Icon, title, headline, badge, price, note }: {
  tone: "good" | "warn" | "neutral"; icon: typeof Sun; title: string; headline: string; badge: string; price: string; note: string;
}) {
  const toneClasses = tone === "good" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : tone === "warn" ? "bg-orange-500/15 text-orange-600 dark:text-orange-400" : "bg-accent/15 text-accent";
  return (
    <div className="flex flex-col rounded-3xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <span className={`grid h-11 w-11 place-items-center rounded-2xl ${toneClasses}`}><Icon className="h-5 w-5" /></span>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${toneClasses}`}>{badge}</span>
      </div>
      <p className="mt-5 text-xs uppercase tracking-widest text-muted-foreground">{title}</p>
      <p className="mt-1 font-serif text-3xl font-semibold text-foreground">{headline}</p>
      <p className="mt-1 font-serif text-lg text-accent">{price}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{note}</p>
    </div>
  );
}

function PriceChart({ data }: { data: { month: string; price: number }[] }) {
  const min = Math.min(...data.map((d) => d.price));
  const max = Math.max(...data.map((d) => d.price));
  const MIN_BAR = 16;
  const MAX_BAR = 168;
  return (
    <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card p-6">
      <div className="flex h-56 items-end gap-2">
        {data.map((d) => {
          const ratio = (d.price - min) / (max - min || 1);
          const barHeight = Math.round(MIN_BAR + ratio * (MAX_BAR - MIN_BAR));
          const isMin = d.price === min;
          const isMax = d.price === max;
          return (
            <div key={d.month} className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
              <span className={`text-[11px] font-semibold transition ${isMin ? "text-emerald-600 dark:text-emerald-400" : isMax ? "text-orange-500" : "text-muted-foreground"}`}>{d.price.toLocaleString()}</span>
              <div className={`w-full rounded-t-xl transition ${isMin ? "bg-emerald-500" : isMax ? "bg-orange-500" : "bg-accent/60 group-hover:bg-accent"}`} style={{ height: barHeight }} />
              <span className="text-[11px] font-semibold text-muted-foreground">{d.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LowPriceCalendar({ data, city }: { data: { month: string; price: number }[]; city: string }) {
  const min = Math.min(...data.map((d) => d.price));
  const max = Math.max(...data.map((d) => d.price));
  const tone = (p: number) => {
    const r = (p - min) / (max - min || 1);
    if (r < 0.33) return "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
    if (r < 0.66) return "border-accent/30 bg-accent/8 text-foreground";
    return "border-orange-500/40 bg-orange-500/10 text-orange-700 dark:text-orange-400";
  };
  return (
    <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
      {data.map((m) => (
        <button key={m.month} aria-label={`Cheapest fare to ${city} in ${m.month}`} className={`flex flex-col items-start rounded-2xl border p-3 text-left transition hover:-translate-y-0.5 hover:shadow-elegant ${tone(m.price)}`}>
          <span className="text-[10px] font-semibold uppercase tracking-widest opacity-80">{m.month}</span>
          <span className="mt-1 font-serif text-lg">{m.price.toLocaleString()}</span>
          <span className="text-[10px] opacity-70">kr from</span>
        </button>
      ))}
    </div>
  );
}

function PriceBar({ label, price, max, highlight }: { label: string; price: number; max: number; highlight?: boolean }) {
  const pct = (price / max) * 100;
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className={highlight ? "font-semibold text-foreground" : "text-muted-foreground"}>{label}</span>
        <span className={highlight ? "font-serif text-lg text-accent" : "font-serif text-base text-foreground"}>{price.toLocaleString()} kr</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
        <div className={`h-full rounded-full ${highlight ? "bg-accent shadow-glow" : "bg-foreground/25"}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function GuideBlock({ icon: Icon, title, body }: { icon: typeof Sun; title: string; body: string }) {
  return (
    <article className="rounded-3xl border border-border bg-card p-6">
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/15 text-accent"><Icon className="h-5 w-5" /></span>
      <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </article>
  );
}

function WhyPill({ icon: Icon, title, body }: { icon: typeof Sun; title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-border bg-background p-6">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-accent text-accent-foreground shadow-glow"><Icon className="h-5 w-5" /></div>
      <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
