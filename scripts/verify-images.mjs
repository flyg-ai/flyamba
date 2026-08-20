#!/usr/bin/env node
/**
 * Check that every image the built site references will actually reach production.
 *
 * WHY THIS EXISTS
 * `.gitignore` ignored `flights-*-thumb.avif` on the grounds that the thumbnails
 * were unused. That stopped being true when the warm guide was built, and 535
 * referenced thumbnails were left out of the repository. Nothing caught it: the
 * files sat on the developer's disk, so every local build succeeded and
 * `next build` reported no error. The images only broke once Vercel built from a
 * clean checkout, which is not a step anyone runs locally.
 *
 * A path is only safe if it is BOTH on disk AND either tracked or about to be
 * added. Checking the filesystem alone is what made the problem invisible.
 *
 * Run before committing images:
 *   npm run build && node scripts/verify-images.mjs
 *
 * Exits 1 on any missing path, so it can gate a commit or a CI step.
 */

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const BUILD = ".next/server/app";
const PUBLIC = "public";

if (!fs.existsSync(BUILD)) {
  console.error("Ingen build hittad — kör `npm run build` först.");
  process.exit(1);
}

const walk = (d, out = []) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
};

const referenced = new Set();
for (const f of walk(BUILD)) {
  const s = fs.readFileSync(f, "utf8");
  for (const m of s.matchAll(/\/images\/[a-z0-9-]+\/[A-Za-z0-9._-]+\.(?:avif|webp|jpe?g|png)/g)) {
    referenced.add(m[0]);
  }
}

const strip = (l) => "/" + l.trim().replace(/^public\//, "");
const tracked = new Set(
  execSync("git ls-files public/images", { encoding: "utf8" }).split("\n").filter(Boolean).map(strip),
);
// Untracked-but-not-ignored files count as safe: they are what `git add` will pick
// up. Ignored files do not appear here, which is exactly the case that broke.
const pending = new Set(
  execSync("git status --porcelain --untracked-files=all public/images", { encoding: "utf8" })
    .split("\n")
    .filter((l) => l.startsWith("??"))
    .map((l) => strip(l.slice(3))),
);

const onDisk = (u) => fs.existsSync(path.join(PUBLIC, u));
const inGit = (u) => tracked.has(u) || pending.has(u);

const missingDisk = [...referenced].filter((u) => !onDisk(u));
const ignored = [...referenced].filter((u) => onDisk(u) && !inGit(u));

console.log(`bildsökvägar i bygget:    ${referenced.size}`);
console.log(`  saknas på disk:         ${missingDisk.length}`);
console.log(`  på disk men EJ i git:   ${ignored.length}`);

const thumbs = [...referenced].filter((u) => u.includes("-thumb"));
console.log(`  varav thumbnails:       ${thumbs.length}  (i git: ${thumbs.filter(inGit).length})`);

const placeholders = [...referenced].filter((u) => u.includes("placeholder"));
if (placeholders.length) {
  console.log(`\n  ${placeholders.length} sökvägar pekar på placeholder — se scripts/missing-images.txt`);
}

if (missingDisk.length) {
  console.error(`\nSAKNAS PÅ DISK (${missingDisk.length}):`);
  for (const u of missingDisk.slice(0, 20)) console.error("  " + u);
  if (missingDisk.length > 20) console.error(`  … och ${missingDisk.length - 20} till`);
}
if (ignored.length) {
  console.error(`\nPÅ DISK MEN IGNORERADE AV GIT (${ignored.length}) — dessa blir 404 i produktion:`);
  for (const u of ignored.slice(0, 20)) console.error("  " + u);
  if (ignored.length > 20) console.error(`  … och ${ignored.length - 20} till`);
  console.error("\n  Kontrollera .gitignore. Lokala byggen döljer detta helt.");
}

if (missingDisk.length || ignored.length) process.exit(1);
console.log("\nAlla refererade bilder når produktion.");
