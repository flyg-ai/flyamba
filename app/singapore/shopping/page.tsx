import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { SHOPPING, CATEGORIES } from "@/app/data/singapore-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Shopping in Singapore 2026 — Guide | Flyamba",
  description:
    "Where to shop in Singapore — from the malls of Orchard Road and ION to Haji Lane's indie boutiques, Bugis Street, the 24-hour Mustafa Centre and Jewel…",
  alternates: { canonical: `${SITE}/singapore/shopping` },
  openGraph: { title: "Best Shopping in Singapore | Flyamba", description: "8 top Singapore shopping spots from luxury malls to street markets.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Malls", keys: ["malls"] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Markets", keys: ["markets"] },
  { label: "Vintage", keys: ["vintage"] },
  { label: "Souvenirs", keys: ["souvenirs"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...SHOPPING.map((s) => ({
        "@type": "Place",
        name: s.name,
        description: s.description,
        address: { "@type": "PostalAddress", addressLocality: "Singapore", addressCountry: "SG" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: s.rating, reviewCount: s.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function SingaporeShopping() {
  return (
    <CityGuideShell
      citySlug="singapore"
      cityName="Singapore"
      categories={CATEGORIES}
      active="shopping"
      crumb="Shopping"
      h1="Shopping in Singapore"
      heroImage="/images/singapore/shopping/artisan-shop-singapore.webp"
      intro="Shopping is close to a national sport in Singapore, and the choice runs from glittering luxury malls to chaotic street markets. Orchard Road's air-conditioned megamalls line up the world's designer labels, Haji Lane hides indie boutiques and street art, Bugis Street and the 24-hour Mustafa Centre deliver bargains, and even the airport's Jewel is a retail spectacle. Here are 8 of the best places to shop, with areas, opening hours and tips including how to reclaim the 9% GST when you fly home."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={SHOPPING} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Singapore shopping in detail" items={SHOPPING} />
    </CityGuideShell>
  );
}
