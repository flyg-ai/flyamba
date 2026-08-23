#!/usr/bin/env node
/**
 * Mounts <FareCalendarSection> on the 28 hub landing pages.
 *
 * They render their own page.tsx rather than a shared shell, so there is no one
 * place to add it. CityGuideShell looked like the answer and is not: it wraps the
 * 318 city subpages, which would have put a fare chart under "Rome Attractions"
 * and none on /rome.
 *
 * ONE COMPONENT, 28 CALL SITES. The alternative — 28 copies of the tier logic —
 * is how two versions of one rule start drifting apart in the direction nobody
 * checks.
 *
 * IT FAILS RATHER THAN SKIPS. A file that does not match the anchor stops the run
 * with a non-zero exit and no partial write. hubfix.mjs skipped quietly and broke
 * ibiza and phuket; that only surfaced because the build fell over afterwards.
 *
 *   node scripts/add-fare-calendar.mjs --dry
 *   node scripts/add-fare-calendar.mjs
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";

const DRY = process.argv.includes("--dry");

const IMPORT = 'import { FareCalendarSection } from "@/app/components/FareCalendarSection";';
/** Present in all 28, and already sitting where the calendar belongs. */
const ANCHOR = "<AviasalesWidget";

const hubs = (() => {
  const src = readFileSync("app/lib/hubs.ts", "utf8");
  const start = src.indexOf("HUB_CITY_SLUGS");
  return [...src.slice(start).matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]);
})();

const names = (() => {
  const src = readFileSync("app/data/all-destinations.ts", "utf8").replace(/\r\n/g, "\n");
  const out = new Map();
  for (const m of src.matchAll(/slug: "([^"]+)", name: "([^"]+)"/g)) out.set(m[1], m[2]);
  return out;
})();

const planned = [];
const problems = [];

for (const slug of hubs) {
  const file = `app/${slug}/page.tsx`;
  if (!existsSync(file)) { problems.push(`${file} — filen finns inte`); continue; }

  const raw = readFileSync(file, "utf8");
  const src = raw.replace(/\r\n/g, "\n");

  if (src.includes("<FareCalendarSection")) { problems.push(`${file} — redan monterad`); continue; }

  const at = src.indexOf(ANCHOR);
  if (at === -1) { problems.push(`${file} — hittade inte ${ANCHOR}`); continue; }

  // The anchor is a JSX element; step past its closing tag, self-closing or not.
  const selfClose = src.indexOf("/>", at);
  const openClose = src.indexOf("</AviasalesWidget>", at);
  const end =
    openClose !== -1 && (selfClose === -1 || openClose < selfClose)
      ? openClose + "</AviasalesWidget>".length
      : selfClose !== -1
        ? selfClose + 2
        : -1;
  if (end === -1) { problems.push(`${file} — kunde inte hitta slutet på ${ANCHOR}`); continue; }

  const name = names.get(slug);
  if (!name) { problems.push(`${file} — ${slug} saknas i katalogen, inget namn att skicka`); continue; }

  planned.push({ file, raw, src, end, slug, name });
}

if (problems.length) {
  console.error(`add-fare-calendar: ${problems.length} av ${hubs.length} filer matchar inte mönstret.\n`);
  for (const p of problems) console.error(`  ✗ ${p}`);
  console.error("\nInget skrivet. Fixa mönstret eller filen — en tyst överhoppning är hur ibiza och phuket gick sönder.");
  process.exit(1);
}

console.log(`${planned.length} av ${hubs.length} hubbar matchar mönstret`);

for (const job of planned) {
  const eol = job.raw.includes("\r\n") ? "\r\n" : "\n";
  let out = job.src;

  const block =
    `\n\n        {/* Observed fares by month. Renders nothing below three months —\n` +
    `            see app/components/FareCalendarSection.tsx. */}\n` +
    `        <FareCalendarSection slug=${JSON.stringify(job.slug)} name=${JSON.stringify(job.name)} />`;
  out = out.slice(0, job.end) + block + out.slice(job.end);

  if (!out.includes(IMPORT)) {
    const last = out.lastIndexOf("\nimport ");
    const nl = out.indexOf("\n", last + 1);
    out = out.slice(0, nl + 1) + IMPORT + "\n" + out.slice(nl + 1);
  }

  if (!DRY) writeFileSync(job.file, eol === "\r\n" ? out.replace(/\n/g, "\r\n") : out);
  console.log(`  ${DRY ? "skulle montera" : "monterad"}  ${job.file}`);
}

if (DRY) console.log("\nTORRKÖRNING — inget skrivet");
