import type { Metadata } from "next"
import { generateMetadata } from "@/lib/metadata"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = generateMetadata({
  title: "Contact Us",
  description: "Get in touch with Nami Moon for reservations, inquiries, or feedback.",
  path: "/contact",
})

export default function ContactPage() {
  return <ContactPageClient />
}

