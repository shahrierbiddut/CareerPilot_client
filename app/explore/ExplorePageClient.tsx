"use client";

import { useState, useMemo, useEffect } from "react";
import { Sparkles, LibraryBig, Filter, X, Search } from "lucide-react";
import SearchBar from "./components/SearchBar";
import SidebarFilters, { FilterState, Category, CareerLevel, Industry, Difficulty, ResourceType, PriceType, RatingType } from "./components/SidebarFilters";
import SortBar, { SortOption } from "./components/SortBar";
import ResourceCard from "./components/ResourceCard";
import ResourceCardSkeleton from "./components/ResourceCardSkeleton";
import Pagination from "./components/Pagination";
import { getResources } from "@/app/lib/api";
import type { FullResourceData } from "@/app/lib/types";

const INITIAL_FILTERS: FilterState = {
  categories: [],
  levels: [],
  industries: [],
  difficulties: [],
  types: [],
  prices: [],
  rating: "All",
};

export default function ExplorePageClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [sortOrder, setSortOrder] = useState<SortOption>("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [resourcesData, setResourcesData] = useState<FullResourceData[]>([]);
  
  const ITEMS_PER_PAGE = 8;

  // Fetch data from backend
  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        const data = await getResources();
        setResourcesData(data);
      } catch (error) {
        console.error("Failed to fetch resources:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResources();
  }, []);

  // Simulate loading state whenever filters change
  useEffect(() => {
    if (resourcesData.length === 0) return; // Don't trigger on initial load
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600); // 600ms shimmer effect
    
    return () => clearTimeout(timer);
  }, [searchQuery, filters, sortOrder, currentPage, viewMode, resourcesData]);

  // Compute active chips for rendering
  const activeChips = useMemo(() => {
    const chips: { key: keyof FilterState; value: string; label: string }[] = [];
    
    filters.categories.forEach(c => chips.push({ key: 'categories', value: c, label: c }));
    filters.levels.forEach(l => chips.push({ key: 'levels', value: l, label: l }));
    filters.industries.forEach(i => chips.push({ key: 'industries', value: i, label: i }));
    filters.difficulties.forEach(d => chips.push({ key: 'difficulties', value: d, label: d }));
    filters.types.forEach(t => chips.push({ key: 'types', value: t, label: t }));
    filters.prices.forEach(p => chips.push({ key: 'prices', value: p, label: p }));
    
    if (filters.rating !== "All") {
      chips.push({ key: 'rating', value: filters.rating, label: `${filters.rating} Stars` });
    }
    
    return chips;
  }, [filters]);

  const removeChip = (key: keyof FilterState, value: string) => {
    if (key === 'rating') {
      setFilters(prev => ({ ...prev, rating: "All" }));
    } else {
      setFilters(prev => ({
        ...prev,
        [key]: (prev[key] as string[]).filter(v => v !== value)
      }));
    }
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  // Filter and Sort Logic
  const filteredAndSortedResources = useMemo(() => {
    let result = [...resourcesData];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (res) =>
          res.title.toLowerCase().includes(query) ||
          res.excerpt.toLowerCase().includes(query)
      );
    }

    // Array Filters (OR within group, AND between groups)
    if (filters.categories.length > 0) {
      result = result.filter((res) => filters.categories.includes(res.category as Category));
    }
    if (filters.levels.length > 0) {
      result = result.filter((res) => filters.levels.includes(res.level as CareerLevel));
    }
    if (filters.industries.length > 0) {
      result = result.filter((res) => filters.industries.includes(res.industry as Industry));
    }
    if (filters.difficulties.length > 0) {
      // Cast necessary because difficulty isn't officially in the interface yet
      result = result.filter((res) => filters.difficulties.includes((res as any).difficulty));
    }
    if (filters.types.length > 0) {
      result = result.filter((res) => filters.types.includes(res.type));
    }
    if (filters.prices.length > 0) {
      result = result.filter((res) => filters.prices.includes((res as any).price));
    }

    // Rating Filter
    if (filters.rating === "4+") {
      result = result.filter((res) => res.rating >= 4.0);
    } else if (filters.rating === "3+") {
      result = result.filter((res) => res.rating >= 3.0);
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortOrder) {
        case "popular":
          return parseInt(b.id) % 3 - parseInt(a.id) % 3;
        case "highest-rated":
          return b.rating - a.rating;
        case "a-z":
          return a.title.localeCompare(b.title);
        case "updated":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "newest":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    return result;
  }, [searchQuery, filters, sortOrder]);

  // Pagination logic
  const totalItems = filteredAndSortedResources.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  
  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters, sortOrder]);

  const currentResources = filteredAndSortedResources.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black pb-24">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] z-20">
        <div className="absolute inset-0 z-0 opacity-40 dark:opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cp-primary/30 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cp-secondary/30 rounded-full blur-[128px]" />
        </div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50/80 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 text-xs font-semibold text-cp-primary dark:text-blue-400 mb-6 backdrop-blur-sm animate-fade-in">
            <Sparkles size={14} />
            <span>Resource Library</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            Explore <span className="text-gradient">Resources</span>
          </h1>
          
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '200ms' }}>
            Unlock your career potential with our premium collection of resume templates, 
            interview guides, learning paths, and expert articles.
          </p>
          
          <div className="animate-fade-in w-full max-w-3xl mx-auto relative z-30" style={{ animationDelay: '300ms' }}>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        
        {/* Mobile Filter Toggle & Sort (Hidden when using SortBar, but keep toggle for mobile) */}
        <div className="flex items-center justify-between lg:hidden mb-6">
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-medium shadow-sm text-zinc-700 dark:text-zinc-300"
          >
            <Filter size={16} />
            Filters {activeChips.length > 0 && <span className="flex items-center justify-center bg-cp-primary text-white w-5 h-5 rounded-full text-xs">{activeChips.length}</span>}
          </button>
        </div>

        {/* Mobile Filter Modal */}
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileFiltersOpen(false)} />
            <div className="relative w-full max-w-xs h-full bg-white dark:bg-zinc-900 shadow-2xl animate-fade-in">
              <SidebarFilters 
                filters={filters} 
                onFilterChange={setFilters} 
                onReset={handleResetFilters} 
                onCloseMobile={() => setIsMobileFiltersOpen(false)}
                resultsCount={totalItems}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 h-[calc(100vh-8rem)]">
              <SidebarFilters 
                filters={filters} 
                onFilterChange={setFilters} 
                onReset={handleResetFilters} 
                resultsCount={totalItems}
              />
            </div>
          </div>

          {/* Results Area */}
          <div className="flex-1 min-w-0">
            
            {/* New Sort Bar */}
            <SortBar 
              value={sortOrder} 
              onChange={setSortOrder} 
              resultsCount={totalItems} 
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />

            {/* Active Filter Chips */}
            {activeChips.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mr-2">Active Filters:</span>
                {activeChips.map((chip, idx) => (
                  <span 
                    key={`${chip.key}-${idx}`} 
                    className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1 rounded-lg bg-cp-primary/10 border border-cp-primary/20 text-xs font-medium text-cp-primary dark:text-blue-400"
                  >
                    {chip.label}
                    <button 
                      onClick={() => removeChip(chip.key, chip.value)}
                      className="p-0.5 rounded-md hover:bg-cp-primary/20 transition-colors focus:outline-none"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white underline underline-offset-2 ml-2 transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Grid Area */}
            {currentResources.length > 0 ? (
              <div className={
                viewMode === "grid" 
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mb-12"
                  : "flex flex-col gap-4 mb-12"
              }>
                {isLoading 
                  ? Array.from({ length: Math.min(ITEMS_PER_PAGE, totalItems) }).map((_, idx) => (
                      <ResourceCardSkeleton key={idx} viewMode={viewMode} />
                    ))
                  : currentResources.map((resource, index) => (
                      <div 
                        key={resource.id} 
                        className="animate-fade-in opacity-0"
                        style={{ 
                          animationDelay: `${index * 50}ms`,
                          animationFillMode: 'forwards' 
                        }}
                      >
                        <ResourceCard resource={resource} viewMode={viewMode} />
                      </div>
                    ))
                }
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center bg-white dark:bg-[#111] rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 shadow-sm">
                {/* Illustration Container */}
                <div className="relative flex items-center justify-center w-32 h-32 mb-6">
                  <div className="absolute inset-0 bg-cp-primary/10 rounded-full animate-pulse" />
                  <div className="absolute inset-4 bg-cp-primary/20 rounded-full" />
                  <LibraryBig size={40} className="text-cp-primary relative z-10" />
                  
                  {/* Floating Elements for illustration effect */}
                  <div className="absolute top-2 right-2 p-2 bg-white dark:bg-zinc-800 rounded-full shadow-md animate-bounce" style={{ animationDuration: '3s' }}>
                    <Search size={14} className="text-amber-500" />
                  </div>
                  <div className="absolute bottom-2 left-2 p-2 bg-white dark:bg-zinc-800 rounded-full shadow-md animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                    <Filter size={14} className="text-emerald-500" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">
                  No resources found
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 max-w-md mb-8 leading-relaxed">
                  We couldn't find any resources matching your exact criteria. Try tweaking your filters or broadening your search terms to discover more content.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <button 
                    onClick={handleResetFilters}
                    className="px-6 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                  >
                    Reset Filters
                  </button>
                  <button 
                    onClick={() => {
                      setSearchQuery("");
                      handleResetFilters();
                    }}
                    className="px-6 py-3 rounded-xl bg-cp-primary text-white font-semibold hover:bg-blue-700 shadow-lg shadow-cp-primary/30 transition-colors"
                  >
                    Browse All Resources
                  </button>
                </div>
              </div>
            )}

            {totalItems > 0 && (
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
