import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { SHOPPING, CATEGORIES } from "@/app/data/cape-town-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Shopping in Cape Town 2026 — Markets & Malls Guide | Flyamba",
  description:
    "Where to shop in Cape Town — the V&A Waterfront and Watershed design market, Greenmarket Square curios, Long Street vintage, weekend farmers' markets and…",
  alternates: { canonical: `${SITE}/cape-town/shopping` },
  openGraph: { title: "Best Shopping in Cape Town | Flyamba", description: "Malls, craft markets, design stores, vintage and flea markets in Cape Town.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Markets", keys: ["markets"] },
  { label: "Malls", keys: ["mall"] },
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
        address: { "@type": "PostalAddress", addressLocality: "Cape Town", addressCountry: "ZA" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: s.rating, reviewCount: s.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function CapeTownShopping() {
  return (
    <CityGuideShell
      citySlug="cape-town"
      cityName="Cape Town"
      categories={CATEGORIES}
      active="shopping"
      crumb="Shopping"
      h1="Shopping in Cape Town"
      heroImage="/images/cape-town/shopping/artisan-shop-cape-town.webp"
      intro="Cape Town shopping runs from the polished V&A Waterfront and Africa's biggest malls to buzzing craft markets, curated design halls, bohemian Long Street vintage and weekend farmers' and flea markets. This guide gathers the best places to browse and buy — for South African design, souvenirs, antiques and fresh local food — with opening hours, what to expect and tips on where to haggle."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={SHOPPING} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Cape Town shopping in detail" items={SHOPPING} />
    </CityGuideShell>
  );
}
