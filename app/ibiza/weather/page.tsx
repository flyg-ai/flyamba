import type { Metadata } from "next";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { IBIZA_CATEGORIES } from "@/app/data/ibiza-places";
import { SITE } from "@/app/lib/destination-helpers";

const HERO = "/images/destinations/flights-ibiza.avif";
const PH = "/images/barcelona/placeholder.webp";

export const metadata: Metadata = {
  title: "Weather in Ibiza 2026 — Climate & Best Time | Flyamba",
  description:
    "Ibiza weather month by month — hot, dry summers around 28°C, warm sea into autumn, mild but quiet winters. When to visit for beaches, clubbing, value and calm.",
  alternates: { canonical: `${SITE}/ibiza/weather` },
  openGraph: { title: "Ibiza Weather & Best Time to Visit | Flyamba", description: "Month-by-month climate and the best time to go to the White Isle.", type: "article", images: [HERO] },
};

const WEATHER: BcnPlace[] = [
  {
    name: "Ibiza's climate overview", slug: "climate-overview", image: PH,
    rating: 4.5, area: "Balearic Islands", filterKeys: [],
    tip: "Ibiza sells sunshine: expect long, hot, dry summers and mild winters, with a warm sea lingering into October.",
    description: "A classic Mediterranean climate — hot dry summers, mild winters and abundant sunshine.",
    practicalInfo: { openingHours: "Summer 28°C; winter 15°C", price: "300+ days of sunshine a year", howToGetThere: "Warmest July–August; sea warmest August–September" },
    fullDescription: "Ibiza enjoys a classic Mediterranean climate: hot, dry and sunny summers, mild winters and more than three hundred days of sunshine a year, which is precisely why the island's season revolves around the sun. Summer, from June to September, is reliably hot, with daytime highs around 28–30°C, very little rain, long days and warm, clear seas — perfect beach-and-party weather, if often crowded and pricey. Spring (April–May) and early autumn (late September–October) are arguably the sweet spots, offering pleasant warmth in the low-to-mid 20s°C, a sea still warm enough to swim (especially in autumn, when it holds the summer's heat), fewer crowds and lower prices. Winter, from November to March, is mild by northern-European standards — daytime temperatures around 14–17°C — but it is also the island's quiet season: much of the tourist infrastructure, including most clubs, many hotels and restaurants, and even a lot of flight routes, shuts down, and the weather, while rarely cold, can be wetter and windier. Rain, when it comes, is concentrated in autumn and winter and usually falls in short bursts. In short, Ibiza is a sun destination with a sharply seasonal rhythm; choosing when to go depends entirely on what you want from the island.",
  },
  {
    name: "Summer (June–September)", slug: "summer", image: PH,
    rating: 4.4, area: "Peak season", filterKeys: [],
    tip: "Book everything early and expect crowds and high prices — this is when Ibiza is at full, sun-baked throttle.",
    description: "Hot, dry and buzzing — the peak beach and clubbing season, with warm seas and long sunny days.",
    practicalInfo: { openingHours: "Highs 28–31°C; lows ~20°C", price: "Sea 24–27°C; almost no rain", howToGetThere: "Busiest and priciest; all clubs open" },
    fullDescription: "Summer is Ibiza at full tilt. From June through September the weather is hot, dry and dependable, with daytime highs of 28–31°C, warm nights around 20°C, intense sunshine and virtually no rain — ideal conditions for the beaches, boat trips and the famous nightlife that all run at full capacity in these months. The sea is at its most inviting, warming to a swimmable 24–27°C and staying warmest into late August and September. July and August are the absolute peak: every club is open with its headline residencies, the beaches and beach clubs are packed, and both prices and crowds hit their maximum, so booking flights, accommodation and car hire well ahead is essential. June and the first half of September are marginally calmer and often just as gloriously warm, making them a smart choice for those wanting the full summer experience with a little less intensity. The heat can be strong midday, so pace beach time, hydrate and use shade and sun protection. If your priority is guaranteed sun, warm sea and the complete Ibiza party scene, summer delivers — just plan and budget for the premium that comes with it.",
  },
  {
    name: "Spring & autumn shoulder seasons", slug: "shoulder-seasons", image: PH,
    rating: 4.6, area: "Best value", filterKeys: [],
    tip: "May and late September are the connoisseur's choice — warm, affordable and uncrowded, with the sea still swimmable in autumn.",
    description: "Warm, quieter and better value — many travellers' favourite time, especially warm-sea autumn.",
    practicalInfo: { openingHours: "Highs 21–26°C; lows 13–18°C", price: "Cheaper flights & hotels; some rain", howToGetThere: "Clubs open/close at the season's edges" },
    fullDescription: "For many seasoned visitors, the shoulder seasons of spring (April–May) and autumn (late September–October) are the best time to experience Ibiza. Temperatures are comfortably warm rather than fierce — daytime highs in the low-to-mid 20s°C — the island is green and, in spring, dotted with blossom and wildflowers, and both crowds and prices drop well below the summer peak. Autumn has a particular advantage: after a long hot summer the sea is at its warmest and most swimmable, often into late October, so early-autumn beach days can be superb. These months also bookend the club season — the famous opening parties fall in late May and the closing parties in late September and early October, so you can still catch big nights while enjoying a calmer island by day. The trade-off is a bit more unpredictability: there can be cooler, breezier or wetter spells, especially deeper into autumn, and at the very edges of the season some venues may not yet be open or may already have closed. On balance, though, for a blend of warm weather, swimmable sea, reasonable prices and a more relaxed atmosphere, spring and autumn are hard to beat.",
  },
  {
    name: "Winter (November–March)", slug: "winter", image: PH,
    rating: 4.0, area: "Quiet season", filterKeys: [],
    tip: "Come for peace, hiking and cheap flights if you can find them — but expect most clubs, hotels and routes to be closed.",
    description: "Mild but quiet — the clubs and much tourism shut down, revealing a peaceful, local, green island.",
    practicalInfo: { openingHours: "Highs 14–17°C; lows 7–11°C", price: "Wettest months; few flights", howToGetThere: "Most clubs closed; limited air routes" },
    fullDescription: "Winter shows a completely different Ibiza. From November to March the weather is mild rather than cold — daytime temperatures typically 14–17°C, dropping to single figures at night — but this is emphatically the off-season, and the island's tourist machinery largely powers down. The vast majority of clubs are closed, along with many hotels, beach bars and restaurants, and crucially the flight network thins dramatically: numerous seasonal routes simply pause for winter, which is why the price calendar for winter months shows so few available fares. What remains is a quiet, green, distinctly local island that appeals to a certain kind of traveller — those after peace, mild-weather walking and hiking in the countryside and along the coast, authentic village life, and the chance to see Ibiza without the summer crowds or prices. Winter is also the wettest part of the year, though rain still tends to come in short bursts between sunny spells, and the almond blossom around Santa Agnès in late winter is a lovely sight. If you picture Ibiza as sun, sea and clubbing, winter is not your season; if you want tranquillity, nature and a glimpse of the real island, it has a quiet charm — just check carefully what is actually open and how you will fly in.",
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Ibiza", item: `${SITE}/ibiza` },
      { "@type": "ListItem", position: 3, name: "Weather", item: `${SITE}/ibiza/weather` },
    ],
  };
}

export default function IbizaWeather() {
  return (
    <CityGuideShell
      citySlug="ibiza"
      cityName="Ibiza"
      categories={IBIZA_CATEGORIES}
      active="weather"
      crumb="Weather"
      h1="Ibiza Weather & Best Time to Visit"
      heroImage={HERO}
      intro="Ibiza has a classic Mediterranean climate — hot, dry summers around 28°C, a sea that stays warm well into autumn, and mild but very quiet winters when much of the island, including most clubs and many flight routes, shuts down. When you should visit depends entirely on what you want: peak sun and full-throttle nightlife in July and August, warm-and-affordable calm in the spring and autumn shoulder seasons, or tranquil, green solitude in winter. Here is the island's weather, season by season."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Ibiza weather by season — in detail" items={WEATHER} />
    </CityGuideShell>
  );
}
