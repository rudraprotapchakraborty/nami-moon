'use client';

import Image from 'next/image';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const PanAsiaSection: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.section 
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="py-20 px-4 bg-black relative overflow-hidden"
    >
      {/* Background gradient effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1.5 }}
      />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div 
            className="grid grid-cols-3 gap-4"
            variants={containerVariants}
          >
            {[1, 2, 3, 4, 5, 6].map((num: number, i: number) => (
              <motion.div 
                key={i} 
                className="aspect-square relative overflow-hidden rounded-lg shadow-lg"
                variants={imageVariants}
                custom={i}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 25px -5px rgba(255, 59, 59, 0.4)",
                  transition: { duration: 0.3 }
                }}
              >
                <Image
                  src={`/heroimg${num}.jpg`}
                  alt={`Culinary creation ${num}`}
                  fill
                  className="object-cover transition-transform duration-500"
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div className="space-y-6" variants={containerVariants}>
            <motion.h2 
              className="text-4xl font-bold text-custom-red-500 font-googly"
              variants={itemVariants}
            >
              No. 1
            </motion.h2>
            
            <motion.p 
              className="text-3xl font-medium text-white font-googly"
              variants={itemVariants}
            >
              Newest Pan Asia Restaurant in Dhaka
            </motion.p>
            
            <motion.div 
              className="h-1 w-20 bg-custom-red-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            />
            
            <motion.p 
              className="text-custom-red-300 text-lg leading-relaxed"
              variants={itemVariants}
            >
              Experience the rich flavors of Pan-Asian cuisine in the heart of Dhaka. Our restaurant offers a
              delightful fusion of Chinese, Thai, Japanese, and Korean dishes, crafted with authentic ingredients and
              bold flavors. Visit us for an unforgettable dining experience!
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <a href="/menu" className="inline-block px-8 py-3 bg-custom-red-600 text-white font-medium rounded-full hover:bg-custom-red-700 transition-colors duration-300 font-googly">
                Explore Our Menu
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default PanAsiaSection;