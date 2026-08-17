import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AirlineCalendarView } from "@/app/components/AirlineCalendarView";
import { AIRLINE_BY_SLUG } from "@/app/lib/low-fare";
import { SITE } from "@/app/lib/destination-helpers";

const airline = AIRLINE_BY_SLUG.get("ryanair");

export const metadata: Metadata = {
  title: "Ryanair Low Fare Calendar — Cheapest Dates",
  description:
    "Find the cheapest days to fly Ryanair. Compare fares day by day and book when prices are lowest.",
  alternates: { canonical: `${SITE}/ryanair/low-fare-calendar` },
  openGraph: {
    title: "Ryanair Low Fare Calendar — Cheapest Dates",
    description: "Find the cheapest days to fly Ryanair. Compare fares day by day and book when prices are lowest.",
    url: `${SITE}/ryanair/low-fare-calendar`,
    type: "website",
  },
};

export default function RyanairLowFareCalendar() {
  if (!airline) notFound();
  return <AirlineCalendarView airline={airline} />;
}
