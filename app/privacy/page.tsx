import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, CONTACT_EMAIL } from "@/app/components/LegalPage";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Privacy Policy — Flyamba",
  description:
    "How Flyamba handles your data: what we collect, why, who we share it with, and the rights you have under the GDPR.",
  alternates: { canonical: `${SITE}/privacy` },
  openGraph: { title: "Privacy Policy — Flyamba", description: "What Flyamba collects, why, and your GDPR rights." },
};

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy"
      intro="Flyamba is designed to need as little of your data as possible. This policy explains exactly what we collect, why, and what you can ask us to do about it."
    >
      <h2>Who we are</h2>
      <p>
        Flyamba operates the website at <strong>flyamba.com</strong>, an AI-powered flight search service. For the
        purposes of the EU General Data Protection Regulation (GDPR), Flyamba is the <strong>data controller</strong>{" "}
        for the personal data described below. You can reach us at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>What we collect</h2>
      <p>
        We have not installed analytics software, advertising pixels or visitor-tracking scripts of our own, and we do
        not ask you to create an account. There is no login, no profile and no marketing list. One caveat: the embedded
        flight-search widget loads a third-party iframe that runs its own Google Analytics — see our{" "}
        <Link href="/cookies">Cookie Policy</Link> for the detail. In practice we handle three things:
      </p>

      <h3>1. Your search queries</h3>
      <p>
        When you describe a trip in the search bar, or ask a question in a destination chat box, that text is sent to
        our server and forwarded to Anthropic&apos;s Claude API so it can be interpreted. We do not store your queries
        in a database and we do not link them to you. Please avoid typing personal or sensitive information into the
        search box — it is not a secure channel and it does not need anything personal to work.
      </p>

      <h3>2. Technical data in server logs</h3>
      <p>
        Like any website, our hosting provider records standard request data — IP address, timestamp, page requested,
        browser user-agent — for security, abuse prevention and debugging. This is retained for a short period by the
        host and is not used to build a profile of you.
      </p>

      <h3>3. A theme preference stored in your browser</h3>
      <p>
        If you switch between light and dark mode, we save that choice in your browser&apos;s local storage under the
        key <strong>flyamba-theme</strong>. It never leaves your device and is not a cookie. Clearing your browser
        storage removes it.
      </p>

      <h2>Legal bases for processing</h2>
      <ul>
        <li>
          <strong>Legitimate interests</strong> (Art. 6(1)(f) GDPR) — operating and securing the site, preventing
          abuse, and processing your search query so we can return a result.
        </li>
        <li>
          <strong>Consent</strong> (Art. 6(1)(a) GDPR) — where non-essential cookies are set by third parties through
          their embedded content, to the extent your browser and any consent choices allow it.
        </li>
      </ul>

      <h2>Who we share data with</h2>

      <h3>Anthropic</h3>
      <p>
        Search queries and destination-chat messages are processed by Anthropic&apos;s Claude API to generate results.
        Anthropic acts as a processor for this purpose. Only the text you type and the destination context are sent —
        no IP address, identifier or browsing history is attached.
      </p>

      <h3>Travelpayouts and its partners</h3>
      <p>
        Flight prices and booking links are provided through the Travelpayouts affiliate network. When you click a
        flight, hotel or activity link, or interact with an embedded search widget, you are passed to Travelpayouts or
        directly to the airline, booking site or activity provider. At that point their own privacy policy and cookie
        practices apply, not ours. Travelpayouts sets a tracking identifier so a resulting booking can be attributed to
        us — see our <Link href="/cookies">Cookie Policy</Link> for detail.
      </p>

      <h3>Our hosting provider</h3>
      <p>
        The site is hosted on Vercel, which processes request data on our behalf in order to serve the pages to you.
      </p>

      <p>
        We do not sell your personal data, and we do not pass it to advertisers or data brokers. Loading the embedded
        search widget does expose your IP address and browser details to Kiwi.com and Google, in the same way any
        third-party embed does.
      </p>

      <h2>International transfers</h2>
      <p>
        Anthropic and Vercel are based in the United States, so data processed by them may be transferred outside the
        European Economic Area. Such transfers rely on the European Commission&apos;s Standard Contractual Clauses or
        another lawful transfer mechanism offered by the provider.
      </p>

      <h2>How long we keep things</h2>
      <p>
        We keep no user database. Search queries are not retained after a result is returned. Server logs are held
        briefly by our hosting provider for security and diagnostics. Your theme preference stays in your browser until
        you clear it.
      </p>

      <h2>Your rights under the GDPR</h2>
      <p>If you are in the EU or UK, you have the right to:</p>
      <ul>
        <li>access the personal data we hold about you;</li>
        <li>have inaccurate data corrected;</li>
        <li>have your data erased;</li>
        <li>restrict or object to processing based on legitimate interests;</li>
        <li>receive your data in a portable format;</li>
        <li>withdraw consent at any time, where processing is based on consent;</li>
        <li>lodge a complaint with your national data protection authority.</li>
      </ul>
      <p>
        To exercise any of these, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. In practice, because
        we hold no account and no query history, there is usually very little for us to return or delete — but we will
        confirm that to you in writing and act on anything we do hold.
      </p>

      <h2>Children</h2>
      <p>
        Flyamba is not directed at children under 16 and we do not knowingly collect their personal data.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy as the service changes. The &quot;last updated&quot; date at the top always reflects
        the current version.
      </p>
    </LegalPage>
  );
}
