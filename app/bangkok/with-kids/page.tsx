import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WITH_KIDS } from "@/app/data/bangkok-places";
import { BANGKOK_CATEGORIES } from "@/app/lib/bangkok";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Bangkok with Kids 2026 — Family Things to Do | Flyamba",
  description:
    "The best family activities in Bangkok — Safari World, SEA LIFE Ocean World, KidZania, Dream World and more, with ages, prices and transport tips for a smooth trip.",
  alternates: { canonical: `${SITE}/bangkok/with-kids` },
  openGraph: { title: "Bangkok with Kids | Flyamba", description: "Family-friendly attractions, parks and practical tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Animals", keys: ["animals"] },
  { label: "Theme parks", keys: ["theme-parks"] },
  { label: "Indoor", keys: ["indoor"] },
  { label: "Museums", keys: ["museums"] },
  { label: "Free", keys: ["free"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Bangkok", item: `${SITE}/bangkok` },
      { "@type": "ListItem", position: 3, name: "With kids", item: `${SITE}/bangkok/with-kids` },
    ],
  };
}

export default function BangkokWithKids() {
  return (
    <CityGuideShell
      citySlug="bangkok"
      cityName="Bangkok"
      categories={BANGKOK_CATEGORIES}
      active="with-kids"
      crumb="With kids"
      h1="Bangkok with Kids"
      heroImage="/images/bangkok/med-barn/safari-world.webp"
      intro="Bangkok is a genuinely fun city for families, with plenty to keep children happy between the temples — and, crucially, lots of it air-conditioned for when the heat or a downpour hits. Meet free-roaming animals at Safari World, walk the shark tunnel at SEA LIFE, let kids try grown-up jobs at KidZania, or ride coasters and play in real snow at Dream World. These 8 attractions, from theme parks to a free butterfly garden, come with recommended ages, prices and travel tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={WITH_KIDS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Bangkok with kids in detail" items={WITH_KIDS} />
    </CityGuideShell>
  );
}
