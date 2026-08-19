-- ============================================
-- origin_fares — the "from $X" number, per origin
-- ============================================
-- Run in Supabase → SQL Editor. Safe to run more than once.
--
-- Why this exists: every "from $X" on the site came from
-- ALL_DESTINATIONS.monthlyPrices — 12-month average ROUND-TRIP fares from
-- Stockholm, in SEK, converted at a hard-coded rate, and labelled "one way" on
-- the card. Four things wrong in one number, all inherited from flyg.ai where
-- the whole audience does fly from Arlanda.
--
-- This table holds real fares per origin airport, in USD, each with the dates
-- they are for — because a round-trip price with no dates attached does not
-- mean anything.
--
-- `rank` is 0 for the cheapest option and 1 for the next cheapest, so a card can
-- show an alternative date pair without a second query.

CREATE TABLE IF NOT EXISTS origin_fares (
  origin text NOT NULL,
  slug text NOT NULL,
  -- 0 = cheapest, 1 = second cheapest. Two is enough for a card.
  rank smallint NOT NULL CHECK (rank >= 0 AND rank <= 4),
  price_usd integer NOT NULL,
  depart_date date,
  return_date date,
  airline text,
  flight_number text,
  -- True one-way fare rather than a round trip. Kept explicit because calling a
  -- round-trip-derived fare "one way" is a deceptive practice under 14 CFR
  -- 399.84 — the column forces the card to know which it is showing.
  one_way boolean NOT NULL DEFAULT false,
  found_at timestamptz,
  fetched_at timestamptz DEFAULT now(),
  PRIMARY KEY (origin, slug, one_way, rank)
);

CREATE INDEX IF NOT EXISTS idx_origin_fares_lookup ON origin_fares(origin, slug, one_way, rank);
CREATE INDEX IF NOT EXISTS idx_origin_fares_slug ON origin_fares(slug);

ALTER TABLE origin_fares DISABLE ROW LEVEL SECURITY;
