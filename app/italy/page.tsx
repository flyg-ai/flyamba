import type { Metadata } from "next";
import { CountryPage, countryMetadata } from "@/app/lib/country-page";

// Thin by design — country-page.tsx explains why this is a folder per country
// rather than one dynamic segment.
const COUNTRY = "Italy";

// climate.ts and fares.ts read Supabase with cache: "no-store", which would
// otherwise mark this route dynamic.
export const dynamic = "force-static";
export const revalidate = 86400;

export const metadata: Metadata = countryMetadata(COUNTRY);

export default function Page() {
  return <CountryPage country={COUNTRY} />;
}
