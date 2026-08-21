import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { RESTAURANTS, CATEGORIES } from "@/app/data/dubai-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Restaurants in Dubai 2026 — Guide | Flyamba",
  description:
    "Where to eat in Dubai — from three-Michelin-star Trèsind Studio and glamorous Nobu, Zuma and Pierchic to legendary cheap eats like Al Ustad kebabs, Bu…",
  alternates: { canonical: `${SITE}/dubai/restaurants` },
  openGraph: { title: "Best Restaurants in Dubai | Flyamba", description: "Dubai's top fine dining and cheap local eats with prices and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Fine Dining", keys: ["fine-dining"] },
  { label: "With a View", keys: ["view"] },
  { label: "Local & Traditional", keys: ["local"] },
  { label: "Budget", keys: ["budget"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...RESTAURANTS.map((r) => ({
        "@type": "Restaurant",
        name: r.name,
        description: r.description,
        servesCuisine: r.type,
        address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
        priceRange: r.price,
        aggregateRating: { "@type": "AggregateRating", ratingValue: r.rating, reviewCount: r.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function DubaiRestaurants() {
  return (
    <CityGuideShell
      citySlug="dubai"
      cityName="Dubai"
      categories={CATEGORIES}
      active="restaurants"
      crumb="Restaurants"
      h1="Where to Eat in Dubai"
      heroImage="/images/dubai/restaurants/restaurant-dubai.avif"
      intro="Few cities eat as globally as Dubai. Its huge international population supports everything from three-Michelin-star tasting menus and celebrity-chef glamour to the best-value shawarma, curry and grilled fish you'll ever eat, all within a short taxi ride. These are the tables worth planning around — the special-occasion showstoppers and the beloved cheap local institutions alike — with prices, what to order and how to book at each."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={RESTAURANTS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Dubai restaurants in detail" items={RESTAURANTS} />
    </CityGuideShell>
  );
}
