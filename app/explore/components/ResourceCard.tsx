"use client";

import Image from "next/image";
import { ArrowRight, BookOpen, Play, FileText, Star, Clock, Bookmark } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export type ResourceType = "Guide" | "Video" | "Course" | "Template" | "Article";

export interface ResourceData {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  type: ResourceType;
  level: string;
  industry: string;
  date: string;
  readTime: string;
  rating: number;
  image: string;
  gradient: string;
  author: {
    name: string;
    avatar: string;
  };
}

interface ResourceCardProps {
  resource: ResourceData;
  viewMode?: "grid" | "list";
}

export default function ResourceCard({ resource, viewMode = "grid" }: ResourceCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Helper to get the right icon based on type
  const getTypeIcon = (type: ResourceType) => {
    switch (type) {
      case "Video":
      case "Course":
        return <Play size={12} className="text-white" fill="currentColor" />;
      case "Template":
        return <FileText size={12} className="text-white" />;
      case "Guide":
      case "Article":
      default:
        return <BookOpen size={12} className="text-white" />;
    }
  };

  // Helper to format difficulty color
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400";
      case "intermediate":
        return "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400";
      case "advanced":
        return "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400";
      case "senior":
        return "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400";
      default:
        return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    setIsBookmarked(!isBookmarked);
  };

  if (viewMode === "list") {
    return (
      <Link href={`/resources/${resource.id}`} className="group flex flex-col sm:flex-row h-full sm:h-48 rounded-2xl bg-white dark:bg-[#111] overflow-hidden border border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:shadow-[0_16px_40px_rgba(37,99,235,0.12)] hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative h-48 sm:h-full w-full sm:w-64 overflow-hidden bg-zinc-100 dark:bg-zinc-900 shrink-0">
          <div className={`absolute inset-0 z-10 bg-gradient-to-t ${resource.gradient} mix-blend-multiply opacity-60 group-hover:opacity-40 transition-opacity duration-300`} />
          <Image
            src={resource.image}
            alt={resource.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 dark:bg-black/80 backdrop-blur-md px-3 py-1 text-xs font-bold text-zinc-900 dark:text-white shadow-sm">
              {resource.category}
            </span>
            <button 
              onClick={handleBookmark}
              className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md shadow-sm border transition-colors ${
                isBookmarked 
                  ? "bg-cp-primary border-cp-primary text-white" 
                  : "bg-black/40 border-white/10 text-white hover:bg-black/60"
              }`}
            >
              <Bookmark size={14} fill={isBookmarked ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getLevelColor(resource.level)}`}>
                {resource.level}
              </span>
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                {getTypeIcon(resource.type)} {resource.type}
              </span>
            </div>
            <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded text-xs font-semibold text-amber-600 dark:text-amber-400">
              <Star size={12} fill="currentColor" />
              <span>{resource.rating.toFixed(1)}</span>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white leading-tight mb-2 group-hover:text-cp-primary transition-colors line-clamp-1">
            {resource.title}
          </h3>
          
          <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4 flex-1">
            {resource.excerpt}
          </p>
          
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-3">
              <Image src={resource.author.avatar} alt={resource.author.name} width={24} height={24} className="rounded-full" />
              <div className="text-xs">
                <span className="font-medium text-zinc-900 dark:text-white block">{resource.author.name}</span>
                <span className="text-zinc-500 flex items-center gap-1">{resource.date} <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700 mx-1"></span> <Clock size={10} /> {resource.readTime}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 text-sm font-semibold text-zinc-900 dark:text-white group-hover:bg-cp-primary group-hover:text-white transition-colors">
              View Details <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Default Grid View
  return (
    <Link href={`/resources/${resource.id}`} className="group relative flex flex-col h-full rounded-2xl bg-white dark:bg-[#111] overflow-hidden border border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:shadow-[0_16px_40px_rgba(37,99,235,0.12)] hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 shrink-0">
        <div className={`absolute inset-0 z-10 bg-gradient-to-t ${resource.gradient} mix-blend-multiply opacity-60 group-hover:opacity-40 transition-opacity duration-300`} />
        
        <Image
          src={resource.image}
          alt={resource.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 dark:bg-black/80 backdrop-blur-md px-3 py-1 text-xs font-bold text-zinc-900 dark:text-white shadow-sm">
            {resource.category}
          </span>
          
          <button 
            onClick={handleBookmark}
            className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md shadow-sm border transition-colors ${
              isBookmarked 
                ? "bg-cp-primary border-cp-primary text-white" 
                : "bg-black/40 border-white/10 text-white hover:bg-black/60"
            }`}
          >
            <Bookmark size={14} fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getLevelColor(resource.level)}`}>
              {resource.level}
            </span>
            <span className="flex items-center justify-center h-5 w-5 rounded bg-zinc-100 dark:bg-zinc-800">
              {getTypeIcon(resource.type)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={12} className="text-amber-400" fill="currentColor" />
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{resource.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white leading-snug mb-2 group-hover:text-cp-primary transition-colors line-clamp-2">
          {resource.title}
        </h3>
        
        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-5 flex-1">
          {resource.excerpt}
        </p>
        
        <div className="flex flex-col gap-4 mt-auto border-t border-zinc-100 dark:border-zinc-800 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src={resource.author.avatar} alt={resource.author.name} width={20} height={20} className="rounded-full" />
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{resource.author.name}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-medium">
               <Clock size={10} /> {resource.readTime}
            </div>
          </div>
          
          <div className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 text-sm font-semibold text-zinc-900 dark:text-white group-hover:bg-cp-primary group-hover:text-white transition-colors">
            View Details <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
