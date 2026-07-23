"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CategoryCard } from "@/app/components/CategoryCard";

export type CategoryFilter = { label: string; keys: string[] };

/**
 * Interactive explorer for a Barcelona category: a row of filter pills, a
 * name search box, and a responsive grid of CategoryCards (3/2/1 columns).
 * Filtering is client-side over `filterKeys`; all items stay in the DOM's
 * long-form SEO section below regardless of the active filter.
 */
export function CategoryExplorer({ items, filters }: { items: BcnPlace[]; filters: CategoryFilter[] }) {
  const [active, setActive] = useState(filters[0]?.label ?? "All");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const cfg = filters.find((f) => f.label === active) ?? filters[0];
    const q = query.trim().toLowerCase();
    return items.filter((it) => {
      const matchesFilter = !cfg || cfg.keys.length === 0 || cfg.keys.some((k) => it.filterKeys.includes(k));
      const matchesQuery = !q || it.name.toLowerCase().includes(q) || it.area.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [items, filters, active, query]);

  return (
    <div className="not-prose">
      {/* Search */}
      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or area…"
          className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
        />
      </div>

      {/* Filter pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((f) => {
          const isActive = f.label === active;
          return (
            <button
              key={f.label}
              type="button"
              onClick={() => setActive(f.label)}
              aria-pressed={isActive}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                isActive
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-accent hover:text-accent"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((it) => (
            <CategoryCard key={it.slug} place={it} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-card/40 px-6 py-12 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            No matches — try a different filter or search term.
          </p>
        </div>
      )}
    </div>
  );
}
