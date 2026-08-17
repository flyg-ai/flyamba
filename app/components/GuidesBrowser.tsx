"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import type { Guide } from "@/app/data/guides";

export type GuideCard = Pick<
  Guide,
  "slug" | "title" | "excerpt" | "category" | "readTime" | "image" | "destination"
> & { href: string; destinationLabel: string | null };

const ALL = "All";

/**
 * Guide grid with destination and category filters.
 *
 * Both filter sets are derived from the guides passed in rather than hardcoded,
 * so a filter can never render with nothing behind it.
 */
export function GuidesBrowser({ guides }: { guides: GuideCard[] }) {
  const [destination, setDestination] = useState(ALL);
  const [category, setCategory] = useState(ALL);

  const destinations = useMemo(() => {
    const labels = new Map<string, string>();
    for (const g of guides) if (g.destination && g.destinationLabel) labels.set(g.destination, g.destinationLabel);
    return [...labels.entries()].sort((a, b) => a[1].localeCompare(b[1]));
  }, [guides]);

  const categories = useMemo(
    () => [...new Set(guides.map((g) => g.category))].sort(),
    [guides],
  );

  const shown = useMemo(
    () =>
      guides.filter(
        (g) =>
          (destination === ALL || g.destination === destination) &&
          (category === ALL || g.category === category),
      ),
    [guides, destination, category],
  );

  const pill = (active: boolean) =>
    `shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
      active
        ? "border-accent bg-accent text-accent-foreground"
        : "border-border bg-card text-muted-foreground hover:border-accent hover:text-accent"
    }`;

  return (
    <div>
      <div className="space-y-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Destination
          </p>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:px-0">
            <button type="button" className={pill(destination === ALL)} onClick={() => setDestination(ALL)}>
              All
            </button>
            {destinations.map(([slug, label]) => (
              <button
                key={slug}
                type="button"
                className={pill(destination === slug)}
                onClick={() => setDestination(slug)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Topic</p>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:px-0">
            <button type="button" className={pill(category === ALL)} onClick={() => setCategory(ALL)}>
              All
            </button>
            {categories.map((c) => (
              <button key={c} type="button" className={pill(category === c)} onClick={() => setCategory(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
        {shown.length} {shown.length === 1 ? "guide" : "guides"}
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((g) => (
          <Link
            key={g.slug}
            href={g.href}
            className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-elegant"
          >
            <div className="relative h-44 overflow-hidden">
              <Image
                src={g.image}
                alt={g.title}
                fill
                sizes="(max-width:1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-neutral-900">
                {g.category}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-serif text-lg font-semibold leading-tight text-foreground">{g.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{g.excerpt}</p>
              <div className="mt-4 flex items-center justify-between pt-1">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> {g.readTime} read
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  Read guide <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="mt-10 rounded-3xl border border-dashed border-border bg-card/40 p-10 text-center text-sm text-muted-foreground">
          No guides match those filters yet.
        </p>
      )}
    </div>
  );
}
