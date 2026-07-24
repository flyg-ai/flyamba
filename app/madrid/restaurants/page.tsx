import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { RESTAURANTS, CATEGORIES } from "@/app/data/madrid-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Where to Eat in Madrid 2026 — Best Restaurants Guide | Flyamba",
  description:
    "The best restaurants in Madrid — from Sobrino de Botín, the world's oldest, and three-Michelin-star DiverXO to the world-champion tortilla at Casa Dani, plus tapas, churros and local favourites.",
  alternates: { canonical: `${SITE}/madrid/restaurants` },
  openGraph: { title: "Best Restaurants in Madrid | Flyamba", description: "Where to eat in Madrid — 10 standout tables with tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Local favourites", keys: ["lokalt"] },
  { label: "Fine dining", keys: ["fine-dining"] },
  { label: "Budget", keys: ["budget"] },
  { label: "Romantic", keys: ["romantisk"] },
  { label: "Family", keys: ["familj"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Madrid", item: `${SITE}/madrid` },
          { "@type": "ListItem", position: 3, name: "Restaurants", item: `${SITE}/madrid/restaurants` },
        ],
      },
      ...RESTAURANTS.map((r) => ({
        "@type": "Restaurant",
        name: r.name,
        description: r.description,
        servesCuisine: r.type,
        address: { "@type": "PostalAddress", addressLocality: "Madrid", addressCountry: "ES" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: r.rating, reviewCount: r.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function MadridRestaurants() {
  return (
    <CityGuideShell
      citySlug="madrid"
      cityName="Madrid"
      categories={CATEGORIES}
      active="restaurants"
      crumb="Restaurants"
      h1="Where to Eat in Madrid"
      heroImage="/images/madrid/restaurants/sobrino-de-botn.webp"
      intro="Madrid's food scene is as social as it is delicious, and one of the best-value in Europe. From Sobrino de Botín — the world's oldest restaurant, roasting suckling pig since 1725 — to Dabiz Muñoz's three-Michelin-star DiverXO, from the world-champion tortilla at Casa Dani to churros con chocolate at 130-year-old San Ginés, these are the tables worth planning around. Eat where the locals eat: skip menus in six languages, follow the tapas trail through La Latina, and remember that Madrileños dine late. Here are 10 standout restaurants with areas, prices and insider tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={RESTAURANTS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Madrid restaurants in detail" items={RESTAURANTS} />
    </CityGuideShell>
  );
}
