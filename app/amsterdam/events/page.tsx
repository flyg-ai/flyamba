import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/amsterdam-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Amsterdam Events 2026 — Festivals & What's On by Month | Flyamba",
  description:
    "Amsterdam's best events month by month — King's Day, tulip season and Keukenhof, Pride and the Canal Parade, Amsterdam Dance Event, the Light Festival and more, with dates and tips.",
  alternates: { canonical: `${SITE}/amsterdam/events` },
  openGraph: { title: "Amsterdam Events & Festivals | Flyamba", description: "King's Day, Pride, ADE, the Light Festival and the year's best events in Amsterdam.", type: "article" },
};

const IMG = "/images/amsterdam/sevardheter/jordaan-kvarteret.webp";

const INFO: BcnPlace[] = [
  {
    name: "King's Day (Koningsdag) — 27 April", slug: "kings-day", image: IMG, rating: 5, area: "Citywide · Late April",
    tip: "Wear orange, book your hotel months ahead, and explore the free street market (vrijmarkt) early.",
    filterKeys: [],
    description: "The Netherlands' biggest party — a citywide orange-clad street festival for the King's birthday.",
    practicalInfo: { openingHours: "27 April (26 April if the 27th is a Sunday)", price: "Free to join the street party", howToGetThere: "Citywide; the centre, canals and Vondelpark are busiest" },
    fullDescription: "King's Day (Koningsdag), held on 27 April to mark the King's birthday, is the biggest and most exuberant event in the Dutch calendar, and Amsterdam is its epicentre. The entire city turns orange — the national colour — as hundreds of thousands of locals and visitors pour into the streets, canals and parks for a giant, good-natured party. Expect street music and DJ stages, dancing, orange costumes and face paint, boats packed with revellers cramming the canals, and a citywide free market (vrijmarkt) where anyone can lay out a blanket and sell their bric-a-brac, making it the world's largest flea market for a day. The atmosphere is joyful and inclusive but genuinely crowded, so it's not for those who dislike big crowds. If you want to experience it, book accommodation many months in advance (prices spike and rooms vanish), wear something orange to join in, get out early to browse the vrijmarkt before the crush, and expect the party to run from morning well into the night. The evening before, 'King's Night' (Koningsnacht), kicks things off with concerts and club nights. It's a wonderful, only-in-the-Netherlands spectacle — chaotic, colourful and unforgettable.",
  },
  {
    name: "Tulip season & Keukenhof — mid-March to mid-May", slug: "tulip-season", image: IMG, rating: 5, area: "Bulb region · Spring",
    tip: "Peak bloom is usually mid-April — check the Keukenhof bloom updates before you commit to a date.",
    filterKeys: [],
    description: "The Netherlands' iconic tulip season, centred on the Keukenhof gardens and the surrounding bulb fields.",
    practicalInfo: { openingHours: "Keukenhof mid-March to mid-May; peak bloom ~mid-April", price: "Keukenhof entry ~€20; National Tulip Day (Jan) free", howToGetThere: "Keukenhof Express bus from Schiphol/Leiden; bulb fields best by bike or car" },
    fullDescription: "Spring in and around Amsterdam means tulips, and the season is a genuine event in its own right. It kicks off symbolically in mid-January with National Tulip Day, when a huge free picking garden of tens of thousands of tulips is laid out on Dam Square. The main spectacle, though, runs from mid-March to mid-May, when the world-famous Keukenhof gardens near Lisse open for just eight weeks and plant around seven million bulbs into dazzling ribbons of colour, and the surrounding Bollenstreek bulb fields blaze with tulips, daffodils and hyacinths — best explored by rented bike or car for the full effect. Peak bloom is usually around mid-April, though it shifts with the weather each year, so it's worth checking Keukenhof's bloom updates before locking in dates. Keukenhof is enormously popular, so visit on a weekday morning and buy a combined transport-and-entry ticket in advance. Back in the city, the Bloemenmarkt floating flower market sells bulbs to take home year-round (buy certified export packs). For flower lovers, timing a trip to the tulip season delivers one of the most quintessentially Dutch experiences there is — just remember the gardens close entirely outside this narrow window.",
  },
  {
    name: "Amsterdam Pride & Canal Parade — early August", slug: "pride", image: IMG, rating: 5, area: "Citywide · Early August",
    tip: "The Saturday Canal Parade is the highlight — stake out a canal-side or bridge spot well before it starts.",
    filterKeys: [],
    description: "A week-long celebration of LGBTQ+ life crowned by the world-famous boat parade along the canals.",
    practicalInfo: { openingHours: "Late July / early August; Canal Parade on the first Saturday of August", price: "Free to watch; some ticketed events", howToGetThere: "Prinsengracht for the parade; Reguliersdwarsstraat and Westermarkt for street parties" },
    fullDescription: "Amsterdam Pride is one of the world's great LGBTQ+ celebrations and a highlight of the city's summer, running for around a week in late July and early August with parties, street festivals, cultural events, debates and open-air concerts across the city. Its signature and utterly unique centrepiece is the Canal Parade, held on the first Saturday of August: instead of marching through streets, around eighty elaborately decorated boats sail in procession along the Prinsengracht and Amstel, packed with dancers, music and costumes, watched by hundreds of thousands of spectators lining the canal banks, bridges and boats. It's a joyous, colourful, water-borne spectacle unlike any other Pride on earth, reflecting Amsterdam's long history as one of the most open and tolerant cities in the world (the Netherlands was the first country to legalise same-sex marriage). The atmosphere across Pride week is festive and welcoming to all, with the streets around Reguliersdwarsstraat and the Westermarkt at the heart of the party. To catch the Canal Parade, claim a canal-side or bridge vantage point well in advance, as the best spots fill early. Book accommodation ahead, as this is one of the busiest and priciest weeks of the year, and simply enjoy one of Amsterdam's most vibrant events.",
  },
  {
    name: "Amsterdam Dance Event (ADE) — October", slug: "ade", image: IMG, rating: 5, area: "Citywide · Mid-October",
    tip: "Book club tickets and hotels early — for five days the whole city becomes one giant electronic festival.",
    filterKeys: [],
    description: "The world's largest electronic-music festival and conference, filling clubs and venues for five days.",
    practicalInfo: { openingHours: "Five days in mid/late October", price: "Event and club tickets vary; day/festival passes available", howToGetThere: "Venues citywide — Paradiso, the Melkweg, Shelter and dozens more" },
    fullDescription: "Every October, the Amsterdam Dance Event (ADE) transforms the city into the global capital of electronic music for five days and nights — the world's largest festival and conference of its kind. By day it's a serious industry gathering, with conferences, workshops and talks drawing tens of thousands of artists, DJs, producers and professionals; by night it becomes an enormous, city-wide party, with well over a thousand events across hundreds of venues, from the iconic Paradiso, Melkweg and Shelter to warehouses, clubs, boats and pop-up spaces. Every genre of electronic music is represented, from underground techno to mainstream house, and the line-ups feature everyone from breaking talent to the biggest names in the world. For music lovers it's a bucket-list experience, but it means the city is packed and buzzing, so book club tickets (individually or via day and festival passes) and accommodation well in advance, as both sell out and prices climb. Even if you're not a hardcore clubber, the energy across the city during ADE is infectious, with free daytime events, record fairs and pop-ups adding to the atmosphere. If you love electronic music, timing a trip to mid-to-late October puts you at the centre of the scene.",
  },
  {
    name: "Amsterdam Light Festival — late Nov to mid-Jan", slug: "light-festival", image: IMG, rating: 5, area: "Canals · Winter",
    tip: "See it from a warm evening canal cruise — the illuminated artworks are designed to be viewed from the water.",
    filterKeys: [],
    description: "A winter trail of illuminated art installations strung along the canals, best seen by boat.",
    practicalInfo: { openingHours: "Late November to mid-January, nightly", price: "Free to walk the route; cruises from ~€18–25", howToGetThere: "Along the central canals; walking route and dedicated evening cruises" },
    fullDescription: "The Amsterdam Light Festival brightens the darkest weeks of the year, running nightly from late November to mid-January and turning the city's canals into an open-air gallery of light art. Each edition invites international artists and designers to create dozens of illuminated installations and sculptures, which are strung along the water and bridges of the central canal ring, glowing against the winter dark. You can experience it in two ways: on foot, following a walking route (typically around the Plantage and eastern canals) that's free to wander, or — the classic way — from the water on a dedicated evening canal cruise, since many of the artworks are designed to be viewed from a boat gliding beneath them, and doing so from a heated, glass-roofed vessel with a warm drink is a magical way to spend a cold night. It's one of the best reasons to visit in winter, adding colour, romance and a sense of occasion to the off-season, and it pairs naturally with the festive Christmas markets and lights. Book a light-festival cruise in advance for the best evening slots, wrap up warmly if you're walking the route, and enjoy Amsterdam at its most atmospheric. A lovely, family-friendly highlight of the winter calendar.",
  },
  {
    name: "More year-round highlights", slug: "more-events", image: IMG, rating: 5, area: "Various",
    tip: "Check exact dates before you travel — festival timings shift year to year.",
    filterKeys: [],
    description: "From summer canal concerts to museum nights and New Year, the calendar rarely goes quiet.",
    practicalInfo: { openingHours: "Various dates through the year", price: "Varies; many free", howToGetThere: "Venues and locations across the city" },
    fullDescription: "Beyond the headline events, Amsterdam's calendar is busy all year, so it's worth checking what's on when you visit. In summer, the Grachtenfestival (Canal Festival) in August stages classical-music concerts on and around the canals, including free performances, while Vondelpark's open-air theatre runs free shows all season and the city hosts numerous food, film and cultural festivals. Museum Night (Museumnacht), usually in early November, opens dozens of museums late into the evening with special programmes, music and a young, party atmosphere — a fun, different way to experience the collections. The winter holidays bring Christmas markets, ice-skating rinks and festive lights, culminating in a lively (and loud, with fireworks) New Year's Eve celebration across the city. Spring adds Tulip Day and the Amsterdam-wide build-up to King's Day, and there are regular sporting events, art fairs and design weeks throughout the year, such as photography and art fairs that draw international crowds. Because many festivals move dates annually, always confirm the exact timings for the year you're travelling and book ahead for anything ticketed or popular. Whenever you come, there's a good chance something is happening — Amsterdam is a city that loves a celebration, and its events are a great way to see it at its most alive.",
  },
];

function jsonLd() {
  return {
    "@type": "BreadcrumbList",
    "@context": "https://schema.org",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Amsterdam", item: `${SITE}/amsterdam` },
      { "@type": "ListItem", position: 3, name: "Events", item: `${SITE}/amsterdam/events` },
    ],
  };
}

export default function AmsterdamEvents() {
  return (
    <CityGuideShell
      citySlug="amsterdam"
      cityName="Amsterdam"
      categories={CATEGORIES}
      active="events"
      crumb="Events"
      h1="Amsterdam Events & Festivals"
      heroImage={IMG}
      intro="Amsterdam packs a remarkable amount into its calendar, and timing your trip to a festival can make a great visit unforgettable. From the citywide orange chaos of King's Day and the flower-filled tulip season to the boat-borne spectacle of Pride's Canal Parade, the world-beating Amsterdam Dance Event and the winter magic of the Light Festival, here's what's on month by month — with dates, tips and how to make the most of each."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Amsterdam's events calendar — in detail" items={INFO} />
    </CityGuideShell>
  );
}
