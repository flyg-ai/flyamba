import { getUsFareTable, getFaresByOrigin, US_ORIGIN_CHAIN } from "@/app/lib/fares";
import { createClient } from "@supabase/supabase-js";

/**
 * Observed fares grouped by departure month, and how much of a claim they support.
 *
 * WHY THE TWELVE-MONTH CHART IS GONE. It plotted `monthlyPrices`, twelve Stockholm
 * SEK estimates, as a smooth curve. Rebuilding it from observed data is not
 * possible and should not be faked: no destination has twelve months of real
 * fares, the best has ten, and most have three or four. A twelve-month line drawn
 * through three observations is not a sparse graph — the shape itself asserts
 * continuity across nine months nobody ever saw.
 *
 * So coverage decides what the page is allowed to say:
 *
 *   >= 6 months   a bar chart of the observed months only, with the count stated
 *   3-5 months    no chart; the observations listed as text
 *   < 3 months    nothing at all
 *
 * AND "CHEAPEST MONTH" IS ONLY MEANINGFUL AT SIX. Below that the minimum is an
 * artefact of which months happened to be sampled, not a fact about the route.
 *
 * TODAY EVERY DESTINATION LANDS IN THE "NOTHING" TIER, and the number that made
 * it look otherwise is worth writing down. 167 destinations do have six or more
 * distinct departure months in origin_fares — but only when you pool all 24
 * origins. Per (origin, slug) the table holds at most 2 rows, because
 * RANKS_PER_DESTINATION in /api/cron/fares is 2: of 5,071 origin-slug pairs, 5,065
 * cover a single month and six cover two. A chart drawn from the pooled set would
 * put a New York January next to a Frankfurt July and call it seasonality.
 *
 * THIS IS A DEFERRAL, NOT A DELETION. The cron asks Travelpayouts for the cheapest
 * fares from an origin and keeps whatever departure dates come back; it does not
 * sample departure month at all. Give it a month sweep — twelve calls per origin
 * instead of one — and this file starts returning real charts without changing.
 * That is the right fix and it cannot be forced today.
 */

export type FareObservation = {
  /** 0-11. */
  monthIndex: number;
  priceUsd: number;
  /** Where the fare departs from — the chart must not mix origins silently. */
  origin: string;
  departDate: string | null;
  seenAt: string | null;
};

export type FareCalendar = {
  observations: FareObservation[];
  /** How many distinct months we hold. Rendered, because the reader should know. */
  monthCount: number;
  /** "chart" | "list" | "none" — decided by monthCount alone. */
  tier: "chart" | "list" | "none";
  origin: string;
};

const CHART_MIN = 6;
const LIST_MIN = 3;

/**
 * daily_prices holds 1,267 rows for 18 destinations from JFK and LON — real
 * observations from a different collector, and for those few it often covers more
 * months than origin_fares does. Read when it helps and ignored otherwise. No new
 * fetching is built for it here.
 */
async function dailyPriceMonths(slug: string): Promise<FareObservation[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return [];
  const db = createClient(url, key, {
    auth: { persistSession: false },
    global: { fetch: (u, o) => fetch(u, { ...o, cache: "no-store" }) },
  });
  const { data, error } = await db
    .from("daily_prices")
    .select("price_from, departure_date, origin, fetched_at")
    .eq("slug", slug)
    .eq("origin", "JFK");
  if (error || !data) return [];
  return data
    .filter((r) => r.departure_date && typeof r.price_from === "number")
    .map((r) => ({
      monthIndex: Number(String(r.departure_date).slice(5, 7)) - 1,
      priceUsd: Math.round(r.price_from as number),
      // JFK is New York; the label the page shows must match the chain's wording.
      origin: "NYC",
      departDate: String(r.departure_date),
      seenAt: (r.fetched_at as string | null) ?? null,
    }))
    .filter((o) => o.monthIndex >= 0 && o.monthIndex <= 11);
}

/** Cheapest observation per month, keeping one origin for the whole calendar. */
function collapse(rows: FareObservation[]): FareObservation[] {
  const best = new Map<number, FareObservation>();
  for (const r of rows) {
    const seen = best.get(r.monthIndex);
    if (!seen || seen.priceUsd > r.priceUsd) best.set(r.monthIndex, r);
  }
  return [...best.values()].sort((a, b) => a.monthIndex - b.monthIndex);
}

export async function fareCalendarFor(slug: string): Promise<FareCalendar> {
  const { display } = await getUsFareTable();
  const chosen = display[slug];
  const origin = chosen?.origin ?? US_ORIGIN_CHAIN[0];

  const rows: FareObservation[] = [];
  if (chosen) {
    for (const o of (await getFaresByOrigin(chosen.origin))[slug] ?? []) {
      if (!o.departDate) continue;
      rows.push({
        monthIndex: Number(o.departDate.slice(5, 7)) - 1,
        priceUsd: o.priceUsd,
        origin: chosen.origin,
        departDate: o.departDate,
        seenAt: o.fetchedAt,
      });
    }
  }

  let observations = collapse(rows.filter((r) => r.monthIndex >= 0 && r.monthIndex <= 11));

  // Only when the other collector genuinely covers more months, and only if the
  // origin agrees — a chart that mixes New York and Miami is two questions.
  if (origin === "NYC") {
    const daily = collapse(await dailyPriceMonths(slug));
    if (daily.length > observations.length) observations = collapse([...rows, ...daily]);
  }

  const monthCount = observations.length;
  const tier = monthCount >= CHART_MIN ? "chart" : monthCount >= LIST_MIN ? "list" : "none";
  return { observations, monthCount, tier, origin };
}
