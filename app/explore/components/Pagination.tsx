"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, -1, totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, -1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, -1, currentPage - 1, currentPage, currentPage + 1, -1, totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-8 border-t border-zinc-200 dark:border-zinc-800">
      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        Showing <span className="font-semibold text-zinc-900 dark:text-white">{startItem}</span> to <span className="font-semibold text-zinc-900 dark:text-white">{endItem}</span> of <span className="font-semibold text-zinc-900 dark:text-white">{totalItems}</span> resources
      </div>

      <div className="flex items-center gap-1.5 p-1 rounded-full bg-white dark:bg-[#111] border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-10 h-10 rounded-full text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            page === -1 ? (
              <span key={`ellipsis-${index}`} className="flex items-center justify-center w-8 text-zinc-400">
                <MoreHorizontal size={16} />
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold transition-all duration-300 ${
                  currentPage === page
                    ? "bg-cp-primary text-white shadow-md shadow-cp-primary/30 transform scale-105"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {page}
              </button>
            )
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-10 h-10 rounded-full text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
