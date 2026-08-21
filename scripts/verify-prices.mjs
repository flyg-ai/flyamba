#!/usr/bin/env node
/**
 * Fails the build if rendering code reads a catalog price.
 *
 * TWO FIELDS, NOT ONE. `monthlyPrices` in all-destinations.ts holds Stockholm
 * SEK estimates — 81% round hundreds, median error 2.35x against observed fares,
 * and it INVERTS the ranking rather than merely scaling it. `price` in
 * destinations.ts is a hand-authored "from" figure on a different scale again; it
 * was what ranked the homepage's "cheapest flights" row. Both are wrong for a US
 * reader, in currency and in departure city.
 *
 * The fields stay in the data files — the AI search still needs a rough magnitude
 * and the compare tool once did. What must not happen is a page rendering one.
 * app/lib/fare-display.ts is the only sanctioned source, and no price at all is a
 * valid answer: 173 destinations have no observed fare, and 14 CFR 399.84 requires
 * an advertised price to be purchasable.
 *
 *   node scripts/verify-prices.mjs          exit 1 on any violation
 *   node scripts/verify-prices.mjs --list   report without failing
 *
 * WHY A GATE. Without one the field creeps back the next time someone needs a
 * number quickly, and nothing reports it: a wrong price renders exactly like a
 * right one.
 */

import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";

/** Files allowed to mention the fields: the data itself, and non-rendering readers. */
const ALLOWED = new Set([
  "app/data/all-destinations.ts",
  "app/data/destinations.ts",
  // Feeds the model a rough magnitude; never rendered as a price. The type it
  // returns says so in its own comment.
  "app/api/ai-search/route.ts",
  "app/lib/ai-search-types.ts",
  // Writes the daily_prices table; does not render.
  "app/api/cron/prices/route.ts",
  // Documents the fallback it no longer performs.
  "app/lib/daily-prices.ts",
  // The gate itself.
  "scripts/verify-prices.mjs",
]);

/**
 * Still to convert. Each entry is a page that renders a catalog price today.
 *
 * NOT A PERMANENT EXEMPTION. Every line here is a page showing a Stockholm figure
 * to an American reader. Delete the entry as you convert the page; the stale check
 * below fails the build if an entry is listed but no longer violating, so the list
 * cannot quietly outlive the work.
 */
const PENDING = new Set([
  "app/amsterdam/page.tsx",
  "app/athens/page.tsx",
  "app/bali/page.tsx",
  "app/bali/prices/page.tsx",
  "app/bangkok/page.tsx",
  "app/barcelona/page.tsx",
  "app/cancun/page.tsx",
  "app/cape-town/page.tsx",
  "app/components/DestinationDetail.tsx",
  "app/data/amsterdam-places.ts",
  "app/data/bali-places.ts",
  "app/data/cape-town-places.ts",
  "app/data/dubai-places.ts",
  "app/data/dubrovnik-places.ts",
  "app/data/madrid-places.ts",
  "app/data/mykonos-places.ts",
  "app/data/new-york-places.ts",
  "app/data/reykjavik-places.ts",
  "app/dubai/page.tsx",
  "app/dubrovnik/page.tsx",
  "app/florence/page.tsx",
  "app/ibiza/page.tsx",
  "app/lib/destination-helpers.ts",
  "app/lisbon/page.tsx",
  "app/london/page.tsx",
  "app/madrid/page.tsx",
  "app/madrid/prices/page.tsx",
  "app/marrakech/page.tsx",
  "app/mykonos/page.tsx",
  "app/new-york/page.tsx",
  "app/paris/page.tsx",
  "app/phuket/page.tsx",
  "app/prague/page.tsx",
  "app/reykjavik/page.tsx",
  "app/reykjavik/prices/page.tsx",
  "app/rome/page.tsx",
  "app/singapore/page.tsx",
  "app/tenerife/page.tsx",
  "app/tokyo/page.tsx",
  "app/vienna/page.tsx",
]);

const PATTERNS = [
  { re: /\bmonthlyPrices\b/, what: "monthlyPrices" },
  { re: /\bmonthlyPricesSek\b|\bmonthlyPricesSEK\b/, what: "monthlyPrices (local copy)" },
  { re: /\bLOWEST_SEK\b|\bMONTHLY_SEK\b/, what: "hardcoded SEK constant" },
  { re: /\bd\.price\b|\bdest\.price\b|\bCITY\.price\b/, what: "destinations.price" },
];

const files = execSync('git ls-files "app/**/*.ts" "app/**/*.tsx" "scripts/**/*.mjs"', { encoding: "utf8" })
  .trim().split("\n").map((f) => f.replace(/\\/g, "/")).filter(Boolean);

const violations = [];
const pendingHits = new Set();

for (const file of files) {
  if (ALLOWED.has(file)) continue;
  const lines = readFileSync(file, "utf8").replace(/\r\n/g, "\n").split("\n");
  lines.forEach((line, i) => {
    // A mention in a comment is a note about the rule, not a use of the field.
    const code = line.replace(/\/\/.*$/, "").replace(/\/\*[\s\S]*?\*\//g, "");
    if (/^\s*\*/.test(line)) return;
    for (const p of PATTERNS) {
      if (!p.re.test(code)) continue;
      if (PENDING.has(file)) { pendingHits.add(file); return; }
      violations.push({ file, line: i + 1, what: p.what, text: line.trim().slice(0, 100) });
      return;
    }
  });
}

const stale = [...PENDING].filter((f) => !pendingHits.has(f));

console.log(`kontrollerade ${files.length} filer`);
console.log(`  brott:      ${violations.length}`);
console.log(`  väntande:   ${pendingHits.size} av ${PENDING.size} listade`);
for (const v of violations) {
  console.log(`\n  ✗ ${v.file}:${v.line}  läser ${v.what}`);
  console.log(`      ${v.text}`);
}
if (stale.length) {
  console.log(`\n  ${stale.length} poster i PENDING läser inget längre:`);
  for (const f of stale) console.log(`      ${f}`);
  console.log("  Ta bort dem ur listan — annars döljer de en framtida regression.");
}

if (process.argv.includes("--list")) process.exit(0);

if (violations.length) {
  console.error(`\nverify-prices: ${violations.length} ställe(n) renderar ett katalogpris.`);
  console.error("Använd app/lib/fare-display.ts. Inget pris är ett giltigt svar.");
  process.exit(1);
}
if (stale.length) {
  console.error("\nverify-prices: PENDING är inaktuell.");
  process.exit(1);
}
console.log("\nverify-prices: inga katalogpriser i renderande kod.");
