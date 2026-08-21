import Image from "next/image";
import Link from "next/link";

/**
 * One destination in the homepage's cheapest-fares row.
 *
 * NARROW PROPS ON PURPOSE. The row now ranks all 554 catalog destinations
 * instead of the 8 hand-written ones, and ALL_DESTINATIONS is a large module —
 * 554 rows each carrying twelve monthly prices, image paths and scores. It is
 * read on the server and only these six fields cross into the card. Importing
 * the catalog from a component that ends up in the client bundle is what put
 * 535 KiB on every flyg.ai page.
 *
 * HomeCard is left alone. It takes the rich `Destination` and uses `weather`,
 * `flightTime` and `avgFlightHours`, none of which the slim catalog has;
 * widening it would have meant six optional fields and a card that renders
 * differently depending on which catalog it was handed.
 */
export type Deal = {
  slug: string;
  name: string;
  country: string;
  image: string;
  /** "$146 rt · NYC · seen Aug 19" — formatted on the server. */
  fareLabel: string;
  /** "$146 round trip from New York". */
  headline: string;
  /** "seen Aug 19 · Dec 4–11", or null. Rendered, not just tracked: an
   *  advertised fare has to be one someone can still buy. */
  detail: string | null;
};

export function DealCard({ deal }: { deal: Deal }) {
  return (
    <div className="space-y-2">
      <Link
        href={`/${deal.slug}`}
        className="group relative block h-72 overflow-hidden rounded-3xl border border-border shadow-elegant"
      >
        <Image
          src={deal.image}
          alt={`${deal.name}, ${deal.country}`}
          fill
          sizes="(max-width:639px) calc(100vw - 32px), (max-width:1023px) calc((100vw - 72px) / 2), 390px"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        <div className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-neutral-900 shadow-sm backdrop-blur">
          <span className="text-accent">{deal.fareLabel}</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">{deal.country}</p>
          <p className="mt-1 font-serif text-2xl font-semibold text-white">{deal.name}</p>
        </div>
      </Link>
      <p className="px-1 text-sm font-semibold text-foreground">
        {deal.headline}
        {deal.detail ? <span className="ml-2 font-normal text-muted-foreground">{deal.detail}</span> : null}
      </p>
    </div>
  );
}
