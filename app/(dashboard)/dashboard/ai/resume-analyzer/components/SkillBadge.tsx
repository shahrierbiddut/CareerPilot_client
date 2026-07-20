import React from "react";

interface Props {
  skill: string;
  type?: "technical" | "soft" | "leadership" | "language" | "framework" | "tool";
}

export default function SkillBadge({ skill, type = "technical" }: Props) {
  const styles = {
    technical: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
    soft: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20",
    leadership: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20",
    language: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
    framework: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20",
    tool: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
  };

  return (
    <span className={`px-3 py-1.5 rounded-lg border text-sm font-medium whitespace-nowrap ${styles[type]} shadow-sm transition-all hover:scale-105 cursor-default`}>
      {skill}
    </span>
  );
}
