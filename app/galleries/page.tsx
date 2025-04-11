"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
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
    setSelectedImageIndex((prevIndex) =>
      prevIndex !== null ? (prevIndex - 1 + galleryItems.length) % galleryItems.length : null,
    )
  }

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex !== null ? (prevIndex + 1) % galleryItems.length : null))
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl md:text-6xl font-medium mb-12 text-center">OUR GALLERIES</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryItems.map((item, index) => (
          <Dialog
            key={item.id}
            open={selectedImageIndex === index}
            onOpenChange={(open) => !open && setSelectedImageIndex(null)}
          >
            <DialogTrigger asChild>
              <div
                className="group relative overflow-hidden rounded-lg cursor-pointer"
                onClick={() => setSelectedImageIndex(index)}
              >
                <Image
                  src={item.src || "/placeholder.svg"}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white text-xl font-semibold">{item.title}</h3>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              {selectedImageIndex !== null && (
                <>
                  <div className="relative">
                    <Image
                      src={galleryItems[selectedImageIndex].src || "/placeholder.svg"}
                      alt={galleryItems[selectedImageIndex].title}
                      width={800}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                    <Button
                      className="absolute left-2 top-1/2 transform -translate-y-1/2"
                      onClick={handlePrevious}
                      variant="ghost"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={handleNext}
                      variant="ghost"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </div>
                  <h3 className="text-xl font-semibold mt-4">{galleryItems[selectedImageIndex].title}</h3>
                </>
              )}
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  )
}

