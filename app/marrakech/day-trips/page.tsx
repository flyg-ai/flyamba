import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { DAY_TRIPS, CATEGORIES } from "@/app/data/marrakech-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Day Trips from Marrakech 2026 — Guide | Flyamba",
  description:
    "The best day trips from Marrakech — the High Atlas and Imlil, the Ourika Valley, Essaouira, Aït Ben Haddou and Ouarzazate, the Agafay Desert and Ouzoud…",
  alternates: { canonical: `${SITE}/marrakech/day-trips` },
  openGraph: { title: "Best Day Trips from Marrakech | Flyamba", description: "Mountains, valleys, kasbahs, desert and coast within reach of Marrakech.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Mountains", keys: ["mountains"] },
  { label: "Nature & waterfalls", keys: ["nature"] },
  { label: "Desert", keys: ["desert"] },
  { label: "Culture & kasbahs", keys: ["culture"] },
  { label: "Coast", keys: ["coast"] },
  { label: "Hiking", keys: ["hiking"] },
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
          { "@type": "ListItem", position: 3, name: "Day Trips", item: `${SITE}/marrakech/day-trips` },
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

export default function MarrakechDayTrips() {
  return (
    <CityGuideShell
      citySlug="marrakech"
      cityName="Marrakech"
      categories={CATEGORIES}
      active="day-trips"
      crumb="Day Trips"
      h1="Best Day Trips from Marrakech"
      heroImage="/images/marrakech/dagsutflykter/atlas-bergen.webp"
      intro="One of Marrakech's greatest assets is what lies beyond its ramparts. Within an hour or two you can swap the city heat for the cool valleys and Berber villages of the High Atlas, chase waterfalls in the Ourika Valley, feel the Atlantic breeze at Essaouira or watch the sun set over the Agafay Desert; a little further lie the mud-brick kasbah of Aït Ben Haddou and Morocco's tallest waterfalls at Ouzoud. This guide covers the best excursions, with distances and driving times, typical tour prices in dirhams, and honest advice on which are easy half-days and which demand an early start or an overnight."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={DAY_TRIPS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Marrakech day trips in detail" items={DAY_TRIPS} />
    </CityGuideShell>
  );
}
