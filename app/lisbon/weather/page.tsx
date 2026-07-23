import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/lisbon-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Lisbon Weather & Best Time to Visit 2026 — Guide | Flyamba",
  description:
    "When to visit Lisbon — a season-by-season guide to Europe's sunniest capital, with temperatures, rainfall, sea conditions, crowds, flight prices and what to pack.",
  alternates: { canonical: `${SITE}/lisbon/weather` },
  openGraph: { title: "Lisbon Weather & Best Time to Visit | Flyamba", description: "Season-by-season weather and the best time to visit Lisbon.", type: "article" },
};

const WEATHER: BcnPlace[] = [
  {
    name: "Best Time to Visit", slug: "best-time", image: "/images/lisbon/sevardheter/miradouro-da-graa.webp",
    rating: 4.7, area: "Overview", filterKeys: [],
    tip: "Aim for late April to June or September — warm, sunny, swimmable and without the peak-summer heat and crowds.",
    description: "The sweet spot for a Lisbon trip, balancing warm weather, thinner crowds and fair fares.",
    practicalInfo: { openingHours: "Apr–Jun & Sep are ideal", price: "Shoulder-season fares from ~$275–350", howToGetThere: "Avoid the August heat, crowds and local closures" },
    fullDescription: "Lisbon is a genuinely year-round destination — it's the sunniest capital in Europe, with a mild Atlantic-Mediterranean climate and over 280 days of sunshine a year — but the best time to visit is spring and early autumn. The ideal windows are late April through June and the month of September, when days are warm and reliably sunny (highs of 20–27°C), the sea is warm enough to swim, the light is beautiful, and yet the crowds and prices haven't hit their July–August peak. Spring brings blossom and green hills; September and early October offer summer warmth with a gentler pace and the ocean at its warmest after a season of heating. High summer (July and August) is hot, busy and pricier, and many local businesses close for holidays in August, though the beaches are at their best. Winter (November to February) is mild but wetter and quieter, with the cheapest flights and hotels and few queues — fine for city sightseeing if you don't mind some rain and shorter days. For most visitors chasing the classic Lisbon of sunshine, terraces and beach day trips without the crush, the shoulder seasons are the clear winners.",
  },
  {
    name: "Spring (March–May)", slug: "spring", image: "/images/lisbon/dagsutflykter/sintra.webp",
    rating: 4.6, area: "Mar–May", filterKeys: [],
    tip: "A superb time to come — warm days, green landscapes and Easter and food festivals, but pack for the odd shower.",
    description: "Mild, blossoming and increasingly sunny, spring is one of the finest seasons in Lisbon.",
    practicalInfo: { openingHours: "Mild days, ~12–13h daylight", price: "Highs 15–22°C; occasional showers; moderate crowds", howToGetThere: "Pack layers, a light rain jacket and sunscreen" },
    fullDescription: "Spring is one of the loveliest times to experience Lisbon. Temperatures climb steadily from mild March highs around 15–17°C to warm, pleasant May days of 21–23°C, the light grows golden, and the surrounding countryside — especially the hills of Sintra and the Arrábida park — turns green and flower-strewn, making day trips particularly rewarding. There's still some Atlantic unpredictability, with the chance of showers, particularly earlier in the season, so a light rain jacket and layers are wise, but rainfall drops sharply as spring progresses and sunny days become the norm. Crowds are moderate and prices reasonable, well below the summer peak, giving you the sights, terraces and miradouros with breathing room. It's also a good season for events, from Easter celebrations to the Peixe em Lisboa food and wine festival. The sea is still on the cool side for swimming early on, warming toward late spring, so beaches are more for walking and surfing than lounging until May. For sightseeing, eating out on terraces and exploring the wider region in comfortable warmth without the summer intensity, spring is close to ideal — pack for sunshine but keep something for the occasional damp day.",
  },
  {
    name: "Summer (June–September)", slug: "summer", image: "/images/lisbon/strander/praia-de-carcavelos.webp",
    rating: 4.5, area: "Jun–Sep", filterKeys: [],
    tip: "Beach weather and festivals, but book ahead and start sightseeing early to dodge the midday heat and crowds.",
    description: "Hot, dry and buzzing — peak season for beaches, festivals and long, warm evenings.",
    practicalInfo: { openingHours: "Long, hot days, ~15h daylight", price: "Highs 26–32°C; peak fares ~$400+; busiest", howToGetThere: "Pack light clothes, a hat, sunscreen and swimwear" },
    fullDescription: "Summer is Lisbon's peak season, hot, dry and lively. From June to September highs typically sit between 26 and 30°C, occasionally spiking above 35°C during inland heat surges, though the Atlantic breeze and the city's riverside setting take the edge off compared with inland Spain. Rain is rare, the skies are reliably blue, and the long evenings are made for rooftop drinks and late dinners. This is prime time for the beaches — Carcavelos, Caparica, Guincho and the Cascais coast are at their best — and for the city's biggest party, the Festas de Lisboa around Santo António in June, when Alfama and Graça erupt with grilled sardines, music and street celebrations. The trade-offs are real: it's the busiest and most expensive time, with the biggest queues at major sights, and in August many local restaurants and shops close as Lisboetas take their own holidays. To make the most of it, book accommodation and popular attractions well ahead, tackle sightseeing and the hilltop viewpoints early in the day before the heat builds, retreat to a beach or a shaded miradouro in the afternoon, and save the old town's lanes for the cooler evenings. Stay hydrated and sun-smart, and summer delivers Lisbon at its most vibrant.",
  },
  {
    name: "Autumn (October–November)", slug: "autumn", image: "/images/lisbon/sevardheter/alfama.webp",
    rating: 4.5, area: "Oct–Nov", filterKeys: [],
    tip: "Early autumn is a hidden gem — warm sea, summer light and far fewer people, at much better prices.",
    description: "Warm, mellow and great value, with the sea still warm from summer and the crowds gone.",
    practicalInfo: { openingHours: "Mild, shortening days", price: "Highs 18–25°C easing to 16°C; great-value fares ~$250–350", howToGetThere: "Pack layers and a light rain jacket for later autumn" },
    fullDescription: "Autumn in Lisbon is underrated and, in its early weeks, arguably the best-value time to come. October often still feels like late summer, with warm, sunny days of 21–25°C, the ocean at its warmest after months of heating (so it's actually one of the better months for swimming), and the summer crowds and prices dropping away — a wonderful combination for beach days, terrace dining and day trips in comfortable warmth. As November arrives the weather cools to mild highs around 16–18°C and turns noticeably wetter, with the Atlantic bringing more cloud and rain, though plenty of bright, pleasant days remain. Flight and hotel prices are among the most attractive of the year outside the Web Summit dates in early November, when the huge tech conference fills the city and pushes accommodation costs up sharply. For sightseeing, the softer light and quieter streets make the miradouros, Alfama and Belém especially atmospheric. Pack for warmth and sunshine in October but bring layers and a light rain jacket as the month turns, and you'll enjoy a relaxed, affordable Lisbon with much of summer's appeal and little of its intensity. Early autumn, in particular, is a season savvy travellers deliberately seek out.",
  },
  {
    name: "Winter (December–February)", slug: "winter", image: "/images/lisbon/sevardheter/praa-do-comrcio.webp",
    rating: 4.3, area: "Dec–Feb", filterKeys: [],
    tip: "Mild and cheap, but pack an umbrella — perfect for museums, food and sightseeing without the queues.",
    description: "Mild but wetter, winter is quiet and cheap — ideal for culture, food and crowd-free sights.",
    practicalInfo: { openingHours: "Mild but rainier, ~10h daylight", price: "Highs 12–16°C; cheapest fares ~$240–265", howToGetThere: "Pack warm layers, a waterproof and an umbrella" },
    fullDescription: "Lisbon's winter is mild by European standards but the wettest and quietest part of the year. Daytime highs hold at a gentle 12–16°C and hard frosts are almost unheard of, but this is the rainy season, with the Atlantic delivering spells of cloud, showers and the occasional blustery downpour, alongside plenty of crisp, bright, sunny days in between — the weather is changeable rather than consistently grim. Days are short, and the sea is too cold for swimming. The upside is that this is comfortably the cheapest and least crowded time to visit: flights dip to their lowest (February in particular is a bargain), hotels are affordable, and the major sights, viewpoints and museums can be enjoyed with barely a queue. It suits a culture-and-food focused city break — the Gulbenkian and Tile museums, the monasteries of Belém, long lunches, fado nights and cosy tascas — more than a beach trip. Christmas and New Year are a lively exception, when the city lights up, markets appear and Praça do Comércio hosts a big New Year's Eve fireworks display, briefly pushing prices back up. Pack warm layers, a waterproof and an umbrella, plan indoor options for the wet days, and you'll have Lisbon's charm largely to yourself at a fraction of the summer cost.",
  },
  {
    name: "Sea Temperature & Beach Season", slug: "sea-beaches", image: "/images/lisbon/strander/praia-do-tamariz.webp",
    rating: 4.4, area: "Coast", filterKeys: [],
    tip: "The Atlantic here is bracing year-round — even in summer it rarely tops 20°C, so a wetsuit helps for longer swims.",
    description: "When to swim near Lisbon, and why the Atlantic stays cooler than you might expect.",
    practicalInfo: { openingHours: "Best swimming Jun–Sep (warmest Aug–Sep)", price: "Sea temp ~15°C winter to ~19–20°C late summer", howToGetThere: "Trains to Carcavelos, Cascais, Estoril and Costa da Caparica" },
    fullDescription: "It's worth knowing that the sea around Lisbon is the open Atlantic, not the calmer, warmer Mediterranean, so the water stays notably cooler than at Spanish or Italian resorts even in high summer. Sea temperatures range from around 15°C in winter to a peak of only about 19–20°C in late summer and early autumn — refreshing rather than warm, and often bracing when you first get in. The practical beach season runs from roughly June to September, with August and September the warmest for swimming (the ocean lags behind the air, so it's actually warmest just as summer ends), though hardy surfers and swimmers are in the water year-round in wetsuits. The Atlantic also brings waves and, at the exposed beaches like Guincho, Praia Grande and the Caparica and Sintra coasts, strong winds and currents — great for surfing but demanding respect for swimming, so heed the lifeguard flags. For calmer, gentler water suited to families and easy swims, the sheltered bay beaches of Estoril (Praia do Tamariz) and the Cascais town coves are the best bets. All the main beaches are reachable by cheap train, so you can pick your conditions. In short: come June to September for beach days, expect a cool but invigorating Atlantic, and consider a wetsuit for longer swims or surfing.",
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Lisbon", item: `${SITE}/lisbon` },
      { "@type": "ListItem", position: 3, name: "Weather", item: `${SITE}/lisbon/weather` },
    ],
  };
}

export default function LisbonWeather() {
  return (
    <CityGuideShell
      citySlug="lisbon"
      cityName="Lisbon"
      categories={CATEGORIES}
      active="weather"
      crumb="Weather"
      h1="Lisbon Weather & Best Time to Visit"
      heroImage="/images/lisbon/sevardheter/miradouro-da-graa.webp"
      intro="Lisbon is the sunniest capital in Europe, with a mild Atlantic-Mediterranean climate that makes it a genuine year-round destination — but the experience changes a lot with the seasons. This guide breaks down the weather month by month, from hot, festival-filled summers to mild, bargain winters, with temperatures, rainfall, sea conditions, crowds and flight prices, so you can pick the perfect time to go and know exactly what to pack."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Lisbon weather season by season" items={WEATHER} />
    </CityGuideShell>
  );
}
