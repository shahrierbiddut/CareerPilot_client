"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Rocket } from "lucide-react";
import NavLinks, { NavLink } from "./NavLinks";
import MobileMenu from "./MobileMenu";
import { useAuth } from "../../lib/useAuth";
import ProfileDropdown from "../ui/ProfileDropdown";
import NotificationDropdown from "../ui/NotificationDropdown";
import HelpDropdown from "../ui/HelpDropdown";
import GlobalSearchModal from "../ui/GlobalSearchModal";

const publicLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "Resume Templates", href: "/resume-templates" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const authenticatedPublicLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "Resume Templates", href: "/resume-templates" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = isLoggedIn ? authenticatedPublicLinks : publicLinks;

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
            className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 shrink-0"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cp-primary/10 text-cp-primary">
              <Rocket size={24} className="text-cp-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white hidden sm:block">
              CareerPilot <span className="text-cp-primary">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation Center */}
          <div className="hidden md:block">
            <NavLinks links={links} />
          </div>

          {/* Desktop Auth Buttons / Actions Right */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <GlobalSearchModal />
                <div className="flex items-center gap-2 border-l border-zinc-200 dark:border-zinc-800 pl-3 ml-1">
                  <NotificationDropdown />
                  <HelpDropdown />
                  <ProfileDropdown />
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors px-3"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-sm font-medium text-zinc-900 dark:text-white hover:text-cp-primary dark:hover:text-cp-primary transition-colors px-3"
                >
                  Register
                </Link>
                <Link
                  href="/register"
                  className="btn-gradient rounded-full px-6 py-2 text-sm font-semibold shadow-md shadow-cp-primary/20"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-3">
            {isLoggedIn && <GlobalSearchModal />}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-cp-primary transition-colors focus:outline-none bg-zinc-100 dark:bg-zinc-800 rounded-lg"
              aria-expanded={isMobileOpen}
              aria-label="Open main menu"
            >
              <Menu size={24} />
            </button>
          </div>
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
