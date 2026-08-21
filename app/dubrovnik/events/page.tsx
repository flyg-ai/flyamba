import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/dubrovnik-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Dubrovnik Events & Festivals 2026 — Guide | Flyamba",
  description:
    "The best events and festivals in Dubrovnik — the world-famous Summer Festival of open-air theatre and music, the UNESCO-listed Feast of St Blaise, the…",
  alternates: { canonical: `${SITE}/dubrovnik/events` },
  openGraph: { title: "Dubrovnik Events & Festivals | Flyamba", description: "Dubrovnik's key festivals and events through the year, from the Summer Festival to St Blaise, with dates and tips.", type: "article" },
};

const INFO_IMG = "/images/destinations/placeholder.avif";

const EVENTS: BcnPlace[] = [
  {
    name: "Dubrovnik Summer Festival (July–August)", slug: "summer-festival", image: INFO_IMG,
    rating: 4.8, reviewCount: 0, area: "10 July – 25 August",
    tip: "Book tickets early for performances in spectacular settings like Fort Lovrijenac (Hamlet) and the Rector's Palace atrium — the whole Old Town becomes a stage.",
    filterKeys: [],
    description: "Croatia's most prestigious cultural festival, staging 45 days of open-air theatre, opera, ballet and concerts across the Old Town's squares, forts and palaces.",
    practicalInfo: { openingHours: "Annually 10 July – 25 August", price: "Ticket prices vary by performance; some events free", howToGetThere: "Venues throughout the Old Town — Fort Lovrijenac, Rector's Palace, Stradun and more" },
    fullDescription: "The Dubrovnik Summer Festival (Dubrovačke ljetne igre), running annually for 45 days from 10 July to 25 August, is Croatia's oldest and most prestigious cultural event, staged continuously since 1950, and it transforms the entire Old Town into a magnificent open-air stage. Its defining genius is the use of the city's own historic architecture as its venues: Shakespeare's Hamlet is famously performed on the ramparts of Fort Lovrijenac, the cliff fortress standing in for Elsinore; classical concerts fill the Renaissance atrium of the Rector's Palace; ballet and drama unfold on Stradun, in monastery cloisters, on island stages and in ancient courtyards under the stars, so that the setting becomes part of the art. The programme is a rich blend of theatre (in Croatian and, through associated events, English), opera, ballet, classical and contemporary music and dance, featuring leading Croatian and international artists, and the opening ceremony on Stradun on 10 July, with the raising of the Libertas flag and fireworks, is a spectacle in itself. For culture-loving visitors, catching a performance in one of these breathtaking historic settings is an unforgettable highlight of a summer trip, combining world-class art with the romance of the medieval city at night. Tickets for the marquee performances, especially Hamlet at Lovrijenac, sell out well in advance, so book early via the festival's official website; some events and street performances are free. Even if you don't attend a ticketed show, the festival lends the whole city a heightened, celebratory atmosphere throughout the height of summer.",
  },
  {
    name: "Feast of St Blaise (3 February)", slug: "feast-of-st-blaise", image: INFO_IMG,
    rating: 4.7, reviewCount: 0, area: "2–3 February",
    tip: "Dubrovnik's biggest and most authentic celebration, honouring its patron saint since 972 — a UNESCO-listed procession of relics, folk costumes and banners fills the Old Town.",
    filterKeys: [],
    description: "The centuries-old feast of Dubrovnik's patron saint, a UNESCO intangible-heritage celebration of processions, relics, folk costume and civic pride.",
    practicalInfo: { openingHours: "Around 2–3 February each year", price: "Free to watch", howToGetThere: "Ceremonies centre on Stradun, the cathedral and the church of St Blaise in the Old Town" },
    fullDescription: "The Feast of St Blaise (Festa svetog Vlaha) on 3 February is Dubrovnik's most important, ancient and deeply felt celebration, honouring the city's patron saint, who has watched over Dubrovnik since 972, and it offers visitors a rare glimpse of the city's living traditions in the depths of the quiet winter. Recognised by UNESCO as intangible cultural heritage, the feast is a moving blend of religious devotion and civic pride: the festivities begin on 2 February (Candlemas) with the release of white doves and the raising of St Blaise's banner, and culminate on the 3rd with a grand procession through the Old Town, in which the saint's precious relics — including his skull and hands in their gilded reliquaries — are carried through the streets, accompanied by clergy, church dignitaries, and, most colourfully, thousands of participants from Dubrovnik and the surrounding Konavle region in magnificent traditional folk costume, bearing banners and marching to music, with trabakul boats and gun salutes adding to the spectacle. It is a proud, joyful and authentic community event rather than a tourist show, and experiencing it is a wonderful way to see a different, local side of Dubrovnik away from the summer crowds, with the added bonus of low winter prices and empty streets. The ceremonies centre on Stradun, the cathedral and the beautiful Baroque church of St Blaise. It is free to watch, and the atmosphere — the costumes, the music, the sense of a city celebrating a thousand years of its own identity — is genuinely special.",
  },
  {
    name: "Dubrovnik Carnival (Karneval, February)", slug: "carnival", image: INFO_IMG,
    rating: 4.2, reviewCount: 0, area: "February (pre-Lent)",
    tip: "A lively pre-Lenten carnival with masked parades, costumes, music and children's events on Stradun — a colourful, family-friendly reason to visit in winter.",
    filterKeys: [],
    description: "A colourful pre-Lenten carnival of masked parades, costumes and street entertainment, brightening the Old Town in February.",
    practicalInfo: { openingHours: "February, in the run-up to Lent (dates vary yearly)", price: "Free to watch", howToGetThere: "Parades and events along Stradun and around the Old Town" },
    fullDescription: "Following on from the Feast of St Blaise, February in Dubrovnik brings the city's Carnival (Karneval), a lively and colourful pre-Lenten celebration that adds a splash of fun and festivity to the quiet winter calendar. Part of the wider Croatian and Mediterranean carnival tradition marking the period before Lent, Dubrovnik's version sees the Old Town come alive with masked parades, elaborate and often satirical costumes, music, dancing and street entertainment, with Stradun as the natural stage for the processions and revelry. There is a strong family focus, with dedicated children's carnival events, fancy dress and activities that make it especially appealing for those travelling with kids, alongside the more boisterous adult masquerades and parties. Like the St Blaise festivities, it is very much a local community celebration rather than a tourist spectacle, which lends it an authentic, warm-hearted atmosphere, and it offers winter visitors a genuine cultural experience combined with the low prices and uncrowded streets of the off-season. The exact dates shift each year in line with the movable date of Easter and the start of Lent, so it is worth checking the local calendar if you are visiting in February. While it is a smaller and more modest affair than the world-famous carnivals of Venice or Rio, or indeed the larger Croatian carnival in Rijeka, Dubrovnik's Karneval is a charming, cheerful and free event that brightens the winter, showcases local traditions and gives a different, playful flavour of the city. For travellers in Dubrovnik in February, it is a delightful bonus alongside the St Blaise celebrations.",
  },
  {
    name: "Dubrovnik Good Food Festival (Autumn)", slug: "good-food-festival", image: INFO_IMG,
    rating: 4.4, reviewCount: 0, area: "October",
    tip: "A week celebrating Dalmatian cuisine and wine, with tastings, cooking demos, gourmet walks and special menus — a delicious reason to visit in the calm shoulder season.",
    filterKeys: [],
    description: "An autumn gastronomy festival celebrating Dubrovnik and Dalmatian food and wine with tastings, demonstrations and special menus across the city.",
    practicalInfo: { openingHours: "Around October (dates vary yearly)", price: "Many events free; some tastings & dinners ticketed", howToGetThere: "Events at restaurants and venues across the Old Town and wider city" },
    fullDescription: "The Dubrovnik Good Food Festival, held in the autumn (typically October), is a celebration of the rich gastronomy of Dubrovnik and the wider Dalmatian region, and a perfect excuse to visit in the pleasant, uncrowded shoulder season. Organised to showcase the area's culinary heritage and its contemporary food scene, the festival packs several days with a varied programme of food-focused events: cooking demonstrations and masterclasses by local and guest chefs, tastings of regional specialities, wine and olive-oil tastings featuring the celebrated products of the nearby Pelješac peninsula and Konavle, gourmet guided walks through the Old Town, street-food happenings, and special festival menus and offers at participating restaurants that make sampling the city's dining scene more affordable. It highlights the ingredients and dishes that define the local table — fresh Adriatic seafood, Ston oysters, black cuttlefish risotto, Dalmatian pršut and cheeses, robust Plavac Mali red wines and traditional sweets — and often includes events promoting sustainable and seasonal cooking. Coming in October, the festival coincides with some of the best weather and value of the year, when the summer crowds have gone, prices have dropped and the mild, golden autumn days are ideal for combining food experiences with sightseeing. Many events are free or inexpensive, while special dinners and premium tastings are ticketed. For food and wine lovers, it is a wonderful way to dig deeper into Dalmatian cuisine, meet local producers and chefs, and enjoy Dubrovnik's restaurants at their most welcoming and best-value. Check the official programme for dates and bookings when planning an autumn trip.",
  },
  {
    name: "Midsummer Scene Festival (June–July)", slug: "midsummer-scene", image: INFO_IMG,
    rating: 4.5, reviewCount: 0, area: "June–July",
    tip: "English-language theatre — mostly Shakespeare — performed in the atmospheric Fort Lovrijenac, a treat for English-speaking visitors just before the Summer Festival.",
    filterKeys: [],
    description: "An English-language theatre festival, chiefly Shakespeare, staged in the dramatic setting of Fort Lovrijenac in early summer.",
    practicalInfo: { openingHours: "Around June into early July (dates vary yearly)", price: "Tickets vary by performance", howToGetThere: "Performances at Fort Lovrijenac, just outside Pile Gate" },
    fullDescription: "The Midsummer Scene Festival is a wonderful and slightly under-the-radar event for English-speaking visitors, an English-language theatre festival held in early summer (usually June into early July) in one of the most spectacular venues imaginable: Fort Lovrijenac, the dramatic cliff-top fortress just outside Pile Gate that also serves as the Red Keep in Game of Thrones and the stage for the Summer Festival's Hamlet. Founded to bring English-language drama to Dubrovnik, the festival focuses primarily on the works of Shakespeare — fitting, given Lovrijenac's long theatrical association with Hamlet — alongside other plays and productions, performed by professional casts against the extraordinary backdrop of the ancient bastion and the open Adriatic beyond, often as the light fades into a warm summer evening. For English-speaking travellers who might find the largely Croatian-language programme of the main Summer Festival less accessible, Midsummer Scene offers the chance to enjoy high-quality live theatre they can fully follow, in a setting no conventional playhouse could ever match, and it neatly precedes and complements the grand Summer Festival that follows in July. Coming in June, it also coincides with some of the best weather and value of the year, before the peak-summer crowds and prices arrive. The intimate scale, the accessible programming and the sheer romance of watching Shakespeare performed on the ramparts of a medieval fortress above the sea make it a memorable cultural highlight for those visiting in early summer. Tickets are sold for individual performances via the festival, and it is well worth checking the programme and booking ahead if your trip falls in June, as the atmospheric venue has limited capacity.",
  },
  {
    name: "Christmas & Dubrovnik Winter Festival (December–January)", slug: "winter-festival", image: INFO_IMG,
    rating: 4.5, reviewCount: 0, area: "Late Nov – early Jan",
    tip: "The Old Town glows with lights, market stalls, mulled wine and concerts, and New Year is seen in with open-air parties on Stradun — a magical, crowd-free winter break.",
    filterKeys: [],
    description: "A festive winter season of Christmas lights, market stalls, concerts and New Year celebrations that brings warmth to the quiet off-season Old Town.",
    practicalInfo: { openingHours: "Late November to early January", price: "Free to enjoy the lights, market & street events; some concerts ticketed", howToGetThere: "Centred on Stradun and the squares of the Old Town" },
    fullDescription: "From late November through to early January, the Dubrovnik Winter Festival (Dubrovnik Winter Festival / Advent u Dubrovniku) wraps the Old Town in festive cheer, offering a magical and wonderfully uncrowded way to experience the city in the off-season. The polished stone of Stradun and the surrounding squares are strung with Christmas lights and decorations, and wooden market stalls appear selling seasonal food and drink — grilled sausages, fritule (little Croatian doughnuts), roasted chestnuts, local sweets, mulled wine and rakija — alongside crafts and gifts, creating a cosy, convivial atmosphere against the backdrop of the illuminated medieval architecture. The programme typically includes concerts and live music, folklore and dance performances, choirs, children's events and workshops, and festive happenings on the main squares, with the beautiful Baroque churches hosting Christmas services and recitals. The celebrations climax with New Year's Eve, when Stradun becomes the stage for a big open-air party with live music and, at midnight, a countdown and fireworks over the Old Town — a spectacular and atmospheric way to see in the new year. Visiting Dubrovnik in the festive season means embracing the cooler, wetter winter weather and accepting that many boat trips and beach-focused activities are dormant, but the rewards are considerable: the lowest prices of the year, blissfully empty streets, and the chance to enjoy the timeless beauty of the walled city dressed in lights and filled with local festive spirit rather than summer crowds. It is a charming, romantic and increasingly popular alternative to the peak-season trip, perfect for a cultural winter city break with a difference.",
  },
];


export default function DubrovnikEvents() {
  return (
    <CityGuideShell
      citySlug="dubrovnik"
      cityName="Dubrovnik"
      categories={CATEGORIES}
      active="events"
      crumb="Events"
      h1="Dubrovnik Events & Festivals"
      heroImage="/images/dubrovnik/attractions/fort-lovrijenac.webp"
      intro="Dubrovnik's calendar turns on its extraordinary setting — festivals here use the city's own walls, forts and palaces as their stage. The crown jewel is the summer-long festival of open-air theatre, opera and music, but the year also brings the ancient, UNESCO-listed feast of the city's patron saint, a colourful carnival, an autumn food festival, English-language Shakespeare on the ramparts and a glowing winter festive season. Here are the key events worth planning a trip around, with dates and tips."
      wide
    >
      <CategorySeoSections heading="Dubrovnik's festivals and events" items={EVENTS} />
    </CityGuideShell>
  );
}
