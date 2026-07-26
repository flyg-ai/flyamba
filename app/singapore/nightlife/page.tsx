import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { NIGHTLIFE, CATEGORIES } from "@/app/data/singapore-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Nightlife in Singapore 2026 — Guide | Flyamba",
  description:
    "Singapore after dark — world-ranked cocktail bars like Atlas and Manhattan, sky-high rooftops at CÉ LA VI and 1-Altitude, the superclub Zouk, hidden speakeasies and Sentosa's beach club, with areas and tips.",
  alternates: { canonical: `${SITE}/singapore/nightlife` },
  openGraph: { title: "Best Nightlife in Singapore | Flyamba", description: "8 top Singapore bars, rooftops and clubs with areas and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Cocktail bars", keys: ["cocktails"] },
  { label: "Rooftop", keys: ["rooftop"] },
  { label: "Clubs", keys: ["club"] },
  { label: "Beach clubs", keys: ["beach"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Singapore", item: `${SITE}/singapore` },
          { "@type": "ListItem", position: 3, name: "Nightlife", item: `${SITE}/singapore/nightlife` },
        ],
      },
      ...NIGHTLIFE.map((n) => ({
        "@type": "BarOrPub",
        name: n.name,
        description: n.description,
        address: { "@type": "PostalAddress", addressLocality: "Singapore", addressCountry: "SG" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: n.rating, reviewCount: n.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function SingaporeNightlife() {
  return (
    <CityGuideShell
      citySlug="singapore"
      cityName="Singapore"
      categories={CATEGORIES}
      active="nightlife"
      crumb="Nightlife"
      h1="Singapore Nightlife"
      heroImage="/images/singapore/nattliv/1-altitude.webp"
      intro="Singapore's nightlife is as polished as the city itself, and it punches well above its weight: several of its bars regularly rank among the world's 50 best. Sip Champagne beneath the golden gin tower of Atlas, watch the skyline from sky-high rooftops like CÉ LA VI and 1-Altitude, lose yourself in the superclub Zouk, or find a hidden speakeasy behind an unmarked door. Here are 8 of the best bars, rooftops and clubs, from cocktail temples to Sentosa's beach club, with areas, prices and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={NIGHTLIFE} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Singapore nightlife in detail" items={NIGHTLIFE} />
    </CityGuideShell>
  );
}
