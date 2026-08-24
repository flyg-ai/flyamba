import { createClient } from "@supabase/supabase-js";

// A client of our own rather than the shared `supabaseServer`, for the same
// reason app/lib/climate.ts has one: this read must never come from the build
// cache.
//
// Next stores build-time fetch responses in .next/cache and Vercel restores that
// between deploys, so a deploy made after the nightly fare job replays the
// previous night's prices. It was caught here the hard way — after the metro-code
// fix took coverage from 339 destinations to 377, the build kept logging 339
// until the cache was cleared by hand, and nothing said so. Fares change every
// night; a cached fare is a wrong fare.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const faresClient =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: { persistSession: false, autoRefreshToken: false },
        global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) },
      })
    : null;

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
  /** When we saw this price. The label shows it — see US_ORIGIN_CHAIN below. */
  fetchedAt: string | null;
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
  fetched_at: string | null;
};

function toFare(r: Row): Fare {
  return {
    priceUsd: r.price_usd,
    departDate: r.depart_date,
    returnDate: r.return_date,
    airline: r.airline,
    oneWay: r.one_way,
    fetchedAt: r.fetched_at,
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
  if (!faresClient) return {};

  const { data, error } = await faresClient
    .from("origin_fares")
    .select("slug, rank, price_usd, depart_date, return_date, airline, one_way, fetched_at")
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
  if (!faresClient || slugs.length === 0) return {};

  const { data, error } = await faresClient
    .from("origin_fares")
    .select("slug, rank, price_usd, depart_date, return_date, airline, one_way, fetched_at")
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

// ---------------------------------------------------------------------------
// US fare table
//
// New York is the default because it has the best coverage of the four US
// origins we pull — 301 destinations against Miami's 169, Chicago's 175 and Los
// Angeles's 210 — and because the label always names the airport, so a New York
// price can never read as a price from somewhere else.
//
// DISPLAY AND SORT DELIBERATELY DIFFER, AND MUST KEEP DIFFERING.
//
// For display we fall back through the chain: no New York fare, show Miami, then
// Chicago, then Los Angeles, labelled with whichever one it came from. That is
// still true, and it cuts the number of cards with no price at all.
//
// For sorting we use New York ONLY, including when the card is showing a Miami
// price. Price is the tiebreak in the warm-destination sort, and a column mixing
// four origins is not a column — a $200 Miami fare and a $200 New York fare are
// not comparable quantities, so ranking on the mixture would order the grid by
// which city we happened to have data for. A destination with no New York fare
// sorts last within its tie group even when it shows a Miami price.
export const US_ORIGIN_CHAIN = ["NYC", "MIA", "CHI", "LAX"] as const;

/** The default origin, and the only one the sort ever reads. */
export const SORT_ORIGIN = "NYC";

export type UsFare = {
  fare: Fare;
  /** The airport this price is actually from — always shown next to it. */
  origin: (typeof US_ORIGIN_CHAIN)[number];
};

export type UsFareTable = {
  /** Cheapest fare per slug after falling through the chain. For display. */
  display: Record<string, UsFare>;
  /** New York price per slug. For sorting only. */
  sortPrice: Record<string, number>;
};

let tableCache: Promise<UsFareTable> | null = null;

async function loadUsFareTable(): Promise<UsFareTable> {
  const display: Record<string, UsFare> = {};
  const sortPrice: Record<string, number> = {};

  // Walked in chain order, and an earlier origin is never overwritten by a later
  // one — first hit wins, which is what makes the fallback a preference order.
  for (const origin of US_ORIGIN_CHAIN) {
    const byOrigin = await getFaresByOrigin(origin);
    for (const [slug, options] of Object.entries(byOrigin)) {
      const cheapest = options[0];
      if (!cheapest) continue;
      if (origin === SORT_ORIGIN) sortPrice[slug] = cheapest.priceUsd;
      if (!display[slug]) display[slug] = { fare: cheapest, origin };
    }
  }
  console.log(
    `[fares] US table: ${Object.keys(display).length} destinations with a price, ` +
      `${Object.keys(sortPrice).length} of them from ${SORT_ORIGIN}`,
  );
  return { display, sortPrice };
}

/** Memoized: a twelve-page build reads the four origins once, not forty-eight times. */
export function getUsFareTable(): Promise<UsFareTable> {
  return (tableCache ??= loadUsFareTable());
}

/**
 * The compact card label: "$153 rt · NYC · seen Aug 19".
 *
 * Never "from $153". These are fares we observed, not fares we are offering, and
 * US DOT's full-fare advertising rule (14 CFR 399.84) is about advertised prices
 * being available to buy. Past tense and an origin keep this an observation.
 */
export function formatFareLabelShort(f: UsFare, { showOrigin = true } = {}): string {
  const seen = f.fare.fetchedAt
    ? new Date(f.fare.fetchedAt).toLocaleString("en-US", { month: "short", day: "numeric", timeZone: "UTC" })
    : null;
  const trip = f.fare.oneWay ? "one way" : "rt";
  // `showOrigin: false` is for lists where every row is already labelled with its
  // departure city — /cheap-flights, where the row IS the city. Repeating the code
  // there adds a token the reader has to skip, not information.
  return [`$${f.fare.priceUsd.toLocaleString("en-US")} ${trip}`, showOrigin ? f.origin : null, seen ? `seen ${seen}` : null]
    .filter(Boolean)
    .join(" · ");
}

/** The long form for destination pages: two lines, the second one the detail. */
export function formatFareLabelLong(f: UsFare, originLabel: string): { headline: string; detail: string | null } {
  const seen = f.fare.fetchedAt
    ? new Date(f.fare.fetchedAt).toLocaleString("en-US", { month: "short", day: "numeric", timeZone: "UTC" })
    : null;
  const trip = f.fare.oneWay ? "one way" : "round trip";
  const dates = formatFareDates(f.fare);
  return {
    headline: `$${f.fare.priceUsd.toLocaleString("en-US")} ${trip} from ${originLabel}`,
    detail: [seen ? `seen ${seen}` : null, dates].filter(Boolean).join(" · ") || null,
  };
}

// ── Non-stop evidence ────────────────────────────────────────────────────────

export type NonstopEvidence = {
  /** Metro code of the SUPPORTED_ORIGIN the fare departs from. */
  origin: string;
  priceUsd: number;
  departDate: string | null;
  returnDate: string | null;
  fetchedAt: string | null;
};

/**
 * Observed non-stop fares for a destination — the rank-3 rows the cron's
 * v2/prices/latest pass writes.
 *
 * THE EVIDENCE ONLY WORKS IN ONE DIRECTION. A row here means someone was sold a
 * non-stop at this price: the route exists and a page may say so. The ABSENCE of
 * a row means nothing — the feed reports cheapest fares, the cheapest
 * transatlantic is almost always a connection, and JFK–AMS showed no non-stop in
 * it while KLM flies the route daily. Never render "no non-stop service" from an
 * empty result; render nothing.
 */
export async function getNonstopEvidence(slug: string): Promise<NonstopEvidence[]> {
  if (!faresClient) return [];
  const { data, error } = await faresClient
    .from("origin_fares")
    .select("origin, price_usd, depart_date, return_date, fetched_at")
    .eq("slug", slug)
    .eq("one_way", false)
    .eq("number_of_changes", 0)
    .order("price_usd");
  if (error) {
    console.error("[fares] nonstop evidence select failed:", error.message);
    return [];
  }
  return (data ?? []).map((r) => ({
    origin: r.origin as string,
    priceUsd: r.price_usd as number,
    departDate: (r.depart_date as string | null) ?? null,
    returnDate: (r.return_date as string | null) ?? null,
    fetchedAt: (r.fetched_at as string | null) ?? null,
  }));
}
