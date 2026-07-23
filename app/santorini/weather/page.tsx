import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { SANTORINI_CATEGORIES } from "@/app/lib/santorini";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Santorini Weather 2026 — Best Time to Visit Guide | Flyamba",
  description:
    "Santorini weather month by month — warm dry summers, the famous meltemi wind, mild springs and autumns, and a quiet, breezy winter when much of the island closes. When to visit and what to pack.",
  alternates: { canonical: `${SITE}/santorini/weather` },
  openGraph: { title: "Santorini Weather & Best Time to Visit | Flyamba", description: "Season-by-season Santorini climate guide and the best months to go.", type: "article" },
};

const IMG = "/images/santorini/sevardheter/caldera-utsikten.webp";

const ITEMS: BcnPlace[] = [
  {
    name: "Spring (April–May)", slug: "spring", image: IMG, rating: 4.6, area: "Shoulder season",
    tip: "May is arguably the sweet spot — warm days, wildflowers on the hills, a warming sea and far fewer people than summer.",
    filterKeys: [],
    description: "Mild, green and quiet — one of the loveliest and best-value times to visit.",
    practicalInfo: { openingHours: "Sites and tavernas reopening through April", price: "Highs 18–24°C; sea around 17–19°C", howToGetThere: "Seasonal flights ramp up from April" },
    fullDescription: "Spring is one of the finest times to experience Santorini. Through April the island shakes off its quiet winter: shops, hotels and tavernas reopen, seasonal flights resume, and the hillsides turn briefly green and dotted with wildflowers — a side of the island few summer visitors ever see. Temperatures are comfortable rather than scorching, with daytime highs climbing from the high teens in early April to the mid-20s Celsius by late May, and long sunny days ideal for the Fira–Oia hike, exploring villages and sightseeing without the summer heat. The sea is still on the cool side early on, warming to a swimmable 18–19°C by May, so beach days become pleasant later in the season. Crowds are a fraction of the July–August crush, meaning the sunset spots, restaurants and caldera paths are far more enjoyable and accommodation is much better value. The occasional shower is possible in April but rain is rare by May. For travellers who want warm, bright weather, a photogenic landscape, room to breathe and lower prices, late spring is hard to beat — many regulars rate May as the single best month on Santorini."
  },
  {
    name: "Early summer (June)", slug: "early-summer", image: IMG, rating: 4.7, area: "Peak shoulder",
    tip: "Come in June for near-peak sunshine and warm swimming without the full August heat, prices and crowds.",
    filterKeys: [],
    description: "Long, hot, reliably sunny days with the sea warm enough for real beach days.",
    practicalInfo: { openingHours: "Full season underway; everything open", price: "Highs 26–29°C; sea around 22–23°C", howToGetThere: "Plenty of seasonal nonstops operating" },
    fullDescription: "June is when Santorini hits its stride: the weather is gloriously reliable, with long, hot, cloudless days, daytime highs in the high 20s Celsius, and a sea that has warmed to a comfortable 22–23°C, making it prime time for the beaches as well as sightseeing. Crucially, June delivers near-peak summer conditions before the full onslaught of the July–August high season, so while the island is busy and lively, the crowds and prices haven't yet reached their absolute peak. Everything is open — every taverna, boat trip, winery and beach club — and the daylight is long, giving you full days for hiking the caldera, cruising to the volcano and lingering over sunsets that fall late in the evening. The meltemi wind, the strong northerly that blows across the Aegean in high summer, is usually lighter in June than in the following two months, meaning fewer ferry disruptions and calmer boat trips. For many visitors June represents the ideal balance: hot, dependable beach-and-sightseeing weather, warm water, a buzzing island atmosphere, and slightly more space and value than the sweltering, sold-out heart of summer."
  },
  {
    name: "Peak summer (July–August)", slug: "peak-summer", image: IMG, rating: 4.3, area: "High season",
    tip: "Do outdoor activities early or late to dodge the midday heat, and expect the meltemi wind — it cools things down but can cancel ferries.",
    filterKeys: [],
    description: "Hot, dry, busy and breezy — the classic but crowded time to come.",
    practicalInfo: { openingHours: "Everything open, extended hours; book ahead", price: "Highs 28–30°C+; sea 24–25°C", howToGetThere: "Most nonstop routes at full frequency" },
    fullDescription: "July and August are the peak of Santorini's season — hot, bone-dry and reliably sunny, with daytime highs around 28–30°C and often higher, and a warm sea of 24–25°C perfect for swimming. Rain is virtually unheard of. This is also the busiest and most expensive time, when hotels sell out months ahead, the sunset spots in Oia are shoulder-to-shoulder, restaurants need booking and the villages throng with day-trippers from cruise ships. The heat can be intense, especially on the exposed caldera path and the shadeless archaeological sites, so schedule hiking and outdoor sightseeing for early morning or late afternoon and retreat to a pool, a shaded museum or the beach in the fierce midday hours. A defining feature of high summer is the meltemi, a strong, dry northerly wind that can blow for days at a stretch; it takes the edge off the heat and keeps the air clear, but it whips up the sea, can make caldera boat trips choppy and occasionally disrupts or cancels ferry sailings. Pack strong sun protection, a hat and plenty of water. If you can only travel in peak summer, embrace the buzz but plan around the heat and the crowds."
  },
  {
    name: "Autumn (September–October)", slug: "autumn", image: IMG, rating: 4.7, area: "Shoulder season",
    tip: "September may be the best all-rounder: hot sunshine, the warmest sea of the year, the wine harvest, and prices easing off the summer peak.",
    filterKeys: [],
    description: "Warm, calmer and quieter, with the sea at its warmest — a superb time to visit.",
    practicalInfo: { openingHours: "Full season through Sep; winding down in late Oct", price: "Sep highs 26–28°C; Oct 21–24°C; sea 23–24°C", howToGetThere: "Seasonal flights taper toward late October" },
    fullDescription: "Autumn rivals late spring as the connoisseur's time to visit Santorini. September is essentially an extension of summer but gentler: still hot and sunny with highs in the high 20s Celsius, but with the sea at its warmest of the entire year after months of heating, the fierce meltemi winds easing, and the peak-summer crowds and prices beginning to recede. It's also grape-harvest season, adding a lovely dimension for wine lovers, with the wineries busy bringing in the Assyrtiko. October continues the wind-down, with pleasantly warm days in the low-to-mid 20s, comfortable sightseeing weather and a swimmable sea early in the month, though the first showers of the coming winter can appear toward the end and some businesses start to close. Throughout autumn the light softens beautifully, the caldera paths are quieter, and accommodation prices fall well below the July–August peak. For travellers wanting warm, reliable weather, the year's warmest swimming, the atmosphere of the harvest and a calmer, better-value island, September and early October are outstanding choices — many visitors who have come in both summer and autumn prefer the latter."
  },
  {
    name: "Winter (November–March)", slug: "winter", image: IMG, rating: 4.0, area: "Low season",
    tip: "Come for a moody, crowd-free caldera and rock-bottom prices, but accept that many hotels, restaurants and boat trips are closed and flights are scarce.",
    filterKeys: [],
    description: "Mild but breezy and wet, with much of the tourist island shut down.",
    practicalInfo: { openingHours: "Many hotels, tavernas and tours closed; Fira stays partly open", price: "Highs 12–16°C; cooler, wet and windy", howToGetThere: "Very limited flights; most travel connects via Athens" },
    fullDescription: "Winter is Santorini at its quietest and most authentic, but it comes with big caveats. The climate is mild by northern-European standards — daytime highs of roughly 12–16°C — but it is the wet and windy season, with the year's rain falling between November and March and strong winds common, so it feels cooler than the numbers suggest and swimming is off the cards. More significantly, Santorini is a highly seasonal destination: from November much of the tourist infrastructure shuts down, with many caldera hotels, restaurants, beach bars and boat tours closed until spring, and the crowds vanish entirely. Fira, as the year-round island capital, keeps a core of shops, tavernas and services open for the resident population, and you can still walk the caldera, visit the main archaeological sites and enjoy an atmospheric, near-empty Oia, but the choice of where to stay and eat is limited. Flights are scarce — very few of the seasonal nonstops operate, so you'll generally connect through Athens — which is exactly why the winter months show no meaningful fare data. Winter suits budget travellers and those craving solitude and a moody, dramatic caldera, but anyone wanting beaches, boat trips and the full island buzz should come between April and October."
  },
  {
    name: "The meltemi wind & best time to visit", slug: "meltemi-best-time", image: IMG, rating: 4.5, area: "Planning",
    tip: "For the best all-round trip, target May, June, September or early October — warm, sunny and swimmable, with fewer crowds and calmer seas than midsummer.",
    filterKeys: [],
    description: "Understanding the summer wind and picking the ideal month for your trip.",
    practicalInfo: { openingHours: "Meltemi strongest Jul–Aug", price: "Best-value warm months: May, Jun, Sep, Oct", howToGetThere: "Shoulder-season flights are cheaper and still frequent" },
    fullDescription: "Two things shape the ideal timing of a Santorini trip: the heat-and-crowd curve of the season, and the meltemi wind. The meltemi is a strong, dry northerly that sweeps the Aegean mainly in July and August, occasionally into June and September. It has a silver lining — it keeps the summer air clear and takes the sting out of the heat — but it also churns up the sea, can make the caldera boat trips and volcano cruises uncomfortable or subject to cancellation, and sometimes disrupts ferry schedules, which matters if you're island-hopping. Weighing everything up, the sweet spot for most visitors is the shoulder seasons: May and June in late spring, and September into early October in autumn. In these months you get hot, dependable sunshine, a warm and swimmable sea (warmest of all in September), lighter winds, noticeably thinner crowds than the July–August peak, and prices for flights and hotels well below high season. July and August deliver guaranteed heat and a buzzing atmosphere but at maximum cost and congestion, while winter offers solitude and bargains at the expense of a mostly closed island. Pack sun protection and a light layer for breezy evenings whenever you come, and book peak-season trips far ahead."
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Santorini", item: `${SITE}/santorini` },
      { "@type": "ListItem", position: 3, name: "Weather", item: `${SITE}/santorini/weather` },
    ],
  };
}

export default function SantoriniWeather() {
  return (
    <CityGuideShell
      citySlug="santorini"
      cityName="Santorini"
      categories={SANTORINI_CATEGORIES}
      active="weather"
      crumb="Weather"
      h1="Santorini Weather & Best Time to Visit"
      heroImage={IMG}
      intro="Santorini enjoys a classic Mediterranean climate — hot, bone-dry summers and mild, breezy winters — but the tourist experience swings dramatically with the seasons. This guide walks through the weather month by month, from green, quiet springs to the sweltering, crowded peak of July and August, the warm-sea autumn harvest and a near-shuttered winter, plus the meltemi wind and the sweet-spot months that offer the best balance of sun, sea and space."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Santorini weather by season in detail" items={ITEMS} />
    </CityGuideShell>
  );
}
