import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { SHOPPING, CATEGORIES } from "@/app/data/dubrovnik-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Shopping in Dubrovnik 2026 — Guide | Flyamba",
  description:
    "Where to shop in Dubrovnik — the Stradun lanes, the Gundulić morning market, gourmet olive oil and truffles at Uje, curated Croatian design at Kawa…",
  alternates: { canonical: `${SITE}/dubrovnik/shopping` },
  openGraph: { title: "Shopping in Dubrovnik | Flyamba", description: "The best shopping in Dubrovnik: markets, gourmet food, filigree jewellery and Croatian design.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Souvenirs & Gifts", keys: ["gifts"] },
  { label: "Food & Drink", keys: ["food"] },
  { label: "Fashion", keys: ["fashion"] },
  { label: "Jewellery", keys: ["jewellery"] },
  { label: "Markets", keys: ["market"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...SHOPPING.map((s) => ({
        "@type": "Place",
        name: s.name,
        description: s.description,
        address: { "@type": "PostalAddress", addressLocality: "Dubrovnik", addressCountry: "HR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: s.rating, reviewCount: s.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function DubrovnikShopping() {
  return (
    <CityGuideShell
      citySlug="dubrovnik"
      cityName="Dubrovnik"
      categories={CATEGORIES}
      active="shopping"
      crumb="Shopping"
      h1="Shopping in Dubrovnik"
      heroImage="/images/dubrovnik/shopping/artisan-shop-dubrovnik.webp"
      intro="Dubrovnik shopping is at its best when it stays local. Beyond the fridge magnets and Game of Thrones T-shirts of Stradun lie genuinely worthwhile buys: fragrant lavender and candied fruit at the Gundulić morning market, premium Croatian olive oils and truffles at Uje, curated 'made in Croatia' design at Kawa, delicate traditional filigree jewellery, and hand-made hats from an atelier open since 1858. Here is where to find the good stuff — and how to shop smart in an expensive walled city."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={SHOPPING} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Dubrovnik shopping in detail" items={SHOPPING} />
    </CityGuideShell>
  );
}
