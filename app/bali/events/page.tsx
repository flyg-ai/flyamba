import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/bali-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Bali Events & Festivals 2026 — Ceremonies & Things to Do",
  description:
    "Bali's calendar of Hindu ceremonies and cultural festivals — Nyepi (the Day of Silence), Galungan, the Bali Arts Festival, BaliSpirit, the Ubud Writers…",
  alternates: { canonical: `${SITE}/bali/events` },
  openGraph: { title: "Bali Events & Festivals | Flyamba", description: "Nyepi, Galungan, the Bali Arts Festival and more — Bali's ceremony and festival calendar.", type: "article" },
};

const IMG = "/images/bali/attractions/kuta.webp";

const INFO: BcnPlace[] = [
  {
    name: "Nyepi — Balinese Day of Silence", slug: "nyepi", image: IMG, rating: 5, area: "Islandwide",
    tip: "The airport closes for 24 hours and no one may leave their accommodation — book a hotel with grounds you can relax in, and stock up on snacks the day before.",
    filterKeys: [],
    description: "Bali's most extraordinary day: the entire island shuts down for 24 hours of total silence.",
    practicalInfo: { openingHours: "One full day in March (date varies)", price: "Free (island shuts down)", howToGetThere: "Wherever you are staying — no travel is permitted" },
    fullDescription: "Nyepi, the Balinese Hindu New Year in March, is one of the most remarkable things a traveller can experience anywhere. For 24 hours the entire island falls completely silent: the airport closes, roads empty, shops shut, lights stay off and no one — locals or tourists — may leave their home or hotel. It is a day of fasting, meditation and self-reflection, intended to convince evil spirits that Bali is deserted so they pass it by. The night before is the opposite: the spectacular Ngrupuk parade sees villages carry towering, grotesque papier-mâché monsters called ogoh-ogoh through the streets to drums and torches before burning them. If you're on the island for Nyepi, embrace it — choose a hotel with pleasant grounds, stock up on food and books beforehand, and enjoy a rare day of enforced calm and, after dark, some of the clearest starry skies you'll ever see. Just don't plan to arrive or depart on the day itself.",
  },
  {
    name: "Galungan & Kuningan", slug: "galungan-kuningan", image: IMG, rating: 5, area: "Islandwide",
    tip: "The tall, arching bamboo poles (penjor) that line every street during Galungan are the best time for photographs of Bali at its most festive.",
    filterKeys: [],
    description: "Bali's biggest religious festival, when ancestral spirits return and the island is decorated with penjor.",
    practicalInfo: { openingHours: "10-day festival, twice a year (210-day cycle)", price: "Free to witness", howToGetThere: "Villages and temples across the island" },
    fullDescription: "Galungan is the most important festival in the Balinese calendar, celebrating the victory of good (dharma) over evil and the return of ancestral spirits to visit their descendants. It runs on the 210-day Balinese pawukon cycle, so it happens roughly twice a Gregorian year. During the ten-day period, every street is lined with penjor — tall, gracefully arching bamboo poles hung with woven palm-leaf decorations, coconuts and offerings — creating one of the island's most beautiful sights. Families dress in their finest, temples fill with elaborate offerings, and the celebrations culminate ten days later in Kuningan, when the spirits return to heaven. For visitors it's a wonderful, colourful time to be on Bali, with ceremonies, gamelan music and processions everywhere, though some businesses and warungs close as staff return to their villages. Dress respectfully (a sarong and sash) if you visit a temple, observe quietly, and enjoy the island at its most devout and photogenic.",
  },
  {
    name: "Bali Arts Festival (Pesta Kesenian Bali)", slug: "bali-arts-festival", image: IMG, rating: 5, area: "Denpasar",
    tip: "The opening parade and the nightly dance performances at the Taman Werdhi Budaya Art Centre are free or very cheap — arrive early for a seat.",
    filterKeys: [],
    description: "A month-long celebration of Balinese dance, music and craft each June–July in Denpasar.",
    practicalInfo: { openingHours: "Mid-June to mid-July, daily", price: "Free–low cost", howToGetThere: "Taman Werdhi Budaya (Art Centre), Denpasar" },
    fullDescription: "The Bali Arts Festival is the island's flagship cultural event — a month-long showcase of Balinese performing and visual arts held from mid-June to mid-July at the Taman Werdhi Budaya Art Centre in Denpasar. It opens with a grand parade through the capital and then fills the following weeks with nightly performances of traditional dance (legong, barong, kecak), gamelan orchestras, shadow-puppet (wayang) shows, craft exhibitions and food stalls, drawing troupes from every regency competing to display their village's finest talent. For anyone interested in Balinese culture beyond the beaches, it's an unmissable and authentic window into the island's living artistic traditions, largely staged for locals rather than tourists. Entry is free or very cheap, though the best evening performances fill up, so arrive early. It coincides neatly with the start of the dry-season peak, making June–July a rewarding time to combine beach and cultural travel. Check the official schedule when you arrive, as programmes and venues shift daily.",
  },
  {
    name: "BaliSpirit Festival", slug: "balispirit", image: IMG, rating: 5, area: "Ubud",
    tip: "Multi-day passes are cheaper than single days if you plan to attend more than a couple of sessions.",
    filterKeys: [],
    description: "Ubud's yoga, music and wellness festival, drawing a global crowd each spring.",
    practicalInfo: { openingHours: "Several days in spring (usually April/May)", price: "Day/festival passes (from ~$50/day)", howToGetThere: "Ubud (venue varies year to year)" },
    fullDescription: "The BaliSpirit Festival taps directly into Ubud's identity as a global wellness capital. Held over several days in spring, it brings together yoga and movement workshops, live world music, dance, meditation, healing arts and talks, attracting teachers, performers and a health-conscious international crowd from around the world. Days are filled with classes across dozens of yoga styles and body-mind disciplines, while evenings turn to concerts and dance parties, all wrapped in Ubud's lush jungle setting. It's the sort of event that defines a certain kind of Bali trip — restorative, communal and creative — and pairs perfectly with the town's spas, vegan cafés and rice-terrace walks. Tickets are sold as single-day or multi-day passes (multi-day being better value if you'll attend several sessions), and popular workshops can sell out, so book ahead. If a yoga-and-wellness escape is your reason for visiting Bali, timing your trip around BaliSpirit turns it into something more immersive. Confirm the year's exact dates and venue, which vary, before booking flights.",
  },
  {
    name: "Ubud Writers & Readers Festival", slug: "ubud-writers-festival", image: IMG, rating: 5, area: "Ubud",
    tip: "Book main-programme tickets and headline sessions early — the biggest names sell out weeks in advance.",
    filterKeys: [],
    description: "Southeast Asia's leading literary festival, held in Ubud each October.",
    practicalInfo: { openingHours: "Four days in October", price: "4-day pass or single tickets", howToGetThere: "Venues across Ubud" },
    fullDescription: "The Ubud Writers & Readers Festival is Southeast Asia's foremost literary gathering, held over four days each October across venues in and around Ubud. It draws acclaimed authors, poets, journalists and thinkers from Indonesia and around the world for panels, readings, workshops, film screenings, book launches and lively debates on culture, politics and ideas, alongside music and food events in the evenings. Founded partly as a response to the 2002 Bali bombings, it has grown into a genuinely international festival with a warm, intimate feel, set against Ubud's jungle-and-temple backdrop. It's a magnet for the literary-minded traveller and a very different side of Bali from the southern beaches — intellectual, creative and community-driven. Tickets come as four-day passes or single-session entries, and headline events with big-name authors sell out well ahead, so plan early. October sits at the shoulder of the dry season, generally still pleasant weather, making it a good time to combine the festival with wider island travel. Check the annual programme and author line-up on the official site.",
  },
  {
    name: "Bali Kite Festival & village ceremonies", slug: "kite-festival", image: IMG, rating: 5, area: "Sanur / Padang Galak",
    tip: "The giant kites fly best on windy afternoons in July–August around Sanur's Padang Galak beach — a free, uniquely local spectacle.",
    filterKeys: [],
    description: "Enormous traditional kites fill the sky each dry season, plus countless village temple festivals.",
    practicalInfo: { openingHours: "July–August (kites); temple odalan year-round", price: "Free", howToGetThere: "Padang Galak / Sanur area; village temples islandwide" },
    fullDescription: "Beyond the headline festivals, Bali's calendar is packed with smaller, deeply local events worth stumbling upon. The Bali Kite Festival, held around Sanur's Padang Galak beach in the windy months of July and August, sees village teams fly enormous traditional kites — some tens of metres long, requiring dozens of people to launch — in a competitive, gamelan-accompanied spectacle that fills the sky and is completely free to watch. Year-round, meanwhile, every one of the island's thousands of temples holds its own odalan (anniversary festival) on the 210-day cycle, so at almost any time you can chance upon a village procession of women balancing towering fruit offerings, barong dances or a cremation ceremony (ngaben), which are elaborate, joyful send-offs rather than sombre affairs. These unscheduled encounters are often the most memorable cultural moments of a Bali trip. If you're invited to observe, wear a sarong and sash, stay respectfully to the side, and never stand higher than the priests. Ask your driver or hotel what's happening locally during your stay.",
  },
];

function jsonLd() {
  return {
    "@type": "BreadcrumbList",
    "@context": "https://schema.org",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Bali", item: `${SITE}/bali` },
      { "@type": "ListItem", position: 3, name: "Events", item: `${SITE}/bali/events` },
    ],
  };
}

export default function BaliEvents() {
  return (
    <CityGuideShell
      citySlug="bali"
      cityName="Bali"
      categories={CATEGORIES}
      active="events"
      crumb="Events"
      h1="Bali Events & Festivals"
      heroImage={IMG}
      intro="Bali runs on ceremony. Alongside a handful of big cultural festivals — the island-stopping silence of Nyepi, the month-long Bali Arts Festival, Ubud's yoga and literary gatherings — the Hindu calendar fills every village with temple anniversaries, processions and offerings almost daily. This guide covers the events worth planning a trip around, plus the everyday ceremonies you'll likely encounter, with timing tips so you catch Bali at its most colourful (and know when the whole island shuts down)."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Bali's festivals & ceremonies — in detail" items={INFO} />
    </CityGuideShell>
  );
}
