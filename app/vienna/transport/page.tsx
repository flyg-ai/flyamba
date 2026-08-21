import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { TRANSPORT, CATEGORIES } from "@/app/data/vienna-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Transport in Vienna 2026 — Getting Around Guide | Flyamba",
  description:
    "How to get around Vienna — the S7 and CAT trains from the airport, the five-line U-Bahn metro, trams and buses, tickets and the Vienna City Card, and…",
  alternates: { canonical: `${SITE}/vienna/transport` },
  openGraph: { title: "Getting Around Vienna | Flyamba", description: "Vienna transport explained: airport trains, metro, trams, tickets and taxis, with prices.", type: "article" },
};


export default function ViennaTransport() {
  return (
    <CityGuideShell
      citySlug="vienna"
      cityName="Vienna"
      categories={CATEGORIES}
      active="transport"
      crumb="Transport"
      h1="Getting Around Vienna"
      heroImage="/images/vienna/sevardheter/wiener-staatsoper.webp"
      intro="Vienna has one of the best public-transport systems in the world, and the compact old town is a joy to walk — so getting around is easy and cheap. This guide covers everything: how to get in from the airport on the S7 and CAT trains, how the five-line U-Bahn metro and the extensive trams and buses work (and why the Ring trams double as a sightseeing tour), which ticket or pass is best value, and when a taxi or ride-hailing app makes sense, all with real routes, prices and practical advice."
      wide
    >
      <CategorySeoSections heading="Vienna transport explained" items={TRANSPORT} />
    </CityGuideShell>
  );
}
