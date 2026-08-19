import Link from "next/link";
import type { ReactNode } from "react";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { AskAiWidget } from "@/app/components/AskAiWidget";
import { SmartImage } from "@/app/components/SmartImage";
import { CitySubNav, type CityCategory } from "@/app/components/CitySubNav";
import { FlightCTA } from "@/app/components/FlightCTA";
import { ArrowRight } from "lucide-react";


/**
 * Generic city subpage shell (the multi-city equivalent of GuideShell): navbar,
 * hero with breadcrumb + H1, the city sub-nav, page content, an AI Q&A widget,
 * an internal flight CTA, related-category links and the footer.
 */
export function CityGuideShell({
  citySlug,
  cityName,
  categories,
  active,
  crumb,
  h1,
  heroImage,
  intro,
  children,
  wide = false,
}: {
  citySlug: string;
  cityName: string;
  categories: CityCategory[];
  active: string;
  crumb: string;
  h1: string;
  heroImage: string;
  intro: string;
  children: ReactNode;
  wide?: boolean;
}) {
  const related = categories.filter((c) => c.slug && c.slug !== active).slice(0, 6);
  return (
    <div className="min-h-screen bg-background">
      <Navbar transparent />

      {/* Hero */}
      <section className="relative isolate h-[52vh] min-h-[380px] w-full overflow-hidden">
        <SmartImage src={heroImage} alt={`${h1} — ${cityName}`} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col justify-end px-4 pb-10 pt-24 sm:px-6 lg:px-8">
          <div className="text-white/90">
            <Breadcrumbs
              items={[
                { name: "Flyamba", href: "/" },
                { name: cityName, href: `/${citySlug}` },
                { name: crumb },
              ]}
            />
          </div>
          <h1 className="mt-4 font-serif text-4xl font-semibold text-white sm:text-5xl">{h1}</h1>
        </div>
      </section>

      <CitySubNav citySlug={citySlug} categories={categories} active={active} />

      {/* Content */}
      <article className={`mx-auto px-4 py-14 sm:px-6 lg:px-8 ${wide ? "max-w-6xl" : "max-w-3xl"}`}>
        <p className="text-lg leading-relaxed text-muted-foreground">{intro}</p>
        {children}
      </article>

      {/* AI + CTA + related */}
      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-10">
          <AskAiWidget destination={cityName} heading="Have more questions? Ask our AI" />
        </div>

        <FlightCTA destination={{ slug: citySlug, name: cityName }} />

        <h2 className="mt-14 font-serif text-2xl font-semibold text-foreground">More {cityName} guides</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <Link
              key={p.slug}
              href={`/${citySlug}/${p.slug}`}
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
          <Link href={`/${citySlug}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">
            ← Back to {cityName} flights &amp; overview
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
