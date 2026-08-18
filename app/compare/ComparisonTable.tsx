"use client";

import Link from "next/link";
import { Check, X, ArrowRight, Waves, Moon, Utensils, MapPin, Users, PiggyBank } from "lucide-react";
import { ROWS, bestSlug, type Comparable, type Scores } from "./comparable";

// The side-by-side table, shared by the interactive /compare tool and the
// static /compare/<a>-vs-<b> pages.
//
// `onRemove` is what separates the two: the tool passes a handler and gets the
// per-column ✕ button, the static page omits it (its columns are the URL and
// can't be removed).
//
// `winnerSlug` badges the destination the AI recommendation picked. It is
// deliberately separate from the per-row emerald highlight, which is factual
// (cheapest fare, warmest summer) rather than a judgement.

const SCORE_ROWS: { key: keyof Scores; label: string; Icon: typeof Waves }[] = [
  { key: "beaches", label: "Beaches", Icon: Waves },
  { key: "nightlife", label: "Nightlife", Icon: Moon },
  { key: "food", label: "Food", Icon: Utensils },
  { key: "activities", label: "Activities", Icon: MapPin },
  { key: "family", label: "Family-friendly", Icon: Users },
  { key: "value", label: "Value for money", Icon: PiggyBank },
];

function ScoreDots({ score }: { score: number }) {
  // Editorial scores are 1–10, shown as 5 dots.
  const filled = Math.round(score / 2);
  return (
    <span className="inline-flex gap-1" role="img" aria-label={`${score} out of 10`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full ${i < filled ? "bg-accent" : "bg-muted-foreground/25"}`}
        />
      ))}
    </span>
  );
}

export function ComparisonTable({
  selected,
  onRemove,
  winnerSlug = null,
}: {
  selected: Comparable[];
  onRemove?: (slug: string) => void;
  winnerSlug?: string | null;
}) {
  const anyScores = selected.some((s) => s.scores);

  return (
    <>
      <div className="overflow-x-auto rounded-3xl border border-border bg-card">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="p-4 text-left align-bottom" />
              {selected.map((s) => (
                <th key={s.slug} className="p-4 align-bottom">
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative h-20 w-full overflow-hidden rounded-xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={s.image} alt={`${s.name}, ${s.country}`} className="h-full w-full object-cover" />
                      {winnerSlug === s.slug && (
                        <span className="absolute left-2 top-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-foreground shadow-glow">
                          Our pick
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/${s.slug}`}
                        className="font-serif text-lg font-semibold text-foreground transition hover:text-accent"
                      >
                        {s.name}
                      </Link>
                      {onRemove && (
                        <button
                          onClick={() => onRemove(s.slug)}
                          aria-label={`Remove ${s.name}`}
                          className="grid h-6 w-6 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-accent hover:text-accent"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {s.flag ? `${s.flag} ` : ""}
                      {s.country}
                    </p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => {
              const winner = bestSlug(row, selected);
              return (
                <tr key={row.key} className="border-b border-border last:border-0">
                  <td className="whitespace-nowrap p-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {row.label}
                  </td>
                  {selected.map((s) => {
                    const isBest = winner === s.slug;
                    return (
                      <td key={s.slug} className="p-4 text-center align-middle">
                        <span
                          className={`inline-flex items-center gap-1.5 ${
                            isBest
                              ? "rounded-full bg-emerald-500/15 px-2.5 py-1 font-semibold text-emerald-600 dark:text-emerald-400"
                              : "text-foreground"
                          }`}
                        >
                          {row.value(s)}
                          {isBest && <Check className="h-3.5 w-3.5" />}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}

            {anyScores && (
              <>
                <tr className="border-b border-border bg-muted/30">
                  <td
                    colSpan={selected.length + 1}
                    className="px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-accent"
                  >
                    Lifestyle ratings
                  </td>
                </tr>
                {SCORE_ROWS.map((row) => (
                  <tr key={row.key} className="border-b border-border last:border-0">
                    <td className="whitespace-nowrap p-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <row.Icon className="h-3.5 w-3.5 text-accent" /> {row.label}
                      </span>
                    </td>
                    {selected.map((s) => (
                      <td key={s.slug} className="p-4 text-center align-middle">
                        {s.scores ? (
                          <ScoreDots score={s.scores[row.key]} />
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </>
            )}

            <tr>
              <td className="p-4" />
              {selected.map((s) => (
                <td key={s.slug} className="p-4 text-center">
                  <Link
                    href={`/${s.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground shadow-glow transition hover:scale-105"
                  >
                    View {s.name} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        <Check className="mr-1 inline h-3.5 w-3.5 text-emerald-500" />
        Highlighted cells mark the cheapest fare and warmest summer. Ratings are editorial (1–10,
        shown as 5 dots).
      </p>
    </>
  );
}
