import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { RESTAURANTS, CATEGORIES } from "@/app/data/paris-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Restaurants in Paris 2026 — Guide | Flyamba",
  description:
    "Where to eat in Paris — from historic bouillons and classic bistros to Michelin-starred neo-bistros and a seat inside the Eiffel Tower. Prices, areas, Métro directions and booking tips for the city's best tables.",
  alternates: { canonical: `${SITE}/paris/restaurants` },
  openGraph: { title: "Best Restaurants in Paris | Flyamba", description: "The best places to eat in Paris, from bistros to Michelin stars.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Bistro", keys: ["bistro"] },
  { label: "Fine dining", keys: ["fine-dining"] },
  { label: "Brasserie", keys: ["brasserie"] },
  { label: "Seafood", keys: ["seafood"] },
  { label: "Modern", keys: ["modern"] },
  { label: "Budget-friendly", keys: ["budget"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Paris", item: `${SITE}/paris` },
          { "@type": "ListItem", position: 3, name: "Restaurants", item: `${SITE}/paris/restaurants` },
        ],
      },
      ...RESTAURANTS.map((r) => ({
        "@type": "Restaurant",
        name: r.name,
        description: r.description,
        servesCuisine: r.type,
        priceRange: r.price,
        address: { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: r.rating, reviewCount: r.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function ParisRestaurants() {
  return (
    <CityGuideShell
      citySlug="paris"
      cityName="Paris"
      categories={CATEGORIES}
      active="restaurants"
      crumb="Restaurants"
      h1="Where to Eat in Paris"
      heroImage="/images/paris/restauranger/le-comptoir-du-relais.webp"
      intro="Paris is one of the world's great food cities, and eating well here means far more than white-tablecloth gastronomy. From a cavernous 1896 bouillon serving three courses for under €25 to the impossible-to-book neo-bistros redefining French cooking, a rowdy Basque table near the Eiffel Tower and dinner inside the tower itself, these are the restaurants worth planning around — with prices, neighbourhoods, Métro directions and the booking know-how you'll need."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={RESTAURANTS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Paris restaurants in detail" items={RESTAURANTS} />
    </CityGuideShell>
  );
}
