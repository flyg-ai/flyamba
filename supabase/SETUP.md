# Supabase setup — Flyamba

Everything in code is done. These are the manual steps only you can do.

## 1. Create the project

New Supabase **organisation** for Flyamba (separate from flyg.ai), then a project inside it.
Pick a region close to the main audience — `us-east-1` for a US-first launch, `eu-west-2` (London) if UK/EU traffic dominates.

## 2. Run the schema

Supabase → **SQL Editor** → **New query** → paste all of `supabase/schema.sql` → **Run**.

Creates four tables: `ai_chat_cache`, `destination_chat_cache`, `guide_chat_cache`, `daily_prices`.
The file is idempotent — re-running it is safe.

## 3. Copy credentials

Supabase → **Settings** → **API**. Add to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
```

The service role key bypasses RLS — it must never appear in a `"use client"` file.
`app/lib/supabase-server.ts` is the only place that reads it.

Add the same three to **Vercel → Project → Settings → Environment Variables** (Production + Preview)
or the cache will silently no-op in deployment.

## 4. Install the dependency

```
npm install
```

`@supabase/supabase-js@^2.100.0` was added to `package.json` — same version flyg.ai runs.

## 5. Verify

```
npm run dev
```

Run the same AI search twice on the homepage. Check the response header:

- first call → `x-flyamba-cache: miss`
- second call → `x-flyamba-cache: hit` (and it should return noticeably faster)

Then confirm the row landed: Supabase → **Table Editor** → `ai_chat_cache`. A repeated
search increments `hit_count` rather than adding a row.

If nothing is written, Supabase is simply unconfigured — the app is built to degrade
silently rather than fail. Look for `[ai-cache]` lines in the server console.

---

## How the cache works

**Exact hash matching only**, same as flyg.ai. The key is
`md5(lowercased, whitespace-collapsed query)` + `category_page`.

`category_page` is `"home"` or a destination slug, because the same query
answered on `/barcelona` is not the same answer as on the homepage.

There is deliberately **no semantic matching**. flyg.ai tried serving by "intent
bucket" and had to disable it: two queries in one bucket ("sun and beach Spain"
vs "weekend in Amsterdam") are not equivalent, so the first query in a bucket won
and every later one got its answer. That warning is repeated in
`app/lib/ai-cache.ts` — don't reintroduce it. Real semantic matching needs
embedding similarity, not bucket equality.

## Deviations from flyg.ai (deliberate)

| | flyg.ai | Flyamba | Why |
|---|---|---|---|
| Cache errors | `throw` | log + fall through | A Supabase outage shouldn't 500 the search |
| Unconfigured Supabase | crashes on `!` assertion | no-ops | Local dev and preview builds work without it |
| `intent_bucket` | extra Claude Haiku call per search | local keyword match | The old call cost an API request for a label nothing reads — the opposite of the point |
| Bucket names | Swedish | English | It's an English site |
| `daily_prices` unique key | `(slug, departure_date)` | `(slug, origin, departure_date)` | Flyamba has an origin selector; the flyg.ai key breaks on a second origin |
| `daily_prices.origin` default | `ARN` | `LON` | International audience, not Stockholm |
| `ADD CONSTRAINT` | fails on re-run | wrapped in a guard | Makes the schema re-runnable |

## Not done yet

`daily_prices` exists as a table but nothing writes to it. That needs a cron route
(`/api/cron/prices`) hitting Travelpayouts for the top destinations, plus
`CRON_SECRET` and a `vercel.json` schedule — same shape as flyg.ai's. Say the word
and it's maybe an hour of work.
