import { createClient } from "@supabase/supabase-js";
import { getUsFareTable, US_ORIGIN_CHAIN } from "@/app/lib/fares";

/**
 * Observed fares by departure month, and how much of a claim they support.
 *
 * READS fare_months, NOT origin_fares. The two answer different questions:
 * origin_fares is "what does it cost", two rows per pair, and feeds the price
 * labels; this is "when is it cheap", one row per month. Keeping them apart is
 * what stops `rank` acquiring a second meaning — see supabase/fare-months.sql.
 *
 * WHY THE TWELVE-MONTH CHART WENT AWAY FIRST. It plotted `monthlyPrices`, twelve
 * Stockholm SEK estimates, as a smooth curve. Redrawing that shape from real data
 * would have been worse than removing it: a line through three points asserts
 * continuity across nine months nobody measured. So coverage decides what a
 * destination is allowed to say:
 *
 *   >= 6 months   a bar chart of the observed months only, count stated
 *   3-5 months    no chart; the observations listed as text
 *   < 3 months    nothing
 *
 * "CHEAPEST MONTH" IS ONLY MEANINGFUL AT SIX. Below that the minimum reports
 * which months happened to be sampled, not which is cheap.
 *
 * FRESHNESS IS A FILTER, NOT A FOOTNOTE. Rows older than MAX_AGE_DAYS are dropped
 * before anything is counted, so a stale row cannot push a destination up a tier.
 * Every rendered bar carries its own seen date for the same reason the cards do:
 * 14 CFR 399.84 applies to a chart as much as to a label.
 */

export type FareObservation = {
  /** 0-11. */
  monthIndex: number;
  priceUsd: number;
  /** Where the fare departs from — a chart must not mix origins silently. */
  origin: string;
  departDate: string | null;
  seenAt: string | null;
  /** "Aug 19", ready to render next to the bar. */
  seenLabel: string | null;
};

export type FareCalendar = {
  observations: FareObservation[];
  monthCount: number;
  tier: "chart" | "list" | "none";
  origin: string;
};

const CHART_MIN = 6;
const LIST_MIN = 3;

/** A price we last saw more than a month ago is not a price. */
const MAX_AGE_DAYS = 30;

const seenLabelFor = (iso: string | null) =>
  iso ? new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", timeZone: "UTC" }) : null;

function client() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  // Own no-store client, like climate.ts and fares.ts: a fill of the table must
  // not be served from a stale .next/cache. Pages reading this need force-static.
  return createClient(url, key, {
    auth: { persistSession: false },
    global: { fetch: (u, o) => fetch(u, { ...o, cache: "no-store" }) },
  });
}

export async function fareCalendarFor(slug: string): Promise<FareCalendar> {
  const { display } = await getUsFareTable();
  // The calendar follows the same origin the headline price does, so the two
  // cannot quote different departure cities on one page.
  const origin = display[slug]?.origin ?? US_ORIGIN_CHAIN[0];
  const empty: FareCalendar = { observations: [], monthCount: 0, tier: "none", origin };

  const db = client();
  if (!db) return empty;

  const cutoff = new Date(Date.now() - MAX_AGE_DAYS * 86_400_000).toISOString();
  const { data, error } = await db
    .from("fare_months")
    .select("month, price_usd, depart_date, airline, fetched_at")
    .eq("slug", slug)
    .eq("origin", origin)
    .eq("one_way", false)
    .gte("fetched_at", cutoff)
    .order("month");

  if (error) {
    console.error(`[fare-calendar] ${slug}/${origin}: ${error.message}`);
    return empty;
  }

  const observations: FareObservation[] = (data ?? []).map((r) => ({
    monthIndex: Number(String(r.month).slice(5, 7)) - 1,
    priceUsd: r.price_usd as number,
    origin,
    departDate: (r.depart_date as string | null) ?? null,
    seenAt: (r.fetched_at as string | null) ?? null,
    seenLabel: seenLabelFor((r.fetched_at as string | null) ?? null),
  }));

  const monthCount = observations.length;
  const tier = monthCount >= CHART_MIN ? "chart" : monthCount >= LIST_MIN ? "list" : "none";
  return { observations, monthCount, tier, origin };
}
