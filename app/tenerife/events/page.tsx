import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { EVENTS, CATEGORIES } from "@/app/data/tenerife-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Tenerife Events & Festivals 2026 — Carnival & Fiestas | Flyamba",
  description:
    "Tenerife's best events and festivals: the world-famous February Carnival of Santa Cruz, La Orotava's flower carpets, La Laguna's fiestas and Holy Week, Garachico's pilgrimage, Christmas parades and Teide stargazing.",
  alternates: { canonical: `${SITE}/tenerife/events` },
  openGraph: { title: "Tenerife Events & Festivals | Flyamba", description: "Carnival, flower carpets and island fiestas month by month.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Tenerife", item: `${SITE}/tenerife` },
      { "@type": "ListItem", position: 3, name: "Events", item: `${SITE}/tenerife/events` },
    ],
  };
}

export default function TenerifeEvents() {
  return (
    <CityGuideShell
      citySlug="tenerife"
      cityName="Tenerife"
      categories={CATEGORIES}
      active="events"
      crumb="Events"
      h1="Tenerife Events & Festivals"
      heroImage="/images/tenerife/sevardheter/candelaria-basilikan.webp"
      intro="Tenerife's calendar is packed with colour, faith and fireworks — headlined by the spectacular February Carnival of Santa Cruz, one of the biggest on Earth. Beyond it come La Orotava's astonishing flower-and-sand carpets, atmospheric Holy Week processions, lively town fiestas, traditional pilgrimages and magical Christmas parades. Here are the events worth timing your trip around, with dates and tips."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Tenerife events in detail" items={EVENTS} />
    </CityGuideShell>
  );
}
