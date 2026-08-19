import Link from "next/link";
import { MONTHS, warmHref } from "@/app/where-is-it-warm/months";

/**
 * Twelve month pills above the destination grid. The page's own month is the
 * filled pill and is not a link; the rest navigate to sibling month pages.
 * Horizontally scrollable on mobile, wrapping from sm up.
 */
export function MonthSelector({ current }: { current: string }) {
  return (
    <nav
      aria-label="Choose a month"
      className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:overflow-x-visible sm:px-0"
    >
      {MONTHS.map((m) => {
        const active = m.slug === current;
        const base =
          "shrink-0 scroll-ml-4 rounded-full border px-4 py-2 text-sm font-semibold transition-all";
        if (active) {
          return (
            <span
              key={m.slug}
              aria-current="page"
              className={`${base} border-accent bg-accent text-accent-foreground`}
            >
              <span className="sm:hidden">{m.short}</span>
              <span className="hidden sm:inline">{m.label}</span>
            </span>
          );
        }
        return (
          <Link
            key={m.slug}
            href={warmHref(m.slug)}
            className={`${base} border-border bg-card text-muted-foreground hover:-translate-y-0.5 hover:border-accent hover:text-accent`}
          >
            <span className="sm:hidden">{m.short}</span>
            <span className="hidden sm:inline">{m.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
