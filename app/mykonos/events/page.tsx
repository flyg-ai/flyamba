import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/mykonos-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Mykonos Events & Party Calendar 2026 — What's On | Flyamba",
  description:
    "Mykonos's event calendar — the summer club season with opening and closing parties, the XLSIOR festival, Greek Orthodox Easter, the August 15 Panigiri…",
  alternates: { canonical: `${SITE}/mykonos/events` },
  openGraph: { title: "Mykonos Events & Party Calendar | Flyamba", description: "Club season, XLSIOR, Easter and the August festivals — Mykonos's event calendar.", type: "article" },
};

const IMG = "/images/destinations/flights-mykonos.avif";

const INFO: BcnPlace[] = [
  {
    name: "The summer club season", slug: "club-season", image: IMG, rating: 5, area: "Islandwide",
    tip: "July and August are peak (and priciest); late May–June and September offer the same scene with smaller crowds and lower prices.",
    filterKeys: [],
    description: "Mykonos's headline 'event' is its months-long party season, from opening to closing parties.",
    practicalInfo: { openingHours: "Roughly May to early October", price: "Club/beach-club entry & tables vary widely", howToGetThere: "Beach clubs (Paradise, Super Paradise, Nammos) & Chora clubs" },
    fullDescription: "Mykonos's single biggest 'event' is the summer season itself — a months-long party that runs from roughly May to early October and turns the island into one of the Mediterranean's most famous nightlife destinations. It kicks off with opening parties at the legendary beach clubs (Paradise, Super Paradise, Cavo Paradiso and Nammos) as international DJs and a glamorous crowd arrive, builds to a frenzy in the peak weeks of July and August, and winds down with equally storied closing parties in late September and early October. Days revolve around see-and-be-seen beach clubs with champagne, loungers and daytime DJ sets, before the action moves to Chora's bars and clubs after dark. It is expensive — table minimums and drinks prices are among the highest in Greece — but unmatched for sheer energy. For the same scene at lower cost and with breathing room, aim for the shoulder weeks of late May, June or September rather than the August crush. Book beach-club loungers and any table service in advance during peak season.",
  },
  {
    name: "XLSIOR Mykonos Festival", slug: "xlsior", image: IMG, rating: 5, area: "Islandwide",
    tip: "It's one of the world's biggest gay summer festivals — book accommodation many months ahead, as the island sells out.",
    filterKeys: [],
    description: "A huge international LGBTQ+ festival that takes over the island each August.",
    practicalInfo: { openingHours: "Several days in August", price: "Event & party tickets (paid)", howToGetThere: "Multiple venues across Mykonos" },
    fullDescription: "XLSIOR Mykonos is one of the world's largest gay summer festivals and a defining event on the island's calendar. Held over several days in August, it draws tens of thousands of visitors from across the globe for a programme of headline parties at Mykonos's biggest venues and beach clubs, with international DJs and elaborate production. Mykonos has long been one of the Mediterranean's most welcoming and celebrated LGBTQ+ destinations, and XLSIOR amplifies that to its peak, filling hotels, beaches and clubs to capacity. It coincides with the island's busiest and most expensive weeks, so if you're attending — or simply visiting during the festival — book flights and accommodation many months in advance, because the whole island sells out and prices surge. Tickets to the individual parties are sold separately. Even for those not part of the festival, it's worth knowing when it falls, as it defines the atmosphere and availability for that stretch of August. Check the official XLSIOR site for the year's dates and line-up.",
  },
  {
    name: "Greek Orthodox Easter", slug: "easter", image: IMG, rating: 5, area: "Chora & villages",
    tip: "Easter is the most authentic time to see traditional Mykonos, before the party season fully begins — join the midnight candlelit service.",
    filterKeys: [],
    description: "Greece's most important religious festival, a quieter, traditional side of Mykonos in spring.",
    practicalInfo: { openingHours: "Orthodox Easter weekend (spring; date varies)", price: "Free", howToGetThere: "Churches across Chora and the villages" },
    fullDescription: "Orthodox Easter is the most important festival in the Greek calendar and offers a glimpse of a very different Mykonos from the summer party scene. Falling in spring (on a date that varies from the Western Easter), it's a deeply traditional, community-centred celebration: churches across Chora and the villages hold candlelit services, culminating in the moving midnight resurrection service on Holy Saturday when the whole town gathers, candles are lit and fireworks crackle over the harbour. Good Friday sees solemn processions of the Epitaphios (a decorated bier) through the lanes, and Easter Sunday brings family feasts of spit-roasted lamb, red-dyed eggs and magiritsa soup, with a warm, welcoming atmosphere that visitors are readily included in. It's a wonderful, authentic time to experience the island before the crowds and prices of high summer arrive, with pleasant spring weather and a calm, genuine feel. If you're on Mykonos over Orthodox Easter, join a service, respect the solemnity of Good Friday, and enjoy the celebratory feasting that follows.",
  },
  {
    name: "Panigiria — village saint's-day festivals", slug: "panigiria", image: IMG, rating: 5, area: "Ano Mera & chapels",
    tip: "The biggest is at the Panagia Tourliani monastery in Ano Mera on 15 August — expect food, wine, music and dancing, all free.",
    filterKeys: [],
    description: "Traditional feast-day celebrations at the island's chapels, with free food, wine and dancing.",
    practicalInfo: { openingHours: "Various saints' days through summer; big one 15 August", price: "Free", howToGetThere: "Ano Mera and rural chapels across the island" },
    fullDescription: "For a taste of authentic island culture amid the glamour, seek out a panigiri — a traditional Greek Orthodox saint's-day festival held at chapels and monasteries around Mykonos through the summer. On the eve or day of a chapel's patron saint, the local community gathers to celebrate with a church service followed by a joyful feast: long tables of home-cooked food, free-flowing local wine, live traditional music and dancing that carries on late into the night, with visitors warmly welcomed. The largest and most famous is the Feast of the Assumption of the Virgin (Panagia) on 15 August, centred on the beautiful Panagia Tourliani monastery in the inland village of Ano Mera, a major event that fills the village square. These festivals are free, deeply hospitable and offer a completely different, heartfelt side of Mykonos from the beach clubs — the real Greek island beneath the international party reputation. Ask locals or your hotel which chapel is celebrating during your stay, dress modestly for the church element, and join in the eating and dancing that follows.",
  },
];

function jsonLd() {
  return {
    "@type": "BreadcrumbList",
    "@context": "https://schema.org",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Mykonos", item: `${SITE}/mykonos` },
      { "@type": "ListItem", position: 3, name: "Events", item: `${SITE}/mykonos/events` },
    ],
  };
}

export default function MykonosEvents() {
  return (
    <CityGuideShell
      citySlug="mykonos"
      cityName="Mykonos"
      categories={CATEGORIES}
      active="events"
      crumb="Events"
      h1="Mykonos Events & Party Calendar"
      heroImage={IMG}
      intro="Mykonos's calendar is really one long headline event — the summer season, from May's opening parties to October's closing ones — punctuated by the huge XLSIOR festival in August. But there's another side too: Greek Orthodox Easter in spring and the traditional village panigiria (saint's-day feasts) reveal the authentic island beneath the international party reputation. Here's what's on and when, so you can pick your Mykonos — glamorous, traditional, or both."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Mykonos events — in detail" items={INFO} />
    </CityGuideShell>
  );
}
