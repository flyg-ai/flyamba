import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { DAY_TRIPS, IBIZA_CATEGORIES } from "@/app/data/ibiza-places";
import { SITE } from "@/app/lib/destination-helpers";

const HERO = "/images/destinations/flights-ibiza.avif";

export const metadata: Metadata = {
  title: "Day Trips from Ibiza 2026 — Guide | Flyamba",
  description:
    "The best day trips from Ibiza — the ferry to unspoilt Formentera, a sunset boat around Es Vedrà, the wild north coast and coves, chic Santa Gertrudis and island wine tasting.",
  alternates: { canonical: `${SITE}/ibiza/day-trips` },
  openGraph: { title: "Best Day Trips from Ibiza | Flyamba", description: "Formentera, Es Vedrà, the wild north and more — the best escapes from Ibiza.", type: "article", images: [HERO] },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Islands", keys: ["islands"] },
  { label: "Boat", keys: ["boat"] },
  { label: "Nature", keys: ["nature"] },
  { label: "Villages", keys: ["villages"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Ibiza", item: `${SITE}/ibiza` },
          { "@type": "ListItem", position: 3, name: "Day trips", item: `${SITE}/ibiza/day-trips` },
        ],
      },
      ...DAY_TRIPS.map((t) => ({
        "@type": "TouristAttraction",
        name: t.name,
        description: t.description,
        address: { "@type": "PostalAddress", addressLocality: "Ibiza", addressCountry: "ES" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: t.rating, reviewCount: t.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function IbizaDayTrips() {
  return (
    <CityGuideShell
      citySlug="ibiza"
      cityName="Ibiza"
      categories={IBIZA_CATEGORIES}
      active="day-trips"
      crumb="Day trips"
      h1="Best Day Trips from Ibiza"
      heroImage={HERO}
      intro="Ibiza is small, but the escapes it offers are among the best in the Mediterranean. Chief among them is the short ferry to Formentera, whose powder-white beaches and clear shallows rival the Caribbean; but there is also a sunset boat around the mythic rock of Es Vedrà, the wild and green north coast with its hidden coves, the chic inland village of Santa Gertrudis and a taste of the island's revived wine country. Here are the day trips worth making, with distances, transport and insider tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={DAY_TRIPS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Day trips from Ibiza in detail" items={DAY_TRIPS} />
    </CityGuideShell>
  );
}
