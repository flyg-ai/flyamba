import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { EVENTS, PALMA_CATEGORIES } from "@/app/data/palma-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Palma Events & Festivals 2026 — Guide | Flyamba",
  description:
    "Palma de Mallorca's festivals and events month by month — the huge Sant Sebastià bonfires in January, Semana Santa processions, September's Nit de l'Art, summer concerts and sailing, and the Three Kings parade.",
  alternates: { canonical: `${SITE}/palma/events` },
  openGraph: { title: "Palma Events & Festivals | Flyamba", description: "Festivals, concerts and celebrations in Palma month by month.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Palma", item: `${SITE}/palma` },
      { "@type": "ListItem", position: 3, name: "Events", item: `${SITE}/palma/events` },
    ],
  };
}

export default function PalmaEvents() {
  return (
    <CityGuideShell
      citySlug="palma"
      cityName="Palma"
      categories={PALMA_CATEGORIES}
      active="events"
      crumb="Events"
      h1="Palma Events & Festivals"
      heroImage="/images/content/photo-1533174072545-7a4b6ad7a6c3.avif"
      intro="Palma has a lively calendar of festivals and events all year round, and timing your visit to catch one adds a memorable local dimension to a trip. The city's own patron festival of Sant Sebastià fills the streets with bonfires and free concerts each January, Holy Week brings solemn old-town processions, September's Nit de l'Art turns the galleries into a party, and summer packs in courtyard concerts, fiestas and world-class sailing. Here are the events worth planning around, with dates and details."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Palma's festivals and events in detail" items={EVENTS} />
    </CityGuideShell>
  );
}
