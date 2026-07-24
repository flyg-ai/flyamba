import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { ATTRACTIONS, CATEGORIES } from "@/app/data/reykjavik-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Top Attractions in Reykjavik 2026 — Visitor Guide | Flyamba",
  description:
    "The 20 best things to do in Reykjavik — Hallgrímskirkja, Harpa, Perlan, the Sun Voyager, Sky Lagoon, the National Museum and more, with prices, opening hours and insider tips.",
  alternates: { canonical: `${SITE}/reykjavik/attractions` },
  openGraph: { title: "Best Things to Do in Reykjavik | Flyamba", description: "20 top Reykjavik attractions with prices, hours and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Must-see", keys: ["must-see"] },
  { label: "Free", keys: ["free"] },
  { label: "Museum", keys: ["museum"] },
  { label: "Nature", keys: ["nature"] },
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
          { "@type": "ListItem", position: 2, name: "Reykjavik", item: `${SITE}/reykjavik` },
          { "@type": "ListItem", position: 3, name: "Attractions", item: `${SITE}/reykjavik/attractions` },
        ],
      },
      ...ATTRACTIONS.map((a) => ({
        "@type": "TouristAttraction",
        name: a.name,
        description: a.description,
        address: { "@type": "PostalAddress", addressLocality: "Reykjavik", addressCountry: "IS" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: a.rating, reviewCount: a.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(a.price ?? ""),
      })),
    ],
  };
}

export default function ReykjavikAttractions() {
  return (
    <CityGuideShell
      citySlug="reykjavik"
      cityName="Reykjavik"
      categories={CATEGORIES}
      active="attractions"
      crumb="Attractions"
      h1="Best Things to Do in Reykjavik"
      heroImage="/images/reykjavik/attractions/hallgrimskirkja.webp"
      intro="The world's northernmost capital packs a surprising amount into a compact, walkable centre. Basalt-inspired architecture, a honeycomb glass concert hall, Viking-age museums, steaming geothermal lagoons and one of the liveliest small-city culture scenes anywhere are all within easy reach on foot — the perfect base before you head out to glaciers, geysers and waterfalls. Here are the 20 attractions worth building your trip around, with prices, opening hours and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={ATTRACTIONS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Reykjavik attractions in detail" items={ATTRACTIONS} />
    </CityGuideShell>
  );
}
