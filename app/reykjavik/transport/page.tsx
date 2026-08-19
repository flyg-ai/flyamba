import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/reykjavik-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Getting Around Reykjavík 2026 — Flybus, Buses & Car Hire",
  description:
    "How to get around Reykjavík: the Flybus from Keflavík airport, the walkable centre, Strætó city buses, rental cars for day trips, cycling and taxis, with…",
  alternates: { canonical: `${SITE}/reykjavik/transport` },
  openGraph: { title: "Getting Around Reykjavík | Flyamba", description: "Airport transfers, city buses, car hire, cycling and taxis — the complete Reykjavík transport guide.", type: "article" },
};

const IMG = "/images/reykjavik/attractions/harpa.webp";

const INFO: BcnPlace[] = [
  {
    name: "From Keflavík Airport to the city", slug: "keflavik-to-city", image: IMG, rating: 5, area: "Keflavík (KEF)",
    tip: "The Flybus is the simplest, best-value option — book a hotel-drop-off ticket and it meets every arriving flight.",
    filterKeys: [],
    description: "Keflavík airport is about 50 km from the centre; the Flybus coach makes the transfer in around 45 minutes.",
    practicalInfo: { openingHours: "Flybus meets all arriving flights, day and night", price: "Flybus ~$38 one-way to the terminal; ~$45 with hotel drop-off; taxi ~$120+", howToGetThere: "Flybus and Airport Direct coaches depart right outside arrivals to the BSÍ terminal" },
    fullDescription: "Keflavík International Airport (KEF) sits about 50 km south-west of Reykjavík, so the transfer takes a little planning. The easiest and best-value option is the Flybus (or the similar Airport Direct), a coach service that meets every arriving flight, day or night, and runs to the central BSÍ bus terminal in around 45 minutes for roughly $38 one-way; for a few dollars more you can buy a ticket that includes onward transfer by minibus to your hotel's door. There's no train in Iceland, and the public Strætó bus to the airport is slower and less convenient with luggage, so the Flybus is what most visitors use. Taxis are available but eye-wateringly expensive, at around $120 or more for the trip, so they're rarely worth it unless you're in a group and short on time. If you're renting a car, the desks are at the airport and you can drive straight into the city. A handy tip: the Blue Lagoon lies roughly midway between the airport and Reykjavík, so many travellers stop there on the way in or out, storing their luggage while they soak.",
  },
  {
    name: "Exploring the city on foot", slug: "walking", image: IMG, rating: 5, area: "City Centre",
    tip: "The centre is so compact you can walk between almost all the main sights — the longest is about 25 minutes.",
    filterKeys: [],
    description: "Reykjavík's centre is small and walkable, with most attractions within a 25-minute stroll of each other.",
    practicalInfo: { openingHours: "N/A", price: "Free", howToGetThere: "The core sights all lie within the compact central peninsula" },
    fullDescription: "The best way to get around central Reykjavík is simply on foot. The city is compact and its main sights are clustered together on the central peninsula, so you can comfortably walk between around 80 percent of the attractions — the longest stretch, from Hallgrímskirkja down to the Old Harbour, takes only about 25 minutes. Wandering the centre lets you take in the colourful corrugated-iron houses, the street art, the waterfront promenade past the Sun Voyager and Harpa, and the shops and cafés of Laugavegur and Skólavörðustígur at your own pace. It's flat enough for easy walking, though the weather is the main consideration: the wind and rain can be strong, so good waterproof clothing and sturdy shoes make all the difference. Distances only really open up when you head to outlying spots like Perlan on its hill, the Laugardalur park and pools, or the Grandi harbour museums, all of which are still walkable but better reached by bus if the weather's poor or time is tight. For the historic core, though, leave the transport aside — Reykjavík is a city made for exploring on foot, and walking is both the cheapest and the most rewarding way to see it.",
  },
  {
    name: "Strætó city buses", slug: "straeto-buses", image: IMG, rating: 5, area: "Citywide",
    tip: "Download the Klappið app to buy tickets — a single fare covers transfers within a set time window.",
    filterKeys: [],
    description: "The yellow Strætó buses cover the whole capital region, handy for outlying sights and suburbs.",
    practicalInfo: { openingHours: "Roughly 06:30–24:00 (reduced on Sundays and at night)", price: "Single ~$5; 24-hour pass ~$16; buy via the Klappið app", howToGetThere: "Routes fan out from the Hlemmur and Mjódd hubs across the capital region" },
    fullDescription: "Reykjavík's public transport is the Strætó network of bright yellow buses, which covers the whole capital region including Kópavogur, Hafnarfjörður and the route out towards Keflavík. For visitors staying in the centre it's rarely essential, since so much is walkable, but it's genuinely useful for reaching outlying attractions such as the Laugardalslaug pool and Family Park, the Perlan museum, the Grandi harbour or Nauthólsvík beach, and for getting to and from the suburbs. A single fare is around $5 and is valid for transfers within a set time window, while a 24-hour pass costs roughly $16; tickets are easiest to buy through the Klappið app, though you can also pay the exact fare in cash on board (drivers don't give change). Buses run from around 6:30am to midnight, with reduced services on Sundays and limited night buses at weekends. If you're planning to visit several paid museums and use the buses, the Reykjavík City Card bundles unlimited Strætó travel with museum entry and the city's thermal pools, and can be good value. For everyday city travel beyond the walkable core, Strætó is reliable, clean and straightforward once you have the app.",
  },
  {
    name: "Renting a car for day trips", slug: "car-hire", image: IMG, rating: 5, area: "Beyond the city",
    tip: "You don't need a car in the city, but it's the best way to explore Iceland — book early and consider a 4WD in winter.",
    filterKeys: [],
    description: "A rental car isn't needed in Reykjavík itself but is the best way to explore Iceland's nature at your own pace.",
    practicalInfo: { openingHours: "Rental desks at the airport and in the city", price: "From ~$50–80/day (2WD); 4WD and winter hire more", howToGetThere: "Pick up at Keflavík airport on arrival, or from city-centre depots" },
    fullDescription: "You don't need a car to enjoy Reykjavík itself — the centre is walkable and parking is limited and paid — but for exploring Iceland's spectacular nature, a rental car is the single best investment, giving you the freedom to see the Golden Circle, the South Coast, Snæfellsnes and beyond at your own pace, stopping wherever the landscape grabs you. Prices start from around $50 to $80 a day for a standard 2WD in summer, rising for larger vehicles, 4WDs and winter hire. A few important cautions: Iceland's weather and roads are serious, so in winter you'll want a 4WD and confidence driving on ice and snow, and the rough interior 'F-roads' to the Highlands legally require a 4WD and aren't covered by standard insurance. Always check road conditions on road.is and the forecast on vedur.is before setting out, as roads can close quickly in storms, and never underestimate Icelandic weather. Book your car well ahead, as the country's rental fleet is limited and sells out fast in high season. Fuel is expensive, so factor that in. If you'd rather not drive, organised day tours by coach cover all the classic routes. But for flexibility and the full Iceland road-trip experience, your own car is unbeatable.",
  },
  {
    name: "Cycling & the local pools", slug: "cycling", image: IMG, rating: 5, area: "Citywide",
    tip: "The compact centre and the waterfront paths make for pleasant cycling in summer — city bikes are available to hire.",
    filterKeys: [],
    description: "Reykjavík is small and relatively bike-friendly, with scenic waterfront cycle paths, best enjoyed in the milder months.",
    practicalInfo: { openingHours: "Bike hire mainly seasonal (summer)", price: "Bike hire ~$25–35/day; city-bike schemes per-ride", howToGetThere: "Hire shops in the centre; waterfront paths run around the peninsula" },
    fullDescription: "Reykjavík is small, relatively flat and increasingly bike-friendly, and cycling can be a lovely way to get around in the milder months, particularly along the scenic waterfront paths that run around the central peninsula past the Sun Voyager, Harpa and out towards Grótta and Nauthólsvík. Several shops in the centre hire bikes for around $25 to $35 a day, and there are seasonal city-bike schemes for shorter rides. The main limitation is the weather: the wind can be strong and the rain frequent, so cycling is far more appealing on a calm summer day than in a winter storm, and it's really a warm-season option for most visitors. That said, on a bright day the combination of the compact scale, the sea views and the fresh Atlantic air makes it a genuinely enjoyable way to explore, and the ride out to the geothermal beach at Nauthólsvík or the Grótta lighthouse is particularly pleasant. As with everything in Iceland, dress for changeable conditions and check the forecast. For active travellers visiting in summer who want to cover a bit more ground than walking allows while staying close to the water and the city's parks and pools, cycling is a rewarding and healthy way to see Reykjavík.",
  },
  {
    name: "Taxis & getting around at night", slug: "taxis", image: IMG, rating: 5, area: "Citywide",
    tip: "There's no Uber in Iceland — use the Hreyfill taxi app or ranks. Fares are high, so walk when you can.",
    filterKeys: [],
    description: "Taxis are reliable but expensive, and there's no Uber; the walkable centre means you rarely need one.",
    practicalInfo: { openingHours: "24h", price: "Short central trip ~$15–25; airport ~$120+", howToGetThere: "Book via the Hreyfill app or find ranks at the centre and BSÍ terminal" },
    fullDescription: "Taxis in Reykjavík are clean, safe and reliable, but they are also expensive, so most visitors use them sparingly. There are no ride-hailing apps like Uber or Bolt operating in Iceland, so you book through a local taxi company — the Hreyfill app is the most convenient — or pick one up at a rank in the centre or at the BSÍ terminal. A short hop across the compact centre typically costs around $15 to $25, while the long run out to Keflavík airport is $120 or more, which is why the Flybus is the sensible airport option. The good news is that the walkable scale of central Reykjavík means you rarely need a taxi at all: even after a night out on the Laugavegur bar-crawl, most people simply walk home, as the bars, restaurants and hotels are all within a kilometre or so of each other. The Strætó buses stop running around midnight (with limited weekend night services), so a taxi is mainly useful for late-night trips further afield, for reaching the Grandi district in bad weather, or when you're weighed down with luggage. Budget for the high fares, walk whenever the weather and distance allow, and keep the Hreyfill app handy for the occasions you do need a ride.",
  },
];

function jsonLd() {
  return {
    "@type": "BreadcrumbList",
    "@context": "https://schema.org",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Reykjavík", item: `${SITE}/reykjavik` },
      { "@type": "ListItem", position: 3, name: "Transport", item: `${SITE}/reykjavik/transport` },
    ],
  };
}

export default function ReykjavikTransport() {
  return (
    <CityGuideShell
      citySlug="reykjavik"
      cityName="Reykjavík"
      categories={CATEGORIES}
      active="transport"
      crumb="Transport"
      h1="Getting Around Reykjavík"
      heroImage={IMG}
      intro="Reykjavík is one of the easiest cities to navigate: a compact, walkable centre where almost everything is within a 25-minute stroll, backed by the Flybus from Keflavík airport, the Strætó city buses and — for exploring Iceland's nature beyond the city — rental cars and organised tours. This guide covers every option, from the 45-minute airport transfer and how the bus tickets work to car hire for day trips, cycling and when a taxi is worth it, with USD prices and money-saving tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Getting around Reykjavík — in detail" items={INFO} />
    </CityGuideShell>
  );
}
