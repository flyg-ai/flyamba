import { createClient } from "@supabase/supabase-js";
// The catalog stores SEK (seeded from flyg.ai); app/lib/format.ts owns the rate.
import { usd } from "./format";
import { ALL_DESTINATIONS } from "@/app/data/all-destinations";

// Monthly average high temperatures (°C) per destination, read from the Supabase
// `climate_data` table at build time. Same job as flyg.ai's lib/landingData.ts,
// with one difference that matters — see below.
//
// SERVER-SIDE ONLY. This module holds the service-role Supabase client, so it must
// never be imported from a "use client" file. `buildDestinations` returns a narrow,
// plain-object shape that is safe to hand to a client component as props.
//
// It deliberately does NOT read destination-facts.ts. The editorial `scores` there
// are partly machine-generated and demonstrably wrong in places — Kuwait scores 9 for
// nightlife in a country where alcohol is banned — so the page filters on measured
// climate instead. See the data-quality note in CLAUDE.md.

/** The four measures a card or a chip needs, for one destination in one month. */
type MonthClimate = {
  tempC: number;
  /** Overnight low, °C. Present for all 550. */
  tempMinC: number | null;
  /** Monthly rainfall, mm. Present for 370 of 550 — see the data-quality note below. */
  precipitationMm: number | null;
  /** Sea surface temperature, °C. Present for 380 of 550. */
  seaTempC: number | null;
};

/** Rows are keyed by month 1–12 in the table; we store 0-indexed arrays. */
type TempsBySlug = Record<string, (MonthClimate | null)[]>;

// A client of our own rather than the shared `supabaseServer`, for one reason:
// this read must never be cached.
//
// Next stores build-time fetch responses in .next/cache, and Vercel restores that
// directory between deploys. A deploy made after climate_data changes will happily
// replay the previous response, and nothing anywhere says so. It was caught here
// the hard way: the first build after the Swedish slugs were renamed in the table
// still logged the old destination count, and with the alias map removed that
// silently cut July from 550 destinations to 534. The build passed, the log looked
// normal, and no test could have seen it. `cache: "no-store"` on this one request
// is what makes a database fix reach the pages on the next deploy rather than the
// one after it.
//
// Scoped deliberately: every other Supabase call in the project still goes through
// ./supabase-server and keeps its default caching.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const climateClient =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: { persistSession: false, autoRefreshToken: false },
        global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) },
      })
    : null;

// THE DIFFERENCE FROM flyg.ai: pagination.
// flyg.ai passes `.limit(20000)` and treats one response as the whole table. That
// does not work — PostgREST caps a response at `db-max-rows` (1000 by default) and
// `.limit()` cannot raise it, only lower it. On this project a single call returns
// exactly 1000 of the table's 6888 rows — 85 destinations of 574 — silently. Every
// page would still build, just with most of the world missing. So we page with .range().
const PAGE_SIZE = 1000;

// The slugs in climate_data were Swedish once — the table was copied over from
// flyg.ai, so Rome was `rom` and Lisbon `lissabon`, and sixteen major European
// cities had no row under the English slug this catalog uses. They were renamed
// in the database in Aug 2026 and five duplicates dropped. Coverage is now
// 550/550 on a plain slug lookup. If a destination ever turns up with no
// temperature, check the table — do not reintroduce an alias map here.

type ClimateRow = {
  destination_slug: string;
  month: number;
  temp_max: number | null;
  temp_min: number | null;
  precipitation: number | null;
  sunshine_hours: number | null;
  sea_temp: number | null;
};

/**
 * A sea temperature of exactly 0 means "no sea", not "freezing".
 *
 * 197 of the 550 catalog destinations carry `data_source: "gpt_seed"` — climate
 * rows an LLM produced rather than a weather service measured — and those rows fill
 * every column, including ones that cannot apply. Munich, Kathmandu, La Paz,
 * Bratislava, Brno, Augsburg and Almaty are all landlocked and all carry
 * `sea_temp: 0.0`. Treating that as data would put them in a "cold sea" bucket and,
 * worse, imply we know something about a coastline they do not have. Normalised to
 * null here so a sea filter hides them as unknown, which is what they are.
 */
function seaTemp(row: ClimateRow): number | null {
  if (typeof row.sea_temp !== "number" || row.sea_temp === 0) return null;
  return Math.round(row.sea_temp);
}

let cache: Promise<TempsBySlug> | null = null;

async function loadTemps(): Promise<TempsBySlug> {
  const out: TempsBySlug = {};
  // ANY failure — missing env, RLS, network, a schema change — leaves the map
  // empty and every page still renders, just without temperatures. A climate-data
  // outage must never break the build.
  try {
    if (!climateClient) throw new Error("missing Supabase env — NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
    for (let from = 0; ; from += PAGE_SIZE) {
      const { data, error } = await climateClient
        .from("climate_data")
        .select("destination_slug, month, temp_max, temp_min, precipitation, sunshine_hours, sea_temp")
        .order("destination_slug")
        .order("month")
        .range(from, from + PAGE_SIZE - 1);
      if (error) throw error;
      const rows = (data ?? []) as ClimateRow[];
      for (const row of rows) {
        const { destination_slug: slug, month } = row;
        if (!slug || typeof month !== "number" || month < 1 || month > 12) continue;
        if (typeof row.temp_max !== "number") continue;
        if (!out[slug]) out[slug] = new Array(12).fill(null);
        out[slug][month - 1] = {
          tempC: Math.round(row.temp_max),
          tempMinC: typeof row.temp_min === "number" ? Math.round(row.temp_min) : null,
          precipitationMm: typeof row.precipitation === "number" ? Math.round(row.precipitation) : null,
          seaTempC: seaTemp(row),
        };
      }
      if (rows.length < PAGE_SIZE) break;
    }
    console.log(`[climate] loaded ${Object.keys(out).length} destinations from climate_data`);
  } catch (e) {
    console.warn("[climate] climate_data load failed — pages will render without temperatures:", e);
    return {};
  }
  return out;
}

/** Memoized so a 12-page build reads the table once per worker, not twice per page. */
function temps(): Promise<TempsBySlug> {
  return (cache ??= loadTemps());
}

/** The shape a card needs. Plain and serializable — safe to pass to a client component. */
export type WarmDestination = {
  slug: string;
  name: string;
  country: string;
  continent: string;
  image: string;
  /** Average daily high for the requested month, °C. Celsius is the internal unit; the UI converts. */
  tempC: number;
  /** Overnight low, °C. Null when the table has no value. */
  tempMinC: number | null;
  /** Monthly rainfall, mm. Null when the table has no value — 180 of 550 destinations. */
  precipitationMm: number | null;
  /** Sea temperature, °C. Null for inland destinations and where unmeasured. */
  seaTempC: number | null;
  /** Cheapest month's fare, USD. 0 when the catalog has no price. */
  priceUsd: number;
};

/**
 * Join ALL_DESTINATIONS with the month's temperatures and with scores/tags from
 * destination-facts. Destinations with no temperature for this month are dropped —
 * a "where is it warm" grid cannot rank a card with no temperature.
 */
export async function buildDestinations(monthIndex: number): Promise<WarmDestination[]> {
  const map = await temps();
  const out: WarmDestination[] = [];

  for (const d of ALL_DESTINATIONS) {
    const climate = map[d.slug]?.[monthIndex];
    if (!climate) continue;

    const positives = (d.monthlyPrices ?? []).filter((p): p is number => typeof p === "number" && p > 0);

    out.push({
      slug: d.slug,
      name: d.name,
      country: d.country,
      continent: d.continent,
      image: d.thumbnail || d.image,
      tempC: climate.tempC,
      tempMinC: climate.tempMinC,
      precipitationMm: climate.precipitationMm,
      seaTempC: climate.seaTempC,
      priceUsd: positives.length ? usd(Math.min(...positives)) : 0,
    });
  }

  return out.sort((a, b) => b.tempC - a.tempC);
}
