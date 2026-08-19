#!/usr/bin/env node
/**
 * Translate the Swedish content still missing from app/data/destination-facts.ts
 * and merge it in.
 *
 * Fills two gaps left by the original port:
 *   insiderTip  — 552 destinations, full Swedish sentences
 *   dishes/sights — the ~31% whose NAME half contains Swedish ("Diocletianus
 *                   palats", "Cofete strand"), dropped rather than shipped
 *                   half-translated
 *
 * Deliberately NOT translated: flyg.ai's `flightDurationText`. Those are flight
 * times from Stockholm and are simply wrong for Flyamba's audience — flight
 * time has to be computed per origin, not ported.
 *
 * Usage, from the repo root:
 *   node scripts/translate-facts.mjs            # translate + merge
 *   node scripts/translate-facts.mjs --dry-run  # translate only, write cache
 *
 * Reads ANTHROPIC_API_KEY from .env.local. Uses Haiku; the whole run is a few
 * cents. Progress is cached in scripts/.translation-cache.json, so re-running
 * after a crash resumes instead of paying twice.
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const FLYG_AI = path.resolve(ROOT, "../flyg-ai/flyg-ai/data/destinations.ts");
const FACTS = path.join(ROOT, "app/data/destination-facts.ts");
const CACHE = path.join(ROOT, "scripts/.translation-cache.json");
const MODEL = "claude-haiku-4-5";
const BATCH = 20;

// flyg.ai keeps Swedish slugs for these; Flyamba uses the English ones.
const SLUG_MAP = {
  aten: "athens", bryssel: "brussels", bukarest: "bucharest", florens: "florence",
  geneve: "geneva", goteborg: "gothenburg", helsingfors: "helsinki", kairo: "cairo",
  kapstaden: "cape-town", kopenhamn: "copenhagen", lissabon: "lisbon", munchen: "munich",
  neapel: "naples", prag: "prague", rom: "rome", teneriffa: "tenerife",
  venedig: "venice", warszawa: "warsaw", wien: "vienna",
};

function loadEnv() {
  const file = path.join(ROOT, ".env.local");
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

/** Split flyg.ai's destinations.ts into one text block per slug. */
function readSource() {
  if (!fs.existsSync(FLYG_AI)) {
    console.error(`Cannot find ${FLYG_AI}`);
    console.error("Expected the flyg-ai repo as a sibling of this one on the Desktop.");
    process.exit(1);
  }
  const src = fs.readFileSync(FLYG_AI, "utf8");
  const blocks = src.split(/\n(?=  "?[a-z0-9-]+"?:\s*\{)/);
  const out = {};
  for (const b of blocks) {
    const m = b.match(/^\s*"?([a-z0-9-]+)"?:\s*\{/);
    if (!m) continue;
    const slug = SLUG_MAP[m[1]] ?? m[1];
    const tip = b.match(/insiderTip:\s*"((?:[^"\\]|\\.)*)"/);
    const list = (field) => {
      const mm = b.match(new RegExp(field + ":\\s*\\[([\\s\\S]*?)\\]"));
      if (!mm) return [];
      return [...mm[1].matchAll(/"((?:[^"\\]|\\.)*)"/g)]
        .map((x) => x[1].replace(/\\"/g, '"').replace(/\\\\/g, "\\"))
        // Only the name half, same rule the original port used.
        .map((s) => s.split(/\s+[—–]\s+|\s+-\s+/)[0].trim())
        .filter(Boolean)
        .slice(0, 3);
    };
    out[slug] = {
      insiderTip: tip ? tip[1].replace(/\\"/g, '"') : null,
      dishes: list("\\bmat"),
      sights: list("sevardigheter"),
    };
  }
  return out;
}

async function translateBatch(apiKey, items) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 4000,
      system:
        "You translate Swedish travel content into natural English for an international travel site.\n" +
        "RULES:\n" +
        "- Keep proper nouns in their local form: 'Sagrada Família', 'Bullit de peix', 'Dalt Vila'.\n" +
        "- Translate only the Swedish parts. 'Diocletianus palats' -> 'Diocletian's Palace'. " +
        "'Cofete strand' -> 'Cofete Beach'. 'Oia solnedgången' -> 'Oia sunset'. " +
        "'Gamla stan' -> 'Old Town'. 'Rhodos gamla stad' -> 'Rhodes Old Town'.\n" +
        "- Sight and dish names must stay SHORT — a name, not a sentence. Never add description.\n" +
        "- Tips are one natural English sentence, same meaning, same specifics (times, prices, " +
        "directions). Do not embellish and do not add anything not in the original.\n" +
        "- Use $ for money only if the original had a currency; otherwise leave amounts out.\n" +
        "Return ONLY a JSON object keyed by the same ids you were given, no prose, no code fences.",
      messages: [
        {
          role: "user",
          content:
            "Translate the Swedish values. Reply with JSON of the same shape.\n\n" +
            JSON.stringify(items, null, 1),
        },
      ],
    }),
  });

  if (!res.ok) throw new Error(`Anthropic ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  const text = (data?.content ?? []).filter((b) => b.type === "text").map((b) => b.text).join("");
  const json = text.replace(/```json?\n?/gi, "").replace(/```/g, "").trim();
  return JSON.parse(json);
}

async function main() {
  loadEnv();
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY not found in .env.local");
    process.exit(1);
  }

  const source = readSource();
  const cache = fs.existsSync(CACHE) ? JSON.parse(fs.readFileSync(CACHE, "utf8")) : {};

  const pending = Object.entries(source).filter(([slug, v]) => {
    if (cache[slug]) return false;
    return v.insiderTip || v.dishes.length || v.sights.length;
  });

  console.log(`${Object.keys(source).length} destinations in source, ${Object.keys(cache).length} already translated, ${pending.length} to go.`);

  for (let i = 0; i < pending.length; i += BATCH) {
    const chunk = pending.slice(i, i + BATCH);
    const payload = Object.fromEntries(chunk);
    process.stdout.write(`  ${i + 1}–${Math.min(i + BATCH, pending.length)} of ${pending.length}… `);
    try {
      const translated = await translateBatch(apiKey, payload);
      for (const [slug] of chunk) if (translated[slug]) cache[slug] = translated[slug];
      fs.writeFileSync(CACHE, JSON.stringify(cache, null, 1));
      console.log("ok");
    } catch (err) {
      console.log(`FAILED (${err.message}) — skipping, re-run to retry`);
    }
  }

  if (process.argv.includes("--dry-run")) {
    console.log(`\nCache written to ${CACHE}. Re-run without --dry-run to merge.`);
    return;
  }

  // ── Merge into destination-facts.ts ────────────────────────────────────
  let facts = fs.readFileSync(FACTS, "utf8");
  let touched = 0;

  for (const [slug, t] of Object.entries(cache)) {
    const line = new RegExp(`^(  ${JSON.stringify(slug)}: \\{ )(.*)( \\},)$`, "m");
    const m = facts.match(line);
    if (!m) continue;

    let body = m[2];
    const setField = (name, value) => {
      if (value === undefined || value === null || value === "") return;
      const json = JSON.stringify(value);
      const existing = new RegExp(`${name}: (\\[[^\\]]*\\]|"(?:[^"\\\\]|\\\\.)*")`);
      // REPLACER FUNCTION, not a replacement string. Prices look like "$24–38",
      // and in a replacement string `$2` means "capture group 2" — the whole old
      // line got substituted into the price field, corrupting every destination
      // whose fare started $1–$9. A function receives the text verbatim.
      body = existing.test(body)
        ? body.replace(existing, () => `${name}: ${json}`)
        : `${body}, ${name}: ${json}`;
    };

    if (Array.isArray(t.dishes) && t.dishes.length) setField("dishes", t.dishes.slice(0, 3));
    if (Array.isArray(t.sights) && t.sights.length) setField("sights", t.sights.slice(0, 3));
    if (typeof t.insiderTip === "string" && t.insiderTip.trim()) setField("insiderTip", t.insiderTip.trim());

    // Same trap: `body` contains "$24–38" and the prefix/suffix must come from
    // the match, so build the replacement inside a function.
    facts = facts.replace(line, (_full, prefix, _old, suffix) => `${prefix}${body}${suffix}`);
    touched++;
  }

  // The type needs the new field the first time this runs.
  if (!facts.includes("insiderTip?: string;")) {
    facts = facts.replace(
      "  /** Top sight names, up to 3. */\n  sights?: string[];",
      "  /** Top sight names, up to 3. */\n  sights?: string[];\n" +
        "  /** One-sentence local tip, translated from flyg.ai's Swedish original. */\n" +
        "  insiderTip?: string;",
    );
  }

  fs.writeFileSync(FACTS, facts);
  console.log(`\nMerged ${touched} destinations into ${path.relative(ROOT, FACTS)}.`);
  console.log("Next: npx tsc --noEmit && npm run dev");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
