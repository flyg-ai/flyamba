import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { SHOPPING, CATEGORIES } from "@/app/data/dubai-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Shopping in Dubai 2026 — Guide | Flyamba",
  description:
    "Where to shop in Dubai — the record-breaking Dubai Mall and Mall of the Emirates, the historic Gold and Spice Souks, the themed Ibn Battuta Mall, the…",
  alternates: { canonical: `${SITE}/dubai/shopping` },
  openGraph: { title: "Shopping in Dubai | Flyamba", description: "Dubai's best malls, souks and markets with insider tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Malls", keys: ["malls"] },
  { label: "Souks & Markets", keys: ["markets"] },
  { label: "Luxury", keys: ["luxury"] },
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
          { "@type": "ListItem", position: 2, name: "Dubai", item: `${SITE}/dubai` },
          { "@type": "ListItem", position: 3, name: "Shopping", item: `${SITE}/dubai/shopping` },
        ],
      },
      ...SHOPPING.map((s) => ({
        "@type": "Place",
        name: s.name,
        description: s.description,
        address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: s.rating, reviewCount: s.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function DubaiShopping() {
  return (
    <CityGuideShell
      citySlug="dubai"
      cityName="Dubai"
      categories={CATEGORIES}
      active="shopping"
      crumb="Shopping"
      h1="Shopping in Dubai"
      heroImage="/images/dubai/shopping/dubai-mall.webp"
      intro="Shopping is practically Dubai's national sport, and the city does it on every level. There are the giant, air-conditioned malls — the record-breaking Dubai Mall with its aquarium and ice rink, Mall of the Emirates with a ski slope inside — and, at the other extreme, the atmospheric old Gold and Spice Souks of Deira, where you haggle over jewellery and saffron. Between them lie themed malls, modern souks and designer outlets. Here's where to browse, bargain and buy, with opening hours and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={SHOPPING} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Dubai shopping in detail" items={SHOPPING} />
    </CityGuideShell>
  );
}
