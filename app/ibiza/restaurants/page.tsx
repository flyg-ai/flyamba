import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { RESTAURANTS, IBIZA_CATEGORIES } from "@/app/data/ibiza-places";
import { SITE } from "@/app/lib/destination-helpers";

const HERO = "/images/destinations/flights-ibiza.avif";

export const metadata: Metadata = {
  title: "Restaurants in Ibiza 2026 — Where to Eat | Flyamba",
  description:
    "Where to eat in Ibiza — Michelin-starred La Gaia, Es Tragón and Etxeko, chic beach lunches at Casa Jondal and Amante, and traditional Ibicenco cooking, with prices and tips.",
  alternates: { canonical: `${SITE}/ibiza/restaurants` },
  openGraph: { title: "Best Restaurants in Ibiza | Flyamba", description: "From Michelin stars to beachfront seafood, where to eat on the White Isle.", type: "article", images: [HERO] },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Seafood", keys: ["seafood"] },
  { label: "Fine dining", keys: ["fine-dining"] },
  { label: "Beachfront", keys: ["beachfront"] },
  { label: "Traditional", keys: ["traditional"] },
  { label: "Michelin", keys: ["michelin"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Ibiza", item: `${SITE}/ibiza` },
          { "@type": "ListItem", position: 3, name: "Restaurants", item: `${SITE}/ibiza/restaurants` },
        ],
      },
      ...RESTAURANTS.map((r) => ({
        "@type": "Restaurant",
        name: r.name,
        description: r.description,
        servesCuisine: r.type,
        priceRange: r.price,
        address: { "@type": "PostalAddress", addressLocality: "Ibiza", addressCountry: "ES" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: r.rating, reviewCount: r.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function IbizaRestaurants() {
  return (
    <CityGuideShell
      citySlug="ibiza"
      cityName="Ibiza"
      categories={IBIZA_CATEGORIES}
      active="restaurants"
      crumb="Restaurants"
      h1="Where to Eat in Ibiza"
      heroImage={HERO}
      intro="Ibiza's dining scene has grown far beyond beach-bar paella. The island now holds several Michelin stars — at La Gaia, Es Tragón and Etxeko — alongside glamorous beach-club lunches at Casa Jondal and Amante, superb cove seafood at Es Torrent, and hearty, traditional Ibicenco cooking in inland village houses. Here is where to eat across the island, from special-occasion tables to relaxed lunches by the water, with price levels, areas and insider tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={RESTAURANTS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Ibiza restaurants in detail" items={RESTAURANTS} />
    </CityGuideShell>
  );
}
