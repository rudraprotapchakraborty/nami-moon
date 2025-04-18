"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function GalleriesPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  const galleryItems = [
    { id: 1, title: "Signature Dish 1", src: "/placeholder.svg?height=300&width=400" },
    { id: 2, title: "Signature Dish 2", src: "/placeholder.svg?height=300&width=400" },
    { id: 3, title: "Restaurant Interior", src: "/placeholder.svg?height=300&width=400" },
    { id: 4, title: "Chef at Work", src: "/placeholder.svg?height=300&width=400" },
    { id: 5, title: "Seasonal Special", src: "/placeholder.svg?height=300&width=400" },
    { id: 6, title: "Dessert Platter", src: "/placeholder.svg?height=300&width=400" },
  ]

  const handlePrevious = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + galleryItems.length) % galleryItems.length)
    }
  }

  const handleNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % galleryItems.length)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-5xl md:text-6xl font-medium mb-12 text-center">OUR GALLERIES</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg border border-white/10 cursor-pointer"
              onClick={() => setSelectedImageIndex(index)}
            >
              <Image
                src={item.src}
                alt={item.title}
                width={400}
                height={300}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-xl font-semibold">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative max-w-3xl w-full px-4">
            <Image
              src={galleryItems[selectedImageIndex].src}
              alt={galleryItems[selectedImageIndex].title}
              width={800}
              height={600}
              className="w-full h-auto object-contain rounded"
            />

            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 p-2 rounded-full hover:bg-white/20"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 p-2 rounded-full hover:bg-white/20"
              onClick={handleNext}
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>

            <h3 className="text-center text-xl font-semibold text-white mt-4">
              {galleryItems[selectedImageIndex].title}
            </h3>

            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-4 right-4 text-white text-xl font-bold"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
