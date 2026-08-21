import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WEATHER, CATEGORIES } from "@/app/data/dubai-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Dubai Weather 2026 — Best Time to Visit Guide | Flyamba",
  description:
    "When to visit Dubai — the glorious winter peak season (November–March), the brutally hot but cheap summer, the shoulder months, and how the desert…",
  alternates: { canonical: `${SITE}/dubai/weather` },
  openGraph: { title: "Dubai Weather & Best Time to Visit | Flyamba", description: "Dubai's seasons, temperatures and the best time to visit, with packing tips.", type: "article" },
};


export default function DubaiWeather() {
  return (
    <CityGuideShell
      citySlug="dubai"
      cityName="Dubai"
      categories={CATEGORIES}
      active="weather"
      crumb="Weather"
      h1="Dubai Weather & Best Time to Visit"
      heroImage="/images/dubai/attractions/desert-safari.webp"
      intro="Dubai is warm and sunny year-round, but the difference between its seasons is dramatic, and it shapes everything about a trip. The winter, from November to March, is glorious — warm days, cool evenings and almost no rain — and the reason it's peak season. The summer, June to September, is brutally hot at over 40°C, which makes it the cheap low season best spent indoors. This guide explains each season, how the desert climate and coastal humidity really work, and exactly when to visit and what to pack."
      wide
    >
      <CategorySeoSections heading="Dubai's weather season by season" items={WEATHER} />
    </CityGuideShell>
  );
}
