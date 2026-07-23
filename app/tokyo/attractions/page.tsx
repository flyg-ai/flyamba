import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { ATTRACTIONS, CATEGORIES } from "@/app/data/tokyo-places";

const SITE = "https://flyamba.com";

export const metadata: Metadata = {
  title: "Top Attractions in Tokyo 2026 — Visitor Guide | Flyamba",
  description:
    "The 17 best things to do in Tokyo — Senso-ji, Meiji Shrine, Shibuya Crossing, Tokyo Skytree, teamLab and more, with prices, opening hours and insider tips.",
  alternates: { canonical: `${SITE}/tokyo/attractions` },
  openGraph: { title: "Best Things to Do in Tokyo | Flyamba", description: "17 top Tokyo attractions with prices, hours and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Free", keys: ["free"] },
  { label: "Must-see", keys: ["must-see"] },
  { label: "Temples & Shrines", keys: ["temples"] },
  { label: "Culture", keys: ["culture"] },
  { label: "Modern", keys: ["modern"] },
  { label: "Parks & Nature", keys: ["parks", "nature"] },
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
          { "@type": "ListItem", position: 3, name: "Attractions", item: `${SITE}/tokyo/attractions` },
        ],
      },
      ...ATTRACTIONS.map((a) => ({
        "@type": "TouristAttraction",
        name: a.name,
        description: a.description,
        address: { "@type": "PostalAddress", addressLocality: "Tokyo", addressCountry: "JP" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: a.rating, reviewCount: a.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(a.price ?? ""),
      })),
    ],
  };
}

export default function TokyoAttractions() {
  return (
    <CityGuideShell
      citySlug="tokyo"
      cityName="Tokyo"
      categories={CATEGORIES}
      active="attractions"
      crumb="Attractions"
      h1="Best Things to Do in Tokyo"
      heroImage="/images/tokyo/sevardheter/senso-ji.webp"
      intro="Tokyo overwhelms in the best way — a megacity where thousand-year-old temples sit in the shadow of neon skyscrapers, serene gardens open off frantic crossings, and every district feels like a different world. From the incense smoke of Senso-ji and the forest calm of Meiji Shrine to the digital wonder of teamLab and the view from the Skytree, here are the 17 attractions worth building your trip around, with prices, opening hours and tips to beat the crowds."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={ATTRACTIONS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Tokyo attractions in detail" items={ATTRACTIONS} />
    </CityGuideShell>
  );
}
