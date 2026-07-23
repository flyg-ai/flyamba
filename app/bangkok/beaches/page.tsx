import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { BEACHES } from "@/app/data/bangkok-places";
import { BANGKOK_CATEGORIES } from "@/app/lib/bangkok";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Beaches Near Bangkok 2026 — Day Trips & Islands | Flyamba",
  description:
    "The best beaches within reach of Bangkok — Bang Saen, Koh Larn, Hua Hin, Cha-Am, Koh Samet and the river island of Koh Kret, with travel times, prices and tips.",
  alternates: { canonical: `${SITE}/bangkok/beaches` },
  openGraph: { title: "Best Beaches Near Bangkok | Flyamba", description: "Day-trip sands and islands from Bang Saen to Koh Samet.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Family", keys: ["family"] },
  { label: "Islands", keys: ["islands"] },
  { label: "Watersports", keys: ["watersports"] },
  { label: "Quiet", keys: ["quiet"] },
  { label: "Near the city", keys: ["near-city"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Bangkok", item: `${SITE}/bangkok` },
      { "@type": "ListItem", position: 3, name: "Beaches", item: `${SITE}/bangkok/beaches` },
    ],
  };
}

export default function BangkokBeaches() {
  return (
    <CityGuideShell
      citySlug="bangkok"
      cityName="Bangkok"
      categories={BANGKOK_CATEGORIES}
      active="beaches"
      crumb="Beaches"
      h1="Beaches Near Bangkok"
      heroImage="/images/bangkok/strander/koh-samet-farja.webp"
      intro="Bangkok isn't a beach city, but the Gulf coast and its islands are surprisingly close — close enough for a day at the sea or an easy weekend escape. The nearest sands at Bang Saen buzz with Thai families, Koh Larn and Koh Samet deliver genuinely turquoise island water, and the royal resort towns of Hua Hin and Cha-Am add markets and gentle charm. These 6 escapes, plus the car-free river island of Koh Kret, cover every mood, with travel times, ferry fares and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={BEACHES} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Beaches near Bangkok in detail" items={BEACHES} />
    </CityGuideShell>
  );
}
