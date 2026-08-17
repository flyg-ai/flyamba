import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/new-york-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "New York Weather 2026 — Best Time to Visit & What to Pack",
  description:
    "New York weather month by month — temperatures, seasons and what to pack, from hot humid summers to snowy winters, plus the best time to visit for spring…",
  alternates: { canonical: `${SITE}/new-york/weather` },
  openGraph: { title: "New York Weather & Best Time to Visit | Flyamba", description: "Season-by-season temperatures and packing tips for New York.", type: "article" },
};

const IMG = "/images/new-york/attractions/central-park.webp";

const INFO: BcnPlace[] = [
  {
    name: "New York's climate in a nutshell", slug: "climate-overview", image: IMG, rating: 5, area: "Year-round",
    tip: "Pack an umbrella whatever the month, and dress in layers — the weather swings hard between the four distinct seasons.",
    filterKeys: [],
    description: "New York has a humid continental climate — hot, humid summers and cold, snowy winters, with four distinct seasons.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Summer highs ~28–32°C; winter highs ~4–6°C, often below freezing" },
    fullDescription: "New York has a humid continental climate, which means hot, humid summers, cold, snowy winters and four sharply defined seasons — so when you visit makes a big difference. A winter's day can sit below freezing with snow on the streets, while a July day easily reaches 30°C with stifling humidity. Summers (June to August) are hot and sticky, with highs around 28–32°C and frequent afternoon thunderstorms; the indoor air-conditioning, by contrast, is often fiercely cold. Winters (December to February) are genuinely cold, with daytime highs of just 4–6°C, regular sub-zero nights, snow and the occasional powerful 'nor'easter' storm. In between, spring and autumn are mild and lovely, and generally the best times to come. Crucially, rain — and in winter snow — can arrive in any season, so an umbrella is a year-round essential, as are layers you can add and shed as the temperature swings between the cold street and the overheated (or over-air-conditioned) indoors. Whenever you visit, the city rewards you, but pack for its extremes: New York does not do mild, moderate weather for long.",
  },
  {
    name: "Spring (March–May)", slug: "spring", image: IMG, rating: 5, area: "Mar–May",
    tip: "May is one of the best months of the year — mild, green and comfortable for long walks in Central Park and along the High Line.",
    filterKeys: [],
    description: "Spring warms from chilly to mild and green, with blossom in the parks and comfortable sightseeing weather.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Highs ~10°C (Mar) rising to ~22°C (May); cherry blossom in April" },
    fullDescription: "Spring is one of the best times to visit New York, as the city shakes off winter and turns green. Temperatures climb from chilly highs around 10°C in March to a mild, pleasant 22°C or so by May, the days lengthen, and café terraces and park lawns fill back up. April brings cherry blossom to Central Park and the Brooklyn Botanic Garden, and by May the parks are lush and the light is long and soft — ideal for the long walks the city rewards, whether in Central Park, along the High Line or over the Brooklyn Bridge. The weather is improving but still changeable, with mild days and cooler mornings and evenings, and the odd rainy spell, so bring layers, a light jacket and an umbrella. Crowds and prices build toward late spring but generally sit below the summer peak. For blossom, greenery and comfortable temperatures without July's heat and humidity, spring — and May in particular — is hard to beat, a sweet spot of pleasant weather, long days and manageable crowds that makes it one of the finest windows in which to see the city at its most photogenic.",
  },
  {
    name: "Summer (June–August)", slug: "summer", image: IMG, rating: 5, area: "Jun–Aug",
    tip: "Warmest and liveliest, but hot, humid and busy — plan indoor, air-conditioned museums for the middle of the day and save walking for morning and evening.",
    filterKeys: [],
    description: "Summer is hot, humid and full of energy, with long days, outdoor events and frequent afternoon thunderstorms.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Highs ~28–32°C with high humidity; long daylight; peak tourist season" },
    fullDescription: "Summer is New York at its hottest, busiest and most energetic. Daytime highs sit around 28–32°C, often with oppressive humidity and heat that radiates off the pavements and lingers in the subway, punctuated by dramatic afternoon thunderstorms and the occasional heatwave or tail-end of a tropical storm. The upside is a city in full swing: long daylight, rooftop bars, free outdoor concerts and film screenings, Shakespeare in the Park, street festivals and beach days out at Coney Island and Rockaway. It is peak tourist season, so the major museums and attractions are at their most crowded, and hotel prices are high. The trick is to plan around the heat: tackle outdoor sights and walks in the cooler morning and evening, and retreat to the city's superb air-conditioned museums in the sweltering middle of the day. Pack light, breathable clothes but also a light layer, because the indoor air-conditioning — in shops, restaurants and the subway — is often startlingly cold. Stay hydrated, and don't leave the umbrella at home despite the heat. For long days, buzzing streets and a packed events calendar, summer is wonderful, if sweaty.",
  },
  {
    name: "Autumn (September–November)", slug: "autumn", image: IMG, rating: 5, area: "Sep–Nov",
    tip: "September and October are prime time — mild, clear days and, in October, the parks and Hudson Valley ablaze with autumn colour. Book ahead.",
    filterKeys: [],
    description: "Autumn brings crisp, clear air and spectacular fall colour, and is one of the most popular times to visit.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Highs ~24°C (Sep) falling to ~12°C (Nov); peak fall colour in October" },
    fullDescription: "Autumn is many people's favourite time in New York, and September and October in particular are a sweet spot. Early autumn still enjoys mild, stable days around 24°C, with the summer humidity gone and clear, comfortable air perfect for walking, while October brings the spectacle of the fall foliage, the parks and the nearby Hudson Valley turning gold and red at their peak. As the season goes on, temperatures fall steadily to around 12°C by November, and the days shorten. It is one of the most popular times to visit, so expect fuller hotels and higher prices, especially in October and around the holidays, and book ahead. The New York City Marathon in early November brings an electric atmosphere across all five boroughs. Pack layers and a jacket for the cooler mornings and evenings, plus an umbrella. For crisp, clear weather, glorious colour and the city looking its best — without the summer heat — autumn is superb, arguably the finest season of all to visit, and well worth planning a trip around if you can, especially to catch the foliage at its October peak.",
  },
  {
    name: "Winter (December–February)", slug: "winter", image: IMG, rating: 5, area: "Dec–Feb",
    tip: "Cold and often snowy, but magical at Christmas — the Rockefeller tree, ice rinks and Fifth Avenue windows. January and February bring the lowest hotel prices.",
    filterKeys: [],
    description: "Winter is cold and snowy but festive and atmospheric, with the lowest prices outside the holiday peak.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Highs ~4–6°C, often below freezing; snow and nor'easters; cheapest in Feb" },
    fullDescription: "Winter is New York at its coldest and, around the holidays, its most magical. Daytime highs are just 4–6°C and nights often drop below freezing, with snow common from December to February and the occasional powerful 'nor'easter' snowstorm that can briefly bring the city to a halt; the wind off the water makes it feel colder still. What winter lacks in warmth it makes up for in atmosphere. The run-up to Christmas is enchanting — the Rockefeller Center tree (lit in early December), ice rinks at Rockefeller, Bryant Park and Central Park, the elaborate Fifth Avenue store windows, and holiday markets at Bryant Park, Union Square and Columbus Circle. Outside the Christmas and New Year peak, this is the cheapest time to visit: February in particular brings the lowest flight and hotel prices, and the museums are blissfully quiet. The key is to plan around the cold: pack a warm coat, hat, gloves and waterproof shoes, build days around indoor sights and cosy restaurants, and embrace the festive sparkle. For budget travellers and lovers of a snowy, twinkling city, winter is a rewarding, crowd-free season — just dress for it.",
  },
  {
    name: "Best time to visit & what to pack", slug: "best-time-packing", image: IMG, rating: 5, area: "Planning",
    tip: "Layers and comfortable walking shoes are non-negotiable year-round — you'll cover 12–15 km a day on foot — and always pack an umbrella.",
    filterKeys: [],
    description: "Spring and autumn offer the best balance of weather, crowds and price; pack for four seasons and lots of walking.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Best overall: April–June & September–November; cheapest: February" },
    fullDescription: "So when should you go, and what should you bring? For the best balance, aim for spring (April to June) or autumn (September to November): the weather is mild and often beautiful — blossom in spring, foliage in autumn — the days are long enough for full sightseeing, and while these are popular months, they avoid the extremes of summer and winter. Choose summer (June to August) if you want long days, rooftop bars, outdoor events and beach trips, but be ready for heat, humidity, crowds and the highest prices. Choose winter (especially February) if budget is the priority and you don't mind the cold: flights and hotels are cheapest, the museums are quiet, and the holiday season is magical, if pricey around Christmas and New Year. Whatever the season, the packing rule is the same, because New York's weather swings sharply and you will walk a great deal — often 12 to 15 kilometres a day. Bring layers you can add and shed, genuinely comfortable walking shoes, and always an umbrella. Add a warm coat, hat and gloves for winter, and light, breathable clothes plus a layer for the fierce indoor air-conditioning in summer. Dress for four seasons and the city rarely catches you out.",
  },
];

function jsonLd() {
  return {
    "@type": "BreadcrumbList",
    "@context": "https://schema.org",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "New York", item: `${SITE}/new-york` },
      { "@type": "ListItem", position: 3, name: "Weather", item: `${SITE}/new-york/weather` },
    ],
  };
}

export default function NewYorkWeather() {
  return (
    <CityGuideShell
      citySlug="new-york"
      cityName="New York"
      categories={CATEGORIES}
      active="weather"
      crumb="Weather"
      h1="New York Weather & Best Time to Visit"
      heroImage={IMG}
      intro="New York's humid continental climate means four sharply distinct seasons: hot, humid summers, cold and snowy winters, and mild, beautiful springs and autumns in between. This guide walks through the weather month by month and season by season — temperatures, what to pack and what to expect — and pinpoints the best time to visit depending on whether you're chasing spring blossom, autumn colour, holiday sparkle or the lowest prices."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="New York weather season by season — in detail" items={INFO} />
    </CityGuideShell>
  );
}
