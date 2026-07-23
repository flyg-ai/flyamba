import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { SHOPPING, CATEGORIES } from "@/app/data/tokyo-places";

const SITE = "https://flyamba.com";

export const metadata: Metadata = {
  title: "Shopping in Tokyo 2026 — Best Districts & Stores | Flyamba",
  description:
    "The best shopping in Tokyo — luxury Ginza, youth fashion in Shibuya and Harajuku, electronics and anime in Akihabara, plus markets, Don Quijote and duty-free tips.",
  alternates: { canonical: `${SITE}/tokyo/shopping` },
  openGraph: { title: "Best Shopping in Tokyo | Flyamba", description: "Ginza luxury, Harajuku fashion, Akihabara electronics and more.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Fashion", keys: ["fashion"] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Electronics", keys: ["electronics"] },
  { label: "Markets", keys: ["market"] },
  { label: "Souvenirs", keys: ["souvenirs"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Tokyo", item: `${SITE}/tokyo` },
          { "@type": "ListItem", position: 3, name: "Shopping", item: `${SITE}/tokyo/shopping` },
        ],
      },
      ...SHOPPING.map((s) => ({
        "@type": "Place",
        name: s.name,
        description: s.description,
        address: { "@type": "PostalAddress", addressLocality: "Tokyo", addressCountry: "JP" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: s.rating, reviewCount: s.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function TokyoShopping() {
  return (
    <CityGuideShell
      citySlug="tokyo"
      cityName="Tokyo"
      categories={CATEGORIES}
      active="shopping"
      crumb="Shopping"
      h1="Shopping in Tokyo"
      heroImage="/images/tokyo/shopping/ginza.webp"
      intro="Few cities shop like Tokyo. Elegant Ginza houses the world's luxury flagships and century-old department stores; Shibuya and Harajuku set youth-fashion trends the rest of the planet follows; Akihabara is the global capital of electronics and anime; and boisterous markets and the chaotic Don Quijote megastores overflow with quirky finds and souvenirs. This guide walks you through the best districts and stores, with opening hours, what to buy and how to claim your duty-free savings."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={SHOPPING} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Tokyo shopping in detail" items={SHOPPING} />
    </CityGuideShell>
  );
}
