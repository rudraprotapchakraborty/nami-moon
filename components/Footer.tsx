import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Clock, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

export function Footer() {
  const quickLinks = [
    { name: "Menu", href: "/menu" },
    { name: "Galleries", href: "/galleries" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }

  const socialVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <motion.footer 
      className="bg-gradient-to-b from-gray-900 to-black border-t border-gray-800 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      {/* Decorative element */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-custom-red-500 to-transparent"></div>
      
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        {/* Top section with columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: About */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.div 
              className="flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="Nami Moon Logo"
                  width={50}
                  height={50}
                  className="h-12 w-auto"
                />
                <span className="text-custom-red-500 text-2xl font-bold font-googly">NAMI MOON</span>
              </Link>
            </motion.div>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              Experience the authentic flavors of Pan-Asian cuisine in the heart of Dhaka. Our culinary journey brings together the finest ingredients and traditional cooking methods.
            </p>
            
            <motion.div 
              className="flex gap-5 pt-4"
              variants={itemVariants}
            >
              <motion.a 
                href="https://www.facebook.com/namimoonbd" 
                className="text-gray-400 hover:text-custom-red-400 transition-colors duration-300 bg-gray-800/50 p-2 rounded-full"
                whileHover={{ scale: 1.15, backgroundColor: "rgba(220, 38, 38, 0.2)" }}
                whileTap={{ scale: 0.9 }}
                variants={socialVariants}
              >
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/namimoonpanasian" 
                className="text-gray-400 hover:text-custom-red-400 transition-colors duration-300 bg-gray-800/50 p-2 rounded-full"
                whileHover={{ scale: 1.15, backgroundColor: "rgba(220, 38, 38, 0.2)" }}
                whileTap={{ scale: 0.9 }}
                variants={socialVariants}
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="https://www.youtube.com/namimoonbd" 
                className="text-gray-400 hover:text-custom-red-400 transition-colors duration-300 bg-gray-800/50 p-2 rounded-full"
                whileHover={{ scale: 1.15, backgroundColor: "rgba(220, 38, 38, 0.2)" }}
                whileTap={{ scale: 0.9 }}
                variants={socialVariants}
              >
                <Youtube className="h-5 w-5" />
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-white text-lg font-googly mb-6 relative">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-custom-red-500"></span>
            </h3>
            
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-custom-red-400 transition-colors duration-300 flex items-center gap-2 text-sm"
                  >
                    <ChevronRight className="h-4 w-4 text-custom-red-500" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Column 3: Opening Hours */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-white text-lg font-googly mb-6 relative">
              Opening Hours
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-custom-red-500"></span>
            </h3>
            
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <Clock className="h-5 w-5 text-custom-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Monday - Thursday</p>
                  <p className="text-gray-400">11:00 AM - 10:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Clock className="h-5 w-5 text-custom-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Friday - Saturday</p>
                  <p className="text-gray-400">11:00 AM - 11:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Clock className="h-5 w-5 text-custom-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Sunday</p>
                  <p className="text-gray-400">12:00 PM - 9:00 PM</p>
                </div>
              </li>
            </ul>
            
            <motion.button
              className="mt-4 px-5 py-2 bg-custom-red-600 text-white text-sm rounded-full font-medium hover:bg-custom-red-700 transition-colors duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="h-4 w-4" />
              Reserve a Table
            </motion.button>
          </motion.div>
          
          {/* Column 4: Contact */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-white text-lg font-googly mb-6 relative">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-custom-red-500"></span>
            </h3>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="h-5 w-5 text-custom-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-400">
                Danmondi, Jigatola Bus Stand, Keari Crescent Tower, Dhaka, Bangladesh</p>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="h-5 w-5 text-custom-red-500 flex-shrink-0" />
                <p className="text-gray-400">+880 1328-226610</p>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="h-5 w-5 text-custom-red-500 flex-shrink-0" />
                <p className="text-gray-400">namimoon8@gmail.com</p>
              </li>
            </ul>
            
            <div className="pt-4">
              <h4 className="text-white text-sm font-medium mb-3">Subscribe to our newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-800 text-gray-300 px-4 py-2 text-sm rounded-l-full focus:outline-none focus:ring-1 focus:ring-custom-red-500 w-full"
                />
                <motion.button
                  className="bg-custom-red-600 text-white px-4 py-2 rounded-r-full hover:bg-custom-red-700 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Bottom section with copyright */}
        <motion.div 
          className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4"
          variants={itemVariants}
        >
          <motion.div 
            className="text-sm text-gray-500"
            variants={itemVariants}
          >
            Copyright © 2024-{new Date().getFullYear()} NAMI MOON. All Rights Reserved.
          </motion.div>
          
          <motion.div 
            className="text-xs text-gray-600 flex flex-wrap justify-center gap-6"
            variants={itemVariants}
          >
            <Link href="/privacy" className="hover:text-custom-red-400 transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-custom-red-400 transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="hover:text-custom-red-400 transition-colors duration-300">
              Sitemap
            </Link>
            <Link href="/accessibility" className="hover:text-custom-red-400 transition-colors duration-300">
              Accessibility
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  )
}