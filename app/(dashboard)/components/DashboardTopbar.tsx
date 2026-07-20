"use client";

import { Menu } from "lucide-react";
import GlobalSearchModal from "../../components/ui/GlobalSearchModal";
import NotificationDropdown from "../../components/ui/NotificationDropdown";
import HelpDropdown from "../../components/ui/HelpDropdown";
import ProfileDropdown from "../../components/ui/ProfileDropdown";

interface TopbarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (val: boolean) => void;
}

export default function DashboardTopbar({ isMobileMenuOpen, setIsMobileMenuOpen }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 h-20 bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-zinc-200/80 dark:border-zinc-800/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-colors">
      
      {/* Left section: Mobile Menu Toggle & Search */}
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden p-2 -ml-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"
        >
          <Menu size={24} />
        </button>

        <div className="hidden sm:flex items-center">
          <GlobalSearchModal />
        </div>
      </div>

      {/* Right section: Actions & Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden sm:block">
          <HelpDropdown />
        </div>
        <NotificationDropdown />
        <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-1 hidden sm:block"></div>
        <ProfileDropdown />
      </div>
    </header>
  );
}
