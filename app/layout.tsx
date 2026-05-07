import "./globals.css";
import type { Metadata } from "next";
import { Poppins, Bubblegum_Sans } from "next/font/google";
import { Suspense } from "react";
import ClientWrapper from "./client-wrapper";

const bubblegumSans = Bubblegum_Sans({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-googly",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Nami Moon | Pan-Asian Dining in Dhaka",
  description: "Experience the finest Pan-Asian cuisine in the heart of Dhaka at Nami Moon.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={bubblegumSans.variable}>
      <body className={`min-h-screen bg-black text-white ${poppins.variable} font-sans`}>
        <Suspense fallback={<div />}>
          <ClientWrapper>{children}</ClientWrapper>
        </Suspense>
      </body>
    </html>
  );
}
