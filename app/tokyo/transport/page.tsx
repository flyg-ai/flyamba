import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/tokyo-places";

const SITE = "https://flyamba.com";

export const metadata: Metadata = {
  title: "Getting Around Tokyo 2026 — Metro, JR & Suica Guide | Flyamba",
  description:
    "How to get around Tokyo — Narita Express and Skyliner from the airport, the Suica/Pasmo IC card, the metro and JR Yamanote Line, taxis and the shinkansen, with fares and tips.",
  alternates: { canonical: `${SITE}/tokyo/transport` },
  openGraph: { title: "Getting Around Tokyo | Flyamba", description: "Tokyo metro, JR, Suica cards, airport transfers and taxis explained.", type: "article" },
};

const IMG = "/images/tokyo/sevardheter/shibuya-crossing.webp";

const TRANSPORT: BcnPlace[] = [
  {
    name: "Airport transfer: Narita Express & Skyliner", slug: "airport-transfer", image: IMG,
    rating: 4.6, area: "Narita (NRT) / Haneda (HND)", tip: "From Narita, the Keisei Skyliner is fastest to the east side (Ueno/Nippori); the JR Narita Express (N'EX) is best for Shinjuku, Shibuya and Yokohama.",
    filterKeys: [], description: "How to get from Narita or Haneda airports into central Tokyo.",
    practicalInfo: { openingHours: "Trains roughly 05:00–23:00; frequent departures", price: "N'EX ~¥3,070; Skyliner ~¥2,570; Haneda monorail ~¥500", howToGetThere: "Both airport rail lines depart from beneath the terminals; buy tickets at machines or counters" },
    fullDescription: "Most international visitors land at Narita Airport (NRT), which sits about 60 kilometres east of the city, so the transfer matters. The two best rail options are the Keisei Skyliner, which whisks you to Nippori and Ueno on the east side in as little as 41 minutes for around ¥2,570, and the JR Narita Express (N'EX), which runs directly to Tokyo Station, Shinjuku, Shibuya and Yokohama in roughly 60–90 minutes for about ¥3,070 — often discounted on a round-trip foreign-visitor ticket. Cheaper local trains and highway 'limousine' buses (handy if your hotel is a stop) also serve the route. If you arrive at the closer Haneda Airport (HND), you are far better placed: the Tokyo Monorail to Hamamatsucho or the Keikyu Line to Shinagawa each take under 30 minutes and cost around ¥500. Whichever airport you use, buy or top up a Suica/Pasmo IC card on arrival to make onward travel seamless, and note the last trains run before midnight, after which only pricey taxis remain.",
  },
  {
    name: "Suica & Pasmo IC cards", slug: "suica-pasmo", image: IMG,
    rating: 4.8, area: "Citywide", tip: "Get one immediately on arrival — you can also add Suica to an iPhone or Apple Watch and top up straight from your phone.",
    filterKeys: [], description: "The rechargeable tap-and-go smart cards that make Tokyo transport effortless.",
    practicalInfo: { openingHours: "Usable any time the network runs", price: "Load any amount; no deposit on mobile Suica; small deposit on physical cards", howToGetThere: "Buy/top up at any station ticket machine, or add to Apple/Google Wallet" },
    fullDescription: "The single most useful thing you can do in Tokyo is get a Suica or Pasmo card — rechargeable contactless smart cards that let you simply tap in and out of every train, subway and bus across the whole region without ever buying individual tickets. The two are functionally identical and work interchangeably across all operators (JR, Tokyo Metro, Toei and private lines), automatically deducting the correct fare for each journey. Beyond transport, they double as electronic cash at convenience stores, vending machines, station lockers, many restaurants and shops, so you rarely need coins. You can buy a physical card and top it up at any station machine (choose the English menu), or, even better, add a digital Suica to an iPhone, Apple Watch or Android phone and recharge it instantly from your card without queuing. Occasional chip shortages have limited sales of some physical welcome cards, so the mobile version is the safest bet. Load ¥2,000–3,000 to start, top up as needed, and you will glide through Tokyo's transport like a local from the moment you land.",
  },
  {
    name: "Tokyo Metro & Toei Subway", slug: "subway", image: IMG,
    rating: 4.7, area: "Central Tokyo", tip: "Google Maps and the free Tokyo Metro app give perfect door-to-door routing, including which exit to use — exits matter in huge stations.",
    filterKeys: [], description: "The dense, ultra-efficient subway network that reaches almost everywhere in the city.",
    practicalInfo: { openingHours: "Roughly 05:00–00:30 daily", price: "Fares ~¥180–330 by distance; 24/48/72-hr tourist passes available", howToGetThere: "Enter any subway station and tap your Suica/Pasmo at the gate" },
    fullDescription: "Tokyo's subway is the backbone of getting around, one of the busiest, cleanest and most punctual metro systems in the world. It is run by two operators — Tokyo Metro (nine lines) and Toei (four lines) — whose networks interlink and, together with the JR and private lines, blanket the city so thoroughly that you are rarely more than a short walk from a station. Every line has a colour, a letter and numbered stations, and signage, announcements and ticket machines are all available in English, making it far easier to navigate than its famous spaghetti map suggests. Trains run from around 5am to just after midnight, arriving every few minutes, and while the morning rush (roughly 7:30–9:30am) is genuinely packed, it is orderly and safe. Fares run by distance from about ¥180 and are deducted automatically when you tap a Suica or Pasmo. Tourists making many trips can buy Tokyo Subway Tickets giving unlimited Metro and Toei travel for 24, 48 or 72 hours. Use Google Maps or the Tokyo Metro app for flawless routing — and pay attention to the suggested exit, as the largest stations have dozens.",
  },
  {
    name: "JR Yamanote Line & JR network", slug: "jr-yamanote", image: IMG,
    rating: 4.6, area: "Central loop", tip: "The green Yamanote loop connects nearly every major hub — Tokyo, Shinjuku, Shibuya, Harajuku, Ueno — so many trips are a single easy ride.",
    filterKeys: [], description: "The circular JR line that loops the city's major districts, plus the wider Japan Rail network.",
    practicalInfo: { openingHours: "Roughly 04:30–01:00 daily", price: "Fares from ~¥150 by distance (Suica); JR Pass not needed within the city", howToGetThere: "Board at any JR station; the Yamanote runs clockwise and anticlockwise" },
    fullDescription: "Run by JR East and instantly recognisable by its pale-green trains, the Yamanote Line is a circular route that loops around central Tokyo connecting almost all of its major hubs — Tokyo Station, Shinjuku, Shibuya, Harajuku, Ikebukuro, Ueno and more — in one convenient ring, with trains every few minutes in both directions. For visitors it is often the simplest way to hop between the big districts without changing lines, and it pairs with other JR lines like the Chuo (cutting east–west across the loop) and the Keihin-Tohoku. You tap in and out with a Suica or Pasmo just as on the subway, with fares from around ¥150 by distance. Note that the nationwide Japan Rail Pass, popular for intercity shinkansen travel, offers little value for getting around within Tokyo itself, where individual IC-card fares are cheap — save the pass for longer trips to Kyoto, Osaka or Hiroshima. The Yamanote and the subway together cover the vast majority of a visitor's journeys, and knowing the green loop alone will get you to most of Tokyo's headline sights quickly and cheaply.",
  },
  {
    name: "Taxis & ride-hailing", slug: "taxis", image: IMG,
    rating: 4.3, area: "Citywide", tip: "Taxis are spotless and safe but pricey — most useful after the trains stop; the GO app hails one and handles payment in English.",
    filterKeys: [], description: "When and how to use Tokyo's famously immaculate taxis.",
    practicalInfo: { openingHours: "24 hours", price: "Flagfall ~¥500; typical short ride ¥1,000–2,500; late-night surcharge", howToGetThere: "Hail on the street (red light = available), find a rank, or use the GO or Uber app" },
    fullDescription: "Tokyo's taxis are an experience in themselves — immaculately clean, with white-gloved drivers, lace seat covers and automatic passenger doors that open and close for you. They are safe, honest and metered, but they are also expensive compared with the cheap, efficient trains, so most visitors use them sparingly: chiefly late at night after the subway and JR lines stop running (roughly after midnight until 5am), for short hops with luggage, or when travelling as a group where splitting the fare makes sense. Flagfall starts around ¥500 for the first kilometre or so, and a late-night surcharge applies. You can hail one on the street when the red 'vacant' light shows in the windscreen, pick one up at a station rank, or use a ride-hailing app: the local GO app is the most widely used and lets you book and pay in English, while Uber operates in Tokyo mainly by dispatching regular taxis rather than private cars. Few drivers speak much English, so having your destination written in Japanese or shown on a map helps. IC cards and credit cards are widely accepted. For most days, though, the trains will serve you far better and cheaper.",
  },
  {
    name: "Shinkansen & day-trip rail", slug: "shinkansen", image: IMG,
    rating: 4.8, area: "From Tokyo & Shinjuku stations", tip: "For Kyoto/Osaka book a reserved seat on the Tokaido Shinkansen; for day trips, regional passes like the Hakone Free Pass often beat individual tickets.",
    filterKeys: [], description: "The bullet trains and regional lines for onward travel and day trips.",
    practicalInfo: { openingHours: "Roughly 06:00–23:00", price: "Tokyo–Kyoto ~¥14,000 each way; regional day-trip passes ~¥2,000–6,000", howToGetThere: "Shinkansen depart Tokyo & Shinagawa stations; day-trip lines from Shinjuku, Asakusa & Ueno" },
    fullDescription: "Tokyo is the hub of Japan's legendary railway system, and its stations are the gateway to both intercity bullet trains and the region's day trips. The Tokaido Shinkansen, departing Tokyo and Shinagawa stations, whisks you to Kyoto in about 2 hours 15 minutes and Osaka in around 2 hours 30, reaching 285 km/h in near silence — reserve a seat online or at the station, and sit on the right-hand side heading west for a glimpse of Mount Fuji. For day trips, a web of private and JR lines fans out from the city: the Odakyu 'Romancecar' from Shinjuku to Hakone, the Tobu limited express from Asakusa to Nikko, JR lines to Kamakura and Yokohama, and highway buses to the Fuji Five Lakes. Many of these are best value with a dedicated regional pass — the Hakone Free Pass, for instance, bundles the round-trip and all local transport in the area into one discounted ticket. The nationwide Japan Rail Pass can pay off if you are also touring beyond Tokyo, but do the maths, as it has become pricey. Either way, the ease and punctuality of Japanese rail make exploring beyond the capital a genuine pleasure.",
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Tokyo", item: `${SITE}/tokyo` },
      { "@type": "ListItem", position: 3, name: "Transport", item: `${SITE}/tokyo/transport` },
    ],
  };
}

export default function TokyoTransport() {
  return (
    <CityGuideShell
      citySlug="tokyo"
      cityName="Tokyo"
      categories={CATEGORIES}
      active="transport"
      crumb="Transport"
      h1="Getting Around Tokyo"
      heroImage={IMG}
      intro="Tokyo has arguably the best public transport on the planet — a vast, spotless, punctual web of subways and trains that makes a city of 37 million astonishingly easy to navigate, even without a word of Japanese. The golden rule for visitors is simple: get a Suica or Pasmo IC card the moment you land, then tap your way effortlessly onto every train, subway and bus. This guide covers airport transfers, the IC cards, the metro and JR Yamanote loop, taxis and onward rail for day trips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Tokyo transport explained" items={TRANSPORT} />
    </CityGuideShell>
  );
}
