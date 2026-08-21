import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { HOTELS, CATEGORIES } from "@/app/data/cancun-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Hotels in Cancún 2026 — Guide | Flyamba",
  description:
    "Where to stay in Cancún — the finest all-inclusive resorts and adults-only luxury like Le Blanc and NIZUC, top family resorts, lively party hotels and…",
  alternates: { canonical: `${SITE}/cancun/hotels` },
  openGraph: { title: "Best Hotels in Cancún | Flyamba", description: "Cancún's best resorts and hotels, from luxury all-inclusives to budget boutiques, with prices and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "All-Inclusive", keys: ["all-inclusive"] },
  { label: "Adults-Only", keys: ["adults"] },
  { label: "Family", keys: ["family"] },
  { label: "Boutique", keys: ["boutique"] },
  { label: "Budget", keys: ["budget"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...HOTELS.map((h) => ({
        "@type": "Hotel",
        name: h.name,
        description: h.description,
        address: { "@type": "PostalAddress", addressLocality: "Cancún", addressCountry: "MX" },
        priceRange: h.price,
        aggregateRating: { "@type": "AggregateRating", ratingValue: h.rating, reviewCount: h.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function CancunHotels() {
  return (
    <CityGuideShell
      citySlug="cancun"
      cityName="Cancún"
      categories={CATEGORIES}
      active="hotels"
      crumb="Hotels"
      h1="Where to Stay in Cancún"
      heroImage="/images/placeholders/placeholder-hotels.webp"
      intro="Cancún is the home of the all-inclusive resort, and its glittering Hotel Zone packs some of the finest in the Caribbean — from adults-only luxury temples like Le Blanc and the design-led NIZUC to family favourites with water parks and kids' clubs, and lively, music-fuelled party resorts. Location matters: the calm, sheltered northern beaches suit families, the central strip puts you by the malls and nightlife, and the quiet southern tip near Punta Nizuc is serene. Budget travellers, meanwhile, can base themselves at a hip hostel-hotel downtown. Here's where to stay for every style and budget, with rough nightly prices and who each resort suits best."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={HOTELS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Cancún hotels in detail" items={HOTELS} />
    </CityGuideShell>
  );
}
