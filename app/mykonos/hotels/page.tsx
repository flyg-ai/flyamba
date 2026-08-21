import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { HOTELS, CATEGORIES } from "@/app/data/mykonos-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Where to Stay in Mykonos 2026 — Hotels Guide | Flyamba",
  description:
    "The best hotels in Mykonos — iconic Cavo Tagoo, intimate Bill & Coo, the design-led Belvedere and Katikies, beach resorts, a central boutique and the…",
  alternates: { canonical: `${SITE}/mykonos/hotels` },
  openGraph: { title: "Best Hotels in Mykonos | Flyamba", description: "8 top places to stay in Mykonos, from cliff-top luxury to budget beds.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Design", keys: ["design"] },
  { label: "Beach", keys: ["beach"] },
  { label: "Budget", keys: ["budget"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...HOTELS.map((h) => ({
        "@type": "Hotel",
        name: h.name,
        description: h.description,
        priceRange: h.price,
        address: { "@type": "PostalAddress", addressLocality: "Mykonos", addressCountry: "GR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: h.rating, reviewCount: h.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function MykonosHotels() {
  return (
    <CityGuideShell
      citySlug="mykonos"
      cityName="Mykonos"
      categories={CATEGORIES}
      active="hotels"
      crumb="Hotels"
      h1="Where to Stay in Mykonos"
      heroImage="/images/mykonos/hotels/hotel-mykonos.avif"
      intro="Mykonos is one of the most expensive islands in Greece to sleep on, but it delivers some of the Mediterranean's most spectacular hotels for the money. From the cliff-carved infinity pools of Cavo Tagoo and the intimate luxury of Bill & Coo to the design-led Belvedere with its Nobu, sunset-facing Katikies, family-friendly beach resorts, a well-priced central boutique and the island's only campsite, here are 8 places to stay for every budget — with nightly rates in USD, areas and booking tips. Rooms sell out and prices spike months ahead for July and August, so book as early as you can."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={HOTELS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Mykonos hotels in detail" items={HOTELS} />
    </CityGuideShell>
  );
}
