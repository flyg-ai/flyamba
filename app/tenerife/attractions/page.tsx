import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { ATTRACTIONS, CATEGORIES } from "@/app/data/tenerife-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Top Attractions in Tenerife 2026 — Visitor Guide | Flyamba",
  description:
    "The best things to do in Tenerife — Mount Teide and its cable car, Siam Park, Loro Parque, Masca village, Los Gigantes cliffs, La Laguna and more, with prices, hours and insider tips.",
  alternates: { canonical: `${SITE}/tenerife/attractions` },
  openGraph: { title: "Best Things to Do in Tenerife | Flyamba", description: "18 top Tenerife attractions with prices, hours and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Must-see", keys: ["must-see"] },
  { label: "Nature", keys: ["nature"] },
  { label: "Views", keys: ["views"] },
  { label: "Culture", keys: ["culture"] },
  { label: "Family", keys: ["family"] },
  { label: "Free", keys: ["free"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Tenerife", item: `${SITE}/tenerife` },
          { "@type": "ListItem", position: 3, name: "Attractions", item: `${SITE}/tenerife/attractions` },
        ],
      },
      ...ATTRACTIONS.map((a) => ({
        "@type": "TouristAttraction",
        name: a.name,
        description: a.description,
        address: { "@type": "PostalAddress", addressLocality: "Tenerife", addressCountry: "ES" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: a.rating, reviewCount: a.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(a.price ?? ""),
      })),
    ],
  };
}

export default function TenerifeAttractions() {
  return (
    <CityGuideShell
      citySlug="tenerife"
      cityName="Tenerife"
      categories={CATEGORIES}
      active="attractions"
      crumb="Attractions"
      h1="Best Things to Do in Tenerife"
      heroImage="/images/tenerife/sevardheter/pico-del-teide.webp"
      intro="Tenerife packs extraordinary variety into one island — the towering Teide volcano and its Mars-like national park, world-beating theme parks, ancient laurel forests, dramatic sea cliffs and beautifully preserved colonial towns. Here are the 18 attractions worth building your trip around, with prices, opening hours and tips to make the most of each."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={ATTRACTIONS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Tenerife attractions in detail" items={ATTRACTIONS} />
    </CityGuideShell>
  );
}
