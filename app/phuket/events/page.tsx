import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { EVENTS, CATEGORIES } from "@/app/data/phuket-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Phuket Events & Festivals 2026 — Calendar | Flyamba",
  description:
    "Phuket's biggest annual events and festivals — the extraordinary Vegetarian Festival, the Songkran water fight, the beautiful Loy Krathong, Chinese New…",
  alternates: { canonical: `${SITE}/phuket/events` },
  openGraph: { title: "Phuket Events & Festivals | Flyamba", description: "Phuket's annual festival calendar, from the Vegetarian Festival to Songkran, with dates and tips.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Phuket", item: `${SITE}/phuket` },
      { "@type": "ListItem", position: 3, name: "Events", item: `${SITE}/phuket/events` },
    ],
  };
}

export default function PhuketEvents() {
  return (
    <CityGuideShell
      citySlug="phuket"
      cityName="Phuket"
      categories={CATEGORIES}
      active="events"
      crumb="Events"
      h1="Phuket Events & Festivals"
      heroImage="/images/phuket/sevardheter/wat-chalong.webp"
      intro="Phuket's calendar reflects its rich Thai and Chinese heritage, mixing spiritual devotion, exuberant celebration and international sport. The island stages one of Thailand's most extraordinary and intense events in the Vegetarian Festival, erupts into a giant water fight for Songkran, floats candlelit krathongs under the November full moon, dresses its Old Town in lanterns for Chinese New Year, welcomes Asia's premier sailing regatta each December, and honours its ancestors at the Hungry Ghost Festival. Here are the events worth timing a trip around, with dates, locations and tips — note that several follow the lunar calendar, so check the exact dates for your year."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Phuket's annual events in detail" items={EVENTS} />
    </CityGuideShell>
  );
}
