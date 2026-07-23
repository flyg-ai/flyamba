import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WITH_KIDS, CATEGORIES } from "@/app/data/tokyo-places";

const SITE = "https://flyamba.com";

export const metadata: Metadata = {
  title: "Tokyo with Kids 2026 — Best Family Attractions | Flyamba",
  description:
    "The best things to do in Tokyo with children — Disneyland and DisneySea, teamLab, Ueno Zoo, the Ghibli Museum, Pokemon, Sanrio Puroland and KidZania, with prices and tips.",
  alternates: { canonical: `${SITE}/tokyo/with-kids` },
  openGraph: { title: "Tokyo with Kids | Flyamba", description: "Disney, teamLab, zoos, Ghibli and family fun in Tokyo.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Theme Parks", keys: ["theme-park"] },
  { label: "Interactive", keys: ["interactive"] },
  { label: "Animals", keys: ["animals"] },
  { label: "Museums", keys: ["museum"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Tokyo", item: `${SITE}/tokyo` },
          { "@type": "ListItem", position: 3, name: "With Kids", item: `${SITE}/tokyo/with-kids` },
        ],
      },
      ...WITH_KIDS.map((k) => ({
        "@type": "TouristAttraction",
        name: k.name,
        description: k.description,
        address: { "@type": "PostalAddress", addressLocality: "Tokyo", addressCountry: "JP" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: k.rating, reviewCount: k.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(k.price ?? ""),
      })),
    ],
  };
}

export default function TokyoWithKids() {
  return (
    <CityGuideShell
      citySlug="tokyo"
      cityName="Tokyo"
      categories={CATEGORIES}
      active="with-kids"
      crumb="With Kids"
      h1="Tokyo with Kids"
      heroImage="/images/tokyo/med-barn/teamlab-planets.webp"
      intro="Tokyo is a dream destination for families: astonishingly safe and clean, endlessly novel, and packed with attractions that thrill children and adults alike. You have two world-class Disney parks (including the one-of-a-kind DisneySea), the immersive digital playground of teamLab, giant pandas at Ueno Zoo, the magical Ghibli Museum, and a wealth of weatherproof options from Pokemon and Sanrio to hands-on science and the role-play city of KidZania. Here are the best family days out, with ages, prices and practical tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={WITH_KIDS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Tokyo with kids in detail" items={WITH_KIDS} />
    </CityGuideShell>
  );
}
