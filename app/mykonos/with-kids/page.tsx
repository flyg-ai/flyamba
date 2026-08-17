import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WITH_KIDS, CATEGORIES } from "@/app/data/mykonos-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Mykonos with Kids 2026 — Family Things to Do | Flyamba",
  description:
    "The best family things to do in Mykonos — the island waterpark, a boat trip to ancient Delos, exploring Chora's maze, ATV and sailing adventures, a farm…",
  alternates: { canonical: `${SITE}/mykonos/with-kids` },
  openGraph: { title: "Mykonos with Kids | Flyamba", description: "8 family-friendly things to do in Mykonos, with ages, prices and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Beaches", keys: ["beach"] },
  { label: "Boat Trips", keys: ["boat"] },
  { label: "Museums", keys: ["museum"] },
  { label: "Outdoors", keys: ["outdoors"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Mykonos", item: `${SITE}/mykonos` },
          { "@type": "ListItem", position: 3, name: "With Kids", item: `${SITE}/mykonos/with-kids` },
        ],
      },
      ...WITH_KIDS.map((w) => ({
        "@type": "TouristAttraction",
        name: w.name,
        description: w.description,
        address: { "@type": "PostalAddress", addressLocality: "Mykonos", addressCountry: "GR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: w.rating, reviewCount: w.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(w.price ?? ""),
      })),
    ],
  };
}

export default function MykonosWithKids() {
  return (
    <CityGuideShell
      citySlug="mykonos"
      cityName="Mykonos"
      categories={CATEGORIES}
      active="with-kids"
      crumb="With Kids"
      h1="Mykonos with Kids"
      heroImage="/images/mykonos/with-kids/mykonos-waterpark.webp"
      intro="Mykonos is best known as an adults' island of beach clubs and nightlife, but it works surprisingly well for families if you know where to look. There's the island's only waterpark for a guaranteed fun day, a boat trip to ancient Delos that turns history into an adventure, the safe, calm family beaches of Ornos and Platys Gialos, and plenty to keep older kids busy — ATV tours, sailing trips, a farm visit and the maze-like fun of getting 'lost' in Chora. Here are 8 of the best family-friendly things to do, with suggested ages, prices and practical tips to make a Mykonos trip work with children."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={WITH_KIDS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Mykonos with kids — in detail" items={WITH_KIDS} />
    </CityGuideShell>
  );
}
