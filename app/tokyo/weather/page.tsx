import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/tokyo-places";

const SITE = "https://flyamba.com";

export const metadata: Metadata = {
  title: "Tokyo Weather & Best Time to Visit 2026 | Flyamba",
  description:
    "Tokyo weather by season and the best time to visit — cherry blossom in spring, hot humid summers and rainy season, glorious autumn colour and crisp clear winters, with what to pack.",
  alternates: { canonical: `${SITE}/tokyo/weather` },
  openGraph: { title: "Tokyo Weather & Best Time to Visit | Flyamba", description: "Season-by-season weather and the best time to visit Tokyo.", type: "article" },
};

const IMG = "/images/tokyo/sevardheter/shinjuku-gyoen.webp";

const WEATHER: BcnPlace[] = [
  {
    name: "Spring (March–May)", slug: "spring", image: IMG,
    rating: 4.9, area: "Cherry blossom season", tip: "Late March to early April is peak sakura and the single most beautiful — and busiest — time to visit; book flights and hotels months ahead.",
    filterKeys: [], description: "Mild, blossom-filled and the most popular season to visit Tokyo.",
    practicalInfo: { openingHours: "March–May", price: "Average 10–22°C, mild and pleasant", howToGetThere: "Pack: light layers, a light jacket, comfy walking shoes" },
    fullDescription: "Spring is the most celebrated and arguably the best time to visit Tokyo, when mild, comfortable temperatures of roughly 10–22°C combine with the world-famous cherry blossom (sakura). The blooms typically peak in Tokyo in late March and early April, blanketing parks like Ueno, Shinjuku Gyoen, Chidorigafuchi and the Meguro River in clouds of pink and prompting the whole city to gather for hanami flower-viewing picnics — a genuinely magical, unmissable spectacle. The weather is largely pleasant and dry early in the season, ideal for the endless walking that Tokyo demands, though it can still be cool in the mornings and evenings, so pack light layers and a jacket. The trade-off is popularity: this is peak tourist season, so flights and hotels are at their most expensive and busiest, and the famous blossom spots get extremely crowded — book everything well in advance and visit gardens early. By May the blossoms are gone but the greenery is fresh, the weather warm and settled, and the crowds ease a little before the summer rains arrive, making late spring a lovely, slightly quieter alternative.",
  },
  {
    name: "Rainy season (June–mid July)", slug: "rainy-season", image: IMG,
    rating: 4.0, area: "Tsuyu (plum rains)", tip: "It rarely rains all day — carry a folding umbrella (buy one at any konbini) and plan indoor museums and shopping around the showers.",
    filterKeys: [], description: "Tokyo's humid, wet 'tsuyu' rainy season, with hydrangeas and fewer crowds.",
    practicalInfo: { openingHours: "Early June to mid-July", price: "Average 20–28°C, humid with frequent rain", howToGetThere: "Pack: umbrella, breathable clothing, quick-dry shoes" },
    fullDescription: "From early June to around mid-July, Tokyo passes through its rainy season, known as tsuyu or the 'plum rains'. This is the wettest, most humid stretch of the year, with grey skies and frequent showers, though it seldom rains solidly all day — spells of drizzle and downpour alternate with drier, muggy periods. Temperatures sit around 20–28°C and the humidity can feel heavy. While it is the least fashionable time to visit, it has real advantages: noticeably fewer tourists, lower prices, and a lush, atmospheric beauty as the city's hydrangeas (ajisai) burst into blue and purple bloom in temple gardens and at spots like Hakone and Kamakura. The smart approach is to build flexibility into each day — pair outdoor sights with plenty of indoor backups such as museums, aquariums, department stores, teamLab and covered shopping arcades — and always carry a compact folding umbrella, sold cheaply at every convenience store. Breathable, quick-drying clothing and comfortable waterproof-ish shoes make a big difference. If you do not mind the damp and want thinner crowds and better deals, the rainy season can be a rewarding and surprisingly pretty time to explore Tokyo.",
  },
  {
    name: "Summer (mid July–August)", slug: "summer", image: IMG,
    rating: 4.1, area: "Hot & festival season", tip: "It's hot, humid and busy — start sightseeing early, retreat to air-conditioned malls midday, and catch a summer fireworks festival (hanabi) in the evening.",
    filterKeys: [], description: "Hot, humid and lively, with spectacular fireworks and festivals.",
    practicalInfo: { openingHours: "Mid-July to August", price: "Average 25–35°C, hot and very humid", howToGetThere: "Pack: light breathable clothes, sun protection, a fan and water bottle" },
    fullDescription: "Once the rainy season lifts around mid-July, Tokyo plunges into a hot, intensely humid summer, with daytime temperatures regularly hitting 30–35°C and sultry, sticky nights. The heat and humidity are genuinely tiring for sightseeing, so this is not the most comfortable time to walk the city — the key is to start early, take a long air-conditioned break in a museum, department store or café during the punishing midday hours, stay hydrated, and use a hand fan and sun protection. That said, summer is also festival season and comes alive after dark: dazzling hanabi fireworks displays light up the sky (the Sumida River fireworks are a highlight), lively matsuri street festivals fill neighbourhoods with food stalls and dancing, and beer gardens open on rooftops. It is also the season to escape to the nearby beaches of the Shonan coast or the cooler mountains and lakes around Mount Fuji and Hakone. Crowds are heavy and August's Obon holiday period sees many locals travelling, so trains and popular spots are busy. If you can handle the heat and lean into the evening festivals and day trips, summer in Tokyo has its own vibrant appeal, but pack for serious humidity.",
  },
  {
    name: "Autumn (September–November)", slug: "autumn", image: IMG,
    rating: 4.8, area: "Autumn leaves (koyo)", tip: "November is glorious — crisp, clear and ablaze with red and gold leaves in gardens like Rikugien and Koishikawa Korakuen; go in the second half of the month.",
    filterKeys: [], description: "Crisp, clear and beautiful, with fiery autumn foliage — one of the best times to visit.",
    practicalInfo: { openingHours: "September–November", price: "Average 12–26°C, cooling and comfortable", howToGetThere: "Pack: layers, a light jacket for November, walking shoes" },
    fullDescription: "Autumn rivals spring as the finest time to visit Tokyo, offering crisp, clear, comfortable weather and spectacular seasonal colour without the sheer intensity of the cherry-blossom crowds. Early September can still carry summer's warmth and humidity, and it is also the tail end of typhoon season, when the occasional storm can pass through, but from October onward the air turns pleasantly cool and dry, ideal for the long days of walking that Tokyo invites. The highlight is the autumn foliage (koyo): from mid-to-late November the city's gardens and parks — Rikugien, Koishikawa Korakuen, the Meiji Jingu Gaien ginkgo avenue, and Mount Takao just outside the city — blaze with red maples and golden ginkgo, often beautifully illuminated in the evenings. Temperatures range from a mild mid-20s°C in early autumn down to a crisper 12–18°C by November, so pack layers and a light jacket for the later weeks. Prices and crowds are more moderate than in spring, particularly outside the peak foliage window, making autumn a superb balance of great weather, natural beauty and relative value. For many seasoned travellers, a November trip is the sweet spot for experiencing Tokyo at its most photogenic and pleasant.",
  },
  {
    name: "Winter (December–February)", slug: "winter", image: IMG,
    rating: 4.4, area: "Crisp, clear & cheapest", tip: "Cold but famously dry and sunny with the clearest Mount Fuji views of the year — and February is the cheapest month to fly.",
    filterKeys: [], description: "Cold, dry and sunny, with dazzling illuminations, clear Fuji views and the lowest prices.",
    practicalInfo: { openingHours: "December–February", price: "Average 2–12°C, cold but mostly dry & sunny", howToGetThere: "Pack: warm coat, layers, gloves; snow is rare in the city" },
    fullDescription: "Winter is Tokyo's quietest and cheapest season, and for the well-prepared traveller it has genuine charms. Temperatures are cold but rarely freezing during the day, typically ranging from about 2°C at night to 10–12°C in the afternoon, and — crucially — the winter is famously dry and sunny, with day after day of crisp blue skies and very little rain or snow (snowfall in central Tokyo is rare and usually light). Those clear, dry conditions deliver the best Mount Fuji views of the entire year, so winter is prime time for Fuji-viewing day trips to Hakone or Lake Kawaguchiko. In the city, the cold is easily managed with a warm coat and layers, and the season sparkles with elaborate winter illuminations that drape whole districts, avenues and gardens in millions of lights from November through February, plus festive New Year (shogatsu) traditions when locals visit shrines and temples. Best of all for budget-conscious visitors, February is statistically the cheapest month to fly to Tokyo, and hotels and attractions are at their least crowded (outside the New Year holiday itself). If you can handle bundling up, winter offers clear skies, dazzling lights, unbeatable Fuji views and the lowest prices of the year.",
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Tokyo", item: `${SITE}/tokyo` },
      { "@type": "ListItem", position: 3, name: "Weather", item: `${SITE}/tokyo/weather` },
    ],
  };
}

export default function TokyoWeather() {
  return (
    <CityGuideShell
      citySlug="tokyo"
      cityName="Tokyo"
      categories={CATEGORIES}
      active="weather"
      crumb="Weather"
      h1="Tokyo Weather & Best Time to Visit"
      heroImage={IMG}
      intro="Tokyo has four distinct and dramatic seasons, and when you visit shapes your whole trip. Spring brings the world-famous cherry blossom and mild weather; summer is hot, humid and full of fireworks; autumn delivers crisp skies and fiery foliage; and winter is cold but dry and sunny, with the clearest Mount Fuji views and the lowest prices. Spring and autumn are the standout times to visit for weather and beauty, though they are also the busiest. Here is the season-by-season breakdown, with temperatures and what to pack."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Tokyo weather season by season" items={WEATHER} />
    </CityGuideShell>
  );
}
