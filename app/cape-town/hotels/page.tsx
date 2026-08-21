import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { HOTELS, CATEGORIES } from "@/app/data/cape-town-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Where to Stay in Cape Town 2026 — Best Hotels Guide",
  description:
    "The best hotels in Cape Town — from the iconic Silo and One&Only at the V&A Waterfront to clifftop Ellerman House and charming City Bowl boutiques, with…",
  alternates: { canonical: `${SITE}/cape-town/hotels` },
  openGraph: { title: "Best Hotels in Cape Town | Flyamba", description: "From world-famous luxury to characterful boutiques — where to stay in Cape Town.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Boutique", keys: ["boutique"] },
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
        address: { "@type": "PostalAddress", addressLocality: "Cape Town", addressCountry: "ZA" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: h.rating, reviewCount: h.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function CapeTownHotels() {
  return (
    <CityGuideShell
      citySlug="cape-town"
      cityName="Cape Town"
      categories={CATEGORIES}
      active="hotels"
      crumb="Hotels"
      h1="Where to Stay in Cape Town"
      heroImage="/images/cape-town/hotels/hotel-cape-town.avif"
      intro="Cape Town offers some of the best-value luxury on earth, from world-ranked five-stars for a fraction of European prices to charming boutiques and clifftop villas over the Atlantic. This guide covers the standout places to stay — glamorous V&A Waterfront resorts, design-led landmarks, characterful City Bowl heritage hotels and Atlantic Seaboard hideaways — with neighbourhoods, price guides and booking tips to help you choose your base."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={HOTELS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Cape Town hotels in detail" items={HOTELS} />
    </CityGuideShell>
  );
}
