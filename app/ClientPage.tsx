"use client"

import type React from "react"
import { useRef, useCallback, useEffect } from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function ClientPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  let isDown = false
  let startX: number
  let scrollLeft: number

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDown = true
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grabbing"
      startX = e.pageX - scrollContainerRef.current.offsetLeft
      scrollLeft = scrollContainerRef.current.scrollLeft
    }
  }

  const handleMouseLeave = () => {
    isDown = false
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab"
    }
  }

  const handleMouseUp = () => {
    isDown = false
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab"
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown) return
    e.preventDefault()
    if (scrollContainerRef.current) {
      const x = e.pageX - scrollContainerRef.current.offsetLeft
      const walk = (x - startX) * 2
      scrollContainerRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      document.documentElement.style.setProperty("--scroll", `${scrollY * 0.1}px`)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg"
            alt="Restaurant interior"
            fill
            className="object-cover"
            style={{ transform: "translateY(var(--scroll))" }}
          />
        </div>
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-medium text-center max-w-3xl leading-tight text-white">
            Revolutionizing Asia with a Modern Culinary Twist
          </h1>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="grid grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-square relative overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt="Culinary creation"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-medium text-custom-red-500">No. 1</h2>
              <p className="text-2xl font-medium text-white">Newest Pan Asia Restaurant in Dhaka</p>
              <p className="text-custom-red-300">
                Experience the rich flavors of Pan-Asian cuisine in the heart of Dhaka. Our restaurant offers a
                delightful fusion of Chinese, Thai, Japanese, and Korean dishes, crafted with authentic ingredients and
                bold flavors. Visit us for an unforgettable dining experience!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-medium text-custom-red-500">
              Meet Our Masterful Chefs – The Heart of Our Kitchen
            </h2>
            <p className="text-gray-300">
              From hand-rolled sushi and fiery stir-fries to rich curries and perfectly grilled meats, our chefs craft
              each dish with precision and creativity. Their dedication to sourcing the finest ingredients and
              maintaining the highest standards ensures an unforgettable dining experience every time you visit.
            </p>
            <div className="flex gap-4 text-custom-red-500">
              <span>01</span>
              <span className="border-t border-custom-red-500 flex-grow mt-3"></span>
              <span>05</span>
            </div>
          </div>
          <div className="relative h-[400px]">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Chef presenting a dish"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="menu" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-medium text-center mb-12 text-custom-red-500">OUR MENU</h2>
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6">
                {courses.map((course, index) => (
                  <div key={index} className="flex-[0_0_280px] md:flex-[0_0_320px] min-w-0">
                    <div className="group relative overflow-hidden rounded-lg cursor-pointer">
                      <div className="relative h-64">
                        <Image
                          src="/placeholder.svg?height=300&width=400"
                          alt={course.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6">
                        <h3 className="text-sm font-bold mb-2 uppercase">{course.name}</h3>
                        <p className="text-gold">{course.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={scrollPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/80 text-white p-2 rounded-full hover:bg-black transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/80 text-white p-2 rounded-full hover:bg-black transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[600px] rounded-lg overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sFKDtKOBNLoZYEcILmAKTdpuHAkouF.png"
                alt="Signature dessert presentation"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl font-medium text-amber-300">Who are we?</h2>
              <div className="space-y-6">
                <h3 className="text-2xl text-gray-200 italic">
                  From the visionaries who brought you a new dimension of Pan-Asian dining in Dhaka
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  The culinary journey that began with our passion for authentic Asian flavors has evolved into
                  something truly extraordinary. Our commitment to excellence drives us to explore the vast expanse of
                  Asian gastronomy, creating innovative dishes that honor tradition while embracing modernity.
                </p>
                <h3 className="text-2xl text-amber-300 mt-8">Tradition meets Innovation</h3>
                <p className="text-gray-300 leading-relaxed">
                  At Nami Moon, we believe that true culinary artistry lies in respecting traditional recipes while
                  daring to innovate. Each dish tells a story - a narrative of cultural heritage enhanced by
                  contemporary techniques and presentations. Our chefs masterfully blend time-honored cooking methods
                  with modern culinary innovations to create dishes that are both familiar and excitingly new.
                </p>
                <p className="text-gray-300 leading-relaxed italic">
                  We craft each dish with precision, creativity, and an unwavering commitment to excellence, ensuring
                  every plate that leaves our kitchen is nothing short of extraordinary.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const courses = [
  {
    name: "THE SYMPHONY",
    price: "500 ৳",
  },
  {
    name: "THE EXPERIENCE",
    price: "500 ৳",
  },
  {
    name: "OMAKASE COURSE",
    price: "500 ৳",
  },
  {
    name: "OMAKASE COURSE",
    price: "500 ৳",
  },
  {
    name: "OMAKASE COURSE",
    price: "500 ৳",
  },
  {
    name: "VALENTINE'S DAY",
    price: "500 ৳",
  },
  {
    name: "OMAKASE COURSE",
    price: "500 ৳ (Lunch only)",
  },
  {
    name: "WAGYU OMAKASE COURSE",
    price: "500 ৳",
  },
  {
    name: "WAGYU OMAKASE COURSE",
    price: "500 ৳",
  },
]

