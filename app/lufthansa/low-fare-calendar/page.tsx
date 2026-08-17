import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AirlineCalendarView } from "@/app/components/AirlineCalendarView";
import { AIRLINE_BY_SLUG } from "@/app/lib/low-fare";
import { SITE } from "@/app/lib/destination-helpers";

const airline = AIRLINE_BY_SLUG.get("lufthansa");

export const metadata: Metadata = {
  title: "Lufthansa Low Fare Calendar — Cheapest Dates",
  description:
    "Find the cheapest days to fly Lufthansa. Compare fares day by day and book when prices are lowest.",
  alternates: { canonical: `${SITE}/lufthansa/low-fare-calendar` },
  openGraph: {
    title: "Lufthansa Low Fare Calendar — Cheapest Dates",
    description: "Find the cheapest days to fly Lufthansa. Compare fares day by day and book when prices are lowest.",
    url: `${SITE}/lufthansa/low-fare-calendar`,
    type: "website",
  },
};

export default function LufthansaLowFareCalendar() {
  if (!airline) notFound();
  return <AirlineCalendarView airline={airline} />;
}
