import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { DAY_TRIPS, CATEGORIES } from "@/app/data/cancun-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Day Trips from Cancún 2026 — Guide | Flyamba",
  description:
    "The best day trips from Cancún — the Wonder-of-the-World Chichén Itzá, the ruins of Tulum and Cobá, the islands of Isla Mujeres and Cozumel, colonial…",
  alternates: { canonical: `${SITE}/cancun/day-trips` },
  openGraph: { title: "Best Day Trips from Cancún | Flyamba", description: "Six great day trips from Cancún, from Chichén Itzá and Tulum to Isla Mujeres and Cozumel, with directions.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Mayan Ruins", keys: ["ruins"] },
  { label: "Islands", keys: ["islands"] },
  { label: "Beaches", keys: ["beaches"] },
  { label: "Colonial Towns", keys: ["colonial"] },
  { label: "By Ferry", keys: ["ferry"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...DAY_TRIPS.map((d) => ({
        "@type": "TouristAttraction",
        name: d.name,
        description: d.description,
        aggregateRating: { "@type": "AggregateRating", ratingValue: d.rating, reviewCount: d.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function CancunDayTrips() {
  return (
    <CityGuideShell
      citySlug="cancun"
      cityName="Cancún"
      categories={CATEGORIES}
      active="day-trips"
      crumb="Day Trips"
      h1="Best Day Trips from Cancún"
      heroImage="/images/placeholders/placeholder-day-trips.webp"
      intro="Cancún makes a superb base for exploring the Yucatán Peninsula, and the range of day trips is one of its greatest strengths. Head inland to the Maya wonders — the great pyramid of Chichén Itzá, cliff-top Tulum and jungle-clad Cobá, usually bundled with a cenote swim — or into the colonial charm and swimming holes of Valladolid. Hop a ferry to the laid-back island of Isla Mujeres or the world-class reefs of Cozumel, or take the easy coach down to trendy Playa del Carmen. The excellent, cheap ADO buses make independent trips simple, while organised tours handle the logistics. Here are the six best excursions, with realistic travel times, costs and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={DAY_TRIPS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Day trips from Cancún in detail" items={DAY_TRIPS} />
    </CityGuideShell>
  );
}
