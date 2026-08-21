import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { NIGHTLIFE, CATEGORIES } from "@/app/data/cancun-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Nightlife in Cancún 2026 — Guide | Flyamba",
  description:
    "Cancún nightlife — the legendary Coco Bongo show, the Party Center megaclubs Mandala, Dady'O and Palazzo, beach and pool parties, open-air bars, Señor…",
  alternates: { canonical: `${SITE}/cancun/nightlife` },
  openGraph: { title: "Cancún Nightlife | Flyamba", description: "Cancún's clubs, bars and shows, from Coco Bongo and the Party Center to local salsa, with tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Nightclubs", keys: ["clubs"] },
  { label: "Live Shows", keys: ["shows"] },
  { label: "Beach Clubs", keys: ["beach"] },
  { label: "Bars", keys: ["bars"] },
  { label: "Latin & Salsa", keys: ["latin"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...NIGHTLIFE.map((n) => ({
        "@type": "BarOrPub",
        name: n.name,
        description: n.description,
        address: { "@type": "PostalAddress", addressLocality: "Cancún", addressCountry: "MX" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: n.rating, reviewCount: n.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function CancunNightlife() {
  return (
    <CityGuideShell
      citySlug="cancun"
      cityName="Cancún"
      categories={CATEGORIES}
      active="nightlife"
      crumb="Nightlife"
      h1="Cancún Nightlife"
      heroImage="/images/placeholders/placeholder-nightlife.webp"
      intro="Cancún's nightlife is world-famous, and its epicentre is the Party Center at Km 9 in the Hotel Zone, a tight cluster of megaclubs that comes alive after midnight. Top of every list is Coco Bongo, less a club than a jaw-dropping non-stop show of acrobats, tribute acts and confetti, while Mandala, Dady'O, Palazzo and their neighbours pump out EDM, reggaeton and Latin hits under lasers and open-bar wristbands. Add daytime beach-and-pool parties, cheerful open-air bars, the party-restaurant institution Señor Frog's — and, for something authentic, the local salsa halls downtown where cancunenses actually dance. Here's the full scene, with what each venue is like, prices and tips for a big night out."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={NIGHTLIFE} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Cancún nightlife in detail" items={NIGHTLIFE} />
    </CityGuideShell>
  );
}
