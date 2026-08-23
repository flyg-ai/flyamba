-- ============================================
-- fare_months — cheapest observed fare per departure month
-- ============================================
-- Run in Supabase → SQL Editor. Safe to run more than once.
--
-- SEPARATE FROM origin_fares ON PURPOSE, and not because the columns differ.
--
-- origin_fares is keyed (origin, slug, one_way, rank), where rank means "0 is the
-- cheapest right now, 1 is the next cheapest". Adding a month to that key would
-- give twelve rows with rank = 0 per pair, one per month — and every existing
-- reader does `.eq("slug", …).order("rank")` and takes `options[0]`. That would
-- silently become "cheapest in whichever month sorted first" on the 353 pages
-- showing a price. Nothing would throw and nothing would log.
--
-- The two tables also answer different questions with different lifespans.
-- origin_fares answers "what does it cost", is two rows per pair, and is what the
-- price labels read. This answers "when is it cheap", is one row per month, and is
-- what the calendar reads.
--
-- FRESHNESS IS PART OF THE DATA, NOT JUST TRACKING. fare-calendar.ts ignores rows
-- older than 30 days: a bar drawn from a price last seen in May is not a price.
-- Every rendered bar and row carries its own `fetched_at` as a "seen" date, for
-- the same reason the cards do — 14 CFR 399.84 applies to a chart as much as to a
-- label.

CREATE TABLE IF NOT EXISTS fare_months (
  origin text NOT NULL,
  slug text NOT NULL,
  -- First day of the departure month, so the key is a date rather than a string.
  month date NOT NULL,
  price_usd integer NOT NULL,
  depart_date date,
  return_date date,
  airline text,
  flight_number text,
  -- Always false today. Explicit for the same reason origin_fares has it: calling
  -- a round-trip-derived fare "one way" is a deceptive practice, so the column
  -- forces the reader to know which it has.
  one_way boolean NOT NULL DEFAULT false,
  -- When we saw this price. Read as a freshness cut-off, not only as provenance.
  fetched_at timestamptz NOT NULL DEFAULT now(),
  -- No `rank`. One row per month is the whole point of the table, and reusing the
  -- name would have given it a second meaning in a second place.
  PRIMARY KEY (origin, slug, month, one_way)
);

CREATE INDEX IF NOT EXISTS idx_fare_months_lookup ON fare_months(slug, origin, one_way, month);
-- The calendar filters on age before it groups, so this index carries the cut-off.
CREATE INDEX IF NOT EXISTS idx_fare_months_fresh ON fare_months(slug, fetched_at DESC);

ALTER TABLE fare_months DISABLE ROW LEVEL SECURITY;
