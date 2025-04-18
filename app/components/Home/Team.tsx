'use client';

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const MeetOurChefs: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="py-20 px-4 bg-gray-900 relative overflow-hidden"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1.2 }}
      />
      
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8">
          <motion.h2 
            className="text-4xl font-medium text-custom-red-500 font-googly"
            variants={textVariants}
            custom={0}
          >
            Meet Our Masterful Chefs – The Heart of Our Kitchen
          </motion.h2>
          
          <motion.p 
            className="text-gray-300 text-lg leading-relaxed"
            variants={textVariants}
            custom={1}
          >
            From hand-rolled sushi and fiery stir-fries to rich curries and perfectly grilled meats, our chefs craft
            each dish with precision and creativity. Their dedication to sourcing the finest ingredients and
            maintaining the highest standards ensures an unforgettable dining experience every time you visit.
          </motion.p>
          
          <motion.div
            variants={textVariants}
            custom={2}
            className="pt-4"
          >
            <motion.a
              href="/menu"
              className="inline-block px-8 py-3 bg-custom-red-600 text-white font-googly rounded-full hover:bg-custom-red-700 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Our Menu
            </motion.a>
          </motion.div>
        </div>
        
        <motion.div 
          className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl"
          variants={imageVariants}
        >
          <motion.div
            className="absolute inset-0 z-10"
            initial={{ background: "linear-gradient(to right, rgba(0,0,0,0.7) 0%, transparent 100%)" }}
            whileHover={{ background: "linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent 100%)" }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1.5 }}
            className="h-full w-full"
          >
            <Image
              src="/team.jpg"
              alt="Our talented chef team"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </motion.div>
          
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <h3 className="text-white text-xl font-googly mb-2">Culinary Excellence</h3>
            <p className="text-gray-300 text-sm">Our team brings together decades of experience from around the world</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default MeetOurChefs;