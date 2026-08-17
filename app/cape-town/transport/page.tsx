import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/cape-town-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Getting Around Cape Town 2026 — Uber, MyCiti & Car Hire",
  description:
    "How to get around Cape Town: the airport transfer, MyCiti buses, Uber and Bolt, hire cars for the peninsula and winelands, the hop-on-hop-off bus and…",
  alternates: { canonical: `${SITE}/cape-town/transport` },
  openGraph: { title: "Getting Around Cape Town | Flyamba", description: "Airport transfers, MyCiti buses, Uber, car hire and safety tips — the complete transport guide.", type: "article" },
};

const IMG = "/images/cape-town/attractions/chapmans-peak.webp";

const INFO: BcnPlace[] = [
  {
    name: "From Cape Town Airport to the city", slug: "airport-to-city", image: IMG, rating: 5, area: "Cape Town Intl (CPT)",
    tip: "Uber or Bolt is the easiest and safest way in — order from the airport app pickup point rather than taking an unmetered taxi.",
    filterKeys: [],
    description: "Cape Town International sits about 20 km east of the centre, roughly 25–35 minutes away by road.",
    practicalInfo: { openingHours: "MyCiti airport bus ~04:20–22:00; Uber/Bolt 24h", price: "MyCiti bus ~$6; Uber/Bolt ~$11–19; metered taxi ~$14–22", howToGetThere: "The MyCiti A02 bus, Uber/Bolt and metered taxis all serve the airport" },
    fullDescription: "Cape Town International Airport (CPT) lies about 20 km east of the city centre, and there are three main ways in. The easiest and most popular for visitors is Uber or Bolt, both of which operate widely and cheaply — expect around $11 to $19 to the city or the V&A Waterfront, 25 to 35 minutes depending on traffic — booked from the app at the designated ride-hailing pickup zone. The MyCiti A02 airport bus is the budget option, running to the Civic Centre bus station in the city (from where you connect onward), taking around 35 minutes for roughly $6; you'll need a myconnect card, bought and loaded at the airport kiosk. Metered taxis are also available at a rank outside arrivals, at around $14 to $22 to the centre. For most travellers Uber or Bolt wins on ease, price and door-to-door convenience, and it avoids the hassle of unmetered touts. If you're planning to explore the Cape Peninsula and winelands, this is also the moment to consider picking up a hire car at the airport, as those areas are far easier with your own wheels.",
  },
  {
    name: "Uber & Bolt — the default choice", slug: "uber-bolt", image: IMG, rating: 5, area: "Citywide",
    tip: "Download both apps before you arrive — they're cheap, reliable and much safer than walking at night.",
    filterKeys: [],
    description: "Ride-hailing is the go-to way to get around Cape Town — cheap, plentiful and safe.",
    practicalInfo: { openingHours: "24h", price: "~$3–8 within the city; ~$14–22 to Camps Bay or the winelands edge", howToGetThere: "Order via the Uber or Bolt app; pay by card or cash" },
    fullDescription: "For getting around Cape Town, Uber and Bolt are the default choice for most visitors — cheap, plentiful, reliable and, importantly, safer than walking or hailing street taxis, especially after dark. Both apps work just as they do elsewhere, with fares that are very affordable by European or North American standards: a typical hop within the city or from the centre to the V&A Waterfront runs around $3 to $8, while longer trips out to Camps Bay, the beaches or the edge of the winelands might be $14 to $22. Because the city is spread out and public transport is limited, ride-hailing fills the gap perfectly for hopping between neighbourhoods, restaurants, bars and sights, and it's the recommended way to travel at night rather than walking, even short distances, in most areas. Download both apps before you arrive and add a payment card; having both lets you compare prices and availability, which helps at busy times or in surge pricing. Drivers are generally good, and you can track your route and share your trip for peace of mind. For day-to-day city travel, Uber and Bolt are hard to beat — just note they're less practical (and pricier) for full-day excursions to the peninsula or winelands, where a hire car or tour makes more sense.",
  },
  {
    name: "MyCiti buses & public transport", slug: "myciti-buses", image: IMG, rating: 5, area: "Central & Atlantic Seaboard",
    tip: "MyCiti is clean and reliable but only covers the centre, Waterfront, Sea Point and Camps Bay — it won't get you to most sights.",
    filterKeys: [],
    description: "The MyCiti bus network is modern and cheap but limited to the city centre and Atlantic Seaboard.",
    practicalInfo: { openingHours: "Roughly 05:00–22:00 (route-dependent)", price: "~$0.50–2.50 per trip on a myconnect card", howToGetThere: "Buy and load a myconnect card at stations; tap on and off" },
    fullDescription: "MyCiti is Cape Town's modern bus rapid-transit system, and while it's clean, safe and cheap, it's important to understand its limits: it serves the city centre, the airport, the Atlantic Seaboard (Sea Point, Camps Bay) and a few other corridors well, but it does not reach most of the attractions visitors want, such as the Cape Peninsula, Boulders Beach, Kirstenbosch or the winelands. Within its coverage area, though, it's excellent value — trips cost roughly $0.50 to $2.50 depending on distance — and a good way to travel along the coast to Camps Bay or between the centre and the Waterfront and Sea Point. You'll need a rechargeable myconnect card, bought and topped up at station kiosks and some retailers, which you tap on boarding and again when you get off. Buses are generally reliable and run roughly from early morning to mid-evening, depending on the route. Note that Cape Town's older minibus taxis (shared vans) are cheap and used by locals but can be confusing, crowded and not recommended for first-time visitors. For most tourists, MyCiti is a handy supplement for central and coastal trips, but you'll rely on Uber, Bolt or a hire car for everything beyond its network.",
  },
  {
    name: "Hiring a car for the peninsula & winelands", slug: "car-hire", image: IMG, rating: 5, area: "Peninsula, winelands & beyond",
    tip: "A hire car is all but essential for the Cape Peninsula, Boulders Beach and the winelands — South Africa drives on the left.",
    filterKeys: [],
    description: "For the Cape Peninsula, Boulders and the winelands, a hire car (or a chauffeured tour) is essentially a must.",
    practicalInfo: { openingHours: "Rental desks at the airport and city; 24h app-based hire available", price: "Compact car ~$19–32/day plus fuel; full insurance ~$11/day extra", howToGetThere: "Collect at the airport or city; drive on the left; roads are well maintained and signed in English" },
    fullDescription: "To make the most of Cape Town's surroundings — the Cape Peninsula (Cape Point, Boulders Beach, Chapman's Peak Drive), the Constantia and Stellenbosch winelands, and coastal day trips — a hire car is essentially essential, since public transport doesn't reach them and taxis add up over a full day. South Africa drives on the left, like the UK, the roads are generally well maintained and signposted in English, and a compact car costs around $19 to $32 a day plus fuel. It's strongly worth taking the full collision-damage waiver (about $11 a day extra), as the standard excess can otherwise run into hundreds of dollars. A few practical notes: fuel is often served by an attendant (tip a little); use a GPS or maps app but don't blindly follow shortcuts that route you through townships — stay on the main N1/N2 highways; keep doors locked, windows up at junctions and valuables out of sight; and never leave anything visible in a parked car. On-street parking is often overseen by informal 'car guards' in high-visibility vests, whom you tip a small amount. If you'd rather not drive, chauffeured day tours (from around $65 per person) cover the peninsula and winelands with all the logistics handled. For freedom and flexibility beyond the city, though, your own car is the way to go.",
  },
  {
    name: "Hop-on-hop-off bus & tours", slug: "hop-on-hop-off", image: IMG, rating: 5, area: "Central sights",
    tip: "The City Sightseeing red bus is a handy, safe way to link Table Mountain, the Waterfront, Camps Bay and the museums without a car.",
    filterKeys: [],
    description: "The City Sightseeing hop-on-hop-off bus links the main central attractions on flexible day tickets.",
    practicalInfo: { openingHours: "Daily ~09:00–17:00 (route-dependent)", price: "Day ticket ~$26; multi-day and combo options available", howToGetThere: "Board at the V&A Waterfront or any stop; buy online or on board" },
    fullDescription: "Cape Town's City Sightseeing hop-on-hop-off bus is a genuinely useful option for visitors without a car, linking many of the central attractions on a flexible day ticket so you can get on and off as you please. Its open-top red buses run several interlinked routes that connect the V&A Waterfront, the Table Mountain Lower Cable Station, the City Bowl and museums, Camps Bay and the Atlantic Seaboard, and (on some routes) Kirstenbosch, Constantia and the World of Birds, with recorded commentary along the way. A standard one-day ticket costs around $26, with two-day and combination tickets (including wine tours, harbour cruises or sunset trips) available, and it's a safe, easy and scenic way to cover a lot of the city's highlights without navigating or parking yourself. It works especially well for a first day of orientation, or for reaching Table Mountain and Camps Bay without the hassle of a taxi. For sights beyond its routes — the Cape Peninsula, Boulders Beach, the wider winelands, whale watching at Hermanus or a safari — you'll want an organised day tour or a hire car instead. Many visitors combine the hop-on-hop-off bus for central sightseeing with the occasional Uber and one or two full-day tours for the excursions, which covers Cape Town comfortably without needing to drive.",
  },
  {
    name: "Staying safe getting around", slug: "safety", image: IMG, rating: 5, area: "Citywide",
    tip: "Tourist areas are fine by day; use Uber/Bolt at night, keep valuables hidden and don't walk alone after dark outside safe zones.",
    filterKeys: [],
    description: "Cape Town is safer than its reputation suggests in tourist areas, but street smarts matter, especially at night.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Safe zones include the V&A Waterfront, Camps Bay, Sea Point, Constantia and the central sights by day" },
    fullDescription: "Cape Town is safer than many people fear, but it does require street sense, particularly around transport. Tourist areas such as the V&A Waterfront, Camps Bay, Sea Point, Constantia and the central sights are generally comparable to any big city by day, and the main risk is opportunistic theft rather than anything worse. The golden rules: use Uber or Bolt rather than walking after dark, even for short distances outside the busy, well-lit zones; don't display smartphones, cameras, jewellery or large amounts of cash in the open; keep car doors locked and windows up, and never leave valuables visible in a parked vehicle; and be alert at ATMs and quiet streets. Incidents rarely happen inside restaurants or bars — the vulnerable moments are in transit between places, which is exactly why ride-hailing is recommended at night. If you're driving, stick to the main highways and don't let a navigation app route you through townships as a 'shortcut'. Check current travel advice before you go, and trust your instincts about areas and situations. With these sensible precautions, most visitors experience Cape Town without any trouble at all and travel around the city and its surroundings comfortably and safely.",
  },
];

function jsonLd() {
  return {
    "@type": "BreadcrumbList",
    "@context": "https://schema.org",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Cape Town", item: `${SITE}/cape-town` },
      { "@type": "ListItem", position: 3, name: "Transport", item: `${SITE}/cape-town/transport` },
    ],
  };
}

export default function CapeTownTransport() {
  return (
    <CityGuideShell
      citySlug="cape-town"
      cityName="Cape Town"
      categories={CATEGORIES}
      active="transport"
      crumb="Transport"
      h1="Getting Around Cape Town"
      heroImage={IMG}
      intro="Cape Town is a spread-out city, so getting around takes a little more planning than a compact European capital. This guide covers every option — the airport transfer, the go-to Uber and Bolt ride-hailing apps, the modern MyCiti bus network, hiring a car for the Cape Peninsula and winelands, and the hop-on-hop-off sightseeing bus — plus the safety tips that make travelling around the city easy and stress-free, with prices in USD."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Getting around Cape Town — in detail" items={INFO} />
    </CityGuideShell>
  );
}
