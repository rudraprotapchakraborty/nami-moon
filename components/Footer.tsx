import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Youtube } from "lucide-react"

export function Footer() {
  const menuItems = [
    { name: "MENU", href: "/menu" },
    { name: "BLOG", href: "/blog" },
    { name: "GALLERIES", href: "/galleries" },
    { name: "ABOUT US", href: "/about" },
    { name: "CONTACT US", href: "/contact" },
  ]

  return (
    <footer className="bg-gray-900 py-4 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-5 md:flex-row md:justify-between">
          <Link href="/">
            <Image
              src="/placeholder.svg?height=40&width=160"
              alt="Nami Moon Logo"
              width={160}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-custom-red-400 whitespace-nowrap px-1"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex gap-6">
            <a href="https://www.facebook.com/namimoonbd" className="text-gray-300 hover:text-custom-red-400">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="https://www.instagram.com/namimoonpanasian" className="text-gray-300 hover:text-custom-red-400">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="https://www.youtube.com/namimoonbd" className="text-gray-300 hover:text-custom-red-400">
              <Youtube className="h-6 w-6" />
            </a>
          </div>
        </div>
        <div className="text-center text-sm text-gray-400 mt-4">
          Copyright © 2024-{new Date().getFullYear()} NAMI MOON. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}

