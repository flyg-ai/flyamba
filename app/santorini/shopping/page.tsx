import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { SHOPPING } from "@/app/data/santorini-places";
import { SANTORINI_CATEGORIES } from "@/app/lib/santorini";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Shopping in Santorini 2026 — Art, Jewellery & Wine Guide | Flyamba",
  description:
    "Where to shop in Santorini — Oia's art galleries and boutiques, Fira's Gold Street jewellery, the cult Atlantis Books, handmade ceramics, and volcanic Assyrtiko and Vinsanto wines to take home.",
  alternates: { canonical: `${SITE}/santorini/shopping` },
  openGraph: { title: "Shopping in Santorini | Flyamba", description: "8 of the best places to shop in Santorini, from cave bookshops to winery cellars.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Boutiques", keys: ["boutiques"] },
  { label: "Art", keys: ["art"] },
  { label: "Jewellery", keys: ["jewellery"] },
  { label: "Ceramics", keys: ["ceramics"] },
  { label: "Wine", keys: ["wine"] },
  { label: "Gifts", keys: ["gifts"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Santorini", item: `${SITE}/santorini` },
          { "@type": "ListItem", position: 3, name: "Shopping", item: `${SITE}/santorini/shopping` },
        ],
      },
      ...SHOPPING.map((s) => ({
        "@type": "Store",
        name: s.name,
        description: s.description,
        address: { "@type": "PostalAddress", addressLocality: s.area, addressRegion: "Santorini", addressCountry: "GR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: s.rating, reviewCount: s.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function SantoriniShopping() {
  return (
    <CityGuideShell
      citySlug="santorini"
      cityName="Santorini"
      categories={SANTORINI_CATEGORIES}
      active="shopping"
      crumb="Shopping"
      h1="Shopping in Santorini"
      heroImage="/images/santorini/shopping/oia-main-street.webp"
      intro="Santorini shopping goes well beyond fridge magnets. Oia's marble main street is lined with serious art galleries, jewellers and design boutiques; Fira's Gold Street glitters with gold sold by weight; and the island's real treasures are edible and drinkable — volcanic Assyrtiko and Vinsanto wines from historic cellars. Add the cult Atlantis Books and working pottery studios, and you have keepsakes worth carrying home. Here are the eight best places to shop."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={SHOPPING} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Santorini shopping in detail" items={SHOPPING} />
    </CityGuideShell>
  );
}
