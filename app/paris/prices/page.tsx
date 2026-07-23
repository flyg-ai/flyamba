import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { CATEGORIES } from "@/app/data/paris-places";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Paris Prices in 2026 — Cost Guide | Flyamba",
  description:
    "What a trip to Paris really costs — flight fares from around $286, hotel prices by category, the cost of food and drink, museum tickets and the Paris Museum Pass, plus realistic daily budgets for every kind of traveller.",
  alternates: { canonical: `${SITE}/paris/prices` },
  openGraph: { title: "How Much Does Paris Cost? | Flyamba", description: "Flights, hotels, food, attractions and daily budgets for Paris.", type: "article" },
};

const PLACEHOLDER = "/images/barcelona/placeholder.webp";

const INFO: BcnPlace[] = [
  {
    name: "Flight Prices to Paris", slug: "flight-prices", image: PLACEHOLDER,
    rating: 4.3, area: "Round-trip, economy", tip: "February and November are cheapest; book six to eight weeks ahead and fly midweek for the best fares.",
    filterKeys: [],
    description: "What you'll pay to fly to Paris (CDG), and when fares are highest and lowest through the year.",
    practicalInfo: { openingHours: "Book 6–8 weeks ahead", price: "From ~$286 round-trip; ~$265 in low season, $410+ in July", howToGetThere: "Most flights land at Charles de Gaulle (CDG); some at Orly (ORY)" },
    fullDescription: "Flights are usually the biggest single cost of a Paris trip, and they swing widely with the season. Round-trip economy fares start from around $286, dropping to roughly $265 in the cheapest months of February and November and climbing to $410 or more at the July peak, with spring and the Christmas period also busy and pricier. As a rough guide, the earlier months of the year and late autumn offer the best value, while summer and school holidays cost most. To keep fares down, book about six to eight weeks in advance for European origins (longer for long-haul), fly midweek — Tuesday and Wednesday departures tend to be cheapest — and stay flexible on exact dates, using a fare calendar to spot the lowest days. Charles de Gaulle handles most international arrivals, but compare fares into Orly too, and weigh genuinely cheap Beauvais deals against its long, extra transfer cost. Paris is also superbly connected by high-speed rail and the Eurostar, which can beat short-haul flights on time and price from nearby cities. Prices here are shown in US dollars.",
  },
  {
    name: "Hotel & Accommodation Prices", slug: "accommodation-prices", image: PLACEHOLDER,
    rating: 4.2, area: "Per night, double room", tip: "Rates spike during fashion weeks and big events — book early and consider the outer arrondissements for value.",
    filterKeys: [],
    description: "Nightly prices for Paris accommodation, from hostels and budget hotels to boutiques and Palace hotels.",
    practicalInfo: { openingHours: "Check-in typically 15:00", price: "Hostel dorm €35–50; mid-range €150–250; luxury €400–1,500+", howToGetThere: "Central arrondissements cost more; the 10th–20th offer better value" },
    fullDescription: "Accommodation is Paris's other major expense, and prices reflect both the season and the neighbourhood. At the budget end, a hostel dorm bed runs around €35–50 a night and a simple two-star hotel room from about €90–130. Mid-range and boutique hotels — the sweet spot for most visitors — typically cost €150–250 a night, buying character and a good location, while the city's design-led four-stars sit around €250–400. At the top, five-star and the elite 'Palace'-rated hotels like the Ritz and Le Bristol run from €400 well into four figures a night. Location drives price heavily: the central 1st to 8th arrondissements and Saint-Germain command a premium, whereas the livelier outer districts (the 10th, 11th, 18th, 19th and 20th) offer noticeably better value while staying well connected by Métro. Rates surge during the fashion weeks, major trade fairs and peak summer, so book well ahead for those periods. Apartment rentals can suit families and longer stays, though city regulations have tightened. Wherever you stay, reserve early for the best rates and rooms.",
  },
  {
    name: "Food & Drink Costs", slug: "food-drink-prices", image: PLACEHOLDER,
    rating: 4.4, area: "Per person", tip: "Order the fixed-price 'formule' at lunch, and drink your coffee standing at the bar to pay far less.",
    filterKeys: [],
    description: "What eating and drinking in Paris costs, from a café coffee and a bakery lunch to a bistro dinner.",
    practicalInfo: { openingHours: "Cafés from ~07:00; lunch ~12:00–14:30; dinner from ~19:30", price: "Espresso €2–4; bakery lunch €6–10; bistro dinner €30–50; tasting menus €100+", howToGetThere: "Cheaper away from tourist hotspots; bakeries and markets for budget meals" },
    fullDescription: "Paris can be as cheap or as expensive to eat in as you choose. At the affordable end, a boulangerie is your friend: a fresh baguette sandwich, quiche or slice of pizza costs around €6–10, and a buttery croissant just €1.50–2, making a superb budget lunch. An espresso at a café runs €2–4 (much less standing at the bar than seated on a terrace), a glass of wine €5–8 and a demi of beer €5–7. For a proper meal, the smart move is the fixed-price lunch 'formule' — two or three courses for around €18–28 at many bistros, far cheaper than the same food at dinner. A relaxed bistro dinner à la carte typically comes to €30–50 a head with wine, a smarter restaurant more, and the city's tasting-menu temples run from €100 well past €300. Historic bouillons remain a bargain, serving full French classics for under €25. Tap water ('une carafe d'eau') is free and normal to request. Tipping is not obligatory as service is included, though rounding up or leaving a few euros for good service is appreciated. Eat where locals do, away from the main sights, for the best value.",
  },
  {
    name: "Attractions, Museums & the Paris Museum Pass", slug: "attraction-prices", image: PLACEHOLDER,
    rating: 4.3, area: "Per person, entry", tip: "The Paris Museum Pass covers 50+ sights and skips ticket queues — do the maths if you'll visit three-plus museums.",
    filterKeys: [],
    description: "Entry prices for Paris's main sights, plus how the Paris Museum Pass and free days can save you money.",
    practicalInfo: { openingHours: "Most museums close Mon or Tue; late nights vary", price: "Museums €12–22; Eiffel Tower ~€14–29; Paris Museum Pass from ~€79 (2 days)", howToGetThere: "Book timed online tickets for major sights to skip queues" },
    fullDescription: "Sightseeing adds up in Paris, so plan your tickets. Individual museum entry typically runs €12–22 — the Louvre and Musée d'Orsay are €22 and €16, the Orangerie €13, the Rodin €14 — while the Eiffel Tower costs from about €14 (stairs) to €29 (lift to the summit). Two strategies cut the cost. First, the Paris Museum Pass covers more than 50 museums and monuments — including the Louvre, Orsay, Arc de Triomphe, Sainte-Chapelle, the Rodin, the Pompidou and Versailles's palace — for a flat price from around €79 for two days, and just as usefully lets you skip the ticket queues (you still need timed reservations at some sights like the Louvre). If you'll see three or more of the big museums, it usually pays off and saves hours of queuing. Second, many national museums are free on the first Sunday of each month, and all are free for under-18s and EU residents under 26; the Orsay also does free first Sundays, and Notre-Dame and most churches are always free. Book timed online tickets for the Eiffel Tower, Louvre, Catacombs and Sainte-Chapelle to avoid long waits, and factor a few paid day trips (Versailles, Giverny) into your budget separately.",
  },
  {
    name: "Sample Daily Budgets", slug: "daily-budgets", image: PLACEHOLDER,
    rating: 4.2, area: "Per person, per day (excl. flights)", tip: "A weekly Navigo pass plus bakery lunches and free-Sunday museums stretch a mid-range budget a long way.",
    filterKeys: [],
    description: "Realistic per-day spending in Paris for budget, mid-range and luxury travellers, excluding flights.",
    practicalInfo: { openingHours: "—", price: "Budget ~€70–110/day; mid-range ~€150–250/day; luxury €400+/day", howToGetThere: "Costs assume public transport; walking cuts them further" },
    fullDescription: "Bringing it together, here is roughly what to expect to spend per person per day in Paris, excluding your flights. A budget traveller can manage on around €70–110 a day: a hostel dorm or cheap room, bakery and market meals with the odd bistro lunch formule, a weekly Navigo transport pass, and a mix of free sights (churches, parks, wandering the Marais and Montmartre) with the occasional paid museum or free-Sunday visit. A mid-range trip runs about €150–250 a day: a comfortable boutique or three-star hotel, a couple of café stops, a proper bistro dinner with wine, a Paris Museum Pass covering the main sights and a day trip or two. At the luxury end, €400 a day and well upwards covers a high-end or Palace hotel, fine dining, taxis or private transfers, premium experiences and shopping. Across all levels, the biggest savings come from walking (Paris is compact and lovely on foot), eating from bakeries and markets, drinking coffee at the bar rather than the terrace, timing museum visits for free days, and buying a weekly Navigo pass. Accommodation and dining, not sightseeing, dominate most Paris budgets, so that's where to focus your choices.",
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Paris", item: `${SITE}/paris` },
      { "@type": "ListItem", position: 3, name: "Prices", item: `${SITE}/paris/prices` },
    ],
  };
}

export default function ParisPrices() {
  return (
    <CityGuideShell
      citySlug="paris"
      cityName="Paris"
      categories={CATEGORIES}
      active="prices"
      crumb="Prices"
      h1="How Much Does Paris Cost?"
      heroImage="/images/destinations/flights-paris.avif"
      intro="Paris has a reputation for being expensive, but it can flex to almost any budget once you know where the money goes. Flights start from around $286 round-trip, and on the ground your two big costs are accommodation and dining — both of which offer real savings if you choose wisely. This guide breaks down flight fares, hotel prices by category, the cost of food and drink, museum tickets and the money-saving Paris Museum Pass, and pulls it together into realistic daily budgets for every kind of traveller."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Paris costs in detail" items={INFO} />
    </CityGuideShell>
  );
}
