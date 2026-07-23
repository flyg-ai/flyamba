import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { PALMA_CATEGORIES } from "@/app/data/palma-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Palma Weather 2026 — Best Time to Visit Guide | Flyamba",
  description:
    "Palma de Mallorca weather month by month — hot, dry summers around 30°C, warm September seas, mild sunny winters and the best time to visit, with a full climate table and what to pack.",
  alternates: { canonical: `${SITE}/palma/weather` },
  openGraph: { title: "Palma Weather & Best Time to Visit | Flyamba", description: "Month-by-month Palma climate, sea temperatures and the best time to visit.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Palma", item: `${SITE}/palma` },
      { "@type": "ListItem", position: 3, name: "Weather", item: `${SITE}/palma/weather` },
    ],
  };
}

// month, avg high °C, avg low °C, sea °C, rainy days, verdict
const CLIMATE: [string, string, string, string, string, string][] = [
  ["January", "15°", "6°", "14°", "6", "Mild, quiet"],
  ["February", "15°", "6°", "14°", "5", "Mild, almond blossom"],
  ["March", "17°", "7°", "14°", "5", "Spring warming"],
  ["April", "19°", "9°", "15°", "5", "Pleasant, green"],
  ["May", "23°", "12°", "17°", "4", "Warm, ideal"],
  ["June", "27°", "16°", "21°", "3", "Hot, swimmable"],
  ["July", "30°", "19°", "24°", "1", "Peak heat"],
  ["August", "30°", "20°", "26°", "2", "Hottest, warmest sea"],
  ["September", "27°", "17°", "25°", "5", "Warm, superb sea"],
  ["October", "23°", "14°", "22°", "8", "Mild, wetter"],
  ["November", "18°", "10°", "18°", "8", "Cooler, wettest"],
  ["December", "16°", "8°", "15°", "7", "Mild, festive"],
];

const SECTIONS: { heading: string; paragraphs: string[] }[] = [
  {
    heading: "Palma's climate at a glance",
    paragraphs: [
      "Palma de Mallorca enjoys a classic Mediterranean climate: hot, dry summers and mild, relatively wet winters, with an exceptional amount of sunshine spread across the year — around 300 sunny days and roughly 2,750 hours of sun annually. Its position on a sheltered southern bay of the island keeps extremes at bay, so it rarely gets uncomfortably cold and the summer heat, while strong, is tempered by sea breezes.",
      "Summers (June to September) are hot and reliably rainless, with daytime highs around 30°C in July and August and long, warm evenings. Winters (December to February) are mild by northern European standards, with daytime highs of 15–16°C, chilly nights and the occasional rainy spell, but plenty of bright, clear days. Spring and autumn are warm, green and far quieter — many regulars consider them the sweet spot.",
    ],
  },
  {
    heading: "Summer: June to September",
    paragraphs: [
      "High summer is peak season for good reason: near-guaranteed sunshine, highs of 28–31°C, and warm seas perfect for swimming. July is the driest and hottest month, often going the whole month with barely a drop of rain, while August brings the warmest sea of all at around 26°C. It can get hot in the middle of the day, so plan sightseeing for the morning and evening, seek shade and drink plenty of water.",
      "The trade-off is crowds and prices — Palma airport is one of Europe's busiest in summer, hotels and flights peak, and the beaches and old town are at their busiest. September is a favourite compromise: the sea is at its warmest after a whole summer of heating, temperatures ease slightly, and the crowds begin to thin once the school holidays end.",
    ],
  },
  {
    heading: "Spring and autumn: the sweet spot",
    paragraphs: [
      "April, May, early June and October offer arguably the best all-round conditions. Spring brings warm, comfortable days of 19–25°C, wildflowers and green mountains, and it's superb for walking the Serra de Tramuntana, cycling and sightseeing before the heat and crowds arrive; the sea is still cool for swimming until late May. Autumn holds onto summer's warmth, with October days around 22–23°C and the sea still a balmy 21–22°C, though it is noticeably wetter as the rains return.",
      "Both shoulder seasons mean lower prices, easier restaurant tables and a more relaxed feel, making them ideal for a city-and-island break that mixes beaches with active days and culture.",
    ],
  },
  {
    heading: "Winter: mild and quiet",
    paragraphs: [
      "Winter in Palma is mild, low-key and increasingly popular for off-season city breaks. Daytime temperatures hover around 15–16°C with plenty of sunny days, though evenings are cool and you'll want a jacket, and November and December are the wettest months. Swimming is off the menu for most, with sea temperatures around 14–15°C, but the old town, museums, restaurants and festivals like January's Sant Sebastià are at their most atmospheric and crowd-free.",
      "Late January and February also bring the island's famous almond blossom, blanketing the countryside in white and pink — a beautiful, little-known reason to visit in the depths of winter. Note that some resort-area hotels, beach bars and attractions close over the coldest months.",
    ],
  },
  {
    heading: "Sea temperature and the best time to visit",
    paragraphs: [
      "The Mediterranean around Palma is comfortably swimmable from roughly June to October. It warms slowly through spring — still a bracing 17°C in May — peaks at around 26°C in August, and, crucially, stays warm well into autumn, with September and October seas of 22–25°C often more pleasant than June's. If beach time is your priority, aim for July to September.",
      "Overall, the best time to visit depends on your plans: May, June and September for the ideal balance of warm weather, swimmable seas and manageable crowds; July and August for guaranteed heat and beach days if you don't mind the peak-season bustle; April and October for active sightseeing and lower prices; and the mild winter for a quiet, festive, culture-focused city break. Whatever the season, pack sun protection — Palma is sunny for most of the year — and add a light layer for cooler evenings outside high summer.",
    ],
  },
];

export default function PalmaWeather() {
  return (
    <CityGuideShell
      citySlug="palma"
      cityName="Palma"
      categories={PALMA_CATEGORIES}
      active="weather"
      crumb="Weather"
      h1="Palma Weather & Best Time to Visit"
      heroImage="/images/content/photo-1504386106331-3e4e71712b38.avif"
      intro="With around 300 days of sunshine a year, Palma de Mallorca is a genuine year-round destination. Summers are hot and reliably dry, the sea stays swimmable from June deep into October, and even winter days are mild and often bright. Here's a full month-by-month breakdown of temperatures, sea conditions and rainfall, plus advice on the best time to visit and what to pack."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />

      <div className="mt-10 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="bg-card text-left">
              <th className="px-4 py-3 font-semibold text-foreground">Month</th>
              <th className="px-4 py-3 font-semibold text-foreground">Avg high</th>
              <th className="px-4 py-3 font-semibold text-foreground">Avg low</th>
              <th className="px-4 py-3 font-semibold text-foreground">Sea temp</th>
              <th className="px-4 py-3 font-semibold text-foreground">Rainy days</th>
              <th className="px-4 py-3 font-semibold text-foreground">Verdict</th>
            </tr>
          </thead>
          <tbody>
            {CLIMATE.map((row) => (
              <tr key={row[0]} className="border-t border-border">
                <td className="px-4 py-3 font-medium text-foreground">{row[0]}</td>
                <td className="px-4 py-3 text-muted-foreground">{row[1]}</td>
                <td className="px-4 py-3 text-muted-foreground">{row[2]}</td>
                <td className="px-4 py-3 text-muted-foreground">{row[3]}</td>
                <td className="px-4 py-3 text-muted-foreground">{row[4]}</td>
                <td className="px-4 py-3 text-muted-foreground">{row[5]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 space-y-10">
        {SECTIONS.map((s) => (
          <section key={s.heading}>
            <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">{s.heading}</h2>
            {s.paragraphs.map((p, i) => (
              <p key={i} className="mt-4 text-base leading-relaxed text-muted-foreground">{p}</p>
            ))}
          </section>
        ))}
      </div>
    </CityGuideShell>
  );
}
