import React, { useEffect, useState } from "react";

interface Props {
  score: number;
  label: string;
  size?: "sm" | "md" | "lg";
  colorClass?: string;
}

export default function ScoreGauge({ score, label, size = "md", colorClass = "text-blue-600 dark:text-blue-400" }: Props) {
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    // Animate score on mount
    const duration = 1500;
    const steps = 60;
    const stepTime = Math.abs(Math.floor(duration / steps));
    let current = 0;
    const increment = score / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setCurrentScore(score);
        clearInterval(timer);
      } else {
        setCurrentScore(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  const sizes = {
    sm: { circle: 80, stroke: 6, text: "text-xl", labelText: "text-xs" },
    md: { circle: 120, stroke: 8, text: "text-3xl", labelText: "text-sm" },
    lg: { circle: 160, stroke: 12, text: "text-5xl", labelText: "text-base" },
  };

  const { circle, stroke, text, labelText } = sizes[size];
  const radius = (circle - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (currentScore / 100) * circumference;

  let scoreColor = colorClass;
  if (!colorClass || colorClass === "text-blue-600 dark:text-blue-400") {
    if (currentScore >= 80) scoreColor = "text-emerald-500";
    else if (currentScore >= 60) scoreColor = "text-amber-500";
    else scoreColor = "text-red-500";
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: circle, height: circle }}>
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${circle} ${circle}`}>
          <circle
            cx={circle / 2}
            cy={circle / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={stroke}
            className="text-zinc-100 dark:text-zinc-800"
          />
          {/* Progress Circle */}
          <circle
            cx={circle / 2}
            cy={circle / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${scoreColor} transition-all duration-300 ease-out`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`${text} font-bold text-zinc-900 dark:text-white`}>{currentScore}</span>
          <span className={`text-[10px] text-zinc-500 font-semibold uppercase tracking-wider`}>Score</span>
        </div>
      </div>
      {label && (
        <span className={`mt-4 font-semibold text-zinc-700 dark:text-zinc-300 ${labelText} text-center`}>
          {label}
        </span>
      )}
    </div>
  );
}
