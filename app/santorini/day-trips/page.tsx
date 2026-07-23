import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { DAY_TRIPS } from "@/app/data/santorini-places";
import { SANTORINI_CATEGORIES } from "@/app/lib/santorini";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Day Trips from Santorini 2026 — Islands & Volcano | Flyamba",
  description:
    "The best day trips from Santorini — the volcano and hot springs cruise, quiet Thirassia, ferry hops to Ios, Naxos and Milos, and a guided volcanic wine tour. Distances, durations and booking tips.",
  alternates: { canonical: `${SITE}/santorini/day-trips` },
  openGraph: { title: "Day Trips from Santorini | Flyamba", description: "6 great day trips from Santorini, from the volcano to neighbouring Cycladic islands.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Boat trips", keys: ["boat"] },
  { label: "Ferry hops", keys: ["ferry"] },
  { label: "Wine", keys: ["wine"] },
  { label: "Beaches", keys: ["beach"] },
  { label: "Half day", keys: ["half-day"] },
  { label: "Full day", keys: ["full-day"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Santorini", item: `${SITE}/santorini` },
          { "@type": "ListItem", position: 3, name: "Day trips", item: `${SITE}/santorini/day-trips` },
        ],
      },
      ...DAY_TRIPS.map((t) => ({
        "@type": "TouristAttraction",
        name: t.name,
        description: t.description,
        address: { "@type": "PostalAddress", addressLocality: "Santorini", addressCountry: "GR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: t.rating, reviewCount: t.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function SantoriniDayTrips() {
  return (
    <CityGuideShell
      citySlug="santorini"
      cityName="Santorini"
      categories={SANTORINI_CATEGORIES}
      active="day-trips"
      crumb="Day trips"
      h1="Best Day Trips from Santorini"
      heroImage="/images/santorini/dagsutflykter/thirasia.webp"
      intro="Santorini sits in the heart of the Cyclades, so it's an easy launchpad for adventures beyond the caldera. The classic outing is the boat trip to the smoking volcano and its warm sulphur springs; from there you can escape the crowds on sleepy Thirassia, ferry-hop to beachy Ios, historic Naxos or the lunar landscapes of Milos, or spend a lazy half-day touring the island's volcanic wineries. Here are the six day trips worth the effort, with distances, durations and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={DAY_TRIPS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Santorini day trips in detail" items={DAY_TRIPS} />
    </CityGuideShell>
  );
}
