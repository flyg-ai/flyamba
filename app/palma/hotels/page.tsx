import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { HOTELS, PALMA_CATEGORIES } from "@/app/data/palma-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Hotels in Palma 2026 — Where to Stay Guide | Flyamba",
  description:
    "Where to stay in Palma de Mallorca — from a fortress luxury retreat and castle golf resort to boutique old-town mansions and well-priced rooftop-pool hotels, by neighborhood and budget.",
  alternates: { canonical: `${SITE}/palma/hotels` },
  openGraph: { title: "Where to Stay in Palma | Flyamba", description: "The best Palma hotels by area and budget, with prices and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Boutique", keys: ["boutique"] },
  { label: "Mid-range", keys: ["mid-range"] },
  { label: "Old Town", keys: ["old-town"] },
  { label: "Sea view", keys: ["sea-view"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Palma", item: `${SITE}/palma` },
          { "@type": "ListItem", position: 3, name: "Hotels", item: `${SITE}/palma/hotels` },
        ],
      },
      ...HOTELS.map((h) => ({
        "@type": "Hotel",
        name: h.name,
        description: h.description,
        address: { "@type": "PostalAddress", addressLocality: "Palma", addressRegion: "Mallorca", addressCountry: "ES" },
        priceRange: h.price,
        aggregateRating: { "@type": "AggregateRating", ratingValue: h.rating, reviewCount: h.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function PalmaHotels() {
  return (
    <CityGuideShell
      citySlug="palma"
      cityName="Palma"
      categories={PALMA_CATEGORIES}
      active="hotels"
      crumb="Hotels"
      h1="Where to Stay in Palma"
      heroImage="/images/content/photo-1566073771259-6a8506099945.avif"
      intro="Palma offers some of the most characterful places to stay in the Mediterranean, from a fortress turned clifftop hideaway and a castle golf resort in the hills to intimate boutique hotels carved from centuries-old old-town mansions and well-priced four-stars with rooftop pools. Base yourself in the old town for walkable sightseeing, on the Paseo Marítimo for the seafront and nightlife, or in leafy Son Vida for calm and views. Here's where to stay, by area and budget."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={HOTELS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Palma hotels in detail" items={HOTELS} />
    </CityGuideShell>
  );
}
