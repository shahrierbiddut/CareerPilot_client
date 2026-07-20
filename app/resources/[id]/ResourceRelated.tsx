"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import type { FullResourceData } from "@/app/lib/types";
import { getResources } from "@/app/lib/api";

interface ResourceRelatedProps {
  currentResource: FullResourceData;
}

export default function ResourceRelated({ currentResource }: ResourceRelatedProps) {
  const [allRelated, setAllRelated] = useState<FullResourceData[]>([]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const data = await getResources();
        const related = data
          .filter((r: FullResourceData) => r.id !== currentResource.id && r.category === currentResource.category)
          .slice(0, 3);
        
        const fallback = data
          .filter((r: FullResourceData) => r.id !== currentResource.id)
          .slice(0, 3 - related.length);
          
        setAllRelated([...related, ...fallback].slice(0, 3));
      } catch (e) {
        console.error(e);
      }
    };
    fetchRelated();
  }, [currentResource]);

  if (allRelated.length === 0) return null;


  return (
    <div className="mt-20 pt-12 border-t border-zinc-200 dark:border-zinc-800 pb-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-3">
          <span className="w-1.5 h-6 rounded-full bg-cp-primary block" />
          Related Resources
        </h2>
        <Link
          href="/explore"
          className="group flex items-center gap-1.5 text-sm font-semibold text-cp-primary hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
        >
          View All 
          <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {allRelated.map((r) => (
          <Link
            href={`/resources/${r.id}`}
            key={r.id}
            className="group flex flex-col bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-xl hover:shadow-cp-primary/5 hover:border-cp-primary/30 hover:-translate-y-1 transition-all duration-300"
          >
            {/* Image Container */}
            <div className="relative h-48 sm:h-40 overflow-hidden">
              <div className={`absolute inset-0 z-10 bg-gradient-to-t ${r.gradient} opacity-60 mix-blend-multiply dark:mix-blend-overlay`} />
              <Image 
                src={r.image} 
                alt={r.title} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
              />
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-white/95 dark:bg-black/80 text-[11px] font-bold text-zinc-900 dark:text-white backdrop-blur-md shadow-sm border border-white/10 uppercase tracking-wide">
                {r.category}
              </div>
            </div>
            
            {/* Content Container */}
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-3 leading-snug group-hover:text-cp-primary transition-colors line-clamp-2">
                {r.title}
              </h3>
              
              <div className="mt-auto flex items-center justify-between text-sm">
                <span className="font-semibold text-zinc-500 dark:text-zinc-400 px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/50">
                  {r.level}
                </span>
                
                <span className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-white">
                  <Star size={14} className="text-amber-400" fill="currentColor" /> 
                  {r.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
