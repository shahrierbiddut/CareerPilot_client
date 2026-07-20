"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Tag, BookOpen, ChevronRight, Star, ArrowRight, Target, LayoutTemplate, Info } from "lucide-react";
import type { FullResourceData } from "@/app/lib/types";
import ResourceGallery from "./ResourceGallery";
import ResourceKeyInfo from "./ResourceKeyInfo";
import ResourceBenefits from "./ResourceBenefits";
import ResourceReviews from "./ResourceReviews";
import ResourceShare from "./ResourceShare";
import ResourceRelated from "./ResourceRelated";
import ResourceCTA from "./ResourceCTA";

interface ResourceContentProps {
  resource: FullResourceData;
}

export default function ResourceContent({ resource }: ResourceContentProps) {

  return (
    <div className="bg-zinc-50 dark:bg-[#0a0a14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* ── Main Content Column ── */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-12">

            {/* Gallery Section */}
            {resource.gallery && resource.gallery.length > 0 && (
              <section className="mb-12">
                <ResourceGallery images={resource.gallery} title={resource.title} />
              </section>
            )}

            {/* Enhanced Overview */}
            <section className="space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1.5 h-8 rounded-full bg-gradient-to-b from-cp-primary to-blue-400 block" />
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
                  Overview
                </h2>
              </div>
              
              {/* Executive Summary Callout */}
              <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 rounded-2xl p-6 flex gap-4">
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-cp-primary dark:text-blue-400">
                    <Info size={20} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Executive Summary</h3>
                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                    {resource.summary}
                  </p>
                </div>
              </div>

              {/* Full Description */}
              <div className="prose prose-zinc dark:prose-invert max-w-none">
                <p className="text-zinc-600 dark:text-zinc-400 leading-loose text-lg">
                  {resource.description}
                </p>
              </div>

              {/* Learning Objectives Grid */}
              {resource.objectives && resource.objectives.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                    <Target size={20} className="text-cp-primary" /> Key Objectives
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resource.objectives.map((obj, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-zinc-700 dark:text-zinc-300 font-medium">{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* What You'll Learn */}
            <section className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
                <BookOpen size={20} className="text-cp-primary" />
                What You'll Learn
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {resource.whatYouLearn.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Table of Contents */}
            <section>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-1 h-6 rounded-full bg-gradient-to-b from-cp-primary to-blue-400 block" />
                Table of Contents
              </h2>
              <ol className="space-y-3">
                {resource.tableOfContents.map((item, i) => (
                  <li key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 group hover:border-cp-primary/30 hover:shadow-sm transition-all cursor-pointer">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-cp-primary/10 text-cp-primary text-sm font-bold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-zinc-700 dark:text-zinc-300 font-medium group-hover:text-cp-primary transition-colors">
                      {item}
                    </span>
                    <ChevronRight size={16} className="text-zinc-300 dark:text-zinc-700 ml-auto group-hover:text-cp-primary transition-colors" />
                  </li>
                ))}
              </ol>
            </section>

            {/* Tags */}
            <section>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                <Tag size={18} className="text-cp-primary" /> Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:border-cp-primary/40 hover:text-cp-primary transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </section>

            {/* Benefits & Outcomes */}
            <ResourceBenefits resource={resource} />

            {/* Reviews */}
            <ResourceReviews resource={resource} />

            {/* Share Resource */}
            <ResourceShare />
          </div>

          {/* ── Sidebar ── */}
          <aside className="lg:col-span-5 xl:col-span-4 space-y-6">

            {/* Enhanced Key Info Panel */}
            <ResourceKeyInfo resource={resource} />

            {/* Author Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
              <h3 className="font-bold text-zinc-900 dark:text-white mb-4 text-lg">About the Author</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-zinc-100 dark:ring-zinc-800">
                  <Image src={resource.author.avatar} alt={resource.author.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-bold text-zinc-900 dark:text-white">{resource.author.name}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{resource.author.role}</p>
                </div>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                A highly respected professional in the industry with years of experience helping
                candidates land their dream roles. Known for practical, no-nonsense advice that delivers real results.
              </p>
            </div>
          </aside>
        </div>

        {/* Enhanced Related Resources */}
        <ResourceRelated currentResource={resource} />

        {/* Premium CTA Section */}
        <ResourceCTA />
      </div>
    </div>
  );
}
