import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { ALL_DESTINATIONS } from "@/app/data/all-destinations";
import { destinations } from "@/app/data/destinations";
import { guides, guideHref } from "@/app/data/guides";
import { CALENDAR_DESTINATIONS, CALENDAR_AIRLINES, lowFareHref } from "@/app/lib/low-fare";
import { SITE } from "@/app/lib/destination-helpers";
import { TOP_PAIRS, pairHref } from "@/app/compare/pairs";
import { MONTHS as WARM_MONTHS, warmHref } from "@/app/where-is-it-warm/months";
import { DEPARTURES, departureHref } from "@/app/lib/departures";

// Replaces the hand-maintained public/sitemap.xml. Generated at build time from
// the same data the pages render from, so a new destination in the catalog shows
// up in the sitemap on the next deploy without anyone editing XML.

// Standalone pages, emitted explicitly rather than discovered by the hub scan.
// Adding a page here is what keeps readHubs() from mistaking it for a city.
const STATIC_ROUTES = [
  { path: "/about", priority: 0.4 },
  { path: "/compare", priority: 0.4 },
  { path: "/explore", priority: 0.4 },
  { path: "/contact", priority: 0.3 },
  { path: "/privacy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
  { path: "/cookies", priority: 0.2 },
  { path: "/low-fare-calendar", priority: 0.7 },
  { path: "/guides", priority: 0.6 },
  { path: "/where-is-it-warm", priority: 0.7 },
  // The departure hub. Listed here for the reason at the top of this block:
  // app/cheap-flights/ is a folder with a page.tsx, so readHubs() would otherwise
  // emit it as a destination called "cheap-flights" and scan it for city subpages.
  // 0.7 matches /where-is-it-warm and /low-fare-calendar, which sit at the same
  // level — a hub one click from the homepage that fans out to its own set.
  { path: "/cheap-flights", priority: 0.7 },
];

// app/ directories that aren't routes at all, plus the airline folders — those
// hold only a /low-fare-calendar child, so they must not be read as city hubs.
const NON_ROUTE_DIRS = new Set([
  "api",
  "components",
  "data",
  "lib",
  ...CALENDAR_AIRLINES.map((a) => a.slug),
  // Each departure page is its own folder — app/cheap-flights-from-atlanta —
  // because Next only treats a bracketed segment as dynamic when it is the whole
  // folder name. That makes fourteen top-level folders with a page.tsx, which
  // readHubs() would otherwise emit as fourteen cities called
  // "cheap-flights-from-atlanta". They are added to the sitemap below instead.
  ...DEPARTURES.map((d) => `cheap-flights-from-${d.slug}`),
]);

// Anything already covered above must not also be emitted as a destination hub.
const NOT_A_HUB = new Set([...NON_ROUTE_DIRS, ...STATIC_ROUTES.map((r) => r.path.slice(1))]);

// Legacy /barcelona/<path> guide URLs, kept out of the hub scan. The routes
// themselves are gone (next.config.ts redirects them to /guides/<slug>); this
// guards against one being reintroduced by accident.
const GUIDE_PATHS = new Set(guides.map((g) => g.path).filter((p): p is string => !!p));

// Walks app/ for the static destination hubs and the subpages each one actually
// ships. This replaces a hand-maintained array that had to be edited in lockstep
// with the filesystem — a city folder added without touching it was silently
// left out of the sitemap.
//
// Runs at build time: sitemap.ts is a server-only route handler, and every hub
// is statically generated, so there's no per-request cost.
function readHubs(): { slug: string; subpages: string[] }[] {
  const appDir = path.join(process.cwd(), "app");
  const isPage = (...segments: string[]) =>
    fs.existsSync(path.join(appDir, ...segments, "page.tsx"));

  return fs
    .readdirSync(appDir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    // Dynamic segments ([slug], [category]) and route groups aren't hubs.
    .filter((e) => !e.name.startsWith("[") && !e.name.startsWith("(") && !e.name.startsWith("_"))
    .filter((e) => !NOT_A_HUB.has(e.name))
    .filter((e) => isPage(e.name))
    .map((e) => ({
      slug: e.name,
      subpages: fs
        .readdirSync(path.join(appDir, e.name), { withFileTypes: true })
        .filter((s) => s.isDirectory() && !s.name.startsWith("[") && !s.name.startsWith("("))
        .filter((s) => isPage(e.name, s.name))
        .filter((s) => !GUIDE_PATHS.has(s.name))
        .map((s) => s.name)
        .sort(),
    }))
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Build time — every page's fares are re-seeded on deploy.
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  entries.push({
    url: SITE,
    lastModified,
    changeFrequency: "daily",
    priority: 1.0,
  });

  for (const route of STATIC_ROUTES) {
    entries.push({
      url: `${SITE}${route.path}`,
      lastModified,
      changeFrequency: "monthly",
      priority: route.priority,
    });
  }

  const hubs = readHubs();
  const hubSlugs = new Set(hubs.map((h) => h.slug));

  for (const hub of hubs) {
    entries.push({
      url: `${SITE}/${hub.slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    });

    for (const sub of hub.subpages) {
      entries.push({
        url: `${SITE}/${hub.slug}/${sub}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  // Low fare calendars: one per destination, one per airline.
  for (const d of CALENDAR_DESTINATIONS) {
    entries.push({
      url: `${SITE}${lowFareHref(d.slug)}`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.8,
    });
  }
  for (const a of CALENDAR_AIRLINES) {
    entries.push({
      url: `${SITE}/${a.slug}/low-fare-calendar`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.7,
    });
  }

  // Departure pages: one per city, each a real folder — see NON_ROUTE_DIRS above
  // for why they must be excluded from the hub scan.
  for (const d of DEPARTURES) {
    entries.push({
      url: `${SITE}${departureHref(d.slug)}`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.7,
    });
  }

  // Where is it warm: one page per month. The hub itself is in STATIC_ROUTES
  // above, which is also what stops readHubs() reading the folder as a city.
  for (const m of WARM_MONTHS) {
    entries.push({
      url: `${SITE}${warmHref(m.slug)}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Pre-rendered head-to-head comparisons: /compare/<a>-vs-<b>. Imported from
  // app/compare/pairs.ts, which is dependency-free precisely so this file can
  // read the list without pulling in the catalog or the Anthropic SDK.
  for (const pair of TOP_PAIRS) {
    entries.push({
      url: `${SITE}${pairHref(pair)}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // Guide articles all live under /guides/<slug>.
  for (const guide of guides) {
    entries.push({
      url: `${SITE}${guideHref(guide)}`,
      lastModified: new Date(guide.publishedAt),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // Every other destination renders through app/[slug] — the rich hand-authored
  // cities that have no hub of their own, plus the ported lite catalog.
  const liteSlugs = new Set<string>();
  for (const d of destinations) if (!hubSlugs.has(d.slug)) liteSlugs.add(d.slug);
  for (const d of ALL_DESTINATIONS) if (!hubSlugs.has(d.slug)) liteSlugs.add(d.slug);

  for (const slug of liteSlugs) {
    entries.push({
      url: `${SITE}/${slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  // Safety net: a catalog slug colliding with a hub or static route would
  // otherwise emit the same <loc> twice.
  return [...new Map(entries.map((e) => [e.url, e])).values()];
}
