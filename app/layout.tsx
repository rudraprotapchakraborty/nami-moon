import "./globals.css";
import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { Suspense } from "react";
import ClientWrapper from "./client-wrapper";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Nami Moon | Pan-Asian Dining in Dhaka",
  description:
    "An editorial Pan-Asian dining experience in the heart of Dhaka. Tradition reimagined at Nami Moon.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen bg-ink text-ivory antialiased">
        <Suspense fallback={<div />}>
          <ClientWrapper>{children}</ClientWrapper>
        </Suspense>
      </body>
    </html>
  );
}
