import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { RESTAURANTS, CATEGORIES } from "@/app/data/marrakech-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Restaurants in Marrakech 2026 — Guide | Flyamba",
  description:
    "Where to eat in Marrakech — from Jemaa el-Fnaa food stalls and pit-roasted mechoui to modern rooftops like Nomad and lavish palace feasts at Dar Yacout, with prices, hours and tips.",
  alternates: { canonical: `${SITE}/marrakech/restaurants` },
  openGraph: { title: "Best Restaurants in Marrakech | Flyamba", description: "The top Marrakech restaurants, from street food to palace banquets.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Traditional", keys: ["traditional"] },
  { label: "Modern", keys: ["modern"] },
  { label: "Fine dining", keys: ["fine"] },
  { label: "Rooftop", keys: ["rooftop"] },
  { label: "Casual", keys: ["casual"] },
  { label: "Street food", keys: ["street-food"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Marrakech", item: `${SITE}/marrakech` },
          { "@type": "ListItem", position: 3, name: "Restaurants", item: `${SITE}/marrakech/restaurants` },
        ],
      },
      ...RESTAURANTS.map((r) => ({
        "@type": "Restaurant",
        name: r.name,
        description: r.description,
        servesCuisine: r.type,
        address: { "@type": "PostalAddress", addressLocality: "Marrakech", addressCountry: "MA" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: r.rating, reviewCount: r.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function MarrakechRestaurants() {
  return (
    <CityGuideShell
      citySlug="marrakech"
      cityName="Marrakech"
      categories={CATEGORIES}
      active="restaurants"
      crumb="Restaurants"
      h1="Where to Eat in Marrakech"
      heroImage="/images/marrakech/restauranger/nomad.webp"
      intro="Marrakech is a feast for the senses and the stomach alike. Moroccan cooking runs from slow-braised tagines, fluffy couscous and the sweet-savoury pastilla to pit-roasted mechoui lamb and mountains of little salads — and the city serves it every way, from a few-dirham stall on Jemaa el-Fnaa to a candlelit palace banquet. This guide covers the tables worth planning around, spanning traditional riads, modern rooftops, women-run kitchens and street-food legends, with typical prices, opening hours and tips on where alcohol is served."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={RESTAURANTS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Marrakech restaurants in detail" items={RESTAURANTS} />
    </CityGuideShell>
  );
}
