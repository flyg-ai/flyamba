import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { CATEGORIES, NIGHTLIFE } from "@/app/data/london-places";

const SITE = "https://flyamba.com";

export const metadata: Metadata = {
  title: "Nightlife in London 2026 — Guide | Flyamba",
  description:
    "The best nightlife in London — historic pubs, world-ranked cocktail bars, legendary clubs like Fabric, rooftop views and Ronnie Scott's jazz, with areas, prices and insider tips.",
  alternates: { canonical: `${SITE}/london/nightlife` },
  openGraph: { title: "Best Nightlife in London | Flyamba", description: "10 top London bars, pubs, clubs and rooftops.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Clubs", keys: ["clubs"] },
  { label: "Cocktail bars", keys: ["cocktail"] },
  { label: "Pubs", keys: ["pubs"] },
  { label: "Rooftop", keys: ["rooftop"] },
  { label: "Live music", keys: ["live-music"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "London", item: `${SITE}/london` },
      { "@type": "ListItem", position: 3, name: "Nightlife", item: `${SITE}/london/nightlife` },
    ],
  };
}

export default function LondonNightlife() {
  return (
    <CityGuideShell
      citySlug="london"
      cityName="London"
      categories={CATEGORIES}
      active="nightlife"
      crumb="Nightlife"
      h1="Best Nightlife in London"
      heroImage="/images/london/nattliv/sky-garden.webp"
      intro="After dark, London offers everything from centuries-old pubs and world-ranked cocktail bars to legendary clubs, live jazz and dizzying rooftop views. Whether you want a quiet pint in a historic tavern, a theatrical cocktail in Shoreditch or a dance until dawn at Fabric, here are 10 of the city's best nights out, with areas, prices and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={NIGHTLIFE} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="London nightlife in detail" items={NIGHTLIFE} />
    </CityGuideShell>
  );
}
