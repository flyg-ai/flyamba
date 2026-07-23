import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/amsterdam-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Amsterdam Weather 2026 — Best Time to Visit & What to Pack | Flyamba",
  description:
    "Amsterdam weather month by month — temperatures, rainfall and what to pack for every season, plus the best time to visit for tulips, sunshine and lower prices.",
  alternates: { canonical: `${SITE}/amsterdam/weather` },
  openGraph: { title: "Amsterdam Weather & Best Time to Visit | Flyamba", description: "Season-by-season temperatures, rainfall and packing tips for Amsterdam.", type: "article" },
};

const IMG = "/images/amsterdam/sevardheter/vondelpark.webp";

const INFO: BcnPlace[] = [
  {
    name: "Amsterdam's climate in a nutshell", slug: "climate-overview", image: IMG, rating: 5, area: "Year-round",
    tip: "There's no truly dry season — pack a rain jacket and layers whatever the month.",
    filterKeys: [],
    description: "Amsterdam has a mild, changeable maritime climate with rain possible in any season.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Summer highs ~20–22°C; winter ~3–6°C; rain year-round" },
    fullDescription: "Amsterdam has a temperate maritime climate, which in practice means mild temperatures, plenty of grey skies and the ever-present chance of rain — but rarely extremes of heat or cold. Summers are pleasantly warm rather than hot, with daytime highs typically around 20–22°C in July and August, while winters are cold and damp but seldom bitter, hovering around 3–6°C with only occasional frost, ice or a dusting of snow. The North Sea and the city's low, flat position make the weather notably changeable: it's common to get sunshine, cloud and a shower all in one day, and the wind can make it feel cooler than the thermometer suggests, especially along the open canals and out by the IJ. Crucially, there is no real dry season — rainfall is spread fairly evenly across the year, though autumn (October–November) tends to be the wettest and driest spells are most likely in spring. The upshot for visitors is simple: whenever you come, pack layers and a waterproof, don't count on wall-to-wall sunshine, and be ready to duck into a cosy brown café or a museum when a shower blows through. It's a city that's atmospheric in any weather.",
  },
  {
    name: "Spring (March–May) — tulip season", slug: "spring", image: IMG, rating: 5, area: "Mar–May",
    tip: "April and May are arguably the best months — tulips, King's Day and lengthening days.",
    filterKeys: [],
    description: "Spring brings blossom, tulips, King's Day and the reopening of terraces — a lovely time to visit.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Highs ~9°C (Mar) rising to ~18°C (May); Keukenhof mid-Mar to mid-May" },
    fullDescription: "Spring is one of the very best times to visit Amsterdam, as the city shakes off winter and bursts into colour. Temperatures climb from chilly highs of around 9°C in March to a pleasant 15–18°C by May, the days lengthen dramatically, and café terraces spill back out onto the pavements and canal sides. The headline draw is the tulips: the famous Keukenhof gardens near Lisse open from mid-March to mid-May, and the surrounding bulb fields blaze with colour through April, making it the classic season for a flower-focused trip. Spring is also when the city throws its biggest party — King's Day (Koningsdag) on 27 April, a citywide orange-clad street festival — so book accommodation well ahead if you're visiting then. The weather is improving but still unpredictable, with sunny spells mixed with showers and cool, breezy days, so bring layers, a light waterproof and something warmer for the evenings. Crowds and prices build toward late spring and around King's Day but are generally lower than peak summer. For blossom, blooms, festivities and comfortable sightseeing temperatures without the July heat or crush, spring — especially late April and May — is hard to beat.",
  },
  {
    name: "Summer (June–August) — peak season", slug: "summer", image: IMG, rating: 5, area: "Jun–Aug",
    tip: "Warmest and liveliest but busiest and priciest — book everything well in advance.",
    filterKeys: [],
    description: "Summer is warm, long-lit and festival-filled, but also the busiest and most expensive season.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Highs ~20–22°C; long daylight to ~22:00; Pride in early August" },
    fullDescription: "Summer is Amsterdam's peak season, when the city is at its warmest, liveliest and busiest. Daytime highs sit around a comfortable 20–22°C (with the odd hotter spell into the high 20s), the daylight is gloriously long — light lingers until around 10pm in June — and the whole city moves outdoors: canal-side terraces are packed, Vondelpark fills with picnickers, boats crowd the waterways and there's a festival or open-air event almost every week. Early August brings Amsterdam Pride, culminating in the spectacular Canal Parade of boats, one of the year's biggest celebrations. The trade-offs are real, though: this is when crowds are thickest at the major museums and along the canals, and when hotel prices and flight fares hit their annual peak, so booking well ahead — accommodation especially — is essential. The weather, while warm, is still changeable, so don't leave the rain jacket at home, and note that many places lack air-conditioning during heatwaves. For sunshine, long evenings, buzzing terraces and the fullest events calendar, summer is wonderful; just come prepared for company and higher costs, reserve timed-entry museums early, and embrace the city's outdoor, water-loving mood.",
  },
  {
    name: "Autumn (September–November)", slug: "autumn", image: IMG, rating: 5, area: "Sep–Nov",
    tip: "September is a sweet spot — mild, quieter and cheaper; November is wet but cosy and cheap.",
    filterKeys: [],
    description: "Autumn cools and dampens but offers fewer crowds, lower prices and cosy indoor charm.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Highs ~19°C (Sep) falling to ~9°C (Nov); wettest months; ADE in October" },
    fullDescription: "Autumn sees Amsterdam cool down, quieten and turn cosy, and it can be an excellent time to visit — particularly September, one of the year's sweet spots. Early autumn still enjoys mild, pleasant days around 17–19°C with the summer crowds thinning and prices easing, making it great for comfortable sightseeing and canal-side lingering without the peak crush. As the season progresses, temperatures drop steadily to around 9°C by November, the days shorten, and the weather turns noticeably wetter and windier — October and November are among the rainiest months, with grey skies and blustery spells common. That said, the damp weather suits Amsterdam's indoor pleasures perfectly: this is prime season for its world-class museums and its warm, characterful brown cafés. Late October brings the Amsterdam Dance Event (ADE), the world's largest electronic-music conference and festival, filling clubs and venues across the city for five days. Autumn also delivers lower flight and hotel prices, especially in November, one of the cheapest months to fly. Pack warm layers, a proper waterproof and an umbrella, plan plenty of indoor options around the weather, and enjoy a mellower, more local-feeling Amsterdam. For value, culture and fewer crowds, autumn is a smart, underrated choice.",
  },
  {
    name: "Winter (December–February)", slug: "winter", image: IMG, rating: 5, area: "Dec–Feb",
    tip: "Cold, dark and atmospheric — the Amsterdam Light Festival brightens the canals December to January.",
    filterKeys: [],
    description: "Winter is cold, short-lit and quiet, but festive, cheap and full of cosy atmosphere.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Highs ~3–6°C; short days; Light Festival late Nov–mid-Jan; February cheapest" },
    fullDescription: "Winter is Amsterdam at its quietest, darkest and most atmospheric. Temperatures hover around 3–6°C by day and can dip below freezing at night, the days are short (dark by around 5pm in December), and while heavy snow is rare, damp, grey, windy weather is the norm — it feels colder than the numbers because of the wind off the water. What winter lacks in daylight it makes up for in mood and value. The run-up to Christmas brings festive markets, lights and ice-skating, and from late November into mid-January the Amsterdam Light Festival strings dozens of illuminated art installations along the canals, best seen from a warm evening cruise. Outside the Christmas and New Year peak, this is the cheapest time to visit — February and November are the lowest months for flights and hotels — and the major museums are blissfully uncrowded, which is a real bonus for the Rijksmuseum, Van Gogh and Anne Frank House. The key is to plan around the cold and dark: pack a warm coat, hat, gloves and waterproof shoes, build your days around indoor sights and cosy cafés, and embrace the candlelit, glühwein-and-gezelligheid charm. For budget travellers and museum lovers who don't mind bundling up, winter is a rewarding, crowd-free season.",
  },
  {
    name: "Best time to visit & what to pack", slug: "best-time-packing", image: IMG, rating: 5, area: "Planning",
    tip: "Layers and a waterproof are non-negotiable in every season — the weather changes hour to hour.",
    filterKeys: [],
    description: "Spring and early autumn offer the best balance of weather, blooms, crowds and price.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Best overall: April–May and September; cheapest: February & November" },
    fullDescription: "So when should you go, and what should you bring? For the best overall balance, aim for late spring (April–May) or early autumn (September): the weather is mild and often sunny, the days are long enough for full sightseeing, and crowds and prices sit below the July–August peak — with the bonus of tulips and King's Day in spring. Choose peak summer (June–August) if you want the warmest weather, long light evenings, buzzing terraces and the biggest events (including Pride), but expect the highest prices and heaviest crowds, and book far ahead. Choose winter (particularly February and November) if budget is the priority and you don't mind cold, dark days: flights and hotels are cheapest, museums are quiet, and the Light Festival adds festive sparkle. Whatever the season, the packing advice is the same, because Amsterdam's weather is famously changeable: bring layers you can add and shed, and always pack a proper waterproof jacket and comfortable, water-resistant walking shoes for the cobbles and the rain. Add a warm coat, hat and gloves for autumn and winter, sunglasses and a light layer for summer evenings, and — year-round — an umbrella that can cope with wind. Dress for four seasons in one day and Amsterdam will rarely catch you out.",
  },
];

function jsonLd() {
  return {
    "@type": "BreadcrumbList",
    "@context": "https://schema.org",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Amsterdam", item: `${SITE}/amsterdam` },
      { "@type": "ListItem", position: 3, name: "Weather", item: `${SITE}/amsterdam/weather` },
    ],
  };
}

export default function AmsterdamWeather() {
  return (
    <CityGuideShell
      citySlug="amsterdam"
      cityName="Amsterdam"
      categories={CATEGORIES}
      active="weather"
      crumb="Weather"
      h1="Amsterdam Weather & Best Time to Visit"
      heroImage={IMG}
      intro="Amsterdam's mild, changeable maritime climate means comfortable summers, cold-but-rarely-bitter winters and the chance of a shower in any season. This guide walks through the weather month by month and season by season — temperatures, rainfall and what to pack — and pinpoints the best time to visit depending on whether you're chasing tulips, sunshine, festivals or the lowest prices."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Amsterdam weather season by season — in detail" items={INFO} />
    </CityGuideShell>
  );
}
