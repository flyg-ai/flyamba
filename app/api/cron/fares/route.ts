import { NextRequest, NextResponse } from "next/server";
import { ALL_DESTINATIONS } from "@/app/data/all-destinations";
import { supabaseServer, isSupabaseServerConfigured } from "@/app/lib/supabase-server";
import { SUPPORTED_ORIGINS } from "@/app/lib/origins";

// Nightly refresh of the "from $X" number for every destination, per origin.
//
// Uses v1/prices/cheap with destination="-", which returns the cheapest options
// for ALL destinations from one origin, each with its own depart/return dates.
// One call per origin — not one per route. With ~10 supported origins that is
// ~10 calls a night against 550 destinations; doing the same with
// v1/prices/calendar would be 5,500.
//
// Stores the two cheapest date pairs per destination so a card can offer an
// alternative without a second query.
//
// ROUND TRIP by default. 14 CFR 399.84 makes it a deceptive practice to present
// a fare that requires round-trip purchase as "one way", and the card has said
// "one way" over round-trip-derived data since launch. `one_way` is stored so
// the UI always knows which it is rendering.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const RANKS_PER_DESTINATION = 2;
const DELAY_MS = 400;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * IATA metropolitan codes → the airport codes they cover.
 *
 * THIS TABLE EXISTS BECAUSE THE TWO SIDES SPOKE DIFFERENT DIALECTS. Travelpayouts
 * keys its price responses on the METRO code where one exists — ROM, not FCO; NYC,
 * not JFK; ORL, not MCO — while the catalog stores the AIRPORT code, because that
 * field also feeds the Aviasales widget and the affiliate deep links. Neither side
 * was wrong and they never met: 83 of 554 destinations held no price from any of
 * 24 origins, including five cities with full hub guides — London, New York, Paris,
 * Rome and Tokyo. Travelpayouts returned 577 distinct codes and only 213 matched.
 *
 * Fix it here rather than in the catalog. Changing `iata` there would silently
 * repoint every widget and deep link on the site.
 *
 * Codes are the standard IATA metropolitan areas. Adding one is safe: an entry
 * whose airports are not in the catalog simply never fires.
 */
const METRO_AIRPORTS: Record<string, string[]> = {
  LON: ["LHR", "LGW", "STN", "LTN", "LCY"],
  PAR: ["CDG", "ORY", "BVA"],
  NYC: ["JFK", "EWR", "LGA"],
  ROM: ["FCO", "CIA"],
  MIL: ["MXP", "LIN", "BGY"],
  TYO: ["NRT", "HND"],
  OSA: ["KIX", "ITM"],
  SEL: ["ICN", "GMP"],
  BJS: ["PEK", "PKX"],
  SHA: ["PVG", "SHA"],
  MOW: ["SVO", "DME", "VKO"],
  STO: ["ARN", "BMA", "NYO"],
  WAS: ["IAD", "DCA", "BWI"],
  CHI: ["ORD", "MDW"],
  ORL: ["MCO", "SFB"],
  BUE: ["EZE", "AEP"],
  SAO: ["GRU", "CGH", "VCP"],
  RIO: ["GIG", "SDU"],
  YTO: ["YYZ", "YTZ"],
  YMQ: ["YUL", "YMX"],
  TCI: ["TFS", "TFN"],
  REK: ["KEF", "RKV"],
  BKK: ["BKK", "DMK"],
  JKT: ["CGK", "HLP"],
  IST: ["IST", "SAW"],
  BCN: ["BCN", "GRO", "REU"],
  BUH: ["OTP", "BBU"],
  OSL: ["OSL", "TRF", "RYG"],
  WAW: ["WAW", "WMI"],
  HOU: ["IAH", "HOU"],
  DFW: ["DFW", "DAL"],
  VCE: ["VCE", "TSF"],
  FRA: ["FRA", "HHN"],
  DUS: ["DUS", "NRN"],
  TSA: ["TPE", "TSA"],
  KUL: ["KUL", "SZB"],
  MEL: ["MEL", "AVV"],
  DXB: ["DXB", "DWC"],
};

/**
 * IATA → every catalog slug served by that code, including the metro codes.
 *
 * IATA is not unique here: 550 destinations share 429 codes, because Split
 * serves Hvar and Brač too. For search that ambiguity was a bug. For fares it
 * is correct — the fare belongs to the airport, so all the towns it serves get
 * the same number. The metro entries extend that: a price quoted for ROM belongs
 * to everything the catalog files under FCO or CIA.
 */
const SLUGS_BY_IATA = (() => {
  const map = new Map<string, string[]>();
  const add = (code: string, slug: string) => {
    const list = map.get(code);
    if (list) { if (!list.includes(slug)) list.push(slug); }
    else map.set(code, [slug]);
  };
  for (const d of ALL_DESTINATIONS) {
    const iata = d.iata?.toUpperCase();
    if (!iata) continue;
    add(iata, d.slug);
  }
  // Every metro code inherits the slugs of the airports it covers.
  for (const [metro, airports] of Object.entries(METRO_AIRPORTS)) {
    for (const airport of airports) {
      for (const slug of map.get(airport) ?? []) add(metro, slug);
    }
  }
  return map;
})();

type CheapOption = {
  price?: number;
  airline?: string;
  flight_number?: number | string;
  departure_at?: string;
  return_at?: string;
  expires_at?: string;
  /** Stops on the itinerary. 0 is a non-stop; the upstream has always sent it. */
  number_of_changes?: number;
};

type FareRow = {
  origin: string;
  slug: string;
  rank: number;
  price_usd: number;
  depart_date: string | null;
  return_date: string | null;
  airline: string | null;
  flight_number: string | null;
  one_way: boolean;
  found_at: string | null;
  /**
   * 0 = non-stop. Null when the upstream omitted it — never defaulted to 0,
   * because a default would assert a non-stop we never observed. This is the only
   * evidence the site accepts for a "direct flights from X" claim; a price is not
   * evidence, since a cheap fare can have two stops.
   */
  number_of_changes: number | null;
};

/** "2026-09-14T07:20:00Z" → "2026-09-14". Null for anything unparseable. */
function dateOnly(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const m = v.match(/^(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : null;
}

async function fetchOrigin(origin: string, token: string, oneWay: boolean): Promise<FareRow[]> {
  const url =
    `https://api.travelpayouts.com/v1/prices/cheap` +
    `?origin=${origin}&destination=-&currency=usd` +
    (oneWay ? "&one_way=true" : "") +
    `&token=${token}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`upstream ${res.status}`);

  // Shape: { success, data: { "<DEST_IATA>": { "0": {...}, "1": {...} } } }
  const json = (await res.json()) as { data?: Record<string, Record<string, CheapOption>> };
  const data = json?.data;
  if (!data || typeof data !== "object") return [];

  // Options are collected PER SLUG before they are ranked, not per upstream code.
  //
  // Once metro codes resolve, one destination can arrive twice in the same
  // response — Travelpayouts returns both ROM and FCO, and both are Rome. Ranking
  // each code separately produced two rows sharing (origin, slug, one_way, rank),
  // and Postgres rejects the whole batch with "ON CONFLICT DO UPDATE command
  // cannot affect row a second time". Six origins failed that way before this.
  //
  // Pooling first is also more correct than deduplicating afterwards: the two
  // codes carry different date pairs, so the cheapest two across both is a better
  // answer than the cheapest two from whichever code happened to be processed
  // last.
  const optionsBySlug = new Map<string, CheapOption[]>();
  for (const [destIata, options] of Object.entries(data)) {
    const slugs = SLUGS_BY_IATA.get(destIata.toUpperCase());
    if (!slugs?.length) continue; // upstream knows airports we don't list

    const valid = Object.values(options ?? {}).filter(
      (o) => typeof o?.price === "number" && Number.isFinite(o.price) && o.price > 0,
    );
    for (const slug of slugs) {
      const list = optionsBySlug.get(slug);
      if (list) list.push(...valid);
      else optionsBySlug.set(slug, [...valid]);
    }
  }

  const rows: FareRow[] = [];
  for (const [slug, options] of optionsBySlug) {
    const sorted = options
      .sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
      // The same fare can arrive under both codes; a repeated price and date pair
      // is one option, not two.
      .filter((o, i, all) => i === all.findIndex((x) => x.price === o.price && x.departure_at === o.departure_at))
      .slice(0, RANKS_PER_DESTINATION);

    sorted.forEach((o, rank) => {
      rows.push({
        origin,
        slug,
        rank,
        price_usd: Math.round(o.price as number),
        depart_date: dateOnly(o.departure_at),
        // A round-trip fare with no return date is not a round trip we can
        // describe, so it is stored but the UI can tell.
        return_date: oneWay ? null : dateOnly(o.return_at),
        airline: typeof o.airline === "string" && o.airline ? o.airline : null,
        flight_number: o.flight_number != null ? String(o.flight_number) : null,
        one_way: oneWay,
        found_at: null,
        number_of_changes: typeof o.number_of_changes === "number" ? o.number_of_changes : null,
      });
    });
  }
  return rows;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "CRON_SECRET is not configured" }, { status: 500 });
  }
  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = process.env.TRAVELPAYOUTS_API_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "TRAVELPAYOUTS_API_TOKEN is not configured" }, { status: 500 });
  }
  if (!isSupabaseServerConfigured || !supabaseServer) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });
  }

  // ?one_way=true also refreshes true one-way fares. Off by default: the site
  // shows round trip, and this doubles the upstream calls.
  const alsoOneWay = request.nextUrl.searchParams.get("one_way") === "true";
  const modes = alsoOneWay ? [false, true] : [false];

  let written = 0;
  const failures: string[] = [];
  const coverage: Record<string, number> = {};

  for (const origin of SUPPORTED_ORIGINS) {
    for (const oneWay of modes) {
      try {
        const rows = await fetchOrigin(origin.iata, token, oneWay);
        if (rows.length) {
          const { error } = await supabaseServer
            .from("origin_fares")
            .upsert(rows, { onConflict: "origin,slug,one_way,rank" });
          if (error) throw new Error(`supabase: ${error.message}`);
          written += rows.length;
        }
        // Distinct destinations covered, which is the number that matters —
        // rows counts the slug fan-out from shared airports.
        coverage[`${origin.iata}${oneWay ? " (one way)" : ""}`] = new Set(rows.map((r) => r.slug)).size;
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        failures.push(`${origin.iata}${oneWay ? " one-way" : ""}: ${message}`);
        console.error(`[cron/fares] ${origin.iata} failed:`, message);
      }
      await sleep(DELAY_MS);
    }
  }

  const summary = {
    ok: failures.length === 0,
    origins: SUPPORTED_ORIGINS.length,
    rowsWritten: written,
    destinationsPerOrigin: coverage,
    failed: failures.length,
    failures: failures.slice(0, 10),
    ranAt: new Date().toISOString(),
  };
  console.log("[cron/fares]", JSON.stringify(summary));
  return NextResponse.json(summary);
}
