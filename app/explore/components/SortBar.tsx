"use client";

import { ChevronDown, ArrowDownUp, LayoutGrid, List } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export type SortOption = "newest" | "popular" | "highest-rated" | "a-z" | "updated";

interface SortBarProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  resultsCount: number;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "popular", label: "Most Popular" },
  { value: "highest-rated", label: "Highest Rated" },
  { value: "a-z", label: "Alphabetical (A-Z)" },
  { value: "updated", label: "Recently Updated" },
];

export default function SortBar({ value, onChange, resultsCount, viewMode, onViewModeChange }: SortBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = sortOptions.find((opt) => opt.value === value) || sortOptions[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800 w-full mb-6">
      
      {/* Results Count */}
      <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        Showing <span className="text-zinc-900 dark:text-white font-bold">{resultsCount}</span> resources
      </div>

      <div className="flex items-center gap-3 self-end sm:self-auto">
        
        {/* Sort Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm"
          >
            <ArrowDownUp size={16} className="text-zinc-400" />
            <span className="min-w-[125px] text-left">{selectedOption.label}</span>
            <ChevronDown size={16} className={`text-zinc-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {isOpen && (
            <div className="absolute z-50 top-full right-0 mt-2 w-56 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-[0_16px_40px_rgba(0,0,0,0.1)] overflow-hidden py-1 animate-fade-in">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                    value === option.value
                      ? "bg-cp-primary/10 text-cp-primary font-semibold"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  {option.label}
                  {value === option.value && (
                    <div className="w-1.5 h-1.5 rounded-full bg-cp-primary" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* View Mode Toggles */}
        <div className="hidden sm:flex items-center p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <button
            onClick={() => onViewModeChange("grid")}
            className={`p-1.5 rounded-lg transition-all ${
              viewMode === "grid" 
                ? "bg-white dark:bg-zinc-800 text-cp-primary shadow-sm" 
                : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
            aria-label="Grid View"
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={`p-1.5 rounded-lg transition-all ${
              viewMode === "list" 
                ? "bg-white dark:bg-zinc-800 text-cp-primary shadow-sm" 
                : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
            aria-label="List View"
          >
            <List size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}
