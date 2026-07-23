import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { CATEGORIES } from "@/app/data/paris-places";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Transport in Paris 2026 — Guide | Flyamba",
  description:
    "How to get around Paris — Charles de Gaulle and Orly airport transfers, the Métro, RER trains, Navigo passes, buses, trams, Vélib' bikes and taxis. Ticket prices, travel times and practical tips for visitors.",
  alternates: { canonical: `${SITE}/paris/transport` },
  openGraph: { title: "Getting Around Paris | Flyamba", description: "Métro, RER, airports and tickets explained for Paris.", type: "article" },
};

const PLACEHOLDER = "/images/barcelona/placeholder.webp";

const INFO: BcnPlace[] = [
  {
    name: "Charles de Gaulle Airport (CDG)", slug: "cdg-airport", image: PLACEHOLDER,
    rating: 4.2, area: "23 km NE of the city", tip: "The RER B train is the fastest, cheapest airport transfer — far quicker than a taxi in traffic.",
    filterKeys: [],
    description: "Paris's main international hub, connected to the centre by the RER B train, buses and taxis.",
    practicalInfo: { openingHours: "24 hours; RER B ~05:00–00:00", price: "RER B ~€11.80; flat-rate taxi €56–65; Roissybus ~€16.60", howToGetThere: "RER B to Gare du Nord / Châtelet (~35–45 min); taxi ~45–60 min" },
    fullDescription: "Charles de Gaulle (CDG), 23 kilometres north-east of Paris, is the country's largest airport and where most long-haul and international flights arrive. It has three terminals (T1, T2 with sub-terminals, and T3) linked by a free automated CDGVAL shuttle train, so allow extra time to move between them. The smartest transfer for most visitors is the RER B suburban train, which runs from beneath the terminals to Gare du Nord, Châtelet–Les Halles and Saint-Michel in about 35–45 minutes for around €11.80 — far faster and cheaper than a taxi when the ring road is busy. Alternatively, the Roissybus goes direct to the Opéra for about €16.60, and airport taxis charge a fixed flat rate to the city (€56 to the Right Bank, €65 to the Left Bank) that avoids meter surprises. Only use official taxi ranks and ignore drivers touting inside the terminal. Ride-hailing apps also serve CDG from designated pick-up points. Build in plenty of time for security and terminal transfers, especially on departure.",
  },
  {
    name: "Orly & Beauvais Airports", slug: "orly-beauvais", image: PLACEHOLDER,
    rating: 4.0, area: "Orly 13 km S; Beauvais 85 km N", tip: "From Orly, the new Métro line 14 now runs straight into central Paris — quick and cheap.",
    filterKeys: [],
    description: "Paris's second airport (Orly) is close and well linked; budget-airline Beauvais is far out with a shuttle bus.",
    practicalInfo: { openingHours: "Orly ~05:00–00:00 for transfers; Beauvais tied to flights", price: "Orly Métro L14 ~€10.30; Orlybus ~€11.50; Beauvais shuttle ~€16.90", howToGetThere: "Orly: Métro L14 or Orlybus (~25–35 min). Beauvais: express coach to Porte Maillot (~1h15)" },
    fullDescription: "Paris has two other airports besides CDG. Orly (ORY), 13 kilometres south of the city, handles domestic, European and some long-haul flights and is now much easier to reach thanks to the extension of driverless Métro line 14, which runs directly from the terminals into central Paris in around 25–35 minutes for about €10.30 — a game-changer over the previous options. The Orlybus to Denfert-Rochereau (~€11.50) and the Orlyval light rail connecting to the RER B remain alternatives, and flat-rate taxis charge €41 to the Left Bank and €50 to the Right Bank. Beauvais (BVA), by contrast, lies 85 kilometres north and is used mainly by low-cost carriers like Ryanair; despite being marketed as 'Paris', it is well outside the city, reached by a dedicated express coach to Porte Maillot that takes about an hour and fifteen minutes and costs around €16.90, timed to flights. Factor that long transfer into any 'cheap' Beauvais fare. For convenience, Orly and CDG are far preferable bases for arriving in Paris.",
  },
  {
    name: "The Paris Métro", slug: "paris-metro", image: PLACEHOLDER,
    rating: 4.5, area: "City-wide · 16 lines, 300+ stations", tip: "You're rarely more than 500 m from a station — use the free Bonjour RATP or Citymapper app to plan routes.",
    filterKeys: [],
    description: "The dense, fast and inexpensive underground network that is the backbone of getting around Paris.",
    practicalInfo: { openingHours: "~05:30–01:15 (to ~02:15 Fri/Sat)", price: "Single t+ ticket €2.15; carnet/day passes cheaper per ride", howToGetThere: "16 lines numbered 1–14 (plus 3bis & 7bis); follow line number and end-station direction" },
    fullDescription: "The Métro is the beating heart of Parisian transport — one of the densest urban rail networks in the world, with sixteen lines and more than 300 stations, so you're seldom more than a five-minute walk from one. It's fast, frequent (trains every few minutes) and cheap, making it by far the best way to get around the city. Lines are identified by number and colour, and you navigate by the name of the station at the end of the line in your direction of travel, shown on platform signs. A single 't+' ticket costs €2.15 and covers one Métro journey with changes; it's much cheaper to buy a day pass or load a rechargeable Navigo Easy card if you'll ride often. Trains run from around 5:30am to just after 1am (later at weekends). Keep your ticket until you exit, as inspectors do check, mind pickpockets on tourist-heavy lines like 1 and around major stations, and note that many older stations have stairs rather than lifts. Download the Bonjour RATP or Citymapper app for live routing.",
  },
  {
    name: "RER & Transilien Trains", slug: "rer-trains", image: PLACEHOLDER,
    rating: 4.2, area: "City & Île-de-France region", tip: "Use the RER to cross the centre in fewer stops and to reach Versailles, the airports and Disneyland.",
    filterKeys: [],
    description: "Faster regional express trains that cross the city with fewer stops and reach the suburbs and day-trip sights.",
    practicalInfo: { openingHours: "~05:00–00:30", price: "Central journeys same as Métro; suburban zones cost more", howToGetThere: "Five lines A–E; check the platform board, as not every train stops everywhere" },
    fullDescription: "The RER (Réseau Express Régional) is the network of faster suburban express trains that complements the Métro, running underground through the centre with fewer stops before fanning out across the Île-de-France region. Its five lines (A to E) are invaluable for two things: crossing the city quickly — line A whisks you from the Louvre area to Nation or La Défense far faster than the Métro — and reaching key sights beyond the centre, including Versailles (line C), Charles de Gaulle airport and Disneyland Paris (line A to Marne-la-Vallée). Within central Paris, a standard Métro ticket is valid on the RER, but journeys into the outer zones cost more, so buy the correct ticket for your destination or you may be fined and unable to exit through the barriers. Crucially, not every RER train stops at every station, so check the illuminated platform boards or overhead screens, which list the stops each approaching train will make. Trains can be busy at rush hour. For visitors, the RER is essential for airport transfers and day trips, and a handy shortcut across town.",
  },
  {
    name: "Tickets, Navigo & Passes", slug: "tickets-navigo", image: PLACEHOLDER,
    rating: 4.1, area: "All public transport", tip: "For a week-long visit, the Navigo Easy card or a weekly Navigo (Mon–Sun) usually beats buying single tickets.",
    filterKeys: [],
    description: "How to pay for Paris public transport — single tickets, rechargeable Navigo cards and tourist passes.",
    practicalInfo: { openingHours: "Machines & counters at all stations", price: "Single €2.15; day (Navigo Jour) ~€8.65; weekly Navigo ~€31.60", howToGetThere: "Buy at station machines (card/coins) or load the smartphone app on some phones" },
    fullDescription: "Paris has simplified its fares in recent years, and choosing the right ticket saves money. A single 't+' ticket costs €2.15 and now covers Métro, bus, tram and central RER with transfers within the mode. If you're riding a lot, better value comes from a rechargeable Navigo Easy card (a small one-off fee for the card, then load ticket bundles or day passes onto it) or, for a week-long stay covering Monday to Sunday, the weekly Navigo pass at around €31.60, which gives unlimited travel across all zones — including the airports and Versailles — and quickly pays for itself. A Navigo Jour day pass (about €8.65) suits a single busy day. The old paper carnet of ten tickets is being phased out in favour of the digital and Navigo options. The dedicated Paris Visite tourist pass exists but is usually poorer value than a Navigo. Buy and top up at the machines in every station (they take contactless cards), and on some smartphones you can now load tickets directly. Keep your ticket or card until you have exited, as fare inspections are common.",
  },
  {
    name: "Buses, Trams, Vélib' & Walking", slug: "buses-bikes-walking", image: PLACEHOLDER,
    rating: 4.3, area: "City-wide", tip: "Paris is compact and beautiful on foot — but the Vélib' bike-share and scenic bus routes fill the gaps.",
    filterKeys: [],
    description: "Above-ground options — buses with a view, trams on the edge, shared bikes and the joy of walking Paris.",
    practicalInfo: { openingHours: "Buses ~06:30–00:30 (Noctilien night buses after); Vélib' 24h", price: "Bus €2.15 (same ticket); Vélib' day pass ~€5 + usage", howToGetThere: "Bus stops show routes & live times; Vélib' via the app; central sights walkable" },
    fullDescription: "Beyond the underground, Paris offers pleasant above-ground ways to get around. City buses use the same €2.15 ticket as the Métro and let you see the city as you travel — scenic routes like the 69 pass many landmarks and make a cheap sightseeing trip — while Noctilien night buses cover the hours after the Métro closes. Trams mostly circle the outer edges of the city and are less useful for central sightseeing. For a fun, flexible option, the Vélib' bike-share scheme has thousands of docking stations across the city, with a day pass around €5 plus small usage fees and an increasing number of electric bikes; the growing network of protected cycle lanes makes cycling far safer than it once was, though traffic still demands care. Rental e-scooters were banned from Paris streets in 2023, so bikes are the two-wheeled option. Above all, Paris is a wonderfully walkable city: the centre is compact, the neighbourhoods flow into one another along the Seine, and wandering on foot — through the Marais, along the river, up to Montmartre — is one of the great pleasures of a visit. Wear comfortable shoes and let yourself get a little lost.",
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Paris", item: `${SITE}/paris` },
      { "@type": "ListItem", position: 3, name: "Transport", item: `${SITE}/paris/transport` },
    ],
  };
}

export default function ParisTransport() {
  return (
    <CityGuideShell
      citySlug="paris"
      cityName="Paris"
      categories={CATEGORIES}
      active="transport"
      crumb="Transport"
      h1="Getting Around Paris"
      heroImage="/images/paris/sevardheter/arc-de-triomphe.webp"
      intro="Paris is one of the easiest big cities to navigate: a dense Métro puts a station within a few minutes' walk almost anywhere, fast RER trains reach the airports and day-trip sights, and the compact, beautiful centre is made for walking. This guide covers arriving from Charles de Gaulle, Orly and Beauvais, using the Métro and RER, choosing between single tickets and Navigo passes, and getting around by bus, tram, shared bike or on foot — with prices, travel times and the practical tips that make it all simple."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Paris transport in detail" items={INFO} />
    </CityGuideShell>
  );
}
