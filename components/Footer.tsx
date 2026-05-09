"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Facebook, Instagram, Youtube } from "lucide-react";

const NewsletterSubscription = dynamic(() => import("./SubscriptionForm"), {
  ssr: false,
});

const quickLinks = [
  { name: "Menu", href: "/menu" },
  { name: "Galleries", href: "/galleries" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
];

const socials = [
  { Icon: Instagram, href: "https://www.instagram.com/namimoonpanasian", label: "Instagram" },
  { Icon: Facebook,  href: "https://www.facebook.com/namimoonbd",         label: "Facebook"  },
  { Icon: Youtube,   href: "https://www.youtube.com/namimoonbd",          label: "YouTube"   },
];

const fade = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Footer() {
  return (
    <motion.footer
      className="relative bg-ink-2 noise"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gold/40" />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-24 pb-10">
        {/* Statement */}
        <motion.div variants={fade} className="max-w-3xl mb-20">
          <span className="eyebrow">Nami Moon · Est. Dhaka</span>
          <h2 className="display-md mt-6 text-ivory text-balance">
            Where the tide meets the moon — a quieter way to taste Asia.
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 pb-16 border-b border-hairline">
          {/* Brand */}
          <motion.div variants={fade} className="md:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image src="/logo.png" alt="Nami Moon" width={48} height={48} className="h-11 w-auto" />
              <div className="leading-none">
                <div className="font-display text-2xl text-ivory">Nami Moon</div>
                <div className="eyebrow mt-1 text-[9px]">Pan-Asian · Dhaka</div>
              </div>
            </Link>

            <p className="text-ivory-muted text-sm leading-relaxed max-w-sm">
              Pan-Asian cuisine reimagined through an editorial lens — sourcing,
              technique and quiet hospitality, three plates at a time.
            </p>

            <div className="flex items-center gap-4 pt-2">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-10 w-10 items-center justify-center border border-hairline-strong text-ivory-muted hover:text-ink hover:bg-gold hover:border-gold transition-colors"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.4} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Visit */}
          <motion.div variants={fade} className="md:col-span-3 space-y-5">
            <div className="eyebrow">Visit</div>
            <address className="not-italic text-sm text-ivory leading-relaxed">
              Keari Crescent Tower<br />
              Jigatola Bus Stand, Dhanmondi<br />
              Dhaka, Bangladesh
            </address>
            <div className="text-sm text-ivory-muted space-y-1">
              <p>+880 1328-226610</p>
              <p>namimoon8@gmail.com</p>
            </div>
          </motion.div>

          {/* Hours */}
          <motion.div variants={fade} className="md:col-span-2 space-y-5">
            <div className="eyebrow">Hours</div>
            <ul className="text-sm space-y-3">
              <li>
                <div className="text-ivory">Mon — Thu</div>
                <div className="text-ivory-muted">11:00 — 22:00</div>
              </li>
              <li>
                <div className="text-ivory">Fri — Sat</div>
                <div className="text-ivory-muted">11:00 — 23:00</div>
              </li>
              <li>
                <div className="text-ivory">Sunday</div>
                <div className="text-ivory-muted">12:00 — 21:00</div>
              </li>
            </ul>
          </motion.div>

          {/* Index + newsletter */}
          <motion.div variants={fade} className="md:col-span-3 space-y-5">
            <div className="eyebrow">Index</div>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.name}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-3 text-sm text-ivory-muted hover:text-gold transition-colors"
                  >
                    <span className="h-px w-4 bg-current opacity-50 transition-all group-hover:w-8 group-hover:opacity-100" />
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <NewsletterSubscription />
            </div>
          </motion.div>
        </div>

        {/* Foot */}
        <motion.div
          variants={fade}
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <p className="text-xs text-ivory-faint tracking-wider">
            © 2024 — {new Date().getFullYear()} Nami Moon. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[11px] tracking-[0.18em] uppercase text-ivory-faint">
            <Link href="/privacy"       className="hover:text-ivory transition-colors">Privacy</Link>
            <span className="h-3 w-px bg-hairline-strong" />
            <Link href="/terms"         className="hover:text-ivory transition-colors">Terms</Link>
            <span className="h-3 w-px bg-hairline-strong" />
            <Link href="/accessibility" className="hover:text-ivory transition-colors">Accessibility</Link>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
