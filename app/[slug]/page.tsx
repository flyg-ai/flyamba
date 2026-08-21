import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDestination, destinations } from "@/app/data/destinations";
import { ALL_DESTINATIONS, getAllDestination } from "@/app/data/all-destinations";
import { DestinationDetail } from "@/app/components/DestinationDetail";
import { DestinationLite } from "@/app/components/DestinationLite";
import { SITE, airlineNames, lowestPriceStr } from "@/app/lib/destination-helpers";
import { usdStr } from "@/app/lib/format";
import { clampDescription, clampTitle } from "@/app/lib/seo";
import { fareFor } from "@/app/lib/fare-display";

// Static routes that must NOT be produced by this catch-all (they have their own
// pages). Barcelona has the full static /barcelona guide with a sub-nav.
const RESERVED = new Set([
  "barcelona", "about", "compare", "explore",
  // Cities with their own full static hub + subpages (must not be produced by
  // the catch-all). rome/prague/athens/tenerife use distinct English slugs that
  // aren't in the ported catalog, so they don't collide and aren't listed here.
  "london", "paris", "amsterdam", "lisbon", "tokyo", "bangkok", "palma", "ibiza", "santorini",
  // Cities that now use English catalog slugs AND have a full static hub — reserve
  // so the catch-all doesn't emit a page that conflicts with the hub route.
  "rome", "prague", "athens", "tenerife",
  "dubrovnik", "dubai", "cancun",
  "marrakech", "vienna", "florence", "phuket", "singapore",
  // Ported full hubs (from flyg.ai) that also exist as catalog lite entries.
  "madrid", "mykonos", "new-york", "bali", "cape-town", "reykjavik",
]);

// Every rich destination plus every ported catalog destination gets a static page.
export function generateStaticParams() {
  const slugs = new Set<string>();
  for (const d of destinations) if (!RESERVED.has(d.slug)) slugs.add(d.slug);
  for (const d of ALL_DESTINATIONS) if (!RESERVED.has(d.slug)) slugs.add(d.slug);
  return [...slugs].map((slug) => ({ slug }));
}
export const dynamicParams = false;
// fare-display reads Supabase with cache: "no-store". Without force-static that
// read is a dynamic-server-usage error, fares.ts swallows it, and every one of
// these 556 pages renders with NO price while the build reports success — the
// silent failure CLAUDE.md warns about, hit for the third time.
export const dynamic = "force-static";
export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const year = new Date().getFullYear();

  const rich = getDestination(slug);
  if (rich) {
    const title = clampTitle(`Cheap Flights to ${rich.city} ${year} — Compare & Book | Flyamba`);
    const description = clampDescription(
      `Find cheap flights to ${rich.city}, ${rich.country}. Compare prices from ${airlineNames(rich)
        .slice(0, 3)
        .join(", ")}, view price calendar and book direct. Flights from ${lowestPriceStr(rich)}.`,
    );
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
  // Observed fare or no price at all. This used to read the catalog estimate,
  // which put a Stockholm SEK figure in the meta description of 556 pages.
  const fare = await fareFor(d.slug);
  const from = fare ? ` from ${fare.amount} round trip` : "";
  const title = clampTitle(`Cheap Flights to ${d.name} ${year} — Compare & Book | Flyamba`);
  // Country-level entries (Cape Verde, Barbados, Monaco…) would otherwise read
  // "Cape Verde, Cape Verde".
  const place = d.name === d.country ? d.name : `${d.name}, ${d.country}`;
  const description = clampDescription(
    `Find cheap flights to ${place}${from}. Compare live fares, see the fares we found by month and book direct with Flyamba.`,
  );
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
