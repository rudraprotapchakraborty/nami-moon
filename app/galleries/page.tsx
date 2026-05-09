"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const galleryItems = [
  { id: 1,  title: "Blue Lagoon Mocktail",     src: "/galleries/item1.jpg",  cat: "Drinks" },
  { id: 2,  title: "Iced Coffee Trio",         src: "/galleries/item2.jpg",  cat: "Drinks" },
  { id: 3,  title: "Creamy Milkshakes",        src: "/galleries/item3.jpg",  cat: "Drinks" },
  { id: 4,  title: "Seafood Fried Rice",       src: "/galleries/item4.jpg",  cat: "Rice"   },
  { id: 5,  title: "Beef Bulgogi Bowl",        src: "/galleries/item5.jpg",  cat: "Korean" },
  { id: 6,  title: "Classic Veg Fried Rice",   src: "/galleries/item6.jpg",  cat: "Rice"   },
  { id: 7,  title: "Spicy Egg Rice Bowl",      src: "/galleries/item7.jpg",  cat: "Rice"   },
  { id: 8,  title: "Chicken Fried Rice",       src: "/galleries/item8.jpg",  cat: "Rice"   },
  { id: 9,  title: "Minced Lamb Curry",        src: "/galleries/item9.jpg",  cat: "Curry"  },
  { id: 10, title: "Korean Fried Wings",       src: "/galleries/item10.jpg", cat: "Korean" },
  { id: 11, title: "Spicy Octopus Stir-Fry",   src: "/galleries/item11.jpg", cat: "Wok"    },
  { id: 12, title: "Smoky Beef Stir-Fry",      src: "/galleries/item12.jpg", cat: "Wok"    },
  { id: 13, title: "Garlic Fried Rice",        src: "/galleries/item13.jpg", cat: "Rice"   },
  { id: 14, title: "Tempura Platter",          src: "/galleries/item14.jpg", cat: "Japan"  },
  { id: 15, title: "Crispy Mushroom Tempura",  src: "/galleries/item15.jpg", cat: "Japan"  },
  { id: 16, title: "Korean BBQ Hotpot",        src: "/galleries/item16.jpg", cat: "Korean" },
  { id: 17, title: "Spicy Tofu Steak",         src: "/galleries/item17.jpg", cat: "Wok"    },
  { id: 18, title: "Steamed Dumplings",        src: "/galleries/item18.jpg", cat: "Japan"  },
];

// Bento layout — assigns a span pattern to each card
const spans = [
  "md:col-span-2 md:row-span-2", "md:col-span-1", "md:col-span-1",
  "md:col-span-1", "md:col-span-2 md:row-span-2", "md:col-span-1",
  "md:col-span-1", "md:col-span-1",
  "md:col-span-2", "md:col-span-1", "md:col-span-1",
  "md:col-span-1", "md:col-span-1", "md:col-span-2 md:row-span-2",
  "md:col-span-1", "md:col-span-1",
  "md:col-span-2", "md:col-span-1",
];

export default function GalleriesPage() {
  const [selected, setSelected] = useState<number | null>(null);

  const next = useCallback(() => {
    setSelected((s) => (s === null ? null : (s + 1) % galleryItems.length));
  }, []);
  const prev = useCallback(() => {
    setSelected((s) =>
      s === null ? null : (s - 1 + galleryItems.length) % galleryItems.length
    );
  }, []);

  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, next, prev]);

  return (
    <div className="bg-ink min-h-screen text-ivory">
      {/* Header */}
      <section className="relative pt-36 md:pt-44 pb-20 noise border-b border-hairline">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-8">
                <span className="eyebrow">N° 08 · Visual Index</span>
                <span className="block h-px w-16 bg-gold/50" />
              </div>
              <h1 className="display-xl text-ivory text-balance">
                A visual{" "}
                <span className="italic font-light text-gold">index</span> of the kitchen.
              </h1>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 self-end">
              <p className="text-ivory-muted text-base leading-relaxed">
                A photographic record of recent plates, drinks and dining
                moments. Tap any image to enter the viewer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bento grid */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[260px] gap-3 md:gap-4">
            {galleryItems.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, delay: (i % 6) * 0.05, ease }}
                onClick={() => setSelected(i)}
                className={`group relative overflow-hidden bg-ink-3 ${spans[i] ?? "md:col-span-1"}`}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-4 md:p-5 flex items-end justify-between text-left translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <div>
                    <div className="eyebrow text-gold">{item.cat}</div>
                    <div className="font-display text-lg md:text-xl text-ivory mt-1 leading-tight">
                      {item.title}
                    </div>
                  </div>
                  <span className="font-display text-sm text-ivory-faint">
                    {String(item.id).padStart(2, "0")}
                  </span>
                </div>
                <div className="absolute inset-0 ring-1 ring-inset ring-gold/0 group-hover:ring-gold/40 transition-all duration-500 pointer-events-none" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            {/* Top bar */}
            <div className="absolute top-6 inset-x-6 md:inset-x-12 flex items-center justify-between text-ivory">
              <div className="eyebrow">
                {galleryItems[selected].cat} · {String(selected + 1).padStart(2, "0")} / {String(galleryItems.length).padStart(2, "0")}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setSelected(null); }}
                className="h-10 w-10 inline-flex items-center justify-center border border-hairline-strong text-ivory hover:text-gold hover:border-gold transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Image */}
            <motion.div
              key={selected}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full aspect-[4/3]"
            >
              <Image
                src={galleryItems[selected].src}
                alt={galleryItems[selected].title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>

            {/* Caption */}
            <div className="absolute bottom-8 inset-x-6 md:inset-x-12 text-center">
              <p className="font-display text-2xl md:text-3xl text-ivory">
                {galleryItems[selected].title}
              </p>
            </div>

            {/* Nav */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 h-12 w-12 inline-flex items-center justify-center border border-hairline-strong text-ivory hover:text-gold hover:border-gold transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 h-12 w-12 inline-flex items-center justify-center border border-hairline-strong text-ivory hover:text-gold hover:border-gold transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
