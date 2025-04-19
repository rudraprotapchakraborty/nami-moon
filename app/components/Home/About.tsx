'use client';

import Image from 'next/image';
import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const AboutSection: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const imageRef = useRef(null);
  
  // Parallax effect for image
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1],
        delay: 0.8
      }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(220, 38, 38, 0.4)",
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: { 
      scale: 0.98,
      boxShadow: "0 5px 15px -5px rgba(220, 38, 38, 0.4)",
      transition: { 
        duration: 0.15,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section 
      className="py-24 bg-black relative overflow-hidden"
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Background gradient with animated particles */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1.5 }}
      />
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-custom-red-500 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -100],
              opacity: [0.3, 0],
              scale: [1, Math.random() * 3 + 1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            className="relative h-[600px] rounded-xl overflow-hidden shadow-2xl"
            variants={imageVariants}
            ref={imageRef}
          >
            <motion.div
              className="h-full w-full"
              style={{ y: imageY }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 1.2 }}
            >
              <Image
                src="/about.jpg"
                alt="Signature dessert presentation"
                fill
                className="object-cover rounded-xl"
                sizes="(max-width: 768px) 100vw, 50vw"
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
          
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <motion.span 
                className="inline-block text-sm uppercase tracking-wider text-custom-red-400 font-medium mb-2 font-googly"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Our Story
              </motion.span>
              <motion.h2 
                className="text-5xl font-medium text-custom-red-500 font-googly"
                variants={itemVariants}
              >
                Who are we?
              </motion.h2>
            </motion.div>
            
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
              
              <motion.div 
                className="h-0.5 w-16 bg-custom-red-500 my-6"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
              
              <motion.h3 
                className="text-2xl text-custom-red-500 font-googly"
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
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <a href="/about" className="inline-block px-8 py-3 bg-custom-red-600 text-white font-medium rounded-full hover:bg-custom-red-700 transition-all duration-300 font-googly">
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