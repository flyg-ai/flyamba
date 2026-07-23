import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { AviasalesWidget } from "@/app/components/AviasalesWidget";
import { SmartImage } from "@/app/components/SmartImage";
import { ALL_DESTINATIONS, type AllDestination } from "@/app/data/all-destinations";
import { usd5, usdStr } from "@/app/lib/format";
import { Plane, Globe, MapPin, TrendingDown, ArrowRight, Sparkles } from "lucide-react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const FULL_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/**
 * Lightweight destination page for the ~544 ported catalog cities that don't yet
 * have Barcelona-level editorial content. Shows a hero, the live flight-search
 * widget, basic facts, a monthly price calendar, and a "full guide coming soon"
 * note — enough to be useful and indexable while the rich guide is written.
 */
export function DestinationLite({ d }: { d: AllDestination }) {
  const prices = d.monthlyPrices ?? [];
  const usdMonths = prices.map((p, i) => ({ month: MONTHS[i], price: p == null ? null : usd5(p) }));
  const valid = usdMonths.filter((m): m is { month: string; price: number } => m.price != null);
  const min = valid.length ? Math.min(...valid.map((m) => m.price)) : 0;
  const max = valid.length ? Math.max(...valid.map((m) => m.price)) : 0;
  let cheapestIdx = 0;
  let cheapestVal = Infinity;
  prices.forEach((p, i) => {
    if (p != null && p < cheapestVal) {
      cheapestVal = p;
      cheapestIdx = i;
    }
  });
  const cheapestPrice = prices[cheapestIdx] ?? 0;
  const cheapestMonth = FULL_MONTHS[cheapestIdx];

  const related = ALL_DESTINATIONS.filter((x) => x.continent === d.continent && x.slug !== d.slug).slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <Navbar transparent />

      {/* Hero */}
      <section className="relative isolate h-[70vh] min-h-[480px] w-full overflow-hidden">
        <SmartImage src={d.image} alt={`Cheap flights to ${d.name}, ${d.country}`} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
            <span>{d.country}</span>
            {d.iata && (
              <>
                <span className="opacity-40">·</span>
                <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 tracking-[0.2em] backdrop-blur">{d.iata}</span>
              </>
            )}
            <span className="opacity-40">·</span>
            <span>{d.continent}</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold text-white sm:text-7xl">Cheap Flights to {d.name}</h1>
          {min > 0 && (
            <p className="mt-4 text-lg text-white/85">
              From <span className="font-serif text-2xl text-accent">{usdStr(cheapestPrice)}</span> round trip · cheapest in {cheapestMonth}
            </p>
          )}
        </div>
      </section>

      {/* Flight search widget */}
      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <AviasalesWidget toName={d.tpName} />
      </section>

      {/* Basic info */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Overview</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Flying to {d.name}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: MapPin, label: "Country", value: d.country },
            { icon: Globe, label: "Region", value: d.continent },
            { icon: Plane, label: "Airport", value: d.iata || "—" },
            { icon: TrendingDown, label: "Cheapest month", value: min > 0 ? `${cheapestMonth} (${usdStr(cheapestPrice)})` : "—" },
          ].map((s) => (
            <div key={s.label} className="rounded-3xl border border-border bg-card p-6">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/15 text-accent"><s.icon className="h-5 w-5" /></div>
              <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</p>
              <p className="mt-1 font-serif text-lg font-semibold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Price calendar */}
      {valid.length > 0 && (
        <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Prices by month</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">When is it cheapest to fly to {d.name}?</h2>
          <p className="mt-2 text-sm text-muted-foreground">Average round-trip fare, USD.</p>
          <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card p-6">
            <div className="flex h-56 items-end gap-2">
              {usdMonths.map((m) => {
                const ratio = m.price == null ? 0 : (m.price - min) / (max - min || 1);
                const h = m.price == null ? 8 : Math.round(16 + ratio * 152);
                const isMin = m.price != null && m.price === min;
                const isMax = m.price != null && m.price === max;
                return (
                  <div key={m.month} className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
                    <span className={`text-[11px] font-semibold ${isMin ? "text-emerald-600 dark:text-emerald-400" : isMax ? "text-orange-500" : "text-muted-foreground"}`}>
                      {m.price == null ? "—" : `$${m.price}`}
                    </span>
                    <div className={`w-full rounded-t-xl ${m.price == null ? "bg-muted" : isMin ? "bg-emerald-500" : isMax ? "bg-orange-500" : "bg-accent/60 group-hover:bg-accent"}`} style={{ height: h }} />
                    <span className="text-[11px] font-semibold text-muted-foreground">{m.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Full guide coming soon */}
      <section className="mx-auto mt-16 max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-dashed border-accent/40 bg-accent/8 p-8 text-center sm:p-10">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 text-accent">
            <Sparkles className="h-6 w-6" />
          </div>
          <h2 className="mt-5 font-serif text-2xl font-semibold text-foreground sm:text-3xl">Full {d.name} guide coming soon</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            We&apos;re writing an in-depth guide to {d.name} — attractions, food, hotels, transport and the best time to visit. Meanwhile, search live fares above and grab a deal.
          </p>
        </div>
      </section>

      {/* Related in continent */}
      {related.length > 0 && (
        <section className="mx-auto mt-16 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Nearby</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">More flights in {d.continent}</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((r) => (
              <Link key={r.slug} href={`/${r.slug}`} className="group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 transition hover:-translate-y-0.5 hover:border-accent">
                <span className="text-sm font-semibold text-foreground">Flights to {r.name}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
