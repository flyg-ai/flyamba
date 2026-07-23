import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/amsterdam-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Amsterdam Prices 2026 — Flights, Budget & Daily Costs | Flyamba",
  description:
    "How much does Amsterdam cost? Flight fares from $255, plus a full daily-budget breakdown — hotels, food, attractions, transport and money-saving tips, in USD and euros.",
  alternates: { canonical: `${SITE}/amsterdam/prices` },
  openGraph: { title: "Amsterdam Prices & Budget Guide | Flyamba", description: "Flight fares, daily budgets and the real cost of a trip to Amsterdam.", type: "article" },
};

const IMG = "/images/amsterdam/sevardheter/dam-torget.webp";

const INFO: BcnPlace[] = [
  {
    name: "Flight prices to Amsterdam", slug: "flight-prices", image: IMG, rating: 5, area: "AMS · round trip",
    tip: "Book 6–8 weeks ahead and fly Tuesday or Wednesday for the lowest fares to Schiphol.",
    filterKeys: [],
    description: "Round-trip fares to Amsterdam Schiphol start from around $255 and peak in mid-summer.",
    practicalInfo: { openingHours: "Cheapest: February & November", price: "From ~$255 round trip; ~$400 in July–August", howToGetThere: "Non-stop from New York, Boston, Atlanta, London, Paris, Dubai and more" },
    fullDescription: "Amsterdam is one of the best-connected cities in Europe, thanks to Schiphol (AMS) being the home hub of KLM and a major transatlantic gateway, which keeps fares competitive year-round. As a rough guide in US dollars, round-trip flights start from around $255 in the cheapest months and climb to roughly $400 at the height of summer. The two cheapest months to fly are February and November, when demand dips outside the holidays and tulip season; prices then rise steadily through spring, peaking in July and August before easing again in autumn. To get the best price, book about six to eight weeks in advance for European origins (a little earlier for peak summer or from North America), be flexible with dates, and favour midweek departures — Tuesdays and Wednesdays are typically cheaper than weekends. Non-stop routes serve many US cities including New York, Boston, Atlanta, Chicago and Los Angeles, plus short, frequent hops from London (about an hour) and Paris. Set a fare alert, compare across the KLM/Delta and low-cost carriers, and consider flying into Schiphol even if visiting nearby cities, as its connections are excellent.",
  },
  {
    name: "Daily budget — what to expect", slug: "daily-budget", image: IMG, rating: 5, area: "Per person / day",
    tip: "Amsterdam is pricier than most of Europe — a mid-range day runs around €150–200 per person.",
    filterKeys: [],
    description: "A realistic daily budget in Amsterdam runs from about €80 (backpacker) to €250+ (comfortable).",
    practicalInfo: { openingHours: "N/A", price: "Budget ~€80–110; mid-range ~€150–200; luxury €300+ per person/day", howToGetThere: "Costs shown per person per day excluding flights" },
    fullDescription: "Amsterdam is one of the more expensive cities in Europe, on a par with London or the Nordic capitals, so it pays to budget realistically. As a per-person, per-day guide (excluding flights): a budget traveller staying in hostels, eating from markets and street stalls, walking or cycling and picking one paid attraction can manage on roughly €80–110. A mid-range trip — a three-star hotel or good B&B, a couple of sit-down meals, a museum or two and public transport — lands around €150–200 a day, which is what most visitors spend. A comfortable or luxury day, with a four- or five-star hotel, fine dining, canal cruises and taxis, easily runs €300 and up. The biggest variable is accommodation, which is expensive and scarce, especially in summer and during events like King's Day. You can trim costs significantly by visiting free sights (the Canal Ring, Vondelpark, Begijnhof, markets, the free ferries and NEMO's rooftop), buying a museum or transport pass if you'll use it, eating at food halls and markets rather than tourist-strip restaurants, and drinking in brown cafés rather than hotel bars. Book beds and popular timed-entry museums well ahead to avoid last-minute premium pricing.",
  },
  {
    name: "Hotel & accommodation costs", slug: "hotel-costs", image: IMG, rating: 5, area: "Per night",
    tip: "Rooms are small and pricey — book months ahead, and consider Amsterdam-Noord or Zuid for value.",
    filterKeys: [],
    description: "Accommodation is Amsterdam's biggest cost; expect €150+ for a decent central double.",
    practicalInfo: { openingHours: "N/A", price: "Hostel dorm ~€40–70; 3-star double ~€150–220; luxury €350+", howToGetThere: "Central canal-ring hotels cost most; Noord, Oost and Zuid offer better value" },
    fullDescription: "Accommodation is where Amsterdam hits your wallet hardest. The city has limited space, strict rules on new hotels and short-term rentals, and huge demand, which keeps prices high and rooms famously compact. As a rough guide: a hostel dorm bed runs about €40–70 a night (more during events), a decent three-star double in or near the centre typically costs €150–220, stylish four-star and design hotels €220–350, and canal-house luxury €350 well into four figures for suites. Prices swing dramatically with the calendar — they spike around King's Day (late April), Pride (early August), the Amsterdam Dance Event (October) and over New Year, and are lowest in the quieter winter weeks outside the holidays. To get better value, book as far ahead as you can, travel midweek or off-season, and look beyond the canal ring: the up-and-coming Amsterdam-Noord (a free ferry from Centraal), the leafy, affluent Zuid, and the lively Oost and De Pijp districts all offer more space and often better rates than the historic core, while remaining well connected by tram and metro. Watch for the city tourist tax (a percentage of the room rate plus a per-person charge), which is added on top and can be significant on a pricey room.",
  },
  {
    name: "Food & drink costs", slug: "food-costs", image: IMG, rating: 5, area: "Per person",
    tip: "Eat at markets, food halls and brown cafés, not the tourist-strip restaurants around Damrak.",
    filterKeys: [],
    description: "Meals range from cheap market snacks to Michelin splurges; €25–45 covers a good dinner.",
    practicalInfo: { openingHours: "N/A", price: "Market snack €3–7; casual meal €15–25; mid dinner €30–45; fine dining €75–250", howToGetThere: "Best value in De Pijp, the Jordaan, food halls and away from Damrak/Leidseplein" },
    fullDescription: "Eating in Amsterdam spans every budget. At the cheap end, the city's markets and street food are excellent value: a fresh stroopwafel or portion of fries with mayo costs €3–5, raw herring from a stand a few euros, and a filling plate at a food hall like Foodhallen around €10–15. A casual sit-down lunch or a meal in a brown café runs roughly €15–25 a head, a good mid-range dinner with a drink €30–45, and the city's celebrated fine-dining and Michelin restaurants anywhere from €75 to €250-plus for a tasting menu. Drinks add up quickly: a beer in a bar is typically €4–6, a glass of wine €5–8, and a craft cocktail €12–16. Coffee-and-cake in a café is around €7–9. The golden rule is to avoid the tourist-trap restaurants along the Damrak and immediately around Leidseplein and the Red Light District, where prices are high and quality low; instead eat in De Pijp, the Jordaan, Oost and the streets away from the main drags, where locals go. Tipping is modest — rounding up or leaving 5–10% for good service is normal, not obligatory. Tap water is safe and free to ask for.",
  },
  {
    name: "Attractions, cruises & passes", slug: "attraction-costs", image: IMG, rating: 5, area: "Per entry",
    tip: "Doing 3+ museums? The Museumkaart or I amsterdam City Card usually pays for itself.",
    filterKeys: [],
    description: "Major museums cost around €20–22.50; passes can save money on a culture-heavy trip.",
    practicalInfo: { openingHours: "N/A", price: "Rijksmuseum €22.50; Van Gogh €20; Anne Frank €16; canal cruise from €18; I amsterdam City Card from ~€24", howToGetThere: "Book timed-entry museums online well ahead; passes sold online and at the airport/VVV" },
    fullDescription: "Amsterdam's headline attractions carry mid-to-high European prices, and they add up fast on a culture-packed trip, so it's worth doing the maths on passes. Individually, the big museums cost around €20–22.50 (Rijksmuseum €22.50, Stedelijk €22.50, Van Gogh Museum €20), the Anne Frank House €16 (online only), NEMO €17.50, the Moco €21.95 and Artis Zoo €26, while a standard one-hour canal cruise starts from about €18 and A'DAM Lookout is €16.50. Under-18s go free at the state museums, a big saving for families. If you plan to visit several museums, two passes can cut costs: the Museumkaart (around €75 for a year, but usable across the Netherlands and quickly worthwhile if you'll see four or more museums) covers most collections, while the I amsterdam City Card (from about €24 for 24 hours up to multi-day versions) bundles unlimited GVB public transport, a canal cruise and free entry to many museums and attractions — ideal for a short, intensive sightseeing trip. Crucially, book the most popular timed-entry sights, above all the Anne Frank House and Van Gogh Museum, online and well in advance, as they sell out days or weeks ahead and can't be bought on the door.",
  },
  {
    name: "Money-saving tips", slug: "saving-tips", image: IMG, rating: 5, area: "Whole trip",
    tip: "So much of Amsterdam is free — the canals, parks, markets, ferries and NEMO's rooftop cost nothing.",
    filterKeys: [],
    description: "Free sights, passes, off-season timing and eating like a local all cut the cost of a visit.",
    practicalInfo: { openingHours: "N/A", price: "Many top experiences are free", howToGetThere: "N/A" },
    fullDescription: "Amsterdam is expensive, but a little planning goes a long way. Start with everything that's free: strolling the UNESCO Canal Ring, relaxing in Vondelpark, wandering the Jordaan and its hidden hofjes, ducking into the serene Begijnhof, browsing the Albert Cuyp, Waterlooplein and Noordermarkt markets, riding the GVB ferries across the IJ, and climbing NEMO's rooftop terrace for a top city view — none of it costs a cent. Time your trip to the shoulder or off-season (autumn and winter outside the holidays) for markedly cheaper flights and hotels, and travel midweek. Buy the right pass for how you'll travel and sightsee — a GVB day ticket or the I amsterdam City Card for transport, and the Museumkaart if you're museum-mad — rather than paying à la carte. Eat where locals do, in De Pijp, the Jordaan and the food halls, and picnic with market supplies. Drink in brown cafés and at happy hours rather than hotel bars, and refill a water bottle from the tap. Book the free-but-must-reserve and timed-entry sights early to avoid pricey last-minute alternatives, and cycle or walk instead of taking taxis. Do all this and a notoriously costly city becomes very manageable.",
  },
];

function jsonLd() {
  return {
    "@type": "BreadcrumbList",
    "@context": "https://schema.org",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Amsterdam", item: `${SITE}/amsterdam` },
      { "@type": "ListItem", position: 3, name: "Prices", item: `${SITE}/amsterdam/prices` },
    ],
  };
}

export default function AmsterdamPrices() {
  return (
    <CityGuideShell
      citySlug="amsterdam"
      cityName="Amsterdam"
      categories={CATEGORIES}
      active="prices"
      crumb="Prices"
      h1="Amsterdam Prices & Budget Guide"
      heroImage={IMG}
      intro="How much does a trip to Amsterdam actually cost? It's one of Europe's pricier cities, but with the right planning it's very manageable. This guide breaks down flight fares (in USD) and the real on-the-ground costs (in euros) — from daily budgets and hotel rates to what you'll pay for meals, museums, canal cruises and transport — plus the passes and tricks that save the most money."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="The cost of a trip to Amsterdam — in detail" items={INFO} />
    </CityGuideShell>
  );
}
