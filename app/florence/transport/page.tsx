import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { TRANSPORT, CATEGORIES } from "@/app/data/florence-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Transport in Florence 2026 — Guide | Flyamba",
  description:
    "Getting around Florence — the T2 tram from the airport, reaching the city from Pisa airport, the walkable historic centre, trams and buses, day-trip…",
  alternates: { canonical: `${SITE}/florence/transport` },
  openGraph: { title: "Getting Around Florence | Flyamba", description: "Florence transport explained: airports, trams, trains, taxis and the ZTL, with prices.", type: "article" },
};


export default function FlorenceTransport() {
  return (
    <CityGuideShell
      citySlug="florence"
      cityName="Florence"
      categories={CATEGORIES}
      active="transport"
      crumb="Transport"
      h1="Getting Around Florence"
      heroImage="/images/florence/sevardheter/ponte-vecchio.webp"
      intro="The single most important thing to know about getting around Florence is that you barely need to: the compact historic centre is best explored entirely on foot, with almost every sight within a 15-minute walk and no metro to bother with. Where you will need to plan is arriving — from Florence's own airport on the T2 tram, or from Pisa airport by shuttle and train — and heading out on day trips by train from Santa Maria Novella station. This guide covers everything with real routes, ticket prices and practical advice, including the crucial warning never to drive into the ZTL."
      wide
    >
      <CategorySeoSections heading="Florence transport explained" items={TRANSPORT} />
    </CityGuideShell>
  );
}
