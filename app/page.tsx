import type { Metadata } from "next"
import { generateMetadata } from "@/lib/metadata"
import ClientPage from "./ClientPage"

export const metadata: Metadata = generateMetadata({
  title: "Home",
  description: "Welcome to Nami Moon - Dhaka's premier Pan-Asian dining experience.",
  path: "/",
})

export default function Page() {
  return <ClientPage />
}

