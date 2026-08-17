"use client";

import { useState } from "react";
import PrisKalender from "@/app/components/PrisKalender";

export type PickerDestination = { slug: string; city: string; iata: string };

/**
 * Destination switcher above the calendar on an airline page. PrisKalender
 * already resets its own state when destinationIata changes, so switching tabs
 * refetches cleanly without remounting.
 */
export function AirlineCalendarPicker({
  destinations,
  airlineCode,
  airlineName,
}: {
  destinations: PickerDestination[];
  airlineCode: string;
  airlineName: string;
}) {
  const [active, setActive] = useState(destinations[0]);

  return (
    <div>
      <div
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:px-0"
        role="tablist"
        aria-label={`${airlineName} destinations`}
      >
        {destinations.map((d) => {
          const selected = d.slug === active.slug;
          return (
            <button
              key={d.slug}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(d)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                selected
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-accent hover:text-accent"
              }`}
            >
              {d.city}
            </button>
          );
        })}
      </div>

      <div className="mt-3">
        <PrisKalender
          destinationIata={active.iata}
          destinationCity={active.city}
          airlineCode={airlineCode}
          airlineName={airlineName}
        />
      </div>
    </div>
  );
}
