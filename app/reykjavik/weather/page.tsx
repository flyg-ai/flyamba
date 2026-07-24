import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/reykjavik-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Reykjavik Weather 2026 — Best Time to Visit & What to Pack | Flyamba",
  description:
    "Reykjavik weather season by season — temperatures, daylight, the midnight sun and northern lights, and what to pack, plus the best time to visit for nature, aurora or lower prices.",
  alternates: { canonical: `${SITE}/reykjavik/weather` },
  openGraph: { title: "Reykjavik Weather & Best Time to Visit | Flyamba", description: "Season-by-season temperatures, daylight and packing tips for Reykjavik.", type: "article" },
};

const IMG = "/images/reykjavik/attractions/sun-voyager.webp";

const INFO: BcnPlace[] = [
  {
    name: "Reykjavik's climate in a nutshell", slug: "climate-overview", image: IMG, rating: 5, area: "Year-round",
    tip: "The Icelandic saying holds: 'If you don't like the weather, wait five minutes.' Pack waterproof layers whatever the month.",
    filterKeys: [],
    description: "Reykjavik has a cool, wet and famously changeable maritime climate, milder than its latitude suggests thanks to the Gulf Stream.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Summer highs ~10–14°C; winter ~0 to 3°C; wind and rain year-round" },
    fullDescription: "Despite sitting just below the Arctic Circle, Reykjavik has a surprisingly mild — if cool, wet and wildly changeable — maritime climate, kept from real extremes by the warming influence of the Gulf Stream. Summers are cool rather than warm, with daytime highs typically around 10 to 14°C in July and August, while winters are cold but rarely brutal, hovering around 0 to 3°C with only intermittent frost and snow in the city itself. The defining features aren't temperature but wind, rain and light: the weather changes constantly, it's common to get sun, cloud, rain and wind in a single hour, and the wind off the North Atlantic can make it feel far colder than the thermometer says. Rainfall is spread across the year, with autumn and winter the wettest and windiest. The two great natural spectacles are seasonal — the midnight sun around the summer solstice, when it barely gets dark, and the northern lights on clear nights from September to March. The practical upshot: whenever you visit, pack warm, waterproof, windproof layers, and don't count on sunshine. Download the Icelandic weather app Veður, as conditions shift fast.",
  },
  {
    name: "Summer (June–August) — the midnight sun", slug: "summer", image: IMG, rating: 5, area: "Jun–Aug",
    tip: "Around the June solstice it never truly gets dark — but that also means no northern lights until autumn.",
    filterKeys: [],
    description: "Summer brings the midnight sun, the mildest weather and the best conditions for nature — but also the peak crowds and prices.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Highs ~10–14°C; near-24-hour daylight around the solstice; peak season" },
    fullDescription: "Summer is Reykjavik's peak season and, for many, the best time to visit. Daytime highs sit around a mild 10 to 14°C — pleasant rather than hot — but the headline is the light: around the June solstice the sun barely sets, giving near-24-hour daylight and the famous midnight sun, when the sky stays golden or rosy well past midnight. That endless light transforms the city and the country, opening up long evenings of sightseeing, late-night hikes and a buzzing outdoor social scene, and it's the season when all the Highland roads and day-trip routes are open and the weather is at its most cooperative for exploring waterfalls, glaciers and coastlines. It's also whale- and puffin-watching prime time. The trade-offs are real: this is when crowds are thickest, when hotels and rental cars are most expensive and scarcest, so booking well ahead is essential. And because it never gets dark, you won't see the northern lights until autumn. The weather remains changeable and often windy, so pack layers and waterproofs even in July. For long days, milder temperatures, open roads and the magic of the midnight sun, summer is wonderful — just reserve everything early.",
  },
  {
    name: "Autumn (September–October)", slug: "autumn", image: IMG, rating: 5, area: "Sep–Oct",
    tip: "September is a sweet spot: the aurora returns, prices ease and the roads are still mostly open.",
    filterKeys: [],
    description: "Autumn brings the return of the northern lights, autumn colours, thinning crowds and lower prices — a smart shoulder season.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Highs ~7–11°C; darkening evenings; aurora season begins; wetter and windier" },
    fullDescription: "Autumn is an underrated and often excellent time to visit Reykjavik, particularly September. As the near-endless summer light fades, the nights grow dark enough for the northern lights to return from around early September, so you can combine reasonably mild days with real aurora-hunting on clear nights — a combination the deep summer can't offer. Temperatures cool gradually from highs of around 11°C in early September to about 7°C by late October, and the landscapes take on autumn colour in the birch and heath. Crucially, the peak-season crowds thin out and prices for flights and hotels ease, making it better value than summer while much of the country is still accessible, though the Highland F-roads begin to close as the season progresses. The trade-off is weather: autumn is noticeably wetter and windier, with more grey, blustery days and a real chance of the first snow later on, so flexibility helps. Pack warm, thoroughly waterproof and windproof layers, and keep an eye on the forecast and road conditions. For travellers who want the northern lights, fewer people, lower prices and still-open roads, September and early October are a genuinely smart choice — one of the best-value windows of the whole year.",
  },
  {
    name: "Winter (November–February) — northern lights", slug: "winter", image: IMG, rating: 5, area: "Nov–Feb",
    tip: "Short days but the best aurora odds and the lowest prices — February is the cheapest month to fly.",
    filterKeys: [],
    description: "Winter is dark, cold and atmospheric, with the best northern-lights chances, festive lights and the year's lowest prices.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Highs ~0–3°C; only 4–6 hours of daylight in December; peak aurora season" },
    fullDescription: "Winter is Reykjavik at its darkest, coldest and most atmospheric — and, for aurora-chasers, most rewarding. Daytime highs hover around 0 to 3°C, and the days are very short, with as little as four to five hours of daylight around the December solstice, so you plan sightseeing for the middle of the day and evenings around cosy cafés, geothermal pools and the northern lights. This is peak aurora season, when long, dark nights give the best chance of seeing the lights dance overhead on clear nights — head out of the city to escape the light pollution, or take a guided tour, and check the aurora forecast. Snow dusts the streets and the surrounding mountains, and the run-up to Christmas and New Year brings festive lights, markets and Reykjavik's famously explosive New Year's Eve fireworks. Outside that holiday peak, winter is the cheapest time to visit, with February and November the lowest months for flights and hotels. The keys are to dress for the cold and dark — warm coat, hat, gloves, waterproof boots and layers — to build days around indoor sights and hot pools, and to allow flexibility, as storms can close roads. For budget travellers and aurora seekers who don't mind bundling up, winter is magical.",
  },
  {
    name: "Spring (March–May)", slug: "spring", image: IMG, rating: 5, area: "Mar–May",
    tip: "March still offers aurora and snow; by May the days are long and prices are lower than summer.",
    filterKeys: [],
    description: "Spring is a transitional shoulder season — lengthening days, receding snow, aurora into March and gentler prices before the summer rush.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Highs ~3°C (Mar) rising to ~9°C (May); rapidly lengthening days; changeable" },
    fullDescription: "Spring is a transitional shoulder season in Reykjavik, and a rewarding, better-value alternative to the summer peak. In March the city is still firmly wintry, with snow, cold and — importantly — enough darkness for the northern lights, which remain visible on clear nights through to around the equinox, often with strong activity. As the weeks pass the transformation is dramatic: daylight lengthens rapidly (Iceland gains daylight faster than almost anywhere), temperatures climb from highs of around 3°C in March to a milder 9°C by May, and the snow recedes to reveal the greening landscape. By late spring the days are long, the roads are increasingly open and the country feels reborn, yet crowds and prices remain well below the July and August rush. The weather is famously unpredictable in this season, swinging between sun, rain, wind and late snow, sometimes all in a day, so flexibility and good waterproofs are essential. May in particular offers a lovely balance of long days, thinner crowds and lower costs. For travellers who want a bit of everything — a chance of late aurora and snow early on, long bright days later, and gentler prices throughout — spring, especially April and May, is a smart and often overlooked time to visit.",
  },
  {
    name: "Best time to visit & what to pack", slug: "best-time-packing", image: IMG, rating: 5, area: "Planning",
    tip: "Layers, a waterproof shell and swimwear for the geothermal pools are non-negotiable in every season.",
    filterKeys: [],
    description: "The best time depends on your goal: summer for the midnight sun and open roads, September to March for aurora, February for the lowest prices.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Best for nature: Jun–Aug; best for aurora: Sep–Mar; cheapest: February & November" },
    fullDescription: "So when should you go, and what should you bring? It comes down to your priority. For the midnight sun, the mildest weather, open Highland roads and the fullest range of tours and wildlife, choose summer (June to August) — but expect the highest prices and heaviest crowds, and book everything far ahead. For the northern lights, choose the darker months from September to March, when long nights give you a real chance of the aurora on clear evenings, ideally away from the city lights. For the lowest prices and a quiet, atmospheric, snow-dusted city, choose deep winter, especially February and November, the cheapest months to fly, accepting short days and cold. Spring and early autumn offer appealing middle grounds of lengthening or shortening light, lower prices and fewer people. Whatever the season, the packing advice barely changes, because Iceland's weather is relentlessly changeable: bring warm, layerable clothing, and above all a genuinely waterproof and windproof outer shell, plus sturdy, water-resistant walking shoes. Add a warm coat, hat and gloves for autumn to spring, and — year-round — a swimsuit and towel for the geothermal pools and lagoons that are central to Icelandic life. Dress for four seasons in a day and Reykjavik will rarely catch you out.",
  },
];

function jsonLd() {
  return {
    "@type": "BreadcrumbList",
    "@context": "https://schema.org",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Reykjavik", item: `${SITE}/reykjavik` },
      { "@type": "ListItem", position: 3, name: "Weather", item: `${SITE}/reykjavik/weather` },
    ],
  };
}

export default function ReykjavikWeather() {
  return (
    <CityGuideShell
      citySlug="reykjavik"
      cityName="Reykjavik"
      categories={CATEGORIES}
      active="weather"
      crumb="Weather"
      h1="Reykjavik Weather & Best Time to Visit"
      heroImage={IMG}
      intro="Reykjavik's cool, wet and famously changeable maritime climate is milder than its near-Arctic latitude suggests, but it's defined by wind, rain and, above all, light — the near-endless days of the summer midnight sun and the long dark nights that bring the northern lights from autumn to spring. This guide walks through the weather and daylight season by season, explains when to come for nature, aurora or the lowest prices, and covers exactly what to pack for a country where four seasons can pass in an afternoon."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Reykjavik weather season by season — in detail" items={INFO} />
    </CityGuideShell>
  );
}
