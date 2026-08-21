import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { ATTRACTIONS, CATEGORIES } from "@/app/data/mykonos-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Things to Do in Mykonos 2026 — Attractions Guide | Flyamba",
  description:
    "The best things to do in Mykonos — Chora's whitewashed lanes, Little Venice, the iconic windmills, Paraportiani church, the museums and a boat trip to…",
  alternates: { canonical: `${SITE}/mykonos/attractions` },
  openGraph: { title: "Best Things to Do in Mykonos | Flyamba", description: "16 top Mykonos attractions with prices, hours and insider tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Must-see", keys: ["must-see"] },
  { label: "Free", keys: ["free"] },
  { label: "Museums", keys: ["museum"] },
  { label: "Beaches", keys: ["beach"] },
  { label: "Views", keys: ["views"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...ATTRACTIONS.map((a) => ({
        "@type": "TouristAttraction",
        name: a.name,
        description: a.description,
        address: { "@type": "PostalAddress", addressLocality: "Mykonos", addressCountry: "GR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: a.rating, reviewCount: a.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(a.price ?? ""),
      })),
    ],
  };
}

export default function MykonosAttractions() {
  return (
    <CityGuideShell
      citySlug="mykonos"
      cityName="Mykonos"
      categories={CATEGORIES}
      active="attractions"
      crumb="Attractions"
      h1="Best Things to Do in Mykonos"
      heroImage="/images/mykonos/attractions/vindkvarnarna-kato-mili.webp"
      intro="Mykonos is the most iconic island in the Cyclades — whitewashed cubic houses tumbling around Chora, five 16th-century windmills crowning the hill above Little Venice, and a coastline of the Mediterranean's most famous beach clubs. But there is real depth beyond the glamour: the sculptural Paraportiani church, small museums full of finds from ancient Delos, the calm of Ano Mera, and a short boat ride to Delos itself, Apollo's mythical birthplace and a UNESCO World Heritage Site. Here are the 16 attractions worth building your trip around, with prices, opening hours and insider tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={ATTRACTIONS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Mykonos attractions in detail" items={ATTRACTIONS} />
    </CityGuideShell>
  );
}
