import { supabaseServer, isSupabaseServerConfigured } from "./supabase-server";

// Reader for origin_fares — the "from $X" shown on cards and destination pages.
//
// SERVER ONLY (service-role client). Call it from a server component or a route
// handler and pass the result down.
//
// Returns null/{} rather than throwing. A missing fare is the normal case:
// Travelpayouts only holds routes someone actually searched in the last 48
// hours, so thin routes have no price. The caller must render the absence — no
// price row at all — rather than substituting the catalog's Stockholm number,
// which is what made the old figure wrong.

export type Fare = {
  priceUsd: number;
  departDate: string | null;
  returnDate: string | null;
  airline: string | null;
  /** False means round trip. Never label a round-trip fare "one way". */
  oneWay: boolean;
};

/** Cheapest fare plus one alternative date pair, cheapest first. */
export type FareOptions = Fare[];

type Row = {
  slug: string;
  rank: number;
  price_usd: number;
  depart_date: string | null;
  return_date: string | null;
  airline: string | null;
  one_way: boolean;
};

function toFare(r: Row): Fare {
  return {
    priceUsd: r.price_usd,
    departDate: r.depart_date,
    returnDate: r.return_date,
    airline: r.airline,
    oneWay: r.one_way,
  };
}

/**
 * Every fare we hold for one origin, keyed by slug.
 *
 * Deliberately not filtered by slug: the AI search needs prices for the whole
 * filtered catalog, and 550 slugs in an `.in()` builds a 6 kB query string that
 * PostgREST may reject. One origin is ~700 rows, so fetching them all and
 * filtering in memory is both simpler and safer.
 */
export async function getFaresByOrigin(
  origin: string,
  { oneWay = false }: { oneWay?: boolean } = {},
): Promise<Record<string, FareOptions>> {
  if (!isSupabaseServerConfigured || !supabaseServer) return {};

  const { data, error } = await supabaseServer
    .from("origin_fares")
    .select("slug, rank, price_usd, depart_date, return_date, airline, one_way")
    .eq("origin", origin.toUpperCase())
    .eq("one_way", oneWay)
    .order("rank", { ascending: true });

  if (error) {
    console.error("[fares] origin select failed:", error.message);
    return {};
  }

  const out: Record<string, FareOptions> = {};
  for (const row of (data ?? []) as Row[]) (out[row.slug] ??= []).push(toFare(row));
  return out;
}

/**
 * Fares for a specific set of destinations, keyed by slug.
 *
 * One round trip to the database for a whole page of cards, not one per card.
 */
export async function getFares(
  slugs: string[],
  origin: string,
  { oneWay = false }: { oneWay?: boolean } = {},
): Promise<Record<string, FareOptions>> {
  if (!isSupabaseServerConfigured || !supabaseServer || slugs.length === 0) return {};

  const { data, error } = await supabaseServer
    .from("origin_fares")
    .select("slug, rank, price_usd, depart_date, return_date, airline, one_way")
    .eq("origin", origin.toUpperCase())
    .eq("one_way", oneWay)
    .in("slug", slugs)
    .order("rank", { ascending: true });

  if (error) {
    console.error("[fares] select failed:", error.message);
    return {};
  }

  const out: Record<string, FareOptions> = {};
  for (const row of (data ?? []) as Row[]) {
    (out[row.slug] ??= []).push(toFare(row));
  }
  return out;
}

/** Fare options for a single destination. Empty array when we have none. */
export async function getFare(
  slug: string,
  origin: string,
  opts: { oneWay?: boolean } = {},
): Promise<FareOptions> {
  const all = await getFares([slug], origin, opts);
  return all[slug] ?? [];
}

/**
 * "14–21 Mar", or "14 Mar – 2 Apr" when the dates straddle a month.
 * Returns null when there is nothing meaningful to show, so the caller can omit
 * the line rather than print an empty range.
 */
export function formatFareDates(fare: Fare): string | null {
  if (!fare.departDate) return null;

  const fmt = (iso: string, withMonth: boolean) => {
    const d = new Date(`${iso}T00:00:00Z`);
    if (Number.isNaN(d.getTime())) return null;
    const day = d.getUTCDate();
    const month = d.toLocaleString("en-GB", { month: "short", timeZone: "UTC" });
    return withMonth ? `${day} ${month}` : `${day}`;
  };

  if (!fare.returnDate) return fmt(fare.departDate, true);

  const sameMonth = fare.departDate.slice(0, 7) === fare.returnDate.slice(0, 7);
  const from = fmt(fare.departDate, !sameMonth);
  const to = fmt(fare.returnDate, true);
  if (!from || !to) return null;
  return `${from}–${to}`;
}
