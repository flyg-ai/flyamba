import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { HOTELS, CATEGORIES } from "@/app/data/bali-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Where to Stay in Bali 2026 — Best Hotels & Areas | Flyamba",
  description:
    "The best places to stay in Bali — jungle luxury at Four Seasons Sayan and Amandari, wellness at COMO Shambhala, beachfront Legian, clifftop Alila Uluwatu…",
  alternates: { canonical: `${SITE}/bali/hotels` },
  openGraph: { title: "Best Hotels in Bali | Flyamba", description: "Where to stay in Bali — luxury resorts, boutiques and budget stays by area.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Budget", keys: ["budget"] },
  { label: "Boutique", keys: ["boutique"] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Family", keys: ["family"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...HOTELS.map((h) => ({
        "@type": "Hotel",
        name: h.name,
        description: h.description,
        address: { "@type": "PostalAddress", addressLocality: "Bali", addressCountry: "ID" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: h.rating, reviewCount: h.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function BaliHotels() {
  return (
    <CityGuideShell
      citySlug="bali"
      cityName="Bali"
      categories={CATEGORIES}
      active="hotels"
      crumb="Hotels"
      h1="Where to Stay in Bali"
      heroImage="/images/bali/hotels/hotel-bali.avif"
      intro="Choosing where to stay in Bali is as much about the area as the hotel: jungle-clad Ubud for temples, rice fields and wellness; Seminyak and Canggu for beaches and nightlife; Uluwatu for clifftop drama and surf; and Nusa Dua for calm, family-friendly resort sands. From bucket-list Aman and Four Seasons villas to cool Canggu hostels, here are the best places to stay, with areas, prices and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={HOTELS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Bali hotels in detail" items={HOTELS} />
    </CityGuideShell>
  );
}
