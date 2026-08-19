/**
 * The destinations that have a built-out hub page — a landing page plus eleven or
 * twelve subpages covering attractions, restaurants, hotels, transport, weather and
 * the rest. Every other slug in the catalog renders the lite template, which is a
 * hero, a price chart and not much else.
 *
 * Kept as a plain list rather than derived, because the consumers are server
 * components that must not read the filesystem on a revalidation. `app/sitemap.ts`
 * discovers the same set by scanning `app/`, deliberately: there the scan is what
 * stops a newly added city from being silently left out of the sitemap.
 *
 * Adding a city here without building its subpages first sends visitors to a thin
 * page — which is exactly what this list exists to prevent.
 */
export const HUB_CITY_SLUGS = [
  "amsterdam",
  "athens",
  "bali",
  "bangkok",
  "barcelona",
  "cancun",
  "cape-town",
  "dubai",
  "dubrovnik",
  "florence",
  "ibiza",
  "lisbon",
  "london",
  "madrid",
  "marrakech",
  "mykonos",
  "new-york",
  "palma",
  "paris",
  "phuket",
  "prague",
  "reykjavik",
  "rome",
  "santorini",
  "singapore",
  "tenerife",
  "tokyo",
  "vienna",
] as const;

export const HUB_CITY_SET: ReadonlySet<string> = new Set(HUB_CITY_SLUGS);
