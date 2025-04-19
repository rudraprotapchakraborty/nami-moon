"use client"

import Image from "next/image"
import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"

export default function AboutPage() {
  const pageRef = useRef(null)
  const heroRef = useRef(null)
  const gridRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 })
  const isGridInView = useInView(gridRef, { once: true, amount: 0.1 })
  
  // Parallax effect for hero image
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])
  
  const gridImages = [
    { src: "/galleries/item1.jpg", alt: "Ramen dishes" },
    { src: "/galleries/item2.jpg", alt: "Fresh sashimi selection" },
    { src: "/galleries/item3.jpg", alt: "Yuzu honey drink" },
    { src: "/galleries/item4.jpg", alt: "Premium sushi" },
    { src: "/galleries/item5.jpg", alt: "Yuzu Group logo" },
    { src: "/galleries/item6.jpg", alt: "Premium wagyu beef" },
    { src: "/galleries/item7.jpg", alt: "Shabu set" },
    { src: "/galleries/item8.jpg", alt: "Yuzu beverages" },
    { src: "/galleries/item9.jpg", alt: "Sashimi platter" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  }
  
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  }
  
  const gridItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      ref={pageRef}
    >
      {/* Background gradient effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1.5 }}
      />
      
      <div className="max-w-5xl mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-medium mb-4 text-center text-custom-red-500 font-googly"
            variants={itemVariants}
          >
            ABOUT US
          </motion.h1>
          
          <motion.div 
            className="h-1 w-24 bg-custom-red-500 mx-auto rounded-full mb-16"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />
          
          {/* Hero Image */}
          <motion.div 
            className="relative w-full h-[400px] md:h-[500px] mb-16 rounded-xl overflow-hidden shadow-2xl"
            variants={itemVariants}
            ref={heroRef}
          >
            <motion.div
              style={{ y: heroY }}
              className="absolute inset-0"
            >
              <Image
                src="/about.jpg"
                alt="Nami Moon Interior"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
            
            {/* Decorative elements */}
            <motion.div 
              className="absolute -bottom-2 -left-2 w-24 h-24 border-l-2 border-b-2 border-custom-red-500"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            />
            <motion.div 
              className="absolute -top-2 -right-2 w-24 h-24 border-r-2 border-t-2 border-custom-red-500"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.h2 
            className="text-2xl md:text-4xl font-medium text-center mb-12 font-googly italic text-white"
            variants={itemVariants}
          >
            "Catching the Culinary Dream."
          </motion.h2>

          {/* Description */}
          <motion.div 
            className="max-w-3xl mx-auto space-y-8 text-gray-300 text-center mb-16"
            variants={itemVariants}
          >
            <motion.p 
              className="leading-relaxed text-lg"
              variants={itemVariants}
            >
              At Nami Moon, we bring the soul of Asia&apos;s vibrant flavors to your table. Inspired by the rhythm of the
              tides and the beauty of the moon, our restaurant is a celebration of Pan-Asian cuisine—bold, authentic, and
              crafted with passion.
            </motion.p>
            
            <motion.p 
              className="leading-relaxed text-lg"
              variants={itemVariants}
            >
              From the sizzling woks of Bangkok to the delicate artistry of Japanese sushi, the spice-laden curries of
              India to the comforting broths of Korea, our menu is a journey across Asia&apos;s diverse culinary
              landscapes. We honor tradition while embracing innovation, using the freshest ingredients to create dishes
              that are both nostalgic and exciting.
            </motion.p>
            
            <motion.p 
              className="leading-relaxed text-lg"
              variants={itemVariants}
            >
              Step into our space, where warm hospitality meets an atmosphere as dynamic as the flavors we serve. Whether
              you're here for a quick bite, a family gathering, or a night out with friends, Nami Moon is your gateway to
              an unforgettable dining experience.
            </motion.p>
            
            <motion.p 
              className="leading-relaxed text-lg font-medium text-custom-red-400 italic"
              variants={itemVariants}
            >
              Visit us using the QR code below, and let the flavors of Asia take you somewhere special.
            </motion.p>
          </motion.div>

          {/* QR Code */}
          <motion.div 
            className="flex justify-center mb-20"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-40 h-40 bg-white p-4 rounded-xl shadow-lg shadow-custom-red-500/20 relative">
              <div className="relative w-full h-full">
                <Image
                  src="/qr-code.png"
                  alt="Nami Moon QR Code"
                  fill
                  className="object-contain"
                />
              </div>
              <motion.div 
                className="absolute -inset-1 rounded-xl border border-custom-red-500 opacity-50"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Image Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          ref={gridRef}
          variants={gridVariants}
          initial="hidden"
          animate={isGridInView ? "visible" : "hidden"}
        >
          {gridImages.map((image, index) => (
            <motion.div 
              key={index} 
              className="relative aspect-square rounded-xl overflow-hidden shadow-lg border border-gray-800"
              variants={gridItemVariants}
              custom={index}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(255, 59, 59, 0.2), 0 10px 10px -5px rgba(255, 59, 59, 0.1)",
                borderColor: "rgba(220, 38, 38, 0.5)"
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Image 
                  src={image.src || "/placeholder.svg"} 
                  alt={image.alt} 
                  fill 
                  className="object-cover" 
                />
              </motion.div>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center pb-4"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.p 
                  className="text-white text-center font-googly px-4"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {image.alt}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}