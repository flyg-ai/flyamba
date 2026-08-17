import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { SHOPPING, CATEGORIES } from "@/app/data/marrakech-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Shopping in Marrakech 2026 — Souks & Guide | Flyamba",
  description:
    "Where to shop in Marrakech — the trade souks for spices, leather, metalwork and carpets, plus concept stores and fixed-price craft markets, with haggling…",
  alternates: { canonical: `${SITE}/marrakech/shopping` },
  openGraph: { title: "Shopping in Marrakech | Flyamba", description: "The souks by trade plus design boutiques, with haggling tips and fair prices.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Souks", keys: ["souk"] },
  { label: "Crafts", keys: ["crafts"] },
  { label: "Leather", keys: ["leather"] },
  { label: "Spices", keys: ["spices"] },
  { label: "Design & Boutiques", keys: ["design"] },
  { label: "Fixed price", keys: ["fixed"] },
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
          { "@type": "ListItem", position: 3, name: "Shopping", item: `${SITE}/marrakech/shopping` },
        ],
      },
      ...SHOPPING.map((s) => ({
        "@type": "Place",
        name: s.name,
        description: s.description,
        address: { "@type": "PostalAddress", addressLocality: "Marrakech", addressCountry: "MA" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: s.rating, reviewCount: s.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function MarrakechShopping() {
  return (
    <CityGuideShell
      citySlug="marrakech"
      cityName="Marrakech"
      categories={CATEGORIES}
      active="shopping"
      crumb="Shopping"
      h1="Shopping in Marrakech"
      heroImage="/images/marrakech/shopping/souk-semmarine.webp"
      intro="Marrakech is one of the world's great shopping cities, and its souks are the theatre where it all plays out. Traditionally each trade has its own quarter — spices and perfumes, blacksmiths, woodturners, leatherworkers, carpet dealers — so navigating the maze is half the fun and half the strategy. This guide maps the souks by trade, adds the calmer fixed-price concept stores and craft markets for stress-free browsing, and explains how to haggle, what typical souvenirs should cost, and how to spot quality so you buy well and pay fairly."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={SHOPPING} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Marrakech shopping in detail" items={SHOPPING} />
    </CityGuideShell>
  );
}
