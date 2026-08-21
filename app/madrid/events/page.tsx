import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/madrid-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Madrid Events 2026 — Festivals & What's On Calendar",
  description:
    "Madrid's festivals and events through the year — New Year's Eve grapes at Puerta del Sol, the Three Kings parade, Christmas lights on Gran Vía, Semana…",
  alternates: { canonical: `${SITE}/madrid/events` },
  openGraph: { title: "Madrid Events & Festivals | Flyamba", description: "What's on in Madrid through the year, season by season.", type: "article" },
};

const IMG = "/images/madrid/attractions/plaza-mayor.webp";

const INFO: BcnPlace[] = [
  {
    name: "Christmas lights & festive season", slug: "christmas", image: IMG, rating: 5, area: "Late Nov–early Jan",
    tip: "The Gran Vía Christmas lights switch on around 25 November — walk the boulevard after dark, and browse the festive stalls on Plaza Mayor.",
    filterKeys: [],
    description: "From late November, Madrid dresses up for Christmas with lights along Gran Vía and festive markets on the central squares.",
    practicalInfo: { openingHours: "Late Nov to early January", price: "Free to enjoy the lights and browse the markets", howToGetThere: "Metro L1/L5 to Gran Vía; L1/L2/L3 to Sol for Plaza Mayor" },
    fullDescription: "Madrid does Christmas beautifully, and the festive season is one of the most atmospheric times to visit. From around 25 November the city switches on its Christmas lights, and Gran Vía becomes a glittering spectacle after dark, its early-twentieth-century architecture strung with illuminations that draw crowds strolling the boulevard every evening. The central squares fill with festive markets and stalls — Plaza Mayor hosts a traditional Christmas market selling decorations, nativity figures and seasonal treats — while shop windows and streets across the centre join in the sparkle. It's a mild, sunny time by day and cold at night, perfect for wrapping up warm and wandering the lit-up streets with a hot chocolate. The festive mood builds through December toward the great New Year's Eve celebration at Puerta del Sol, and the season stretches on into early January for the Three Kings. Because the lights, markets and window displays are free to enjoy, it's a wonderful, low-cost way to experience the city, though hotels can be busier over the holidays. For festive atmosphere without the deep chill of northern Europe, Madrid at Christmas is a delight — start with an evening walk down a glowing Gran Vía.",
  },
  {
    name: "New Year's Eve — las doce uvas", slug: "new-year", image: IMG, rating: 5, area: "31 December",
    tip: "Join the crowd at Puerta del Sol and eat twelve grapes with the twelve chimes of the Casa de Correos clock — the tradition the whole country follows on live TV.",
    filterKeys: [],
    description: "Madrid's Puerta del Sol is the stage for Spain's national New Year's Eve tradition of eating twelve grapes with the twelve midnight chimes.",
    practicalInfo: { openingHours: "Night of 31 December", price: "Free to join the crowd at Puerta del Sol", howToGetThere: "Metro L1/L2/L3 to Sol (expect closures near midnight)" },
    fullDescription: "Nowhere in Spain is New Year's Eve more iconic than Madrid's Puerta del Sol, the very square from which the country's most famous tradition is broadcast live. As midnight approaches on 31 December, thousands gather beneath the clock on the Casa de Correos for 'las doce uvas' — the twelve grapes — the ritual in which Spaniards eat one grape on each of the clock's twelve chimes to bring good luck for the year ahead. The whole of Spain watches the chimes ring out from this square on television, making Sol the symbolic heart of the nation's celebration, and being there in person amid the packed, jubilant crowd is an unforgettable experience. The square, home to Kilómetro Cero and the bear-and-strawberry-tree statue, was pedestrianised in a 2024 renovation, and the atmosphere on the night is electric. If the crush of Sol isn't for you, the tradition is happily repeated in bars, restaurants and homes across the city, where locals keep their twelve grapes ready for the countdown. Dress warmly for the cold night, arrive early if you want a spot near the clock, and join in the grapes — it's the quintessential Madrid way to see in the New Year.",
  },
  {
    name: "Three Kings parade (Cabalgata de Reyes)", slug: "three-kings", image: IMG, rating: 5, area: "5 January",
    tip: "The spectacular Three Kings parade on 5 January is the climax of the Spanish Christmas — more important than Christmas Day for gift-giving.",
    filterKeys: [],
    description: "On 5 January the spectacular Cabalgata de Reyes parade winds through Madrid on the eve of the Epiphany, the highlight of the Spanish festive season.",
    practicalInfo: { openingHours: "Evening of 5 January", price: "Free to watch along the route", howToGetThere: "Route through central Madrid (check the year's itinerary); Metro to Sol/Cibeles" },
    fullDescription: "In Spain the great gift-giving festival is not Christmas Day but the Epiphany on 6 January, when the Three Kings (Los Reyes Magos) are said to bring presents to children — and the eve of it, 5 January, brings one of Madrid's most spectacular events: the Cabalgata de Reyes, the Three Kings parade. On that evening a dazzling procession of floats, performers, music and the three royal magi winds through the centre of the city, showering the watching crowds — above all thrilled children — with sweets thrown from the floats, in a joyful, family-focused spectacle that marks the climax of the long Spanish Christmas season. Families line the route in their thousands, and the atmosphere is warm and magical despite the January cold. It's entirely free to watch, and a wonderful, very local experience for anyone visiting in early January, offering a glimpse of a cherished Spanish tradition that outsiders often don't realise eclipses Christmas Day itself. Check the exact route and timing for the year, arrive early to secure a good viewing spot along the barriers, and bring the kids — catching sweets from the passing Kings is the highlight of the Spanish festive calendar for kids across the country.",
  },
  {
    name: "Semana Santa (Holy Week)", slug: "semana-santa", image: IMG, rating: 5, area: "March/April (Easter)",
    tip: "Holy Week brings solemn religious processions to the streets — atmospheric and free to watch, though mid-range hotel prices can jump.",
    filterKeys: [],
    description: "Easter's Semana Santa fills Madrid's streets with solemn processions, a moving and atmospheric spring tradition.",
    practicalInfo: { openingHours: "Holy Week (dates vary, March or April)", price: "Free to watch; note hotel prices can rise", howToGetThere: "Processions pass through the historic centre; Metro to Sol" },
    fullDescription: "Semana Santa — Holy Week, the week leading up to Easter Sunday — is one of Spain's most important religious traditions, and Madrid marks it with a series of solemn, atmospheric processions through the streets of the historic centre. Brotherhoods carry elaborate religious floats and images, often accompanied by music and robed participants, in a moving spectacle of devotion and pageantry that draws both the faithful and curious onlookers. While Madrid's celebrations are more restrained than the famously dramatic ones of Seville and other Andalusian cities, they are still a powerful and memorable sight, and the processions winding past the city's churches and squares lend the centre a hushed, ceremonial atmosphere quite different from its usual buzz. It's free to watch, and a fascinating window into Spanish culture and Catholic tradition for visitors in town over Easter. One practical note: because Semana Santa is a major holiday period across Spain, with many Spaniards travelling, mid-range hotel prices in Madrid can rise noticeably over the week, so book ahead if your trip coincides with it. The dates move each year with Easter, falling in March or April, so check the calendar — and if you're in town, seek out the processions for an authentic seasonal experience.",
  },
  {
    name: "Summer festivals & the Retiro on Sundays", slug: "summer-festivals", image: IMG, rating: 5, area: "Summer / weekly",
    tip: "The Veranos de la Villa summer festival programmes music and culture (including at Matadero), and Retiro park comes alive on Sunday around noon with live music and puppet shows.",
    filterKeys: [],
    description: "In summer the Veranos de la Villa festival fills the city with culture, while Retiro park hosts free Sunday music and puppet theatre year-round.",
    practicalInfo: { openingHours: "Veranos de la Villa: summer; Retiro Sundays ~noon", price: "Retiro Sunday events free; festival events vary", howToGetThere: "Matadero: Metro L3 to Legazpi; Retiro: Metro L2 to Retiro" },
    fullDescription: "Even in the fierce summer heat, Madrid keeps its cultural calendar alive. The city's flagship summer programme, Veranos de la Villa ('Summers of the City'), fills July and August with music, theatre, dance and film events at venues across Madrid, including the vast Matadero cultural centre in Arganzuela — a former slaughterhouse turned contemporary-arts complex whose leafy riverside setting makes a fine backdrop for warm-evening events. It's a great way to enjoy culture when the days are too hot for heavy sightseeing, with much of the programme geared to balmy Madrid nights. Year-round, but especially lovely in the warmer months, there's a beloved weekly ritual worth timing your visit around: on Sunday around noon, Retiro park comes alive with free live music, pasodoble dancers and puppet theatre near the Palacio de Cristal, as Madrileño families descend for picnics and the whole park hums with life. It's free, joyful and quintessentially local. For culture lovers visiting in summer, check the Veranos de la Villa listings; and whatever the season, a Sunday morning in the Retiro, watching the puppet show and the dancers among the picnicking families, is one of the most authentic and delightful experiences the city offers.",
  },
  {
    name: "Football, El Clásico & Sunday markets", slug: "football-markets", image: IMG, rating: 5, area: "Season / weekly",
    tip: "La Liga runs August–May; catching Real Madrid at the newly renovated Bernabéu — especially El Clásico — is a bucket-list event. On Sundays, El Rastro flea market takes over La Latina.",
    filterKeys: [],
    description: "La Liga football, above all El Clásico at the Bernabéu, is a huge draw, while every Sunday brings the El Rastro flea market and a stamp-and-coin market on Plaza Mayor.",
    practicalInfo: { openingHours: "La Liga Aug–May; El Rastro Sundays 09:00–15:00", price: "Match tickets from ~€50; El Rastro free", howToGetThere: "Bernabéu: Metro L10; El Rastro: Metro L5 to La Latina" },
    fullDescription: "For many visitors, the biggest 'event' in Madrid is football. The Spanish La Liga season runs from August to May, and catching Real Madrid at the newly renovated Santiago Bernabéu — a spectacular 81,044-seat stadium reopened in 2024 with a retractable roof and 360-degree screen — is a bucket-list experience, especially for the fixtures against fierce rivals. The greatest of all is El Clásico against Barcelona, one of the most-watched club matches in the world, when the whole city crackles with anticipation; match tickets start from around €50 and soar for the marquee games, so buy well ahead. Madrid also has a rich weekly rhythm of events that need no ticket. Every Sunday morning the legendary El Rastro flea market — trading since 1740 — takes over the streets of La Latina from 9am to 3pm, followed by the district's famous Sunday tapas-and-vermouth session along Cava Baja. And on Sunday mornings a traditional stamp-and-coin market has set up under the arcades of Plaza Mayor since 1927. Between the drama of La Liga and these free, deeply local weekly gatherings, Madrid offers memorable 'events' almost any weekend of the year — check the football calendar, and keep your Sunday free for El Rastro.",
  },
];


export default function MadridEvents() {
  return (
    <CityGuideShell
      citySlug="madrid"
      cityName="Madrid"
      categories={CATEGORIES}
      active="events"
      crumb="Events"
      h1="Madrid Events & Festivals"
      heroImage={IMG}
      intro="Madrid's calendar runs from the glittering Christmas lights of Gran Vía and the country-defining New Year's Eve grapes at Puerta del Sol to the spectacular Three Kings parade, the solemn processions of Semana Santa, summer culture festivals, La Liga football and the weekly ritual of the El Rastro market. Here's what's on through the year, season by season, so you can time your trip around the city's biggest moments."
      wide
    >
      <CategorySeoSections heading="Madrid events through the year — in detail" items={INFO} />
    </CityGuideShell>
  );
}
