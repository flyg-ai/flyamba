import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/lisbon-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Lisbon Travel Costs 2026 — Budget Guide | Flyamba",
  description:
    "How much does Lisbon cost? Daily budgets for backpackers, mid-range and luxury travellers, plus real prices in euros for food, drink, transport, attractions and hotels.",
  alternates: { canonical: `${SITE}/lisbon/prices` },
  openGraph: { title: "How Much Does Lisbon Cost? | Flyamba", description: "Daily budgets and real prices for a Lisbon trip.", type: "article" },
};

const PRICES: BcnPlace[] = [
  {
    name: "Daily Budgets at a Glance", slug: "daily-budgets", image: "/images/lisbon/sevardheter/praa-do-comrcio.webp",
    rating: 4.5, area: "Per person, per day", filterKeys: [],
    tip: "Two people sharing a room brings the mid-range figure down noticeably — accommodation is the biggest single cost.",
    description: "What a day in Lisbon costs at three levels, from backpacker to luxury, excluding flights.",
    practicalInfo: { openingHours: "Per person, per day", price: "Budget ~$60–90 · Mid-range ~$140–200 · Luxury ~$350+", howToGetThere: "Figures exclude international flights" },
    fullDescription: "Lisbon remains one of Western Europe's best-value capital cities — noticeably cheaper than Paris, London or Amsterdam — though prices have climbed in recent years as the city's popularity has soared. As a rough per-person, per-day guide excluding flights: a budget traveller staying in hostel dorms, eating at local tascas and markets, and using public transport can get by on around $60–90 a day. A mid-range visitor in a comfortable 3–4 star hotel or good apartment, eating out at proper restaurants with wine, taking the odd taxi and paying for daily attractions, should budget roughly $140–200 a day. At the luxury end — a five-star or design hotel, fine dining, private tours and taxis everywhere — you'll spend $350 a day and up, easily more in peak season. Couples sharing a room bring the mid-range figure down considerably, since accommodation is the single biggest expense. Compared with other European city breaks, your money simply goes further here: a good dinner, a cross-city Metro ride and a museum entry all cost less than you'd expect, which is a big part of Lisbon's enduring appeal.",
  },
  {
    name: "Food & Drink Prices", slug: "food-drink", image: "/images/lisbon/restauranger/manteigaria.webp",
    rating: 4.6, area: "Eating out", filterKeys: [],
    tip: "The prato do dia (daily lunch special) at a neighbourhood tasca is the best-value meal in the city.",
    description: "Real prices for coffee, pastries, the daily lunch special, dinner and drinks in Lisbon.",
    practicalInfo: { openingHours: "Lunch ~12:00–15:00; dinner from ~19:30", price: "Coffee €0.90; pastel de nata €1.30; prato do dia €8–13; dinner €18–30", howToGetThere: "Eat a street or two back from the main squares for local prices" },
    fullDescription: "Eating and drinking is where Lisbon really rewards the traveller, especially if you follow the locals. A bica (espresso) costs as little as €0.90 at the counter, a pastel de nata around €1.20–1.40, and a galão (milky coffee) €1.50–2. Lunch is the great value meal: the prato do dia or menu do dia — a daily special of a main course, often with soup, a drink and sometimes coffee — runs just €8–13 at neighbourhood tascas. Petiscos (Portuguese small plates) are €4–9 each to share, a bottle of house wine can be €8–15 in a restaurant, and a small draught beer (imperial) or glass of wine is €1.50–3. A relaxed dinner for one at a mid-range restaurant with wine typically lands around €18–30, while the tourist-trap terraces on the main squares and Rua Augusta charge noticeably more for less. Fresh grilled fish and seafood, the city's speciality, can be pricier — sometimes sold by weight — but is worth it. Supermarket picnics, bakeries and the many markets keep costs down further. The golden rule is simple: walk a street or two away from the obvious tourist spots and both prices and quality improve.",
  },
  {
    name: "Transport & Getting Around", slug: "transport-costs", image: "/images/lisbon/sevardheter/tram-28.webp",
    rating: 4.5, area: "City transport", filterKeys: [],
    tip: "A 24-hour Navegante ticket (€6.80) pays for itself in three or four rides — buy one on a busy sightseeing day.",
    description: "Transport is cheap in Lisbon — here's what Metro, trams, trains and taxis actually cost.",
    practicalInfo: { openingHours: "Metro 06:30–01:00", price: "Metro/tram €1.85 with card; 24h €6.80; taxi ~€6–10; airport ~€12–18", howToGetThere: "Buy a €0.50 Navegante card at any Metro machine and top it up" },
    fullDescription: "Public transport in Lisbon is inexpensive and covers almost everything you'll need. With a rechargeable Navegante card (a one-off €0.50), a single ride on the Metro, tram, bus or funicular is €1.85, versus higher fares if you pay onboard, and a 24-hour unlimited pass across all of them is just €6.80 — a bargain on a busy day of sightseeing. The scenic CP trains out to Cascais or Sintra cost only about €2.40 each way, making those day trips remarkably cheap. Taxis and ride-hailing (Uber, Bolt) are affordable too: a short hop across the centre is roughly €6–10, and the airport to the centre around €12–18. Because the historic core is so compact and walkable, many visitors barely spend anything on transport beyond the odd tram ride and a day trip or two. The famous tram 28 and the funiculars are covered by the same tickets, so there's no need to pay tourist-priced fares separately. All told, budget just a few euros a day for getting around the city itself, plus a handful more for any excursions to the coast or Sintra — one of the lowest transport costs of any major European capital.",
  },
  {
    name: "Attractions & Sightseeing", slug: "attraction-costs", image: "/images/lisbon/sevardheter/jernimos-klostret-mosteiro-dos-jernimos.webp",
    rating: 4.4, area: "Entry fees", filterKeys: [],
    tip: "Many museums are free on the first Sunday of the month, and the Lisboa Card can pay off if you visit several sights.",
    description: "Typical entry prices for Lisbon's top sights, plus how to see plenty for free.",
    practicalInfo: { openingHours: "Most sights ~10:00–18:00", price: "Jerónimos €12; Belém Tower €8; Oceanário €25; São Jorge Castle €15; miradouros free", howToGetThere: "Lisboa Card bundles transport + free/discounted entry" },
    fullDescription: "Lisbon's attractions are moderately priced, and a lot of the city's best experiences cost nothing at all. Among the paid highlights: the Jerónimos Monastery cloister is €12, Belém Tower €8, São Jorge Castle €15, the National Tile Museum €8, the Gulbenkian €10, and the top family draw, the Oceanário, €25 (€17 for children). Crucially, many state-run museums and monuments — including Jerónimos, Belém Tower and the Tile Museum — are free on the first Sunday of every month, and several offer reduced rates for children, students and seniors. Better still, some of Lisbon's most memorable sights are permanently free: wandering the medieval Alfama, riding up to the miradouro viewpoints for their spectacular panoramas, exploring the Baixa's grand squares, browsing the Feira da Ladra flea market and strolling Belém's riverfront cost nothing. For those planning to pack in several paid attractions, the Lisboa Card (available for 24, 48 or 72 hours) bundles unlimited public transport with free or discounted entry to many sights and can work out cheaper than paying individually — do the maths against your planned itinerary. Overall, a couple of paid attractions a day, mixed with the city's abundant free sights, keeps sightseeing costs very reasonable.",
  },
  {
    name: "Hotels & Tourist Tax", slug: "accommodation-costs", image: "/images/lisbon/hotell/memmo-alfama.webp",
    rating: 4.3, area: "Where to stay", filterKeys: [],
    tip: "Book 6–8 weeks ahead in shoulder season for the best rates, and remember the small nightly city tax paid at checkout.",
    description: "What a bed costs in Lisbon across the seasons, from hostel dorms to palace hotels, plus the city tax.",
    practicalInfo: { openingHours: "Check-in typically 15:00", price: "Hostel dorm from ~€25; mid-range double €100–200; luxury €350+; city tax ~€4/night", howToGetThere: "Rates lowest Nov–Feb; highest Jun–Sep and during Web Summit" },
    fullDescription: "Accommodation is the biggest single cost of a Lisbon trip and the one that varies most by season. At the budget end, a hostel dorm bed starts around €25 a night, with private hostel or guesthouse rooms from roughly €60–90. Comfortable mid-range hotels and well-located apartments generally run €100–200 for a double, while boutique and four-star places sit at the upper end of that, and five-star or design hotels start around €350 and climb steeply. Rates are lowest in the quieter winter months (November to February, outside Christmas and New Year) and peak in summer (June to September) and during major events — the Web Summit tech conference in November reliably sells the city out and sends prices soaring, so avoid or book far ahead for those dates. On top of the room rate, Lisbon charges a modest municipal tourist tax of around €4 per person per night (for adults, capped at a set number of nights), usually payable in cash or card at check-out and not always included in the online price. Booking six to eight weeks in advance, especially in the shoulder seasons of spring and autumn, secures the best value — and pairing a cheap flight with a shoulder-season room is the single biggest way to cut the overall cost of a Lisbon break.",
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Lisbon", item: `${SITE}/lisbon` },
      { "@type": "ListItem", position: 3, name: "Prices", item: `${SITE}/lisbon/prices` },
    ],
  };
}

export default function LisbonPrices() {
  return (
    <CityGuideShell
      citySlug="lisbon"
      cityName="Lisbon"
      categories={CATEGORIES}
      active="prices"
      crumb="Prices"
      h1="How Much Does Lisbon Cost?"
      heroImage="/images/lisbon/sevardheter/praa-do-comrcio.webp"
      intro="Lisbon is one of the best-value capitals in Western Europe — cheaper than Paris, London or Amsterdam, with affordable food, dirt-cheap transport and plenty of free sights. Prices have risen with the city's popularity, but a trip here still stretches your money further than most. Here's a realistic breakdown of what a day costs at every level, plus real euro prices for food, transport, attractions and hotels so you can plan your budget with confidence."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Lisbon travel costs in detail" items={PRICES} />
    </CityGuideShell>
  );
}
