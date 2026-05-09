"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

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
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phoneNumber,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to send message.");

      setIsModalOpen(true);
      setFormData({ name: "", email: "", phoneNumber: "", subject: "", message: "" });
    } catch (err) {
      console.error("Form submission error:", err);
      setError(err instanceof Error ? err.message : "Failed to send your message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
                <span className="eyebrow">N° 07 · Get in Touch</span>
                <span className="block h-px w-16 bg-gold/50" />
              </div>
              <h1 className="display-xl text-ivory text-balance">
                Write to us, or{" "}
                <span className="italic font-light text-gold">visit</span>{" "}
                in person.
              </h1>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 self-end">
              <p className="text-ivory-muted text-base leading-relaxed">
                For private dining, press, or general enquiry. We respond
                within one business day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Info + map */}
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-10">
                <Detail
                  label="Address"
                  value={
                    <>
                      Keari Crescent Tower<br />
                      Jigatola Bus Stand, Dhanmondi<br />
                      Dhaka, Bangladesh
                    </>
                  }
                />
                <Detail label="Reservations" value={<>+880 1328-226610</>} />
                <Detail label="Email" value={<>namimoon8@gmail.com</>} />
              </div>

              <div className="border-t border-hairline pt-10">
                <span className="eyebrow mb-5 block">Hours</span>
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-hairline">
                    {[
                      ["Mon — Thu", "11:30 — 22:00"],
                      ["Fri — Sat", "11:30 — 23:00"],
                      ["Sunday",    "12:00 — 21:00"],
                    ].map(([d, h]) => (
                      <tr key={d}>
                        <td className="py-3 text-ivory">{d}</td>
                        <td className="py-3 text-ivory-muted text-right">{h}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Map */}
              <div className="relative h-[340px] border border-hairline-strong overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d541.5337015719812!2d90.37554214178249!3d23.739116244827688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b90046839a49%3A0x96501ba8e0d99430!2sNami%20Moon%20Dhanmondi!5e1!3m2!1sen!2sbd!4v1739715703753!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(0.6) contrast(1.1) brightness(0.8)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20" />
              </div>
            </div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              onSubmit={handleSubmit}
              className="lg:col-span-7 space-y-8"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <Field label="Name" htmlFor="name" index="01">
                  <input
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={inputCls}
                  />
                </Field>
                <Field label="Phone" htmlFor="phoneNumber" index="02">
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="+880 …"
                    className={inputCls}
                  />
                </Field>
              </div>

              <Field label="Email" htmlFor="email" index="03">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  className={inputCls}
                />
              </Field>

              <Field label="Subject" htmlFor="subject" index="04">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's it regarding?"
                  className={inputCls}
                />
              </Field>

              <Field label="Message" htmlFor="message" index="05">
                <textarea
                  id="message"
                  name="message"
                  rows={7}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here…"
                  className={inputCls + " resize-none"}
                />
              </Field>

              {error && (
                <div className="border border-vermillion/60 bg-vermillion/5 p-4 text-sm text-ivory">
                  {error}
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex items-center gap-4 bg-gold text-ink px-10 py-5 text-[11px] tracking-[0.32em] uppercase font-medium hover:bg-ivory transition-colors disabled:opacity-60"
                >
                  {isSubmitting ? "Sending…" : "Send Message"}
                  <Arrow />
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/85 backdrop-blur-md p-6"
          >
            <motion.div
              initial={{ scale: 0.96, y: 12, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.4, ease }}
              className="bg-ink-2 border border-gold/40 max-w-md w-full p-10 noise"
            >
              <span className="eyebrow">Received</span>
              <h2 className="display-md mt-5 text-ivory">Thank you.</h2>
              <div className="hairline-fade-x my-6" />
              <p className="text-ivory-muted text-sm leading-relaxed">
                We have your message and will respond shortly. In the meantime,
                feel free to explore our menu or reserve a table directly.
              </p>
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
  children,
}: {
  label: string;
  htmlFor: string;
  index: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="flex items-baseline gap-3 mb-3">
        <span className="font-display text-sm text-ivory-faint">{index}</span>
        <span className="eyebrow-ivory">{label}</span>
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
