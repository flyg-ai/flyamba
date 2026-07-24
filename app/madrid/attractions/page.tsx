import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { ATTRACTIONS, CATEGORIES } from "@/app/data/madrid-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Things to Do in Madrid 2026 — Attractions Guide | Flyamba",
  description:
    "The 20 best things to do in Madrid — the Prado, Reina Sofía and Thyssen museums, the Royal Palace, Retiro park, Plaza Mayor and the Bernabéu, with prices, opening hours and insider tips.",
  alternates: { canonical: `${SITE}/madrid/attractions` },
  openGraph: { title: "Best Things to Do in Madrid | Flyamba", description: "20 top Madrid attractions with prices, hours and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Must-see", keys: ["must-see"] },
  { label: "Art & museums", keys: ["museum", "art"] },
  { label: "Architecture", keys: ["arkitektur"] },
  { label: "Parks & nature", keys: ["natur", "nature", "parks"] },
  { label: "Free", keys: ["gratis", "free"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Madrid", item: `${SITE}/madrid` },
          { "@type": "ListItem", position: 3, name: "Attractions", item: `${SITE}/madrid/attractions` },
        ],
      },
      ...ATTRACTIONS.map((a) => ({
        "@type": "TouristAttraction",
        name: a.name,
        description: a.description,
        address: { "@type": "PostalAddress", addressLocality: "Madrid", addressCountry: "ES" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: a.rating, reviewCount: a.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(a.price ?? ""),
      })),
    ],
  };
}

export default function MadridAttractions() {
  return (
    <CityGuideShell
      citySlug="madrid"
      cityName="Madrid"
      categories={CATEGORIES}
      active="attractions"
      crumb="Attractions"
      h1="Best Things to Do in Madrid"
      heroImage="/images/madrid/attractions/prado-museet.webp"
      intro="Spain's capital sits 667 metres up on the Castilian plateau and pulses with an energy that rarely stops before dawn. The Paseo del Arte packs the Prado, Reina Sofía and Thyssen-Bornemisza within a 700-metre walk; the Royal Palace looms over the Manzanares with 3,418 rooms; and UNESCO-listed Retiro park breathes with the city from sunrise to midnight. Between the museums, districts like La Latina, Malasaña and Salamanca each keep their own rhythm. Here are the 20 attractions worth building your trip around, with prices, opening hours and tips to skip the queues."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={ATTRACTIONS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Madrid attractions in detail" items={ATTRACTIONS} />
    </CityGuideShell>
  );
}
