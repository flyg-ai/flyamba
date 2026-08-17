import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AirlineCalendarView } from "@/app/components/AirlineCalendarView";
import { AIRLINE_BY_SLUG } from "@/app/lib/low-fare";
import { SITE } from "@/app/lib/destination-helpers";

const airline = AIRLINE_BY_SLUG.get("british-airways");

export const metadata: Metadata = {
  title: "British Airways Low Fare Calendar — Cheapest Dates",
  description:
    "Find the cheapest days to fly British Airways. Compare fares day by day and book when prices are lowest.",
  alternates: { canonical: `${SITE}/british-airways/low-fare-calendar` },
  openGraph: {
    title: "British Airways Low Fare Calendar — Cheapest Dates",
    description: "Find the cheapest days to fly British Airways. Compare fares day by day and book when prices are lowest.",
    url: `${SITE}/british-airways/low-fare-calendar`,
    type: "website",
  },
};

export default function BritishAirwaysLowFareCalendar() {
  if (!airline) notFound();
  return <AirlineCalendarView airline={airline} />;
}
