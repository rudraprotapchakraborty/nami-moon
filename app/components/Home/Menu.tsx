'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  GiKnifeFork,
  GiSushis,
  GiNoodles,
  GiChiliPepper,
  GiIceCreamScoop,
} from 'react-icons/gi';
import { TbSoupFilled } from 'react-icons/tb';
import { MdRamenDining } from 'react-icons/md';
import { BiSolidBowlRice, BiSolidDrink } from 'react-icons/bi';
import { RiDrinksFill } from 'react-icons/ri';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type MenuItem = {
  name: string;
  price?: number | string;
  price_5pcs?: number;
  price_10pcs?: number;
  price_chicken?: number;
  price_beef?: number;
  description?: string;
};

type MenuData = {
  [category: string]: MenuItem[];
};

const categoryConfig = [
  { key: 'Appetizers', icon: GiKnifeFork, label: 'Appetizers' },
  { key: 'Sushi', icon: GiSushis, label: 'Sushi' },
  { key: 'Soup', icon: TbSoupFilled, label: 'Soup' },
  { key: 'Noodles', icon: GiNoodles, label: 'Noodles' },
  { key: 'Ramen', icon: MdRamenDining, label: 'Ramen' },
  { key: 'Rice', icon: BiSolidBowlRice, label: 'Rice' },
  { key: 'Curry', icon: GiChiliPepper, label: 'Curry' },
  { key: 'Desserts', icon: GiIceCreamScoop, label: 'Desserts' },
  { key: 'Drinks', icon: BiSolidDrink, label: 'Drinks' },
  { key: 'Nami Moon Special Drinks', icon: RiDrinksFill, label: 'Special Drinks' },
];

const MenuSection = () => {
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>('Appetizers');
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch('/menu.json');
        const data: MenuData = await res.json();
        setMenuData(data);
      } catch (error) {
        console.error('Failed to fetch menu data:', error);
      }
    };

    fetchMenu();
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('select', () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
    });

    return () => {
      emblaApi.off('select', () => {
        setActiveIndex(emblaApi.selectedScrollSnap());
      });
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  if (!menuData) {
    return (
      <section className="py-20 text-center text-white">
        <div className="w-16 h-16 border-t-4 border-red-500 border-solid rounded-full animate-spin mb-4 mx-auto"></div>
        <p className="text-lg">Loading menu...</p>
      </section>
    );
  }

  const currentItems = menuData[selectedTab] || [];

  return (
    <section id="menu" className="py-20 bg-black text-white relative overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="font-googly text-3xl md:text-5xl font-medium text-center mb-6 text-custom-red-500">
          OUR MENU
        </h2>
        <div className="h-1 w-24 bg-custom-red-500 mx-auto rounded-full mb-12" />

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categoryConfig.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setSelectedTab(key)}
              className={`font-googly flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                selectedTab === key
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-white/10 text-white border-gray-700 hover:bg-white/20'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {currentItems.map((item, index) => (
                <div
                  key={index}
                  className="flex-[0_0_280px] md:flex-[0_0_320px] min-w-0"
                >
                  <div className="group relative overflow-hidden rounded-lg cursor-pointer h-72 shadow-xl bg-black/40">
                    <div className="relative h-full w-full">
                      <Image
                        src="/placeholder.svg?height=300&width=400"
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80" />
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <h3 className="font-googly text-sm font-bold mb-1 uppercase text-white">
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className="text-xs text-gray-300 mb-2">
                          {item.description}
                        </p>
                      )}
                      <p className="font-googly text-custom-red-300 text-sm font-medium">
                        {item.price
                          ? `৳${item.price}`
                          : item.price_5pcs && item.price_10pcs
                          ? `৳${item.price_5pcs} / ৳${item.price_10pcs}`
                          : item.price_chicken && item.price_beef
                          ? `Chicken: ৳${item.price_chicken} / Beef: ৳${item.price_beef}`
                          : 'Price Unavailable'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-colors z-10"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-colors z-10"
            aria-label="Next slide"
          >
            <FaChevronRight className="h-5 w-5" />
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {currentItems.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-red-500 w-6' : 'bg-gray-500'
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        </div>

        {/* Full Menu Button */}
        <div className="text-center mt-12">
          <a
            href="/menu"
            className="font-googly inline-block bg-red-500 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-red-600 transition-colors duration-300"
          >
            View Full Menu
          </a>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
