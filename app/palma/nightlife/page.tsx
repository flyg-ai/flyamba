import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { NIGHTLIFE, PALMA_CATEGORIES } from "@/app/data/palma-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Palma Nightlife 2026 — Best Bars & Clubs Guide | Flyamba",
  description:
    "Where to go out in Palma de Mallorca — the hip bar scene of Santa Catalina, cocktail dens in La Lonja, rooftop and beach clubs, the seafront mega-clubs Tito's and Pacha, and the Magaluf party strip.",
  alternates: { canonical: `${SITE}/palma/nightlife` },
  openGraph: { title: "Palma Nightlife | Flyamba", description: "The best Palma bars, clubs and rooftops by neighborhood.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Clubs", keys: ["clubs"] },
  { label: "Cocktail bars", keys: ["cocktail"] },
  { label: "Rooftop", keys: ["rooftop"] },
  { label: "Beach club", keys: ["beach-club"] },
  { label: "Santa Catalina", keys: ["santa-catalina"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Palma", item: `${SITE}/palma` },
          { "@type": "ListItem", position: 3, name: "Nightlife", item: `${SITE}/palma/nightlife` },
        ],
      },
      ...NIGHTLIFE.map((n) => ({
        "@type": "BarOrPub",
        name: n.name,
        description: n.description,
        address: { "@type": "PostalAddress", addressLocality: "Palma", addressRegion: "Mallorca", addressCountry: "ES" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: n.rating, reviewCount: n.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function PalmaNightlife() {
  return (
    <CityGuideShell
      citySlug="palma"
      cityName="Palma"
      categories={PALMA_CATEGORIES}
      active="nightlife"
      crumb="Nightlife"
      h1="Palma Nightlife"
      heroImage="/images/content/photo-1516450360452-9312f5e86fc7.avif"
      intro="Palma after dark spans everything from sophisticated cocktail dens in candlelit old-town mansions to the hip, sociable bar-hopping of the Santa Catalina district, rooftop sundowners over the cathedral, glamorous beach clubs, and the two big seafront mega-clubs on the Paseo Marítimo. Out along the coast, the resort of Magaluf offers Europe's most famously boisterous party strip. Whether you want a quiet vermouth or a night until dawn, here's where to go, by neighborhood."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={NIGHTLIFE} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Palma nightlife in detail" items={NIGHTLIFE} />
    </CityGuideShell>
  );
}
