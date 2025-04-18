'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background GIF */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/herobg.gif"
          alt="Animated Japanese restaurant ambiance"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Centered Text */}
      <div className="absolute inset-0 flex items-center justify-center px-4 z-20">
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
