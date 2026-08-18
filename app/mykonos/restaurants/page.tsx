import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { RESTAURANTS, CATEGORIES } from "@/app/data/mykonos-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Where to Eat in Mykonos 2026 — Restaurants Guide | Flyamba",
  description:
    "The best restaurants in Mykonos — Nobu and Scorpios, the cave-set Spilia, off-grid Kiki's Taverna, historic Kounelas fish tavern and modern-Greek…",
  alternates: { canonical: `${SITE}/mykonos/restaurants` },
  openGraph: { title: "Best Restaurants in Mykonos | Flyamba", description: "10 top Mykonos restaurants, from beach clubs to classic tavernas.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Fine Dining", keys: ["fine"] },
  { label: "Taverna", keys: ["taverna"] },
  { label: "Beach", keys: ["beach"] },
  { label: "Seafood", keys: ["seafood"] },
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
          { "@type": "ListItem", position: 3, name: "Restaurants", item: `${SITE}/mykonos/restaurants` },
        ],
      },
      ...RESTAURANTS.map((r) => ({
        "@type": "Restaurant",
        name: r.name,
        description: r.description,
        servesCuisine: r.type,
        priceRange: r.price,
        address: { "@type": "PostalAddress", addressLocality: "Mykonos", addressCountry: "GR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: r.rating, reviewCount: r.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function MykonosRestaurants() {
  return (
    <CityGuideShell
      citySlug="mykonos"
      cityName="Mykonos"
      categories={CATEGORIES}
      active="restaurants"
      crumb="Restaurants"
      h1="Where to Eat in Mykonos"
      heroImage="/images/mykonos/restaurants/restaurant-mykonos.avif"
      intro="Mykonos has one of Greece's hottest dining scenes — Nobu arrived from Tokyo, Scorpios serves hours-long Mediterranean feasts at sunset, and Spilia sits inside a literal seaside cave. But the island also guards its soul in classic Greek tavernas: off-grid Kiki's grilling over charcoal above a wild beach, Kounelas weighing your fish since 1956, and family kitchens baking their own bread. Here are 10 of the island's best tables — fine-dining icons, beach clubs, seafood specialists and honest tavernas — with prices, areas and booking advice. Reserve well ahead in July and August, when the whole island books out."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={RESTAURANTS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Mykonos restaurants in detail" items={RESTAURANTS} />
    </CityGuideShell>
  );
}
