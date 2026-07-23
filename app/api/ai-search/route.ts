import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { destinations } from "@/app/data/destinations";
import type { AiSearchMatch, BookingIntent, AiSearchResult } from "@/app/lib/ai-search-types";

// Runs on the Node.js runtime (Anthropic SDK needs Node APIs, not Edge).
export const runtime = "nodejs";

// ─── Catalog the model is allowed to pick from ───────────────────────────
const CATALOG = destinations.map((d) => ({
  iata: d.iata ?? "",
  city: d.city,
  country: d.country,
  priceFromKr: d.price,
  category: d.category,
  flightHours: d.avgFlightHours,
  bestMonths: d.bestMonths,
  tagline: d.tagline,
}));

// IATA → destination lookup (uppercase). IATA is unique in this small catalog.
const IATA_TO_DEST = new Map(
  destinations.filter((d) => d.iata).map((d) => [d.iata!.toUpperCase(), d]),
);

const SYSTEM_PROMPT = `You are Flyamba's flight search assistant — warm, curious, concise.

You are given a fixed catalog of flight destinations (JSON: each has iata, city, country, priceFromKr in Swedish kronor, category, flightHours, bestMonths, tagline). A traveler describes a trip in natural language.

Respond with PLAIN TEXT ONLY in the exact line format below — no prose, no markdown, no code fences, no blank lines. Use the "|" character only as the field separator.

Line 1 (ALWAYS present):
INTENT|<IATA or NONE>|<ORIGIN or NONE>
  - <IATA>: If the traveler clearly wants to fly to / book ONE specific destination that exists in the catalog, put that destination's exact catalog IATA code. Otherwise NONE.
  - <ORIGIN>: If the traveler states a departure city, output it as a lowercase place code "cityslug_iso2" (Oslo -> oslo_no, London -> london_gb, Stockholm -> stockholm_se, Copenhagen -> copenhagen_dk). Otherwise NONE.

Then 1 to 6 ranked lines, best fit first, each:
<IATA>|<City>|<Reason>
  - <IATA>: an exact catalog IATA code. Never invent one.
  - <City>: the catalog city name.
  - <Reason>: one short, specific sentence on why it fits.

Rules:
- Only ever use destinations and IATA codes from the provided catalog.
- Consider budget, season/month, trip length, vibe (beach, city, romantic, long-haul...), flight time, and any stated origin.
- If nothing fits well, output exactly one line: INTENT|NONE|NONE
- All text in English.`;

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

  // Optional destination context — biases the answer toward one city when the
  // widget is embedded on a destination page.
  const destination = (body?.destinationContext ?? "").trim().slice(0, 60);
  const system = destination
    ? `${SYSTEM_PROMPT}\n\nThe user is viewing the ${destination} destination page. Prioritize information about ${destination} in your responses, and lead with ${destination} in the matches when it is relevant.`
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

  // ── Parse the INTENT line ────────────────────────────────────────────
  let bookingIntent: BookingIntent | null = null;
  let matchLines = lines;

  if (lines[0]?.toUpperCase().startsWith("INTENT|")) {
    const [, rawIata, rawOrigin] = lines[0].split("|").map((s) => s.trim());
    matchLines = lines.slice(1);

    const iata = (rawIata ?? "").toUpperCase();
    const dest = iata && iata !== "NONE" ? IATA_TO_DEST.get(iata) : undefined;
    if (dest) {
      const origin = (rawOrigin ?? "").trim();
      const fromName = origin && origin.toUpperCase() !== "NONE" ? origin.toLowerCase() : undefined;
      bookingIntent = {
        iata: dest.iata!.toUpperCase(),
        city: dest.city,
        toName: dest.tpName ?? dest.iata!.toUpperCase(),
        fromName,
      };
    }
  }

  // ── Parse the ranked match lines ─────────────────────────────────────
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

  const result: AiSearchResult = { matches, bookingIntent };
  return NextResponse.json(result);
}
