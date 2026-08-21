import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { BEACHES, CATEGORIES } from "@/app/data/new-york-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Beaches Near New York 2026 — Complete Guide | Flyamba",
  description:
    "The best beaches near New York — Coney Island, Rockaway surf, Jones Beach, Long Beach, car-free Fire Island and the Hamptons — with how to get there by…",
  alternates: { canonical: `${SITE}/new-york/beaches` },
  openGraph: { title: "Best Beaches Near New York | Flyamba", description: "City beaches, Long Island sands and the Hamptons — where to swim near New York.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Near NYC", keys: ["near-nyc"] },
  { label: "Long Island", keys: ["long-island"] },
  { label: "Weekend", keys: ["weekend"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...BEACHES.map((b) => ({
        "@type": "Beach",
        name: b.name,
        description: b.description,
        address: { "@type": "PostalAddress", addressRegion: "NY", addressCountry: "US" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: b.rating, reviewCount: b.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function NewYorkBeaches() {
  return (
    <CityGuideShell
      citySlug="new-york"
      cityName="New York"
      categories={CATEGORIES}
      active="beaches"
      crumb="Beaches"
      h1="Best Beaches Near New York"
      heroImage="/images/new-york/beaches/barceloneta-new-york.webp"
      intro="New York has more beach than you might expect. City beaches like Coney Island, Brighton Beach and the surf sands of Rockaway are reachable by subway or ferry in under 90 minutes, while Long Island opens up wider, cleaner stretches — Jones Beach, Long Beach, car-free Fire Island and the glamorous Hamptons. The Atlantic warms to a swimmable 18–22°C from June to September. Here are the best beaches near the city, with how to reach each by subway, train, ferry or car, and tips on which are worth a day trip and which reward an overnight."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={BEACHES} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="New York beaches in detail" items={BEACHES} />
    </CityGuideShell>
  );
}
