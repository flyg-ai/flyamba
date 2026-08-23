#!/usr/bin/env node
/**
 * Fills fare_months from Travelpayouts `v1/prices/monthly`.
 *
 * ONE CALL PER (ORIGIN, DESTINATION) returns a month-keyed object — the cheapest
 * fare for each departure month it has data for. That is the endpoint that makes
 * a real calendar affordable: the alternatives return a single month
 * (v2/prices/month-matrix), a flat date list (v1/prices/calendar) or one record
 * per destination (v2/prices/latest).
 *
 *   node scripts/fetch-fare-months.mjs --hubs     the 28 hub cities  (140 calls)
 *   node scripts/fetch-fare-months.mjs --all      the whole catalog  (2,216)
 *   node scripts/fetch-fare-months.mjs --hubs --dry   fetch, report, write nothing
 *
 * RATE IS READ, NOT ASSUMED. Travelpayouts returns X-Rate-Limit and
 * X-Rate-Limit-Reset on every response; the pacing follows those headers rather
 * than a hard-coded 60, because the quota can change and a 429 halfway through a
 * batch must not cost the rest of it. A 429 is retried after the reset it names.
 *
 * ROUND TRIP ONLY. All 4,795 rows in origin_fares are round trip and the column
 * has to stay consistent — calling a round-trip-derived fare "one way" is a
 * deceptive practice under 14 CFR 399.84.
 *
 * origin_fares IS NOT TOUCHED. Different question, different lifespan, different
 * table — see supabase/fare-months.sql.
 */

import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m) process.env[m[1]] ??= m[2].replace(/^["']|["']$/g, "");
}

const TOKEN = process.env.TRAVELPAYOUTS_API_TOKEN;
const ORIGINS = ["NYC", "MIA", "CHI", "LAX"];
const DRY = process.argv.includes("--dry");
const SCOPE = process.argv.includes("--all") ? "all" : "hubs";

/** Live view of the quota, updated from every response. */
const rate = { limit: 60, remaining: 60, resetSeconds: 24 };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function call(origin, destination) {
  const url =
    `https://api.travelpayouts.com/v1/prices/monthly` +
    `?origin=${origin}&destination=${destination}&currency=usd&token=${TOKEN}`;

  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(url, { cache: "no-store" });

    const limit = Number(res.headers.get("x-rate-limit"));
    const remaining = Number(res.headers.get("x-rate-limit-remaining"));
    const reset = Number(res.headers.get("x-rate-limit-reset"));
    if (Number.isFinite(limit) && limit > 0) rate.limit = limit;
    if (Number.isFinite(remaining)) rate.remaining = remaining;
    if (Number.isFinite(reset) && reset > 0) rate.resetSeconds = reset;

    if (res.status === 429) {
      // Wait out the window the server named, not a guess.
      await sleep((rate.resetSeconds + 1) * 1000);
      continue;
    }
    if (!res.ok) throw new Error(`upstream ${res.status}`);
    return (await res.json())?.data ?? {};
  }
  throw new Error("429 tre gånger i rad");
}

/** Pause only when the quota is nearly spent, using the reset the API reported. */
async function pace() {
  if (rate.remaining <= 2) {
    await sleep((rate.resetSeconds + 1) * 1000);
    rate.remaining = rate.limit;
  } else {
    // Spread the window evenly rather than bursting and stalling.
    await sleep(Math.ceil((rate.resetSeconds * 1000) / Math.max(rate.limit, 1)));
  }
}

const catalog = (() => {
  const src = readFileSync("app/data/all-destinations.ts", "utf8").replace(/\r\n/g, "\n");
  return [...src.matchAll(/slug: "([^"]+)", name: "([^"]+)"[\s\S]{0,240}?iata: "([^"]*)"/g)].map((m) => ({
    slug: m[1],
    name: m[2],
    iata: m[3],
  }));
})();

const hubSlugs = (() => {
  const src = readFileSync("app/lib/hubs.ts", "utf8");
  return new Set([...src.matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]));
})();

const targets = catalog
  .filter((d) => d.iata)
  .filter((d) => (SCOPE === "all" ? true : hubSlugs.has(d.slug)));

console.log(`omfattning: ${SCOPE} — ${targets.length} destinationer x ${ORIGINS.length} origins = ${targets.length * ORIGINS.length} anrop`);

const rows = [];
const perPair = [];
let calls = 0, failures = 0;

for (const d of targets) {
  for (const origin of ORIGINS) {
    let data;
    try {
      data = await call(origin, d.iata);
      calls++;
    } catch (err) {
      failures++;
      console.log(`  fel ${origin}->${d.iata} (${d.slug}): ${err.message}`);
      await pace();
      continue;
    }

    const months = Object.entries(data).filter(([, v]) => v && typeof v.price === "number" && v.price > 0);
    perPair.push({ slug: d.slug, origin, months: months.length });

    for (const [month, v] of months) {
      rows.push({
        origin,
        slug: d.slug,
        month: `${month}-01`,
        price_usd: Math.round(v.price),
        depart_date: typeof v.departure_at === "string" ? v.departure_at.slice(0, 10) : null,
        return_date: typeof v.return_at === "string" ? v.return_at.slice(0, 10) : null,
        airline: v.airline ?? null,
        flight_number: v.flight_number != null ? String(v.flight_number) : null,
        one_way: false,
      });
    }
    await pace();
  }
}

console.log(`\nanrop: ${calls} lyckade, ${failures} misslyckade`);
console.log(`rader att skriva: ${rows.length}`);

const dist = {};
for (const p of perPair) dist[p.months] = (dist[p.months] || 0) + 1;
console.log("\nmånader per (origin, slug):");
Object.keys(dist).map(Number).sort((a, b) => a - b).forEach((n) => console.log(`  ${String(n).padStart(2)} månader: ${dist[n]} par`));

if (DRY) {
  console.log("\nTORRKÖRNING — inget skrivet");
  process.exit(0);
}

const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
  global: { fetch: (u, o) => fetch(u, { ...o, cache: "no-store" }) },
});

const before = await db.from("origin_fares").select("*", { count: "exact", head: true });
for (let i = 0; i < rows.length; i += 500) {
  const { error } = await db.from("fare_months").upsert(rows.slice(i, i + 500), { onConflict: "origin,slug,month,one_way" });
  if (error) { console.error("upsert misslyckades:", error.message); process.exit(1); }
}
const after = await db.from("origin_fares").select("*", { count: "exact", head: true });
const { count: written } = await db.from("fare_months").select("*", { count: "exact", head: true });

console.log(`\nfare_months: ${written} rader`);
console.log(`origin_fares: ${before.count} före, ${after.count} efter — ${before.count === after.count ? "orörd" : "ÄNDRAD"}`);
