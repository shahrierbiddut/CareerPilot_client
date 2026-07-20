import React from "react";
import { CheckCircle2, Circle } from "lucide-react";

interface Props {
  data: {
    days30: string[];
    days60: string[];
    days90: string[];
    months6: string[];
    year1: string[];
  };
}

export default function RoadmapTimeline({ data }: Props) {
  const roadmapSteps = [
    { label: "First 30 Days", items: data.days30, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
    { label: "60 Days", items: data.days60, color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
    { label: "90 Days", items: data.days90, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10" },
    { label: "6 Months", items: data.months6, color: "text-pink-500", bg: "bg-pink-50 dark:bg-pink-500/10" },
    { label: "1 Year+", items: data.year1, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
  ];

  return (
    <div className="relative pl-6 sm:pl-8 border-l-2 border-zinc-100 dark:border-zinc-800 space-y-12 my-6">
      {roadmapSteps.map((step, index) => (
        <div key={index} className="relative">
          {/* Timeline Dot */}
          <div className={`absolute -left-[31px] sm:-left-[39px] w-6 h-6 rounded-full flex items-center justify-center bg-white dark:bg-zinc-900 ring-4 ring-white dark:ring-zinc-900`}>
            <div className={`w-3 h-3 rounded-full bg-current ${step.color}`} />
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 ${step.color}`}>
              {step.label}
            </h3>
            <ul className="space-y-3">
              {step.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
              {step.items.length === 0 && (
                <li className="text-sm text-zinc-500 italic">No specific actions recommended for this period.</li>
              )}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
