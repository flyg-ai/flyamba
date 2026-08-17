import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WEATHER, CATEGORIES } from "@/app/data/vienna-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Vienna Weather 2026 — Best Time to Visit | Flyamba",
  description:
    "Vienna's weather season by season — mild blossoming springs, warm lively summers, golden autumns and cold, festive winters — with temperatures, what to…",
  alternates: { canonical: `${SITE}/vienna/weather` },
  openGraph: { title: "Vienna Weather & Best Time to Visit | Flyamba", description: "Vienna's climate season by season, with temperatures and the ideal time to go.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Vienna", item: `${SITE}/vienna` },
      { "@type": "ListItem", position: 3, name: "Weather", item: `${SITE}/vienna/weather` },
    ],
  };
}

export default function ViennaWeather() {
  return (
    <CityGuideShell
      citySlug="vienna"
      cityName="Vienna"
      categories={CATEGORIES}
      active="weather"
      crumb="Weather"
      h1="Vienna Weather & Best Time to Visit"
      heroImage="/images/vienna/sevardheter/belvedere.webp"
      intro="Vienna has a temperate Central European climate: warm summers, cold winters and beautiful, changeable shoulder seasons in between. When you go shapes your whole trip — the comfort of sightseeing, the size of the crowds and the price of flights and hotels, not to mention whether you catch the Christmas markets or the ball season. This guide runs through the weather season by season, with typical temperatures and what to pack, and pinpoints the best time to visit depending on whether you prioritise weather, quiet or budget."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Vienna weather season by season" items={WEATHER} />
    </CityGuideShell>
  );
}
