"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import LoadingBar from "react-top-loading-bar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setProgress(100);
  }, [pathname, searchParams]);

  return (
    <>
      <LoadingBar
        color="#c9a55c"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={2}
        shadow={false}
      />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
