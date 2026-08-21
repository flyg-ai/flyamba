import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { BEACHES, CATEGORIES } from "@/app/data/tenerife-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Beaches in Tenerife 2026 — Golden & Black Sand Guide",
  description:
    "The best beaches in Tenerife: golden El Duque and Las Teresitas, family-friendly Los Cristianos, windsurf-famous El Médano and wild black-sand Benijo…",
  alternates: { canonical: `${SITE}/tenerife/beaches` },
  openGraph: { title: "Best Beaches in Tenerife | Flyamba", description: "8 beaches from golden sand to wild volcanic coves.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Golden sand", keys: ["golden-sand"] },
  { label: "Black sand", keys: ["black-sand"] },
  { label: "Family", keys: ["family"] },
  { label: "Surf", keys: ["surf"] },
  { label: "Snorkel", keys: ["snorkel"] },
];


export default function TenerifeBeaches() {
  return (
    <CityGuideShell
      citySlug="tenerife"
      cityName="Tenerife"
      categories={CATEGORIES}
      active="beaches"
      crumb="Beaches"
      h1="Best Beaches in Tenerife"
      heroImage="/images/tenerife/strander/playa-de-las-teresitas.webp"
      intro="Tenerife's volcanic origins give it beaches unlike anywhere else — from imported golden sands at the smart southern resorts to dramatic jet-black volcanic coves in the wild north. Some are calm and family-perfect, others are for surfers and sunset photographers only. Here are the eight best beaches, with facilities, safety notes and how to reach each."
      wide
    >
      <div className="mt-8">
        <CategoryExplorer items={BEACHES} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Tenerife beaches in detail" items={BEACHES} />
    </CityGuideShell>
  );
}
