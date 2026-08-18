import { destinations } from "@/app/data/destinations";
import { ALL_DESTINATIONS } from "@/app/data/all-destinations";
import { usdStr } from "@/app/lib/format";

// Shared comparison catalog + row definitions.
//
// Extracted from CompareClient so the interactive /compare tool and the static
// /compare/<a>-vs-<b> pages render from exactly one source. No JSX here — the
// presentational half lives in ComparisonTable.tsx, and keeping this file
// server-safe lets the static page import it for metadata generation without
// pulling in a client component.

export type Scores = {
  beaches: number;
  nightlife: number;
  food: number;
  activities: number;
  family: number;
  value: number;
};

export type Comparable = {
  slug: string;
  name: string;
  country: string;
  flag?: string;
  image: string;
  /** Cheapest fare in SEK — the unit the catalog stores. Format with usdStr(). */
  priceSek: number;
  flightTime?: string;
  bestMonths?: string;
  summerTemp?: number;
  category?: string;
  foodCostPerDay?: string;
  hotelCostPerNight?: string;
  airlines?: string[];
  scores?: Scores;
};

// ── Unified catalog: the 8 rich destinations first, then every scored city
//    from the ported catalog (deduped by slug; rich entries inherit scores from
//    a same-slug slim counterpart). 26 cities in total — the 28 hubs minus
//    madrid and mykonos, which have no `scores`. ─────────────────────────────
const slimScoredBySlug = new Map(ALL_DESTINATIONS.filter((d) => d.scores).map((d) => [d.slug, d]));
const richSlugs = new Set(destinations.map((d) => d.slug));

// ── One price source for everyone ───────────────────────────────────────────
// The two catalogs price destinations differently: `destinations.price` is a
// hand-authored "from" fare, `ALL_DESTINATIONS.monthlyPrices` are 12-month
// average round-trip fares. They disagree by 0.8x–2.1x on the same city
// (Barcelona: 1290 vs 2700 SEK).
//
// A comparison table only has to be internally consistent, so every comparable
// city is priced from `monthlyPrices` — the source all 26 of them share. Mixing
// the two, as this page used to, meant the 8 rich cities were compared on a
// different basis than the other 18 and Barcelona won every price row it
// appeared in. `destinations.price` remains the right number on the
// destination's own page; it is just not comparable across cities.
const slimBySlug = new Map(ALL_DESTINATIONS.map((d) => [d.slug, d]));

function comparablePriceSek(slug: string, fallback = 0): number {
  const monthly = slimBySlug.get(slug)?.monthlyPrices.filter((p): p is number => p != null);
  return monthly?.length ? Math.min(...monthly) : fallback;
}

const RICH: Comparable[] = destinations.map((d) => ({
  slug: d.slug,
  name: d.city,
  country: d.country,
  flag: d.countryFlag,
  image: d.image,
  priceSek: comparablePriceSek(d.slug, d.price),
  flightTime: d.flightTime ?? `${d.avgFlightHours}h`,
  bestMonths: d.bestMonths,
  summerTemp: d.summerTemp ?? slimScoredBySlug.get(d.slug)?.summerTemp,
  category: d.category,
  foodCostPerDay: d.foodCostPerDay,
  hotelCostPerNight: d.hotelCostPerNight,
  airlines: d.airlines?.map((a) => a.name) ?? d.topAirlines,
  scores: slimScoredBySlug.get(d.slug)?.scores,
}));

const SLIM: Comparable[] = ALL_DESTINATIONS.filter((d) => d.scores && !richSlugs.has(d.slug)).map(
  (d) => ({
    slug: d.slug,
    name: d.name,
    country: d.country,
    image: d.image,
    priceSek: comparablePriceSek(d.slug),
    summerTemp: d.summerTemp,
    scores: d.scores,
  }),
);

export const COMPARABLE: Comparable[] = [...RICH, ...SLIM];
export const COMPARABLE_BY_SLUG = new Map(COMPARABLE.map((c) => [c.slug, c]));

/** Max destinations side by side in the interactive tool. */
export const MAX_COMPARE = 4;

export function getComparable(slug: string): Comparable | undefined {
  return COMPARABLE_BY_SLUG.get(slug);
}

// ── Info rows ───────────────────────────────────────────────────────────────

export type Row = {
  key: string;
  label: string;
  value: (d: Comparable) => string;
  /** Which direction wins, when the row is comparable at all. */
  best?: "min" | "max";
  raw?: (d: Comparable) => number;
};

export const ROWS: Row[] = [
  {
    key: "price",
    label: "Flights from",
    // priceSek is SEK; usdStr does the conversion. (The old CompareClient stored
    // an already-converted USD value and multiplied it back by 10.5 so usdStr
    // could divide it out again — that broke silently if the rate ever changed.)
    value: (d) => (d.priceSek ? usdStr(d.priceSek) : "—"),
    best: "min",
    raw: (d) => d.priceSek || Infinity,
  },
  { key: "flight", label: "Flight time", value: (d) => d.flightTime ?? "—" },
  { key: "best", label: "Best months", value: (d) => d.bestMonths ?? "—" },
  {
    key: "summer",
    label: "Summer temp",
    value: (d) => (d.summerTemp ? `${d.summerTemp}°C` : "—"),
    best: "max",
    raw: (d) => d.summerTemp ?? -Infinity,
  },
  { key: "category", label: "Trip type", value: (d) => d.category ?? "—" },
  { key: "food", label: "Food & drink / day", value: (d) => d.foodCostPerDay ?? "—" },
  { key: "hotel", label: "Hotel / night", value: (d) => d.hotelCostPerNight ?? "—" },
];

/**
 * Slug of the winning destination for a row, or null when the row isn't
 * rankable or every value ties (highlighting all of them says nothing).
 */
export function bestSlug(row: Row, dests: Comparable[]): string | null {
  if (!row.best || !row.raw || dests.length < 2) return null;
  const raw = row.raw;
  const sorted = [...dests].sort((a, b) => (row.best === "min" ? raw(a) - raw(b) : raw(b) - raw(a)));
  const winner = sorted[0];
  if (dests.every((d) => raw(d) === raw(winner))) return null;
  return winner.slug;
}

// ── Travel styles ───────────────────────────────────────────────────────────
// These double as the AI recommendation's preference input and as the score
// rows in the table, so the model is reasoning over the same six numbers the
// visitor can see. Keys must match the `Scores` fields exactly.

export type TravelStyle = { key: keyof Scores; label: string };

export const TRAVEL_STYLES: TravelStyle[] = [
  { key: "beaches", label: "Beaches" },
  { key: "nightlife", label: "Nightlife" },
  { key: "food", label: "Food" },
  { key: "activities", label: "Activities" },
  { key: "family", label: "Family-friendly" },
  { key: "value", label: "Value for money" },
];

export const STYLE_KEYS = new Set<string>(TRAVEL_STYLES.map((s) => s.key));

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const MONTH_SLUGS = MONTHS.map((m) => m.toLowerCase());
