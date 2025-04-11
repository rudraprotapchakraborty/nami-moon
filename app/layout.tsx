import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Suspense } from "react";
import ClientWrapper from "./client-wrapper";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-black text-white ${poppins.variable} font-sans`}>
        <Suspense fallback={<div />}>
          <ClientWrapper>{children}</ClientWrapper>
        </Suspense>
      </body>
    </html>
  );
}
