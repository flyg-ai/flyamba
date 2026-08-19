import { supabaseServer, isSupabaseServerConfigured } from "./supabase-server";

// Reader for the `daily_prices` table that /api/cron/prices fills.
//
// SERVER ONLY — it uses the service-role client. Call it from a server component
// or a route handler and pass the result down.
//
// Everything here returns null rather than throwing. A missing row is the normal
// case for a thin route, and a Supabase outage must not take a page down: the
// caller falls back to the catalog's `monthlyPrices`, which is what the site used
// before this table existed.

export type DailyPrice = {
  priceFromUsd: number;
  departureDate: string;
  airline: string | null;
};

/**
 * Cheapest stored fare for a destination from one origin.
 *
 * @param horizonDays only consider departures within this many days (default 180,
 *                    matching what the cron stores). A cheap fare eight months out
 *                    is not a useful headline number.
 */
export async function getCheapestFare(
  slug: string,
  origin: string,
  horizonDays = 180,
): Promise<DailyPrice | null> {
  if (!isSupabaseServerConfigured || !supabaseServer) return null;

  const today = new Date().toISOString().slice(0, 10);
  const horizon = new Date(Date.now() + horizonDays * 86_400_000).toISOString().slice(0, 10);

  const { data, error } = await supabaseServer
    .from("daily_prices")
    .select("price_from, departure_date, airline")
    .eq("slug", slug)
    .eq("origin", origin.toUpperCase())
    .gte("departure_date", today)
    .lte("departure_date", horizon)
    .order("price_from", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[daily-prices] select failed:", error.message);
    return null;
  }
  if (!data?.price_from) return null;

  return {
    priceFromUsd: data.price_from as number,
    departureDate: data.departure_date as string,
    airline: (data.airline as string | null) ?? null,
  };
}

/**
 * Cheapest fare for many destinations at once, keyed by slug.
 *
 * One query for the whole page rather than one per card — a destination grid
 * would otherwise issue 20 round trips.
 */
export async function getCheapestFares(
  slugs: string[],
  origin: string,
  horizonDays = 180,
): Promise<Record<string, DailyPrice>> {
  if (!isSupabaseServerConfigured || !supabaseServer || slugs.length === 0) return {};

  const today = new Date().toISOString().slice(0, 10);
  const horizon = new Date(Date.now() + horizonDays * 86_400_000).toISOString().slice(0, 10);

  const { data, error } = await supabaseServer
    .from("daily_prices")
    .select("slug, price_from, departure_date, airline")
    .in("slug", slugs)
    .eq("origin", origin.toUpperCase())
    .gte("departure_date", today)
    .lte("departure_date", horizon)
    .order("price_from", { ascending: true });

  if (error) {
    console.error("[daily-prices] batch select failed:", error.message);
    return {};
  }

  // Ordered cheapest-first, so the first row seen per slug is that slug's minimum.
  const out: Record<string, DailyPrice> = {};
  for (const row of data ?? []) {
    const slug = row.slug as string;
    if (out[slug]) continue;
    out[slug] = {
      priceFromUsd: row.price_from as number,
      departureDate: row.departure_date as string,
      airline: (row.airline as string | null) ?? null,
    };
  }
  return out;
}
