import Link from "next/link";
import { Plane, Instagram, Twitter, Facebook } from "lucide-react";

const columns = [
  { title: "Product", links: ["Search", "Explore", "Compare", "Deals", "Mobile app"] },
  { title: "Company", links: ["About", "Careers", "Press", "Blog", "Contact"] },
  { title: "Support", links: ["Help center", "Trust & safety", "Cancellations", "Accessibility"] },
  { title: "Legal", links: ["Terms", "Privacy", "Cookies", "Sitemap"] },
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
            <div className="mt-6 flex gap-2">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((c) => (
              <div key={c.title}>
                <h4 className="text-sm font-semibold text-foreground">{c.title}</h4>
                <ul className="mt-4 space-y-3">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-accent">
                        {l}
                      </a>
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
