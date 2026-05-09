"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function NewsletterSubscription() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { email },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      if (response.status === 200) {
        setMessage("Subscribed. Watch your inbox.");
        setEmail("");
      } else {
        setMessage("Could not subscribe — please try again.");
      }
    } catch (err) {
      console.error("Subscription error:", err);
      setMessage("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="eyebrow-ivory mb-3">Newsletter</p>
      <form onSubmit={handleSubscribe} className="group relative flex items-end border-b border-hairline-strong focus-within:border-gold transition-colors">
        <input
          type="email"
          required
          value={email}
          placeholder="your@email.com"
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-transparent py-3 pr-3 text-sm text-ivory placeholder:text-ivory-faint focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          disabled={loading}
          className="text-[11px] tracking-[0.3em] uppercase text-gold hover:text-ivory transition-colors py-3 disabled:opacity-50"
        >
          {loading ? "…" : "Join"}
        </button>
      </form>
      {message && (
        <p className="mt-3 text-xs text-ivory-muted">{message}</p>
      )}
    </div>
  );
}
