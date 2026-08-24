#!/usr/bin/env node
/**
 * Mounts <NonstopRoutes> on the hub pages, after the fare calendar.
 *
 * Same contract as add-fare-calendar.mjs: one shared component, one call site
 * per page, and the script FAILS if a file does not match the anchor — nothing
 * is written on a partial match. It also reads every file back after writing
 * and fails if the mount is not there (see the rule in CLAUDE.md).
 *
 * Mounted on all 28, not only the 24 with evidence today: the component renders
 * nothing without evidence, so the four empty ones (bangkok, dubai, phuket,
 * singapore) cost nothing and self-activate when the cron's evidence pass finds
 * their first non-stop.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";

const DRY = process.argv.includes("--dry");
const IMPORT = 'import { NonstopRoutes } from "@/app/components/NonstopRoutes";';

const hubs = (() => {
  const src = readFileSync("app/lib/hubs.ts", "utf8");
  const start = src.indexOf("HUB_CITY_SLUGS");
  return [...src.slice(start).matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]);
})();

const catalog = (() => {
  const src = readFileSync("app/data/all-destinations.ts", "utf8").replace(/\r\n/g, "\n");
  const out = new Map();
  for (const m of src.matchAll(/slug: "([^"]+)", name: "([^"]+)", country: "[^"]*", continent: "[^"]*", iata: "([^"]*)"/g))
    out.set(m[1], { name: m[2], iata: m[3] });
  return out;
})();

const planned = [];
const problems = [];

for (const slug of hubs) {
  const file = `app/${slug}/page.tsx`;
  if (!existsSync(file)) { problems.push(`${file} — finns inte`); continue; }
  const raw = readFileSync(file, "utf8");
  const src = raw.replace(/\r\n/g, "\n");

  if (src.includes("<NonstopRoutes")) continue; // cancun, dubrovnik — redan monterade

  const anchor = src.match(/^( *)<FareCalendarSection slug=.*\/>$/m);
  if (!anchor) { problems.push(`${file} — hittade inte FareCalendarSection-ankaret`); continue; }

  const d = catalog.get(slug);
  if (!d?.iata) { problems.push(`${file} — ${slug} saknar iata i katalogen`); continue; }

  planned.push({ file, raw, src, anchor: anchor[0], indent: anchor[1], slug, d });
}

if (problems.length) {
  console.error(`add-nonstop-routes: ${problems.length} filer matchar inte mönstret.\n`);
  for (const p of problems) console.error(`  ✗ ${p}`);
  console.error("\nInget skrivet.");
  process.exit(1);
}

console.log(`${planned.length} hubbar att montera (resten har redan komponenten)`);

let failed = false;
for (const job of planned) {
  const eol = job.raw.includes("\r\n") ? "\r\n" : "\n";
  const block =
    `${job.anchor}\n\n` +
    `${job.indent}{/* Observed non-stop fares. Renders nothing without evidence —\n` +
    `${job.indent}    absence is "not observed", never "no non-stop exists". */}\n` +
    `${job.indent}<NonstopRoutes slug=${JSON.stringify(job.slug)} name=${JSON.stringify(job.d.name)} iata=${JSON.stringify(job.d.iata)} />`;
  let out = job.src.replace(job.anchor, block);
  if (!out.includes(IMPORT)) {
    const last = out.lastIndexOf("\nimport ");
    const nl = out.indexOf("\n", last + 1);
    out = out.slice(0, nl + 1) + IMPORT + "\n" + out.slice(nl + 1);
  }
  if (!DRY) {
    writeFileSync(job.file, eol === "\r\n" ? out.replace(/\n/g, "\r\n") : out);
    const back = readFileSync(job.file, "utf8").replace(/\r\n/g, "\n");
    if (!back.includes(`<NonstopRoutes slug=${JSON.stringify(job.slug)}`) || !back.includes(IMPORT)) {
      console.error(`  ✗ ${job.file} — skrivningen verifierade INTE i återläsning`);
      failed = true;
      continue;
    }
  }
  console.log(`  ${DRY ? "skulle montera" : "monterad + verifierad"}  ${job.file}`);
}

if (failed) process.exit(1);
if (DRY) console.log("\nTORRKÖRNING — inget skrivet");
