import { Clock, Wallet, Navigation } from "lucide-react";
import type { BcnPlace } from "@/app/data/barcelona-places";

/**
 * Long-form SEO block rendered below the interactive explorer on each Barcelona
 * category page. Every place gets an anchored H2 (the card's "View details"
 * links here), a 150–200 word description, a practical-info box and an insider
 * tip — the crawlable, keyword-rich content Google rewards.
 */
export function CategorySeoSections({ heading, items }: { heading: string; items: BcnPlace[] }) {
  return (
    <div className="mt-16 border-t border-border pt-10">
      <div className="mb-3 h-0.5 w-10 rounded bg-accent" />
      <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">{heading}</h2>

      <div className="mt-8 space-y-12">
        {items.map((p, i) => (
          <section key={p.slug} id={p.slug} className="scroll-mt-28">
            <h3 className="flex items-baseline gap-3 font-serif text-xl font-semibold text-foreground sm:text-2xl">
              <span className="font-serif text-lg font-bold text-accent">{i + 1}.</span>
              {p.name}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{p.fullDescription}</p>

            {/* Practical info */}
            <div className="mt-5 grid gap-3 rounded-2xl border border-border bg-card p-5 sm:grid-cols-3">
              <div>
                <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-accent">
                  <Clock className="h-3.5 w-3.5" /> Hours
                </p>
                <p className="mt-1 text-sm text-foreground">{p.practicalInfo.openingHours}</p>
              </div>
              <div>
                <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-accent">
                  <Wallet className="h-3.5 w-3.5" /> Price
                </p>
                <p className="mt-1 text-sm text-foreground">{p.practicalInfo.price}</p>
              </div>
              <div>
                <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-accent">
                  <Navigation className="h-3.5 w-3.5" /> Getting there
                </p>
                <p className="mt-1 text-sm text-foreground">{p.practicalInfo.howToGetThere}</p>
              </div>
            </div>

            {/* Insider tip */}
            <p className="mt-4 rounded-xl border border-accent/20 bg-accent/8 px-4 py-2.5 text-sm text-muted-foreground">
              <span className="font-semibold text-accent">Insider tip:</span> {p.tip}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
