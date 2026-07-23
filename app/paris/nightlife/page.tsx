import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { NIGHTLIFE, CATEGORIES } from "@/app/data/paris-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Nightlife in Paris 2026 — Guide | Flyamba",
  description:
    "Paris after dark — the Moulin Rouge cabaret, a swing-jazz cellar in the Latin Quarter, hidden cocktail speakeasies, rooftop bars, David Lynch's club and the city's temple of techno. Areas, hours, prices and Métro directions.",
  alternates: { canonical: `${SITE}/paris/nightlife` },
  openGraph: { title: "Best Nightlife in Paris | Flyamba", description: "Cabarets, jazz, cocktail bars and clubs in Paris.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Bars", keys: ["bars"] },
  { label: "Cocktails", keys: ["cocktails"] },
  { label: "Clubs", keys: ["clubs"] },
  { label: "Live music", keys: ["live-music"] },
  { label: "Cabaret", keys: ["cabaret"] },
  { label: "Rooftop", keys: ["rooftop"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Paris", item: `${SITE}/paris` },
          { "@type": "ListItem", position: 3, name: "Nightlife", item: `${SITE}/paris/nightlife` },
        ],
      },
      ...NIGHTLIFE.map((n) => ({
        "@type": "Place",
        name: n.name,
        description: n.description,
        address: { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: n.rating, reviewCount: n.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function ParisNightlife() {
  return (
    <CityGuideShell
      citySlug="paris"
      cityName="Paris"
      categories={CATEGORIES}
      active="nightlife"
      crumb="Nightlife"
      h1="Paris After Dark"
      heroImage="/images/paris/nattliv/moulin-rouge.webp"
      intro="Parisian nights are as varied as its neighbourhoods — feathered cabaret under the red windmill of Pigalle, swing dancing in a medieval jazz cellar in the Latin Quarter, expertly mixed cocktails behind unmarked speakeasy doors, sunset drinks on a Marais rooftop and dawn-chasing techno beneath a Grands Boulevards cinema. Here are the places worth staying up for, with neighbourhoods, opening hours, prices and the local rhythm — remember that Parisians go out late."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={NIGHTLIFE} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Paris nightlife in detail" items={NIGHTLIFE} />
    </CityGuideShell>
  );
}
