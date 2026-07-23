import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { RESTAURANTS, CATEGORIES } from "@/app/data/tokyo-places";

const SITE = "https://flyamba.com";

export const metadata: Metadata = {
  title: "Best Restaurants in Tokyo 2026 — Where to Eat | Flyamba",
  description:
    "Where to eat in Tokyo — from legendary sushi counters and Michelin-starred kaiseki to the best ramen, tonkatsu and smoky izakaya alleys, with prices and tips.",
  alternates: { canonical: `${SITE}/tokyo/restaurants` },
  openGraph: { title: "Best Restaurants in Tokyo | Flyamba", description: "Tokyo's finest sushi, ramen, izakaya and fine dining.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Sushi", keys: ["sushi"] },
  { label: "Ramen", keys: ["ramen"] },
  { label: "Fine Dining", keys: ["fine-dining"] },
  { label: "Izakaya", keys: ["izakaya"] },
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
          { "@type": "ListItem", position: 2, name: "Tokyo", item: `${SITE}/tokyo` },
          { "@type": "ListItem", position: 3, name: "Restaurants", item: `${SITE}/tokyo/restaurants` },
        ],
      },
      ...RESTAURANTS.map((r) => ({
        "@type": "Restaurant",
        name: r.name,
        description: r.description,
        servesCuisine: r.type,
        priceRange: r.price,
        address: { "@type": "PostalAddress", addressLocality: "Tokyo", addressCountry: "JP" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: r.rating, reviewCount: r.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function TokyoRestaurants() {
  return (
    <CityGuideShell
      citySlug="tokyo"
      cityName="Tokyo"
      categories={CATEGORIES}
      active="restaurants"
      crumb="Restaurants"
      h1="Where to Eat in Tokyo"
      heroImage="/images/tokyo/restauranger/sushi-saito.webp"
      intro="Tokyo is, by almost any measure, the greatest food city on earth — home to more Michelin stars than any other and to thousands of tiny, obsessive specialists perfecting a single dish. Whether you are chasing a once-in-a-lifetime sushi omakase, the perfect bowl of ramen, a shatteringly crisp tonkatsu or a smoky night of yakitori and highballs in a back alley, this guide rounds up the restaurants worth planning your days around, with cuisines, price ranges and booking tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={RESTAURANTS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Tokyo restaurants in detail" items={RESTAURANTS} />
    </CityGuideShell>
  );
}
