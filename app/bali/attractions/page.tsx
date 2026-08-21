import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { ATTRACTIONS, CATEGORIES } from "@/app/data/bali-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Top Attractions in Bali 2026 — Visitor Guide | Flyamba",
  description:
    "The 20 best things to do in Bali — Uluwatu and Tanah Lot temples, the Tegallalang and Jatiluwih rice terraces, the Ubud Monkey Forest, a Mount Batur…",
  alternates: { canonical: `${SITE}/bali/attractions` },
  openGraph: { title: "Best Things to Do in Bali | Flyamba", description: "20 top Bali attractions with prices, hours and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Must-see", keys: ["must-see"] },
  { label: "Temples", keys: ["temples"] },
  { label: "Nature", keys: ["nature"] },
  { label: "Beaches", keys: ["beaches"] },
  { label: "Free", keys: ["free"] },
  { label: "Family", keys: ["family"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...ATTRACTIONS.map((a) => ({
        "@type": "TouristAttraction",
        name: a.name,
        description: a.description,
        address: { "@type": "PostalAddress", addressLocality: "Bali", addressCountry: "ID" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: a.rating, reviewCount: a.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(a.price ?? ""),
      })),
    ],
  };
}

export default function BaliAttractions() {
  return (
    <CityGuideShell
      citySlug="bali"
      cityName="Bali"
      categories={CATEGORIES}
      active="attractions"
      crumb="Attractions"
      h1="Best Things to Do in Bali"
      heroImage="/images/bali/attractions/tanah-lot.webp"
      intro="Bali packs an entire cosmology into 5,780 square kilometres: sea temples that have ridden the waves since the 1500s, clifftop shrines where the sunset Kecak fire dance rages against the Indian Ocean, the UNESCO-listed rice terraces of Tegallalang and Jatiluwih still farmed by the thousand-year-old subak system, and an active volcano to climb before dawn. Here are the 20 attractions worth building your trip around, with prices, opening hours and insider tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={ATTRACTIONS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Bali attractions in detail" items={ATTRACTIONS} />
    </CityGuideShell>
  );
}
