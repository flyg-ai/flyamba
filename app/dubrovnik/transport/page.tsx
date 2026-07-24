import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/dubrovnik-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Getting Around Dubrovnik 2026 — Transport Guide | Flyamba",
  description:
    "How to get around Dubrovnik — the airport shuttle bus and taxi from DBV, the car-free Old Town on foot, Libertas city buses, the Gruž ferry port, the Lokrum and Cavtat boats, the Srđ cable car, and taxis, with real routes and euro fares.",
  alternates: { canonical: `${SITE}/dubrovnik/transport` },
  openGraph: { title: "Getting Around Dubrovnik | Flyamba", description: "Dubrovnik transport explained: airport, buses, ferries, cable car and taxis, with fares.", type: "article" },
};

const INFO_IMG = "/images/barcelona/placeholder.webp";

const TRANSPORT: BcnPlace[] = [
  {
    name: "Dubrovnik Airport (DBV) to the city", slug: "dubrovnik-airport", image: INFO_IMG,
    rating: 4.2, reviewCount: 0, area: "Airport transfer",
    tip: "The official airport shuttle bus is the simplest, cheapest way in — it meets every flight and stops at both the Old Town (Pile) and Gruž harbour.",
    filterKeys: [],
    description: "Dubrovnik's airport is 20 km south-east at Čilipi, linked to the Old Town and Gruž by a coordinated shuttle bus, local buses and taxis.",
    practicalInfo: { openingHours: "Shuttles meet arriving flights; taxis 24h", price: "Airport shuttle ~€10 one-way; taxi ~€35–40; local bus cheaper", howToGetThere: "Shuttle bus to Pile Gate & Gruž in 30–40 min; taxi/private transfer door-to-door" },
    fullDescription: "Dubrovnik Airport (DBV), also known as Čilipi, lies about 20 kilometres south-east of the city near Cavtat, and getting into town is straightforward. The most popular option is the official Atlas/Platanus airport shuttle bus, which is coordinated with flight arrivals and departures and runs to the city in around 30–40 minutes for roughly €10 one-way (a little less return); crucially it stops at both the main bus station at Gruž harbour and, on most services, near Pile Gate at the western entrance to the Old Town, covering the two areas most visitors need. Tickets are bought from the driver or a desk in the terminal. For the return journey, the shuttle departs from Gruž bus station about 2–2.5 hours before flight departures. A taxi from the airport to the Old Town costs around €35–40 for the roughly 30-minute drive and makes sense for groups, late arrivals or those with lots of luggage — use the official rank and, ideally, agree the fare first. Pre-booked private transfers and ride-hailing are also available and can be good value for families. Budget travellers can, with more effort and time, use the cheaper local Libertas bus (route 11 or others) that serves the airport, though services are less frequent and less convenient with bags. Whichever you choose, note the Old Town itself is entirely pedestrian, so any vehicle will drop you at a gate, from where you continue on foot.",
  },
  {
    name: "Exploring the Old Town on foot", slug: "old-town-on-foot", image: INFO_IMG,
    rating: 4.8, reviewCount: 0, area: "Getting around",
    tip: "The walled Old Town is completely car-free — wear comfortable shoes for the polished limestone and countless steps, and expect to walk everywhere within it.",
    filterKeys: [],
    description: "Dubrovnik's Old Town is entirely pedestrian, so walking is the only way around inside the walls — and much of the city is best seen on foot.",
    practicalInfo: { openingHours: "Always accessible", price: "Free", howToGetThere: "Enter via Pile Gate (west), Ploče Gate (east) or the Buža Gate; all traffic-free inside" },
    fullDescription: "Within the walls, Dubrovnik is one of Europe's great walking cities: the entire Old Town is completely closed to traffic, so exploring on foot is not just the best way around but the only way. The main artery is Stradun, the flat, polished-limestone street running dead straight between Pile Gate in the west and Ploče Gate in the east, off which climb dozens of narrow, stepped lanes rising steeply towards the southern and northern walls. This means two things for visitors: first, that the historic core is compact and everything — the cathedral, palaces, churches, museums, restaurants and the wall-walk entrance — is within a few minutes' stroll; and second, that you should come prepared for a lot of walking and a great many steps, often uneven and worn smooth (and slippery when wet), so comfortable, grippy footwear is essential and the maze of stairways can be challenging for those with mobility difficulties, wheelchairs or heavy luggage. There is no vehicle access inside, so if you are staying within the walls you will carry your bags over the cobbles from the nearest gate. The pedestrianised environment is a joy, though — no traffic noise or fumes, just the sound of footsteps and café chatter echoing off the stone — and getting pleasantly lost in the upper lanes, away from the Stradun crowds, is one of the real pleasures of the city. Beyond the Old Town, the coastal areas of Ploče and Lapad are also walkable, connected by scenic seafront paths, though for these and the bus stations you will want the city buses.",
  },
  {
    name: "Libertas city buses", slug: "libertas-buses", image: INFO_IMG,
    rating: 4.0, reviewCount: 0, area: "Getting around",
    tip: "Buy tickets from a kiosk (Tisak) or the driver — it's cheaper from the kiosk. Pile Gate is the main hub; key routes serve Lapad, Gruž and Cavtat.",
    filterKeys: [],
    description: "Dubrovnik's orange Libertas buses connect the Old Town gates with Lapad, Gruž harbour, the beaches and Cavtat, filling the gaps beyond walking distance.",
    practicalInfo: { openingHours: "Roughly 05:00–02:00 depending on route (night buses on some lines)", price: "Single ~€2 from a kiosk, ~€2.50 from the driver; day pass available", howToGetThere: "Main hub at Pile Gate; routes 1A/1B/3/8 to Gruž & Lapad, 6 to Babin Kuk, 10 to Cavtat" },
    fullDescription: "Beyond the car-free Old Town, Dubrovnik's public transport is run by Libertas, whose fleet of orange buses connects the historic centre with the outer districts, harbour, beaches and nearby towns, and is genuinely useful for anything beyond walking distance. The main hub is the terminus just outside Pile Gate at the western entrance to the Old Town, from where routes fan out across the city, with the other big interchange at the Gruž bus and ferry station. Among the most useful routes for visitors: lines 1A, 1B, 3 and 8 link Pile with Gruž harbour (for the ferries and the main bus station); line 6 runs to the Lapad and Babin Kuk peninsula for the Copacabana and Lapad beaches and many mid-range hotels; and line 10 heads south to charming Cavtat. A single ticket costs around €2 if bought in advance from a Tisak newsstand or kiosk, or about €2.50 if bought from the driver (exact change helps), and is validated on board; day passes offer value if you ride several times. Services are frequent in season and run from early morning until around midnight or later, with some night buses. Buses can get very crowded in peak summer, particularly on the popular Pile–Lapad and beach routes, and traffic on the narrow coast road can slow journeys, so allow extra time. Real-time information and route planning are easiest via Google Maps. For families or groups making several trips, or in the heat, taxis can be a worthwhile alternative, but for budget-conscious travellers the Libertas network covers all the essentials efficiently and cheaply.",
  },
  {
    name: "Gruž ferry & catamaran port", slug: "gruz-port", image: INFO_IMG,
    rating: 4.1, reviewCount: 0, area: "Ferries & boats",
    tip: "Gruž, about 3 km from the Old Town, is the hub for Jadrolinija and Krilo ferries to the Elaphiti islands, Mljet, Korčula, Hvar and Split — and where the big cruise ships dock.",
    filterKeys: [],
    description: "Dubrovnik's main port at Gruž handles the island ferries, coastal catamarans and cruise ships, linked to the Old Town by frequent buses.",
    practicalInfo: { openingHours: "Sailings mostly daytime; timetables seasonal (more in summer)", price: "Elaphiti ferry €6–10; catamaran to Mljet/Korčula/Hvar/Split €15–40", howToGetThere: "Gruž harbour, ~3 km NW of the Old Town; buses 1A/1B/3/8 from Pile in ~10 min" },
    fullDescription: "Gruž, the deep natural harbour about three kilometres north-west of the Old Town, is Dubrovnik's main port and the departure point for almost all scheduled boat travel, so anyone planning island trips or coastal hops will get to know it. From here the national ferry company Jadrolinija and the fast catamaran operator Krilo (Kapetan Luka) run services to a range of destinations: local ferries to the car-free Elaphiti islands of Koločep, Lopud and Šipan (a cheap €6–10 and a lovely trip in itself); fast catamarans up the coast to the green island of Mljet, to Korčula, to Hvar and to Split (roughly €15–40 depending on distance and season); and international sailings, in season, across to Bari in Italy. Timetables are heavily seasonal, with far more sailings from June to September than in winter, and popular summer catamarans can sell out, so booking ahead online is wise for peak dates. Gruž is also where the large cruise ships dock, disgorging the day-trippers whose arrival (roughly 11:00–15:00) so affects the Old Town's crowds — a good reason to time your own wall walk for early or late. The port has the city's main long-distance bus station alongside it, for coaches to Split, Zagreb, Kotor and Mostar, plus car-hire desks, cafés and a lively morning market. It is well connected to the Old Town by frequent Libertas buses (1A, 1B, 3, 8) in about ten minutes, or a €10–15 taxi. Allow time to find the right berth, as the harbour is spread out.",
  },
  {
    name: "Lokrum, Cavtat & panorama boats", slug: "small-boats", image: INFO_IMG,
    rating: 4.4, reviewCount: 0, area: "Local boats",
    tip: "The Lokrum ferry leaves from the Old Town harbour (not Gruž) every 30 minutes; sunset cruises and the Cavtat boat shuttle also depart from here in summer.",
    filterKeys: [],
    description: "Small passenger boats from the Old Town's own harbour serve nearby Lokrum island, Cavtat and scenic sunset cruises around the walls.",
    practicalInfo: { openingHours: "Lokrum boats every ~30 min in season, last back ~19:00; cruises evenings", price: "Lokrum €27 return; sunset cruise ~€25; Cavtat boat shuttle ~€12", howToGetThere: "Depart the Old Town Harbour (Stara luka) through Ploče Gate, past St John Fortress" },
    fullDescription: "Separate from the big ferries at Gruž, a fleet of small passenger boats operates from Dubrovnik's own picturesque Old Town harbour (Stara luka), tucked in the north-eastern corner of the walled city just through Ploče Gate, and these handle the shortest and most scenic local trips. The most popular is the regular ferry to Lokrum, the lush green island just 600 metres offshore: boats cross in about ten minutes and run every half hour or so through the season, with a €27 return ticket that includes island entry, and the last boat back leaving around 19:00 in summer (so watch the time). Also from here depart the many sunset and panorama cruises — typically 1.5-hour trips gliding along the base of the city walls and around Lokrum with the low sun turning the stone gold, often including a drink for around €25 per person — as well as, in summer, a boat shuttle down the coast to the pretty town of Cavtat (about €12), a more scenic alternative to the number 10 bus. The harbour is also the launch point for guided sea-kayaking tours and small-group speedboat excursions to the Elaphiti islands and the Blue Cave. Because these boats leave from within the Old Town itself rather than from distant Gruž, they are wonderfully convenient — you simply walk out through the ancient gate to the quayside. Buy tickets from the booths and touts along the harbour, comparing a couple for the cruises, and note that rough weather can disrupt sailings. Finally, the Srđ cable car, though not a boat, is the other iconic short local ride, whisking you 778 m up the mountain in four minutes for the definitive view.",
  },
  {
    name: "Taxis, transfers & car hire", slug: "taxis-car-hire", image: INFO_IMG,
    rating: 3.9, reviewCount: 0, area: "Getting around",
    tip: "Uber and Bolt both operate in Dubrovnik and are often cheaper and clearer than street taxis — handy for the airport, Gruž and late nights.",
    filterKeys: [],
    description: "Metered taxis plus Uber and Bolt cover door-to-door trips, while a hire car is useful for day trips but a liability in the car-free centre.",
    practicalInfo: { openingHours: "24 hours", price: "Taxi start ~€5 + ~€1.50/km; airport ~€35–40; Uber/Bolt often cheaper", howToGetThere: "Taxi ranks at Pile, Ploče & Gruž; Uber/Bolt via app; car-hire desks at the airport & Gruž" },
    fullDescription: "For door-to-door journeys, trips with luggage, late nights or reaching spots off the bus network, taxis and ride-hailing are handy in Dubrovnik. Licensed taxis wait at ranks by the Old Town gates (Pile and Ploče) and at Gruž harbour and the airport; they run on a meter with a starting charge of around €5 plus roughly €1.50 per kilometre, so a hop from Gruž to Pile runs €10–15 and the airport around €35–40 — agree or confirm the basis of the fare before setting off. A big advantage in Dubrovnik is that both Uber and Bolt operate here, summoned via their apps with upfront, transparent pricing that is often cheaper than a street taxi and avoids any haggling, making them a popular choice for airport runs and evenings out. Pre-booked private transfers are also widely available and good value for families or groups arriving late. A hire car, by contrast, needs careful thought: it is genuinely useful — sometimes essential — for the flexible self-drive day trips to the Pelješac peninsula, Ston, the Konavle countryside or across the border to Montenegro, but it is a positive liability in the city itself, where the Old Town is entirely pedestrian, parking is scarce and expensive, and the coastal roads are congested in summer. If you do hire, pick the car up at the airport or Gruž for the trips that need it rather than keeping it parked at premium rates while you explore on foot, and check that your insurance and any green-card requirements cover Montenegro or Bosnia if you plan to cross borders. For most city-based visitors, a mix of walking, the occasional bus and app-based rides covers everything without the cost and hassle of a car.",
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Dubrovnik", item: `${SITE}/dubrovnik` },
      { "@type": "ListItem", position: 3, name: "Transport", item: `${SITE}/dubrovnik/transport` },
    ],
  };
}

export default function DubrovnikTransport() {
  return (
    <CityGuideShell
      citySlug="dubrovnik"
      cityName="Dubrovnik"
      categories={CATEGORIES}
      active="transport"
      crumb="Transport"
      h1="Getting Around Dubrovnik"
      heroImage="/images/dubrovnik/attractions/pile-gate.webp"
      intro="Dubrovnik is a compact, walker's city — its walled Old Town is entirely car-free, and much of what you'll want to see is within a few minutes' stroll. But you'll still need to know your options: how to get in from the airport, how the orange Libertas buses connect the outer districts and beaches, how the ferries and small boats work from Gruž and the Old Town harbour, when the cable car and Lokrum boats run, and whether a taxi, Uber or hire car makes sense. This guide covers it all, with real routes and euro fares."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Dubrovnik transport explained" items={TRANSPORT} />
    </CityGuideShell>
  );
}
