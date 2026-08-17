import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, CONTACT_EMAIL } from "@/app/components/LegalPage";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Cookie Policy — Flyamba",
  description:
    "Which cookies Flyamba uses. We set none of our own for tracking — only affiliate partners and embedded widgets set cookies, and you can block them.",
  alternates: { canonical: `${SITE}/cookies` },
  openGraph: { title: "Cookie Policy — Flyamba", description: "Which cookies Flyamba uses, and how to control them." },
};

export default function Cookies() {
  return (
    <LegalPage
      title="Cookie Policy"
      path="/cookies"
      intro="Flyamba sets no analytics or advertising cookies of its own. The only cookies you'll pick up here come from affiliate partners and the embedded flight-search widgets."
    >
      <h2>What cookies are</h2>
      <p>
        Cookies are small text files a site stores in your browser. Related technologies — local storage and tracking
        pixels — do a similar job. This policy covers all of them.
      </p>

      <h2>Cookies we set ourselves</h2>
      <p>
        <strong>None.</strong> Flyamba runs no analytics platform, no advertising network and no visitor-tracking
        script. There is no account system, so there is no session or login cookie either.
      </p>
      <p>
        The one thing we do store on your device is a <strong>local storage</strong> entry called{" "}
        <strong>flyamba-theme</strong>, which remembers whether you chose light or dark mode. It is strictly necessary
        for that preference to survive a page reload, it never leaves your browser, and it is not used to identify or
        track you. Clearing your browser storage removes it.
      </p>

      <h2>Essential cookies</h2>
      <p>
        Our hosting provider may set a small number of strictly necessary cookies for security, load balancing and
        fraud prevention. These keep the site working and cannot be switched off without breaking it. They do not
        profile you.
      </p>

      <h2>Analytics cookies</h2>
      <p>
        We do not currently use any analytics cookies. If we add analytics later, we will update this policy and
        request consent before setting any non-essential cookie.
      </p>

      <h2>Affiliate tracking cookies</h2>
      <p>
        This is the main category you will encounter on Flyamba. Our flight results, embedded search widgets and links
        to hotels, attractions and activities run through the <strong>Travelpayouts</strong> affiliate network.
      </p>
      <p>When you click an affiliate link or interact with an embedded widget:</p>
      <ul>
        <li>
          Travelpayouts sets a cookie recording that the visit came from Flyamba, together with our partner
          identifier;
        </li>
        <li>
          if you go on to book, that cookie lets the provider attribute the booking to us so we receive a commission;
        </li>
        <li>
          the booking site you land on — an airline, an online travel agency, or a provider such as Kiwi.com or
          Tiqets — will set its own cookies under its own policy.
        </li>
      </ul>
      <p>
        These cookies are set by those third parties, not by us, and they are read on their domains rather than ours.
        Blocking them does not stop you using Flyamba or booking a flight; it only prevents the booking being
        attributed to us. See our <Link href="/terms">Terms of Service</Link> for the full affiliate disclosure.
      </p>

      <h2>Embedded widget scripts</h2>
      <p>
        The flight search boxes and results panels on our pages are loaded from Travelpayouts&apos; widget service.
        Loading them means your browser contacts that provider directly, which allows it to set cookies and see your IP
        address. If you block third-party scripts, these widgets will not render, but the rest of the page works
        normally.
      </p>

      <h2>How to control cookies</h2>
      <p>
        Every major browser lets you block or delete cookies, and most offer a setting to block third-party cookies
        specifically — which covers the affiliate cookies described above. Look under Privacy or Cookie settings in
        Chrome, Safari, Firefox, Edge or Samsung Internet. Private or incognito windows discard cookies when you close
        them.
      </p>

      <h2>Changes</h2>
      <p>
        If the cookies used on Flyamba change, we will update this page and the &quot;last updated&quot; date above.
        Questions: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. See also our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </LegalPage>
  );
}
