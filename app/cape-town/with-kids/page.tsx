import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WITH_KIDS, CATEGORIES } from "@/app/data/cape-town-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Cape Town with Kids 2026 — Best Family Activities | Flyamba",
  description:
    "The best things to do in Cape Town with kids — the Two Oceans Aquarium, Boulders Beach penguins, the Table Mountain cableway, Kirstenbosch, World of Birds and more, with prices, ages and tips.",
  alternates: { canonical: `${SITE}/cape-town/with-kids` },
  openGraph: { title: "Cape Town with Kids | Flyamba", description: "Family-friendly attractions in Cape Town, with prices, ages and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Animals", keys: ["animals"] },
  { label: "Parks", keys: ["park"] },
  { label: "Beach", keys: ["beach"] },
  { label: "Indoor", keys: ["indoor"] },
  { label: "Toddlers", keys: ["toddlers"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Cape Town", item: `${SITE}/cape-town` },
          { "@type": "ListItem", position: 3, name: "With Kids", item: `${SITE}/cape-town/with-kids` },
        ],
      },
      ...WITH_KIDS.map((a) => ({
        "@type": "TouristAttraction",
        name: a.name,
        description: a.description,
        address: { "@type": "PostalAddress", addressLocality: "Cape Town", addressCountry: "ZA" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: a.rating, reviewCount: a.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(a.price ?? ""),
      })),
    ],
  };
}

export default function CapeTownWithKids() {
  return (
    <CityGuideShell
      citySlug="cape-town"
      cityName="Cape Town"
      categories={CATEGORIES}
      active="with-kids"
      crumb="With Kids"
      h1="Cape Town with Kids"
      heroImage="/images/cape-town/with-kids/boulders-pingviner.webp"
      intro="Cape Town is a brilliant family destination, where kids can watch wild penguins waddle across a beach, ride a cable car up Table Mountain, meet sharks at the aquarium and run wild in the world's loveliest botanical garden. This guide rounds up the best family activities — outdoor and indoor, animal and adventure — with age guides, prices and rainy-day options to keep every age happy."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={WITH_KIDS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Cape Town family activities in detail" items={WITH_KIDS} />
    </CityGuideShell>
  );
}
