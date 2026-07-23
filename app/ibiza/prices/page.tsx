import type { Metadata } from "next";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { IBIZA_CATEGORIES } from "@/app/data/ibiza-places";
import { SITE } from "@/app/lib/destination-helpers";

const HERO = "/images/destinations/flights-ibiza.avif";
const PH = "/images/barcelona/placeholder.webp";

export const metadata: Metadata = {
  title: "Prices in Ibiza 2026 — Costs & Budget Guide | Flyamba",
  description:
    "How much does Ibiza cost? A budget guide to daily spending — accommodation, food and drink, club entry, transport and beach clubs — and how to visit the White Isle for less.",
  alternates: { canonical: `${SITE}/ibiza/prices` },
  openGraph: { title: "Ibiza Prices & Daily Budget | Flyamba", description: "What things cost in Ibiza, from club entry to beach-club lunches, and how to save.", type: "article", images: [HERO] },
};

const PRICES: BcnPlace[] = [
  {
    name: "Daily budget overview", slug: "daily-budget", image: PH,
    rating: 4.2, area: "Island-wide", filterKeys: [],
    tip: "Ibiza can be done on a backpacker budget or a billionaire's — where you eat, drink and sleep makes all the difference.",
    description: "A rough guide to daily spending in Ibiza, from budget to luxury, in the pricey summer season.",
    practicalInfo: { openingHours: "Peak season June–September", price: "Budget ~€90/day; mid-range ~€200/day; luxury €500+/day", howToGetThere: "Costs are highest in July–August" },
    fullDescription: "Ibiza has a reputation as an expensive destination, and in high summer it can absolutely live up to it — but it is also more flexible than the headlines suggest. As a rough per-person daily guide in the peak June-to-September season: a careful budget traveller staying in a hostal, self-catering or eating cheaply and skipping the big clubs might manage on around €80–100 a day; a comfortable mid-range trip with a decent hotel, restaurant meals, a few beach-bar drinks and the odd excursion runs closer to €180–250 a day; and once you add superclub nights, beach-club lunches and taxis, a luxury Ibiza easily tops €500 a day per person. The single biggest variables are nightlife and beach clubs, which can dwarf every other cost, followed by accommodation, which spikes dramatically in July and August. Prices soften noticeably in the May and late-September shoulder months. Travelling out of the absolute peak, self-catering some meals, using the bus and Discobus, and being selective about which one or two clubs you splurge on are the keys to enjoying Ibiza without the eye-watering bill. Set a nightlife budget before you go.",
  },
  {
    name: "Accommodation costs", slug: "accommodation-costs", image: PH,
    rating: 4.1, area: "Island-wide", filterKeys: [],
    tip: "Book months ahead for summer — prices climb steeply and the best-value places sell out first.",
    description: "What you'll pay to sleep in Ibiza, from hostals to five-star resorts, and how much summer inflates it.",
    practicalInfo: { openingHours: "Peak July–August", price: "Hostal from ~€90; mid hotel €150–300; luxury €400–1,000+/night", howToGetThere: "Cheaper in May, June and late September" },
    fullDescription: "Accommodation is one of the biggest costs of an Ibiza trip and the one that swings most wildly by season. In the peak of July and August, even modest hostals and simple guesthouses can charge €90–150 a night, mid-range three- and four-star hotels commonly run €150–300, and the island's celebrated luxury resorts — Six Senses, Nobu, Aguas de Ibiza and the like — comfortably reach €400 to well over €1,000 a night. Location adds a premium: staying in Ibiza Town, Playa d'en Bossa or right on a fashionable beach costs more than the quieter north or inland countryside. The good news is that prices fall substantially outside the absolute peak — May, June and late September can be a third cheaper or more, for the same warm weather — and villas or apartments shared between a group can bring the per-person cost right down while adding a pool and self-catering. Whatever your budget, book early: Ibiza's best-value places are snapped up months in advance for summer. Consider basing yourself slightly away from the priciest hotspots and travelling in a day, and weigh a self-catered villa against a hotel if you are in a group.",
  },
  {
    name: "Food & drink costs", slug: "food-drink-costs", image: PH,
    rating: 4.1, area: "Island-wide", filterKeys: [],
    tip: "Eat where the locals do inland and in the towns; beach clubs and the marina carry a heavy scene premium.",
    description: "From cheap village menús to €30 beach-club cocktails — the wide range of what eating and drinking costs.",
    practicalInfo: { openingHours: "Year-round; higher in summer", price: "Menú del día ~€15; casual dinner €25–40; beach-club lunch €60–120+", howToGetThere: "Cheapest in town/village restaurants" },
    fullDescription: "Eating and drinking in Ibiza spans an enormous range, and where you choose to do it matters far more than in most destinations. At the affordable end, a weekday 'menú del día' (a set two- or three-course lunch with a drink) at a town or village restaurant can still be found for around €15, a coffee is €2–3, a caña (small beer) €3–4, and a casual dinner of tapas or a pizza runs €20–35 a head. Step into the scene, though, and the numbers transform: a cocktail at a fashionable bar or beach club is €15–20, a lunch of fresh fish at a chic cala restaurant like Casa Jondal is priced by weight and easily reaches €60–120 per person, and the island's Michelin tasting menus start around €140. Bottled water and soft drinks at clubs are notoriously pricey. To eat well without overspending, seek out the local restaurants inland and in the backstreets of the towns, self-cater some breakfasts and lunches if you have a kitchen, and treat one or two beach-club or fine-dining meals as deliberate splurges rather than the daily norm. The scene premium is real, but so is genuinely good, affordable food if you look for it.",
  },
  {
    name: "Nightlife & beach-club costs", slug: "nightlife-costs", image: PH,
    rating: 4.0, area: "Clubs & beaches", filterKeys: [],
    tip: "Buy club tickets online in advance to save on the door, and set a hard limit — a big night out adds up fast.",
    description: "Club entry, drinks and beach-club spend — the costs that can define an Ibiza budget.",
    practicalInfo: { openingHours: "Summer club season", price: "Club entry €20–90; club drinks €15–20; beach-club beds/min-spend €25–100+", howToGetThere: "Cheaper: Sant Antoni clubs & DC-10" },
    fullDescription: "Nightlife is what many come to Ibiza for, and it is also where budgets can spiral fastest. Entry to the big-name superclubs — Pacha, Amnesia, Hï, Ushuaïa — typically runs from €40 up to €80 or more for headline nights, though buying tickets online in advance usually undercuts the door price. Once inside, drinks are steep: €15–20 for a cocktail and famously high prices even for water, so a single big night out can easily cost €100–150 per person all in. Beach clubs add another layer, with sunbed hire or a minimum spend of anywhere from €25 to well over €100 at the glossiest coves like Cala Jondal. It is not all extortionate, however: Sant Antoni's clubs such as Eden and Es Paradis, and the underground DC-10, charge noticeably less, and free or cheap pleasures — the Sant Antoni sunset strip, Benirràs drumming, the hippy markets — cost little or nothing. The smart approach is to decide in advance which one or two clubs are worth the splurge, buy those tickets early online, use the cheap Discobus home, and balance the big nights with the island's many low-cost highlights. Set a firm nightlife budget before you arrive.",
  },
  {
    name: "Transport & getting-around costs", slug: "transport-costs", image: PH,
    rating: 4.1, area: "Island-wide", filterKeys: [],
    tip: "The bus and Discobus are cheap; taxis and peak-season car hire are where transport costs add up.",
    description: "What it costs to move around Ibiza — buses, taxis, car and scooter hire, and ferries.",
    practicalInfo: { openingHours: "Buses reduced in winter", price: "Bus €2–4; Discobus €3–4; taxi Ibiza Town–Sant Antoni ~€35; car from €35/day", howToGetThere: "Ferries to Formentera €25–45 return" },
    fullDescription: "Transport costs in Ibiza range from very cheap to a notable line in the budget, depending on how you get around. Public buses are a bargain at €2–4 a journey, and the summer Discobus home from the clubs is similarly cheap at €3–4 — both are the budget traveller's friends. Taxis are metered and reasonable for short hops but add up over a trip: reckon around €20 from the airport to Ibiza Town and €35 or so across to Sant Antoni, with night and luggage supplements, and long queues at peak times. Car hire is the big-ticket transport item, from around €35 a day in the shoulder season but far more (and scarce) in July and August, plus fuel and the occasional paid beach parking; scooters are cheaper at €25–40 a day. Ferries to Formentera cost roughly €25–45 return, with local summer beach boats €10–20. To keep transport spending down, base yourself somewhere walkable to some of what you want, use buses and the Discobus, and hire a car only for the days you plan to explore rather than the whole stay. Booking car hire early for summer is essential both for price and availability.",
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Ibiza", item: `${SITE}/ibiza` },
      { "@type": "ListItem", position: 3, name: "Prices", item: `${SITE}/ibiza/prices` },
    ],
  };
}

export default function IbizaPrices() {
  return (
    <CityGuideShell
      citySlug="ibiza"
      cityName="Ibiza"
      categories={IBIZA_CATEGORIES}
      active="prices"
      crumb="Prices"
      h1="Ibiza Prices & Daily Budget"
      heroImage={HERO}
      intro="Ibiza has a reputation for being expensive, and in the July–August peak it can be — but it is also far more flexible than the headlines suggest. From backpacker to billionaire, what you actually spend depends overwhelmingly on where you sleep, eat, drink and party. This guide breaks down realistic daily budgets and the real costs of accommodation, food and drink, nightlife, beach clubs and transport, plus how to enjoy the White Isle for a lot less."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="What things cost in Ibiza — in detail" items={PRICES} />
    </CityGuideShell>
  );
}
