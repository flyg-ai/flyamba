import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { HOTELS } from "@/app/data/bangkok-places";
import { BANGKOK_CATEGORIES } from "@/app/lib/bangkok";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Where to Stay in Bangkok 2026 — Best Hotels & Areas | Flyamba",
  description:
    "The best hotels in Bangkok by area and budget — riverside legends like the Mandarin Oriental and Peninsula, design boutiques, central Sukhumvit bases and top hostels.",
  alternates: { canonical: `${SITE}/bangkok/hotels` },
  openGraph: { title: "Best Hotels in Bangkok | Flyamba", description: "Where to stay in Bangkok by neighborhood and budget.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Riverside", keys: ["riverside"] },
  { label: "Boutique", keys: ["boutique"] },
  { label: "Central", keys: ["central"] },
  { label: "Budget", keys: ["budget"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Bangkok", item: `${SITE}/bangkok` },
      { "@type": "ListItem", position: 3, name: "Hotels", item: `${SITE}/bangkok/hotels` },
    ],
  };
}

export default function BangkokHotels() {
  return (
    <CityGuideShell
      citySlug="bangkok"
      cityName="Bangkok"
      categories={BANGKOK_CATEGORIES}
      active="hotels"
      crumb="Hotels"
      h1="Where to Stay in Bangkok"
      heroImage="/images/bangkok/hotell/mandarin-oriental-bangkok.webp"
      intro="Bangkok's hotels are among the best-value in the world, and where you stay shapes your whole trip. Base yourself on the Chao Phraya for river views and legendary service, in Sukhumvit for shopping, dining and nightlife on the Skytrain, or in Silom and Sathorn for a central, business-district feel. These 8 stays span riverside grandes dames, design boutiques and sociable hostels, with the areas, prices and transport links to help you choose."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={HOTELS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Bangkok hotels in detail" items={HOTELS} />
    </CityGuideShell>
  );
}
