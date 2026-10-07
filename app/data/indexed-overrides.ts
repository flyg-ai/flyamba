// Lite-catalog slugs to KEEP indexable even though app/[slug]/page.tsx noindexes
// the rest of the catalog by default (Oct 2026 — GSC showed 929 of ~970 known
// URLs as "Discovered – currently not indexed", so the Lite pages are noindexed
// to stop diluting crawl budget across 526 near-identical pages).
//
// Fill this from the GSC Page Indexing report → "Indexed" tab → export. Any
// slug listed here keeps its page indexable; everything else in the Lite
// catalog gets `robots: { index: false }`. Hubs and the 8 rich destinations
// are never affected by this file — they render through different routes.
// From the GSC Page Indexing export, Oct 2026. Only these 5 of the 526 Lite
// slugs showed up as already crawled/indexed; everything else in that export
// was a hub, a rich destination, or a static/guide page — none of which this
// file touches.
export const ALREADY_INDEXED_SLUGS = new Set<string>([
  "nice",
  "detroit",
  "bahamas",
  "barbados",
  "nairobi",
]);
