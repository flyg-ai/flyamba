import type { Metadata } from "next";
import { GuideShell } from "@/app/components/GuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { SHOPPING } from "@/app/data/barcelona-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Shopping in Barcelona 2026 — Best Areas & Stores | Flyamba",
  description:
    "Where to shop in Barcelona: luxury on Passeig de Gràcia, independent El Born boutiques, the Boqueria and Sant Antoni markets, vintage finds and souvenirs.",
  alternates: { canonical: `${SITE}/barcelona/shopping` },
  openGraph: { title: "Shopping in Barcelona | Flyamba", description: "Best shopping areas, markets and stores in Barcelona.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Local", keys: ["local"] },
  { label: "Markets", keys: ["markets"] },
  { label: "Souvenirs", keys: ["souvenirs"] },
];

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
    { "@type": "ListItem", position: 2, name: "Barcelona", item: `${SITE}/barcelona` },
    { "@type": "ListItem", position: 3, name: "Shopping", item: `${SITE}/barcelona/shopping` },
  ],
};

export default function BarcelonaShopping() {
  return (
    <GuideShell
      active="shopping"
      crumb="Shopping"
      h1="Shopping in Barcelona"
      heroImage="/images/content/photo-1483985988355-763728e1935b.avif"
      intro="Barcelona is one of Europe's great shopping cities — a place where flagship luxury boutiques on a modernista boulevard sit minutes from medieval lanes full of independent designers, and where century-old food markets outshine any mall. Whether you're after Spanish fashion, local craft, vintage finds or edible souvenirs, here's where to go, area by area."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={SHOPPING} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Where to shop in Barcelona — in detail" items={SHOPPING} />
    </GuideShell>
  );
}
