import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/madrid-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Madrid Transport 2026 — Metro, Airport & Getting Around",
  description:
    "How to get around Madrid — the metro, Cercanías trains, buses, taxis and rideshare, plus every way from Barajas airport (MAD) to the centre, the Tarjeta…",
  alternates: { canonical: `${SITE}/madrid/transport` },
  openGraph: { title: "Getting Around Madrid | Flyamba", description: "Metro, airport transfers, tickets and taxis in Madrid.", type: "article" },
};

const IMG = "/images/madrid/attractions/puerta-del-sol.webp";

const INFO: BcnPlace[] = [
  {
    name: "From the airport to the centre", slug: "airport", image: IMG, rating: 5, area: "MAD → centre",
    tip: "The cheapest option is the Cercanías C-1 train from Terminal 4 (~€2.60, no airport supplement); the metro is fastest but adds a €3 airport fee.",
    filterKeys: [],
    description: "Adolfo Suárez Madrid-Barajas (MAD) sits 12 km northeast of the centre, with four terminals and several fast, cheap ways into town.",
    practicalInfo: { openingHours: "N/A", price: "Metro €4.50–5 incl. supplement · Cercanías €2.60 · Airport bus €5 · Taxi €33 flat", howToGetThere: "Metro L8, Cercanías C-1, Exprés Aeropuerto bus 203, taxi or rideshare" },
    fullDescription: "Madrid's airport, Adolfo Suárez Madrid-Barajas (MAD), lies about 12 kilometres northeast of the centre and has four terminals (T1, T2, T3 and T4). There are several quick ways into town — choose based on where you land, your luggage and your budget. Metro line 8 (pink) runs from the terminals to Nuevos Ministerios in about 12–15 minutes, where you connect to the rest of the network; note that the airport metro stations charge a €3 airport supplement on top of your normal fare, making the total around €4.50–5. The cheapest option is the Cercanías commuter train line C-1, which runs only from Terminal 4 to hubs like Atocha and Chamartín for about €2.60 with no supplement. The yellow Exprés Aeropuerto bus (line 203) runs 24 hours between all terminals and the centre (stopping at Atocha and, at night, Cibeles) for €5, handy when the metro is closed. A taxi to anywhere inside the M-30 ring road is a fixed €33 flat fare regardless of traffic, taking 20–35 minutes, while Uber, Cabify and Bolt all operate from designated pick-up points and are often cheaper — compare with the fixed taxi fare before booking.",
  },
  {
    name: "The Madrid Metro", slug: "metro", image: IMG, rating: 5, area: "Citywide",
    tip: "Most sights are in Zone A. Buy a rechargeable Tarjeta Multi card (€2.50) and load a 10-journey Metrobús — it works out cheaper per ride and can be shared.",
    filterKeys: [],
    description: "One of Europe's largest, cheapest and most efficient metros — 12 lines reaching every major sight, running ~06:00–01:30.",
    practicalInfo: { openingHours: "~06:00–01:30 daily", price: "Single €1.50–2.00; 10-journey Metrobús €12.20 (Zone A)", howToGetThere: "12 lines; L1/L2/L3 to Sol, L8 to the airport, L2 to Retiro" },
    fullDescription: "The Madrid Metro is the backbone of getting around — one of Europe's largest, cheapest and most efficient underground networks, with 12 lines that are dense, frequent and reach virtually every major sight, from Sol and Gran Vía to the Prado area and the Bernabéu. It runs from roughly 06:00 to 01:30, with trains coming every few minutes throughout the day, and it is air-conditioned, which is a real blessing in the summer heat. Most attractions sit in Zone A (central Madrid); a single ticket costs €1.50–2.00 depending on the number of stations, but if you travel more than a couple of times a rechargeable 10-journey Metrobús card (€12.20) quickly pays off, working out at about €1.22 per ride and usable on both metro and EMT buses. Everything loads onto a rechargeable Tarjeta Multi card, which costs €2.50 from the machines and can hold singles, a 10-journey pass or a tourist pass. Useful lines include L1 (Sol, Atocha), L2 (Sol, Ópera, toward Retiro), L5 (Gran Vía, La Latina) and L8 (the airport via Nuevos Ministerios). Tap in at the barrier; you don't need to tap out.",
  },
  {
    name: "Buses & night buses (búhos)", slug: "buses", image: IMG, rating: 5, area: "Citywide",
    tip: "When the metro closes at 01:30, the night buses ('búhos', owls) take over — most run from Plaza de Cibeles, the night-bus hub.",
    filterKeys: [],
    description: "EMT's blue city buses complement the metro above ground, and night buses keep the city moving after the metro closes.",
    practicalInfo: { openingHours: "Day buses ~06:00–23:30; night 'búhos' after 01:30", price: "Same as metro; Metrobús 10-journey card valid", howToGetThere: "EMT blue buses citywide; night buses from Plaza de Cibeles" },
    fullDescription: "EMT's blue city buses cover the whole of Madrid and make a useful complement to the metro, especially for above-ground journeys where you can see the city, or for short hops where the metro doesn't run directly. They take contactless payment or the Tarjeta Multi, and the same fares and 10-journey Metrobús card apply as on the metro, so you can freely mix bus and metro on the same pass. Buses are often the smoothest way to cross the centre or reach places the metro doesn't serve head-on, and real-time arrivals are shown on the EMT app and at the digital stops. When the metro closes at around 01:30, the night buses take over — known affectionately as 'búhos' (owls), their routes are prefixed with the letter N and most radiate out from Plaza de Cibeles, which acts as the night-bus hub. They are the key to getting home after a late night in a city that stays out until dawn, so if you're planning a big night, check the búho routes and the last connections in advance. Between the metro, the blue day buses and the night búhos, Madrid's public transport keeps you moving around the clock.",
  },
  {
    name: "Tickets & fares", slug: "tickets", image: IMG, rating: 5, area: "Planning",
    tip: "The rechargeable Tarjeta Multi (€2.50) is essential — load a 10-journey Metrobús onto it, and remember the airport supplement is never included.",
    filterKeys: [],
    description: "A single card system: buy a Tarjeta Multi, then load singles, a 10-journey Metrobús or a tourist pass onto it.",
    practicalInfo: { openingHours: "N/A", price: "Single €1.50–2.00 · Metrobús 10-journey €12.20 · Tourist pass 1/2/3 days €8.40/€14.20/€18.40", howToGetThere: "Buy the Tarjeta Multi and top it up at any metro machine" },
    fullDescription: "Madrid's fare system is simple once you know the pieces. Everything loads onto a rechargeable plastic Tarjeta Multi, which costs a one-off €2.50 and is bought from the machines in any metro station. Onto it you can load different products. A single ticket costs €1.50–2.00 depending on the number of stations, worth it only for the occasional ride. The Metrobús is a 10-journey card for €12.20, valid on both the metro and EMT buses within Zone A and shareable among a group (tap once per person) — it is the best choice for most visitors and works out around €1.22 a ride. The Abono Turístico (Tourist Travel Pass) gives unlimited travel for a set number of days: for Zone A it's €8.40 for one day, €14.20 for two and €18.40 for three, worth it only if you ride many times a day, otherwise the Metrobús is usually cheaper. One crucial caveat: journeys to and from the airport always require the €3 airport supplement on top, and it is never included in the Metrobús card — to avoid it, take the Cercanías C-1 from Terminal 4 or the yellow airport bus instead.",
  },
  {
    name: "On foot", slug: "on-foot", image: IMG, rating: 5, area: "Central Madrid",
    tip: "Central Madrid is compact and very walkable — Sol to Plaza Mayor is 5 minutes, and it's often quicker to walk than change metro lines.",
    filterKeys: [],
    description: "Central Madrid is compact and highly walkable, with the main sights clustered within an easy stroll.",
    practicalInfo: { openingHours: "N/A", price: "Free", howToGetThere: "Sol → Plaza Mayor ~5 min; Sol → Gran Vía ~8 min; Sol → Prado ~10 min" },
    fullDescription: "Central Madrid is compact and wonderfully walkable, and on foot is often the best — and sometimes the fastest — way to get around the core. From Puerta del Sol it's about five minutes to Plaza Mayor, roughly eight to Gran Vía, and around ten to the Prado, while a wander through La Latina and Malasaña rewards you with the city's best neighbourhood life. Between nearby metro stops, it is frequently quicker to walk on the surface than to descend, change lines and come back up. The central districts around Sol, La Latina and Malasaña sit tightly together, so most of what you'll want to see — Plaza Mayor, the Mercado de San Miguel, the tapas lanes and the lively squares — is reachable on a short stroll with no need for public transport at all. The art quarter along the Paseo del Prado, linking the Prado, Reina Sofía and Thyssen, is a pleasant walk in its own right, with the vast Retiro park alongside for green respite. Wear comfortable shoes for the pavements and some gentle hills, carry water in the heat, and enjoy discovering the city at street level — Madrid is a place that rewards walking.",
  },
  {
    name: "Taxis & rideshare", slug: "taxis", image: IMG, rating: 5, area: "Citywide",
    tip: "Official taxis are white with a red diagonal stripe and always run the meter — except from the airport, where a €33 flat fare applies inside the M-30.",
    filterKeys: [],
    description: "Madrid's white taxis run on the meter (with a flat airport fare), and Uber, Cabify and Bolt all operate citywide.",
    practicalInfo: { openingHours: "24 hours", price: "Metered; airport flat fare €33 inside the M-30", howToGetThere: "Hail a green-light taxi, use a rank, or book Uber/Cabify/Bolt" },
    fullDescription: "Madrid's official taxis are easy to spot — white cars with a red diagonal stripe on the front door — and they always run on the meter. You can hail one showing a green light on the street, or pick one up at a taxi rank. The one exception is the airport, where a fixed €33 fare applies to any address inside the M-30 ring road, giving you a predictable, traffic-proof price. Ride-hailing apps work well throughout the city too: Uber, Cabify and Bolt all operate in Madrid and are often cheaper than taxis, especially outside rush hour, with the price shown upfront in the app for peace of mind — always check the registration and driver name before getting in. For visitors, hiring a car is almost never worthwhile within Madrid: public transport is faster and cheaper, and the centre has a low-emission zone (Madrid 360) with driving restrictions and difficult parking, so a rental car is really only relevant for exploring further afield on day trips. Between metered white taxis and the ride-hailing apps, door-to-door travel is straightforward and reasonably priced whenever you don't feel like the metro or a walk.",
  },
];


export default function MadridTransport() {
  return (
    <CityGuideShell
      citySlug="madrid"
      cityName="Madrid"
      categories={CATEGORIES}
      active="transport"
      crumb="Transport"
      h1="Getting Around Madrid"
      heroImage={IMG}
      intro="Madrid has one of Europe's most extensive and affordable public transport systems — a dense metro, Cercanías commuter trains, EMT's blue buses and the night 'búhos' all knit the city together. This guide covers every way from Barajas airport (MAD) to the centre, how the metro and buses work, which tickets are worth buying, and when to walk, take a taxi or use a rideshare app — so you can get around quickly and cheaply."
      wide
    >
      <CategorySeoSections heading="Getting around Madrid — in detail" items={INFO} />
    </CityGuideShell>
  );
}
