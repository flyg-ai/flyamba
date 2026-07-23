import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { BANGKOK_CATEGORIES } from "@/app/lib/bangkok";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Bangkok Weather 2026 — Best Time to Visit | Flyamba",
  description:
    "Bangkok's climate month by month — the cool, hot and rainy seasons explained, when to visit for the best weather, and what to pack for the tropical heat.",
  alternates: { canonical: `${SITE}/bangkok/weather` },
  openGraph: { title: "Bangkok Weather & Best Time to Visit | Flyamba", description: "The three seasons and when to go.", type: "article" },
};

const IMG = "/images/bangkok/sevardheter/lumphini-park.webp";

const WEATHER: BcnPlace[] = [
  {
    name: "Cool season (November–February)", slug: "cool-season", image: IMG, rating: 4.9, area: "Peak season",
    tip: "This is the best time to visit — book flights and hotels well ahead, as it's also the busiest and priciest stretch.",
    filterKeys: [], description: "The most comfortable months to visit, with lower humidity and warm, mostly dry days.",
    practicalInfo: { openingHours: "—", price: "Peak-season hotel rates; book ahead", howToGetThere: "—" },
    fullDescription: "The cool season, roughly November to February, is the best time to visit Bangkok and the peak tourist period for good reason. 'Cool' is relative — this is still the tropics, with daytime highs typically in the low 30s Celsius — but humidity drops noticeably, rainfall is low, and the mornings and evenings can feel genuinely pleasant, occasionally even a touch fresh in December and January. Clear, sunny skies make it ideal for temple-hopping, river trips, rooftop bars and day trips, without the sapping mugginess of the rest of the year. The trade-off is that everyone else knows this too: the city is at its busiest, attractions and markets are crowded, and hotel prices climb, spiking sharply around Christmas, New Year and Chinese New Year. If you want the most comfortable weather and don't mind the crowds and higher costs, this is the window to aim for — but book flights and accommodation well in advance, especially over the festive period. Even in the cool season, midday sun is strong, so hats, sunscreen and water remain essential, and you'll still want the air-conditioning on. It's the classic, safe choice for a first trip to Bangkok.",
  },
  {
    name: "Hot season (March–May)", slug: "hot-season", image: IMG, rating: 4.2, area: "Hottest months",
    tip: "Plan sightseeing for early morning and late afternoon, and build in air-conditioned malls, museums and spa breaks over midday.",
    filterKeys: [], description: "The fierce, sticky peak of Thai heat, when temperatures regularly top the high 30s.",
    practicalInfo: { openingHours: "—", price: "Shoulder rates, rising around Songkran (mid-April)", howToGetThere: "—" },
    fullDescription: "From March to May, Bangkok turns up the heat to its fiercest, with April the hottest month of all. Daytime temperatures frequently push into the high 30s Celsius and can feel far hotter thanks to the humidity and the city's concrete sprawl, making midday sightseeing genuinely draining. The skies are often hazy, and while it's the driest run of the year before the rains arrive, the air grows heavy and sticky towards May. This doesn't mean you should avoid Bangkok — just plan around the heat. Tackle outdoor sights like the Grand Palace, temples and markets in the cooler early morning or late afternoon, and use the sweltering midday hours for the city's abundant air-conditioned refuges: mega-malls, museums, the aquarium, a long lunch or a Thai massage. Stay relentlessly hydrated, wear light, breathable clothing, and don't underestimate the sun. The one huge highlight of this season is Songkran, the Thai New Year water festival in mid-April, when the whole city erupts into joyous, drenching water fights — a bucket-list experience, though it pushes up prices and packs out transport. Hotel rates are otherwise in shoulder territory, so outside Songkran you can find good deals if you can handle the heat.",
  },
  {
    name: "Rainy / green season (June–October)", slug: "rainy-season", image: IMG, rating: 4.3, area: "Monsoon months",
    tip: "Don't write it off — showers are usually short and heavy, prices drop, and mornings are often dry, so plan sights early.",
    filterKeys: [], description: "The southwest monsoon brings warm downpours, lush greenery and the year's best hotel deals.",
    practicalInfo: { openingHours: "—", price: "Lowest hotel rates of the year; good deals", howToGetThere: "—" },
    fullDescription: "The rainy or 'green' season, driven by the southwest monsoon from around June to October, is Bangkok's wettest stretch, peaking in September and October. But it's widely misunderstood: rather than raining all day, the typical pattern is hot, humid mornings followed by a dramatic, heavy downpour or thunderstorm in the afternoon or evening that clears the air and often passes within an hour or two. That means you can still see and do plenty, especially if you start early and keep your plans flexible, ducking into a mall, café or museum when the skies open. The rewards are real: the city and surrounding countryside are lush and green, the light after a storm is beautiful, crowds thin out, and hotel prices fall to their lowest of the year, making this the value traveller's season. The downsides are the humidity, occasional street flooding after intense rain, and the small chance of a washed-out day or a disrupted beach day trip. Pack a compact umbrella or light rain jacket and quick-drying shoes, keep a loose itinerary, and check forecasts for any day trips. For budget-conscious visitors who don't mind some rain, the green season offers Bangkok at its cheapest and least crowded.",
  },
  {
    name: "Best time to visit & what to pack", slug: "best-time-to-pack", image: IMG, rating: 4.7, area: "Planning tips",
    tip: "Whenever you go, dress in light, breathable layers and always carry a temple-appropriate cover-up for shoulders and knees.",
    filterKeys: [], description: "Choosing your dates and packing right for Bangkok's year-round tropical climate.",
    practicalInfo: { openingHours: "—", price: "—", howToGetThere: "—" },
    fullDescription: "Bangkok is a year-round destination, but the sweet spot for comfortable weather is the cool, dry season from November to February — accept that it's also the busiest and most expensive. If you want lower prices and fewer crowds and can tolerate afternoon downpours, the green season from June to October offers the best deals, while the hot months of March to May reward early risers who plan around the midday heat (and reward the adventurous with the Songkran water festival in April). Whatever the season, the essentials of packing are the same, because it's always hot and humid: bring light, loose, breathable clothing in natural fabrics, comfortable shoes you can walk and sweat in, strong sun protection (hat, sunglasses, high-factor sunscreen) and a refillable water bottle. Crucially, pack at least one modest outfit — trousers or a long skirt and a top that covers the shoulders — for visiting temples and the Grand Palace, where a dress code is strictly enforced; a light scarf or sarong doubles as a cover-up and sun shade. Add a compact umbrella or rain jacket in the wet season, and a light layer for fiercely air-conditioned malls, trains and restaurants. With the right clothes and a flexible, heat-aware schedule, Bangkok is enjoyable in any month.",
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Bangkok", item: `${SITE}/bangkok` },
      { "@type": "ListItem", position: 3, name: "Weather", item: `${SITE}/bangkok/weather` },
    ],
  };
}

export default function BangkokWeather() {
  return (
    <CityGuideShell
      citySlug="bangkok"
      cityName="Bangkok"
      categories={BANGKOK_CATEGORIES}
      active="weather"
      crumb="Weather"
      h1="Bangkok Weather & Best Time to Visit"
      heroImage={IMG}
      intro="Bangkok is hot all year — it's the humidity and rain that change with the seasons. The city runs on three of them: a cool, dry stretch that's peak visiting season, a fierce hot spell around April, and a green monsoon season of short, dramatic downpours and low prices. Here's how each feels, when to visit, and what to pack for the tropics whatever month you choose."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Bangkok's seasons, month by month" items={WEATHER} />
    </CityGuideShell>
  );
}
