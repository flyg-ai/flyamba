import Link from "next/link";
import { Plane } from "lucide-react";

// Every entry points at a page that exists — the previous version linked a
// column of placeholder "#" hrefs, several to pages that were never built.
const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Plan a trip",
    links: [
      { label: "Where's it warm", href: "/where-is-it-warm" },
      { label: "Cheapest dates to fly", href: "/low-fare-calendar" },
      { label: "Travel guides", href: "/guides" },
      { label: "Compare destinations", href: "/compare" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Flight search", href: "/" },
      { label: "Explore destinations", href: "/explore" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
      { label: "Cookies", href: "/cookies" },
      { label: "Sitemap", href: "/sitemap.xml" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-accent-foreground">
                <Plane className="h-4 w-4 -rotate-45" />
              </span>
              <span className="font-serif text-2xl font-semibold text-foreground">Flyamba</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              AI-powered flight search for curious travelers. Describe your dream trip — we handle the rest.
            </p>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-muted-foreground">
              Flyamba is free to use. Some links are affiliate links — if you book through one we may earn a
              commission, at no extra cost to you.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((c) => (
              <div key={c.title}>
                <h4 className="text-sm font-semibold text-foreground">{c.title}</h4>
                <ul className="mt-4 space-y-3">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      {l.href.startsWith("/sitemap") ? (
                        <a href={l.href} className="text-sm text-muted-foreground hover:text-accent">
                          {l.label}
                        </a>
                      ) : (
                        <Link href={l.href} className="text-sm text-muted-foreground hover:text-accent">
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Flyamba. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Made for travelers who value their time.</p>
        </div>
      </div>
    </footer>
  );
}
