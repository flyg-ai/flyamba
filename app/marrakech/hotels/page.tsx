import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { HOTELS, CATEGORIES } from "@/app/data/marrakech-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Hotels & Riads in Marrakech 2026 — Guide | Flyamba",
  description:
    "Where to stay in Marrakech — from legendary palace hotels like La Mamounia and the Royal Mansour to boutique medina riads and budget guesthouses, with prices, areas and tips.",
  alternates: { canonical: `${SITE}/marrakech/hotels` },
  openGraph: { title: "Best Hotels & Riads in Marrakech | Flyamba", description: "Marrakech's top riads and hotels for every budget, with prices and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Riads", keys: ["riad"] },
  { label: "Boutique", keys: ["boutique"] },
  { label: "Resorts", keys: ["resort"] },
  { label: "Mid-range", keys: ["mid-range"] },
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
          { "@type": "ListItem", position: 2, name: "Marrakech", item: `${SITE}/marrakech` },
          { "@type": "ListItem", position: 3, name: "Hotels", item: `${SITE}/marrakech/hotels` },
        ],
      },
      ...HOTELS.map((h) => ({
        "@type": "Hotel",
        name: h.name,
        description: h.description,
        address: { "@type": "PostalAddress", addressLocality: "Marrakech", addressCountry: "MA" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: h.rating, reviewCount: h.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function MarrakechHotels() {
  return (
    <CityGuideShell
      citySlug="marrakech"
      cityName="Marrakech"
      categories={CATEGORIES}
      active="hotels"
      crumb="Hotels"
      h1="Where to Stay in Marrakech"
      heroImage="/images/marrakech/hotell/la-mamounia.webp"
      intro="Choosing where to stay is half the magic of Marrakech. The classic choice is a riad — a traditional house built around a hidden courtyard, opening from a plain medina lane into a tiled oasis of calm — but the city also has legendary grand palace hotels, sleek garden resorts on the outskirts and cheap, characterful guesthouses. This guide runs from the ultra-luxury of La Mamounia and the Royal Mansour to intimate boutique riads and backpacker beds, with nightly prices, the pros and cons of each area, and tips on getting to your door through the car-free lanes."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={HOTELS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Marrakech hotels & riads in detail" items={HOTELS} />
    </CityGuideShell>
  );
}
