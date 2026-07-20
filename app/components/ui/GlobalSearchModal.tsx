"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Command, FileText, Bot, Map, MessageSquare, Briefcase, FileCode } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function GlobalSearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Keyboard shortcut CMD+K / CTRL+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const searchResults = [
    { category: "AI Tools", items: [
      { name: "Resume Analyzer", icon: FileSearchIcon, href: "/dashboard/ai/resume-analyzer" },
      { name: "Career Analysis", icon: Bot, href: "/dashboard/ai/career-analysis" },
      { name: "Interview Coach", icon: MessageSquare, href: "/dashboard/ai/interview-coach" },
      { name: "Career Roadmap", icon: Map, href: "/dashboard/ai/career-roadmap" }
    ]},
    { category: "Resources", items: [
      { name: "Frontend Developer Resume Template", icon: FileCode, href: "/templates/frontend" },
      { name: "How to ace technical interviews", icon: FileText, href: "/blog/technical-interviews" },
      { name: "My Saved Resumes", icon: Briefcase, href: "/dashboard/my-resumes" }
    ]}
  ];

  // Dummy filter logic
  const filteredResults = query.trim() ? searchResults.map(group => ({
    ...group,
    items: group.items.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
  })).filter(group => group.items.length > 0) : searchResults;

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800/80 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors w-full sm:w-64 border border-transparent dark:border-zinc-700/50"
      >
        <Search size={16} />
        <span className="text-sm">Search...</span>
        <div className="ml-auto flex items-center gap-1 opacity-60">
          <Command size={12} />
          <span className="text-[10px] font-semibold">K</span>
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div 
            ref={modalRef}
            className="w-full max-w-xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col"
          >
            <div className="flex items-center gap-3 px-4 py-4 border-b border-zinc-100 dark:border-zinc-800">
              <Search size={20} className="text-zinc-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools, resumes, templates, blogs..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none"
              />
              <div className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold text-zinc-500">ESC</div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filteredResults.length > 0 ? (
                filteredResults.map((group, i) => (
                  <div key={i} className="mb-4 last:mb-0">
                    <p className="px-3 py-1 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      {group.category}
                    </p>
                    <div className="mt-1 space-y-1">
                      {group.items.map((item, j) => (
                        <button
                          key={j}
                          onClick={() => {
                            setIsOpen(false);
                            router.push(item.href);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-left group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 group-hover:bg-white dark:group-hover:bg-zinc-700 flex items-center justify-center shrink-0 border border-zinc-200 dark:border-zinc-700/50">
                            <item.icon size={16} className="text-zinc-600 dark:text-zinc-400 group-hover:text-cp-primary transition-colors" />
                          </div>
                          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                            {item.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-zinc-500 flex flex-col items-center">
                  <Search size={32} className="mb-3 text-zinc-300 dark:text-zinc-700" />
                  <p>No results found for "{query}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function FileSearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <circle cx="10" cy="13" r="2" />
      <path d="m11.5 14.5 2 2" />
    </svg>
  );
}
