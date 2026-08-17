import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { guideHref, type Guide } from "@/app/data/guides";

/**
 * Three-up guide strip used on the homepage and on destination hubs.
 * Renders nothing when there are no guides, so a hub without any simply has no
 * empty section.
 */
export function GuidesCarousel({
  guides,
  title,
  eyebrow = "Guides & inspiration",
  viewAllHref = "/guides",
}: {
  guides: Guide[];
  title: string;
  eyebrow?: string;
  viewAllHref?: string;
}) {
  if (guides.length === 0) return null;

  return (
    <section id="guides" className="mx-auto mt-14 max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">{title}</h2>
        </div>
        <Link
          href={viewAllHref}
          className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-accent hover:underline sm:inline-flex"
        >
          View all guides <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        {guides.map((g) => (
          <Link
            key={g.slug}
            href={guideHref(g)}
            className="group overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-elegant"
          >
            <div className="relative h-44 overflow-hidden">
              <Image
                src={g.image}
                alt={g.title}
                fill
                sizes="(max-width:1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-neutral-900">
                {g.category}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-serif text-lg font-semibold leading-tight text-foreground">{g.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{g.excerpt}</p>
              <p className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> {g.readTime} read
                </span>
                <span className="font-semibold text-accent">Read →</span>
              </p>
            </div>
          </Link>
        ))}
      </div>

      <Link
        href={viewAllHref}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline sm:hidden"
      >
        View all guides <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
