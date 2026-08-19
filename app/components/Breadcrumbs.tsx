import Link from "next/link";
import { SITE } from "@/app/lib/destination-helpers";

export type Crumb = { name: string; href?: string };

/**
 * Visible breadcrumb + BreadcrumbList JSON-LD.
 *
 * `onDark` is required whenever this sits over a hero image. The default colours
 * are tuned for the page background: the current-page crumb is
 * `--muted-foreground` (#4A4A6A), which measures **2.48:1 against pure black** and
 * 1.74:1 against a mid-dark photo — under the 4.5:1 WCAG AA needs for body text,
 * so the last crumb was effectively invisible on every hero page.
 *
 * Wrapping the component in a `text-white` container does not fix it; the classes
 * here set colour explicitly and win. GuideShell and CityGuideShell both did
 * exactly that and both were affected.
 */
export function Breadcrumbs({ items, onDark = false }: { items: Crumb[]; onDark?: boolean }) {
  // Both the link and the current crumb go white on a hero, not just the muted one.
  // Accent orange measures 7.41:1 against pure black, which is what made it look
  // safe — but the gradient over the hero is only ~0.25–0.45 alpha at the height
  // the breadcrumb sits at, so the real backdrop is a darkened photo rather than
  // black. Sampled on /where-is-it-warm that backdrop is rgb(92,86,81), where the
  // orange measures 2.55:1. White measures 7.24:1 on the same pixel.
  //
  // Links keep an underline so they stay distinguishable from the current crumb
  // once both are the same colour.
  const linkClass = onDark
    ? "text-white underline decoration-white/40 underline-offset-4 transition hover:decoration-white"
    : "text-accent transition hover:underline";
  // Full white, not white/85: the translucent form composites differently over
  // every photo, so the ratio stops being something you can state once and trust.
  const currentClass = onDark ? "text-white" : "text-muted-foreground";
  const sepClass = onDark ? "text-white/60" : "text-muted-foreground/50";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      ...(c.href ? { item: `${SITE}${c.href}` } : {}),
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm font-medium">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      {items.map((c, i) => (
        <span key={c.name} className="flex items-center gap-1.5">
          {c.href ? (
            <Link href={c.href} className={linkClass}>
              {c.name}
            </Link>
          ) : (
            <span className={currentClass}>{c.name}</span>
          )}
          {i < items.length - 1 && <span className={sepClass}>›</span>}
        </span>
      ))}
    </nav>
  );
}
