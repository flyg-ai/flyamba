import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/new-york-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "New York Prices 2026 — Flights, Budget & Daily Costs | Flyamba",
  description:
    "How much does New York cost? Flight fares from $430, plus a full daily-budget breakdown — hotels, food, attractions, transport, tax and tipping — with money-saving tips, all in USD.",
  alternates: { canonical: `${SITE}/new-york/prices` },
  openGraph: { title: "New York Prices & Budget Guide | Flyamba", description: "Flight fares, daily budgets and the real cost of a trip to New York.", type: "article" },
};

const IMG = "/images/new-york/attractions/times-square.webp";

const INFO: BcnPlace[] = [
  {
    name: "Flight prices to New York", slug: "flight-prices", image: IMG, rating: 5, area: "JFK · round trip",
    tip: "Book 10–12 weeks ahead and fly Tuesday or Wednesday, avoiding Friday–Sunday departures, for the lowest transatlantic fares.",
    filterKeys: [],
    description: "Round-trip fares to New York start from around $430 in the cheapest months and peak in mid-summer.",
    practicalInfo: { openingHours: "Cheapest: February (January similar)", price: "From ~$430 round trip; ~$650 in July–August", howToGetThere: "Non-stop from London, Paris and every major US hub; Newark (EWR) can be cheaper" },
    fullDescription: "New York is one of the best-connected cities in the world, with JFK a major global gateway (plus Newark and LaGuardia), which keeps fares competitive year-round. As a rough guide in US dollars, round-trip flights start from around $430 in the cheapest months and climb to roughly $650 at the height of summer. February is the cheapest month to fly, with January close behind — these winter weeks coincide with New York's low season, so you'll also find better hotel deals and shorter queues at the sights. Prices then rise through spring, peaking in July and August before easing again in autumn. To get the best price, book about 10 to 12 weeks in advance, especially for the June-to-September peak and the Christmas holidays, be flexible with dates (a single day can save a lot), and favour midweek departures — Tuesdays and Wednesdays are typically cheaper than the Friday-to-Sunday rush. Non-stop routes serve London (around seven hours), Paris and every major US city, while flying into Newark (EWR) rather than JFK is often cheaper, with NJ Transit reaching Penn Station in about 30 minutes. Set a fare alert and compare across the many carriers serving the route.",
  },
  {
    name: "Daily budget — what to expect", slug: "daily-budget", image: IMG, rating: 5, area: "Per person / day",
    tip: "New York is one of the most expensive cities in the US — a mid-range day runs around $220–320 per person, before flights and hotel.",
    filterKeys: [],
    description: "A realistic daily budget runs from about $90 (budget) to $600+ (comfortable) per person, excluding flights and hotel.",
    practicalInfo: { openingHours: "N/A", price: "Budget ~$90–130; mid-range ~$220–320; comfort $600+ per person/day", howToGetThere: "Costs shown per person per day, excluding flights and accommodation" },
    fullDescription: "New York is one of the most expensive cities in the United States, so it pays to budget realistically. As a per-person, per-day guide, excluding flights and hotel: a budget traveller eating from pizza places, delis and food trucks, riding the subway everywhere and sticking to free sights (the parks, the bridges, the Staten Island Ferry) can manage on roughly $90–130. A mid-range day — restaurant lunches and dinners, one paid attraction a day and a mix of subway and the occasional cab — lands around $220–320, which is what most visitors spend. A comfortable or luxury day, with fine dining, taxis everywhere, several attractions and shopping, easily runs $600 and up, with no real ceiling. The biggest single cost is accommodation. Two things surprise almost every visitor: a tip of 18–22% is expected on restaurant bills and in cabs, and 8.875% sales tax is added at the register on almost everything, so the price you see is rarely the price you pay — budget around 30% on top of menu prices for tax and tip. The good news is that the subway ($2.90) and many of the city's greatest experiences are cheap or free.",
  },
  {
    name: "Hotel & accommodation costs", slug: "hotel-costs", image: IMG, rating: 5, area: "Per night",
    tip: "Rooms are small and pricey, and city and hotel taxes add roughly 15% — consider Brooklyn or Queens near a subway line for better value.",
    filterKeys: [],
    description: "Accommodation is New York's biggest cost; expect $200+ for a basic room and $350+ for mid-range in Manhattan.",
    practicalInfo: { openingHours: "N/A", price: "Hostel dorm ~$50–90; budget hotel ~$200–280; mid-range ~$350–450; luxury $700+", howToGetThere: "Manhattan costs most; Brooklyn and Queens near a subway are often half the price" },
    fullDescription: "Accommodation is where New York hits your wallet hardest, and rooms are famously small for the price. As a rough guide: a hostel dorm bed runs about $50–90 a night, a simple budget hotel $200–280, a mid-range hotel $350–450, and luxury hotels from $700 with no upper limit in Manhattan. Prices swing sharply with season and demand, spiking around Christmas and New Year (when they can double), during the US Open and over major events, and dropping in the quieter winter weeks of January and February, when you can find 30–40% discounts outside the holidays. Watch for two extras added at checkout: a city and hotel occupancy tax of around 14.75% plus a few dollars a night, and, at some hotels, a 'resort fee' — together these can push the real total well above the advertised rate, so budget roughly 15–18% on top. To get better value, book as far ahead as you can, travel midweek or off-season, and look beyond Manhattan: Brooklyn (Williamsburg, DUMBO) and Queens near a subway line are often around half the Manhattan price while still well connected. Avoid booking in Times Square for a 'central' location — it's overcrowded and overpriced.",
  },
  {
    name: "Food & drink costs", slug: "food-costs", image: IMG, rating: 5, area: "Per person",
    tip: "Eat like a local — pizza, delis and food trucks give world-class food cheaply, and many restaurants do 'lunch specials' at a fraction of dinner prices.",
    filterKeys: [],
    description: "Meals range from a few dollars for a slice to $300+ for fine dining; $50 covers a good mid-range dinner.",
    practicalInfo: { openingHours: "N/A", price: "Slice/deli/truck $4–9; casual meal $18–22; mid dinner for two $120–160; fine dining $100+ pp", howToGetThere: "Add 8.875% tax and an 18–22% tip on top of menu prices" },
    fullDescription: "New York is one of the world's great food cities — and one of its most expensive, though you can eat brilliantly on any budget. At the cheap end, the city's iconic quick eats are superb value: a classic pizza slice, a deli sandwich or a food-truck dish costs $4–9, and a simple meal at a neighbourhood spot $18–22. Coffee runs $5–6 and a beer at a bar $8–10 before tip. A three-course mid-range dinner for two lands around $120–160 before tax and tip, fine dining starts around $100 a head and climbs steeply, and the city's three-Michelin-star tasting menus run $295–395 per person. The golden rule for value is to eat like a local — pizza, delis, food trucks and the markets and food halls deliver iconic food cheaply — and to look for 'lunch specials', where many restaurants serve the same quality at a fraction of the dinner price. Crucially, remember the two additions that catch out visitors: 8.875% sales tax is added at the register (not shown on the menu), and an 18–22% tip is expected on table service, so the real cost of a sit-down meal is roughly 30% above the menu price. Tap water is free to ask for, and happy hours ease the drinks budget.",
  },
  {
    name: "Attractions, passes & tax", slug: "attraction-costs", image: IMG, rating: 5, area: "Per entry",
    tip: "Doing several paid sights? A New York CityPASS can save around 40% — and remember many top museums are free or 'pay what you wish' at set times.",
    filterKeys: [],
    description: "Major attractions cost $30–45 each, but passes and the city's many free sights can cut costs sharply.",
    practicalInfo: { openingHours: "N/A", price: "Empire State $44; MoMA $30; 9/11 Museum $33; Statue of Liberty ferry $25; CityPASS ~$146", howToGetThere: "Book timed-entry sights online ahead; passes sold online" },
    fullDescription: "New York's headline attractions carry mid-to-high prices and add up fast, so it's worth doing the maths on passes — and taking advantage of how much is free. Individually, the Empire State Building is around $44, Top of the Rock $40, MoMA and the Met $30, the 9/11 Museum $33, and the Statue of Liberty ferry $25. A New York CityPASS (around $146) bundles five of nine top attractions and saves roughly 40% if you use all five, while the broader New York Pass suits intensive multi-day sightseeing. Just as important, many of the city's best experiences are free: Central Park, the High Line, a walk across the Brooklyn Bridge and the Staten Island Ferry (with its Statue of Liberty views) cost nothing at all. Several major museums are 'pay what you wish' or free at set times — the Met for New York-area residents, MoMA free on Friday evenings, the Whitney and the Guggenheim pay-what-you-wish on certain evenings — so check schedules before you go. Crucially, book the most popular timed-entry sights, above all the Statue of Liberty ferry, the Empire State Building and the 9/11 Museum, online and well ahead, as they sell out. And note that clothing and shoes under $110 are free of the city's 8.875% sales tax.",
  },
  {
    name: "Money-saving tips", slug: "saving-tips", image: IMG, rating: 5, area: "Whole trip",
    tip: "So much of New York is free — the parks, the bridges, the Staten Island Ferry and the harbour views cost nothing at all.",
    filterKeys: [],
    description: "Free sights, the OMNY fare cap, off-season timing and eating like a local all cut the cost of a visit.",
    practicalInfo: { openingHours: "N/A", price: "Many top experiences are free", howToGetThere: "N/A" },
    fullDescription: "New York is expensive, but a little planning goes a long way. Start with everything that's free: strolling Central Park and the High Line, walking across the Brooklyn Bridge, riding the Staten Island Ferry for its skyline and Statue of Liberty views, and exploring neighbourhoods like the Village, SoHo and DUMBO — none of it costs a cent, and it includes some of the city's very best experiences. Use the subway rather than cabs: at $2.90 a ride it's one of the few bargains in the city, and OMNY's weekly cap means you ride free after 12 taps in a Monday-to-Sunday week. Eat where locals do — pizza, delis, food trucks, and the markets and food halls — and look for 'lunch specials' to get dinner-quality food far cheaper. Buy a CityPASS if you're visiting several paid attractions, and time visits to museums' free or 'pay what you wish' hours. Travel in the off-season (January and February, outside the holidays) for markedly cheaper flights and hotels, and consider staying in Brooklyn or Queens near a subway line. Finally, always budget for the tax and tip that sit on top of listed prices — factor them in and a notoriously costly city becomes far more manageable.",
  },
];

function jsonLd() {
  return {
    "@type": "BreadcrumbList",
    "@context": "https://schema.org",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "New York", item: `${SITE}/new-york` },
      { "@type": "ListItem", position: 3, name: "Prices", item: `${SITE}/new-york/prices` },
    ],
  };
}

export default function NewYorkPrices() {
  return (
    <CityGuideShell
      citySlug="new-york"
      cityName="New York"
      categories={CATEGORIES}
      active="prices"
      crumb="Prices"
      h1="New York Prices & Budget Guide"
      heroImage={IMG}
      intro="How much does a trip to New York actually cost? It's one of the most expensive cities in the US, but with the right planning it's very manageable. This guide breaks down flight fares and the real on-the-ground costs, all in US dollars — from daily budgets and hotel rates to what you'll pay for meals, museums and transport — plus the sales tax and tipping that catch out first-timers, and the passes and free sights that save the most money."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="The cost of a trip to New York — in detail" items={INFO} />
    </CityGuideShell>
  );
}
