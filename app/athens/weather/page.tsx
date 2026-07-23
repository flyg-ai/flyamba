import type { Metadata } from "next";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { CATEGORIES } from "@/app/data/athens-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Athens Weather 2026 — Best Time to Visit | Flyamba",
  description:
    "Athens weather by season: hot, dry summers around 32–35°C, mild sunny winters, and glorious spring and autumn shoulder seasons. When to visit for sightseeing, beaches and value, plus what to pack and sea temperatures.",
  alternates: { canonical: `${SITE}/athens/weather` },
  openGraph: { title: "Athens Weather & Best Time to Visit | Flyamba", description: "Season-by-season climate and the best time to visit Athens.", type: "article" },
};

const PLACEHOLDER = "/images/barcelona/placeholder.webp";

const ITEMS: BcnPlace[] = [
  {
    name: "Spring (March–May)", slug: "spring", image: PLACEHOLDER,
    rating: 4.8, area: "Shoulder season", filterKeys: [],
    tip: "The best all-round time to visit — warm, green, wildflowers on the hills, and the sites without the summer crush.",
    description: "Warm, comfortable days ideal for sightseeing, with wildflowers and thinner crowds.",
    practicalInfo: { openingHours: "March–May", price: "Highs ~16°C (Mar) rising to ~26°C (May)", howToGetThere: "Pack layers, a light jacket for evenings, and sun protection" },
    fullDescription: "Spring is arguably the best time to visit Athens. After a mild winter, temperatures climb from comfortable highs around 16°C in March to a warm 25–26°C by late May, with long, increasingly sunny days and generally low rainfall. The surrounding hills and countryside turn green and burst with wildflowers, the light is beautiful for photography, and — crucially — the great archaeological sites are pleasant to explore on foot without the fierce heat and heavy crowds of high summer. This is the ideal window for the kind of trip Athens does best: full days of walking the Acropolis, the Agora and the museums, followed by long lunches and evenings on café terraces in the still-mild air. Easter, the most important festival in the Greek calendar, usually falls in April or early May and is a wonderful (if busier) time to experience local traditions, though prices rise around it. By May the sea has warmed enough for the first proper beach days on the Riviera. Pack layers and a light jacket for cooler mornings and evenings, plus sunglasses and sunscreen for the strengthening midday sun. For combining comfortable sightseeing, good value and the beginnings of beach season, spring is hard to beat.",
  },
  {
    name: "Summer (June–August)", slug: "summer", image: PLACEHOLDER,
    rating: 4.3, area: "Peak / beach season", filterKeys: [],
    tip: "See the ancient sites at opening (08:00) or late afternoon, and spend the scorching midday hours at the beach or a museum.",
    description: "Hot, dry and sunny — perfect for the beach, demanding for midday sightseeing.",
    practicalInfo: { openingHours: "June–August", price: "Highs ~32–35°C (heat spikes to 38°C+)", howToGetThere: "Pack light clothing, a hat, strong sunscreen and a refillable water bottle" },
    fullDescription: "Summer in Athens is hot, dry and reliably sunny, with average highs of 32–35°C in July and August and heatwave spikes that can push past 38–40°C, all under near-cloudless skies and with virtually no rain. It's peak season and the city buzzes, but the heat genuinely shapes how you should plan your day. The smart approach is to visit the Acropolis and the exposed archaeological sites right at opening (08:00) or in the late afternoon, retreat to air-conditioned museums, shaded tavernas or a long siesta during the punishing midday hours, and come alive again in the balmy evenings when Athenians fill the streets, rooftops and open-air cinemas. Summer is, of course, prime beach time: the Athenian Riviera and the warm Aegean (around 24–26°C) are a short tram or bus ride away, and it's the season for island-hopping from Piraeus. Many Athenians leave the city in August, and some smaller shops and restaurants close for the holidays. Essentials: light, breathable clothing, a hat and sunglasses, high-factor sunscreen and — importantly — plenty of water, as the dry heat dehydrates quickly. If you can handle the temperatures and want sun, sea and a lively atmosphere, summer delivers, but it's the most demanding season for hardcore sightseeing.",
  },
  {
    name: "Autumn (September–November)", slug: "autumn", image: PLACEHOLDER,
    rating: 4.7, area: "Shoulder season", filterKeys: [],
    tip: "September may be the single best month — warm sea, summer sun easing off, and the beach season still in full swing.",
    description: "Warm, settled weather with a still-swimmable sea and easing crowds — a superb time to visit.",
    practicalInfo: { openingHours: "September–November", price: "Highs ~29°C (Sep) easing to ~18°C (Nov)", howToGetThere: "Pack summer clothes for September, adding layers and a light rain jacket by November" },
    fullDescription: "Autumn is another excellent time to visit Athens, and September in particular is a standout month. Early autumn holds onto summer's warmth and sunshine — highs around 28–29°C in September — but with the fiercest heat easing, the sea at its warmest after a long summer of sun (ideal for swimming well into October), and the peak-season crowds and prices beginning to thin. It's a glorious window for combining comfortable sightseeing with beach days and island trips. October remains warm and pleasant (highs in the low-to-mid 20s) and is one of the loveliest months for exploring the sites and eating outdoors, though the first autumn rains start to appear. By November temperatures drop to milder highs around 17–18°C, days shorten and rainfall increases, shifting the mood towards a quieter, cooler city break focused on museums, food and culture rather than the beach. Throughout autumn the light is beautiful and the atmosphere relaxed as the city returns to its normal rhythm after the August exodus. Pack summer clothing for September, progressively adding layers and a light rain jacket as the season advances. For warm weather, a swimmable sea, fewer people and better value than high summer, early autumn is one of the best bets of the year.",
  },
  {
    name: "Winter (December–February)", slug: "winter", image: PLACEHOLDER,
    rating: 4.2, area: "Low season", filterKeys: [],
    tip: "Mild and sunny by European standards, with half-price site tickets and no queues — great for a culture-focused city break.",
    description: "Cool, changeable but often sunny, with the lowest prices and the emptiest ancient sites.",
    practicalInfo: { openingHours: "December–February", price: "Highs ~13–15°C, cooler nights; occasional rain", howToGetThere: "Pack warm layers, a coat and an umbrella; sites keep shorter winter hours" },
    fullDescription: "Winter is Athens' low season, and while it's the coolest and wettest time of year, it's mild by Northern European standards and has real advantages. Daytime highs sit around 13–15°C, nights are chilly, and there are spells of rain and grey skies, but plenty of crisp, bright, sunny days too — snow in the city itself is rare, though the surrounding mountains may get a dusting. The great draw is atmosphere and value: hotel prices fall to their lowest (outside the Christmas–New Year holiday), the Acropolis and other state sites charge roughly half their summer entry fee, and you can wander the Parthenon, the Agora and the museums with barely a queue or crowd in sight — a very different, more contemplative experience. This is the season for a culture-focused city break: the world-class museums, long lunches in cosy tavernas, coffee and people-watching, festive Christmas lights and markets in December, and the city's everyday local life on full show. The trade-offs are shorter daylight hours, reduced opening times at archaeological sites (which close earlier in winter), a closed beach season, and the odd wet day. Pack warm layers, a proper coat and an umbrella. For travellers who prioritise history, museums, food and value over sunbathing, winter is an underrated and rewarding time to see Athens.",
  },
  {
    name: "Sea temperature & beach season", slug: "sea-beach-season", image: PLACEHOLDER,
    rating: 4.5, area: "Athenian Riviera", filterKeys: [],
    tip: "The Aegean stays swimmable roughly May to October, peaking around 25–26°C in August and September.",
    description: "When the sea is warm enough to swim and the Riviera beach clubs are in full swing.",
    practicalInfo: { openingHours: "Main season ~May–October", price: "Sea ~19°C (May) to ~26°C (Aug–Sep)", howToGetThere: "Reach the Riviera on the coastal tram or express buses year-round" },
    fullDescription: "One of Athens' great advantages is its swimmable coastline, and the Aegean around the Athenian Riviera is warm enough for comfortable swimming for a long stretch of the year — roughly May through October. The sea warms from around 19°C in May to a delightful 24–26°C in August and September, which, thanks to summer's residual heat, is often the very best month for swimming. The organized beaches and glamorous beach clubs from Alimos and Glyfada down to Vouliagmeni and Varkiza run their full season across these months, with sunbeds, bars and watersports in full swing, at their busiest on summer weekends. May and October are lovely borderline months — pleasant for sunbathing, paddling and a bracing dip, with far fewer people — while the water is generally too cool for most swimmers from November to April, when the coast is still worth a scenic walk or a seafood lunch by the marina. A unique year-round option is the warm, mineral-rich thermal Lake Vouliagmeni, which stays around 22–29°C even in winter for a pleasant swim whatever the season. Whenever you come, the strong Greek sun means sunscreen is essential, and the coastal tram makes reaching the beaches cheap and easy on the standard €1.20 fare. For a beach-and-city combination, aim for June to early October.",
  },
  {
    name: "The best time to visit Athens", slug: "best-time", image: PLACEHOLDER,
    rating: 4.8, area: "Planning", filterKeys: [],
    tip: "For the ideal balance of weather, swimmable sea, manageable crowds and value, target May–June or September.",
    description: "A quick verdict on when to go, depending on what you want from your trip.",
    practicalInfo: { openingHours: "Year-round destination", price: "Peak Jun–Aug; best value Nov–Mar", howToGetThere: "Match the season to your priorities: sightseeing, beaches or budget" },
    fullDescription: "Athens is a genuine year-round destination, so the best time to visit depends on what you want. For the ideal all-round trip, target late spring (May and early June) or September: temperatures are warm but not brutal (around 25–29°C), the sea is swimmable so you can combine sightseeing with beach days, the light is beautiful, and both crowds and prices are more moderate than in the July–August peak. These shoulder months are the sweet spot for most visitors. Choose high summer (July–August) if your priority is pure sun, sea and island-hopping and you don't mind serious heat (32–35°C+), the busiest crowds and top prices — plan sightseeing for early morning and evening. Choose autumn's October for warm, quieter sightseeing with the beach season winding down, or the winter months (November–March) for the best value of all: the lowest hotel rates, half-price site tickets and near-empty ancient monuments, ideal for a culture, museum and food-focused city break, accepting cooler, shorter and occasionally wet days with no beach time. Whenever you go, book the Acropolis online, pack sun protection (the light is strong even in winter), and bear in mind that Greek Orthodox Easter (April or early May) is a special but busier and pricier time. In short: May–June or September for the best balance; summer for the beach; winter for value and calm.",
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Athens", item: `${SITE}/athens` },
      { "@type": "ListItem", position: 3, name: "Weather", item: `${SITE}/athens/weather` },
    ],
  };
}

export default function AthensWeather() {
  return (
    <CityGuideShell
      citySlug="athens"
      cityName="Athens"
      categories={CATEGORIES}
      active="weather"
      crumb="Weather"
      h1="Athens Weather & Best Time to Visit"
      heroImage="/images/athens/sevardheter/likavitos-kullen.webp"
      intro="Athens enjoys a classic Mediterranean climate: hot, dry, brilliantly sunny summers and mild, changeable winters, with glorious spring and autumn shoulder seasons in between. It's a year-round city, but the right time depends on whether you're chasing beaches, comfortable sightseeing or low-season value. Here's what to expect season by season — temperatures, what to pack, sea conditions and when to plan your trip."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Athens weather, season by season" items={ITEMS} />
    </CityGuideShell>
  );
}
