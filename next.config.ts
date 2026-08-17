import type { NextConfig } from "next";

// Swedish → English slug redirects. The catalog was ported with Swedish slugs;
// these keep old URLs (and any external links) working after the rename to
// English canonical slugs. `permanent: true` emits a 308 (Next's permanent
// redirect — cached like a 301). Only slugs that actually changed are listed.
const SLUG_REDIRECTS: { from: string; to: string }[] = [
  { from: "rom", to: "rome" },
  { from: "prag", to: "prague" },
  { from: "aten", to: "athens" },
  { from: "teneriffa", to: "tenerife" },
  { from: "lissabon", to: "lisbon" },
  { from: "kopenhamn", to: "copenhagen" },
  { from: "wien", to: "vienna" },
  { from: "munchen", to: "munich" },
  { from: "helsingfors", to: "helsinki" },
  { from: "bryssel", to: "brussels" },
  { from: "geneve", to: "geneva" },
  { from: "florens", to: "florence" },
  { from: "venedig", to: "venice" },
  { from: "neapel", to: "naples" },
  { from: "warszawa", to: "warsaw" },
  { from: "bukarest", to: "bucharest" },
  { from: "kapstaden", to: "cape-town" },
  { from: "kairo", to: "cairo" },
  { from: "goteborg", to: "gothenburg" },
  // These two were duplicate catalog entries for the same place under both a
  // Swedish and an English slug, so they shipped two pages with identical
  // titles. The Swedish entries are gone from the catalog; redirect their URLs.
  { from: "gent", to: "ghent" },
  { from: "kapverde", to: "cape-verde" },
];

// The first three guides were published as Barcelona subpages before /guides
// existed. They now live at /guides/<slug> like every other guide; these keep
// the original URLs working and stop the same article being served from two
// addresses, which would compete with itself in search.
const GUIDE_REDIRECTS: { from: string; to: string }[] = [
  { from: "/barcelona/best-time-to-visit", to: "/guides/best-time-to-visit-barcelona" },
  { from: "/barcelona/budget-guide", to: "/guides/barcelona-budget-guide" },
  { from: "/barcelona/vs-madrid", to: "/guides/barcelona-vs-madrid" },
];

const nextConfig: NextConfig = {
  // All imagery is self-hosted under /public/images — no remote patterns needed.
  async redirects() {
    return [
      ...SLUG_REDIRECTS.map(({ from, to }) => ({
        source: `/${from}`,
        destination: `/${to}`,
        permanent: true,
      })),
      ...GUIDE_REDIRECTS.map(({ from, to }) => ({
        source: from,
        destination: to,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
