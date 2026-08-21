import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { HOTELS, CATEGORIES } from "@/app/data/vienna-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Hotels in Vienna 2026 — Guide | Flyamba",
  description:
    "The best hotels in Vienna for every budget — grand palace five-stars like the Sacher and Imperial, design boutiques, the Park Hyatt in the old town and…",
  alternates: { canonical: `${SITE}/vienna/hotels` },
  openGraph: { title: "Best Hotels in Vienna | Flyamba", description: "Where to stay in Vienna, from palace luxury to budget, with prices and neighbourhood tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Boutique", keys: ["boutique"] },
  { label: "Central", keys: ["central"] },
  { label: "Budget", keys: ["budget"] },
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
        address: { "@type": "PostalAddress", addressLocality: "Vienna", addressCountry: "AT" },
        priceRange: h.price,
        aggregateRating: { "@type": "AggregateRating", ratingValue: h.rating, reviewCount: h.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function ViennaHotels() {
  return (
    <CityGuideShell
      citySlug="vienna"
      cityName="Vienna"
      categories={CATEGORIES}
      active="hotels"
      crumb="Hotels"
      h1="Where to Stay in Vienna"
      heroImage="/images/vienna/hotell/hotel-sacher-wien.webp"
      intro="Vienna rewards staying central — the Innere Stadt (1st district) and the streets around the Opera, the Ring and Stephansdom put the great sights, cafés and shops on your doorstep, while artsy Neubau and Spittelberg offer character and value. From landmark palace hotels and a spa-in-a-bank-vault five-star to individual design boutiques and excellent budget guesthouses, these are the best places to stay for every budget, with neighbourhoods, prices and what makes each special."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={HOTELS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Vienna hotels in detail" items={HOTELS} />
    </CityGuideShell>
  );
}
