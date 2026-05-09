"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink noise"
    >
      {/* Background imagery */}
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <Image
          src="/herobg.gif"
          alt="Nami Moon — Pan-Asian dining"
          fill
          priority
          className="object-cover scale-110"
        />
      </motion.div>

      {/* Layered scrims */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/95" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(10,10,12,0.6)_85%)]" />

      {/* Vertical side rails */}
      <div className="hidden lg:block absolute top-24 bottom-24 left-10 w-px bg-hairline" />
      <div className="hidden lg:block absolute top-24 bottom-24 right-10 w-px bg-hairline" />

      {/* Side meta — vertical text */}
      <div className="hidden lg:flex absolute right-14 top-1/2 -translate-y-1/2 items-center gap-3">
        <span className="vertical-rl eyebrow-ivory tracking-[0.45em]">
          Est. Dhaka · Chapter 01
        </span>
        <span className="block h-24 w-px bg-gold/50" />
      </div>

      {/* Centered editorial content */}
      <motion.div
        style={{ y: titleY, opacity }}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="flex items-center gap-4 mb-10"
        >
          <span className="block h-px w-10 bg-gold" />
          <span className="eyebrow">Pan-Asian Fine Dining</span>
          <span className="block h-px w-10 bg-gold" />
        </motion.div>

        {/* Display */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease }}
          className="display-xl text-ivory text-balance max-w-[18ch]"
        >
          The tide,{" "}
          <span className="italic font-light text-gold">the moon,</span>{" "}
          the table.
        </motion.h1>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease }}
          className="mt-10 max-w-xl text-ivory-dim text-base md:text-lg leading-relaxed font-light"
        >
          A quiet pilgrimage through Tokyo, Bangkok and Seoul —
          rendered three plates at a time, in the heart of Dhaka.
        </motion.p>

        {/* CTA pair */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease }}
          className="mt-14 flex flex-col sm:flex-row items-center gap-6"
        >
          <Link
            href="/booking"
            className="group inline-flex items-center gap-4 bg-gold text-ink px-8 py-4 text-[11px] tracking-[0.32em] uppercase font-medium hover:bg-ivory transition-colors"
          >
            Reserve a Table
            <Arrow />
          </Link>
          <Link
            href="/menu"
            className="group inline-flex items-center gap-4 text-ivory text-[11px] tracking-[0.32em] uppercase font-medium border-b border-hairline-strong hover:border-gold pb-2 transition-colors"
          >
            View the Menu
            <Arrow />
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom meta strip */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.1, ease }}
        className="absolute bottom-8 inset-x-0 z-10 px-6 lg:px-16"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] tracking-[0.32em] uppercase text-ivory-muted">
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-gold/60" />
            <span>Open · Daily · 11:00 — 23:00</span>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <span>Scroll</span>
            <span className="block h-6 w-px bg-gold/60" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square">
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  );
}
