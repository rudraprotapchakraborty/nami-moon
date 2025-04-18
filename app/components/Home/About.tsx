'use client';

import Image from 'next/image';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const AboutSection: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <motion.section 
      className="py-20 bg-black relative overflow-hidden"
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1.2 }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="relative h-[600px] rounded-lg overflow-hidden shadow-2xl"
            variants={imageVariants}
          >
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.5 }}
              className="h-full w-full"
            >
              <Image
                src="/about.jpg"
                alt="Signature dessert presentation"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
            
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>
          
          <div className="space-y-8">
            <motion.h2 
              className="text-4xl font-medium text-custom-red-500 font-googly"
              variants={itemVariants}
            >
              Who are we?
            </motion.h2>
            
            <div className="space-y-6">
              <motion.h3 
                className="text-2xl text-white italic font-googly"
                variants={itemVariants}
              >
                From the visionaries who brought you a new dimension of Pan-Asian dining in Dhaka
              </motion.h3>
              
              <motion.p 
                className="text-gray-300 leading-relaxed"
                variants={itemVariants}
              >
                The culinary journey that began with our passion for authentic Asian flavors has evolved into
                something truly extraordinary. Our commitment to excellence drives us to explore the vast expanse of
                Asian gastronomy, creating innovative dishes that honor tradition while embracing modernity.
              </motion.p>
              
              <motion.h3 
                className="text-2xl text-custom-red-500 mt-8 font-googly"
                variants={itemVariants}
              >
                Tradition meets Innovation
              </motion.h3>
              
              <motion.p 
                className="text-gray-300 leading-relaxed"
                variants={itemVariants}
              >
                At Nami Moon, we believe that true culinary artistry lies in respecting traditional recipes while
                daring to innovate. Each dish tells a story - a narrative of cultural heritage enhanced by
                contemporary techniques and presentations. Our chefs masterfully blend time-honored cooking methods
                with modern culinary innovations to create dishes that are both familiar and excitingly new.
              </motion.p>
              
              <motion.p 
                className="text-gray-300 leading-relaxed italic"
                variants={itemVariants}
              >
                We craft each dish with precision, creativity, and an unwavering commitment to excellence, ensuring
                every plate that leaves our kitchen is nothing short of extraordinary.
              </motion.p>
              
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <a href="/about" className="inline-block px-8 py-3 bg-custom-red-600 text-white font-medium rounded-full hover:bg-custom-red-700 transition-colors duration-300 font-googly">
                  Learn More About Us
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;