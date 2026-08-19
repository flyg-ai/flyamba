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
rich slugs, `DestinationLite` otherwise.

> **`DestinationDetail` is in practice dead code — do not debug a hub page there.**
> `/barcelona` and the other 27 hubs are rendered by `app/<city>/page.tsx`, literal route
> segments that never touch `/[slug]`. `DestinationDetail` is only reachable from
> `app/[slug]/page.tsx` for a *rich* slug, and all 8 rich slugs (barcelona, tokyo, lisbon,
> new-york, bali, cape-town, reykjavik, marrakech) are in that file's `RESERVED` set — so
> the branch never runs. In Aug 2026 a whole optimisation step was spent editing the hero in
> `DestinationDetail` to fix `/barcelona`; the change was inert. Edit the 28 hub files.

`/[slug]/[category]` is a `noindex` "coming soon" stub. `/guides/[slug]` and
`/low-fare-calendar/[slug]` are both static + `dynamicParams = false`.

**API** (`runtime = "nodejs"`):
- `/api/ai-search` — Anthropic `claude-haiku-4-5`, pipe-format protocol
  (`INTENT|…`, `HEADLINE|…`, `<slug>|<City>|<why>`, `FOLLOW|…`, or a single `CONV|…`).
  Catalog = **all 550** `ALL_DESTINATIONS`, serialized as pipe lines (~5k tokens; JSON
  would be ~14k) in a `cache_control: ephemeral` system block. Supabase-cached.

  **The protocol is keyed on SLUG, not IATA — do not "simplify" it back.** IATA is not
  unique in this catalog: 550 destinations share 429 codes (SPU serves 8, AGP and LIS 7
  each). An IATA-keyed lookup silently resolves Hvar to Split.

  When the query names a region, `detectRegion()` filters the catalog **before** it is
  sent, so an out-of-region answer is impossible rather than merely discouraged.
  `detectActivity()` does the same for the kind of trip, using the ported tags and scores —
  that is what keeps Madrid out of a beach search. The parser then drops any slug outside
  the set that was actually shown.

  **Results are re-ranked server-side** by the activity's score before being returned
  (`rankMatches`), capped at 7 — one featured card plus three rows of two. This is what
  flyg.ai does (it buffers beach cards and sorts by beach score before emitting) and it
  matters more than any filter: left in model order, a beach search returned Benidorm,
  Lloret de Mar and Sitges, because those carry tags while the classic destinations —
  Fuerteventura (beaches 10), Rhodos, Kreta, Palma, Tenerife — carry none in flyg.ai's data
  and are therefore less legible to the model. `QUALIFY_MIN` is a floor for catalog
  membership, not a bar; ranking decides who actually appears.

  **The route returns the full card payload in each match** (name, country, image, price,
  scores, tags, costs), and `AiResultCard` renders straight from it. Previously `HomeHero`
  resolved each slug against the 8 rich `destinations`, so when the catalog grew to 550
  every result outside those 8 silently rendered as nothing — six matches, one card. Adding
  a field the card needs means adding it to `AiSearchMatch` and to `toMatch()`, not
  importing a catalog into the client.
- `/api/destination-chat` — per-destination Q&A behind `AskAiWidget`. Cached, 7-day TTL.
- `/api/tp-calendar` — Travelpayouts `v1/prices/calendar` proxy, `revalidate = 86400`.
  Origin from `x-vercel-ip-country` / `cf-ipcountry` → `ORIGIN_BY_COUNTRY`, fallback `LON`.

## Data

**`app/data/destinations.ts`** — `destinations: Destination[]`, only **8 entries**
(barcelona, tokyo, lisbon, new-york, bali, cape-town, reykjavik, marrakech) but very rich
(~60 optional fields: monthlyPrices, faqs, neighborhoods, dayTrips, scores…).
These drive `DestinationDetail`; `/api/ai-search` reasons over all 550 in
`all-destinations.ts` and only pulls `tagline` from here.

**`app/data/all-destinations.ts`** — `ALL_DESTINATIONS: AllDestination[]`, **550 slim entries**
(`slug, name, country, continent, iata, tpName, monthlyPrices[12], image, thumbnail, scores?,
summerTemp?`). Auto-generated; the generator script is **not in the repo**. Only ~20 entries
carry `scores` — which is why `/compare` can only offer ~21 cities.

**`app/data/destination-facts.ts`** — editorial `scores` (all 550), `tags`, `foodPerDay`
and `hotelPerNight`, ported from flyg.ai's 2.7 MB `data/destinations.ts` in Aug 2026. The
original Flyamba port had dropped all of it, which is why AI search had nothing to match
"beach" on and `/compare` could only offer 26 cities.

- **Tags are a controlled 41-tag vocabulary**, not a translation. flyg.ai's 283 Swedish tags
  had a long tail of place names ("Mallorca", "Zanzibar") duplicating the country field, plus
  market-only tags (`Inrikes`, `Sverige`, `Direktflyg` — the last meaning direct *from
  Stockholm*, which is false here). Those were dropped. Add new tags to `TAG_VOCABULARY`.
- **`scores.activities` is flyg.ai's `culture`** — same axis, renamed on the way in.
- **`foodPerDay` / `hotelPerNight` are USD**, converted from the Swedish SEK strings.
- **Server-side only.** ~90 kB. `/api/ai-search` imports it. `/compare` cannot until it is
  refactored to a server component — importing it from `CompareClient` ships it to the browser.
- Swedish long-form prose (`seoContent`, `staticContent`, `faqItems`, `insiderTip`,
  `airlinesGuide`) was deliberately **not** ported. Machine-translated Swedish SEO copy on 550
  English pages is a content-quality and duplicate-content problem.
- Still in flyg.ai's Supabase, not ported: `climate_data` (sea temperature, per-month climate)
  and the Google Places table behind "top 3 activities". Both are table copies between the two
  Supabase projects — no re-fetching needed.

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

## Images & performance

**Flyamba does NOT use flyg.ai's pre-generated image-variant system. Do not port it back.**

flyg.ai generates `w640/w828/w1200/w1920` folders under `public/images/destinations/` and
attaches a custom `loader` per image, because Vercel there returns AVIF sources untouched.
That was tried here in Aug 2026 and removed the same day. Flyamba has **no `images.formats`
config**, so the optimizer negotiates WebP and does transform correctly at the widths that
matter for cards. Passthrough at 1200/1920 stops being a problem once the source itself is
small.

The real fault was encoding, not dimensions: the `/barcelona` hero was 588.6 KiB for
1920×1279 — **0.245 bytes/px**, against 0.05–0.10 for well-encoded AVIF. Lighthouse
attributed 421.9 KiB of its saving to compression alone. Fixed by re-encoding the originals
(`scripts/reencode-heavy-images.mjs`, sorts on bytes/px, only writes when smaller, never
resizes): 997 files, 153.1 MB → 63.4 MB, and that hero to 168 kB / 0.070 bytes/px.

So: **the fix here is well-encoded originals, not pre-generated widths.** Re-run that script
after adding images rather than reaching for the sibling project's loader.

**LCP hero prop:** the 28 hubs use `fetchPriority="high"`, not `priority` or Next 16's
`preload`. `priority` is deprecated in 16; its replacement `preload` only emits
`<link rel=preload>` in `<head>` — which `priority` already did — and does **not** set the
`fetchpriority` attribute Lighthouse reports as missing. The Image docs say to prefer
`fetchPriority="high"` over `preload` in most cases and warn against combining them.

**Known debt — no hero image covers a wide screen at DPR 2.** The homepage hero
(`/images/content/photo-1507525428034-b723cf961d3e.avif`) is **1600x1064**, and
`/where-is-it-warm` now borrows the same file. Both render full-bleed. A 1440 CSS
viewport at DPR 2 asks for **2880px**; at 1920 it asks for 3840. So every wide,
high-density screen is looking at an upscale.

It is not visible enough to have been reported, for one reason: both heroes sit under
a dark gradient with large type over them, which is where softness hides best. The
bundled `/images/where-is-it-warm/hero.avif` was worse still — 1200x675, and an
AI-rendered fantasy world map rather than a photograph — which is why the page borrows
the homepage's instead.

The real fix is a 2560px-wide source for each hero, not a `sizes` change: no
declaration can conjure pixels the file does not have. Until then, do not "optimise"
these two by shrinking them further, and do not assume a new full-bleed hero is fine
because it looks acceptable on a 1x laptop.

**Known debt — `sizes` on the category cards over-declares.** The hub category grids
use `sizes="(max-width:1024px) 50vw, 33vw"`, but the box is **389 CSS px** at every
viewport above 1280, because `max-w-7xl` caps the container at 1280 and the grid is three
columns inside it. `33vw` claims 845 px on a 2560 screen. The correct string is
`(max-width:639px) calc(100vw - 32px), (max-width:1023px) calc((100vw - 72px) / 2), 390px`
— the same maths already applied to `HomeCard` and `AiResultCard`.

It is currently **harmless, and it is worth knowing why**: nothing in
`public/images/content/` is wider than 800 px any more (one exception, the full-bleed
HomeHero image at 1600), so the browser cannot fetch anything larger than the box needs no
matter what `sizes` claims. The over-declaration only starts costing bytes again if someone
adds a content image wider than ~800 px, or reintroduces generated variants. Fixing it
properly means touching 28 hub files, which was judged not worth it in Aug 2026.

**Third-party analytics we did not install:** the Travelpayouts search widget
(`tpwdg.com`) embeds a `widgets.kiwi.com` iframe whose bundle contains Kiwi's GTM container
`GTM-MG27K2V`, which loads Google Analytics. It is the single biggest TBT item on a hub page
(~1,061 ms CPU, 382 KiB). `AviasalesWidget` therefore mounts it via IntersectionObserver at
`rootMargin: 400px` with a reserved `minHeight` so CLS does not return. `/cookies` and
`/privacy` document this — keep them in sync if the widget changes.

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

### /compare

Three layers, all sharing one catalog:

- **`app/compare/comparable.ts`** — `COMPARABLE`, the 26 comparable cities (the 8 rich
  destinations ∪ the 21 slim entries with `scores`; the 28 hubs minus **madrid** and
  **mykonos**, which have no scores). Also `ROWS`, `bestSlug()`, `TRAVEL_STYLES`. No JSX,
  so server components can import it.
- **`app/compare/pairs.ts`** — `TOP_PAIRS`, 20 pre-rendered head-to-heads. **Zero imports
  on purpose** so `app/sitemap.ts` can read it without pulling in the catalog or the
  Anthropic SDK. Same reason flyg.ai keeps `app/jamfor/pairs.ts` bare.
- **`app/compare/ComparisonTable.tsx`** — the table, shared by both flows. `onRemove`
  present = interactive tool; absent = static page.

**Pair URLs are canonical-alphabetical.** `pairSlug()` sorts the two slugs, so
`/compare/rome-vs-athens` 308s to `/compare/athens-vs-rome` — one URL per comparison.
`dynamicParams = true`: `TOP_PAIRS` is a pre-render + sitemap list, not a whitelist, so any
two comparable slugs render on demand. Unknown slugs 404.

**AI recommendation** — `app/compare/AiRecommendation.tsx` + `/api/compare-recommend`.
Visitor picks a month and any of the six travel styles; the route returns
`{ intro, winner: {slug, reason}, alternatives: [{slug, reason}] }` in the codebase's pipe
format, cached in `ai_chat_cache` under `category_page = "compare"` keyed on
(sorted slugs + styles + month).

The two flows differ by one prop: the interactive `/compare` passes `autoGenerate` and fires
on mount; **static pair pages must not** — they have to render fully without ever calling
Anthropic, or 20 pages × every crawl burns API calls on bots. The styles are the same six
`scores` keys the table displays, so the model reasons over numbers the visitor can see.
A response naming a destination outside the shortlist is discarded rather than shown.

**Prices in the comparison are all sourced from `ALL_DESTINATIONS.monthlyPrices`**, including
for the 8 rich cities. `destinations.price` and `monthlyPrices` disagree by 0.8x–2.1x on the
same city (Barcelona 1290 vs 2700 SEK) because they were authored separately — mixing them
meant Barcelona won every price row it appeared in. `destinations.price` is still the right
number on a destination's own page; it is just not comparable across cities. See
`comparablePriceSek()` in `comparable.ts`.

## Climate data

`climate_data` in Supabase holds monthly `temp_max`, `temp_min`, `precipitation`,
`sunshine_hours` and `sea_temp` per destination slug. 6,888 rows, 574 destinations,
all twelve months each; all 550 catalog slugs resolve. Read it through
`app/lib/climate.ts` — never directly, and never from a client component.

**Known debt — 197 of the 550 catalog destinations (36%) are not measured.** The
`data_source` column has two values. `open_meteo` is a weather service. `gpt_seed`
is an LLM that was asked to fill in destinations the service did not cover, and it
answered for every column whether or not the column applied. No destination mixes
the two: it is 353 measured and 197 invented.

The damage is uneven, and inverted between columns:

| column | destinations with a value | of which measured |
| --- | --- | --- |
| `temp_max` / `temp_min` | 550 / 550 | 64% |
| `sunshine_hours` | 529 / 550 | 63% |
| `sea_temp` | 380 / 550 | **50%** |
| `precipitation` | 370 / 550 | **100%** |

`precipitation` is the one column the seeder almost entirely skipped (9% of its rows
carry a value), which makes it the lowest-coverage column and the only trustworthy
one. `sea_temp` is the worst: half its values are invented, and the invention is
visible — Munich, Kathmandu, La Paz, Bratislava, Brno, Augsburg and Almaty are all
landlocked and all carry `sea_temp: 0.0`. `climate.ts` normalises that 0 to null;
do not undo it.

Practical consequences:

- A filter built on `sea_temp` or `sunshine_hours` is half editorial fiction. Say so
  in the UI, or pick a column with better provenance.
- `temp_max` drives the sort on every `/where-is-it-warm` page, so roughly a third of
  the ordering rests on invented numbers. They are plausible, not measured.
- Filtering `data_source = 'open_meteo'` would cut the catalog to 353 destinations.
  That was judged too expensive for the month pages; a future pass could re-seed the
  197 from a real source instead.

**Also:** `app/data/destination-facts.ts` `scores` are worse and should not be used
for filtering at all. Kuwait scores 9 for nightlife in a country where alcohol is
banned; `nightlife >= 9` returns Akureyri and Billund; `activities >= 10` returns
Augsburg and Detroit but not Rome, Paris or Athens. The file's own header says the
scores are editorial judgements authored for a Swedish audience and that some are
plainly wrong. `/where-is-it-warm` filtered on them briefly and no longer does.

## Next up

1. **`daily_prices` has no writer.** Needs a `/api/cron/prices` route hitting Travelpayouts
   plus `CRON_SECRET` and a `vercel.json` schedule — same shape as flyg.ai's.
2. **9 destinations still on placeholder images** — see `scripts/missing-images.txt`.
   No source photo exists in either project.
3. **2 Lisbon attractions on placeholders** — Padrão dos Descobrimentos and Sé Cathedral,
   marked with TODOs in `lisbon-places.ts`. No photo in either project.
4. **Only 26 of 550 catalog cities are comparable**, because `scores` were only authored for
   the built-out hubs. More pairs means authoring more `scores` in `all-destinations.ts`
   (madrid and mykonos are the two quickest wins — they already have hubs).
5. `README.md` is still create-next-app boilerplate.
6. **Categories should be real pages, not query parameters.** Today the homepage links its
   category pills at `/explore?type=Beach+%26+Sun` (`app/page.tsx:149`) — one templated page
   filtered client-side, which gives every category the same title, the same H1 and no
   indexable URL of its own. Each category should be its own static route with its own
   metadata, H1 and body copy, the way flyg.ai does it with `/weekend`, `/sol-och-bad`,
   `/familj` and friends (each a single `page.tsx`; `/all-inclusive` also shows the
   sub-page shape). Same pattern, Flyamba's branding and voice.

   **The categories must not be translated across from flyg.ai.** flyg.ai's set is built for
   how Swedes search — `charter` and `all-inclusive` are package-holiday concepts with no
   equivalent search demand in English, and `city-weekend` is a Swedish coinage. Picking
   Flyamba's set is a keyword-research task in its own right, against **US search volume as
   the primary market**: find what Americans actually type, then build to that. Treating it
   as a port would inherit a Swedish taxonomy and its search volume, which is zero here.
