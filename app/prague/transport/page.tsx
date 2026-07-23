import type { Metadata } from "next";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { PRAGUE_CATEGORIES } from "@/app/data/prague-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Getting Around Prague 2026 — Metro, Trams & Transport Guide | Flyamba",
  description:
    "How to get around Prague: airport transfers, the metro, the famous tram network, the Petřín funicular, taxis and Bolt, plus the Lítačka ticket system and prices in Czech koruna (Kč).",
  alternates: { canonical: `${SITE}/prague/transport` },
  openGraph: { title: "Getting Around Prague | Flyamba", description: "Airport transfers, metro, trams, funicular, taxis and tickets in Prague.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Prague", item: `${SITE}/prague` },
      { "@type": "ListItem", position: 3, name: "Transport", item: `${SITE}/prague/transport` },
    ],
  };
}

const PLACEHOLDER = "/images/barcelona/placeholder.webp";
const item = (o: Partial<BcnPlace> & { name: string; slug: string; fullDescription: string; tip: string; practicalInfo: BcnPlace["practicalInfo"] }): BcnPlace => ({
  image: PLACEHOLDER, rating: 4.5, area: "Prague", filterKeys: [], description: "", ...o,
});

const ITEMS: BcnPlace[] = [
  item({
    name: "From the airport to the city", slug: "airport-transfers",
    tip: "Skip the taxi rank touts — the AE Airport Express bus or a pre-booked Bolt is cheaper and just as fast.",
    practicalInfo: { openingHours: "AE bus & public buses ~04:30–24:00", price: "Bus 119 ~40 Kč; AE bus ~100 Kč; taxi/Bolt ~500–700 Kč", howToGetThere: "Václav Havel Airport (PRG) is 17 km west of the centre" },
    fullDescription: "Václav Havel Airport (PRG) sits about 17 km west of the centre, and there is no metro or train directly to it — but the bus links are cheap and efficient. The best-value route is public bus 119 to Nádraží Veleslavín, where you change to metro line A (green) for the centre; the whole journey costs a single 40 Kč transfer ticket (valid 90 minutes) and takes around 35–45 minutes. The dedicated Airport Express (AE) bus runs straight to the main train station (Hlavní nádraží) for about 100 Kč with luggage space and no changes, handy if you're catching an onward train. Bus 100 links to metro line B (yellow) at Zličín for the west and south of the city. A regulated taxi or a pre-booked Bolt ride to the centre costs roughly 500–700 Kč and takes 25–40 minutes depending on traffic — convenient with heavy bags or a group. Avoid unmarked drivers touting inside the terminal; use the official taxi desk or an app. Buy bus tickets from the yellow machines or the DPP desk in Arrivals before boarding.",
  }),
  item({
    name: "The Prague Metro", slug: "metro",
    tip: "Only three lines, colour-coded A, B and C — they cross in the centre, so you're rarely more than one change away.",
    practicalInfo: { openingHours: "Daily ~04:45–24:00; trains every 2–10 min", price: "90-min ticket 40 Kč; 30-min short-hop 30 Kč", howToGetThere: "Stations marked with a large 'M'; lines A (green), B (yellow), C (red)" },
    fullDescription: "Prague's metro is fast, clean and refreshingly simple, with just three lines that make it almost impossible to get lost. Line A (green) is the most useful for visitors, running through the historic core with stops at Staroměstská (Old Town and Charles Bridge), Malostranská (below the castle) and Můstek (Wenceslas Square); line B (yellow) crosses it at Můstek and serves Národní třída and Náměstí Republiky; line C (red) runs north–south through the main train station (Hlavní nádraží), Muzeum and Vyšehrad, meeting line A at Muzeum and line B at Florenc. Trains run from around 4:45am to midnight, every two to three minutes at peak times, and the deep Soviet-era escalators are famously long and fast. The same ticket covers metro, trams, buses and the funicular: a 90-minute transfer ticket is 40 Kč, a short 30-minute hop 30 Kč, and 24-hour (120 Kč) and 72-hour (330 Kč) passes offer great value for sightseeing. Validate paper tickets in the yellow machines before entering — inspectors patrol in plain clothes and fine fare-dodgers on the spot.",
  }),
  item({
    name: "Trams", slug: "trams",
    tip: "Ride tram 22 for a scenic, cheap sightseeing loop past the National Theatre and up to Prague Castle.",
    practicalInfo: { openingHours: "Day trams ~04:30–24:00; night trams (90-series) all night", price: "Same tickets as metro; 40 Kč / 90 min", howToGetThere: "Stops throughout the city; board any door and validate on entry" },
    fullDescription: "Prague's tram network is one of the most extensive and beloved in Europe, and for visitors it doubles as a cheap, scenic way to see the city above ground. The historic red trams rattle across bridges and through the old streets, and a couple of routes are effectively sightseeing lines in disguise: tram 22 is the classic, climbing from the New Town past the National Theatre and over the river up to Prague Castle and Strahov, saving your legs on the hill, while tram 17 hugs the riverbank with lovely views. Day trams run roughly 4:30am to midnight, after which a comprehensive network of night trams (numbered in the 90s) takes over, converging on Lazarská in the centre — invaluable for getting home after a night out. Tickets are identical to the metro (40 Kč for 90 minutes, or use a day pass) and must be validated in the yellow machine on board as soon as you get on. Boards at each stop show the timetable and the exact minute of the next tram, and the system is punctual to a fault. Frequent, characterful and covering everywhere the metro misses, the trams are the heart of Prague transport.",
  }),
  item({
    name: "The Petřín funicular", slug: "funicular",
    tip: "Your normal city transport ticket or pass covers the funicular — no separate ticket needed.",
    practicalInfo: { openingHours: "Daily ~09:00–23:20, every 10–15 min (seasonal)", price: "Standard 40 Kč ticket or any day/travel pass", howToGetThere: "Lower station at Újezd (trams 9, 12, 15, 20, 22)" },
    fullDescription: "One of Prague's most charming rides, the Petřín funicular (lanová dráha na Petřín) hauls passengers up the steep, wooded slopes of Petřín Hill from the Malá Strana district to the summit, home to the Eiffel-like lookout tower, the mirror maze, a rose garden and sweeping views over the city. In operation since 1891 and running on the same track ever since, it's a delightful and effortless alternative to the climb, gaining around 130 metres in a few minutes with an intermediate stop at Nebozízek, where there's a restaurant with a fine outlook. Crucially for budget travellers, it is fully integrated into the city transport system: your standard 40 Kč ticket or any 24/72-hour travel pass is valid, so there's no extra fare to pay. The lower station is at Újezd, easily reached by trams 9, 12, 15, 20 and 22, and cars depart every 10 to 15 minutes through the day into the late evening. It can close for maintenance in early spring, so check before relying on it. Combining the funicular up with a gentle walk down through the orchards is one of the loveliest, and cheapest, half-days in Prague.",
  }),
  item({
    name: "Taxis & ride-hailing (Bolt)", slug: "taxis-bolt",
    tip: "Use the Bolt or Uber app rather than hailing on the street — fixed fares mean no meter surprises.",
    practicalInfo: { openingHours: "24/7", price: "Bolt short ride ~150–250 Kč; street taxi ~28 Kč/km", howToGetThere: "Book via app anywhere; official taxi ranks at stations and squares" },
    fullDescription: "Prague has an unfortunate historic reputation for taxi scams, so most visitors and locals now simply use ride-hailing apps, which are widespread, cheap and remove any haggling. Bolt is the dominant app and usually the most affordable, with Uber and Liftago (a local app that also books licensed taxis) as alternatives; a typical ride across the centre costs around 150–250 Kč, with fares fixed and shown before you confirm. If you do take a street taxi, use a reputable company (AAA Radiotaxi and Tick Tack are trusted), check the meter is running, and note the regulated maximum rate is around 28 Kč per kilometre plus a starting fee — most historic-centre journeys are short since the core is so walkable. Avoid unmarked cars and any driver who quotes a flat 'special price' without a meter, particularly around the Old Town Square and the main tourist spots. Given how compact and well-served by trams and metro the city is, you'll rarely need a cab except late at night or with heavy luggage, but when you do, opening the Bolt app is by far the simplest and safest option. Payment by card is standard in the apps.",
  }),
  item({
    name: "Tickets & the Lítačka pass", slug: "litacka-tickets",
    tip: "Buy a 24- or 72-hour pass on the PID Lítačka app — one tap covers unlimited metro, trams, buses and the funicular.",
    practicalInfo: { openingHours: "App & machines 24/7; ticket offices at metro stations", price: "30 min 30 Kč · 90 min 40 Kč · 24h 120 Kč · 72h 330 Kč", howToGetThere: "PID Lítačka app, yellow machines, ticket offices or newsstands (trafika)" },
    fullDescription: "Prague's public transport is run by DPP as a single integrated system (PID), so one ticket covers the metro, trams, buses, the Petřín funicular and even some ferries — you never need separate tickets for different modes. Fares are refreshingly cheap: a 30-minute short-hop ticket is 30 Kč, a 90-minute transfer ticket 40 Kč, a 24-hour pass 120 Kč and a 72-hour pass 330 Kč, the last two excellent value for sightseeing since they allow unlimited travel. The easiest way to buy is the official PID Lítačka smartphone app, which sells all ticket types with a card and stores them on your phone, activated when you start travelling — no paper, no validation needed. Alternatively, buy from the yellow ticket machines at metro stations and many stops (they take cards and coins), from metro-station ticket offices, or from newsstands (trafika). If you have a paper ticket you must validate it in the small yellow box on first use, stamping the time; failure to do so, or riding without a valid ticket, risks an on-the-spot fine of around 1,000 Kč from the plain-clothes inspectors who check regularly. Children under six travel free, and there are discounts for older children and seniors.",
  }),
];

export default function PragueTransport() {
  return (
    <CityGuideShell
      citySlug="prague"
      cityName="Prague"
      categories={PRAGUE_CATEGORIES}
      active="transport"
      crumb="Transport"
      h1="Getting Around Prague"
      heroImage="/images/prague/sevardheter/wenceslas-square.webp"
      intro="Prague is a compact, walkable city, but its excellent public transport makes the rest effortless. Three colour-coded metro lines, one of Europe's best tram networks, a historic hillside funicular and cheap ride-hailing all run on a single, integrated ticket. This guide covers getting in from the airport, using the metro and trams, riding the Petřín funicular, taking taxis safely and — crucially — the Lítačka ticket system and what everything costs in koruna."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Prague transport, mode by mode" items={ITEMS} />
    </CityGuideShell>
  );
}
