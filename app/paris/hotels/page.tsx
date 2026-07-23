import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { HOTELS, CATEGORIES } from "@/app/data/paris-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Hotels in Paris 2026 — Guide | Flyamba",
  description:
    "Where to stay in Paris — from legendary Palace hotels like the Ritz and Le Bristol to romantic Marais boutiques, design-led mid-range stays and stylish budget hostels. Areas, nightly rates, Métro links and booking tips.",
  alternates: { canonical: `${SITE}/paris/hotels` },
  openGraph: { title: "Best Hotels in Paris | Flyamba", description: "The best places to stay in Paris, from palaces to budget.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Palace", keys: ["palace"] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Boutique", keys: ["boutique"] },
  { label: "Budget", keys: ["budget"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Paris", item: `${SITE}/paris` },
          { "@type": "ListItem", position: 3, name: "Hotels", item: `${SITE}/paris/hotels` },
        ],
      },
      ...HOTELS.map((h) => ({
        "@type": "Hotel",
        name: h.name,
        description: h.description,
        priceRange: h.price,
        address: { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: h.rating, reviewCount: h.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function ParisHotels() {
  return (
    <CityGuideShell
      citySlug="paris"
      cityName="Paris"
      categories={CATEGORIES}
      active="hotels"
      crumb="Hotels"
      h1="Where to Stay in Paris"
      heroImage="/images/paris/hotell/le-bristol.webp"
      intro="Paris rewards a well-chosen base: stay central and you can walk to half the city's sights and reach the rest by Métro in minutes. This guide spans the full range, from the city's fabled 'Palace'-rated grande dames and a romantic five-star hidden on the Place des Vosges to design-led mid-range boutiques and a stylish hostel with a Sacré-Cœur view — with neighbourhoods, nightly rates, transport links and who each one suits."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={HOTELS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Paris hotels in detail" items={HOTELS} />
    </CityGuideShell>
  );
}
