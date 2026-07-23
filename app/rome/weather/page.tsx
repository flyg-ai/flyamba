import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WEATHER, CATEGORIES } from "@/app/data/rome-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Rome Weather 2026 — Best Time to Visit | Flyamba",
  description:
    "Rome's weather season by season — mild springs, hot dry summers, golden autumns and cool wet winters — with temperatures, what to pack and the best time to visit for weather, crowds and prices.",
  alternates: { canonical: `${SITE}/rome/weather` },
  openGraph: { title: "Rome Weather & Best Time to Visit | Flyamba", description: "Rome's climate month by month, with temperatures and the ideal time to go.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Rome", item: `${SITE}/rome` },
      { "@type": "ListItem", position: 3, name: "Weather", item: `${SITE}/rome/weather` },
    ],
  };
}

export default function RomeWeather() {
  return (
    <CityGuideShell
      citySlug="rome"
      cityName="Rome"
      categories={CATEGORIES}
      active="weather"
      crumb="Weather"
      h1="Rome Weather & Best Time to Visit"
      heroImage="/images/rome/sevardheter/piazza-navona.webp"
      intro="Rome enjoys a classic Mediterranean climate: hot, dry summers, mild and often sunny winters, and glorious shoulder seasons in between. When you go shapes your whole trip — the comfort of sightseeing, the size of the crowds and the price of flights and hotels. This guide runs through the weather season by season, with typical temperatures and what to pack, and pinpoints the best time to visit depending on whether you prioritise weather, quiet or budget."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Rome weather season by season" items={WEATHER} />
    </CityGuideShell>
  );
}
