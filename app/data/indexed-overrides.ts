// Lite-catalog slugs to KEEP indexable even though app/[slug]/page.tsx noindexes
// the rest of the catalog by default (Oct 2026 — GSC showed 929 of ~970 known
// URLs as "Discovered – currently not indexed", so the Lite pages are noindexed
// to stop diluting crawl budget across 526 near-identical pages).
//
// Any slug listed here: (1) keeps its page indexable, (2) is included in
// sitemap.ts instead of being left out with the rest of the Lite catalog, and
// (3) should have a app/data/lite-editorial.ts entry — this file is the
// re-indexing allowlist, and a promoted page without real content would be
// exactly the "coming soon on a page Google chose to index" problem this
// whole mechanism exists to avoid. Hubs and the 8 rich destinations are never
// affected by this file — they render through different routes.
//
// Two ways a slug ends up here:
//   - GSC Page Indexing export → "Indexed" tab showed it already crawled/
//     indexed on its own (nice, detroit, bahamas, barbados, nairobi — Oct 2026).
//   - Deliberately promoted: given real editorial content and added here to
//     request indexing, highest-US-search-volume destinations first (see the
//     priority table in AGENTS.md). Gradual rollout, a few at a time — each
//     batch needs its editorial entry and a verified build before going out.
export const ALREADY_INDEXED_SLUGS = new Set<string>([
  "nice",
  "detroit",
  "bahamas",
  "barbados",
  "nairobi",
  // Promoted, batch 1 of 3 (Oct 2026) — highest US search volume first.
  "aruba",
  "jamaica",
]);
