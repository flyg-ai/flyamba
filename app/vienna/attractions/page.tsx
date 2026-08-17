import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { ATTRACTIONS, CATEGORIES } from "@/app/data/vienna-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Attractions in Vienna 2026 — Guide | Flyamba",
  description:
    "The 18 best things to do in Vienna — Schönbrunn and the Hofburg, St Stephen's Cathedral, Klimt at the Belvedere, the Kunsthistorisches Museum, the State…",
  alternates: { canonical: `${SITE}/vienna/attractions` },
  openGraph: { title: "Best Things to Do in Vienna | Flyamba", description: "18 top Vienna attractions with prices, hours and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Free", keys: ["free"] },
  { label: "Must-see", keys: ["must-see"] },
  { label: "Palaces & Imperial", keys: ["palaces"] },
  { label: "Art & Museums", keys: ["art"] },
  { label: "Churches", keys: ["churches"] },
  { label: "Music & Opera", keys: ["music"] },
  { label: "Parks & Markets", keys: ["parks"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Vienna", item: `${SITE}/vienna` },
          { "@type": "ListItem", position: 3, name: "Attractions", item: `${SITE}/vienna/attractions` },
        ],
      },
      ...ATTRACTIONS.map((a) => ({
        "@type": "TouristAttraction",
        name: a.name,
        description: a.description,
        address: { "@type": "PostalAddress", addressLocality: "Vienna", addressCountry: "AT" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: a.rating, reviewCount: a.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(a.price ?? ""),
      })),
    ],
  };
}

export default function ViennaAttractions() {
  return (
    <CityGuideShell
      citySlug="vienna"
      cityName="Vienna"
      categories={CATEGORIES}
      active="attractions"
      crumb="Attractions"
      h1="Best Things to Do in Vienna"
      heroImage="/images/vienna/sevardheter/schonbrunn-slott.webp"
      intro="Few cities wear their history as gloriously as Vienna. The Habsburgs' palaces at Schönbrunn and the Hofburg, St Stephen's soaring Gothic cathedral, Klimt's golden 'The Kiss' at the Belvedere, the peerless Kunsthistorisches Museum and the State Opera all sit within a walkable, café-lined centre. Here are the 18 attractions worth building your trip around, with prices, opening hours and tips to skip the queues."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={ATTRACTIONS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Vienna attractions in detail" items={ATTRACTIONS} />
    </CityGuideShell>
  );
}
