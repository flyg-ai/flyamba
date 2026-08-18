import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { RESTAURANTS, CATEGORIES } from "@/app/data/new-york-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Where to Eat in New York 2026 — Best Restaurants Guide",
  description:
    "The best restaurants in New York — Le Bernardin, Eleven Madison Park, Peter Luger, Katz's, Joe's Pizza and Carbone, from three-Michelin fine dining to…",
  alternates: { canonical: `${SITE}/new-york/restaurants` },
  openGraph: { title: "Best Restaurants in New York | Flyamba", description: "From three-Michelin tables to iconic delis and pizza — where to eat in New York.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Local", keys: ["local"] },
  { label: "Modern", keys: ["modern"] },
  { label: "Fine dining", keys: ["fine-dining"] },
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
          { "@type": "ListItem", position: 2, name: "New York", item: `${SITE}/new-york` },
          { "@type": "ListItem", position: 3, name: "Restaurants", item: `${SITE}/new-york/restaurants` },
        ],
      },
      ...RESTAURANTS.map((r) => ({
        "@type": "Restaurant",
        name: r.name,
        description: r.description,
        servesCuisine: r.type,
        priceRange: r.price,
        address: { "@type": "PostalAddress", addressLocality: "New York", addressRegion: "NY", addressCountry: "US" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: r.rating, reviewCount: r.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function NewYorkRestaurants() {
  return (
    <CityGuideShell
      citySlug="new-york"
      cityName="New York"
      categories={CATEGORIES}
      active="restaurants"
      crumb="Restaurants"
      h1="Where to Eat in New York"
      heroImage="/images/new-york/restaurants/restaurant-new-york.avif"
      intro="New York is the world's most dynamic food city — some 24,000 restaurants, dozens of Michelin stars and the most international dining culture on earth. It runs from three-Michelin-star temples like Le Bernardin and Eleven Madison Park to century-old institutions such as Katz's, Peter Luger and Russ & Daughters, and from glamorous Carbone to a $3.50 slice at Joe's Pizza. Here are the best places to eat across every budget, with prices, neighbourhoods and booking tips — and a reminder that an 18–22% tip is expected on top of the bill."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={RESTAURANTS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="New York restaurants in detail" items={RESTAURANTS} />
    </CityGuideShell>
  );
}
