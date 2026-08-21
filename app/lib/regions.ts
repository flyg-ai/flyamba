/**
 * Regions: the merge, the order, and the countries with a page of their own.
 *
 * DELIBERATELY DEPENDENCY-FREE. WarmBrowser is a client component and imports
 * this; anything pulled in here goes into the browser bundle with it. The crumb
 * builder needs ALL_DESTINATIONS to count destinations per country, so it lives
 * in destination-crumbs.ts rather than here — importing the catalog from this
 * file would ship all 554 rows to every visitor of the warm guide.
 *
 * REGION_MERGE was in WarmBrowser.tsx. It is here so the region filter and the
 * breadcrumbs cannot disagree about which continent a destination belongs to.
 * There is no second copy.
 */

/** Region filters come straight from `continent`, which is origin-independent —
 *  unlike flyg.ai's flight-hour and nonstop filters, which are relative to Stockholm. */
export const REGION_ORDER = ["Europe", "North America", "South America", "Asia", "Africa", "Oceania"];

/** Continents with too few rows to deserve a chip of their own fold into a neighbour. */
export const REGION_MERGE: Record<string, string> = { "Middle East": "Asia", Eurasia: "Europe" };

export const regionOfContinent = (continent: string): string => REGION_MERGE[continent] ?? continent;

/**
 * The countries that have a page of their own, chosen on measured US search
 * volume: Mexico 41,800/mo, Spain 29,850, Greece 16,600, Canada 3,100,
 * India 2,100, Italy 2,000.
 *
 * COSTA RICA AND THE DOMINICAN REPUBLIC ARE DELIBERATELY ABSENT despite ranking
 * fourth and fifth on volume. Each holds exactly one catalog destination — Costa
 * Rica itself and Punta Cana — so a country page would be the thin page the
 * one-destination rule exists to prevent. `/costa-rica` is also already a
 * destination URL, and a static `app/costa-rica/` folder would shadow it: Next
 * matches a literal segment before a dynamic one. Their volume is meant to be
 * carried by the destination pages themselves.
 */
export const COUNTRY_PAGES: Record<string, string> = {
  Mexico: "mexico",
  Spain: "spain",
  Greece: "greece",
  Canada: "canada",
  India: "india",
  Italy: "italy",
};

export const countryHref = (country: string): string | undefined => {
  const slug = COUNTRY_PAGES[country];
  return slug ? `/${slug}` : undefined;
};
