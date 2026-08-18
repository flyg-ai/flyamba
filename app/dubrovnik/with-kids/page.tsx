import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WITH_KIDS, CATEGORIES } from "@/app/data/dubrovnik-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Dubrovnik with Kids 2026 — Family Guide | Flyamba",
  description:
    "The best things to do in Dubrovnik with kids — the hillside Aquapark, the aquarium inside a fortress, family beaches, the peacock island of Lokrum, the…",
  alternates: { canonical: `${SITE}/dubrovnik/with-kids` },
  openGraph: { title: "Dubrovnik with Kids | Flyamba", description: "Family-friendly Dubrovnik: water park, aquarium, islands, cable car and beaches, with ages and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Active & Outdoors", keys: ["active"] },
  { label: "Beaches & Water", keys: ["beach"] },
  { label: "Boats & Islands", keys: ["boat"] },
  { label: "Rainy Day", keys: ["indoor"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Dubrovnik", item: `${SITE}/dubrovnik` },
          { "@type": "ListItem", position: 3, name: "With Kids", item: `${SITE}/dubrovnik/with-kids` },
        ],
      },
      ...WITH_KIDS.map((k) => ({
        "@type": "TouristAttraction",
        name: k.name,
        description: k.description,
        address: { "@type": "PostalAddress", addressLocality: "Dubrovnik", addressCountry: "HR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: k.rating, reviewCount: k.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(k.price ?? ""),
      })),
    ],
  };
}

export default function DubrovnikWithKids() {
  return (
    <CityGuideShell
      citySlug="dubrovnik"
      cityName="Dubrovnik"
      categories={CATEGORIES}
      active="with-kids"
      crumb="With Kids"
      h1="Dubrovnik with Kids"
      heroImage="/images/dubrovnik/with-kids/aquarium-dubrovnik.webp"
      intro="Dubrovnik is a surprisingly rewarding city with children — the real-life castle walls thrill young knights and Game of Thrones fans alike, while beyond the Old Town lie a hillside water park, an aquarium tucked inside a fortress, family beaches, boat trips to a peacock-filled island and a cable car with a summit view. Here are the best things to do in Dubrovnik with kids, with suggested ages, prices and practical tips to keep everyone happy in the summer heat."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={WITH_KIDS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Dubrovnik with kids in detail" items={WITH_KIDS} />
    </CityGuideShell>
  );
}
