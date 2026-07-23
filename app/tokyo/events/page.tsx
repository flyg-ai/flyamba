import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/tokyo-places";

const SITE = "https://flyamba.com";

export const metadata: Metadata = {
  title: "Tokyo Events & Festivals 2026 — What's On | Flyamba",
  description:
    "Tokyo's best events and festivals through the year — cherry-blossom hanami, summer fireworks and matsuri, sumo tournaments, autumn illuminations and New Year traditions, with dates and tips.",
  alternates: { canonical: `${SITE}/tokyo/events` },
  openGraph: { title: "Tokyo Events & Festivals | Flyamba", description: "Festivals, fireworks, sumo and seasonal events in Tokyo.", type: "article" },
};

const IMG = "/images/tokyo/sevardheter/asakusa.webp";

const EVENTS: BcnPlace[] = [
  {
    name: "Cherry Blossom Season (Hanami)", slug: "hanami", image: IMG,
    rating: 4.9, area: "Citywide parks", tip: "Peak bloom lasts barely a week — track the official forecast, then picnic under the trees at Ueno, Shinjuku Gyoen or along the Meguro River.",
    filterKeys: [], description: "Tokyo's most beloved event, when the city gathers to picnic beneath the cherry blossom.",
    practicalInfo: { openingHours: "Late March–early April", price: "Mostly free; some gardens ¥500", howToGetThere: "Best spots: Ueno Park, Shinjuku Gyoen, Chidorigafuchi, Meguro River" },
    fullDescription: "Hanami — flower-viewing — is the highlight of Tokyo's calendar and, for many, the ultimate reason to visit in spring. For a fleeting week or so in late March and early April, tens of thousands of cherry trees erupt into delicate pink and white blossom, and the entire city downs tools to celebrate: friends, families and colleagues stake out spots under the trees for long picnics of food, drink and merriment, while parks and riverbanks fill with a joyful, festive atmosphere. The finest viewing spots include Ueno Park, with its blossom-lined central avenue and lantern-lit evenings; the serene Shinjuku Gyoen with over a thousand trees; the moat at Chidorigafuchi near the Imperial Palace, where you can row boats beneath the blooms; and the romantic, canal-side Meguro River, especially illuminated at night. The catch is timing: peak bloom is short and its exact dates shift each year with the weather, so watch the widely published sakura forecasts and, if the blossom is your goal, keep your itinerary flexible. It is the busiest and priciest travel period, so book flights and hotels months ahead. Few travel experiences match the sheer beauty and communal joy of hanami in full swing.",
  },
  {
    name: "Sumida River Fireworks & summer matsuri", slug: "summer-fireworks", image: IMG,
    rating: 4.7, area: "Asakusa & citywide", tip: "Arrive hours early for a riverbank spot at the Sumida fireworks, or watch from a rooftop bar — and rent a yukata to join in properly.",
    filterKeys: [], description: "Spectacular summer fireworks (hanabi) and lively neighbourhood festivals.",
    practicalInfo: { openingHours: "July–August (Sumida fireworks late July)", price: "Free to watch; paid grandstand seats available", howToGetThere: "Sumida fireworks: Asakusa or Kuramae stations; festivals citywide" },
    fullDescription: "Summer in Tokyo is festival season, and its signature events are the hanabi taikai — spectacular fireworks displays that light up the night sky over the city's rivers and bays. The most famous is the Sumida River Fireworks Festival in late July near Asakusa, one of Japan's oldest and largest, launching around 20,000 fireworks to crowds of hundreds of thousands; other major displays illuminate Tokyo Bay and the suburbs through July and August. These are deeply atmospheric occasions, with locals dressing in colourful summer yukata robes, browsing rows of street-food stalls (yatai) selling yakisoba, takoyaki and shaved ice, and gathering along the banks — arrive many hours early for a good free spot, or splurge on a paid grandstand or a rooftop-bar view to beat the crush. Alongside the fireworks, countless neighbourhood matsuri (Shinto festivals) fill the warm months, featuring portable shrine (mikoshi) processions, taiko drumming, dancing and food, from the huge Mitama and Bon-odori dance festivals to smaller local shrine celebrations. Together they make summer, despite its heat and humidity, one of the most vibrant and culturally rich times to experience the city after dark. Renting a yukata lets you join in the spirit.",
  },
  {
    name: "Grand Sumo Tournament", slug: "sumo-tournament", image: IMG,
    rating: 4.7, area: "Ryogoku Kokugikan", tip: "Tokyo hosts three of the year's six tournaments (Jan, May, Sept) — buy tickets the moment they release, and arrive by afternoon to see the top-division bouts.",
    filterKeys: [], description: "Japan's national sport at Tokyo's grand sumo arena, an unmissable cultural spectacle.",
    practicalInfo: { openingHours: "15-day tournaments in January, May & September", price: "Tickets from ~¥3,500 (arena) to ¥15,000+ (ringside)", howToGetThere: "JR/Toei Oedo Line to Ryogoku Station, by the Kokugikan" },
    fullDescription: "Watching a grand sumo tournament (honbasho) is one of the most memorable cultural experiences Tokyo offers, and the city is the best place to see it: three of the six annual tournaments — in January, May and September — are held here at the Ryogoku Kokugikan arena. Each tournament runs for fifteen days, during which the giant wrestlers, or rikishi, compete in a single elevated clay ring (dohyo) in bouts steeped in centuries-old Shinto ritual: the salt-throwing purification, the leg-stomping, the tense face-offs, all erupting into explosive seconds of raw power. The day builds through the lower divisions from the morning, so the excitement, the crowds and the star wrestlers of the top makuuchi division come in the mid-to-late afternoon — aim to be in your seat by around 3:30–4pm for the marquee bouts and the elaborate ring-entering ceremonies. Tickets range from affordable arena seats (from about ¥3,500) to prized ringside box seats, and they sell out fast when released a month or two ahead, so book promptly. The Ryogoku neighbourhood around the arena is the heart of sumo culture, dotted with stables and chanko-nabe hotpot restaurants serving the wrestlers' staple stew. If your visit coincides with a Tokyo tournament, do not miss it.",
  },
  {
    name: "Autumn Illuminations & foliage festivals", slug: "autumn-illuminations", image: IMG,
    rating: 4.6, area: "Gardens & shopping districts", tip: "From November, gardens light up their red maples at night and whole avenues twinkle with millions of LEDs — free and dazzling.",
    filterKeys: [], description: "Glittering winter light displays and illuminated autumn foliage across the city.",
    practicalInfo: { openingHours: "November–February (foliage peaks late November)", price: "Illuminations mostly free; some gardens ¥500–1,000", howToGetThere: "Highlights: Roppongi, Marunouchi, Shibuya, Rikugien & Meiji Gaien" },
    fullDescription: "As the year cools, Tokyo turns on the lights. From November through February the city stages some of the world's most elaborate winter illuminations, draping whole districts, tree-lined avenues, gardens and shopping complexes in millions of LEDs. The Marunouchi district near Tokyo Station, the Roppongi Keyakizaka and Midtown displays, Shibuya's Blue Cave, and the Meguro and Yebisu illuminations are among the dazzling free highlights, transforming evening strolls into something magical and drawing couples and families alike. Overlapping with these in November is the autumn foliage (koyo) season, when the city's classic gardens — Rikugien, Koishikawa Korakuen — and the Meiji Jingu Gaien ginkgo avenue blaze with red maples and golden leaves, many holding special evening light-up events where the illuminated foliage reflects in ponds. Together, the glowing leaves of late autumn and the twinkling illuminations of early winter make the November-to-December stretch a beautiful and romantic time to wander the city after dark, and most of it costs nothing. Bundle up against the cold, and combine an afternoon among the autumn colours with an evening of lights for a quintessential seasonal Tokyo experience away from the summer heat and spring crowds.",
  },
  {
    name: "New Year (Shogatsu) & Setsubun", slug: "new-year", image: IMG,
    rating: 4.5, area: "Shrines & temples", tip: "Join the hatsumode first-shrine-visit crowds at Meiji Jingu or Senso-ji in the first days of January — but note many shops and restaurants close around New Year.",
    filterKeys: [], description: "Japan's most important holiday, with shrine visits, traditions and early-spring rituals.",
    practicalInfo: { openingHours: "New Year: Dec 31–Jan 3; Setsubun: early February", price: "Free (shrine visits); charms & fortunes ¥100–1,000", howToGetThere: "Major shrines: Meiji Jingu, Senso-ji, Kanda Myojin" },
    fullDescription: "New Year, or Shogatsu, is by far the most important holiday in Japan, and experiencing it in Tokyo offers a fascinating window into the country's traditions — quite different from Western celebrations. Rather than raucous parties, the emphasis is on family, renewal and visiting shrines: in the first days of January, millions make their hatsumode, the year's first shrine or temple visit, to pray for good fortune, and the great sites like Meiji Jingu, Senso-ji and Kanda Myojin throng with enormous, atmospheric crowds buying lucky charms (omamori), drawing fortunes (omikuji) and ringing in the year. Temples ring their bells 108 times at midnight on New Year's Eve (joya no kane). A key practical note for visitors: New Year is one of the few times Tokyo genuinely slows down, with many shops, restaurants and businesses closing for several days around January 1st, so plan around reduced services. In early February comes Setsubun, marking the start of spring, when shrines and homes hold bean-throwing (mamemaki) ceremonies to drive out bad luck, with lively events at temples like Senso-ji and Zojoji. For travellers curious about Japanese culture and ritual, visiting during these deeply traditional early-year observances is a uniquely rewarding, if quieter, time to be in the city.",
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Tokyo", item: `${SITE}/tokyo` },
      { "@type": "ListItem", position: 3, name: "Events", item: `${SITE}/tokyo/events` },
    ],
  };
}

export default function TokyoEvents() {
  return (
    <CityGuideShell
      citySlug="tokyo"
      cityName="Tokyo"
      categories={CATEGORIES}
      active="events"
      crumb="Events"
      h1="Tokyo Events & Festivals"
      heroImage={IMG}
      intro="Tokyo's calendar turns with the seasons, and timing your trip to a great event adds a whole extra dimension to a visit. Spring brings the euphoric cherry-blossom hanami; summer explodes with fireworks and neighbourhood matsuri; autumn glows with foliage and dazzling illuminations; and winter centres on the deeply traditional New Year shrine visits. Add three annual grand sumo tournaments and you have a year-round reason to go. Here are the key events and festivals, with dates, costs and tips for experiencing them."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Tokyo events through the year" items={EVENTS} />
    </CityGuideShell>
  );
}
