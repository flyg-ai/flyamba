import { createClient } from "@supabase/supabase-js";
import { ALL_DESTINATIONS } from "@/app/data/all-destinations";
import { DESTINATION_FACTS } from "@/app/data/destination-facts";
import { HUB_CITY_SET } from "./hubs";
import { getUsFareTable, formatFareLabelShort, type UsFare } from "./fares";

// Monthly average high temperatures (°C) per destination, read from the Supabase
// `climate_data` table at build time. Same job as flyg.ai's lib/landingData.ts,
// with one difference that matters — see below.
//
// SERVER-SIDE ONLY. This module holds the service-role Supabase client, so it must
// never be imported from a "use client" file. `buildDestinations` returns a narrow,
// plain-object shape that is safe to hand to a client component as props.
//
// It reads destination-facts.ts for ONE thing: deciding whether a destination reads
// as a holiday place, which the sort below needs. Nothing from that file is filtered
// on or passed to the client. The editorial `scores` are partly machine-generated and
// demonstrably wrong in places — Kuwait rates 9 for nightlife in a country where
// alcohol is banned — so they are unfit to filter on, but a coarse "does this have a
// beach" read is within what they can carry. See the data-quality note in CLAUDE.md.

/** The four measures a card or a chip needs, for one destination in one month. */
export type MonthClimate = {
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
  /** "open_meteo" = measured ten-year average; "gpt_seed" = an LLM's guess. */
  data_source: string | null;
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

/**
 * The whole table plus which slugs may claim "measured": every month present AND
 * every row from open_meteo. The distinction exists because 195 destinations
 * once carried gpt_seed rows — numbers an LLM produced, not observations — and a
 * page section built on those would print invented figures under a "measured"
 * footnote. All were refetched from Open-Meteo on 2026-09-03 (554/554 measured),
 * but the gate stays: it is what stops a future seeded row from silently
 * re-earning the badge.
 */
type ClimateTable = { bySlug: TempsBySlug; measuredYear: Set<string> };

let cache: Promise<ClimateTable> | null = null;

async function loadTemps(): Promise<ClimateTable> {
  const out: TempsBySlug = {};
  const sources = new Map<string, Set<string>>();
  // ANY failure — missing env, RLS, network, a schema change — leaves the map
  // empty and every page still renders, just without temperatures. A climate-data
  // outage must never break the build.
  try {
    if (!climateClient) throw new Error("missing Supabase env — NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
    for (let from = 0; ; from += PAGE_SIZE) {
      const { data, error } = await climateClient
        .from("climate_data")
        .select("destination_slug, month, temp_max, temp_min, precipitation, sunshine_hours, sea_temp, data_source")
        .order("destination_slug")
        .order("month")
        .range(from, from + PAGE_SIZE - 1);
      if (error) throw error;
      const rows = (data ?? []) as ClimateRow[];
      for (const row of rows) {
        const { destination_slug: slug, month } = row;
        if (!slug || typeof month !== "number" || month < 1 || month > 12) continue;
        // Source is recorded for EVERY row, including ones dropped below — a slug
        // with a stray gpt_seed row anywhere loses the measured badge outright.
        (sources.get(slug) ?? sources.set(slug, new Set()).get(slug)!).add(row.data_source ?? "unknown");
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
    return { bySlug: {}, measuredYear: new Set() };
  }
  const measuredYear = new Set<string>();
  for (const [slug, months] of Object.entries(out)) {
    const src = sources.get(slug);
    if (months.every(Boolean) && src?.size === 1 && src.has("open_meteo")) measuredYear.add(slug);
  }
  console.log(`[climate] ${measuredYear.size} of them measured (open_meteo, all 12 months)`);
  return { bySlug: out, measuredYear };
}

/** Memoized so a 12-page build reads the table once per worker, not twice per page. */
function temps(): Promise<ClimateTable> {
  return (cache ??= loadTemps());
}

/**
 * The full measured year for one destination, or null.
 *
 * Null means "we hold no measured series", NOT "no climate" — and for such a
 * slug the honest month-by-month table is no table. The caller renders nothing
 * on null — no empty state, no apology — the same rule NonstopRoutes follows
 * for missing route evidence. Since the 2026-09-03 refetch every catalog slug
 * is measured, so null now means a genuinely new or removed destination.
 */
export async function climateYear(slug: string): Promise<MonthClimate[] | null> {
  const { bySlug, measuredYear } = await temps();
  if (!measuredYear.has(slug)) return null;
  return bySlug[slug] as MonthClimate[];
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
  /**
   * Real observed fare for display, from origin_fares. Null when we hold no US
   * fare for this destination — render nothing rather than falling back to the
   * catalog estimate, which is what made the old figure wrong. See fares.ts.
   */
  fare: UsFare | null;
  /**
   * The card label, formatted here rather than in the component: WarmBrowser is a
   * client component and fares.ts carries the service-role Supabase client, so the
   * formatter cannot cross that boundary. A plain string can.
   */
  fareLabel: string | null;
  /**
   * New York price, for sorting only. Null when we have none, which sorts the
   * destination last within its tie group even if `fare` shows a Miami price.
   */
  sortPriceUsd: number | null;
};

// ---------------------------------------------------------------------------
// Market weighting
//
// Sorting on temperature alone answers the question literally and serves the
// audience badly. The site's primary market is the United States, and a January
// list led by Bangkok and Ho Chi Minh City puts Cancún at position 113.
//
// THIS IS DELIBERATELY STATIC, NOT GEO-DETECTED. Every /where-is-it-warm page is
// generateStaticParams + dynamicParams=false + force-static. Reading a visitor's
// country would make them dynamic: a TTFB penalty on every request, a CDN cache
// fragmented by geography, and no ISR. Googlebot crawls from the US regardless,
// so the personalised version would not even be the version that gets indexed.
// If you are here to "improve" this with middleware or a geo header, that is the
// trade you would be making.
//
// The catalog has no "Caribbean" or "Central America" continent — everything from
// Cuba to Canada is filed under "North America" — so the tiers key on country.
const CARIBBEAN = [
  "Aruba", "Bahamas", "Barbados", "Cayman Islands", "Cuba", "Curaçao",
  "Dominican Republic", "Grenada", "Jamaica", "Puerto Rico", "Saint Lucia",
  "Sint Maarten", "Trinidad and Tobago", "Turks & Caicos", "U.S. Virgin Islands",
];
const CENTRAL_AMERICA = ["Belize", "Costa Rica", "Guatemala", "Panama"];
const NORTH_AFRICA = ["Morocco", "Egypt", "Tunisia", "Algeria", "Libya"];

/** Sub-Saharan Africa sits in tier 4 with Asia and Oceania. Real destinations, but
 *  long-haul with low US demand — this ranks relative priority, not merit. */
function marketTier(d: { country: string; continent: string }): 1 | 2 | 3 | 4 {
  if (
    d.country === "United States" ||
    d.country === "Mexico" ||
    CARIBBEAN.includes(d.country) ||
    CENTRAL_AMERICA.includes(d.country)
  ) return 1;
  if (d.continent === "South America" || d.country === "Canada") return 2;
  if (d.continent === "Europe" || d.continent === "Eurasia" || NORTH_AFRICA.includes(d.country)) return 3;
  return 4;
}

/** Bonus in °F. Capped at 4 on purpose — see the note below. */
const TIER_BONUS: Record<number, number> = { 1: 4, 2: 2, 3: 1, 4: 0 };

/**
 * Only holiday destinations earn the bonus.
 *
 * Without this the July list opens with Washington D.C., Denver, Atlanta and
 * Detroit — American cities that are genuinely 86–88 °F in July and that nobody
 * has ever called a warm-weather escape. Proximity is only worth something if the
 * place is somewhere you would go.
 */
function isLeisureDestination(slug: string): boolean {
  const f = DESTINATION_FACTS[slug];
  const tags = f?.tags ?? [];
  return (
    tags.includes("beach") || tags.includes("coast") || tags.includes("island") ||
    tags.includes("tropical") || (f?.scores?.beaches ?? 0) >= 6
  );
}

/**
 * Temperature plus a market nudge, in °F so the number means what the card shows.
 *
 * THE 4 °F CAP IS THE WHOLE DESIGN. It moves a destination within roughly four
 * degrees and never further, so warmth still decides: a 60 °F American beach
 * scores 64 and loses to an 85 °F Asian one, exactly as it should.
 *
 * JANUARY IS NOT BROKEN — DO NOT "FIX" IT WITH A BIGGER BONUS. In January the top
 * is Rio, Lima, Medellín and Cartagena, and Cancún sits far down. That is the
 * correct answer: Cancún averages 77 °F in January against Rio's 88 °F, and on a
 * page called "where is it warm" eleven degrees has to win. A bonus large enough
 * to lift Cancún would also lift places that are not warm at all, which is the
 * failure this cap exists to prevent. The real fix for January is adding the
 * Caribbean destinations the catalog is missing, not reweighting the ones it has.
 */
function sortScore(d: WarmDestination, tier: 1 | 2 | 3 | 4): number {
  const tempF = d.tempC * 1.8 + 32;
  return tempF + (isLeisureDestination(d.slug) ? TIER_BONUS[tier] : 0);
}

/**
 * Join ALL_DESTINATIONS with the month's temperatures and with scores/tags from
 * destination-facts. Destinations with no temperature for this month are dropped —
 * a "where is it warm" grid cannot rank a card with no temperature.
 */
export async function buildDestinations(monthIndex: number): Promise<WarmDestination[]> {
  const { bySlug: map } = await temps();
  const fares = await getUsFareTable();
  const out: WarmDestination[] = [];
  const byCatalog = new Map(ALL_DESTINATIONS.map((d) => [d.slug, d]));

  for (const d of ALL_DESTINATIONS) {
    const climate = map[d.slug]?.[monthIndex];
    if (!climate) continue;

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
      fare: fares.display[d.slug] ?? null,
      fareLabel: fares.display[d.slug] ? formatFareLabelShort(fares.display[d.slug]) : null,
      sortPriceUsd: fares.sortPrice[d.slug] ?? null,
    });
  }

  // Scores collide constantly — the window is 14 whole degrees wide and hundreds of
  // destinations sit inside it — so the tiebreak is doing visible work, not cleaning
  // up an edge case. Alphabetical was the first attempt and it showed: July opened
  // with Alaçatı, Algarve, Alicante, Amalfi, Ancona, which reads as a database dump.
  //
  // Built-out destinations come first instead, because a tie is exactly when it is
  // worth sending someone to the page that has a guide behind it rather than to a
  // lite template. Then the cheaper fare, then the slug so the order is total and a
  // rebuild never reshuffles the grid.
  const tiers = new Map(out.map((d) => [d.slug, marketTier(byCatalog.get(d.slug)!)]));
  const rank = (d: WarmDestination) => (HUB_CITY_SET.has(d.slug) ? 0 : 1);
  return out.sort(
    (a, b) =>
      sortScore(b, tiers.get(b.slug)!) - sortScore(a, tiers.get(a.slug)!) ||
      b.tempC - a.tempC ||
      rank(a) - rank(b) ||
      (a.sortPriceUsd ?? Infinity) - (b.sortPriceUsd ?? Infinity) ||
      a.slug.localeCompare(b.slug),
  );
}
