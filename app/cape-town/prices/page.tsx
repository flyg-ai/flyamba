import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/cape-town-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Cape Town Prices 2026 — Flights, Budget & Daily Costs | Flyamba",
  description:
    "How much does Cape Town cost? Flight fares from $570, plus a full daily-budget breakdown — hotels, food, wine, attractions, transport and money-saving tips, all in US dollars.",
  alternates: { canonical: `${SITE}/cape-town/prices` },
  openGraph: { title: "Cape Town Prices & Budget Guide | Flyamba", description: "Flight fares, daily budgets and the real cost of a trip to Cape Town.", type: "article" },
};

const IMG = "/images/cape-town/attractions/va-waterfront.webp";

const INFO: BcnPlace[] = [
  {
    name: "Flight prices to Cape Town", slug: "flight-prices", image: IMG, rating: 5, area: "CPT · round trip",
    tip: "Book 10–14 weeks ahead and fly Monday or Tuesday for the lowest fares to Cape Town.",
    filterKeys: [],
    description: "Round-trip fares to Cape Town start from around $570 and peak in the December–January summer.",
    practicalInfo: { openingHours: "Cheapest: July", price: "From ~$570 round trip; ~$760 in Dec–Jan", howToGetThere: "Direct from London, Amsterdam, Doha, Dubai and Frankfurt; one stop from most cities" },
    fullDescription: "Cape Town is a long-haul destination for most travellers, so flights are usually the biggest single cost of a trip, but fares are more reasonable than many expect if you time it right. As a rough guide in US dollars, round-trip flights start from around $570 in the cheapest months and climb to roughly $760 at the height of the December–January summer peak. July is the cheapest month to fly, as the wet winter dampens demand, while prices rise steadily toward the festive season and school holidays. There are non-stop flights from a handful of major hubs — London, Amsterdam, Doha, Dubai and Frankfurt among them — plus frequent domestic connections from Johannesburg; from most other cities you'll connect once, often via a Gulf hub (Dubai, Doha) or an African one (Addis Ababa, Nairobi). To get the best price, book about 10 to 14 weeks ahead (earlier for the December peak), be flexible with dates, favour midweek departures (Monday and Tuesday are typically cheapest), and set a fare alert to catch drops. Consider combining Cape Town with a stopover in your connecting hub, or with a domestic add-on to a safari, to get more from the long journey.",
  },
  {
    name: "Daily budget — what to expect", slug: "daily-budget", image: IMG, rating: 5, area: "Per person / day",
    tip: "Cape Town is excellent value for overseas visitors — a comfortable mid-range day runs around $80–120 per person.",
    filterKeys: [],
    description: "A realistic daily budget in Cape Town runs from about $35 (backpacker) to $150+ (comfortable), excluding flights.",
    practicalInfo: { openingHours: "N/A", price: "Budget ~$35–55; mid-range ~$80–120; luxury $200+ per person/day", howToGetThere: "Costs shown per person per day excluding flights" },
    fullDescription: "Once you've arrived, Cape Town is genuinely excellent value for travellers earning in dollars, euros or pounds, thanks to a favourable exchange rate — everything on the ground feels noticeably cheaper than at home. As a per-person, per-day guide (excluding flights): a budget traveller in hostels, eating at food halls and markets, using Uber sparingly and picking one or two paid sights can manage on roughly $35 to $55. A mid-range trip — a good guesthouse or three- to four-star hotel, a couple of sit-down meals, a wine tasting or two, some attractions and Ubers — lands around $80 to $120 a day, which is what most visitors comfortably spend and buys a lot here. A luxury day, with a five-star hotel, fine dining, private tours and premium experiences like shark diving or a helicopter flight, might run $200 and up, still a fraction of the equivalent in Europe. The biggest variables are accommodation and any big-ticket excursions (safaris, shark cage diving, boat trips). You can keep costs down by eating where locals do, drinking superb local wine (a fraction of European prices), enjoying the many free outdoor experiences, and travelling in the winter off-season. For the standard you get, few world-class cities offer better value.",
  },
  {
    name: "Hotel & accommodation costs", slug: "hotel-costs", image: IMG, rating: 5, area: "Per night",
    tip: "World-ranked five-stars cost a fraction of European prices — but book months ahead for the December–January peak.",
    filterKeys: [],
    description: "Accommodation is a highlight of value in Cape Town; even luxury is affordable by global standards.",
    practicalInfo: { openingHours: "N/A", price: "Hostel dorm ~$15–30; 3–4-star double ~$70–150; luxury $250–1,150+", howToGetThere: "V&A Waterfront and Camps Bay cost most; the City Bowl, Gardens and Sea Point offer better value" },
    fullDescription: "Accommodation in Cape Town offers some of the best value for money of any major world city, especially at the top end. As a rough guide: a hostel dorm bed runs about $15 to $30 a night, a comfortable three- or four-star double typically $70 to $150, and boutique and characterful mid-range stays fall in a similar bracket, while genuine five-star luxury — clifftop villas, design landmarks and V&A Waterfront resorts — ranges from around $250 to over $1,150 a night for the very best, still far below the equivalent in Europe or North America. Prices swing sharply with the season: they peak over the December–January summer holidays and around New Year, when the best places book out months ahead, and are lowest in the June–September winter. Location drives price too: the V&A Waterfront and beachfront Camps Bay command the highest rates, while the central City Bowl, leafy Gardens and Tamboerskloof, and the Sea Point promenade offer more space and better value while remaining well located. To get the best deals, book well ahead for summer, consider the shoulder or winter seasons, and look slightly away from the beachfront. For the quality of hotel your money buys, Cape Town is hard to beat.",
  },
  {
    name: "Food, wine & drink costs", slug: "food-costs", image: IMG, rating: 5, area: "Per person",
    tip: "Local wine is the bargain of the trip — excellent bottles cost a fraction of European prices, even in restaurants.",
    filterKeys: [],
    description: "Meals span cheap food halls to world-class tasting menus, and local wine is superb value throughout.",
    practicalInfo: { openingHours: "N/A", price: "Food-hall meal ~$4–7; casual meal ~$8–14; mid dinner ~$14–27; fine dining ~$65–108", howToGetThere: "Best value at food halls, markets and township restaurants; fine dining is world-class yet affordable" },
    fullDescription: "Eating and drinking in Cape Town is a highlight, and remarkably affordable for a city with a world-class food scene. At the budget end, a big plate at the Eastern Food Bazaar or a market food stall costs around $4 to $7; a casual sit-down lunch runs roughly $8 to $14; a good mid-range dinner with a drink is about $14 to $27 a head; and even the city's celebrated fine-dining tasting menus — several ranked among the best in Africa — typically cost $65 to $108, a fraction of the equivalent elsewhere. The real bargain, though, is wine: the Cape produces superb wine, and a bottle that would cost a small fortune in Europe might be $4 to $11 in a shop or restaurant, so this is the place to drink well without wincing at the bill. Tipping is customary and expected — around 10% at restaurants, on taxis and for guided tours, and a small amount for informal car guards and hotel staff. Card and mobile payments are accepted almost everywhere, so you rarely need cash except for parking guards, tips and some market stalls. To eat well for less, favour food halls, markets and township restaurants over tourist strips, take advantage of wine-farm lunches, and make the most of the extraordinary value of local wine throughout your trip.",
  },
  {
    name: "Attractions, tours & experiences", slug: "attraction-costs", image: IMG, rating: 5, area: "Per entry",
    tip: "A city pass can pay off if you're doing several big-ticket sights and the hop-on-hop-off bus in one trip.",
    filterKeys: [],
    description: "Major sights are affordable, but big-ticket experiences like shark diving and safaris cost more.",
    practicalInfo: { openingHours: "N/A", price: "Table Mountain cableway ~$23; Robben Island ~$32; aquarium ~$14; shark diving ~$135; day safari ~$105", howToGetThere: "Book Table Mountain and Robben Island online ahead; consider a city pass for multiple sights" },
    fullDescription: "Cape Town's attractions are reasonably priced individually, though the big-ticket adventure experiences add up. As a guide: the Table Mountain cableway is around $23 round trip, Robben Island (ferry and tour) about $32, the Two Oceans Aquarium roughly $14, the Cape Point and Cape of Good Hope reserve about $20, Kirstenbosch around $12, and many of the city's finest experiences — Table Mountain hikes, the beaches, Bo-Kaap, Signal Hill sunsets, the Company's Garden — are free. The pricier experiences are the excursions: a full-day Big Five safari at a reserve like Aquila runs around $105 including transfers and lunch, shark cage diving at Gansbaai about $135, whale-watching boat trips around $50, and wine-tour day packages from roughly $43. If you plan to pack in several major sights plus the hop-on-hop-off bus in a few days, a Cape Town city pass can work out cheaper than paying separately, so do the maths for your itinerary. Crucially, book the most popular timed experiences — the Table Mountain cableway and Robben Island above all — online and in advance, as they sell out and can be cancelled by weather. Balancing a few paid highlights with the city's many free outdoor experiences keeps a Cape Town trip very affordable.",
  },
  {
    name: "Money-saving tips", slug: "saving-tips", image: IMG, rating: 5, area: "Whole trip",
    tip: "So much of the best of Cape Town is free — the mountain hikes, beaches, sunsets and markets cost nothing.",
    filterKeys: [],
    description: "Free outdoor experiences, local wine, off-season timing and eating like a local all stretch your budget.",
    practicalInfo: { openingHours: "N/A", price: "Many of the best experiences are free", howToGetThere: "N/A" },
    fullDescription: "Cape Town is already good value, and a little planning makes it even better. Start with everything that's free, which happens to include many of the city's greatest experiences: hiking Lion's Head, Table Mountain (via Platteklip Gorge) and Signal Hill, watching the sunset with a picnic, exploring the colourful Bo-Kaap, wandering the Company's Garden, browsing Greenmarket Square and the weekend markets, and lounging on the spectacular beaches — none of it costs a thing. Time your trip to the shoulder or winter season (roughly April–May or June–September) for markedly cheaper flights and hotels, with July the cheapest month to fly, and travel midweek. Take advantage of the favourable exchange rate and the extraordinary value of local wine — drink Cape wines rather than imports, and enjoy wine-farm lunches, which pair scenery, food and tastings affordably. Eat where locals do, at food halls, markets and township restaurants, rather than tourist strips. Use Uber and Bolt (cheap and safe) instead of pricier private transfers, and consider a hire car shared between a group for the peninsula and winelands. Book the timed-entry sights early to avoid premium last-minute tours. Do all this and a bucket-list city becomes genuinely affordable.",
  },
];

function jsonLd() {
  return {
    "@type": "BreadcrumbList",
    "@context": "https://schema.org",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Cape Town", item: `${SITE}/cape-town` },
      { "@type": "ListItem", position: 3, name: "Prices", item: `${SITE}/cape-town/prices` },
    ],
  };
}

export default function CapeTownPrices() {
  return (
    <CityGuideShell
      citySlug="cape-town"
      cityName="Cape Town"
      categories={CATEGORIES}
      active="prices"
      crumb="Prices"
      h1="Cape Town Prices & Budget Guide"
      heroImage={IMG}
      intro="How much does a trip to Cape Town actually cost? The flights are the main expense, but once you're there the city offers some of the best value of any world-class destination. This guide breaks down flight fares and real on-the-ground costs — from daily budgets and hotel rates to what you'll pay for meals, wine, attractions and transport — all in US dollars, plus the tricks that save the most money."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="The cost of a trip to Cape Town — in detail" items={INFO} />
    </CityGuideShell>
  );
}
