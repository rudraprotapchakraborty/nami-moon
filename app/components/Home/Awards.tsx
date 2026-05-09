"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const fade = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

export default function PanAsiaSection() {
  return (
    <section className="relative bg-ink-2 py-32 md:py-40 noise overflow-hidden">
      {/* Decorative gold seal */}
      <div className="hidden lg:block absolute top-20 right-10">
        <Seal />
      </div>

      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Asymmetric image grid */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fade}
            className="lg:col-span-7 grid grid-cols-6 grid-rows-6 gap-3 md:gap-4 h-[520px] md:h-[640px]"
          >
            <Plate src="/heroimg1.jpg" className="col-span-3 row-span-4" />
            <Plate src="/heroimg2.jpg" className="col-span-3 row-span-3 row-start-1 col-start-4" />
            <Plate src="/heroimg3.jpg" className="col-span-2 row-span-2 col-start-4 row-start-4" />
            <Plate src="/heroimg4.jpg" className="col-span-2 row-span-2 col-start-6 row-start-4" />
            <Plate src="/heroimg5.jpg" className="col-span-2 row-span-2 row-start-5" />
            <Plate src="/heroimg6.jpg" className="col-span-4 row-span-2 col-start-3 row-start-6" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fade}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="eyebrow">N° 03</span>
              <span className="block h-px w-16 bg-gold/50" />
              <span className="eyebrow-ivory">Recognition</span>
            </div>

            <h2 className="display-lg text-ivory text-balance mb-10">
              The newest Pan-Asian{" "}
              <span className="italic font-light text-gold">address</span> in Dhaka.
            </h2>

            <div className="space-y-6 text-ivory-dim text-base leading-relaxed font-light max-w-lg">
              <p>
                A composed dialogue between Chinese, Thai, Japanese and Korean
                kitchens — built on authentic ingredients, contemporary
                technique, and a quiet sense of place.
              </p>
              <p className="text-ivory-muted text-sm">
                Featured by local press as one of the most thoughtfully
                considered openings of the season.
              </p>
            </div>

            {/* Stat row */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-hairline">
              <Stat n="04" label="Cuisines" />
              <Stat n="60+" label="Plates" />
              <Stat n="01" label="Address" />
            </div>

            <Link
              href="/menu"
              className="group mt-12 inline-flex items-center gap-4 border border-gold text-gold px-7 py-4 text-[11px] tracking-[0.32em] uppercase hover:bg-gold hover:text-ink transition-colors"
            >
              Explore the Menu
              <Arrow />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Plate({ src, className }: { src: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-ink-3 group ${className}`}>
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 1024px) 50vw, 30vw"
        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-ink/30 mix-blend-multiply" />
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl md:text-4xl text-gold leading-none">{n}</div>
      <div className="mt-2 text-[10px] tracking-[0.3em] uppercase text-ivory-faint">{label}</div>
    </div>
  );
}

function Seal() {
  return (
    <svg
      viewBox="0 0 120 120"
      width="120"
      height="120"
      className="text-gold/40 animate-[spin_60s_linear_infinite]"
    >
      <defs>
        <path
          id="circle"
          d="M 60,60 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
        />
      </defs>
      <text className="text-[10px] tracking-[0.32em] uppercase fill-current font-sans">
        <textPath href="#circle">
          Nami Moon · Pan-Asian · Est. Dhaka · Nami Moon · Est. Dhaka ·
        </textPath>
      </text>
      <circle cx="60" cy="60" r="3" fill="currentColor" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square">
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  );
}
