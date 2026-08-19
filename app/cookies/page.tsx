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
      intro="Flyamba adds no analytics or advertising of its own. The cookies you pick up here come from the embedded flight-search widget and our affiliate partners — including Google Analytics, which the widget loads without us asking it to."
    >
      <h2>What cookies are</h2>
      <p>
        Cookies are small text files a site stores in your browser. Related technologies — local storage and tracking
        pixels — do a similar job. This policy covers all of them.
      </p>

      <h2>Cookies we set ourselves</h2>
      <p>
        <strong>None.</strong> Flyamba adds no analytics platform, no advertising network and no visitor-tracking
        script to its own pages, and there is no account system, so there is no session or login cookie either. Note
        that this is about what <em>we</em> add — the embedded search widget brings analytics of its own, described
        under Analytics cookies below.
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
        We have not installed Google Analytics, Google Tag Manager or any comparable tool on Flyamba. Even so,
        <strong>analytics does run on pages that show the flight-search widget</strong>, and you should know about it.
      </p>
      <p>The chain is this. Our search widget is loaded from Travelpayouts (<strong>tpwdg.com</strong>). That script
        embeds an iframe from <strong>widgets.kiwi.com</strong>, and the code inside that iframe contains a Google Tag
        Manager container (<strong>GTM-MG27K2V</strong>), which in turn loads Google Analytics. Neither belongs to us:
        the container is Kiwi.com&apos;s, and it appears on any site embedding the same widget.
      </p>
      <p>
        Practically, that means <strong>Google Analytics and Google Tag Manager cookies may be set while you use the
        search box</strong>. Because they run inside an iframe on Kiwi&apos;s domain, they are third-party cookies set
        in Kiwi&apos;s context rather than first-party cookies on flyamba.com — we cannot read them, and they are
        governed by Kiwi.com&apos;s and Google&apos;s privacy policies.
      </p>
      <p>
        The widget is only loaded once you scroll near it, so on a page you never scroll down, it never loads and none
        of these cookies are set. Blocking third-party cookies or scripts prevents them entirely; the rest of the page
        continues to work, though the search box will not appear.
      </p>
      <p>
        If we ever add analytics of our own, we will update this policy and ask for consent before setting any
        non-essential cookie.
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
