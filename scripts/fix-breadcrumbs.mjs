#!/usr/bin/env node
/**
 * Makes <Breadcrumbs> the only source of BreadcrumbList schema.
 *
 * WHY A SCRIPT. 367 files carried a hand-built BreadcrumbList. Editing them by
 * hand is 367 chances to make a different mistake, and the thing that proves the
 * job is done is not how many files were opened — it is that every built page
 * ends up with exactly one BreadcrumbList. Run this, then count.
 *
 * TWO GROUPS, HANDLED DIFFERENTLY:
 *
 *   330 files already render a visible trail, directly or through CityGuideShell
 *   or GuideShell, so the hand-built copy is a duplicate. It is deleted.
 *
 *   28 hub city pages had schema and NO breadcrumb on the page at all. Deleting
 *   theirs would take them from one to zero, so they get a <Breadcrumbs> in the
 *   hero first. They all share the same hero container, which is what makes this
 *   safe to do mechanically.
 *
 * The nine remaining orphans — about, contact, guides, the legal shell, the
 * airline calendar, DestinationDetail — are each a different shape and are edited
 * by hand rather than pattern-matched.
 *
 *   node scripts/fix-breadcrumbs.mjs --dry    report what would change
 *   node scripts/fix-breadcrumbs.mjs          apply
 */

import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

const DRY = process.argv.includes("--dry");

/** Hero container shared by all 28 hand-written hub city pages. */
const HERO =
  '<div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 lg:px-8">';

/** Edited by hand — each is a different page shape, not a pattern. */
// Nothing is excluded any more. The nine one-off pages were converted to
// <Breadcrumbs> by hand first; this now only strips what is left behind.
const BY_HAND = new Set([]);

/**
 * Removes one BreadcrumbList object literal, wherever it sits.
 *
 * Brace-counting from the opening `{` rather than a regex: the literals are
 * nested inside arrays and objects at eight different indent levels, and several
 * contain template strings with braces of their own. A regex that looked right on
 * the first twenty files would have silently mangled the twenty-first.
 *
 * THE LITERAL APPEARS IN TWO SHAPES and the first version of this only handled
 * one. As an array element it can just be cut out. As `const breadcrumb = {…};`
 * cutting the object leaves `const breadcrumb =;` behind — 41 files were broken
 * that way before this was caught, so the declaration and every reference to the
 * name have to go with it. Returns the binding name when there was one.
 */
function stripBreadcrumbList(src) {
  const marker = '"@type": "BreadcrumbList"';
  const at = src.indexOf(marker);
  if (at === -1) return null;

  // Walk back to the `{` that opens this object.
  const open = src.lastIndexOf("{", at);
  if (open === -1) return null;
  let depth = 0;
  let end = -1;
  for (let i = open; i < src.length; i++) {
    const ch = src[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) { end = i; break; }
    }
  }
  if (end === -1) return null;

  let before = open;
  let after = end + 1;
  let binding = null;

  // `const NAME = { … };` — take the whole statement, semicolon included.
  const head = src.slice(Math.max(0, open - 120), open);
  const decl = head.match(/(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*(?::[^=]+)?=\s*$/);
  if (decl) {
    binding = decl[1];
    before = open - (head.length - decl.index);
    while (after < src.length && /\s/.test(src[after])) after++;
    if (src[after] === ";") after++;
  } else {
    // An array or object element: swallow a trailing comma instead.
    while (after < src.length && /\s/.test(src[after])) after++;
    if (src[after] !== ",") after = end + 1;
    else after++;
  }

  // And the indentation on the line it started on.
  while (before > 0 && (src[before - 1] === " " || src[before - 1] === "\t")) before--;
  if (before > 0 && src[before - 1] === "\n") before--;

  return { out: src.slice(0, before) + src.slice(after), binding };
}

/**
 * Drops `breadcrumb` from `return [breadcrumb, tourist, faq]` once it is gone.
 *
 * Only inside an array literal, which is the one place these bindings are used.
 * A blanket identifier replace would reach into comments and prose.
 */
function dropReference(src, name) {
  let out = src
    .replace(new RegExp(`\\[\\s*${name}\\s*,\\s*`, "g"), "[")
    .replace(new RegExp(`,\\s*${name}\\s*\\]`, "g"), "]")
    .replace(new RegExp(`\\[\\s*${name}\\s*\\]`, "g"), "[]");

  // The binding is also rendered directly by a <script type="application/ld+json">
  // element on the one-off pages — about, the legal shell, the Barcelona guide
  // subpages. Removing the object without the tag that prints it leaves a dangling
  // identifier, which tsc catches but only after the whole sweep has run.
  for (;;) {
    const use = out.indexOf(`JSON.stringify(${name})`);
    if (use === -1) break;
    const open = out.lastIndexOf("<script", use);
    if (open === -1) break;
    const close = out.indexOf("/>", use);
    if (close === -1) break;
    let before = open;
    while (before > 0 && (out[before - 1] === " " || out[before - 1] === "\t")) before--;
    if (before > 0 && out[before - 1] === "\n") before--;
    out = out.slice(0, before) + out.slice(close + 2);
  }
  return out;
}

/** Removes a `<script type="application/ld+json">` that prints `expr`. */
function dropScriptTag(src, expr) {
  let out = src;
  for (;;) {
    const use = out.indexOf(`JSON.stringify(${expr})`);
    if (use === -1) return out;
    const open = out.lastIndexOf("<script", use);
    const close = out.indexOf("/>", use);
    if (open === -1 || close === -1) return out;
    let before = open;
    while (before > 0 && (out[before - 1] === " " || out[before - 1] === "\t")) before--;
    if (before > 0 && out[before - 1] === "\n") before--;
    out = out.slice(0, before) + out.slice(close + 2);
  }
}

/**
 * Cleans up a builder whose whole body was the BreadcrumbList.
 *
 * 133 subpages wrap their schema in `function jsonLd() { return {…}; }`. Removing
 * the object leaves `return;`, the function then yields undefined, and
 * `JSON.stringify(undefined).replace(…)` throws — during prerender, not during
 * tsc, which is why the first two passes looked clean and the build did not.
 */
function dropEmptyBuilders(src) {
  let out = src;
  for (;;) {
    const m = out.match(/\n(?:export\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(\)\s*\{\s*return;\s*\}\n/);
    if (!m) return out;
    out = out.slice(0, m.index) + "\n" + out.slice(m.index + m[0].length);
    out = dropScriptTag(out, `${m[1]}()`);
  }
}

/** Deletes every BreadcrumbList in a file, however many there are. */
function stripAll(src) {
  let out = src;
  let n = 0;
  for (;;) {
    const step = stripBreadcrumbList(out);
    if (step === null) break;
    out = step.binding ? dropReference(step.out, step.binding) : step.out;
    n++;
    if (n > 10) throw new Error("fler än 10 BreadcrumbList i en fil — avbryter");
  }
  return { out: dropEmptyBuilders(out), n };
}

/** Adds the import if it is not already there, after the last existing import. */
function ensureImports(src, imports) {
  let out = src;
  for (const line of imports) {
    if (out.includes(line)) continue;
    const lastImport = out.lastIndexOf("\nimport ");
    const eol = out.indexOf("\n", lastImport + 1);
    out = out.slice(0, eol + 1) + line + "\n" + out.slice(eol + 1);
  }
  return out;
}

const files = execSync('grep -rl "BreadcrumbList" --include=*.tsx app/', { encoding: "utf8" })
  .trim().split("\n")
  .map((f) => f.replace(/\\/g, "/"))
  .filter((f) => !f.endsWith("components/Breadcrumbs.tsx"))
  .filter((f) => !BY_HAND.has(f));

let stripped = 0, added = 0, skipped = 0, removedTotal = 0;
const notes = [];

for (const file of files) {
  const before = readFileSync(file, "utf8");
  const eol = before.includes("\r\n") ? "\r\n" : "\n";
  const src = before.replace(/\r\n/g, "\n");

  const hasVisible = src.includes("<Breadcrumbs") ||
    src.includes("<CityGuideShell") || src.includes("<GuideShell");

  let next = src;
  let note = "";

  if (!hasVisible) {
    // A hub city page: give it a visible trail before taking the schema away.
    const m = file.match(/^app\/([^/]+)\/page\.tsx$/);
    if (!m || !src.includes(HERO)) {
      skipped++;
      notes.push(`  HOPPAD  ${file} — ingen synlig trail och ingen känd hjälte`);
      continue;
    }
    const slug = m[1];
    next = ensureImports(next, [
      'import { Breadcrumbs } from "@/app/components/Breadcrumbs";',
      'import { crumbsForSlug } from "@/app/lib/destination-crumbs";',
    ]);
    next = next.replace(
      HERO,
      `${HERO}\n          {/* Trail added with the schema: this page emitted a BreadcrumbList\n              while showing no breadcrumb at all. */}\n          <div className="mb-4">\n            <Breadcrumbs onDark items={crumbsForSlug("${slug}")} />\n          </div>`,
    );
    added++;
    note = `trail tillagd (${slug})`;
  }

  const { out, n } = stripAll(next);
  next = out;
  removedTotal += n;
  if (n > 0) stripped++;

  if (next !== src) {
    if (!DRY) writeFileSync(file, eol === "\r\n" ? next.replace(/\n/g, "\r\n") : next);
    if (note) notes.push(`  ${note.padEnd(28)} ${file}`);
  }
}

console.log(DRY ? "TORRKÖRNING — inget skrivet" : "skrivet");
console.log(`  filer behandlade:            ${files.length}`);
console.log(`  BreadcrumbList borttagna:    ${removedTotal}`);
console.log(`  filer som fick synlig trail: ${added}`);
console.log(`  hoppade:                     ${skipped}`);
if (notes.length) console.log("\n" + notes.join("\n"));
console.log(`\nHandredigerade, ej rörda här: ${BY_HAND.size} filer`);
