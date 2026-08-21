"use client";

import Link from "next/link";
import { Plane, Globe, Menu, X, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { DEPARTURES, departureHref } from "@/app/lib/departures";

/**
 * The departure cities, read from the same array the fourteen routes are built
 * from. Hardcoding a second list here would drift the moment a city is added or
 * a slug changes, and a nav link to a route that no longer exists is worse than
 * no link at all.
 *
 * ALPHABETICAL, NOT BY VOLUME. DEPARTURES is ordered by search volume, which is
 * right for deciding what to build and wrong for a menu: someone opening this is
 * looking for their own city and scanning for it. Volume order only helps a
 * reader who does not know what they want, and that is not who clicks "Flights
 * from".
 */
const DEPARTURE_LINKS = [...DEPARTURES]
  .sort((a, b) => a.city.localeCompare(b.city, "en"))
  .map((d) => ({ href: departureHref(d.slug), label: d.city }));

type NavLink = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

const links: NavLink[] = [
  { href: "/", label: "Search" },
  { href: "/where-is-it-warm", label: "Where's it warm" },
  { href: "/cheap-flights", label: "Flights from", children: DEPARTURE_LINKS },
  // "low fare calendar" is the searched phrase — 9,000/mo at KD 12 — and this is
  // the most repeated anchor text on the site, since it sits on every page.
  { href: "/low-fare-calendar", label: "Low fare calendar" },
  { href: "/guides", label: "Guides" },
  { href: "/compare", label: "Compare" },
];

// Hash anchors scroll within the homepage (plain <a>); real routes get a
// client-side <Link>.
const isRoute = (href: string) => !href.includes("#");

/**
 * A nav item that opens a menu, with the trigger still being a real link.
 *
 * Behaviour follows flyg.ai's NavDropdown: pointer outside closes on mousedown,
 * Escape closes, and both handlers are only bound while open. The trigger keeps
 * its href so the hub is reachable by click and by keyboard even though hovering
 * opens the menu — a trigger that only toggles would strand anyone who tabs to it.
 */
function NavDropdown({
  href,
  label,
  items,
  className,
  onNavigate,
}: {
  href: string;
  label: string;
  items: { href: string; label: string }[];
  className: string;
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      // Keyboard users never fire mouseenter, so opening has to survive focus
      // moving into the trigger or anywhere inside the menu.
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <Link
        href={href}
        className={`${className} inline-flex items-center gap-1`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => {
          setOpen(false);
          onNavigate?.();
        }}
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </Link>

      {open && (
        <div
          role="menu"
          aria-label={label}
          className="absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3"
        >
          <div className="grid gap-0.5 rounded-2xl border border-border bg-background p-2 shadow-xl">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                // Fourteen links in the viewport would have Next fetch fourteen
                // route payloads on every page view. They only render once the
                // menu opens, but the prop costs nothing and this is the exact
                // trap that put 535 KiB on every flyg.ai page.
                prefetch={false}
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-accent"
                onClick={() => {
                  setOpen(false);
                  onNavigate?.();
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Navbar({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const useTransparent = transparent && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${
        useTransparent
          ? "bg-transparent border-transparent"
          : "bg-background/80 backdrop-blur-xl border-b border-border"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-accent-foreground">
            <Plane className="h-4 w-4 -rotate-45" />
          </span>
          <span
            className={`font-serif text-2xl font-semibold tracking-tight ${
              useTransparent ? "text-white" : "text-foreground"
            }`}
          >
            Flyamba
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const cls = `text-sm font-medium transition-colors hover:text-accent ${
              useTransparent ? "text-white/90" : "text-foreground/80"
            }`;
            if (l.children) {
              return <NavDropdown key={l.href} href={l.href} label={l.label} items={l.children} className={cls} />;
            }
            return isRoute(l.href) ? (
              <Link key={l.href} href={l.href} className={cls}>
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} className={cls}>
                {l.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="Language"
            className={`hidden h-10 items-center gap-1.5 rounded-full border px-3 text-xs font-medium sm:flex ${
              useTransparent
                ? "border-white/20 bg-white/10 text-white backdrop-blur"
                : "border-border bg-card/60 text-foreground"
            }`}
          >
            <Globe className="h-3.5 w-3.5" />
            EN
          </button>
          <ThemeToggle />
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-border md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {links.map((l) => {
              const cls = "rounded-lg px-3 py-3 text-sm font-medium text-foreground hover:bg-muted";
              // NO NESTED DROPDOWN ON MOBILE. The menu is already an expanded
              // list, so the cities go under a heading in the same flow — a
              // second layer of tap-to-open inside an open menu is a place to
              // get lost, not a way to save space.
              if (l.children) {
                return (
                  <div key={l.href} className="contents">
                    <Link href={l.href} onClick={() => setOpen(false)} className={cls}>
                      {l.label}
                    </Link>
                    <p className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Departure cities
                    </p>
                    {l.children.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        prefetch={false}
                        onClick={() => setOpen(false)}
                        className="rounded-lg px-3 py-2.5 pl-6 text-sm text-foreground/80 hover:bg-muted"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                );
              }
              return isRoute(l.href) ? (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className={cls}>
                  {l.label}
                </Link>
              ) : (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className={cls}>
                  {l.label}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
