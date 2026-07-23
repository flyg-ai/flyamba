import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { ATTRACTIONS, CATEGORIES } from "@/app/data/athens-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Top Attractions in Athens 2026 — Visitor Guide | Flyamba",
  description:
    "The 18 best things to do in Athens — the Acropolis and Parthenon, Acropolis Museum, Ancient Agora, Plaka, the National Archaeological Museum and more, with prices, hours and insider tips.",
  alternates: { canonical: `${SITE}/athens/attractions` },
  openGraph: { title: "Best Things to Do in Athens | Flyamba", description: "18 top Athens attractions with prices, hours and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Must-see", keys: ["must-see"] },
  { label: "Free", keys: ["free"] },
  { label: "History", keys: ["history"] },
  { label: "Art", keys: ["art"] },
  { label: "Nature", keys: ["nature"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Athens", item: `${SITE}/athens` },
          { "@type": "ListItem", position: 3, name: "Attractions", item: `${SITE}/athens/attractions` },
        ],
      },
      ...ATTRACTIONS.map((a) => ({
        "@type": "TouristAttraction",
        name: a.name,
        description: a.description,
        address: { "@type": "PostalAddress", addressLocality: "Athens", addressCountry: "GR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: a.rating, reviewCount: a.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(a.price ?? ""),
      })),
    ],
  };
}

export default function AthensAttractions() {
  return (
    <CityGuideShell
      citySlug="athens"
      cityName="Athens"
      categories={CATEGORIES}
      active="attractions"
      crumb="Attractions"
      h1="Best Things to Do in Athens"
      heroImage="/images/athens/sevardheter/parthenon.webp"
      intro="Few cities pack as much history into a single walkable centre as Athens. From the Acropolis and its perfect Parthenon to the Ancient Agora where democracy was born, the treasure-filled National Archaeological Museum and the romantic lanes of Plaka, these are the 18 attractions worth building your trip around — each with prices, opening hours and tips to beat the crowds and the midday heat."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={ATTRACTIONS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Athens attractions in detail" items={ATTRACTIONS} />
    </CityGuideShell>
  );
}
