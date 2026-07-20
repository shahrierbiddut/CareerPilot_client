"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { HelpCircle, Book, MessageCircle, Info, Mail, AlertTriangle } from "lucide-react";

export default function HelpDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const helpLinks = [
    { name: "Documentation", href: "/docs", icon: Book },
    { name: "FAQ", href: "/faq", icon: Info },
    { name: "Support Center", href: "/support", icon: MessageCircle },
    { name: "Contact Us", href: "/contact", icon: Mail },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-cp-primary transition-all border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-cp-primary focus:ring-offset-2 dark:focus:ring-offset-black"
      >
        <HelpCircle size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-zinc-900 shadow-xl border border-zinc-200 dark:border-zinc-800 animate-fade-in origin-top-right z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50">
            <h3 className="font-bold text-zinc-900 dark:text-white">Help & Support</h3>
          </div>

          <div className="py-2">
            {helpLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)} 
                className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <link.icon size={16} className="text-zinc-400 dark:text-zinc-500" />
                {link.name}
              </Link>
            ))}
          </div>

          <div className="border-t border-zinc-100 dark:border-zinc-800 py-2">
            <Link 
              href="/report-issue" 
              onClick={() => setIsOpen(false)} 
              className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-amber-600 dark:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors"
            >
              <AlertTriangle size={16} />
              Report Issue
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
