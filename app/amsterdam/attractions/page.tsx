import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { ATTRACTIONS, CATEGORIES } from "@/app/data/amsterdam-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Top Attractions in Amsterdam 2026 — Visitor Guide | Flyamba",
  description:
    "The 18 best things to do in Amsterdam — the Rijksmuseum, Van Gogh Museum, Anne Frank House, a canal cruise, Vondelpark and more, with prices, opening hours and insider tips.",
  alternates: { canonical: `${SITE}/amsterdam/attractions` },
  openGraph: { title: "Best Things to Do in Amsterdam | Flyamba", description: "18 top Amsterdam attractions with prices, hours and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Must-see", keys: ["must-see"] },
  { label: "Free", keys: ["free"] },
  { label: "Art", keys: ["art"] },
  { label: "History", keys: ["history"] },
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
          { "@type": "ListItem", position: 2, name: "Amsterdam", item: `${SITE}/amsterdam` },
          { "@type": "ListItem", position: 3, name: "Attractions", item: `${SITE}/amsterdam/attractions` },
        ],
      },
      ...ATTRACTIONS.map((a) => ({
        "@type": "TouristAttraction",
        name: a.name,
        description: a.description,
        address: { "@type": "PostalAddress", addressLocality: "Amsterdam", addressCountry: "NL" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: a.rating, reviewCount: a.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(a.price ?? ""),
      })),
    ],
  };
}

export default function AmsterdamAttractions() {
  return (
    <CityGuideShell
      citySlug="amsterdam"
      cityName="Amsterdam"
      categories={CATEGORIES}
      active="attractions"
      crumb="Attractions"
      h1="Best Things to Do in Amsterdam"
      heroImage="/images/amsterdam/sevardheter/rijksmuseum.webp"
      intro="Few cities pack as much into such a walkable, canal-laced centre as Amsterdam. World-beating museums, the UNESCO-listed Canal Ring, the moving Anne Frank House, leafy Vondelpark and the buzzing markets of De Pijp are all within easy reach on foot, bike or tram. Here are the 18 attractions worth building your trip around, with prices, opening hours and tips to skip the queues."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={ATTRACTIONS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Amsterdam attractions in detail" items={ATTRACTIONS} />
    </CityGuideShell>
  );
}
