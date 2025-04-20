"use client";
import type React from "react";
import { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/app/datepicker.css";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Calendar,
  Users,
  Clock,
  MessageSquare,
  Phone,
  User,
  Send,
  Mail,
  AlertCircle,
} from "lucide-react";
import emailjs from '@emailjs/browser'

export default function BookingPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    date: new Date(),
    time: "",
    guests: "2",
    specialRequests: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // In the handleSubmit function, update the fetch URL:
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Format date for email
      const formattedDate = formData.date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      // Prepare template parameters
      const templateParams = {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        date: formattedDate,
        time: formData.time,
        guests: formData.guests,
        specialRequests: formData.specialRequests || "None",
        to_email: formData.email, // This will be used to send to the customer
      };

      // Send email using EmailJS directly
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID_2!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_2!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY_2!
      );

      console.log("EmailJS result:", result);

      if (result.status !== 200) {
        throw new Error("Failed to send email");
      }

      setIsSubmitting(false);
      setIsModalOpen(true);
    } catch (err) {
      setIsSubmitting(false);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      console.error("Error sending booking:", err);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
        className="max-w-2xl mx-auto px-4 py-16 relative z-10"
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
            BOOK A TABLE
          </motion.h1>

          <motion.div
            className="h-1 w-24 bg-custom-red-500 mx-auto rounded-full mb-16"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-8 bg-gray-800/30 p-8 rounded-xl backdrop-blur-sm border border-gray-700/50"
            variants={containerVariants}
          >
            <motion.div
              className="space-y-2"
              variants={formItemVariants}
              custom={0}
            >
              <label
                htmlFor="name"
                className="block text-lg font-medium mb-2 flex items-center gap-2 font-googly"
              >
                <User className="text-custom-red-500" size={18} />
                Name
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-custom-red-500 focus:outline-none focus:ring-1 focus:ring-custom-red-500 transition-all duration-300 font-googly"
                placeholder="Enter your name"
                required
              />
            </motion.div>

            <motion.div
              className="space-y-2"
              variants={formItemVariants}
              custom={1}
            >
              <label
                htmlFor="phoneNumber"
                className="block text-lg font-medium mb-2 flex items-center gap-2 font-googly"
              >
                <Phone className="text-custom-red-500" size={18} />
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-custom-red-500 focus:outline-none focus:ring-1 focus:ring-custom-red-500 transition-all duration-300 font-googly"
                placeholder="Enter your phone number"
                required
              />
            </motion.div>

            <motion.div
              className="space-y-2"
              variants={formItemVariants}
              custom={2}
            >
              <label
                htmlFor="email"
                className="block text-lg font-medium mb-2 flex items-center gap-2 font-googly"
              >
                <Mail className="text-custom-red-500" size={18} />
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-custom-red-500 focus:outline-none focus:ring-1 focus:ring-custom-red-500 transition-all duration-300 font-googly"
                placeholder="Enter your email address"
                required
              />
            </motion.div>

            <motion.div
              className="space-y-2"
              variants={formItemVariants}
              custom={3}
            >
              <label
                htmlFor="guests"
                className="block text-lg font-medium mb-2 flex items-center gap-2 font-googly"
              >
                <Users className="text-custom-red-500" size={18} />
                Number of Guests
              </label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, guests: e.target.value }))
                }
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-custom-red-500 focus:outline-none focus:ring-1 focus:ring-custom-red-500 transition-all duration-300 font-googly"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                className="space-y-2"
                variants={formItemVariants}
                custom={4}
              >
                <label
                  htmlFor="date"
                  className="block text-lg font-medium mb-2 flex items-center gap-2 font-googly"
                >
                  <Calendar className="text-custom-red-500" size={18} />
                  Select Date
                </label>
                <DatePicker
                  selected={formData.date}
                  onChange={(date: Date) =>
                    setFormData((prev) => ({ ...prev, date }))
                  }
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-custom-red-500 focus:outline-none focus:ring-1 focus:ring-custom-red-500 transition-all duration-300 font-googly"
                  dateFormat="MMMM d, yyyy"
                  minDate={new Date()}
                  placeholderText="Click to select a date"
                  id="date"
                />
              </motion.div>

              <motion.div
                className="space-y-2"
                variants={formItemVariants}
                custom={5}
              >
                <label
                  htmlFor="time"
                  className="block text-lg font-medium mb-2 flex items-center gap-2 font-googly"
                >
                  <Clock className="text-custom-red-500" size={18} />
                  Select Time
                </label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, time: e.target.value }))
                  }
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-custom-red-500 focus:outline-none focus:ring-1 focus:ring-custom-red-500 transition-all duration-300 font-googly"
                  required
                >
                  <option value="" disabled>
                    Select a time
                  </option>
                  {[
                    "10:00 AM",
                    "11:00 AM",
                    "12:00 PM",
                    "1:00 PM",
                    "2:00 PM",
                    "3:00 PM",
                    "4:00 PM",
                    "5:00 PM",
                    "6:00 PM",
                    "7:00 PM",
                    "8:00 PM",
                    "9:00 PM",
                  ].map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </motion.div>
            </div>

            <motion.div
              className="space-y-2"
              variants={formItemVariants}
              custom={6}
            >
              <label
                htmlFor="specialRequests"
                className="block text-lg font-medium mb-2 flex items-center gap-2 font-googly"
              >
                <MessageSquare className="text-custom-red-500" size={18} />
                Special Requests (Optional)
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white resize-none focus:border-custom-red-500 focus:outline-none focus:ring-1 focus:ring-custom-red-500 transition-all duration-300 font-googly"
                placeholder="Any special requests or dietary requirements?"
              />
            </motion.div>

            {error && (
              <motion.div
                className="bg-red-900/50 border border-red-800 text-white p-4 rounded-lg flex items-start gap-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AlertCircle
                  className="text-red-400 shrink-0 mt-0.5"
                  size={18}
                />
                <div>{error}</div>
              </motion.div>
            )}

            <motion.div
              className="text-center pt-4"
              variants={formItemVariants}
              custom={7}
            >
              <motion.button
                type="submit"
                className="bg-custom-red-600 hover:bg-custom-red-700 text-white px-8 py-3 text-lg rounded-full transition-all duration-300 flex items-center justify-center gap-2 mx-auto font-googly"
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
                    <span>PROCESSING...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>BOOK NOW</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          </motion.form>
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
              <motion.div
                className="w-16 h-16 bg-custom-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  damping: 15,
                  stiffness: 200,
                  delay: 0.2,
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Calendar className="h-8 w-8 text-custom-red-500" />
                </motion.div>
              </motion.div>

              <motion.h2
                className="text-2xl font-bold mb-2 text-center text-custom-red-500 font-googly"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Reservation Request Received
              </motion.h2>

              <motion.div
                className="h-0.5 w-full bg-gray-800 mb-4"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />

              <motion.p
                className="mb-6 text-gray-300 text-center font-googly"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Thank you for your reservation request. We have sent a
                confirmation to{" "}
                <span className="text-white font-medium">{formData.email}</span>{" "}
                and will contact you shortly at{" "}
                <span className="text-white font-medium">
                  {formData.phoneNumber}
                </span>{" "}
                to confirm your booking.
              </motion.p>

              <motion.div
                className="bg-gray-800/50 p-4 rounded-lg mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">Date:</div>
                  <div className="text-white">
                    {formData.date.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>

                  <div className="text-gray-400">Time:</div>
                  <div className="text-white">
                    {formData.time || "To be confirmed"}
                  </div>

                  <div className="text-gray-400">Guests:</div>
                  <div className="text-white">
                    {formData.guests}{" "}
                    {parseInt(formData.guests) === 1 ? "Guest" : "Guests"}
                  </div>
                </div>
              </motion.div>

              <motion.button
                onClick={closeModal}
                className="w-full px-4 py-3 bg-custom-red-600 hover:bg-custom-red-700 text-white rounded-full font-googly flex items-center justify-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
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

// Client-only component for particles
function ParticlesBackground() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(40)].map((_, i) => {
        // Generate deterministic values based on index
        const leftPos = ((i * 7919) % 100).toFixed(2);
        const topPos = ((i * 104729) % 100).toFixed(2);
        const size = (((i * 997) % 3) + 1).toFixed(1);
        const duration = (((i * 101) % 5) + 5).toFixed(1);
        const delay = ((i * 211) % 5).toFixed(1);
        const yDistance = (((i * 307) % 100) + 50).toFixed(0);
        const xOffset = ((((i * 401) % 100) - 50) / 2).toFixed(1);

        return (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-30"
            style={{
              left: `${leftPos}%`,
              top: `${topPos}%`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: "rgb(239, 68, 68)",
            }}
            animate={{
              y: [0, -parseInt(yDistance)],
              x: [0, parseFloat(xOffset)],
              opacity: [0.3, 0],
              scale: [1, (i % 4) + 1],
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
