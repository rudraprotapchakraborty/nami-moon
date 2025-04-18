"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "HOME", href: "/" },
    { name: "MENU", href: "/menu" },
    { name: "BLOG", href: "/blog" },
    { name: "GALLERIES", href: "/galleries" },
    { name: "ABOUT US", href: "/about" },
    { name: "CONTACT US", href: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-900/90 backdrop-blur-md shadow-lg py-3"
          : "bg-gray-900/70 backdrop-blur-sm py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Image
              src="/logo.png"
              alt="Nami Moon Logo"
              width={48}
              height={48}
              className="h-16 w-auto transition-all duration-300"
            />
          </motion.div>
          <motion.span
            className="text-2xl font-bold text-white tracking-wide font-googly"
            whileHover={{ color: "#ff4d4d" }}
            transition={{ duration: 0.2 }}
          >
            Nami-moon
          </motion.span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span
                  className={`text-gray-300 hover:text-custom-red-400 font-semibold text-base whitespace-nowrap transition-colors duration-300 font-googly ${
                    pathname === item.href ? "text-custom-red-400" : ""
                  }`}
                >
                  {item.name}
                </span>
                {pathname === item.href && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-custom-red-400"
                    layoutId="underline"
                  />
                )}
              </motion.div>
            </Link>
          ))}
          <Link href="/booking">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-custom-red-600 hover:bg-custom-red-700 text-white text-base transition-colors duration-300 rounded-full px-6 py-2 font-googly relative overflow-hidden group"
            >
              <span className="relative z-10">BOOK NOW</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 opacity-0 group-hover:opacity-70 transition-opacity duration-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <motion.span
                className="absolute left-0 top-0 h-full w-1 bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.7)] opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: "400%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-300 hover:text-custom-red-400 transition-colors duration-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span
              className={`w-full h-0.5 bg-current transform transition-all duration-300 origin-left ${
                isOpen ? "rotate-45 translate-y-px" : ""
              }`}
            ></span>
            <span
              className={`w-full h-0.5 bg-current transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-full h-0.5 bg-current transform transition-all duration-300 origin-left ${
                isOpen ? "-rotate-45 -translate-y-px" : ""
              }`}
            ></span>
          </div>
          <span className="sr-only">Toggle menu</span>
        </button>

        {/* Mobile Drawer */}
        {isOpen && (
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-[300px] bg-gray-900 text-gray-300 border-l border-gray-800 p-6 z-50 md:hidden"
          >
            <div className="flex flex-col gap-4 mt-8">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`text-lg hover:text-custom-red-400 transition-colors duration-300 block py-2 font-googly ${
                      pathname === item.href ? "text-custom-red-400" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: menuItems.length * 0.1 }}
              >
                <Link href="/booking" onClick={() => setIsOpen(false)}>
                  <button className="bg-custom-red-600 hover:bg-custom-red-700 text-white mt-4 w-full transition-all duration-300 rounded-full py-2 font-googly relative overflow-hidden group">
                    <span className="relative z-10">BOOK NOW</span>
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 opacity-0 group-hover:opacity-70 transition-opacity duration-500"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.span
                      className="absolute left-0 top-0 h-full w-1 bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.7)] opacity-0 group-hover:opacity-100"
                      initial={{ x: "-100%" }}
                      animate={{ x: "400%" }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
