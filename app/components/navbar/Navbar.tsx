"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, Rocket, User, LogOut, Settings, FileText, LayoutDashboard } from "lucide-react";
import NavLinks, { NavLink } from "./NavLinks";
import MobileMenu from "./MobileMenu";
import { useAuth } from "../../lib/useAuth";

const publicLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "Resume Templates", href: "/templates" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const loggedInLinks: NavLink[] = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "My Resumes", href: "/dashboard/my-resumes" },
  { name: "AI Tools", href: "/ai-tools" },
  { name: "Profile", href: "/dashboard/profile" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  
  const { isLoggedIn, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const links = isLoggedIn ? loggedInLinks : publicLinks;

  return (
    <>
      <header
        className={`glass-nav fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
          isScrolled ? "scrolled py-3" : "py-4 md:py-5"
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 lg:px-8">
          
          {/* Logo Section */}
          <Link 
            href="/" 
            className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cp-primary/10 text-cp-primary">
              <Rocket size={24} className="text-cp-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              CareerPilot <span className="text-cp-primary">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation Center */}
          <div className="hidden md:block">
            <NavLinks links={links} />
          </div>

          {/* Desktop Auth Buttons Right */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-cp-primary transition-all border border-zinc-200 dark:border-zinc-700"
                >
                  <User size={20} />
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
                    <Link href="/my-resumes" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors">
                      <FileText size={16} />
                      My Resumes
                    </Link>
                    <Link href="/settings" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors">
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
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="rounded-full border border-zinc-200 dark:border-zinc-700 px-5 py-2 text-sm font-medium text-zinc-900 dark:text-white transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  Register
                </Link>
                <Link
                  href="/get-started"
                  className="btn-gradient rounded-full px-6 py-2 text-sm font-semibold"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className="md:hidden p-2 text-zinc-600 dark:text-zinc-300 hover:text-cp-primary transition-colors focus:outline-none"
            aria-expanded={isMobileOpen}
            aria-label="Open main menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer component */}
      <MobileMenu 
        isOpen={isMobileOpen} 
        onClose={() => setIsMobileOpen(false)} 
        links={links} 
      />
    </>
  );
}
