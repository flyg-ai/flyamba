"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { destinations } from "@/app/data/destinations";
import { ALL_DESTINATIONS } from "@/app/data/all-destinations";
import { usd, usdStr } from "@/app/lib/format";
import { Check, Plus, X, ArrowRight, Scale, Waves, Moon, Utensils, MapPin, Users, PiggyBank } from "lucide-react";

const MAX = 4;

type Scores = { beaches: number; nightlife: number; food: number; activities: number; family: number; value: number };
type Comparable = {
  slug: string;
  name: string;
  country: string;
  flag?: string;
  image: string;
  priceUsd: number;
  flightTime?: string;
  bestMonths?: string;
  summerTemp?: number;
  category?: string;
  foodCostPerDay?: string;
  hotelCostPerNight?: string;
  airlines?: string[];
  scores?: Scores;
};

// ── Unified comparable catalog: rich destinations first, then the scored cities
//    from the ported catalog (deduped by slug; rich entries inherit scores when
//    a slim counterpart with the same slug exists). ──────────────────────────
const slimScoredBySlug = new Map(ALL_DESTINATIONS.filter((d) => d.scores).map((d) => [d.slug, d]));
const richSlugs = new Set(destinations.map((d) => d.slug));

const RICH: Comparable[] = destinations.map((d) => ({
  slug: d.slug,
  name: d.city,
  country: d.country,
  flag: d.countryFlag,
  image: d.image,
  priceUsd: usd(d.price),
  flightTime: d.flightTime ?? `${d.avgFlightHours}h`,
  bestMonths: d.bestMonths,
  summerTemp: d.summerTemp,
  category: d.category,
  foodCostPerDay: d.foodCostPerDay,
  hotelCostPerNight: d.hotelCostPerNight,
  airlines: d.airlines?.map((a) => a.name) ?? d.topAirlines,
  scores: slimScoredBySlug.get(d.slug)?.scores,
}));

const SLIM: Comparable[] = ALL_DESTINATIONS.filter((d) => d.scores && !richSlugs.has(d.slug)).map((d) => {
  const valid = d.monthlyPrices.filter((p): p is number => p != null);
  return {
    slug: d.slug,
    name: d.name,
    country: d.country,
    image: d.image,
    priceUsd: valid.length ? usd(Math.min(...valid)) : 0,
    summerTemp: d.summerTemp,
    scores: d.scores,
  };
});

const COMPARABLE: Comparable[] = [...RICH, ...SLIM];
const bySlug = new Map(COMPARABLE.map((c) => [c.slug, c]));

// ── Info rows ───────────────────────────────────────────────────────────────
type Row = { key: string; label: string; value: (d: Comparable) => string; best?: "min" | "max"; raw?: (d: Comparable) => number };
const ROWS: Row[] = [
  { key: "price", label: "Flights from", value: (d) => (d.priceUsd ? usdStr(d.priceUsd * 10.5) : "—"), best: "min", raw: (d) => d.priceUsd || Infinity },
  { key: "flight", label: "Flight time", value: (d) => d.flightTime ?? "—" },
  { key: "best", label: "Best months", value: (d) => d.bestMonths ?? "—" },
  { key: "summer", label: "Summer temp", value: (d) => (d.summerTemp ? `${d.summerTemp}°C` : "—"), best: "max", raw: (d) => d.summerTemp ?? -Infinity },
  { key: "category", label: "Trip type", value: (d) => d.category ?? "—" },
  { key: "food", label: "Food & drink / day", value: (d) => d.foodCostPerDay ?? "—" },
  { key: "hotel", label: "Hotel / night", value: (d) => d.hotelCostPerNight ?? "—" },
];

// ── Score rows (dot ratings) ──────────────────────────────────────────────────
const SCORE_ROWS: { key: keyof Scores; label: string; Icon: typeof Waves }[] = [
  { key: "beaches", label: "Beaches", Icon: Waves },
  { key: "nightlife", label: "Nightlife", Icon: Moon },
  { key: "food", label: "Food", Icon: Utensils },
  { key: "activities", label: "Activities", Icon: MapPin },
  { key: "family", label: "Family-friendly", Icon: Users },
  { key: "value", label: "Value for money", Icon: PiggyBank },
];

function ScoreDots({ score }: { score: number }) {
  const filled = Math.round(score / 2);
  return (
    <span className="inline-flex gap-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className={`h-2 w-2 rounded-full ${i < filled ? "bg-accent" : "bg-muted-foreground/25"}`} />
      ))}
    </span>
  );
}

function bestSlug(row: Row, dests: Comparable[]): string | null {
  if (!row.best || !row.raw || dests.length < 2) return null;
  const raw = row.raw;
  const sorted = [...dests].sort((a, b) => (row.best === "min" ? raw(a) - raw(b) : raw(b) - raw(a)));
  const winner = sorted[0];
  if (dests.every((d) => raw(d) === raw(winner))) return null;
  return winner.slug;
}

export function CompareClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const d = searchParams.get("d") ?? undefined;

  const selectedSlugs = (d ? d.split(",") : []).map((s) => s.trim()).filter((s) => bySlug.has(s)).slice(0, MAX);
  const selected = selectedSlugs.map((s) => bySlug.get(s)!) as Comparable[];
  const selectedSet = new Set(selectedSlugs);
  const anyScores = selected.some((s) => s.scores);

  const setSlugs = (slugs: string[]) => router.replace(slugs.length ? `/compare?d=${slugs.join(",")}` : "/compare", { scroll: false });
  const toggle = (slug: string) => {
    if (selectedSet.has(slug)) setSlugs(selectedSlugs.filter((s) => s !== slug));
    else if (selectedSlugs.length < MAX) setSlugs([...selectedSlugs, slug]);
  };
  const canAddMore = selected.length < MAX;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            <Scale className="h-3.5 w-3.5" /> Compare
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold text-foreground sm:text-5xl">Can&apos;t decide where to go?</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Pick up to {MAX} destinations and compare them side by side — flight prices, weather, airlines and lifestyle ratings for beaches, nightlife, food and more.
          </p>
        </div>

        {/* Picker */}
        <div className="mt-10">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              Choose destinations <span className="text-base font-normal text-muted-foreground">({selected.length}/{MAX})</span>
            </h2>
            {selected.length > 0 && (
              <button onClick={() => setSlugs([])} className="text-sm font-medium text-muted-foreground transition hover:text-accent">Clear all</button>
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
                  className={`group relative overflow-hidden rounded-2xl border text-left transition ${active ? "border-accent ring-2 ring-accent" : "border-border hover:border-accent/50"} ${disabled ? "cursor-not-allowed opacity-40" : ""}`}
                >
                  <div className="relative h-24 w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={dest.image} alt={`${dest.name}, ${dest.country}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <span className={`absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full ${active ? "bg-accent text-accent-foreground" : "bg-white/90 text-neutral-700"}`}>
                      {active ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <p className="font-serif text-base font-semibold text-white">{dest.flag ? `${dest.flag} ` : ""}{dest.name}</p>
                      <p className="text-[11px] text-white/75">{dest.country}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Table */}
        {selected.length >= 2 ? (
          <div className="mt-14">
            <h2 className="font-serif text-2xl font-semibold text-foreground">{selected.map((s) => s.name).join(" vs ")}</h2>
            <div className="mt-5 overflow-x-auto rounded-3xl border border-border bg-card">
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
                          </div>
                          <div className="flex items-center gap-2">
                            <Link href={`/${s.slug}`} className="font-serif text-lg font-semibold text-foreground transition hover:text-accent">{s.name}</Link>
                            <button onClick={() => toggle(s.slug)} aria-label={`Remove ${s.name}`} className="grid h-6 w-6 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-accent hover:text-accent">
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="text-xs text-muted-foreground">{s.flag ? `${s.flag} ` : ""}{s.country}</p>
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
                        <td className="whitespace-nowrap p-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{row.label}</td>
                        {selected.map((s) => {
                          const isBest = winner === s.slug;
                          return (
                            <td key={s.slug} className="p-4 text-center align-middle">
                              <span className={`inline-flex items-center gap-1.5 ${isBest ? "rounded-full bg-emerald-500/15 px-2.5 py-1 font-semibold text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}>
                                {row.value(s)}{isBest && <Check className="h-3.5 w-3.5" />}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}

                  {/* Score dot rows */}
                  {anyScores && (
                    <>
                      <tr className="border-b border-border bg-muted/30">
                        <td colSpan={selected.length + 1} className="px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-accent">Lifestyle ratings</td>
                      </tr>
                      {SCORE_ROWS.map((row) => (
                        <tr key={row.key} className="border-b border-border last:border-0">
                          <td className="whitespace-nowrap p-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                            <span className="inline-flex items-center gap-1.5"><row.Icon className="h-3.5 w-3.5 text-accent" /> {row.label}</span>
                          </td>
                          {selected.map((s) => (
                            <td key={s.slug} className="p-4 text-center align-middle">
                              {s.scores ? <ScoreDots score={s.scores[row.key]} /> : <span className="text-muted-foreground">—</span>}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </>
                  )}

                  {/* CTA row */}
                  <tr>
                    <td className="p-4" />
                    {selected.map((s) => (
                      <td key={s.slug} className="p-4 text-center">
                        <Link href={`/${s.slug}`} className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground shadow-glow transition hover:scale-105">
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
              Highlighted cells mark the cheapest fare, shortest flight and warmest summer. Ratings are editorial (1–10, shown as 5 dots).
            </p>
          </div>
        ) : (
          <div className="mt-14 rounded-3xl border border-dashed border-border bg-card/40 p-12 text-center">
            <Scale className="mx-auto h-10 w-10 text-muted-foreground/50" />
            <p className="mt-3 text-sm font-medium text-muted-foreground">Select at least 2 destinations above to see them compared side by side.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
