import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/tokyo-places";

const SITE = "https://flyamba.com";

export const metadata: Metadata = {
  title: "Tokyo Travel Costs 2026 — Prices & Daily Budget | Flyamba",
  description:
    "How much does Tokyo cost? A full breakdown of daily budgets, meal prices, transport, hotels, attractions and money tips — Tokyo is more affordable than most visitors expect.",
  alternates: { canonical: `${SITE}/tokyo/prices` },
  openGraph: { title: "Tokyo Travel Costs & Budget | Flyamba", description: "Daily budgets, meal prices and money tips for Tokyo.", type: "article" },
};

const IMG = "/images/tokyo/sevardheter/ginza.webp";

const PRICES: BcnPlace[] = [
  {
    name: "Daily budget: what to expect", slug: "daily-budget", image: IMG,
    rating: 4.6, area: "Per person, per day", tip: "Tokyo is far cheaper than Paris or London for food and transport — it is flights and hotels, not daily spending, that cost the most.",
    filterKeys: [], description: "Rough daily spending tiers for Tokyo, excluding flights and accommodation.",
    practicalInfo: { openingHours: "Budget traveller: ~¥6,000–9,000/day", price: "Mid-range: ~¥12,000–20,000/day", howToGetThere: "Luxury: ¥40,000+/day" },
    fullDescription: "One of the biggest surprises for first-time visitors is that Tokyo, despite its reputation, is not an especially expensive city day to day — in many respects it is cheaper than Paris, London or New York, particularly for eating and getting around. A budget traveller staying in a hostel or capsule, eating at convenience stores, ramen shops and standing bars, and sightseeing at mostly free temples and parks, can get by on roughly ¥6,000–9,000 a day (around $40–60). A comfortable mid-range trip — a business hotel, a mix of casual and nicer restaurants, paid attractions and the odd taxi — runs closer to ¥12,000–20,000 a day ($80–135). At the top end, with luxury hotels, high-end sushi omakase and premium experiences, you can spend ¥40,000 or far more. The two costs that really add up for Tokyo are the long-haul flight and the hotel; once you are on the ground, excellent food and superb transport are remarkably good value. Budget your trip around those big-ticket items, and you will likely find your daily spending goes further here than in most world capitals.",
  },
  {
    name: "Food & drink prices", slug: "food-prices", image: IMG,
    rating: 4.7, area: "Restaurants & konbini", tip: "Lunch sets (teishoku) at even famous restaurants are a fraction of dinner prices — eat your big meal at midday to save.",
    filterKeys: [], description: "What meals, drinks and snacks typically cost in Tokyo.",
    practicalInfo: { openingHours: "Ramen/rice bowl ~¥800–1,200; konbini meal ~¥500", price: "Casual dinner ~¥1,500–3,000; izakaya night ~¥3,000–5,000", howToGetThere: "High-end sushi omakase ¥15,000–40,000+" },
    fullDescription: "Eating is where Tokyo shines for value. A steaming bowl of excellent ramen, a gyudon beef bowl or a set-meal (teishoku) lunch costs just ¥800–1,200, and the ubiquitous convenience stores (konbini) — 7-Eleven, Lawson, FamilyMart — sell genuinely good, fresh meals, onigiri rice balls, sandwiches and bento for ¥300–700, a lifesaver for budget travellers and quick breakfasts. A casual restaurant dinner runs ¥1,500–3,000, while a fun evening at an izakaya with drinks and small plates might come to ¥3,000–5,000 a head. Drinks are reasonable: a beer is ¥400–700, and many izakaya offer all-you-can-drink (nomihodai) deals. The famous depachika food halls in department-store basements are perfect for beautiful, affordable takeaway meals. At the other extreme, a top sushi omakase or kaiseki dinner can run ¥15,000–40,000 or more. A crucial money-saving tip: even celebrated, Michelin-level restaurants often serve set lunches at a fraction of their dinner prices, so make lunch your indulgent meal. Tipping is not customary anywhere in Japan — the price you see is what you pay, and service is included.",
  },
  {
    name: "Transport costs", slug: "transport-costs", image: IMG,
    rating: 4.8, area: "Trains, subway & taxis", tip: "Individual IC-card fares are so cheap that day passes rarely pay off unless you're making five or more trips in a day.",
    filterKeys: [], description: "The cost of getting around Tokyo by train, subway and taxi.",
    practicalInfo: { openingHours: "Single subway/train ride ~¥180–330", price: "Airport transfer ~¥500–3,100; 72-hr subway pass ~¥1,500", howToGetThere: "Short taxi ~¥1,000–2,500; shinkansen to Kyoto ~¥14,000" },
    fullDescription: "Getting around Tokyo is cheap and superb value given the quality of the network. A single subway or train ride costs just ¥180–330 depending on distance, deducted automatically from your Suica or Pasmo card, and even crossing much of the city rarely tops ¥400. Because individual fares are so low, the various tourist day passes (like the 24/48/72-hour Tokyo Subway Ticket, from about ¥800–1,500) only save money if you are making a lot of trips in a day — otherwise pay as you go. Airport transfers range from around ¥500 from Haneda to ¥2,500–3,100 on the Skyliner or Narita Express from Narita. Taxis are the pricier option, with a short ride costing ¥1,000–2,500 and a late-night surcharge, so they are best saved for after the trains stop. For onward travel, the shinkansen to Kyoto or Osaka costs around ¥14,000 each way. Budget roughly ¥800–1,500 a day for local transport if you are sightseeing actively. Overall, transport is one of the areas where Tokyo feels notably cheaper and better than comparable global cities, and a Suica card keeps it all effortless.",
  },
  {
    name: "Hotel & accommodation costs", slug: "hotel-costs", image: IMG,
    rating: 4.5, area: "Per night", tip: "Business hotels and capsules offer excellent, spotless value; book well ahead for cherry-blossom season when rates spike.",
    filterKeys: [], description: "Typical nightly accommodation prices across the range in Tokyo.",
    practicalInfo: { openingHours: "Hostel dorm / capsule ~¥3,000–6,000", price: "Business/3-star hotel ~¥12,000–25,000", howToGetThere: "Luxury 5-star ¥50,000–150,000+" },
    fullDescription: "Accommodation is, along with flights, one of the larger costs of a Tokyo trip, but there is excellent choice at every level. At the budget end, a bunk in a stylish hostel or a pod in a capsule hotel runs about ¥3,000–6,000 a night and is typically impeccably clean and well located. Japan's efficient business hotels — compact but comfortable rooms from chains like APA, Toyoko Inn and Sotetsu Fresa — offer superb value at around ¥8,000–15,000, while a solid three- or four-star hotel sits closer to ¥15,000–25,000. Boutique and upscale properties climb from there, and Tokyo's world-class luxury hotels (the Aman, Park Hyatt, Mandarin Oriental and their peers) command ¥50,000–150,000 or more per night. Rooms across the board tend to be smaller than Western equivalents, so read the size carefully. Prices swing sharply with the calendar: they surge during the late-March-to-April cherry-blossom season, the autumn leaves, and Golden Week (early May), so book those periods months ahead. Staying near a Yamanote Line station saves time and transport money. For most visitors, a clean, central business hotel offers the best balance of comfort, location and value in this famously well-run city.",
  },
  {
    name: "Attraction & activity prices", slug: "attraction-costs", image: IMG,
    rating: 4.6, area: "Sightseeing", tip: "Many of Tokyo's best experiences — temples, shrines, parks, neighbourhoods and markets — are completely free.",
    filterKeys: [], description: "What you'll pay for Tokyo's museums, observation decks and attractions.",
    practicalInfo: { openingHours: "Temples, shrines, parks & districts: mostly free", price: "Museums ~¥600–1,500; observation decks ¥2,000–3,000", howToGetThere: "teamLab ~¥3,800; Disney 1-day ¥7,900+" },
    fullDescription: "Tokyo rewards visitors on a budget because so many of its defining experiences cost nothing at all. The great temples and shrines — Senso-ji, Meiji Jingu — are free, as are iconic sights like Shibuya Crossing, the buzzing districts of Harajuku, Akihabara and Ginza, the Imperial Palace gardens, and most of the city's beautiful parks (Ueno, Yoyogi), with only a few charging a token ¥500. Paid attractions are reasonably priced: the excellent national museums run ¥600–1,500, observation decks like the Tokyo Skytree and Shibuya Sky cost ¥2,000–3,000, and the immersive teamLab digital-art venues are around ¥3,800. The bigger-ticket items are the theme parks — a one-day pass to Tokyo Disneyland or DisneySea starts at ¥7,900 and varies by date. Cultural experiences like a sumo tournament (from ~¥3,500), a tea ceremony or a kabuki act (from ~¥1,000 for a single act) are affordable ways to go deeper. Because the free sights are so plentiful and rewarding, you can easily fill days of memorable sightseeing while spending very little, saving your budget for the odd paid highlight, great meals and shopping.",
  },
  {
    name: "Money, cash & tax-free tips", slug: "money-tips", image: IMG,
    rating: 4.6, area: "Practical money advice", tip: "Carry some cash — Japan is still surprisingly cash-loving — and always bring your passport for duty-free shopping over ¥5,000.",
    filterKeys: [], description: "Practical advice on cash, cards, tipping and duty-free shopping.",
    practicalInfo: { openingHours: "Cards widely accepted, but carry cash too", price: "10% consumption tax; tax-free over ¥5,000 with passport", howToGetThere: "Withdraw yen at 7-Eleven & post-office ATMs" },
    fullDescription: "A few money habits will make your Tokyo trip smoother. Despite being hyper-modern, Japan remains surprisingly attached to cash: while cards and IC-card payments are now widely accepted in hotels, chains and larger shops, many small restaurants, izakaya, markets, temples and older establishments are cash-only, so always carry some yen. The most reliable ATMs for foreign cards are at 7-Eleven convenience stores (found everywhere) and Japan Post offices, which accept overseas cards around the clock. Crucially, tipping is simply not part of Japanese culture — never leave a tip in restaurants or taxis; it can cause confusion, and excellent service is always included in the price. Japan charges a 10% consumption tax, but tourists can shop tax-free: at stores displaying a 'Tax-Free' sign, spend over ¥5,000 in a day, show your passport, and the tax is deducted (the goods are meant for export). Electronics giants, Don Quijote and department stores all offer this. Budget for the fact that your two biggest costs — flights and hotels — are best locked in early, while daily food, transport and sightseeing are refreshingly affordable once you arrive. Keep a Suica topped up and some cash on hand, and money worries in Tokyo largely melt away.",
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Tokyo", item: `${SITE}/tokyo` },
      { "@type": "ListItem", position: 3, name: "Prices", item: `${SITE}/tokyo/prices` },
    ],
  };
}

export default function TokyoPrices() {
  return (
    <CityGuideShell
      citySlug="tokyo"
      cityName="Tokyo"
      categories={CATEGORIES}
      active="prices"
      crumb="Prices"
      h1="Tokyo Travel Costs & Budget"
      heroImage={IMG}
      intro="How much does a trip to Tokyo cost? Less than most people fear. While the long-haul flight and your hotel are the big-ticket items, Tokyo's food, transport and sightseeing are genuinely good value — often cheaper than Paris, London or New York — thanks to affordable ramen and konbini meals, cheap efficient trains and an abundance of free temples, parks and neighbourhoods. This guide breaks down realistic daily budgets, typical prices and the money tips that keep costs down."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Tokyo prices broken down" items={PRICES} />
    </CityGuideShell>
  );
}
