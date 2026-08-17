import Link from "next/link";
import { CalendarRange, ArrowRight } from "lucide-react";
import { lowFareHref } from "@/app/lib/low-fare";

/**
 * Cross-link from a destination page into its low fare calendar. Rendered next
 * to the flight search on every hub and on the [slug] catch-all.
 */
export function LowFareCta({ slug, city }: { slug: string; city: string }) {
  return (
    <div className="mt-6 flex flex-col items-start gap-4 rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/12 to-accent/[0.04] p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent/20 text-accent">
          <CalendarRange className="h-5 w-5" />
        </span>
        <div>
          <p className="font-serif text-lg font-semibold text-foreground">
            Cheapest days to fly to {city}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Compare prices day by day and find the cheapest dates
          </p>
        </div>
      </div>
      <Link
        href={lowFareHref(slug)}
        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-glow transition hover:scale-105"
      >
        View Low Fare Calendar <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
