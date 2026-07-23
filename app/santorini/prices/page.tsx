import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { SANTORINI_CATEGORIES } from "@/app/lib/santorini";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Santorini Prices & Budget 2026 — How Much It Costs | Flyamba",
  description:
    "How much does Santorini cost? Daily budgets for backpackers, couples and luxury travellers, plus real-world euro prices for cave hotels, dining, wine, tours and getting around — and how to save.",
  alternates: { canonical: `${SITE}/santorini/prices` },
  openGraph: { title: "Santorini Prices & Budget | Flyamba", description: "Daily budgets and euro price guide for accommodation, food, tours and transport in Santorini.", type: "article" },
};

const IMG = "/images/santorini/sevardheter/oia.webp";

const ITEMS: BcnPlace[] = [
  {
    name: "Daily budget overview", slug: "daily-budget", image: IMG, rating: 4.2, area: "Whole island",
    tip: "Base yourself in Perissa or Kamari instead of Oia and your accommodation and food costs can roughly halve.",
    filterKeys: [],
    description: "What to expect to spend per day in Santorini across budget, mid-range and luxury styles.",
    practicalInfo: { openingHours: "Peak: Jul–Aug; best value: May and Oct", price: "Budget €70–100, mid-range €150–250, luxury €400+ per person/day", howToGetThere: "Costs drop noticeably in the shoulder seasons" },
    fullDescription: "Santorini has a reputation as one of the more expensive Greek islands, and it's largely deserved — but your daily spend varies enormously with your style and, crucially, where you stay. A budget traveller sleeping in a Perissa hostel or guesthouse, eating souvlaki and gyros, using the buses and picking free activities like the Fira–Oia walk can get by on roughly €70–100 a day. A mid-range couple in a comfortable hotel with a pool, eating at tavernas, renting an ATV and doing a boat trip or two should budget somewhere around €150–250 per person per day. At the luxury end — a caldera-edge cave suite in Oia, fine dining, private cruises and transfers — you can easily spend €400 a day and far, far more. The single biggest lever is accommodation: a caldera-view room in Oia or Imerovigli can cost five to ten times a comparable room in the beach resorts. Travelling in the May or October shoulder season rather than peak July–August also cuts accommodation and flight costs substantially while the weather stays fine. Set your budget by choosing your base first, then everything else follows."
  },
  {
    name: "Accommodation & cave hotels", slug: "accommodation-costs", image: IMG, rating: 4.3, area: "By village",
    tip: "For the famous caldera-and-infinity-pool photo without the Oia price tag, look at Imerovigli or Firostefani, which share the view for less.",
    filterKeys: [],
    description: "Room rates swing wildly between the caldera villages and the beach resorts.",
    practicalInfo: { openingHours: "Rates peak Jun–Sep; lowest Apr and late Oct", price: "Hostel dorm €30–50; beach hotel €90–160; Oia cave suite €400–1,500+", howToGetThere: "Oia and Imerovigli command the highest prices; Perissa and Kamari the lowest" },
    fullDescription: "Accommodation is where Santorini budgets are made or broken. The iconic caldera-edge cave suites in Oia and Imerovigli — whitewashed, carved into the cliff, often with a private plunge pool and that sunset view — are among the most expensive rooms in Greece, routinely running €400 to well over €1,000 a night in peak season, and honeymoon flagships climb higher still. Move to Fira and you can find caldera-view hotels for less, though still at a premium. The best value lies in the beach resorts of Kamari, Perissa and Perivolos, where a good hotel with a pool might cost €90–160 a night, and in inland villages away from the view. Budget travellers are well served by a handful of hostels and guesthouses, with dorm beds around €30–50 even in a converted-winery hostel with a pool. Prices are highly seasonal, peaking from June to September and dropping sharply in April and late October. Book months ahead for summer, especially for the sought-after caldera rooms. If the cliffside dream is the priority, consider Imerovigli or Firostefani for a similar view at a lower rate than Oia."
  },
  {
    name: "Eating & drinking", slug: "food-costs", image: IMG, rating: 4.2, area: "Whole island",
    tip: "Eat your big meal at an inland village taverna and save the caldera-view restaurants for a single special sunset dinner.",
    filterKeys: [],
    description: "Food costs range from a few-euro gyros to a serious caldera-view dinner bill.",
    practicalInfo: { openingHours: "Tavernas typically lunch and dinner in season", price: "Gyros €3–5; taverna main €12–20; caldera fine dining €60–120+ pp", howToGetThere: "Inland villages are far cheaper than the caldera and Oia" },
    fullDescription: "Eating in Santorini can be as cheap or as costly as you like. At the budget end, a filling gyros or souvlaki wrap from a spot like Lucky's in Fira or Pitogyros in Oia costs just €3–5, and a bakery breakfast or a Greek salad and dip to share keeps lunches inexpensive. A meal at a normal village taverna — grilled fish or meat, a couple of mezes, house wine — typically runs €12–20 for a main, and inland tavernas away from the caldera offer the best quality-to-price ratio, with locals-favourite spots like Metaxi Mas and Aktaion serving generous, authentic food at fair prices. At the top end, the caldera-view fine-dining restaurants of Oia and the acclaimed Selene charge a serious premium — €60–120 or more per person before drinks — where you're paying partly for the sunset backdrop. Wine is a highlight and a relative bargain: local Assyrtiko is excellent and reasonably priced by the glass or bottle. A coffee costs €3–5, a beach-bar cocktail €10–15. The savvy approach is to mix it up: cheap, tasty street food and honest tavernas most nights, with one blow-out caldera dinner as the memorable splurge."
  },
  {
    name: "Attractions, tours & activities", slug: "activity-costs", image: IMG, rating: 4.2, area: "Whole island",
    tip: "The best experiences — the Oia sunset, the Fira–Oia hike, wandering the villages — are completely free; save the budget for one or two boat trips.",
    filterKeys: [],
    description: "Entry fees are modest, but boat trips and tours are where activity spending adds up.",
    practicalInfo: { openingHours: "Sites daytime; cruises morning, midday and sunset", price: "Akrotiri €12; volcano boat from €25; catamaran cruise €130+; wine tour €90–130", howToGetThere: "Book tours online or through hotels; sites pay on the door" },
    fullDescription: "One of the joys of Santorini is that many of its greatest experiences cost nothing: the world-famous Oia sunset, the spectacular Fira-to-Oia caldera walk, wandering the villages of Pyrgos, Emporio and Megalochori, and photographing the blue-domed churches are all free. Paid attractions are modestly priced — the Akrotiri archaeological site is around €12, Ancient Thera about €6, and the Museum of Prehistoric Thera roughly €6 — so a culture-heavy day costs little. Where spending mounts is on organised activities. The classic volcano and hot springs boat trip starts from around €25 for a basic ticket but rises for guided catamaran versions with food and drink, which run €130 and up. A half-day guided wine tour visiting several wineries with tastings is roughly €90–130. Sunbed and umbrella rental on the organised beaches adds €10–20 a day, and beach clubs on Perivolos carry minimum spends. The wine tastings at caldera wineries like Santo Wines start around €25 for a flight. Budget travellers can enjoy Santorini richly on the free sights alone; most visitors splurge on one or two boat trips or a wine tour as the paid highlights."
  },
  {
    name: "Getting around costs", slug: "transport-costs", image: IMG, rating: 4.0, area: "Whole island",
    tip: "For a few days of freedom, an ATV usually works out cheaper and more flexible than repeated taxis, which are scarce and add up fast.",
    filterKeys: [],
    description: "Buses are cheap; taxis are scarce and pricey; ATVs and cars sit in between.",
    practicalInfo: { openingHours: "Buses roughly 07:00–23:00 in summer", price: "Bus €2–2.50; ATV €25–45/day; car €35–60/day; taxi Fira–Oia €25–30", howToGetThere: "Buses hub at Fira; rentals island-wide" },
    fullDescription: "Transport is a smaller but real part of a Santorini budget, and the cheapest option by far is the KTEL bus, at roughly €2–2.50 a ride, with everything routed through Fira. It's fine for reaching the main beaches and villages if you're not in a hurry. For independence, renting an ATV (€25–45 a day plus fuel) or a small car (€35–60 a day, more in peak) is money well spent over a few days, letting you reach quiet corners and beat the bus timetable — and often working out cheaper than relying on the island's notoriously scarce and comparatively expensive taxis, where a Fira-to-Oia hop runs €25–30 and an airport transfer around €20. Factor in the €6-each-way Fira cable car if you're doing a volcano cruise from the Old Port, and ferry fares if you plan to island-hop. Fuel is inexpensive but stations are inland. For couples and families staying several days, budgeting for a rental vehicle transforms the trip; for short stays or solo budget travellers, a mix of buses and the occasional pre-booked taxi keeps costs down. Whatever you choose, book rental vehicles ahead in July and August when demand peaks."
  },
  {
    name: "Money-saving tips", slug: "saving-tips", image: IMG, rating: 4.4, area: "Whole island",
    tip: "Travel in May, June or October: near-summer weather, warm sea, thinner crowds and prices well below the July–August peak.",
    filterKeys: [],
    description: "Simple ways to enjoy Santorini for far less without missing the highlights.",
    practicalInfo: { openingHours: "Shoulder seasons: late Apr–early Jun and Sep–Oct", price: "Savings of 30–50% on flights and hotels vs peak", howToGetThere: "Applies across accommodation, flights, tours and dining" },
    fullDescription: "Santorini rewards a little strategy. The biggest saving is timing: visit in the shoulder seasons of May, early June, September or October and you'll pay 30–50% less for flights and hotels than in the July–August peak, while enjoying warm days, a swimmable sea and noticeably thinner crowds — many regulars consider these the best months to come. The second big lever is your base: staying in Perissa, Kamari or an inland village rather than caldera-front Oia can slash accommodation and dining costs while the free sunset and caldera walk remain a cheap bus ride away. Eat like a local — gyros and souvlaki for casual meals, inland tavernas for dinners, and reserve one caldera-view restaurant for a single splurge. Lean on the free experiences, which happen to be the island's finest: the Oia sunset, the Fira–Oia hike, village wandering and church-spotting. Rent an ATV rather than leaning on taxis, drink the excellent, well-priced local wine, and buy water and snacks from supermarkets rather than cliffside kiosks. Book flights, ferries and any peak-season accommodation months ahead. With these habits, Santorini's magic is far more affordable than its honeymoon reputation suggests."
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Santorini", item: `${SITE}/santorini` },
      { "@type": "ListItem", position: 3, name: "Prices", item: `${SITE}/santorini/prices` },
    ],
  };
}

export default function SantoriniPrices() {
  return (
    <CityGuideShell
      citySlug="santorini"
      cityName="Santorini"
      categories={SANTORINI_CATEGORIES}
      active="prices"
      crumb="Prices"
      h1="Santorini Prices & Budget Guide"
      heroImage={IMG}
      intro="Santorini has a reputation as a pricey honeymoon island, but what you actually spend depends hugely on when you come and, above all, where you stay. This guide lays out realistic daily budgets for backpackers, couples and luxury travellers, with real euro prices for cave hotels, tavernas, boat trips, wine tours and getting around — plus the simple choices that make the island far more affordable than its image suggests."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Santorini costs in detail" items={ITEMS} />
    </CityGuideShell>
  );
}
