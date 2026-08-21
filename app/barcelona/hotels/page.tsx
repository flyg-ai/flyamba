import type { Metadata } from "next";
import { GuideShell } from "@/app/components/GuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { HOTELS } from "@/app/data/barcelona-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Hotels in Barcelona 2026 — Where to Stay | Flyamba",
  description:
    "Where to stay in Barcelona — beachfront luxury towers, boutique townhouses, design hotels and great-value stays, by neighborhood and budget, with rates…",
  alternates: { canonical: `${SITE}/barcelona/hotels` },
  openGraph: { title: "Where to Stay in Barcelona | Flyamba", description: "Barcelona neighborhoods and hotels by budget.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Boutique", keys: ["boutique"] },
  { label: "Budget", keys: ["budget"] },
  { label: "Beachfront", keys: ["beachfront"] },
];


export default function BarcelonaHotels() {
  return (
    <GuideShell
      active="hotels"
      crumb="Hotels"
      h1="Where to Stay in Barcelona"
      heroImage="/images/content/photo-1566073771259-6a8506099945.avif"
      intro="Barcelona is compact and superbly connected, so almost any central neighborhood puts you within a short metro ride of the sights. The bigger question is what kind of trip you want: grand modernista boulevards, medieval lanes, beach life or a local village feel. Here are the best hotels across every budget, with the area and vibe of each."
      wide
    >
      <div className="mt-8">
        <CategoryExplorer items={HOTELS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Where to stay in Barcelona — in detail" items={HOTELS} />
    </GuideShell>
  );
}
