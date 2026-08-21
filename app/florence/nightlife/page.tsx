import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { NIGHTLIFE, CATEGORIES } from "@/app/data/florence-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Nightlife in Florence 2026 — Guide | Flyamba",
  description:
    "Florence after dark — the best wine bars and aperitivo spots, rooftop cocktail bars over the Ponte Vecchio, hidden speakeasies and the buzzing squares of…",
  alternates: { canonical: `${SITE}/florence/nightlife` },
  openGraph: { title: "Florence Nightlife | Flyamba", description: "Wine bars, rooftops, cocktails and the Oltrarno scene, with tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Wine bars", keys: ["wine"] },
  { label: "Aperitivo", keys: ["aperitivo"] },
  { label: "Cocktails", keys: ["cocktails"] },
  { label: "Rooftops", keys: ["rooftop"] },
];


export default function FlorenceNightlife() {
  return (
    <CityGuideShell
      citySlug="florence"
      cityName="Florence"
      categories={CATEGORIES}
      active="nightlife"
      crumb="Nightlife"
      h1="Florence After Dark"
      heroImage="/images/florence/sevardheter/piazzale-michelangelo-utsikt.webp"
      intro="Florence is not a wild, clubbing city — its evenings are about aperitivo, wine and atmosphere rather than dancing until dawn. This is a place to sip a Tuscan red in a historic wine bar, watch the sun set over the Ponte Vecchio from a rooftop, hunt down a hidden speakeasy, or join the young, bohemian crowd on the church steps of Piazza Santo Spirito in the Oltrarno. Here are the best places for a drink after dark, from truffle-panini institutions to creative cocktail bars, with areas, prices and tips."
      wide
    >
      <div className="mt-8">
        <CategoryExplorer items={NIGHTLIFE} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Florence nightlife in detail" items={NIGHTLIFE} />
    </CityGuideShell>
  );
}
