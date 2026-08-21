import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WITH_KIDS, CATEGORIES } from "@/app/data/madrid-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Madrid with Kids 2026 — Family Attractions Guide | Flyamba",
  description:
    "The best things to do in Madrid with kids — the Zoo Aquarium's giant pandas, Retiro park's boating lake, Warner theme park, Madrid Río playgrounds…",
  alternates: { canonical: `${SITE}/madrid/with-kids` },
  openGraph: { title: "Madrid with Kids | Flyamba", description: "Family-friendly Madrid — 10 attractions for all ages.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Free", keys: ["gratis", "free"] },
  { label: "Indoor", keys: ["inomhus", "indoor"] },
  { label: "Outdoor", keys: ["utomhus", "outdoor"] },
  { label: "Ages 0–5", keys: ["0-5"] },
  { label: "Ages 6–12", keys: ["6-12"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...WITH_KIDS.map((k) => ({
        "@type": "TouristAttraction",
        name: k.name,
        description: k.description,
        address: { "@type": "PostalAddress", addressLocality: "Madrid", addressCountry: "ES" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: k.rating, reviewCount: k.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(k.price ?? ""),
      })),
    ],
  };
}

export default function MadridWithKids() {
  return (
    <CityGuideShell
      citySlug="madrid"
      cityName="Madrid"
      categories={CATEGORIES}
      active="with-kids"
      crumb="With Kids"
      h1="Madrid with Kids"
      heroImage="/images/madrid/with-kids/aquarium-madrid.webp"
      intro="Madrid is a surprisingly brilliant city for families, with green space, animals, theme parks and hands-on museums all within easy reach. Rowing boats and puppet theatre in Retiro park, giant pandas at the Zoo Aquarium, playgrounds and splash fountains along the 10-kilometre Madrid Río, roller coasters at Warner and the Parque de Atracciones, plus rainy-day rescues like the planetarium, railway museum and Micropolix children's city. Here are 10 of the best family attractions, with ages, prices and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={WITH_KIDS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Madrid with kids in detail" items={WITH_KIDS} />
    </CityGuideShell>
  );
}
