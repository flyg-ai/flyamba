import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { ATTRACTIONS, CATEGORIES } from "@/app/data/lisbon-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Top Attractions in Lisbon 2026 — Visitor Guide | Flyamba",
  description:
    "The 20 best things to do in Lisbon — Belém Tower, Jerónimos Monastery, Alfama, São Jorge Castle, tram 28, the Oceanário and more, with prices, hours and insider tips.",
  alternates: { canonical: `${SITE}/lisbon/attractions` },
  openGraph: { title: "Best Things to Do in Lisbon | Flyamba", description: "20 top Lisbon attractions with prices, hours and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Must-see", keys: ["must-see"] },
  { label: "Free", keys: ["free"] },
  { label: "History", keys: ["history"] },
  { label: "Art", keys: ["art"] },
  { label: "Architecture", keys: ["architecture"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Lisbon", item: `${SITE}/lisbon` },
          { "@type": "ListItem", position: 3, name: "Attractions", item: `${SITE}/lisbon/attractions` },
        ],
      },
      ...ATTRACTIONS.map((a) => ({
        "@type": "TouristAttraction",
        name: a.name,
        description: a.description,
        address: { "@type": "PostalAddress", addressLocality: "Lisbon", addressCountry: "PT" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: a.rating, reviewCount: a.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(a.price ?? ""),
      })),
    ],
  };
}

export default function LisbonAttractions() {
  return (
    <CityGuideShell
      citySlug="lisbon"
      cityName="Lisbon"
      categories={CATEGORIES}
      active="attractions"
      crumb="Attractions"
      h1="Best Things to Do in Lisbon"
      heroImage="/images/lisbon/sevardheter/torre-de-belem.webp"
      intro="Lisbon rewards the curious like few European capitals — a city of tiled façades and tumbling hills where Manueline monuments, medieval quarters, panoramic miradouros, world-class museums and river beaches all sit within easy reach. Here are the 20 attractions worth building your trip around, each with prices, opening hours and tips to skip the queues."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={ATTRACTIONS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Lisbon attractions in detail" items={ATTRACTIONS} />
    </CityGuideShell>
  );
}
