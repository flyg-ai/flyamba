import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { SHOPPING, CATEGORIES } from "@/app/data/mykonos-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Shopping in Mykonos 2026 — Boutiques & Markets Guide | Flyamba",
  description:
    "Where to shop in Mykonos — designer-lined Matogianni Street, the galleries of Little Venice, iconic Greek label Parthenis, local jewellery, handmade leather sandals and edible island specialities.",
  alternates: { canonical: `${SITE}/mykonos/shopping` },
  openGraph: { title: "Best Shopping in Mykonos | Flyamba", description: "8 top Mykonos shopping spots, from luxury boutiques to local food.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Souvenirs", keys: ["souvenirs"] },
  { label: "Local", keys: ["local"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Mykonos", item: `${SITE}/mykonos` },
          { "@type": "ListItem", position: 3, name: "Shopping", item: `${SITE}/mykonos/shopping` },
        ],
      },
      ...SHOPPING.map((s) => ({
        "@type": "Store",
        name: s.name,
        description: s.description,
        address: { "@type": "PostalAddress", addressLocality: "Mykonos", addressCountry: "GR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: s.rating, reviewCount: s.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function MykonosShopping() {
  return (
    <CityGuideShell
      citySlug="mykonos"
      cityName="Mykonos"
      categories={CATEGORIES}
      active="shopping"
      crumb="Shopping"
      h1="Shopping in Mykonos"
      heroImage="/images/mykonos/shopping/matoyianni-street.webp"
      intro="Shopping in Mykonos runs from international high fashion to genuinely local craft. The whitewashed lanes of Chora — above all bougainvillea-draped Matogianni Street — are lined with the big luxury names, while the galleries of Little Venice and homegrown labels like Parthenis offer something more considered and Greek. Beyond the designer racks, the real treasures are island-made: handmade leather sandals fitted to your feet, local jewellery, and edible specialities like the spicy Mykonian cheese kopanisti. Here are 8 of the best places to shop and browse, with opening hours, areas and tips — from luxury boutiques to the local food market."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={SHOPPING} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Mykonos shopping in detail" items={SHOPPING} />
    </CityGuideShell>
  );
}
