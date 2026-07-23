import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WEATHER, CATEGORIES } from "@/app/data/tenerife-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Tenerife Weather 2026 — Best Time to Visit & Climate | Flyamba",
  description:
    "Tenerife weather season by season: warm year-round, the best winter-sun in Europe, and the striking climate difference between the sunny south, greener north and snow-capped Mount Teide — plus the best time to visit.",
  alternates: { canonical: `${SITE}/tenerife/weather` },
  openGraph: { title: "Tenerife Weather & Best Time to Visit | Flyamba", description: "Season-by-season climate and when to go.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Tenerife", item: `${SITE}/tenerife` },
      { "@type": "ListItem", position: 3, name: "Weather", item: `${SITE}/tenerife/weather` },
    ],
  };
}

export default function TenerifeWeather() {
  return (
    <CityGuideShell
      citySlug="tenerife"
      cityName="Tenerife"
      categories={CATEGORIES}
      active="weather"
      crumb="Weather"
      h1="Tenerife Weather & Best Time to Visit"
      heroImage="/images/tenerife/strander/playa-jardn.webp"
      intro="Nicknamed the 'island of eternal spring', Tenerife is warm and sunny year-round — home to the most reliable winter-sun beach weather in Europe. But its climate is far from uniform: the south is dry and sunny, the north greener and cloudier, and Mount Teide can be freezing and snow-capped while the coast basks. This guide runs through the seasons, the regional contrasts and the best time to visit."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Tenerife weather in detail" items={WEATHER} />
    </CityGuideShell>
  );
}
