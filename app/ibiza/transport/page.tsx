import type { Metadata } from "next";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { IBIZA_CATEGORIES } from "@/app/data/ibiza-places";
import { SITE } from "@/app/lib/destination-helpers";

const HERO = "/images/destinations/flights-ibiza.avif";
const PH = "/images/barcelona/placeholder.webp";

export const metadata: Metadata = {
  title: "Transport in Ibiza 2026 — Getting Around | Flyamba",
  description:
    "Getting around Ibiza — airport transfers and taxis, the bus network, car and scooter hire, the all-night Discobus and ferries to the beaches and Formentera, with fares and tips.",
  alternates: { canonical: `${SITE}/ibiza/transport` },
  openGraph: { title: "Getting Around Ibiza: Transport Guide | Flyamba", description: "Airport transfers, buses, car hire, the Discobus and ferries explained.", type: "article", images: [HERO] },
};

const TRANSPORT: BcnPlace[] = [
  {
    name: "Ibiza Airport (IBZ) Transfers", slug: "airport-transfers", image: PH,
    rating: 4.3, area: "7 km southwest of Ibiza Town", filterKeys: [],
    tip: "Pre-book a private transfer for late-night arrivals — the taxi queue at IBZ can be very long in peak summer.",
    description: "Ibiza's single airport sits close to Ibiza Town, with buses, taxis and transfers into the main resorts.",
    practicalInfo: { openingHours: "Bus L10 roughly 06:00–24:00; taxis 24/7", price: "Bus ~€4; taxi to Ibiza Town ~€20; to Sant Antoni ~€35", howToGetThere: "IBZ is 7 km from Ibiza Town; L10 bus, taxi rank or pre-booked transfer" },
    fullDescription: "Ibiza has a single airport, IBZ, just seven kilometres southwest of Ibiza Town, and in summer it is one of the busiest in Spain. Getting from the terminal to your accommodation is straightforward but worth planning. The cheapest option is the public bus L10, which runs between the airport, Ibiza Town and Playa d'en Bossa roughly from early morning until around midnight for about four euros; in peak season a seasonal service also links the airport to Sant Antoni. Taxis wait at the rank outside arrivals and are metered — expect roughly €20 to Ibiza Town, €25–30 to Santa Eulària and €35 or so to Sant Antoni, with supplements at night and for luggage. Because taxi queues can grow very long on busy summer evenings when flights bunch together, pre-booking a private transfer or a hire car is a good idea, especially for late arrivals or groups. Uber and ride-hailing availability on the island is limited and variable, so do not rely on it. Have some cash for the bus, and confirm your onward transfer in advance during July and August.",
  },
  {
    name: "Buses", slug: "buses", image: PH,
    rating: 4.0, area: "Island-wide", filterKeys: [],
    tip: "The main towns are well linked, but beaches and the north can be sparse — check timetables and last departures.",
    description: "Ibiza's public bus network links the main towns and many beaches cheaply, if not always frequently.",
    practicalInfo: { openingHours: "Roughly 07:00–23:00; reduced in winter", price: "€2–4 per journey depending on distance", howToGetThere: "Main hubs in Ibiza Town, Sant Antoni and Santa Eulària" },
    fullDescription: "Ibiza has a decent, inexpensive public bus network run under the island's transport authority, and for travellers sticking to the main towns it can cover most needs. Frequent, reliable routes connect Ibiza Town, Sant Antoni and Santa Eulària, with fares of just a few euros per journey, and in summer additional seasonal 'beach bus' lines reach popular spots like Cala Comte, Ses Salines, Cala Bassa and Portinatx. The catch is frequency and coverage: while the town-to-town spine runs regularly through the day, services to smaller beaches and the rural north can be infrequent, seasonal or non-existent, and the network thins out considerably in winter. Timetables are posted at stops and online, and it is essential to check the last departure if you are heading out for the day, as evening services can finish early. Buy tickets from the driver with cash (or a contactless card on some routes). For a car-free trip based in one town with occasional beach outings, the buses work well; to explore the island's coves and villages freely, you will want your own wheels. Plan around the timetable and always note the return times.",
  },
  {
    name: "Car Hire", slug: "car-hire", image: PH,
    rating: 4.2, area: "Airport & towns", filterKeys: [],
    tip: "Book well ahead for summer — cars sell out and prices spike. Parking in Ibiza Town and at popular beaches is tight.",
    description: "A hire car is the best way to explore Ibiza's beaches, coves and villages freely, especially the north.",
    practicalInfo: { openingHours: "Airport & town depots, daytime pickup", price: "From ~€35/day (much higher in peak summer)", howToGetThere: "Collect at IBZ airport or town depots; drive on the right" },
    fullDescription: "To make the most of Ibiza — its scattered coves, the wild north, the inland villages and the sunset viewpoints — a hire car is by far the most flexible option, and for many visitors it is essential. Numerous rental firms operate from the airport and the main towns, and rates can be reasonable in the shoulder seasons, starting from around €35 a day, but in July and August demand outstrips supply: prices soar and cars genuinely sell out, so book as far ahead as you can. Driving is on the right, roads are generally good if narrow and winding in the countryside, and distances are short (nowhere on the island is much more than a 45-minute drive). The real challenge is parking: Ibiza Town's centre is busy and largely paid or restricted, and popular beaches like Cala Comte, Ses Salines and Cala d'Hort have limited, often paid parking that fills early on summer days, so arrive in the morning. Never leave valuables visible in a parked car. A full tank, a good offline map and an early start will let you reach the island's best-hidden corners with ease.",
  },
  {
    name: "Scooter & Moped Hire", slug: "scooter-hire", image: PH,
    rating: 4.1, area: "Towns & resorts", filterKeys: [],
    tip: "Great for zipping between nearby beaches and beating parking queues — always wear the helmet and take care on gravel.",
    description: "Scooters and mopeds are a fun, nimble way to get around the resorts and nearby coves in the summer heat.",
    practicalInfo: { openingHours: "Daytime hire from town depots", price: "From ~€25–40/day depending on engine size", howToGetThere: "Hire in Ibiza Town, Sant Antoni, Santa Eulària and the resorts" },
    fullDescription: "For a nimble, breezy and often cheaper alternative to a car, scooters and mopeds are hugely popular on Ibiza, especially for hopping between the beaches and bars around a single base such as Sant Antoni, Playa d'en Bossa or Santa Eulària. Rental outlets in all the main towns hire everything from small 50cc mopeds (fine for two people around the resorts) up to larger, more powerful scooters and motorbikes for covering longer distances, with prices typically from €25–40 a day depending on engine size and season. They sidestep much of the parking hassle that plagues cars at busy beaches, and threading through summer traffic is quicker. That said, take care: you will need the appropriate licence, helmets are compulsory and provided, and the winding rural roads, loose gravel on cove access tracks, and other holiday drivers mean accidents are not uncommon — ride cautiously and never after drinking. Check the insurance excess and photograph any existing damage at pickup. For confident riders wanting freedom and fun to explore the coast in the warm weather, a scooter is a classic and enjoyable Ibiza choice, but it is not the right pick for nervous drivers or long cross-island trips.",
  },
  {
    name: "The Discobus", slug: "discobus", image: PH,
    rating: 4.3, area: "Clubs & towns", filterKeys: [],
    tip: "The all-night club bus is the safe, cheap way home from Pacha, Amnesia or Playa d'en Bossa — check the seasonal routes.",
    description: "A dedicated all-night bus network connecting the clubs, towns and resorts through the summer season.",
    practicalInfo: { openingHours: "Nightly through the summer season, roughly midnight–06:00", price: "~€3–4 per journey", howToGetThere: "Links Ibiza Town, Sant Antoni, Playa d'en Bossa and the major clubs" },
    fullDescription: "One of the smartest things about clubbing in Ibiza is the Discobus, a dedicated night-bus network that runs through the summer season specifically to ferry party-goers between the towns, resorts and the big clubs. Operating nightly from around midnight until dawn, it connects Ibiza Town, Sant Antoni, Playa d'en Bossa, Santa Eulària and the main venues — Pacha, Amnesia, Hï, Ushuaïa and others — for just a few euros a ride, making it by far the cheapest and safest way to get home after a night out. Given how spread out the clubs are, how expensive late-night taxis become (and how long their queues get outside venues at closing time), the Discobus is invaluable, and it removes any temptation to drive after drinking. Routes and timetables are published online and posted at stops each season, so check which line serves your club and where the nearest stop to your accommodation is before you head out. Pay the driver in cash. It runs only in the summer months when the clubs are open. For anyone planning a big night at the superclubs, factoring the Discobus into your plans is the sensible, budget-friendly move.",
  },
  {
    name: "Ferries & Boats", slug: "ferries-boats", image: PH,
    rating: 4.4, area: "Ports & beaches", filterKeys: [],
    tip: "Beyond Formentera, seasonal boat lines link the beaches — a scenic, traffic-free way to reach Cala Bassa or Es Canar.",
    description: "Ferries to Formentera and seasonal boat lines around the coast make water a genuine way to get around.",
    practicalInfo: { openingHours: "Formentera ferries roughly hourly; beach boats seasonal", price: "Formentera ~€25–45 return; beach boats €10–20", howToGetThere: "From Ibiza Town port, Sant Antoni bay and Santa Eulària" },
    fullDescription: "Being an island, Ibiza makes real use of the water for getting around, and boats are both a practical option and a pleasure in their own right. The headline route is the fast ferry to Formentera, which runs roughly hourly (more often in summer) from Ibiza Town's port and crosses in about thirty minutes, with fares of roughly €25–45 return — the essential day trip. Beyond that, a network of seasonal boat lines links Ibiza's own coast in summer: from Sant Antoni bay you can reach the beautiful beaches of Cala Bassa and Cala Conta by boat, avoiding the drive and parking, while services also run from Santa Eulària to Es Canar and elsewhere. These beach boats typically cost €10–20 and turn the journey into a scenic mini-cruise. There are also plentiful private charters, sunset cruises and excursions (for example around Es Vedrà) bookable from the harbours. For Formentera it is wise to book online in peak season; for the local beach boats you can usually just turn up at the jetty. Check seasonal timetables, as most non-Formentera services pause outside summer. Travelling by water is one of the most enjoyable ways to see the island.",
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Ibiza", item: `${SITE}/ibiza` },
      { "@type": "ListItem", position: 3, name: "Transport", item: `${SITE}/ibiza/transport` },
    ],
  };
}

export default function IbizaTransport() {
  return (
    <CityGuideShell
      citySlug="ibiza"
      cityName="Ibiza"
      categories={IBIZA_CATEGORIES}
      active="transport"
      crumb="Transport"
      h1="Getting Around Ibiza"
      heroImage={HERO}
      intro="Ibiza is small — nowhere is more than about a 45-minute drive away — but getting around still takes a little planning. The bus network and the all-night Discobus cover the main towns and clubs cheaply, taxis and transfers handle the airport, and boats link the beaches and Formentera. To reach the island's scattered coves, viewpoints and northern villages freely, though, most visitors hire a car or scooter. Here is how each option works, with fares and practical tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Getting around Ibiza — options in detail" items={TRANSPORT} />
    </CityGuideShell>
  );
}
