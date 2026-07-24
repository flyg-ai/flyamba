import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/reykjavik-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Reykjavík Events & Festivals 2026 — What's On | Flyamba",
  description:
    "Reykjavík's event calendar — Iceland Airwaves music festival, Culture Night (Menningarnótt), the Winter Lights Festival, National Day, the midnight-sun Secret Solstice and the famous New Year's Eve fireworks — plus the Northern Lights season.",
  alternates: { canonical: `${SITE}/reykjavik/events` },
  openGraph: { title: "Reykjavík Events & Festivals | Flyamba", description: "Airwaves, Culture Night, Winter Lights and NYE fireworks — Reykjavík's event calendar.", type: "article" },
};

const IMG = "/images/destinations/flights-reykjavik.avif";

const INFO: BcnPlace[] = [
  {
    name: "Iceland Airwaves", slug: "iceland-airwaves", image: IMG, rating: 5, area: "Downtown venues",
    tip: "The unofficial 'off-venue' gigs in bars, record shops and cafés are free and often as good as the ticketed shows — grab the app for the schedule.",
    filterKeys: [],
    description: "Iceland's landmark music festival, filling downtown venues with new music each November.",
    practicalInfo: { openingHours: "Several days in early November", price: "Festival wristband; many off-venue gigs free", howToGetThere: "Venues across downtown Reykjavík" },
    fullDescription: "Iceland Airwaves is the country's flagship music festival and one of the best reasons to visit Reykjavík in the off-season. Held over several days in early November, it turns the compact downtown into a citywide stage, with hundreds of acts — Icelandic breakthroughs alongside international names spanning indie, electronic, pop and experimental music — playing intimate venues, concert halls, bars and unexpected spaces. Crucially, alongside the ticketed programme runs a huge 'off-venue' schedule of free shows in record shops, cafés, bookstores and hotel lobbies, so even without a wristband you can catch superb live music all day and night. It has a reputation as a tastemaker festival where careers are launched, and the winter timing — long dark evenings, cosy bars, the chance of Northern Lights — gives it a magical, uniquely Icelandic atmosphere. Buy a festival wristband early for the headline shows (they sell out), download the schedule app to navigate the sprawling line-up, and dress warmly for dashing between venues. It pairs perfectly with a few days exploring the Golden Circle and Blue Lagoon.",
  },
  {
    name: "Culture Night (Menningarnótt)", slug: "culture-night", image: IMG, rating: 5, area: "Citywide",
    tip: "It ends with a huge fireworks display over the harbour — stake out a waterfront spot in advance.",
    filterKeys: [],
    description: "Reykjavík's biggest single day out: a free citywide festival of arts, music and fireworks in August.",
    practicalInfo: { openingHours: "One Saturday in late August", price: "Free", howToGetThere: "Across central Reykjavík" },
    fullDescription: "Menningarnótt, or Culture Night, is Reykjavík's largest annual celebration and one of the highlights of the Icelandic summer. Held on a Saturday in late August (marking the anniversary of the city's founding), it's a free, citywide explosion of culture: galleries, museums and studios throw open their doors, live music fills squares and street corners, residents host art and coffee in their homes and gardens, and the whole city turns out to wander, watch and celebrate from morning until late. A beloved tradition sees locals and visitors alike eating waffles offered by households along the way. The day builds to a spectacular fireworks display over the old harbour after dark, drawing enormous crowds to the waterfront. It coincides with the Reykjavík Marathon earlier in the day, adding to the festive energy. Because everything is free and outdoors, it needs no planning beyond turning up — though for the fireworks finale it's worth claiming a harbour-side vantage point ahead of time. Falling in the pleasant late-summer weather with still-long daylight, it's a wonderful, joyful window into the city's creative community.",
  },
  {
    name: "Winter Lights Festival", slug: "winter-lights", image: IMG, rating: 5, area: "Citywide",
    tip: "Many museums and the city's geothermal pools offer free entry on the festival's 'Pool Night' — a magical way to swim under the winter sky.",
    filterKeys: [],
    description: "A February festival of light installations, museum nights and pool events brightening the dark winter.",
    practicalInfo: { openingHours: "Several days in February", price: "Free / mostly free", howToGetThere: "Across Reykjavík" },
    fullDescription: "The Winter Lights Festival (Vetrarhátíð) is Reykjavík's antidote to the deep, dark days of February — a several-day celebration designed to brighten the long nights and lure people out of their homes. Illuminated art installations and light projections transform landmark buildings and public spaces across the city, while a packed programme of mostly-free events includes 'Museum Night', when galleries and museums stay open late with special activities, and 'Pool Night', when the city's famous geothermal swimming pools host events and often free entry — swimming outdoors in warm water under the winter sky being one of the most quintessentially Icelandic experiences imaginable. It's a warm, community-focused festival that makes the dead of winter a genuinely appealing (and cheaper) time to visit, with the huge bonus that February sits squarely in the Northern Lights season, so clear nights can add an aurora to the illuminations. Most events are free and outdoors or in public venues, so little planning is needed — just pack serious winter clothing, check the programme for the Museum and Pool Night dates, and enjoy the city glowing against the dark.",
  },
  {
    name: "National Day (17 June) & Secret Solstice", slug: "national-day-solstice", image: IMG, rating: 5, area: "Citywide",
    tip: "Around the summer solstice the sun barely sets — use the endless daylight for late-night sightseeing and hikes.",
    filterKeys: [],
    description: "Midsummer brings Iceland's National Day parades and midnight-sun music events.",
    practicalInfo: { openingHours: "17 June (National Day); solstice events around 21 June", price: "National Day free; festival tickets vary", howToGetThere: "Downtown Reykjavík" },
    fullDescription: "Midsummer is a special time in Reykjavík, when the sun barely dips below the horizon and the city makes the most of near-endless daylight. Iceland's National Day on 17 June — commemorating independence from Denmark in 1944 — is celebrated with free parades, brass bands, street performers, speeches, and families out in force in the downtown squares, giving the city a proud, festive holiday atmosphere. Around the same time, the summer solstice (about 21 June) has been marked by midnight-sun music festivals taking advantage of the perpetual light, with concerts running into 'nights' that never truly get dark. Even outside organised events, the midnight sun itself is the real draw: you can hike, sightsee, soak in a geothermal pool or wander the harbour at midnight in broad daylight, an experience that reorders your sense of time. This is peak season, so the city is at its busiest and priciest and accommodation books up well ahead. Bring an eye mask for sleeping, embrace the strange, wonderful daylight, and combine the festivities with day trips into the equally luminous countryside.",
  },
  {
    name: "New Year's Eve fireworks & the Northern Lights season", slug: "nye-northern-lights", image: IMG, rating: 5, area: "Citywide",
    tip: "For New Year, watch from a hilltop like Hallgrímskirkja or Perlan as the entire city sets off fireworks at once — it's unforgettable.",
    filterKeys: [],
    description: "Reykjavík's wild DIY New Year's Eve, plus the aurora season that runs all winter.",
    practicalInfo: { openingHours: "31 December (NYE); aurora ~Sept–April", price: "Free", howToGetThere: "Citywide; aurora best away from light on clear nights" },
    fullDescription: "Two winter phenomena bookend Reykjavík's cold-season calendar. New Year's Eve in the capital is legendary: with no organised central display, residents themselves buy vast quantities of fireworks (sold to fund the volunteer rescue services), and at midnight the entire city erupts into a chaotic, spectacular, all-directions fireworks show unlike anywhere else — best watched from an elevated spot such as the Hallgrímskirkja church, the Perlan viewpoint or a harbour hill, where you can see the whole sky ablaze. Earlier in the evening, community bonfires (brennur) draw neighbourhoods together. Running right through the winter, meanwhile, is the Northern Lights season: from roughly September to April, on clear, dark nights, the aurora can appear even over the city, though you'll see it best on a tour or drive away from the light pollution. Neither is a ticketed 'event' so much as a reason to brave the Icelandic winter — and together with the Winter Lights Festival and Airwaves, they make the dark months a genuinely magical, and often cheaper, time to visit. Pack for serious cold and keep an eye on the aurora forecast.",
  },
];

function jsonLd() {
  return {
    "@type": "BreadcrumbList",
    "@context": "https://schema.org",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Reykjavík", item: `${SITE}/reykjavik` },
      { "@type": "ListItem", position: 3, name: "Events", item: `${SITE}/reykjavik/events` },
    ],
  };
}

export default function ReykjavikEvents() {
  return (
    <CityGuideShell
      citySlug="reykjavik"
      cityName="Reykjavík"
      categories={CATEGORIES}
      active="events"
      crumb="Events"
      h1="Reykjavík Events & Festivals"
      heroImage={IMG}
      intro="Reykjavík's event calendar leans into its extremes of light and dark. Summer brings National Day parades, midnight-sun festivals and the huge free Culture Night; winter answers with Iceland Airwaves, the Winter Lights Festival, the aurora season and one of the world's wildest New Year's Eves. Here's what's on and when — including the natural 'events', the midnight sun and the Northern Lights, that make timing an Iceland trip so rewarding."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Reykjavík's events — in detail" items={INFO} />
    </CityGuideShell>
  );
}
