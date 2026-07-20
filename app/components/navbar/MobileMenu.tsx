"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink } from "./NavLinks";
import { X } from "lucide-react";

import { useAuth } from "../../lib/useAuth";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn, logout } = useAuth();

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Trap focus (simple version: prevent body scroll)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col md:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-zinc-950/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div 
        ref={menuRef}
        className="relative flex h-[80vh] w-full flex-col overflow-y-auto bg-white px-6 pb-6 pt-20 shadow-2xl dark:bg-zinc-950 rounded-b-3xl transform transition-transform duration-300 ease-in-out origin-top"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute right-6 top-6 p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors bg-zinc-100 dark:bg-zinc-800 rounded-full"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>

        <nav className="flex flex-col gap-6 mt-4">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={onClose}
                className={`text-lg font-medium transition-colors hover:text-cp-primary ${
                  isActive ? "text-cp-primary" : "text-zinc-700 dark:text-zinc-300"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-10 flex flex-col gap-4 border-t border-zinc-100 dark:border-zinc-800 pt-6">
          {isLoggedIn ? (
            <button
              onClick={() => {
                onClose();
                logout();
              }}
              className="flex w-full items-center justify-center rounded-full border border-red-200 dark:border-red-900 py-3 text-sm font-medium text-red-600 dark:text-red-400 transition-colors hover:bg-red-50 dark:hover:bg-red-950"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/login"
                onClick={onClose}
                className="flex w-full items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-700 py-3 text-sm font-medium text-zinc-900 dark:text-white transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={onClose}
                className="flex w-full items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-700 py-3 text-sm font-medium text-zinc-900 dark:text-white transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                Register
              </Link>
              <Link
                href="/get-started"
                onClick={onClose}
                className="btn-gradient flex w-full items-center justify-center rounded-full py-3 text-sm font-semibold"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
