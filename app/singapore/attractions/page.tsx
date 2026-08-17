import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { ATTRACTIONS, CATEGORIES } from "@/app/data/singapore-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Attractions in Singapore 2026 — Guide | Flyamba",
  description:
    "The 18 best things to do in Singapore — Gardens by the Bay, Marina Bay Sands, the Singapore Zoo, Universal Studios, Sentosa, Chinatown, Little India and…",
  alternates: { canonical: `${SITE}/singapore/attractions` },
  openGraph: { title: "Best Things to Do in Singapore | Flyamba", description: "18 top Singapore attractions with prices, hours and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Free", keys: ["free"] },
  { label: "Must-see", keys: ["must-see"] },
  { label: "Nature", keys: ["nature"] },
  { label: "Culture", keys: ["culture"] },
  { label: "Family", keys: ["family"] },
  { label: "Architecture & Views", keys: ["architecture", "views"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Singapore", item: `${SITE}/singapore` },
          { "@type": "ListItem", position: 3, name: "Attractions", item: `${SITE}/singapore/attractions` },
        ],
      },
      ...ATTRACTIONS.map((a) => ({
        "@type": "TouristAttraction",
        name: a.name,
        description: a.description,
        address: { "@type": "PostalAddress", addressLocality: "Singapore", addressCountry: "SG" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: a.rating, reviewCount: a.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(a.price ?? ""),
      })),
    ],
  };
}

export default function SingaporeAttractions() {
  return (
    <CityGuideShell
      citySlug="singapore"
      cityName="Singapore"
      categories={CATEGORIES}
      active="attractions"
      crumb="Attractions"
      h1="Best Things to Do in Singapore"
      heroImage="/images/singapore/sevardheter/gardens-by-the-bay.webp"
      intro="Few cities pack in more per square kilometre than Singapore. Futuristic icons like Gardens by the Bay and Marina Bay Sands stand beside the temples and hawker centres of Chinatown and Little India, the world's best zoo, the theme parks and beaches of Sentosa and a UNESCO botanic garden — all in a spotless, walkable, tropical city-state. Here are the 18 attractions worth building your trip around, with prices, opening hours and insider tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={ATTRACTIONS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Singapore attractions in detail" items={ATTRACTIONS} />
    </CityGuideShell>
  );
}
