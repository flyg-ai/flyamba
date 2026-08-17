import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WEATHER, CATEGORIES } from "@/app/data/cancun-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Cancún Weather 2026 — Best Time to Visit | Flyamba",
  description:
    "Cancún's weather season by season — the sunny dry high season, the value-packed shoulder months, the hot wet-and-hurricane low season and the sargassum…",
  alternates: { canonical: `${SITE}/cancun/weather` },
  openGraph: { title: "Cancún Weather & Best Time to Visit | Flyamba", description: "Cancún's tropical climate season by season, with temperatures, seaweed and hurricane notes, and the ideal time to go.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Cancún", item: `${SITE}/cancun` },
      { "@type": "ListItem", position: 3, name: "Weather", item: `${SITE}/cancun/weather` },
    ],
  };
}

export default function CancunWeather() {
  return (
    <CityGuideShell
      citySlug="cancun"
      cityName="Cancún"
      categories={CATEGORIES}
      active="weather"
      crumb="Weather"
      h1="Cancún Weather & Best Time to Visit"
      heroImage="/images/placeholders/placeholder-beaches.webp"
      intro="Cancún has a warm tropical climate that makes it a year-round beach destination, but the season you choose shapes everything — the weather, the crowds, the price and even the amount of seaweed on the sand. The dry season from December to April brings the best, sunniest conditions but the highest prices and biggest crowds; the wet-and-hurricane low season from June to October is hot, humid and stormy but cheap and quiet; and the shoulder months of May and November offer the best all-round balance. This guide runs through the climate season by season, explains the sargassum seaweed phenomenon and hurricane risk, and pinpoints the best time to visit depending on your priorities."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Cancún weather season by season" items={WEATHER} />
    </CityGuideShell>
  );
}
