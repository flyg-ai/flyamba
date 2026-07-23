import type { Metadata } from "next";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { PRAGUE_CATEGORIES } from "@/app/data/prague-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Prague Weather 2026 — Best Time to Visit | Flyamba",
  description:
    "Prague weather by season: average temperatures, rainfall and what to pack, plus the best times to visit — from warm summers and golden autumns to snowy Christmas-market winters.",
  alternates: { canonical: `${SITE}/prague/weather` },
  openGraph: { title: "Prague Weather & Best Time to Visit | Flyamba", description: "Season-by-season climate and the best time to visit Prague.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Prague", item: `${SITE}/prague` },
      { "@type": "ListItem", position: 3, name: "Weather", item: `${SITE}/prague/weather` },
    ],
  };
}

type M = { month: string; high: number; low: number; note: string };
const MONTHS: M[] = [
  { month: "January", high: 2, low: -3, note: "Cold, often snowy; post-holiday quiet and lowest prices" },
  { month: "February", high: 4, low: -2, note: "Cold and crisp; carnival season, few crowds" },
  { month: "March", high: 9, low: 0, note: "Chilly, thawing; Easter markets appear late month" },
  { month: "April", high: 15, low: 4, note: "Mild spring, blossom on Petřín; occasional showers" },
  { month: "May", high: 20, low: 9, note: "Warm, green and lovely; Prague Spring festival" },
  { month: "June", high: 23, low: 12, note: "Warm early summer, long days; peak greenery" },
  { month: "July", high: 25, low: 14, note: "Warmest month, occasional thunderstorms; busy" },
  { month: "August", high: 25, low: 14, note: "Warm and lively; peak tourist season" },
  { month: "September", high: 20, low: 10, note: "Golden, warm days, thinner crowds — ideal" },
  { month: "October", high: 13, low: 5, note: "Crisp autumn colour; Signal light festival" },
  { month: "November", high: 6, low: 1, note: "Grey, cold and cheap; quietest month" },
  { month: "December", high: 3, low: -2, note: "Cold, festive; magical Christmas markets" },
];

const PLACEHOLDER = "/images/barcelona/placeholder.webp";
const item = (o: Partial<BcnPlace> & { name: string; slug: string; fullDescription: string; tip: string; practicalInfo: BcnPlace["practicalInfo"] }): BcnPlace => ({
  image: PLACEHOLDER, rating: 4.5, area: "Prague", filterKeys: [], description: "", ...o,
});

const ITEMS: BcnPlace[] = [
  item({
    name: "Spring (March–May)", slug: "spring",
    tip: "Late April and May are arguably the best weeks of the year — blossom, mild sun and pre-summer crowds.",
    practicalInfo: { openingHours: "March–May", price: "Highs 9–20°C; lows 0–9°C", howToGetThere: "Pack layers, a light jacket and an umbrella" },
    fullDescription: "Spring is one of the loveliest times to visit Prague, as the long grey winter gives way to blossom, greenery and lengthening days. March starts cold and can still see snow, but by April the parks and the orchards of Petřín Hill burst into blossom, temperatures climb into the mid-teens, and café terraces reopen along the river. May is the pick of the season: warm, sunny days of around 20°C, the city at its greenest, and the prestigious Prague Spring international music festival filling the concert halls. It's a shoulder period, so crowds and prices sit below the summer peak while the weather is reliably pleasant for walking and sightseeing. The catch is changeability — spring can deliver a run of glorious warm days followed by a cold, showery spell — so layers and a packable umbrella are essential. Evenings remain cool, especially early in the season, calling for a jacket. Easter brings charming markets to the Old Town Square and Wenceslas Square in late March or April, with painted eggs, crafts and seasonal food. For a balance of good weather, blossoming beauty, cultural events and manageable crowds, spring is a superb, and slightly cheaper, time to come.",
  }),
  item({
    name: "Summer (June–August)", slug: "summer",
    tip: "Beat the heat and crowds with early starts, and cool off in the many riverside and park beer gardens.",
    practicalInfo: { openingHours: "June–August", price: "Highs 23–25°C; lows 12–14°C", howToGetThere: "Pack light clothes, sunscreen and a light layer for evenings" },
    fullDescription: "Summer is Prague's peak season, when the city is at its warmest, liveliest and busiest. Daytime highs settle around 23–25°C, occasionally pushing higher during heatwaves, with long daylight hours stretching well past 9pm — perfect for late-evening strolls across a floodlit Charles Bridge. The riverbanks, parks and the city's beloved beer gardens (Letná, Riegrovy sady, Vyšehrad) come into their own, buzzing with locals and visitors enjoying a cold half-litre in the sun. It's a wonderful atmosphere, but it comes with the largest crowds of the year and the highest hotel prices, and the most famous sights — Charles Bridge, the castle, the Old Town Square — can feel packed in the middle of the day. The heat is generally comfortable rather than oppressive, though July can bring sudden afternoon thunderstorms, so a light rain layer is worth having. To make the most of it, start sightseeing early before the tour groups arrive and the temperature rises, take a midday break in a shady beer garden or a museum, and save the atmospheric bridge and castle views for the golden light of late evening. Book accommodation well ahead, as the city fills up throughout the season.",
  }),
  item({
    name: "Autumn (September–October)", slug: "autumn",
    tip: "September is a sweet spot — summer warmth with autumn calm; October adds the spectacular Signal light festival.",
    practicalInfo: { openingHours: "September–October", price: "Highs 13–20°C; lows 5–10°C", howToGetThere: "Pack layers, a warmer jacket and comfortable walking shoes" },
    fullDescription: "Autumn is, for many, the ideal time to visit Prague, combining pleasant weather with thinner crowds and the city dressed in golden colour. September often holds on to summer's warmth, with comfortable highs around 20°C and long, mellow days, but without the peak-season crush and prices — arguably the single best month to come. As October progresses the temperature cools into the teens and the parks of Stromovka, Petřín and Letná turn spectacular shades of amber and red, beautiful for walks and photography. Evenings draw in and grow chilly, so a warmer jacket and layers are needed, and the odd grey, drizzly day appears, but the light on the spires and the river can be magical. Culturally it's a rich season: October brings the dazzling Signal Festival, when light installations and projections transform the city's streets and monuments over four nights, drawing big crowds after dark. Wine lovers can also try burčák, the young, cloudy, partly fermented wine sold only in early autumn. With mild-to-cool temperatures, autumn colour, atmospheric light and lively events, September and October offer a wonderful balance of comfort, beauty and value for a Prague city break.",
  }),
  item({
    name: "Winter (November–February)", slug: "winter",
    tip: "December's Christmas markets are magical but pricey — for the cheapest, quietest visit come in January or February.",
    practicalInfo: { openingHours: "November–February", price: "Highs 2–6°C; lows -3 to 1°C", howToGetThere: "Pack a warm coat, hat, gloves, scarf and waterproof boots" },
    fullDescription: "Winter in Prague is cold but atmospheric, and if you don't mind bundling up it can be the most magical time of all. Temperatures hover around freezing, with daytime highs of 2–6°C and frequent frosts, and the city sees regular snowfall that dusts the red rooftops, spires and Charles Bridge into a genuine fairytale scene. The undisputed highlight is the Christmas market season through December: the Old Town Square and Wenceslas Square fill with wooden stalls, a giant tree, carol singers and the smell of mulled wine (svařák), roasting sausages and trdelník pastries — one of Europe's prettiest festive experiences, though it brings crowds and the year's highest hotel prices, peaking over New Year. For the opposite extreme, January and February are the quietest and cheapest months to visit, with few tourists, easy access to sights and cosy pubs to warm up in, plus the pre-Lenten Bohemian Carnevale (Masopust) celebrations. Days are short and grey, so plan around the daylight, layer up with a proper warm coat, hat, gloves and waterproof boots, and build in plenty of indoor breaks in the city's grand cafés, beer halls and museums. Snowy, festive and refreshingly uncrowded outside the holidays, winter shows Prague at its most romantic.",
  }),
  item({
    name: "The best time to visit Prague", slug: "best-time",
    tip: "For the best all-round trip, aim for May, September or early October — warm enough, lovely light, fewer crowds.",
    practicalInfo: { openingHours: "Year-round destination", price: "Shoulder seasons: best value & weather balance", howToGetThere: "Avoid Christmas/New Year and peak July–August for lower prices" },
    fullDescription: "Prague is a genuine year-round destination, but the best time to visit depends on what you want. For the ideal balance of pleasant weather, beautiful light and manageable crowds, target the shoulder seasons of late spring (May) and early autumn (September to early October): temperatures are comfortable for walking, the parks are green or turning gold, cultural festivals are in full swing, and hotel prices sit below the summer and Christmas peaks. If you want the warmest weather, the longest days and the liveliest beer-garden buzz — and don't mind the biggest crowds and highest prices — high summer (June to August) delivers, though early mornings and evenings are best for the headline sights. For the festive magic of the Christmas markets and possible snow, December is unbeatable but busy and pricey, especially around New Year. And for the lowest prices and quietest streets, brave the cold of January and February, when you'll have the frosty, atmospheric city almost to yourself. Whatever the season, the historic core is compact and rewarding, so pack for the weather, plan around the daylight hours in winter, and you'll find Prague magical at any time of year. On balance, September edges it as the single best month to come.",
  }),
];

export default function PragueWeather() {
  return (
    <CityGuideShell
      citySlug="prague"
      cityName="Prague"
      categories={PRAGUE_CATEGORIES}
      active="weather"
      crumb="Weather"
      h1="Prague Weather & Best Time to Visit"
      heroImage="/images/prague/sevardheter/karlsbron.webp"
      intro="Prague has a temperate continental climate with four distinct seasons — warm summers, crisp golden autumns, cold and often snowy winters, and blossoming springs. It's a year-round city break, but the shoulder seasons of May and September offer the best balance of pleasant weather and thinner crowds. Here's what to expect each season, when to visit, and what to pack."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />

      <div className="mt-8 overflow-x-auto rounded-3xl border border-border bg-card">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-widest text-muted-foreground">
              <th className="p-4">Month</th>
              <th className="p-4">Avg high</th>
              <th className="p-4">Avg low</th>
              <th className="p-4">What to expect</th>
            </tr>
          </thead>
          <tbody>
            {MONTHS.map((m) => (
              <tr key={m.month} className="border-b border-border last:border-0">
                <td className="p-4 font-serif text-base font-semibold text-foreground">{m.month}</td>
                <td className="p-4 text-foreground">{m.high}°C</td>
                <td className="p-4 text-muted-foreground">{m.low}°C</td>
                <td className="p-4 text-muted-foreground">{m.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CategorySeoSections heading="Prague weather, season by season" items={ITEMS} />
    </CityGuideShell>
  );
}
