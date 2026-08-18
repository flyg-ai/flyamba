import crypto from "crypto";
import { supabase, isSupabaseConfigured } from "./supabase";

// ─────────────────────────────────────────────────────────────────────────
// AI response cache — ported from flyg-ai/lib/ai-cache.ts
//
// EXACT HASH MATCHING ONLY. flyg-ai originally also served responses by
// "intent bucket" similarity; that was removed there because two queries in
// the same bucket ("sun and beach Spain" vs. "weekend in Amsterdam") are not
// equivalent, so the first query in a bucket won and every later one got its
// answer. Do not reintroduce bucket-based serving. A real semantic cache
// needs embedding similarity, not bucket equality.
//
// The bucket is still stored as a tag (useful for later analysis), but unlike
// flyg-ai it is derived from local keywords instead of a Claude Haiku call.
// flyg-ai spends an extra API call per uncached search on a label nothing
// reads — which works against the entire point of the cache.
//
// Cache failures are never fatal: every function degrades to "miss" and lets
// the caller fall through to a live API call.
// ─────────────────────────────────────────────────────────────────────────

export const INTENT_BUCKETS = [
  "romantic", "budget", "sun-beach", "culture-history",
  "family", "adventure", "nightlife", "food-drink", "sport",
  "nature", "city-break", "beach", "direct-flight", "long-haul",
  "winter-sun", "autumn", "spring", "summer",
] as const;

export type IntentBucket = (typeof INTENT_BUCKETS)[number];

// Keyword → bucket, first match wins. Order matters: more specific first.
const BUCKET_KEYWORDS: Array<[IntentBucket, RegExp]> = [
  ["romantic", /\b(romantic|honeymoon|couple|anniversary)\b/i],
  ["winter-sun", /\b(winter sun|escape winter|warm in (december|january|february))\b/i],
  ["nightlife", /\b(nightlife|party|clubs?|clubbing|bars?)\b/i],
  ["food-drink", /\b(food|foodie|cuisine|restaurants?|wine|culinary|eat)\b/i],
  ["family", /\b(family|kids?|children|toddler)\b/i],
  ["adventure", /\b(adventure|hiking|trek|surf|diving|adrenaline)\b/i],
  ["nature", /\b(nature|wildlife|mountains?|national park|scenery)\b/i],
  ["sport", /\b(ski|skiing|snowboard|golf|marathon|football|match)\b/i],
  ["culture-history", /\b(culture|cultural|history|historic|museum|ancient|art)\b/i],
  ["sun-beach", /\b(sun|sunny|beach|beaches|island|coast|seaside)\b/i],
  ["budget", /\b(cheap|budget|affordable|low ?cost|bargain|under \$?\d+)\b/i],
  ["long-haul", /\b(long ?haul|far away|asia|australia|caribbean|south america)\b/i],
  ["direct-flight", /\b(direct|non ?stop|no layover)\b/i],
  ["summer", /\b(summer|june|july|august)\b/i],
  ["autumn", /\b(autumn|fall|september|october|november)\b/i],
  ["spring", /\b(spring|march|april|may)\b/i],
];

/** Local, zero-cost intent tag. Stored for analysis only — never used to serve. */
export function classifyIntent(queryText: string): IntentBucket {
  for (const [bucket, re] of BUCKET_KEYWORDS) {
    if (re.test(queryText)) return bucket;
  }
  return "city-break";
}

/**
 * Cache key. Lowercased + whitespace-collapsed so "Cheap  Europe" and
 * "cheap europe" share a row. Nothing smarter than that on purpose.
 */
function hashQuery(queryText: string): string {
  const normalized = queryText.toLowerCase().replace(/\s+/g, " ").trim();
  return crypto.createHash("md5").update(normalized).digest("hex");
}

export type CachedSearchRow = {
  id: string;
  query_text: string;
  destination_slugs: string[] | null;
  ai_response_text: string | null;
  intent_bucket: string | null;
  hit_count: number;
  created_at: string;
};

/**
 * Look up a cached AI search response.
 *
 * @param queryText    the traveler's raw query
 * @param categoryPage page context the answer was generated for ("home", or a
 *                     destination slug). Part of the key: the same query on the
 *                     Barcelona page produces a different answer than on home.
 * @returns the cached row, or null on miss / misconfiguration / error
 */
export async function getCachedResponse(
  queryText: string,
  categoryPage: string,
): Promise<CachedSearchRow | null> {
  if (!isSupabaseConfigured || !supabase) return null;

  const hash = hashQuery(queryText);

  const { data, error } = await supabase
    .from("ai_chat_cache")
    .select("id, query_text, destination_slugs, ai_response_text, intent_bucket, hit_count, created_at")
    .eq("query_hash", hash)
    .eq("category_page", categoryPage)
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();

  if (error) {
    console.error("[ai-cache] select failed:", error.message, error.code);
    return null;
  }
  if (!data) return null;

  const row = data as CachedSearchRow;

  // Fire-and-forget hit counter — a failed increment must not fail the request.
  void supabase
    .from("ai_chat_cache")
    .update({ hit_count: (row.hit_count ?? 0) + 1 })
    .eq("id", row.id)
    .then(({ error: updErr }) => {
      if (updErr) console.error("[ai-cache] hit_count update failed:", updErr.message);
    });

  return row;
}

/** Store a fresh AI search response. Errors are logged, never thrown. */
export async function saveCachedResponse({
  queryText,
  intentBucket,
  destinationSlugs,
  aiResponseText,
  categoryPage,
}: {
  queryText: string;
  intentBucket: string;
  destinationSlugs: string[];
  aiResponseText: string;
  categoryPage: string;
}): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;

  const { error } = await supabase.from("ai_chat_cache").upsert(
    {
      query_hash: hashQuery(queryText),
      intent_bucket: intentBucket,
      query_text: queryText,
      destination_slugs: destinationSlugs,
      ai_response_text: aiResponseText,
      category_page: categoryPage,
      // Never expires — far-future sentinel keeps the read-side guard passing.
      expires_at: "2099-12-31T23:59:59.000Z",
    },
    { onConflict: "query_hash,category_page" },
  );

  if (error) console.error("[ai-cache] upsert failed:", error.message, error.code);
}

// ─────────────────────────────────────────────────────────────────────────
// Per-destination chat cache (/api/destination-chat)
// ─────────────────────────────────────────────────────────────────────────

const DESTINATION_CHAT_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function normalizeQuestion(question: string): string {
  return question.toLowerCase().replace(/\s+/g, " ").trim();
}

/** Returns a cached answer if one exists and is younger than the TTL. */
export async function getCachedDestinationChat(
  slug: string,
  question: string,
): Promise<string | null> {
  if (!isSupabaseConfigured || !supabase) return null;

  const { data, error } = await supabase
    .from("destination_chat_cache")
    .select("response, created_at")
    .eq("slug", slug)
    .eq("query", normalizeQuestion(question))
    .maybeSingle();

  if (error) {
    console.error("[destination-cache] select failed:", error.message);
    return null;
  }
  if (!data?.response) return null;

  // TTL enforced in code so stale rows can be refreshed in place by upsert.
  const age = Date.now() - new Date(data.created_at as string).getTime();
  if (age > DESTINATION_CHAT_TTL_MS) return null;

  return data.response as string;
}

/** Store (or refresh) a destination chat answer. Errors are logged, never thrown. */
export async function saveCachedDestinationChat(
  slug: string,
  question: string,
  response: string,
): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;

  const { error } = await supabase.from("destination_chat_cache").upsert(
    {
      slug,
      query: normalizeQuestion(question),
      response,
      // Reset the clock so a refreshed answer gets a full TTL window.
      created_at: new Date().toISOString(),
    },
    { onConflict: "slug,query" },
  );

  if (error) console.error("[destination-cache] upsert failed:", error.message);
}
