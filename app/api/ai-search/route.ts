import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { destinations } from "@/app/data/destinations";
import { ALL_DESTINATIONS, type AllDestination } from "@/app/data/all-destinations";
import type { AiSearchMatch, BookingIntent, AiSearchResult } from "@/app/lib/ai-search-types";
import { usd } from "@/app/lib/format";
import { getCachedResponse, saveCachedResponse, classifyIntent } from "@/app/lib/ai-cache";

// Runs on the Node.js runtime (Anthropic SDK needs Node APIs, not Edge).
export const runtime = "nodejs";

// ─── Catalog ─────────────────────────────────────────────────────────────
// The model picks from ALL 550 catalog destinations, not the 8 rich ones. With
// only the rich 8 to choose from, "best european beach destination" returned
// Marrakech and Reykjavik — they were among the only options it had.
//
// KEYED ON SLUG, NOT IATA. IATA is not unique in this catalog: 550
// destinations share 429 codes (Split serves 8, Málaga 7, Lisbon 7). An
// IATA-keyed protocol silently resolves Hvar to Split.
//
// Serialized as pipe-delimited lines rather than JSON — same data costs ~5.2k
// tokens instead of ~14k, because JSON repeats every key 550 times.

type CatalogEntry = {
  slug: string;
  name: string;
  country: string;
  continent: string;
  priceUsd: number;
  tagline?: string;
};

const richBySlug = new Map(destinations.map((d) => [d.slug, d]));

function cheapestUsd(d: AllDestination): number {
  const valid = d.monthlyPrices.filter((p): p is number => p != null);
  return valid.length ? usd(Math.min(...valid)) : 0;
}

/** Price in the given month (0–11) when available, else the yearly cheapest. */
function monthUsd(d: AllDestination, monthIdx: number | null): number {
  if (monthIdx != null) {
    const p = d.monthlyPrices[monthIdx];
    if (p != null) return usd(p);
  }
  return cheapestUsd(d);
}

const CATALOG_BY_SLUG = new Map(ALL_DESTINATIONS.map((d) => [d.slug, d]));

function buildCatalog(monthIdx: number | null, region: Region | null): CatalogEntry[] {
  return ALL_DESTINATIONS.filter((d) => !region || inRegion(d, region)).map((d) => ({
    slug: d.slug,
    name: d.name,
    country: d.country,
    continent: d.continent,
    priceUsd: monthUsd(d, monthIdx),
    tagline: richBySlug.get(d.slug)?.tagline,
  }));
}

function serializeCatalog(entries: CatalogEntry[]): string {
  return entries
    .map((e) =>
      [e.slug, e.name, e.country, e.continent, `$${e.priceUsd}`, e.tagline ?? ""]
        .join("|")
        .replace(/\|+$/, ""),
    )
    .join("\n");
}

// ─── Region detection ────────────────────────────────────────────────────
// When the traveler names a region, the catalog is filtered BEFORE it reaches
// the model, so returning a destination from the wrong place stops being
// possible rather than being something the prompt asks it not to do. It also
// roughly halves the payload for the common "in Europe" case.
//
// Matching on continent alone is not enough, because the catalog's continent
// field has gaps and inconsistencies:
//   • Dubai (UAE) sits under "Asia", while Qatar/Kuwait/Oman sit under
//     "Middle East" — a continent-only Middle East filter would drop Dubai.
//   • "England" and "Scotland" appear as countries alongside "United Kingdom".
//   • Turkey appears under both "Europe" and "Eurasia"; Georgia under both
//     "Asia" and "Europe"; Jordan under both "Asia" and "Middle East".
// So a region matches on continent OR country, and sub-continental regions
// (Mediterranean, Scandinavia, Caribbean…) are country sets by necessity.
//
// ORDER MATTERS: the first pattern that matches wins, so narrower regions are
// listed before the continents that contain them ("southeast asia" before
// "asia", "mediterranean" before "europe").

type Region = {
  name: string;
  match: RegExp;
  continents?: string[];
  countries?: string[];
};

const REGIONS: Region[] = [
  {
    name: "Southeast Asia",
    match: /\b(south ?east asia|south ?east asian|sea backpack\w*)\b/i,
    countries: ["Thailand", "Vietnam", "Indonesia", "Malaysia", "Singapore", "Philippines", "Cambodia", "Laos", "Myanmar"],
  },
  {
    name: "the Middle East",
    match: /\b(middle east|middle eastern|gulf states|persian gulf)\b/i,
    continents: ["Middle East"],
    countries: ["United Arab Emirates", "Qatar", "Kuwait", "Oman", "Saudi Arabia", "Jordan", "Israel", "Lebanon", "Bahrain"],
  },
  {
    name: "the Mediterranean",
    match: /\b(mediterranean|the med)\b/i,
    // Portugal has no Mediterranean coast, but travelers searching "Mediterranean
    // beach holiday" plainly mean the Algarve too, so it stays in.
    countries: ["Spain", "Italy", "Greece", "Croatia", "Turkey", "Portugal", "France", "Malta", "Cyprus", "Montenegro", "Albania", "Slovenia", "Israel", "Egypt", "Morocco", "Tunisia"],
  },
  {
    name: "the Nordics",
    match: /\b(scandinavia|scandinavian|nordic|nordics)\b/i,
    // "Scandinavia" is strictly Sweden/Norway/Denmark, but nobody searching it
    // means to exclude Iceland or Finland.
    countries: ["Sweden", "Norway", "Denmark", "Finland", "Iceland", "Faroe Islands"],
  },
  {
    name: "the Caribbean",
    match: /\b(caribbean|west indies)\b/i,
    countries: ["Cuba", "Jamaica", "Aruba", "Barbados", "Curaçao", "Dominican Republic", "Grenada", "Saint Lucia", "Sint Maarten", "Trinidad and Tobago", "Turks & Caicos"],
  },
  {
    name: "the Balkans",
    match: /\b(balkans?|balkan)\b/i,
    countries: ["Croatia", "Montenegro", "Albania", "Serbia", "Bosnia and Herzegovina", "North Macedonia", "Kosovo", "Slovenia", "Bulgaria"],
  },
  {
    name: "the UK",
    match: /\b(uk|u\.k\.|britain|british|england|scotland|wales)\b/i,
    countries: ["United Kingdom", "England", "Scotland", "Wales"],
  },
  {
    name: "Europe",
    match: /\b(europe|european)\b/i,
    continents: ["Europe"],
    // Turkey is filed under Eurasia on one row and Europe on another.
    countries: ["Turkey"],
  },
  { name: "Asia", match: /\b(asia|asian|far east)\b/i, continents: ["Asia"] },
  { name: "Africa", match: /\b(africa|african)\b/i, continents: ["Africa"] },
  {
    name: "South America",
    match: /\b(south america|south american|latin america)\b/i,
    continents: ["South America"],
  },
  {
    name: "North America",
    match: /\b(north america|north american|usa|u\.s\.a|united states)\b/i,
    continents: ["North America"],
  },
  {
    name: "Oceania",
    match: /\b(oceania|australasia|australia|new zealand)\b/i,
    continents: ["Oceania"],
  },
];

function detectRegion(q: string): Region | null {
  for (const r of REGIONS) if (r.match.test(q)) return r;
  return null;
}

function inRegion(d: AllDestination, region: Region): boolean {
  return (
    (region.continents?.includes(d.continent) ?? false) ||
    (region.countries?.includes(d.country) ?? false)
  );
}

// ─── System prompt ───────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Flyamba's flight search assistant — warm, curious and concise.

SCOPE: You only help with travel, flights and destinations. If the traveler asks about anything else, reply with a single CONV line kindly steering them back to travel — never give destinations for off-topic questions.

You are given a catalog of flight destinations, one per line, pipe-separated:
slug|City|Country|Continent|$priceFrom|optional tagline

Only ever use slugs from this catalog — never invent one, never return a city that is not listed. The slug is the identifier: return it exactly as written, lowercase.

Always return destination suggestions immediately. NEVER ask follow-up questions. If the request is vague, make reasonable assumptions and return the best matches right away.

RULES:
- Specific destination the traveler named → return exactly 1 destination line for it.
- Vague / open request → return up to 6 destinations, best fit first.
- VERY vague ("don't know", "anywhere", just "a trip") → return a single CONV line instead.
- Consider budget, season/month, trip length and vibe (beach, city, romantic, long-haul, family, food, nightlife, adventure), flight time, and any stated origin.
- Budget: "cheap/budget" ≈ under $250; "premium/luxury" ≈ over $500. Prioritize the lowest price when budget is mentioned.
- Match the ACTIVITY, not just the region. A beach request must return coastal and island destinations — never an inland capital or a cold-water city, however popular it is.
- STAY IN REGION (strict): if the traveler names a country or continent, return ONLY catalog destinations from that exact country/continent.
- Prefer variety: don't return six towns served by the same airport.

RESPONSE FORMAT — one item per line, pipe-separated, NOTHING else (no prose, no markdown, no code fences, no blank lines). Use "|" only as the field separator.

Line 1 (ALWAYS present):
INTENT|<slug or NONE>|<ORIGIN or NONE>
  - <slug>: the catalog slug if the traveler clearly wants to fly to / book ONE specific destination; otherwise NONE.
  - <ORIGIN>: if a departure city is stated, a lowercase place code "cityslug_iso2" (Oslo -> oslo_no, London -> london_gb, New York -> new-york_us); otherwise NONE.

Line 2 (present unless CONV):
HEADLINE|<short catchy headline, max 8 words, like a friend would say it>

Then 1 to 6 ranked destination lines, best fit first:
<slug>|<City>|<one short, specific sentence on why it fits>

Last line (present unless CONV):
FOLLOW|<one insider tip about one of the destinations, max one sentence — end on a statement, never a question>

Conversational mode (very vague or off-topic) — a single line, nothing else:
CONV|<one engaging, friendly sentence>

STYLE: natural, everyday English. Prefer concrete words ("lively", "cozy", "cheap", "popular") over vague ones ("vibrant", "fascinating"). All text in English.

Example — vague request:
INTENT|NONE|NONE
HEADLINE|Beach, sun and cheap flights ✈️
palma|Palma|Balearic beaches and a old town worth a day on its own
algarve|Algarve|Cliff-backed sand and the cheapest sun in Portugal
ibiza|Ibiza|Clear water by day, the best clubs in Europe by night
FOLLOW|The Algarve stays swimmable into late October, long after the crowds have gone. ☀️

Example — specific destination:
INTENT|barcelona|NONE
HEADLINE|Barcelona, here you come
barcelona|Barcelona|A perfect mix of beach, culture and nightlife
FOLLOW|Book Sagrada Família online at least two weeks ahead to skip the long queues.`;

// ─── English month detection (labels the flight-search button) ───────────
const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];
const MONTH_ABBR: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, jun: 5,
  jul: 6, aug: 7, sep: 8, sept: 8, oct: 9,
  nov: 10, dec: 11,
};

/** Month index 0–11, or null. "may" is only matched in full — "mar" etc. are safe. */
function detectMonthIdx(q: string): number | null {
  const l = q.toLowerCase();
  for (let i = 0; i < MONTHS.length; i++) {
    if (new RegExp(`\\b${MONTHS[i]}\\b`, "i").test(l)) return i;
  }
  for (const [abbr, idx] of Object.entries(MONTH_ABBR)) {
    if (new RegExp(`\\b${abbr}\\b`, "i").test(l)) return idx;
  }
  return null;
}

function monthName(idx: number): string {
  return MONTHS[idx].charAt(0).toUpperCase() + MONTHS[idx].slice(1);
}

// Strip code fences / stray wrapping the model might add, then split to lines.
function toLines(text: string): string[] {
  return text
    .replace(/```[a-z]*\n?/gi, "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

/**
 * Parse the pipe format into an AiSearchResult.
 *
 * `allowed` is the set of slugs the model was actually shown. Anything outside
 * it is dropped — that is what stops a hallucinated or out-of-region
 * destination from reaching the page even if the prompt rules are ignored.
 */
function parseModelOutput(
  text: string,
  month: string | null,
  allowed: Set<string>,
): AiSearchResult {
  const lines = toLines(text);

  let bookingIntent: BookingIntent | null = null;
  let headline: string | null = null;
  let followUp: string | null = null;
  let conversational = false;
  const matchLines: string[] = [];

  for (const line of lines) {
    const parts = line.split("|").map((s) => s.trim());
    const tag = parts[0].toUpperCase();

    if (tag === "INTENT") {
      const slug = (parts[1] ?? "").toLowerCase();
      const dest = slug && slug !== "none" && allowed.has(slug) ? CATALOG_BY_SLUG.get(slug) : undefined;
      if (dest) {
        const origin = (parts[2] ?? "").trim();
        const fromName = origin && origin.toUpperCase() !== "NONE" ? origin.toLowerCase() : undefined;
        bookingIntent = {
          iata: dest.iata.toUpperCase(),
          city: dest.name,
          toName: dest.tpName || dest.iata.toUpperCase(),
          fromName,
        };
      }
    } else if (tag === "HEADLINE" && parts[1]) {
      headline = parts.slice(1).join("|");
    } else if (tag === "FOLLOW" && parts[1]) {
      followUp = parts.slice(1).join("|");
    } else if (tag === "CONV" && parts[1]) {
      conversational = true;
      followUp = parts.slice(1).join("|");
    } else {
      matchLines.push(line);
    }
  }

  const seen = new Set<string>();
  const matches: AiSearchMatch[] = [];
  for (const line of matchLines) {
    const parts = line.split("|").map((s) => s.trim());
    if (parts.length < 2) continue;
    const slug = parts[0].toLowerCase();
    if (!allowed.has(slug) || seen.has(slug)) continue; // hallucinated / out-of-region / duplicate
    const dest = CATALOG_BY_SLUG.get(slug);
    if (!dest) continue;
    seen.add(slug);
    matches.push({
      slug,
      city: dest.name,
      iata: dest.iata.toUpperCase(),
      reason: parts.slice(2).join("|") || richBySlug.get(slug)?.tagline || dest.country,
    });
  }

  return {
    matches,
    bookingIntent,
    headline: conversational ? null : headline,
    followUp,
    month,
    conversational: conversational && matches.length === 0,
  };
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: { query?: string; destinationContext?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const query = (body?.query ?? "").trim();
  if (!query) return NextResponse.json({ error: "Empty query" }, { status: 400 });
  if (query.length > 500) return NextResponse.json({ error: "Query too long" }, { status: 400 });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing ANTHROPIC_API_KEY" }, { status: 500 });
  }

  const monthIdx = detectMonthIdx(query);
  const month = monthIdx != null ? monthName(monthIdx) : null;
  const region = detectRegion(query);

  const catalog = buildCatalog(monthIdx, region);
  const allowed = new Set(catalog.map((c) => c.slug));

  // Optional destination context — biases the answer toward one city when the
  // widget is embedded on a destination page. Also part of the cache key.
  const destination = (body?.destinationContext ?? "").trim().slice(0, 60);
  const categoryPage = destination.toLowerCase() || "home";

  // ── Cache lookup. Never fatal: a miss, an error or unconfigured Supabase
  //    all fall through to a live call. ──────────────────────────────────
  const cached = await getCachedResponse(query, categoryPage);
  if (cached?.ai_response_text) {
    const result = parseModelOutput(cached.ai_response_text, month, allowed);
    // Guard against a poisoned or now-out-of-range cache row serving nothing.
    if (result.matches.length > 0 || result.conversational) {
      return NextResponse.json(result, { headers: { "x-flyamba-cache": "hit" } });
    }
  }

  const catalogText = serializeCatalog(catalog);
  const regionNote = region
    ? `\n\nThe traveler named a region, so this catalog has already been narrowed to ${region.name}. Every line is eligible.`
    : "";
  const monthNote =
    month != null
      ? `\n\nPrices shown are for ${month}, the month the traveler asked about.`
      : "\n\nPrices shown are each destination's cheapest month.";

  const system = destination
    ? `${SYSTEM_PROMPT}\n\nThe user is viewing the ${destination} destination page. Prioritize ${destination} and lead with it in the matches when relevant.`
    : SYSTEM_PROMPT;

  const client = new Anthropic({ apiKey });

  // Haiku 4.5: fast + cheap, ideal for this latency-sensitive matching.
  // The catalog goes in a cached system block — it is ~5k tokens and identical
  // across every search with the same region/month, so prompt caching keeps the
  // per-search cost close to what the 8-destination catalog used to be.
  const response = await client.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 700,
    system: [
      { type: "text", text: system },
      {
        type: "text",
        text: `Catalog:\n${catalogText}${regionNote}${monthNote}`,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [{ role: "user", content: `Traveler's request: ${query}` }],
  });

  const text = response.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n");

  const result = parseModelOutput(text, month, allowed);

  // Only cache answers worth replaying. A parse that yielded nothing is a bad
  // generation — caching it would serve that failure forever.
  if (result.matches.length > 0 || result.conversational) {
    await saveCachedResponse({
      queryText: query,
      intentBucket: classifyIntent(query),
      destinationSlugs: result.matches.map((m) => m.slug),
      aiResponseText: text,
      categoryPage,
    });
  }

  return NextResponse.json(result, { headers: { "x-flyamba-cache": "miss" } });
}
