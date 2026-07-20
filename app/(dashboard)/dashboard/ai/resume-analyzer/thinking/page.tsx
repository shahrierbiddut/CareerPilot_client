"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bot, CheckCircle2, Circle } from "lucide-react";
import { analyzeResumeAI } from "@/app/lib/aiApi";

export default function AIThinkingPage() {
  const router = useRouter();
  
  const steps = [
    "Reading Resume Structure...",
    "Extracting Skills & Experience...",
    "Checking ATS Compatibility...",
    "Finding Missing Keywords...",
    "Generating Recommendations...",
    "Preparing Final AI Report..."
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [analysisId, setAnalysisId] = useState<string | null>(null);

  useEffect(() => {
    // Animation sequence
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) return prev + 1;
        return prev;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const runAnalysis = async () => {
      try {
        const pendingData = localStorage.getItem("cp_ai_pending_resume");
        if (!pendingData) {
          router.push("/dashboard/ai/resume-analyzer");
          return;
        }

        const data = JSON.parse(pendingData);
        // Call backend API
        const response = await analyzeResumeAI(data);
        if (response && response._id) {
          setAnalysisId(response._id);
          localStorage.removeItem("cp_ai_pending_resume");
        }
      } catch (error) {
        console.error("AI Analysis failed:", error);
        // Redirect back on error
        setTimeout(() => router.push("/dashboard/ai/resume-analyzer"), 2000);
      }
    };

    runAnalysis();
  }, [router]);

  // When both animation finishes AND API returns, redirect
  useEffect(() => {
    if (currentStep === steps.length - 1 && analysisId) {
      setTimeout(() => {
        router.push(`/dashboard/ai/resume-analyzer/report/${analysisId}`);
      }, 1000);
    }
  }, [currentStep, analysisId, router]);

  return (
    <div className="w-full max-w-2xl mx-auto min-h-[60vh] flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-2xl relative z-10 animate-bounce-slow">
          <Bot size={48} className="text-white" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Agentic AI is Thinking...</h2>
      <p className="text-zinc-500 dark:text-zinc-400 mb-12 text-center max-w-md">
        Our AI is performing a deep analysis of your resume against industry standards and ATS requirements.
      </p>

      <div className="w-full max-w-md space-y-4">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 ${
              index < currentStep 
                ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20" 
                : index === currentStep 
                ? "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20 shadow-sm" 
                : "bg-transparent opacity-50"
            } border border-transparent`}
          >
            {index < currentStep ? (
              <CheckCircle2 size={24} className="text-emerald-500 shrink-0 animate-scale-in" />
            ) : index === currentStep ? (
              <div className="w-6 h-6 shrink-0 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Circle size={24} className="text-zinc-300 dark:text-zinc-700 shrink-0" />
            )}
            <span className={`font-medium ${
              index < currentStep ? "text-emerald-700 dark:text-emerald-400" :
              index === currentStep ? "text-blue-700 dark:text-blue-400" :
              "text-zinc-400 dark:text-zinc-600"
            }`}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
