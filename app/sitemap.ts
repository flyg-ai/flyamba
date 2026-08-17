import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { ALL_DESTINATIONS } from "@/app/data/all-destinations";
import { destinations } from "@/app/data/destinations";
import { guides } from "@/app/data/guides";
import { SITE } from "@/app/lib/destination-helpers";

// Replaces the hand-maintained public/sitemap.xml. Generated at build time from
// the same data the pages render from, so a new destination in the catalog shows
// up in the sitemap on the next deploy without anyone editing XML.

// Routes under app/ that exist but aren't destination hubs.
const NOT_A_HUB = new Set(["api", "components", "data", "lib", "about", "compare", "explore"]);

// Guide routes are emitted from the guides catalog below, not by scanning.
const GUIDE_PATHS = new Set(guides.map((g) => g.path));

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

  // Named `route` rather than `path` so it doesn't shadow node:path above.
  for (const route of ["/compare", "/about", "/explore"]) {
    entries.push({
      url: `${SITE}${route}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
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

  // Long-form guides live under their destination hub (/barcelona/budget-guide).
  for (const guide of guides) {
    entries.push({
      url: `${SITE}/${guide.destination}/${guide.path}`,
      lastModified: new Date(guide.publishedAt),
      changeFrequency: "monthly",
      priority: 0.7,
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
