#!/usr/bin/env node
/**
 * Checks every `tpName` in the repo against the place API the search widget
 * actually queries. Exits 1 on an unknown value so it can gate a commit.
 *
 * WHY THIS EXISTS. A tpName that resolves to nothing does not throw, does not
 * log and does not render an error — the widget draws a search box with an empty
 * field, which is indistinguishable from a search box nobody has typed into. That
 * is how 186 of 556 values, including every US city, shipped broken and stayed
 * broken. `verify-images.mjs` exists for the same reason and was written after
 * the same kind of silence: a value being present is not the same as a value
 * working, and only a gate can tell the two apart.
 *
 * THE CHAIN THIS VERIFIES. The widget script at tpwdg.com/content parses its own
 * src, maps `from_name`/`to_name` onto `data-from`/`data-to`, and Kiwi's loader
 * turns those into `source=`/`destination=` on an iframe that resolves them
 * against api.skypicker.com. So the only opinion that counts is that API's, and
 * this script asks it directly rather than checking our strings for plausibility.
 *
 *   node scripts/verify-tpnames.mjs          list failures, exit 1 if any
 *   node scripts/verify-tpnames.mjs --json   same, as JSON
 *
 * Run it whenever a tpName or ORIGIN_TP_NAME entry changes. It needs network; if
 * the API cannot be reached it exits 1 rather than passing, because a gate that
 * goes quiet when it cannot check is the failure mode it is here to prevent.
 */

import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";

const API = "https://api.skypicker.com/umbrella/v2/graphql";
const BATCH = 40;

/**
 * Values that resolve to nothing but are held back for a human decision.
 *
 * EMPTY, AND THAT IS THE INTENDED STATE. It held 111 region, island and village
 * slugs — Algarve, Tuscany, Crete, Monaco — that Kiwi has no place of its own for.
 * All 111 were reviewed and resolved through the destination's IATA code to the city
 * that owns its airport, which is the same airport the fare on the page comes from.
 *
 * Add a value here only to park a genuine unknown while it is being decided, and
 * write down why. Anything in this list reports as PENDING instead of failing, so an
 * entry left behind after it is fixed would grant a future regression on that value a
 * free pass — the stale check below exits 1 to stop exactly that.
 */
const PENDING_REVIEW = new Set([]);

/** Every `tpName: "..."` literal under app/, with the file and line it sits on. */
function collectCatalog() {
  const files = execSync('grep -rl "tpName" --include=*.ts --include=*.tsx app/', { encoding: "utf8" })
    .trim().split("\n").filter(Boolean);
  const found = new Map();
  for (const file of files) {
    const lines = readFileSync(file, "utf8").replace(/\r\n/g, "\n").split("\n");
    lines.forEach((line, i) => {
      for (const m of line.matchAll(/tpName:\s*"([^"]+)"/g)) {
        if (!found.has(m[1])) found.set(m[1], []);
        found.get(m[1]).push(`${file}:${i + 1}`);
      }
    });
  }
  return found;
}

/** The origin table, read from source so the two can never drift apart. */
function collectOrigins() {
  const src = readFileSync("app/lib/origins.ts", "utf8").replace(/\r\n/g, "\n");
  const block = src.slice(src.indexOf("export const ORIGIN_TP_NAME"));
  const body = block.slice(0, block.indexOf("};"));
  const found = new Map();
  for (const m of body.matchAll(/(\w+):\s*"([^"]+)"/g)) {
    if (!found.has(m[2])) found.set(m[2], []);
    found.get(m[2]).push(`ORIGIN_TP_NAME.${m[1]}`);
  }
  return found;
}

async function resolvable(ids) {
  const query = `query($s:PlacesSearchInput){places(search:$s,first:200){... on PlaceConnection{edges{node{legacyId}}}}}`;
  const res = await fetch(API, {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://widgets.kiwi.com" },
    body: JSON.stringify({ query, variables: { s: { ids } } }),
  });
  if (!res.ok) throw new Error(`${API} svarade ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors).slice(0, 300));
  return (json?.data?.places?.edges ?? []).map((e) => e.node.legacyId);
}

const asJson = process.argv.includes("--json");

const catalog = collectCatalog();
const origins = collectOrigins();
const where = new Map();
for (const [value, refs] of [...catalog, ...origins]) {
  where.set(value, [...(where.get(value) ?? []), ...refs]);
}
const values = [...where.keys()];

const ok = new Set();
try {
  for (let i = 0; i < values.length; i += BATCH) {
    for (const id of await resolvable(values.slice(i, i + BATCH))) ok.add(id);
  }
} catch (err) {
  console.error(`verify-tpnames: kunde inte nå platsapiet — ${err.message}`);
  console.error("Ingen kontroll gjord. Detta räknas som fel, inte som godkänt.");
  process.exit(1);
}

const broken = values.filter((v) => !ok.has(v));
const pending = broken.filter((v) => PENDING_REVIEW.has(v));
const failures = broken.filter((v) => !PENDING_REVIEW.has(v));
// An entry that has been fixed but left in the list would quietly grant a future
// regression on the same value a free pass.
const stale = [...PENDING_REVIEW].filter((v) => ok.has(v) || !where.has(v));

if (asJson) {
  console.log(JSON.stringify({
    checked: values.length, valid: values.length - broken.length,
    failures: failures.map((v) => ({ value: v, at: where.get(v) })),
    pending: pending.length, stale,
  }, null, 2));
} else {
  console.log(`kontrollerade ${values.length} tpName-värden mot ${API}`);
  console.log(`  giltiga:   ${values.length - broken.length}`);
  console.log(`  väntande:  ${pending.length} (i PENDING_REVIEW, se listan i den här filen)`);
  console.log(`  fel:       ${failures.length}`);
  for (const v of failures) {
    console.log(`\n  ✗ "${v}" finns inte hos Kiwi`);
    for (const at of where.get(v)) console.log(`      ${at}`);
  }
  if (stale.length) {
    console.log(`\n  ${stale.length} poster i PENDING_REVIEW är inte längre trasiga eller finns inte kvar:`);
    for (const v of stale) console.log(`      ${v}`);
    console.log("  Ta bort dem ur listan — annars döljer de en framtida regression.");
  }
}

if (failures.length) {
  console.error(`\nverify-tpnames: ${failures.length} värde(n) skulle ge ett tomt sökfält.`);
  process.exit(1);
}
if (stale.length) {
  console.error("\nverify-tpnames: PENDING_REVIEW är inaktuell.");
  process.exit(1);
}
console.log("\nverify-tpnames: inga fel.");

// ---------------------------------------------------------------------------
// Airport-plausibility sweep — opt-in, reports only, never changes the exit code
// ---------------------------------------------------------------------------

/**
 * Looks for destinations whose `iata` may be the wrong airport.
 *
 * WHY NOT A DISTANCE THRESHOLD. Distance alone is a bad signal in both directions.
 * It flags Petra -> Amman at 262 km, which is correct: Jordan has no closer airport
 * with traffic. And it waves through a village airstrip 8 km away that no airline
 * flies to, which is the worse error, because a near empty airport produces no
 * fares at all. So two conditions have to fire together:
 *
 *   1. the assigned airport is more than DISTANCE_KM from the destination, AND
 *   2. the destination has fewer than MIN_FARE_ROWS rows in `origin_fares`, and a
 *      Kiwi station sits materially closer to it
 *
 * The second condition separates "far, but the only thing flying" from "far, and
 * not working". Trinidad in Cuba fires on both: SCU is 475 km away and yields 3
 * rows, while Santa Clara and Cienfuegos sit under 80 km.
 *
 * WHAT IT DOES NOT DO. It does not measure the candidate's fare coverage. That
 * needs a live Travelpayouts probe per origin — 24 requests per candidate — which
 * is not something a verification script should do across 554 destinations. The
 * candidate is a lead to check by hand, never a recommendation: an emptier airport
 * nearer the destination is a downgrade, not a fix.
 *
 * REPORTING ONLY. The heuristic will produce false positives, so it never touches
 * the exit code. `exit 1` stays reserved for what is provably wrong — an id Kiwi
 * does not know, and a stale PENDING_REVIEW entry.
 *
 *   node scripts/verify-tpnames.mjs --sweep [--out <file>]
 *
 * Needs NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY, read from
 * .env.local when they are not already in the environment.
 */
const DISTANCE_KM = 150;
const MIN_FARE_ROWS = 5;
/** A candidate must be meaningfully nearer to be worth a look, not merely nearer. */
const CANDIDATE_MAX_SHARE = 0.7;

const STATION_QUERY = `query($s:PlacesSearchInput){places(search:$s,first:200){... on PlaceConnection{edges{node{__typename legacyId name gps{lat lng} ... on Station{code city{legacyId name}}}}}}}`;

function haversine(a, b) {
  const R = 6371, rad = (x) => (x * Math.PI) / 180;
  const h = Math.sin(rad(b.lat - a.lat) / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(rad(b.lng - a.lng) / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(h)));
}

async function places(variables) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://widgets.kiwi.com" },
    body: JSON.stringify({ query: STATION_QUERY, variables }),
  });
  const json = await res.json();
  // THROW RATHER THAN RETURN []. An earlier version returned the empty list on a
  // GraphQL error, and a malformed radius query then read as "no nearer airport
  // exists" for all 554 rows — a clean report of zero problems, produced by asking
  // the question wrong. Silence has to be loud here.
  if (json.errors) throw new Error(JSON.stringify(json.errors).slice(0, 200));
  return json?.data?.places?.edges ?? [];
}

/**
 * The catalog's country strings do not line up with the geocoder's. It says
 * "Scotland" and "England" where Open-Meteo says "United Kingdom", and the two
 * disagree on Turkey and Czechia as well. Left unhandled this silently dropped 62
 * of 554 destinations out of the sweep, which reads as "nothing wrong" rather than
 * "not checked" — the exact failure this whole file exists to prevent.
 */
const COUNTRY_ALIAS = {
  scotland: "united kingdom", england: "united kingdom", wales: "united kingdom",
  "northern ireland": "united kingdom", turkey: "turkiye", czechia: "czech republic",
  "the netherlands": "netherlands", "united states of america": "united states",
};
const sameCountry = (a, b) => {
  const norm = (x) => {
    const k = (x ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
    return COUNTRY_ALIAS[k] ?? k;
  };
  return norm(a) === norm(b);
};

/**
 * Position of the destination itself.
 *
 * Returns `weak` when the country could not be confirmed and the top-ranked result
 * was taken instead. Open-Meteo ranks by population, so that is usually the right
 * city — but it is a guess, and a flagged row says so rather than presenting the
 * distance as measured fact.
 */
async function locate(r) {
  // "Trinidad (Cuba)" and "Cordoba (Argentina)" carry a disambiguator the geocoder
  // cannot parse. Strip it; the country check below does that job properly.
  const name = r.name.replace(/\s*\([^)]*\)\s*/g, " ").trim();
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=10&language=en&format=json`;
    const results = (await (await fetch(url)).json()).results ?? [];
    const exact = results.find((x) => sameCountry(x.country, r.country));
    const pick = exact ?? results[0];
    if (!pick) return { at: null, weak: false };
    return { at: { lat: pick.latitude, lng: pick.longitude }, weak: !exact };
  } catch {
    return { at: null, weak: false };
  }
}

async function sweep(outPath) {
  const { writeFileSync, existsSync } = await import("node:fs");
  if (existsSync(".env.local")) {
    for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
      const m = line.match(/^([A-Z_]+)=(.*)$/);
      if (m) process.env[m[1]] ??= m[2].replace(/^['"]|['"]$/g, "");
    }
  }

  const src = readFileSync("app/data/all-destinations.ts", "utf8").replace(/\r\n/g, "\n");
  const rows = [...src.matchAll(/slug: "([^"]+)", name: "([^"]+)", country: "([^"]+)"[\s\S]{0,200}?iata: "([^"]*)"/g)]
    .map((m) => ({ slug: m[1], name: m[2], country: m[3], iata: m[4] }));
  console.log(`\nsvep: ${rows.length} destinationer`);

  // Each IATA resolved to its Kiwi station, which carries the airport's own gps.
  const codes = [...new Set(rows.map((r) => r.iata).filter(Boolean))];
  const station = new Map();
  for (let i = 0; i < codes.length; i += BATCH) {
    for (const e of await places({ s: { ids: codes.slice(i, i + BATCH) } })) {
      if (e.node.__typename === "Station" && e.node.code) station.set(e.node.code, e.node);
    }
  }
  console.log(`  IATA-koder kända hos Kiwi: ${station.size}/${codes.length}`);

  // Fare coverage per destination, from the table the pages themselves read.
  const fares = new Map();
  try {
    const { createClient } = await import("@supabase/supabase-js");
    const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { persistSession: false }, global: { fetch: (u, o) => fetch(u, { ...o, cache: "no-store" }) } });
    for (let from = 0; ; from += 1000) {
      const { data, error } = await db.from("origin_fares").select("slug").range(from, from + 999);
      if (error) throw new Error(error.message);
      for (const r of data ?? []) fares.set(r.slug, (fares.get(r.slug) ?? 0) + 1);
      if (!data || data.length < 1000) break;
    }
  } catch (err) {
    console.error(`svep: kunde inte läsa origin_fares — ${err.message}`);
    console.error("Då kan bara avståndsvillkoret prövas, och det ensamt är just det som inte duger. Avbryter.");
    return;
  }
  console.log(`  destinationer med fares: ${fares.size}`);

  const flagged = [], unknown = [], fine = [];
  for (const r of rows) {
    const st = r.iata ? station.get(r.iata) : null;
    if (!st?.gps) { unknown.push({ ...r, why: r.iata ? "IATA okänd hos Kiwi" : "ingen IATA i katalogen" }); continue; }

    const { at: here, weak } = await locate(r);
    await new Promise((res) => setTimeout(res, 60));
    if (!here) { unknown.push({ ...r, why: "orten gick inte att geokoda" }); continue; }

    const km = haversine(here, st.gps);
    const rowCount = fares.get(r.slug) ?? 0;
    if (km <= DISTANCE_KM || rowCount >= MIN_FARE_ROWS) { fine.push({ ...r, km, rowCount }); continue; }

    let nearer = [];
    try {
      nearer = (await places({ s: { radius: { position: { lat: here.lat, lng: here.lng }, radius: km } } }))
        .filter((e) => e.node.__typename === "Station" && e.node.code && e.node.code !== r.iata && e.node.gps)
        .map((e) => ({ code: e.node.code, name: e.node.name, km: haversine(here, e.node.gps) }))
        .filter((c) => c.km < km * CANDIDATE_MAX_SHARE)
        .sort((a, b) => a.km - b.km)
        .slice(0, 4);
    } catch (err) {
      // Not "no candidates" — we failed to ask. Report it as its own outcome.
      unknown.push({ ...r, why: `radiesökningen misslyckades: ${err.message.slice(0, 80)}` });
      continue;
    }
    if (!nearer.length) { fine.push({ ...r, km, rowCount, note: "långt bort, men inget närmare finns" }); continue; }
    flagged.push({ ...r, km, rowCount, station: st, nearer, weak });
  }

  flagged.sort((a, b) => b.km - a.km);
  const lines = [];
  lines.push(`# Flygplatser att kontrollera — ${flagged.length} träffar av ${rows.length}`, "");
  lines.push(`Flaggas bara när BÅDA villkoren slår till: flygplatsen ligger över ${DISTANCE_KM} km från orten, OCH destinationen har färre än ${MIN_FARE_ROWS} rader i \`origin_fares\` samtidigt som en Kiwi-station finns minst ${Math.round((1 - CANDIDATE_MAX_SHARE) * 100)} % närmare.`, "");
  lines.push("**Kandidaternas prisläge är INTE mätt.** Att en flygplats ligger närmare säger ingenting om att den har trafik, och en tom närflygplats är sämre än en fungerande avlägsen. Probea kandidaten mot Travelpayouts från de 24 avreseorterna innan något ändras.", "");
  lines.push("Heuristiken har falska träffar och fäller aldrig bygget.", "");
  lines.push("| destination | land | iata | flygplatsens ort | avstånd | fares | närmare kandidater | geokodning |");
  lines.push("| --- | --- | --- | --- | --- | --- | --- | --- |");
  for (const f of flagged) {
    lines.push(`| ${f.slug} | ${f.country} | ${f.iata} | ${f.station.city?.name ?? f.station.name} | ${f.km} km | ${f.rowCount} | ${f.nearer.map((c) => `${c.code} ${c.km} km`).join(", ")} | ${f.weak ? "SVAG — landet obekräftat" : "säker"} |`);
  }
  lines.push("", `## Ej prövade — ${unknown.length}`, "");
  lines.push("Avståndet gick inte att fastställa, så villkor 1 kunde inte prövas. Att en destination saknas i tabellen ovan betyder alltså inte att dess flygplats är rätt.", "");
  lines.push("| destination | land | iata | orsak |", "| --- | --- | --- | --- |");
  for (const u of unknown) lines.push(`| ${u.slug} | ${u.country} | ${u.iata || "—"} | ${u.why} |`);
  writeFileSync(outPath, lines.join("\n"));

  console.log(`  flaggade:        ${flagged.length}`);
  console.log(`  ej prövade:      ${unknown.length}`);
  console.log(`  utan anmärkning: ${fine.length}`);
  console.log(`  skrev ${outPath}`);
}

if (process.argv.includes("--sweep")) {
  const at = process.argv.indexOf("--out");
  await sweep(at > -1 ? process.argv[at + 1] : "airport-sweep.md");
}
