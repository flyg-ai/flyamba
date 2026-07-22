import type { Metadata } from "next";
import { Suspense } from "react";
import { CompareClient } from "./CompareClient";

export const metadata: Metadata = {
  title: "Compare Destinations — Price, Weather & Flight Time | Flyamba",
  description:
    "Can't decide? Compare up to 4 destinations side by side — flight prices, flight time, best months to visit, weather and airlines. Powered by Flyamba.",
  openGraph: {
    title: "Compare Destinations | Flyamba",
    description: "Compare up to 4 destinations side by side — price, weather, flight time and more.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function ComparePage() {
  // useSearchParams (in CompareClient) needs a Suspense boundary.
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <CompareClient />
    </Suspense>
  );
}
