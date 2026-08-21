import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { SHOPPING, CATEGORIES } from "@/app/data/bali-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Shopping in Bali 2026 — Markets, Boutiques & Design",
  description:
    "Where to shop in Bali — the Ubud and Sukawati art markets, Seminyak's designer boutiques on Jalan Laksmana, cool Canggu bazaars and beachfront Kuta…",
  alternates: { canonical: `${SITE}/bali/shopping` },
  openGraph: { title: "Shopping in Bali | Flyamba", description: "Markets, boutiques, malls and design stores across Bali.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Markets", keys: ["markets"] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Souvenirs", keys: ["souvenirs"] },
  { label: "Malls", keys: ["malls"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...SHOPPING.map((s) => ({
        "@type": "TouristAttraction",
        name: s.name,
        description: s.description,
        address: { "@type": "PostalAddress", addressLocality: "Bali", addressCountry: "ID" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: s.rating, reviewCount: s.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function BaliShopping() {
  return (
    <CityGuideShell
      citySlug="bali"
      cityName="Bali"
      categories={CATEGORIES}
      active="shopping"
      crumb="Shopping"
      h1="Shopping in Bali"
      heroImage="/images/bali/shopping/artisan-shop-bali.webp"
      intro="Shopping in Bali runs from colourful, haggle-friendly craft markets to chic designer boutiques and breezy beachfront malls. Bargain for sarongs, carvings and textiles at the Ubud and Sukawati art markets, browse local designers along Seminyak's Jalan Laksmana, hunt for boho fashion at Canggu's bazaars, or escape the heat in Kuta's Beachwalk mall. Here are the best places to shop, with opening hours, prices and bargaining tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={SHOPPING} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Bali shopping in detail" items={SHOPPING} />
    </CityGuideShell>
  );
}
