"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Plus, Scale, ArrowRight } from "lucide-react";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { ComparisonTable } from "./ComparisonTable";
import { AiRecommendation } from "./AiRecommendation";
import { COMPARABLE, COMPARABLE_BY_SLUG, MAX_COMPARE, type Comparable } from "./comparable";
import { TOP_PAIRS, parsePair, pairHref } from "./pairs";

export function CompareClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const d = searchParams.get("d") ?? undefined;

  const selectedSlugs = (d ? d.split(",") : [])
    .map((s) => s.trim())
    .filter((s) => COMPARABLE_BY_SLUG.has(s))
    .slice(0, MAX_COMPARE);
  const selected = selectedSlugs.map((s) => COMPARABLE_BY_SLUG.get(s)!) as Comparable[];
  const selectedSet = new Set(selectedSlugs);

  // Set by the AI recommendation so the table can badge the winning column.
  const [winnerSlug, setWinnerSlug] = useState<string | null>(null);

  const setSlugs = (slugs: string[]) => {
    setWinnerSlug(null); // a different shortlist invalidates the old verdict
    router.replace(slugs.length ? `/compare?d=${slugs.join(",")}` : "/compare", { scroll: false });
  };
  const toggle = (slug: string) => {
    if (selectedSet.has(slug)) setSlugs(selectedSlugs.filter((s) => s !== slug));
    else if (selectedSlugs.length < MAX_COMPARE) setSlugs([...selectedSlugs, slug]);
  };
  const canAddMore = selected.length < MAX_COMPARE;

  const names = Object.fromEntries(COMPARABLE.map((c) => [c.slug, c.name]));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            <Scale className="h-3.5 w-3.5" /> Compare
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold text-foreground sm:text-5xl">
            Can&apos;t decide where to go?
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Pick up to {MAX_COMPARE} destinations and compare them side by side — flight prices,
            weather, airlines and lifestyle ratings for beaches, nightlife, food and more.
          </p>
        </div>

        {/* Picker */}
        <div className="mt-10">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              Choose destinations{" "}
              <span className="text-base font-normal text-muted-foreground">
                ({selected.length}/{MAX_COMPARE})
              </span>
            </h2>
            {selected.length > 0 && (
              <button
                onClick={() => setSlugs([])}
                className="text-sm font-medium text-muted-foreground transition hover:text-accent"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {COMPARABLE.map((dest) => {
              const active = selectedSet.has(dest.slug);
              const disabled = !active && !canAddMore;
              return (
                <button
                  key={dest.slug}
                  onClick={() => toggle(dest.slug)}
                  disabled={disabled}
                  aria-pressed={active}
                  className={`group relative overflow-hidden rounded-2xl border text-left transition ${
                    active ? "border-accent ring-2 ring-accent" : "border-border hover:border-accent/50"
                  } ${disabled ? "cursor-not-allowed opacity-40" : ""}`}
                >
                  <div className="relative h-24 w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={dest.image}
                      alt={`${dest.name}, ${dest.country}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <span
                      className={`absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full ${
                        active ? "bg-accent text-accent-foreground" : "bg-white/90 text-neutral-700"
                      }`}
                    >
                      {active ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <p className="font-serif text-base font-semibold text-white">
                        {dest.flag ? `${dest.flag} ` : ""}
                        {dest.name}
                      </p>
                      <p className="text-[11px] text-white/75">{dest.country}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {selected.length >= 2 ? (
          <div className="mt-14">
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              {selected.map((s) => s.name).join(" vs ")}
            </h2>
            <div className="mt-5">
              <ComparisonTable selected={selected} onRemove={toggle} winnerSlug={winnerSlug} />
            </div>

            {/*
              key: remount on a changed shortlist so a stale recommendation for
              the previous selection can't linger, and so autoGenerate fires
              again for the new one.
            */}
            <AiRecommendation
              key={selectedSlugs.join(",")}
              slugs={selectedSlugs}
              names={names}
              onWinner={setWinnerSlug}
              autoGenerate
            />
          </div>
        ) : (
          <div className="mt-14 rounded-3xl border border-dashed border-border bg-card/40 p-12 text-center">
            <Scale className="mx-auto h-10 w-10 text-muted-foreground/50" />
            <p className="mt-3 text-sm font-medium text-muted-foreground">
              Select at least 2 destinations above to see them compared side by side.
            </p>
          </div>
        )}

        {/* Pre-rendered head-to-heads — internal links for the pairs people search for. */}
        <section className="mt-20">
          <h2 className="font-serif text-2xl font-semibold text-foreground">Popular comparisons</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The head-to-heads travellers ask about most, each with a full breakdown.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {TOP_PAIRS.map((p) => {
              const parts = parsePair(p);
              if (!parts) return null;
              const x = COMPARABLE_BY_SLUG.get(parts[0]);
              const y = COMPARABLE_BY_SLUG.get(parts[1]);
              if (!x || !y) return null;
              return (
                <Link
                  key={p}
                  href={pairHref(p)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
                >
                  {x.name} vs {y.name} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
