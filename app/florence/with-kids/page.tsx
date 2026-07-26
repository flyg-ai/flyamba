import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WITH_KIDS, CATEGORIES } from "@/app/data/florence-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Florence with Kids 2026 — Family Guide | Flyamba",
  description:
    "Florence with children — the Boboli Gardens, the hands-on Museo Galileo, climbing the dome and campanile, Palazzo Vecchio's secret-passage family tours and the ultimate gelato trail, with ages, prices and tips.",
  alternates: { canonical: `${SITE}/florence/with-kids` },
  openGraph: { title: "Florence with Kids | Flyamba", description: "Family-friendly things to do in Florence with ages, prices and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Outdoors", keys: ["outdoors"] },
  { label: "Museums", keys: ["museums"] },
  { label: "Hands-on", keys: ["hands-on"] },
  { label: "Rainy day", keys: ["rainy"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Florence", item: `${SITE}/florence` },
      { "@type": "ListItem", position: 3, name: "With Kids", item: `${SITE}/florence/with-kids` },
    ],
  };
}

export default function FlorenceWithKids() {
  return (
    <CityGuideShell
      citySlug="florence"
      cityName="Florence"
      categories={CATEGORIES}
      active="with-kids"
      crumb="With Kids"
      h1="Florence with Kids"
      heroImage="/images/florence/sevardheter/boboli-tradgarden.webp"
      intro="A city of Renaissance paintings might sound like hard work with children, but Florence has plenty to keep young travellers happy — and the trick is to balance the galleries with space to run, hands-on discovery and a lot of gelato. Kids can roam the Boboli Gardens, operate Galileo's machines, climb the dome or campanile for a real sense of achievement, dress up as Medici courtiers on a secret-passage tour of the Palazzo Vecchio, and rate the city's superb gelaterias. Here are the best family activities, with age guidance, prices and practical tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={WITH_KIDS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Florence with kids in detail" items={WITH_KIDS} />
    </CityGuideShell>
  );
}
