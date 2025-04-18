"use client"

import type React from "react"
import { useState, useRef } from "react"
import ReCAPTCHA from "react-google-recaptcha"

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    message: "",
  })
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!recaptchaValue) {
      alert("Please complete the reCAPTCHA")
      return
    }
    console.log({ ...formData, recaptchaValue })
    recaptchaRef.current?.reset()
    setRecaptchaValue(null)
    setIsModalOpen(true)
    setFormData({ name: "", phoneNumber: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-5xl md:text-6xl font-medium mb-12 text-center">CONTACT US</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Map Section */}
          <div className="relative h-[600px] rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d541.5337015719812!2d90.37554214178249!3d23.739116244827688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b90046839a49%3A0x96501ba8e0d99430!2sNami%20Moon%20Dhanmondi!5e1!3m2!1sen!2sbd!4v1739715703753!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Contact Form Section */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-medium">NAMI MOON</h2>
              <div className="space-y-2 text-gray-300">
                <p>Jigatola Bus Stand, Dhanmondi</p>
                <p>Reservation Line: +88 01711123456</p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Opening Hours</h3>
                <table className="w-full text-gray-300">
                  <tbody>
                    <tr>
                      <td className="pr-4 py-1">Monday - Friday</td>
                      <td>11:00 AM - 10:00 PM</td>
                    </tr>
                    <tr>
                      <td className="pr-4 py-1">Saturday - Sunday</td>
                      <td>12:00 PM - 11:00 PM</td>
                    </tr>
                    <tr>
                      <td className="pr-4 py-1">Holidays</td>
                      <td>12:00 PM - 10:00 PM</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/10 border border-gray-700 rounded-md text-white"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="block text-sm">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/10 border border-gray-700 rounded-md text-white"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm">
                  Messages <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-2 bg-white/10 border border-gray-700 rounded-md text-white resize-none"
                  placeholder="Write your messages"
                ></textarea>
              </div>

              <div className="flex justify-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                  onChange={setRecaptchaValue}
                  theme="dark"
                />
              </div>

              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors cursor-pointer"
                disabled={!recaptchaValue}
              >
                SEND MESSAGE
              </button>
            </form>

            <div className="pt-8 border-t border-gray-800"></div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-black">
            <h2 className="text-xl font-bold mb-2">Thank You for Contacting Us</h2>
            <p className="mb-4">We appreciate your message. We will get back to you as soon as possible.</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
