"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { MapPin, Phone, Clock, Send, X } from "lucide-react";

// Client-only component for particles
function ParticlesBackground() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) return null;
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(15)].map((_, i) => {
        // Generate deterministic values based on index
        const leftPos = ((i * 7919) % 100).toFixed(2);
        const topPos = ((i * 104729) % 100).toFixed(2);
        const duration = (((i * 101) % 5) + 5).toFixed(1);
        const delay = ((i * 211) % 5).toFixed(1);
        const yDistance = (((i * 307) % 100) + 50).toFixed(0);
        const scaleMax = (((i * 41) % 3) + 2).toFixed(1);
        
        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-custom-red-500 rounded-full opacity-30"
            style={{
              left: `${leftPos}%`,
              top: `${topPos}%`,
            }}
            animate={{
              y: [0, -parseInt(yDistance)],
              opacity: [0.3, 0],
              scale: [1, parseFloat(scaleMax)],
            }}
            transition={{
              duration: parseFloat(duration),
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: parseFloat(delay),
            }}
          />
        );
      })}
    </div>
  );
}

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phoneNumber,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.error || "Failed to send message.");

      setIsModalOpen(true);
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Failed to send your message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const formItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background gradient effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1.5 }}
      />

      {/* Animated particles */}
      <ParticlesBackground />

      <div
        className="max-w-7xl mx-auto px-4 py-16 relative z-10"
        ref={sectionRef}
      >
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-medium mb-4 text-center text-custom-red-500 font-googly"
            variants={itemVariants}
          >
            CONTACT US
          </motion.h1>

          <motion.div
            className="h-1 w-24 bg-custom-red-500 mx-auto rounded-full mb-16"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />

          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Contact Information Section */}
            <motion.div className="space-y-8" variants={containerVariants}>
              {/* Address Section */}
              <motion.div
                className="space-y-6 bg-gray-800/30 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50"
                variants={itemVariants}
              >
                <motion.h2
                  className="text-3xl md:text-4xl font-medium text-custom-red-500 font-googly"
                  variants={itemVariants}
                >
                  NAMI MOON
                </motion.h2>

                <motion.div
                  className="space-y-4 text-gray-300"
                  variants={itemVariants}
                >
                  <motion.div
                    className="flex items-center gap-3"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MapPin className="text-custom-red-500" />
                    <p>Jigatola Bus Stand, Dhanmondi</p>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-3"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Phone className="text-custom-red-500" />
                    <p>Reservation Line: +88 01711123456</p>
                  </motion.div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-xl font-medium mb-4 flex items-center gap-2 font-googly">
                    <Clock className="text-custom-red-500" />
                    Opening Hours
                  </h3>

                  <table className="w-full text-gray-300">
                    <tbody>
                      <motion.tr
                        whileHover={{
                          backgroundColor: "rgba(255,255,255,0.05)",
                        }}
                        className="rounded-md"
                      >
                        <td className="pr-4 py-2">Monday - Friday</td>
                        <td>11:00 AM - 10:00 PM</td>
                      </motion.tr>
                      <motion.tr
                        whileHover={{
                          backgroundColor: "rgba(255,255,255,0.05)",
                        }}
                        className="rounded-md"
                      >
                        <td className="pr-4 py-2">Saturday - Sunday</td>
                        <td>12:00 PM - 11:00 PM</td>
                      </motion.tr>
                      <motion.tr
                        whileHover={{
                          backgroundColor: "rgba(255,255,255,0.05)",
                        }}
                        className="rounded-md"
                      >
                        <td className="pr-4 py-2">Holidays</td>
                        <td>12:00 PM - 10:00 PM</td>
                      </motion.tr>
                    </tbody>
                  </table>
                </motion.div>
              </motion.div>

              {/* Google map section */}
              <motion.div
                className="relative h-[335px] rounded-xl overflow-hidden shadow-2xl border border-gray-800"
                variants={itemVariants}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d541.5337015719812!2d90.37554214178249!3d23.739116244827688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b90046839a49%3A0x96501ba8e0d99430!2sNami%20Moon%20Dhanmondi!5e1!3m2!1sen!2sbd!4v1739715703753!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

                {/* Decorative elements */}
                <motion.div
                  className="absolute -bottom-2 -left-2 w-24 h-24 border-l-2 border-b-2 border-custom-red-500"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
                <motion.div
                  className="absolute -top-2 -right-2 w-24 h-24 border-r-2 border-t-2 border-custom-red-500"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </motion.div>
            </motion.div>
            {/* Contact Form Section */}
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6 bg-gray-800/30 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50"
              variants={containerVariants}
            >
              <motion.div
                className="space-y-2"
                variants={formItemVariants}
                custom={0}
              >
                <label htmlFor="name" className="block text-sm font-googly">
                  Name <span className="text-custom-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-custom-red-500 focus:outline-none focus:ring-1 focus:ring-custom-red-500 transition-all duration-300 font-googly"
                  placeholder="Enter your full name"
                />
              </motion.div>

              <motion.div
                className="space-y-2"
                variants={formItemVariants}
                custom={1.5}
              >
                <label htmlFor="email" className="block text-sm font-googly">
                  Email <span className="text-custom-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-custom-red-500 focus:outline-none focus:ring-1 focus:ring-custom-red-500 transition-all duration-300 font-googly"
                  placeholder="Enter your email address"
                />
              </motion.div>

              <motion.div
                className="space-y-2"
                variants={formItemVariants}
                custom={1}
              >
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-googly"
                >
                  Phone Number <span className="text-custom-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-custom-red-500 focus:outline-none focus:ring-1 focus:ring-custom-red-500 transition-all duration-300 font-googly"
                  placeholder="Enter your phone number"
                />
              </motion.div>

              <motion.div
                className="space-y-2"
                variants={formItemVariants}
                custom={2}
              >
                <label htmlFor="subject" className="block text-sm font-googly">
                  Subject <span className="text-custom-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-custom-red-500 focus:outline-none focus:ring-1 focus:ring-custom-red-500 transition-all duration-300 font-googly"
                  placeholder="Enter the subject"
                />
              </motion.div>

              <motion.div
                className="space-y-2"
                variants={formItemVariants}
                custom={2}
              >
                <label htmlFor="message" className="block text-sm font-googly">
                  Messages <span className="text-custom-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white resize-none focus:border-custom-red-500 focus:outline-none focus:ring-1 focus:ring-custom-red-500 transition-all duration-300 font-googly"
                  placeholder="Write your messages"
                ></textarea>
              </motion.div>

              <motion.button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-custom-red-600 hover:bg-custom-red-700 text-white font-medium rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 font-googly"
                variants={formItemVariants}
                custom={3}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <span>SENDING...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>SEND MESSAGE</span>
                  </>
                )}
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-gray-900 rounded-xl shadow-2xl p-8 max-w-md w-full text-white border border-gray-800"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex justify-between items-start mb-4">
                <motion.h2
                  className="text-2xl font-bold text-custom-red-500 font-googly"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Thank You for Contacting Us
                </motion.h2>
                <motion.button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white bg-gray-800 p-2 rounded-full"
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              <motion.div
                className="h-0.5 w-full bg-gray-800 mb-4"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />

              <motion.p
                className="mb-6 text-gray-300 font-googly"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                We appreciate your message. Our team will get back to you as
                soon as possible.
              </motion.p>

              <motion.button
                onClick={() => setIsModalOpen(false)}
                className="w-full px-4 py-3 bg-custom-red-600 hover:bg-custom-red-700 text-white rounded-full font-googly flex items-center justify-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
