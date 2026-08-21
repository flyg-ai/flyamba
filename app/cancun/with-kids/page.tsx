import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WITH_KIDS, CATEGORIES } from "@/app/data/cancun-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Cancún with Kids 2026 — Family Guide | Flyamba",
  description:
    "The best things to do in Cancún with kids — Ventura Park's water and adventure rides, the interactive aquarium, swimming with dolphins, the hands-on…",
  alternates: { canonical: `${SITE}/cancun/with-kids` },
  openGraph: { title: "Cancún with Kids | Flyamba", description: "Family-friendly Cancún — water parks, aquariums, dolphins, zoos and calm beaches, with ages and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Water Parks", keys: ["water"] },
  { label: "Animals", keys: ["animals"] },
  { label: "Eco Parks", keys: ["parks"] },
  { label: "Beaches", keys: ["beaches"] },
  { label: "Rainy Day", keys: ["rainy"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...WITH_KIDS.map((k) => ({
        "@type": "TouristAttraction",
        name: k.name,
        description: k.description,
        address: { "@type": "PostalAddress", addressLocality: "Cancún", addressCountry: "MX" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: k.rating, reviewCount: k.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function CancunWithKids() {
  return (
    <CityGuideShell
      citySlug="cancun"
      cityName="Cancún"
      categories={CATEGORIES}
      active="with-kids"
      crumb="With Kids"
      h1="Cancún with Kids"
      heroImage="/images/placeholders/placeholder-with-kids.webp"
      intro="Cancún is a brilliant family destination, and there's far more for children than the resort pool. The Hotel Zone has its own water-and-adventure theme park at Ventura Park and an interactive aquarium tucked inside the La Isla mall, while the Riviera Maya's great eco-parks — Xcaret and Xel-Há — turn snorkelling, underground rivers and wildlife into a full, easy family day out. Add swimming with dolphins off Isla Mujeres, the wonderfully hands-on Croco Cun Zoo where kids hold baby crocodiles, and the calm, shallow beaches of the northern strip that are made for little ones. Here are the best family attractions, with suitable ages, prices and practical tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={WITH_KIDS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Cancún with kids in detail" items={WITH_KIDS} />
    </CityGuideShell>
  );
}
