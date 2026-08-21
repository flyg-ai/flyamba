import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/mykonos-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Mykonos Weather 2026 — Best Time to Visit & What to Pack",
  description:
    "Mykonos weather season by season — temperatures, the famous Meltemi wind and what to pack, plus the best time to visit for warm seas, lower prices and…",
  alternates: { canonical: `${SITE}/mykonos/weather` },
  openGraph: { title: "Mykonos Weather & Best Time to Visit | Flyamba", description: "Season-by-season temperatures, the Meltemi wind and packing tips for Mykonos.", type: "article" },
};

const IMG = "/images/mykonos/beaches/paraga-beach.webp";

const INFO: BcnPlace[] = [
  {
    name: "Mykonos's climate in a nutshell", slug: "climate-overview", image: IMG, rating: 5, area: "Year-round",
    tip: "The Meltemi wind is the defining feature of a Mykonos summer — it keeps the heat bearable but can whip up the north coast and delay ferries.",
    filterKeys: [],
    description: "Mykonos has a classic hot, dry Mediterranean climate — but the summer Meltemi wind is what really defines it.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Summer highs ~27–32°C; winters mild ~14–16°C; very little summer rain" },
    fullDescription: "Mykonos has a classic hot-summer Mediterranean climate: long, hot, bone-dry summers and mild, wetter winters, with abundant sunshine for much of the year. Summer daytime highs sit around 27°C, climbing into the low 30s in July and August, while winters are mild rather than cold, hovering around 14–16°C. Rain is almost unheard of from June to September and mostly falls between November and March. What truly sets Mykonos apart, though, is the Meltemi — a strong, dry north wind that blows across the Aegean in summer, often for days at a time and especially in July and August, when it can reach 25–35 knots. The Meltemi is a double-edged blessing: it keeps the heat comfortable and the humidity low, makes the island a windsurf and kitesurf paradise, and cools the evenings, but it can also whip sand across the exposed north-coast beaches, make sunbathing there unpleasant, and delay or cancel fast ferries. The south coast is sheltered from it, which is why the famous beaches cluster there. Whenever you visit, expect sun, warmth and wind — and pack accordingly.",
  },
  {
    name: "Spring (April–May)", slug: "spring", image: IMG, rating: 5, area: "Apr–May",
    tip: "Late April and May are lovely and quiet — warm days, wildflowers and low prices, though the sea is still bracing and some venues haven't opened yet.",
    filterKeys: [],
    description: "Spring is warm, green and peaceful, with low prices — but the season is only just waking up.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Highs ~18°C (Apr) rising to ~23°C (May); sea still cool; April is the cheapest month to fly" },
    fullDescription: "Spring is a lovely, underrated time to visit Mykonos, when the island is green with wildflowers, the light is soft and the crowds and prices are at their lowest — April is in fact the cheapest month to fly. Temperatures climb from comfortable highs of around 18°C in April to a pleasant 23°C by May, the days lengthen, and it's warm enough for long walks through Chora, exploring Delos and lingering over lunch without the summer heat or the Meltemi wind at full force. The trade-offs are that the sea is still on the cool side for swimming, particularly in April, and that the island is only just waking up: many beach clubs, restaurants and some hotels don't fully open until May, and the famous nightlife doesn't really ignite until June. That makes spring perfect for a calmer, cheaper, more cultural trip — for couples and travellers who want the beautiful scenery, the archaeology and the atmosphere without the party crush and peak prices — but less ideal if beach clubs and non-stop nightlife are your priority. Pack layers and a light jacket for cooler evenings and breezy days, plus sun protection for the strong Aegean light.",
  },
  {
    name: "Summer (June–August) — peak season", slug: "summer", image: IMG, rating: 5, area: "Jun–Aug",
    tip: "June is the sweet spot — everything's open and buzzing but it's a touch cooler, cheaper and calmer than the July–August peak, when the Meltemi blows hardest.",
    filterKeys: [],
    description: "Summer is hot, dry, buzzing and expensive — the full Mykonos experience, with the Meltemi wind at its strongest.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Highs ~28–32°C; warm seas; the Meltemi blows 25–35 knots in Jul–Aug; peak prices" },
    fullDescription: "Summer is peak Mykonos — hot, dry, dazzlingly bright and utterly alive. Daytime highs run around 28–32°C, the sea is warm and inviting, and the island is at its liveliest: every beach club, bar and restaurant is open, the nightlife roars, and Chora hums until dawn. It is also the busiest and most expensive time by a wide margin, with hotel rates and flight fares hitting their annual peak in July and August, and popular beach clubs, restaurants and Delos tours requiring reservations weeks ahead. The other defining factor is the Meltemi wind, which blows hardest in July and August at 25–35 knots: it keeps the heat comfortable and makes the north-coast beaches a windsurf mecca, but it can make sunbathing on exposed beaches awkward and occasionally disrupts ferries. June and early September (technically shoulder season) offer the best of summer — everything open and buzzing, but slightly cooler, calmer and cheaper than the absolute peak. For warm seas, the fullest nightlife and the complete Mykonos scene, summer delivers; just book far ahead, budget high, and don't leave a light layer at home for the breezy evenings.",
  },
  {
    name: "Autumn (September–October)", slug: "autumn", image: IMG, rating: 5, area: "Sep–Oct",
    tip: "September is arguably the best month of all — warm sea, dropping prices, thinner crowds and the Meltemi easing, with the party scene still going strong.",
    filterKeys: [],
    description: "Early autumn is the connoisseur's choice — warm seas, easing crowds and lower prices, with the island still open.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Highs ~26°C (Sep) falling to ~22°C (Oct); sea at its warmest; the season winds down through October" },
    fullDescription: "Early autumn is, for many, the best time of all to visit Mykonos — and September in particular is a real sweet spot. The summer heat softens to a very comfortable 26°C or so, the sea is at its warmest after a whole summer of sun, the Meltemi wind eases off, and the crowds and prices begin to drop noticeably, all while the beach clubs, restaurants and nightlife are still in full swing. It's warm, buzzing and beautiful, but calmer and cheaper than July and August — the ideal combination for most travellers. As the season progresses into October, temperatures ease to around 22°C, the sea stays swimmable, and the island grows quieter and more affordable still, though venues gradually begin to close and the party scene winds down toward the end of the month. There's a slightly higher chance of the first autumn rain, but sunshine still dominates. For warm-sea swimming, comfortable sightseeing, lower prices and a lively-but-not-crazy atmosphere, September and early October are hard to beat. Pack summer clothes with a light layer for the evenings, which start to cool as autumn sets in.",
  },
  {
    name: "Winter (November–March) — low season", slug: "winter", image: IMG, rating: 5, area: "Nov–Mar",
    tip: "Mykonos essentially hibernates in winter — most beach clubs, restaurants and many hotels close, and ferries and flights thin out, but hotel prices can fall by up to 70%.",
    filterKeys: [],
    description: "Winter is mild but very quiet — the island largely shuts down, though prices plummet for those who want peace.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Highs ~14–16°C; wettest, windiest months; many venues closed; flights mostly via Athens" },
    fullDescription: "Winter is Mykonos at its quietest — a mild but sleepy off-season when the party island all but hibernates. Temperatures stay relatively gentle, with daytime highs around 14–16°C, but this is the wettest and windiest time of year, with grey, blustery days more common and the sea far too cold for swimming. Crucially, the vast majority of the island shuts down: most beach clubs, seasonal restaurants and a good number of hotels close entirely from November through March, ferry and flight services thin out (you'll usually connect through Athens), and Chora reverts to a sleepy town of a few thousand year-round residents. For anyone whose idea of Mykonos is beach clubs and nightlife, winter is the wrong time to come. But for a certain kind of traveller it has real appeal: hotel prices can fall by up to 70%, the handful of places that stay open feel authentically local, and you can experience the beautiful whitewashed town, the windmills and the landscape in complete peace, without a single crowd. Pack warm layers, a waterproof and a windproof jacket, and go in with realistic expectations of a very low-key island.",
  },
  {
    name: "Best time to visit & what to pack", slug: "best-time-packing", image: IMG, rating: 5, area: "Planning",
    tip: "Whatever the month, pack for wind and strong sun — a windproof layer and serious sun protection are non-negotiable on Mykonos.",
    filterKeys: [],
    description: "June and September offer the best balance of weather, sea, buzz and price; pack for sun, wind and warm evenings.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Best overall: June and September; cheapest: April; peak buzz: July–August" },
    fullDescription: "So when should you go? For the best all-round balance, aim for June or September: the weather is hot and sunny, the sea is warm, the beach clubs and nightlife are in full swing, and yet the crowds and prices sit below the July–August peak, with the Meltemi wind a little gentler in June. Choose July or August if you want the absolute height of the season — the warmest seas, the most intense nightlife and the biggest scene — but expect the highest prices, the thickest crowds and the strongest wind, and book everything (hotels, restaurants, beach-club loungers, Delos tours) months ahead. Choose April, May or October for a calmer, cheaper, more relaxed trip focused on the scenery, culture and sightseeing rather than partying, accepting that the sea is cooler and some venues are shut. Winter is for solitude and bargains only. Whatever the season, the packing essentials are the same: strong sun protection (hat, sunglasses, high-factor sunscreen) for the fierce Aegean light, and a windproof layer for the Meltemi, which can turn a hot day breezy in minutes. Add smart-casual outfits for the dressed-up nightlife, comfortable shoes for Chora's cobbles, and a light jacket for cooler evenings outside high summer.",
  },
];


export default function MykonosWeather() {
  return (
    <CityGuideShell
      citySlug="mykonos"
      cityName="Mykonos"
      categories={CATEGORIES}
      active="weather"
      crumb="Weather"
      h1="Mykonos Weather & Best Time to Visit"
      heroImage={IMG}
      intro="Mykonos has a hot, dry, sun-soaked Mediterranean climate — but the island's defining weather feature is the Meltemi, the strong summer north wind that cools the heat, powers the windsurfers and shapes where the best beaches lie. This guide walks through the weather season by season — temperatures, the wind, the sea and what to pack — and pinpoints the best time to visit, whether you're chasing warm swimming, the full beach-club buzz, lower prices or peace and quiet."
      wide
    >
      <CategorySeoSections heading="Mykonos weather season by season — in detail" items={INFO} />
    </CityGuideShell>
  );
}
