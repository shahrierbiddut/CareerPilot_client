"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight, Home, Star, Clock, Bookmark,
  Play, FileText, BookOpen, Share2, ArrowLeft, Users
} from "lucide-react";
import { useState } from "react";

interface ResourceHeroProps {
  resource: {
    title: string;
    category: string;
    type: string;
    level: string;
    industry: string;
    date: string;
    readTime: string;
    rating: number;
    image: string;
    author: {
      name: string;
      avatar: string;
      role: string;
    };
  };
}

export default function ResourceHero({ resource }: ResourceHeroProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Video":
      case "Course":
        return <Play size={16} className="text-white" fill="currentColor" />;
      case "Template":
        return <FileText size={16} className="text-white" />;
      default:
        return <BookOpen size={16} className="text-white" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":   return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20";
      case "intermediate": return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20";
      case "advanced":   return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20";
      case "senior":     return "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20";
      default:           return "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700";
    }
  };

  return (
    <div className="relative w-full min-h-[85vh] flex flex-col justify-center pt-20 lg:pt-28 pb-20 overflow-hidden">

      {/* === Layered Background === */}
      <div className="absolute inset-0 z-0">
        {/* Blurred image base */}
        <Image
          src={resource.image}
          alt="background"
          fill
          className="object-cover blur-[80px] scale-125 opacity-15 dark:opacity-10"
          priority
        />
        {/* Multi-stop gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-zinc-50/95 to-white dark:from-[#070710] dark:via-[#0a0a18]/98 dark:to-[#070710]" />
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(rgba(37,99,235,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.5) 1px, transparent 1px)`,
            backgroundSize: "72px 72px",
          }}
        />
        {/* Ambient glow blobs */}
        <div className="absolute top-24 left-[-10%] w-[500px] h-[500px] bg-cp-primary/8 dark:bg-cp-primary/12 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cp-secondary/8 dark:bg-cp-secondary/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-medium text-zinc-400 dark:text-zinc-500 mb-10 animate-fade-in">
          <Link href="/" className="hover:text-cp-primary transition-colors duration-200 flex items-center gap-1.5 group">
            <Home size={13} className="group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <ChevronRight size={13} className="text-zinc-300 dark:text-zinc-700" />
          <Link href="/explore" className="hover:text-cp-primary transition-colors duration-200">
            Explore
          </Link>
          <ChevronRight size={13} className="text-zinc-300 dark:text-zinc-700" />
          <Link
            href={`/explore?category=${encodeURIComponent(resource.category)}`}
            className="hover:text-cp-primary transition-colors duration-200"
          >
            {resource.category}
          </Link>
          <ChevronRight size={13} className="text-zinc-300 dark:text-zinc-700 hidden md:block" />
          <span className="text-zinc-600 dark:text-zinc-300 truncate max-w-[220px] hidden md:block font-semibold">
            {resource.title}
          </span>
        </nav>

        {/* === Main Hero Grid === */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* ── Left: Text Column ── */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col">

            {/* Badge Row */}
            <div className="flex flex-wrap items-center gap-2.5 mb-7 animate-fade-in" style={{ animationDelay: "80ms" }}>
              {/* Type pill */}
              <div className="flex items-center gap-2 pl-1.5 pr-3.5 py-1.5 rounded-full bg-zinc-900 dark:bg-zinc-800 shadow-lg border border-zinc-700/50">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-cp-primary to-blue-600 shadow-md shadow-cp-primary/30">
                  {getTypeIcon(resource.type)}
                </span>
                <span className="text-[11px] font-extrabold tracking-widest uppercase text-zinc-100">
                  {resource.type}
                </span>
              </div>

              {/* Level pill */}
              <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${getLevelColor(resource.level)}`}>
                {resource.level}
              </span>

              {/* Industry pill */}
              <span className="px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-zinc-100 text-zinc-600 border border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700">
                {resource.industry}
              </span>

              {/* Rating pill */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 dark:bg-amber-500/10 dark:border-amber-500/20">
                <Star size={12} className="text-amber-500" fill="currentColor" />
                <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400">
                  {resource.rating.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1
              className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-extrabold tracking-tight leading-[1.08] text-zinc-900 dark:text-white mb-7 animate-fade-in"
              style={{ animationDelay: "160ms" }}
            >
              {resource.title}
            </h1>

            {/* Divider */}
            <div className="w-20 h-1 rounded-full bg-gradient-to-r from-cp-primary to-blue-400 mb-7 animate-fade-in" style={{ animationDelay: "200ms" }} />

            {/* Author + Meta row */}
            <div
              className="flex flex-wrap items-center gap-5 mb-9 animate-fade-in"
              style={{ animationDelay: "260ms" }}
            >
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-white dark:ring-zinc-800 shadow-md">
                    <Image src={resource.author.avatar} alt={resource.author.name} fill className="object-cover" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-zinc-900" />
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-bold text-zinc-900 dark:text-white">{resource.author.name}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{resource.author.role}</p>
                </div>
              </div>

              <div className="h-9 w-px bg-zinc-200 dark:bg-zinc-700 hidden sm:block" />

              {/* Stat pills */}
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-zinc-400 dark:text-zinc-500">Published</span>
                  <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{resource.date}</span>
                </div>

                <div className="h-9 w-px bg-zinc-200 dark:bg-zinc-700" />

                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-zinc-400 dark:text-zinc-500">Duration</span>
                  <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                    <Clock size={13} className="text-cp-primary" />
                    {resource.readTime}
                  </span>
                </div>

                <div className="h-9 w-px bg-zinc-200 dark:bg-zinc-700" />

                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-zinc-400 dark:text-zinc-500">Learners</span>
                  <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                    <Users size={13} className="text-cp-primary" />
                    12.4k+
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div
              className="flex flex-wrap items-center gap-3 animate-fade-in"
              style={{ animationDelay: "340ms" }}
            >
              <button className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-br from-cp-primary to-blue-700 text-white font-bold text-[15px] shadow-xl shadow-cp-primary/35 hover:shadow-cp-primary/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 overflow-hidden">
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <Play size={17} fill="currentColor" />
                Start Learning Now
              </button>

              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`group inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl font-bold text-[15px] border-2 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] ${
                  isBookmarked
                    ? "bg-cp-primary/10 border-cp-primary text-cp-primary shadow-lg shadow-cp-primary/20"
                    : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-cp-primary/40 hover:text-cp-primary shadow-md hover:shadow-lg hover:shadow-cp-primary/10"
                }`}
              >
                <Bookmark
                  size={18}
                  fill={isBookmarked ? "currentColor" : "none"}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                {isBookmarked ? "Saved" : "Save for Later"}
              </button>

              <button className="group inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-cp-primary/40 hover:text-cp-primary transition-all duration-200 hover:-translate-y-0.5 shadow-md hover:shadow-lg hover:shadow-cp-primary/10">
                <Share2 size={19} className="group-hover:scale-110 transition-transform duration-200" />
              </button>
            </div>

            {/* Back link */}
            <div className="mt-10 animate-fade-in" style={{ animationDelay: "420ms" }}>
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 dark:text-zinc-500 hover:text-cp-primary transition-colors duration-200 group"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
                Back to Explore Resources
              </Link>
            </div>
          </div>

          {/* ── Right: Featured Image ── */}
          <div className="lg:col-span-6 xl:col-span-5 relative animate-fade-in" style={{ animationDelay: "200ms" }}>

            {/* Multi-layer glow behind the image */}
            <div className="absolute inset-[-16px] bg-gradient-to-tr from-cp-primary/20 via-cp-secondary/10 to-transparent rounded-[2.5rem] blur-3xl" />
            <div className="absolute inset-[-8px] bg-gradient-to-br from-cp-primary/10 to-transparent rounded-[2.5rem] blur-xl" />

            {/* Image card */}
            <div className="relative rounded-[28px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.18)] dark:shadow-[0_32px_80px_rgba(0,0,0,0.55)] ring-1 ring-white/30 dark:ring-white/5">

              <div className="relative aspect-[4/3]">
                <Image
                  src={resource.image}
                  alt={resource.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-[1.04]"
                />

                {/* Top-right badge floating */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 text-white text-xs font-bold shadow-xl">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Free Access
                  </div>
                </div>

                {/* Bottom overlay with rating */}
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/75 via-black/30 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 backdrop-blur-lg bg-white/10 border border-white/15 rounded-2xl px-4 py-2.5 shadow-xl">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={13}
                            className={i < Math.round(resource.rating) ? "text-amber-400" : "text-white/30"}
                            fill="currentColor"
                          />
                        ))}
                      </div>
                      <span className="text-white text-xs font-bold">{resource.rating.toFixed(1)}</span>
                      <span className="text-white/60 text-xs">· 2.1k reviews</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating author card */}
            <div className="absolute -bottom-6 -left-4 sm:-left-8 z-30 bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.14)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.4)] border border-zinc-100 dark:border-zinc-800 p-3.5 flex items-center gap-3 min-w-[180px]">
              <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-white dark:ring-zinc-800 shrink-0">
                <Image src={resource.author.avatar} alt={resource.author.name} fill className="object-cover" />
              </div>
              <div className="leading-tight">
                <p className="text-xs font-extrabold text-zinc-900 dark:text-white">{resource.author.name}</p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate max-w-[120px]">{resource.author.role}</p>
              </div>
            </div>

            {/* Floating stat chip */}
            <div className="absolute -top-5 -right-3 sm:-right-6 z-30 bg-gradient-to-br from-cp-primary to-blue-700 rounded-xl shadow-lg shadow-cp-primary/30 px-4 py-2.5 flex items-center gap-2">
              <Users size={14} className="text-white/80" />
              <span className="text-white text-xs font-extrabold">12.4k Learners</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
