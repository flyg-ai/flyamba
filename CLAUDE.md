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

### One dev server per working tree

Two `next dev` processes on the same folder share `.next`, and they will truncate
each other's generated types. The symptom is a build failing on a file nobody
edited:

```
.next/dev/types/routes.d.ts:241:23
Type error: ';' expected.
```

Open the file and it is cut mid-write — a `ParamMap` block sitting after the
module's closing brace. **This is not your code.** `npx tsc --noEmit` passes while
`npm run build` fails, which is the tell: the build pulls in the generated route
types and the standalone typecheck does not.

The fix is `rm -rf .next` (or just `.next/dev/types`) and a rebuild. The cause is
running a second dev server — a second terminal, or another agent session in the
same tree. Stop one of them.

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

**Run `node scripts/verify-images.mjs` before committing images.** It checks that
every image path in the build is both on disk and reaching git, and exits 1 if not.

That second half is the point. `.gitignore` once ignored `flights-*-thumb.avif`
because the thumbnails were unused; the warm guide later started rendering them, and
535 referenced files were left out of the repository. Nothing caught it — the files
were on the developer's disk, so every local build passed and `next build` reported
nothing. The images broke only when Vercel built from a clean checkout. Checking the
filesystem is not enough; a file can exist and still never ship.

**A script that edits files must verify its own effect, not report its intent.**
Read the result back after writing and fail if the change is not there. A
`replace()` whose anchor does not match returns the string unchanged, no error —
so the script prints its success message either way. This has bitten twice: a
codemod printed "matchade" for ibiza and phuket without writing (the build caught
it), and a patch to `verify-locale.mjs` printed "mönster tillagda" against an
anchor that never matched — the gate then passed its own injection test with exit
code 0 for both new patterns, which looked exactly like success. That one was
caught only because the injection was tested after the fact. "It printed the done
message" and "it did the thing" are different claims; only reading the file back
connects them.

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

Travelpayouts marker **`711264.flyamba`**, `trs=563187`, everywhere.

- Tiqets (attractions/day-trips): the `tiqets()` helper redeclared in every places file →
  `https://tp.media/r?campaign_id=89&marker=711264.flyamba&p=2074&trs=563187&u=<encoded tiqets search>`
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

## The cron endpoint cannot be triggered from outside

`CRON_SECRET` is marked **sensitive** in Vercel, so `vercel env pull` returns
`CRON_SECRET=""` and the local `.env.local` value is a different string — every
manual call to `/api/cron/fares` from a laptop gets a 401, and no amount of
quoting fixes it. Do not spend the half hour. To run the job on demand, mirror
the route's logic locally against the same tables with the local service-role
key (idempotent: the nightly run upserts the same keys), or trigger it from the
Vercel dashboard.

**flight_search is off limits for background use — by contract, not by taste.**
The terms require every search to be user-initiated, shown to that user with a
"Book" button per variant, and to carry the real user's IP, Referer and
User-Agent; automatic collection of booking links "will disable the API search
for the partner". Access requires an application and 50,000 MAU, and the old v1
endpoint was formally shut down on June 15, 2026 — a probe answering 200 today is
running on borrowed time, not permission. A nightly job fails every one of those
conditions, so background filling is a contract breach, not an optimisation
question. The probe that discovered this was deleted; do not rebuild it. Sources:
the Flight Search API article (support.travelpayouts.com/hc/en-us/articles/30565016140434),
the old-version article (/articles/203956173) and the API FAQ (/articles/204529267).
The in-terms instrument for direct-flight evidence is `v1/prices/direct` — a
Data API method where caching is explicitly recommended — which the cron's
evidence pass uses.

Two route-data facts measured the hard way, so they do not get re-derived:
`v1/prices/cheap` never returns `number_of_changes` (either call shape) — the
evidence lives on `v2/prices/latest`, which the cron's evidence pass reads. And
`api.travelpayouts.com/data/routes.json` looks like the perfect schedule source
but is stale: it lists Alitalia (defunct 2021) and Olympic on JFK–ATH. Nothing in
the repo reads it, and nothing should start.

## Every new Supabase reader needs `cache: "no-store"`

Next stores build-time fetch responses in `.next/cache`, and Vercel restores that
directory between deploys. A module-scope Supabase read therefore serves the
PREVIOUS deploy's data, and **the failure is silent every time**: the build
succeeds, the log line prints, the number is just old.

It has now bitten twice, in two different files, weeks apart:

- `app/lib/climate.ts` — after the Swedish slugs were renamed in the table, the
  build kept using the old destination count and silently cut July from 550
  destinations to 534.
- `app/lib/fares.ts` — after the metro-code fix took fare coverage from 339
  destinations to 377, the build kept logging 339 until `.next/cache` was deleted
  by hand.

Both now build their own client with
`global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) }`
rather than importing the shared `supabaseServer`, which keeps its default
caching for route handlers where that is correct.

Two consequences worth knowing. A no-store fetch marks the route dynamic, so any
page reading one needs `export const dynamic = "force-static"` to stay
prerendered — see `/where-is-it-warm/[month]`. And the responses still get
written to `.next/cache`; they are simply never read, so a file listing looks
like caching is happening when it is not.

## Where-is-it-warm is a winter topic

US search volume for this theme is almost entirely a three-month affair, and the
twelve pages should not get equal effort:

| month | US searches/mo | | month | US searches/mo |
| --- | --- | --- | --- | --- |
| **December** | **18,840** | | November | 900 |
| **January** | **8,070** | | October | 400 |
| **February** | **4,800** | | April | 200 |
| | | | March, May–September | **0** |

December, January and February are **95% of the theme**. The summer months are not
under-served, they are unasked: it is warm everywhere in the US from May to
September, so nobody searches for where else it might be.

All twelve pages stay. The UK is an English-speaking market on a different seasonal
curve, the pages cost nothing to keep, and a guide missing half the year reads as
broken. But **do not spend December's effort on July.** As of Aug 2026 every month
carried roughly the same 630–790 words, three sections and five questions, which is
uniform effort against a 95/5 split.

## The search widget, and what it accepts

`AviasalesWidget` loads `tpwdg.com/content`, which parses its OWN `script.src` in a
`getParams()` helper and maps named parameters onto data attributes on the inner
element. Eleven are read:

```
from_name  to_name  locale  currency  departure  return
stops  limit  primary_color  results_background_color  form_background_color
```

`from_name` and `to_name` are symmetric — the script does
`if (url_params["from_name"]) js.setAttribute("data-from", …)` and the same for
`to_name`.

**`departure` and `return` take dates**, which is not used yet and is the obvious
hook if the low fare calendar ever wants to hand a chosen date pair straight to the
widget.

### Where the values actually go, and why ours were wrong

The chain does not stop at the data attributes. Kiwi's loader
(`widgets.kiwi.com/scripts/widget-search-iframe.js`) reads `data-from` and
`data-to` and turns them into `source=` and `destination=` on an iframe pointed at
`widgets.kiwi.com/basic`, which resolves them against **`api.skypicker.com`**. So
the format that matters is Kiwi's, not Travelpayouts'.

**Kiwi place ids carry a subdivision segment for the US and Canada.**

| ours (Travelpayouts) | Kiwi |
| --- | --- |
| `chicago_us` | `chicago_il_us` |
| `atlanta_us` | `atlanta_ga_us` |
| `new-york_us` | `new-york-city_ny_us` |
| `toronto_ca` | `toronto_on_ca` |
| `sydney_au` | `sydney_ns_au` |

European names have no such segment, so `barcelona_es`, `rome_it` and `london_gb`
match Kiwi's format **by coincidence**. That coincidence is the whole reason this
went unnoticed: the pages anyone happened to check were European ones, where
pre-filling worked, while every US destination and every US origin resolved to
nothing. 186 of 556 catalog values were dead, including Swedish leftovers from
flyg.ai — `kreta_gr`, `milano_it`, `maldiverna_mv`, `kapstaden_za`.

**AN UNKNOWN ID PRODUCES AN EMPTY FIELD, NOT AN ERROR.** Nothing logs, nothing
throws, no network call fails. The widget renders a search box whose From and To are
blank — indistinguishable from a box nobody has typed into. This is why it could sit
broken indefinitely, and why the fix is a gate rather than a correction:

```
node scripts/verify-tpnames.mjs
```

**Run it whenever a `tpName` or an `ORIGIN_TP_NAME` entry changes.** It checks every
value under `app/` against the same API the widget queries and exits 1 on an unknown
one, so it can gate a commit. It fails rather than passes when the API is
unreachable. All 498 values pass; `PENDING_REVIEW` is empty and meant to stay that
way.

**The same script sweeps for implausible airports**, which is how the Trinidad entry
under "Next up" was found:

```
node scripts/verify-tpnames.mjs --sweep --out airport-sweep.md
```

It flags a destination only when its airport is more than 150 km away AND the
destination has fewer than five rows in `origin_fares` AND a Kiwi station sits at
least 30% closer. Distance alone is useless in both directions: it condemns Petra →
Amman, which is correct, and clears an empty airstrip 8 km away, which is the worse
error. The sweep **reports and never fails the build** — `exit 1` stays reserved for
what is provably wrong. It does not measure a candidate airport's fare coverage, so
every candidate is a lead to probe against Travelpayouts, never a recommendation.

**39 values are shared by several destinations on purpose.** Kiwi has no place for a
region or a village, so six Albanian entries point at `tirana_al`, Tuscany at
`florence_it`, Petra and Wadi Rum at `amman_jo`. The field answers "which airport do
you fly into", and it is the same airport the row's IATA code already uses to fetch
the fare on the page — so the search box and the price agree instead of contradicting
each other. Not a de-duplication bug.

**Resolve a new value by its IATA code, not by its name.** An IATA code IS a Kiwi
station id, and the station's city is the answer — `ids: ["HER"]` yields
`heraklion_gr` for Crete. Searching by name gave a Cree nation in Manitoba for
`kreta_gr` and Petrolina in Brazil for `petra_jo`.

**Do not repeat flyg.ai's three experiments.** The sibling project tried data
attributes on the mount node, parameters in the script URL, and a window-scoped
config object, and it is not recorded whether any worked. Those were aimed at a
DIFFERENT PRODUCT — the white-label widget at `tpwdg.com/wl_web/main.js` — and say
nothing about this one, which documents its own interface in the script it serves.

### What cannot be turned off

The widget also renders Kiwi's own "Trending destinations" block — Copenhagen, Las
Palmas, Stockholm, Algiers — which promotes Kiwi's routes on our page and links
nowhere back into Flyamba. The word "trending" appears **zero times** in the loader
script; the block is built inside the iframe by Kiwi's code, and none of the eleven
parameters touches it. `powered_by=false`, which we already send, is the only
branding control on offer.

If that ever becomes worth solving, the replacement already exists in miniature:
`PrisKalender` deep-links to `kiwi.com/deep?from=<origin>&to=<iata>` with a working
origin picker, so a hand-built search box with correct affiliate links is a known
quantity rather than a design problem.

## Prices

**Two price sources exist and they disagree by a factor of two.** `origin_fares` in
Supabase holds real observed fares, filled nightly by `/api/cron/fares` from
Travelpayouts across twelve origins including NYC, MIA, CHI and LAX. `monthlyPrices`
in `all-destinations.ts` holds Stockholm-origin estimates seeded from flyg.ai — **81%
of its 6,570 values are round hundreds**, which is what an estimate looks like.

Measured against real US fares for the 339 destinations where both exist, the estimate
is off by a **median factor of 2.35x**, and it inverts rather than scales:

| destination | real, from NYC | catalog estimate |
| --- | --- | --- |
| San Francisco | $43 | $524 |
| Las Vegas | $49 | $505 |
| Gdańsk | $1,198 | $52 |

Cheap-from-Stockholm European cities look cheap and cheap-from-US American ones look
expensive, on a site aimed at Americans.

**`/where-is-it-warm` is converted. Nothing else is.** Its cards read
`getUsFareTable()` from `app/lib/fares.ts`, show no price at all where we hold no US
fare, and label every figure with its origin and the date we saw it — never "from $X",
which is a claim about what can be bought now and what 14 CFR 399.84 regulates.

**Known debt — 580 of 958 built pages still render the Stockholm estimate**, through
five components (`DestinationCard`, `DestinationDetail`, `DestinationLite`,
`FlightCTA`, `HomeCard`), 45 pages with their own price rendering, and six lib/api
files. Converting a surface means: read `getUsFareTable()` in a server component, pass
the narrow result down, render nothing when the fare is missing, and delete the
`usdStr(...)` call. The pattern is in `app/lib/climate.ts` — note that it formats the
label server-side, because `fares.ts` carries the service-role client and cannot be
imported by a client component.

**`app/lib/fares.ts` sat finished and documented with `/api/ai-search` as its only
consumer.** Its header already explained why the catalog number must not be
substituted. A finished module that explains why it is needed and that nothing calls is
the kind of thing a later session mistakes for dead code — it is not.

### The per-month fare narrative was removed, on purpose

`app/where-is-it-warm/copy.ts` used to carry 39 numeric price claims — "September is
the cheapest month at a $390 median", "July carries a 63% peak premium" — all computed
from `monthlyPrices`. They were removed in Aug 2026 along with the reasoning built on
them.

The prose was worse than the numbers. "May is where the fare curve falls off a cliff,
because Europe joins the list and Europe is close" is true from Stockholm and false
from New York, and it is more damaging than a wrong figure because it reads as insight.

**Do not write it back from `monthlyPrices`.** It can be rebuilt honestly once
`daily_prices` has collected a few months from US origins — that table has a per-day
price series, which is what a monthly comparison actually needs. `origin_fares` cannot
do it: it holds the cheapest finds from the last 48 hours, not a time series.

What replaced it is measured climate contrast, which is origin-independent and is the
thing no generic "best places in March" page has: sea temperature, rainfall and
sunshine hours per destination per month. **Only quote `data_source = 'open_meteo'`
rows.** The 197 `gpt_seed` destinations include four Caribbean entries carrying
identical constants — 28.0 °C air, 26 °C sea — so quoting one would be quoting an LLM.

## Next up

1. **Five hub pages promise a price calendar they can never fill.** Tenerife,
   Mykonos, Santorini, Ibiza, Palma and Florence hold under three observed months
   from every US origin, so `FareCalendarSection` renders nothing on them — but
   their copy still says things like:

   | page | the sentence |
   | --- | --- |
   | Ibiza | "see the month-by-month price calendar" (meta description) |
   | Mykonos | "April is the cheapest month to fly, while July and August are the most expensive" |
   | Santorini | "April is the cheapest month to fly to Santorini, with round-trip fares averaging…" |
   | Palma | "February is the cheapest month at roughly $X round-trip" |
   | Florence | a "Cheapest month" fact card |

   Every figure in them comes from the SEK constants, so they are wrong twice: the
   number is a Stockholm estimate and the section it points at is not on the page.
   Tenerife is clean. **Fix these in the copy pass, not mechanically** — each is a
   sentence with a season and a claim in it, not a token to replace.

2. **Six of the 28 hubs are places Americans can barely fly to non-stop.** Tenerife,
   Mykonos, Santorini, Ibiza, Palma and Florence are inherited from flyg.ai, where
   they are obvious choices from Arlanda. Measured against Travelpayouts from all
   four US origins they return zero to two months of fares each — the thinnest
   routes on the site are six of its flagships.

   Meanwhile **Aruba (16,920/mo), Jamaica (14,500) and Punta Cana (6,570) have no
   hub at all.** That is a hub-selection question against the Ahrefs data, not a
   bug: nothing is broken, the effort is just pointed at the wrong cities.

3. **`trinidad-cuba` has the wrong IATA code, and it is the fare that suffers.** The
   catalog gives it `SCU` — Santiago de Cuba, **475 km away**. Trinidad's own airport
   is `TND` (Alberto Delgado), 2 km out, and Kiwi has a `trinidad_cu` city for it. The
   `tpName` was set from TND and is right; the `iata` field was left alone because it
   drives `origin_fares`, so changing it moves a price rather than a label.

   Two things to settle: whether TND has any international fares worth quoting, and
   whether the page should say Cienfuegos (59 km) instead. Until then the page shows a
   Santiago de Cuba fare under a Trinidad heading.

   **Worth a sweep, not just this row.** This was found only because the search widget
   made the IATA visible; nothing checks that a destination's airport is actually near
   it. `verify-tpnames.mjs` already resolves every IATA to a Kiwi station with
   coordinates, so the same pass could flag any row whose airport sits implausibly far
   from the place it claims to serve.

2. **Build hubs for the destinations Americans actually search for.** The 28 existing
   hubs (`app/lib/hubs.ts`) were inherited from flyg.ai and are European city breaks —
   Amsterdam, Prague, Vienna, Florence. Right content, wrong market. Not one of the ten
   most-searched destinations in the US has a hub.

   Priority order, by measured US monthly search volume (Ahrefs, Aug 2026):

   | # | destination | US searches/mo |
   | --- | --- | --- |
   | 1 | Aruba | 16,920 |
   | 2 | Jamaica | 14,500 |
   | 3 | Chicago | 12,770 |
   | 4 | Atlanta | 11,730 |
   | 5 | Miami | 11,030 |
   | 6 | Las Vegas | 10,520 |
   | 7 | Orlando | 10,330 |
   | 8 | New York | 9,170 |
   | 9 | Costa Rica | 6,830 |
   | 10 | Punta Cana | 6,570 |

   All ten exist in the catalog as lite pages already, so this is content work rather
   than data work. Adding a slug to `HUB_CITY_SLUGS` without building its subpages
   first makes things worse, not better — that list is what keeps the hub spotlight and
   the sort tiebreak from pointing at thin pages.

3. **Real fares exist and almost nothing reads them.** Both cron jobs run and both
   tables are filling: `origin_fares` holds ~3,300 rows across 12 origins including
   NYC, LAX, CHI and MIA, and `daily_prices` is writing too. `app/lib/fares.ts` is a
   finished reader for it — and `/api/ai-search` is its only consumer.

   Everything else still shows `monthlyPrices` from `all-destinations.ts`, which are
   Stockholm-origin estimates seeded from flyg.ai: **81% of the 6,570 values are round
   hundreds**. Measured against real US-origin fares for the 339 destinations where both
   exist, the guess is off by a **median factor of 2.35x**, and the error inverts the
   ranking rather than just scaling it — San Francisco is $43 real against $524 guessed,
   Gdańsk $1,198 real against $52 guessed. Cheap-from-Stockholm European cities look
   cheap and cheap-from-US American ones look expensive, on a site aimed at Americans.

   Wiring the cards to `getFares()` covers 339 of 550 from a US origin. The remaining
   211 must render **no price row at all** — `fares.ts` says this in its own header, and
   `priceUsd: 0` already hides the row. Substituting the Stockholm number is what made
   the figure wrong in the first place.
4. **9 destinations still on placeholder images** — see `scripts/missing-images.txt`.
   No source photo exists in either project.
5. **2 Lisbon attractions on placeholders** — Padrão dos Descobrimentos and Sé Cathedral,
   marked with TODOs in `lisbon-places.ts`. No photo in either project.
6. **Only 26 of 550 catalog cities are comparable**, because `scores` were only authored for
   the built-out hubs. More pairs means authoring more `scores` in `all-destinations.ts`
   (madrid and mykonos are the two quickest wins — they already have hubs).
7. `README.md` is still create-next-app boilerplate.
8. **Categories should be real pages, not query parameters.** Today the homepage links its
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
