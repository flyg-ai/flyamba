import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES, MADRID } from "@/app/data/madrid-places";
import { SITE } from "@/app/lib/destination-helpers";
import { usd5 } from "@/app/lib/format";

const usdMonths = MADRID.monthlyPrices.map((m) => ({ month: m.month, price: usd5(m.price) }));
const MIN_USD = Math.min(...usdMonths.map((m) => m.price));
const MAX_USD = Math.max(...usdMonths.map((m) => m.price));

export const metadata: Metadata = {
  title: "Madrid Prices 2026 — Flights, Daily Budget & Costs | Flyamba",
  description:
    "How much does Madrid cost? Flight prices by month, a realistic daily budget, and typical prices for tapas, beer, coffee, hotels, the metro and museums…",
  alternates: { canonical: `${SITE}/madrid/prices` },
  openGraph: { title: "How Much Does Madrid Cost? | Flyamba", description: "Flight prices, daily budgets and typical costs in Madrid.", type: "article" },
};

const IMG = "/images/madrid/attractions/mercado-de-san-miguel.webp";

const INFO: BcnPlace[] = [
  {
    name: "How expensive is Madrid?", slug: "how-expensive", image: IMG, rating: 5, area: "Overview",
    tip: "Madrid is one of Europe's best-value capitals — cheaper than Barcelona in like-for-like categories, and far cheaper than Paris or London.",
    filterKeys: [],
    description: "Madrid is one of Europe's best-value big cities, with excellent-value food and cheap, efficient public transport.",
    practicalInfo: { openingHours: "N/A", price: "Mid-range day (food, transport, one museum) ~€50–70 per person", howToGetThere: "Currency: euro (€); cards accepted everywhere, carry some cash for small tabernas and El Rastro" },
    fullDescription: "Madrid is one of the best-value major capitals in Europe. In like-for-like categories it works out cheaper than Barcelona or Seville, and considerably cheaper than Paris, London or the Nordic capitals. The currency is the euro. A mid-range day — covering food, public transport and one museum — comes to roughly €50–70 per person, well below the €100-plus you'd spend in Paris. The single greatest value in the city is the lunchtime menú del día, a fixed-price multi-course meal (starter, main, drink, bread and often dessert or coffee) for €12–18 at a local taberna, arguably the best lunch deal in Europe. A caña (a small 20cl beer) runs €2.50–3.50 depending on the neighbourhood — cheapest in La Latina, priciest in Salamanca and on Gran Vía — while a coffee is €1.50–2 standing at the bar. Cards are accepted almost everywhere in the centre, though it's worth carrying €20–30 in cash for small tabernas and the El Rastro market. Between cheap food, affordable transport and much-free culture, Madrid delivers a big-city experience at a notably gentle price.",
  },
  {
    name: "Cheapest time to fly", slug: "cheapest-flights", image: IMG, rating: 5, area: "Flights",
    tip: "Book 5–7 weeks ahead and fly midweek. February and November are the lowest months; July is the most expensive.",
    filterKeys: [],
    description: `Round-trip fares to Madrid run from about $${MIN_USD} in the cheapest months to around $${MAX_USD} at the summer peak.`,
    practicalInfo: { openingHours: "N/A", price: `Cheapest ~$${MIN_USD} (Feb) · Peak ~$${MAX_USD} (Jul)`, howToGetThere: "Book 5–7 weeks ahead; fly midweek; autumn offers the best price–weather balance" },
    fullDescription: `Flight prices to Madrid-Barajas swing with the seasons. Round-trip fares start from around $${MIN_USD} in the cheapest months and climb to roughly $${MAX_USD} at the height of summer. February is the single cheapest month to fly, with November close behind — both are low season, quieter and better value, with February typically the rock-bottom month. Prices build through spring, spike in July and August (the most expensive period, driven by the school holidays despite Madrid's fierce heat), then ease again through the autumn. The savviest window for many travellers is September and October, when fares have dropped from the summer peak but the weather is still warm and sunny — the best balance of price and conditions. To get the best deal, book roughly five to seven weeks in advance and fly midweek rather than at weekends, when fares are highest. Madrid is a major Iberia hub with excellent connectivity, so there is strong competition on many routes and frequent sales; setting a price alert and staying flexible on dates can shave a good deal off the fare. For the lowest prices overall, aim for February or November and travel on a weekday.`,
  },
  {
    name: "Daily budget", slug: "daily-budget", image: IMG, rating: 5, area: "Planning",
    tip: "Budget travellers can enjoy Madrid on €50–70 a day thanks to cheap menús del día, free museum hours and low transport costs.",
    filterKeys: [],
    description: "A realistic daily budget runs from around €50–70 for mid-range travellers, less if you use the free museum hours.",
    practicalInfo: { openingHours: "N/A", price: "Hotels from ~€70 low season / ~€120 high; food ~€30–50/day", howToGetThere: "Cheaper areas: La Latina, Lavapiés; pricier: Salamanca, Chamberí" },
    fullDescription: "Putting the pieces together, Madrid is very manageable on a moderate budget. A mid-range traveller can expect to spend roughly €50–70 a day per person on food, transport and a museum, and considerably less if you lean on the abundant free museum hours and the cheap menú del día for lunch. Accommodation is the biggest variable: central hotels start from around €70 a night in low season and €120 in high season, with budget hostales and hostels cheaper still and luxury hotels from around €300. Food runs about €30–50 a day if you mix a bargain fixed-price lunch with a tapas dinner, and can be much less if you graze at markets and neighbourhood bars. Public transport is cheap — a 10-journey Metrobús card is €12.20 and covers most trips — and many of the city's greatest sights are free at certain times. Choosing the right neighbourhood helps the budget too: La Latina, Lavapiés and Embajadores are cheaper for both eating and sleeping, while Salamanca and Chamberí are pricier. Overall, Madrid lets you experience a world-class capital — art, food and nightlife — without the punishing costs of Paris or London.",
  },
  {
    name: "Eating & drinking prices", slug: "eating-prices", image: IMG, rating: 5, area: "Food & drink",
    tip: "The menú del día (€12–18) is the best lunch value in Europe. Tipping isn't obligatory — 5–10% at nicer dinners, rounding up for tapas.",
    filterKeys: [],
    description: "Typical costs: menú del día €12–18, a caña €2.50–3.50, coffee €1.50–2, tapas €3–8, a mid-range dinner €25–40.",
    practicalInfo: { openingHours: "N/A", price: "Menú del día €12–18 · caña €2.50–3.50 · coffee €1.50–2 · tapas €3–8 · dinner €25–40", howToGetThere: "Cheapest bars in La Latina; priciest on Gran Vía and in Salamanca" },
    fullDescription: "Food and drink are where Madrid's value really shines. The lunchtime menú del día — a fixed-price meal of starter, main, drink and bread, often with dessert or coffee — costs just €12–18 at a local taberna and is the best-value lunch in Europe. A caña (a small 20cl draught beer) runs €2.50–3.50 depending on the area: cheapest in La Latina, dearest in Salamanca and on tourist-heavy Gran Vía. A coffee is €1.50–2 standing at the bar, or around €3 if you sit down; individual tapas cost €3–8 each; and a dinner at a mid-range restaurant comes to roughly €25–40 per person including wine. Tipping is not obligatory — service is included in the price — but 5–10% is appreciated at nicer dinners, while for tapas simply rounding up is fine; cover charges (coperto) are rare in Madrid, unlike Italy. Paying by card is universally accepted in the centre, but keep €20–30 in cash for small tabernas and market stalls. A tip for eating well and cheaply: avoid restaurants with menus in six languages and the tourist-priced terraces on the main squares, and follow the locals into the side-street bars a few minutes away.",
  },
  {
    name: "Museum & attraction costs", slug: "attraction-costs", image: IMG, rating: 5, area: "Culture",
    tip: "The Paseo del Arte pass (€32) covers the Prado, Reina Sofía and Thyssen and saves €8 over separate tickets — but so much is free at set times.",
    filterKeys: [],
    description: "The big museums cost €12–15, but all three offer free hours; the Royal Palace is €14 (free for EU citizens at set times).",
    practicalInfo: { openingHours: "N/A", price: "Prado €15 · Reina Sofía €12 · Thyssen €13 · Paseo del Arte pass €32 · Royal Palace €14 · Bernabéu tour €35", howToGetThere: "Free hours: Prado last 2h daily; Reina Sofía select evenings; palace late afternoons (EU citizens)" },
    fullDescription: "Culture in Madrid is remarkably affordable, and much of it is free if you time it right. The three great art museums cost €15 (Prado), €12 (Reina Sofía) and €13 (Thyssen-Bornemisza); the Paseo del Arte combined pass covers all three for €32 (valid a year, no queuing) and saves €8 over separate tickets if you plan to do all three. Crucially, all three offer free hours: the Prado is free the last two hours every day (Mon–Sat 18:00–20:00, Sun 17:00–19:00), and the Reina Sofía is free on select evenings and Sunday afternoons — the queue forms about 30 minutes before, but moves quickly. The Royal Palace is €14, and free for EU citizens on weekday late afternoons (bring your passport). Many other highlights are free or nearly so: Retiro park, the Templo de Debod, CaixaForum's exhibitions, the Palacio de Cristal and the Sorolla museum (€3, with free slots) among them. The Bernabéu stadium tour is €35, and Real Madrid match tickets start around €50. A Madrid Card exists but rarely pays off, precisely because so much is already free at specific times — plan around the free hours instead and your culture budget will stretch a long way.",
  },
  {
    name: "How to see Madrid for less", slug: "money-saving", image: IMG, rating: 5, area: "Tips",
    tip: "Time the free museum hours, eat the menú del día at lunch, base yourself in La Latina or Lavapiés, and use a shared Metrobús card.",
    filterKeys: [],
    description: "Free museum hours, the fixed-price lunch, cheaper neighbourhoods and shared transport cards keep Madrid affordable.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Fly Feb/Nov, book 5–7 weeks ahead, stay in La Latina/Lavapiés, use free museum hours" },
    fullDescription: "Madrid is easy to enjoy on a budget with a few smart moves. First, time the free museum hours: the Prado's free last two hours daily, and the Reina Sofía's free evenings and Sunday afternoons, let you see world-class art for nothing — arrive about 30 minutes before to beat the queue. Second, make lunch your main meal and order the menú del día, the fixed-price multi-course deal at €12–18 that is unbeatable value, then keep dinner light with a few tapas. Third, choose your neighbourhood wisely: staying and eating in La Latina, Lavapiés or Embajadores is cheaper than Salamanca or Chamberí, while still being central. Fourth, use public transport smartly — a €12.20 Metrobús card covers 10 journeys and can be shared among your group, and walking the compact centre is free and often faster. Fifth, on flights, aim for February or November, book five to seven weeks ahead and fly midweek. Finally, take advantage of how much is simply free: Retiro park, the Templo de Debod at sunset, CaixaForum's exhibitions, El Rastro market and the endless free spectacle of the city's plazas and streets. Do all this and Madrid delivers a rich trip at a modest cost.",
  },
];


export default function MadridPrices() {
  return (
    <CityGuideShell
      citySlug="madrid"
      cityName="Madrid"
      categories={CATEGORIES}
      active="prices"
      crumb="Prices"
      h1="How Much Does Madrid Cost?"
      heroImage={IMG}
      intro={`Madrid is one of Europe's best-value capitals, cheaper than Barcelona in like-for-like categories and far cheaper than Paris or London. This guide breaks down what a trip actually costs — flight prices by month (from about $${MIN_USD}), a realistic daily budget, and typical prices for tapas, beer, coffee, hotels, the metro and the museums — plus the many ways to see the city for less.`}
      wide
    >
      <CategorySeoSections heading="Madrid costs and budgets — in detail" items={INFO} />
    </CityGuideShell>
  );
}
