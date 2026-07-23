import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { RESTAURANTS, CATEGORIES } from "@/app/data/rome-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Restaurants in Rome 2026 — Guide | Flyamba",
  description:
    "Where to eat in Rome — the finest trattorias for carbonara and cacio e pepe, classic pizzerias, seafood and fine dining, from Roscioli and Armando al Pantheon to La Pergola, with prices and tips.",
  alternates: { canonical: `${SITE}/rome/restaurants` },
  openGraph: { title: "Best Restaurants in Rome | Flyamba", description: "Rome's top trattorias, pizzerias and fine dining with prices and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Roman Classics", keys: ["roman"] },
  { label: "Fine Dining", keys: ["fine"] },
  { label: "Casual", keys: ["casual"] },
  { label: "Pizza", keys: ["pizza"] },
  { label: "Seafood", keys: ["seafood"] },
  { label: "Trastevere", keys: ["trastevere"] },
  { label: "Modern", keys: ["modern"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Rome", item: `${SITE}/rome` },
          { "@type": "ListItem", position: 3, name: "Restaurants", item: `${SITE}/rome/restaurants` },
        ],
      },
      ...RESTAURANTS.map((r) => ({
        "@type": "Restaurant",
        name: r.name,
        description: r.description,
        servesCuisine: r.type,
        address: { "@type": "PostalAddress", addressLocality: "Rome", addressCountry: "IT" },
        priceRange: r.price,
        aggregateRating: { "@type": "AggregateRating", ratingValue: r.rating, reviewCount: r.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function RomeRestaurants() {
  return (
    <CityGuideShell
      citySlug="rome"
      cityName="Rome"
      categories={CATEGORIES}
      active="restaurants"
      crumb="Restaurants"
      h1="Where to Eat in Rome"
      heroImage="/images/rome/restauranger/roscioli.webp"
      intro="Roman cooking is gloriously simple and fiercely traditional — the holy trinity of carbonara, cacio e pepe and amatriciana, crisp fried supplì and artichokes, thin wood-fired pizza and unfussy seafood. These are the trattorias, pizzerias and special-occasion tables Romans and clued-up visitors actually book, from humble Trastevere queues to three Michelin stars, with prices and what to order at each."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={RESTAURANTS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Rome restaurants in detail" items={RESTAURANTS} />
    </CityGuideShell>
  );
}
