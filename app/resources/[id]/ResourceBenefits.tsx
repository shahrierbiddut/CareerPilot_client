"use client";

import { CheckCircle2, TrendingUp, Award, Zap } from "lucide-react";
import { FullResourceData } from "@/app/lib/types";

interface ResourceBenefitsProps {
  resource: FullResourceData;
}

export default function ResourceBenefits({ resource }: ResourceBenefitsProps) {
  return (
    <section className="mt-16">
      <div className="flex items-center gap-3 mb-8">
        <span className="w-1.5 h-8 rounded-full bg-gradient-to-b from-cp-primary to-blue-400 block" />
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
          Why Take This?
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Career Advantages Column */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={24} className="text-cp-primary" />
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Career Advantages</h3>
          </div>
          
          <ul className="space-y-4">
            {resource.benefits?.map((benefit: string, idx: number) => (
              <li key={idx} className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-cp-primary/40 hover:shadow-md transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={16} className="text-cp-primary" />
                </div>
                <span className="text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Skills & Outcomes Column */}
        <div className="space-y-8">
          
          {/* Skills You'll Gain */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Zap size={24} className="text-amber-500" />
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Skills You'll Gain</h3>
            </div>
            
            <div className="flex flex-wrap gap-2.5">
              {resource.skills?.map((skill: string, idx: number) => (
                <span 
                  key={idx}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 shadow-sm flex items-center gap-2 hover:border-cp-primary/50 hover:text-cp-primary transition-colors cursor-default"
                >
                  <Award size={14} className="text-cp-primary opacity-70" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          {/* ROI / Highlight Card */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-cp-primary to-blue-800 text-white shadow-xl shadow-cp-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <h4 className="text-xl font-bold mb-3">Immediate Return on Investment</h4>
              <p className="text-blue-100 font-medium leading-relaxed mb-6">
                Most candidates see results within the first 14 days of applying these frameworks to their active job search.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm text-sm font-bold border border-white/20">
                <TrendingUp size={16} /> Fast-Track Your Career
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
