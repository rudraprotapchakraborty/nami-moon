"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const fade = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

export default function MeetOurChefs() {
  return (
    <section className="relative bg-ink py-32 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left text */}
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-5 order-2 lg:order-1"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="eyebrow">N° 04</span>
              <span className="block h-px w-16 bg-gold/50" />
              <span className="eyebrow-ivory">The Kitchen</span>
            </div>

            <h2 className="display-lg text-ivory text-balance mb-10">
              The hands that{" "}
              <span className="italic font-light text-gold">shape</span> every plate.
            </h2>

            <div className="space-y-6 text-ivory-dim text-base leading-relaxed font-light max-w-lg">
              <p>
                Hand-rolled sushi, tempered woks, simmered curries and
                charcoal-grilled meats — each dish is the product of
                decades of training and a fierce commitment to ingredient.
              </p>
              <p className="text-ivory-muted text-sm">
                Our chefs source weekly, plate to order, and refuse to make
                anything they wouldn't serve to family.
              </p>
            </div>

            <Link
              href="/about"
              className="group mt-12 inline-flex items-center gap-4 text-ivory text-[11px] tracking-[0.32em] uppercase border-b border-hairline-strong hover:border-gold pb-2 transition-colors"
            >
              Meet the Team
              <Arrow />
            </Link>
          </motion.div>

          {/* Right image with overlay caption */}
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-7 order-1 lg:order-2"
          >
            <div className="relative">
              {/* Vertical caption rail */}
              <div className="hidden md:flex absolute -left-12 top-0 bottom-0 flex-col items-center justify-between py-6">
                <span className="vertical-rl eyebrow-ivory tracking-[0.5em]">
                  Chapter 04 · The Kitchen
                </span>
                <span className="block w-px h-16 bg-gold/50" />
              </div>

              <div className="relative h-[560px] md:h-[640px] overflow-hidden bg-ink-3 group">
                <Image
                  src="/team.jpg"
                  alt="The Nami Moon kitchen team"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />

                {/* Overlay caption card */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 border-t border-hairline-strong bg-ink/30 backdrop-blur-md">
                  <div className="flex items-end justify-between gap-6">
                    <div>
                      <div className="eyebrow mb-3">A Quiet Excellence</div>
                      <p className="font-display text-xl md:text-2xl text-ivory text-balance max-w-md leading-tight">
                        Decades of technique, distilled into a single pass of the knife.
                      </p>
                    </div>
                    <span className="font-display text-4xl text-gold leading-none">04</span>
                  </div>
                </div>
              </div>
            </div>
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
