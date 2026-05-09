"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";

type MenuItem = {
  name: string;
  price?: number | string;
  price_5pcs?: number;
  price_10pcs?: number;
  price_chicken?: number;
  price_beef?: number;
  description?: string;
};
type MenuData = Record<string, MenuItem[]>;

const categories = [
  "Appetizers",
  "Sushi",
  "Soup",
  "Noodles",
  "Ramen",
  "Rice",
  "Curry",
  "Desserts",
  "Drinks",
];

function priceLabel(item: MenuItem): string {
  if (item.price !== undefined) return `৳ ${item.price}`;
  if (item.price_5pcs && item.price_10pcs)
    return `৳ ${item.price_5pcs} / ৳ ${item.price_10pcs}`;
  if (item.price_chicken && item.price_beef)
    return `Chicken ৳ ${item.price_chicken} · Beef ৳ ${item.price_beef}`;
  return "—";
}

export default function MenuSection() {
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [tab, setTab] = useState<string>("Appetizers");
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
  });
  const [active, setActive] = useState(0);

  useEffect(() => {
    fetch("/menu.json")
      .then((r) => r.json())
      .then(setMenuData)
      .catch((e) => console.error("Failed to fetch menu data:", e));
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActive(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    emblaApi?.scrollTo(0);
  }, [tab, emblaApi]);

  const items = menuData?.[tab] ?? [];

  return (
    <section id="menu" className="relative bg-ink py-32 md:py-40 noise overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Section header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-8">
              <span className="eyebrow">N° 02</span>
              <span className="block h-px w-16 bg-gold/50" />
              <span className="eyebrow-ivory">The Menu</span>
            </div>
            <h2 className="display-lg text-ivory text-balance">
              An <span className="italic font-light text-gold">unhurried</span>{" "}
              tasting of Asia.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 self-end">
            <p className="text-ivory-muted text-base leading-relaxed max-w-md">
              Categories rotate by season — sashimi cut to order, curries
              simmered through the morning, drinks built around what arrived
              at the market that week.
            </p>
            <Link
              href="/menu"
              className="group mt-8 inline-flex items-center gap-3 text-gold text-[11px] tracking-[0.32em] uppercase border-b border-gold/40 pb-1 hover:border-gold transition-colors"
            >
              View Full Menu
              <Arrow />
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 mb-14 border-y border-hairline py-5">
          {categories.map((cat) => {
            const selected = tab === cat;
            return (
              <button
                key={cat}
                onClick={() => setTab(cat)}
                className={`relative text-[11px] tracking-[0.28em] uppercase font-medium transition-colors ${
                  selected ? "text-gold" : "text-ivory-muted hover:text-ivory"
                }`}
              >
                {cat}
                {selected && (
                  <motion.span
                    layoutId="menu-tab-underline"
                    className="absolute -bottom-[22px] left-0 right-0 h-px bg-gold"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Carousel */}
        {!menuData ? (
          <div className="py-32 text-center text-ivory-muted text-sm tracking-widest uppercase">
            Loading…
          </div>
        ) : items.length === 0 ? (
          <div className="py-24 text-center text-ivory-muted">
            No items in this category.
          </div>
        ) : (
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-px">
                {items.map((item, i) => (
                  <article
                    key={`${item.name}-${i}`}
                    className="flex-[0_0_85%] sm:flex-[0_0_55%] md:flex-[0_0_38%] lg:flex-[0_0_28%] min-w-0 group"
                  >
                    <div className="relative h-full bg-ink-2 border border-hairline group-hover:border-gold/40 transition-colors duration-500 p-8 md:p-10">
                      <div className="flex items-center justify-between mb-6">
                        <span className="eyebrow text-ivory-faint">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-ivory-faint text-[10px] tracking-[0.3em] uppercase">
                          {tab}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl md:text-[28px] leading-tight text-ivory text-balance min-h-[64px]">
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className="mt-4 text-ivory-muted text-sm leading-relaxed line-clamp-3">
                          {item.description}
                        </p>
                      )}
                      <div className="mt-10 pt-6 border-t border-hairline flex items-center justify-between">
                        <span className="font-display text-xl text-gold">
                          {priceLabel(item)}
                        </span>
                        <span className="text-ivory-faint text-[10px] tracking-[0.3em] uppercase">
                          ●
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="mt-10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-ivory-faint text-[11px] tracking-[0.3em]">
                <span className="text-ivory">
                  {String(active + 1).padStart(2, "0")}
                </span>
                <span>/</span>
                <span>{String(items.length).padStart(2, "0")}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => emblaApi?.scrollPrev()}
                  aria-label="Previous"
                  className="h-11 w-11 inline-flex items-center justify-center border border-hairline-strong text-ivory-muted hover:text-gold hover:border-gold transition-colors"
                >
                  <Arrow flip />
                </button>
                <button
                  onClick={() => emblaApi?.scrollNext()}
                  aria-label="Next"
                  className="h-11 w-11 inline-flex items-center justify-center border border-hairline-strong text-ivory-muted hover:text-gold hover:border-gold transition-colors"
                >
                  <Arrow />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Arrow({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="square"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  );
}
