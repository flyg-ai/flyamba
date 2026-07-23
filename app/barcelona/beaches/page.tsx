import type { Metadata } from "next";
import { GuideShell } from "@/app/components/GuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { BEACHES } from "@/app/data/barcelona-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Beaches in Barcelona 2026 — Complete Guide | Flyamba",
  description:
    "The 8 best beaches in Barcelona and nearby — from central Barceloneta to family-friendly sands, quiet local escapes and Sitges — with facilities and how to get there.",
  alternates: { canonical: `${SITE}/barcelona/beaches` },
  openGraph: { title: "Barcelona's Best Beaches | Flyamba", description: "8 beaches from Barceloneta to Sitges.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Family", keys: ["family"] },
  { label: "Sport", keys: ["sport"] },
  { label: "Nudist", keys: ["nudist"] },
  { label: "Quiet", keys: ["quiet"] },
];

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
    { "@type": "ListItem", position: 2, name: "Barcelona", item: `${SITE}/barcelona` },
    { "@type": "ListItem", position: 3, name: "Beaches", item: `${SITE}/barcelona/beaches` },
  ],
};

export default function BarcelonaBeaches() {
  return (
    <GuideShell
      active="beaches"
      crumb="Beaches"
      h1="Barcelona's Best Beaches"
      heroImage="/images/content/photo-1523531294919-4bcd7c65e216.avif"
      intro="Few big cities put a proper beach 20 minutes from the medieval old town. Barcelona has more than four kilometres of golden sand right in the city, plus quieter stretches and resort towns a short train ride away. Here are the eight best beaches — from the buzzing centre to family-friendly sands and the perfect day-trip escape — with facilities and how to reach each."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={BEACHES} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Barcelona beaches in detail" items={BEACHES} />
    </GuideShell>
  );
}
