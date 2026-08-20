import Link from "next/link";
import { Fragment } from "react";

/**
 * Renders a copy string, turning `[Austin](/cheap-flights-from-austin)` into a
 * link.
 *
 * WHY THIS EXISTS RATHER THAN A PARALLEL LINKS FIELD. The first attempt kept the
 * links in a separate `links` array on each section, because the copy is plain
 * strings and cannot carry JSX. That produced a row of pills under the prose —
 * not links a reader clicks mid-sentence — and it drifted immediately: December's
 * pill row offered Chicago, Denver, Minneapolis, Detroit and Seattle while the
 * paragraph above it named New York, Miami, Austin, Tampa and Minneapolis. Two
 * places to edit, one of which nobody re-reads.
 *
 * ONLY FOR SECTION BODIES. FAQ answers go into the FAQPage JSON-LD verbatim, so
 * link syntax there would ship as literal brackets inside structured data. The
 * type keeps them apart; do not widen this.
 */

// Internal paths only. A bare `/…` cannot be an absolute URL, and rejecting `//`
// closes the protocol-relative form that would leave the site.
const LINK = /\[([^\]\n]+)\]\((\/[^)\s]*)\)/g;

export function CopyText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;

  for (const m of text.matchAll(LINK)) {
    const [full, label, href] = m;
    const at = m.index ?? 0;
    if (at > last) parts.push(text.slice(last, at));
    if (href.startsWith("//")) {
      // Not a link we are willing to render — keep the label as plain text.
      parts.push(label);
    } else {
      parts.push(
        <Link key={`${href}-${at}`} href={href} className="text-accent underline-offset-4 hover:underline">
          {label}
        </Link>,
      );
    }
    last = at + full.length;
  }
  if (last < text.length) parts.push(text.slice(last));

  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>{p}</Fragment>
      ))}
    </>
  );
}
