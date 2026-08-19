#!/usr/bin/env node
/**
 * Re-encode images that are the right *dimensions* but the wrong *quality*.
 *
 * Adapted from flyg.ai's scripts/reencode-heavy-thumbs.mjs. Two differences:
 * it covers public/images/destinations AND public/images/content, and it looks
 * at every image rather than just -thumb files, because here the heavy ones are
 * the full-size heroes.
 *
 * WHY THIS EXISTS
 * Lighthouse on /barcelona: the hero is 588.6 KiB for 1920x1279 — 0.245
 * bytes/px, against 0.05–0.10 for a well-encoded AVIF. 421.9 KiB of the flagged
 * saving is compression alone, not dimensions. So the fix is a better encode,
 * not a smaller image.
 *
 * Bytes-per-pixel is the tell. Anything above THRESHOLD is an encoding outlier
 * rather than a genuinely detailed image.
 *
 * This script MODIFIES ORIGINALS IN PLACE. It only writes when the result is
 * actually smaller, so it is safe to re-run, and it never resizes — changing
 * dimensions would break card layouts and is handled separately.
 *
 *   node scripts/reencode-heavy-images.mjs --dry-run
 *   node scripts/reencode-heavy-images.mjs
 *   node scripts/reencode-heavy-images.mjs --quality 55 --threshold 0.12
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const ROOT = process.cwd();
const DIRS = ["public/images/destinations", "public/images/content"];

/** Above this many bytes per pixel an image is an encoding outlier. Well-encoded
 *  AVIF sits at 0.05–0.10; 0.12 catches the tail without touching good files. */
const DEFAULT_THRESHOLD = 0.12;

/** AVIF q55 keeps heroes clean under the dark gradient overlay while roughly
 *  halving the byte count on the outliers. */
const DEFAULT_QUALITY = 55;

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const num = (flag, dflt) => {
  const i = args.indexOf(flag);
  if (i === -1) return dflt;
  const v = Number(args[i + 1]);
  return Number.isFinite(v) ? v : dflt;
};
const QUALITY = num("--quality", DEFAULT_QUALITY);
const THRESHOLD = num("--threshold", DEFAULT_THRESHOLD);

const kb = (b) => `${(b / 1024).toFixed(0)} kB`;
const mb = (b) => `${(b / 1024 / 1024).toFixed(1)} MB`;
const median = (xs) => {
  const s = [...xs].sort((a, b) => a - b);
  return s.length ? s[s.length >> 1] : 0;
};

async function main() {
  const all = [];
  for (const dir of DIRS) {
    const abs = path.join(ROOT, dir);
    if (!fs.existsSync(abs)) continue;
    for (const f of fs.readdirSync(abs, { withFileTypes: true })) {
      if (!f.isFile() || !/\.(avif|webp|jpe?g|png)$/i.test(f.name)) continue;
      const p = path.join(abs, f.name);
      const size = fs.statSync(p).size;
      let meta;
      try {
        meta = await sharp(p).metadata();
      } catch {
        continue;
      }
      const px = (meta.width ?? 1) * (meta.height ?? 1);
      all.push({ rel: `${dir.split("/").pop()}/${f.name}`, p, size, bpp: size / px, w: meta.width, h: meta.height });
    }
  }

  const heavy = all.filter((x) => x.bpp > THRESHOLD).sort((a, b) => b.bpp - a.bpp);
  const totalBytes = all.reduce((s, x) => s + x.size, 0);

  console.log(`${all.length} images across ${DIRS.length} folders, ${mb(totalBytes)} total`);
  console.log(`median ${median(all.map((x) => x.bpp)).toFixed(3)} bytes/px   `
    + `p90 ${[...all.map((x) => x.bpp)].sort((a, b) => a - b)[Math.floor(all.length * 0.9)].toFixed(3)}   `
    + `max ${Math.max(...all.map((x) => x.bpp)).toFixed(3)}`);
  console.log(`${heavy.length} above ${THRESHOLD} bytes/px  (${mb(heavy.reduce((s, x) => s + x.size, 0))})`);
  console.log(`quality: ${QUALITY}${DRY_RUN ? "   (dry run — nothing written)" : ""}\n`);
  console.log("  file".padEnd(46) + "dim".padEnd(12) + "bytes/px".padEnd(10) + "before".padEnd(9) + "after".padEnd(9) + "saved");

  let before = 0, after = 0, rewritten = 0, kept = 0, shown = 0;

  for (const h of heavy) {
    // No resize — dimensions stay as they are.
    const buf = await sharp(h.p).avif({ quality: QUALITY, effort: 4 }).toBuffer();
    before += h.size;

    if (buf.length >= h.size) {
      after += h.size;
      kept++;
      continue;
    }

    if (!DRY_RUN) fs.writeFileSync(h.p, buf);
    after += buf.length;
    rewritten++;

    if (shown < 15) {
      shown++;
      const pct = Math.round((1 - buf.length / h.size) * 100);
      console.log(
        "  " + h.rel.padEnd(44) + `${h.w}x${h.h}`.padEnd(12) + h.bpp.toFixed(3).padEnd(10) +
          kb(h.size).padEnd(9) + kb(buf.length).padEnd(9) + `${pct}%`,
      );
    }
  }

  if (rewritten > shown) console.log(`  … and ${rewritten - shown} more`);

  console.log("\n" + "─".repeat(70));
  console.log(`rewritten ${rewritten}   left alone ${kept} (re-encode was not smaller)`);
  console.log(`before  ${mb(before)}`);
  console.log(`after   ${mb(after)}`);
  console.log(`saved   ${mb(before - after)}  (${Math.round((1 - after / before) * 100)}%)`);
  console.log(`folder total would go ${mb(totalBytes)} -> ${mb(totalBytes - (before - after))}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
