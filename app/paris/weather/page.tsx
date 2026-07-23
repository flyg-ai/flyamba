import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { CATEGORIES } from "@/app/data/paris-places";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Paris Weather 2026 — When to Visit | Flyamba",
  description:
    "Paris weather season by season — spring blossom, warm summers around 22°C, golden autumns and cool, atmospheric winters. Average temperatures, rainfall, what to pack and the best time to visit the City of Light.",
  alternates: { canonical: `${SITE}/paris/weather` },
  openGraph: { title: "Paris Weather & Best Time to Visit | Flyamba", description: "Season-by-season weather and when to go to Paris.", type: "article" },
};

const PLACEHOLDER = "/images/barcelona/placeholder.webp";

const INFO: BcnPlace[] = [
  {
    name: "Spring in Paris (March–May)", slug: "spring", image: PLACEHOLDER,
    rating: 4.7, area: "8–20°C", tip: "Pack layers and a light raincoat — spring is lovely but showery, and evenings stay cool.",
    filterKeys: [],
    description: "Mild, blossom-filled and increasingly popular — many travellers' favourite season in Paris.",
    practicalInfo: { openingHours: "Days lengthening; ~12–13 hours daylight by May", price: "Shoulder-to-peak season pricing, rising into May", howToGetThere: "Gardens and riverside walks at their prettiest" },
    fullDescription: "Spring is many people's favourite time in Paris, and it's easy to see why. From a chilly, changeable March (highs around 11–13°C) the city warms steadily through April into a delightful May, when daytime temperatures reach the high teens to low 20s and the parks and boulevards burst into blossom — cherry trees around Notre-Dame and the Eiffel Tower, tulips in the formal gardens, chestnuts along the avenues. Café terraces reopen in earnest, the light turns soft and golden, and the Seine-side walks and gardens like the Luxembourg and Tuileries look their absolute best. The trade-off is unsettled weather: spring is one of the wetter, more showery seasons, so rain can arrive without warning and mornings and evenings stay cool, meaning you should pack layers, a light waterproof and a scarf. Crowds and prices build as the season progresses, with Easter and May's public holidays especially busy. Overall, late April and May offer a wonderful balance of pleasant temperatures, beautiful scenery and long daylight hours, making spring one of the loveliest and most rewarding times to visit the city.",
  },
  {
    name: "Summer in Paris (June–August)", slug: "summer", image: PLACEHOLDER,
    rating: 4.4, area: "16–26°C (heatwaves higher)", tip: "The warmest months are also the busiest — book everything ahead, and note many locals leave in August.",
    filterKeys: [],
    description: "Warm, long days and a lively festival season, but the peak of crowds, prices and the odd heatwave.",
    practicalInfo: { openingHours: "Longest days (~16 hours daylight in June)", price: "Peak season; highest flight and hotel prices", howToGetThere: "Paris Plages turns the Seine banks into summer beaches" },
    fullDescription: "Summer brings Paris its warmest, longest days and a festive, event-filled atmosphere. Average highs sit around 24–26°C, with June and July the sunniest months and long evenings that stay light until nearly 10pm, perfect for riverside strolls, rooftop drinks and open-air cinema. The city buzzes with festivals — the Fête de la Musique in June, Bastille Day on 14 July, the Paris Plages 'beaches' along the Seine and outdoor concerts — and the café terraces are in full swing. Two caveats matter, though. First, this is peak tourist season, so the major sights, flights and hotels are at their most crowded and expensive; book tickets and rooms well ahead and expect queues. Second, climate change has made summer heatwaves more frequent, with spells pushing past 35°C, and because many older Paris hotels and the Métro lack air conditioning, that can be genuinely uncomfortable — carry water and plan indoor, cooler activities in the hottest afternoons. Note too that many Parisians leave the city in August, so some smaller restaurants and shops close for the holidays, giving parts of the city a quieter, emptier feel even as the tourist sights stay busy.",
  },
  {
    name: "Autumn in Paris (September–November)", slug: "autumn", image: PLACEHOLDER,
    rating: 4.6, area: "7–21°C", tip: "September is a sweet spot — warm, less crowded and full of cultural openings as the season restarts.",
    filterKeys: [],
    description: "Golden light, thinning crowds and the return of the city's cultural life — a superb time to visit.",
    practicalInfo: { openingHours: "Daylight shortening from ~13 to ~9 hours", price: "Shoulder season; better value than summer", howToGetThere: "Parks glorious in autumn colour; museums relaunch programmes" },
    fullDescription: "Autumn is one of the best-kept secrets for visiting Paris, especially September, which many regulars consider the ideal month. Early autumn holds onto summer's warmth — September highs around 21°C — while the peak crowds thin out as the holidays end, giving you pleasant weather with shorter queues and slightly softer prices. The season also marks 'la rentrée', when Parisian cultural life restarts in force: new exhibitions open, theatres and concert halls relaunch, and the city feels energised and local again. As the weeks pass, temperatures cool through October (highs around 16°C) into a crisp, damper November (around 10°C), and the parks — the Luxembourg, Tuileries, Buttes-Chaumont — turn beautiful shades of gold and russet, wonderful for photography and walks. Rain becomes more frequent later in the season, and daylight shortens noticeably, so pack layers, a warm jacket for November and an umbrella. The atmospheric light, the autumn colours, the manageable crowds and the buzz of the cultural calendar make September and October in particular a genuinely rewarding, good-value time to experience the city much as Parisians do.",
  },
  {
    name: "Winter in Paris (December–February)", slug: "winter", image: PLACEHOLDER,
    rating: 4.3, area: "3–8°C", tip: "It's cold, grey and short on daylight — but atmospheric, cheaper and quietest, and magical at Christmas.",
    filterKeys: [],
    description: "Cold, grey and quiet, but romantic and affordable — with Christmas lights and the year's lowest prices.",
    practicalInfo: { openingHours: "Shortest days (~8–9 hours daylight)", price: "Low season (except Christmas/New Year); cheapest flights", howToGetThere: "Festive markets and lights in December; museums blissfully uncrowded" },
    fullDescription: "Winter is Paris at its quietest, cheapest and, some would argue, most romantic. Temperatures are cold rather than extreme — daytime highs of 5–8°C, dropping near freezing at night, with occasional frost and rare snow — and the days are short and often grey and damp, so this is the season for warm coats, scarves and a good umbrella. The pay-off is real: outside the Christmas and New Year period, February and much of January bring the lowest flight and hotel prices of the year and blissfully thin crowds, meaning you can wander the Louvre or climb the Eiffel Tower with far shorter queues. December is a magical exception, with festive lights strung along the Champs-Élysées and department-store windows, Christmas markets, ice rinks and a cosy, celebratory mood, so it draws crowds and higher prices around the holidays. Winter is made for indoor Paris — its world-class museums, glass-roofed covered passages, cafés, brasseries and long lunches — punctuated by crisp walks along an uncrowded Seine. If you don't mind bundling up and the shorter daylight, visiting in the depths of winter (particularly February) offers the best value and the most local, unhurried experience of the city.",
  },
  {
    name: "Best Time to Visit & What to Pack", slug: "best-time-to-visit", image: PLACEHOLDER,
    rating: 4.6, area: "Year-round", tip: "For the best balance of weather, value and light crowds, target late April–May or September.",
    filterKeys: [],
    description: "A quick verdict on when to go, and what to pack for each season in Paris.",
    practicalInfo: { openingHours: "—", price: "Cheapest Feb & Nov; priciest summer & Christmas", howToGetThere: "Comfortable walking shoes essential in every season" },
    fullDescription: "So when should you go? For the finest overall experience, aim for late spring (late April to May) or early autumn (September), when temperatures are pleasant, the parks and light are gorgeous, and the crowds and prices sit below the summer peak — September edges it for many, combining warmth with the buzz of the cultural 'rentrée'. Choose summer (June–August) if you want the longest days, warmest weather and the fullest festival calendar, and can accept peak crowds, top prices, possible heatwaves and August closures. Choose winter (especially February) if value and quiet matter most: it's cold and grey, but flights and hotels are cheapest, sights are uncrowded, and December adds festive sparkle. Whatever the season, a few packing rules hold: bring genuinely comfortable walking shoes, because you'll cover miles on foot and cobbles; pack layers and a light waterproof or umbrella, as rain is possible year-round; add a warm coat, scarf and gloves for November to February; and pack something a little smarter for dinners, cabaret or a nice restaurant, where Parisians dress with care. With the right layers, Paris rewards a visit in every season.",
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Paris", item: `${SITE}/paris` },
      { "@type": "ListItem", position: 3, name: "Weather", item: `${SITE}/paris/weather` },
    ],
  };
}

export default function ParisWeather() {
  return (
    <CityGuideShell
      citySlug="paris"
      cityName="Paris"
      categories={CATEGORIES}
      active="weather"
      crumb="Weather"
      h1="Paris Weather & When to Visit"
      heroImage="/images/paris/sevardheter/jardin-du-luxembourg.webp"
      intro="Paris is a year-round city, but each season has a distinct character. Summers are warm and long, peaking around 22–26°C; spring and autumn bring mild days, beautiful light and gardens at their prettiest; and winters are cold, grey and quiet but atmospheric and cheap. This guide walks through the weather season by season — average temperatures, rainfall and daylight — then gives a clear verdict on the best time to visit and exactly what to pack, whenever you decide to go."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Paris weather in detail" items={INFO} />
    </CityGuideShell>
  );
}
