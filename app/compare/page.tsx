import type { Metadata } from "next";
import { Suspense } from "react";
import { CompareClient } from "./CompareClient";
import { comparableFareMap } from "./comparable-fares";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Compare Destinations — Price, Weather & Flight Time",
  description:
    "Can't decide? Compare up to 4 destinations side by side — flight prices, flight time, best months to visit, weather and airlines. Powered by Flyamba.",
  alternates: { canonical: `${SITE}/compare` },
  openGraph: {
    title: "Compare Destinations | Flyamba",
    description: "Compare up to 4 destinations side by side — price, weather, flight time and more.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

// fare-display reads Supabase with cache: "no-store"; force-static keeps this
// prerendered and revalidate keeps the prices from freezing at build time.
export const dynamic = "force-static";
export const revalidate = 86400;

export default async function ComparePage() {
  // Read on the server, passed down as a plain object — see the note in
  // comparable-fares.ts for why the client cannot fetch this itself.
  const fares = await comparableFareMap();
  // useSearchParams (in CompareClient) needs a Suspense boundary.
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <CompareClient fares={fares} />
    </Suspense>
  );
}
