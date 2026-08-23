-- ============================================
-- origin_fares.number_of_changes — how many stops the fare has
-- ============================================
-- Run in Supabase → SQL Editor. Safe to run more than once.
--
-- WHY. 17 hub pages say "with direct routes from New York, London and other
-- major hubs", and 12 carry a "Direct flights: Yes — from New York" card. Nine of
-- the seventeen are true. The rest are inherited from the Swedish site, where the
-- same sentence was written about departures from Arlanda.
--
-- We could not tell them apart. origin_fares records price, dates and airline but
-- not stops, so a New York fare to Bali proves a route exists at some price — not
-- that anyone flies it non-stop. Travelpayouts already returns
-- `number_of_changes` on every option in v1/prices/cheap; the cron read the field
-- and threw it away.
--
-- NULLABLE, AND NULL MEANS "WE DO NOT KNOW". The 5,370 rows already in the table
-- were collected without it and must not be backfilled with a guess — a default
-- of 0 would silently assert that every existing fare is a non-stop, which is the
-- exact error this column exists to stop. Only rows written after the next cron
-- run carry a value.
--
-- The rule it enables: a page may claim a non-stop from a US origin only if at
-- least one row for that (origin, slug) has number_of_changes = 0. NULL is not
-- evidence, and neither is a low price.

ALTER TABLE origin_fares ADD COLUMN IF NOT EXISTS number_of_changes smallint;

COMMENT ON COLUMN origin_fares.number_of_changes IS
  'Stops on the itinerary: 0 = non-stop. NULL = collected before the column existed; not evidence of anything.';

-- Partial index: the only query is "is there a non-stop for this pair", and the
-- non-stops are a small minority of rows.
CREATE INDEX IF NOT EXISTS idx_origin_fares_nonstop
  ON origin_fares(slug, origin)
  WHERE number_of_changes = 0;
