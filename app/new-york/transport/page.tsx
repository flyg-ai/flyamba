import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/new-york-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Getting Around New York 2026 — Subway, OMNY & Taxis | Flyamba",
  description:
    "How to get around New York: the subway, OMNY contactless fares and the weekly fare cap, buses, Citi Bike, walking, taxis and ride-hailing, plus how to reach the city from JFK, LaGuardia and Newark.",
  alternates: { canonical: `${SITE}/new-york/transport` },
  openGraph: { title: "Getting Around New York | Flyamba", description: "Airports, the 24-hour subway, OMNY fares, buses, bikes and taxis — the complete transport guide.", type: "article" },
};

const IMG = "/images/new-york/attractions/grand-central-terminal.webp";

const INFO: BcnPlace[] = [
  {
    name: "From the airports to the city", slug: "airports-to-city", image: IMG, rating: 5, area: "JFK · LGA · EWR",
    tip: "From JFK, the AirTrain plus a subway or LIRR train is far cheaper than a cab; keep a contactless card ready for both the AirTrain gate and the subway turnstile.",
    filterKeys: [],
    description: "New York has three airports — JFK and LaGuardia in Queens and Newark in New Jersey — each with its own best route in.",
    practicalInfo: { openingHours: "AirTrain & subway ~24h; LIRR/NJ Transit frequent", price: "JFK AirTrain + subway ~$11.55; AirTrain + LIRR ~$17; JFK yellow-cab flat rate $70 + tolls & tip", howToGetThere: "AirTrain + subway/LIRR at JFK; NJ Transit at Newark; M60/Q70 bus at LaGuardia" },
    fullDescription: "New York has three major airports, and the smartest route in depends on where you land, how much luggage you have and your budget. From JFK, take the AirTrain (about $8.50) to a connecting station: subway lines E, J or Z at Jamaica, or the A at Howard Beach, are cheapest into Manhattan, while the faster option is the AirTrain to Jamaica and then the LIRR commuter train straight to Penn Station (around $17 all-in, 50 minutes). A JFK yellow cab runs a flat $70 to Manhattan plus tolls and an expected tip, so more like $90; Uber and Lyft are comparable. From Newark (EWR) in New Jersey, the AirTrain plus an NJ Transit train reaches Penn Station in about 30 minutes for roughly $15.75. LaGuardia (LGA) has no direct train — take the free M60 or Q70 connecting bus to a subway station, or a taxi or ride-hail all the way. Crucially, the AirTrain, LIRR and NJ Transit are all priced and ticketed separately from the city subway and OMNY, so budget for them on top of your regular fares.",
  },
  {
    name: "The subway", slug: "subway", image: IMG, rating: 5, area: "Citywide",
    tip: "Check whether your train runs express or local, and whether the platform is uptown (north) or downtown (south), before you head down the stairs.",
    filterKeys: [],
    description: "The MTA subway runs 24 hours a day and is the fastest way to move around the city, with 472 stations — the most in the world.",
    practicalInfo: { openingHours: "24 hours a day (less frequent overnight)", price: "$2.90 per ride (OMNY / contactless)", howToGetThere: "Numbered and lettered lines fan out from hubs like Times Square, Grand Central and Fulton St" },
    fullDescription: "The New York subway, run by the MTA, is the fastest way to move through the city — and, unusually for a world capital, it runs 24 hours a day, with 472 stations, more than any other system. It is the backbone of the city, reaching nearly every attraction across Manhattan and the outer boroughs. Lines carry either a number (1, 2, 3, 4, 5, 6, 7) or a letter (A, C, E, B, D, F, M, N, Q, R, W and more), and the line's colour shows which trunk route it follows; the free MTA app has the map and real-time departures. Two things trip up first-timers. First, express versus local: express trains skip the smaller stops and stop only at major stations, so check the sign on the train and platform or you may sail past your stop. Second, uptown (north) versus downtown (south): at many stations the two directions have separate platforms, sometimes with separate street entrances, so check before you go down. Trains run all night but come less often after midnight, and some lines change route for engineering works — the MTA app or Citymapper will keep you right.",
  },
  {
    name: "Buses", slug: "buses", image: IMG, rating: 5, area: "Citywide",
    tip: "On faster Select Bus Service (SBS) routes you pay before boarding at a machine or OMNY reader on the pavement — keep the receipt, as inspectors may check it.",
    filterKeys: [],
    description: "MTA buses complement the subway, especially for crosstown trips, and cost the same fare with free transfers.",
    practicalInfo: { openingHours: "Frequent daytime; night routes overnight", price: "$2.90 (same as the subway); free transfers within 2h via OMNY", howToGetThere: "Crosstown and outer-borough routes citywide" },
    fullDescription: "MTA buses fill the gaps the subway leaves, and they are especially useful for crosstown journeys across Manhattan from east to west, where few trains run, and in parts of the outer boroughs — with the bonus of a view above ground along the way. A bus ride costs the same flat fare as the subway, and with OMNY you also get a free transfer between subway and bus (or bus to bus) within two hours, perfect for a short crosstown hop followed by a train. On the faster Select Bus Service (SBS) routes you pay before boarding, at a machine or OMNY reader at the stop, then board through any door, which speeds things up; keep the receipt, as inspectors can ask to see it on board. Buses are slower than the subway in heavy traffic but can be simpler for short trips and are fully accessible. For visitors, the subway will do most of the work, but a crosstown bus is often the easiest way to cross Manhattan's width — for example between the Museum Mile and the West Side — and it costs nothing extra if you're transferring.",
  },
  {
    name: "OMNY, fares & the weekly cap", slug: "omny-fares", image: IMG, rating: 5, area: "Citywide",
    tip: "Tap the exact same card or phone every time — that's how the system totals your rides and gives you the automatic weekly cap.",
    filterKeys: [],
    description: "Contactless OMNY has replaced the MetroCard, with a $2.90 flat fare and a $34 weekly cap after 12 rides.",
    practicalInfo: { openingHours: "N/A", price: "$2.90 per ride; free after 12 rides in a Mon–Sun week (~$34 cap)", howToGetThere: "Tap a contactless card or phone on the OMNY readers on every subway and bus" },
    fullDescription: "Working out fares is the one thing that catches out first-time visitors, but it is now simpler than ever. The flat fare is $2.90 per ride on both subway and bus, and the easiest way to pay is OMNY: just tap your contactless bank card, credit card, phone or watch on the reader when you board — no ticket to buy, no deposit, no top-up. OMNY has a built-in weekly fare cap: after 12 paid rides (about $34) in a Monday-to-Sunday week, you ride free for the rest of that week, effectively giving you a 7-day unlimited pass without having to buy one in advance. The key is to tap the exact same card or device every time, or the count resets and you never reach the cap. The old blue MetroCard is being phased out through 2025–2026 in favour of OMNY, so there's no reason to choose it. Remember that the AirTrain (at JFK and Newark) and the LIRR and NJ Transit commuter trains sit outside the regular subway fare and the OMNY cap — they have their own separate tickets and cost extra.",
  },
  {
    name: "Cycling & walking", slug: "cycling-walking", image: IMG, rating: 5, area: "Citywide",
    tip: "Manhattan's grid makes distances easy to judge — roughly 20 blocks make a mile, and walking between nearby sights is often quicker and nicer than the subway.",
    filterKeys: [],
    description: "Citi Bike share bikes cover Manhattan and Brooklyn, and Manhattan's grid makes it one of the world's most walkable cities.",
    practicalInfo: { openingHours: "Citi Bike 24h; on foot anytime", price: "Citi Bike single ride or day pass (e-bikes cost extra per minute)", howToGetThere: "Citi Bike docks across Manhattan and Brooklyn; walk the numbered grid" },
    fullDescription: "New York has expanded its cycle network hugely, with hundreds of miles of bike lanes, and cycling is often faster than driving in rush-hour traffic and a great way to link nearby sights, especially in Manhattan. Citi Bike is the city's bike-share scheme, with thousands of docking stations; you unlock a bike via the app and buy either a single ride or a day pass, with standard bikes included and e-bikes costing extra per minute — no membership needed. Stick to the marked bike lanes (never the pavement, which is illegal), watch for cabs stopping suddenly and doors opening, and a helmet is strongly recommended even though it isn't required for adults. Walking, though, may be the best way of all to see the city: Manhattan's grid, with avenues running north–south and numbered streets east–west, is unusually easy to navigate, and roughly 20 blocks make a mile, so distances are simple to judge. Between nearby sights it's often quicker and far more enjoyable to walk than to go underground, and a stroll through Central Park or along the High Line is one of the city's great free pleasures. Just cross at the lights and look both ways on the one-way avenues.",
  },
  {
    name: "Taxis & ride-hailing", slug: "taxis-rideshare", image: IMG, rating: 5, area: "Citywide",
    tip: "You rarely need to rent a car in New York — traffic is heavy, parking is expensive, and the subway, buses and cabs cover everything faster.",
    filterKeys: [],
    description: "Iconic yellow cabs run on the meter (with a flat fare to/from JFK), while Uber and Lyft are widespread and comparably priced.",
    practicalInfo: { openingHours: "24 hours", price: "Yellow cabs ~$3 start + ~$1.80/km + tip; JFK–Manhattan flat $70; Uber/Lyft comparable", howToGetThere: "Hail a yellow cab with its roof light on, or book Uber/Lyft by app" },
    fullDescription: "New York's iconic yellow cabs run on a meter and are hailed on the street — look for one with its rooftop light lit, meaning it's free. All accept cards. Fares start around $3 plus roughly $1.80 a kilometre and an expected 15–20% tip, so a short central hop is $12–20; the exception is JFK, where a flat $70 fare (plus tolls) applies to and from Manhattan. Uber and Lyft are extremely common and usually comparable in price, sometimes cheaper, and you order them by app rather than hailing — handy in outer areas where free cabs are scarcer, and at night once the subway thins out, though prices rise with demand in rush hour or bad weather. For most visitors, though, a rental car makes little sense in New York: traffic is dense, parking is expensive and scarce, and public transport is faster. The subway, buses, ferries and your own two feet will get you almost everywhere, with a cab or ride-hail filling the late-night gaps. Keep a card or phone ready for contactless payment, and remember to tip drivers as you would in any US city.",
  },
];

function jsonLd() {
  return {
    "@type": "BreadcrumbList",
    "@context": "https://schema.org",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "New York", item: `${SITE}/new-york` },
      { "@type": "ListItem", position: 3, name: "Transport", item: `${SITE}/new-york/transport` },
    ],
  };
}

export default function NewYorkTransport() {
  return (
    <CityGuideShell
      citySlug="new-york"
      cityName="New York"
      categories={CATEGORIES}
      active="transport"
      crumb="Transport"
      h1="Getting Around New York"
      heroImage={IMG}
      intro="New York runs on the largest public-transport network in North America: a 24-hour subway, a dense bus network, share bikes and yellow cabs that tie the whole city together. This guide covers every option — from reaching the city from JFK, LaGuardia and Newark, to how the subway works, how OMNY contactless fares and the weekly cap save you money, cycling and walking the grid, and when a taxi is worth it — with US-dollar prices and money-saving tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Getting around New York — in detail" items={INFO} />
    </CityGuideShell>
  );
}
