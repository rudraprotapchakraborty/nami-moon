"use client"

import { useState } from "react"
import Image from "next/image"

export default function MenuPageClient() {
  const [selectedSection, setSelectedSection] = useState("appetizers")

  const menuSections = [
    { id: "appetizers", name: "Appetizers" },
    { id: "curry", name: "Curry" },
    { id: "rice", name: "Rice" },
    { id: "sushi", name: "Sushi" },
    { id: "ramen", name: "Ramen" },
    { id: "noodles", name: "Noodles" },
    { id: "dessert", name: "Dessert" },
    { id: "drinks", name: "Drinks" },
  ]

  const menuItems = {
    appetizers: [
      { name: "Edamame", price: "250 ৳", image: "/placeholder.svg?height=200&width=300" },
      { name: "Gyoza", price: "350 ৳", image: "/placeholder.svg?height=200&width=300" },
      { name: "Tempura", price: "400 ৳", image: "/placeholder.svg?height=200&width=300" },
      // Add more appetizers...
    ],
    curry: [
      { name: "Green Curry", price: "550 ৳", image: "/placeholder.svg?height=200&width=300" },
      { name: "Red Curry", price: "550 ৳", image: "/placeholder.svg?height=200&width=300" },
      // Add more curry dishes...
    ],
    rice: [
      { name: "Fried Rice", price: "400 ৳", image: "/placeholder.svg?height=200&width=300" },
      { name: "Steamed Rice", price: "150 ৳", image: "/placeholder.svg?height=200&width=300" },
      // Add more rice dishes...
    ],
    sushi: [
      { name: "California Roll", price: "450 ৳", image: "/placeholder.svg?height=200&width=300" },
      { name: "Salmon Nigiri", price: "300 ৳", image: "/placeholder.svg?height=200&width=300" },
      { name: "Tuna Sashimi", price: "500 ৳", image: "/placeholder.svg?height=200&width=300" },
      // Add more sushi and sashimi...
    ],
    ramen: [
      { name: "Tonkotsu Ramen", price: "600 ৳", image: "/placeholder.svg?height=200&width=300" },
      { name: "Miso Ramen", price: "550 ৳", image: "/placeholder.svg?height=200&width=300" },
      // Add more ramen dishes...
    ],
    noodles: [
      { name: "Pad Thai", price: "500 ৳", image: "/placeholder.svg?height=200&width=300" },
      { name: "Yakisoba", price: "450 ৳", image: "/placeholder.svg?height=200&width=300" },
      // Add more noodle dishes...
    ],
    dessert: [
      { name: "Mochi Ice Cream", price: "300 ৳", image: "/placeholder.svg?height=200&width=300" },
      { name: "Green Tea Tiramisu", price: "350 ৳", image: "/placeholder.svg?height=200&width=300" },
      { name: "Mango Sticky Rice", price: "400 ৳", image: "/placeholder.svg?height=200&width=300" },
      // Add more desserts...
    ],
    drinks: [
      { name: "Green Tea", price: "150 ৳", image: "/placeholder.svg?height=200&width=300" },
      { name: "Sake", price: "450 ৳", image: "/placeholder.svg?height=200&width=300" },
      { name: "Lychee Martini", price: "400 ৳", image: "/placeholder.svg?height=200&width=300" },
      // Add more drinks...
    ],
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-5xl md:text-6xl font-medium text-white mb-12 text-center">MENU</h1>

        <div className="grid md:grid-cols-[240px,1fr] gap-8">
          {/* Sidebar Navigation */}
          <div className="space-y-6">
            <nav className="space-y-3">
              {menuSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className={`block text-left w-full ${
                    selectedSection === section.id ? "text-white" : "text-gray-400"
                  } hover:text-white transition-colors`}
                >
                  {section.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <h2 className="text-3xl font-medium text-white mb-6">
              {menuSections.find((section) => section.id === selectedSection)?.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems[selectedSection].map((item, index) => (
                <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <div className="relative h-48">
                    <Image
                      src={item.image || "/placeholder.svg?height=200&width=300"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-white mb-2">{item.name}</h3>
                    <p className="text-custom-red-400 font-bold">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

