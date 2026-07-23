import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/amsterdam-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Getting Around Amsterdam 2026 — Trams, Metro & Bikes | Flyamba",
  description:
    "How to get around Amsterdam: the train from Schiphol Airport, GVB trams and metro, the OV-chipkaart and OVpay, cycling, ferries and taxis, with euro prices and money-saving tips.",
  alternates: { canonical: `${SITE}/amsterdam/transport` },
  openGraph: { title: "Getting Around Amsterdam | Flyamba", description: "Schiphol transfers, trams, metro, bikes and ferries — the complete transport guide.", type: "article" },
};

const IMG = "/images/amsterdam/sevardheter/canal-ring.webp";

const INFO: BcnPlace[] = [
  {
    name: "From Schiphol Airport to the city", slug: "schiphol-to-city", image: IMG, rating: 5, area: "Schiphol (AMS)",
    tip: "The train is by far the fastest and cheapest option — buy a single at the machines or just tap a contactless card.",
    filterKeys: [],
    description: "The train from Schiphol reaches Amsterdam Centraal in around 15 minutes.",
    practicalInfo: { openingHours: "Trains ~05:00–01:00, plus hourly night trains", price: "~€5.90 one-way (2nd class); ~€1 disposable card surcharge", howToGetThere: "NS trains run from the airport's underground station straight to Centraal, Zuid and other stops" },
    fullDescription: "Amsterdam Airport Schiphol (AMS) sits about 9 km south-west of the centre and is superbly connected. The train is the obvious choice: NS (Dutch Railways) services run directly from the station beneath the terminal to Amsterdam Centraal in roughly 15 minutes, up to eight times an hour, for about €5.90 one way — pick the right direction, as some trains also serve Amsterdam Zuid, which is handier for the business district and southern hotels. You can buy a single-use ticket at the yellow machines, use the NS app, or simply tap in and out with a contactless bank card or phone (OVpay), which is now the easiest method. There are also Connexxion Airport Express buses (line 397) to the Museum Quarter and a 24-hour taxi rank (a fixed-ish €45–55 to the centre, 20–30 minutes depending on traffic). Uber and Bolt also operate. For almost everyone, the train wins on speed, price and reliability — avoid touts inside the terminal and head straight for the well-signed station downstairs.",
  },
  {
    name: "Trams & the GVB network", slug: "trams", image: IMG, rating: 5, area: "Citywide",
    tip: "Trams cover the centre beautifully — key lines 2, 5 and 12 link Centraal to the Museum Quarter.",
    filterKeys: [],
    description: "GVB trams are the backbone of city-centre transport, frequent and easy to use.",
    practicalInfo: { openingHours: "Roughly 06:00–00:30; night buses after", price: "€3.40 single (1h); day passes from €9 (24h)", howToGetThere: "Tap in and out on board with a contactless card, OVpay or a GVB pass" },
    fullDescription: "Amsterdam's blue-and-white trams, run by the city operator GVB, are the backbone of getting around the centre — frequent, scenic and easy once you know the routine. The network fans out from Amsterdam Centraal, and a handful of lines cover almost everything a visitor needs: trams 2, 5 and 12 run to the Museum Quarter (Rijksmuseum, Van Gogh, Vondelpark); 13 and 17 head into the Jordaan and past the Anne Frank House; and 2, 12, 13, 14 and 17 serve Dam Square. Board at any door, tap your contactless card, phone (OVpay) or GVB ticket on the pink card reader when you get on, and — crucially — tap out again when you leave, or you'll be overcharged. A single ticket costs €3.40 and is valid for an hour including transfers, but if you'll ride more than a couple of times a day, a GVB day pass (from about €9 for 24 hours, with multi-day options) or the I amsterdam City Card is far better value. Trams run until around half past midnight, after which night buses take over.",
  },
  {
    name: "The metro & the North/South line", slug: "metro", image: IMG, rating: 5, area: "Citywide",
    tip: "The M52 (Noord-Zuidlijn) whisks you between Noord, Centraal, De Pijp and Zuid in minutes.",
    filterKeys: [],
    description: "Four metro lines link the outer districts to the centre, led by the fast North/South M52.",
    practicalInfo: { openingHours: "Roughly 06:00–00:30 (later on weekends)", price: "Same GVB fares as trams; €3.40 single / day passes", howToGetThere: "Lines 50, 51, 53, 54 and the M52 North/South line all call at Centraal" },
    fullDescription: "Amsterdam's metro is smaller and less central than those of some capitals, because the historic canal district is best covered by tram and foot, but it's fast and useful for longer hops. Four lines (50, 51, 53 and 54) serve the eastern and southern districts, and the newer M52 'Noord-Zuidlijn' (North/South line) is a genuine game-changer, running under the IJ and the city centre to link Amsterdam-Noord, Centraal Station, Rokin (for Dam and the Nine Streets), De Pijp (for the Albert Cuyp Market and Heineken Experience) and Amsterdam Zuid in just minutes. It uses exactly the same GVB fares and tap-in/tap-out system as the trams — a €3.40 hourly single or a day pass — with contactless bank cards and OVpay accepted at the gates. For visitors, the M52 is the most useful line, turning what would be a long tram ride out to De Pijp or Zuid into a quick underground trip, and connecting to Schiphol-bound trains at Zuid. Services run from around 6am to just after midnight, with later hours on weekend nights; night buses fill the gap.",
  },
  {
    name: "OV-chipkaart, OVpay & tickets", slug: "tickets", image: IMG, rating: 5, area: "Citywide",
    tip: "Skip the old plastic OV-chipkaart — just tap a contactless bank card or phone (OVpay) on every reader.",
    filterKeys: [],
    description: "Contactless payment (OVpay) has largely replaced the traditional OV-chipkaart for visitors.",
    practicalInfo: { openingHours: "N/A", price: "GVB day pass €9 (24h), €15 (48h), €21 (72h); I amsterdam City Card from ~€24", howToGetThere: "Tap in and out on the pink/grey readers on every tram, metro, bus and ferry" },
    fullDescription: "Understanding tickets is the one thing that trips up first-time visitors, but it's now simpler than ever. Traditionally you needed an OV-chipkaart, a rechargeable plastic smartcard, but for tourists this has largely been superseded by OVpay: you simply tap the same contactless bank card, credit card or phone/watch on the readers when you board and again when you leave, and the correct fare is charged automatically — no top-ups, no separate card. Always tap out, or you'll be charged a maximum fare. If you prefer a fixed cost, GVB day passes offer unlimited tram, metro, bus and ferry travel from about €9 (24 hours), €15 (48 hours) and €21 (72 hours), sold at machines, GVB offices and online. Travelling as a group or planning to visit lots of museums? The I amsterdam City Card (from around €24) bundles unlimited GVB transport with free entry to many museums and a canal cruise, and can pay for itself quickly. Note that Schiphol airport trains are run by NS, not GVB, so they're priced and ticketed separately from the city passes.",
  },
  {
    name: "Cycling — the local way to travel", slug: "cycling", image: IMG, rating: 5, area: "Citywide",
    tip: "Rent from a shop or an app, always use the red bike lanes, and lock your bike twice — theft is real.",
    filterKeys: [],
    description: "Amsterdam is the world's great cycling city, with bikes for hire everywhere.",
    practicalInfo: { openingHours: "Rental shops ~09:00–18:00; app bikes 24h", price: "Rental ~€12–18/day; app bikes ~€3–4 to unlock + per-minute", howToGetThere: "MacBike, Black Bikes and others near Centraal; Donkey Republic via app" },
    fullDescription: "Amsterdam is the world's most famous cycling city, and pedalling around it — flat, compact and threaded with dedicated bike lanes — is both the most local and often the fastest way to get about. Rental shops such as MacBike and Black Bikes cluster near Centraal Station and the museums, hiring sturdy Dutch bikes for around €12–18 a day, while app-based schemes like Donkey Republic let you unlock a bike anywhere for a few euros plus a per-minute or daily rate. A few rules keep you safe and legal: always ride in the red-asphalt bike lanes (never on tram tracks or pavements), signal with your arm, use lights after dark (it's fined without them), give way to trams and busier bikes, and lock your bike to something fixed with both locks, as theft is common. The traffic can feel intimidating at first — locals are fast and assertive — so nervous riders might warm up in quiet Vondelpark or the Amsterdamse Bos before tackling the centre. Do give it a try, though: seeing Amsterdam from the saddle, gliding along the canals with the wind behind you, is an experience in itself.",
  },
  {
    name: "Ferries, taxis & ride-hailing", slug: "ferries-taxis", image: IMG, rating: 5, area: "Citywide",
    tip: "The GVB ferries behind Centraal to Amsterdam-Noord are free — great for A'DAM Lookout and the EYE.",
    filterKeys: [],
    description: "Free ferries cross the IJ; taxis and ride-hailing fill the late-night gaps.",
    practicalInfo: { openingHours: "Ferries frequent, key routes 24h; taxis 24h", price: "Ferries free; taxis ~€2.50 start + ~€2.20/km; Uber/Bolt similar", howToGetThere: "Ferries depart the docks behind Centraal; taxi ranks at Centraal, Leidseplein, Rembrandtplein" },
    fullDescription: "Two more options round out getting around Amsterdam. First, the free GVB ferries: from the docks directly behind Centraal Station, passenger-and-bike ferries shuttle constantly across the IJ waterway to Amsterdam-Noord, and they cost nothing. The Buiksloterweg route (five minutes) drops you by the EYE Filmmuseum and the A'DAM Lookout, while the NDSM ferry serves the creative NDSM Wharf and the Pancake Boat — a scenic, cost-free mini-cruise and the easiest way to reach the increasingly hip northern district. Some ferries run 24 hours, handy for late nights at Shelter or Sir Adam. Second, taxis and ride-hailing: official taxis (find them at ranks by Centraal, Leidseplein and Rembrandtplein, or book by app) are metered and reliable but pricey, starting around €2.50 plus roughly €2.20 a kilometre, so a short central hop is €12–20. Uber and Bolt both operate widely, usually at comparable or slightly lower prices, and are convenient late at night when trams have stopped. For most journeys, though, the tram, metro, ferry and your own two feet (or a bike) will serve you better and cheaper than a cab.",
  },
];

function jsonLd() {
  return {
    "@type": "BreadcrumbList",
    "@context": "https://schema.org",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Amsterdam", item: `${SITE}/amsterdam` },
      { "@type": "ListItem", position: 3, name: "Transport", item: `${SITE}/amsterdam/transport` },
    ],
  };
}

export default function AmsterdamTransport() {
  return (
    <CityGuideShell
      citySlug="amsterdam"
      cityName="Amsterdam"
      categories={CATEGORIES}
      active="transport"
      crumb="Transport"
      h1="Getting Around Amsterdam"
      heroImage={IMG}
      intro="Amsterdam is one of the easiest cities in Europe to get around: a compact, flat historic centre made for walking and cycling, backed by an excellent GVB network of trams, metro lines, buses and free ferries, plus fast trains to and from Schiphol Airport. This guide covers every option — from the 15-minute airport train to how the OV-chipkaart and contactless OVpay tickets work, cycling like a local, and when a taxi is worth it — with euro prices and money-saving tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Getting around Amsterdam — in detail" items={INFO} />
    </CityGuideShell>
  );
}
