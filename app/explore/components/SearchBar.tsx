"use client";

import { Search, X, Clock, TrendingUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RECENT_SEARCHES = [
  "Frontend developer resume",
  "Behavioral interview",
  "Product manager"
];

const POPULAR_SEARCHES = [
  "ATS-proof resume",
  "Data science course",
  "Mock interview",
  "Salary negotiation"
];

export default function SearchBar({ value, onChange, placeholder = "Search resources, resume templates, interview guides..." }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  const handleSelectSuggestion = (suggestion: string) => {
    onChange(suggestion);
    setIsFocused(false);
    inputRef.current?.blur();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full max-w-2xl mx-auto transition-all duration-300 z-50 ${
        isFocused ? "transform scale-[1.02]" : ""
      }`}
    >
      <div 
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-cp-primary/20 to-cp-secondary/20 blur-xl transition-opacity duration-300 ${
          isFocused ? "opacity-100" : "opacity-0"
        }`} 
      />
      
      <div 
        className={`relative flex items-center w-full h-14 rounded-2xl bg-white dark:bg-zinc-900 border transition-all duration-300 ${
          isFocused 
            ? "border-cp-primary shadow-[0_8px_30px_rgba(37,99,235,0.12)] rounded-b-none" 
            : "border-zinc-200 dark:border-zinc-800 shadow-sm"
        }`}
      >
        <div className="pl-5 text-zinc-400 dark:text-zinc-500 flex-shrink-0">
          <Search size={20} className={isFocused ? "text-cp-primary transition-colors" : ""} />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          className="w-full h-full bg-transparent border-none outline-none px-4 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 font-medium text-base"
        />
        
        {value && (
          <button
            onClick={handleClear}
            className="pr-5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors focus:outline-none flex-shrink-0"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isFocused && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-zinc-900 border border-t-0 border-cp-primary rounded-b-2xl shadow-[0_16px_40px_rgba(37,99,235,0.15)] overflow-hidden animate-fade-in z-50">
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Recent Searches */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3 px-2">
                <Clock size={14} />
                Recent
              </div>
              <ul className="space-y-1">
                {RECENT_SEARCHES.map((item) => (
                  <li key={item}>
                    <button 
                      onClick={() => handleSelectSuggestion(item)}
                      className="w-full text-left px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-cp-primary dark:hover:text-cp-primary rounded-lg transition-colors flex items-center justify-between group"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Searches */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3 px-2">
                <TrendingUp size={14} />
                Popular
              </div>
              <ul className="space-y-1">
                {POPULAR_SEARCHES.map((item) => (
                  <li key={item}>
                    <button 
                      onClick={() => handleSelectSuggestion(item)}
                      className="w-full text-left px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-cp-primary dark:hover:text-cp-primary rounded-lg transition-colors flex items-center justify-between group"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
