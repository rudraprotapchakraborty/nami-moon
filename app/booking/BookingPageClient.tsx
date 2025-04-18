"use client"

import type React from "react"
import { useState, useRef } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "@/app/datepicker.css"
import ReCAPTCHA from "react-google-recaptcha"

export default function BookingPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    date: new Date(),
    time: "",
    guests: "2",
    specialRequests: "",
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!recaptchaValue) {
      alert("Please complete the reCAPTCHA verification")
      return
    }
    console.log({ ...formData, recaptchaValue })
    setIsModalOpen(true)
    recaptchaRef.current?.reset()
    setRecaptchaValue(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaValue(value)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-xl mx-auto px-4 py-16">
        <h1 className="text-5xl md:text-6xl font-medium mb-12 text-center">BOOK A TABLE</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-medium mb-2">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white/10 border border-gray-700 rounded-md text-white"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-lg font-medium mb-2">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white/10 border border-gray-700 rounded-md text-white"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div>
            <label htmlFor="guests" className="block text-lg font-medium mb-2">
              Number of Guests
            </label>
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={(e) => setFormData((prev) => ({ ...prev, guests: e.target.value }))}
              className="w-full px-4 py-2 bg-white/10 border border-gray-700 rounded-md text-white"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="date" className="block text-lg font-medium mb-2">
              Select Date
            </label>
            <DatePicker
              selected={formData.date}
              onChange={(date: Date) => setFormData((prev) => ({ ...prev, date: date }))}
              className="w-full px-4 py-2 bg-white/10 border border-gray-700 rounded-md text-white"
              dateFormat="MMMM d, yyyy"
              minDate={new Date()}
              placeholderText="Click to select a date"
              id="date"
            />
          </div>

          <div>
            <label htmlFor="time" className="block text-lg font-medium mb-2">
              Select Time
            </label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
              className="w-full px-4 py-2 bg-white/10 border border-gray-700 rounded-md text-white"
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
          </div>

          <div>
            <label htmlFor="specialRequests" className="block text-lg font-medium mb-2">
              Special Requests (Optional)
            </label>
            <input
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white/10 border border-gray-700 rounded-md text-white"
              placeholder="Any special requests or dietary requirements?"
            />
          </div>

          <div className="flex justify-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
              onChange={handleRecaptchaChange}
              theme="dark"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-custom-red-600 hover:bg-custom-red-700 text-white px-8 py-3 text-lg rounded-md"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-white text-black max-w-md w-full rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Thank You for Your Request</h2>
            <p className="mb-4">
              We appreciate your interest in dining with us. We will contact you soon to confirm your reservation.
            </p>
            <div className="text-right">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-custom-red-600 text-white rounded hover:bg-custom-red-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
