import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, CONTACT_EMAIL } from "@/app/components/LegalPage";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Terms of Service — Flyamba",
  description:
    "The terms for using Flyamba: what the service does, our affiliate disclosure, and why prices and availability are never guaranteed.",
  alternates: { canonical: `${SITE}/terms` },
  openGraph: { title: "Terms of Service — Flyamba", description: "Terms for using Flyamba's AI flight search." },
};

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      path="/terms"
      intro="These terms cover your use of flyamba.com. The short version: Flyamba is a free search tool, we don't sell tickets, and prices are only ever confirmed by the airline at checkout."
    >
      <h2>Accepting these terms</h2>
      <p>
        By using flyamba.com you agree to these terms. If you do not agree with them, please do not use the site.
      </p>

      <h2>What Flyamba is</h2>
      <p>
        Flyamba is a <strong>free AI-powered flight search and travel information service</strong>. You describe a trip
        in your own words and we suggest destinations and show indicative flight prices, along with editorial guides to
        those destinations.
      </p>

      <h2>What Flyamba is not</h2>
      <p>
        <strong>We are not a travel agency, airline or tour operator.</strong> We do not sell tickets, take bookings,
        process payments, issue refunds or hold your reservation. When you choose a flight, we hand you over to an
        airline, an online travel agency or a booking partner, and the entire purchase happens there under their terms
        and conditions.
      </p>
      <p>
        This means any question about a booking you have made — changes, cancellations, refunds, baggage, check-in,
        delays or compensation — has to go to the company you actually bought from. We have no access to your booking
        and cannot act on it.
      </p>

      <h2>Prices and availability are not guaranteed</h2>
      <p>
        Flight prices change constantly and are pulled from third-party sources. Prices shown on Flyamba, including
        monthly price calendars and &quot;from&quot; figures, are <strong>indicative estimates</strong> intended to
        help you compare options — not offers, and not a guarantee that a seat is available at that price.
      </p>
      <p>
        The only binding price is the one shown by the airline or booking site at the moment you complete your
        purchase. Some of our price data is seeded from historical averages rather than live inventory, so treat it as
        a guide to when a route tends to be cheap, not as a live quote.
      </p>

      <h2>Affiliate disclosure</h2>
      <p>
        Flyamba is free to use because it is funded by affiliate commission. Many of the links on this site — flight
        results, embedded search widgets, and links to hotels, attractions and activities — are affiliate links,
        primarily through the <strong>Travelpayouts</strong> network.
      </p>
      <p>
        If you click one of these links and make a booking, we may earn a commission from the provider.{" "}
        <strong>This costs you nothing extra</strong> — you pay the same price you would by going to the provider
        directly. Commission does not influence the destinations our AI recommends or the order in which results are
        shown.
      </p>

      <h2>Editorial content</h2>
      <p>
        Our destination guides — attractions, restaurants, hotels, transport, weather and prices — are researched
        editorial content. We work to keep them accurate, but opening hours, ticket prices, closures and local
        conditions change. Always confirm important details with the venue or an official source before you rely on
        them.
      </p>

      <h2>AI-generated results</h2>
      <p>
        Search results and destination answers are produced with the help of AI language models. AI can be wrong or
        out of date. Treat its suggestions as a starting point for your own research, not as verified fact, and never
        as legal, medical, visa, immigration or financial advice.
      </p>

      <h2>Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>scrape, crawl or bulk-download the site beyond normal browsing;</li>
        <li>attempt to disrupt, overload or gain unauthorised access to the service;</li>
        <li>republish our editorial content commercially without permission;</li>
        <li>use the service for anything unlawful.</li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        The Flyamba name, design and editorial content are our property or used under licence. Third-party trademarks,
        including airline names, belong to their respective owners and are used for identification only.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        Flyamba is provided &quot;as is&quot;, without warranty of any kind. To the fullest extent permitted by law, we
        are not liable for any loss arising from your use of the site — including inaccurate prices or content, missed
        flights, or any dispute with an airline or booking provider. Nothing here limits liability that cannot lawfully
        be limited, and your statutory rights as a consumer are unaffected.
      </p>

      <h2>Changes to the service and these terms</h2>
      <p>
        We may change, suspend or discontinue any part of Flyamba, and may update these terms. The &quot;last
        updated&quot; date above reflects the current version.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. See also our{" "}
        <Link href="/privacy">Privacy Policy</Link> and <Link href="/cookies">Cookie Policy</Link>.
      </p>
    </LegalPage>
  );
}
