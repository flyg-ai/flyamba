import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES, BALI } from "@/app/data/bali-places";
import { SITE } from "@/app/lib/destination-helpers";
import { clampDescription } from "@/app/lib/seo";
import { usd5 } from "@/app/lib/format";

const usdMonths = BALI.monthlyPrices.map((m) => usd5(m.price));
const MIN_USD = Math.min(...usdMonths);
const MAX_USD = Math.max(...usdMonths);

export const metadata: Metadata = {
  title: "Bali Prices 2026 — Flights, Budget & Daily Costs | Flyamba",
  description: clampDescription(`How much does Bali cost? Flight fares from $${MIN_USD}, plus a full daily-budget breakdown — hotels, food, drinks, transport and attractions — with currency, ATM, tipping and money-saving tips.`),
  alternates: { canonical: `${SITE}/bali/prices` },
  openGraph: { title: "Bali Prices & Budget Guide | Flyamba", description: "Flight fares, daily budgets and the real cost of a trip to Bali.", type: "article" },
};

const IMG = "/images/bali/attractions/tegallalang.webp";

const INFO: BcnPlace[] = [
  {
    name: "Flight prices to Bali", slug: "flight-prices", image: IMG, rating: 5, area: "DPS · round trip",
    tip: "Book about 10–14 weeks ahead and fly Monday or Tuesday for the lowest fares to Denpasar.",
    filterKeys: [],
    description: `Round-trip fares to Bali start from around $${MIN_USD} and peak in July and August.`,
    practicalInfo: { openingHours: "Cheapest: February", price: `From ~$${MIN_USD} round trip; ~$${MAX_USD} in peak season`, howToGetThere: "Best connections via Singapore, Doha or Dubai" },
    fullDescription: `Bali's Ngurah Rai airport (DPS) is a major international gateway, well connected via the big Asian and Gulf hubs, which keeps long-haul fares competitive. As a rough guide in US dollars, round-trip flights start from around $${MIN_USD} in the cheapest months and climb to roughly $${MAX_USD} at the height of the July–August peak season, which coincides with the Australian school holidays. February is typically the cheapest month to fly, with prices then rising through spring toward the mid-year peak before easing again in autumn. There are few truly non-stop options from Europe or the Americas, so most travellers connect through Singapore, Kuala Lumpur, Doha, Dubai or another regional hub — Singapore Airlines via Changi is among the most comfortable routings — while Australia enjoys direct flights. To get the best price, book roughly 10–14 weeks in advance, be flexible with dates, and favour midweek departures, which are usually cheaper than weekends. Set a fare alert and compare across the full-service Asian carriers and the Gulf airlines, and consider a stopover in Singapore or Doha to break the long journey and see another city en route.`,
  },
  {
    name: "Daily budget — what to expect", slug: "daily-budget", image: IMG, rating: 5, area: "Per person / day",
    tip: "Bali is superb value — a comfortable mid-range day runs around $35–70 per person including food, transport and entry fees.",
    filterKeys: [],
    description: "Bali offers excellent value; a mid-range day costs a fraction of what it would in Europe.",
    practicalInfo: { openingHours: "N/A", price: "Mid-range ~$35–70/day; luxury ~$160+/day", howToGetThere: "Budget more for drivers, beach clubs and island day trips" },
    fullDescription: "One of Bali's great appeals is how far your money goes — it's significantly cheaper than most of Europe and even Thailand. A comfortable mid-range day, covering food, local transport and attraction entry fees, runs roughly 600,000–1,200,000 IDR, or about $35–70 per person, while a genuine budget trip staying in guesthouses and eating at warungs can come in well under that. At the other end, a luxury day with fine dining, a private driver, spa treatments and a five-star villa easily tops 2,500,000 IDR ($160) and up. Accommodation spans the full range: hostel dorms from around $10–15, characterful mid-range guesthouses and boutique hotels from $40–70 a night, and world-class luxury villas from $300 upward. The big variables that push a budget up are private drivers for sightseeing, beach-club minimum spends, organised island day trips (Nusa Penida, the Gilis) and temple entry fees. Set a realistic daily figure based on your travel style, keep cash on hand for the many places that don't take cards, and you'll find Bali delivers extraordinary value for the experience it offers.",
  },
  {
    name: "Currency, cash & ATMs", slug: "currency-atms", image: IMG, rating: 5, area: "Islandwide",
    tip: "Use ATMs attached to a bank branch (CIMB, BCA or Mandiri), not standalone booths — card skimming does happen at unattended machines.",
    filterKeys: [],
    description: "Bali runs on Indonesian rupiah and is largely a cash economy outside upmarket hotels.",
    practicalInfo: { openingHours: "ATMs 24h", price: "1 USD ≈ 15,500 IDR; ATM fee ~30,000 IDR; max ~2,500,000/withdrawal", howToGetThere: "ATMs in Ubud, Seminyak, Kuta and Sanur" },
    fullDescription: "The currency is the Indonesian rupiah (IDR, Rp), with roughly 15,500 IDR to the US dollar. Bali is still largely a cash economy: you'll need rupiah everywhere except luxury hotels and higher-end restaurants, from warungs and markets to temple entry, scooter fuel and drivers. ATMs are plentiful in Ubud, Seminyak, Kuta and Sanur, but most charge a withdrawal fee of around 30,000 IDR and cap each withdrawal at about 2,500,000 IDR, so factor that in. For safety, use ATMs that are attached to a bank branch — CIMB, BCA or Mandiri are reliable — rather than freestanding machines in unattended booths, where card skimming has been reported. It's wise to carry a mix of cash and cards, keep small notes handy for warungs, markets, tips and sarong hire, and always choose to be charged in rupiah (not your home currency) if a card machine offers the option, as the on-the-spot conversion rate is invariably poor. Notify your bank you're travelling to avoid blocked cards, and keep your cash split between a couple of places for security.",
  },
  {
    name: "Food & drink prices", slug: "food-drink", image: IMG, rating: 5, area: "Islandwide",
    tip: "Eat where the locals eat — a warung meal costs a fraction of a tourist-restaurant one and is often tastier.",
    filterKeys: [],
    description: "Eating out ranges from a couple of dollars at a warung to fine dining at Western prices.",
    practicalInfo: { openingHours: "N/A", price: "Warung ~30,000–50,000 IDR; restaurant ~100,000–250,000; fine dining ~500,000+", howToGetThere: "Bintang beer ~35,000 IDR (warung) to ~70,000 (beach club)" },
    fullDescription: "Food is where Bali's value really shows. A meal at a local warung — nasi goreng, mie goreng, soto ayam or babi guling — costs just 30,000–50,000 IDR (a couple of dollars), and it's often the tastiest, most authentic eating on the island. Step up to a mid-range tourist restaurant and you're looking at roughly 100,000–250,000 IDR per person, while Bali's excellent fine-dining scene (Locavore, Merah Putih and the like) runs from 500,000 to 1,200,000 IDR and beyond for a full experience — still a bargain against comparable restaurants worldwide. Drinks follow the same pattern: a large Bintang beer is about 35,000 IDR at a warung but around 70,000 IDR at a beach club, and cocktails at the smart Seminyak and Canggu venues are priced closer to Western levels. The trick to eating well cheaply is simply to mix it up: enjoy the occasional splurge, but eat at warungs for everyday meals to keep costs down and get closer to real Balinese and Indonesian cooking. Stick to bottled water and be cautious with ice outside established places to avoid an upset stomach.",
  },
  {
    name: "Tipping & service charge", slug: "tipping", image: IMG, rating: 5, area: "Islandwide",
    tip: "Check the bill at nicer restaurants — many already add a 5–10% service charge, so you needn't tip again on top.",
    filterKeys: [],
    description: "Tipping isn't compulsory but is warmly appreciated for good service.",
    practicalInfo: { openingHours: "N/A", price: "~10% at nicer restaurants; round up at warungs; a few dollars for drivers", howToGetThere: "Tip in rupiah, in cash" },
    fullDescription: "Tipping in Bali isn't obligatory but is genuinely appreciated, and a little goes a long way given local wages. At simple warungs there's no expectation to tip, though rounding up the bill is a kind gesture. At nicer restaurants a tip of around 10% is welcome — but check the bill first, as many mid-range and upscale places already add a 'service charge' of 5–10% (sometimes plus government tax), in which case an extra tip isn't necessary. For other services, a few dollars is a thoughtful thank-you: tip your private driver at the end of a good day's sightseeing, leave something for spa therapists, hotel porters and tour guides, and reward warm service wherever you find it. Always tip in cash and in rupiah rather than foreign currency, which is hard for staff to change. Because Bali runs so much on cash and tipping is a meaningful supplement to local incomes, keeping a supply of small notes for gratuities is worth it. Tip for good service, not out of obligation, and you'll find the island's famous friendliness only grows warmer.",
  },
];


export default function BaliPrices() {
  return (
    <CityGuideShell
      citySlug="bali"
      cityName="Bali"
      categories={CATEGORIES}
      active="prices"
      crumb="Prices"
      h1="Bali Prices & Budget Guide"
      heroImage={IMG}
      intro={`How much does a trip to Bali cost? The short answer is: far less than you might think. Flights start from around $${MIN_USD} round trip, and once you're on the island your money stretches remarkably far. This guide breaks down the real costs — flights, daily budgets, accommodation, food and drink, transport and attractions — plus how to handle currency, cash and ATMs, and when to tip, all with rupiah and US-dollar figures and money-saving tips.`}
      wide
    >
      <CategorySeoSections heading="The cost of visiting Bali — in detail" items={INFO} />
    </CityGuideShell>
  );
}
