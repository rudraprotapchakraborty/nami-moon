"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { name: "HOME", href: "/" },
    { name: "MENU", href: "/menu" },
    { name: "BLOG", href: "/blog" },
    { name: "GALLERIES", href: "/galleries" },
    { name: "ABOUT US", href: "/about" },
    { name: "CONTACT US", href: "/contact" },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md shadow-md px-4 py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">
          <Image
            src="/placeholder.svg?height=40&width=160"
            alt="Nami Moon Logo"
            width={160}
            height={40}
            className="h-12 w-auto"
          />
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-300 hover:text-custom-red-400 font-semibold text-base whitespace-nowrap"
            >
              {item.name}
            </Link>
          ))}
          <Link href="/booking">
            <Button className="bg-custom-red-600 hover:bg-custom-red-700 text-white text-base">BOOK NOW</Button>
          </Link>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button className="p-2 text-gray-300 hover:text-custom-red-400 transition-colors duration-200">
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className="w-full h-0.5 bg-current transform transition-all duration-300 origin-left group-hover:rotate-45"></span>
                <span className="w-full h-0.5 bg-current transition-all duration-300 group-hover:opacity-0"></span>
                <span className="w-full h-0.5 bg-current transform transition-all duration-300 origin-left group-hover:-rotate-45"></span>
              </div>
              <span className="sr-only">Toggle menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-gray-900 text-gray-300">
            <div className="flex flex-col gap-4 mt-8">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg hover:text-custom-red-400"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link href="/booking" onClick={() => setIsOpen(false)}>
                <Button className="bg-custom-red-600 hover:bg-custom-red-700 text-white mt-4 w-full">BOOK NOW</Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

