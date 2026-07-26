import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { RESTAURANTS, CATEGORIES } from "@/app/data/phuket-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Restaurants in Phuket 2026 — Guide | Flyamba",
  description:
    "Where to eat in Phuket — fiery southern Thai and unique Baba cuisine, fresh seafood, heritage Old Town institutions, beachfront tables and cheap street food, from Raya to Blue Elephant, with prices and tips.",
  alternates: { canonical: `${SITE}/phuket/restaurants` },
  openGraph: { title: "Best Restaurants in Phuket | Flyamba", description: "Phuket's top Thai, seafood, Old Town and street-food spots with prices and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Thai Classics", keys: ["thai"] },
  { label: "Seafood", keys: ["seafood"] },
  { label: "Fine Dining", keys: ["fine"] },
  { label: "Casual", keys: ["casual"] },
  { label: "Old Town", keys: ["oldtown"] },
  { label: "Beachfront", keys: ["beachfront"] },
  { label: "Street Food", keys: ["streetfood"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Phuket", item: `${SITE}/phuket` },
          { "@type": "ListItem", position: 3, name: "Restaurants", item: `${SITE}/phuket/restaurants` },
        ],
      },
      ...RESTAURANTS.map((r) => ({
        "@type": "Restaurant",
        name: r.name,
        description: r.description,
        servesCuisine: r.type,
        address: { "@type": "PostalAddress", addressLocality: "Phuket", addressCountry: "TH" },
        priceRange: r.price,
        aggregateRating: { "@type": "AggregateRating", ratingValue: r.rating, reviewCount: r.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function PhuketRestaurants() {
  return (
    <CityGuideShell
      citySlug="phuket"
      cityName="Phuket"
      categories={CATEGORIES}
      active="restaurants"
      crumb="Restaurants"
      h1="Where to Eat in Phuket"
      heroImage="/images/phuket/sevardheter/soi-romanee.webp"
      intro="Phuket is a food-lover's island, and its cooking is far more distinctive than the generic pad thai of the tourist strips. This is the home of a unique Baba (Peranakan) cuisine born of Chinese and southern-Thai traditions — think crab in yellow curry, moo hong braised pork and Hokkien noodles — alongside super-fresh seafood, heritage restaurants in the Old Town, beachfront tables and some of the best-value street food anywhere. Here is where locals and clued-up visitors actually eat, from cheap hawker stalls to fine dining, with prices and what to order."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={RESTAURANTS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Phuket restaurants in detail" items={RESTAURANTS} />
    </CityGuideShell>
  );
}
