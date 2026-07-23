import type { Metadata } from "next";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { CATEGORIES } from "@/app/data/london-places";

const SITE = "https://flyamba.com";

export const metadata: Metadata = {
  title: "Weather in London 2026 — Climate & Best Time to Visit | Flyamba",
  description:
    "London weather month by month — spring, summer, autumn and winter temperatures, rainfall and daylight, plus the best time to visit and exactly what to pack for each season.",
  alternates: { canonical: `${SITE}/london/weather` },
  openGraph: { title: "London Weather & Best Time to Visit | Flyamba", description: "Season-by-season London climate and the best time to go.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "London", item: `${SITE}/london` },
      { "@type": "ListItem", position: 3, name: "Weather", item: `${SITE}/london/weather` },
    ],
  };
}

const IMG = "/images/content/photo-1504386106331-3e4e71712b38.avif";

const ITEMS: BcnPlace[] = [
  {
    name: "Spring (March–May)", slug: "spring", image: IMG, rating: 4.6, area: "London",
    tip: "Pack layers and a compact umbrella — spring days swing from chilly mornings to warm, bright afternoons.",
    filterKeys: [],
    description: "Mild, blossom-filled and increasingly bright — a lovely, less crowded time to visit.",
    practicalInfo: { openingHours: "Season: March, April, May", price: "Average highs 11–18°C, lows 4–9°C", howToGetThere: "Pack: layers, light jacket, umbrella, sunglasses" },
    fullDescription: "Spring is one of the loveliest times to visit London, as the city shakes off winter and bursts into colour. Temperatures climb steadily from cool March days (highs around 11°C) to pleasantly mild May (highs of 17–18°C), and daylight lengthens noticeably, giving you long, bright evenings by late May. The parks and gardens are the season's stars: cherry blossom, daffodils and tulips fill St James's Park, Hyde Park, Regent's Park and Kew Gardens, and the whole city feels fresh and green. It's still Britain, so showers are common and mornings can be chilly, meaning layers and a small umbrella are essential — but you'll also catch plenty of warm, sunny afternoons perfect for a riverside walk or a pub garden. Crowds are thinner than in peak summer and hotel prices more reasonable, apart from the Easter holidays. Highlights include the Chelsea Flower Show in late May and the buzz of outdoor life returning. Pack a light jacket, a jumper or two, comfortable waterproof shoes and both sunglasses and a brolly, and you'll be ready for spring's changeable but rewarding mix of blossom, brightness and the odd passing shower.",
  },
  {
    name: "Summer (June–August)", slug: "summer", image: IMG, rating: 4.5, area: "London",
    tip: "Long daylight until ~21:30 means you can pack far more into a day — but book everything well ahead, as it's peak season.",
    filterKeys: [],
    description: "Warm, long and lively — peak season, with the best weather and the biggest crowds.",
    practicalInfo: { openingHours: "Season: June, July, August", price: "Average highs 20–24°C (heatwaves to 30°C+), lows 12–15°C", howToGetThere: "Pack: light clothes, sunscreen, a light layer, plus a small umbrella" },
    fullDescription: "Summer is peak season in London, bringing the warmest weather, the longest days and the liveliest atmosphere — along with the biggest crowds and highest prices. Average highs sit around 20–24°C, with occasional heatwaves pushing past 30°C, and daylight stretches gloriously until about 9:30pm in June, letting you cram far more into each day. The city is at its most vibrant: parks fill with picnics and open-air concerts, riverside terraces and pub gardens buzz, and the calendar overflows with events, from Wimbledon and Trooping the Colour to Pride and the huge Notting Hill Carnival in late August. The catch is that everyone else has the same idea, so major attractions, hotels and restaurants are busy and pricey, and you should book flights, accommodation and timed tickets well in advance. Note that London is built for cooler weather, so many older buildings, hotels and Tube lines lack air conditioning and can feel stuffy in a heatwave — carry water and plan indoor, air-conditioned sights for the hottest afternoons. Pack light, breathable clothing and sunscreen, but keep a light layer and small umbrella handy, as even summer brings the odd cool evening or sudden shower. It's London at its most energetic and rewarding.",
  },
  {
    name: "Autumn (September–November)", slug: "autumn", image: IMG, rating: 4.5, area: "London",
    tip: "September often delivers summer-like warmth with far fewer crowds — arguably the sweet spot for a London visit.",
    filterKeys: [],
    description: "Golden parks, mild early weeks and thinning crowds giving way to crisp, cosy November.",
    practicalInfo: { openingHours: "Season: September, October, November", price: "Average highs 9–19°C, lows 5–12°C", howToGetThere: "Pack: layers, warm jacket, scarf, waterproof shoes, umbrella" },
    fullDescription: "Autumn is an underrated time to visit London, often blending pleasant weather with fewer crowds and lower prices than summer. September frequently feels like an extension of summer, with warm, sunny days (highs around 19°C) but noticeably thinner queues once the school holidays end, making it arguably the sweet spot of the year. As the season progresses, temperatures cool to crisp October days and chilly, darker November, when highs drop to around 9–10°C and the clocks go back at the end of October, shortening the afternoons. The city looks beautiful, with the great parks — Hyde Park, Kew Gardens, Hampstead Heath, Richmond — turning gold and russet, ideal for atmospheric walks. It's a rich cultural season too, as theatres launch new productions, museums open major exhibitions, and Bonfire Night on 5 November brings firework displays across the city. Rain becomes more frequent, and the light fades early by late autumn, so a warm, waterproof jacket, scarf, layers and sturdy shoes are the order of the day. Bring an umbrella and plan cosy indoor options — museums, galleries, historic pubs — around outdoor sightseeing. For golden scenery, a lively cultural calendar and a calmer, better-value city, autumn is a genuinely lovely choice.",
  },
  {
    name: "Winter (December–February)", slug: "winter", image: IMG, rating: 4.4, area: "London",
    tip: "December sparkles with festive lights and markets, while January and February bring the year's cheapest flights and hotels.",
    filterKeys: [],
    description: "Cold, dark and often grey, but magical at Christmas and the cheapest time to visit.",
    practicalInfo: { openingHours: "Season: December, January, February", price: "Average highs 7–9°C, lows 2–5°C (rarely below freezing)", howToGetThere: "Pack: warm coat, hat, gloves, scarf, waterproof shoes, umbrella" },
    fullDescription: "Winter in London is cold, damp and often grey, with short days — but it has real magic, especially around the festive season, and it's the cheapest time to visit. Temperatures are chilly rather than bitter, with highs of 7–9°C and lows a few degrees above freezing; snow is rare and rarely settles, but rain, wind and overcast skies are common, and darkness falls by around 4pm in December. The upside is atmosphere and value. December transforms the city: dazzling Christmas lights on Oxford and Regent Streets, festive markets, ice rinks at spots like Somerset House and the Natural History Museum, the Winter Wonderland fair in Hyde Park, carols and pantomimes, and department-store windows in full sparkle. After New Year, January and February are the quietest, cheapest months — the best time for bargain flights and hotels — and although the weather is at its bleakest, London's wealth of indoor attractions (its free museums and galleries, historic pubs, theatres and afternoon teas) is perfectly suited to cosy, weatherproof sightseeing. Wrap up warmly with a proper coat, hat, gloves, scarf and waterproof shoes, carry an umbrella, and build your days around indoor highlights with warming pub or café breaks. For festive sparkle or low-season savings, winter has its own strong appeal.",
  },
  {
    name: "Best time to visit London", slug: "best-time-to-visit", image: IMG, rating: 4.7, area: "London",
    tip: "For the best balance of weather, crowds and cost, target late spring (May) or early autumn (September).",
    filterKeys: [],
    description: "When to go for the best mix of weather, crowds and value.",
    practicalInfo: { openingHours: "Sweet spots: May & September", price: "Cheapest: January–February; Priciest: July–August & December", howToGetThere: "Always pack for changeable weather, whatever the month" },
    fullDescription: "There's no single perfect time to visit London — it depends on your priorities — but a few clear patterns help you choose. For the best all-round balance of pleasant weather, manageable crowds and reasonable prices, aim for the shoulder seasons of late spring (especially May) and early autumn (especially September): you get mild, often sunny days and long daylight without the peak-summer crush or cost. If warm weather, long evenings and the biggest events (Wimbledon, Pride, Notting Hill Carnival) matter most, come in July or August, but book well ahead and brace for crowds and premium prices. For the lowest costs, visit in January or February, when flights and hotels are at their cheapest and the city's superb indoor attractions shine, accepting cold, grey, short days in return. For festive magic, December is unbeatable, with lights, markets and ice rinks — but it's busy and pricey. Whatever month you choose, London's weather is famously changeable year-round, so the golden rule never varies: dress in layers and always carry a compact umbrella. Rain can appear in any season, and a bright morning can turn to showers by afternoon. Plan a flexible mix of indoor and outdoor sights, and London rewards a visit at any time of year.",
  },
];

export default function LondonWeather() {
  return (
    <CityGuideShell
      citySlug="london"
      cityName="London"
      categories={CATEGORIES}
      active="weather"
      crumb="Weather"
      h1="London Weather & Best Time to Visit"
      heroImage={IMG}
      intro="London's temperate, changeable climate rarely reaches extremes, but it keeps you on your toes year-round. This guide walks through the weather season by season — temperatures, rainfall, daylight and atmosphere — and pinpoints the best time to visit for your priorities, whether that's warm weather, low prices, festive sparkle or thinner crowds, with packing advice throughout."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="London weather, season by season" items={ITEMS} />
    </CityGuideShell>
  );
}
