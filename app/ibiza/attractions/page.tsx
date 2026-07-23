import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { ATTRACTIONS, IBIZA_CATEGORIES } from "@/app/data/ibiza-places";
import { SITE } from "@/app/lib/destination-helpers";

const HERO = "/images/destinations/flights-ibiza.avif";

export const metadata: Metadata = {
  title: "Attractions in Ibiza 2026 — Guide | Flyamba",
  description:
    "The best things to do in Ibiza — UNESCO Dalt Vila, the rock of Es Vedrà, hippy markets, the Ses Salines salt flats and more, with prices, hours and insider tips.",
  alternates: { canonical: `${SITE}/ibiza/attractions` },
  openGraph: { title: "Best Things to Do in Ibiza | Flyamba", description: "Top Ibiza attractions with prices, hours and tips.", type: "article", images: [HERO] },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Must-see", keys: ["must-see"] },
  { label: "Free", keys: ["free"] },
  { label: "Nature", keys: ["nature"] },
  { label: "History", keys: ["history"] },
  { label: "Views", keys: ["views"] },
  { label: "Villages", keys: ["villages"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Ibiza", item: `${SITE}/ibiza` },
          { "@type": "ListItem", position: 3, name: "Attractions", item: `${SITE}/ibiza/attractions` },
        ],
      },
      ...ATTRACTIONS.map((a) => ({
        "@type": "TouristAttraction",
        name: a.name,
        description: a.description,
        address: { "@type": "PostalAddress", addressLocality: "Ibiza", addressCountry: "ES" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: a.rating, reviewCount: a.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(a.price ?? ""),
      })),
    ],
  };
}

export default function IbizaAttractions() {
  return (
    <CityGuideShell
      citySlug="ibiza"
      cityName="Ibiza"
      categories={IBIZA_CATEGORIES}
      active="attractions"
      crumb="Attractions"
      h1="Best Things to Do in Ibiza"
      heroImage={HERO}
      intro="Ibiza is far more than superclubs and beaches. Its walled old town, Dalt Vila, is a UNESCO World Heritage Site; the mythic rock of Es Vedrà rises from the sea off a wild southwest coast; and between the salt flats, hippy markets, caves and sleepy northern villages there is a whole other island to discover by day. Here are the attractions worth building your trip around, with prices, opening hours and insider tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={ATTRACTIONS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Ibiza attractions in detail" items={ATTRACTIONS} />
    </CityGuideShell>
  );
}
