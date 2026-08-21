import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { HOTELS, CATEGORIES } from "@/app/data/reykjavik-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Where to Stay in Reykjavík 2026 — Best Hotels Guide",
  description:
    "The best hotels in Reykjavík — Art Deco icons, design boutiques, countryside aurora resorts and smart budget hostels, with areas, nightly prices in USD…",
  alternates: { canonical: `${SITE}/reykjavik/hotels` },
  openGraph: { title: "Best Hotels in Reykjavík | Flyamba", description: "Heritage icons, design boutiques, aurora resorts and budget stays — where to stay in Reykjavík.", type: "article" },
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
      ...HOTELS.map((h) => ({
        "@type": "Hotel",
        name: h.name,
        description: h.description,
        priceRange: h.price,
        address: { "@type": "PostalAddress", addressLocality: "Reykjavík", addressCountry: "IS" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: h.rating, reviewCount: h.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function ReykjavikHotels() {
  return (
    <CityGuideShell
      citySlug="reykjavik"
      cityName="Reykjavík"
      categories={CATEGORIES}
      active="hotels"
      crumb="Hotels"
      h1="Where to Stay in Reykjavík"
      heroImage="/images/placeholders/placeholder-hotels.webp"
      intro="Reykjavík has a surprisingly developed hotel scene for its size, from the Art Deco grandeur of Hotel Borg and the art-filled Hotel Holt to sleek design boutiques and clever all-suite stays. Beyond the city, dramatic countryside resorts put you under the aurora at Þingvellir or beside the Blue Lagoon, while friendly hostels keep costs down. It's an expensive city, so this guide covers the best places to stay across every price band, with neighbourhoods, nightly rates in USD and tips on which area suits your trip."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={HOTELS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Reykjavík hotels in detail" items={HOTELS} />
    </CityGuideShell>
  );
}
