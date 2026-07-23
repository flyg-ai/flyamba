import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { BANGKOK_CATEGORIES } from "@/app/lib/bangkok";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Bangkok Events & Festivals 2026 — What's On | Flyamba",
  description:
    "Bangkok's festivals and events through the year — Songkran water fights, Loy Krathong, Chinese New Year in Yaowarat, the Vegetarian Festival and the New Year countdown.",
  alternates: { canonical: `${SITE}/bangkok/events` },
  openGraph: { title: "Bangkok Events & Festivals | Flyamba", description: "Songkran, Loy Krathong and festivals all year.", type: "article" },
};

const IMG = "/images/bangkok/sevardheter/yaowarat.webp";

const EVENTS: BcnPlace[] = [
  {
    name: "Songkran — Thai New Year (April)", slug: "songkran", image: IMG, rating: 4.9, area: "Citywide · mid-April",
    tip: "Protect your phone in a waterproof pouch and expect to get completely soaked — Silom, Khao San and RCA host the biggest water battles.",
    filterKeys: [], description: "Thailand's exuberant New Year, celebrated with city-wide water fights over the hottest days of the year.",
    practicalInfo: { openingHours: "Mid-April, typically 13–15 April", price: "Free to join the street celebrations", howToGetThere: "Silom, Khao San Road, RCA and Sukhumvit Soi 11 for the biggest street parties" },
    fullDescription: "Songkran, the traditional Thai New Year in mid-April, is the biggest and most joyous festival on Bangkok's calendar, and experiencing it is a genuine bucket-list moment. What began as a gentle ritual — sprinkling scented water over Buddha images and the hands of elders as a blessing — has evolved, at least on the streets, into the world's biggest water fight, a city-wide, days-long free-for-all of super-soakers, hoses and buckets that provides blessed relief from the fierce April heat. Whole neighbourhoods turn into splash zones, with Silom Road, backpacker-central Khao San Road, the RCA nightlife strip and Sukhumvit Soi 11 hosting the most raucous celebrations, complete with music stages, foam and dancing. Alongside the mayhem, the festival keeps its spiritual heart: locals visit temples, make merit, build sand pagodas and pay respects to family. If you're in town, embrace it — you cannot stay dry — but take sensible precautions: seal your phone and valuables in a waterproof pouch, wear quick-drying clothes and shoes, and be aware that many shops close and transport gets chaotic. It's crowded, wild, wet and utterly unforgettable, the single most exciting time to be in Bangkok.",
  },
  {
    name: "Loy Krathong & Yi Peng (November)", slug: "loy-krathong", image: IMG, rating: 4.8, area: "Riverside & waterways · November",
    tip: "Head to the Chao Phraya, a canal or a hotel with river access to float your krathong — riverside restaurants book up fast.",
    filterKeys: [], description: "The beautiful festival of light, when candlelit floats are set adrift on the city's rivers and canals.",
    practicalInfo: { openingHours: "November full moon (date varies yearly)", price: "Free; a krathong float costs a few baht", howToGetThere: "Chao Phraya piers, Lumphini Park lake, Asiatique and riverside temples" },
    fullDescription: "Loy Krathong, held on the full-moon night of the twelfth lunar month (usually November), is Bangkok's most beautiful and romantic festival. Across the city, people gather at the river, canals, lakes and ponds to float a krathong — a small, exquisitely decorated raft traditionally made from a banana-trunk base adorned with folded banana leaves, flowers, incense and a lit candle. As they set it adrift, they make a wish and symbolically release the past year's misfortunes and give thanks to the water goddess. The sight of thousands of flickering candles drifting downstream is genuinely magical. The banks of the Chao Phraya, the lake at Lumphini Park, Asiatique and riverside temples are among the best places to join in, and many hotels and restaurants along the water host special events, so book ahead. In the north of Thailand, notably Chiang Mai, the concurrent Yi Peng festival fills the sky with floating lanterns; Bangkok's celebrations are more water-focused but no less lovely. To take part, simply buy a krathong from a street vendor for a few baht, ideally an eco-friendly one made from bread or natural materials rather than polystyrene. Calm, communal and photogenic, it's a wonderful evening to be by the water.",
  },
  {
    name: "Chinese New Year in Yaowarat (Jan/Feb)", slug: "chinese-new-year", image: IMG, rating: 4.7, area: "Chinatown · late Jan / Feb",
    tip: "Yaowarat Road is closed to traffic and packed — come early evening for the lion dances, red lanterns and Chinatown street food.",
    filterKeys: [], description: "Bangkok's Chinatown erupts in red and gold for one of the city's most colourful street celebrations.",
    practicalInfo: { openingHours: "Late January or February (lunar date varies)", price: "Free to join the street festivities", howToGetThere: "MRT to Wat Mangkon, in the heart of Yaowarat / Chinatown" },
    fullDescription: "Bangkok has a large Thai-Chinese community, and Chinese New Year (late January or February, depending on the lunar calendar) transforms the historic Chinatown district of Yaowarat into one of the city's most vibrant and colourful celebrations. In the days around the festival, the whole neighbourhood is decked in red and gold, with lanterns strung overhead, shrines and shopfronts wreathed in incense and offerings, and a palpable buzz of families shopping for auspicious foods and gifts. On the main days, Yaowarat Road is typically closed to traffic and thronged with crowds enjoying dragon and lion dances, drumming, cultural performances, and an even greater feast of street food than usual, the area's famed stalls going into overdrive. Firecrackers, well-wishing and the exchange of red envelopes add to the atmosphere. Thanks to the MRT extension, with its ornate Wat Mangkon station dropping you right in the thick of it, reaching the festivities is effortless. It's free to join, best experienced in the early evening when the lights come on and the performances get going, and a fantastic time to eat your way through Chinatown. Expect big crowds and go with the flow — it's a feast for the senses and a wonderful window into Bangkok's Chinese heritage.",
  },
  {
    name: "Vegetarian Festival (Sept/Oct)", slug: "vegetarian-festival", image: IMG, rating: 4.5, area: "Chinatown · Sept/Oct",
    tip: "Look for the bright yellow flags and banners marking stalls and restaurants serving 'jay' (vegan) food across Yaowarat.",
    filterKeys: [], description: "A nine-day Taoist festival of purification when Chinatown turns almost entirely vegan.",
    practicalInfo: { openingHours: "Nine days in September or October (lunar date varies)", price: "Free; vegetarian dishes cheaply priced", howToGetThere: "MRT to Wat Mangkon; Yaowarat is the festival's epicentre" },
    fullDescription: "The Vegetarian Festival, or Tesagan Gin Je, is a nine-day Taoist observance held in September or October, and Bangkok's Chinatown is its epicentre. During the festival, many in the Thai-Chinese community adopt a strict vegan diet (known as 'jay') as an act of purification and merit-making, abstaining not only from meat but also from strong-smelling ingredients like garlic and onion, alcohol and other vices. For visitors, the most striking effect is culinary: Yaowarat and surrounding streets sprout hundreds of stalls and pop-up kitchens flying the festival's distinctive bright-yellow flags, serving an astonishing array of inventive vegan versions of Thai and Chinese dishes — mock meats, noodles, curries, dumplings and sweets — usually at very low prices. It's a paradise for vegetarians and vegans, who rarely get such choice, and a fascinating time for any food-lover to graze through Chinatown. Beyond the food, temples host ceremonies, processions and rituals, and in some parts of Thailand (most famously Phuket rather than Bangkok) the festival features dramatic acts of devotion. In the capital it's a gentler, food-focused affair. Simply follow the yellow flags around Yaowarat, easily reached via the Wat Mangkon MRT station, and eat well and cheaply while soaking up the devout, community atmosphere.",
  },
  {
    name: "New Year's Eve countdown (December)", slug: "new-year-countdown", image: IMG, rating: 4.6, area: "CentralWorld & riverside · 31 Dec",
    tip: "The CentralWorld plaza is the mega-party, but the riverside and rooftop bars offer classier fireworks views — book far ahead.",
    filterKeys: [], description: "Bangkok sees in the international New Year with huge fireworks and countdown parties across the city.",
    practicalInfo: { openingHours: "31 December into 1 January", price: "Street countdown free; rooftop and dinner events priced high, book ahead", howToGetThere: "BTS to Chit Lom or Siam for CentralWorld; riverside piers for the Chao Phraya displays" },
    fullDescription: "Bangkok embraces the international New Year with gusto, and 31 December brings some of the biggest celebrations of the year. The epicentre is the vast plaza outside CentralWorld in the Ratchaprasong shopping district, where tens of thousands gather for a free open-air countdown party with live music, light shows and a spectacular fireworks display over the city centre — an electric, if very crowded, atmosphere reached easily via the Chit Lom and Siam BTS stations. For a more scenic and upmarket alternative, the Chao Phraya river hosts dazzling fireworks launched from and around the riverside, best viewed from ICONSIAM, Asiatique, a dinner cruise or one of the grand riverside hotels, many of which throw lavish gala dinners. The city's famous rooftop bars also stage premium countdown events with fireworks views, though these sell out early and command steep prices, so book well in advance. Beyond the headline spots, hotels, malls and nightlife districts across Bangkok run their own parties. Falling in the peak cool season, New Year is one of the busiest and priciest times to visit, so reserve flights, accommodation and any special events long ahead. Whether you join the free mega-party or splurge on a rooftop with a view, it's a memorable, high-energy way to welcome the year in one of Asia's great cities.",
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Bangkok", item: `${SITE}/bangkok` },
      { "@type": "ListItem", position: 3, name: "Events", item: `${SITE}/bangkok/events` },
    ],
  };
}

export default function BangkokEvents() {
  return (
    <CityGuideShell
      citySlug="bangkok"
      cityName="Bangkok"
      categories={BANGKOK_CATEGORIES}
      active="events"
      crumb="Events"
      h1="Bangkok Events & Festivals"
      heroImage={IMG}
      intro="Time your trip around a festival and Bangkok goes up another gear. The Thai calendar delivers some of Asia's most spectacular celebrations — the drenching city-wide water fights of Songkran, the candlelit floats of Loy Krathong, red-and-gold Chinese New Year in Chinatown, a nine-day vegan feast and a fireworks-filled New Year countdown. Here's what's on through the year and how to join in."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Bangkok's festivals through the year" items={EVENTS} />
    </CityGuideShell>
  );
}
