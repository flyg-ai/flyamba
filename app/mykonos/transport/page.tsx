import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/mykonos-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Getting Around Mykonos 2026 — Buses, Boats & ATVs | Flyamba",
  description:
    "How to get around Mykonos: from the airport, the KTEL bus network, water taxis between beaches, renting a car or ATV, the island's famously scarce taxis…",
  alternates: { canonical: `${SITE}/mykonos/transport` },
  openGraph: { title: "Getting Around Mykonos | Flyamba", description: "Buses, water taxis, ATVs, ferries and airport transfers — the complete transport guide.", type: "article" },
};

const IMG = "/images/mykonos/attractions/little-venice-alefkandra.webp";

const INFO: BcnPlace[] = [
  {
    name: "From Mykonos Airport (JMK) to town", slug: "airport-to-town", image: IMG, rating: 5, area: "JMK · 4 km from Chora",
    tip: "Taxis are few and expensive in season — pre-book a transfer or arrange a hotel pick-up rather than gambling on a cab at the rank.",
    filterKeys: [],
    description: "Mykonos Airport is just 4 km from Chora, but the island's chronic taxi shortage makes a pre-booked transfer the safest bet.",
    practicalInfo: { openingHours: "Flights seasonal; year-round via Athens", price: "Taxi ~€20–30 (often €50–80 in peak season); hotel transfers vary", howToGetThere: "Most hotels offer paid transfers; pre-booked cars and shuttles meet arrivals" },
    fullDescription: "Mykonos Airport (JMK) sits just 4 km southeast of Chora, so the journey into town is short — but getting a ride can be the tricky part. In theory a taxi costs €20–30, but Mykonos has a chronic shortage of taxis (only around thirty on the entire island), and in high season fares are effectively set by demand, often reaching €50–80 or simply being unavailable when flights land in clusters. For that reason, the smartest approach is to arrange transport in advance: most hotels offer a paid airport transfer or private car, and pre-booked shuttles and cars meet arrivals — well worth it to avoid a long, hot wait. If you're renting a car or ATV for your stay, some agencies will deliver it to the airport. Public buses do serve the airport but are limited and awkward with luggage. In summer, direct flights arrive from many European cities; the rest of the year you'll usually connect through Athens, a one-hour domestic hop. Sort your onward transfer before you fly, and the short hop into Chora is painless.",
  },
  {
    name: "The KTEL bus network", slug: "buses", image: IMG, rating: 5, area: "Islandwide",
    tip: "Buses are the cheapest way around — but note there are two stations in Chora: Fabrika (south) for the southern beaches and the Old Port for the north and Ano Mera.",
    filterKeys: [],
    description: "The KTEL bus is the island's cheap, reliable backbone, linking Chora to all the main beaches for €1.80–2.30 a ride.",
    practicalInfo: { openingHours: "Frequent in season, roughly every 20–60 min; reduced off-season", price: "€1.80–2.30 per ride", howToGetThere: "Two Chora stations: Fabrika (south) and the Old Port (north / Ano Mera)" },
    fullDescription: "The KTEL bus network is the backbone of getting around Mykonos and by far the cheapest option — €1.80–2.30 per ride to almost anywhere you'll want to go. Buses run frequently in high season, every 20 to 60 minutes depending on the route, connecting Chora to all the major beaches (Paradise, Platys Gialos, Ornos, Elia, Kalafatis), the airport, the port and the inland village of Ano Mera. The one thing to get right is which station you leave from: Chora has two. The Fabrika station on the southern edge of town serves the popular southern beaches, while the Old Port (Nea Limani) station serves the north of the island and Ano Mera. Buses can get very busy and standing-room-only at peak beach times, so allow extra time and don't count on the last service if you're out late. Timetables are posted at the stations and online, and there are night buses on some routes in summer for the party crowd. For budget-minded visitors, the KTEL bus does the job cheaply and reliably — just plan around the two-station quirk.",
  },
  {
    name: "Water taxis between the beaches", slug: "water-taxis", image: IMG, rating: 5, area: "South coast",
    tip: "From Platys Gialos, small boats run every 30 minutes to Paradise, Super Paradise, Agrari and Elia — often faster and far more pleasant than the bus.",
    filterKeys: [],
    description: "Small water taxis hop between the south-coast beaches from Platys Gialos and the Old Port — a scenic, hassle-free alternative to the bus.",
    practicalInfo: { openingHours: "Daytime, roughly every 30 min in high season", price: "€5–10 per hop depending on distance", howToGetThere: "Main hubs: Platys Gialos and the Old Port in Chora" },
    fullDescription: "One of the most enjoyable ways to get around Mykonos in summer is by water taxi — small boats that shuttle along the sheltered south coast, linking the beaches without the crowded buses or the parking headaches. The main hub is Platys Gialos, from where boats depart roughly every 30 minutes throughout the day in high season, connecting to Paranga, Paradise, Super Paradise, Agrari and Elia; there are also services from the Old Port in Chora. Fares are modest — around €5–10 per hop depending on distance — and the short, scenic crossings are often faster and far more pleasant than waiting for and squeezing onto a bus, especially if you want to sample several beaches in a single day. It's also the easiest way to reach coves like Agrari that have no direct road access. Boats run only in daylight and in the summer season, and can be affected by strong Meltemi winds, so check conditions. For beach-hopping along the south coast, the water taxi is the local's favourite — cheap, breezy and genuinely fun.",
  },
  {
    name: "Renting a car or ATV", slug: "car-atv", image: IMG, rating: 5, area: "Islandwide",
    tip: "An ATV is the classic Mykonos way to reach the wild northern beaches — but the roads are narrow, fast and often barrier-free, so drive slowly and carefully.",
    filterKeys: [],
    description: "A rental car or ATV gives you the freedom to reach the wild, bus-free corners of the island — but Mykonos's roads demand real caution.",
    practicalInfo: { openingHours: "Rental agencies daytime; some airport delivery", price: "Car ~€50–80/day; ATV/quad ~€30–50/day", howToGetThere: "Agencies in Chora, at the airport and in the main resorts" },
    fullDescription: "For real freedom on Mykonos — especially to reach the remote northern beaches like Fokos, Agios Sostis and the Armenistis lighthouse that buses don't serve — renting your own wheels is the answer. A small car costs around €50–80 a day in high season, while the quintessentially Mykonian ATV (quad bike) runs €30–50 a day and is enormously popular. Both let you explore the island at your own pace and escape the crowded beach circuit. But a serious word of caution: Mykonos's roads are famously narrow, winding, sometimes unpaved and frequently without barriers, and the island sees a high number of quad and scooter accidents every summer, many involving inexperienced or over-confident tourists. Drive slowly, wear the (legally required) helmet on an ATV, avoid the busiest times, and don't drink and drive. Parking in and around Chora is also very limited in season. Agencies cluster in Chora, at the airport and in the resorts, and many will deliver. Driven sensibly, your own car or ATV transforms a Mykonos trip — just treat the roads with the respect they demand.",
  },
  {
    name: "Taxis & ride-hailing", slug: "taxis", image: IMG, rating: 5, area: "Islandwide",
    tip: "With only around 30 taxis on the whole island, don't rely on flagging one down in season — book ahead or use the local taxi app, and expect to wait.",
    filterKeys: [],
    description: "Mykonos's taxis are notoriously scarce and pricey — a real constraint on how you plan getting around in high season.",
    practicalInfo: { openingHours: "24h in theory, but very limited supply", price: "Short hops from ~€20; airport €20–80 by season/demand", howToGetThere: "Main rank at Fabrika square in Chora; book by phone or app" },
    fullDescription: "Taxis are one of the genuine frustrations of getting around Mykonos: there are only about thirty licensed cabs on the entire island, which means that in high season demand hugely outstrips supply, waits can be long, and prices climb accordingly. The main taxi rank is at Fabrika square in Chora, and there is a local taxi-booking phone line and app, but even then a car is far from guaranteed at peak times — after a night out, or when several flights land together, you may wait a very long time or find none at all. Fares for short hops start around €20, and airport runs can range from €20 to €80 depending on season and demand. International ride-hailing apps have historically had a limited or complicated presence in Greece, so don't count on Uber or Bolt the way you would elsewhere. The practical upshot: never rely on grabbing a taxi on the spot for anything time-sensitive. Book ahead where you can, lean on your hotel's transfers, and use the buses, water taxis or your own ATV for the bulk of your journeys.",
  },
  {
    name: "Ferries & getting to Mykonos", slug: "ferries", image: IMG, rating: 5, area: "Aegean Sea",
    tip: "Ferries from Rafina (near Athens Airport) are often cheaper and quicker than those from Piraeus — worth checking if you're connecting through Athens.",
    filterKeys: [],
    description: "Fast ferries link Mykonos to Athens and the other Cyclades — a scenic alternative or add-on to flying.",
    practicalInfo: { openingHours: "Daily in season; reduced in winter", price: "Fast ferry from Piraeus ~€65 one-way (4–5h); conventional ~€40 (6–8h)", howToGetThere: "Ferries from Piraeus and Rafina near Athens, plus inter-island routes" },
    fullDescription: "Beyond flying, Mykonos is well connected to the mainland and the rest of the Cyclades by ferry — a scenic way to arrive and the key to island-hopping onward. Fast catamarans from the port of Piraeus (Athens) reach Mykonos in about 4–5 hours for roughly €65 one-way, while slower conventional ferries take 6–8 hours for around €40. If you're connecting through Athens Airport, it's well worth checking departures from Rafina, the smaller port much closer to the airport, which are often cheaper and quicker than Piraeus. In summer, frequent ferries also link Mykonos directly to Tinos, Paros, Naxos, Santorini and other islands, making day trips and multi-island itineraries easy. Ferries dock at the New Port (Tourlos), a couple of kilometres north of Chora, from where buses, taxis and hotel transfers run into town. Do note that strong Meltemi winds in July and August can delay or cancel fast-ferry sailings, so build in a buffer around onward flights. Book ferry tickets in advance in peak season, as popular sailings sell out. For flexibility and Cycladic island-hopping, the ferry network is a great asset.",
  },
];

function jsonLd() {
  return {
    "@type": "BreadcrumbList",
    "@context": "https://schema.org",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Mykonos", item: `${SITE}/mykonos` },
      { "@type": "ListItem", position: 3, name: "Transport", item: `${SITE}/mykonos/transport` },
    ],
  };
}

export default function MykonosTransport() {
  return (
    <CityGuideShell
      citySlug="mykonos"
      cityName="Mykonos"
      categories={CATEGORIES}
      active="transport"
      crumb="Transport"
      h1="Getting Around Mykonos"
      heroImage={IMG}
      intro="Getting around Mykonos takes a little planning: it's a compact island, but its famously scarce taxis and narrow roads mean the smart traveller mixes the cheap KTEL buses, scenic water taxis between the south-coast beaches, and — for the wild north — a carefully driven rental car or ATV. This guide covers every option, from the airport transfer and the two Chora bus stations to water taxis, car and quad hire, and the ferries that connect Mykonos to Athens and the rest of the Cyclades, with euro prices and money-saving tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Getting around Mykonos — in detail" items={INFO} />
    </CityGuideShell>
  );
}
