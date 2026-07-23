import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { HOTELS, CATEGORIES } from "@/app/data/lisbon-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Where to Stay in Lisbon 2026 — Best Hotels & Areas | Flyamba",
  description:
    "The best hotels in Lisbon for every budget — from the Four Seasons Ritz and Lapa Palace to Alfama boutique stays and the Generator design hostel, with prices, areas and tips.",
  alternates: { canonical: `${SITE}/lisbon/hotels` },
  openGraph: { title: "Best Hotels in Lisbon | Flyamba", description: "Where to stay in Lisbon, from palace hotels to design hostels.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Boutique", keys: ["boutique"] },
  { label: "Central", keys: ["central"] },
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
          { "@type": "ListItem", position: 2, name: "Lisbon", item: `${SITE}/lisbon` },
          { "@type": "ListItem", position: 3, name: "Hotels", item: `${SITE}/lisbon/hotels` },
        ],
      },
      ...HOTELS.map((h) => ({
        "@type": "Hotel",
        name: h.name,
        description: h.description,
        priceRange: h.price,
        address: { "@type": "PostalAddress", addressLocality: "Lisbon", addressCountry: "PT" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: h.rating, reviewCount: h.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function LisbonHotels() {
  return (
    <CityGuideShell
      citySlug="lisbon"
      cityName="Lisbon"
      categories={CATEGORIES}
      active="hotels"
      crumb="Hotels"
      h1="Where to Stay in Lisbon"
      heroImage="/images/lisbon/hotell/four-seasons-ritz-lisbon.webp"
      intro="From palace hotels with river views to design-led boutiques hidden in the Alfama lanes and sociable hostels near the metro, Lisbon offers characterful places to stay at every price. The best base depends on your priorities — atmosphere in the old town, convenience in the Baixa and Chiado, or calm in leafy Lapa — and this guide covers the standout hotels in each, with prices, neighbourhoods and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={HOTELS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Lisbon hotels in detail" items={HOTELS} />
    </CityGuideShell>
  );
}
