import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { BEACHES, CATEGORIES } from "@/app/data/reykjavik-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Reykjavik Beaches & Geothermal Pools 2026 — Guide | Flyamba",
  description:
    "Beaches and geothermal pools near Reykjavik — the warm Nauthólsvík geothermal beach, Sky Lagoon, the Secret Lagoon, the black sands of Reynisfjara and…",
  alternates: { canonical: `${SITE}/reykjavik/beaches` },
  openGraph: { title: "Reykjavik Beaches & Geothermal Pools | Flyamba", description: "Geothermal lagoons, warm beaches and dramatic black sands near Reykjavik.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Near Reykjavik", keys: ["nearby"] },
  { label: "Nature", keys: ["nature"] },
  { label: "Day trip", keys: ["day-trip"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Reykjavik", item: `${SITE}/reykjavik` },
          { "@type": "ListItem", position: 3, name: "Beaches & Pools", item: `${SITE}/reykjavik/beaches` },
        ],
      },
      ...BEACHES.map((b) => ({
        "@type": "TouristAttraction",
        name: b.name,
        description: b.description,
        address: { "@type": "PostalAddress", addressLocality: "Reykjavik", addressCountry: "IS" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: b.rating, reviewCount: b.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(b.price ?? ""),
      })),
    ],
  };
}

export default function ReykjavikBeaches() {
  return (
    <CityGuideShell
      citySlug="reykjavik"
      cityName="Reykjavik"
      categories={CATEGORIES}
      active="beaches"
      crumb="Beaches & Pools"
      h1="Reykjavik Beaches & Geothermal Pools"
      heroImage="/images/reykjavik/attractions/nautholsvik.webp"
      intro="Iceland isn't a classic beach destination — the sea hovers around 6–11°C year-round — so the real 'bathing' here is geothermal. Warm volcanic springs and communal pools are woven into everyday life, from Reykjavik's own heated Nauthólsvík beach and the oceanfront Sky Lagoon to authentic hot springs like the Secret Lagoon out on the Golden Circle. The country's famous black-sand beaches, meanwhile, are for awe and photography, not swimming. This guide covers the best beaches and geothermal pools near Reykjavik, with prices, transport and safety tips — including the strict local shower etiquette and the deadly 'sneaker waves' on the black beaches."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={BEACHES} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Reykjavik beaches & geothermal pools in detail" items={BEACHES} />
    </CityGuideShell>
  );
}
