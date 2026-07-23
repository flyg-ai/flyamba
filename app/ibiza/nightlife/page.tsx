import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { NIGHTLIFE, IBIZA_CATEGORIES } from "@/app/data/ibiza-places";
import { SITE } from "@/app/lib/destination-helpers";

const HERO = "/images/destinations/flights-ibiza.avif";

export const metadata: Metadata = {
  title: "Nightlife in Ibiza 2026 — Clubs Guide | Flyamba",
  description:
    "Ibiza's legendary nightlife — Pacha, Amnesia, Ushuaïa, Hï Ibiza, DC-10, Eden and more. The world's clubbing capital, with entry prices, line-ups and insider tips.",
  alternates: { canonical: `${SITE}/ibiza/nightlife` },
  openGraph: { title: "Best Clubs & Nightlife in Ibiza | Flyamba", description: "The superclubs that made Ibiza the clubbing capital of the world.", type: "article", images: [HERO] },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Superclubs", keys: ["superclubs"] },
  { label: "Beach club", keys: ["beach"] },
  { label: "Shows", keys: ["shows"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Ibiza", item: `${SITE}/ibiza` },
          { "@type": "ListItem", position: 3, name: "Nightlife", item: `${SITE}/ibiza/nightlife` },
        ],
      },
      ...NIGHTLIFE.map((n) => ({
        "@type": "NightClub",
        name: n.name,
        description: n.description,
        address: { "@type": "PostalAddress", addressLocality: "Ibiza", addressCountry: "ES" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: n.rating, reviewCount: n.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function IbizaNightlife() {
  return (
    <CityGuideShell
      citySlug="ibiza"
      cityName="Ibiza"
      categories={IBIZA_CATEGORIES}
      active="nightlife"
      crumb="Nightlife"
      h1="Ibiza Nightlife: The World's Clubbing Capital"
      heroImage={HERO}
      intro="Nightlife is the reason Ibiza is famous the world over. Since the 1970s the island has been the global capital of clubbing, and every summer its superclubs — Pacha, Amnesia, Ushuaïa, Hï Ibiza, DC-10 and more — host the biggest DJs on earth to crowds that fly in from everywhere. From the glamour of Pacha's terrace to the raw underground of DC-10's Circoloco and the open-air spectacle of Ushuaïa, here is the definitive guide to a night out on the White Isle, with entry prices, line-ups and insider tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={NIGHTLIFE} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Ibiza clubs & nightlife in detail" items={NIGHTLIFE} />
    </CityGuideShell>
  );
}
