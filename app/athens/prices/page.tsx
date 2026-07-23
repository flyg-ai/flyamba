import type { Metadata } from "next";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { CATEGORIES } from "@/app/data/athens-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Athens Travel Costs 2026 — Budget Guide | Flyamba",
  description:
    "How much does Athens cost? Daily budgets for budget, mid-range and luxury travellers, plus real prices in euros for food and drink, transport, attraction entry and hotels — one of Europe's best-value capitals.",
  alternates: { canonical: `${SITE}/athens/prices` },
  openGraph: { title: "How Much Does Athens Cost? | Flyamba", description: "Daily budgets and real prices for Athens in euros.", type: "article" },
};

const PLACEHOLDER = "/images/barcelona/placeholder.webp";

const ITEMS: BcnPlace[] = [
  {
    name: "Budget travel — from ~€55–80/day", slug: "budget-day", image: PLACEHOLDER,
    rating: 4.5, area: "Backpacker / value", filterKeys: [],
    tip: "Souvlaki, market tavernas and the €1.20 metro ticket mean you can eat and travel well on very little in Athens.",
    description: "What a lean but comfortable day in Athens costs, staying in hostels and eating like a local.",
    practicalInfo: { openingHours: "Per person, per day (excl. flights)", price: "~€55–80/day", howToGetThere: "Hostel dorm, street food, public transport, a paid sight or two" },
    fullDescription: "Athens is one of the most affordable capital cities in Western Europe, and budget travellers can have a rich experience for very little. Reckon on roughly €55–80 per person per day. A hostel dorm bed runs about €20–30, and the city's incredible street food keeps eating costs down: a charcoal souvlaki or gyros wrap costs €3–4, a spinach pie from a bakery a couple of euros, and a hearty lunch at a no-frills market taverna €8–12. Public transport is a bargain at €1.20 for a 90-minute ticket or €4.10 for a whole day, and the historic centre is compact enough to explore on foot. The single Acropolis ticket is €20 (or €30 for the combined pass covering seven sites), but many other attractions are cheaper or free, and there are free-admission days. Add a frappé in a café, a beach trip by tram and the odd beer, and you're still well within budget. Travelling in the shoulder or winter seasons, sharing a room and prioritising which paid sites you visit stretches the money even further — Athens genuinely rewards the value-conscious.",
  },
  {
    name: "Mid-range travel — from ~€120–180/day", slug: "midrange-day", image: PLACEHOLDER,
    rating: 4.6, area: "Comfortable", filterKeys: [],
    tip: "Two sharing a mid-range hotel room brings the per-person daily figure down noticeably — factor that in.",
    description: "A comfortable day with a 3–4-star hotel, taverna dinners with wine and daily sights.",
    practicalInfo: { openingHours: "Per person, per day (excl. flights)", price: "~€120–180/day", howToGetThere: "3–4★ hotel, sit-down meals, taxis when handy, entry to the big sites" },
    fullDescription: "For a comfortable mid-range trip, budget around €120–180 per person per day, less if two of you share a room. A good 3- or 4-star hotel or a nice apartment in a central neighbourhood runs roughly €90–160 a night for a double (so €45–80 each), and this is where Athens shines against pricier European capitals. Eating well is easy and affordable: a relaxed dinner of meze and grilled dishes with house wine at a proper taverna costs €20–35 a head, a modern-Greek bistro meal a little more, and lunches can stay cheap with market food or a souvlaki. Factor in entry to the headline sights (the €30 combined Acropolis ticket is the smart buy if you'll see several ancient sites), the occasional taxi or ride-hail across town, a day trip to the coast or a nearby site, and drinks in a rooftop or cocktail bar (€9–14). This level lets you experience the best of the city — the great museums, memorable meals and a beach day or excursion — without watching every euro, while still benefiting from Athens' generally low prices for food, transport and culture compared with London, Paris or Rome.",
  },
  {
    name: "Luxury travel — from ~€300+/day", slug: "luxury-day", image: PLACEHOLDER,
    rating: 4.6, area: "High-end", filterKeys: [],
    tip: "Book an Acropolis-view suite and a Michelin dinner and Athens still costs less than the equivalent in Paris or Rome.",
    description: "A high-end day of five-star hotels, fine dining, private tours and no compromises.",
    practicalInfo: { openingHours: "Per person, per day (excl. flights)", price: "~€300+/day", howToGetThere: "5★ or design hotel, Michelin dining, private guides and transfers" },
    fullDescription: "At the top end, Athens offers real luxury at prices that still undercut many Western European capitals — from around €300 per person per day and rising as far as you like. A landmark five-star such as the Hotel Grande Bretagne or an Acropolis-view suite at the Electra Metropolis runs from roughly €250 to €450-plus a night, with the city's best rooftop pools and panoramas thrown in. Dining reaches genuine world-class heights: a tasting menu at two-Michelin-starred Spondi is around €130–160 a head before wine, and there's a growing roster of ambitious modern-Greek and seafood restaurants for special nights out. Add private guided tours of the Acropolis and Delphi, chauffeured airport transfers, a day charter to the Saronic islands, a spa afternoon and cocktails at the smartest bars, and you have a lavish trip. Yet even here the value proposition holds: five-star rooms, Michelin dinners and private guides typically cost noticeably less in Athens than the equivalent experience in London, Paris or Rome. Prices peak in high summer and around major events, so booking the best suites and tables well ahead secures both availability and better rates for a top-tier Athenian escape.",
  },
  {
    name: "Food & drink prices", slug: "food-prices", image: PLACEHOLDER,
    rating: 4.6, area: "Eating out", filterKeys: [],
    tip: "The Greek 'frappé' or freddo espresso is the local ritual — nurse one for an hour at a café for a few euros.",
    description: "Typical real-world prices for meals, snacks, coffee and drinks in Athens.",
    practicalInfo: { openingHours: "Approximate 2026 prices", price: "Souvlaki €3–4 · taverna dinner €18–30 · coffee €2.50–4", howToGetThere: "Cheapest at bakeries, street grills and market tavernas" },
    fullDescription: "Eating and drinking is where Athens delivers outstanding value. Street food is the budget hero: a souvlaki or gyros wrap costs just €3–4, a cheese or spinach pie (tiropita/spanakopita) from a bakery €1.50–2.50, and a slice of bougatsa custard pastry a couple of euros. A coffee — the iced frappé and freddo espresso are the local obsessions — runs €2.50–4 and buys you a table for as long as you like. Sit-down meals stay reasonable: a filling lunch or a spread of meze at a traditional taverna is around €12–20 per person, while a fuller dinner with grilled dishes, salads and house wine typically lands at €18–30 a head. House wine by the carafe is cheap (€6–10 for half a litre), a bottle of local beer or a glass of wine in a bar €4–6, and a craft cocktail at one of the city's celebrated bars €10–14. Water is €0.50 from a kiosk. Supermarket and market shopping for a picnic — olives, cheese, tomatoes, fresh bread, fruit — costs very little. Tipping is modest (rounding up or 5–10% for good service). Overall, you can eat superbly in Athens on a small budget, and even fine dining is gentler on the wallet than in most Western capitals.",
  },
  {
    name: "Transport costs", slug: "transport-costs", image: PLACEHOLDER,
    rating: 4.5, area: "Getting around", filterKeys: [],
    tip: "You won't need a car in the city — the €1.20 integrated ticket and cheap taxis cover everything.",
    description: "What it costs to get around Athens and to and from the airport.",
    practicalInfo: { openingHours: "Approximate 2026 prices", price: "Single €1.20 · 24h €4.10 · airport metro €9 · central taxi €5–10", howToGetThere: "Metro, tram, bus and trolleybus on one integrated ticket" },
    fullDescription: "Getting around Athens is cheap. A single integrated ticket covering the metro, tram, bus and trolleybus is just €1.20 and lasts 90 minutes with free transfers, so most journeys need only one. If you're travelling a lot, a 24-hour ticket is €4.10 and a 5-day ticket €8.20 — quickly worthwhile. The airport is the one pricier zone: the direct metro to the centre is a €9 flat fare (with cheaper returns and a €20 tourist ticket that includes it), while the 24-hour X95 express bus to Syntagma is a bargain €5.50. Taxis are inexpensive by European standards — a short central ride is €5–10, and the airport uses a fixed flat fare of about €40 by day and €55 at night — and ride-hailing via FreeNow or Uber gives upfront pricing. Crucially, you won't need or want a car in the city: the centre is walkable, parking is difficult and traffic heavy, so public transport, the odd taxi and your own two feet cover everything. Even reaching the beaches is cheap, since the coastal tram serves the Riviera on the standard €1.20 fare. Only day trips to farther-flung sites (Delphi, the Peloponnese) might justify a hire car, an organised tour or a KTEL coach.",
  },
  {
    name: "Attraction entry fees", slug: "entry-fees", image: PLACEHOLDER,
    rating: 4.5, area: "Sightseeing", filterKeys: [],
    tip: "Buy the €30 combined ticket if you'll see three or more ancient sites — it covers the Acropolis plus six others.",
    description: "Entry prices for the big Athens sights, and how to save on them.",
    practicalInfo: { openingHours: "Approximate 2026 prices (reduced in winter)", price: "Acropolis €20 · combined ticket €30 · most museums €8–15", howToGetThere: "Book timed Acropolis tickets online to skip the queue" },
    fullDescription: "Athens' ancient sites are its biggest sightseeing cost, but they remain reasonable and there are clear ways to save. The headline Acropolis ticket is €20 in summer (half-price, €10, in winter from November to March). If you plan to visit several ancient sites, the combined ticket at €30 is the smart buy: it's valid for five days and covers the Acropolis plus the Ancient Agora, Roman Agora, Kerameikos, the Temple of Olympian Zeus, Hadrian's Library and the Aristotle's Lyceum site — far cheaper than paying for each. Individually, those secondary sites are €8–10 each. Museums are gently priced: the superb Acropolis Museum is €15 (€10 in winter), the National Archaeological Museum €12 (€6 winter), and the Benaki and Byzantine museums around €8–12, with some offering free or discounted evenings. The Panathenaic Stadium is €10 including an audio guide. Money-saving tips: entry to state archaeological sites and museums is free on certain days (often the first Sunday of the month in the low season and some national holidays), EU under-25s and various concessions get in free or reduced, and children are usually free. Book timed Acropolis tickets online in advance to skip long queues, especially in peak summer, and prioritise the combined ticket if antiquity is your focus.",
  },
  {
    name: "Accommodation prices by season", slug: "hotel-prices", image: PLACEHOLDER,
    rating: 4.4, area: "Where to stay", filterKeys: [],
    tip: "Rates are lowest November–March (outside the holidays); pairing a cheap winter flight with a low hotel rate is the biggest saving.",
    description: "What hotels cost across the year, and when to book for the best value.",
    practicalInfo: { openingHours: "Approximate ranges", price: "Hostel dorm €20–30 · 3–4★ double €90–160 · 5★ from €250", howToGetThere: "Best value in shoulder season; book 6–8 weeks ahead" },
    fullDescription: "Accommodation is usually the biggest single cost of an Athens trip, but the city is well-supplied at every level and still good value. Hostel dorm beds run about €20–30 (with stylish options like City Circus offering chic privates from around €70), mid-range 3- and 4-star hotels and good apartments typically €90–160 for a double, and luxury five-stars from €250 upwards, climbing steeply for Acropolis-view rooms and suites. A small nightly tourist/climate tax (a few euros per room, more for higher categories) is payable at checkout. Prices follow demand: they're highest in the peak summer months of June to September and around Greek Orthodox Easter and major events, and lowest from November to March outside the Christmas and New Year holidays, when you can find real bargains. The shoulder seasons of April–May and October offer the sweet spot of pleasant weather and softer rates. Location affects price too — the Acropolis-view streets of Makrygianni and the smart Syntagma area command a premium, while excellent-value options cluster around Psyrri, Koukaki and Metaxourgeio a short walk further out. Booking six to eight weeks ahead in shoulder season, and pairing a cheap flight with a low off-peak room rate, is the single biggest way to cut the cost of an Athens trip.",
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Athens", item: `${SITE}/athens` },
      { "@type": "ListItem", position: 3, name: "Prices", item: `${SITE}/athens/prices` },
    ],
  };
}

export default function AthensPrices() {
  return (
    <CityGuideShell
      citySlug="athens"
      cityName="Athens"
      categories={CATEGORIES}
      active="prices"
      crumb="Prices"
      h1="How Much Does Athens Cost?"
      heroImage="/images/athens/sevardheter/monastiraki.webp"
      intro="Athens is one of the best-value capital cities in Western Europe — cheaper than Rome, Paris or London for food, transport and culture, with street food from a few euros and a €1.20 ticket that covers the whole transport network. Here's a realistic breakdown of what a day costs at every level, plus typical prices in euros for food and drink, getting around, attraction entry and hotels, so you can plan your budget with confidence."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Athens travel costs, broken down" items={ITEMS} />
    </CityGuideShell>
  );
}
