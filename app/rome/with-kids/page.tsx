import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WITH_KIDS, CATEGORIES } from "@/app/data/rome-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Rome with Kids 2026 — Family Guide | Flyamba",
  description:
    "The best things to do in Rome with children — Villa Borghese boats and bikes, the Bioparco zoo, Explora children's museum, gladiator school, hands-on museums and family days out, with ages, prices and tips.",
  alternates: { canonical: `${SITE}/rome/with-kids` },
  openGraph: { title: "Rome with Kids | Flyamba", description: "Family-friendly Rome: parks, zoos, hands-on museums and gladiator school, with ages and prices.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Outdoors", keys: ["outdoors"] },
  { label: "Hands-on", keys: ["hands-on"] },
  { label: "Museums", keys: ["museums"] },
  { label: "Animals", keys: ["animals"] },
  { label: "Rainy Day", keys: ["rainy"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Rome", item: `${SITE}/rome` },
          { "@type": "ListItem", position: 3, name: "With Kids", item: `${SITE}/rome/with-kids` },
        ],
      },
      ...WITH_KIDS.map((k) => ({
        "@type": "TouristAttraction",
        name: k.name,
        description: k.description,
        address: { "@type": "PostalAddress", addressLocality: "Rome", addressCountry: "IT" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: k.rating, reviewCount: k.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function RomeWithKids() {
  return (
    <CityGuideShell
      citySlug="rome"
      cityName="Rome"
      categories={CATEGORIES}
      active="with-kids"
      crumb="With Kids"
      h1="Rome with Kids"
      heroImage="/images/rome/med-barn/villa-borghese-parken.webp"
      intro="Ancient ruins can only hold small attention spans for so long — happily, Rome has plenty to keep children delighted. They can pedal boats and hire bikes in Villa Borghese, meet the animals at the Bioparco zoo, play their way through the Explora children's museum, train as gladiators on the Appian Way, and cool off on rainy days in hands-on museums. Here are the best family outings, with suggested ages, prices and practical tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={WITH_KIDS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Rome with kids in detail" items={WITH_KIDS} />
    </CityGuideShell>
  );
}
