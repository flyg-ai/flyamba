import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WEATHER, CATEGORIES } from "@/app/data/phuket-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Phuket Weather 2026 — Best Time to Visit | Flyamba",
  description:
    "Phuket's weather season by season — the sunny dry season, the hot months, and the green monsoon season — with temperatures, sea conditions, vital…",
  alternates: { canonical: `${SITE}/phuket/weather` },
  openGraph: { title: "Phuket Weather & Best Time to Visit | Flyamba", description: "Phuket's tropical climate season by season, with sea safety and the ideal time to go.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Phuket", item: `${SITE}/phuket` },
      { "@type": "ListItem", position: 3, name: "Weather", item: `${SITE}/phuket/weather` },
    ],
  };
}

export default function PhuketWeather() {
  return (
    <CityGuideShell
      citySlug="phuket"
      cityName="Phuket"
      categories={CATEGORIES}
      active="weather"
      crumb="Weather"
      h1="Phuket Weather & Best Time to Visit"
      heroImage="/images/phuket/strander/kata-beach.webp"
      intro="Phuket has a tropical climate with warm temperatures around 30°C year-round, but it divides into two very different seasons that shape your whole trip: the sunny, dry, calm-sea high season from November to April, and the wetter, rougher-sea green (monsoon) season from May to October. When you go affects the weather, the state of the sea for swimming and island trips, the size of the crowds and the price of flights and hotels. This guide runs through the climate season by season, with temperatures and what to expect, gives essential advice on sea safety and the crucial red-flag system, and pinpoints the best time to visit depending on your priorities."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Phuket weather season by season" items={WEATHER} />
    </CityGuideShell>
  );
}
