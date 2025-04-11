import type { Metadata } from "next"
import { generateMetadata } from "@/lib/metadata"
import MenuPageClient from "./MenuPageClient"

export const metadata: Metadata = generateMetadata({
  title: "Menu",
  description: "Explore our diverse menu featuring the best of Pan-Asian cuisine, from sushi to curry.",
  path: "/menu",
})

export default function MenuPage() {
  return <MenuPageClient />
}

