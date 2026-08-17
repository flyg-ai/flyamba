"use client";

import { useEffect, useMemo, useState } from "react";

// Price calendar ported from flyg.ai. Two months side by side (one on mobile),
// one fare per day from /api/tp-calendar, and a two-click departure → return
// selection that hands off to Kiwi through the tp.media affiliate redirect.
//
// Price coverage comes from Travelpayouts' 48-hour search cache, so many days
// have no fare — those render as empty cells rather than being hidden, so the
// grid keeps its calendar shape.
//
// Differences from the flyg.ai original: English throughout, USD instead of SEK,
// the accent is Flyamba orange, and colours are bound to the design tokens so
// the component works on both the light and dark themes.

const ACCENT = "#FF6B35";

// Airline IATA codes used by the `airline` filter, so an airline landing page
// can show only the days that carrier actually flies.
export const AIRLINE_IATA: Record<string, string> = {
  ryanair: "FR",
  easyjet: "U2",
  "british-airways": "BA",
  lufthansa: "LH",
  klm: "KL",
  norwegian: "DY",
};

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

type Props = {
  destinationIata: string;
  destinationCity: string;
  /** Restrict the calendar to departures operated by this carrier. */
  airlineCode?: string;
  /** Shown when the carrier filter leaves nothing, to name what was filtered. */
  airlineName?: string;
};

type CalendarData = {
  dates: Record<string, number>;
  airlines: Record<string, string>;
  origin: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

// Local YYYY-MM-DD. Deliberately not toISOString(), which switches to UTC and
// would report yesterday for anyone east of Greenwich late in the day.
const ymd = (year: number, monthIndex: number, day: number) =>
  `${year}-${pad(monthIndex + 1)}-${pad(day)}`;

// Monday-first weekday index (JS getDay() is Sunday-first).
const mondayIndex = (date: Date) => (date.getDay() + 6) % 7;

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

export default function PrisKalender({
  destinationIata,
  destinationCity,
  airlineCode,
  airlineName,
}: Props) {
  const [data, setData] = useState<CalendarData | null>(null);
  const [monthOffset, setMonthOffset] = useState(0);
  const [dep, setDep] = useState<string | null>(null);
  const [ret, setRet] = useState<string | null>(null);
  // Set when window.open was swallowed by a popup blocker, so there is still a
  // way through to Kiwi.
  const [blockedUrl, setBlockedUrl] = useState<string | null>(null);

  const iata = destinationIata.trim().toUpperCase();

  // Reset during render when the destination changes rather than in an effect —
  // React's documented pattern for state derived from props, and the only one
  // that doesn't trip react-hooks/set-state-in-effect.
  const [prevIata, setPrevIata] = useState(iata);
  if (prevIata !== iata) {
    setPrevIata(iata);
    setData(null);
    setDep(null);
    setRet(null);
    setBlockedUrl(null);
    setMonthOffset(0);
  }

  // null data means "still loading" — no separate flag to keep in sync.
  const loading = data === null;

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/tp-calendar?iata=${encodeURIComponent(iata)}`)
      .then((r) => (r.ok ? r.json() : { dates: {}, airlines: {}, origin: "" }))
      .then((json: CalendarData) => {
        if (cancelled) return;
        setData({ dates: json?.dates ?? {}, airlines: json?.airlines ?? {}, origin: json?.origin ?? "" });
      })
      .catch(() => {
        if (!cancelled) setData({ dates: {}, airlines: {}, origin: "" });
      });

    return () => {
      cancelled = true;
    };
  }, [iata]);

  // The carrier filter is applied before anything else reads prices, so the
  // colour thresholds and the "cheapest" summary describe what is actually shown.
  const prices = useMemo(() => {
    if (!data) return {} as Record<string, number>;
    if (!airlineCode) return data.dates;
    const out: Record<string, number> = {};
    for (const [date, price] of Object.entries(data.dates)) {
      if (data.airlines[date] === airlineCode) out[date] = price;
    }
    return out;
  }, [data, airlineCode]);

  const today = useMemo(() => new Date(), []);
  const todayStr = ymd(today.getFullYear(), today.getMonth(), today.getDate());

  // Thresholds are computed across the WHOLE returned window, not just the two
  // visible months — "green" should mean cheap for the route, not cheap relative
  // to the fortnight you happen to be looking at. Too few priced days makes the
  // quantiles noise, so below that we skip colouring entirely.
  const stats = useMemo(() => {
    const values = Object.values(prices).sort((a, b) => a - b);
    if (values.length < 5) return null;
    return {
      p20: values[Math.floor(values.length * 0.2)],
      p80: values[Math.ceil(values.length * 0.8) - 1],
    };
  }, [prices]);

  const cheapestDate = useMemo(() => {
    let best: { date: string; price: number } | null = null;
    for (const [date, price] of Object.entries(prices)) {
      if (date < todayStr) continue;
      if (!best || price < best.price) best = { date, price };
    }
    return best;
  }, [prices, todayStr]);

  // How far ahead the data reaches, so "next month" stops at the last month with
  // prices instead of paging into empty grids.
  const maxOffset = useMemo(() => {
    const keys = Object.keys(prices);
    if (!keys.length) return 0;
    const last = keys.sort().at(-1)!;
    const [y, m] = last.split("-").map(Number);
    const diff = (y - today.getFullYear()) * 12 + (m - 1 - today.getMonth());
    return Math.max(0, diff);
  }, [prices, today]);

  function tierOf(price: number): "cheap" | "mid" | "expensive" {
    if (!stats) return "mid";
    if (price <= stats.p20) return "cheap";
    if (price >= stats.p80) return "expensive";
    return "mid";
  }

  const origin = data?.origin || "";

  function affiliate(url: string): string {
    return `https://tp.media/r?marker=711264.flyamba&trs=508580&p=4478&u=${encodeURIComponent(url)}`;
  }

  function buildKiwiUrl(depDate: string, retDate: string): string {
    return affiliate(
      `https://www.kiwi.com/deep?from=${origin}&to=${iata}&departure=${depDate}&arrival=${retDate}`,
    );
  }

  // First click picks departure. The second picks the return and goes straight
  // to Kiwi. Clicking on or before the departure (or after a complete pair)
  // restarts the selection instead of creating a backwards range.
  function pick(date: string) {
    setBlockedUrl(null);
    if (!dep || ret || date <= dep) {
      setDep(date);
      setRet(null);
      return;
    }
    setRet(date);
    const url = buildKiwiUrl(dep, date);
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) setBlockedUrl(url);
  }

  function reset() {
    setDep(null);
    setRet(null);
    setBlockedUrl(null);
  }

  const monthsToRender = [monthOffset, monthOffset + 1].map((offset) => {
    const d = new Date(today.getFullYear(), today.getMonth() + offset, 1);
    return { year: d.getFullYear(), monthIndex: d.getMonth() };
  });

  const hasAnyPrice = Object.keys(prices).length > 0;
  const noPriceHref = affiliate(`https://www.kiwi.com/deep?from=${origin}&to=${iata}`);

  return (
    <div className="pk-root">
      <style>{`
        .pk-root {
          font-family: var(--font-inter), sans-serif;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 18px 16px 16px;
        }
        .pk-head-text { font-size: 15px; font-weight: 800; color: var(--foreground); letter-spacing: -0.01em; }
        .pk-sub { font-size: 13px; color: var(--muted-foreground); margin: 4px 0 14px; line-height: 1.5; }
        .pk-sub b { color: ${ACCENT}; font-weight: 800; }

        .pk-nav { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .pk-nav-btn {
          width: 34px; height: 34px; flex: 0 0 auto;
          border-radius: 9px; cursor: pointer;
          background: var(--muted); border: 1px solid var(--border);
          color: var(--foreground); font-size: 15px; font-weight: 800; line-height: 1;
          transition: background 0.12s, border-color 0.12s;
        }
        .pk-nav-btn:hover:not(:disabled) { border-color: ${ACCENT}; color: ${ACCENT}; }
        .pk-nav-btn:disabled { opacity: 0.35; cursor: not-allowed; }
        .pk-nav-spacer { flex: 1 1 auto; }
        .pk-reset {
          padding: 7px 13px; border-radius: 100px; cursor: pointer;
          background: transparent; border: 1px solid var(--border);
          color: var(--muted-foreground); font-size: 12.5px; font-weight: 700; font-family: inherit;
        }
        .pk-reset:hover { color: ${ACCENT}; border-color: ${ACCENT}; }

        .pk-months { display: grid; grid-template-columns: 1fr; gap: 22px; }
        @media (min-width: 768px) { .pk-months { grid-template-columns: 1fr 1fr; gap: 26px; } }
        /* Only the leading month renders on mobile — the arrows page through the
           rest, so nothing becomes unreachable. */
        .pk-month:nth-child(2) { display: none; }
        @media (min-width: 768px) { .pk-month:nth-child(2) { display: block; } }

        .pk-month-name { font-size: 14px; font-weight: 800; color: var(--foreground); text-align: center; margin: 0 0 10px; }
        .pk-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
        .pk-wd {
          font-size: 10.5px; font-weight: 700; text-transform: uppercase;
          color: var(--muted-foreground); text-align: center; padding-bottom: 4px;
          letter-spacing: 0.03em; opacity: 0.75;
        }
        .pk-cell {
          aspect-ratio: 1 / 1;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 1px; padding: 2px;
          border-radius: 8px; border: 1px solid transparent;
          background: transparent; font-family: inherit; color: var(--foreground);
          cursor: pointer; overflow: hidden;
          transition: transform 0.1s, border-color 0.1s, background 0.1s;
        }
        .pk-cell:disabled { cursor: default; }
        /* Day on top, price below — but only in cells that actually have a
           price. In an empty cell space-between strands the day number at the
           top and looks misplaced, so those stay centred. */
        .pk-cell.pk-has-price { justify-content: space-between; padding: 5px 2px; }
        .pk-cell-day { font-size: 12px; font-weight: 700; line-height: 1; }
        .pk-cell-price {
          font-size: 11px; font-weight: 800; line-height: 1; white-space: nowrap;
          /* Tabular figures stop the price column jittering between days. */
          font-variant-numeric: tabular-nums;
        }
        .pk-cell-price.pk-price-long { font-size: 9.5px; }
        @media (min-width: 768px) {
          .pk-cell-day { font-size: 13px; }
          .pk-cell-price { font-size: 13px; }
          .pk-cell-price.pk-price-long { font-size: 11px; }
        }

        .pk-empty-cell { background: transparent; }
        .pk-past { opacity: 0.3; }
        .pk-noprice {
          background: color-mix(in oklab, var(--muted) 60%, transparent);
          border-color: var(--border); color: var(--muted-foreground);
        }
        .pk-cheap { background: rgba(22,163,74,0.12); border-color: rgba(22,163,74,0.45); color: #166534; }
        .pk-mid { background: var(--muted); border-color: var(--border); color: var(--foreground); }
        .pk-expensive { background: rgba(220,38,38,0.10); border-color: rgba(220,38,38,0.40); color: #b91c1c; }
        /* The light-theme greens and reds go muddy on the dark card, so the dark
           theme gets lighter text on the same translucent fills. */
        :root[data-theme="dark"] .pk-cheap, .dark .pk-cheap { color: #4ade80; }
        :root[data-theme="dark"] .pk-expensive, .dark .pk-expensive { color: #f87171; }

        .pk-cell:not(:disabled):hover { transform: translateY(-1px); border-color: ${ACCENT}; }
        .pk-inrange { background: rgba(255,107,53,0.12); border-color: rgba(255,107,53,0.32); }
        .pk-selected {
          background: ${ACCENT} !important; border-color: ${ACCENT} !important;
          color: #fff !important; box-shadow: 0 0 0 2px rgba(255,107,53,0.30);
        }
        .pk-cell:focus-visible { outline: 2px solid ${ACCENT}; outline-offset: 1px; }

        .pk-legend {
          display: flex; flex-wrap: wrap; gap: 14px;
          margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--border);
          font-size: 12px; color: var(--muted-foreground);
        }
        .pk-legend-item { display: inline-flex; align-items: center; gap: 6px; }
        .pk-swatch { width: 11px; height: 11px; border-radius: 3px; display: inline-block; }
        .pk-note { margin: 12px 0 0; font-size: 12px; line-height: 1.55; color: var(--muted-foreground); }
        .pk-status { padding: 28px 8px; text-align: center; font-size: 14px; color: var(--muted-foreground); }
        .pk-blocked {
          margin: 12px 0 0; padding: 11px 13px; border-radius: 10px;
          background: rgba(255,107,53,0.10); border: 1px solid rgba(255,107,53,0.35);
          font-size: 13px; color: var(--foreground);
        }
        .pk-blocked a { color: ${ACCENT}; font-weight: 800; }
      `}</style>

      <div className="pk-head">
        <span className="pk-head-text">Find the cheapest day to fly — select departure and return</span>
      </div>
      <p className="pk-sub">
        Round-trip fares{origin ? ` from ${origin}` : ""} to {destinationCity} ({iata})
        {airlineName ? `, ${airlineName} only` : ""}.
        {cheapestDate && (
          <>
            {" "}Cheapest right now: <b>{usd(cheapestDate.price)}</b>.
          </>
        )}
      </p>

      {loading ? (
        <p className="pk-status">Loading prices…</p>
      ) : !hasAnyPrice ? (
        <p className="pk-status">
          No prices available for this route right now.{" "}
          <a
            href={noPriceHref}
            target="_blank"
            rel="noopener noreferrer sponsored"
            style={{ color: ACCENT, fontWeight: 800 }}
          >
            Search on Kiwi &rarr;
          </a>
        </p>
      ) : (
        <>
          <div className="pk-nav">
            <button
              type="button"
              className="pk-nav-btn"
              onClick={() => setMonthOffset((v) => Math.max(0, v - 1))}
              disabled={monthOffset === 0}
              aria-label="Previous month"
            >
              ‹
            </button>
            <button
              type="button"
              className="pk-nav-btn"
              onClick={() => setMonthOffset((v) => Math.min(maxOffset, v + 1))}
              disabled={monthOffset >= maxOffset}
              aria-label="Next month"
            >
              ›
            </button>
            <span className="pk-nav-spacer" />
            {(dep || ret) && (
              <button type="button" className="pk-reset" onClick={reset}>
                Clear dates
              </button>
            )}
          </div>

          <div className="pk-months">
            {monthsToRender.map(({ year, monthIndex }) => {
              const leading = mondayIndex(new Date(year, monthIndex, 1));
              const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

              return (
                <div className="pk-month" key={`${year}-${monthIndex}`}>
                  <h3 className="pk-month-name">
                    {MONTHS[monthIndex]} {year}
                  </h3>
                  <div className="pk-grid">
                    {WEEKDAYS.map((w) => (
                      <div className="pk-wd" key={w}>
                        {w}
                      </div>
                    ))}
                    {Array.from({ length: leading }).map((_, i) => (
                      <div className="pk-cell pk-empty-cell" key={`lead-${i}`} aria-hidden />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const date = ymd(year, monthIndex, day);
                      const price = prices[date];
                      const isPast = date < todayStr;
                      const isDep = date === dep;
                      const isRet = date === ret;
                      const inRange = !!dep && !!ret && date > dep && date < ret;
                      const selected = isDep || isRet;

                      const classes = ["pk-cell"];
                      if (isPast) classes.push("pk-past");
                      if (price == null) classes.push("pk-noprice");
                      else classes.push(`pk-${tierOf(price)}`, "pk-has-price");
                      if (inRange) classes.push("pk-inrange");
                      if (selected) classes.push("pk-selected");

                      const label = isPast
                        ? `${day} ${MONTHS[monthIndex]} — in the past`
                        : price != null
                          ? `${day} ${MONTHS[monthIndex]}, from ${usd(price)}${
                              isDep ? " — selected departure" : isRet ? " — selected return" : ""
                            }`
                          : `${day} ${MONTHS[monthIndex]} — no price`;

                      return (
                        <button
                          type="button"
                          key={date}
                          className={classes.join(" ")}
                          disabled={isPast}
                          aria-pressed={selected}
                          aria-label={label}
                          onClick={() => pick(date)}
                        >
                          <span className="pk-cell-day">{day}</span>
                          {price != null && (
                            <span className={`pk-cell-price${price >= 1000 ? " pk-price-long" : ""}`}>
                              {usd(price)}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {blockedUrl && (
            <p className="pk-blocked">
              Your popup blocker stopped the new window.{" "}
              <a href={blockedUrl} target="_blank" rel="noopener noreferrer sponsored">
                Open the search on Kiwi &rarr;
              </a>
            </p>
          )}

          <div className="pk-legend">
            <span className="pk-legend-item">
              <span className="pk-swatch" style={{ background: "rgba(22,163,74,0.55)" }} /> Cheapest
            </span>
            <span className="pk-legend-item">
              <span className="pk-swatch" style={{ background: "var(--border)" }} /> Typical
            </span>
            <span className="pk-legend-item">
              <span className="pk-swatch" style={{ background: "rgba(220,38,38,0.55)" }} /> Most expensive
            </span>
            <span className="pk-legend-item">
              <span className="pk-swatch" style={{ background: ACCENT }} /> Selected date
            </span>
            <span className="pk-legend-item">Prices in USD, round trip</span>
          </div>

          <p className="pk-note">
            {dep && !ret
              ? `Departure ${dep} selected — click a later date for your return.`
              : "Click a day for your departure, then a day for your return — you'll be sent to Kiwi with the dates filled in."}
            {" "}Empty cells have no cached fare; prices update daily and may have changed at the airline.
          </p>
        </>
      )}
    </div>
  );
}
