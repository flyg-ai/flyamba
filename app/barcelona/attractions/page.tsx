import type { Metadata } from "next";
import { GuideShell } from "@/app/components/GuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { ATTRACTIONS } from "@/app/data/barcelona-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Top Attractions in Barcelona 2026 — Visitor Guide | Flyamba",
  description:
    "The 20 best things to do in Barcelona — Sagrada Família, Park Güell, the Gothic Quarter, beaches and more, with prices, opening hours and insider tips.",
  alternates: { canonical: `${SITE}/barcelona/attractions` },
  openGraph: { title: "Best Things to Do in Barcelona | Flyamba", description: "20 top Barcelona attractions with prices, hours and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Free", keys: ["free"] },
  { label: "Must-see", keys: ["must-see"] },
  { label: "Art", keys: ["art"] },
  { label: "Architecture", keys: ["architecture"] },
  { label: "Nature", keys: ["nature"] },
  { label: "Parks", keys: ["parks"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Barcelona", item: `${SITE}/barcelona` },
          { "@type": "ListItem", position: 3, name: "Attractions", item: `${SITE}/barcelona/attractions` },
        ],
      },
      ...ATTRACTIONS.map((a) => ({
        "@type": "TouristAttraction",
        name: a.name,
        description: a.description,
        address: { "@type": "PostalAddress", addressLocality: "Barcelona", addressCountry: "ES" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: a.rating, reviewCount: a.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(a.price ?? ""),
      })),
    ],
  };
}

export default function BarcelonaAttractions() {
  return (
    <GuideShell
      active="attractions"
      crumb="Attractions"
      h1="Best Things to Do in Barcelona"
      heroImage="/images/content/sagrada-familia.avif"
      intro="Barcelona packs more must-see sights into a walkable city than almost anywhere in Europe — from Gaudí's fantastical architecture and world-class museums to Mediterranean beaches and buzzing food markets. Here are the 20 attractions worth building your trip around, with prices, opening hours and tips to skip the queues."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={ATTRACTIONS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Barcelona attractions in detail" items={ATTRACTIONS} />
    </GuideShell>
  );
}
