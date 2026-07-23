import type { Metadata } from "next";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { CATEGORIES } from "@/app/data/london-places";

const SITE = "https://flyamba.com";

export const metadata: Metadata = {
  title: "Prices in London 2026 — Cost Guide | Flyamba",
  description:
    "How much does London cost? A real-world breakdown of daily budgets, food and drink, hotels, attractions and transport in USD and £, plus the best ways to save in an expensive city.",
  alternates: { canonical: `${SITE}/london/prices` },
  openGraph: { title: "London Cost & Budget Guide | Flyamba", description: "Daily budgets, food, hotels, attractions and transport costs.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "London", item: `${SITE}/london` },
      { "@type": "ListItem", position: 3, name: "Prices", item: `${SITE}/london/prices` },
    ],
  };
}

const IMG = "/images/content/photo-1579621970563-ebec7560ff3e.avif";

const ITEMS: BcnPlace[] = [
  {
    name: "Daily budget overview", slug: "daily-budget", image: IMG, rating: 4.5, area: "London",
    tip: "Lean on London's free museums and galleries — you can fill entire days with world-class culture for nothing.",
    filterKeys: [],
    description: "What to expect to spend per day in London, by travel style.",
    practicalInfo: { openingHours: "—", price: "Budget ~$90–120 / Mid-range ~$180–280 / Luxury $400+ per day", howToGetThere: "Excludes flights & accommodation; per person per day" },
    fullDescription: "London is one of Europe's more expensive capitals, but your daily spend varies hugely with how you travel. As a rough guide (per person, per day, excluding your flight and hotel): a budget traveller can manage on around $90–120 by using free museums, eating from markets and supermarkets, drinking in the odd pub and relying on the capped Tube and buses. A mid-range visitor doing a couple of paid attractions, eating at casual restaurants and enjoying a few pints or cocktails should budget roughly $180–280. Luxury travellers dining at smart restaurants, booking West End theatre and taking taxis will spend $400 and up. Accommodation is the biggest single cost and sits on top of these figures — expect from around $130 a night for a budget chain hotel to $300-plus for four-star and far more for the grande dames. The great equaliser is culture: the British Museum, National Gallery, Tate Modern, Natural History and Science Museums and the V&A are all free, so you can enjoy some of the world's finest collections without spending a penny. Plan a mix of free sights and a few paid highlights to keep costs sensible.",
  },
  {
    name: "Food & drink costs", slug: "food-drink-costs", image: IMG, rating: 4.4, area: "London",
    tip: "Lunch is far cheaper than dinner — many top restaurants offer set lunch or pre-theatre menus at a fraction of evening prices.",
    filterKeys: [],
    description: "Typical costs for meals, coffee, pints and eating out.",
    practicalInfo: { openingHours: "—", price: "Pub meal ~£14–18 / Restaurant main ~£16–26 / Pint ~£6–7 / Coffee ~£3.50", howToGetThere: "Cheapest eats: markets, bakeries, chains & meal deals" },
    fullDescription: "Eating and drinking in London ranges from bargain to eye-watering, so it pays to know the going rates. A supermarket 'meal deal' (sandwich, snack and drink) costs around £4–5 and is how many locals do lunch; a bakery or street-food-market plate runs £7–10. A casual café or pub meal is typically £14–18, a main course at a mid-range restaurant £16–26, and fine dining climbs from £60 a head into the hundreds. Drinks add up fast: a pint of beer averages £6–7 (more in the West End, less in outer or Sam Smith's pubs), a glass of wine £8–12, a cocktail £12–16, and a flat white about £3.50. Tap water is free and safe everywhere, and a service charge of 12.5% is usually added to restaurant bills (check before tipping again). The smartest saving is timing: many excellent restaurants, including some Michelin-starred ones, offer set lunch and pre-theatre menus at a fraction of à la carte dinner prices. Ethnic-food neighbourhoods and the great food markets — Borough, Camden, Brick Lane — deliver superb, affordable meals. Eat your big meal at lunch, graze the markets, and you can eat very well in London without overspending.",
  },
  {
    name: "Accommodation prices", slug: "accommodation-prices", image: IMG, rating: 4.3, area: "London",
    tip: "Stay near a fast Tube or Elizabeth line stop in Zone 2 for markedly cheaper rooms just minutes from the centre.",
    filterKeys: [],
    description: "What hotels, hostels and apartments cost across the city.",
    practicalInfo: { openingHours: "—", price: "Hostel dorm ~£30–45 / Budget hotel ~£100–150 / 4-star ~£220–350 / Luxury £500+", howToGetThere: "Prices per night, rising sharply in summer & event weeks" },
    fullDescription: "Accommodation is where London hits your wallet hardest, and prices swing widely by season, location and how far ahead you book. A hostel dorm bed costs roughly £30–45 a night, a private hostel or basic budget-hotel room £70–110, and reliable branded budget hotels like Premier Inn or Travelodge £100–150 for a clean, comfortable double, often at a great central location. Mid-range three- and four-star hotels typically run £180–350, while the famous luxury names — the Savoy, Ritz, Claridge's — start around £500 and climb far higher. Prices spike in summer, over Christmas, and during major events, and drop in January and February, so timing your visit saves real money. A key strategy is location: staying a stop or two out in Zone 2 — areas like Shoreditch, Southwark, Paddington, King's Cross fringes or near an Elizabeth line station — can cut room rates substantially while keeping you minutes from the centre by Tube. Short-let apartments suit families and longer stays but carry cleaning fees. Whatever the style, book well in advance for the best rates, compare total prices including breakfast and any resort-style fees, and prioritise proximity to a fast transport link over a prestige postcode.",
  },
  {
    name: "Attractions & entertainment", slug: "attraction-costs", image: IMG, rating: 4.5, area: "London",
    tip: "Book paid attractions online in advance — it's cheaper than the gate price and lets you skip the ticket queue.",
    filterKeys: [],
    description: "Entry fees for the big sights, plus theatre and tours.",
    practicalInfo: { openingHours: "—", price: "Major paid sights ~£25–40 / West End theatre from ~£25 / Many museums FREE", howToGetThere: "Free: British Museum, National Gallery, Tate, NHM, Science Museum, V&A" },
    fullDescription: "London's attractions split neatly into the many that are free and the marquee paid sights that carry a premium. The city's greatest museums and galleries — the British Museum, National Gallery, Tate Modern and Tate Britain, the Natural History, Science and Victoria and Albert Museums — are all free to enter, an extraordinary and genuine saving that can anchor whole days of sightseeing. The paid headliners are pricier: the Tower of London is around £35, Westminster Abbey £29, the London Eye from £29, the View from the Shard £32, St Paul's £25, Kew Gardens £22 and Hampton Court £27. Booking these online in advance is almost always cheaper than the gate price and lets you skip the ticket line. If you plan to blitz several paid sights, sightseeing passes like the London Pass can pay off — do the maths against your itinerary first. West End theatre is a London highlight, with tickets from around £25 up to £150; the TKTS booth in Leicester Square and day-seat and lottery schemes offer cheaper same-day seats. Add walking tours (many free, tip-based), river cruises and markets, and you can balance a few paid splurges against plenty of free culture to keep the overall bill in check.",
  },
  {
    name: "Getting around & saving money", slug: "transport-costs-saving", image: IMG, rating: 4.6, area: "London",
    tip: "One contactless card, tapped for every journey, automatically caps your daily travel — you can't overpay.",
    filterKeys: [],
    description: "Transport costs and the best all-round money-saving tactics.",
    practicalInfo: { openingHours: "—", price: "Tube Zone 1 from £2.80 / Bus £1.75 / Daily cap Zones 1–2 ~£8.90", howToGetThere: "Use contactless/Oyster; walk short hops; ride buses for value & views" },
    fullDescription: "Transport is one area where London is refreshingly affordable and predictable. Using a contactless card or Oyster, a single Tube journey in Zone 1 costs from £2.80, any bus is a flat £1.75 (with free bus-to-bus transfers within an hour), and the daily cap for Zones 1–2 is around £8.90 — once you hit that, all further travel is effectively free, so you never need to calculate a travelcard. Walking short hops between central sights costs nothing and is often faster than the Tube. Pulling the money-saving threads together: rely on the free museums and galleries; visit in the cheaper winter months; eat your main meal at lunch and graze the food markets; drink in traditional or outer-zone pubs rather than West End bars; book flights, hotels and paid attractions well ahead and online; and stay near a fast transport link a zone out from the centre. Carry a refillable water bottle (tap water is free and good), look out for free events and festivals, and use day-seat and lottery schemes for cheap theatre. London can be as expensive or as economical as you make it — with a little planning, a rich trip on a modest budget is entirely achievable in one of the world's costliest cities.",
  },
];

export default function LondonPrices() {
  return (
    <CityGuideShell
      citySlug="london"
      cityName="London"
      categories={CATEGORIES}
      active="prices"
      crumb="Prices"
      h1="How Much Does London Cost?"
      heroImage={IMG}
      intro="London has a reputation as an expensive city, but with a little planning it can suit almost any budget. This guide breaks down real-world costs — daily budgets by travel style, food and drink, accommodation, attraction entry fees and transport — and shares the best ways to save, from the city's many free museums to capped travel fares and cheaper lunch menus."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="The cost of visiting London, broken down" items={ITEMS} />
    </CityGuideShell>
  );
}
