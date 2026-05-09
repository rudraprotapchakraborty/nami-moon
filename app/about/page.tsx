"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

const gridImages = [
  { src: "/galleries/item1.jpg",  alt: "Blue Lagoon Mocktail" },
  { src: "/galleries/item5.jpg",  alt: "Beef Bulgogi Bowl" },
  { src: "/galleries/item9.jpg",  alt: "Minced Lamb Curry" },
  { src: "/galleries/item14.jpg", alt: "Tempura Platter" },
  { src: "/galleries/item11.jpg", alt: "Octopus Stir-Fry" },
  { src: "/galleries/item18.jpg", alt: "Steamed Dumplings" },
];

const principles = [
  { n: "01", title: "Source weekly", body: "Markets first, menus second. We design around what arrives." },
  { n: "02", title: "Plate quietly",  body: "Restraint over flourish. Composition over volume." },
  { n: "03", title: "Honor the recipe", body: "Tradition isn't a constraint — it's the foundation we build on." },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div className="bg-ink min-h-screen text-ivory">
      {/* Header */}
      <section className="relative pt-36 md:pt-44 pb-16 noise border-b border-hairline">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-8">
                <span className="eyebrow">N° 05 · Our Story</span>
                <span className="block h-px w-16 bg-gold/50" />
              </div>
              <h1 className="display-xl text-ivory text-balance">
                Catching the{" "}
                <span className="italic font-light text-gold">culinary</span>{" "}
                dream.
              </h1>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 self-end">
              <p className="text-ivory-muted text-base leading-relaxed">
                Inspired by the rhythm of the tides and the quiet of the moon,
                Nami Moon is a celebration of Pan-Asian cuisine — bold,
                authentic, and crafted with intention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero image with parallax */}
      <div ref={heroRef} className="relative h-[60vh] md:h-[80vh] overflow-hidden bg-ink-3">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src="/about.jpg"
            alt="Inside Nami Moon"
            fill
            priority
            className="object-cover scale-110"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 px-6 lg:px-10 pb-10 lg:pb-14">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex items-center gap-4 text-[10px] tracking-[0.32em] uppercase text-ivory">
              <span className="block h-px w-10 bg-gold" />
              <span>Dhanmondi · Dhaka · Established 2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* Manifesto */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20"
          >
            <div className="lg:col-span-5">
              <span className="eyebrow">Manifesto</span>
              <h2 className="display-lg mt-6 text-ivory text-balance">
                Tradition,{" "}
                <span className="italic font-light text-gold">served quietly.</span>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 space-y-8 text-ivory-dim text-lg leading-relaxed font-light">
              <p>
                At Nami Moon, we bring the soul of Asia&apos;s vibrant flavors to
                your table. From the sizzling woks of Bangkok to the delicate
                artistry of Japanese sushi, the spice-laden curries of India to
                the comforting broths of Korea, our menu is a journey across
                Asia&apos;s diverse culinary landscapes.
              </p>
              <p>
                We honor tradition while embracing innovation, using the
                freshest ingredients to create dishes that are both nostalgic
                and exciting.
              </p>
              <p className="font-display text-2xl italic text-ivory">
                Step into our space, where warm hospitality meets an atmosphere
                as dynamic as the flavors we serve.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-24 md:py-32 bg-ink-2 noise border-y border-hairline">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex items-center gap-4 mb-16">
            <span className="eyebrow">Three Principles</span>
            <span className="rule-gold" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-hairline-strong">
            {principles.map((p) => (
              <motion.div
                key={p.n}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="bg-ink-2 p-10 md:p-12 group"
              >
                <div className="font-display text-5xl md:text-6xl text-gold leading-none">
                  {p.n}
                </div>
                <h3 className="mt-8 font-display text-3xl text-ivory">{p.title}</h3>
                <p className="mt-5 text-ivory-muted text-base leading-relaxed">
                  {p.body}
                </p>
                <div className="mt-10 h-px w-12 bg-gold/40 transition-all duration-500 group-hover:w-24" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* QR + visit */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <motion.div
              variants={fade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="lg:col-span-5"
            >
              <div className="relative inline-block">
                <div className="bg-ivory p-6 shadow-soft">
                  <div className="relative w-44 h-44">
                    <Image src="/qr-code.png" alt="Nami Moon QR Code" fill className="object-contain" />
                  </div>
                </div>
                <div className="absolute -bottom-3 -right-3 bg-gold text-ink px-4 py-1.5 text-[10px] tracking-[0.32em] uppercase font-medium">
                  Scan
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={fade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="lg:col-span-6 lg:col-start-7"
            >
              <span className="eyebrow">Visit Us</span>
              <h3 className="display-md mt-5 text-ivory text-balance">
                Take the flavors of Asia somewhere{" "}
                <span className="italic font-light text-gold">special.</span>
              </h3>
              <p className="mt-6 text-ivory-muted text-base leading-relaxed max-w-md">
                Scan the code to find us, view our menu, or book a table. We're
                open daily for lunch and dinner.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/booking"
                  className="inline-flex items-center gap-4 bg-gold text-ink px-8 py-4 text-[11px] tracking-[0.32em] uppercase font-medium hover:bg-ivory transition-colors"
                >
                  Reserve a Table <Arrow />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 text-ivory text-[11px] tracking-[0.32em] uppercase border-b border-hairline-strong hover:border-gold pb-2 transition-colors"
                >
                  Contact Us <Arrow />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image grid */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex items-center gap-4 mb-12">
            <span className="eyebrow">From the Kitchen</span>
            <span className="rule-gold" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {gridImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.06, ease }}
                className="relative aspect-square overflow-hidden bg-ink-3 group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-5 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="font-display text-lg text-ivory">{img.alt}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square">
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  );
}
