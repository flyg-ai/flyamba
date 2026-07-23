import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { EVENTS, CATEGORIES } from "@/app/data/rome-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Rome Events & Festivals 2026 — Calendar | Flyamba",
  description:
    "Rome's biggest annual events and festivals — the Natale di Roma birthday parade, Easter and Holy Week at the Vatican, the Estate Romana summer festival, the Rome Film Fest, Republic Day and Christmas, with dates and tips.",
  alternates: { canonical: `${SITE}/rome/events` },
  openGraph: { title: "Rome Events & Festivals | Flyamba", description: "Rome's annual festival calendar, from the city's birthday to Christmas, with dates and tips.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Rome", item: `${SITE}/rome` },
      { "@type": "ListItem", position: 3, name: "Events", item: `${SITE}/rome/events` },
    ],
  };
}

export default function RomeEvents() {
  return (
    <CityGuideShell
      citySlug="rome"
      cityName="Rome"
      categories={CATEGORIES}
      active="events"
      crumb="Events"
      h1="Rome Events & Festivals"
      heroImage="/images/rome/sevardheter/piazza-del-popolo.webp"
      intro="Rome's calendar mixes ancient tradition, religious spectacle and modern culture. The city celebrates its own mythical birthday with costumed legionaries in April, marks Easter with the world's grandest papal ceremonies, turns the whole summer into the open-air Estate Romana festival, rolls out the red carpet for its October film festival, and dresses up beautifully for a long Christmas season. Here are the events worth timing a trip around, with dates, locations and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Rome's annual events in detail" items={EVENTS} />
    </CityGuideShell>
  );
}
