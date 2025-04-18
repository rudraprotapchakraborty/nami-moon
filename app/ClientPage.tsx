"use client"

import type React from "react"
import { useRef, useCallback, useEffect } from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import HeroSection from "./components/Home/Hero"
import AwardsSection from "./components/Home/Awards"
import TeamSection from "./components/Home/Team"

export default function ClientPage() {
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
      <HeroSection></HeroSection>
      <AwardsSection></AwardsSection>
      <TeamSection></TeamSection>

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

