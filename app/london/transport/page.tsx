import type { Metadata } from "next";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { CATEGORIES } from "@/app/data/london-places";

const SITE = "https://flyamba.com";

export const metadata: Metadata = {
  title: "Transport in London 2026 — Guide | Flyamba",
  description:
    "How to get around London — the Tube, buses, Oyster and contactless, black cabs, the Elizabeth line and airport transfers from Heathrow, Gatwick and beyond, with real fares and tips.",
  alternates: { canonical: `${SITE}/london/transport` },
  openGraph: { title: "Getting Around London | Flyamba", description: "The Tube, buses, Oyster, taxis and airport transfers explained.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "London", item: `${SITE}/london` },
      { "@type": "ListItem", position: 3, name: "Transport", item: `${SITE}/london/transport` },
    ],
  };
}

const IMG = "/images/content/photo-1544620347-c4fd4a3d5957.avif";

const ITEMS: BcnPlace[] = [
  {
    name: "The London Underground (the Tube)", slug: "the-tube", image: IMG, rating: 4.5, area: "Citywide",
    tip: "Tap in and out with the same contactless card or phone you use for coffee — no need to buy paper tickets.",
    filterKeys: [],
    description: "The world's oldest metro, the fastest way across central London.",
    practicalInfo: { openingHours: "~05:00–00:30; Night Tube on five lines Fri & Sat", price: "Zone 1 from £2.80 (contactless/Oyster); daily cap ~£8.90", howToGetThere: "11 lines across 9 zones; central London is almost all Zone 1" },
    fullDescription: "The London Underground, universally called the Tube, is the beating heart of the city's transport and the quickest way to cross the centre. Opened in 1863 as the world's first underground railway, it now runs 11 colour-coded lines across nine fare zones, with almost all the major sights sitting inside Zone 1. Trains run roughly from 5am to just after midnight, with a 24-hour Night Tube on five lines on Friday and Saturday nights. You don't need paper tickets: simply tap in and out at the yellow readers with any contactless bank card or phone, or an Oyster card, and the system automatically charges the cheapest fare and applies a daily cap (around £8.90 for Zones 1–2) so you never overpay. A single Zone 1 journey costs from £2.80, far less than the cash single. Download the free TfL Go or Citymapper app for live routes and platform-level directions. Avoid the crush of rush hour (roughly 08:00–09:30 and 17:00–18:30) where you can, stand on the right on escalators, and mind the gap. Frequent, extensive and easy once you tap, the Tube makes exploring London simple.",
  },
  {
    name: "Oyster & contactless payment", slug: "oyster-contactless", image: IMG, rating: 4.6, area: "Citywide",
    tip: "Overseas visitors can skip Oyster entirely — a contactless card or phone gives identical fares and the same daily cap.",
    filterKeys: [],
    description: "The pay-as-you-go system that caps your daily travel spend automatically.",
    practicalInfo: { openingHours: "Works on all TfL transport, all hours", price: "No fee for contactless; Oyster card £7 deposit (refundable)", howToGetThere: "Tap in/out at Tube, rail, DLR and Overground; tap once on buses & trams" },
    fullDescription: "Understanding London's fare system is the single biggest money-saver for visitors, and it's refreshingly simple. The city runs on pay-as-you-go: you tap a contactless bank card, phone or watch (or a physical Oyster card) on the yellow reader as you enter and, on rail services, as you leave. The system works out the cheapest fare for your journeys and applies a daily and weekly cap, so once you've travelled a certain amount, everything after that is effectively free — you cannot overpay by tapping. Crucially, contactless cards and mobile wallets give exactly the same fares and caps as an Oyster card, so most overseas visitors no longer need to buy an Oyster at all; just use the card or phone you already carry (check with your bank about foreign-transaction fees). On the Tube, DLR, Overground and rail you must tap both in and out, or you'll be charged a higher incomplete-journey fare; on buses and trams you tap only once, on boarding. Children under 11 travel free with a fare-paying adult. Keep the same card for all journeys so the caps apply correctly. It's contactless, capped and effortless.",
  },
  {
    name: "Buses & the Elizabeth line", slug: "buses-elizabeth-line", image: IMG, rating: 4.4, area: "Citywide",
    tip: "Ride the front seats on the top deck of a red double-decker for a cheap, scenic sightseeing tour of the city.",
    filterKeys: [],
    description: "Iconic red buses and the fast new Elizabeth line broaden your reach cheaply.",
    practicalInfo: { openingHours: "Buses 24/7 on many routes; Elizabeth line ~05:00–00:00", price: "Any single bus journey £1.75 (Hopper: free transfers within 1 hour)", howToGetThere: "Tap contactless/Oyster on boarding buses; Elizabeth line runs east–west through the centre" },
    fullDescription: "Beyond the Tube, London's red double-decker buses are both a practical network and a bargain sightseeing ride. Every bus journey costs a flat £1.75 on contactless or Oyster regardless of distance, and the Hopper fare lets you change buses (or a bus and tram) as many times as you like within an hour at no extra charge — you tap once on boarding, with no need to tap off. Buses are cashless, so you must use a card, phone or Oyster. Riding up top at the front of a route like the 11, 15 or 24 gives you a slow, cheap tour past major landmarks. The recently opened Elizabeth line (the purple line) has transformed cross-city travel, whisking you east–west from Heathrow and the western suburbs through spacious central stations at Paddington, Bond Street, Tottenham Court Road, Farringdon and Liverpool Street and out to the east, all under the same fares and caps. It's fast, smooth and air-conditioned. Add the Docklands Light Railway (DLR) for Canary Wharf and Greenwich and the Overground for outer neighbourhoods, and the whole network interlocks seamlessly on one tap-in payment. For value and views, don't overlook the buses.",
  },
  {
    name: "Black cabs & ride-hailing", slug: "taxis-ride-hailing", image: IMG, rating: 4.3, area: "Citywide",
    tip: "Black cabs can be hailed on the street when the yellow light is on; for cheaper fixed fares, use an app like Uber or Bolt.",
    filterKeys: [],
    description: "Licensed black taxis and ride-hailing apps for door-to-door trips.",
    practicalInfo: { openingHours: "24/7", price: "Black cab: from £3.80, typical central ride £10–£20; apps often cheaper", howToGetThere: "Hail black cabs with the light on, or find ranks at stations; book apps on your phone" },
    fullDescription: "London's iconic black cabs are among the best taxis in the world, driven by licensed cabbies who have passed 'the Knowledge', an exhaustive test of the city's streets, so they can take you anywhere without a satnav. You can hail one on the street whenever the orange 'TAXI' light is lit, or find them at ranks outside stations, hotels and airports. Fares are metered and regulated, starting around £3.80 with a typical central journey costing £10–£20; they accept contactless card payment. They're convenient and characterful but pricier than app-based rides, especially in traffic. Ride-hailing apps — Uber, Bolt and others — operate widely and usually undercut black-cab prices with upfront fixed fares, though surge pricing applies at busy times and after the pubs close. For late nights when the Tube has stopped (outside Night Tube hours), a licensed cab or app is the safe way home; avoid unbooked minicabs that tout for business on the street, which are illegal and unsafe. For most sightseeing, though, the Tube and buses are far cheaper and often faster than any car through central London's congested, one-way streets.",
  },
  {
    name: "Getting to & from the airports", slug: "airport-transfers", image: IMG, rating: 4.4, area: "Heathrow, Gatwick, Stansted, Luton, City",
    tip: "From Heathrow, the Elizabeth line into central London is far cheaper than the Heathrow Express and only a little slower.",
    filterKeys: [],
    description: "How to reach the city from London's six airports.",
    practicalInfo: { openingHours: "Rail/coach links from early morning to late night", price: "Heathrow: Elizabeth line ~£12.80, Express ~£25; Gatwick Express ~£20", howToGetThere: "Each airport has dedicated train, Tube or coach links to central London" },
    fullDescription: "London is served by six airports, and each has good public-transport links, so you rarely need a taxi. Heathrow (LHR), the largest and closest, connects to the centre three ways: the Elizabeth line (around £12.80, ~35–45 minutes to central stations) is the best-value option, the Piccadilly Tube line is cheapest but slowest, and the premium Heathrow Express reaches Paddington in 15 minutes for around £25. Gatwick (LGW), to the south, is served by the Gatwick Express to Victoria (~30 minutes, ~£20) plus cheaper Southern and Thameslink trains. Stansted (STN) and Luton (LTN), used mainly by budget airlines, link in via the Stansted Express and Luton's fast shuttle-plus-Thameslink service respectively, or by cheaper National Express and other coaches that run around the clock. London City (LCY), the most central, connects to the Docklands and beyond in minutes on the DLR. Contactless and Oyster work on most of these rail links (though not the Express services' full pricing), and coaches offer the lowest fares if you're not in a hurry. Book Express and coach tickets online in advance for the best prices, and always allow extra time in rush hour.",
  },
  {
    name: "Cycling & walking", slug: "cycling-walking", image: IMG, rating: 4.5, area: "Central London",
    tip: "Central London is more walkable than it looks — neighbouring 'far apart' Tube stops are often just a 10-minute stroll apart.",
    filterKeys: [],
    description: "On foot or by hire bike, often the nicest way to see the centre.",
    practicalInfo: { openingHours: "Santander Cycles 24/7; walking anytime", price: "Santander Cycles: £1.65 per single hire (up to 30 min); walking free", howToGetThere: "Docking stations across central London; download the Santander Cycles app" },
    fullDescription: "For all the Tube's speed, some of the best of London is discovered on foot or by bike. Central London is far more compact and walkable than first-time visitors expect — neighbouring stops that look far apart on the famously not-to-scale Tube map are frequently a pleasant 10-minute stroll apart, and walking lets you stitch together sights the underground hides. Classic routes include the South Bank riverside path from Westminster to Tower Bridge, the royal-park chain from Buckingham Palace through St James's and Green Park, and the lanes of Soho, Covent Garden and the City. For longer hops, the Santander Cycles hire scheme (nicknamed 'Boris bikes') offers docking stations across the centre; hire a bike via the app or terminal for £1.65 per journey of up to 30 minutes, ride, and redock at your destination. Dedicated cycle superhighways and quieter backstreet routes make cycling increasingly viable, though traffic can be daunting, so wear a helmet and stick to marked lanes. Remember that in the UK traffic drives on the left, so look right first when crossing (the 'LOOK RIGHT' painted at crossings is there to help). Comfortable shoes and a good map app are your best transport investment.",
  },
];

export default function LondonTransport() {
  return (
    <CityGuideShell
      citySlug="london"
      cityName="London"
      categories={CATEGORIES}
      active="transport"
      crumb="Transport"
      h1="Getting Around London"
      heroImage={IMG}
      intro="London has one of the world's great public-transport networks, and getting around is easy once you know a few basics. This guide covers the Tube, buses and the new Elizabeth line, how Oyster and contactless fares and daily caps work, black cabs and ride-hailing, airport transfers, and getting about on foot or by hire bike — all with real fares and practical tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Getting around London — everything you need to know" items={ITEMS} />
    </CityGuideShell>
  );
}
