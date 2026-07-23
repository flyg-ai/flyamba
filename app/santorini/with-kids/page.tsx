import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WITH_KIDS } from "@/app/data/santorini-places";
import { SANTORINI_CATEGORIES } from "@/app/lib/santorini";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Santorini with Kids 2026 — Family Things to Do Guide | Flyamba",
  description:
    "Santorini with children — the volcano boat trip, family beaches like Kamari and Monolithos, a water park, the immersive Lost Atlantis show and gentle mini-cruises. Age tips, prices and practical advice.",
  alternates: { canonical: `${SITE}/santorini/with-kids` },
  openGraph: { title: "Santorini with Kids | Flyamba", description: "7 family-friendly things to do in Santorini, with ages, prices and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Active", keys: ["active"] },
  { label: "Beach", keys: ["beach"] },
  { label: "Boat trips", keys: ["boat"] },
  { label: "Indoor", keys: ["indoor"] },
  { label: "Cooling off", keys: ["cooling-off"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Santorini", item: `${SITE}/santorini` },
          { "@type": "ListItem", position: 3, name: "With kids", item: `${SITE}/santorini/with-kids` },
        ],
      },
      ...WITH_KIDS.map((k) => ({
        "@type": "TouristAttraction",
        name: k.name,
        description: k.description,
        address: { "@type": "PostalAddress", addressLocality: "Santorini", addressCountry: "GR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: k.rating, reviewCount: k.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(k.price ?? ""),
      })),
    ],
  };
}

export default function SantoriniWithKids() {
  return (
    <CityGuideShell
      citySlug="santorini"
      cityName="Santorini"
      categories={SANTORINI_CATEGORIES}
      active="with-kids"
      crumb="With kids"
      h1="Santorini with Kids"
      heroImage="/images/santorini/med-barn/mini-cruise.webp"
      intro="Santorini is famous as a honeymoon island, but it works well with children too if you plan around them. The volcano boat trip is a genuine hit — a real crater to climb and warm springs to swim in — while family beaches like Kamari and shallow Monolithos, a water park, gentle caldera mini-cruises and the air-conditioned Lost Atlantis show fill the gaps between grown-up villages and viewpoints. Here are seven family-friendly outings, with age guidance, prices and practical tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={WITH_KIDS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Family things to do in Santorini in detail" items={WITH_KIDS} />
    </CityGuideShell>
  );
}
