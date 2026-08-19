import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WITH_KIDS, CATEGORIES } from "@/app/data/reykjavik-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Reykjavík with Kids 2026 — Best Family Attractions | Flyamba",
  description:
    "The best things to do in Reykjavík with kids — Perlan's ice cave, whale and puffin watching, FlyOver Iceland, geothermal pools, the Family Park and Zoo…",
  alternates: { canonical: `${SITE}/reykjavik/with-kids` },
  openGraph: { title: "Reykjavík with Kids | Flyamba", description: "Ice caves, whale watching, geothermal pools and hot-spring hikes — family fun in Reykjavík.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Museums", keys: ["museum"] },
  { label: "Parks", keys: ["park"] },
  { label: "Indoor", keys: ["indoor"] },
  { label: "Nature", keys: ["nature"] },
  { label: "Day trip", keys: ["day-trip"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Reykjavík", item: `${SITE}/reykjavik` },
          { "@type": "ListItem", position: 3, name: "With Kids", item: `${SITE}/reykjavik/with-kids` },
        ],
      },
      ...WITH_KIDS.map((k) => ({
        "@type": "TouristAttraction",
        name: k.name,
        description: k.description,
        address: { "@type": "PostalAddress", addressLocality: "Reykjavík", addressCountry: "IS" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: k.rating, reviewCount: k.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(k.price ?? ""),
      })),
    ],
  };
}

export default function ReykjavikWithKids() {
  return (
    <CityGuideShell
      citySlug="reykjavik"
      cityName="Reykjavík"
      categories={CATEGORIES}
      active="with-kids"
      crumb="With Kids"
      h1="Reykjavík with Kids"
      heroImage="/images/reykjavik/attractions/family-park.webp"
      intro="Reykjavík is a surprisingly easy and rewarding city for a family trip. Walk through a real ice cave at Perlan, spot whales and puffins on a harbour boat trip, 'fly' over the country at FlyOver Iceland, splash in the locals' warm geothermal pools, or feed the animals at the Family Park and Zoo — and for older kids, hike to a hot-spring river or chase the northern lights. Here are the best family attractions, with age guidance, prices and practical tips for keeping everyone warm, dry and happy."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={WITH_KIDS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Reykjavík family attractions in detail" items={WITH_KIDS} />
    </CityGuideShell>
  );
}
