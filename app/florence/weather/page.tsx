import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WEATHER, CATEGORIES } from "@/app/data/florence-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Weather in Florence 2026 — When to Visit | Flyamba",
  description:
    "Florence weather and the best time to visit — season by season, from mild green springs and hot, humid summers to golden autumns and quiet, queue-free winters, with temperatures, crowds and prices.",
  alternates: { canonical: `${SITE}/florence/weather` },
  openGraph: { title: "Florence Weather & Best Time to Visit | Flyamba", description: "Season-by-season Florence weather, crowds and prices.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Florence", item: `${SITE}/florence` },
      { "@type": "ListItem", position: 3, name: "Weather", item: `${SITE}/florence/weather` },
    ],
  };
}

export default function FlorenceWeather() {
  return (
    <CityGuideShell
      citySlug="florence"
      cityName="Florence"
      categories={CATEGORIES}
      active="weather"
      crumb="Weather"
      h1="Florence Weather & Best Time to Visit"
      heroImage="/images/florence/sevardheter/piazzale-michelangelo-utsikt.webp"
      intro="Florence sits in a bowl-shaped valley enclosed by hills, which gives it warm, sometimes fiercely hot summers and mild, occasionally wet winters. The weather makes a real difference to a visit, shaping not just comfort but crowds and prices. This guide runs through the city season by season — the blossoming, ideal spring, the hot and humid but event-filled summer, the golden, harvest-season autumn and the quiet, cheap, queue-free winter — before pinpointing the best months to come for the perfect balance of weather, crowds and cost."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Florence weather by season" items={WEATHER} />
    </CityGuideShell>
  );
}
