import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { BEACHES, CATEGORIES } from "@/app/data/marrakech-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Beaches near Marrakech 2026 — Atlantic Coast Guide | Flyamba",
  description:
    "Marrakech is inland, but the Atlantic coast is a day trip away — Essaouira, Taghazout, Agadir, Oualidia, Sidi Kaouki and more, with how to get there…",
  alternates: { canonical: `${SITE}/marrakech/beaches` },
  openGraph: { title: "Beaches near Marrakech | Flyamba", description: "The best Atlantic-coast beaches within reach of Marrakech, and how to reach them.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Family & swimming", keys: ["family"] },
  { label: "Surfing", keys: ["surf"] },
  { label: "Watersports", keys: ["watersports"] },
  { label: "Coastal towns", keys: ["town"] },
  { label: "Villages", keys: ["village"] },
  { label: "Nature", keys: ["nature"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...BEACHES.map((b) => ({
        "@type": "Beach",
        name: b.name,
        description: b.description,
        aggregateRating: { "@type": "AggregateRating", ratingValue: b.rating, reviewCount: b.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function MarrakechBeaches() {
  return (
    <CityGuideShell
      citySlug="marrakech"
      cityName="Marrakech"
      categories={CATEGORIES}
      active="beaches"
      crumb="Beaches"
      h1="Beaches near Marrakech & the Atlantic Coast"
      heroImage="/images/marrakech/beaches/barceloneta-marrakech.webp"
      intro="Marrakech itself sits well inland, on a plain between the desert and the mountains, so it has no beach of its own — but Morocco's wild Atlantic coast is close enough for a day trip or an easy overnight. Head west for the breezy, walled port of Essaouira; south for the surf villages of Taghazout and Sidi Kaouki and the family resort of Agadir; or to the calm lagoons of Oualidia and the historic sands of El Jadida. This guide covers the best coastal escapes within reach of the Red City, with driving times, how to get there and what each shore is really like."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={BEACHES} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Beaches near Marrakech in detail" items={BEACHES} />
    </CityGuideShell>
  );
}
