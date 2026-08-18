@AGENTS.md

# Flyamba

English-language AI flight & destination site — **flyamba.com**. Next.js 16.2.11 (App Router),
React 19.2.4, TypeScript strict, Tailwind v4, deployed on Vercel (project `flyamba`).

Sibling project: **flyg.ai** (Swedish market) at `C:\Users\hallb\Desktop\flyg-ai\flyg-ai`.
Flyamba was largely ported from it, so when a feature already exists there, read that
implementation first — but check its comments, some of it is disabled or known-broken.
Flyamba targets the international market (US/UK first); flyg.ai targets Sweden.

## Commands

```
npm run dev      # dev server — .claude/launch.json pins port 3100
npm run build
npm run lint
```

No test script and **no typecheck script**. `npx tsc --noEmit` is the only type check.

## Read this before touching anything

**`AGENTS.md` is not decoration.** This is Next.js 16 — APIs and conventions differ from
what you probably remember. Read `node_modules/next/dist/docs/` before writing route,
metadata, or config code.

Three things that look like bugs and are not:

- **`proxy.ts` at the repo root is the middleware.** Next 16 renamed `middleware.ts` → `proxy.ts`.
  Do not "restore" it. It 308-redirects any path containing uppercase to lowercase.
- **`PrisKalender.tsx`** is Swedish for "price calendar". The filename is deliberate — it is
  the ported flyg.ai component and renaming it means touching every import.
- **`app/sitemap.ts` reads the filesystem at build time** (`fs.readdirSync` over `app/`) to
  discover city hubs and subpages. Adding a new top-level `app/<dir>/page.tsx` that is *not*
  a city means adding it to `STATIC_ROUTES` in that file, or it gets sitemapped as a
  destination hub.

## The Swedish-filename trap

Slugs and UI are English. **Many image files and folders on disk are still Swedish** from the
flyg.ai import. This is the single most common source of broken images here — three of the
four broken paths found in Aug 2026 were exactly this.

Files: `flights-kapstaden.avif` (Cape Town), `flights-lissabon` (Lisbon), `flights-rom` (Rome —
`flights-rome.avif` does **not** exist), `flights-prag`, `flights-teneriffa`, `flights-wien`,
`flights-florens`, `flights-aten` (both `-aten` and `-athens` exist), `flights-munchen`,
`flights-kopenhamn`, `flights-bryssel`, `flights-goteborg`.

Folders, both spellings live on disk simultaneously: `sevardheter/` ≈ `attractions/`,
`dagsutflykter/` ≈ `day-trips/`, `strander/` ≈ `beaches/`, `restauranger/`, `nattliv/`,
`hotell/`, `med-barn/`.

Individual photos too: `tokyo/sevardheter/meiji-helgedomen.webp`,
`rome/sevardheter/spanska-trappan.webp` (Spanish Steps),
`barcelona/attractions/gotiska-kvarteren.webp` (Gothic Quarter).

Swedish slugs still live as URLs in `ALL_DESTINATIONS`: `kreta`, `rhodos`, `korfu`, `cypern`,
`maldiverna`, `seychellerna`, `azorerna`, `sicilien`, `toscana`, `brygge`, `antwerpen`, `haag`,
`korsika`, `kappadokien`.

**Never assume an image path from a slug — list the directory first.**
`next.config.ts` holds 21 `SLUG_REDIRECTS` (`/rom → /rome` etc.); new renames go there.

## Routes

376 `page.tsx`, 3 `route.ts`. 356 of the pages are city hub/subpages.

**Static:** `/` `/about` `/contact` `/privacy` `/terms` `/cookies` `/explore` `/compare`
`/guides` `/low-fare-calendar`

**28 city hubs** (literal route segments, no `generateStaticParams`):
`amsterdam athens bali bangkok barcelona cancun cape-town dubai dubrovnik florence ibiza
lisbon london madrid marrakech mykonos new-york palma paris phuket prague reykjavik rome
santorini singapore tenerife tokyo vienna`

Subpages are **not** uniform:
- 20 cities have 12: `attractions beaches day-trips events hotels nightlife prices
  restaurants shopping transport weather with-kids`
- 7 have no `beaches`: amsterdam, florence, london, madrid, paris, prague, vienna
- new-york has `beaches` but no `events`

Subpage shell: `CityGuideShell` + `CitySubNav` everywhere **except Barcelona**, which still
uses the legacy `GuideShell` + `BarcelonaSubNav`.

**Airlines:** only `/{ryanair,easyjet,british-airways,klm,lufthansa,norwegian}/low-fare-calendar`.
There are no airline root pages.

**Dynamic:** `/[slug]` (`generateStaticParams`, `dynamicParams = false`) — every slug in
`destinations` ∪ `ALL_DESTINATIONS` minus the 28 hub slugs; renders `DestinationDetail` for
rich slugs, `DestinationLite` otherwise. `/[slug]/[category]` is a `noindex` "coming soon" stub.
`/guides/[slug]` and `/low-fare-calendar/[slug]` are both static + `dynamicParams = false`.

**API** (`runtime = "nodejs"`):
- `/api/ai-search` — Anthropic `claude-haiku-4-5`, pipe-format protocol
  (`INTENT|…`, `HEADLINE|…`, `<IATA>|<City>|<why>`, `FOLLOW|…`, or a single `CONV|…`).
  Catalog = the 8 rich destinations. Supabase-cached.
- `/api/destination-chat` — per-destination Q&A behind `AskAiWidget`. Cached, 7-day TTL.
- `/api/tp-calendar` — Travelpayouts `v1/prices/calendar` proxy, `revalidate = 86400`.
  Origin from `x-vercel-ip-country` / `cf-ipcountry` → `ORIGIN_BY_COUNTRY`, fallback `LON`.

## Data

**`app/data/destinations.ts`** — `destinations: Destination[]`, only **8 entries**
(barcelona, tokyo, lisbon, new-york, bali, cape-town, reykjavik, marrakech) but very rich
(~60 optional fields: monthlyPrices, faqs, neighborhoods, dayTrips, scores…).
This is the catalog `/api/ai-search` reasons over.

**`app/data/all-destinations.ts`** — `ALL_DESTINATIONS: AllDestination[]`, **550 slim entries**
(`slug, name, country, continent, iata, tpName, monthlyPrices[12], image, thumbnail, scores?,
summerTemp?`). Auto-generated; the generator script is **not in the repo**. Only ~20 entries
carry `scores` — which is why `/compare` can only offer ~21 cities.

**`app/data/guides.ts`** — 8 articles, `content` is a raw HTML string.

**28 `<city>-places.ts`** (122–244 KB each, ~4.6 MB total). All share **`BcnPlace`**, defined
once in `barcelona-places.ts` and imported by the other 27. Standard exports:
`ATTRACTIONS RESTAURANTS HOTELS NIGHTLIFE SHOPPING WITH_KIDS DAY_TRIPS` (+ `BEACHES` where
applicable, + `TRANSPORT PRICES WEATHER EVENTS` in 10 files).

Each file declares module-local image-path helpers whose **names vary but folders are what
matter**: `SEV`/`SV`/`A`/`ATT` → attractions, `DAG`/`DAY`/`TRIP` → day trips,
`RES`/`REST` → restaurants, `HOT` → hotels, `NAT`/`NIGHT` → nightlife, `KID` → with-kids,
`BEA`/`STR` → beaches. Category-nav export is inconsistently named (`CATEGORIES`, but
`PRAGUE_CATEGORIES` / `IBIZA_CATEGORIES` / `PALMA_CATEGORIES`); Barcelona, Bangkok and
Santorini keep theirs in `app/lib/<city>.ts` instead.

## Conventions

- **Imports:** `@/*` → repo root. Always `@/app/components/X`, `@/app/data/x-places`, `@/app/lib/x`.
- **`SITE`** lives in `app/lib/destination-helpers.ts` (`https://flyamba.com`). Import it —
  three files (`tokyo/page.tsx`, `london/page.tsx`, `tokyo/attractions/page.tsx`) redeclare it
  locally; don't copy that.
- **Metadata:** static pages export a `metadata` object with `alternates.canonical`;
  data-derived pages use `generateMetadata` wrapped in `clampTitle()` / `clampDescription()`
  from `app/lib/seo.ts` (60 / 155 char limits), with `robots: { index: false }` on not-found.
- **JSON-LD** inline via `dangerouslySetInnerHTML` with `.replace(/</g, "\\u003c")`.
  Types in use: BreadcrumbList, TouristDestination, TouristAttraction, FAQPage, WebSite.
- **Currency: data is SEK, display is USD.** `destinations.price` and
  `ALL_DESTINATIONS.monthlyPrices` are SEK; convert with `usd()` / `usdStr()` from
  `app/lib/format.ts` (fixed `SEK_PER_USD = 10.5`). Exceptions: `lib/santorini.ts` `monthlyUsd`
  is already USD, and place-level prices in `<city>-places.ts` are free-text local currency.
- **Images:** `public/images/destinations/` is 100% `.avif`, named `flights-<slug>.avif` +
  `flights-<slug>-thumb.avif` (hero ~1600px, thumb 450×300). City place photos are `.webp`
  under `public/images/<city>/<category>/`. `SmartImage` falls back to
  `/images/destinations/placeholder.avif` on error.

## Monetization

Travelpayouts marker **`711264.flyamba`**, `trs=508580`, everywhere.

- Tiqets (attractions/day-trips): the `tiqets()` helper redeclared in every places file →
  `https://tp.media/r?campaign_id=89&marker=711264.flyamba&p=2074&trs=508580&u=<encoded tiqets search>`
- Kiwi deep link from `PrisKalender`: `tp.media/r?…&p=4478&u=<encoded kiwi.com/deep?…>`
- Aviasales widget: `tpwdg.com/content?…&shmarker=711264.flyamba&…&campaign_id=111&promo_id=4478`
- **Skyscanner links are non-affiliate** and intentionally `rel="nofollow noopener"`.

## Supabase

Added Aug 2026. Separate Supabase organisation from flyg.ai.

`supabase/schema.sql` (idempotent) creates `ai_chat_cache`, `destination_chat_cache`,
`guide_chat_cache`, `daily_prices`. Only the first two are used today.
`supabase/SETUP.md` has the manual steps.

`app/lib/ai-cache.ts` — **exact hash matching only** (md5 of lowercased, whitespace-collapsed
query + `category_page`). Cache functions **never throw**; a miss, an error or unconfigured
Supabase all fall through to a live API call. Verify with the `x-flyamba-cache: hit|miss`
response header.

**Do not add bucket-based semantic matching.** flyg.ai tried it and had to disable it: two
queries in one intent bucket are not equivalent, so the first query in a bucket won and every
later one got its answer. Real semantic matching needs embedding similarity. The warning is
repeated in `ai-cache.ts` — leave it there.

`app/lib/supabase-server.ts` uses the service-role key. **Never import it from a
`"use client"` file.**

## Env

`ANTHROPIC_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`SUPABASE_SERVICE_ROLE_KEY`, `TRAVELPAYOUTS_API_TOKEN`, `TRAVELPAYOUTS_ORIGIN`.
All optional at build time — every consumer degrades gracefully. Vercel needs the same set.

## Current state

**Done:** 28 hubs + subpages, 8 guides, low-fare calendar (22 destinations + 6 airlines),
AI search with Supabase caching, sitemap/robots, 21 legacy-slug redirects.

**`/compare` is minimal.** One client-rendered route, state in `?d=slug1,slug2` (max 4),
picker limited to the ~21 cities that have `scores`. Renders a comparison table plus score
dots. There are **no static per-pair pages and no AI involvement at all**.

Known quirk: the price row does `usdStr(d.priceUsd * 10.5)` — re-multiplying an already
converted value so `usdStr` can divide it back. Fix if you touch that file.

**Next up:**

1. **Static compare pages.** flyg.ai's model: `app/jamfor/pairs.ts` holds `TOP_PAIRS`
   (130 slugs like `barcelona-eller-rom`) consumed by both `app/jamfor/[comparison]/page.tsx`
   and the sitemap, kept dependency-free on purpose. Flyamba equivalent would be
   `app/compare/pairs.ts` with `<a>-vs-<b>` slugs.
2. **AI recommendation on compare.** flyg.ai's `app/jamfor/AiRecommendation.tsx` +
   `/api/jamfor-recommend`: user picks month + travel styles, route returns
   `{ intro, winner: {slug, reason}, alternatives: [{slug, reason}] }`, cached per
   (sorted slugs + intents + month). Dynamic `/jamfor` auto-generates on mount; static pair
   pages show a lazy CTA card instead. Port both behaviours.
3. **`daily_prices` has no writer.** Needs a `/api/cron/prices` route hitting Travelpayouts
   plus `CRON_SECRET` and a `vercel.json` schedule — same shape as flyg.ai's.
4. **9 destinations still on placeholder images** — see `scripts/missing-images.txt`.
   No source photo exists in either project.
5. **2 Lisbon attractions on placeholders** — Padrão dos Descobrimentos and Sé Cathedral,
   marked with TODOs in `lisbon-places.ts`. No photo in either project.
6. `README.md` is still create-next-app boilerplate.
