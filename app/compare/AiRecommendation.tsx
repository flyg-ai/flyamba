"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, RotateCcw, Loader2 } from "lucide-react";
import { TRAVEL_STYLES, MONTHS, type Scores } from "./comparable";

// "Which should I pick?" — ports flyg.ai's app/jamfor/AiRecommendation.tsx.
//
// Two flows, same component:
//   • autoGenerate=false (static /compare/<a>-vs-<b> pages) — renders a CTA card
//     and makes NO network call until the visitor asks. The page must be useful
//     and fully rendered without ever hitting Anthropic.
//   • autoGenerate=true (the interactive /compare tool, once ≥2 are picked) —
//     fires once on mount.
//
// The route caches per (sorted slugs + styles + month), so re-running a
// combination someone already asked for costs nothing.

type Recommendation = {
  intro: string;
  winner: { slug: string; reason: string };
  alternatives: { slug: string; reason: string }[];
};

type Phase = "idle" | "loading" | "done" | "error";

export function AiRecommendation({
  slugs,
  names,
  onWinner,
  autoGenerate = false,
}: {
  slugs: string[];
  names: Record<string, string>;
  /** Reports the winning slug so the table can badge it. Called with null on reset. */
  onWinner?: (slug: string | null) => void;
  autoGenerate?: boolean;
}) {
  const [phase, setPhase] = useState<Phase>(autoGenerate ? "loading" : "idle");
  const [rec, setRec] = useState<Recommendation | null>(null);
  const [styleKeys, setStyleKeys] = useState<(keyof Scores)[]>([]);
  const [monthIdx, setMonthIdx] = useState<number | null>(null);

  // Guards a stale in-flight request resolving after a newer one.
  const runIdRef = useRef(0);

  const run = useCallback(async () => {
    const id = ++runIdRef.current;
    setPhase("loading");
    setRec(null);
    onWinner?.(null);

    const params = new URLSearchParams({ dest: slugs.join(",") });
    if (styleKeys.length) params.set("style", styleKeys.join(","));
    if (monthIdx != null) params.set("month", MONTHS[monthIdx].toLowerCase());

    try {
      const res = await fetch(`/api/compare-recommend?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (runIdRef.current !== id) return; // superseded
      if (data?.recommendation?.winner) {
        setRec(data.recommendation);
        setPhase("done");
        onWinner?.(data.recommendation.winner.slug);
      } else {
        setPhase("error");
      }
    } catch {
      if (runIdRef.current !== id) return;
      setPhase("error");
    }
  }, [slugs, styleKeys, monthIdx, onWinner]);

  // Fire once on mount for the interactive flow. The ref keeps it to a single
  // request even under React strict-mode's double effect invocation.
  const autoRanRef = useRef(false);
  useEffect(() => {
    if (autoGenerate && !autoRanRef.current) {
      autoRanRef.current = true;
      void run();
    }
    // Intentionally mount-only: run() reads the latest state via closure, and
    // re-firing on every preference change would spam the API.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoGenerate]);

  function reset() {
    runIdRef.current++; // ignore any in-flight response
    setPhase("idle");
    setRec(null);
    onWinner?.(null);
  }

  function toggleStyle(key: keyof Scores) {
    setStyleKeys((cur) => (cur.includes(key) ? cur.filter((k) => k !== key) : [...cur, key]));
  }

  // ── Result ───────────────────────────────────────────────────────────
  if (phase === "done" && rec) {
    return (
      <section className="mt-12 rounded-3xl border border-accent/30 bg-card p-6 sm:p-8">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          <Sparkles className="h-3.5 w-3.5" /> Our recommendation
        </p>

        {rec.intro && <p className="mt-3 text-lg text-muted-foreground">{rec.intro}</p>}

        <div className="mt-6 rounded-2xl border border-accent/40 bg-accent/5 p-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-foreground">
              Our pick
            </span>
            <h3 className="font-serif text-2xl font-semibold text-foreground">
              {names[rec.winner.slug] ?? rec.winner.slug}
            </h3>
          </div>
          <p className="mt-3 text-foreground">{rec.winner.reason}</p>
          <Link
            href={`/${rec.winner.slug}`}
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground shadow-glow transition hover:scale-105"
          >
            Explore {names[rec.winner.slug] ?? rec.winner.slug} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {rec.alternatives.length > 0 && (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {rec.alternatives.map((alt) => (
              <div key={alt.slug} className="rounded-2xl border border-border p-4">
                <h4 className="font-serif text-lg font-semibold text-foreground">
                  {names[alt.slug] ?? alt.slug}
                </h4>
                <p className="mt-1.5 text-sm text-muted-foreground">{alt.reason}</p>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={reset}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-accent"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Change month &amp; travel style
        </button>

        <p className="mt-4 text-xs text-muted-foreground">
          Generated by AI from the data in the table above. Fares and ratings are indicative — always
          check the airline before booking.
        </p>
      </section>
    );
  }

  // ── Loading ──────────────────────────────────────────────────────────
  if (phase === "loading") {
    return (
      <section className="mt-12 rounded-3xl border border-accent/30 bg-card p-8 text-center">
        <Loader2 className="mx-auto h-6 w-6 animate-spin text-accent" />
        <p className="mt-3 text-sm font-medium text-muted-foreground">
          Weighing {slugs.map((s) => names[s] ?? s).join(" against ")}…
        </p>
      </section>
    );
  }

  // ── Idle / error: the CTA card ───────────────────────────────────────
  return (
    <section className="mt-12 rounded-3xl border border-accent/30 bg-card p-6 text-center sm:p-8">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-accent/10">
        <Sparkles className="h-5 w-5 text-accent" />
      </div>
      <h2 className="mt-4 font-serif text-2xl font-semibold text-foreground">
        Still can&apos;t decide?
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        Tell us when you&apos;re going and what matters most, and we&apos;ll pick one — with the
        reasoning.
      </p>

      <div className="mx-auto mt-6 max-w-md text-left">
        <label
          htmlFor="compare-month"
          className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
        >
          When are you travelling?
        </label>
        <select
          id="compare-month"
          value={monthIdx ?? ""}
          onChange={(e) => setMonthIdx(e.target.value === "" ? null : Number(e.target.value))}
          className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground"
        >
          <option value="">Not sure yet</option>
          {MONTHS.map((m, i) => (
            <option key={m} value={i}>
              {m}
            </option>
          ))}
        </select>

        <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          What matters most?
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {TRAVEL_STYLES.map((s) => {
            const active = styleKeys.includes(s.key);
            return (
              <button
                key={s.key}
                onClick={() => toggleStyle(s.key)}
                aria-pressed={active}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  active
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border text-muted-foreground hover:border-accent/50 hover:text-foreground"
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => void run()}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-glow transition hover:scale-105"
      >
        <Sparkles className="h-4 w-4" /> Recommend one for me
      </button>

      {phase === "error" && (
        <p className="mt-4 text-sm text-red-500">
          Couldn&apos;t generate a recommendation just now. Try again in a moment.
        </p>
      )}
    </section>
  );
}
