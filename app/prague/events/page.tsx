import type { Metadata } from "next";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { PRAGUE_CATEGORIES } from "@/app/data/prague-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Prague Events 2026 — Festivals, Markets & Things to Do | Flyamba",
  description:
    "A calendar of Prague's biggest events and festivals in 2026 — the Prague Spring music festival, Easter and Christmas markets, the Signal light festival, Bohemian Carnevale and more, month by month with tips on when to fly.",
  alternates: { canonical: `${SITE}/prague/events` },
  openGraph: { title: "Prague Events & Festivals 2026 | Flyamba", description: "Month-by-month Prague events calendar for 2026.", type: "article" },
};

const FAQ = [
  {
    q: "What is the biggest festival in Prague?",
    a: "The Prague Spring International Music Festival, held from mid-May to early June, is the city's most prestigious event — a world-class classical music festival that has run since 1946, traditionally opening on the anniversary of composer Bedřich Smetana's death with a performance of his symphonic cycle Má vlast.",
  },
  {
    q: "When are the Prague Christmas markets?",
    a: "Prague's Christmas markets run from late November until early January, centred on the Old Town Square and Wenceslas Square. They are among the prettiest in Europe, with wooden stalls, a giant tree, carol singers, mulled wine and traditional food, and are busiest (and priciest) in December and over New Year.",
  },
  {
    q: "What is the Signal Festival?",
    a: "Signal is Prague's spectacular festival of light and digital art, held over four evenings in mid-October. Large-scale light installations and video projections transform the city's streets, squares and monuments after dark, drawing hundreds of thousands of visitors along a walkable route through the centre.",
  },
  {
    q: "What is the best month for events in Prague?",
    a: "May and December are the standout months. May brings warm weather and the Prague Spring music festival plus the food and Bohemian Carnevale scene, while December offers the magical Christmas markets. October (Signal Festival) and the Easter markets in spring are also excellent times for events.",
  },
];

function jsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Prague", item: `${SITE}/prague` },
      { "@type": "ListItem", position: 3, name: "Events", item: `${SITE}/prague/events` },
    ],
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return [breadcrumb, faq];
}

const PLACEHOLDER = "/images/barcelona/placeholder.webp";
const item = (o: Partial<BcnPlace> & { name: string; slug: string; fullDescription: string; tip: string; practicalInfo: BcnPlace["practicalInfo"] }): BcnPlace => ({
  image: PLACEHOLDER, rating: 4.6, area: "Prague", filterKeys: [], description: "", ...o,
});

const ITEMS: BcnPlace[] = [
  item({
    name: "Bohemian Carnevale & Masopust", slug: "carnevale-masopust",
    tip: "Catch the costumed Masopust parade in the Žižkov district for the most authentic, local carnival atmosphere.",
    practicalInfo: { openingHours: "February (before Lent)", price: "Mostly free street events; some ticketed balls", howToGetThere: "Old Town and Žižkov; parades through the historic centre" },
    fullDescription: "In the depths of winter, Prague revives its pre-Lenten carnival traditions with the Bohemian Carnevale and the older folk celebration of Masopust. Held in February in the run-up to Lent, the Carnevale brings a series of masked balls, baroque-costumed processions, street theatre, concerts and feasting to the Old Town, echoing the elaborate carnival culture of 18th-century Prague. Alongside the more polished, ticketed events, the traditional Masopust — the Czech equivalent of Mardi Gras — sees neighbourhoods, most famously Žižkov, stage boisterous costumed parades with music, masks, roast-pig feasts and plenty of beer and slivovitz, a raucous and genuinely local send-off before the fasting season. It's a colourful, atmospheric reason to visit in the otherwise quiet, cold weeks of late winter, when hotel prices are low and the crowds thin. Many of the street events are free to watch, while the grander masked balls and gala dinners require tickets booked in advance. Dates shift each year with the church calendar, so check exact timings before booking. For visitors curious about Czech folk culture and after a lively, offbeat winter break, the carnival season adds warmth and spectacle to a frosty February in the city.",
  }),
  item({
    name: "Easter Markets", slug: "easter-markets",
    tip: "The Old Town Square market is prettiest — buy hand-painted eggs (kraslice) and watch the craft demonstrations.",
    practicalInfo: { openingHours: "Late March–April (around Easter)", price: "Free entry; food & crafts for sale", howToGetThere: "Old Town Square & Wenceslas Square" },
    fullDescription: "Prague's Easter markets are a delightful springtime tradition, transforming the Old Town Square and Wenceslas Square into festive open-air fairs for a few weeks around the Easter holiday, typically in late March or April. Wooden stalls sell traditional Czech crafts and Easter symbols: intricately hand-painted eggs (kraslice), braided willow whips (pomlázka) used in age-old Easter customs, wooden toys, ceramics, honey products and seasonal decorations, alongside stands piled with grilled sausages, hams, spit-roasted trdelník pastries, mead and hot drinks. A decorated maypole, craft demonstrations, folk music and often a small farm corner with animals for children add to the cheerful atmosphere. Coming as the city shakes off winter, the markets pair beautifully with the first blossom on Petřín Hill and the milder spring weather, and they're far less crowded than the December Christmas markets while sharing much of their charm. Entry is free — you pay only for what you eat, drink and buy — making it an easy, atmospheric addition to a spring visit. Because the dates follow the movable Easter calendar, confirm timings before you travel. For a taste of Czech folk tradition and springtime cheer in the heart of the historic city, the Easter markets are a lovely seasonal highlight.",
  }),
  item({
    name: "Prague Spring Music Festival", slug: "prague-spring",
    tip: "The opening-night performance of Smetana's 'Má vlast' is a national occasion — book tickets months ahead.",
    practicalInfo: { openingHours: "Mid-May to early June", price: "Concert tickets from ~400 Kč to several thousand", howToGetThere: "Rudolfinum, Municipal House (Smetana Hall) and other venues" },
    fullDescription: "The Prague Spring International Music Festival (Pražské jaro) is the Czech Republic's most prestigious cultural event and one of the great classical music festivals of Europe. Running from mid-May to early June since 1946, it fills the city's most beautiful concert halls — the neo-Renaissance Rudolfinum and the Art Nouveau Smetana Hall of the Municipal House among them — with the world's leading orchestras, conductors and soloists across three weeks of performances. By tradition, the festival opens on 12 May, the anniversary of composer Bedřich Smetana's death, with a stirring performance of his patriotic symphonic cycle Má vlast ('My Homeland'), which includes the beloved Vltava, and closes with Beethoven's Ninth Symphony — bookend concerts that are national occasions in themselves. The festival is a magnificent reason to visit in late spring, when the weather is warm and the city green, though the headline concerts sell out early, so book months in advance. Beyond the marquee events, the programme spans chamber recitals and emerging talent, with tickets ranging from very affordable to premium. For lovers of classical music, experiencing a concert in one of Prague's gilded historic halls during the festival is an unforgettable highlight of a trip.",
  }),
  item({
    name: "Summer festivals & beer gardens", slug: "summer-festivals",
    tip: "Head to the Letná or Riegrovy sady beer gardens on a warm evening for the city's most relaxed summer scene.",
    practicalInfo: { openingHours: "June–August", price: "Many events free; festivals ticketed", howToGetThere: "Parks, riverbanks and venues across the city" },
    fullDescription: "Summer turns Prague into an open-air playground, with a packed calendar of festivals and the beloved beer-garden season in full swing. The city's leafy beer gardens — most famously at Letná park, with its panoramic view over the river and bridges, and Riegrovy sady in Vinohrady — become the social hub of warm evenings, serving cheap draught beer to relaxed crowds of locals and visitors sprawled at long trestle tables. Festivals fill the season: the United Islands and various music events animate the riverbanks and islands, food festivals such as the popular Prague Food Festival celebrate the city's dining scene, and open-air cinema screenings pop up in parks and courtyards. The Vltava embankments (Náplavka) host regular markets, concerts and floating bars, and the city's summer classical and jazz series keep the cultural calendar busy. Long daylight hours mean the atmosphere runs late, and the warm weather makes it perfect for river cruises, paddle-boats and terrace dining. While summer is the busiest and priciest season for accommodation, the sheer volume of outdoor events and the easy-going beer-garden culture make it a wonderfully lively time to be in the city. Many events are free; the bigger festivals require tickets, so check line-ups and dates when planning.",
  }),
  item({
    name: "Signal Light Festival", slug: "signal-festival",
    tip: "Go on a weeknight if you can — the walkable route through the centre gets very busy on the Friday and Saturday.",
    practicalInfo: { openingHours: "Mid-October (four evenings)", price: "Free public installations; some ticketed zones", howToGetThere: "Self-guided route through the Old Town, New Town and beyond" },
    fullDescription: "Signal is Prague's spectacular festival of light and digital art, and one of the biggest cultural events of the autumn. Held over four evenings in mid-October, it transforms the streets, squares, facades and monuments of the historic centre into a dazzling open-air gallery of large-scale light installations, video mapping and interactive artworks by leading Czech and international artists. Visitors follow a walkable route through the city after dark, discovering illuminated churches, projections on baroque palaces, glowing sculptures in courtyards and immersive light experiences, with the medieval architecture making a stunning canvas. Since its launch in 2013 the festival has become hugely popular, drawing hundreds of thousands of people and giving the whole city a magical, buzzing energy on crisp October nights. Most of the outdoor installations are free to enjoy, with some indoor or special zones requiring a ticket. Because it's so popular, the central route gets crowded, especially on the weekend, so visiting on a weeknight or starting early in the evening makes for a more comfortable experience. Coinciding with beautiful autumn weather and colour, Signal is a fantastic reason to visit Prague in October and a highlight of the city's events calendar.",
  }),
  item({
    name: "St Wenceslas Day & National Days", slug: "national-days",
    tip: "Many museums and monuments hold special openings or free entry around the September and October national holidays.",
    practicalInfo: { openingHours: "28 September & 28 October", price: "Mostly free public commemorations", howToGetThere: "Wenceslas Square, Vyšehrad and sites across the city" },
    fullDescription: "Autumn brings two of the Czech Republic's most significant national days, both marked with commemorations, ceremonies and cultural events across Prague. St Wenceslas Day on 28 September honours the patron saint of the Czech lands and Czech Statehood Day, with religious services, a pilgrimage to the saint's tomb in St Vitus Cathedral, and celebrations focused on Wenceslas Square and the ancient fortress of Vyšehrad, often including markets, concerts and historical re-enactments. A month later, 28 October marks the founding of independent Czechoslovakia in 1918, the country's most important national holiday, commemorated with official ceremonies, military and state events, illuminated monuments and frequently free or special access to museums, galleries and historic buildings, including parts of Prague Castle. These are public holidays, so some shops and businesses close, but the city takes on a reflective, patriotic atmosphere and offers visitors a window into Czech history and identity. The events are largely free to attend, from the solemn wreath-laying ceremonies to the more festive markets and concerts. If your trip coincides with either date, it's worth seeking out the commemorations and taking advantage of any special openings, adding a meaningful historical dimension to an autumn visit to the capital.",
  }),
  item({
    name: "Christmas Markets & New Year", slug: "christmas-markets",
    tip: "The Old Town Square market and tree are the showpiece — go on a weekday morning to enjoy it before the crush.",
    practicalInfo: { openingHours: "Late November–early January", price: "Free entry; food, drink & crafts for sale", howToGetThere: "Old Town Square, Wenceslas Square & other squares" },
    fullDescription: "Prague's Christmas markets are among the most beautiful in Europe and the crowning event of the city's calendar, running from late November until early January. The two grandest occupy the Old Town Square — dominated by a huge, brightly lit Christmas tree and framed by the Týn Church and Astronomical Clock — and Wenceslas Square, with more markets dotted around Náměstí Republiky, Prague Castle and elsewhere. Rows of wooden stalls sell traditional crafts and gifts (glass ornaments, wooden toys, candles, ceramics) alongside irresistible seasonal food and drink: hot mulled wine (svařák), grog, spit-roasted trdelník pastries dusted with sugar and cinnamon, grilled sausages, ham and hot chestnuts. Carol singers, nativity scenes, a stage of festive performances and, if you're lucky, a dusting of snow complete the fairytale scene. The atmosphere is magical but the markets draw big crowds and the highest hotel prices of the year, peaking over Christmas and New Year, when the city hosts fireworks and street celebrations to ring in the new year. To enjoy the markets at their calmest, visit on a weekday morning. Entry is free, and you pay only for food, drink and gifts. For a festive winter break, the Prague Christmas markets are truly unforgettable.",
  }),
];

export default function PragueEvents() {
  return (
    <CityGuideShell
      citySlug="prague"
      cityName="Prague"
      categories={PRAGUE_CATEGORIES}
      active="events"
      crumb="Events"
      h1="Prague Events & Festivals 2026"
      heroImage="/images/prague/sevardheter/old-town-square.webp"
      intro="Prague has something on in every season. From the world-class Prague Spring music festival and the dazzling Signal light festival to the pre-Lenten Bohemian Carnevale and the storybook Christmas and Easter markets, the city's calendar mixes high culture, folk tradition and open-air festivity. Here's a guide to Prague's biggest events through 2026, so you can time your flights to catch the city at its most exciting."
    >
      {jsonLd().map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s).replace(/</g, "\\u003c") }} />
      ))}

      <CategorySeoSections heading="Prague events through the year" items={ITEMS} />

      <div className="mt-16 border-t border-border pt-10">
        <div className="mb-3 h-0.5 w-10 rounded bg-accent" />
        <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">Prague events — frequently asked questions</h2>
        <div className="mt-8 space-y-5">
          {FAQ.map((f) => (
            <div key={f.q} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-serif text-lg font-semibold text-foreground">{f.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </CityGuideShell>
  );
}
