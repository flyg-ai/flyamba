import type { Metadata } from "next";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { PRAGUE_CATEGORIES } from "@/app/data/prague-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Prague Travel Costs 2026 — Budget Guide | Flyamba",
  description:
    "How much does Prague cost? Daily budgets for budget, mid-range and luxury travellers, plus real prices in Czech koruna (Kč) for beer, food, transport, attractions and hotels.",
  alternates: { canonical: `${SITE}/prague/prices` },
  openGraph: { title: "How Much Does Prague Cost? | Flyamba", description: "Daily budgets and real prices for Prague in koruna.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Prague", item: `${SITE}/prague` },
      { "@type": "ListItem", position: 3, name: "Prices", item: `${SITE}/prague/prices` },
    ],
  };
}

const PLACEHOLDER = "/images/barcelona/placeholder.webp";
const item = (o: Partial<BcnPlace> & { name: string; slug: string; fullDescription: string; tip: string; practicalInfo: BcnPlace["practicalInfo"] }): BcnPlace => ({
  image: PLACEHOLDER, rating: 4.5, area: "Prague", filterKeys: [], description: "", ...o,
});

const ITEMS: BcnPlace[] = [
  item({
    name: "Daily budget at a glance", slug: "daily-budget",
    tip: "Prague is one of Europe's best-value capitals — you can eat, drink and sightsee well for far less than in the west.",
    practicalInfo: { openingHours: "Per person, per day", price: "Budget ~1,300 Kč · Mid ~3,000 Kč · Luxury 7,000 Kč+", howToGetThere: "Excludes flights; two sharing a room lowers the mid-range figure" },
    fullDescription: "Prague is one of the most affordable capital cities in Europe, and your money stretches noticeably further here than in Paris, London or Amsterdam. On a shoestring budget of around 1,000–1,500 Kč (roughly $45–65) a day you can stay in a hostel dorm or budget room, eat in pubs and food halls, drink famously cheap beer and travel on a day transport pass, with a paid sight or two thrown in. A comfortable mid-range budget of about 2,500–3,500 Kč ($110–150) covers a good three or four-star hotel, sit-down restaurant dinners with wine or beer, taxis when convenient and daily attractions including the castle. At the luxury end, from around 7,000 Kč ($300) a day, you're into five-star hotels, fine dining and private tours with no compromises. These are per-person, per-day estimates excluding flights, and couples sharing a room bring the accommodation cost per head right down. Because so many of Prague's pleasures — walking the Old Town, crossing Charles Bridge, exploring the castle grounds, riding scenic trams — are free or nearly so, even a modest budget goes a long way here.",
  }),
  item({
    name: "Beer & drink prices", slug: "beer-drinks",
    tip: "Beer is often cheaper than water — and a half-litre of world-class pilsner rarely tops 60 Kč in a local pub.",
    practicalInfo: { openingHours: "Typical local prices", price: "Half-litre beer 40–65 Kč; wine 60–90 Kč; coffee 60–90 Kč", howToGetThere: "Cheaper in local pubs; dearer on Old Town Square terraces" },
    fullDescription: "Prague is legendary for cheap, superb beer, and it's the single clearest example of how good value the city is. In an ordinary local pub, a half-litre (0.5 l) of excellent Czech lager such as Pilsner Urquell, Kozel or Staropramen typically costs just 40–65 Kč — often less than a bottle of water — and the Czechs are, per head, the biggest beer drinkers in the world. Prices climb on the tourist-trap terraces right on the Old Town Square or beside Charles Bridge, where you might pay 80–120 Kč, so walk a couple of streets back for the local rate. A glass of Moravian wine runs around 60–90 Kč, a shot of the herbal liqueur Becherovka about 50–70 Kč, and a cocktail in a good bar 180–290 Kč. Coffee in a café is 60–90 Kč, a soft drink 40–60 Kč. Tap water is safe to drink but restaurants rarely serve it free, so ordering beer is genuinely the cheapest and most authentic option. Tipping is customary at around 10 percent, usually by rounding up and telling the server the total as you pay. For drinkers, Prague is close to unbeatable value in Europe.",
  }),
  item({
    name: "Food & eating out", slug: "food-costs",
    tip: "Look for the weekday 'polední menu' (lunch special) — two courses for around 150–200 Kč at proper restaurants.",
    practicalInfo: { openingHours: "Typical meal prices", price: "Pub main 180–320 Kč; lunch menu ~150–200 Kč; mid dinner 400–600 Kč", howToGetThere: "Best value away from the Old Town core; food halls for variety" },
    fullDescription: "Eating out in Prague is affordable if you follow the locals away from the most touristy streets. In a traditional pub (hospoda), a hearty main such as goulash, svíčková, roast pork or schnitzel with dumplings costs around 180–320 Kč, and portions are generous. The best-value trick is the weekday 'polední menu' (lunch special) offered by many restaurants, typically a soup and a main course for just 150–220 Kč — a superb deal even at smart places. A casual dinner for two with a couple of beers might run 700–1,000 Kč, while a mid-range restaurant dinner with wine sits around 400–600 Kč per person. Street food and food halls fill the gap for quick, cheap bites: a klobása sausage or a langoš from a stand is 80–150 Kč, and Manifesto-style markets offer global dishes for 150–350 Kč. At the top end, Prague's Michelin-starred tasting menus (Field, La Degustation) cost around 2,900–3,900 Kč — expensive locally but a relative bargain against equivalents in Western capitals. Supermarkets (Billa, Albert, Lidl) are very cheap for self-catering and picnic supplies. Overall, you can eat extremely well here on a modest budget, especially at lunchtime.",
  }),
  item({
    name: "Attraction & sightseeing costs", slug: "attraction-costs",
    tip: "The castle grounds, Charles Bridge and the Old Town are free — save your koruna for the interiors that count.",
    practicalInfo: { openingHours: "Typical entry fees", price: "Castle circuit ~450 Kč; most museums 200–350 Kč; many sights free", howToGetThere: "Buy castle & big-ticket sights online to skip queues" },
    fullDescription: "A great deal of Prague's appeal costs nothing: wandering the Old Town, crossing Charles Bridge, exploring the castle courtyards and gardens, climbing Petřín or Vyšehrad and admiring the Astronomical Clock's hourly show are all free. When you do pay, entry fees are moderate by European standards. The Prague Castle circuit ticket (covering St Vitus Cathedral interior, the Old Royal Palace, St George's Basilica and Golden Lane) is around 450 Kč. Most museums and galleries cost 200–350 Kč — the National Museum about 290 Kč, the Mucha Museum 290 Kč, the Jewish Museum's combined ticket around 600 Kč. Tower climbs (the Old Town Hall, the bridge towers, Petřín) run 150–300 Kč, and the Klementinum library tour is about 300 Kč. A one-hour Vltava river cruise costs roughly 300–450 Kč. If you plan to pack in many paid sights, the Prague Visitor Pass (from around 1,600 Kč for two days) bundles entry to dozens of attractions plus public transport and can save money for busy sightseers. Otherwise, simply prioritise the interiors you most want to see, book the castle and popular tours online to skip queues, and enjoy how much of the city is gloriously free.",
  }),
  item({
    name: "Hotel prices by season", slug: "hotel-costs",
    tip: "Rates spike during the Christmas markets and New Year — visit in January, February or November for the lowest prices.",
    practicalInfo: { openingHours: "Per double room, per night", price: "Budget 1,200–2,000 Kč · Mid 2,500–4,500 Kč · Luxury 6,000 Kč+", howToGetThere: "Cheapest in deep winter (ex-holidays) and early spring" },
    fullDescription: "Accommodation is usually the biggest single cost of a Prague trip, but it remains cheaper than most Western European capitals. Budget doubles and good hostels' private rooms start around 1,200–2,000 Kč a night, comfortable three and four-star hotels run roughly 2,500–4,500 Kč, and five-star and design hotels start from about 6,000 Kč and climb well beyond for the riverside landmarks. Location matters: staying in the Old Town, Malá Strana or the Jewish Quarter puts everything on your doorstep but commands a premium, while the leafy Vinohrady district or areas one metro stop out offer better value and a more local feel for only a short ride more. Prices swing with the season. They're highest around the Christmas markets and New Year, over Easter, and during major trade fairs and festivals, when the city can sell out; they're lowest in deep winter outside the holidays (January to early March) and in November. Late spring and early autumn are the sweet spot for pleasant weather at reasonable rates. A small city accommodation fee of around 50 Kč per person per night is added at most hotels. Booking six to eight weeks ahead in shoulder season secures the best combination of price and choice.",
  }),
];

export default function PraguePrices() {
  return (
    <CityGuideShell
      citySlug="prague"
      cityName="Prague"
      categories={PRAGUE_CATEGORIES}
      active="prices"
      crumb="Prices"
      h1="How Much Does Prague Cost?"
      heroImage="/images/prague/nattliv/prague-beer-museum.webp"
      intro="Prague is one of Europe's great-value city breaks — a beautiful capital where beer is cheaper than water, a hearty meal costs a few hundred koruna and much of the sightseeing is free. Here's a realistic breakdown of what a day costs at every level, plus typical prices in Czech koruna (Kč) for beer, food, transport, attractions and hotels, so you can plan your budget with confidence."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Prague costs, category by category" items={ITEMS} />
    </CityGuideShell>
  );
}
