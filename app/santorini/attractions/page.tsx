import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { ATTRACTIONS } from "@/app/data/santorini-places";
import { SANTORINI_CATEGORIES } from "@/app/lib/santorini";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Top Attractions in Santorini 2026 — Things to Do Guide | Flyamba",
  description:
    "The best things to do in Santorini — the Oia sunset, Fira, the Fira-to-Oia caldera walk, Akrotiri, Ancient Thera, the volcano, wineries and blue-domed churches, with prices, hours and tips.",
  alternates: { canonical: `${SITE}/santorini/attractions` },
  openGraph: { title: "Best Things to Do in Santorini | Flyamba", description: "18 top Santorini attractions with prices, hours and insider tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Must-see", keys: ["must-see"] },
  { label: "Free", keys: ["free"] },
  { label: "Views", keys: ["views"] },
  { label: "History", keys: ["history"] },
  { label: "Active", keys: ["active"] },
  { label: "Romantic", keys: ["romantic"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Santorini", item: `${SITE}/santorini` },
          { "@type": "ListItem", position: 3, name: "Attractions", item: `${SITE}/santorini/attractions` },
        ],
      },
      ...ATTRACTIONS.map((a) => ({
        "@type": "TouristAttraction",
        name: a.name,
        description: a.description,
        address: { "@type": "PostalAddress", addressLocality: "Santorini", addressCountry: "GR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: a.rating, reviewCount: a.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(a.price ?? ""),
      })),
    ],
  };
}

export default function SantoriniAttractions() {
  return (
    <CityGuideShell
      citySlug="santorini"
      cityName="Santorini"
      categories={SANTORINI_CATEGORIES}
      active="attractions"
      crumb="Attractions"
      h1="Best Things to Do in Santorini"
      heroImage="/images/santorini/sevardheter/oia-solnedgang.webp"
      intro="Santorini packs an astonishing amount into a small volcanic island: the world-famous sunset over Oia, the caldera-rim walk from Fira, the Bronze Age 'Minoan Pompeii' at Akrotiri, a still-active volcano you can hike, and wineries pouring wines grown nowhere else on earth. Here are the 18 experiences worth building your trip around, with prices, opening hours and tips to dodge the crowds."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={ATTRACTIONS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Santorini attractions in detail" items={ATTRACTIONS} />
    </CityGuideShell>
  );
}
