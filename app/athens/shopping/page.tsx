import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { SHOPPING, CATEGORIES } from "@/app/data/athens-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Shopping in Athens 2026 — Markets & Boutiques Guide | Flyamba",
  description:
    "Where to shop in Athens — Ermou Street's high street, the Monastiraki flea market, Kolonaki boutiques, the Central Market and Plaka's craft and sandal shops, with tips and hours.",
  alternates: { canonical: `${SITE}/athens/shopping` },
  openGraph: { title: "Shopping in Athens | Flyamba", description: "Markets, boutiques, antiques and souvenirs in Athens.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Markets", keys: ["market"] },
  { label: "High street", keys: ["highstreet"] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Souvenirs", keys: ["souvenirs"] },
  { label: "Local", keys: ["local"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Athens", item: `${SITE}/athens` },
          { "@type": "ListItem", position: 3, name: "Shopping", item: `${SITE}/athens/shopping` },
        ],
      },
      ...SHOPPING.map((s) => ({
        "@type": "Place",
        name: s.name,
        description: s.description,
        address: { "@type": "PostalAddress", addressLocality: "Athens", addressCountry: "GR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: s.rating, reviewCount: s.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function AthensShopping() {
  return (
    <CityGuideShell
      citySlug="athens"
      cityName="Athens"
      categories={CATEGORIES}
      active="shopping"
      crumb="Shopping"
      h1="Shopping in Athens"
      heroImage="/images/content/photo-1483985988355-763728e1935b.avif"
      intro="Shopping in Athens runs from the raucous to the refined. Pedestrianised Ermou Street lines up the international high-street names, the Monastiraki flea market spills antiques and vintage across its lanes, chic Kolonaki holds Greek designers and luxury labels, and the Central Market is a full-throttle slice of working Athens. Here are 7 of the best places to shop — plus where to find genuine Greek craft rather than mass-made trinkets — with hours and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={SHOPPING} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Athens shopping in detail" items={SHOPPING} />
    </CityGuideShell>
  );
}
