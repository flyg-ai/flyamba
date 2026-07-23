import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/lisbon-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Getting Around Lisbon 2026 — Transport Guide | Flyamba",
  description:
    "How to get around Lisbon — from the airport, the Metro, historic trams and funiculars, buses, taxis, Uber and Bolt, plus CP trains to Cascais and Sintra, with fares in euros and the Navegante card.",
  alternates: { canonical: `${SITE}/lisbon/transport` },
  openGraph: { title: "Getting Around Lisbon | Flyamba", description: "Metro, trams, funiculars, trains and taxis in Lisbon.", type: "article" },
};

const TRANSPORT: BcnPlace[] = [
  {
    name: "From Lisbon Airport (LIS)", slug: "airport", image: "/images/lisbon/sevardheter/praa-do-comrcio.webp",
    rating: 4.3, area: "Humberto Delgado Airport", filterKeys: [],
    tip: "Ignore drivers touting inside the terminal — use the official taxi rank outside or book a Bolt/Uber, which is usually cheaper.",
    description: "Lisbon's airport is unusually close to the centre, with Metro, bus and taxi all quick and cheap.",
    practicalInfo: { openingHours: "Metro red line ~06:30–01:00", price: "Metro €1.85 + €0.50 card; taxi/Uber ~€12–18 to the centre", howToGetThere: "Metro red line to Alameda/Saldanha (change for other lines); or taxi/Bolt/Uber" },
    fullDescription: "One of Lisbon's practical joys is how close the airport sits to the city — Humberto Delgado Airport (LIS) is just 7 km north of the centre, so transfers are quick and cheap. The Metro's red line runs directly from the airport terminal and reaches the central hubs of Saldanha and Alameda (where you change for the other colour lines) in around 20 minutes for just €1.85 plus a €0.50 reusable Navegante card — comfortably the cheapest option, though it involves a change or two and stairs with luggage. Taxis and ride-hailing apps (Bolt and Uber, both widely available) are the easiest door-to-door choice, costing roughly €12–18 to the centre and taking 15–25 minutes depending on traffic; the official metered taxi rank is outside arrivals. The dedicated Aerobus express service has been discontinued, but regular Carris city buses (such as the 744 and 783) also serve the airport at the standard €1.85 fare. For most visitors with normal luggage, a Bolt or Uber offers the best balance of price and convenience, while solo travellers travelling light will find the Metro unbeatable value.",
  },
  {
    name: "The Metro", slug: "metro", image: "/images/lisbon/sevardheter/praa-do-comrcio.webp",
    rating: 4.4, area: "Citywide", filterKeys: [],
    tip: "Buy a rechargeable Navegante Occasional card (€0.50) and load a 24-hour ticket — it pays for itself in three rides.",
    description: "Lisbon's clean, efficient four-line Metro is the fastest way to cover longer distances across the city.",
    practicalInfo: { openingHours: "Daily 06:30–01:00", price: "Single €1.85; 24h unlimited €6.80; Navegante card €0.50", howToGetThere: "Four lines — blue, yellow, green, red — meeting at central interchange stations" },
    fullDescription: "The Lisbon Metro is modern, clean, safe and easy to use, and although the historic centre is compact enough to walk, the Metro is the quickest way to cross the city or reach outer districts. It has four colour-coded lines — blue (Azul), yellow (Amarela), green (Verde) and red (Vermelha) — that interconnect at central stations like Baixa-Chiado, Marquês de Pombal, Alameda and São Sebastião, and serve key points including the airport (red), Rossio and the Baixa (blue/green), Parque das Nações/Oriente (red) and the Gulbenkian (blue). Trains run from about 06:30 until 01:00 daily. Fares are paid via the rechargeable Navegante Occasional card, which costs €0.50 to buy and is then loaded with either single 'zapping' rides (€1.85 each) or a 24-hour unlimited ticket (€6.80) that also covers buses, trams and funiculars — excellent value if you plan to move around. Note that many stations have stairs and escalators but not always lifts, and that some Metro stations, particularly on the busiest central stretches, attract pickpockets, so keep bags secure in crowds. Several stations are also worth seeing for their artistic azulejo tilework.",
  },
  {
    name: "Historic Trams (incl. Tram 28)", slug: "trams", image: "/images/lisbon/sevardheter/tram-28.webp",
    rating: 4.5, area: "Central hills", filterKeys: [],
    tip: "Use trams for hills and sightseeing, the Metro for distance — and always tap a card rather than paying the higher onboard fare.",
    description: "Lisbon's vintage yellow trams double as transport and sightseeing, climbing hills no bus could manage.",
    practicalInfo: { openingHours: "Daily ~06:00–22:30, every 10–15 min", price: "€3.20 onboard; €1.85 with a Navegante card", howToGetThere: "Key lines 28E (Graça–Estrela), 12E, 15E (to Belém), 25E; termini at Martim Moniz, Camões, Praça da Figueira" },
    fullDescription: "Lisbon's trams are both a genuine part of the transport network and an attraction in their own right. The star is line 28E, whose fleet of beautifully preserved 1930s wooden trams grinds up impossibly steep, narrow lanes through Graça, Alfama, Baixa, Chiado, Bairro Alto and Estrela — effectively a scenic city tour for the price of a ticket. Line 12E loops around the castle hill, while the modern line 15E runs west along the river to Belém and its monuments, and line 25E serves Lapa and Estrela. Trams run roughly every 10–15 minutes from early morning until about 22:30. Paying onboard costs €3.20, but tapping a rechargeable Navegante card drops the fare to €1.85, and a 24-hour ticket covers unlimited tram travel. The catch with the famous 28 is its popularity: from mid-morning the small carriages are jammed with tourists and worked by pickpockets, so board early at a terminus such as Martim Moniz or Praça Luís de Camões to get a seat, keep valuables zipped and in front of you, and consider riding just a stretch. For the hills, though, nothing beats them.",
  },
  {
    name: "Funiculars & the Santa Justa Lift", slug: "funiculars", image: "/images/lisbon/sevardheter/elevador-de-santa-justa.webp",
    rating: 4.3, area: "Central", filterKeys: [],
    tip: "The funiculars and the Santa Justa lift are all included on a 24-hour Navegante ticket — no need to pay separately.",
    description: "Historic funiculars and a wrought-iron lift spare you Lisbon's steepest climbs, and are covered by day tickets.",
    practicalInfo: { openingHours: "Funiculars ~07:00–23:00; Santa Justa lift ~07:00–22:00", price: "€3.80 return onboard, or free with a 24h Navegante ticket", howToGetThere: "Glória (Restauradores–Bairro Alto), Bica (Cais do Sodré area), Lavra; Santa Justa lift off Rua do Ouro" },
    fullDescription: "In a city built on seven hills, Lisbon's funiculars (elevadores) and street lift are a charming and genuinely useful way to avoid the steepest climbs — and, like the trams, they're historic monuments in their own right. Three vintage funiculars haul passengers up sharp gradients: the Ascensor da Glória links Restauradores with the Bairro Alto and the São Pedro de Alcântara viewpoint; the picturesque Ascensor da Bica climbs a flower-draped lane near Cais do Sodré; and the Ascensor do Lavra is the oldest, dating from 1884. The Elevador de Santa Justa, a neo-Gothic wrought-iron tower from 1902, connects the low Baixa to the Largo do Carmo above and offers a viewing platform at the top. Paying onboard is relatively pricey (around €3.80 return for the funiculars, €5.30 for the Santa Justa lift), but all of them are included free on a 24-hour Navegante ticket, so if you already have one, use them freely. For the Santa Justa lift specifically, you can also reach the top viewpoint on foot for free from Chiado and skip the queue, paying only a small fee for the walkway if you wish.",
  },
  {
    name: "Buses (Carris)", slug: "buses", image: "/images/lisbon/sevardheter/praa-do-comrcio.webp",
    rating: 4.1, area: "Citywide", filterKeys: [],
    tip: "Buses reach the spots the Metro and trams miss — like the Gulbenkian gardens or the Belém back streets — and take the same card.",
    description: "The extensive Carris bus network fills the gaps, reaching neighbourhoods the Metro and trams don't.",
    practicalInfo: { openingHours: "Roughly 05:00–00:30; night buses on main routes", price: "€2.10 onboard; €1.85 with a Navegante card", howToGetThere: "Citywide Carris routes; enter at the front and tap your card" },
    fullDescription: "The Carris bus network is the workhorse of Lisbon public transport, with hundreds of routes reaching every corner of the city, including many neighbourhoods, viewpoints and attractions that the Metro and tram lines don't cover — handy for places like the outer museums, residential districts and parts of Belém. Buses generally run from around 5am to just after midnight, with a reduced network of night buses (Rede da Madrugada) on the main corridors afterwards. As with everything on the network, it's cheaper to tap a rechargeable Navegante card (€1.85 a ride) than to pay the €2.10 onboard cash fare, and a 24-hour ticket covers unlimited bus travel alongside the Metro, trams and funiculars. Enter at the front door and tap your card on the reader; stops are request-based, so signal the driver. Modern buses are increasingly accessible with low floors and ramps, useful given Lisbon's hills. Google Maps and the Carris app both give reliable real-time routing. While most visitors rely on the Metro and trams in the centre, knowing the bus network exists opens up the rest of the city cheaply and easily, especially for reaching gardens, viewpoints and sights off the tourist tram routes.",
  },
  {
    name: "CP Trains to Cascais & Sintra", slug: "cp-trains", image: "/images/lisbon/dagsutflykter/cascais-estoril.webp",
    rating: 4.5, area: "Coast & Sintra", filterKeys: [],
    tip: "The Cascais line hugs the coast — sit on the left for sea views — and both lines are cheap enough to be a bargain day out.",
    description: "Frequent, cheap suburban trains link Lisbon to the beaches of Cascais and the palaces of Sintra in about 40 minutes.",
    practicalInfo: { openingHours: "Roughly 05:30–01:30, every 15–30 min", price: "~€2.40 each way to Cascais or Sintra", howToGetThere: "Cascais line from Cais do Sodré; Sintra line from Rossio (or Oriente)" },
    fullDescription: "Two of Lisbon's best experiences — the Atlantic coast and the fairytale hills of Sintra — are reached on cheap, frequent suburban trains run by CP (Comboios de Portugal), making a car entirely unnecessary. The Cascais line departs from the riverside Cais do Sodré station and runs west along the coast for about 40 minutes, calling at the beaches of Carcavelos, the resort of Estoril (Praia do Tamariz) and finishing at the chic town of Cascais, hugging the shoreline much of the way — sit on the left for the sea views. The Sintra line leaves from the beautiful Rossio station (and also Oriente) in the centre and reaches Sintra in around 40 minutes, from where local buses (434/435), tuk-tuks or taxis climb to the palaces. Both lines run roughly every 15–30 minutes from early morning until after midnight, and cost only about €2.40 each way, payable with the same rechargeable Navegante card (loaded with 'zapping' credit) used across the city. This combination of low cost, high frequency and short journey times is what makes Sintra and Cascais such easy, rewarding day trips — no tour or car hire required, just turn up at the station.",
  },
  {
    name: "Taxis, Uber & Bolt", slug: "taxis", image: "/images/lisbon/sevardheter/praa-do-comrcio.webp",
    rating: 4.2, area: "Citywide", filterKeys: [],
    tip: "Ride-hailing apps are usually cheaper and clearer than metered taxis — and spare you the language and change hassle.",
    description: "Metered cream taxis and the ride-hailing apps Uber and Bolt are cheap by European standards and widely available.",
    practicalInfo: { openingHours: "24 hours", price: "Short city ride ~€6–10; airport to centre ~€12–18", howToGetThere: "Hail cream taxis, use ranks, or book via the Uber/Bolt/FreeNow apps" },
    fullDescription: "Taxis and ride-hailing are affordable in Lisbon compared with most Western European capitals, and useful for late nights, luggage, the airport or the steep climbs the trams don't cover. The city's traditional taxis are cream-coloured (some older ones black-and-green), metered and regulated; a typical short ride across the centre costs around €6–10, with small supplements for luggage and night-time travel. However, most visitors find the ride-hailing apps — Uber, Bolt and FreeNow are all widely used — simpler and often cheaper, since the fare is fixed and shown upfront, there's no cash or language barrier, and you avoid the occasional meter dispute. Bolt in particular tends to be the cheapest. From the airport to the centre expect roughly €12–18 by any of them. Cars are plentiful in the central and touristy areas, though waits can lengthen on weekend nights when the bars empty. As anywhere, use the official taxi ranks rather than accepting rides from touts, insist the meter is running in a metered taxi, and for ride-hailing simply confirm the number plate matches the app. For groups or those with heavy bags, splitting a car is often little more than the combined public-transport fares.",
  },
  {
    name: "The Navegante Card & Tickets", slug: "navegante-card", image: "/images/lisbon/sevardheter/praa-do-comrcio.webp",
    rating: 4.3, area: "Citywide", filterKeys: [],
    tip: "One reusable card per person covers Metro, trams, buses, funiculars and even the CP trains — buy it at any Metro machine on arrival.",
    description: "A single reusable smartcard covers almost all Lisbon transport — the key to travelling cheaply across the city.",
    practicalInfo: { openingHours: "Machines at all Metro stations", price: "Card €0.50; 24h unlimited €6.80; single 'zapping' €1.85", howToGetThere: "Buy and top up at Metro ticket machines, staffed desks and CP stations" },
    fullDescription: "The single most useful thing to do on arriving in Lisbon is buy a Navegante Occasional card — a reusable green smartcard that works across virtually the entire transport network and saves you money and hassle. The card itself costs just €0.50 from any Metro ticket machine (which have English menus), after which you load it in one of two ways. 'Zapping' credit deducts a discounted single fare each time you tap — €1.85 on the Metro, trams, buses and funiculars, and roughly €2.40 on the CP trains to Cascais and Sintra — ideal if you travel occasionally. Alternatively, a 24-hour unlimited ticket (€6.80) covers unlimited rides on the Metro, buses, trams and funiculars for a full day, paying for itself in just three or four journeys — the best choice for busy sightseeing days. Note you can't share a single card between two people on the same journey (each traveller needs their own), and that zapping credit and 24-hour passes are stored separately. There's also the tourist-focused Lisboa Card, which bundles unlimited transport with free or discounted entry to many attractions — worth comparing if you plan to visit several paid sights. For most visitors, though, a simple Navegante card topped up as needed is all you require.",
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Lisbon", item: `${SITE}/lisbon` },
      { "@type": "ListItem", position: 3, name: "Transport", item: `${SITE}/lisbon/transport` },
    ],
  };
}

export default function LisbonTransport() {
  return (
    <CityGuideShell
      citySlug="lisbon"
      cityName="Lisbon"
      categories={CATEGORIES}
      active="transport"
      crumb="Transport"
      h1="Getting Around Lisbon"
      heroImage="/images/lisbon/sevardheter/tram-28.webp"
      intro="Lisbon is a wonderfully walkable city, but its seven hills, cobbled lanes and scattered sights mean you'll want the transport network too — and it's cheap, characterful and easy. From the Metro and the historic yellow trams to funiculars, buses, ride-hailing apps and the coastal trains out to Cascais and Sintra, here's everything you need to get around, including fares in euros and the reusable card that ties it all together."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Getting around Lisbon in detail" items={TRANSPORT} />
    </CityGuideShell>
  );
}
