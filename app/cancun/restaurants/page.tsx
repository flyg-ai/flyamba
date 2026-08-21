import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { RESTAURANTS, CATEGORIES } from "@/app/data/cancun-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Restaurants in Cancún 2026 — Guide | Flyamba",
  description:
    "Where to eat in Cancún — Caribbean lobster at Lorenzillo's, refined Yucatecan cuisine at La Habichuela, glossy steakhouses, and the authentic taquerías…",
  alternates: { canonical: `${SITE}/cancun/restaurants` },
  openGraph: { title: "Best Restaurants in Cancún | Flyamba", description: "Cancún's top tables, from lobster houses and Yucatecan classics to local taquerías, with prices and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Yucatecan", keys: ["yucatecan"] },
  { label: "Seafood", keys: ["seafood"] },
  { label: "Mexican", keys: ["mexican"] },
  { label: "Steak", keys: ["steak"] },
  { label: "Fine Dining", keys: ["fine"] },
  { label: "Casual", keys: ["casual"] },
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
        address: { "@type": "PostalAddress", addressLocality: "Cancún", addressCountry: "MX" },
        priceRange: r.price,
        aggregateRating: { "@type": "AggregateRating", ratingValue: r.rating, reviewCount: r.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function CancunRestaurants() {
  return (
    <CityGuideShell
      citySlug="cancun"
      cityName="Cancún"
      categories={CATEGORIES}
      active="restaurants"
      crumb="Restaurants"
      h1="Where to Eat in Cancún"
      heroImage="/images/placeholders/placeholder-restaurants.webp"
      intro="Cancún's dining splits into two worlds. In the Hotel Zone are the celebrated special-occasion tables — lobster houses over the lagoon, glossy steakhouses, refined Yucatecan cuisine and dinner-and-a-show spectacles — priced for the resort market and often quoted in dollars. Cross into downtown El Centro, though, and you'll find where cancunenses actually eat: bustling Mexican grills, market cocinas and legendary taquerías serving some of the best food in the city at a fraction of the price. Here are the restaurants worth booking and the local gems worth the taxi ride, with prices and what to order at each."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={RESTAURANTS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Cancún restaurants in detail" items={RESTAURANTS} />
    </CityGuideShell>
  );
}
