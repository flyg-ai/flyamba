import { getUsFareTable, getFaresByOrigin, formatFareLabelShort, formatFareLabelLong, type UsFare } from "@/app/lib/fares";

/**
 * The one way a page asks "what does it cost to get there".
 *
 * SERVER ONLY. fares.ts carries the service-role Supabase client and reads with
 * cache: "no-store". Call these from a server component and pass the RESULT down
 * as plain props — never import this from a "use client" file. Erasing that line
 * is what put 535 KiB on every flyg.ai page.
 *
 * Everything returns null when we hold no fare. That is a valid answer and the
 * only honest one: the catalog's `monthlyPrices` are Stockholm-origin SEK
 * estimates whose median error against observed fares is 2.35x, and 14 CFR 399.84
 * requires an advertised price to be purchasable. A blank is not a gap to fill.
 */

const ORIGIN_LABEL: Record<string, string> = {
  NYC: "New York",
  MIA: "Miami",
  CHI: "Chicago",
  LAX: "Los Angeles",
};

export type FarePresentation = {
  /** "$153" — the bare number, for prose that supplies its own framing. */
  amount: string;
  /** "$153 rt · NYC · seen Aug 19" — the card label. */
  short: string;
  /** "$153 round trip from New York" plus "seen Aug 19 · Dec 4–11". */
  long: { headline: string; detail: string | null };
  priceUsd: number;
  originLabel: string;
};

function present(f: UsFare): FarePresentation {
  const originLabel = ORIGIN_LABEL[f.origin] ?? f.origin;
  return {
    amount: `$${f.fare.priceUsd.toLocaleString()}`,
    short: formatFareLabelShort(f),
    long: formatFareLabelLong(f, originLabel),
    priceUsd: f.fare.priceUsd,
    originLabel,
  };
}

/**
 * The fare to show for one destination, following NYC → MIA → CHI → LAX.
 *
 * Display only. Sorting uses New York alone — see sortPriceFor below — because a
 * column that mixes four departure cities is not a column.
 */
export async function fareFor(slug: string): Promise<FarePresentation | null> {
  const { display } = await getUsFareTable();
  const f = display[slug];
  return f ? present(f) : null;
}

/** Several at once, for a page that renders a grid. */
export async function faresFor(slugs: string[]): Promise<Map<string, FarePresentation>> {
  const { display } = await getUsFareTable();
  const out = new Map<string, FarePresentation>();
  for (const slug of slugs) {
    const f = display[slug];
    if (f) out.set(slug, present(f));
  }
  return out;
}

/**
 * Cheapest observed fare per calendar month, as a sparse 12-slot array.
 *
 * REPLACES THE FABRICATED CALENDAR. The chart used to plot all twelve months of
 * `monthlyPrices`, which are Stockholm-origin SEK estimates — a complete-looking
 * curve with nothing behind it. What we actually observe is patchy: no
 * destination has twelve months of real fares, the best has ten, and 168 of 499
 * have fewer than three. So the months we have are plotted and the rest are gaps,
 * which is what the data looks like.
 *
 * Prices come from the same origin the headline does, so the chart and the hero
 * cannot quote different departure cities.
 */
export async function fareMonthsFor(slug: string): Promise<(number | null)[] | null> {
  const { display } = await getUsFareTable();
  const chosen = display[slug];
  if (!chosen) return null;

  const byOrigin = await getFaresByOrigin(chosen.origin);
  const options = byOrigin[slug] ?? [];
  const months: (number | null)[] = Array.from({ length: 12 }, () => null);
  for (const o of options) {
    if (!o.departDate) continue;
    const i = Number(o.departDate.slice(5, 7)) - 1;
    if (i < 0 || i > 11) continue;
    if (months[i] == null || months[i]! > o.priceUsd) months[i] = o.priceUsd;
  }
  return months.some((m) => m != null) ? months : null;
}

/** New York price, for ranking. Null means the destination cannot be ranked. */
export async function sortPriceFor(slug: string): Promise<number | null> {
  const { sortPrice } = await getUsFareTable();
  return sortPrice[slug] ?? null;
}

export async function sortPrices(): Promise<Record<string, number>> {
  return (await getUsFareTable()).sortPrice;
}
