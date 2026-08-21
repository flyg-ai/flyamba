import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { HOTELS, CATEGORIES } from "@/app/data/new-york-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Where to Stay in New York 2026 — Best Hotels Guide | Flyamba",
  description:
    "The best hotels in New York — from the iconic Plaza and ultra-luxe Aman to design boutiques and smart budget stays, with neighbourhoods, nightly prices…",
  alternates: { canonical: `${SITE}/new-york/hotels` },
  openGraph: { title: "Best Hotels in New York | Flyamba", description: "Iconic grand hotels, design boutiques and budget picks — where to stay in New York.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
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
        priceRange: h.price,
        address: { "@type": "PostalAddress", addressLocality: "New York", addressRegion: "NY", addressCountry: "US" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: h.rating, reviewCount: h.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function NewYorkHotels() {
  return (
    <CityGuideShell
      citySlug="new-york"
      cityName="New York"
      categories={CATEGORIES}
      active="hotels"
      crumb="Hotels"
      h1="Where to Stay in New York"
      heroImage="/images/new-york/hotels/hotel-new-york.avif"
      intro="New York's hotels run from iconic 1900s grande dames like The Plaza and The St. Regis to the most exclusive new address in the country, Aman New York, and on to hip boutiques and sharp budget stays. Where you sleep matters: Midtown for the classic first-timer experience, the Upper East Side for quiet elegance, SoHo and NoMad for boutique style, and the West Village or Lower East Side for downtown cool. This guide covers the best places to stay across every price band, with neighbourhoods, nightly rates in USD and tips on which area suits your trip — and remember city and hotel taxes add roughly 15% on top."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={HOTELS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="New York hotels in detail" items={HOTELS} />
    </CityGuideShell>
  );
}
