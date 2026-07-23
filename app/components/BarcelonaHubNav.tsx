"use client";

import { useEffect, useState } from "react";

/**
 * Sticky in-page navigation for the Barcelona hub. Each tab smooth-scrolls to a
 * section on the page and highlights while that section is in view. Sits below
 * the main navbar (top-16), scrolls horizontally on mobile.
 */
const TABS = [
  { id: "flights", label: "Flights" },
  { id: "explore", label: "Explore" },
  { id: "cheapest-months", label: "Cheapest months" },
  { id: "nonstop", label: "Nonstop routes" },
  { id: "guides", label: "Guides" },
  { id: "nearby", label: "Nearby" },
];

export function BarcelonaHubNav() {
  const [active, setActive] = useState<string>(TABS[0].id);

  useEffect(() => {
    const sections = TABS.map((t) => document.getElementById(t.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    // Offset for the fixed navbar (h-16) + this sticky bar.
    const y = el.getBoundingClientRect().top + window.scrollY - 128;
    window.scrollTo({ top: y, behavior: "smooth" });
    setActive(id);
  };

  return (
    <div className="sticky top-16 z-30 border-b border-border bg-card/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TABS.map((t) => {
          const isActive = active === t.id;
          return (
            <a
              key={t.id}
              href={`#${t.id}`}
              onClick={(e) => handleClick(e, t.id)}
              aria-current={isActive ? "true" : undefined}
              className={`inline-flex shrink-0 items-center rounded-full border px-4 py-2 text-xs font-semibold transition ${
                isActive
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-accent hover:text-accent"
              }`}
            >
              {t.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
