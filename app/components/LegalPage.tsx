import Link from "next/link";
import type { ReactNode } from "react";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { SITE } from "@/app/lib/destination-helpers";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";

export const LEGAL_UPDATED = "17 August 2026";
export const CONTACT_EMAIL = "contact@flyamba.com";

/**
 * Shared chrome for /privacy, /terms and /cookies so the three read as one
 * document set. Body copy is passed in as children and styled by .legal-prose.
 */
export function LegalPage({
  title,
  intro,
  path,
  children,
}: {
  title: string;
  intro: string;
  path: string;
  children: ReactNode;
}) {

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6">
        <Breadcrumbs items={[{ name: "Flyamba", href: "/" }, { name: title }]} />
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Legal</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-foreground sm:text-5xl">{title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{intro}</p>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: {LEGAL_UPDATED}</p>

        <div className="legal-prose mt-12">{children}</div>

        <div className="mt-14 rounded-3xl border border-border bg-card p-6">
          <h2 className="font-serif text-xl font-semibold text-foreground">Questions?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Email us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-accent hover:underline">
              {CONTACT_EMAIL}
            </a>{" "}
            or use the{" "}
            <Link href="/contact" className="font-semibold text-accent hover:underline">
              contact page
            </Link>
            . We usually reply within 24 hours.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
