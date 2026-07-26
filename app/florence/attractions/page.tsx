import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { ATTRACTIONS, CATEGORIES } from "@/app/data/florence-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Attractions in Florence 2026 — Guide | Flyamba",
  description:
    "The best things to do in Florence — the Duomo and Brunelleschi's dome, the Uffizi, Michelangelo's David at the Accademia, the Ponte Vecchio, Pitti Palace and more, with prices, hours and insider tips.",
  alternates: { canonical: `${SITE}/florence/attractions` },
  openGraph: { title: "Best Things to Do in Florence | Flyamba", description: "Top Florence attractions with prices, hours and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Free", keys: ["free"] },
  { label: "Must-see", keys: ["must-see"] },
  { label: "Art & Museums", keys: ["art"] },
  { label: "Churches", keys: ["churches"] },
  { label: "Palaces & Gardens", keys: ["palaces"] },
  { label: "Piazzas & Views", keys: ["views"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Florence", item: `${SITE}/florence` },
          { "@type": "ListItem", position: 3, name: "Attractions", item: `${SITE}/florence/attractions` },
        ],
      },
      ...ATTRACTIONS.map((a) => ({
        "@type": "TouristAttraction",
        name: a.name,
        description: a.description,
        address: { "@type": "PostalAddress", addressLocality: "Florence", addressCountry: "IT" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: a.rating, reviewCount: a.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(a.price ?? ""),
      })),
    ],
  };
}

export default function FlorenceAttractions() {
  return (
    <CityGuideShell
      citySlug="florence"
      cityName="Florence"
      categories={CATEGORIES}
      active="attractions"
      crumb="Attractions"
      h1="Best Things to Do in Florence"
      heroImage="/images/florence/sevardheter/brunelleschi-kupolen.webp"
      intro="No city on earth packs so much Renaissance genius into so small a space. Florence is a walkable open-air museum where Brunelleschi's dome, Michelangelo's David, Botticelli's Venus and the goldsmiths' bridge of the Ponte Vecchio stand within minutes of one another. Here are the attractions worth building your trip around, with prices, opening hours and tips to skip the queues at the Uffizi, the Accademia and the dome climb."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={ATTRACTIONS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Florence attractions in detail" items={ATTRACTIONS} />
    </CityGuideShell>
  );
}
