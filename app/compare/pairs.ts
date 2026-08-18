// Single source of truth for the pre-rendered /compare/<a>-vs-<b> pages.
//
// Kept in its own zero-dependency module — no imports at all — so both the
// dynamic route (app/compare/[comparison]/page.tsx) and app/sitemap.ts can use
// it without pulling the page's heavy graph (Anthropic SDK, Supabase, the
// 181 KB catalog) into the sitemap bundle. Same reason flyg.ai keeps
// app/jamfor/pairs.ts dependency-free.
//
// CANONICAL FORM: the two slugs are always in alphabetical order, joined by
// "-vs-". One pair, one URL — /compare/rome-vs-athens redirects to
// /compare/athens-vs-rome rather than serving duplicate content.
//
// Every segment must be a comparable slug, i.e. present in COMPARABLE in
// app/compare/comparable.ts — that is the 8 rich destinations plus the 21 slim
// catalog entries carrying `scores`, 26 cities once deduped. A pair naming a
// city outside that set (madrid, mykonos — neither has scores) still renders
// on demand via dynamicParams, but with an empty ratings block, so keep it out
// of this list.

export const SEPARATOR = "-vs-";

export const TOP_PAIRS: readonly string[] = [
  // ── Europe: the classic city-break decisions ─────────────────────────
  "barcelona-vs-rome",
  "barcelona-vs-paris",
  "barcelona-vs-lisbon",
  "paris-vs-rome",
  "london-vs-paris",
  "amsterdam-vs-paris",
  "amsterdam-vs-london",
  "florence-vs-rome",
  "athens-vs-rome",
  "prague-vs-vienna",
  // ── Europe: sun, islands and coast ───────────────────────────────────
  "athens-vs-santorini",
  "dubrovnik-vs-santorini",
  "ibiza-vs-palma",
  "palma-vs-tenerife",
  // ── Long-haul ────────────────────────────────────────────────────────
  "bali-vs-phuket",
  "bangkok-vs-phuket",
  "bangkok-vs-singapore",
  "dubai-vs-singapore",
  "bangkok-vs-tokyo",
  "london-vs-new-york",
];

/** Canonical pair slug for two destination slugs, order-independent. */
export function pairSlug(a: string, b: string): string {
  return [a, b].sort().join(SEPARATOR);
}

/** `/compare/athens-vs-rome` */
export function pairHref(pair: string): string {
  return `/compare/${pair}`;
}

/**
 * Split a URL segment into its two destination slugs.
 *
 * Returns null for anything that isn't exactly two non-empty segments — note
 * that slugs may themselves contain hyphens ("new-york", "cape-town"), so this
 * splits on the full "-vs-" separator, not on "-".
 *
 * Does NOT validate that the slugs exist; the page does that against the
 * catalog and 404s when they don't.
 */
export function parsePair(segment: string): [string, string] | null {
  const parts = segment.split(SEPARATOR);
  if (parts.length !== 2) return null;
  const [a, b] = parts.map((p) => p.trim().toLowerCase());
  if (!a || !b || a === b) return null;
  return [a, b];
}

/** True when the segment is already in canonical (alphabetical) order. */
export function isCanonicalPair(segment: string): boolean {
  const parsed = parsePair(segment);
  return parsed !== null && pairSlug(parsed[0], parsed[1]) === segment;
}
