import type { Metadata } from "next";
import { GuideShell } from "@/app/components/GuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WITH_KIDS } from "@/app/data/barcelona-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Barcelona with Kids 2026 — Family Travel Guide | Flyamba",
  description:
    "The best things to do in Barcelona with kids — Tibidabo, the aquarium, CosmoCaixa, the zoo, parks and the Magic Fountain — with ages, prices and practical tips.",
  alternates: { canonical: `${SITE}/barcelona/with-kids` },
  openGraph: { title: "Barcelona with Kids | Flyamba", description: "Family activities, parks and practical tips for Barcelona.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Free", keys: ["free"] },
  { label: "Indoor", keys: ["indoor"] },
  { label: "Outdoor", keys: ["outdoor"] },
  { label: "Educational", keys: ["educational"] },
];

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
    { "@type": "ListItem", position: 2, name: "Barcelona", item: `${SITE}/barcelona` },
    { "@type": "ListItem", position: 3, name: "With kids", item: `${SITE}/barcelona/with-kids` },
  ],
};

export default function BarcelonaWithKids() {
  return (
    <GuideShell
      active="with-kids"
      crumb="With kids"
      h1="Barcelona with Kids"
      heroImage="/images/content/photo-1484820540004-14229fe36ca4.avif"
      intro="Barcelona is a dream family destination: a compact, walkable city with warm weather, sandy beaches, big green parks and a surprising number of attractions built for children. Add welcoming, child-friendly restaurants and excellent public transport, and it's easy to keep everyone happy. Here are the best things to do with kids, with ages, prices and the practical tips that make travelling with children stress-free."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={WITH_KIDS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Barcelona with kids — in detail" items={WITH_KIDS} />
    </GuideShell>
  );
}
