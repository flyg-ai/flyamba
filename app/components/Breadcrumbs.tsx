import Link from "next/link";
import { SITE } from "@/app/lib/destination-helpers";

export type Crumb = { name: string; href?: string };

/** Visible breadcrumb + BreadcrumbList JSON-LD. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
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
            <Link href={c.href} className="text-accent transition hover:underline">
              {c.name}
            </Link>
          ) : (
            <span className="text-muted-foreground">{c.name}</span>
          )}
          {i < items.length - 1 && <span className="text-muted-foreground/50">›</span>}
        </span>
      ))}
    </nav>
  );
}
