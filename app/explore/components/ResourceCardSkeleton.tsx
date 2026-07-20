"use client";

interface ResourceCardSkeletonProps {
  viewMode?: "grid" | "list";
}

export default function ResourceCardSkeleton({ viewMode = "grid" }: ResourceCardSkeletonProps) {
  if (viewMode === "list") {
    return (
      <div className="flex flex-col sm:flex-row h-full sm:h-48 rounded-2xl bg-white dark:bg-[#111] overflow-hidden border border-zinc-200 dark:border-zinc-800 animate-pulse">
        {/* Image Placeholder */}
        <div className="h-48 sm:h-full w-full sm:w-64 bg-zinc-200 dark:bg-zinc-800 shrink-0" />
        
        {/* Content Placeholder */}
        <div className="flex flex-col flex-1 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="h-5 w-20 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-4 w-12 bg-zinc-200 dark:bg-zinc-800 rounded" />
          </div>
          
          <div className="h-6 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded mb-3" />
          <div className="space-y-2 mb-4 flex-1">
            <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded" />
          </div>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
            </div>
            <div className="h-8 w-28 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  // Grid View Default
  return (
    <div className="flex flex-col h-full rounded-2xl bg-white dark:bg-[#111] overflow-hidden border border-zinc-200 dark:border-zinc-800 animate-pulse">
      {/* Image Placeholder */}
      <div className="relative h-48 w-full bg-zinc-200 dark:bg-zinc-800">
        <div className="absolute top-4 left-4 h-6 w-24 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
        <div className="absolute top-4 right-4 h-7 w-7 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
      </div>

      {/* Content Placeholder */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="h-5 w-20 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-4 w-12 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>
        
        <div className="h-6 w-full bg-zinc-200 dark:bg-zinc-800 rounded mb-2" />
        <div className="h-6 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded mb-4" />
        
        <div className="space-y-2 mb-6 flex-1">
          <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
          </div>
          <div className="h-8 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
