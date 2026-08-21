import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { CATEGORIES, ATTRACTIONS } from "@/app/data/london-places";

const SITE = "https://flyamba.com";

export const metadata: Metadata = {
  title: "Attractions in London 2026 — Guide | Flyamba",
  description:
    "The 20 best things to do in London — the Tower of London, British Museum, Buckingham Palace, the London Eye and more, with prices, opening hours and…",
  alternates: { canonical: `${SITE}/london/attractions` },
  openGraph: { title: "Best Things to Do in London | Flyamba", description: "20 top London attractions with prices, hours and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Free", keys: ["free"] },
  { label: "Must-see", keys: ["must-see"] },
  { label: "Museums", keys: ["museums"] },
  { label: "Royal", keys: ["royal"] },
  { label: "Views", keys: ["views"] },
];


export default function LondonAttractions() {
  return (
    <CityGuideShell
      citySlug="london"
      cityName="London"
      categories={CATEGORIES}
      active="attractions"
      crumb="Attractions"
      h1="Best Things to Do in London"
      heroImage="/images/london/sevardheter/tower-of-london.webp"
      intro="London packs more world-class sights into a single city than almost anywhere on earth — from the Tower of London and Buckingham Palace to free national museums, Gothic abbeys and sweeping skyline viewpoints. Here are the 20 attractions worth building your trip around, with prices, opening hours and tips to skip the queues."
      wide
    >
      <div className="mt-8">
        <CategoryExplorer items={ATTRACTIONS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="London attractions in detail" items={ATTRACTIONS} />
    </CityGuideShell>
  );
}
