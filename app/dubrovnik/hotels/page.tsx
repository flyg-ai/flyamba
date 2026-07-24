import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { HOTELS, CATEGORIES } from "@/app/data/dubrovnik-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Hotels in Dubrovnik 2026 — Where to Stay | Flyamba",
  description:
    "Where to stay in Dubrovnik — from cliffside five-stars like Villa Dubrovnik and the Excelsior with their iconic wall views to a Baroque palace boutique inside the walls, plus mid-range and budget options, with areas, prices and tips.",
  alternates: { canonical: `${SITE}/dubrovnik/hotels` },
  openGraph: { title: "Best Hotels in Dubrovnik | Flyamba", description: "Where to stay in Dubrovnik: luxury cliff hotels, Old Town boutiques and budget beds, with prices and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Boutique", keys: ["boutique"] },
  { label: "Central (Old Town)", keys: ["central"] },
  { label: "Family", keys: ["family"] },
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
          { "@type": "ListItem", position: 2, name: "Dubrovnik", item: `${SITE}/dubrovnik` },
          { "@type": "ListItem", position: 3, name: "Hotels", item: `${SITE}/dubrovnik/hotels` },
        ],
      },
      ...HOTELS.map((h) => ({
        "@type": "Hotel",
        name: h.name,
        description: h.description,
        priceRange: h.price,
        address: { "@type": "PostalAddress", addressLocality: "Dubrovnik", addressCountry: "HR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: h.rating, reviewCount: h.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function DubrovnikHotels() {
  return (
    <CityGuideShell
      citySlug="dubrovnik"
      cityName="Dubrovnik"
      categories={CATEGORIES}
      active="hotels"
      crumb="Hotels"
      h1="Where to Stay in Dubrovnik"
      heroImage="/images/dubrovnik/hotels/villa-dubrovnik.webp"
      intro="Choosing where to stay in Dubrovnik is really a choice between three worlds: the glamorous cliff hotels of Ploče, whose pools and terraces gaze back at the floodlit walls; the atmospheric boutiques and apartments inside the car-free Old Town itself; and the better-value, beach-friendly stays out in leafy Lapad and Gruž. This guide covers the best options across every budget, from a €500-a-night cliff villa to a €30 dorm bed within the walls, with areas, prices and honest trade-offs."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={HOTELS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Dubrovnik hotels in detail" items={HOTELS} />
    </CityGuideShell>
  );
}
