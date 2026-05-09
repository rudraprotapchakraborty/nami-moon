"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const fade = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative bg-ink-2 py-32 md:py-40 noise overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          {/* Image — tall portrait */}
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-6"
          >
            <div className="relative h-[600px] md:h-[760px] overflow-hidden bg-ink-3">
              <motion.div style={{ y: imageY }} className="absolute inset-0">
                <Image
                  src="/about.jpg"
                  alt="Inside Nami Moon"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover scale-110"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

              {/* Floating quote card */}
              <div className="absolute bottom-8 left-8 right-8 md:left-12 md:right-12 border border-gold/40 bg-ink-2/85 backdrop-blur-md p-7">
                <span className="eyebrow">Our Story</span>
                <p className="mt-4 font-display text-xl md:text-2xl italic text-ivory leading-snug text-balance">
                  &ldquo;Tradition, served quietly — with the hands of those who learned it firsthand.&rdquo;
                </p>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="eyebrow">N° 05</span>
              <span className="block h-px w-16 bg-gold/50" />
              <span className="eyebrow-ivory">Who We Are</span>
            </div>

            <h2 className="display-lg text-ivory text-balance mb-10">
              From the visionaries who brought a new dimension of{" "}
              <span className="italic font-light text-gold">Pan-Asian</span> dining to Dhaka.
            </h2>

            <div className="space-y-6 text-ivory-dim text-base md:text-lg leading-relaxed font-light max-w-xl">
              <p>
                The journey began with one obsession — authentic Asian flavor —
                and grew into a quiet manifesto: explore the breadth of the
                continent, honor the depth of its traditions, and express both
                with restraint.
              </p>

              <div className="hairline-fade-x my-10" />

              <p className="font-display text-2xl md:text-3xl text-gold italic leading-snug text-balance">
                Tradition meets innovation.
              </p>

              <p>
                Each dish tells a story — a quiet narrative of cultural heritage
                refined through contemporary technique. We craft with precision
                and an unwavering commitment to excellence, plate by plate.
              </p>
            </div>

            <Link
              href="/about"
              className="group mt-12 inline-flex items-center gap-4 border border-gold text-gold px-7 py-4 text-[11px] tracking-[0.32em] uppercase hover:bg-gold hover:text-ink transition-colors w-fit"
            >
              Read Our Story
              <Arrow />
            </Link>
          </motion.div>
        </div>
      </div>
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
