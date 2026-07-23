import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { SANTORINI_CATEGORIES } from "@/app/lib/santorini";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Santorini Events & Festivals 2026 — What's On Guide | Flyamba",
  description:
    "Santorini events and festivals through the year — Greek Orthodox Easter, the Ifestia volcano fireworks spectacle, the Santorini Jazz Festival, the Megaron Gyzi arts festival, the autumn wine harvest and summer feast days.",
  alternates: { canonical: `${SITE}/santorini/events` },
  openGraph: { title: "Santorini Events & Festivals | Flyamba", description: "The festivals and celebrations worth timing a Santorini trip around.", type: "article" },
};

const IMG = "/images/santorini/sevardheter/imerovigli.webp";

const ITEMS: BcnPlace[] = [
  {
    name: "Greek Orthodox Easter", slug: "orthodox-easter", image: IMG, rating: 4.8, area: "Island-wide",
    tip: "Head to a village like Pyrgos on Good Friday for the candlelit Epitaphios procession — the whole hillside glows with lanterns and torches.",
    filterKeys: [],
    description: "The most important and atmospheric celebration in the Greek calendar, deeply felt across the island.",
    practicalInfo: { openingHours: "Spring; date moves with the Orthodox calendar (often April/May)", price: "Free to witness", howToGetThere: "Village churches island-wide; Pyrgos is the most famous" },
    fullDescription: "Greek Orthodox Easter is the emotional and spiritual high point of the year on Santorini, far bigger than Christmas, and experiencing it in one of the island's villages is genuinely moving. The date shifts each year with the Orthodox calendar, usually falling in April or May, and the celebrations unfold over Holy Week with a rhythm of church services, fasting and ritual. The most spectacular moment comes on Good Friday, when villages hold candlelit Epitaphios processions — the flower-decked bier of Christ carried through the streets behind a river of worshippers holding candles. The hilltop village of Pyrgos is the most famous setting: its entire slope is illuminated with thousands of lanterns and small fires, an unforgettable sight. On Holy Saturday night the churches fall dark before the triumphant midnight Resurrection service, when candles are lit from the holy flame, fireworks and firecrackers erupt across the island, and families head home to break the fast. Easter Sunday is a joyful day of feasting, above all on spit-roasted lamb. If your visit coincides with Orthodox Easter, seek out a village celebration — it's one of the most authentic and memorable experiences Santorini offers, and a world away from the sunset-bar tourism."
  },
  {
    name: "Ifestia Festival (volcano fireworks)", slug: "ifestia-festival", image: IMG, rating: 4.6, area: "Caldera / Fira",
    tip: "Watch from a caldera-edge bar in Fira or from a boat on the water for the best view of the fireworks 'eruption' over Nea Kameni.",
    filterKeys: [],
    description: "A dramatic summer fireworks spectacle re-enacting the island's volcanic eruption over the caldera.",
    practicalInfo: { openingHours: "Typically late summer (often September); one evening", price: "Free to watch from the caldera; boat viewing extra", howToGetThere: "Best seen from Fira's caldera cliff or by boat in the caldera" },
    fullDescription: "The Ifestia Festival — its name derived from Hephaestus, the Greek god of fire and volcanoes — is Santorini's signature modern spectacle, a theatrical celebration of the island's fiery geological history. Held on an evening usually in the late-summer period, it culminates in a huge fireworks display staged over the volcanic islet of Nea Kameni at the centre of the caldera, choreographed to simulate a volcanic eruption, with light, colour and music reflecting off the dark cliffs and water. The effect, seen across the vast natural amphitheatre of the caldera, is genuinely dramatic and draws big crowds. The festival often forms the finale of a longer programme of cultural events, concerts and performances staged around Fira through the summer. The best vantage points are along the caldera cliff in Fira, from the terraces of the bars and restaurants that line it, or from a boat out on the water for a front-row view of the pyrotechnic 'eruption'. Because dates and the exact programme vary year to year and are confirmed closer to the time, check local listings once you know your travel dates. For visitors on the island at the right moment, it's a spectacular and uniquely Santorinian night out."
  },
  {
    name: "Santorini Jazz Festival", slug: "jazz-festival", image: IMG, rating: 4.5, area: "Kamari",
    tip: "Performances are often staged open-air near Kamari beach — a magical setting for live music under the stars; book popular nights ahead.",
    filterKeys: [],
    description: "A long-running summer jazz festival bringing international and Greek musicians to open-air stages.",
    practicalInfo: { openingHours: "Summer (often July); several evenings", price: "Ticketed; some events free", howToGetThere: "Usually staged around Kamari on the east coast" },
    fullDescription: "The Santorini Jazz Festival is one of the island's most established cultural events, running for several decades and bringing an eclectic mix of international and Greek jazz, blues and world musicians to the island each summer, typically over several evenings in July. Concerts are often held in atmospheric open-air venues around Kamari on the east coast — a beautiful setting to hear live music under the warm night sky with the sea nearby — giving the festival a relaxed, intimate feel quite different from the caldera's glamour. The programme mixes well-known names with emerging talent and spans traditional and contemporary jazz styles, drawing music lovers and a laid-back, appreciative crowd. It's a lovely reason to base yourself in or visit Kamari during the festival dates, combining beach days with evening concerts. Some events are ticketed while others may be free, and the exact line-up and dates are announced each year, so check the festival's programme when planning. For travellers who want to pair Santorini's landscapes with live music and a cultured, low-key evening, the Jazz Festival is a highlight of the summer calendar and a welcome alternative to the island's bar and club scene."
  },
  {
    name: "Megaron Gyzi Festival", slug: "megaron-gyzi", image: IMG, rating: 4.4, area: "Fira",
    tip: "A cultured antidote to beach days — catch a classical concert or an exhibition in the historic Megaron Gyzi mansion in Fira.",
    filterKeys: [],
    description: "A summer arts festival of concerts, exhibitions and performances in a historic Fira mansion.",
    practicalInfo: { openingHours: "Summer (often late July–August)", price: "Ticketed; some exhibitions free", howToGetThere: "Megaron Gyzi cultural centre, central Fira" },
    fullDescription: "The Megaron Gyzi Festival is Santorini's most highbrow cultural gathering, held each summer — usually across late July and August — in and around the Megaron Gyzi, a handsome restored 17th-century mansion in Fira that serves as a cultural centre and museum. Founded to promote the arts on the island, the festival presents a programme of classical music concerts, theatrical performances, art exhibitions and talks, often featuring distinguished Greek and international artists in the atmospheric courtyard and halls of the historic building. It offers a refined, contemplative counterpoint to Santorini's beaches, boat trips and nightlife, and a chance to enjoy the island's cultural and artistic life in a beautiful historic setting. The mansion itself is worth a visit for its collection of old engravings, maps, photographs and documents chronicling Santorini's history, including striking images of the destructive 1956 earthquake. Events are generally ticketed, with some exhibitions free to browse, and the annual programme is published closer to the summer. For visitors staying in or near Fira who appreciate classical music, theatre and the arts, timing an evening around a Megaron Gyzi performance adds a memorable cultural dimension to a Santorini trip."
  },
  {
    name: "Wine harvest & food events", slug: "wine-harvest", image: IMG, rating: 4.6, area: "Wine country",
    tip: "Visit the wineries in late August and September to catch the harvest buzz, and look out for grape-treading and tasting events around Pyrgos and Megalochori.",
    filterKeys: [],
    description: "Late-summer grape harvest brings a festive energy to Santorini's historic wineries.",
    practicalInfo: { openingHours: "Harvest roughly late August–September", price: "Tastings and events ticketed; varies", howToGetThere: "Wineries around Pyrgos, Megalochori, Akrotiri and Emporio" },
    fullDescription: "Wine is woven into Santorini's identity, and the annual grape harvest — the trygos — is one of the most authentic seasonal rhythms on the island. Because of the intense summer heat, Santorini harvests early, typically from late August into September, and this is a wonderful time to visit the wineries as they hum with activity bringing in the prized Assyrtiko and the grapes destined for sweet Vinsanto. Many of the island's wineries — from the big caldera-view Santo Wines to historic family estates like Gavalas, Venetsanos, Boutari and Domaine Sigalas around Pyrgos, Megalochori, Emporio and Akrotiri — mark the season with special tastings, tours and food-pairing events, and you may encounter traditional grape-treading and celebrations of the harvest. Throughout the summer, various villages also hold local food and wine feasts, often tied to religious festivals, where you can sample Santorinian specialities like fava, tomatokeftedes and white aubergine alongside the local wine. For food-and-wine lovers, timing a trip to the late-summer harvest, or seeking out a village food festival, offers a delicious and genuine taste of the island's agricultural heart, and a reminder that beneath the honeymoon glamour Santorini remains a working land of vines and volcanic soil."
  },
  {
    name: "Summer feast days & religious festivals (panigiria)", slug: "panigiria", image: IMG, rating: 4.5, area: "Village churches",
    tip: "Ask locals which village is holding its saint's-day panigiri during your stay — these community feasts with food, wine and music are the real Santorini.",
    filterKeys: [],
    description: "Traditional saint's-day village festivals with food, wine, music and dancing through the summer.",
    practicalInfo: { openingHours: "Throughout summer; key dates include 15 August (Dormition)", price: "Community events, often free to join", howToGetThere: "Held at village churches and monasteries across the island" },
    fullDescription: "Beyond the headline cultural events, the most authentic celebrations on Santorini are the panigiria — traditional religious festivals held on the feast days of the saints to whom the island's countless churches and monasteries are dedicated. Scattered through the summer, these community gatherings typically begin with a church service and then spill into the square for a feast of local food, free-flowing wine, live traditional music and dancing that can last late into the night, with locals and lucky visitors all welcome to join. The biggest is the Dormition of the Virgin on 15 August, one of the most important dates in the Orthodox calendar, celebrated with special fervour at churches across Greece including Santorini, and effectively a national holiday. Other saints' days bring smaller but equally warm-hearted feasts to individual villages throughout July, August and September. Because they follow the church calendar and vary from village to village, the best way to find one is simply to ask your hotel or locals which village is holding its panigiri during your stay. Stumbling into one of these genuine community festivals — sharing a table, a carafe of wine and a dance with islanders — is one of the most rewarding and memorable experiences Santorini can offer, and utterly removed from the tourist trail."
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Santorini", item: `${SITE}/santorini` },
      { "@type": "ListItem", position: 3, name: "Events", item: `${SITE}/santorini/events` },
    ],
  };
}

export default function SantoriniEvents() {
  return (
    <CityGuideShell
      citySlug="santorini"
      cityName="Santorini"
      categories={SANTORINI_CATEGORIES}
      active="events"
      crumb="Events"
      h1="Santorini Events & Festivals"
      heroImage={IMG}
      intro="Santorini's calendar runs from the deeply felt to the purely spectacular. Time your visit right and you could witness the candlelit processions of Greek Orthodox Easter, the fireworks 'eruption' of the Ifestia Festival over the caldera, open-air jazz by Kamari beach, classical concerts in a historic Fira mansion, the late-summer wine harvest, or a village saint's-day feast with food, wine and dancing. Here are the events worth building a trip around, month by month."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Santorini events and festivals in detail" items={ITEMS} />
    </CityGuideShell>
  );
}
