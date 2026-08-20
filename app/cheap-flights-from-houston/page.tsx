import type { Metadata } from "next";
import { DeparturePage, departureMetadata } from "@/app/lib/departure-page";

// Thin by design — departure-page.tsx explains why this is a folder per city
// rather than one dynamic segment.
const CITY = "houston";

export const dynamic = "force-static";
export const revalidate = 86400;

export const metadata: Metadata = departureMetadata(CITY);

export default function Page() {
  return <DeparturePage city={CITY} />;
}
