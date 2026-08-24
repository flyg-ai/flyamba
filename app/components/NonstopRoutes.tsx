import { getNonstopEvidence } from "@/app/lib/fares";
import { SUPPORTED_ORIGINS } from "@/app/lib/origins";

/**
 * "Non-stop routes we have seen fares for" — built from evidence, not authored.
 *
 * REPLACES THE HAND-WRITTEN NON_STOP TABLES. Those listed six cities with
 * invented prices under a "Non-stop from N cities" heading, and on Dubrovnik the
 * per-row labels were hardcoded — including a "1 stop" for New York that nothing
 * would ever update. Every row here is an observed, purchasable non-stop fare
 * from the cron's v2/prices/latest pass, with the price and seen date it was
 * observed at.
 *
 * RENDERS NOTHING WITHOUT EVIDENCE, and that asymmetry is the contract: the feed
 * reports cheapest fares, so a route can be flown non-stop daily without ever
 * appearing here (JFK–AMS is). An empty result means "not observed", never "no
 * non-stop exists" — which is why there is no empty state, no "no non-stop
 * service" message, nothing.
 */

const ORIGIN_LABEL = new Map(SUPPORTED_ORIGINS.map((o) => [o.iata, o.label]));

const seenLabel = (iso: string | null) =>
  iso ? new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", timeZone: "UTC" }) : null;

export async function NonstopRoutes({
  slug,
  name,
  iata,
}: {
  slug: string;
  name: string;
  /** The destination airport code shown in each row, e.g. "DBV". */
  iata: string;
}) {
  const evidence = await getNonstopEvidence(slug);
  if (!evidence.length) return null;

  return (
    <section id="nonstop" className="mx-auto mt-16 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Direct routes</p>
      <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
        Non-stop to {name}: fares we have seen
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Round-trip non-stop fares a live search actually returned, with the date we saw each one. Routes we have not
        observed a non-stop fare on are not listed — that is not a claim that none exists.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {evidence.map((e) => (
          <div key={e.origin} className="flex items-center justify-between rounded-3xl border border-border bg-card p-6">
            <div>
              <p className="font-serif text-lg font-semibold text-foreground">{ORIGIN_LABEL.get(e.origin) ?? e.origin}</p>
              <p className="text-xs text-muted-foreground">
                {e.origin} → {iata} · nonstop{seenLabel(e.fetchedAt) ? ` · seen ${seenLabel(e.fetchedAt)}` : ""}
              </p>
            </div>
            <p className="font-serif text-2xl text-accent">${e.priceUsd.toLocaleString("en-US")}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
