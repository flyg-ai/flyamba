import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { EVENTS, CATEGORIES } from "@/app/data/marrakech-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Marrakech Events & Festivals 2026 — Guide | Flyamba",
  description:
    "Marrakech's biggest events and festivals — the December International Film Festival, Ramadan and Eid, the Marrakech du Rire comedy festival, the Rose Festival and the January marathon.",
  alternates: { canonical: `${SITE}/marrakech/events` },
  openGraph: { title: "Marrakech Events & Festivals | Flyamba", description: "The film festival, Ramadan, comedy, the Rose Festival and the marathon, month by month.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Marrakech", item: `${SITE}/marrakech` },
      { "@type": "ListItem", position: 3, name: "Events", item: `${SITE}/marrakech/events` },
    ],
  };
}

export default function MarrakechEvents() {
  return (
    <CityGuideShell
      citySlug="marrakech"
      cityName="Marrakech"
      categories={CATEGORIES}
      active="events"
      crumb="Events"
      h1="Marrakech Events & Festivals"
      heroImage="/images/marrakech/sevardheter/el-badi-palace.webp"
      intro="Marrakech's calendar mixes glamour, faith, laughter and sport. December brings the glittering International Film Festival, with stars on the red carpet and free films projected onto Jemaa el-Fnaa; the holy month of Ramadan reshapes the rhythm of the city into quiet fasting days and festive evenings; June fills the streets with the Marrakech du Rire comedy festival; the Dadès Valley celebrates its rose harvest in May; and January draws runners to a scenic marathon in ideal winter weather. This guide covers the events worth timing a visit around — or planning to avoid the price spikes of — with dates, what to expect and practical, respectful advice."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Marrakech events & festivals in detail" items={EVENTS} />
    </CityGuideShell>
  );
}
