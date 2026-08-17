import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WITH_KIDS, CATEGORIES } from "@/app/data/marrakech-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Marrakech with Kids 2026 — Family Guide | Flyamba",
  description:
    "The best things to do in Marrakech with children — camel rides, the Jemaa el-Fnaa entertainers, a water park, hot-air ballooning, calèche tours and film…",
  alternates: { canonical: `${SITE}/marrakech/with-kids` },
  openGraph: { title: "Marrakech with Kids | Flyamba", description: "Family-friendly Marrakech: camel rides, water parks, ballooning and more.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Free", keys: ["free"] },
  { label: "Outdoors", keys: ["outdoor"] },
  { label: "Animals", keys: ["animals"] },
  { label: "Adventure", keys: ["adventure"] },
  { label: "Water", keys: ["water"] },
  { label: "Gardens", keys: ["gardens"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Marrakech", item: `${SITE}/marrakech` },
          { "@type": "ListItem", position: 3, name: "With Kids", item: `${SITE}/marrakech/with-kids` },
        ],
      },
      ...WITH_KIDS.map((k) => ({
        "@type": "TouristAttraction",
        name: k.name,
        description: k.description,
        address: { "@type": "PostalAddress", addressLocality: "Marrakech", addressCountry: "MA" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: k.rating, reviewCount: k.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(k.price ?? ""),
      })),
    ],
  };
}

export default function MarrakechWithKids() {
  return (
    <CityGuideShell
      citySlug="marrakech"
      cityName="Marrakech"
      categories={CATEGORIES}
      active="with-kids"
      crumb="With Kids"
      h1="Marrakech with Kids"
      heroImage="/images/marrakech/med-barn/kamelrid-palmeraie.webp"
      intro="Marrakech can be an exotic, thrilling adventure for children — the trick is balancing the sensory intensity of the medina with plenty of hands-on fun and downtime. The nightly circus of Jemaa el-Fnaa, a swaying camel ride through the palm groves, a dawn balloon flight over the desert, a splash-filled day at the water park and a clip-clopping calèche around the ramparts all delight younger travellers, while gardens and film studios add variety. This guide gathers the best family experiences, with suggested age ranges, prices in dirhams and practical tips to keep everyone happy in the heat."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={WITH_KIDS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Marrakech with kids in detail" items={WITH_KIDS} />
    </CityGuideShell>
  );
}
