#!/usr/bin/env node
/**
 * Generates app/favicon.ico from the brand mark.
 *
 * WHY A SCRIPT AND NOT A ONE-OFF EXPORT. The colour and the plane path live in
 * app/lib/brand.ts and are shared with app/icon.tsx, app/apple-icon.tsx and the
 * Navbar. A hand-exported .ico would be the one copy of the mark that does not
 * move when the brand does, and nothing would report the drift — the icon would
 * simply stay the old orange. Re-run this after touching brand.ts.
 *
 * WHY next/og RATHER THAN AN IMAGE LIBRARY. The repo has neither sharp nor
 * ImageMagick, but it already ships the renderer app/icon.tsx uses. Going through
 * the same path means the .ico and the PNG route cannot disagree about how the
 * mark rasterises.
 *
 *   node scripts/gen-favicon.mjs             write app/favicon.ico
 *   node scripts/gen-favicon.mjs --preview   also write a comparison sheet
 *
 * .ico entries here are PNG-compressed, which every browser and Windows Vista and
 * later read. The older BMP-in-ICO form is not worth the size for a favicon.
 */

import { writeFileSync } from "node:fs";
import { ImageResponse } from "next/og.js";
import React from "react";
import { ACCENT, ACCENT_FOREGROUND, PLANE_PATH } from "../app/lib/brand.ts";

/** 16 is the tab, 32 is the bookmark bar, 48 is Google's floor for search results. */
const SIZES = [16, 32, 48];

/**
 * The plane's share of the frame, taken from app/icon.tsx: 20px inside 32px. Kept
 * as a ratio so every size gets the same margin instead of a fixed inset that
 * swallows the mark at 16 and floats in it at 48.
 */
const PLANE_RATIO = 20 / 32;

/**
 * The mark, as the element tree app/icon.tsx renders.
 *
 * `filled` squares off the corners. The circle is right for the PNG route, where
 * the icon is composited onto whatever the browser chrome is; see the note in
 * generate() for why the .ico wants the other one.
 */
function mark(size, { filled = false } = {}) {
  const plane = Math.round(size * PLANE_RATIO);
  return React.createElement(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: ACCENT,
        borderRadius: filled ? 0 : "50%",
      },
    },
    React.createElement(
      "svg",
      {
        width: plane,
        height: plane,
        viewBox: "0 0 24 24",
        fill: ACCENT_FOREGROUND,
        stroke: ACCENT_FOREGROUND,
        strokeWidth: 0.5,
        strokeLinejoin: "round",
        style: { transform: "rotate(-45deg)" },
      },
      React.createElement("path", { d: PLANE_PATH }),
    ),
  );
}

async function renderPng(size, opts) {
  const res = new ImageResponse(mark(size, opts), { width: size, height: size });
  return Buffer.from(await res.arrayBuffer());
}

/**
 * Packs PNGs into an .ico.
 *
 * ICONDIR is 6 bytes, then one 16-byte ICONDIRENTRY per image, then the payloads.
 * A width or height byte of 0 means 256; nothing here is that large, but the rule
 * is why the fields are one byte wide.
 */
function packIco(images) {
  const HEADER = 6;
  const ENTRY = 16;
  const dir = Buffer.alloc(HEADER + ENTRY * images.length);
  dir.writeUInt16LE(0, 0); // reserved
  dir.writeUInt16LE(1, 2); // 1 = icon, 2 = cursor
  dir.writeUInt16LE(images.length, 4);

  let offset = dir.length;
  images.forEach(({ size, png }, i) => {
    const at = HEADER + ENTRY * i;
    dir.writeUInt8(size >= 256 ? 0 : size, at);
    dir.writeUInt8(size >= 256 ? 0 : size, at + 1);
    dir.writeUInt8(0, at + 2); // palette size, 0 for truecolour
    dir.writeUInt8(0, at + 3); // reserved
    dir.writeUInt16LE(1, at + 4); // colour planes
    dir.writeUInt16LE(32, at + 6); // bits per pixel
    dir.writeUInt32LE(png.length, at + 8);
    dir.writeUInt32LE(offset, at + 12);
    offset += png.length;
  });

  return Buffer.concat([dir, ...images.map((i) => i.png)]);
}

/** A sheet showing both corner treatments at 1x on light and dark chrome. */
async function preview(path) {
  const variants = [
    { label: "circle", filled: false },
    { label: "square", filled: true },
  ];
  const shots = {};
  for (const v of variants) {
    shots[v.label] = {};
    for (const size of SIZES) {
      shots[v.label][size] = `data:image/png;base64,${(await renderPng(size, v)).toString("base64")}`;
    }
  }
  const row = (bg, fg) =>
    React.createElement(
      "div",
      { style: { display: "flex", background: bg, padding: 24, gap: 48, alignItems: "center" } },
      ...variants.map((v) =>
        React.createElement(
          "div",
          { style: { display: "flex", flexDirection: "column", gap: 10, alignItems: "center" } },
          React.createElement(
            "div",
            { style: { display: "flex", gap: 20, alignItems: "center" } },
            ...SIZES.map((s) =>
              React.createElement("img", { src: shots[v.label][s], width: s, height: s }),
            ),
          ),
          React.createElement("div", { style: { color: fg, fontSize: 13 } }, v.label),
        ),
      ),
    );
  const res = new ImageResponse(
    React.createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", width: "100%", height: "100%" } },
      row("#FFFFFF", "#333333"),
      row("#202124", "#DDDDDD"),
      row("#F1F3F4", "#333333"),
    ),
    { width: 520, height: 300 },
  );
  writeFileSync(path, Buffer.from(await res.arrayBuffer()));
  console.log(`skrev jämförelseark: ${path}`);
}

async function generate() {
  // FILLED CORNERS IN THE .ICO, TRANSPARENT IN THE PNG ROUTE.
  //
  // Checked rather than assumed: both variants were rendered at 16 and 32 and
  // magnified 14x over white and over #202124 chrome. Both are legible at 16px and
  // the circle is unmistakably a circle — but its rim spends about 1.5px on
  // antialiasing all the way round, which on dark chrome muddies into the
  // background, while the square holds a hard edge at every size. Squaring off also
  // buys roughly 27% more coloured area in the same box, which is worth having in a
  // crowded tab strip where 16px is what actually gets drawn.
  //
  // The margin is thin. The .ico is the tab-and-bookmark format, so it takes the
  // crisper option; /icon keeps the circle, which is the mark as designed and is the
  // one that renders at 48px in search results where the shape is legible.
  const images = [];
  for (const size of SIZES) {
    images.push({ size, png: await renderPng(size, { filled: true }) });
  }
  const ico = packIco(images);
  writeFileSync("app/favicon.ico", ico);
  console.log(`skrev app/favicon.ico — ${ico.length} bytes`);
  for (const { size, png } of images) console.log(`  ${size}x${size}  ${png.length} bytes`);
}

const previewPath = process.argv.includes("--preview")
  ? process.argv[process.argv.indexOf("--preview") + 1] ?? "favicon-preview.png"
  : null;
if (previewPath) await preview(previewPath);
await generate();
