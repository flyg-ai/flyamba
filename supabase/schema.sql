-- ============================================
-- Flyamba Supabase Schema
-- ============================================
-- Ported from the flyg-ai sibling project (supabase/schema.sql), trimmed to
-- the two things Flyamba actually needs today: AI response caching and
-- pre-fetched daily prices. Analytics (searches, destination_clicks) and
-- price_alerts were deliberately left out — add them when there's a feature
-- that reads them.
--
-- Safe to run more than once: every statement is idempotent.
-- Run in Supabase → SQL Editor → New query → paste → Run.

-- ────────────────────────────────────────────
-- 1. AI search cache (/api/ai-search)
-- ────────────────────────────────────────────
-- One row per (normalized query, page context). Stores the raw pipe-format
-- model output so a cache hit can be re-parsed through the exact same parser
-- as a fresh response — no second serialization format to keep in sync.
CREATE TABLE IF NOT EXISTS ai_chat_cache (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  query_hash text NOT NULL,
  intent_bucket text NOT NULL,
  query_text text NOT NULL,
  destination_slugs jsonb,
  ai_response_text text,
  category_page text,
  hit_count integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  -- Cache entries never expire — far-future sentinel. The app also writes this
  -- value explicitly on save, so the read-side guard `expires_at > now()`
  -- always passes. Kept so a TTL can be introduced later without a migration.
  expires_at timestamptz DEFAULT '2099-12-31 23:59:59+00'
);

CREATE INDEX IF NOT EXISTS idx_ai_chat_cache_hash ON ai_chat_cache(query_hash);
CREATE INDEX IF NOT EXISTS idx_ai_chat_cache_bucket ON ai_chat_cache(intent_bucket, category_page);

-- Unique constraint required for the ON CONFLICT upsert, scoped per page.
-- Wrapped in a guard because ADD CONSTRAINT has no IF NOT EXISTS form.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'ai_chat_cache_hash_page_unique'
  ) THEN
    ALTER TABLE ai_chat_cache
      ADD CONSTRAINT ai_chat_cache_hash_page_unique UNIQUE (query_hash, category_page);
  END IF;
END $$;

ALTER TABLE ai_chat_cache DISABLE ROW LEVEL SECURITY;

-- ────────────────────────────────────────────
-- 2. Per-destination chat cache (/api/destination-chat)
-- ────────────────────────────────────────────
-- TTL is enforced in code (7 days) by comparing created_at. Stale rows are
-- kept and refreshed in place via upsert rather than deleted.
CREATE TABLE IF NOT EXISTS destination_chat_cache (
  slug text NOT NULL,
  query text NOT NULL,
  response text NOT NULL,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (slug, query)
);

ALTER TABLE destination_chat_cache DISABLE ROW LEVEL SECURITY;

-- ────────────────────────────────────────────
-- 3. Permanent guide chat cache (/guides)
-- ────────────────────────────────────────────
-- No TTL — guide answers are evergreen.
CREATE TABLE IF NOT EXISTS guide_chat_cache (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  destination_slug text NOT NULL,
  question_normalized text NOT NULL,
  answer text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(destination_slug, question_normalized)
);

ALTER TABLE guide_chat_cache DISABLE ROW LEVEL SECURITY;

-- ────────────────────────────────────────────
-- 4. Daily pre-fetched prices (PriceCalendar / "from $X")
-- ────────────────────────────────────────────
-- Origin defaults to LON rather than flyg-ai's ARN: Flyamba's audience is
-- international (US/UK first), not Stockholm.
CREATE TABLE IF NOT EXISTS daily_prices (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL,
  origin text NOT NULL DEFAULT 'LON',
  price_from integer,
  departure_date date,
  return_date date,
  airline text,
  direct_flight boolean,
  fetched_at timestamptz DEFAULT now(),
  valid_date date DEFAULT CURRENT_DATE
);

CREATE INDEX IF NOT EXISTS idx_daily_prices_slug ON daily_prices(slug, valid_date);
CREATE INDEX IF NOT EXISTS idx_daily_prices_slug_depdate ON daily_prices(slug, departure_date);

-- Unique index required for ON CONFLICT upserts keyed by (slug, origin, departure_date).
-- Note: flyg-ai keys on (slug, departure_date) only, which breaks as soon as a
-- second origin is written. Flyamba has an origin selector from day one, so
-- origin is part of the key here.
CREATE UNIQUE INDEX IF NOT EXISTS idx_daily_prices_slug_origin_dep_unique
  ON daily_prices(slug, origin, departure_date);

ALTER TABLE daily_prices DISABLE ROW LEVEL SECURITY;
