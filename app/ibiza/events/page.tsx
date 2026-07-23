import type { Metadata } from "next";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { IBIZA_CATEGORIES } from "@/app/data/ibiza-places";
import { SITE } from "@/app/lib/destination-helpers";

const HERO = "/images/destinations/flights-ibiza.avif";
const PH = "/images/barcelona/placeholder.webp";

export const metadata: Metadata = {
  title: "Events in Ibiza 2026 — Festivals & Parties | Flyamba",
  description:
    "Ibiza's events calendar — the club opening and closing parties, Pacha's Flower Power, the Medieval Festival in Dalt Vila, Sant Josep and village fiestas, and more, month by month.",
  alternates: { canonical: `${SITE}/ibiza/events` },
  openGraph: { title: "Ibiza Events, Festivals & Parties | Flyamba", description: "The opening and closing parties, festivals and fiestas that shape the Ibiza calendar.", type: "article", images: [HERO] },
};

const EVENTS: BcnPlace[] = [
  {
    name: "Club Opening Parties (late May–June)", slug: "opening-parties", image: PH,
    rating: 4.5, area: "Island-wide", filterKeys: [],
    tip: "The openings launch each club's summer — tickets sell out fast, so plan and book weeks ahead.",
    description: "The season kicks off as the superclubs throw their opening parties, announcing the summer's residencies.",
    practicalInfo: { openingHours: "Late May into June", price: "Club entry €40–90", howToGetThere: "At Pacha, Amnesia, Hï, Ushuaïa, DC-10 and more" },
    fullDescription: "The Ibiza summer officially begins with the club opening parties, a wave of huge events in late May and through June as each of the island's superclubs launches its season and unveils the year's line-up of residencies and headline nights. These openings are among the most anticipated dates in the global dance-music calendar, drawing clubbers, DJs and industry from around the world, and venues like Pacha, Amnesia, Hï, Ushuaïa and DC-10 pull out all the stops. The atmosphere is electric — a sense of the whole island waking up for summer — but demand is intense: tickets to the marquee openings sell out well in advance and prices are at the premium end, so if catching an opening is a priority you should plan your trip around the published dates and book early. The weather in late May and June is already warm and the crowds, while big for the openings, are generally lighter than the July–August peak, making it an attractive time to visit. Check each club's schedule as dates are announced in spring, buy tickets online ahead of the door, and use the Discobus to get home. The openings set the tone for the entire season.",
  },
  {
    name: "Club Closing Parties (late September–October)", slug: "closing-parties", image: PH,
    rating: 4.6, area: "Island-wide", filterKeys: [],
    tip: "The closings are legendary, emotional all-nighters — many regulars rate them above the openings.",
    description: "The season ends with the famous closing parties, emotional marathon sends-off at each superclub.",
    practicalInfo: { openingHours: "Late September into October", price: "Club entry €40–90+", howToGetThere: "At the major clubs across the island" },
    fullDescription: "If the openings start the season, the closing parties end it in spectacular, emotional style, and for many devotees the closings are the true highlight of the Ibiza year. Held from late September into early October, these are marathon farewell events where each superclub bids goodbye to the summer, often with extended sets, the season's resident DJs on top form, and a euphoric, bittersweet atmosphere among crowds who know it is the last dance until next year. Clubs including Amnesia, Pacha, Hï and DC-10 stage their own legendary closings, and the sense of occasion is unmatched. Conveniently, this coincides with the lovely autumn shoulder season, when the weather is still warm, the sea is at its warmest for swimming, and prices and daytime crowds have eased from the peak — so a late-September trip can combine the biggest nights with the most pleasant conditions. As with the openings, the headline closings sell out and command premium prices, so book flights, accommodation and tickets in advance. Check the clubs' announced closing dates, which vary year to year, and be prepared for genuinely long nights. For clubbers, timing a visit to catch a closing party is one of the most rewarding ways to experience Ibiza.",
  },
  {
    name: "Pacha Flower Power", slug: "flower-power", image: PH,
    rating: 4.4, area: "Pacha, Ibiza Town", filterKeys: [],
    tip: "Dress up in full sixties tie-dye and flowers — this joyful retro night is a beloved Ibiza institution.",
    description: "Pacha's long-running sixties-themed party, a riot of tie-dye, flower crowns and feel-good classics.",
    practicalInfo: { openingHours: "Regular nights through the summer season", price: "Club entry ~€40–60", howToGetThere: "At Pacha, by the marina in Ibiza Town" },
    fullDescription: "Flower Power at Pacha is one of Ibiza's most beloved and enduring club nights, a joyful throwback to the 1960s and '70s hippy era that first put the island on the countercultural map. Running for decades, it fills the famous Pacha with a riot of tie-dye, flower crowns, peace signs, retro décor and elaborate fancy dress, while the soundtrack swaps cutting-edge house for feel-good classics from the swinging sixties, Motown, disco and beyond. The result is one of the most fun, colourful and unpretentious nights on the island, drawing a wonderfully mixed, all-ages crowd who come to dance and dress up rather than pose. Getting into the spirit with a full flower-power outfit is very much part of the experience, and half the pleasure. It is a fixture of the summer schedule with regular dates, more affordable and light-hearted than the big EDM residencies, and a lovely change of pace if the relentless modern-club scene is not entirely your thing. It also nods directly to the island's genuine hippy heritage, still alive at the markets of Las Dalias and Punta Arabí. Check Pacha's calendar for dates, book ahead, and raid your wardrobe for something suitably psychedelic. A guaranteed good-time night.",
  },
  {
    name: "Medieval Festival, Dalt Vila (May)", slug: "medieval-festival", image: PH,
    rating: 4.5, area: "Dalt Vila, Ibiza Town", filterKeys: [],
    tip: "A free, family-friendly weekend that transforms the old town into a medieval market — go in the evening for the atmosphere.",
    description: "The UNESCO old town becomes a medieval market and re-enactment for a lively spring weekend.",
    practicalInfo: { openingHours: "One weekend in May", price: "Free entry", howToGetThere: "Throughout Dalt Vila, Ibiza Town" },
    fullDescription: "Each May, the walled old town of Dalt Vila hosts one of Ibiza's most charming and family-friendly events: the Medieval Festival (Eivissa Medieval), a weekend that transforms the UNESCO-listed streets into a bustling medieval market and living-history spectacle. The cobbled lanes and squares fill with hundreds of stalls selling crafts, food and wares, alongside costumed performers, musicians, jugglers, falconry displays, artisan demonstrations and re-enactments that celebrate the island's layered Phoenician, Roman, Moorish and Catalan heritage. It is free to attend, wonderfully atmospheric — especially in the evening when the ramparts are lit — and a complete contrast to the club scene, making it ideal for families and anyone interested in Ibiza's deep history. The festival also showcases the beauty of Dalt Vila itself, giving a great excuse to explore the fortress town, the cathedral and the viewpoints. It takes place over a single weekend in May, at the start of the season when the weather is warm and the crowds are still light, and it is one of the highlights of the island's cultural calendar. Check the exact dates each spring, wear comfortable shoes for the hills and cobbles, and come hungry for the market food stalls.",
  },
  {
    name: "Village Fiestas & Sant Josep", slug: "village-fiestas", image: PH,
    rating: 4.3, area: "Villages island-wide", filterKeys: [],
    tip: "Time a visit for a village patron-saint fiesta for a taste of the real, local Ibiza the tourists rarely see.",
    description: "Traditional patron-saint fiestas across the island's villages, with folk music, dancing and local food.",
    practicalInfo: { openingHours: "Year-round; each village on its saint's day", price: "Free", howToGetThere: "In villages like Sant Josep, Sant Antoni, Santa Eulària" },
    fullDescription: "Away from the clubs, Ibiza keeps a rich calendar of traditional village fiestas — the 'festes' held in honour of each town and village's patron saint, which offer the most authentic window onto local island life. Throughout the year, communities such as Sant Josep, Sant Antoni, Santa Eulària, Sant Joan and Sant Jordi celebrate their saint's day with a mix of religious processions, folk music and the distinctive Ibicenco 'ball pagès' country dancing, alongside food stalls, fireworks, craft fairs and family festivities in the village squares. Sant Josep de sa Talaia, for instance, marks its patron in March, while others fall across spring, summer and autumn. These events are free, warm-hearted and largely attended by locals, giving visitors a genuine taste of the island's culture, traditions and community spirit far removed from the tourist scene. Larger towns also stage summer patron festivals with concerts and events that visitors can easily join. Because the dates are tied to saints' days and vary from village to village, it is worth checking the local fiesta calendar for whenever you are visiting — stumbling upon one is a delight. Combine a fiesta with a meal at a village restaurant to round out an evening of real, rural Ibiza. They are a lovely, free cultural counterpoint to the beaches and nightlife.",
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Ibiza", item: `${SITE}/ibiza` },
      { "@type": "ListItem", position: 3, name: "Events", item: `${SITE}/ibiza/events` },
    ],
  };
}

export default function IbizaEvents() {
  return (
    <CityGuideShell
      citySlug="ibiza"
      cityName="Ibiza"
      categories={IBIZA_CATEGORIES}
      active="events"
      crumb="Events"
      h1="Ibiza Events, Festivals & Parties"
      heroImage={HERO}
      intro="Ibiza's calendar is bookended by the two biggest dates in global clubbing — the club opening parties in late May and June, and the legendary closing parties of late September and October — but there is far more to the island's year than DJs. Pacha's beloved Flower Power night keeps the sixties spirit alive, the Medieval Festival transforms Dalt Vila each May, and traditional village fiestas offer a glimpse of the real, local Ibiza. Here are the events worth planning a trip around."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Ibiza's events calendar — in detail" items={EVENTS} />
    </CityGuideShell>
  );
}
