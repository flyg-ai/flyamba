import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { SANTORINI_CATEGORIES } from "@/app/lib/santorini";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Getting Around Santorini 2026 — Buses, ATV & Cable Car | Flyamba",
  description:
    "How to get around Santorini: KTEL buses from Fira, ATV and scooter rental, car hire and parking, the Fira cable car and Old Port, ferries and the airport. Prices in euros and practical tips.",
  alternates: { canonical: `${SITE}/santorini/transport` },
  openGraph: { title: "Getting Around Santorini | Flyamba", description: "Buses, ATVs, cars, the cable car and ferries — how to move around Santorini.", type: "article" },
};

const IMG = "/images/santorini/sevardheter/fira.webp";

const ITEMS: BcnPlace[] = [
  {
    name: "KTEL buses from Fira", slug: "ktel-buses", image: IMG, rating: 4.0, area: "Island-wide",
    tip: "Buy your ticket from the conductor on board with small change, and check the last return time — evening services thin out fast.",
    filterKeys: [],
    description: "Santorini's public bus network radiates from the central hub in Fira.",
    practicalInfo: { openingHours: "Roughly 07:00–23:00 in summer, reduced off-season", price: "About €2–2.50 per journey", howToGetThere: "All routes start and end at the KTEL station in central Fira" },
    fullDescription: "The backbone of public transport on Santorini is the KTEL bus network, and it all revolves around the central bus station in Fira. Almost every route runs to and from Fira rather than directly between villages, so a trip from, say, Oia to Perissa usually means changing in the capital. The main lines connect Fira with Oia, Kamari, Perissa, Perivolos, Akrotiri (for the Red Beach), the airport and the ferry port at Athinios, timed loosely around ferry arrivals. Fares are cheap — roughly a couple of euros per ride, paid in cash to the onboard conductor, so keep small change handy. In peak summer buses can get uncomfortably crowded and you may have to stand or wait for the next one, and services wind down in the evening, so always check the last departure back to your base before heading out for dinner or the sunset. For budget travellers without a vehicle, the buses are perfectly serviceable for reaching the main sights and beaches, if not always the most convenient. Timetables are posted at the Fira station and online, but treat them as approximate."
  },
  {
    name: "ATV & scooter rental", slug: "atv-scooter", image: IMG, rating: 4.1, area: "Fira, Oia, Kamari, Perissa",
    tip: "You legally need the right licence (a car licence is not always enough for larger ATVs); wear closed shoes and go slowly on the loose gravel.",
    filterKeys: [],
    description: "Quad bikes (ATVs) and scooters are the classic, flexible way to explore Santorini.",
    practicalInfo: { openingHours: "Rental shops daily in season, roughly 08:00–20:00", price: "From about €25–45 per day plus fuel", howToGetThere: "Rental agencies cluster in Fira, Oia, Kamari and Perissa" },
    fullDescription: "Renting an ATV (quad bike) or scooter is a Santorini rite of passage and a genuinely practical way to get around a small island where the bus network is limited. Rental shops are everywhere in Fira, Oia, Kamari and Perissa, and prices are reasonable — roughly €25–45 a day for a quad depending on engine size and season, plus fuel. The freedom to reach quiet villages, remote beaches and viewpoints on your own schedule is the big appeal, and quads have become almost a fashion statement on the island. However, take the safety seriously: Santorini's roads are narrow, winding, busy and often surfaced with loose volcanic gravel, and accidents involving inexperienced riders are sadly common. Wear the helmet, wear closed shoes rather than flip-flops, and don't ride after drinking. Note the licensing rules too — many larger ATVs legally require a motorcycle licence, not just a car one, and riding without the correct licence can void your insurance and travel cover. Ride defensively, park carefully in the villages where space is tight, and you'll find an ATV the most fun and flexible option for a few days on the island."
  },
  {
    name: "Car hire, driving & parking", slug: "car-hire", image: IMG, rating: 4.0, area: "Island-wide",
    tip: "Book well ahead in July and August, and be ready to park on the edge of Fira and Oia and walk in — the centres are largely car-free.",
    filterKeys: [],
    description: "A small hire car is the most comfortable way to see the whole island, especially for families.",
    practicalInfo: { openingHours: "Rental desks daily in season; airport pickups available", price: "From about €35–60 per day in shoulder season, more in peak", howToGetThere: "Rental offices at the airport, Fira and the main resorts" },
    fullDescription: "For families, couples wanting comfort, or anyone planning to cover a lot of ground, a small hire car is the most relaxed way to explore Santorini. Cars can be picked up at the airport or in Fira and the resorts, with rates from around €35–60 a day in the shoulder seasons, rising sharply in July and August when demand outstrips the island's limited fleet — so book well in advance for peak dates. Driving itself is straightforward on the whole, though the roads are narrow and twisting, signage can be patchy, and the caldera-rim villages of Fira and Oia are largely pedestrianised, meaning you park on the outskirts and walk in. Parking is the real headache: spaces near the popular sights and villages fill up fast, especially around sunset in Oia, so arrive early or be prepared to walk. Fuel stations are concentrated inland rather than in the cliff villages. An automatic is worth requesting if you're not confident with a manual on the hills. Overall a car trades the fun of a quad for shade, security and space — the smart choice for longer stays and families with young children."
  },
  {
    name: "Fira cable car & the Old Port", slug: "cable-car", image: IMG, rating: 4.2, area: "Fira",
    tip: "Expect long queues when cruise ships are in — go early or late, and take the cable car rather than the donkeys for a kinder trip down.",
    filterKeys: [],
    description: "The cable car links Fira town on the cliff top with the Old Port far below.",
    practicalInfo: { openingHours: "Daily, roughly 07:00–22:00 in season (extended for cruise days)", price: "About €6 each way", howToGetThere: "Upper station on the Fira caldera path; lower station at the Old Port" },
    fullDescription: "The steep cliff between Fira and its Old Port — the departure point for volcano boat trips and some cruise tenders — is bridged by three means: the cable car, the famous donkeys, or walking the 580-odd zigzag steps. The cable car is by far the easiest and most humane option, whisking you up or down in a few minutes for around €6 each way with fine caldera views on the ride. Its main drawback is capacity: when cruise ships anchor in the caldera, hundreds of passengers funnel through at once and queues can stretch to an hour or more in both directions, so time your trip for early morning or later in the evening if you can. The donkey rides that also work the steps are a long-standing tradition but are increasingly discouraged on animal-welfare grounds, and walking down the same path means dodging the donkeys and their mess in the heat. For most visitors the cable car is the sensible choice up and down. If you're heading to the Old Port for a volcano cruise, factor the potential queue into your timing so you don't miss the boat."
  },
  {
    name: "Ferries & the ports", slug: "ferries-ports", image: IMG, rating: 4.0, area: "Athinios & Old Port",
    tip: "Book fast-ferry and island-hopping tickets online well ahead in summer; arrange transfer to Athinios early, as buses and taxis get mobbed at ferry times.",
    filterKeys: [],
    description: "Santorini's main ferry port at Athinios connects the island to Athens and the Cyclades.",
    practicalInfo: { openingHours: "Ferries daily in season; schedules vary by route and month", price: "Piraeus–Santorini from about €40 (slow) to €60+ (fast)", howToGetThere: "Athinios port on the southwest coast, below Fira; buses and taxis meet arrivals" },
    fullDescription: "Ferries are central to a Santorini trip, whether you arrive by sea from Athens or use the island as a base for hopping around the Cyclades. The main commercial port is Athinios, on the southwest coast below Fira — a busy, chaotic terminal where ferries to and from Piraeus (Athens), Crete, Ios, Naxos, Paros, Mykonos and Milos dock. Note this is different from Fira's Old Port, which handles only small boats and cruise tenders. From Piraeus, high-speed catamarans reach Santorini in around five hours and conventional ferries in eight, with fares from roughly €40 to €60-plus depending on speed and class; book online well ahead for summer sailings, which sell out. Athinios has no cable car — a steep switchback road climbs from it, served by KTEL buses timed to ferries (though they get packed) and by taxis, which are scarce at busy times, so pre-arrange a transfer if you can. For island-hopping day trips to Ios, Naxos, Milos or Thirassia, fast ferries make several neighbours easily reachable. Always double-check schedules close to your travel date, as Cycladic ferry times shift with the season and the notorious summer meltemi winds can cause cancellations."
  },
  {
    name: "Taxis on Santorini", slug: "taxis", image: IMG, rating: 3.8, area: "Island-wide",
    tip: "There are very few taxis for the demand — save the driver's number, book ahead for the airport or ferry, and expect surcharges for luggage and late nights.",
    filterKeys: [],
    description: "Santorini has a famously small taxi fleet, so cabs can be hard to find.",
    practicalInfo: { openingHours: "24 hours in theory, but very limited availability at peak times", price: "Fira–Oia roughly €25–30; airport–Fira about €20", howToGetThere: "Taxi rank in central Fira; phone booking recommended" },
    fullDescription: "One quirk that catches many visitors out is just how few taxis operate on Santorini — the island has only a small licensed fleet serving huge summer crowds, so hailing one on the spot is often impossible, especially at the airport, the ferry port, and around Oia at sunset. There is a central taxi rank in Fira, but the smart move is to get a reliable driver's phone number (your hotel can usually recommend one) and book journeys in advance, particularly airport and ferry transfers where timing matters. Fares are metered or fixed by zone and are reasonable enough — expect roughly €20 from the airport to Fira and €25–30 for the longer run from Fira to Oia — but surcharges apply for luggage, late-night trips and multiple passengers, and prices creep up at peak demand. Because supply is so tight, waits of 30 minutes or much longer are common in high season. For predictable timing, pre-booked private transfers are worth the extra cost, while for general getting around, buses, a rental car or an ATV give you far more independence than relying on scarce taxis."
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Santorini", item: `${SITE}/santorini` },
      { "@type": "ListItem", position: 3, name: "Transport", item: `${SITE}/santorini/transport` },
    ],
  };
}

export default function SantoriniTransport() {
  return (
    <CityGuideShell
      citySlug="santorini"
      cityName="Santorini"
      categories={SANTORINI_CATEGORIES}
      active="transport"
      crumb="Transport"
      h1="Getting Around Santorini"
      heroImage={IMG}
      intro="Santorini is small but surprisingly awkward to get around: the bus network funnels everything through Fira, taxis are famously scarce, and the caldera villages are pedestrianised. This guide breaks down every option — KTEL buses, ATVs and scooters, hire cars and parking, the Fira cable car, ferries from Athinios, and the island's tiny taxi fleet — with euro prices and the practical tips that save time and stress."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Getting around Santorini in detail" items={ITEMS} />
    </CityGuideShell>
  );
}
