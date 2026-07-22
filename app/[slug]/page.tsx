import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDestination, destinations } from "@/app/data/destinations";
import { DestinationDetail } from "@/app/components/DestinationDetail";
import { SITE, airlineNames, lowestPriceStr } from "@/app/lib/destination-helpers";

// All destinations except Barcelona (which has its own static /barcelona route
// with the full guide sub-nav).
export function generateStaticParams() {
  return destinations.filter((d) => d.slug !== "barcelona").map((d) => ({ slug: d.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) return { title: "Destination not found — Flyamba", robots: { index: false } };
  const year = new Date().getFullYear();
  const title = `Cheap Flights to ${d.city} ${year} — Compare & Book | Flyamba`;
  const description = `Find cheap flights to ${d.city}, ${d.country}. Compare prices from ${airlineNames(d)
    .slice(0, 3)
    .join(", ")}, view price calendar and book direct. Flights from ${lowestPriceStr(d)}.`;
  const canonical = `${SITE}/${d.slug}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website", images: [d.image] },
    twitter: { card: "summary_large_image", images: [d.image] },
  };
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) notFound();
  return <DestinationDetail d={d} />;
}
