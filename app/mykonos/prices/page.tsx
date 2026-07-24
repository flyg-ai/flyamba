import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/mykonos-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Mykonos Prices 2026 — Costs, Daily Budget & Money Tips | Flyamba",
  description:
    "What Mykonos really costs — daily budgets, dining and drinks, the notoriously pricey beach clubs, hotels, and transport — plus honest tips for enjoying one of Greece's most expensive islands without overspending.",
  alternates: { canonical: `${SITE}/mykonos/prices` },
  openGraph: { title: "Mykonos Prices & Daily Budget | Flyamba", description: "Daily budgets, beach-club costs, dining and hotels — what Mykonos really costs.", type: "article" },
};

const IMG = "/images/destinations/flights-mykonos.avif";

const INFO: BcnPlace[] = [
  {
    name: "Daily budget — what to expect", slug: "daily-budget", image: IMG, rating: 5, area: "Islandwide",
    tip: "Mykonos is one of Greece's most expensive islands; shift your trip to June or September and prices soften noticeably.",
    filterKeys: [],
    description: "Mykonos is pricey — but flexible. Budgets range from careful mid-range to essentially unlimited.",
    practicalInfo: { openingHours: "—", price: "Careful ~€120–180/day; mid ~€250–400; luxury €600+", howToGetThere: "—" },
    fullDescription: "Mykonos has a well-earned reputation as one of the most expensive islands in Greece, but costs vary enormously with how you travel and, crucially, when. A careful visitor staying in a simple room, eating at tavernas away from the waterfront and skipping the exclusive beach clubs can get by on roughly €120–180 a day; a comfortable mid-range trip with a nice hotel, restaurant dinners and the occasional beach-club day runs closer to €250–400; and the island can absorb essentially unlimited spending at its luxury end, where €600+ a day is easy. The single biggest lever is timing: July and August are peak, when hotels, tables and loungers hit their highest prices, while late May, June and September offer the same island — sun, sea, nightlife — for materially less. The second lever is discipline around the beach clubs and celebrity restaurants, where a single afternoon can cost more than a whole day elsewhere. Decide in advance which splurges matter to you and where you'll economise, and Mykonos is far more manageable than its reputation suggests.",
  },
  {
    name: "Beach clubs & sunbeds", slug: "beach-clubs", image: IMG, rating: 5, area: "Paradise, Super Paradise, Nammos",
    tip: "Public beaches are free; if you want a famous beach-club lounger, reserve ahead and check the minimum spend before committing.",
    filterKeys: [],
    description: "The island's priciest experience — glamorous beach clubs with steep loungers and table minimums.",
    practicalInfo: { openingHours: "Daytime, summer season", price: "Sunbeds ~€30–150+/pair; table minimums €300–1,000+", howToGetThere: "Southern beaches: Paradise, Super Paradise, Psarou, Ornos" },
    fullDescription: "The beach clubs are where Mykonos earns its expensive reputation. At the famous southern spots — Nammos on Psarou, plus the party beaches of Paradise and Super Paradise — a pair of sunbeds with a parasol can run anywhere from about €30 to well over €150 depending on the club and location, while securing a table for bottle service on a busy summer day carries minimum spends that routinely reach €300–1,000 and far beyond at the top venues. Food and drink prices at these clubs are correspondingly steep (cocktails €18–25, lobster and champagne priced accordingly). That said, you do not have to spend a fortune to enjoy Mykonos's beaches: many are free public sand where you can lay a towel, and quieter beaches like Agios Sostis, Fokos and Lia have little or no development and no charge. If a glamorous beach-club day is on your list, pick one, reserve ahead, confirm the minimum spend before you sit down, and balance it with free beach days elsewhere. Budget travellers can absolutely have a wonderful Mykonos beach holiday for nothing more than a towel.",
  },
  {
    name: "Eating & drinking", slug: "food-drink", image: IMG, rating: 5, area: "Chora & villages",
    tip: "Eat one street back from the harbour and in Ano Mera village for authentic tavernas at a fraction of the waterfront price.",
    filterKeys: [],
    description: "From cheap gyros to celebrity restaurants — dining spans a huge price range.",
    practicalInfo: { openingHours: "—", price: "Gyro ~€4–6; taverna meal ~€20–35; fine dining €80–200+", howToGetThere: "Chora, Little Venice, Ano Mera" },
    fullDescription: "Dining in Mykonos spans the full spectrum. At the budget end, a souvlaki or gyro from a hole-in-the-wall costs just €4–6 and a bakery breakfast a few euros more, so it's easy to eat cheaply if you want to. A relaxed meal at a traditional taverna — grilled fish or meat, Greek salad, house wine — typically runs €20–35 per person, and these are found in the back lanes of Chora and especially in the inland village of Ano Mera, well away from the marked-up waterfront. At the top end, Mykonos has a cluster of glamorous, celebrity-magnet restaurants and beach-club dining rooms where a dinner with wine easily reaches €80–200+ a head, particularly for fresh fish sold by the kilo (always check the price before ordering). Cocktails at the fashionable sunset bars of Little Venice run €14–20. The golden rule is location: prices drop sharply just one or two streets back from the harbour and picture-postcard views. Mix a couple of memorable splurges with everyday tavernas and street food, and you'll eat brilliantly without the eye-watering total.",
  },
  {
    name: "Hotels & where to stay", slug: "hotels-cost", image: IMG, rating: 5, area: "Chora, Ornos, Platis Gialos",
    tip: "Prices roughly double in August versus June/September — moving your dates a few weeks is the biggest saving you can make.",
    filterKeys: [],
    description: "Accommodation is Mykonos's biggest cost, and it swings hugely by season.",
    practicalInfo: { openingHours: "—", price: "Rooms from ~€120/night off-peak; €300–800+ in August; luxury far higher", howToGetThere: "Chora (nightlife), Ornos/Platis Gialos (beaches), Ano Mera (budget)" },
    fullDescription: "Accommodation is usually the single largest line in a Mykonos budget, and it's extraordinarily seasonal. In the shoulder months of late May, June and September you can find decent rooms and studios from around €120–180 a night; in the July–August peak the same rooms often double or more, with mid-range hotels commonly €300–500 and boutique and luxury properties running €600–2,000+. Location shapes both price and experience: staying in Chora puts you in the heart of the nightlife and dining but is pricey and can be noisy; the beach areas of Ornos, Platis Gialos and Psarou are convenient for the sand and family-friendly; and the inland village of Ano Mera is the most affordable and authentic base if you're happy to use the bus or a scooter to reach the beaches. Because supply is limited and demand intense, the best-value places sell out months ahead for summer, so book early. The overwhelming message is the same as everything else on Mykonos: your travel dates matter more than any other single choice you make.",
  },
  {
    name: "Getting around & transport costs", slug: "transport-cost", image: IMG, rating: 5, area: "Islandwide",
    tip: "The public buses from Fira... (Chora's two stations) are cheap and reach the main beaches — use them before resorting to pricey taxis.",
    filterKeys: [],
    description: "Buses are cheap; taxis are scarce and dear; quad and car hire adds up in peak season.",
    practicalInfo: { openingHours: "—", price: "Bus ~€2; taxi €15–40; quad/car hire ~€30–90/day (more in Aug)", howToGetThere: "KTEL buses from Chora; taxi rank at Fabrika; rental agencies" },
    fullDescription: "Getting around Mykonos is one area where you can keep costs low. The island's KTEL public buses are cheap — roughly €2 a ride — and run frequently in summer from Chora's two bus stations (Fabrika and the Old Port) to the main beaches (Ornos, Platis Gialos, Paradise, Elia) and to Ano Mera, making them the smart budget choice. Taxis, by contrast, are famously few in number for the demand, so waits can be long and fares add up (typically €15–40 for cross-island trips, more late at night), and pre-booked transfers cost more still. Many visitors hire a quad bike (the classic Mykonos mode) or a small car for freedom to reach the quieter northern beaches; rental runs roughly €30–90 a day depending on the vehicle and season, rising sharply in August, plus fuel and often a young-driver or insurance surcharge. Ride-hailing is limited. For most trips, lean on the cheap buses, use taxis sparingly, and consider a quad or car for just a day or two to explore the more remote coves. It's the easiest place on the island to save money.",
  },
];

function jsonLd() {
  return {
    "@type": "BreadcrumbList",
    "@context": "https://schema.org",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Mykonos", item: `${SITE}/mykonos` },
      { "@type": "ListItem", position: 3, name: "Prices", item: `${SITE}/mykonos/prices` },
    ],
  };
}

export default function MykonosPrices() {
  return (
    <CityGuideShell
      citySlug="mykonos"
      cityName="Mykonos"
      categories={CATEGORIES}
      active="prices"
      crumb="Prices"
      h1="Mykonos Prices & Daily Budget"
      heroImage={IMG}
      intro="Mykonos is one of Greece's most expensive islands — but also one of its most flexible. The same island can be a careful €150-a-day trip or an essentially unlimited one, and the biggest factor by far is when you go. This guide breaks down real costs — daily budgets, the notorious beach clubs, eating and drinking, hotels and transport — with honest tips for enjoying the glamour without the bill spiralling."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="What Mykonos costs — in detail" items={INFO} />
    </CityGuideShell>
  );
}
