#!/usr/bin/env node
/**
 * Fails the build if rendered HTML carries the build machine's locale.
 *
 * WHY THIS EXISTS. `toLocaleString()` with no locale argument follows whatever
 * the machine running the build is set to. This one is Swedish, so a price came
 * out as "$1 277" — a space where an American reader expects a comma — on 75
 * pages. It was found by accident on Phuket while reading rendered output for
 * something else, and it would not have shown up in a Swedish developer's
 * terminal, in code review, or in tsc.
 *
 * SO THE CHECK IS ON OUTPUT, NOT SOURCE. A grep for `toLocaleString()` catches
 * the calls we already know about; this catches the formatting that actually
 * reached the page, including from a dependency or a call written later.
 *
 *   node scripts/verify-locale.mjs          exit 1 on any hit
 *   node scripts/verify-locale.mjs --list   report without failing
 *
 * Run it after `npm run build`; it reads .next, not the source.
 */

import { readFileSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";

const ROOT = ".next/server/app";

const CHECKS = [
  {
    name: "svenskt månadsnamn",
    // Only forms that cannot be English. "mars" and "juli" are excluded on
    // purpose: they collide with English words and with proper nouns on the
    // site, and a check that cries wolf gets switched off.
    re: /\b(januari|februari|augusti|oktober|maj|jan\.|feb\.|apr\.|aug\.|sep\.|okt\.|nov\.|dec\.)\b/,
  },
  {
    name: "mellanslag som tusentalsseparator i pris",
    // "$1 277" or "$1 277". A comma is what en-US produces.
    re: /\$\d{1,3}[  ]\d{3}\b/,
  },
  {
    name: "decimalkomma i pris",
    // "$1.277,50" — the European ordering, which would mean the whole number
    // was formatted under the wrong locale rather than just the separator.
    re: /\$\d{1,3}\.\d{3},\d{2}\b/,
  },
];

function walk(dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith(".html")) acc.push(p.split(path.sep).join("/"));
  }
  return acc;
}

if (!existsSync(ROOT)) {
  console.error(`verify-locale: ${ROOT} finns inte — kör npm run build först.`);
  process.exit(1);
}

const files = walk(ROOT);
const hits = [];
for (const file of files) {
  const html = readFileSync(file, "utf8");
  for (const check of CHECKS) {
    const m = html.match(check.re);
    if (m) hits.push({ page: file.replace(`${ROOT}/`, "").replace(".html", ""), check: check.name, sample: m[0] });
  }
}

console.log(`kontrollerade ${files.length} byggda sidor`);
console.log(`  träffar: ${hits.length}`);

const byCheck = {};
for (const h of hits) (byCheck[h.check] ??= []).push(h);
for (const [name, list] of Object.entries(byCheck)) {
  console.log(`\n  ${name}: ${list.length} sidor`);
  for (const h of list.slice(0, 15)) console.log(`      ${h.page}  →  ${JSON.stringify(h.sample)}`);
  if (list.length > 15) console.log(`      … och ${list.length - 15} till`);
}

if (process.argv.includes("--list")) process.exit(0);

if (hits.length) {
  console.error(`\nverify-locale: ${hits.length} sida/sidor formaterade på byggmaskinens locale.`);
  console.error('Ge varje toLocaleString / Intl-anrop ett explicit "en-US".');
  process.exit(1);
}
console.log("\nverify-locale: inga spår av byggmaskinens locale.");
