import { Plane, ArrowRight } from "lucide-react";
import { BARCELONA_KIWI_CTA } from "@/app/lib/barcelona";

/** Prominent "Find flights to Barcelona" CTA (Kiwi affiliate deep link). */
export function FlightCTA({
  label = "Find flights to Barcelona",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div className={`rounded-3xl border border-border bg-gradient-to-br from-accent/10 via-card to-card p-8 text-center sm:p-10 ${className}`}>
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-accent text-accent-foreground shadow-glow">
        <Plane className="h-6 w-6 -rotate-45" />
      </div>
      <h2 className="mt-5 font-serif text-2xl font-semibold text-foreground sm:text-3xl">Ready to go?</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        Compare live fares across airlines and book direct — Barcelona from around $128.
      </p>
      <a
        href={BARCELONA_KIWI_CTA}
        target="_blank"
        rel="noopener sponsored"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-glow transition hover:scale-105"
      >
        {label} <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}
