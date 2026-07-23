import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { RESTAURANTS } from "@/app/data/santorini-places";
import { SANTORINI_CATEGORIES } from "@/app/lib/santorini";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Restaurants in Santorini 2026 — Where to Eat Guide | Flyamba",
  description:
    "Where to eat in Santorini — from fine dining at Selene and cliffside sunset tables in Oia to fresh seafood at Amoudi and Vlychada and cheap, brilliant souvlaki. Local dishes, areas and booking tips.",
  alternates: { canonical: `${SITE}/santorini/restaurants` },
  openGraph: { title: "Best Restaurants in Santorini | Flyamba", description: "10 top Santorini restaurants, from fava and fresh fish to caldera-view fine dining.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Fine dining", keys: ["fine-dining"] },
  { label: "Greek", keys: ["greek"] },
  { label: "Seafood", keys: ["seafood"] },
  { label: "Views", keys: ["views"] },
  { label: "Local favourite", keys: ["local-favourite"] },
  { label: "Budget", keys: ["budget"] },
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
          { "@type": "ListItem", position: 3, name: "Restaurants", item: `${SITE}/santorini/restaurants` },
        ],
      },
      ...RESTAURANTS.map((r) => ({
        "@type": "Restaurant",
        name: r.name,
        description: r.description,
        servesCuisine: r.type,
        priceRange: r.price,
        address: { "@type": "PostalAddress", addressLocality: "Santorini", addressCountry: "GR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: r.rating, reviewCount: r.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function SantoriniRestaurants() {
  return (
    <CityGuideShell
      citySlug="santorini"
      cityName="Santorini"
      categories={SANTORINI_CATEGORIES}
      active="restaurants"
      crumb="Restaurants"
      h1="Where to Eat in Santorini"
      heroImage="/images/santorini/restauranger/selene.webp"
      intro="Santorini's food is as distinctive as its landscape, built on ingredients the volcanic soil makes intense: split-pea fava, cherry tomatoes turned into tomatokeftedes fritters, white aubergine, capers and the freshest Aegean seafood. Eat well and you can escape the view-tax trap — the best tables mix caldera-edge fine dining with village tavernas locals swear by and cheap, brilliant souvlaki. These are the 10 restaurants to plan your dinners around."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={RESTAURANTS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Santorini restaurants in detail" items={RESTAURANTS} />
    </CityGuideShell>
  );
}
