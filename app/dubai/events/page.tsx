import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { EVENTS, CATEGORIES } from "@/app/data/dubai-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Dubai Events & Festivals 2026 — Calendar | Flyamba",
  description:
    "Dubai's biggest annual events and festivals — the Dubai Shopping Festival, the spectacular New Year's Eve fireworks at the Burj Khalifa, Ramadan and Eid…",
  alternates: { canonical: `${SITE}/dubai/events` },
  openGraph: { title: "Dubai Events & Festivals | Flyamba", description: "Dubai's annual festival calendar, from the Shopping Festival to New Year's Eve, with dates and tips.", type: "article" },
};


export default function DubaiEvents() {
  return (
    <CityGuideShell
      citySlug="dubai"
      cityName="Dubai"
      categories={CATEGORIES}
      active="events"
      crumb="Events"
      h1="Dubai Events & Festivals"
      heroImage="/images/dubai/attractions/global-village.webp"
      intro="Dubai's calendar mixes world-class spectacle with deep-rooted tradition. The city throws the weeks-long Dubai Shopping Festival across the winter, stages one of the planet's most dramatic New Year's Eve firework shows on the Burj Khalifa, marks the holy month of Ramadan and the joyful Eid festivals, runs the world's richest horse race, celebrates its founding on National Day and feasts through the Dubai Food Festival. Here are the events worth timing a trip around, with dates, locations and tips."
      wide
    >
      <CategorySeoSections heading="Dubai's annual events in detail" items={EVENTS} />
    </CityGuideShell>
  );
}
