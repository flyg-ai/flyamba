#!/usr/bin/env node
/**
 * Fetch monthly climate normals from Open-Meteo and write them to `climate_data`.
 *
 * WHY THIS EXISTS
 * 197 of the 550 catalog destinations carry `data_source: "gpt_seed"` — rows an
 * LLM produced rather than a weather service measured — and they are not merely
 * approximate. Four Caribbean entries hold identical constants (28.0 °C air,
 * 26 °C sea, no rainfall, 240 hours of sun), and seven landlocked cities including
 * Munich and Kathmandu carry a sea temperature of 0. So this script has two jobs:
 * adding destinations the catalog is missing, and eventually replacing those 197.
 *
 * It writes `data_source: "open_meteo"`, which is what the copy on
 * /where-is-it-warm is allowed to quote. Do not loosen that.
 *
 * TEN-YEAR AVERAGE, NOT ONE. A single year of daily observations gives a monthly
 * figure that moves several degrees between years and reads as false precision.
 * Existing open_meteo rows carry long decimals (25.754838709677426) because they
 * average many days; this matches that.
 *
 *   node scripts/fetch-climate.mjs --dry-run
 *   node scripts/fetch-climate.mjs --only puerto-rico,bahamas
 *   node scripts/fetch-climate.mjs
 */

import fs from "node:fs";
import process from "node:process";
import { createClient } from "@supabase/supabase-js";

// --- env ------------------------------------------------------------------
for (const line of fs.readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) process.env[m[1]] ??= m[2].replace(/^["']|["']$/g, "");
}

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const ONLY = args.includes("--only") ? args[args.indexOf("--only") + 1].split(",") : null;

const START = "2015-01-01";
const END = "2024-12-31";

/**
 * Destinations to fetch, with the coordinates the reading is taken at.
 *
 * Coordinates are the point a traveller actually goes to, not the territory's
 * centroid: San Juan rather than the middle of Puerto Rico, because a rainfall
 * figure taken over a mountain range describes nowhere anyone books.
 */
const TARGETS = [
  { slug: "puerto-rico", label: "San Juan, Puerto Rico", lat: 18.4655, lon: -66.1057 },
  { slug: "bahamas", label: "Nassau, Bahamas", lat: 25.048, lon: -77.3554 },
  { slug: "cayman-islands", label: "George Town, Cayman Islands", lat: 19.2869, lon: -81.3674 },
  { slug: "us-virgin-islands", label: "Charlotte Amalie, U.S. Virgin Islands", lat: 18.3419, lon: -64.9307 },
];

const get = async (url) => {
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch(url);
    if (res.ok) return res.json();
    if (attempt === 3) throw new Error(`${res.status} for ${url}`);
    await new Promise((r) => setTimeout(r, 1500 * attempt));
  }
};

/** Group daily values into twelve monthly buckets. */
function monthly(dates, values, reduce) {
  const buckets = Array.from({ length: 12 }, () => []);
  for (let i = 0; i < dates.length; i++) {
    const v = values?.[i];
    if (typeof v === "number") buckets[Number(dates[i].slice(5, 7)) - 1].push(v);
  }
  return buckets.map((b) => (b.length ? reduce(b, dates) : null));
}

const mean = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;
/** Rainfall is a monthly TOTAL, so the ten-year mean is the sum divided by ten. */
const perMonthTotal = (xs) => xs.reduce((a, b) => a + b, 0) / 10;

async function fetchOne(t) {
  const archive = await get(
    `https://archive-api.open-meteo.com/v1/archive?latitude=${t.lat}&longitude=${t.lon}` +
      `&start_date=${START}&end_date=${END}` +
      `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunshine_duration&timezone=auto`,
  );
  const d = archive.daily;
  const tempMax = monthly(d.time, d.temperature_2m_max, mean);
  const tempMin = monthly(d.time, d.temperature_2m_min, mean);
  const precip = monthly(d.time, d.precipitation_sum, perMonthTotal);
  const sunshine = monthly(d.time, d.sunshine_duration, (xs) => perMonthTotal(xs) / 3600);

  // Marine is a separate API and does not cover every coordinate — a null sea
  // temperature is a real answer for an inland point, and climate.ts already
  // treats a missing value as "no sea" rather than as freezing.
  let sea = Array(12).fill(null);
  try {
    const marine = await get(
      `https://marine-api.open-meteo.com/v1/marine?latitude=${t.lat}&longitude=${t.lon}` +
        `&start_date=${START}&end_date=${END}&daily=sea_surface_temperature_max&timezone=auto`,
    );
    sea = monthly(marine.daily.time, marine.daily.sea_surface_temperature_max, mean);
  } catch (e) {
    console.warn(`  ${t.slug}: ingen havstemperatur (${e.message})`);
  }

  return Array.from({ length: 12 }, (_, i) => ({
    destination_slug: t.slug,
    month: i + 1,
    temp_max: tempMax[i],
    temp_min: tempMin[i],
    precipitation: precip[i],
    sunshine_hours: sunshine[i],
    sea_temp: sea[i],
    data_source: "open_meteo",
  }));
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("saknar NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  const sb = createClient(url, key, { auth: { persistSession: false } });

  const targets = ONLY ? TARGETS.filter((t) => ONLY.includes(t.slug)) : TARGETS;
  console.log(`${targets.length} destinationer, ${START}–${END}${DRY_RUN ? "   (dry run)" : ""}\n`);

  const f = (c) => Math.round(c * 1.8 + 32);
  for (const t of targets) {
    const rows = await fetchOne(t);
    const jan = rows[0], jul = rows[6];
    console.log(
      `  ${t.slug.padEnd(18)} jan ${f(jan.temp_max)}°F hav ${jan.sea_temp ? f(jan.sea_temp) + "°F" : "—"} ` +
        `${Math.round(jan.precipitation)}mm  |  jul ${f(jul.temp_max)}°F hav ${jul.sea_temp ? f(jul.sea_temp) + "°F" : "—"} ` +
        `${Math.round(jul.precipitation)}mm`,
    );
    if (DRY_RUN) continue;

    // Delete then insert rather than upsert: the table has no unique constraint on
    // (destination_slug, month), so an upsert would silently duplicate.
    const { error: delErr } = await sb.from("climate_data").delete().eq("destination_slug", t.slug);
    if (delErr) throw new Error(`delete ${t.slug}: ${delErr.message}`);
    const { error } = await sb.from("climate_data").insert(rows);
    if (error) throw new Error(`insert ${t.slug}: ${error.message}`);
    console.log(`    skrev 12 rader`);
  }
  console.log(DRY_RUN ? "\ninget skrivet" : "\nklart");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
