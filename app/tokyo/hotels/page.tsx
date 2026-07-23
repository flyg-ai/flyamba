import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { HOTELS, CATEGORIES } from "@/app/data/tokyo-places";

const SITE = "https://flyamba.com";

export const metadata: Metadata = {
  title: "Where to Stay in Tokyo 2026 — Best Hotels & Areas | Flyamba",
  description:
    "The best hotels in Tokyo for every budget — from sky-high luxury like the Aman and Park Hyatt to a traditional ryokan, capsule pods and a book-lover's hostel.",
  alternates: { canonical: `${SITE}/tokyo/hotels` },
  openGraph: { title: "Best Hotels in Tokyo | Flyamba", description: "Luxury towers, ryokan, boutique stays and budget capsules in Tokyo.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Boutique", keys: ["boutique"] },
  { label: "Budget", keys: ["budget"] },
  { label: "Capsule", keys: ["capsule"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Tokyo", item: `${SITE}/tokyo` },
          { "@type": "ListItem", position: 3, name: "Hotels", item: `${SITE}/tokyo/hotels` },
        ],
      },
      ...HOTELS.map((h) => ({
        "@type": "Hotel",
        name: h.name,
        description: h.description,
        priceRange: h.price,
        address: { "@type": "PostalAddress", addressLocality: "Tokyo", addressCountry: "JP" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: h.rating, reviewCount: h.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function TokyoHotels() {
  return (
    <CityGuideShell
      citySlug="tokyo"
      cityName="Tokyo"
      categories={CATEGORIES}
      active="hotels"
      crumb="Hotels"
      h1="Where to Stay in Tokyo"
      heroImage="/images/tokyo/hotell/park-hyatt-tokyo.webp"
      intro="Tokyo's accommodation is as varied as the city itself, from serene sky-high luxury and authentic ryokan hot-spring rituals to futuristic capsule pods and a hostel you sleep inside a library. Base yourself in Shinjuku or Shibuya for nightlife and transport, Ginza or Marunouchi for elegance and central sightseeing, or Asakusa for old-town charm on a budget. Here are the best hotels across every price bracket, with room rates, areas and booking tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={HOTELS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Tokyo hotels in detail" items={HOTELS} />
    </CityGuideShell>
  );
}
