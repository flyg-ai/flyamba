import { fareCalendarFor } from "@/app/lib/fare-calendar";

/**
 * "When is it cheapest to fly here", in whichever form the data supports.
 *
 * THE ONLY IMPLEMENTATION OF THE THREE TIERS. It lived inline in
 * DestinationLite, which reaches the ~526 lite pages but not the 28 hand-written
 * hub landing pages — those render their own page.tsx. Copying it there would
 * have produced two versions of the same rule in one repo, and two versions of a
 * rule drift in the direction nobody is looking: change the six-month threshold
 * in one and the other keeps promising a chart it should not draw.
 *
 * CityGuideShell was the obvious shared mount and is the wrong one. It wraps the
 * 318 city SUBPAGES — attractions, hotels, transport — not the landing pages. A
 * fare chart under "Rome Attractions" and none on /rome is worse than neither.
 *
 * SERVER COMPONENT. fare-calendar.ts carries the service-role Supabase client and
 * reads with cache: "no-store", so any page rendering this needs force-static.
 */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const FULL_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export async function FareCalendarSection({ slug, name }: { slug: string; name: string }) {
  const calendar = await fareCalendarFor(slug);
  if (calendar.tier === "none") return null;

  const prices = calendar.observations.map((o) => o.priceUsd);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const originLabel =
    { NYC: "New York", MIA: "Miami", CHI: "Chicago", LAX: "Los Angeles" }[calendar.origin] ?? calendar.origin;

  if (calendar.tier === "chart") {
    return (
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Fares by month</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
          When is it cheapest to fly to {name}?
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Cheapest round trip we observed from {originLabel}, in USD, across the{" "}
          <strong className="font-semibold text-foreground">{calendar.monthCount} months we hold fares for</strong>.
          Months we have not seen a fare for are not shown — they are not months without flights.
        </p>
        <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card p-6">
          {/* Only observed months get a column. No placeholder bars: an empty slot
              in a twelve-month row reads as "expensive", not "unknown". */}
          <div className="flex h-56 items-end gap-2">
            {calendar.observations.map((o) => {
              const ratio = (o.priceUsd - min) / (max - min || 1);
              const isMin = o.priceUsd === min;
              const isMax = o.priceUsd === max;
              return (
                <div key={o.monthIndex} className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
                  <span
                    className={`text-[11px] font-semibold ${
                      isMin
                        ? "text-emerald-600 dark:text-emerald-400"
                        : isMax
                          ? "text-orange-500"
                          : "text-muted-foreground"
                    }`}
                  >
                    ${o.priceUsd}
                  </span>
                  <div
                    className={`w-full rounded-t-xl ${
                      isMin ? "bg-emerald-500" : isMax ? "bg-orange-500" : "bg-accent/60 group-hover:bg-accent"
                    }`}
                    style={{ height: Math.round(16 + ratio * 152) }}
                  />
                  <span className="text-[11px] font-semibold text-muted-foreground">{MONTHS[o.monthIndex]}</span>
                  {/* Each bar carries its own seen date: an advertised fare has to
                      be one someone can still buy. */}
                  <span className="text-[10px] text-muted-foreground/70">{o.seenLabel ?? "—"}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Three to five observations: a list, not a graph. A chart drawn through four
  // points implies a curve between them that we never measured.
  return (
    <section className="mx-auto mt-16 max-w-4xl px-4 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Fares we found</p>
      <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
        What we have seen flights to {name} cost
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {calendar.monthCount} observations — too few to say which month is cheapest, so here they are as they came.
      </p>
      <ul className="mt-6 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card">
        {calendar.observations.map((o) => (
          <li key={o.monthIndex} className="flex flex-wrap items-baseline justify-between gap-2 px-6 py-4">
            <span className="font-serif text-lg font-semibold text-foreground">{FULL_MONTHS[o.monthIndex]}</span>
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-accent">${o.priceUsd}</span> round trip from {originLabel}
              {o.departDate ? ` · departing ${o.departDate}` : ""}
              {o.seenLabel ? ` · seen ${o.seenLabel}` : ""}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
