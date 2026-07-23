import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { BANGKOK_CATEGORIES } from "@/app/lib/bangkok";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Getting Around Bangkok 2026 — Transport Guide | Flyamba",
  description:
    "How to get around Bangkok — the BTS Skytrain, MRT subway, Airport Rail Link, Chao Phraya river boats, tuk-tuks, taxis and the Grab app, with fares and practical tips.",
  alternates: { canonical: `${SITE}/bangkok/transport` },
  openGraph: { title: "Getting Around Bangkok | Flyamba", description: "BTS, MRT, boats, tuk-tuks and Grab explained.", type: "article" },
};

const IMG = "/images/bangkok/sevardheter/chao-phraya-river-cruise.webp";

const TRANSPORT: BcnPlace[] = [
  {
    name: "BTS Skytrain", slug: "bts-skytrain", image: IMG, rating: 4.6, area: "Citywide (elevated)",
    tip: "Buy a stored-value Rabbit card to skip the ticket-machine queues, and use the elevated walkways to hop between stations and malls.",
    filterKeys: [], description: "Bangkok's elevated Skytrain, the fastest way to beat the traffic across the modern city.",
    practicalInfo: { openingHours: "Daily ~06:00–24:00; trains every few minutes", price: "Fares roughly ฿17–62 by distance; day passes available", howToGetThere: "Sukhumvit and Silom lines interchange at Siam; connects to the MRT and Airport Rail Link" },
    fullDescription: "The BTS Skytrain is the backbone of getting around modern Bangkok and the single best way to dodge the city's legendary traffic. Its two main lines — the Sukhumvit line running north–south and east, and the Silom line crossing it — meet at the central Siam interchange, linking most of the areas visitors care about: the Siam and Ratchaprasong shopping districts, the Sukhumvit hotel-and-nightlife strip, Silom and Sathorn, Chatuchak in the north, and Saphan Taksin by the river for boat connections. Trains are frequent, fast, air-conditioned and spotlessly clean, running from around 6am to midnight. You can buy single-journey tokens from machines at each station, but if you're staying more than a day or two, a stored-value Rabbit card saves time and fuss, and one-day passes exist for heavy users. Fares are cheap, rising modestly with distance. Stations connect to elevated walkways that let you stroll between malls and skywalks above the traffic, and to the MRT subway and the Airport Rail Link at key points. Avoid the crush of morning and evening rush hours if you can. For most sightseeing across the newer city, the BTS is your first choice.",
  },
  {
    name: "MRT Subway", slug: "mrt-subway", image: IMG, rating: 4.5, area: "Citywide (underground)",
    tip: "The Blue Line now reaches Chinatown (Wat Mangkon) and the old town (Sanam Chai) — a game-changer for reaching the temples.",
    filterKeys: [], description: "Bangkok's underground metro, complementing the Skytrain and reaching the old city and Chinatown.",
    practicalInfo: { openingHours: "Daily ~06:00–24:00", price: "Fares roughly ฿17–45 by distance; separate tickets from the BTS", howToGetThere: "Interchanges with the BTS at Sukhumvit/Asok, Sala Daeng/Silom and Chatuchak/Mo Chit" },
    fullDescription: "The MRT is Bangkok's underground metro and the perfect partner to the elevated BTS, together covering most of the city between them. Its circular Blue Line is especially useful for visitors: recent extensions finally brought fast, air-conditioned rail into the historic heart of the city, with beautifully decorated stations at Wat Mangkon in Chinatown and Sanam Chai near the Grand Palace and Wat Pho — sights that were previously awkward to reach. The MRT also serves Lumphini Park, the Queen Sirikit convention centre, Hua Lamphong (the old central railway station) and interchanges neatly with the Skytrain at Asok/Sukhumvit, Sala Daeng/Silom and Chatuchak/Mo Chit, letting you combine the two networks for almost any journey. Note that the MRT and BTS are run by different operators, so you buy separate tickets — MRT single journeys use plastic tokens from the machines, with fares as cheap as the Skytrain's. Trains are frequent, safe and clean, running from around 6am to midnight. Between the MRT and the BTS you can reach the vast majority of Bangkok's attractions, hotels and malls quickly and affordably, leaving taxis and tuk-tuks for the gaps in the network.",
  },
  {
    name: "Airport Rail Link & airports", slug: "airport-rail-link", image: IMG, rating: 4.3, area: "Suvarnabhumi (BKK) & Don Mueang (DMK)",
    tip: "From Suvarnabhumi take the Airport Rail Link to beat traffic into town; from Don Mueang use a Grab or airport bus, as there's no direct train yet.",
    filterKeys: [], description: "Getting from Bangkok's two airports into the city by train, taxi or bus.",
    practicalInfo: { openingHours: "Airport Rail Link ~05:30–24:00", price: "Rail Link ฿15–45; metered airport taxi to centre ~฿250–400 plus tolls", howToGetThere: "Suvarnabhumi (BKK) 30 km east; Don Mueang (DMK) 25 km north" },
    fullDescription: "Bangkok has two airports, and knowing how to get from each into the city saves time and money. Suvarnabhumi (airport code BKK), the main international gateway 30 kilometres east of the centre, is served by the Airport Rail Link, a fast, cheap train that runs to Phaya Thai (with a BTS connection) and Makkasan (near the MRT) in under half an hour, neatly sidestepping the notorious traffic — ideal if your hotel is near a station. Alternatively, use the official metered public-taxi rank downstairs (not the touts upstairs), budgeting for the meter fare plus expressway tolls and a small airport surcharge; a Grab ride is a fixed-price alternative. The older Don Mueang (DMK), 25 kilometres north, handles many budget and domestic flights but has no direct train link yet, so most travellers take a metered taxi, a Grab or one of the airport bus and shuttle services into town. For both airports, avoid unlicensed drivers offering fixed high fares in the arrivals hall. Allow extra time in rush hour, when the road journey can double. If you're connecting between the two airports, there are direct shuttle buses. Plan your arrival transport in advance, especially for late-night landings.",
  },
  {
    name: "Chao Phraya river boats", slug: "chao-phraya-boats", image: IMG, rating: 4.6, area: "Along the Chao Phraya & canals",
    tip: "The orange-flag express boat is the cheap local option; the blue-flag tourist boat is pricier but hits all the big riverside sights.",
    filterKeys: [], description: "River express boats and canal ferries — a scenic, traffic-free way to reach the temples and old city.",
    practicalInfo: { openingHours: "Express boats ~06:00–19:00; tourist boat later", price: "Local express ฿16–33; tourist hop-on boat ~฿150/day; cross-river ferries ~฿5", howToGetThere: "Connect at Sathorn (Central) pier beside BTS Saphan Taksin" },
    fullDescription: "The Chao Phraya river and its connecting canals form a wonderfully scenic public-transport network that bypasses Bangkok's road traffic entirely, and using it is a highlight in itself. The workhorse is the Chao Phraya Express Boat, whose colour-coded flag lines link dozens of piers along the river: hop on the local orange-flag service for a few baht and ride it like a commuter past the Grand Palace, Wat Pho, Wat Arun and the flower market. Tourists often prefer the blue-flag hop-on-hop-off tourist boat, which costs more but stops conveniently at the main sights with English commentary and a flat daily fare. Tiny cross-river ferries shuttle back and forth for around ฿5, handy for reaching Wat Arun from Tha Tien. Long-tail boats can be chartered to explore the quieter Thonburi khlongs and their stilt houses. The key hub is Sathorn (Central) pier, directly below the Saphan Taksin BTS station, where the river network plugs into the Skytrain — making it easy to combine a boat trip with the rail system. Boats get busy at peak times; check which flag stops where, and enjoy one of the coolest, most atmospheric ways to move around the city.",
  },
  {
    name: "Taxis, tuk-tuks & Grab", slug: "taxis-tuktuks-grab", image: IMG, rating: 4.2, area: "Citywide (road)",
    tip: "Insist taxis use the meter (say 'meter, please') or just book a Grab for a fixed, hassle-free fare — often the easiest option of all.",
    filterKeys: [], description: "Metered taxis, novelty tuk-tuks and the Grab ride-hailing app fill the gaps the rail network doesn't reach.",
    practicalInfo: { openingHours: "24/7", price: "Taxi flagfall ฿35 then metered; Grab fixed fare in-app; tuk-tuks negotiable (agree first)", howToGetThere: "Hail on the street, at ranks, or book via the Grab app" },
    fullDescription: "For journeys the trains and boats don't cover, Bangkok's roads offer taxis, tuk-tuks and ride-hailing — each with its own quirks. The city's colourful metered taxis are cheap and plentiful, starting around ฿35, but always insist the driver uses the meter rather than quoting a flat fare, and be aware that traffic can make short distances slow and some drivers decline unprofitable trips. The three-wheeled tuk-tuk is a quintessential Bangkok experience and fun for a short hop, but they're not metered, so haggle and agree the price before you climb in, and treat any offer of a cheap 'tour' with suspicion, as it usually involves commission stops at shops. By far the simplest option for many visitors is Grab, Southeast Asia's ride-hailing app: it shows a fixed fare upfront, matches you with a car (or a motorbike taxi for solo travellers beating the jams), removes any language barrier and handles payment, so there's no negotiation or meter anxiety. Motorbike taxis, whose drivers wear numbered orange vests, are the locals' secret weapon for zipping through gridlock on short trips. Whatever you choose, factor in Bangkok's heavy traffic, especially at rush hour, when the elevated BTS or a river boat will often be faster.",
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Bangkok", item: `${SITE}/bangkok` },
      { "@type": "ListItem", position: 3, name: "Transport", item: `${SITE}/bangkok/transport` },
    ],
  };
}

export default function BangkokTransport() {
  return (
    <CityGuideShell
      citySlug="bangkok"
      cityName="Bangkok"
      categories={BANGKOK_CATEGORIES}
      active="transport"
      crumb="Transport"
      h1="Getting Around Bangkok"
      heroImage={IMG}
      intro="Bangkok's traffic is famous for all the wrong reasons, but the city is far easier to navigate than it looks once you know the system. The elevated BTS Skytrain and MRT subway whisk you across the modern city, river boats glide past the temples of the old town, and the Grab app takes the stress out of everything in between. Here's how each mode works, what it costs, and when to use it."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Bangkok transport, mode by mode" items={TRANSPORT} />
    </CityGuideShell>
  );
}
