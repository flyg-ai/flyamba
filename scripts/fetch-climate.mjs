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
  { slug: "anchorage", label: "Anchorage, Alaska", lat: 61.2181, lon: -149.9003 },
  { slug: "birmingham-alabama", label: "Birmingham, Alabama", lat: 33.5186, lon: -86.8104 },
  { slug: "little-rock", label: "Little Rock, Arkansas", lat: 34.7465, lon: -92.2896 },
  { slug: "hartford", label: "Hartford, Connecticut", lat: 41.7658, lon: -72.6734 },
  { slug: "wilmington-delaware", label: "Wilmington, Delaware", lat: 39.7391, lon: -75.5398 },
  { slug: "des-moines", label: "Des Moines, Iowa", lat: 41.5868, lon: -93.625 },
  { slug: "boise", label: "Boise, Idaho", lat: 43.615, lon: -116.2023 },
  { slug: "indianapolis", label: "Indianapolis, Indiana", lat: 39.7684, lon: -86.1581 },
  { slug: "wichita", label: "Wichita, Kansas", lat: 37.6872, lon: -97.3301 },
  { slug: "louisville", label: "Louisville, Kentucky", lat: 38.2527, lon: -85.7585 },
  { slug: "baltimore", label: "Baltimore, Maryland", lat: 39.2904, lon: -76.6122 },
  { slug: "portland-maine", label: "Portland, Maine", lat: 43.6591, lon: -70.2568 },
  { slug: "st-louis", label: "St. Louis, Missouri", lat: 38.627, lon: -90.1994 },
  { slug: "kansas-city", label: "Kansas City, Missouri", lat: 39.0997, lon: -94.5786 },
  { slug: "jackson-mississippi", label: "Jackson, Mississippi", lat: 32.2988, lon: -90.1848 },
  { slug: "bozeman", label: "Bozeman, Montana", lat: 45.677, lon: -111.0429 },
  { slug: "charlotte", label: "Charlotte, North Carolina", lat: 35.2271, lon: -80.8431 },
  { slug: "asheville", label: "Asheville, North Carolina", lat: 35.5951, lon: -82.5515 },
  { slug: "raleigh", label: "Raleigh, North Carolina", lat: 35.7796, lon: -78.6382 },
  { slug: "fargo", label: "Fargo, North Dakota", lat: 46.8772, lon: -96.7898 },
  { slug: "omaha", label: "Omaha, Nebraska", lat: 41.2565, lon: -95.9345 },
  { slug: "manchester-new-hampshire", label: "Manchester, New Hampshire", lat: 42.9956, lon: -71.4548 },
  { slug: "atlantic-city", label: "Atlantic City, New Jersey", lat: 39.3643, lon: -74.4229 },
  { slug: "columbus", label: "Columbus, Ohio", lat: 39.9612, lon: -82.9988 },
  { slug: "cleveland", label: "Cleveland, Ohio", lat: 41.4993, lon: -81.6944 },
  { slug: "oklahoma-city", label: "Oklahoma City, Oklahoma", lat: 35.4676, lon: -97.5164 },
  { slug: "philadelphia", label: "Philadelphia, Pennsylvania", lat: 39.9526, lon: -75.1652 },
  { slug: "pittsburgh", label: "Pittsburgh, Pennsylvania", lat: 40.4406, lon: -79.9959 },
  { slug: "providence", label: "Providence, Rhode Island", lat: 41.824, lon: -71.4128 },
  { slug: "rapid-city", label: "Rapid City, South Dakota", lat: 44.0805, lon: -103.231 },
  { slug: "salt-lake-city", label: "Salt Lake City, Utah", lat: 40.7608, lon: -111.891 },
  { slug: "virginia-beach", label: "Virginia Beach, Virginia", lat: 36.8529, lon: -75.978 },
  { slug: "burlington", label: "Burlington, Vermont", lat: 44.4759, lon: -73.2121 },
  { slug: "milwaukee", label: "Milwaukee, Wisconsin", lat: 43.0389, lon: -87.9065 },
  { slug: "charleston-west-virginia", label: "Charleston, West Virginia", lat: 38.3498, lon: -81.6326 },
  { slug: "jackson-hole", label: "Jackson, Wyoming", lat: 43.4799, lon: -110.7624 },
  { slug: "maui", label: "Kihei, Maui, Hawaii", lat: 20.6967, lon: -156.445 },
  { slug: "kauai", label: "Lihue, Kauai, Hawaii", lat: 21.9811, lon: -159.3711 },
  { slug: "kona", label: "Kailua-Kona, Hawaii", lat: 19.64, lon: -155.9969 },
  { slug: "austin", label: "Austin, Texas", lat: 30.2672, lon: -97.7431 },
  { slug: "houston", label: "Houston, Texas", lat: 29.7604, lon: -95.3698 },
  { slug: "san-antonio", label: "San Antonio, Texas", lat: 29.4252, lon: -98.4946 },
  { slug: "tampa", label: "Tampa, Florida", lat: 27.9506, lon: -82.4572 },
  { slug: "fort-lauderdale", label: "Fort Lauderdale, Florida", lat: 26.1224, lon: -80.1373 },
  { slug: "fort-myers", label: "Fort Myers, Florida", lat: 26.6406, lon: -81.8723 },
  { slug: "palm-springs", label: "Palm Springs, California", lat: 33.8303, lon: -116.5453 },
  { slug: "reno", label: "Reno, Nevada", lat: 39.5296, lon: -119.8138 },
  { slug: "memphis", label: "Memphis, Tennessee", lat: 35.1495, lon: -90.049 },
  { slug: "knoxville", label: "Knoxville, Tennessee", lat: 35.9606, lon: -83.9207 },
  { slug: "buffalo", label: "Buffalo, New York", lat: 42.8864, lon: -78.8784 },
  { slug: "tucson", label: "Tucson, Arizona", lat: 32.2226, lon: -110.9747 },
  { slug: "myrtle-beach", label: "Myrtle Beach, South Carolina", lat: 33.6891, lon: -78.8867 },
  { slug: "colorado-springs", label: "Colorado Springs, Colorado", lat: 38.8339, lon: -104.8214 },
];

// 429 gets its own, much longer wait: a ten-year daily archive query is heavy
// and Open-Meteo's free tier throttles per minute, so a 1.5 s retry just burns
// the attempts — a batch of 53 died on destination 7 that way. Other errors
// keep the short backoff.
const get = async (url) => {
  for (let attempt = 1; attempt <= 6; attempt++) {
    const res = await fetch(url);
    if (res.ok) return res.json();
    if (attempt === 6) throw new Error(`${res.status} for ${url}`);
    const wait = res.status === 429 ? 65_000 : 1500 * attempt;
    if (res.status === 429) console.log(`    429 — väntar ${wait / 1000}s`);
    await new Promise((r) => setTimeout(r, wait));
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
  let first = true;
  for (const t of targets) {
    // Space the heavy archive queries out instead of provoking the 429 path.
    if (!first) await new Promise((r) => setTimeout(r, 10_000));
    first = false;
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
