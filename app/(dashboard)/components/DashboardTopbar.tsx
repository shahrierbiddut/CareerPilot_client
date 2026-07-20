"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Bell, HelpCircle, Menu, User, Settings, LogOut, LayoutDashboard, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../lib/useAuth";

interface TopbarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (val: boolean) => void;
}

export default function DashboardTopbar({ isMobileMenuOpen, setIsMobileMenuOpen }: TopbarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("https://i.pravatar.cc/150?u=a042581f4e29026704d");
  const profileRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync avatar with local storage
  useEffect(() => {
    const loadAvatar = () => {
      const saved = localStorage.getItem("cp_profile_data");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.avatar) setAvatarUrl(parsed.avatar);
        } catch (e) {}
      }
    };
    
    loadAvatar();
    
    window.addEventListener("cp_profile_updated", loadAvatar);
    window.addEventListener("storage", loadAvatar);
    
    return () => {
      window.removeEventListener("cp_profile_updated", loadAvatar);
      window.removeEventListener("storage", loadAvatar);
    };
  }, []);

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

        <div className="hidden sm:flex relative w-full max-w-md group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-cp-primary transition-colors">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Search resources, resumes..." 
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-100/80 dark:bg-zinc-900/50 border border-transparent focus:bg-white dark:focus:bg-black focus:border-cp-primary/30 dark:focus:border-blue-500/30 rounded-xl text-sm outline-none transition-all placeholder:text-zinc-500 shadow-sm focus:shadow-md focus:shadow-cp-primary/5 dark:text-white"
          />
        </div>
      </div>

      {/* Right section: Actions & Profile */}
      <div className="flex items-center gap-3 sm:gap-5">
        <button className="p-2 rounded-full text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors hidden sm:block">
          <HelpCircle size={20} />
        </button>
        
        <button className="relative p-2 rounded-full text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-[#0A0A0A]"></span>
        </button>

        <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-1 hidden sm:block"></div>

        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 pl-2 sm:pl-0 rounded-full hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-cp-primary/20"
          >
            <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-zinc-100 dark:ring-zinc-800">
              <Image 
                src={avatarUrl} 
                alt="User avatar" 
                fill 
                className="object-cover"
              />
            </div>
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-zinc-900 shadow-xl border border-zinc-200 dark:border-zinc-800 py-2 animate-fade-in origin-top-right z-50">
              <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-800 mb-1">
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">My Account</p>
              </div>
              
              <Link href="/dashboard" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors">
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
              <Link href="/" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors">
                <Home size={16} />
                Home
              </Link>
              <Link href="/dashboard/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors">
                <User size={16} />
                Profile
              </Link>
              <Link href="/dashboard/settings" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors">
                <Settings size={16} />
                Settings
              </Link>
              
              <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-1"></div>
              
              <button 
                onClick={() => {
                  setIsProfileOpen(false);
                  logout();
                }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

    </header>
  );
}
