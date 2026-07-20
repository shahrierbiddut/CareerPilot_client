"use client";

import { Star, Clock, Globe, FileType, Calendar, Target, Briefcase, Bookmark, Share2, Download, Heart } from "lucide-react";
import { FullResourceData } from "@/app/lib/types";

interface ResourceKeyInfoProps {
  resource: FullResourceData;
}

export default function ResourceKeyInfo({ resource }: ResourceKeyInfoProps) {
  const infoItems = [
    { label: "Category", value: resource.category, icon: <Target size={16} /> },
    { label: "Career Level", value: resource.level, icon: <Briefcase size={16} /> },
    { label: "Industry", value: resource.industry, icon: <Star size={16} /> },
    { label: "Est. Time", value: resource.readTime, icon: <Clock size={16} /> },
    { label: "Language", value: resource.language, icon: <Globe size={16} /> },
    { label: "Format", value: resource.format, icon: <FileType size={16} /> },
    { label: "Last Updated", value: resource.lastUpdated, icon: <Calendar size={16} /> },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm sticky top-24">
      
      {/* Action Buttons Row */}
      <div className="flex items-center justify-between gap-2 mb-8 pb-6 border-b border-zinc-100 dark:border-zinc-800/60">
        {[
          { icon: <Bookmark size={18} />, label: "Bookmark" },
          { icon: <Heart size={18} />, label: "Save" },
          { icon: <Download size={18} />, label: "Download" },
          { icon: <Share2 size={18} />, label: "Share" }
        ].map((action, idx) => (
          <button 
            key={idx}
            className="flex flex-col items-center gap-1.5 text-zinc-500 dark:text-zinc-400 hover:text-cp-primary dark:hover:text-cp-primary group transition-colors"
            title={action.label}
          >
            <div className="w-10 h-10 rounded-full bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
              {action.icon}
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider">{action.label}</span>
          </button>
        ))}
      </div>

      <h3 className="font-bold text-zinc-900 dark:text-white mb-5 text-lg">Key Information</h3>
      
      <ul className="space-y-4">
        {infoItems.map((item, idx) => (
          <li key={idx} className="flex items-center justify-between text-sm border-b border-zinc-100 dark:border-zinc-800/60 pb-4 last:border-0 last:pb-0">
            <span className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
              <span className="text-zinc-400 dark:text-zinc-500">{item.icon}</span>
              {item.label}
            </span>
            <span className="font-semibold text-zinc-900 dark:text-white text-right max-w-[50%] leading-tight">
              {item.value}
            </span>
          </li>
        ))}
        
        {/* Rating explicit block */}
        <li className="flex items-center justify-between text-sm pt-2">
          <span className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
            <Star size={16} className="text-amber-400" />
            Rating
          </span>
          <span className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-white">
            {resource.rating.toFixed(1)} <span className="text-zinc-400 font-normal">/ 5.0</span>
          </span>
        </li>
      </ul>

      <div className="mt-8 space-y-3 pt-2">
        <button className="w-full py-3.5 rounded-2xl bg-gradient-to-br from-cp-primary to-blue-700 text-white font-bold shadow-lg shadow-cp-primary/30 hover:shadow-cp-primary/50 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2">
          Start Learning Now
        </button>
      </div>
    </div>
  );
}
