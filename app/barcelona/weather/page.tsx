import type { Metadata } from "next";
import { GuideShell, GuideSection } from "@/app/components/GuideShell";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Barcelona Weather 2026 — Best Time to Visit | Flyamba",
  description:
    "Barcelona weather month by month: average temperatures, rainfall, sunshine hours and what to pack — plus the best times to visit for sun, city breaks and beaches.",
  alternates: { canonical: `${SITE}/barcelona/weather` },
  openGraph: { title: "Barcelona Weather by Month | Flyamba", description: "Month-by-month climate and the best time to visit Barcelona.", type: "article" },
};

type M = { month: string; high: number; low: number; rain: string; sun: string; pack: string };

const MONTHS: M[] = [
  { month: "January", high: 14, low: 6, rain: "41 mm", sun: "5 h/day", pack: "Warm layers, jacket, scarf" },
  { month: "February", high: 15, low: 6, rain: "39 mm", sun: "6 h/day", pack: "Coat, layers for cool evenings" },
  { month: "March", high: 17, low: 8, rain: "42 mm", sun: "6 h/day", pack: "Light jacket, umbrella" },
  { month: "April", high: 19, low: 10, rain: "49 mm", sun: "7 h/day", pack: "Layers, light rain jacket" },
  { month: "May", high: 22, low: 14, rain: "49 mm", sun: "8 h/day", pack: "T-shirts, light sweater for evenings" },
  { month: "June", high: 26, low: 18, rain: "34 mm", sun: "9 h/day", pack: "Summer clothes, swimwear, sunscreen" },
  { month: "July", high: 29, low: 21, rain: "22 mm", sun: "10 h/day", pack: "Light summer clothes, hat, sunscreen" },
  { month: "August", high: 29, low: 21, rain: "44 mm", sun: "9 h/day", pack: "Beachwear, sunscreen, water bottle" },
  { month: "September", high: 26, low: 18, rain: "77 mm", sun: "7 h/day", pack: "Summer clothes, light rain jacket" },
  { month: "October", high: 22, low: 14, rain: "90 mm", sun: "6 h/day", pack: "Layers, umbrella, light jacket" },
  { month: "November", high: 17, low: 9, rain: "59 mm", sun: "5 h/day", pack: "Warm layers, jacket" },
  { month: "December", high: 15, low: 7, rain: "43 mm", sun: "5 h/day", pack: "Coat, scarf, warm layers" },
];

export default function BarcelonaWeather() {
  return (
    <GuideShell
      active="weather"
      crumb="Weather"
      h1="Barcelona Weather by Month"
      heroImage="/images/content/barceloneta.avif"
      intro="Barcelona enjoys a mild Mediterranean climate with hot, dry summers and gentle, sunny winters — one of the reasons it's a year-round destination. Summers are for the beach, spring and autumn are perfect for sightseeing, and even winter rarely gets truly cold. Here's what to expect every month, and when to plan your trip."
    >
      <GuideSection title="Month-by-month climate">
        <div className="mt-2 overflow-x-auto rounded-3xl border border-border bg-card">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-widest text-muted-foreground">
                <th className="p-4">Month</th>
                <th className="p-4">Avg high</th>
                <th className="p-4">Avg low</th>
                <th className="p-4">Rainfall</th>
                <th className="p-4">Sunshine</th>
                <th className="p-4">What to pack</th>
              </tr>
            </thead>
            <tbody>
              {MONTHS.map((m) => (
                <tr key={m.month} className="border-b border-border last:border-0">
                  <td className="p-4 font-serif text-base font-semibold text-foreground">{m.month}</td>
                  <td className="p-4 text-foreground">{m.high}°C</td>
                  <td className="p-4 text-muted-foreground">{m.low}°C</td>
                  <td className="p-4 text-muted-foreground">{m.rain}</td>
                  <td className="p-4 text-muted-foreground">{m.sun}</td>
                  <td className="p-4 text-muted-foreground">{m.pack}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GuideSection>

      <GuideSection title="The best time to visit Barcelona">
        <p>
          <strong className="text-foreground">May–June and September</strong> are the sweet spot: temperatures of 22–26°C,
          warm enough for the beach, long sunny days and thinner crowds than high summer. This is when the city feels at
          its best for combining sightseeing and sea.
        </p>
        <p>
          <strong className="text-foreground">July–August</strong> are hot (29°C+) and busy, with packed beaches and peak
          hotel prices — great for a pure beach holiday if you don't mind the heat and crowds. Note many locals leave in
          August and some small restaurants close.
        </p>
        <p>
          <strong className="text-foreground">October–April</strong> is quieter and cheaper. Autumn brings the year's
          heaviest rain (September–October), but winters are mild (14–17°C by day) and sunny — ideal for museums, food and
          long lunches without the crowds. December's festive lights and January sales are a bonus.
        </p>
      </GuideSection>

      <GuideSection title="Sea temperature & beach season">
        <p>
          The Mediterranean is warm enough to swim from roughly June to October, peaking around 25°C in August. May and
          late October are borderline — pleasant for sunbathing and paddling but bracing for a full swim. Outside those
          months the beaches are still lovely for a walk along the boardwalk. Whenever you come, pack sunscreen: Barcelona
          gets 2,500+ hours of sunshine a year, and the sun is strong even in the cooler months.
        </p>
      </GuideSection>
    </GuideShell>
  );
}
