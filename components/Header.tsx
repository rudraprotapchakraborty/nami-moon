"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Galleries", href: "/galleries" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ink/80 backdrop-blur-xl border-b border-hairline"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              scrolled ? "h-16" : "h-20"
            }`}
          >
            {/* Brand */}
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/logo.png"
                alt="Nami Moon"
                width={44}
                height={44}
                className={`w-auto transition-all duration-500 ${
                  scrolled ? "h-9" : "h-11"
                }`}
              />
              <div className="hidden sm:flex flex-col leading-none">
                <span className="font-display text-xl tracking-wide text-ivory">
                  Nami Moon
                </span>
                <span className="eyebrow mt-1 text-[9px]">Pan-Asian · Dhaka</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-10">
              {menuItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.name} className="relative">
                    <Link
                      href={item.href}
                      className={`text-[12px] tracking-[0.28em] uppercase font-medium transition-colors duration-300 ${
                        active
                          ? "text-ivory"
                          : "text-ivory-muted hover:text-ivory"
                      }`}
                    >
                      {item.name}
                      {active && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-2 left-0 right-0 h-px bg-gold"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Reserve CTA */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/booking"
                className="group relative inline-flex items-center gap-3 text-[11px] tracking-[0.32em] uppercase font-medium text-ivory pl-5 pr-1 py-3"
              >
                <span className="relative z-10">Reserve</span>
                <span className="relative z-10 inline-flex h-9 w-9 items-center justify-center border border-gold text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-ink">
                  <ArrowRight />
                </span>
                <span className="absolute inset-y-0 left-0 right-10 border-y border-l border-hairline-strong transition-colors duration-300 group-hover:border-gold/40" />
              </Link>
            </div>

            {/* Mobile trigger */}
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setIsOpen((o) => !o)}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center text-ivory border border-hairline-strong"
            >
              <div className="flex flex-col gap-[5px]">
                <span
                  className={`block h-px w-5 bg-current transition-transform duration-300 ${
                    isOpen ? "translate-y-[3px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-px w-5 bg-current transition-all duration-300 ${
                    isOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-px w-5 bg-current transition-transform duration-300 ${
                    isOpen ? "-translate-y-[5px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-ink/70 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-50 w-[86%] max-w-[380px] bg-ink-2 border-l border-hairline-strong p-8 md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between mb-12 pt-2">
                <span className="eyebrow">Navigate</span>
                <span className="text-ivory-faint text-[10px] tracking-[0.3em] uppercase">
                  Nami Moon
                </span>
              </div>

              <ul className="space-y-1">
                {menuItems.map((item, i) => {
                  const active = pathname === item.href;
                  return (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.1 + i * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="border-b border-hairline last:border-b-0"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-baseline justify-between py-5"
                      >
                        <span
                          className={`font-display text-3xl transition-colors ${
                            active ? "text-gold" : "text-ivory group-hover:text-gold"
                          }`}
                        >
                          {item.name}
                        </span>
                        <span className="text-ivory-faint text-[10px] tracking-[0.3em]">
                          0{i + 1}
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-auto pt-12">
                <Link
                  href="/booking"
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center justify-between border border-gold px-5 py-4 text-gold hover:bg-gold hover:text-ink transition-colors duration-300"
                >
                  <span className="text-[11px] tracking-[0.32em] uppercase font-medium">
                    Reserve a Table
                  </span>
                  <ArrowRight />
                </Link>
                <p className="mt-6 text-ivory-faint text-xs leading-relaxed">
                  Jigatola, Dhanmondi · Dhaka
                  <br />
                  <span className="text-ivory-muted">+880 1328-226610</span>
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function ArrowRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="square"
    >
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  );
}
