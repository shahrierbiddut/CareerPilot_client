"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Map, Zap, Target, Search, CheckCircle2 } from "lucide-react";
import { generateCareerRoadmap } from "@/app/lib/careerRoadmapApi";

const THINKING_STEPS = [
  { text: "Analyzing your career profile...", icon: Search, duration: 1500 },
  { text: "Mapping skill gaps...", icon: Target, duration: 2000 },
  { text: "Generating personalized learning path...", icon: Map, duration: 2500 },
  { text: "Building interview & job strategy...", icon: Zap, duration: 2000 },
  { text: "Finalizing your career roadmap...", icon: CheckCircle2, duration: 1500 },
];

export default function AIThinkingRoadmapPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const animateSteps = (stepIndex: number) => {
      if (stepIndex >= THINKING_STEPS.length - 1) return;
      
      timeoutId = setTimeout(() => {
        setCurrentStep(stepIndex + 1);
        animateSteps(stepIndex + 1);
      }, THINKING_STEPS[stepIndex].duration);
    };

    animateSteps(0);

    const runRoadmapGeneration = async () => {
      try {
        const storedData = localStorage.getItem("cp_ai_pending_roadmap");
        if (!storedData) {
          throw new Error("No pending roadmap data found");
        }

        const parsedData = JSON.parse(storedData);
        
        // Ensure minimum animation time
        const startTime = Date.now();
        
        // Call API
        const response = await generateCareerRoadmap(parsedData);
        
        const elapsedTime = Date.now() - startTime;
        const minimumWaitTime = 6000; 

        if (elapsedTime < minimumWaitTime) {
          await new Promise(resolve => setTimeout(resolve, minimumWaitTime - elapsedTime));
        }

        setCurrentStep(THINKING_STEPS.length - 1);
        
        setTimeout(() => {
          localStorage.removeItem("cp_ai_pending_roadmap");
          router.push(`/dashboard/ai/career-roadmap/report/${response._id}`);
        }, 800);

      } catch (err: any) {
        console.error("Roadmap Generation failed:", err);
        setError(err.message || "Something went wrong.");
      }
    };

    runRoadmapGeneration();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [router]);

  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto py-20 flex flex-col items-center justify-center text-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <span className="text-2xl">❌</span>
        </div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Generation Failed</h2>
        <p className="text-red-500 mb-6">{error}</p>
        <button 
          onClick={() => router.push("/dashboard/ai/career-roadmap")}
          className="px-6 py-2.5 bg-zinc-900 text-white rounded-xl font-medium"
        >
          Go Back & Try Again
        </button>
      </div>
    );
  }

  const CurrentIcon = THINKING_STEPS[currentStep].icon;

  return (
    <div className="w-full max-w-2xl mx-auto min-h-[60vh] flex flex-col items-center justify-center animate-fade-in">
      
      {/* Cinematic Pulsing Orb */}
      <div className="relative w-32 h-32 mb-12 flex items-center justify-center">
        <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-20 duration-1000"></div>
        <div className="absolute inset-2 bg-indigo-500 rounded-full animate-ping opacity-30 duration-700 delay-100"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-full blur-xl opacity-40 animate-pulse"></div>
        
        <div className="relative z-10 w-20 h-20 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center shadow-2xl border border-zinc-100 dark:border-zinc-800">
          <CurrentIcon size={32} className="text-purple-600 animate-bounce-slow" />
        </div>
      </div>

      <div className="text-center w-full relative h-16">
        {THINKING_STEPS.map((step, index) => (
          <h2 
            key={index}
            className={`absolute inset-0 text-xl md:text-2xl font-bold text-zinc-900 dark:text-white transition-all duration-500 ${
              index === currentStep 
                ? "opacity-100 translate-y-0" 
                : index < currentStep 
                  ? "opacity-0 -translate-y-4" 
                  : "opacity-0 translate-y-4"
            }`}
          >
            {step.text}
          </h2>
        ))}
      </div>

      <div className="w-64 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full mt-8 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full w-full origin-left animate-progress"></div>
      </div>
      
      <p className="mt-6 text-sm text-zinc-500 font-medium tracking-widest uppercase">
        Step {currentStep + 1} of {THINKING_STEPS.length}
      </p>

      <style jsx>{`
        @keyframes progress {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        .animate-progress {
          animation: progress 8s ease-in-out forwards;
        }
        .animate-bounce-slow {
          animation: bounce 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
