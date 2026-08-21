"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { WarmDestination } from "@/app/lib/climate";
import { REGION_ORDER, regionOfContinent } from "@/app/lib/regions";

// Internal unit is always Celsius — that is what climate_data stores and what
// WarmDestination.tempC carries. Fahrenheit exists only at the display layer,
// because the primary market is the US.
// Bounds are fixed rather than derived per month, so the scale means the same
// thing on all twelve pages. They must still cover the data: across all months
// climate_data spans -12 °C to 46 °C. The ceiling is set to the real maximum —
// at 45 the hottest row on the site (Riyadh in July, 46 °C / 115 °F) could not be
// reached at any slider position. The floor is a deliberate product decision, not
// the data minimum: this page is "where is it warm", so the ~890 sub-10 °C rows
// are out of scope and stay hidden.
const LO_C = 10;
const HI_C = 46;
// The page opens on a window, not on "75 °F and up". Sorting runs on temperature
// descending, so an open top end means the deserts own the first screen every time:
// in July that is Riyadh 115 °F, Kuwait 112, Phoenix 110, Jeddah 109, Dubai 108,
// Doha 107 — none of which is what someone asking where it is warm has in mind.
//
// 75–88 °F is where the cap does work in the month that needs it and almost none in
// the month that does not:
//   January   136 destinations above 75 °F  ->  127 in the window   (9 cut)
//   July      414 destinations above 75 °F  ->  289 in the window   (125 cut)
// The 125 cut from July are the Gulf and the desert belt. The 9 cut from January are
// equatorial. Either end is still draggable, so the excluded heat is one gesture away.
const DEFAULT_MIN_C = 24; // 75 °F
const DEFAULT_MAX_C = 31; // 88 °F

const PAGE_SIZE = 48;

type Unit = "F" | "C";

const toDisplay = (c: number, unit: Unit) => (unit === "F" ? c * 1.8 + 32 : c);
const fromDisplay = (v: number, unit: Unit) => (unit === "F" ? (v - 32) / 1.8 : v);
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

// REGION_ORDER and the merge live in app/lib/regions.ts, because the breadcrumbs
// need the same answer. Two copies would let the region filter and the trail
// disagree about which continent a destination is in.
const regionOf = (d: WarmDestination) => regionOfContinent(d.continent);

// Chips filter on measured climate, not on editorial `scores`. The scores in
// destination-facts.ts are partly machine-generated and wrong often enough to be
// unusable as a filter: Kuwait rates 9 for nightlife in a country where alcohol is
// banned, `nightlife >= 9` sweeps in Akureyri and Billund, and `activities >= 10`
// finds Augsburg and Detroit but not Rome, Paris or Athens. The file's own header
// says as much. climate_data at least measures something.
//
// Each chip declares the column it reads so the grid can say how many destinations
// it hid for lack of data rather than for failing the test. That distinction matters
// here: rainfall is missing for 180 of 550, so "Dry" removes a third of the catalog
// before it filters anything.
type Chip = {
  key: string;
  label: string;
  /** The measure this chip reads. Null means the table has no value for this month. */
  value: (d: WarmDestination) => number | null;
  match: (v: number) => boolean;
  /** Shown under the grid, after the count of destinations hidden for missing data. */
  missingLabel: string;
};

// Thresholds are picked to return a useful minority of the default 75–88 °F window
// rather than most of it. Counts below are what the page actually renders, in January
// and July — read them off the running page, not off a SQL query: climate.ts rounds
// every measure to a whole degree on the way in, so a sea at 27.6 °C passes a >= 28
// test here and fails the same test against the raw column. That rounding is worth
// about 10 points on the sea chip in January.
//
//   Warm sea      >= 28 °C   Jan  48/132 = 36%     Jul  55/304 = 18%
//   Dry           <= 30 mm   Jan  26/132 = 20%     Jul  60/304 = 20%
//   Cool nights   <= 20 °C   Jan  44/132 = 33%     Jul 142/304 = 47%
//
// No single sea threshold sits inside 20–35% in both months: January's warm window is
// almost entirely tropical, where warm water is the norm, while July's is half
// Mediterranean. 28 °C straddles the band; 29 °C would leave January with 8%.
const CHIPS: Chip[] = [
  {
    key: "sea",
    label: "Warm sea",
    value: (d) => d.seaTempC,
    match: (v) => v >= 28,
    missingLabel: "no sea temperature",
  },
  {
    key: "dry",
    label: "Dry",
    value: (d) => d.precipitationMm,
    match: (v) => v <= 30,
    missingLabel: "no rainfall data",
  },
  {
    key: "cool-nights",
    label: "Cool nights",
    value: (d) => d.tempMinC,
    match: (v) => v <= 20,
    missingLabel: "no overnight low",
  },
];

export function WarmBrowser({
  destinations,
  monthLabel,
}: {
  destinations: WarmDestination[];
  /** "January" — used in the hidden-data notice under the grid. */
  monthLabel: string;
}) {
  const [unit, setUnit] = useState<Unit>("F");
  const [minC, setMinC] = useState(DEFAULT_MIN_C);
  const [maxC, setMaxC] = useState(DEFAULT_MAX_C);
  const [region, setRegion] = useState<string | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [shown, setShown] = useState(PAGE_SIZE);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<"min" | "max" | null>(null);

  // The slider works in whole display units so the numbers the user sees are the
  // numbers they can land on — a Celsius-stepped slider jumps ~2 °F at a time.
  const dispLo = Math.round(toDisplay(LO_C, unit));
  const dispHi = Math.round(toDisplay(HI_C, unit));
  const minDisp = clamp(Math.round(toDisplay(minC, unit)), dispLo, dispHi);
  const maxDisp = clamp(Math.round(toDisplay(maxC, unit)), dispLo, dispHi);
  const deg = `°${unit}`;

  const setMinDisp = (v: number) => setMinC(fromDisplay(clamp(Math.round(v), dispLo, maxDisp - 1), unit));
  const setMaxDisp = (v: number) => setMaxC(fromDisplay(clamp(Math.round(v), minDisp + 1, dispHi), unit));

  const pct = (v: number) => ((v - dispLo) / (dispHi - dispLo)) * 100;

  const clientXToDisp = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return null;
    const { left, width } = el.getBoundingClientRect();
    if (width <= 0) return null;
    return Math.round(dispLo + clamp((clientX - left) / width, 0, 1) * (dispHi - dispLo));
  };

  const applyTo = (handle: "min" | "max", v: number) => (handle === "min" ? setMinDisp(v) : setMaxDisp(v));

  // Pointer Events cover mouse, touch and pen with one code path — flyg.ai wires
  // mousedown on the track but not touchstart, so tapping the bare track does
  // nothing on a phone.
  //
  // Capture is always taken on the TRACK, never on the thumb, because the move and
  // up handlers live on the track. Taking it on the thumb would retarget every
  // subsequent event to the thumb, which has no move handler, and the drag would
  // die on the first pixel.
  const beginDrag = (handle: "min" | "max", e: React.PointerEvent) => {
    dragging.current = handle;
    trackRef.current?.setPointerCapture(e.pointerId);
  };

  const onTrackPointerDown = (e: React.PointerEvent) => {
    const v = clientXToDisp(e.clientX);
    if (v == null) return;
    const handle: "min" | "max" = Math.abs(v - minDisp) <= Math.abs(v - maxDisp) ? "min" : "max";
    applyTo(handle, v);
    beginDrag(handle, e);
  };

  // Pressing a thumb starts a drag from where it already is — no jump. It must not
  // fall through to the track handler, which would re-derive the nearest handle from
  // the cursor and can pick the other one when the two sit close together.
  //
  // Written as an inline handler at each thumb rather than a curried factory: React
  // Compiler treats `f("min")` in JSX as a call during render and rejects the ref
  // access inside it.
  const onThumbPointerDown = (handle: "min" | "max", e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    beginDrag(handle, e);
  };

  const onTrackPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const v = clientXToDisp(e.clientX);
    if (v != null) applyTo(dragging.current, v);
  };

  const endDrag = (e: React.PointerEvent) => {
    dragging.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };

  // flyg.ai's thumbs carry role="slider" and tabIndex={0} but no key handler, so
  // they announce themselves to a screen reader as operable and then ignore every
  // key. These implement the WAI-ARIA slider key set.
  const onThumbKeyDown = (handle: "min" | "max") => (e: React.KeyboardEvent) => {
    const cur = handle === "min" ? minDisp : maxDisp;
    let next: number;
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown":
        next = cur - 1;
        break;
      case "ArrowRight":
      case "ArrowUp":
        next = cur + 1;
        break;
      case "PageDown":
        next = cur - 5;
        break;
      case "PageUp":
        next = cur + 5;
        break;
      case "Home":
        next = handle === "min" ? dispLo : minDisp + 1;
        break;
      case "End":
        next = handle === "min" ? maxDisp - 1 : dispHi;
        break;
      default:
        return;
    }
    e.preventDefault();
    applyTo(handle, next);
  };

  // Derived plainly rather than through useMemo: React Compiler memoizes this
  // component, and hand-written deps on minDisp/maxDisp defeat it — it bails out
  // of the whole component with "existing memoization could not be preserved",
  // which is worse than no useMemo at all. Filtering 550 rows is cheap.
  //
  // Temperature narrows first, so the chip counts below describe what the slider
  // left behind rather than the whole catalog.
  const inRange = destinations.filter((d) => {
    const t = Math.round(toDisplay(d.tempC, unit));
    return t >= minDisp && t <= maxDisp;
  });

  const activeChip = CHIPS.find((c) => c.key === activeKey);
  // Split rather than filter: a destination with no value for the active chip is
  // hidden, but it is hidden for a different reason than one that failed the test,
  // and the grid says so.
  const missingData = activeChip ? inRange.filter((d) => activeChip.value(d) === null) : [];
  const chipped = activeChip
    ? inRange.filter((d) => { const v = activeChip.value(d); return v !== null && activeChip.match(v); })
    : inRange;
  const visible = region ? chipped.filter((d) => regionOf(d) === region) : chipped;

  const regionCounts = (() => {
    const counts = new Map<string, number>();
    for (const d of chipped) {
      const r = regionOf(d);
      counts.set(r, (counts.get(r) ?? 0) + 1);
    }
    return REGION_ORDER.filter((r) => counts.has(r)).map((r) => ({ region: r, count: counts.get(r)! }));
  })();

  const chipCounts = CHIPS.map((c) => ({
    ...c,
    count: inRange.filter((d) => { const v = c.value(d); return v !== null && c.match(v); }).length,
  }));

  const chip = (active: boolean) =>
    `shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
      active
        ? "border-accent bg-accent text-accent-foreground"
        : "border-border bg-card text-muted-foreground hover:border-accent hover:text-accent"
    }`;

  const thumbClass =
    "absolute top-1/2 -ml-3.5 h-7 w-7 -translate-y-1/2 cursor-grab touch-none rounded-full border-2 " +
    "border-white bg-accent shadow-md outline-none active:cursor-grabbing focus-visible:ring-4 focus-visible:ring-accent/40";

  const rowClass =
    "-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden " +
    "sm:mx-0 sm:flex-wrap sm:overflow-x-visible sm:px-0";

  return (
    <div>
      {/* Temperature range */}
      <div className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="text-sm font-semibold text-foreground">
            Temperature:{" "}
            <span className="text-accent">
              {minDisp}
              {deg} – {maxDisp}
              {deg}
            </span>
          </p>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {visible.length} {visible.length === 1 ? "destination" : "destinations"}
            </span>
            <div className="flex overflow-hidden rounded-full border border-border" role="group" aria-label="Temperature unit">
              {(["F", "C"] as Unit[]).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUnit(u)}
                  aria-pressed={unit === u}
                  className={`px-3 py-1 text-xs font-semibold transition ${
                    unit === u ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-accent"
                  }`}
                >
                  °{u}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={trackRef}
          onPointerDown={onTrackPointerDown}
          onPointerMove={onTrackPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className="relative mt-5 h-8 cursor-pointer touch-none select-none"
        >
          <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-muted" />
          <div
            className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-accent"
            style={{ left: `${pct(minDisp)}%`, width: `${Math.max(0, pct(maxDisp) - pct(minDisp))}%` }}
          />
          <div
            role="slider"
            tabIndex={0}
            aria-label="Minimum temperature"
            aria-valuemin={dispLo}
            aria-valuemax={maxDisp - 1}
            aria-valuenow={minDisp}
            aria-valuetext={`${minDisp}${deg}`}
            onKeyDown={onThumbKeyDown("min")}
            onPointerDown={(e) => onThumbPointerDown("min", e)}
            className={`${thumbClass} z-20`}
            style={{ left: `${pct(minDisp)}%` }}
          />
          <div
            role="slider"
            tabIndex={0}
            aria-label="Maximum temperature"
            aria-valuemin={minDisp + 1}
            aria-valuemax={dispHi}
            aria-valuenow={maxDisp}
            aria-valuetext={`${maxDisp}${deg}`}
            onKeyDown={onThumbKeyDown("max")}
            onPointerDown={(e) => onThumbPointerDown("max", e)}
            className={`${thumbClass} z-10`}
            style={{ left: `${pct(maxDisp)}%` }}
          />
        </div>
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>
            {dispLo}
            {deg}
          </span>
          <span>
            {dispHi}
            {deg}
          </span>
        </div>
      </div>

      {/* Climate filters */}
      <div className={`${rowClass} mt-6`}>
        <button type="button" onClick={() => setActiveKey(null)} className={chip(activeKey === null)}>
          Any conditions
        </button>
        {chipCounts.map((c) => (
          <button
            key={c.key}
            type="button"
            disabled={c.count === 0}
            onClick={() => setActiveKey(activeKey === c.key ? null : c.key)}
            className={`${chip(activeKey === c.key)} disabled:cursor-not-allowed disabled:opacity-40`}
          >
            {c.label} <span className="opacity-60">{c.count}</span>
          </button>
        ))}
      </div>

      {/* Region */}
      <div className={`${rowClass} mt-2`}>
        <button type="button" onClick={() => setRegion(null)} className={chip(region === null)}>
          Everywhere
        </button>
        {regionCounts.map((r) => (
          <button
            key={r.region}
            type="button"
            onClick={() => setRegion(region === r.region ? null : r.region)}
            className={chip(region === r.region)}
          >
            {r.region} <span className="opacity-60">{r.count}</span>
          </button>
        ))}
      </div>

      {/* Grid */}
      {visible.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          Nothing matches that combination. Try widening the temperature range.
        </p>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {visible.slice(0, shown).map((d) => (
              <Link
                key={d.slug}
                href={`/${d.slug}`}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-accent hover:shadow-elegant"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={d.image}
                    alt={`${d.name}, ${d.country}`}
                    fill
                    sizes="(max-width:639px) calc((100vw - 48px) / 2), (max-width:1023px) calc((100vw - 80px) / 3), 292px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute right-2 top-2 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-neutral-900 shadow-sm backdrop-blur">
                    {Math.round(toDisplay(d.tempC, unit))}
                    {deg}
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="truncate font-serif text-lg font-semibold text-foreground">{d.name}</h3>
                  <p className="truncate text-xs text-muted-foreground">{d.country}</p>
                  {/* No fare, no line. Never the catalog estimate as a stand-in —
                      it is a Stockholm number and wrong by a median 2.35x here. */}
                  {d.fareLabel && (
                    <p className="mt-1.5 truncate text-xs font-medium text-accent">{d.fareLabel}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {visible.length > shown && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setShown((n) => n + PAGE_SIZE)}
                className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent"
              >
                Show more ({visible.length - shown} left)
              </button>
            </div>
          )}
        </>
      )}

      {/* Sits outside the empty/grid branch on purpose: when a chip hides more than it
          keeps, this line is the only thing that explains the short list — and when it
          hides everything, it is the only thing on screen worth reading. */}
      {activeChip && missingData.length > 0 && (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {missingData.length} {missingData.length === 1 ? "destination" : "destinations"} hidden —{" "}
          {activeChip.missingLabel} for {monthLabel}
        </p>
      )}
    </div>
  );
}
