"use client";

import HeroSection from "./components/Home/Hero";
import AwardsSection from "./components/Home/Awards";
import TeamSection from "./components/Home/Team";
import MenuSection from "./components/Home/Menu";
import AboutSection from "./components/Home/About";

export default function ClientPage() {
  return (
    <>
      <HeroSection />
      <MenuSection />
      <AwardsSection />
      <TeamSection />
      <AboutSection />
    </>
  );
}
