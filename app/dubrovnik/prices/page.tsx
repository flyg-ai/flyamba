import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/dubrovnik-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Dubrovnik Prices 2026 — Costs & Budget Guide | Flyamba",
  description:
    "How much a trip to Dubrovnik costs — the cheapest months to fly, daily budgets from backpacker to luxury, city-walls and cable-car ticket prices, the…",
  alternates: { canonical: `${SITE}/dubrovnik/prices` },
  openGraph: { title: "Dubrovnik Prices & Budget Guide | Flyamba", description: "What a Dubrovnik trip costs: flights, daily budgets, tickets, food and transport, with saving tips.", type: "article" },
};

const INFO_IMG = "/images/destinations/placeholder.avif";

const PRICES: BcnPlace[] = [
  {
    name: "When is it cheapest to fly to Dubrovnik?", slug: "cheapest-time-to-fly", image: INFO_IMG,
    rating: 4.5, reviewCount: 0, area: "Flight prices",
    tip: "February and November are the cheapest months; book 6–8 weeks ahead and note that many European routes to DBV are seasonal, thinning out in winter.",
    filterKeys: [],
    description: "Dubrovnik fares dip in the winter low season and peak in July–August; midweek and advance booking save most, but check that your route runs off-season.",
    practicalInfo: { openingHours: "Low season Nov–Mar; high season Jun–Sep", price: "From ~$248 round-trip in Feb/Nov; ~$475 in the July peak", howToGetThere: "Compare fares in the search widget on our Dubrovnik flights page; set alerts and stay flexible" },
    fullDescription: "Dubrovnik flight prices follow a pronounced seasonal pattern, shaped by the fact that it is above all a summer beach-and-culture destination. The cheapest months to fly are February and November, deep in the low season, when round-trip fares can dip to around $248, with January, March and October also relatively affordable. Prices then climb steeply through spring into the summer peak of July and August — the most expensive stretch at roughly $450–475 round-trip — driven by the school holidays, the Dubrovnik Summer Festival and the flood of Adriatic holidaymakers, even though this is also the hottest and most crowded time. There is a smaller bump around Christmas and New Year. A crucial quirk of Dubrovnik, however, is that a large share of its direct European routes are seasonal, operating mainly from around April or May to October; in the depths of winter, options thin out and you may need to connect via a hub such as Frankfurt, Zagreb or Istanbul, which affects both price and convenience. To get the best deal, book roughly six to eight weeks ahead, fly midweek (Tuesday and Wednesday are usually cheaper than weekends), stay flexible with your dates and use fare alerts. The sweet spot for value and experience is the shoulder season — May, June and September — when fares are more moderate than the peak, the weather is warm and the sea swimmable, and the Old Town is a little less overwhelmed than in the height of summer.",
  },
  {
    name: "Daily budget: what a trip to Dubrovnik costs", slug: "daily-budget", image: INFO_IMG,
    rating: 4.3, reviewCount: 0, area: "Trip budget",
    tip: "Dubrovnik is one of Croatia's priciest spots — self-catering, bakery breakfasts and eating a lane back from Stradun keep costs sane.",
    filterKeys: [],
    description: "A rough daily budget for Dubrovnik across backpacker, mid-range and luxury styles — and why it costs more than the rest of Croatia.",
    practicalInfo: { openingHours: "Estimates per person, per day (excluding flights)", price: "Budget ~€70–95; mid-range ~€160–240; luxury €450+", howToGetThere: "Save with apartments, bakery meals, the Dubrovnik Pass and shoulder-season travel" },
    fullDescription: "It is worth being clear-eyed about this: Dubrovnik is the most expensive city in Croatia, and prices in the Old Town in peak summer can rival or exceed those of Western European capitals, so budgeting matters. As a rough guide per person per day, excluding flights: a budget traveller staying in a hostel dorm (around €30–45 in season) or a modest apartment, eating bakery breakfasts and picnic lunches, self-catering some dinners and relying on free sights and the odd bus can manage on roughly €70–95. A mid-range visitor in a three- or four-star hotel or a good apartment (€120–200 for a double in summer), enjoying restaurant dinners, a couple of paid attractions and activities a day and the occasional taxi or boat trip, should budget around €160–240. A luxury trip with a cliffside five-star, fine dining, private tours and boat charters easily runs to €450 or more. The big fixed costs are accommodation, which spikes dramatically in July and August, and the headline attractions — the €35 city walls and €27 cable car add up quickly for a family. The keys to keeping costs down are staying slightly outside the Old Town (in Lapad or Gruž) or in a self-catering apartment, taking advantage of cheap, excellent bakeries (burek and pastries for a few euros), buying the Dubrovnik Pass if you'll visit several sights, eating and drinking a street or two back from Stradun rather than on it, and above all travelling in the shoulder season, when both flights and hotels cost markedly less. With planning, Dubrovnik need not break the bank — but it rewards a little strategy.",
  },
  {
    name: "Attraction & ticket prices (and the Dubrovnik Pass)", slug: "attraction-prices", image: INFO_IMG,
    rating: 4.4, reviewCount: 0, area: "Sightseeing costs",
    tip: "If you'll walk the walls plus a couple of museums, the Dubrovnik Pass usually pays for itself — the €35 wall ticket alone is most of the 1-day pass price.",
    filterKeys: [],
    description: "What Dubrovnik's major sights cost, from the €35 city walls and €27 cable car to museums and boats — and when the Dubrovnik Pass saves money.",
    practicalInfo: { openingHours: "Most sights ~09:00 until early evening (seasonal); some closed in winter", price: "City walls €35; cable car €27 return; museums €5–15; Dubrovnik Pass 1-day €35", howToGetThere: "Buy the Dubrovnik Pass or timed tickets online; walls & cable car sell out slots in peak summer" },
    fullDescription: "Sightseeing is a significant cost in Dubrovnik, so it pays to know the going rates and how to save. The single essential experience, walking the complete circuit of the city walls, is also the priciest ticket at €35 in peak season (a little less off-peak), while the Srđ cable car costs €27 return. Beyond these, museum and monument entries are more modest: the Rector's Palace is around €15, War Photo Limited €12, the Franciscan Monastery €6, the Dominican Monastery €5, the aquarium about €10 and Fort Lovrijenac is included in the walls ticket. Activities add up too — a Lokrum boat is €27, a sea-kayaking tour €30–40, a Game of Thrones walking tour €30–50, and full-day trips to Montenegro or Mostar €45–100. The smart money-saver is the official Dubrovnik Pass, which comes in one-, three- and seven-day versions (the one-day around €35): crucially it includes entry to the city walls plus a clutch of museums (the Rector's Palace, the maritime and ethnographic museums and more) and free rides on the Libertas city buses, so if you intend to walk the walls and visit even a couple of the included sights, it typically pays for itself and adds convenience — do the maths against your plans. Note the cable car is not included. To save time as well as money, book the walls and cable car online in peak summer to secure a slot and skip queues, and time your visits for early morning or late afternoon to dodge both the heat and the cruise-ship crowds. Many of Dubrovnik's pleasures — wandering the Old Town lanes, Stradun at golden hour, the beaches and the views — cost nothing at all.",
  },
  {
    name: "Eating out: what meals cost in Dubrovnik", slug: "food-prices", image: INFO_IMG,
    rating: 4.4, reviewCount: 0, area: "Food & drink costs",
    tip: "Old Town seafood is dear and fish is priced by weight — always check the price per kilo before ordering a whole fish, and eat a lane back for better value.",
    filterKeys: [],
    description: "A guide to Dubrovnik food and drink prices, from cheap bakery burek and pizza slices to Old Town seafood dinners and coffee.",
    practicalInfo: { openingHours: "Cafés from early; lunch from ~12:00; dinner from ~19:00", price: "Coffee €2–3; burek/bakery €2–5; casual main €12–20; Old Town seafood main €22–35", howToGetThere: "Eat away from Stradun, use bakeries and self-catering, and check fish prices by the kilo" },
    fullDescription: "Eating and drinking is where Dubrovnik's expense really shows, though with a little know-how you can still eat well without emptying your wallet. At the budget end, the city's excellent bakeries (pekarna) are a lifesaver: a flaky burek, a börek or a pizza slice costs just €2–5 and makes a filling breakfast or lunch, and there are cheap-and-cheerful spots for sandwiches and grilled ćevapi. A coffee sat at a café runs €2–3, and it is one of Dubrovnik's great inexpensive pleasures to linger over one watching the Stradun promenade. At the mid-range, a casual restaurant or konoba main dish is typically €12–20, and a relaxed dinner with a drink comes to perhaps €25–35 per person. But the Old Town's smarter seafood restaurants are where bills climb: mains commonly run €22–35, fresh fish and shellfish are frequently priced by the kilogram (so a 'cheap-looking' whole fish can arrive as a €40–60 plate — always ask the price per kilo and the likely weight before ordering), and the fine-dining rooms and the city's Michelin-starred table run considerably higher. A couple of things to watch: many restaurants add a cover/bread charge, and drinks, especially cocktails at the scenic bars (€10–15), add up. The golden rules for both quality and price are to avoid the restaurants with touts and picture menus right on Stradun and the busiest gates, and instead walk a lane or two into the quieter upper Old Town or out to Lapad where locals eat; to use the bakeries and, if self-catering, the Gruž and Gundulić markets; and to enjoy the superb, well-priced Croatian house wines rather than imports. Tipping is not obligatory — rounding up or 10% for good service is generous.",
  },
  {
    name: "Getting around: transport costs", slug: "transport-costs", image: INFO_IMG,
    rating: 4.2, reviewCount: 0, area: "Transport costs",
    tip: "Walking is free and covers the whole Old Town; for the rest, a €2 bus ticket or an Uber/Bolt beats a taxi, and the Dubrovnik Pass includes free bus travel.",
    filterKeys: [],
    description: "What it costs to move around Dubrovnik, from cheap city buses and the airport shuttle to boats, the cable car and taxis.",
    practicalInfo: { openingHours: "Buses ~05:00–02:00; boats daytime; taxis 24h", price: "Bus single ~€2; airport shuttle ~€10; Lokrum boat €27; cable car €27; taxi start ~€5", howToGetThere: "Buy bus tickets from kiosks; use Uber/Bolt for door-to-door; walk the Old Town" },
    fullDescription: "Getting around Dubrovnik is relatively inexpensive, especially as the entire Old Town is car-free and best covered on foot for nothing. When you do need transport, the orange Libertas city buses are the cheapest option: a single ticket is around €2 bought in advance from a Tisak kiosk (or about €2.50 from the driver), covering trips out to Lapad, the beaches, Gruž harbour and beyond, with day passes available for frequent riders — and note that the Dubrovnik Pass includes free bus travel, another reason it can be good value. The airport shuttle bus into the city is about €10 one-way, versus roughly €35–40 for a taxi. For door-to-door journeys, taxis start around €5 and add about €1.50 per kilometre, but Dubrovnik has both Uber and Bolt, which are often cheaper and more transparent, handy for the airport, Gruž or late nights. Boat travel is a bigger cost and part of the sightseeing budget: the Lokrum ferry is €27 return, a sunset cruise around €25, and catamarans to the islands or up the coast €15–40. The Srđ cable car is €27 return (a one-way is cheaper if you fancy walking down). A hire car, useful only for out-of-town day trips, brings rental, fuel, tolls and pricey, scarce city parking, so most visitors skip it and join organised tours or take buses and boats instead. In short, budget a little for the occasional bus, the airport transfer and any boat or cable-car trips you plan, but rest assured that the greatest pleasure — exploring the Old Town on foot — costs nothing at all.",
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Dubrovnik", item: `${SITE}/dubrovnik` },
      { "@type": "ListItem", position: 3, name: "Prices", item: `${SITE}/dubrovnik/prices` },
    ],
  };
}

export default function DubrovnikPrices() {
  return (
    <CityGuideShell
      citySlug="dubrovnik"
      cityName="Dubrovnik"
      categories={CATEGORIES}
      active="prices"
      crumb="Prices"
      h1="Dubrovnik Prices & Budget Guide"
      heroImage="/images/dubrovnik/attractions/stradun.webp"
      intro="Dubrovnik is the most expensive city in Croatia — a glamorous, in-demand destination where Old Town seafood dinners, the €35 city-walls ticket and peak-summer hotels can add up fast. But it rewards a little strategy: this guide breaks down the real costs, from when flights are cheapest and sensible daily budgets to what attractions, meals and getting around actually cost, and how the Dubrovnik Pass, bakeries, apartments and shoulder-season timing can make your euros go a lot further."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="The cost of visiting Dubrovnik" items={PRICES} />
    </CityGuideShell>
  );
}
