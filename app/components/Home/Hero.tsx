'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSection: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    {
      src: "/heroimg1.jpg",
      alt: "Japanese restaurant interior"
    },
    {
      src: "/heroimg2.jpg",
      alt: "Japanese restaurant interior"
    },
    {
      src: "/heroimg3.jpg",
      alt: "Japanese restaurant interior"
    },
    {
      src: "/heroimg4.jpg",
      alt: "Japanese restaurant interior"
    },
    {
      src: "/heroimg5.jpg",
      alt: "Japanese restaurant interior"  
    },
    {
      src: "/heroimg6.jpg",
      alt: "Japanese restaurant interior"  
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image Slider */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentImage].src}
            alt={images[currentImage].alt}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Slider Navigation */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentImage === index ? "bg-white scale-125" : "bg-white/50"
            }`}
            aria-label={`View slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Centered Text */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-medium text-center max-w-3xl mx-auto leading-tight text-white font-googly mb-6">
            Revolutionizing Asia with a Modern Culinary Twist
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Experience the perfect blend of traditional Japanese cuisine with contemporary innovation
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;