import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { HOTELS, CATEGORIES } from "@/app/data/phuket-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Hotels in Phuket 2026 — Where to Stay Guide | Flyamba",
  description:
    "The best hotels in Phuket for every budget — iconic luxury villa resorts like Amanpuri and Trisara, stylish design hotels, family beach resorts and…",
  alternates: { canonical: `${SITE}/phuket/hotels` },
  openGraph: { title: "Best Hotels in Phuket | Flyamba", description: "Where to stay in Phuket, from luxury villas to budget Old Town stays, with areas and prices.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Beachfront", keys: ["beachfront"] },
  { label: "Villas", keys: ["villas"] },
  { label: "Boutique", keys: ["boutique"] },
  { label: "Family", keys: ["family"] },
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
        address: { "@type": "PostalAddress", addressLocality: "Phuket", addressCountry: "TH" },
        priceRange: h.price,
        aggregateRating: { "@type": "AggregateRating", ratingValue: h.rating, reviewCount: h.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function PhuketHotels() {
  return (
    <CityGuideShell
      citySlug="phuket"
      cityName="Phuket"
      categories={CATEGORIES}
      active="hotels"
      crumb="Hotels"
      h1="Where to Stay in Phuket"
      heroImage="/images/phuket/strander/surin-beach.webp"
      intro="Where you stay shapes your whole Phuket trip. Lively Patong puts nightlife and convenience on your doorstep; Kata, Karon and Kamala offer family-friendly beaches with amenities; the upscale northwest around Surin and Bang Tao is home to the island's chicest resorts and beach clubs; the tranquil south around Nai Harn is beautiful and refined; and the quiet north near the airport suits a relaxed or short stay. From world-famous luxury villa resorts to characterful budget stays in the Old Town, these are the best places to stay for every budget, with areas, prices and what makes each special."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={HOTELS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Phuket hotels in detail" items={HOTELS} />
    </CityGuideShell>
  );
}
