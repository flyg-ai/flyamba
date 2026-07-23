import type { Metadata } from "next";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { CATEGORIES } from "@/app/data/athens-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Athens Events & Festivals 2026 — What's On | Flyamba",
  description:
    "A guide to Athens events and festivals in 2026 — the Athens Epidaurus Festival, Greek Orthodox Easter, the Athens Marathon, Ohi Day, Carnival (Apokries), the August Full Moon and Christmas — with dates and tips on when to fly.",
  alternates: { canonical: `${SITE}/athens/events` },
  openGraph: { title: "Athens Events & Festivals 2026 | Flyamba", description: "The best festivals and events in Athens, month by month.", type: "article" },
};

const PLACEHOLDER = "/images/barcelona/placeholder.webp";

const ITEMS: BcnPlace[] = [
  {
    name: "Greek Orthodox Easter (Pascha)", slug: "greek-easter", image: PLACEHOLDER,
    rating: 4.9, area: "Citywide & nationwide", filterKeys: [],
    tip: "Join the midnight Resurrection service on Holy Saturday for candles and fireworks — the most moving night of the Greek year.",
    description: "The most important festival in Greece, a week of solemn and joyful traditions culminating in a candlelit midnight service.",
    practicalInfo: { openingHours: "Spring — April or early May (date moves yearly)", price: "Free to attend services and celebrations", howToGetThere: "Churches citywide; Plaka's little chapels are especially atmospheric" },
    fullDescription: "Greek Orthodox Easter (Pascha) is by far the most important and deeply felt celebration in the Greek calendar — a bigger occasion than Christmas — and experiencing it in Athens is unforgettable. Because it follows the Orthodox calendar, the date usually differs from Western Easter, falling in April or early May. Holy Week builds through solemn, beautiful services: on Good Friday, decorated flower-covered biers (the Epitaphios) are carried through the streets in candlelit processions from each parish. The emotional climax comes at the midnight service of Holy Saturday, when churches fall dark and the priest emerges with a single flame proclaiming 'Christ is Risen' (Christos Anesti); the light is passed candle to candle through the congregation and out into the night, followed by fireworks, church bells and celebration. Families then break the Lenten fast with magiritsa soup, and Easter Sunday brings feasts of spit-roasted lamb, red-dyed eggs and merriment. Much of Athens quietens as locals travel to their villages, and some shops and restaurants close, but the atmosphere in the city's churches — the tiny Byzantine chapels of Plaka are especially magical — is extraordinary. It's a busier, pricier but profoundly special time to visit; book well ahead and join a midnight service to witness Greece at its most heartfelt.",
  },
  {
    name: "Athens Epidaurus Festival", slug: "athens-epidaurus-festival", image: PLACEHOLDER,
    rating: 4.7, area: "Odeon of Herodes Atticus & Epidaurus", filterKeys: [],
    tip: "Seeing a play or concert at the ancient Odeon beneath the Acropolis, or the theatre of Epidaurus, is a bucket-list experience.",
    description: "Greece's flagship cultural festival, staging theatre, music and dance in spectacular ancient venues all summer.",
    practicalInfo: { openingHours: "June to August", price: "Tickets vary (from ~€15 to premium)", howToGetThere: "Odeon of Herodes Atticus below the Acropolis; Epidaurus by tour/coach" },
    fullDescription: "The Athens Epidaurus Festival is the country's premier cultural event and the highlight of the summer arts calendar, running from June to August. Its greatest draw is the venues: performances take place in genuinely ancient theatres, above all the magnificent Odeon of Herodes Atticus, a 2nd-century AD Roman theatre carved into the southern slope of the Acropolis, where watching a play, opera, ballet or concert beneath the floodlit ruins under the stars is a spine-tingling, once-in-a-lifetime experience. The programme is a rich international mix of theatre, classical and contemporary music, dance and opera, featuring major Greek and world artists. The festival's second strand takes place at the Ancient Theatre of Epidaurus in the Peloponnese — one of the best-preserved and most acoustically perfect theatres of antiquity — where classical Greek dramas are staged on summer weekends, often combined with a coach trip from Athens. Tickets range from very affordable to premium depending on the event and seat, and the most popular shows sell out, so book online in advance and check the programme when planning summer dates. For culture lovers, timing a visit to catch a performance at the Odeon of Herodes Atticus is one of the most memorable things you can do in Athens.",
  },
  {
    name: "Carnival (Apokries)", slug: "apokries", image: PLACEHOLDER,
    rating: 4.4, area: "Citywide (Plaka)", filterKeys: [],
    tip: "On the final 'Clean Monday' (Kathara Deftera), Athenians head to the hills to fly kites — Filopappou Hill is the classic spot.",
    description: "Three weeks of pre-Lenten carnival with costumes, parties and the kite-flying tradition of Clean Monday.",
    practicalInfo: { openingHours: "February–March (before Orthodox Lent)", price: "Mostly free street celebrations", howToGetThere: "Celebrations across the city; kite-flying on Filopappou and the hills" },
    fullDescription: "Apokries, the Greek carnival season, runs for about three weeks in the lead-up to Orthodox Lent (usually February into March) and brings a playful, festive spirit to Athens. During this period locals — especially children — dress up in costumes and masks, parties and masquerades fill bars and clubs, and there's a general mood of indulgence before the fasting of Lent begins. While Athens' carnival is more low-key than the famous, riotous celebrations in the city of Patras (the country's carnival capital, an easy add-on if you're travelling), the neighbourhoods still buzz, and areas like Plaka see costumed revellers and impromptu fun. The season culminates on Clean Monday (Kathara Deftera), the first day of Lent and a public holiday, marked by one of Greece's most charming traditions: families head outdoors for a picnic of Lenten foods (seafood, olives, halva and the flatbread lagana) and, above all, fly colourful kites. In Athens, the hills around the centre — Filopappou Hill opposite the Acropolis is the classic spot — fill with families and a sky full of kites, a delightful and very local scene. Most carnival festivities are free and street-based, making it a fun, atmospheric and inexpensive time to visit, with the bonus of shoulder-season prices before the spring crowds arrive.",
  },
  {
    name: "August Full Moon Festival", slug: "august-full-moon", image: PLACEHOLDER,
    rating: 4.6, area: "Acropolis & archaeological sites", filterKeys: [],
    tip: "On the August full moon, the Acropolis and other sites open for free after dark with music — an unmissable, magical night.",
    description: "A magical night when major archaeological sites open free under the full moon, with concerts and moonlit access.",
    practicalInfo: { openingHours: "The night of the August full moon", price: "Free entry to participating sites", howToGetThere: "Acropolis and select sites/museums across the city and country" },
    fullDescription: "One of the loveliest and most atmospheric events of the Athenian year is the August Full Moon Festival (Panselinos), when, on the night of the full moon in August, many of Greece's most important archaeological sites, monuments and museums open their doors free of charge after dark, often hosting concerts, theatrical performances and other cultural events by moonlight. In Athens, this can include the chance to experience sites such as the Acropolis, the Ancient Agora or the Roman Agora bathed in moonlight rather than the harsh summer sun — a completely different, romantic and memorable perspective on the ancient ruins, sometimes accompanied by live classical or traditional music. It's a beautiful, free and quintessentially Greek celebration of heritage and the summer night, hugely popular with Athenians and visitors alike. Because the participating sites, opening hours and any performances are announced by the Ministry of Culture each year and vary, and because the most popular locations (the Acropolis above all) draw big crowds and sometimes require free timed tickets, it's worth checking the official programme in advance and arriving early. If your trip happens to coincide with the August full moon, don't miss the chance to wander an ancient wonder under the silver light — it's one of the most magical experiences the city offers.",
  },
  {
    name: "Athens Marathon (the Authentic)", slug: "athens-marathon", image: PLACEHOLDER,
    rating: 4.7, area: "Marathon → Panathenaic Stadium", filterKeys: [],
    tip: "Even as a spectator it's stirring — the route finishes in the marble Panathenaic Stadium, the original Olympic arena.",
    description: "The original marathon, run each November along the legendary route into the marble Panathenaic Stadium.",
    practicalInfo: { openingHours: "Early-to-mid November", price: "Free to spectate; race entry for runners", howToGetThere: "Starts at Marathon; finishes at the Panathenaic Stadium in the centre" },
    fullDescription: "The Athens Marathon, billed as 'the Authentic', is the original and most historic marathon in the world, run each November along the very route that gives the race its name. It traces the path of the ancient messenger Pheidippides, who according to legend ran from the plain of Marathon to Athens in 490 BC to announce the Greek victory over the Persians before collapsing. Starting in the town of Marathon, the challenging, largely uphill 42.195-km course runs into the city and finishes in spectacular fashion inside the gleaming marble Panathenaic Stadium — the very arena that hosted the first modern Olympics in 1896 — making it a bucket-list race for serious runners from around the globe. The weekend also includes shorter 5 km and 10 km races and children's events, so there's something for a range of abilities. For visitors who aren't running, it's a stirring spectacle: crowds line the route and pack the historic stadium to cheer the finishers home. It brings a great atmosphere to the city on a pleasant autumn weekend, though roads along the route close and central traffic is disrupted on race day, so factor that into your plans. If you're a runner, entries open well in advance and the event sells out; if not, come to watch the finish at the Panathenaic Stadium for a genuine slice of sporting history.",
  },
  {
    name: "Ohi Day (28 October)", slug: "ohi-day", image: PLACEHOLDER,
    rating: 4.3, area: "Syntagma & central Athens", filterKeys: [],
    tip: "Catch the big military and student parades along the central avenues — a proud, flag-filled national holiday.",
    description: "A major national holiday marked by military and student parades commemorating Greece's WWII defiance.",
    practicalInfo: { openingHours: "28 October (annual public holiday)", price: "Free to watch", howToGetThere: "Main parade along central Athens; larger military parade in Thessaloniki" },
    fullDescription: "Ohi Day (or Oxi Day), celebrated every year on 28 October, is one of Greece's most important national holidays, and coinciding with it gives visitors a window into Greek patriotism and history. The name means 'No Day', commemorating the legendary one-word reply — 'Ohi!' ('No!') — with which the Greek leader Ioannis Metaxas is said to have rejected Mussolini's 1940 ultimatum demanding free passage for Italian troops, an act of defiance that brought Greece into the Second World War on the Allied side and is a source of enormous national pride. The anniversary is marked across the country with flag-lined streets, church services and, most visibly, parades: in Athens, student and armed-forces processions march along the central avenues, with schoolchildren, marching bands and military units on display (the largest military parade is held in Thessaloniki). Public buildings and balconies are draped in blue-and-white Greek flags, and there's a festive, proud atmosphere. As a public holiday, many shops, businesses and some attractions close or run reduced hours, and central streets are affected by the parades, so it's worth checking what's open if your visit falls on the 28th. For travellers, watching the parade and seeing the city decked in flags is an interesting, free cultural experience, and late October is also a pleasant, quieter shoulder-season time to visit Athens.",
  },
  {
    name: "Christmas & New Year", slug: "christmas-new-year", image: PLACEHOLDER,
    rating: 4.4, area: "Syntagma & citywide", filterKeys: [],
    tip: "Syntagma Square's giant tree and lights, plus the festive markets, make December a cosy, good-value time to visit.",
    description: "Athens dressed in festive lights, with a big Syntagma tree, markets, and lively New Year celebrations.",
    practicalInfo: { openingHours: "December into early January", price: "Mostly free to enjoy", howToGetThere: "Syntagma Square, the National Garden and central streets" },
    fullDescription: "The Christmas and New Year season transforms Athens into a festive, twinkling city and makes for a cosy, good-value winter break. From early December the centre is decked in lights, and a giant Christmas tree and decorations go up in Syntagma Square, which becomes the focal point of the celebrations along with festive markets, ice rinks and children's activities that pop up around the city (the National Garden and various squares often host holiday events). Greek Christmas traditions differ a little from Western ones: children sing carols (kalanda) door to door, festive tables feature roast pork, turkey and sweet treats like melomakarona and kourabiedes, and it is Saint Basil who brings gifts on New Year's Day (Protochronia) rather than Christmas Day, when families cut the vasilopita cake containing a lucky coin. New Year's Eve sees lively celebrations, parties and fireworks, often centred on Syntagma. Because it's low season weather-wise (cool but often sunny), you get the double benefit of a festive atmosphere with fewer tourists at the ancient sites and generally lower prices than summer — though the holiday dates themselves are busier and some businesses close on the main holy days. For a mild-weather, atmospheric and affordable European Christmas city break with a Greek twist, December in Athens is a charming, underrated choice.",
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Athens", item: `${SITE}/athens` },
      { "@type": "ListItem", position: 3, name: "Events", item: `${SITE}/athens/events` },
    ],
  };
}

export default function AthensEvents() {
  return (
    <CityGuideShell
      citySlug="athens"
      cityName="Athens"
      categories={CATEGORIES}
      active="events"
      crumb="Events"
      h1="Athens Events & Festivals 2026"
      heroImage="/images/athens/sevardheter/panathenaic-stadium.webp"
      intro="Athens has a festival for every season, blending ancient heritage, deep Orthodox faith and modern culture. From the candlelit drama of Greek Easter and open-air theatre beneath the Acropolis at the Athens Epidaurus Festival to the world's original marathon, the kite-flying of Carnival's Clean Monday and free moonlit access to the ruins in August, here are the events worth planning a trip around — with dates, tips and when to fly."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Athens' biggest events, explained" items={ITEMS} />
    </CityGuideShell>
  );
}
