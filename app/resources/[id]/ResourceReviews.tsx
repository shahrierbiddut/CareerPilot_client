"use client";

import Image from "next/image";
import { Star, MessageSquare } from "lucide-react";
import { FullResourceData, Review } from "@/app/lib/types";

interface ResourceReviewsProps {
  resource: FullResourceData;
}

export default function ResourceReviews({ resource }: ResourceReviewsProps) {
  // Use real reviews if they exist, otherwise fallback to mock reviews
  const reviews: Review[] = resource.reviews || [
    {
      id: "r1",
      authorName: "Michael Chang",
      authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
      authorRole: "Software Engineer",
      rating: 5,
      date: "2 weeks ago",
      comment: "Absolutely incredible resource. I've tried a lot of guides out there, but this one actually broke things down into actionable steps. I saw a 3x increase in interview callbacks within the first month of applying these strategies."
    },
    {
      id: "r2",
      authorName: "Sarah Thompson",
      authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
      authorRole: "Marketing Manager",
      rating: 5,
      date: "1 month ago",
      comment: "Well worth the investment! The templates provided saved me hours of formatting headaches. It's concise, straight to the point, and beautifully designed. Highly recommend to anyone actively job searching."
    },
    {
      id: "r3",
      authorName: "David O'Neil",
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
      authorRole: "Product Designer",
      rating: 4,
      date: "2 months ago",
      comment: "Really solid advice overall. I especially loved the section on negotiation tactics. I just wish there were a few more industry-specific examples for design roles, but the core frameworks are universally applicable."
    }
  ];

  // Calculate Breakdown
  const totalReviews = 124; // Mock a larger number of reviews for the breakdown
  const ratingBreakdown = [
    { stars: 5, percentage: 78 },
    { stars: 4, percentage: 15 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 2 },
    { stars: 1, percentage: 0 },
  ];

  const averageRating = resource.rating;

  return (
    <section className="mt-20 pt-12 border-t border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center gap-3 mb-10">
        <span className="w-1.5 h-8 rounded-full bg-gradient-to-b from-amber-400 to-orange-500 block" />
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white flex items-center gap-3">
          Student Reviews <span className="text-lg font-medium text-zinc-500 dark:text-zinc-400">({totalReviews})</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Rating Breakdown Column */}
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-8">
          
          {/* Average Score */}
          <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm shrink-0 sm:w-1/3 lg:w-full">
            <span className="text-6xl font-black text-zinc-900 dark:text-white tracking-tighter mb-2">
              {averageRating.toFixed(1)}
            </span>
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  size={20} 
                  className={star <= Math.round(averageRating) ? "text-amber-400" : "text-zinc-200 dark:text-zinc-800"} 
                  fill={star <= Math.round(averageRating) ? "currentColor" : "none"} 
                />
              ))}
            </div>
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">
              Based on {totalReviews} reviews
            </span>
          </div>

          {/* Breakdown Bars */}
          <div className="flex-1 space-y-3 p-6 sm:p-0 lg:p-0">
            {ratingBreakdown.map((row) => (
              <div key={row.stars} className="flex items-center gap-3">
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 w-12 shrink-0 flex items-center gap-1">
                  {row.stars} <Star size={12} className="text-zinc-400" fill="currentColor" />
                </span>
                <div className="flex-1 h-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-amber-400"
                    style={{ width: `${row.percentage}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-500 w-9 text-right shrink-0">
                  {row.percentage}%
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Reviews List */}
        <div className="lg:col-span-8 space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="p-6 md:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-start justify-between gap-4 mb-4">
                
                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-zinc-100 dark:ring-zinc-800">
                    <Image src={review.authorAvatar} alt={review.authorName} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white leading-tight">{review.authorName}</h4>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">{review.authorRole}</span>
                  </div>
                </div>

                {/* Rating & Date */}
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < review.rating ? "text-amber-400" : "text-zinc-200 dark:text-zinc-800"} 
                        fill={i < review.rating ? "currentColor" : "none"} 
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">{review.date}</span>
                </div>
              </div>

              {/* Comment */}
              <div className="relative">
                <MessageSquare size={24} className="absolute -top-1 -left-2 text-zinc-100 dark:text-zinc-800/50 -z-10 transform -scale-x-100" />
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed z-10 relative">
                  "{review.comment}"
                </p>
              </div>
            </div>
          ))}
          
          <button className="w-full py-4 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-cp-primary transition-colors">
            Load More Reviews
          </button>
        </div>
      </div>
    </section>
  );
}
