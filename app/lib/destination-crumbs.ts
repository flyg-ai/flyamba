import { ALL_DESTINATIONS } from "@/app/data/all-destinations";
import type { Crumb } from "@/app/components/Breadcrumbs";
import { countryHref, regionOfContinent } from "@/app/lib/regions";

/**
 * The breadcrumb trail for a destination.
 *
 * SERVER SIDE ONLY — it reads the whole catalog to count destinations per
 * country. Keep it out of client components; regions.ts holds the parts that are
 * safe to import there.
 */

/** How many catalog destinations each country holds. Decides the country crumb. */
const COUNT_BY_COUNTRY: Map<string, number> = (() => {
  const counts = new Map<string, number>();
  for (const d of ALL_DESTINATIONS) counts.set(d.country, (counts.get(d.country) ?? 0) + 1);
  return counts;
})();

export const destinationsIn = (country: string): number => COUNT_BY_COUNTRY.get(country) ?? 0;

/**
 * Flyamba › Europe › Spain › Barcelona.
 *
 * THE COUNTRY LEVEL IS DROPPED for the 71 countries holding a single destination.
 * "Flyamba › Europe › Iceland › Reykjavík" would insert a level that leads
 * nowhere and groups nothing — the country and the city are the same set.
 * Countries with two or more destinations keep the level even without a page of
 * their own, because the grouping is real either way; the crumb simply renders as
 * text. What that means for the emitted schema is handled in Breadcrumbs, which
 * drops URL-less middle entries — see the note there.
 */
export function destinationCrumbs(d: { name: string; country: string; continent: string }): Crumb[] {
  const crumbs: Crumb[] = [{ name: "Flyamba", href: "/" }, { name: regionOfContinent(d.continent) }];
  if (destinationsIn(d.country) > 1) {
    crumbs.push({ name: d.country, href: countryHref(d.country) });
  }
  crumbs.push({ name: d.name });
  return crumbs;
}

const BY_SLUG = new Map(ALL_DESTINATIONS.map((d) => [d.slug, d]));

/**
 * The trail for a destination identified by slug.
 *
 * For the 28 hand-written hub pages, which hold their city name and country as
 * local constants in twenty-eight different shapes — `d.country`, `CITY.country`,
 * a bare `COUNTRY`, a literal flag emoji. Going through the catalog means one
 * lookup instead of twenty-eight bespoke call sites, and the trail cannot drift
 * from the one the lite pages render for the same city.
 *
 * Returns just the root if the slug is not in the catalog, which renders as a
 * single crumb rather than throwing at build time.
 */
export function crumbsForSlug(slug: string): Crumb[] {
  const d = BY_SLUG.get(slug);
  if (!d) return [{ name: "Flyamba", href: "/" }];
  return destinationCrumbs(d);
}

/**
 * The same trail with a subpage appended: Flyamba › Europe › Spain › Barcelona ›
 * Attractions.
 *
 * Five levels reads long, and it is still the right call: a subpage that showed
 * `Flyamba › Barcelona › Attractions` would describe a different hierarchy from
 * the page directly above it. Only the levels with a URL reach the schema, so
 * what Google receives is three, not five.
 *
 * `fallbackName` covers a city that is not in the catalog — the trail then starts
 * at the city rather than throwing during the build.
 */
export function subpageCrumbsForSlug(slug: string, label: string, fallbackName?: string): Crumb[] {
  const d = BY_SLUG.get(slug);
  if (!d) {
    return [
      { name: "Flyamba", href: "/" },
      { name: fallbackName ?? slug, href: `/${slug}` },
      { name: label },
    ];
  }
  const crumbs = destinationCrumbs(d);
  crumbs[crumbs.length - 1] = { name: d.name, href: `/${slug}` };
  crumbs.push({ name: label });
  return crumbs;
}
