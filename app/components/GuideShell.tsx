import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { BarcelonaSubNav } from "@/app/components/BarcelonaSubNav";
import { FlightCTA } from "@/app/components/FlightCTA";
import { AskAiWidget } from "@/app/components/AskAiWidget";
import { BARCELONA_SUBPAGES, barcelonaHref } from "@/app/lib/barcelona";
import { ArrowRight } from "lucide-react";

/**
 * Shared layout for every Barcelona guide subpage: navbar, breadcrumb + H1 over
 * a hero image, the Barcelona sub-nav, the page content, related links and a
 * flight CTA.
 */
export function GuideShell({
  active,
  crumb,
  h1,
  heroImage,
  intro,
  children,
  wide = false,
}: {
  active: string; // subpage slug, e.g. "attractions"
  crumb: string; // breadcrumb tail + used for related-links exclusion
  h1: string;
  heroImage: string;
  intro: string;
  children: ReactNode;
  wide?: boolean; // widen the content column (for card-grid category pages)
}) {
  const related = BARCELONA_SUBPAGES.filter((p) => p.slug && p.slug !== active).slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Navbar transparent />

      {/* Hero */}
      <section className="relative isolate h-[52vh] min-h-[380px] w-full overflow-hidden">
        <Image src={heroImage} alt={`${h1} — Barcelona`} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col justify-end px-4 pb-10 pt-24 sm:px-6 lg:px-8">
          <div className="text-white/90">
            <Breadcrumbs
              items={[
                { name: "Flyamba", href: "/" },
                { name: "Barcelona", href: "/barcelona" },
                { name: crumb },
              ]}
            />
          </div>
          <h1 className="mt-4 font-serif text-4xl font-semibold text-white sm:text-5xl">{h1}</h1>
        </div>
      </section>

      <BarcelonaSubNav active={active} />

      {/* Content */}
      <article className={`mx-auto px-4 py-14 sm:px-6 lg:px-8 ${wide ? "max-w-6xl" : "max-w-3xl"}`}>
        <p className="text-lg leading-relaxed text-muted-foreground">{intro}</p>
        {children}
      </article>

      {/* Related + CTA */}
      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-10">
          <AskAiWidget destination="Barcelona" heading="Have more questions? Ask our AI" />
        </div>

        <FlightCTA />

        <h2 className="mt-14 font-serif text-2xl font-semibold text-foreground">More Barcelona guides</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <Link
              key={p.slug}
              href={barcelonaHref(p.slug)}
              className="group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 transition hover:-translate-y-0.5 hover:border-accent"
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <span aria-hidden>{p.emoji}</span> {p.label}
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/barcelona" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">
            ← Back to Barcelona flights &amp; overview
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* Reusable content primitives for the guide body (consistent Tailwind styling). */

export function GuideSection({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section className="mt-12 border-t border-border pt-10">
      <div className="mb-3 h-0.5 w-10 rounded bg-accent" />
      <h2 id={id} className="scroll-mt-24 font-serif text-2xl font-semibold text-foreground sm:text-3xl">
        {title}
      </h2>
      <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

export function GuideCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <h3 className="font-serif text-lg font-semibold text-foreground">{title}</h3>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}

export function Tip({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl border border-accent/20 bg-accent/8 px-4 py-2.5 text-sm text-muted-foreground">
      <span className="font-semibold text-accent">Tip:</span> {children}
    </p>
  );
}
