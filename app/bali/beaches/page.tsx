import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { BEACHES, CATEGORIES } from "@/app/data/bali-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Beaches in Bali 2026 — Beach Guide | Flyamba",
  description:
    "The best beaches in Bali — calm, family-friendly Nusa Dua, Seminyak's sunset beach clubs, the seafood sands of Jimbaran Bay, hidden Bias Tugel and the…",
  alternates: { canonical: `${SITE}/bali/beaches` },
  openGraph: { title: "Best Beaches in Bali | Flyamba", description: "Bali's best beaches, from calm family sands to surf and sunset clubs.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Family", keys: ["family"] },
  { label: "Calm", keys: ["calm"] },
  { label: "Lively", keys: ["lively"] },
  { label: "Facilities", keys: ["facilities"] },
  { label: "Day trip", keys: ["day-trip"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...BEACHES.map((b) => ({
        "@type": "TouristAttraction",
        name: b.name,
        description: b.description,
        address: { "@type": "PostalAddress", addressLocality: "Bali", addressCountry: "ID" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: b.rating, reviewCount: b.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(b.price ?? ""),
      })),
    ],
  };
}

export default function BaliBeaches() {
  return (
    <CityGuideShell
      citySlug="bali"
      cityName="Bali"
      categories={CATEGORIES}
      active="beaches"
      crumb="Beaches"
      h1="Best Beaches in Bali"
      heroImage="/images/bali/beaches/barceloneta-bali.webp"
      intro="Bali's coastline runs the full spectrum, from calm, family-safe resort sands to powerful surf breaks and hidden coves reached on foot. Swim in the sheltered water of Nusa Dua, chase the sunset from a Seminyak beach club, dine barefoot on grilled seafood at Jimbaran Bay, learn to surf at Kuta, or make the trek to the T-Rex cliff of Kelingking. Here are the beaches worth planning your days around, with facilities, safety notes and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={BEACHES} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Bali beaches in detail" items={BEACHES} />
    </CityGuideShell>
  );
}
