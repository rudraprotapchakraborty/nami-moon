"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch } from "react-icons/fi";

type MenuItem = {
  name: string;
  price?: number | string;
  price_5pcs?: number;
  price_10pcs?: number;
  price_chicken?: number;
  price_beef?: number;
  description?: string;
  image?: string;
};
type MenuData = Record<string, MenuItem[]>;

const ease = [0.22, 1, 0.36, 1] as const;

function priceLabel(item: MenuItem): string {
  if (item.price !== undefined) return `৳ ${item.price}`;
  if (item.price_5pcs && item.price_10pcs)
    return `৳ ${item.price_5pcs} / ${item.price_10pcs}`;
  if (item.price_chicken && item.price_beef)
    return `Chicken ৳ ${item.price_chicken} · Beef ৳ ${item.price_beef}`;
  return "—";
}

function getPriceNum(item: MenuItem): number {
  if (typeof item.price === "number") return item.price;
  return (
    item.price_5pcs ??
    item.price_10pcs ??
    item.price_chicken ??
    item.price_beef ??
    0
  );
}

export default function MenuPageClient() {
  const [menuData, setMenuData] = useState<MenuData>({});
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"asc" | "desc" | "none">("none");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/menu.json")
      .then((r) => r.json())
      .then((data) => {
        setMenuData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading menu data:", err);
        setLoading(false);
      });
  }, []);

  const tabs = useMemo(() => ["All", ...Object.keys(menuData)], [menuData]);

  const groupedItems = useMemo(() => {
    const filteredEntries = Object.entries(menuData).filter(
      ([cat]) => tab === "All" || cat === tab
    );
    const lower = search.toLowerCase();
    return filteredEntries
      .map(([cat, items]) => {
        let filtered = items.filter((it) =>
          it.name.toLowerCase().includes(lower)
        );
        if (sort !== "none") {
          filtered = [...filtered].sort((a, b) =>
            sort === "asc"
              ? getPriceNum(a) - getPriceNum(b)
              : getPriceNum(b) - getPriceNum(a)
          );
        }
        return [cat, filtered] as const;
      })
      .filter(([, items]) => items.length > 0);
  }, [menuData, tab, search, sort]);

  const totalCount = groupedItems.reduce((acc, [, it]) => acc + it.length, 0);

  return (
    <div className="bg-ink min-h-screen text-ivory">
      {/* Header banner */}
      <section className="relative pt-36 md:pt-44 pb-20 noise overflow-hidden border-b border-hairline">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-8">
                <span className="eyebrow">N° 02 · The Menu</span>
                <span className="block h-px w-16 bg-gold/50" />
              </div>
              <h1 className="display-xl text-ivory text-balance">
                A tasting of{" "}
                <span className="italic font-light text-gold">all of Asia,</span>{" "}
                three plates at a time.
              </h1>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 self-end">
              <p className="text-ivory-muted text-base leading-relaxed">
                Built around what arrived this morning. Categories rotate with
                the season; pricing is in Bangladeshi Taka (৳).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-16 md:top-20 z-30 bg-ink/85 backdrop-blur-xl border-b border-hairline">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
            {/* Tabs */}
            <div className="flex-1 overflow-x-auto no-scrollbar -mx-6 px-6">
              <div className="flex items-center gap-x-7 gap-y-2 min-w-max pb-1">
                {tabs.map((t) => {
                  const sel = tab === t;
                  return (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`relative whitespace-nowrap text-[11px] tracking-[0.28em] uppercase font-medium transition-colors ${
                        sel ? "text-gold" : "text-ivory-muted hover:text-ivory"
                      }`}
                    >
                      {t}
                      {sel && (
                        <motion.span
                          layoutId="menu-page-underline"
                          className="absolute -bottom-[18px] left-0 right-0 h-px bg-gold"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search + sort */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 lg:w-72">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-ivory-faint h-4 w-4" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search dishes…"
                  className="w-full bg-ink-2 border border-hairline-strong text-sm text-ivory placeholder:text-ivory-faint pl-10 pr-3 py-2.5 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <div className="flex items-center text-[11px] tracking-[0.28em] uppercase">
                {(["asc", "desc", "none"] as const).map((o) => (
                  <button
                    key={o}
                    onClick={() => setSort(o)}
                    className={`px-3 py-2 border-y border-r first:border-l border-hairline-strong transition-colors ${
                      sort === o
                        ? "text-gold border-gold/60"
                        : "text-ivory-muted hover:text-ivory"
                    }`}
                  >
                    {o === "asc" ? "↑" : o === "desc" ? "↓" : "—"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          {loading ? (
            <div className="py-32 text-center text-ivory-muted text-sm tracking-widest uppercase">
              Loading…
            </div>
          ) : totalCount === 0 ? (
            <div className="py-32 text-center">
              <p className="font-display text-3xl text-ivory-muted">
                Nothing matches that search.
              </p>
            </div>
          ) : (
            <div className="space-y-24">
              <AnimatePresence mode="popLayout">
                {groupedItems.map(([cat, items], gi) => (
                  <motion.section
                    key={cat}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease, delay: gi * 0.04 }}
                  >
                    <header className="flex items-end justify-between gap-6 mb-10 pb-5 border-b border-hairline-strong">
                      <div className="flex items-center gap-5">
                        <span className="font-display text-3xl md:text-4xl text-gold">
                          {String(gi + 1).padStart(2, "0")}
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl text-ivory">
                          {cat}
                        </h2>
                      </div>
                      <span className="eyebrow-ivory">
                        {items.length} {items.length === 1 ? "Plate" : "Plates"}
                      </span>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                      {items.map((item, i) => (
                        <article
                          key={`${item.name}-${i}`}
                          className="group flex items-baseline gap-4 py-5 border-b border-hairline hover:border-gold/30 transition-colors"
                        >
                          <span className="font-display text-base text-ivory-faint w-8 shrink-0">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-3">
                              <h3 className="font-display text-xl md:text-2xl text-ivory truncate group-hover:text-gold transition-colors">
                                {item.name}
                              </h3>
                              <div className="flex-1 mt-3 border-b border-dotted border-hairline-strong" />
                              <span className="font-display text-lg text-gold whitespace-nowrap">
                                {priceLabel(item)}
                              </span>
                            </div>
                            {item.description && (
                              <p className="mt-2 text-sm text-ivory-muted leading-relaxed">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </article>
                      ))}
                    </div>
                  </motion.section>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
