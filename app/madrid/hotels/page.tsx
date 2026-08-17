import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { HOTELS, CATEGORIES } from "@/app/data/madrid-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Where to Stay in Madrid 2026 — Best Hotels & Areas | Flyamba",
  description:
    "The best hotels and neighbourhoods in Madrid — from the grande-dame Mandarin Oriental Ritz and the Four Seasons to boutique stays, design hotels and…",
  alternates: { canonical: `${SITE}/madrid/hotels` },
  openGraph: { title: "Best Hotels in Madrid | Flyamba", description: "Where to stay in Madrid — 8 hotels for every budget.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Boutique", keys: ["boutique"] },
  { label: "Budget", keys: ["budget"] },
  { label: "Central", keys: ["central"] },
  { label: "Family", keys: ["family"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Madrid", item: `${SITE}/madrid` },
          { "@type": "ListItem", position: 3, name: "Hotels", item: `${SITE}/madrid/hotels` },
        ],
      },
      ...HOTELS.map((h) => ({
        "@type": "Hotel",
        name: h.name,
        description: h.description,
        address: { "@type": "PostalAddress", addressLocality: "Madrid", addressCountry: "ES" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: h.rating, reviewCount: h.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function MadridHotels() {
  return (
    <CityGuideShell
      citySlug="madrid"
      cityName="Madrid"
      categories={CATEGORIES}
      active="hotels"
      crumb="Hotels"
      h1="Where to Stay in Madrid"
      heroImage="/images/madrid/hotels/hotel-ritz.webp"
      intro="Choosing where to stay in Madrid is as much about neighbourhood as price. The city's districts each suit a different traveller — central and buzzing around Sol and Gran Vía, elegant and calm in Salamanca and Chamberí, lively and local in La Latina and Malasaña. From the legendary Mandarin Oriental Ritz on the Paseo del Prado to design hotels with rooftop pools and superb-value hostales, here are eight standout places to stay across every budget, with areas and booking tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={HOTELS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Madrid hotels in detail" items={HOTELS} />
    </CityGuideShell>
  );
}
