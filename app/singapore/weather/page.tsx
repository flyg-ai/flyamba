import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WEATHER, CATEGORIES } from "@/app/data/singapore-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Weather in Singapore 2026 — Guide | Flyamba",
  description:
    "Singapore's weather explained — hot, humid and tropical at 31–33°C year-round, the best time to visit, the monsoon seasons, a month-by-month guide and…",
  alternates: { canonical: `${SITE}/singapore/weather` },
  openGraph: { title: "Singapore Weather & Best Time to Visit | Flyamba", description: "Singapore's tropical climate, monsoons, month-by-month and what to pack.", type: "article" },
};


export default function SingaporeWeather() {
  return (
    <CityGuideShell
      citySlug="singapore"
      cityName="Singapore"
      categories={CATEGORIES}
      active="weather"
      crumb="Weather"
      h1="Singapore Weather & Best Time to Visit"
      heroImage="/images/singapore/sevardheter/singapore-botanic-gardens.webp"
      intro="Sitting just north of the Equator, Singapore is hot, humid and tropical all year, with daytime highs of around 31–33°C whatever the month, so unlike temperate cities there is no real off-season. What changes is the rainfall and the calendar of events. This guide explains Singapore's steady climate, pinpoints the best time to visit, breaks down the two monsoon seasons and a month-by-month outlook, and tells you exactly what to pack for the heat, the sudden downpours and the fierce indoor air-conditioning. Whenever you come, expect warm, summery weather — and keep an umbrella close."
      wide
    >
      <CategorySeoSections heading="Singapore weather explained" items={WEATHER} />
    </CityGuideShell>
  );
}
