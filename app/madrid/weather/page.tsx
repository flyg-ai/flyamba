import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/madrid-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Madrid Weather 2026 — Best Time to Visit & What to Pack",
  description:
    "Madrid weather month by month — temperatures, seasons and what to pack, plus the best time to visit.",
  alternates: { canonical: `${SITE}/madrid/weather` },
  openGraph: { title: "Madrid Weather & Best Time to Visit | Flyamba", description: "Season-by-season temperatures and packing tips for Madrid.", type: "article" },
};

const IMG = "/images/madrid/attractions/retiro-parken.webp";

const INFO: BcnPlace[] = [
  {
    name: "Madrid's climate in a nutshell", slug: "climate-overview", image: IMG, rating: 5, area: "Year-round",
    tip: "The difference between day and night is large because of the altitude — always pack an extra layer, even in summer.",
    filterKeys: [],
    description: "Madrid has a continental climate: hot, dry summers, cool, clear winters and around 300 days of sunshine a year.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Summer highs 31–34°C; winter highs ~10°C; ~300 sunny days a year" },
    fullDescription: "Madrid's weather is shaped by its position high on the Castilian plateau — 667 metres above sea level, ringed by the Sierra de Guadarrama — which gives it a markedly continental climate. That means hot, dry summers and cool, clear winters, with big swings between day and night temperatures, and it makes Madrid one of Europe's sunniest capitals, with around 300 days of sunshine a year. Rainfall is low and concentrated in spring and autumn; summer is parched and cloudless, while winter days are often crisp and blue even when nights drop toward freezing. The altitude is the key to understanding the climate: even on a warm day the evening can turn sharply cool, so layers matter year-round. The upshot for visitors is a city that is reliably sunny but rarely humid, brutally hot at the height of summer and genuinely cold on winter nights, with spring and autumn offering the most comfortable balance. Whenever you come, plan around the sun and the day-to-night temperature gap, carry water in the heat, and keep an extra layer for the evenings.",
  },
  {
    name: "Month by month", slug: "month-by-month", image: IMG, rating: 5, area: "Jan–Dec",
    tip: "Daytime highs can be 10–15°C warmer than the nights — those figures are daytime temperatures.",
    filterKeys: [],
    description: "Average daytime highs climb from around 10°C in winter to 34°C at the height of summer.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Jan/Dec ~10°C · Apr ~19°C · Jun ~31°C · Jul ~34°C · Oct ~20°C" },
    fullDescription: "Here is how Madrid's average daytime highs unfold across the year. January is the coldest month at around 10°C, sunny but with cold nights near freezing; February warms gently to about 13°C. March brings spring at around 17°C, with days pleasant but nights still fresh, and April is a lovely 19°C — mild, sunny and perfect for sightseeing. May climbs to a warm, sunny 24°C without the summer heat, one of the very best months, while June accelerates to about 31°C, hot and dry but still enjoyable. July is the scorcher at around 34°C, baking and bone-dry, when many Madrileños leave for the coast; August stays in the low 30s with heatwaves possible and a quieter, sleepier city. September eases back to a warm, comfortable 28°C — an excellent time to visit — and October is a mild, beautiful 20°C, one of the most pleasant months of all. November cools to around 14°C, clearer and cheaper with fewer tourists, and December returns to about 10°C, often crisp and sunny with cold nights and Christmas cheer. Remember these are daytime figures; nights run 10–15°C cooler.",
  },
  {
    name: "Spring (April–June)", slug: "spring", image: IMG, rating: 5, area: "Apr–Jun",
    tip: "May is arguably the single best month — warm, sunny days without the summer heat, and Retiro at its greenest.",
    filterKeys: [],
    description: "Spring brings mild-to-warm days, blooming parks and pleasant evenings — one of the best times to visit.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Highs ~19°C (Apr) rising to ~31°C (Jun); Retiro rose garden blooms May–June" },
    fullDescription: "Spring is one of the very best times to visit Madrid, as the city warms up and heads outdoors. Temperatures climb from a mild 19°C in April to a warm 31°C by June, the days lengthen, and the terrazas and squares fill with life. April is soft and sunny, ideal for unhurried sightseeing before the heat arrives; May is arguably the standout month of the whole year — warm, sunny, dry days in the low-to-mid twenties, comfortable evenings for outdoor tapas, and Retiro park at its most beautiful, with the Rosaleda rose garden bursting into bloom through May and June. By June the mercury is rising and the first real heat of summer is felt, though it remains thoroughly pleasant, especially in the mornings and evenings. Spring skies are famously blue, rain is infrequent, and the light is glorious, but the day-to-night swing is still marked, so pack layers and something warmer for after dark. Crowds and prices sit below the peak, making it excellent value too. For comfortable temperatures, blue skies, blooming parks and long, pleasant evenings, spring — and May above all — is hard to beat in Madrid.",
  },
  {
    name: "Summer (July–August) — scorching", slug: "summer", image: IMG, rating: 5, area: "Jul–Aug",
    tip: "Follow the siesta logic: sightsee in the morning and after 7pm, and shelter indoors (or in the air-conditioned metro) at midday.",
    filterKeys: [],
    description: "Summer is intensely hot and very dry, often 34–40°C, with a quieter, sleepier city as locals head for the coast.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Highs 33–34°C, heatwaves to 40°C+; magical late evenings on the terrazas" },
    fullDescription: "Madrid's summers are scorching and extremely dry — daytime highs sit around 33–34°C in July and August, and heatwaves can push the mercury past 40°C, making the middle of the day genuinely punishing between roughly noon and 6pm. The air is arid rather than humid, and rain is a rarity. Many Madrileños escape the heat by heading north to the coast during August, so the city grows quieter and sleepier, with some smaller restaurants closing for the month, but the trade-off is thinner crowds at the big sights. If you visit in high summer, adopt the local rhythm: do your sightseeing early in the morning and again after 7pm when the temperature drops, take refuge indoors — in the air-conditioned museums or metro — during the fiercest hours, and always carry water. The reward comes at night: once the heat eases, Madrid's summer evenings are magical, with the terrazas and plazas filling with people who stay out long past midnight in the warm air. Pack light, breathable clothing, sunglasses, a hat and strong sun cream, and plan your days around the heat rather than fighting it.",
  },
  {
    name: "Autumn & winter (Sep–Feb)", slug: "autumn-winter", image: IMG, rating: 5, area: "Sep–Feb",
    tip: "September and October are superb — warm, sunny and calmer; winter is mild by day but cold at night, with the lowest prices.",
    filterKeys: [],
    description: "Autumn cools to beautiful, sunny days; winter is mild and clear by day, cold at night, and cheapest of all.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Sep ~28°C, Oct ~20°C, Nov ~14°C; winter highs ~10°C, cold nights, rare snow" },
    fullDescription: "Autumn is one of Madrid's most underrated seasons. The summer heat breaks in September to a warm, comfortable 28°C, and October settles into a beautiful 20°C with clear skies, fewer tourists and glorious light — both months are excellent for sightseeing and outdoor dining. By November the city cools to around 14°C, turning crisper and clearer, with lower prices and thinner crowds. Winter (December to February) is mild by Mediterranean-Europe standards during the day, with highs around 10°C, but the altitude makes the nights genuinely cold, often dropping toward or below freezing; occasional frost occurs and snow falls rarely, perhaps once or twice a winter, though days are frequently bright and sunny. This is the low season, with the cheapest flights and hotels and the shortest museum queues — February is typically the best-value month to fly — and the run-up to Christmas fills Gran Vía and the plazas with lights and festive cheer. Pack layers for autumn and a warm coat, scarf and hat for winter nights, and enjoy a calmer, cheaper Madrid that still delivers plenty of sunshine.",
  },
  {
    name: "Best time to visit & what to pack", slug: "best-time-packing", image: IMG, rating: 5, area: "Planning",
    tip: "Aim for May or September–October for the best mix of weather, prices and atmosphere; layers work in every season.",
    filterKeys: [],
    description: "April–June and September–October offer the best balance of warm, sunny weather and manageable crowds and prices.",
    practicalInfo: { openingHours: "N/A", price: "N/A", howToGetThere: "Best overall: May and September–October; cheapest: February & November" },
    fullDescription: "So when should you go? For the best overall balance, aim for spring (April–June) or early-to-mid autumn (September–October): the weather is warm, dry and sunny at 20–28°C, the evenings are perfect for outdoor tapas, and crowds and prices sit below the peak — with May and September–October the sweet spots. Choose high summer (July–August) only if you don't mind serious heat of 34–40°C and a quieter, sleepier city, planning your days around the midday sun. Choose winter (especially February and November) if budget is the priority: flights and hotels are cheapest, museum queues shortest, and the days often crisp and sunny, though nights are cold. Whatever the season, pack in layers, because Madrid's day-to-night swing is always significant. For summer, bring light, breathable clothes, sunglasses, a hat, sun cream and a reusable water bottle. For spring and autumn, add a light jacket or jumper for the cooler evenings. For winter, pack a warm coat, scarf, hat and good shoes for the cold nights, even though the days are frequently bright. Dress for the altitude and Madrid will rarely catch you out.",
  },
];


export default function MadridWeather() {
  return (
    <CityGuideShell
      citySlug="madrid"
      cityName="Madrid"
      categories={CATEGORIES}
      active="weather"
      crumb="Weather"
      h1="Madrid Weather & Best Time to Visit"
      heroImage={IMG}
      intro="Madrid's continental climate, high on the Castilian plateau, means hot, dry summers, cool, clear winters and around 300 days of sunshine a year — with big swings between day and night. This guide walks through the weather month by month and season by season, with temperatures and what to pack, and pinpoints the best time to visit depending on whether you're chasing warm terraces, blue skies or the lowest prices."
      wide
    >
      <CategorySeoSections heading="Madrid weather season by season — in detail" items={INFO} />
    </CityGuideShell>
  );
}
