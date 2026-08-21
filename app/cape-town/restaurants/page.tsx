import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { RESTAURANTS, CATEGORIES } from "@/app/data/cape-town-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Where to Eat in Cape Town 2026 — Best Restaurants Guide",
  description:
    "The best restaurants in Cape Town — Africa's top-ranked fine dining, township feasts, pan-African grills, fresh seafood and unbeatable-value food halls…",
  alternates: { canonical: `${SITE}/cape-town/restaurants` },
  openGraph: { title: "Best Restaurants in Cape Town | Flyamba", description: "From Africa's best fine dining to township feasts — where to eat in Cape Town.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Fine dining", keys: ["fine-dining"] },
  { label: "African", keys: ["african"] },
  { label: "Seafood", keys: ["seafood"] },
  { label: "Bistro", keys: ["bistro"] },
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
        priceRange: r.price,
        address: { "@type": "PostalAddress", addressLocality: "Cape Town", addressCountry: "ZA" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: r.rating, reviewCount: r.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function CapeTownRestaurants() {
  return (
    <CityGuideShell
      citySlug="cape-town"
      cityName="Cape Town"
      categories={CATEGORIES}
      active="restaurants"
      crumb="Restaurants"
      h1="Where to Eat in Cape Town"
      heroImage="/images/cape-town/restaurants/restaurant-cape-town.avif"
      intro="Cape Town ranks among the world's great food cities, with four restaurants in the 50 Best Restaurants Africa top ten and a scene that runs from cliff-top fine dining to gospel-soundtracked township feasts. This guide gathers the standout places to eat — pan-African grills, fresh Atlantic seafood, glamorous tasting menus and unbeatable-value food halls — with cuisines, neighbourhoods, prices and booking tips so you can plan every meal."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={RESTAURANTS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Cape Town restaurants in detail" items={RESTAURANTS} />
    </CityGuideShell>
  );
}
