import type { Metadata } from "next";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { CATEGORIES } from "@/app/data/athens-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Getting Around Athens 2026 — Metro, Tram & Bus Guide | Flyamba",
  description:
    "How to get around Athens: the airport metro and express buses, the modern metro, the tram to the coast, buses and trolleybuses, taxis and ride-hailing, plus tickets, the Ath.ena card, prices in euros and money-saving tips.",
  alternates: { canonical: `${SITE}/athens/transport` },
  openGraph: { title: "Getting Around Athens | Flyamba", description: "Airport metro, tram to the coast, buses, taxis and tickets.", type: "article" },
};

const PLACEHOLDER = "/images/barcelona/placeholder.webp";

const ITEMS: BcnPlace[] = [
  {
    name: "From Athens Airport (ATH) to the city", slug: "airport-transfer", image: PLACEHOLDER,
    rating: 4.5, area: "Eleftherios Venizelos (ATH)", filterKeys: [],
    tip: "Buy the discounted airport metro round-trip if you're returning within 30 days — it's cheaper than two singles.",
    description: "The metro, the X95 express bus, suburban rail and taxis all link ATH with central Athens.",
    practicalInfo: { openingHours: "Metro ~06:30–23:30; X95 bus 24/7", price: "Metro €9 one-way; X95 bus €5.50; flat taxi €40 day / €55 night", howToGetThere: "Airport is 33 km east of the centre at Spata" },
    fullDescription: "Athens International Airport 'Eleftherios Venizelos' (ATH) lies about 33 kilometres east of the centre, and you have four good ways in. The most popular is Metro Line 3 (blue), which runs directly from the airport to Syntagma and Monastiraki in around 40 minutes for a €9 flat airport fare (discounted return and group tickets available); trains run roughly every 30 minutes from early morning to late evening. The X95 express bus runs 24 hours a day to Syntagma Square for just €5.50, taking around an hour depending on traffic — the best budget and late-night option, with other express buses (X93, X96) serving the Kifissos bus station and Piraeus port. The suburban railway (Proastiakos) also links the airport to the rail network. For door-to-door ease, official taxis charge a regulated flat fare to the central zone — about €40 by day (05:00–24:00) and €55 at night — agreed before you set off, while apps like FreeNow and Uber (which dispatches licensed taxis) are widely used. With bags and a central hotel, the metro is usually the sweet spot of speed, price and simplicity.",
  },
  {
    name: "The Athens Metro", slug: "metro", image: PLACEHOLDER,
    rating: 4.6, area: "Citywide (3 lines)", filterKeys: [],
    tip: "Stations like Syntagma and Monastiraki double as mini-museums, displaying antiquities dug up during construction.",
    description: "A clean, modern three-line metro that is the fastest way across central Athens.",
    practicalInfo: { openingHours: "Daily ~05:30–00:30; to ~02:00 Fri & Sat on Lines 2 & 3", price: "€1.20 for a 90-minute ticket covering all transfers", howToGetThere: "Lines 1 (green), 2 (red) and 3 (blue) meet at Syntagma, Monastiraki and Omonia" },
    fullDescription: "The Athens Metro is modern, clean, air-conditioned and efficient — a world away from the traffic-clogged streets above — and the fastest way to cross the city. It has three lines: Line 1 (green, the old ISAP) runs from Piraeus port up through Monastiraki and Omonia to the northern suburbs; Line 2 (red) crosses north–south through Syntagma; and Line 3 (blue) runs from the western suburbs through the centre out to the airport. The three interchange at Syntagma, Monastiraki and Omonia, putting almost every major sight within a short walk of a station — Acropoli for the Acropolis, Thissio and Monastiraki for the Agora, Kerameikos for Gazi. A standard €1.20 ticket is valid for 90 minutes with unlimited transfers across metro, tram, bus and trolleybus, so most single journeys are covered by one ticket. A lovely quirk: several stations, especially Syntagma and the newer Line 3 stops, display the ancient artefacts unearthed during their excavation, effectively free mini-museums. Trains run from around 05:30 to just after midnight, with Lines 2 and 3 extending to roughly 02:00 on Friday and Saturday nights. Validate your ticket and keep it, as inspectors levy heavy fines.",
  },
  {
    name: "The tram to the coast", slug: "tram", image: PLACEHOLDER,
    rating: 4.3, area: "Centre → Athenian Riviera", filterKeys: [],
    tip: "The tram is the cheapest, most scenic way to reach the Riviera beaches — sit on the sea side after Faliro.",
    description: "A coastal tram linking the city with the beaches of the Athenian Riviera.",
    practicalInfo: { openingHours: "Daily ~05:30–00:30 (later at weekends)", price: "€1.20 (90-minute ticket, same as the metro)", howToGetThere: "Runs from Syntagma/Neos Kosmos down the coast to Faliro, Alimos, Glyfada and Voula" },
    fullDescription: "For visitors, the tram's great value is as a beach shuttle. The network runs from the city down to the seafront and then along the Athenian Riviera, calling at the string of southern-suburb beaches — Faliro (and the SNFCC cultural centre), Alimos, and on down to cosmopolitan Glyfada and Voula — which makes it the cheapest and most relaxed way to swap the ancient sites for a swim. A journey to Glyfada takes under an hour and costs the same €1.20 as any other single ticket, valid for 90 minutes including transfers, so you can hop off the metro and onto the tram on one fare. The trams are modern and comfortable, and the coastal stretch is genuinely scenic once you reach the water, with glimpses of the sea and the marinas as you roll south. Services run from early morning until after midnight, with extended hours at weekends when Athenians head to the beach bars. It's slower than a taxi but far cheaper and stress-free, and it removes any need to drive or park on the coast. Combine it with the beaches guide to plan a low-cost day on the Riviera, and simply reverse the trip for sunset drinks back in town.",
  },
  {
    name: "Buses & trolleybuses", slug: "buses", image: PLACEHOLDER,
    rating: 4.0, area: "Citywide", filterKeys: [],
    tip: "For destinations the metro misses, buses fill the gaps — Google Maps gives reliable live routing across the network.",
    description: "An extensive network of blue buses and electric trolleybuses covering the whole city.",
    practicalInfo: { openingHours: "Roughly 05:00–24:00; limited night buses on key routes", price: "€1.20 (same 90-minute integrated ticket)", howToGetThere: "Routes blanket the city; airport express buses (X95) run 24/7" },
    fullDescription: "Athens has a dense network of city buses (blue) and electric trolleybuses (which draw power from overhead wires), reaching the many neighbourhoods and sights the three metro lines don't cover, from the foot of Lycabettus to museums along Vasilissis Sofias and the beaches on express coastal routes. They use exactly the same €1.20 integrated ticket as the metro and tram, valid for 90 minutes with free transfers, so mixing modes costs nothing extra. The trade-off is that buses share the city's notorious traffic, so they can be slow and crowded at peak times, and route information at stops is patchy — the easiest approach for visitors is to use Google Maps or the official OASA/Moovit apps, which give accurate live routing and stop names. The KTEL regional coaches (a separate system) depart from the Kifissos and Liosion terminals for destinations across mainland Greece, including day-trip spots like Delphi and Cape Sounion. Within the city, a handful of night bus routes keep running after the metro closes, useful for getting home from Gazi or the coast. Buy tickets from metro stations, kiosks (periptera) or machines before boarding and validate on entry, as on-the-spot fines apply to fare dodgers.",
  },
  {
    name: "Taxis & ride-hailing", slug: "taxis", image: PLACEHOLDER,
    rating: 4.1, area: "Citywide", filterKeys: [],
    tip: "Use the FreeNow or Uber app to get a licensed taxi with an upfront price — it avoids meter disputes and language issues.",
    description: "Athens' yellow taxis are cheap by European standards, and ride-hailing apps dispatch them at a fixed price.",
    practicalInfo: { openingHours: "24/7", price: "~€4 minimum; typical central ride €5–10; airport flat fare €40/€55", howToGetThere: "Hail yellow cabs on the street, use ranks, or book via FreeNow / Uber" },
    fullDescription: "Athens' distinctive yellow taxis are plentiful and, by Western European standards, cheap — a short hop across the centre often costs only €5–10, making them a reasonable option for groups, late nights or when you're laden with bags. They're metered (Tariff 1 by day, the pricier Tariff 2 from midnight to 05:00 and outside the city), with a modest minimum fare and small surcharges for the airport, port and luggage; the airport itself uses a fixed flat fare (about €40 by day and €55 at night) to the central zone. The catch, as in many cities, is the occasional driver who tries to overcharge tourists, take a long route or refuse the meter. The simplest fix is to use a ride-hailing app: FreeNow is the dominant player, dispatching licensed taxis with an upfront fare, while Uber in Athens also connects you to regular taxis rather than private cars. Both remove language barriers, meter disputes and the need for cash, and let you track the fare. Otherwise, use official ranks or ask your hotel to call one, insist on the meter, and carry small notes. For most sightseeing the metro is faster and far cheaper, but taxis are a handy, affordable backup.",
  },
  {
    name: "Tickets & the Ath.ena Card", slug: "tickets", image: PLACEHOLDER,
    rating: 4.4, area: "All public transport", filterKeys: [],
    tip: "A 24-hour ticket pays for itself in three or more journeys a day; the 5-day tourist ticket is great for a longer stay.",
    description: "One integrated ticket covers the metro, tram, bus and trolleybus, with day and multi-day passes available.",
    practicalInfo: { openingHours: "Buy at station machines, ticket offices and kiosks", price: "Single €1.20 (90 min); 24h €4.10; 5-day €8.20; 3-day tourist ticket €20 (incl. airport)", howToGetThere: "Load an anonymous Ath.ena Card or paper Ath.ena Ticket and validate on entry" },
    fullDescription: "Athens uses a single integrated fare system across the metro, tram, buses and trolleybuses, so one ticket type covers everything and transfers between modes are free within its validity. The building block is the 90-minute ticket at €1.20, which covers a whole journey including changes — plenty for most single trips. If you'll travel more, a 24-hour ticket (€4.10) or a 5-day ticket (€8.20) quickly pays for itself, while a dedicated 3-day tourist ticket (around €20) bundles unlimited city travel with a return airport metro/bus transfer, which can be excellent value. Note the airport is a special zone: normal city tickets don't cover the €9 airport metro fare, so buy the specific airport ticket or a tourist ticket that includes it. Fares are loaded onto the reusable, contactless Ath.ena Card or a disposable paper Ath.ena Ticket, both bought from machines and ticket offices at metro and tram stations, and from many street kiosks (periptera). Whichever you use, you must tap-validate at the gates or on-board readers at the start of every journey — inspectors are active and fines for an unvalidated or invalid ticket are steep (many times the fare). Children under six travel free, with reduced fares for students and seniors.",
  },
  {
    name: "Suburban rail & Piraeus ferries", slug: "rail-ferries", image: PLACEHOLDER,
    rating: 4.3, area: "Piraeus & wider Attica", filterKeys: [],
    tip: "Metro Line 1 runs straight to Piraeus port — perfect for catching a fast ferry to Hydra, Aegina or the Cyclades.",
    description: "Suburban rail links the airport and region, while Piraeus is the gateway to the islands by ferry.",
    practicalInfo: { openingHours: "Ferries year-round, most frequent in summer; rail daily", price: "Ferries from ~€15 (Saronic) to €40+ (Cyclades); rail varies", howToGetThere: "Metro Line 1 (green) to Piraeus; suburban rail from the airport and Corinth" },
    fullDescription: "Two further networks extend your reach from Athens. The suburban railway (Proastiakos) connects the airport, the city and wider Attica and the Peloponnese, and is useful for some day trips — for example running out towards Corinth for the canal and ancient site. But the big one for most visitors is the ferry system out of Piraeus, the largest passenger port in Europe and Athens' historic gateway to the sea. Metro Line 1 (green) runs directly from Monastiraki and the centre to Piraeus in around 20 minutes, depositing you a short walk from the ferry gates, so you don't need a taxi. From here, high-speed catamarans and conventional ferries fan out across the Aegean: the nearby Saronic islands of Aegina, Poros and gorgeous, car-free Hydra are easy day trips (roughly one to two hours on a fast boat), while larger ferries serve the Cyclades — Santorini, Mykonos, Naxos and beyond — for onward island-hopping. Rafina and Lavrio, two smaller ports east of the city, offer alternative routes to some islands. Book ferry tickets online in advance during the busy summer season, arrive at the port with time to find your gate among the many berths, and check whether your route is a fast (pricier) or conventional (slower, cheaper) service.",
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Athens", item: `${SITE}/athens` },
      { "@type": "ListItem", position: 3, name: "Transport", item: `${SITE}/athens/transport` },
    ],
  };
}

export default function AthensTransport() {
  return (
    <CityGuideShell
      citySlug="athens"
      cityName="Athens"
      categories={CATEGORIES}
      active="transport"
      crumb="Transport"
      h1="Getting Around Athens"
      heroImage="/images/athens/sevardheter/syntagmatorget.webp"
      intro="Athens is compact and walkable at its historic heart, and backed by a cheap, modern public-transport network — a clean three-line metro, a coastal tram to the beaches, extensive buses, and one integrated €1.20 ticket that covers them all. This guide explains how to get in from the airport, how to use the metro, tram and buses, when to take a taxi, which ticket saves you the most, and how to reach the islands from Piraeus."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Getting around Athens, step by step" items={ITEMS} />
    </CityGuideShell>
  );
}
