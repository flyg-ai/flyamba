import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import {
  getComparable,
  STYLE_KEYS,
  MONTH_SLUGS,
  TRAVEL_STYLES,
  type Comparable,
} from "@/app/compare/comparable";
import { usd } from "@/app/lib/format";
import { getCachedResponse, saveCachedResponse } from "@/app/lib/ai-cache";

// Anthropic SDK needs the Node.js runtime.
export const runtime = "nodejs";

// Which destination should the traveler pick? Ports flyg.ai's
// /api/jamfor-recommend, with two changes: preferences are the same six
// `scores` keys the comparison table already shows (so the model reasons over
// numbers the visitor can see), and the response is the codebase's pipe format
// rather than JSON, matching /api/ai-search.

const MAX_DESTS = 4;

export type CompareRecommendation = {
  intro: string;
  winner: { slug: string; reason: string };
  alternatives: { slug: string; reason: string }[];
};

const SYSTEM_PROMPT = `You are Flyamba's travel advisor. The traveler is comparing destinations and wants a straight answer about which to pick.

You are given the shortlist as JSON — each entry has slug, name, country, priceFromUsd (cheapest fare), flightTime, bestMonths, summerTemp (°C in summer), tripType, and scores out of 10 for beaches, nightlife, food, activities, family and value.

RULES:
- Pick exactly ONE winner from the shortlist. Never invent a destination, never refuse to choose, never call it a tie.
- Justify with the data you were given — a price, a score, a temperature, a month. Concrete beats atmospheric.
- If the traveler stated preferences, weight those scores above everything else and say so.
- If a month is given, weigh whether each destination is actually good then — a beach city out of season is a bad pick however high it scores.
- Every other destination on the shortlist gets one line saying who SHOULD pick it instead. Never dismiss one outright.
- Be honest about trade-offs. "Cheaper but colder" is more useful than pretending the winner wins on everything.

RESPONSE FORMAT — one item per line, pipe-separated, NOTHING else (no prose, no markdown, no code fences, no blank lines). Use "|" only as the field separator.

INTRO|<one sentence framing the choice, max 25 words>
WINNER|<slug>|<two sentences on why it wins for this traveler>
ALT|<slug>|<one sentence on who should pick this one instead>

One ALT line per remaining destination, in shortlist order.

STYLE: natural, everyday English. Concrete words ("cheaper", "warmer", "livelier") over vague ones ("vibrant", "unforgettable"). Address the traveler as "you".

Example:
INTRO|Both are warm and walkable, so it comes down to whether you want beaches or museums.
WINNER|barcelona|Barcelona wins on value — fares from $123 against Rome's $180, and it scores 9 for beaches to Rome's 3. You get a genuine city break and a swimmable beach in the same trip.
ALT|rome|Pick Rome if the history is the point — it scores 10 for activities, and you will not miss the sea in April.`;

function context(d: Comparable) {
  return {
    slug: d.slug,
    name: d.name,
    country: d.country,
    // Observed New York fare, already USD. Null when we hold none — the model
    // is told nothing rather than a Stockholm estimate.
    priceFromUsd: d.priceUsd ?? null,
    flightTime: d.flightTime ?? null,
    bestMonths: d.bestMonths ?? null,
    summerTemp: d.summerTemp ?? null,
    tripType: d.category ?? null,
    scores: d.scores ?? null,
  };
}

/** Parse the pipe format. Slugs outside `allowed` are dropped as hallucinations. */
function parseRecommendation(text: string, allowed: Set<string>): CompareRecommendation | null {
  const lines = text
    .replace(/```[a-z]*\n?/gi, "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  let intro = "";
  let winner: { slug: string; reason: string } | null = null;
  const alternatives: { slug: string; reason: string }[] = [];

  for (const line of lines) {
    const parts = line.split("|").map((s) => s.trim());
    const tag = parts[0].toUpperCase();

    if (tag === "INTRO" && parts[1]) {
      intro = parts.slice(1).join("|");
    } else if (tag === "WINNER" && parts[1] && parts[2]) {
      const slug = parts[1].toLowerCase();
      if (allowed.has(slug) && !winner) winner = { slug, reason: parts.slice(2).join("|") };
    } else if (tag === "ALT" && parts[1] && parts[2]) {
      const slug = parts[1].toLowerCase();
      if (allowed.has(slug)) alternatives.push({ slug, reason: parts.slice(2).join("|") });
    }
  }

  // A recommendation without a winner is useless — treat it as a failed generation
  // rather than shipping a half-answer.
  if (!winner) return null;

  return {
    intro,
    winner,
    // The winner must never also appear as an alternative, and each slug once.
    alternatives: alternatives
      .filter((a) => a.slug !== winner.slug)
      .filter((a, i, arr) => arr.findIndex((x) => x.slug === a.slug) === i),
  };
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const params = req.nextUrl.searchParams;

  const slugs = (params.get("dest") ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
    .filter((s, i, arr) => arr.indexOf(s) === i)
    .slice(0, MAX_DESTS);

  const dests = slugs.map(getComparable).filter((d): d is Comparable => Boolean(d));
  if (dests.length < 2) {
    return NextResponse.json({ error: "Need at least 2 known destinations" }, { status: 400 });
  }

  // Preferences. Unknown style keys and month names are dropped rather than
  // rejected — a stale bookmark shouldn't 400.
  const styles = (params.get("style") ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter((s) => STYLE_KEYS.has(s))
    .filter((s, i, arr) => arr.indexOf(s) === i)
    .sort();

  const monthParam = (params.get("month") ?? "").trim().toLowerCase();
  const month = MONTH_SLUGS.includes(monthParam) ? monthParam : null;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Missing ANTHROPIC_API_KEY" }, { status: 500 });

  const allowed = new Set(dests.map((d) => d.slug));

  // Cache key: destinations sorted (so ?dest=a,b and ?dest=b,a share a row),
  // plus the sorted preferences. Stored in ai_chat_cache under the "compare"
  // page bucket, same table as the AI search.
  const cacheKey = [
    [...allowed].sort().join(","),
    styles.join(","),
    month ?? "",
  ].join("|");

  const cached = await getCachedResponse(cacheKey, "compare");
  if (cached?.ai_response_text) {
    const rec = parseRecommendation(cached.ai_response_text, allowed);
    if (rec) {
      return NextResponse.json(
        { recommendation: rec },
        { headers: { "x-flyamba-cache": "hit" } },
      );
    }
  }

  const styleLabels = TRAVEL_STYLES.filter((s) => styles.includes(s.key)).map((s) => s.label);
  const preferences: string[] = [];
  if (styleLabels.length) preferences.push(`They care most about: ${styleLabels.join(", ")}.`);
  if (month) preferences.push(`They are travelling in ${month[0].toUpperCase()}${month.slice(1)}.`);
  if (!preferences.length) preferences.push("They stated no particular preference — give a general recommendation.");

  const client = new Anthropic({ apiKey });
  const response = await client.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 700,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Shortlist:\n${JSON.stringify(dests.map(context))}\n\n${preferences.join(" ")}`,
      },
    ],
  });

  const text = response.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n");

  const rec = parseRecommendation(text, allowed);
  if (!rec) {
    return NextResponse.json({ error: "Could not generate a recommendation" }, { status: 502 });
  }

  await saveCachedResponse({
    queryText: cacheKey,
    intentBucket: styles[0] ?? "city-break",
    destinationSlugs: [...allowed].sort(),
    aiResponseText: text,
    categoryPage: "compare",
  });

  return NextResponse.json({ recommendation: rec }, { headers: { "x-flyamba-cache": "miss" } });
}
