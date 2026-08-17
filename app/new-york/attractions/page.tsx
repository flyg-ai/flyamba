import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { ATTRACTIONS, CATEGORIES } from "@/app/data/new-york-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Top Attractions in New York 2026 — Visitor Guide | Flyamba",
  description:
    "The 20 best things to do in New York — the Statue of Liberty, Empire State Building, Central Park, the Met, MoMA, the Brooklyn Bridge and more, with…",
  alternates: { canonical: `${SITE}/new-york/attractions` },
  openGraph: { title: "Best Things to Do in New York | Flyamba", description: "20 top New York attractions with prices, hours and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Must-see", keys: ["must-see"] },
  { label: "Free", keys: ["free"] },
  { label: "Museums", keys: ["museums"] },
  { label: "Views", keys: ["views"] },
  { label: "Family", keys: ["family"] },
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
          { "@type": "ListItem", position: 3, name: "Attractions", item: `${SITE}/new-york/attractions` },
        ],
      },
      ...ATTRACTIONS.map((a) => ({
        "@type": "TouristAttraction",
        name: a.name,
        description: a.description,
        address: { "@type": "PostalAddress", addressLocality: "New York", addressRegion: "NY", addressCountry: "US" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: a.rating, reviewCount: a.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(a.price ?? ""),
      })),
    ],
  };
}

export default function NewYorkAttractions() {
  return (
    <CityGuideShell
      citySlug="new-york"
      cityName="New York"
      categories={CATEGORIES}
      active="attractions"
      crumb="Attractions"
      h1="Best Things to Do in New York"
      heroImage="/images/new-york/attractions/statue-of-liberty.webp"
      intro="No city packs in as many icons as New York. The Statue of Liberty rising from the harbour, the Art Deco spire of the Empire State Building, Central Park's 341 hectares of green, the Brooklyn Bridge slung across the East River, and the world-class art of the Met, MoMA and the Guggenheim are all here — alongside Harlem gospel, the High Line and the moving 9/11 Memorial. Here are the 20 attractions worth building your trip around, with prices, opening hours and tips to skip the queues."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={ATTRACTIONS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="New York attractions in detail" items={ATTRACTIONS} />
    </CityGuideShell>
  );
}
