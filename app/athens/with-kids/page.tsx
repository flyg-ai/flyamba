import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WITH_KIDS, CATEGORIES } from "@/app/data/athens-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Athens with Kids 2026 — Family Guide & Things to Do | Flyamba",
  description:
    "The best things to do in Athens with kids — the free SNFCC park and National Garden, the Attica zoo, a giant planetarium, a hands-on children's museum, the seafront and a fun park, with ages, prices and tips.",
  alternates: { canonical: `${SITE}/athens/with-kids` },
  openGraph: { title: "Athens with Kids | Flyamba", description: "Family-friendly activities, parks and days out in Athens.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Free", keys: ["free"] },
  { label: "Outdoor", keys: ["outdoor"] },
  { label: "Indoor", keys: ["indoor"] },
  { label: "Educational", keys: ["educational"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Athens", item: `${SITE}/athens` },
          { "@type": "ListItem", position: 3, name: "With Kids", item: `${SITE}/athens/with-kids` },
        ],
      },
      ...WITH_KIDS.map((k) => ({
        "@type": "TouristAttraction",
        name: k.name,
        description: k.description,
        address: { "@type": "PostalAddress", addressLocality: "Athens", addressCountry: "GR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: k.rating, reviewCount: k.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(k.price ?? ""),
      })),
    ],
  };
}

export default function AthensWithKids() {
  return (
    <CityGuideShell
      citySlug="athens"
      cityName="Athens"
      categories={CATEGORIES}
      active="with-kids"
      crumb="With Kids"
      h1="Athens with Kids: Family Days Out"
      heroImage="/images/content/photo-1484820540004-14229fe36ca4.avif"
      intro="Ancient ruins can only hold small attention spans for so long, but Athens has plenty to keep children happy between the temples. The spectacular free SNFCC park and the shady central National Garden let them run wild; there's a giant planetarium, Greece's only zoo, a hands-on children's museum, a seafront marina and playground, and the city's biggest fun park. Here are 7 of the best family days out, with ages, prices and practical tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={WITH_KIDS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Athens with kids in detail" items={WITH_KIDS} />
    </CityGuideShell>
  );
}
