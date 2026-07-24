import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { HOTELS, CATEGORIES } from "@/app/data/reykjavik-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Where to Stay in Reykjavik 2026 — Best Hotels Guide | Flyamba",
  description:
    "The best hotels in Reykjavik — Art Deco icons, design boutiques, countryside aurora resorts and smart budget hostels, with areas, nightly prices in USD and neighbourhood tips.",
  alternates: { canonical: `${SITE}/reykjavik/hotels` },
  openGraph: { title: "Best Hotels in Reykjavik | Flyamba", description: "Heritage icons, design boutiques, aurora resorts and budget stays — where to stay in Reykjavik.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Boutique", keys: ["boutique"] },
  { label: "Mid-range", keys: ["mid"] },
  { label: "Budget", keys: ["budget"] },
  { label: "With pool", keys: ["pool"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Reykjavik", item: `${SITE}/reykjavik` },
          { "@type": "ListItem", position: 3, name: "Hotels", item: `${SITE}/reykjavik/hotels` },
        ],
      },
      ...HOTELS.map((h) => ({
        "@type": "Hotel",
        name: h.name,
        description: h.description,
        priceRange: h.price,
        address: { "@type": "PostalAddress", addressLocality: "Reykjavik", addressCountry: "IS" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: h.rating, reviewCount: h.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function ReykjavikHotels() {
  return (
    <CityGuideShell
      citySlug="reykjavik"
      cityName="Reykjavik"
      categories={CATEGORIES}
      active="hotels"
      crumb="Hotels"
      h1="Where to Stay in Reykjavik"
      heroImage="/images/placeholders/placeholder-hotels.webp"
      intro="Reykjavik has a surprisingly developed hotel scene for its size, from the Art Deco grandeur of Hotel Borg and the art-filled Hotel Holt to sleek design boutiques and clever all-suite stays. Beyond the city, dramatic countryside resorts put you under the aurora at Þingvellir or beside the Blue Lagoon, while friendly hostels keep costs down. It's an expensive city, so this guide covers the best places to stay across every price band, with neighbourhoods, nightly rates in USD and tips on which area suits your trip."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={HOTELS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Reykjavik hotels in detail" items={HOTELS} />
    </CityGuideShell>
  );
}
