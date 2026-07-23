import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { HOTELS, PRAGUE_CATEGORIES } from "@/app/data/prague-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Hotels in Prague 2026 — Where to Stay | Flyamba",
  description:
    "Where to stay in Prague — from riverside luxury at the Four Seasons and a monastery-set Mandarin Oriental to characterful boutiques and great-value design stays, with nightly prices and area tips.",
  alternates: { canonical: `${SITE}/prague/hotels` },
  openGraph: { title: "Best Hotels in Prague | Flyamba", description: "8 top Prague hotels from five-star luxury to budget boutiques.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Boutique", keys: ["boutique"] },
  { label: "Mid-range", keys: ["mid-range"] },
  { label: "Budget", keys: ["budget"] },
  { label: "Old Town", keys: ["old-town"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Prague", item: `${SITE}/prague` },
          { "@type": "ListItem", position: 3, name: "Hotels", item: `${SITE}/prague/hotels` },
        ],
      },
      ...HOTELS.map((h) => ({
        "@type": "Hotel",
        name: h.name,
        description: h.description,
        priceRange: h.price,
        address: { "@type": "PostalAddress", addressLocality: "Prague", addressCountry: "CZ" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: h.rating, reviewCount: h.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function PragueHotels() {
  return (
    <CityGuideShell
      citySlug="prague"
      cityName="Prague"
      categories={PRAGUE_CATEGORIES}
      active="hotels"
      crumb="Hotels"
      h1="Where to Stay in Prague"
      heroImage="/images/prague/hotell/four-seasons-prague.webp"
      intro="Prague rewards staying central: base yourself in the Old Town, the Jewish Quarter or across the river in charming Malá Strana and the best sights are all on foot. The city's hotels range from world-class riverside luxury and hotels set inside working monasteries to characterful design boutiques and stylish budget stays that cost a fraction of Western European rates. Here are 8 of the best places to stay for every budget, with nightly prices, standout features and location tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={HOTELS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Prague hotels in detail" items={HOTELS} />
    </CityGuideShell>
  );
}
