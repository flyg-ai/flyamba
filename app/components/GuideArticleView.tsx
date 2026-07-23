import Image from "next/image";
import Link from "next/link";
import { guides, guideHref, type Guide } from "@/app/data/guides";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { FlightCTA } from "@/app/components/FlightCTA";
import { SITE } from "@/app/lib/destination-helpers";
import { Clock, ArrowRight } from "lucide-react";

/**
 * Full guide article layout. Guides are served as Barcelona subpages
 * (/barcelona/[path]); each static page passes its Guide here to render.
 */
export function GuideArticleView({ guide: g }: { guide: Guide }) {
  const related = guides.filter((x) => x.slug !== g.slug).slice(0, 3);
  const url = `${SITE}${guideHref(g)}`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Barcelona", item: `${SITE}/barcelona` },
      { "@type": "ListItem", position: 3, name: "Guides", item: `${SITE}/barcelona#guides` },
      { "@type": "ListItem", position: 4, name: g.title, item: url },
    ],
  };
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.excerpt,
    image: g.image,
    datePublished: g.publishedAt,
    author: { "@type": "Organization", name: "Flyamba" },
    publisher: { "@type": "Organization", name: "Flyamba" },
    mainEntityOfPage: url,
  };

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article).replace(/</g, "\\u003c") }} />
      <Navbar transparent />

      {/* Hero */}
      <section className="relative isolate h-[56vh] min-h-[420px] w-full overflow-hidden">
        <Image src={g.image} alt={g.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto flex h-full max-w-3xl flex-col justify-end px-4 pb-10 pt-24 sm:px-6">
          <div className="text-white/90">
            <Breadcrumbs
              items={[
                { name: "Flyamba", href: "/" },
                { name: "Barcelona", href: "/barcelona" },
                { name: "Guides", href: "/barcelona#guides" },
                { name: g.category },
              ]}
            />
          </div>
          <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent-foreground">
            {g.category}
          </span>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-white sm:text-5xl">{g.title}</h1>
          <p className="mt-3 flex items-center gap-2 text-sm text-white/80">
            <Clock className="h-4 w-4" /> {g.readTime} read
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="text-lg leading-relaxed text-muted-foreground">{g.excerpt}</p>
        <div className="guide-prose mt-8" dangerouslySetInnerHTML={{ __html: g.content }} />
      </article>

      {/* CTA + related */}
      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
        <FlightCTA />

        <h2 className="mt-14 font-serif text-2xl font-semibold text-foreground">More Barcelona guides</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {related.map((r) => (
            <Link key={r.slug} href={guideHref(r)} className="group overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-elegant">
              <div className="relative h-32 overflow-hidden">
                <Image src={r.image} alt={r.title} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-4">
                <p className="text-[11px] uppercase tracking-widest text-accent">{r.category}</p>
                <h3 className="mt-1 font-serif text-base font-semibold leading-tight text-foreground">{r.title}</h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link href="/barcelona#guides" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">
            ← All Barcelona guides <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
