"use client";

import { usePathname } from "next/navigation";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isDashboardRoute = pathname?.startsWith("/dashboard") || 
                           pathname?.startsWith("/analytics") || 
                           pathname?.startsWith("/ai-tools");

  if (isDashboardRoute) {
    return (
      <div className="h-full bg-zinc-50 dark:bg-black">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col pt-20 bg-zinc-50 dark:bg-black">
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
}
