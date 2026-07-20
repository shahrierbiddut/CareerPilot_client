"use client";

import { useState } from "react";
import DashboardSidebar from "./components/DashboardSidebar";
import DashboardTopbar from "./components/DashboardTopbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F9FAFB] dark:bg-[#0A0A0A]">
      {/* Sidebar */}
      <DashboardSidebar 
        isCollapsed={isSidebarCollapsed} 
        setIsCollapsed={setIsSidebarCollapsed}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out">
        
        {/* Topbar */}
        <DashboardTopbar 
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen} 
        />

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
