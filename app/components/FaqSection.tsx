export type FaqItem = { q: string; a: string };

/**
 * Renders the questions that back a page's FAQPage JSON-LD.
 *
 * Structured data has to describe content the visitor can actually see, so a
 * page emitting the FAQ schema must render this too — schema-only FAQs are a
 * structured-data violation, not just a missed opportunity.
 */
export function FaqSection({ items, city }: { items: FaqItem[]; city: string }) {
  return (
    <section id="faq" className="mx-auto mt-16 max-w-4xl scroll-mt-32 px-4 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Good to know</p>
      <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
        Flying to {city} — your questions answered
      </h2>
      <dl className="mt-8 space-y-4">
        {items.map((f) => (
          <div key={f.q} className="rounded-3xl border border-border bg-card p-6">
            <dt className="font-serif text-lg font-semibold text-foreground">{f.q}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
