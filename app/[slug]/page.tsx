import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDestination, destinations } from "@/app/data/destinations";
import { ALL_DESTINATIONS, getAllDestination } from "@/app/data/all-destinations";
import { DestinationDetail } from "@/app/components/DestinationDetail";
import { DestinationLite } from "@/app/components/DestinationLite";
import { SITE, airlineNames, lowestPriceStr } from "@/app/lib/destination-helpers";
import { usdStr } from "@/app/lib/format";

// Static routes that must NOT be produced by this catch-all (they have their own
// pages). Barcelona has the full static /barcelona guide with a sub-nav.
const RESERVED = new Set(["barcelona", "about", "compare", "explore"]);

// Every rich destination plus every ported catalog destination gets a static page.
export function generateStaticParams() {
  const slugs = new Set<string>();
  for (const d of destinations) if (!RESERVED.has(d.slug)) slugs.add(d.slug);
  for (const d of ALL_DESTINATIONS) if (!RESERVED.has(d.slug)) slugs.add(d.slug);
  return [...slugs].map((slug) => ({ slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const year = new Date().getFullYear();

  const rich = getDestination(slug);
  if (rich) {
    const title = `Cheap Flights to ${rich.city} ${year} — Compare & Book | Flyamba`;
    const description = `Find cheap flights to ${rich.city}, ${rich.country}. Compare prices from ${airlineNames(rich)
      .slice(0, 3)
      .join(", ")}, view price calendar and book direct. Flights from ${lowestPriceStr(rich)}.`;
    const canonical = `${SITE}/${rich.slug}`;
    return {
      title,
      description,
      alternates: { canonical },
      openGraph: { title, description, url: canonical, type: "website", images: [rich.image] },
      twitter: { card: "summary_large_image", images: [rich.image] },
    };
  }

  const d = getAllDestination(slug);
  if (!d) return { title: "Destination not found — Flyamba", robots: { index: false } };
  const validPrices = d.monthlyPrices.filter((p): p is number => p != null);
  const from = validPrices.length ? ` from ${usdStr(Math.min(...validPrices))}` : "";
  const title = `Cheap Flights to ${d.name} ${year} — Compare & Book | Flyamba`;
  const description = `Find cheap flights to ${d.name}, ${d.country}${from}. Compare live fares, see the monthly price calendar and book direct with Flyamba.`;
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

  const rich = getDestination(slug);
  if (rich) return <DestinationDetail d={rich} />;

  const d = getAllDestination(slug);
  if (!d) notFound();
  return <DestinationLite d={d} />;
}
