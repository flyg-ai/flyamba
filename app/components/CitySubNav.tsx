import Link from "next/link";

export type CityCategory = { slug: string; label: string; emoji: string };

/** Sticky category tab-nav shared across a city's hub and subpages. `active` is
 *  the subpage slug ("" for the hub). */
export function CitySubNav({ citySlug, categories, active }: { citySlug: string; categories: CityCategory[]; active: string }) {
  const href = (slug: string) => (slug ? `/${citySlug}/${slug}` : `/${citySlug}`);
  return (
    <div className="sticky top-16 z-30 border-y border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((p) => {
          const isActive = p.slug === active;
          return (
            <Link
              key={p.slug || "hub"}
              href={href(p.slug)}
              aria-current={isActive ? "page" : undefined}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                isActive
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-accent hover:text-accent"
              }`}
            >
              <span aria-hidden>{p.emoji}</span>
              {p.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
