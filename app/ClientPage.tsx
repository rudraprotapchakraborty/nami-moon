"use client"
import type React from "react"
import HeroSection from "./components/Home/Hero"
import AwardsSection from "./components/Home/Awards"
import TeamSection from "./components/Home/Team"
import MenuSection from "./components/Home/Menu"
import AboutSection from "./components/Home/About"

export default function ClientPage() {
  return (
    <>
      <HeroSection></HeroSection>
      <MenuSection></MenuSection>
      <AwardsSection></AwardsSection>
      <TeamSection></TeamSection>
      <AboutSection></AboutSection>      
    </>
  )
}

