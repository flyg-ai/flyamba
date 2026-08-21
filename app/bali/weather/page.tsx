import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/bali-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Bali Weather 2026 — Best Time to Visit & What to Pack",
  description:
    "Bali weather season by season — the April–October dry season, the November–March wet season, the July–August high season, the unique Nyepi Day of…",
  alternates: { canonical: `${SITE}/bali/weather` },
  openGraph: { title: "Bali Weather & Best Time to Visit | Flyamba", description: "Dry and wet seasons, high season and the best time to visit Bali, with packing tips.", type: "article" },
};

const IMG = "/images/bali/attractions/campuhan-ridge-walk.webp";

const INFO: BcnPlace[] = [
  {
    name: "Bali's climate in a nutshell", slug: "climate-overview", image: IMG, rating: 5, area: "Year-round",
    tip: "It's warm and tropical all year — the real question isn't temperature but whether it's the dry or the wet season.",
    filterKeys: [],
    description: "Bali is hot and humid year-round, with two seasons: dry (April–October) and wet (November–March).",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "24–32°C all year; dry Apr–Oct, wet Nov–Mar" },
    fullDescription: "Just south of the equator, Bali has a hot, humid tropical climate with warm temperatures all year round — daytime highs generally sit between 24 and 32°C whatever the month, and the sea stays warm enough to swim in every day. Rather than the four seasons of temperate climates, Bali has just two: a dry season from roughly April to October and a wet season from November to March. That distinction, not temperature, is what shapes when to visit and what to expect. Humidity is high throughout, and the sun is strong and close to overhead, so it can feel hotter than the thermometer reads, especially in the lowlands and on the coast. Head up into the highlands around Ubud, Munduk or Bedugul and it's noticeably cooler and fresher, while the summits of the volcanoes can be genuinely cold before dawn. Because the weather is so consistently warm, packing is easy — light, breathable clothing year-round — but the choice of dry or wet season affects everything from beach days and hiking to prices and crowds, so it's worth understanding both before you book.",
  },
  {
    name: "Dry season (April–October)", slug: "dry-season", image: IMG, rating: 5, area: "Apr–Oct",
    tip: "June to September are the driest months — the optimal window for temples, hiking and beach days.",
    filterKeys: [],
    description: "The dry season brings sunshine, lower humidity and the best conditions for sightseeing and the beach.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "24–30°C, low humidity, strong sun; driest Jun–Sep" },
    fullDescription: "The dry season, from April to October, is the classic time to visit Bali and offers the island at its best for most activities. Days are warm (24–30°C) with lower humidity, plenty of sunshine and little rain, making it ideal for temple-hopping, hiking the rice terraces and volcanoes, and long days on the beach. June to September are the driest months and generally the most reliable for wall-to-wall sunshine, clear skies for a Mount Batur sunrise, and calm, clear water for snorkelling and diving off Amed, Nusa Penida and the Gilis. The trade-off is that this is also the busiest and priciest stretch, particularly July and August. The sun is fierce in the middle of the day, so slather on reef-safe sunscreen, wear a hat and stay hydrated, and plan strenuous activities like ridge walks and volcano treks for the cool of early morning. If your priority is dependable good weather for a mix of culture, adventure and beach time, the dry season — especially the shoulder months of June and September — is the sweet spot.",
  },
  {
    name: "Wet season (November–March)", slug: "wet-season", image: IMG, rating: 5, area: "Nov–Mar",
    tip: "Wet season rarely means all-day rain — expect short, intense afternoon downpours (often 2–4pm) followed by sunshine.",
    filterKeys: [],
    description: "The wet season is greener, quieter and cheaper, with short downpours rather than constant rain.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Warm and humid; brief afternoon showers; lush landscapes, lower prices" },
    fullDescription: "The wet season, from November to March, has a worse reputation than it deserves. It doesn't mean constant rain — instead you typically get short, intense downpours, often in the early to mid afternoon (around 2–4pm), followed by clear, sunny spells, so plenty of the day is still fine for sightseeing and the beach if you plan around the showers. The upside is considerable: the rice fields and jungle are at their lushest and greenest, the landscapes look spectacular, the crowds thin out and prices for flights and hotels can drop to as little as half the peak rate. Many savvy travellers actively prefer it. The downsides are the heat and humidity, which peak now, the occasional heavier storm, choppier seas that can disrupt boat trips to Nusa Penida and the Gilis, and muddier, more slippery hiking trails. Pack a light rain jacket and quick-dry clothes, keep plans flexible enough to shelter through an afternoon shower in a café or spa, and check volcano and boat conditions. For lush scenery, fewer people and lower prices — with a bit of weather flexibility — the wet season is an underrated time to visit Bali.",
  },
  {
    name: "High season & prices", slug: "high-season", image: IMG, rating: 5, area: "Jul–Aug & holidays",
    tip: "July and August are the busiest and dearest — come in June or September for the same great weather at better prices.",
    filterKeys: [],
    description: "July, August and the Christmas/New Year period are peak; June and September are the value sweet spots.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Hotel prices +30–50% in Jul–Aug; shoulder Jun & Sep best value" },
    fullDescription: "Bali's busiest and most expensive stretch is July and August, when the Australian school holidays coincide with the driest, sunniest weather and hotel prices jump by 30–50% or more. The Christmas and New Year holidays and Easter are similarly pricey and crowded. If you can, the shrewd move is to travel in the shoulder months of June and September, which offer essentially the same excellent dry-season weather but with noticeably lower prices, fewer crowds at the temples and rice terraces, and easier availability at the best villas and restaurants. The wet-season months from November to March (excluding the festive peak) are cheaper still, with the lowest flight and accommodation prices of the year, if you're happy to work around the afternoon showers. Booking well ahead is essential for the peak season, especially for popular hotels and villas, whereas in the quieter months you have far more flexibility. Whenever you go, weekends and Indonesian public holidays see domestic tourism swell at the main sights, so time your temple and attraction visits for early mornings on weekdays to dodge the biggest crowds and get the best light.",
  },
  {
    name: "Nyepi — the Day of Silence", slug: "nyepi", image: IMG, rating: 5, area: "March (date varies)",
    tip: "If you're on Bali for Nyepi, plan ahead — for 24 hours everything closes, including the airport, and you must stay inside your hotel.",
    filterKeys: [],
    description: "Bali's unique Hindu New Year 'Day of Silence' shuts the entire island down for 24 hours.",
    practicalInfo: { openingHours: "24 hours in March (date varies yearly)", price: "N/A", howToGetThere: "Islandwide; no flights, no traffic, no lights" },
    fullDescription: "Nyepi, the Balinese Hindu New Year, is one of the most extraordinary cultural experiences in the world — and something to plan carefully around if your trip falls near it (the date shifts each year but usually lands in March). For a full 24 hours, the entire island observes a 'Day of Silence': no flights arrive or depart (Ngurah Rai airport actually closes), no vehicles are allowed on the roads, shops and restaurants shut, and people stay indoors, with lights kept low or off after dark and even the internet sometimes restricted. The idea is a day of self-reflection, fasting and quiet, and it's rigorously observed, with local pecalang (traditional security) patrolling to ensure no one is out and about. Visitors must stay within their hotel or villa grounds for the day, so hotels prepare in advance with food and activities. The night before brings the opposite: the spectacular Ngrupuk parade, when villages carry huge, grotesque papier-mâché 'ogoh-ogoh' monster effigies through the streets before burning them to drive away evil spirits. If you can time it, experiencing Nyepi is unforgettable — just book a hotel you'll be happy confined to and stock up beforehand.",
  },
  {
    name: "Best time to visit & what to pack", slug: "best-time-packing", image: IMG, rating: 5, area: "Planning",
    tip: "Pack light, breathable clothes year-round, but always bring a sarong for temples and a fleece for a Mount Batur sunrise.",
    filterKeys: [],
    description: "April–October is best overall, with June and September the value sweet spots; pack for heat, temples and the odd shower.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Best overall: Apr–Oct (esp. Jun & Sep); cheapest: Nov–Mar & February" },
    fullDescription: "For the best overall experience, aim for the dry season from April to October, with June and September the ideal sweet spots — reliable sunshine for beaches, temples and hiking, but without the peak crowds and prices of July and August. Choose the wet season (November to March, outside the festive peak) if budget is the priority and you don't mind planning around short afternoon downpours, as you'll enjoy lush green landscapes, far fewer people and the lowest prices of the year. Whatever the season, packing is straightforward for the tropical heat: bring light, breathable clothing, swimwear, sunglasses, a hat, plenty of reef-safe sunscreen and insect repellent, plus a light rain jacket or umbrella (essential in the wet season, wise any time). Crucially, always pack modest clothing and a sarong and sash for temple visits — covered shoulders and knees are required, and many temples hire sarongs at the entrance if you don't have your own. Add sturdy shoes for the rice-terrace and volcano trails, and a warm fleece and long trousers for the pre-dawn chill (around 12°C) at the top of Mount Batur. Dress for heat, respect and the occasional shower, and you'll be ready for anything Bali throws at you.",
  },
];


export default function BaliWeather() {
  return (
    <CityGuideShell
      citySlug="bali"
      cityName="Bali"
      categories={CATEGORIES}
      active="weather"
      crumb="Weather"
      h1="Bali Weather & Best Time to Visit"
      heroImage={IMG}
      intro="Bali is warm and tropical all year, so the real question isn't temperature but season: the dry months of April to October bring the sunshine and the crowds, while the wet season of November to March offers lush greenery, fewer people and lower prices. This guide walks through the weather season by season — including the peak of July and August and the unique Nyepi Day of Silence — and pinpoints the best time to visit and exactly what to pack."
      wide
    >
      <CategorySeoSections heading="Bali weather season by season — in detail" items={INFO} />
    </CityGuideShell>
  );
}
