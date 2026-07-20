"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  User, LayoutDashboard, FileText, Bot, BarChart2, 
  Settings, Bell, LifeBuoy, BookOpen, LogOut, Sun, Moon
} from "lucide-react";
import { useAuth } from "../../lib/useAuth";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();
  const router = useRouter();
  
  // Dummy user for UI purposes
  const user = { name: "Professional", email: "user@example.com" };

  useEffect(() => {
    // Check initial theme
    if (document.documentElement.classList.contains("dark")) {
      setIsDark(true);
    }
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
    router.push("/login");
  };

  const menuGroups = [
    {
      items: [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "My Profile", href: "/dashboard/profile", icon: User },
        { name: "My Resume", href: "/dashboard/my-resumes", icon: FileText },
      ]
    },
    {
      items: [
        { name: "AI Tools", href: "/dashboard/ai/career-analysis", icon: Bot },
        { name: "Analytics", href: "/analytics", icon: BarChart2 },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
        { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
      ]
    },
    {
      items: [
        { name: "Support Center", href: "/support", icon: LifeBuoy },
        { name: "Documentation", href: "/docs", icon: BookOpen },
      ]
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-cp-primary transition-all border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-cp-primary focus:ring-offset-2 dark:focus:ring-offset-black"
      >
        <User size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-xl bg-white dark:bg-zinc-900 shadow-xl border border-zinc-200 dark:border-zinc-800 animate-fade-in origin-top-right z-50 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-cp-primary/10 flex items-center justify-center border border-cp-primary/20 shrink-0">
                <User size={24} className="text-cp-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                  {user?.name || "Professional"}
                </p>
                <p className="text-xs text-zinc-500 truncate">{user?.email || "user@example.com"}</p>
                <p className="text-xs font-semibold text-cp-primary mt-1 truncate">
                  Target: Frontend Developer
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="max-h-[60vh] overflow-y-auto">
            {menuGroups.map((group, index) => (
              <div key={index} className="py-2 border-b border-zinc-100 dark:border-zinc-800">
                {group.items.map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href} 
                    onClick={() => setIsOpen(false)} 
                    className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    <item.icon size={16} className="text-zinc-400 dark:text-zinc-500" />
                    {item.name}
                  </Link>
                ))}
              </div>
            ))}
            
            <div className="py-2">
              <button 
                onClick={toggleTheme}
                className="w-full flex items-center justify-between px-4 py-2 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {isDark ? <Sun size={16} className="text-amber-500" /> : <Moon size={16} className="text-indigo-500" />}
                  {isDark ? "Light Mode" : "Dark Mode"}
                </div>
                <div className={`w-8 h-4 rounded-full transition-colors relative \${isDark ? 'bg-cp-primary' : 'bg-zinc-300'}`}>
                  <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform \${isDark ? 'translate-x-4' : 'translate-x-1'}`} />
                </div>
              </button>
              
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors mt-1"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
