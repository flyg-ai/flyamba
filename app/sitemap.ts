import type { MetadataRoute } from "next";
import { ALL_DESTINATIONS } from "@/app/data/all-destinations";
import { destinations } from "@/app/data/destinations";
import { guides } from "@/app/data/guides";
import { SITE } from "@/app/lib/destination-helpers";

// Replaces the hand-maintained public/sitemap.xml. Generated at build time from
// the same data the pages render from, so a new destination in the catalog shows
// up in the sitemap on the next deploy without anyone editing XML.

// Subpages that a full destination hub ships. Order only affects the XML.
const HUB_SUBPAGES = [
  "attractions",
  "restaurants",
  "hotels",
  "transport",
  "weather",
  "prices",
  "nightlife",
  "beaches",
  "shopping",
  "with-kids",
  "day-trips",
  "events",
];

// The full hubs: cities with their own static app/<slug>/ route tree and sub-nav.
// `omit` lists the subpages a city has no route for — landlocked cities have no
// /beaches page, and New York has no /events page yet. Keep in sync with app/.
const HUBS: { slug: string; omit?: string[] }[] = [
  { slug: "amsterdam", omit: ["beaches"] },
  { slug: "athens" },
  { slug: "bali" },
  { slug: "bangkok" },
  { slug: "barcelona" },
  { slug: "cancun" },
  { slug: "cape-town" },
  { slug: "dubai" },
  { slug: "dubrovnik" },
  { slug: "florence", omit: ["beaches"] },
  { slug: "ibiza" },
  { slug: "lisbon" },
  { slug: "london", omit: ["beaches"] },
  { slug: "madrid", omit: ["beaches"] },
  { slug: "marrakech" },
  { slug: "mykonos" },
  { slug: "new-york", omit: ["events"] },
  { slug: "palma" },
  { slug: "paris", omit: ["beaches"] },
  { slug: "phuket" },
  { slug: "prague", omit: ["beaches"] },
  { slug: "reykjavik" },
  { slug: "rome" },
  { slug: "santorini" },
  { slug: "singapore" },
  { slug: "tenerife" },
  { slug: "tokyo" },
  { slug: "vienna", omit: ["beaches"] },
];

const HUB_SLUGS = new Set(HUBS.map((h) => h.slug));

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

  for (const path of ["/compare", "/about", "/explore"]) {
    entries.push({
      url: `${SITE}${path}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    });
  }

  for (const hub of HUBS) {
    entries.push({
      url: `${SITE}/${hub.slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    });

    for (const sub of HUB_SUBPAGES) {
      if (hub.omit?.includes(sub)) continue;
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
  for (const d of destinations) if (!HUB_SLUGS.has(d.slug)) liteSlugs.add(d.slug);
  for (const d of ALL_DESTINATIONS) if (!HUB_SLUGS.has(d.slug)) liteSlugs.add(d.slug);

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
