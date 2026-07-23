import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { BANGKOK_CATEGORIES } from "@/app/lib/bangkok";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Bangkok Prices & Budget 2026 — How Much Does It Cost? | Flyamba",
  description:
    "How much does Bangkok cost? A full breakdown of daily budgets, street-food and restaurant prices, transport fares, attraction tickets and accommodation, in Thai baht.",
  alternates: { canonical: `${SITE}/bangkok/prices` },
  openGraph: { title: "Bangkok Prices & Budget | Flyamba", description: "Daily budgets, food, transport and entry fees.", type: "article" },
};

const IMG = "/images/bangkok/shopping/chatuchak-weekend-market.webp";

const PRICES: BcnPlace[] = [
  {
    name: "Daily budget overview", slug: "daily-budget", image: IMG, rating: 4.8, area: "Per person, per day",
    tip: "Even 'luxury' in Bangkok is a bargain by Western standards — you can eat, sightsee and travel superbly for well under most European city budgets.",
    filterKeys: [], description: "Roughly what to expect to spend per day in Bangkok, from backpacker to luxury.",
    practicalInfo: { openingHours: "—", price: "Budget ~฿800–1,200; mid-range ~฿2,000–4,000; luxury ฿6,000+ per day", howToGetThere: "—" },
    fullDescription: "Bangkok is one of the best-value major cities in the world, which is a big part of its appeal — your money simply goes much further here than in Europe, North America or Australia. As a rough guide per person per day: a budget traveller staying in a hostel, eating street food and using the trains and boats can live comfortably on around ฿800–1,200; a mid-range visitor in a good three- or four-star hotel, mixing restaurants with street eats, taking the odd taxi and paying for attractions, might spend ฿2,000–4,000; while luxury travellers in five-star riverside hotels with fine dining and spa treatments can happily spend ฿6,000 and up, yet still find it cheaper than the equivalent back home. Your biggest single cost is almost always accommodation, followed by any splurge meals, drinks in rooftop bars and paid attractions like the Grand Palace. Everyday essentials — local food, public transport, water, SIM cards — are remarkably cheap. The upshot is that Bangkok flexes to almost any budget: it's a dream for backpackers, but also lets mid-range travellers enjoy comforts that would be unaffordable elsewhere. Carry cash for markets and street stalls, as many small vendors don't take cards.",
  },
  {
    name: "Food & drink", slug: "food-drink", image: IMG, rating: 4.9, area: "Street stalls to fine dining",
    tip: "Eat where the locals queue — a superb bowl of noodles or a plate of pad thai from a street stall costs a fraction of a mall restaurant.",
    filterKeys: [], description: "What you'll pay to eat and drink, from street food to Michelin tables.",
    practicalInfo: { openingHours: "—", price: "Street dish ~฿40–80; casual restaurant ฿100–300; rooftop cocktail ฿350–600+", howToGetThere: "—" },
    fullDescription: "Eating is where Bangkok's value shines brightest. Street food — and this is some of the best food in the city, not a compromise — is astonishingly cheap: a plate of pad thai, a bowl of noodle soup, a green curry over rice or a papaya salad typically costs around ฿40–80, and a fresh fruit shake or an iced Thai tea just ฿20–40. Casual air-conditioned restaurants and mall food courts run roughly ฿100–300 for a main, still excellent value, while a mid-range sit-down dinner might be ฿500–800 a head with drinks. Local beer (Chang, Singha, Leo) is cheap from shops and street bars at ฿60–100, though it climbs in smart venues. Where costs rise sharply is imported wine and the glamorous scene: a cocktail at a famous rooftop bar can be ฿350–600 or more, and the city's celebrated fine-dining and Michelin restaurants command Western prices, with tasting menus running into the thousands of baht. The beauty is the range — you can eat like royalty for a few dollars at a street stall one night and splurge on a world-class tasting menu the next. Budget generously for the drinks and fine dining that tempt every visitor, and keep cash handy for the stalls.",
  },
  {
    name: "Getting around", slug: "transport-costs", image: IMG, rating: 4.7, area: "Trains, boats, taxis",
    tip: "The BTS, MRT and river boats are so cheap that public transport barely dents a daily budget — a whole day of trains might cost ฿150.",
    filterKeys: [], description: "Transport is inexpensive, whether you take the trains, boats or ride-hailing.",
    practicalInfo: { openingHours: "—", price: "BTS/MRT ฿17–62; river express ฿16–33; short Grab ฿60–150; airport taxi ~฿300–450", howToGetThere: "—" },
    fullDescription: "Getting around Bangkok costs very little, so transport rarely eats much of a day's budget. The BTS Skytrain and MRT subway charge distance-based fares of roughly ฿17–62 per journey, meaning even a busy day of hopping between sights might total only ฿100–200; multi-ride and day passes can trim that further. River travel is cheaper still: the local Chao Phraya express boats cost ฿16–33 depending on the flag line, cross-river ferries around ฿5, and the tourist hop-on-hop-off boat about ฿150 for a whole day of scenic riverside sightseeing. On the roads, metered taxis start at ฿35 and stay cheap, though traffic can push fares up on longer trips, while a typical short Grab ride runs ฿60–150 with the price fixed in advance. Tuk-tuks are negotiable and more of a novelty than a bargain, so agree a fare first. Getting to or from Suvarnabhumi airport costs just ฿15–45 on the Airport Rail Link or roughly ฿300–450 by metered taxi including tolls. Motorbike taxis handle short hops for ฿20–60. In short, you can criss-cross the city all day for the price of a single coffee back home, leaving more of your budget for food, hotels and experiences.",
  },
  {
    name: "Attractions & activities", slug: "attraction-costs", image: IMG, rating: 4.6, area: "Temples, tours, spas",
    tip: "Many of Bangkok's best experiences — Chinatown, markets, Lumphini Park, temple exteriors — are free; save the ticket budget for the Grand Palace.",
    filterKeys: [], description: "Entry fees and activity costs, from cheap temples to premium experiences.",
    practicalInfo: { openingHours: "—", price: "Temples ฿100–500; aquarium/theme parks ฿400–1,000; Thai massage ฿250–500/hr", howToGetThere: "—" },
    fullDescription: "Bangkok's sights span a wide price range, but many of its greatest pleasures are free or nearly so. The headline attraction, the Grand Palace and Wat Phra Kaew, is the priciest temple at ฿500, while other major temples like Wat Pho (฿300), Wat Arun (฿200) and the Golden Mount (฿100) are modest, and countless smaller temples and shrines, plus Chinatown, the markets, Lumphini Park and simply wandering the old town, cost nothing at all. Museums such as Jim Thompson House (฿200) and MOCA (฿280) are inexpensive by global standards. Family attractions sit higher: aquariums, theme parks and shows typically run ฿400–1,000 per person, with big out-of-town parks like Safari World or Dream World at the upper end, and booking online usually shaves the cost. One of Bangkok's great-value treats is the traditional Thai massage — an hour costs just ฿250–500 at a reputable local spa, rising in hotel spas. Cooking classes, guided tours and day trips to Ayutthaya or the floating markets add ฿800–2,500 depending on how they're arranged, cheaper by public transport than by private tour. Overall, you can fill days with world-class sightseeing for very little, splurging selectively on the marquee ticket, a spa day or a special tour.",
  },
  {
    name: "Accommodation", slug: "accommodation-costs", image: IMG, rating: 4.7, area: "Hostels to five-star",
    tip: "Book a few weeks ahead for the best rates, and note prices rise in the cool high season (November–February) and over New Year.",
    filterKeys: [], description: "What a bed costs across the range, from hostel dorms to riverside luxury.",
    practicalInfo: { openingHours: "—", price: "Hostel dorm ~฿400–600; good 3–4 star ฿1,500–3,500; five-star ฿6,000+", howToGetThere: "—" },
    fullDescription: "Accommodation is usually the largest line in a Bangkok budget, but even here the value is excellent for what you get. At the budget end, a bed in one of the city's clean, stylish, sociable hostels costs roughly ฿400–600 a night, and simple private guesthouse rooms not much more, making Bangkok a backpacker favourite. The sweet spot for most visitors is the vast mid-range: smart, modern three- and four-star hotels with pools, air-conditioning and great locations near the Skytrain typically run ฿1,500–3,500 a night — a level of comfort that would cost several times as much in a Western capital. At the top, Bangkok's world-famous five-star and riverside hotels, from the Mandarin Oriental and Peninsula to the Sukhothai and design boutiques, start around ฿6,000 and climb well beyond for suites, yet still often undercut comparable luxury elsewhere. Prices rise in the cool, dry high season from November to February and spike around Christmas, New Year and Songkran, so book ahead for those periods; the hotter and rainier months bring lower rates and good deals. Areas like Sukhumvit, Silom and the riverside command a premium for their location and transport links, while staying slightly out can cut costs. Reserving a few weeks in advance generally secures the best rates.",
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Bangkok", item: `${SITE}/bangkok` },
      { "@type": "ListItem", position: 3, name: "Prices", item: `${SITE}/bangkok/prices` },
    ],
  };
}

export default function BangkokPrices() {
  return (
    <CityGuideShell
      citySlug="bangkok"
      cityName="Bangkok"
      categories={BANGKOK_CATEGORIES}
      active="prices"
      crumb="Prices"
      h1="Bangkok Prices & Daily Budget"
      heroImage={IMG}
      intro="Bangkok is a joy for the wallet: some of the world's best food costs a couple of dollars, transport is cheap, and even luxury undercuts the West. Whether you're backpacking or booking a five-star riverside suite, here's a realistic breakdown of what things cost in Thai baht — daily budgets, food and drink, getting around, attractions and where you'll sleep — so you can plan with confidence."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Bangkok costs, broken down" items={PRICES} />
    </CityGuideShell>
  );
}
