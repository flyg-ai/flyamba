import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { SHOPPING, CATEGORIES } from "@/app/data/florence-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Shopping in Florence 2026 — Guide | Flyamba",
  description:
    "Where to shop in Florence — the leather markets and workshops, the luxury boutiques of Via de' Tornabuoni where Gucci and Ferragamo were born, the…",
  alternates: { canonical: `${SITE}/florence/shopping` },
  openGraph: { title: "Shopping in Florence | Flyamba", description: "Leather, luxury, artisan crafts and markets in Florence, with tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Leather", keys: ["leather"] },
  { label: "Markets", keys: ["markets"] },
  { label: "Artisan", keys: ["boutiques"] },
  { label: "Food", keys: ["food"] },
];


export default function FlorenceShopping() {
  return (
    <CityGuideShell
      citySlug="florence"
      cityName="Florence"
      categories={CATEGORIES}
      active="shopping"
      crumb="Shopping"
      h1="Shopping in Florence"
      heroImage="/images/florence/sevardheter/ponte-vecchio.webp"
      intro="Florence has been a city of craft and commerce since the Middle Ages, and it remains one of the best places in Italy to shop — above all for leather, gold and Italian fashion. This is the city where Gucci and Ferragamo were founded, whose flagships line Via de' Tornabuoni; where haggling over a leather jacket at the San Lorenzo market is a rite of passage; and where artisans in the Oltrarno still make jewellery, marbled paper and bespoke goods by hand. Here is where to shop, from luxury and leather to artisan workshops, an eight-century-old perfumery and the local food markets."
      wide
    >
      <div className="mt-8">
        <CategoryExplorer items={SHOPPING} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Florence shopping in detail" items={SHOPPING} />
    </CityGuideShell>
  );
}
