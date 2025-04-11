import type { Metadata } from "next"
import { generateMetadata } from "@/lib/metadata"
import BookingPageClient from "./BookingPageClient"

export const metadata: Metadata = generateMetadata({
  title: "Book a Table",
  description: "Reserve your table at Nami Moon for an unforgettable Pan-Asian dining experience.",
  path: "/booking",
})

export default function BookingPage() {
  return <BookingPageClient />
}

