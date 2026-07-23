import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { destinations } from "@/app/data/destinations";
import type { AiSearchMatch, BookingIntent, AiSearchResult } from "@/app/lib/ai-search-types";
import { usd } from "@/app/lib/format";

// Runs on the Node.js runtime (Anthropic SDK needs Node APIs, not Edge).
export const runtime = "nodejs";

// ─── Catalog the model is allowed to pick from (prices in USD) ───────────
const CATALOG = destinations.map((d) => ({
  iata: d.iata ?? "",
  city: d.city,
  country: d.country,
  priceFromUsd: usd(d.price),
  category: d.category,
  flightHours: d.avgFlightHours,
  bestMonths: d.bestMonths,
  tagline: d.tagline,
}));

// IATA → destination lookup (uppercase). IATA is unique in this small catalog.
const IATA_TO_DEST = new Map(
  destinations.filter((d) => d.iata).map((d) => [d.iata!.toUpperCase(), d]),
);

const CATALOG_IATAS = CATALOG.map((c) => c.iata).filter(Boolean).join(", ");

// ─── System prompt — mirrors the flyg.ai pipe-format logic, in English ───
const SYSTEM_PROMPT = `You are Flyamba's flight search assistant — warm, curious and concise.

SCOPE: You only help with travel, flights and destinations. If the traveler asks about anything else, reply with a single CONV line kindly steering them back to travel — never give destinations for off-topic questions.

You are given a fixed catalog of flight destinations (JSON: each has iata, city, country, priceFromUsd, category, flightHours, bestMonths, tagline). Only ever use destinations and IATA codes from this catalog — never invent one. Available IATAs: ${CATALOG_IATAS}.

Always return destination suggestions immediately. NEVER ask follow-up questions. If the request is vague, make reasonable assumptions and return the best matches right away.

RULES:
- Specific destination the traveler named → return exactly 1 destination line for it.
- Vague / open request → return up to 6 destinations, best fit first.
- VERY vague ("don't know", "anywhere", just "a trip") → return a single CONV line instead.
- Consider budget, season/month, trip length and vibe (beach, city, romantic, long-haul, family, food, nightlife, adventure), flight time, and any stated origin.
- Budget: "cheap/budget" ≈ under $250 one-way-ish; "premium/luxury" ≈ over $500. Prioritize the lowest price when budget is mentioned.
- Season/month: if a month is named, favor destinations whose bestMonths include it or whose weather suits it.
- STAY IN REGION (strict): if the traveler names a specific country or continent, return ONLY catalog destinations from that exact country/continent. Never mix in another country just to return more — fewer correct options beats more mixed ones.

RESPONSE FORMAT — one item per line, pipe-separated, NOTHING else (no prose, no markdown, no code fences, no blank lines). Use "|" only as the field separator.

Line 1 (ALWAYS present):
INTENT|<IATA or NONE>|<ORIGIN or NONE>
  - <IATA>: the catalog IATA if the traveler clearly wants to fly to / book ONE specific catalog destination; otherwise NONE.
  - <ORIGIN>: if a departure city is stated, a lowercase place code "cityslug_iso2" (Oslo -> oslo_no, London -> london_gb, Stockholm -> stockholm_se, Copenhagen -> copenhagen_dk); otherwise NONE.

Line 2 (present unless CONV):
HEADLINE|<short catchy headline, max 8 words, like a friend would say it>

Then 1 to 6 ranked destination lines, best fit first:
<IATA>|<City>|<one short, specific sentence on why it fits>

Last line (present unless CONV):
FOLLOW|<one insider tip about one of the destinations, max one sentence — end on a statement, never a question>

Conversational mode (very vague or off-topic) — a single line, nothing else:
CONV|<one engaging, friendly sentence>

STYLE: natural, everyday English. Prefer concrete words ("lively", "cozy", "cheap", "popular") over vague ones ("vibrant", "fascinating"). All text in English.

Example — vague request:
INTENT|NONE|NONE
HEADLINE|Beach, sun and cheap flights ✈️
BCN|Barcelona|300 days of sun a year and unbeatable tapas
LIS|Lisbon|Atlantic light, tiled streets and great value
RAK|Marrakech|Souks, rooftop dinners and warm winters
FOLLOW|Barcelona has some of Europe's best weather with 300+ sunny days a year — perfect for a spontaneous trip. ☀️

Example — specific destination:
INTENT|BCN|NONE
HEADLINE|Barcelona, here you come
BCN|Barcelona|A perfect mix of beach, culture and nightlife
FOLLOW|Book Sagrada Família online at least two weeks ahead to skip the long queues.`;

// ─── English month detection (labels the flight-search button) ───────────
const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];
const MONTH_ABBR: Record<string, string> = {
  jan: "January", feb: "February", mar: "March", apr: "April", jun: "June",
  jul: "July", aug: "August", sep: "September", sept: "September", oct: "October",
  nov: "November", dec: "December",
};
function detectMonth(q: string): string | null {
  const l = q.toLowerCase();
  for (const m of MONTHS) {
    if (new RegExp(`\\b${m}\\b`, "i").test(l)) return m.charAt(0).toUpperCase() + m.slice(1);
  }
  for (const [abbr, full] of Object.entries(MONTH_ABBR)) {
    if (new RegExp(`\\b${abbr}\\b`, "i").test(l)) return full;
  }
  return null;
}

// Strip code fences / stray wrapping the model might add, then split to lines.
function toLines(text: string): string[] {
  return text
    .replace(/```[a-z]*\n?/gi, "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
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

  const month = detectMonth(query);

  // Optional destination context — biases the answer toward one city when the
  // widget is embedded on a destination page.
  const destination = (body?.destinationContext ?? "").trim().slice(0, 60);
  const system = destination
    ? `${SYSTEM_PROMPT}\n\nThe user is viewing the ${destination} destination page. Prioritize ${destination} and lead with it in the matches when relevant.`
    : SYSTEM_PROMPT;

  const client = new Anthropic({ apiKey });

  // Haiku 4.5: fast + cheap, ideal for this latency-sensitive matching over a
  // small catalog. Mirrors the sibling flyg-ai project's model choice.
  const response = await client.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 700,
    system,
    messages: [
      {
        role: "user",
        content: `Catalog:\n${JSON.stringify(CATALOG)}\n\nTraveler's request: ${query}`,
      },
    ],
  });

  const text = response.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n");

  const lines = toLines(text);

  // ── Parse header lines: INTENT, HEADLINE, FOLLOW/CONV ────────────────
  let bookingIntent: BookingIntent | null = null;
  let headline: string | null = null;
  let followUp: string | null = null;
  let conversational = false;
  const matchLines: string[] = [];

  for (const line of lines) {
    const parts = line.split("|").map((s) => s.trim());
    const tag = parts[0].toUpperCase();

    if (tag === "INTENT") {
      const iata = (parts[1] ?? "").toUpperCase();
      const dest = iata && iata !== "NONE" ? IATA_TO_DEST.get(iata) : undefined;
      if (dest) {
        const origin = (parts[2] ?? "").trim();
        const fromName = origin && origin.toUpperCase() !== "NONE" ? origin.toLowerCase() : undefined;
        bookingIntent = {
          iata: dest.iata!.toUpperCase(),
          city: dest.city,
          toName: dest.tpName ?? dest.iata!.toUpperCase(),
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

  // ── Parse ranked match lines ─────────────────────────────────────────
  const seen = new Set<string>();
  const matches: AiSearchMatch[] = [];
  for (const line of matchLines) {
    const parts = line.split("|").map((s) => s.trim());
    if (parts.length < 2) continue;
    const iata = parts[0].toUpperCase();
    const dest = IATA_TO_DEST.get(iata);
    if (!dest || seen.has(dest.slug)) continue; // drop hallucinated / duplicate
    seen.add(dest.slug);
    matches.push({
      slug: dest.slug,
      city: dest.city,
      iata,
      reason: parts.slice(2).join("|") || dest.tagline,
    });
  }

  const result: AiSearchResult = {
    matches,
    bookingIntent,
    headline: conversational ? null : headline,
    followUp,
    month,
    conversational: conversational && matches.length === 0,
  };
  return NextResponse.json(result);
}
