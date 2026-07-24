import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/cape-town-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Cape Town Weather 2026 — Best Time to Visit & What to Pack | Flyamba",
  description:
    "Cape Town weather season by season — temperatures, rainfall, wind and sea temperatures, plus the best time to visit for beaches, hiking, whale watching, wildflowers and lower prices.",
  alternates: { canonical: `${SITE}/cape-town/weather` },
  openGraph: { title: "Cape Town Weather & Best Time to Visit | Flyamba", description: "Season-by-season temperatures, rainfall and packing tips for Cape Town.", type: "article" },
};

const IMG = "/images/cape-town/attractions/lions-head.webp";

const INFO: BcnPlace[] = [
  {
    name: "Cape Town's climate in a nutshell", slug: "climate-overview", image: IMG, rating: 5, area: "Year-round",
    tip: "Seasons are reversed from Europe and North America — summer runs November to March, winter June to September.",
    filterKeys: [],
    description: "Cape Town has a Mediterranean climate with warm, dry summers and cooler, wetter winters — and reversed Southern Hemisphere seasons.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Summer highs ~25–30°C (Nov–Mar); winter ~15–20°C (Jun–Sep)" },
    fullDescription: "Cape Town enjoys a Mediterranean climate, but with the seasons flipped from the Northern Hemisphere: summer runs from November to March and winter from June to September. Summers are warm, dry and often windy, with daytime highs of around 25 to 30°C, long sunny days and very little rain — perfect for beaches, hiking and the winelands, though the strong south-easterly wind (the 'Cape Doctor') can blow hard, and Table Mountain often disappears under its famous 'tablecloth' of cloud on summer afternoons. Winters are mild but wet: temperatures sit around 15 to 20°C, and July and August are the rainiest months, with roughly ten rainy days each and dramatic storms rolling in off the Atlantic. Crucially, the sea is cold on the Atlantic (city) side year round — about 14°C thanks to the Benguela current — while the False Bay side is warmer at 16 to 22°C. The upshot for visitors: come in summer for classic beach-and-mountain weather, in winter for green landscapes, whales, clear mountain views and lower prices, and always pack layers, sun protection and a windbreak whatever the season.",
  },
  {
    name: "Summer (November–March) — peak season", slug: "summer", image: IMG, rating: 5, area: "Nov–Mar",
    tip: "Warmest, driest and busiest — December and January are peak, so book hotels three to six months ahead.",
    filterKeys: [],
    description: "Hot, dry and sunny — the classic season for beaches, hiking and wine, but also the busiest and most expensive.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Highs ~25–30°C; Dec–Jan peak; Table Mountain often cloudy in the afternoons" },
    fullDescription: "Summer (November to March) is Cape Town's peak season and the classic time to visit, with hot, dry, sunny weather and daytime highs of 25 to 30°C. It's the season for everything the city does best: lazing on Camps Bay and Clifton, hiking Lion's Head and Table Mountain, touring the winelands and dining outdoors as the sun sets late over the Atlantic. December and January are the absolute peak, coinciding with South African school holidays and the festive season, so the beaches, restaurants and attractions are at their busiest and hotel prices at their highest — book accommodation three to six months ahead for this window. Two weather quirks are worth knowing: the strong south-easterly summer wind can be fierce, especially in December and January, so seek sheltered beaches like Clifton on blustery days; and Table Mountain frequently vanishes under its 'tablecloth' cloud on summer afternoons, so ride the cableway or hike early in the morning for clear views. The Kirstenbosch Sunday sunset concerts (December to March) are a summer highlight. For warm seas (on the False Bay side), long days and buzzing energy, summer is wonderful — just come prepared for crowds, wind and higher costs.",
  },
  {
    name: "Autumn (March–May) — the sweet spot", slug: "autumn", image: IMG, rating: 5, area: "Mar–May",
    tip: "Mild, calm and quieter, with warm seas and lower prices — one of the best times to visit.",
    filterKeys: [],
    description: "Warm, settled and less crowded, with the wind dropping and prices easing — arguably the ideal time to come.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Highs ~22–26°C falling gradually; calmer winds; first rains from May" },
    fullDescription: "Autumn (March to May) is one of the very best times to visit Cape Town, and something of an insider's secret. The intense heat and fierce summer wind ease off, leaving warm, settled, calm days with highs typically around 22 to 26°C, while the sea — especially on the False Bay side — stays pleasantly warm after the summer, making March and April excellent for swimming and beach days. Crucially, the peak-season crowds thin out after the January holidays and prices for flights and hotels drop noticeably, so you get near-summer weather with more space and better value. It's a lovely time for hiking (cooler and calmer than midsummer), for the winelands (autumn is harvest season, with grape-picking and festivals across Stellenbosch and Franschhoek), and for photography, as the light softens. The first winter rains usually arrive in May, so later in the season you may catch the odd wet day, but long dry spells are still the norm. Table Mountain is also clearer than in windy midsummer. For a balance of warm weather, warm seas, fewer people, harvest-season winelands and gentler prices, autumn — particularly March and April — is hard to beat.",
  },
  {
    name: "Winter (June–September) — green & dramatic", slug: "winter", image: IMG, rating: 5, area: "Jun–Sep",
    tip: "Wet but mild, with the year's clearest mountain views, whale watching and the lowest prices. July is cheapest.",
    filterKeys: [],
    description: "Cool, wet and dramatic, but with whales, clear skies between storms, green landscapes and the best value of the year.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Highs ~15–20°C; July–August wettest (~10 rainy days/month); whale season starts" },
    fullDescription: "Winter (June to September) is Cape Town's wet season, but it's far from a write-off — it has real charms and the best prices of the year. Temperatures are mild rather than cold, with daytime highs of 15 to 20°C, and the rain comes in bursts: July and August are the wettest months, with around ten rainy days each and dramatic Atlantic storms, but plenty of crisp, brilliantly clear days in between, when Table Mountain stands out sharp and cloud-free (better than in hazy, windy summer) and the landscapes turn lush and green. Winter is prime time for two great experiences: whale watching, as southern right whales arrive along the coast and at Hermanus from around June through November, and wildflowers, with the West Coast and Namaqualand exploding into colour in August and September. It's also excellent for the winelands (cosy fireside tastings) and for museums and indoor sights on wet days. The sea is cold, so this isn't beach season. Best of all, flights and hotels are at their cheapest — July is the single cheapest month to fly — and the city is uncrowded. Pack a warm waterproof, and embrace a moodier, better-value Cape Town.",
  },
  {
    name: "Sea temperatures & the two coasts", slug: "sea-temperatures", image: IMG, rating: 5, area: "Coastline",
    tip: "The Atlantic side is icy year round (~14°C); head to the False Bay side (Boulders, Muizenberg) for warmer swimming.",
    filterKeys: [],
    description: "Cape Town has two coasts with very different water temperatures — cold Atlantic and warmer False Bay.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Atlantic side ~14°C year round; False Bay side ~16–22°C" },
    fullDescription: "One of the quirks that surprises first-time visitors to Cape Town is that its two coasts have dramatically different sea temperatures. On the Atlantic Seaboard — the glamorous city side with Camps Bay, Clifton and Llandudno — the water is bracingly cold all year, around 14°C, because the Benguela current pulls cold, upwelling water up from the Antarctic along the west coast. The beaches here are stunning and perfect for sunbathing, sundowners and surfing in a wetsuit, but long swims are only for the hardy, even in the height of summer. Cross over to the False Bay side of the peninsula, however — where you'll find Boulders Beach, Muizenberg, Fish Hoek and St James — and the water is noticeably warmer, at 16 to 22°C, warmed by the Indian Ocean's influence, making these the beaches to head for if you actually want to swim, especially with children. This is why Muizenberg is Cape Town's surf-and-swim beach of choice and Boulders offers sheltered, warmer bathing beside the penguins. The lesson for planning your beach days: pick Atlantic beaches for scenery and sunset glamour, and False Bay beaches for comfortable swimming.",
  },
  {
    name: "Best time to visit & what to pack", slug: "best-time-packing", image: IMG, rating: 5, area: "Planning",
    tip: "Layers, sun protection and a windbreak are essential in every season — Cape Town's weather changes fast.",
    filterKeys: [],
    description: "Summer for beaches and buzz, autumn for the sweet spot, winter for whales, clear views and value.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Best beach weather: Nov–Apr; best value & whales: Jun–Sep; cheapest flights: July" },
    fullDescription: "So when should you go? For classic beach-and-mountain weather, come in summer (November to March), accepting the crowds, wind and peak prices, and book well ahead — December and January are busiest. For the best all-round balance, choose autumn, especially March and April, when the weather is warm and calm, the seas are at their warmest, the winelands are in harvest and both crowds and prices have eased. Come in winter (June to September) if your priorities are whale watching, spring wildflowers, crisp clear mountain views, green landscapes and the lowest prices of the year — July is the cheapest month to fly — and you don't mind rain and cool days. Whatever the season, pack for changeable conditions: layers you can add and shed, a windproof and waterproof jacket (the wind and sudden showers catch people out year round), and strong sun protection — a hat, sunscreen and sunglasses — as the African sun is fierce even when it's breezy. Add a warm layer for cool evenings and mountain tops, comfortable walking shoes for hikes and cobbles, and swimwear for the warmer False Bay beaches. Dress for sun, wind and the odd shower, and Cape Town will rarely catch you out.",
  },
];

function jsonLd() {
  return {
    "@type": "BreadcrumbList",
    "@context": "https://schema.org",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Cape Town", item: `${SITE}/cape-town` },
      { "@type": "ListItem", position: 3, name: "Weather", item: `${SITE}/cape-town/weather` },
    ],
  };
}

export default function CapeTownWeather() {
  return (
    <CityGuideShell
      citySlug="cape-town"
      cityName="Cape Town"
      categories={CATEGORIES}
      active="weather"
      crumb="Weather"
      h1="Cape Town Weather & Best Time to Visit"
      heroImage={IMG}
      intro="Cape Town has a Mediterranean climate with reversed Southern Hemisphere seasons — warm, dry summers from November to March and mild, wet winters from June to September. This guide walks through the weather season by season, explains the two coasts' very different sea temperatures, and pinpoints the best time to visit depending on whether you're chasing beaches, hiking, whales, wildflowers or the lowest prices."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Cape Town weather season by season — in detail" items={INFO} />
    </CityGuideShell>
  );
}
