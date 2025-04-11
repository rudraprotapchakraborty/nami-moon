import Image from "next/image"
import type { Metadata } from "next"
import { generateMetadata } from "@/lib/metadata"

export const metadata: Metadata = generateMetadata({
  title: "About Us",
  description: "Learn about Nami Moon's journey, our chefs, and our commitment to authentic Pan-Asian flavors.",
  path: "/about",
})

export default function AboutPage() {
  const gridImages = [
    { src: "/placeholder.svg?height=400&width=400", alt: "Ramen dishes" },
    { src: "/placeholder.svg?height=400&width=400", alt: "Fresh sashimi selection" },
    { src: "/placeholder.svg?height=400&width=400", alt: "Yuzu honey drink" },
    { src: "/placeholder.svg?height=400&width=400", alt: "Premium sushi" },
    { src: "/placeholder.svg?height=400&width=400", alt: "Yuzu Group logo" },
    { src: "/placeholder.svg?height=400&width=400", alt: "Premium wagyu beef" },
    { src: "/placeholder.svg?height=400&width=400", alt: "Shabu set" },
    { src: "/placeholder.svg?height=400&width=400", alt: "Yuzu beverages" },
    { src: "/placeholder.svg?height=400&width=400", alt: "Sashimi platter" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-5xl md:text-6xl font-medium mb-12 text-center">ABOUT US</h1>
        {/* Hero Image */}
        <div className="relative w-full h-[300px] md:h-[400px] mb-12 rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=800&width=1200"
            alt="Yuzu Omakase Interior"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Tagline */}
        <h2 className="text-2xl md:text-4xl font-medium text-center mb-8">"Catching the Culinary Dream."</h2>

        {/* Description */}
        <div className="max-w-3xl mx-auto space-y-6 text-gray-300 text-center mb-12">
          <p>
            At Nami Moon, we bring the soul of Asia&apos;s vibrant flavors to your table. Inspired by the rhythm of the
            tides and the beauty of the moon, our restaurant is a celebration of Pan-Asian cuisine—bold, authentic, and
            crafted with passion.
            <br />
            From the sizzling woks of Bangkok to the delicate artistry of Japanese sushi, the spice-laden curries of
            India to the comforting broths of Korea, our menu is a journey across Asia&apos;s diverse culinary
            landscapes. We honor tradition while embracing innovation, using the freshest ingredients to create dishes
            that are both nostalgic and exciting.
            <br />
            Step into our space, where warm hospitality meets an atmosphere as dynamic as the flavors we serve. Whether
            you're here for a quick bite, a family gathering, or a night out with friends, Nami Moon is your gateway to
            an unforgettable dining experience.
            <br />
            Visit us, and let the flavors of Asia take you somewhere special.
          </p>
        </div>

        {/* QR Code */}
        <div className="flex justify-center mb-16">
          <div className="w-32 h-32 bg-white p-4 rounded-lg">
            <div className="relative w-full h-full">
              <Image
                src="/placeholder.svg?height=96&width=96"
                alt="Yuzu Group QR Code"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {gridImages.map((image, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
              <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

