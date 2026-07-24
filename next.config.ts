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
];

const nextConfig: NextConfig = {
  // All imagery is self-hosted under /public/images — no remote patterns needed.
  async redirects() {
    return SLUG_REDIRECTS.map(({ from, to }) => ({
      source: `/${from}`,
      destination: `/${to}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
