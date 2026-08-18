import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { HOTELS, CATEGORIES } from "@/app/data/dubai-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Hotels in Dubai 2026 — Where to Stay Guide | Flyamba",
  description:
    "The best hotels in Dubai for every budget — icons like the Burj Al Arab, Atlantis The Palm and One&Only, the Armani inside the Burj Khalifa, plus…",
  alternates: { canonical: `${SITE}/dubai/hotels` },
  openGraph: { title: "Best Hotels in Dubai | Flyamba", description: "Where to stay in Dubai, from icons to budget, with prices and area tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Beach", keys: ["beach"] },
  { label: "Boutique", keys: ["boutique"] },
  { label: "Central", keys: ["central"] },
  { label: "Budget", keys: ["budget"] },
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
          { "@type": "ListItem", position: 2, name: "Dubai", item: `${SITE}/dubai` },
          { "@type": "ListItem", position: 3, name: "Hotels", item: `${SITE}/dubai/hotels` },
        ],
      },
      ...HOTELS.map((h) => ({
        "@type": "Hotel",
        name: h.name,
        description: h.description,
        address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
        priceRange: h.price,
        aggregateRating: { "@type": "AggregateRating", ratingValue: h.rating, reviewCount: h.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function DubaiHotels() {
  return (
    <CityGuideShell
      citySlug="dubai"
      cityName="Dubai"
      categories={CATEGORIES}
      active="hotels"
      crumb="Hotels"
      h1="Where to Stay in Dubai"
      heroImage="/images/dubai/hotels/hotel-dubai.avif"
      intro="Dubai's hotels are attractions in their own right — the sail-shaped Burj Al Arab, the megaresort Atlantis on the Palm, Giorgio Armani's own hotel inside the Burj Khalifa. But the city also offers some genuinely smart-value stays, from the hip homegrown Rove chain to reliable Premier Inns by the Metro. Where you base yourself shapes your trip: Downtown for the sights, the Marina or Palm for the beach, Bur Dubai for the historic old city. Here are the best options for every budget."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={HOTELS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Dubai hotels in detail" items={HOTELS} />
    </CityGuideShell>
  );
}
