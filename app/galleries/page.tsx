"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { motion, AnimatePresence, useInView } from "framer-motion"

export default function GalleriesPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  const galleryItems = [
    { id: 1, title: "Blue Lagoon Mocktail", src: "/galleries/item1.jpg" },
    { id: 2, title: "Iced Coffee Trio", src: "/galleries/item2.jpg" },
    { id: 3, title: "Creamy Milkshakes", src: "/galleries/item3.jpg" },
    { id: 4, title: "Seafood Fried Rice", src: "/galleries/item4.jpg" },
    { id: 5, title: "Beef Bulgogi Bowl", src: "/galleries/item5.jpg" },
    { id: 6, title: "Classic Veg Fried Rice", src: "/galleries/item6.jpg" },
    { id: 7, title: "Spicy Egg Rice Bowl", src: "/galleries/item7.jpg" },
    { id: 8, title: "Chicken Fried Rice", src: "/galleries/item8.jpg" },
    { id: 9, title: "Minced Lamb Curry", src: "/galleries/item9.jpg" },
    { id: 10, title: "Korean Fried Wings", src: "/galleries/item10.jpg" },
    { id: 11, title: "Spicy Octopus Stir-Fry", src: "/galleries/item11.jpg" },
    { id: 12, title: "Smoky Beef Stir-Fry", src: "/galleries/item12.jpg" },
    { id: 13, title: "Garlic Fried Rice", src: "/galleries/item13.jpg" },
    { id: 14, title: "Tempura Platter", src: "/galleries/item14.jpg" },
    { id: 15, title: "Crispy Mushroom Tempura", src: "/galleries/item15.jpg" },
    { id: 16, title: "Korean BBQ Hotpot", src: "/galleries/item16.jpg" },
    { id: 17, title: "Spicy Tofu Steak", src: "/galleries/item17.jpg" },
    { id: 18, title: "Steamed Dumplings", src: "/galleries/item18.jpg" },
  ];
   

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background gradient effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1.5 }}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10" ref={sectionRef}>
        <motion.h1 
          className="text-5xl md:text-6xl font-medium mb-4 text-center text-custom-red-500 font-googly"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          OUR GALLERIES
        </motion.h1>
        
        <motion.div 
          className="h-1 w-24 bg-custom-red-500 mx-auto rounded-full mb-12"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        />

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="group relative overflow-hidden rounded-lg border border-gray-800 cursor-pointer shadow-lg"
              onClick={() => setSelectedImageIndex(index)}
              variants={itemVariants}
              custom={index}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(255, 59, 59, 0.2), 0 10px 10px -5px rgba(255, 59, 59, 0.1)"
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.h3 
                  className="text-white text-xl font-semibold font-googly px-4 text-center"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.title}
                </motion.h3>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div 
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="relative max-w-4xl w-full px-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Image
                  src={galleryItems[selectedImageIndex].src}
                  alt={galleryItems[selectedImageIndex].title}
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain rounded-lg shadow-2xl"
                />
              </motion.div>

              <motion.button
                className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-custom-red-500/80 p-3 rounded-full hover:bg-custom-red-600 transition-colors"
                onClick={handlePrevious}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </motion.button>
              
              <motion.button
                className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-custom-red-500/80 p-3 rounded-full hover:bg-custom-red-600 transition-colors"
                onClick={handleNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </motion.button>

              <motion.h3 
                className="text-center text-2xl font-semibold text-white mt-6 font-googly"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {galleryItems[selectedImageIndex].title}
              </motion.h3>

              <motion.button
                onClick={() => setSelectedImageIndex(null)}
                className="absolute top-4 right-4 text-white bg-custom-red-500/80 p-2 rounded-full hover:bg-custom-red-600 transition-colors"
                aria-label="Close"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-6 w-6" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}