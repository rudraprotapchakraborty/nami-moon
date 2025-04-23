"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  GiKnifeFork,
  GiSushis,
  GiNoodles,
  GiChiliPepper,
  GiIceCreamScoop,
} from "react-icons/gi";
import { TbSoupFilled } from "react-icons/tb";
import { MdRamenDining } from "react-icons/md";
import { BiSolidBowlRice, BiSolidDrink } from "react-icons/bi";
import { RiDrinksFill } from "react-icons/ri";
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

const categoryIcons: Record<string, JSX.Element> = {
  All: <GiKnifeFork className="text-lg" />,
  Appetizers: <GiKnifeFork className="text-lg" />,
  Sushi: <GiSushis className="text-lg" />,
  Noodles: <GiNoodles className="text-lg" />,
  "Nami Moon Special Drinks": <BiSolidDrink className="text-lg" />,
  Soup: <TbSoupFilled className="text-lg" />,
  Ramen: <MdRamenDining className="text-lg" />,
  Rice: <BiSolidBowlRice className="text-lg" />,
  Curry: <GiChiliPepper className="text-lg" />,
  Desserts: <GiIceCreamScoop className="text-lg" />,
  Drinks: <RiDrinksFill className="text-lg" />,
};

export default function MenuPageClient() {
  const [menuData, setMenuData] = useState<MenuData>({});
  const [selectedTab, setSelectedTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  useEffect(() => {
    setIsLoading(true);
    fetch("/menu.json")
      .then((res) => res.json())
      .then((data) => {
        setMenuData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading menu data:", error);
        setIsLoading(false);
      });
  }, []);

  const tabs = ["All", ...Object.keys(menuData)];

  const getPrice = (item: MenuItem): number => {
    if (typeof item.price === "number") return item.price;
    if (typeof item.price === "string") return 0;
    return (
      item.price_5pcs ||
      item.price_10pcs ||
      item.price_chicken ||
      item.price_beef ||
      0
    );
  };

  const filteredItems = Object.entries(menuData)
    .filter(([category]) => selectedTab === "All" || category === selectedTab)
    .flatMap(([_, items]) => items)
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const sortedItems =
    sortOrder === "none"
      ? filteredItems
      : [...filteredItems].sort((a, b) => {
          const priceA = getPrice(a);
          const priceB = getPrice(b);
          return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
        });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.div
      className="relative min-h-screen text-white bg-black overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      ref={sectionRef}
    >
      {/* Animated red gate background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="w-full h-[50vh] bg-custom-red-600 rounded-b-[100%] shadow-2xl" />
      </motion.div>

      <div className="relative z-10 px-4 py-16 max-w-7xl mx-auto">
        {/* Heading */}
        <motion.h1
          className="text-5xl md:text-6xl font-medium text-center mb-6 text-black font-googly"
          variants={itemVariants}
        >
          OUR MENU
        </motion.h1>

        <motion.div
          className="h-1 w-24 bg-black mx-auto rounded-full mb-12"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        />

        {/* Tabs */}
        <motion.div
          className="flex flex-wrap gap-3 mb-10 justify-center"
          variants={itemVariants}
        >
          <AnimatePresence mode="wait">
            {tabs.map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-googly transition-all ${
                  selectedTab === tab
                    ? "bg-custom-red-500 text-white shadow-lg shadow-custom-red-500/20"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                layout
              >
                {categoryIcons[tab] || <GiKnifeFork className="text-lg" />}
                <span>{tab}</span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Search + Sort */}
        <motion.div
          className="flex flex-col md:flex-row items-center gap-4 mb-10"
          variants={itemVariants}
        >
          <div className="w-full md:w-1/2 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-10 py-3 rounded-full bg-gray-800/80 text-white border border-gray-700 focus:border-custom-red-500 focus:outline-none focus:ring-1 focus:ring-custom-red-500 font-googly"
            />
          </div>
          <div className="flex gap-2">
            {["asc", "desc", "none"].map((order) => (
              <motion.button
                key={order}
                onClick={() => setSortOrder(order as any)}
                className={`px-4 py-2 rounded-full font-googly transition-all ${
                  sortOrder === order
                    ? "bg-custom-red-700 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {order === "asc" ? "Price ↑" : order === "desc" ? "Price ↓" : "Reset"}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Loading / No results / Menu grid */}
        {isLoading ? (
          <motion.div
            className="flex justify-center items-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 border-t-4 border-custom-red-500 border-solid rounded-full animate-spin"></div>
          </motion.div>
        ) : sortedItems.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl text-gray-400 font-googly">
              No menu items found. Try a different search term.
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <AnimatePresence>
              {sortedItems.map((item, index) => (
                <motion.div
                  key={`${item.name}-${index}`}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-gray-700/50"
                  variants={cardVariants}
                  custom={index}
                  whileHover={{
                    y: -5,
                    boxShadow:
                      "0 20px 25px -5px rgba(255, 59, 59, 0.2), 0 10px 10px -5px rgba(255, 59, 59, 0.1)",
                  }}
                  transition={{ duration: 0.3 }}
                  layout
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <motion.div
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        src={item.image || "/logo.png"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  </div>
                  <div className="p-5 space-y-3">
                    <h3 className="text-lg font-semibold font-googly">{item.name}</h3>
                    {item.description && (
                      <p className="text-sm text-gray-300 font-googly">{item.description}</p>
                    )}
                    <div className="flex justify-between items-center">
                      <p className="text-custom-red-400 font-bold font-googly">
                        ৳{" "}
                        {item.price ??
                          item.price_5pcs ??
                          item.price_10pcs ??
                          item.price_chicken ??
                          item.price_beef ??
                          "MRP"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
