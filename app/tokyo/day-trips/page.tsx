import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { DAY_TRIPS, CATEGORIES } from "@/app/data/tokyo-places";

const SITE = "https://flyamba.com";

export const metadata: Metadata = {
  title: "Best Day Trips from Tokyo 2026 — Fuji, Kamakura & Nikko | Flyamba",
  description:
    "The best day trips from Tokyo — Hakone and Mount Fuji, the temples of Kamakura and Nikko, cosmopolitan Yokohama, old-town Kawagoe and Lake Kawaguchiko, with travel times and tips.",
  alternates: { canonical: `${SITE}/tokyo/day-trips` },
  openGraph: { title: "Best Day Trips from Tokyo | Flyamba", description: "Mount Fuji, Kamakura, Nikko, Yokohama and more.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Nature", keys: ["nature"] },
  { label: "Culture", keys: ["culture"] },
  { label: "Coast", keys: ["coast"] },
  { label: "Onsen", keys: ["onsen"] },
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
          { "@type": "ListItem", position: 3, name: "Day Trips", item: `${SITE}/tokyo/day-trips` },
        ],
      },
      ...DAY_TRIPS.map((d) => ({
        "@type": "TouristAttraction",
        name: d.name,
        description: d.description,
        aggregateRating: { "@type": "AggregateRating", ratingValue: d.rating, reviewCount: d.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function TokyoDayTrips() {
  return (
    <CityGuideShell
      citySlug="tokyo"
      cityName="Tokyo"
      categories={CATEGORIES}
      active="day-trips"
      crumb="Day Trips"
      h1="Best Day Trips from Tokyo"
      heroImage="/images/tokyo/dagsutflykter/mt-fuji-hakone.webp"
      intro="Tokyo's superb rail network puts an extraordinary range of day trips within easy reach. In an hour or two you can be soaking in a Hakone onsen beneath Mount Fuji, wandering the ancient temples of Kamakura by the sea, marvelling at the golden shrines of UNESCO-listed Nikko, exploring cosmopolitan Yokohama and its huge Chinatown, or stepping back into the Edo period at Kawagoe. Here are the six best escapes from the capital, with travel times, costs and how to make the most of each."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={DAY_TRIPS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Tokyo day trips in detail" items={DAY_TRIPS} />
    </CityGuideShell>
  );
}
