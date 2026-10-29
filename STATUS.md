# STATUS — överlämning mellan Claude-sessioner

Uppdaterad: 2026-10-29. Läs denna + CLAUDE.md/AGENTS.md innan arbete. Repo: `C:\Users\hallb\Desktop\flyamba-nextjs`, GitHub `flyg-ai/flyamba`, branch **main** (inte master). Vercel Hobby-kontot. main-push = produktionsdeploy; branch-push = noindexad preview.

## Arbetssätt (användarens fasta regler)

- All kommunikation på **svenska**. Sajten är engelskspråkig (en-US, USD, inches/°F) — översätt/anpassa aldrig svenska koncept rakt av (ex: "sportlov" blev "Spring Break 2027", inte en direktöversättning).
- Små arbetspaket, batcha 2 och 2 vid serieproduktion (t.ex. guider/destinationer) — committa/pusha när ett batch är klart och verifierat, inte allt i en klump.
- Bilder: användaren källar/genererar dem själv (GPT eller Unsplash). Ge alltid med ett klistra-in-klart GPT-bildprompt när nya bilder behövs.
- Verifiering sker i **byggd HTML** (grep i `.next`-output) och `npm run build`, aldrig bara källkod eller antaganden om att det "borde fungera".
- Byggexitkod får ALDRIG maskeras av pipe: kör `npm run build > logfil 2>&1; echo "exit=$?"` — aldrig `| tail`.
- Grindar som fäller bygget: verify-tpnames, verify-images, verify-locale (0 träffar på alla sidor), verify-prices.
- Kostnadskänslig: inga betal-API:er utan avstämning. Open-Meteo = gratis. Travelpayouts `flight_search` är **förbjudet i bakgrundsjobb** (avtalsbrott); `v1/prices/monthly` och `v1/prices/direct` är ok.

## Känd git-fälla: push kan hänga/403:a på fel GitHub-identitet

`git push origin main` kan hänga i flera minuter och sen misslyckas med `Permission ... denied to haloberg / 403`. Orsak: Git Credential Manager (`credential.helper = manager`) har en cachad inloggning för fel GitHub-konto. Lösning: rensa cachen (`git credential-manager github logout` eller `cmdkey /delete:git:https://github.com`) och logga in som **flyg-ai** när inloggningsrutan dyker upp, kör sen `git push` igen. En bakgrundskörd `git push` som "lyckas" (exit 0) via en task-notifiering är INTE pålitligt bevis — verifiera alltid med `git log origin/main..HEAD` (tomt = faktiskt pushat).

## Strategiskt läge (viktigast)

- **Indexering är fortsatt flaskhalsen**, men läget är bättre än i september: GSC visade i okt ~67 indexerade sidor (upp från ~55), delvis tack vare manuella Request Indexing-submissions från användaren.
- GSC Performance-rapport (inte `site:`-sökning, som är opålitlig) är rätt signal: nya sidor rankar extremt lågt (positioner 62–99) på grund av ny domän/lågt förtroende — inte ett tekniskt block, inte en Google-penalty.
- **Användaren vill INTE utåt röja att Flyamba är US-varianten av flyg.ai**: inga länkar från flyg.ai, ingen hreflang, ingen delad branding. GSC på samma Google-konto är ok (privat, ingen ranking-signal — avstämt).
- Länkplan beslutad (ej ändrad sen sep): (1) AI-verktygskataloger, (2) artikel på aimagasinet.se, (3) GSC Request Indexing på topp ~30 manuellt av användaren.
- **aimagasinet-artikeln**: fortfarande bara utkast, ej publicerad av användaren (status oförändrad sen sep — kolla om den fortfarande finns om den behövs).
- **AI-katalog-submission-kit**: fortfarande ERBJUDET men EJ beställt.

## us-tier1-branchen — fortfarande klar men EJ mergad

Branch `us-tier1` (pushad, 7fcdf82 + 23fd660): 53 nya US-destinationer (alla 50 stater täckta). **Publiceras först vid GSC-islossning — användarens beslut, oförändrat.** Vid merge ärver sidorna automatiskt alla Lite-sektioner och den nya editorial-mekanismen (se nedan) om de läggs till i indexed-overrides.ts.

## Skeppat på main sen förra statusen (okt 2026)

**Stor prisbugg hittad och fixad** — `monthlyPrices`-fälten i katalogdata var Stockholm-ursprungs SEK-estimat (medianfel 2.35x mot riktiga US-priser, vände om rankningen). Fixat i:
- 18 hub-sidor (amsterdam, athens, bali, bangkok, barcelona, cancun, cape-town, dubai, dubrovnik, lisbon, london, madrid, new-york, paris, prague, reykjavik, tenerife, tokyo) — konverterade till `fareCopyFor`/`priceAnswer` från Supabase.
- 3 "/prices"-undersidor (bali, madrid, reykjavik).
- 9 datafiler (`monthlyPrices`-block borttagna helt).
- AI-sök-katalogen (`app/api/ai-search/route.ts`) — använder nu riktiga `faresBySlug`-priser, `priceUsd: number | null`, tomt pris ≠ gratis/billigt.
- `scripts/verify-prices.mjs` PENDING-listan nedkortad till 2 kända döda filer.

**Origin-default fixad** — `DEFAULT_ORIGIN` (`app/lib/origins.ts`) och `FALLBACK_ORIGIN` (`app/api/tp-calendar/route.ts`) bytta från London till New York (NYC/JFK). Ny `GeoOrigin`-komponent + `/api/geo-origin` (edge) sätter rätt origin-cookie på första besök utan att göra sidor dynamiska.

**"seen"-datumstämpel borttagen** från fare-labels (`formatFareLabelShort`/`Long` i `app/lib/fares.ts`) — användarens explicita val: bara ta bort texten, behåll priset, ingen 30-dagars staleness-cutoff införd (kvar som framtida option om det blir problem igen).

**Indexerings-promotion av 10 Lite-destinationer** (ny mekanism, `app/data/indexed-overrides.ts` + `app/data/lite-editorial.ts`):
- `ALREADY_INDEXED_SLUGS`: nice, detroit, bahamas, barbados, nairobi (GSC-funna) + aruba, jamaica, chicago, atlanta, miami, las-vegas, orlando, costa-rica, punta-cana (10 nya, promoted via riktigt redaktionellt innehåll, US-sökvolym-prioriterat).
- `DestinationLite.tsx` visar nu riktiga highlights istället för "coming soon" när en slug finns i `lite-editorial.ts` (14 entries totalt).
- `app/sitemap.ts` inkluderar dessa slugs explicit; Lite-katalogen (~526 sidor) är annars exkluderad ur sitemapen och noindexad som standard (beslut från sep, kvarstår).

**7 nya US-market guide-artiklar** (`app/data/guides.ts`, totalt 15 guider nu — 8 gamla Europa/Barcelona-fokuserade + 7 nya):
best-caribbean-getaways-us, spring-break-2027, where-to-escape-winter-from-us, 5-destinations-about-to-blow-up-2026, nonstop-vs-connecting-flights, best-places-christmas-new-year-abroad, us-flight-delay-cancellation-rights. Alla skrivna direkt för US-marknaden (ingen direktöversättning från flyg.ai:s svenska guider), interna länkar till riktiga katalogdestinationer. Nya bilder i `public/images/content/` (7 st, GPT-genererade, konverterade till .avif).

## Teknik-fällor (dokumenterade den hårda vägen)

- Sidor som läser no-store-Supabase kräver `force-static` + `revalidate: 86400`.
- fares.ts display/sort-regeln: sortera aldrig blandade origins; `sortPriceUsd` = NYC-only, null sist, slug som tiebreak.
- Evidensasymmetrin: tomt/NULL → rendera INGENTING (inte tom-text); "not observed ≠ no non-stop exists".
- PostgREST 1000-radstak → `.range()`-pagination.
- Korrupt `.next/dev/types` efter dev-server-stopp kan fälla nästa bygge → `rm -rf .next`.
- Filändrande skript måste läsa tillbaka resultatet och fälla om ändringen saknas (CLAUDE.md-regel).
- Självåterupptagande runners: fråga DB:n vad som återstår per cykel; arkivera resume-filer (`scripts/.fare-months-progress`) före färska svep.
- Unsplash: sök i webbläsarens sidkontext (napi ger 401 från node), första träffen på bara destinationsnamnet, filtrera bort plus.unsplash.com; **granska varje bild visuellt** — geocoder/alt-text ljuger.
- tpNames verifieras mot api.skypicker.com (verify-tpnames.mjs), aldrig gissas.
- Skalfällor: skriv skriptfiler via Write (aldrig `npx tsx -e` eller `node -e` med Windows-sökvägar — backslash-escaping äts av bash); scratchpad-skript kan inte resolva @supabase → kopiera till repo-rot som `.tmp-*.mjs` och radera efteråt.
- git push kan hänga/403:a på fel cachad GitHub-identitet i Credential Manager — se egen sektion ovan.

## Öppen kö (ej beställt, i fallande relevans)

1. AI-katalog-submission-kit (väntar på "kör").
2. us-tier1-merge vid islossning.
3. Ärlig sitemap-lastModified (idag `new Date()` på alla rader = brus) + IndexNow/Bing Webmaster Tools.
4. Nearby-rotation (deterministisk per-slug-variation av kontinentlänkar).
5. Fare-staleness: ingen åldersgräns på priser (bara labeln borttagen, se ovan) — kan behöva en riktig cutoff om GSC/användare flaggar inaktuella priser igen.
6. Äldre: kolumnsvep del 2 (flygtider), verify-prices PENDING-listan (2 kvarvarande filer), hubburval, samtyckesgrind.
7. Oreproducerad bugg: Positano-sida visade två "From"-origin-chips samtidigt ("New York JFK" + "Albany") i en skärmdump från användaren — inte reproducerad, be användaren testa igen i inkognito om den återkommer.
