import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { TRANSPORT, CATEGORIES } from "@/app/data/dubai-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Transport in Dubai 2026 — Getting Around Guide | Flyamba",
  description:
    "How to get around Dubai — from DXB airport to the city, the driverless Metro, the Tram, taxis and Careem/Uber, the Nol card and fares, and the…",
  alternates: { canonical: `${SITE}/dubai/transport` },
  openGraph: { title: "Getting Around Dubai | Flyamba", description: "Dubai transport explained: airport, Metro, taxis, the Nol card and abras, with prices.", type: "article" },
};


export default function DubaiTransport() {
  return (
    <CityGuideShell
      citySlug="dubai"
      cityName="Dubai"
      categories={CATEGORIES}
      active="transport"
      crumb="Transport"
      h1="Getting Around Dubai"
      heroImage="/images/dubai/attractions/dubai-marina.webp"
      intro="Dubai is large, spread out and built for the car, but getting around is easier and cheaper than first-time visitors expect. A driverless, spotless Metro links the airport, Downtown, the malls and the Marina; the Tram fills in the Marina and Palm; metered taxis and the Careem and Uber apps are affordable and everywhere; and the traditional 1-dirham abra still ferries passengers across the historic Creek. This guide covers every option with real routes, fares in dirhams and dollars, and practical advice — including the all-important Nol card."
      wide
    >
      <CategorySeoSections heading="Dubai transport explained" items={TRANSPORT} />
    </CityGuideShell>
  );
}
