import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { DAY_TRIPS } from "@/app/data/bangkok-places";
import { BANGKOK_CATEGORIES } from "@/app/lib/bangkok";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Day Trips from Bangkok 2026 — Guide | Flyamba",
  description:
    "The best day trips from Bangkok — the ancient ruins of Ayutthaya, Damnoen Saduak floating market, the Maeklong railway market, Kanchanaburi and Khao Yai, with travel tips.",
  alternates: { canonical: `${SITE}/bangkok/day-trips` },
  openGraph: { title: "Best Day Trips from Bangkok | Flyamba", description: "Ayutthaya, floating markets, Kanchanaburi and more.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Culture", keys: ["culture"] },
  { label: "Nature", keys: ["nature"] },
  { label: "Markets", keys: ["markets"] },
  { label: "Beaches", keys: ["beaches"] },
  { label: "Half-day", keys: ["half-day"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Bangkok", item: `${SITE}/bangkok` },
      { "@type": "ListItem", position: 3, name: "Day trips", item: `${SITE}/bangkok/day-trips` },
    ],
  };
}

export default function BangkokDayTrips() {
  return (
    <CityGuideShell
      citySlug="bangkok"
      cityName="Bangkok"
      categories={BANGKOK_CATEGORIES}
      active="day-trips"
      crumb="Day trips"
      h1="Best Day Trips from Bangkok"
      heroImage="/images/bangkok/dagsutflykter/ayutthaya.webp"
      intro="Some of central Thailand's most memorable sights sit within a couple of hours of Bangkok, making the city an ideal base. Wander the crumbling temple ruins of the former royal capital Ayutthaya, drift through the canals of the Damnoen Saduak floating market, watch a train squeeze through the astonishing Maeklong railway market, trace the wartime Death Railway at Kanchanaburi, or spot wild elephants in Khao Yai National Park. These 6 trips, by train, minivan or tour, come with travel times and practical tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={DAY_TRIPS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Day trips from Bangkok in detail" items={DAY_TRIPS} />
    </CityGuideShell>
  );
}
