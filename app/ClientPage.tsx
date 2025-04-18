"use client"

import type React from "react"
import { useRef, useCallback, useEffect } from "react"
import Image from "next/image"
import HeroSection from "./components/Home/Hero"
import AwardsSection from "./components/Home/Awards"
import TeamSection from "./components/Home/Team"
import MenuSection from "./components/Home/Menu"

export default function ClientPage() {
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
      <MenuSection></MenuSection>
      <AwardsSection></AwardsSection>
      <TeamSection></TeamSection>
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

