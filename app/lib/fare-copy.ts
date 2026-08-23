import { fareFor } from "@/app/lib/fare-display";
import { fareCalendarFor } from "@/app/lib/fare-calendar";

/**
 * Sentences about price, built from observed fares at build time.
 *
 * WHY A HELPER AND NOT FIVE HAND-WRITTEN PARAGRAPHS. The five hub pages that have
 * real data need the same three things — a headline fare, a seen date, and a
 * range — and hardcoding today's numbers into prose would put a stale figure in
 * the FAQPage schema the moment the cron runs again. These read on every
 * revalidation, so the copy ages with the data instead of against it.
 *
 * THE CHEAPEST-MONTH CLAUSE IS EMPTY BELOW SIX MONTHS. Same threshold as the
 * chart: with three observations the minimum reports which months were sampled,
 * not which is cheap. Singapore has three and Marrakech five, so neither gets the
 * sentence, and the page has to read correctly without it.
 *
 * SERVER ONLY — it reaches fares.ts through both readers.
 */

const FULL_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const CHEAPEST_MONTH_MIN = 6;

// toLocaleString() with no locale follows the build machine, which put a space in
// "$1 277" on a Swedish host. The site is English; the separator is not a runtime
// preference.

export type FareCopy = {
  /** "$359" or null when we hold no fare. */
  amount: string | null;
  /** "New York" — the origin the amount is from. */
  originLabel: string | null;
  /** "seen Aug 23 · Apr 21–May 1", or null. */
  detail: string | null;
  /** How many distinct departure months we hold for the display origin. */
  monthCount: number;
  /**
   * "April is the cheapest month we have seen, at $359, and December the dearest
   * at $675" — or null below six months, where the claim is not supportable.
   */
  cheapestMonthClause: string | null;
  /** "between $874 and $962" — the honest form when a month cannot be named. */
  rangeClause: string | null;
};

export async function fareCopyFor(slug: string): Promise<FareCopy> {
  const fare = await fareFor(slug);
  const cal = await fareCalendarFor(slug);

  const prices = cal.observations.map((o) => o.priceUsd);
  const min = prices.length ? Math.min(...prices) : null;
  const max = prices.length ? Math.max(...prices) : null;

  let cheapestMonthClause: string | null = null;
  if (cal.monthCount >= CHEAPEST_MONTH_MIN && min != null && max != null) {
    const cheap = cal.observations.find((o) => o.priceUsd === min)!;
    const dear = cal.observations.find((o) => o.priceUsd === max)!;
    cheapestMonthClause =
      cheap.monthIndex === dear.monthIndex
        ? `${FULL_MONTHS[cheap.monthIndex]} is the only month we have seen a fare for, at $${min.toLocaleString("en-US")}`
        : `${FULL_MONTHS[cheap.monthIndex]} is the cheapest month we have seen, at $${min.toLocaleString("en-US")}, and ${FULL_MONTHS[dear.monthIndex]} the dearest at $${max.toLocaleString("en-US")}`;
  }

  const rangeClause =
    min != null && max != null && min !== max ? `between $${min.toLocaleString("en-US")} and $${max.toLocaleString("en-US")}` : null;

  return {
    amount: fare?.amount ?? null,
    originLabel: fare?.originLabel ?? null,
    detail: fare?.long.detail ?? null,
    monthCount: cal.monthCount,
    cheapestMonthClause,
    rangeClause,
  };
}

/**
 * The "how much does it cost" answer, which goes verbatim into FAQPage schema.
 *
 * Every figure in it is observed, and the sentence names the departure city and
 * the date we saw the price — a fare with neither is not a fare anyone can check.
 */
export function priceAnswer(city: string, c: FareCopy): string {
  if (!c.amount) {
    return `We hold no current US fare to ${city}, so there is no price to quote here. Search live fares above for your own dates — availability and price move daily.`;
  }
  const opening = `The cheapest round trip we currently hold is ${c.amount} from ${c.originLabel}${c.detail ? ` (${c.detail})` : ""}.`;
  const spread = c.cheapestMonthClause
    ? ` Across the ${c.monthCount} months we hold fares for, ${c.cheapestMonthClause}.`
    : c.rangeClause
      ? ` We hold fares for ${c.monthCount} months, ${c.rangeClause} — too few to say which month is cheapest.`
      : "";
  return `${opening}${spread} These are prices a live search returned, not a standing offer, and they move daily.`;
}
