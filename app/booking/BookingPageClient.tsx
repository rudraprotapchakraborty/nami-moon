"use client";

import type React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/app/datepicker.css";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

const ease = [0.22, 1, 0.36, 1] as const;

const TIMES = [
  "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM",
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
  "8:00 PM", "8:30 PM", "9:00 PM",
];

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const formattedDate = formData.date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      const templateParams = {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        date: formattedDate,
        time: formData.time,
        guests: formData.guests,
        specialRequests: formData.specialRequests || "None",
        to_email: formData.email,
      };

      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID_2!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_2!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY_2!
      );

      if (result.status !== 200) throw new Error("Failed to send email");
      setIsModalOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      console.error("Error sending booking:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-ink min-h-screen text-ivory">
      {/* Header */}
      <section className="relative pt-36 md:pt-44 pb-20 noise border-b border-hairline">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-8">
                <span className="eyebrow">N° 06 · Reservations</span>
                <span className="block h-px w-16 bg-gold/50" />
              </div>
              <h1 className="display-xl text-ivory text-balance">
                Reserve your{" "}
                <span className="italic font-light text-gold">table</span>{" "}
                at Nami Moon.
              </h1>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 self-end">
              <p className="text-ivory-muted text-base leading-relaxed">
                Tables are released two weeks in advance. We will confirm your
                booking by phone within a few hours. For parties of nine or more,
                please reach out directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Side info */}
            <aside className="lg:col-span-4 space-y-10">
              <Detail label="Address" value={<>Keari Crescent Tower<br />Jigatola, Dhanmondi · Dhaka</>} />
              <Detail label="Reservations" value={<>+880 1328-226610</>} />
              <Detail label="Lunch" value={<>Daily · 11:30 — 14:30</>} />
              <Detail label="Dinner" value={<>Daily · 18:00 — 22:30</>} />
              <Detail label="Dress" value={<>Smart casual</>} />
            </aside>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              onSubmit={handleSubmit}
              className="lg:col-span-8 space-y-10"
            >
              <Field label="Full Name" htmlFor="name" index="01">
                <input
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className={inputCls}
                />
              </Field>

              <div className="grid md:grid-cols-2 gap-10">
                <Field label="Phone" htmlFor="phoneNumber" index="02">
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="+880 …"
                    className={inputCls}
                  />
                </Field>
                <Field label="Email" htmlFor="email" index="03">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@email.com"
                    className={inputCls}
                  />
                </Field>
              </div>

              <Field label="Number of Guests" htmlFor="guests" index="04">
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => {
                    const sel = formData.guests === String(n);
                    return (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, guests: String(n) }))}
                        className={`h-12 w-12 border text-sm transition-colors ${
                          sel
                            ? "bg-gold border-gold text-ink"
                            : "border-hairline-strong text-ivory hover:border-gold"
                        }`}
                      >
                        {n}
                      </button>
                    );
                  })}
                </div>
              </Field>

              <div className="grid md:grid-cols-2 gap-10">
                <Field label="Date" htmlFor="date" index="05">
                  <DatePicker
                    selected={formData.date}
                    onChange={(date: Date) =>
                      setFormData((prev) => ({ ...prev, date }))
                    }
                    dateFormat="MMMM d, yyyy"
                    minDate={new Date()}
                    placeholderText="Select date"
                    id="date"
                  />
                </Field>
                <Field label="Time" htmlFor="time" index="06">
                  <select
                    id="time"
                    name="time"
                    required
                    value={formData.time}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, time: e.target.value }))
                    }
                    className={inputCls}
                  >
                    <option value="" disabled>Select time</option>
                    {TIMES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Special Requests" htmlFor="specialRequests" index="07" optional>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  rows={4}
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  placeholder="Allergies, occasion, seating preference…"
                  className={inputCls + " resize-none"}
                />
              </Field>

              {error && (
                <div className="border border-vermillion/60 bg-vermillion/5 p-4 flex items-start gap-3 text-sm text-ivory">
                  <AlertCircle className="text-vermillion shrink-0 mt-0.5" size={18} />
                  <span>{error}</span>
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex items-center gap-4 bg-gold text-ink px-10 py-5 text-[11px] tracking-[0.32em] uppercase font-medium hover:bg-ivory transition-colors disabled:opacity-60"
                >
                  {isSubmitting ? "Sending…" : "Confirm Reservation"}
                  <Arrow />
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Confirmation modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/85 backdrop-blur-md p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.96, y: 12, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.4, ease }}
              className="bg-ink-2 border border-gold/40 max-w-md w-full p-10 noise"
            >
              <span className="eyebrow">Confirmation</span>
              <h2 className="display-md mt-5 text-ivory">Reservation requested.</h2>
              <div className="hairline-fade-x my-6" />
              <p className="text-ivory-muted text-sm leading-relaxed">
                Thank you. A confirmation has been dispatched to{" "}
                <span className="text-ivory">{formData.email}</span>. Our team
                will phone{" "}
                <span className="text-ivory">{formData.phoneNumber}</span> shortly.
              </p>
              <dl className="mt-6 grid grid-cols-2 gap-y-3 text-sm">
                <dt className="eyebrow-ivory">Date</dt>
                <dd className="text-ivory">
                  {formData.date.toLocaleDateString("en-US", {
                    weekday: "short", month: "long", day: "numeric",
                  })}
                </dd>
                <dt className="eyebrow-ivory">Time</dt>
                <dd className="text-ivory">{formData.time || "TBC"}</dd>
                <dt className="eyebrow-ivory">Guests</dt>
                <dd className="text-ivory">{formData.guests}</dd>
              </dl>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-8 w-full border border-gold text-gold py-4 text-[11px] tracking-[0.32em] uppercase hover:bg-gold hover:text-ink transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls =
  "w-full bg-ink-2 border border-hairline-strong text-ivory placeholder:text-ivory-faint px-4 py-3.5 text-sm focus:outline-none focus:border-gold transition-colors";

function Field({
  label,
  htmlFor,
  index,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  index: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="flex items-baseline justify-between mb-3">
        <span className="flex items-baseline gap-3">
          <span className="font-display text-sm text-ivory-faint">{index}</span>
          <span className="eyebrow-ivory">{label}</span>
        </span>
        {optional && (
          <span className="text-[10px] tracking-[0.3em] uppercase text-ivory-faint">Optional</span>
        )}
      </label>
      {children}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="border-l border-gold/40 pl-5">
      <div className="eyebrow mb-2">{label}</div>
      <div className="text-ivory text-sm leading-relaxed">{value}</div>
    </div>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square">
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  );
}
