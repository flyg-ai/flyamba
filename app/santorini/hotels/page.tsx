import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { HOTELS } from "@/app/data/santorini-places";
import { SANTORINI_CATEGORIES } from "@/app/lib/santorini";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Where to Stay in Santorini 2026 — Best Hotels Guide | Flyamba",
  description:
    "Where to stay in Santorini — iconic caldera-edge cave hotels in Oia and Imerovigli, design luxury resorts, and the island's best budget base. Compare areas, views and price tiers.",
  alternates: { canonical: `${SITE}/santorini/hotels` },
  openGraph: { title: "Best Hotels in Santorini | Flyamba", description: "8 standout Santorini stays, from Oia cave suites to a converted-winery hostel.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Caldera view", keys: ["caldera-view"] },
  { label: "Adults-only", keys: ["adults"] },
  { label: "Pool", keys: ["pool"] },
  { label: "Family", keys: ["family"] },
  { label: "Budget", keys: ["budget"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Santorini", item: `${SITE}/santorini` },
          { "@type": "ListItem", position: 3, name: "Hotels", item: `${SITE}/santorini/hotels` },
        ],
      },
      ...HOTELS.map((h) => ({
        "@type": "Hotel",
        name: h.name,
        description: h.description,
        priceRange: h.price,
        address: { "@type": "PostalAddress", addressLocality: h.area, addressRegion: "Santorini", addressCountry: "GR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: h.rating, reviewCount: h.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function SantoriniHotels() {
  return (
    <CityGuideShell
      citySlug="santorini"
      cityName="Santorini"
      categories={SANTORINI_CATEGORIES}
      active="hotels"
      crumb="Hotels"
      h1="Where to Stay in Santorini"
      heroImage="/images/santorini/hotell/canaves-oia.webp"
      intro="Where you sleep shapes a Santorini trip more than almost anywhere. The caldera-edge villages of Oia and Imerovigli hold the iconic cave suites with infinity pools and sunset views — dreamy but pricey. The beach resorts of Kamari, Perissa and Perivolos offer better value and easy swimming, while inland villages and hostels keep costs sane. Here are eight standout stays across every budget, with the trade-offs of each area explained."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={HOTELS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Santorini hotels in detail" items={HOTELS} />
    </CityGuideShell>
  );
}
