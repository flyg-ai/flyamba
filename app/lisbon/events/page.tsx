import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/lisbon-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Lisbon Events & Festivals 2026 — Guide | Flyamba",
  description:
    "The best events and festivals in Lisbon — the Santo António street parties and Festas de Lisboa in June, NOS Alive and Rock in Rio, the Web Summit, food festivals and New Year's Eve fireworks.",
  alternates: { canonical: `${SITE}/lisbon/events` },
  openGraph: { title: "Lisbon Events & Festivals | Flyamba", description: "Festivals and events worth timing a Lisbon trip around.", type: "article" },
};

const EVENTS: BcnPlace[] = [
  {
    name: "Festas de Lisboa & Santo António", slug: "santo-antonio", image: "/images/lisbon/nattliv/bairro-alto.webp",
    rating: 4.8, area: "Alfama, Graça, Mouraria", filterKeys: [],
    tip: "The night of 12–13 June is the peak — head to Alfama for grilled sardines, arraial parties and the marchas populares.",
    description: "Lisbon's biggest and most beloved celebration, filling the old quarters with sardines, music and street parties all June.",
    practicalInfo: { openingHours: "All June; peak night 12–13 June", price: "Free; grilled sardines €1–3, drinks cheap", howToGetThere: "Alfama, Graça, Mouraria and Madragoa; tram 28E or walk" },
    fullDescription: "The Festas de Lisboa are the heart of the city's calendar — a month-long explosion of neighbourhood celebrations throughout June honouring the popular saints, above all Santo António, Lisbon's patron. The whole city, but especially the old quarters of Alfama, Graça, Mouraria and Madragoa, is decked in colourful bunting, paper garlands and pots of basil (manjerico), and fills with arraiais — open-air street parties where locals grill sardines by the thousand over charcoal, pour cheap wine and beer, and dance to music until dawn. The climax comes on the night of 12–13 June (Santo António's eve and feast day, a city holiday): the grand Marchas Populares, a costumed parade competition between the neighbourhoods, processes down Avenida da Liberdade, and Santo António is celebrated as the 'marrying saint' with mass weddings of couples across the city. The smell of grilled sardines is everywhere, the atmosphere is joyous, inclusive and utterly authentic, and it costs almost nothing to join in — just wander into Alfama and follow the crowds, music and food stalls. If you can time your trip for June, and particularly the 12th and 13th, you'll catch Lisbon at its most alive and characterful. Book accommodation well ahead, as the city is busy.",
  },
  {
    name: "NOS Alive", slug: "nos-alive", image: "/images/lisbon/nattliv/lux-frgil.webp",
    rating: 4.6, area: "Passeio Marítimo de Algés", filterKeys: [],
    tip: "One of Europe's best-value big festivals — buy a day ticket for the headliner you want, and take the train to Algés.",
    description: "Lisbon's premier summer music festival, drawing global rock, pop and indie headliners to a riverside site in July.",
    practicalInfo: { openingHours: "Three days in mid-July", price: "Day tickets ~€70+; multi-day passes", howToGetThere: "Passeio Marítimo de Algés, west of the centre; CP train to Algés" },
    fullDescription: "NOS Alive is Lisbon's flagship music festival and one of the most acclaimed in Europe, held over three days each July on the riverside Passeio Marítimo de Algés, just west of the city centre. It has built a reputation for a stellar and eclectic line-up, mixing global rock, indie, pop and electronic headliners — the kind of names that top Glastonbury and Coachella — across multiple stages, along with a strong roster of Portuguese and international support acts. The setting by the Tagus, the warm summer nights, the famously friendly Portuguese crowd and the relatively compact, well-organised site make it a hugely enjoyable experience, and it remains excellent value compared with equivalent festivals elsewhere in Western Europe. Day tickets (around €70 and up) let you cherry-pick the night your favourite act plays, while multi-day passes cover the full programme. It's easy to reach by the frequent CP train to Algés followed by a short walk, avoiding parking hassles. If your visit coincides with mid-July and you love live music, it's well worth building a day or two around — combine festival nights with beach days on the nearby Cascais line and city sightseeing. Tickets for the biggest names sell fast, so book ahead.",
  },
  {
    name: "Rock in Rio Lisboa", slug: "rock-in-rio", image: "/images/lisbon/med-barn/parque-das-naes.webp",
    rating: 4.5, area: "Parque Tejo / Bela Vista", filterKeys: [],
    tip: "Held in even-numbered years — check whether it's on before planning around it, as it alternates with the Rio edition.",
    description: "A giant, family-friendly music festival held in Lisbon in even years, with huge headliners across several days.",
    practicalInfo: { openingHours: "Two weekends in June (even years)", price: "Day pass ~€79", howToGetThere: "Parque Tejo, near Parque das Nações; Metro red line to Oriente/Moscavide" },
    fullDescription: "Rock in Rio Lisboa is the Portuguese edition of the world-famous Brazilian mega-festival, staged in Lisbon in even-numbered years (it alternates with other host cities), usually across two weekends in June. Far more than a rock concert, it's a sprawling 'City of Rock' entertainment complex on the eastern edge of the city, combining several stages of major international and Portuguese headliners — pop, rock, electronic and more — with funfair rides, a zip-line, food courts, bars and family-friendly attractions, so it draws a broad, multi-generational crowd rather than just hardcore music fans. The scale is enormous and the atmosphere festive and welcoming, making it accessible even for those with children or a casual interest in the line-up. Day passes cost around €79 and each day typically features a different headline genre, so you can pick the day that suits your taste. It's held near Parque das Nações and easily reached on the Metro red line to Oriente or Moscavide. Because it only runs every other year, check whether an edition is scheduled before building a trip around it. When it's on, it's one of the biggest events in the country and pairs naturally with exploring the modern Parque das Nações district and its riverside attractions nearby.",
  },
  {
    name: "Web Summit", slug: "web-summit", image: "/images/lisbon/med-barn/parque-das-naes.webp",
    rating: 4.4, area: "Altice Arena, Parque das Nações", filterKeys: [],
    tip: "If you're not attending, note the dates and book early or avoid them — the city sells out and hotel prices spike.",
    description: "One of the world's largest technology conferences, filling Lisbon each November with 70,000+ attendees.",
    practicalInfo: { openingHours: "Three to four days in November", price: "Conference pass (hundreds of €); city busy citywide", howToGetThere: "Altice Arena & FIL, Parque das Nações; Metro red line to Oriente" },
    fullDescription: "The Web Summit is one of the biggest technology conferences on the planet, and since 2016 it has made Lisbon its home, taking over the Altice Arena and the sprawling FIL exhibition halls in Parque das Nações for several days each November. It draws upwards of 70,000 attendees — founders, investors, engineers, journalists and tech leaders from around the world — for a packed programme of talks, product launches, startup pitches and networking, plus a lively fringe of side events, parties and meetups across the city. For those in the tech, startup or business world it's a marquee date and a major reason to visit; for everyone else, its main relevance is practical but important: during Web Summit week Lisbon effectively sells out, with hotel prices spiking dramatically, restaurants busy and accommodation scarce. If you're not attending, it's wise to check the exact dates and either book far in advance or steer your trip around them to avoid the crush and the cost. The conference itself is ticketed with passes running into the hundreds of euros. It's easily reached on the Metro red line to Oriente, and its home in the modern Parque das Nações district keeps the bulk of the crowds concentrated in that riverside quarter rather than the historic centre.",
  },
  {
    name: "Peixe em Lisboa (Food & Wine)", slug: "peixe-em-lisboa", image: "/images/lisbon/restauranger/cervejaria-ramiro.webp",
    rating: 4.5, area: "Terreiro do Paço / Pátio da Galé", filterKeys: [],
    tip: "A great-value way to taste top chefs' cooking — buy tasting tokens and graze across dozens of restaurant stalls.",
    description: "Lisbon's big spring food-and-wine festival, showcasing the city's chefs, seafood and Portuguese wines.",
    practicalInfo: { openingHours: "About 10 days in spring (late March–April)", price: "Entry ticket + tasting tokens", howToGetThere: "Pátio da Galé, Terreiro do Paço; Metro blue line to Terreiro do Paço" },
    fullDescription: "Peixe em Lisboa — literally 'Fish in Lisbon' — is the city's premier gastronomy festival, a roughly ten-day celebration of Portuguese food and wine held each spring (usually late March into April) in a marquee at the Pátio da Galé beside the grand Praça do Comércio. Centred on the seafood and fish that define Lisbon's kitchen, it gathers many of the country's best and most celebrated chefs, who cook at stalls and run demonstrations, tastings and talks, alongside a wide showcase of Portuguese wines, regional produce and artisanal food. Visitors buy an entry ticket and tasting tokens, then graze their way across signature dishes from top restaurants at a fraction of the cost of dining at each — a brilliant, affordable way to sample the upper end of the city's food scene in one place and to discover new chefs and wines. The atmosphere is convivial and food-obsessed rather than stuffy, and the riverside setting is a bonus. For anyone visiting Lisbon in early spring with an interest in food and wine, it's a highlight worth timing a trip around, and it dovetails nicely with the pleasant shoulder-season weather. Check the exact dates each year, as they shift, and consider booking any chef events in advance.",
  },
  {
    name: "Christmas & New Year's Eve", slug: "christmas-new-year", image: "/images/lisbon/sevardheter/praa-do-comrcio.webp",
    rating: 4.5, area: "Praça do Comércio & citywide", filterKeys: [],
    tip: "Ring in the new year with the big free fireworks display over the Tagus at Praça do Comércio.",
    description: "Festive lights, markets and a spectacular riverside New Year's Eve fireworks show light up mild Lisbon winters.",
    practicalInfo: { openingHours: "December to 1 January", price: "Free to enjoy lights, markets & fireworks", howToGetThere: "Praça do Comércio for NYE; lights along the Baixa and Avenida" },
    fullDescription: "Lisbon wears the festive season well. Through December the city centre glitters with Christmas lights strung along the Baixa's streets, Rossio, Chiado and the grand Avenida da Liberdade, and a large illuminated tree and market appear on the riverfront Praça do Comércio, joined by seasonal fairs, nativity scenes and ice rinks around town. The mild winter climate makes strolling the decorated streets, browsing markets and ducking into cosy tascas for roast chestnuts and warming food a real pleasure, and the crowds are far thinner than in summer. The high point is New Year's Eve (Passagem de Ano), when Praça do Comércio hosts a huge, free public countdown party on the banks of the Tagus, complete with live music and a spectacular midnight fireworks display reflected in the river — one of the best free spectacles of the Lisbon year, drawing big, good-natured crowds down to the waterfront. Other vantage points along the river and up at the miradouros also catch the fireworks. Christmas Day itself is quiet, with many places closed as families gather, but the days around it and the New Year celebrations are lively. It's a atmospheric, good-value time to visit for a festive city break — just pack warm layers and an umbrella for the winter weather, and book ahead for the New Year period.",
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Lisbon", item: `${SITE}/lisbon` },
      { "@type": "ListItem", position: 3, name: "Events", item: `${SITE}/lisbon/events` },
    ],
  };
}

export default function LisbonEvents() {
  return (
    <CityGuideShell
      citySlug="lisbon"
      cityName="Lisbon"
      categories={CATEGORIES}
      active="events"
      crumb="Events"
      h1="Lisbon Events & Festivals"
      heroImage="/images/lisbon/nattliv/bairro-alto.webp"
      intro="Lisbon's calendar is full of reasons to time a trip — from the month-long Santo António street parties that fill Alfama with grilled sardines every June, to world-class music festivals like NOS Alive and Rock in Rio, the giant Web Summit tech conference, spring food festivals and a spectacular riverside New Year's Eve. Here are the events and festivals worth planning around, with dates, locations and what to expect at each."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Lisbon events & festivals in detail" items={EVENTS} />
    </CityGuideShell>
  );
}
