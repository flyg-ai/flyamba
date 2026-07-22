"use client";

import Link from "next/link";
import { Plane, Globe, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/", label: "Search" },
  { href: "/#explore", label: "Explore" },
  { href: "/compare", label: "Compare" },
  { href: "/#deals", label: "Deals" },
];

// Hash anchors scroll within the homepage (plain <a>); real routes get a
// client-side <Link>.
const isRoute = (href: string) => !href.includes("#");

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
