"use client";

import { useState } from "react";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";

export type Category = "Resume Writing" | "Interview Guide" | "Learning Paths" | "Career Articles" | "Resume Templates";
export type CareerLevel = "Beginner" | "Intermediate" | "Advanced" | "Senior";
export type Industry = "Technology" | "Finance" | "Healthcare" | "Marketing" | "Design";
export type Difficulty = "Easy" | "Medium" | "Hard";
export type ResourceType = "Guide" | "Video" | "Course" | "Template" | "Article";
export type PriceType = "Free" | "Premium";
export type RatingType = "4+" | "3+" | "All";

export interface FilterState {
  categories: Category[];
  levels: CareerLevel[];
  industries: Industry[];
  difficulties: Difficulty[];
  types: ResourceType[];
  prices: PriceType[];
  rating: RatingType;
}

interface SidebarFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  onCloseMobile?: () => void;
  resultsCount: number;
}

export const CATEGORIES: Category[] = ["Resume Writing", "Interview Guide", "Learning Paths", "Career Articles", "Resume Templates"];
export const LEVELS: CareerLevel[] = ["Beginner", "Intermediate", "Advanced", "Senior"];
export const INDUSTRIES: Industry[] = ["Technology", "Finance", "Healthcare", "Marketing", "Design"];
export const DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Hard"];
export const TYPES: ResourceType[] = ["Guide", "Video", "Course", "Template", "Article"];
export const PRICES: PriceType[] = ["Free", "Premium"];

export default function SidebarFilters({
  filters,
  onFilterChange,
  onReset,
  onCloseMobile,
  resultsCount
}: SidebarFiltersProps) {
  
  // Track which accordion sections are open
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    category: true,
    type: true,
    level: true,
    industry: false,
    difficulty: false,
    price: false,
    rating: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckboxChange = (
    key: keyof FilterState,
    value: string,
    checked: boolean
  ) => {
    const currentArray = filters[key] as string[];
    const newArray = checked
      ? [...currentArray, value]
      : currentArray.filter((item) => item !== value);
      
    onFilterChange({ ...filters, [key]: newArray });
  };

  const handleRadioChange = (key: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const renderCheckboxGroup = (
    title: string,
    sectionKey: string,
    filterKey: keyof FilterState,
    options: string[]
  ) => {
    const isOpen = openSections[sectionKey];
    
    return (
      <div className="border-b border-zinc-200 dark:border-zinc-800 py-4">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="flex items-center justify-between w-full text-left font-semibold text-zinc-900 dark:text-white mb-2 focus:outline-none"
        >
          {title}
          {isOpen ? <ChevronUp size={16} className="text-zinc-500" /> : <ChevronDown size={16} className="text-zinc-500" />}
        </button>
        
        {isOpen && (
          <div className="mt-3 flex flex-col gap-2">
            {options.map((option) => (
              <label key={option} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={(filters[filterKey] as string[]).includes(option)}
                    onChange={(e) => handleCheckboxChange(filterKey, option, e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="w-4 h-4 border border-zinc-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-900 peer-checked:bg-cp-primary peer-checked:border-cp-primary transition-colors"></div>
                  <svg
                    className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                  {option}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#111] rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
        <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white">
          <Filter size={18} className="text-cp-primary" />
          Filters
        </div>
        
        {onCloseMobile && (
          <button onClick={onCloseMobile} className="lg:hidden text-zinc-400 hover:text-zinc-700 dark:hover:text-white">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Filter Sections (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-5 scrollbar-thin">
        {renderCheckboxGroup("Category", "category", "categories", CATEGORIES)}
        {renderCheckboxGroup("Resource Type", "type", "types", TYPES)}
        {renderCheckboxGroup("Career Level", "level", "levels", LEVELS)}
        {renderCheckboxGroup("Industry", "industry", "industries", INDUSTRIES)}
        {renderCheckboxGroup("Difficulty", "difficulty", "difficulties", DIFFICULTIES)}
        {renderCheckboxGroup("Price", "price", "prices", PRICES)}
        
        {/* Rating (Radio Buttons) */}
        <div className="py-4">
          <button
            onClick={() => toggleSection("rating")}
            className="flex items-center justify-between w-full text-left font-semibold text-zinc-900 dark:text-white mb-2 focus:outline-none"
          >
            Rating
            {openSections["rating"] ? <ChevronUp size={16} className="text-zinc-500" /> : <ChevronDown size={16} className="text-zinc-500" />}
          </button>
          
          {openSections["rating"] && (
            <div className="mt-3 flex flex-col gap-2">
              {["4+", "3+", "All"].map((option) => (
                <label key={option} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="rating"
                      value={option}
                      checked={filters.rating === option}
                      onChange={() => handleRadioChange("rating", option)}
                      className="peer sr-only"
                    />
                    <div className="w-4 h-4 border border-zinc-300 dark:border-zinc-600 rounded-full bg-white dark:bg-zinc-900 peer-checked:border-cp-primary transition-colors"></div>
                    <div className="absolute w-2 h-2 bg-cp-primary rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
                  </div>
                  <span className="text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                    {option === "All" ? "Any Rating" : `${option} Stars & up`}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex flex-col gap-3">
        <button
          onClick={onCloseMobile}
          className="w-full lg:hidden py-2.5 rounded-xl bg-cp-primary text-white font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-cp-primary/20"
        >
          Show {resultsCount} Results
        </button>
        <button
          onClick={onReset}
          className="w-full py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
