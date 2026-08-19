import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES, REYKJAVIK } from "@/app/data/reykjavik-places";
import { SITE } from "@/app/lib/destination-helpers";
import { clampDescription } from "@/app/lib/seo";
import { usd5 } from "@/app/lib/format";

const MIN_USD = Math.min(...REYKJAVIK.monthlyPrices.map((m) => usd5(m.price)));
const MAX_USD = Math.max(...REYKJAVIK.monthlyPrices.map((m) => usd5(m.price)));

export const metadata: Metadata = {
  title: "Reykjavík Prices 2026 — Flights, Budget & Daily Costs",
  description: clampDescription(`How much does Reykjavík cost? Flight fares from $${MIN_USD}, plus a full daily-budget breakdown — hotels, food, geothermal spas, tours and transport — for one of Europe's priciest cities, with money-saving tips.`),
  alternates: { canonical: `${SITE}/reykjavik/prices` },
  openGraph: { title: "Reykjavík Prices & Budget Guide | Flyamba", description: "Flight fares, daily budgets and the real cost of a trip to Reykjavík.", type: "article" },
};

const IMG = "/images/reykjavik/attractions/laugavegur.webp";

const INFO: BcnPlace[] = [
  {
    name: "Flight prices to Reykjavík", slug: "flight-prices", image: IMG, rating: 5, area: "KEF · round trip",
    tip: "Book 4–6 weeks ahead and fly Monday or Tuesday for the lowest fares to Keflavík.",
    filterKeys: [],
    description: `Round-trip fares to Reykjavík Keflavík start from around $${MIN_USD} and peak in mid-summer.`,
    practicalInfo: { openingHours: "Cheapest: February & November", price: `From ~$${MIN_USD} round trip; ~$${MAX_USD} in July–August`, howToGetThere: "Non-stop from New York, Boston, London, Copenhagen, Oslo, Paris and more" },
    fullDescription: `Reykjavík is well connected for a city of its size, thanks to Keflavík (KEF) being the home hub of Icelandair and a key transatlantic stopover point, which keeps fares competitive. As a rough guide in US dollars, round-trip flights start from around $${MIN_USD} in the cheapest months and climb to roughly $${MAX_USD} at the height of summer. The two cheapest months to fly are February and November, when demand dips outside the holidays and the summer peak; prices then rise steadily through spring, peaking in July and August with the midnight-sun crowds before easing again in autumn. To get the best price, book about four to six weeks in advance, be flexible with dates, and favour early-week departures — Mondays and Tuesdays are typically cheaper than weekends. Non-stop routes serve many cities including New York, Boston, London, Copenhagen, Oslo and Paris, and Icelandair's famous stopover programme lets you break a transatlantic journey in Iceland for up to a week at no extra airfare — effectively a free extra destination. Set a fare alert, compare Icelandair with low-cost carriers where they operate, and consider a winter trip for both the lowest fares and the northern lights.`,
  },
  {
    name: "Daily budget — what to expect", slug: "daily-budget", image: IMG, rating: 5, area: "Per person / day",
    tip: "Reykjavík is one of the world's most expensive cities — a mid-range day runs around $150–220 per person.",
    filterKeys: [],
    description: "A realistic daily budget in Reykjavík runs from about $110 (budget) to $300+ (comfortable), excluding flights.",
    practicalInfo: { openingHours: "N/A", price: "Budget ~$110–150; mid-range ~$150–220; luxury $350+ per person/day", howToGetThere: "Costs shown per person per day excluding flights" },
    fullDescription: "There's no getting around it: Reykjavík is one of the most expensive cities in the world, so budget realistically. As a per-person, per-day guide (excluding flights): a budget traveller staying in a hostel, self-catering or eating cheaply (a hot dog, soup, supermarket food), walking everywhere and doing mostly free sights can manage on roughly $110 to $150. A mid-range trip — a comfortable hotel, a couple of restaurant meals, a geothermal spa or museum and some transport — lands around $150 to $220 a day, which is what most visitors spend. A comfortable or luxury day, with a top hotel, fine dining, guided tours and the premium lagoons, easily runs $350 and up. The biggest variables are accommodation, dining and tours, all of which are costly. You can trim spending significantly by eating from bakeries, food halls, hot dog stands and supermarkets rather than restaurants, bathing in the locals' cheap municipal geothermal pools instead of the pricey lagoons, doing free sights (the churches, the Sun Voyager, Tjörnin, the waterfront, the free rooftop views), self-driving day trips rather than booking guided ones, and visiting in the cheaper winter months. Tap water is superb and free, so never buy bottled.",
  },
  {
    name: "Hotel & accommodation costs", slug: "hotel-costs", image: IMG, rating: 5, area: "Per night",
    tip: "Rooms are pricey — book well ahead, and consider a guesthouse, apartment or hostel to save.",
    filterKeys: [],
    description: "Accommodation is a major cost in Reykjavík; expect $200+ for a decent central double.",
    practicalInfo: { openingHours: "N/A", price: "Hostel dorm ~$40–60; 3–4 star double ~$200–350; luxury $500+", howToGetThere: "Central hotels cost most; guesthouses, apartments and countryside stays can be better value" },
    fullDescription: "Accommodation is one of the biggest costs of a Reykjavík trip. Demand is high, supply is limited, and prices reflect it. As a rough guide: a hostel dorm bed runs about $40 to $60 a night, a decent three- or four-star double in or near the centre typically costs $200 to $350, boutique and design hotels more, and countryside luxury resorts or the Retreat at the Blue Lagoon run from $500 well into four figures. Prices swing with the seasons, spiking in the summer high season (June to August) with a premium of around 30 percent, and around Christmas, New Year and Easter, while the quieter winter weeks outside the holidays are cheapest, even though winter is peak northern-lights season and still draws crowds. To get better value, book as far ahead as you can, travel in the shoulder or low season, and look beyond hotels: guesthouses, self-catering apartments (which also cut food costs) and the city's characterful hostels like KEX and Loft all offer savings. Note that a modest per-night accommodation tax is added at checkout. Staying central keeps you within walking distance of everything, but the Grandi harbour district and the suburbs can be cheaper while remaining well connected.",
  },
  {
    name: "Food & drink costs", slug: "food-costs", image: IMG, rating: 5, area: "Per person",
    tip: "Eat at bakeries, food halls, hot dog stands and supermarkets to keep costs down; tap water is free and excellent.",
    filterKeys: [],
    description: "Meals range from cheap hot dogs to Michelin splurges; $30–55 covers a good dinner, and drinks are very expensive.",
    practicalInfo: { openingHours: "N/A", price: "Hot dog ~$6; casual meal ~$20–35; mid dinner ~$40–60; fine dining $95–140", howToGetThere: "Best value at food halls, bakeries and supermarkets; service is included, no tipping needed" },
    fullDescription: "Eating in Reykjavík spans every budget but leans expensive across the board. At the cheap end, the city's famous lamb hot dogs cost around $6, a bowl of hearty soup or a bakery lunch $10 to $15, and a plate at a food hall like Hlemmur Mathöll around $15 to $25. A casual sit-down meal or a burger runs roughly $20 to $35 a head, a good mid-range dinner with a drink $40 to $60, and the city's celebrated fine-dining and Michelin cooking anywhere from $95 to $140-plus for a tasting menu. Drinks are where the bill really climbs: a beer is typically $9 to $14, a glass of wine $12 to $18, and a cocktail $14 to $20, which is why many Icelanders pre-drink at home and buy alcohol from the state Vínbúðin off-licence, far cheaper than bar prices. Coffee is around $5 to $7. The best ways to save are to eat from bakeries, food halls, hot dog stands and supermarkets rather than restaurants, and to make the most of the superb, free Icelandic tap water rather than buying bottled. One welcome quirk: a service charge is always included and tipping is neither expected nor necessary, so the menu price is what you pay.",
  },
  {
    name: "Spas, tours & attractions", slug: "attraction-costs", image: IMG, rating: 5, area: "Per entry",
    tip: "Swap the pricey lagoons for the locals' municipal geothermal pools at about $12 — same warm water, a tenth of the cost.",
    filterKeys: [],
    description: "Geothermal lagoons and tours are the big spends; museums are moderate and many top sights are free.",
    practicalInfo: { openingHours: "N/A", price: "Municipal pool ~$12; Sky/Blue Lagoon ~$75–95; museums ~$15–42; day tours ~$70–150", howToGetThere: "Book lagoons and popular tours ahead; the Reykjavík City Card bundles pools, museums and buses" },
    fullDescription: "Reykjavík's paid attractions and, especially, its geothermal spas and day tours are where a lot of the budget goes, so it pays to plan. The famous lagoons are the priciest single experiences: the Blue Lagoon starts around $75 and Sky Lagoon around $95, and both must be booked ahead. But the city's own municipal geothermal pools, like Laugardalslaug, cost just around $12 for the same warm mineral water and a far more local atmosphere — the single best-value experience in Reykjavík. Museums are moderate, generally $15 to $42 (Perlan is the priciest at around $42, the National Museum around $18, smaller museums $11 to $16), with children often free or heavily discounted. Day tours are a major cost: organised coach trips to the Golden Circle, South Coast or Snæfellsnes run around $70 to $150 per person, while self-driving with a rental car (from $50 to $80 a day) is usually cheaper for a group and more flexible. If you'll visit several museums and use the buses, the Reykjavík City Card bundles unlimited transport, entry to the city's museums and its thermal pools, and can pay for itself. Book the popular lagoons and tours well in advance, especially in high season, as they sell out.",
  },
  {
    name: "Money-saving tips", slug: "saving-tips", image: IMG, rating: 5, area: "Whole trip",
    tip: "So much of Iceland is free — the waterfalls, the coastlines, the churches, the waterfront and the views cost nothing.",
    filterKeys: [],
    description: "Free nature, cheap local pools, self-catering, self-driving and off-season timing all cut the cost of a visit.",
    practicalInfo: { openingHours: "N/A", price: "Many of Iceland's greatest experiences are free", howToGetThere: "Iceland is almost entirely cashless — a contactless card works everywhere" },
    fullDescription: "Reykjavík and Iceland are expensive, but smart planning makes a huge difference. Start with everything free: the country's greatest attractions — the waterfalls, geysers, black beaches, volcanic landscapes and coastlines of the Golden Circle, South Coast and beyond — cost nothing to visit, as do Hallgrímskirkja's nave, the Sun Voyager, Tjörnin, the harbour and the rooftop viewpoints in the city. Bathe in the locals' municipal geothermal pools (around $12) rather than the premium lagoons, and eat from bakeries, food halls, hot dog stands and supermarkets rather than restaurants. Self-cater where you can by booking an apartment or guesthouse with a kitchen, buy any alcohol from the state Vínbúðin off-licence rather than bars, and refill a bottle with the excellent free tap water. Self-drive your day trips rather than booking guided coaches, splitting the rental cost across a group. Time your visit to the cheaper shoulder or winter months for lower flights and hotels, and fly midweek. Consider the Reykjavík City Card if you'll do several museums and use the buses. And remember there's no tipping, as service is always included. Iceland is a place where the very best experiences — its raw, staggering nature — are the ones that cost nothing at all.",
  },
];

function jsonLd() {
  return {
    "@type": "BreadcrumbList",
    "@context": "https://schema.org",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Reykjavík", item: `${SITE}/reykjavik` },
      { "@type": "ListItem", position: 3, name: "Prices", item: `${SITE}/reykjavik/prices` },
    ],
  };
}

export default function ReykjavikPrices() {
  return (
    <CityGuideShell
      citySlug="reykjavik"
      cityName="Reykjavík"
      categories={CATEGORIES}
      active="prices"
      crumb="Prices"
      h1="Reykjavík Prices & Budget Guide"
      heroImage={IMG}
      intro="How much does a trip to Reykjavík actually cost? Iceland is famously one of the most expensive countries in the world, but with the right planning it's very manageable — and much of its greatest asset, the staggering natural scenery, is completely free. This guide breaks down flight fares (in USD) and the real on-the-ground costs — from daily budgets and hotel rates to what you'll pay for meals, geothermal spas, tours and transport — plus the tricks that save the most money."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="The cost of a trip to Reykjavík — in detail" items={INFO} />
    </CityGuideShell>
  );
}
