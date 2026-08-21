import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WEATHER, CATEGORIES } from "@/app/data/marrakech-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Marrakech Weather & Best Time to Visit 2026 | Flyamba",
  description:
    "Marrakech weather month by month and the best time to visit — glorious spring and autumn, brutal 40°C+ summers, mild sunny winter days with cold nights…",
  alternates: { canonical: `${SITE}/marrakech/weather` },
  openGraph: { title: "Marrakech Weather & Best Time to Visit | Flyamba", description: "When to visit Marrakech: a season-by-season climate guide.", type: "article" },
};


export default function MarrakechWeather() {
  return (
    <CityGuideShell
      citySlug="marrakech"
      cityName="Marrakech"
      categories={CATEGORIES}
      active="weather"
      crumb="Weather"
      h1="Marrakech Weather & Best Time to Visit"
      heroImage="/images/marrakech/sevardheter/majorelle.webp"
      intro="Marrakech has a hot semi-arid climate and enjoys sunshine for most of the year, but the experience changes dramatically with the seasons — and choosing when to visit means balancing temperature comfort against crowds and prices. Spring and autumn deliver near-perfect warm days; summer bakes past 40°C and calls for a pool and coastal escapes; winter offers mild, sunny sightseeing weather with surprisingly cold nights and dramatic snow-capped Atlas views. This guide walks through the climate season by season, with typical temperatures, what to expect and what to pack, so you can time your trip and plan your days around the sun."
      wide
    >
      <CategorySeoSections heading="Marrakech weather by season" items={WEATHER} />
    </CityGuideShell>
  );
}
