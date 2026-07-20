"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare, Sparkles, Target, AlertCircle } from "lucide-react";

export default function AIInterviewCoachSetupPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    jobRole: "Frontend Engineer",
    difficulty: "Medium",
    interviewType: "Technical",
    duration: "15 min",
    aiProvider: "grok",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const setType = (type: string) => {
    setFormData(prev => ({ ...prev, interviewType: type }));
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.jobRole) {
      setError("Please provide a job role.");
      return;
    }

    localStorage.setItem("cp_ai_interview_config", JSON.stringify(formData));
    router.push("/dashboard/ai/interview-coach/session");
  };

  const types = ["Technical", "HR", "Behavioral", "System Design", "Mock Interview"];

  return (
    <div className="w-full max-w-4xl mx-auto pb-12 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
            <MessageSquare size={24} className="text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
            AI Interview Coach
          </h1>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 pl-13">Practice real-world interviews with an intelligent AI that adapts to your answers.</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/50">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
            <Target size={18} className="text-teal-500" />
            Interview Configuration
          </h2>
        </div>
        
        <form onSubmit={handleStart} className="p-6 sm:p-8 space-y-8">
          {error && (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium flex items-center gap-2">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">Interview Type *</label>
              <div className="flex flex-wrap gap-3">
                {types.map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setType(type)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      formData.interviewType === type 
                        ? "bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-500/30" 
                        : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Target Job Role *</label>
              <input 
                type="text" 
                name="jobRole"
                value={formData.jobRole}
                onChange={handleChange}
                placeholder="e.g. Senior Frontend Engineer"
                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500/50 text-zinc-900 dark:text-white transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Difficulty Level</label>
              <select 
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500/50 text-zinc-900 dark:text-white transition-all"
              >
                <option value="Easy">Easy (Intern / Junior)</option>
                <option value="Medium">Medium (Mid-Level)</option>
                <option value="Hard">Hard (Senior)</option>
                <option value="Expert">Expert (Staff / Principal)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Target Duration</label>
              <select 
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500/50 text-zinc-900 dark:text-white transition-all"
              >
                <option value="5 min">5 Minutes (Quick Practice)</option>
                <option value="15 min">15 Minutes (Standard)</option>
                <option value="30 min">30 Minutes (Deep Dive)</option>
                <option value="45 min">45 Minutes (Full Mock)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">AI Provider</label>
              <select 
                name="aiProvider"
                value={formData.aiProvider}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500/50 text-zinc-900 dark:text-white transition-all"
              >
                <option value="grok">🤖 Grok (xAI) - Best for Engineering</option>
                <option value="gemini">✨ Gemini (Google) - Best for HR</option>
                <option value="mock">🧪 Mock Engine (Testing)</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-zinc-100 dark:border-zinc-800/60">
            <button 
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3.5 rounded-xl font-semibold transition-all shadow-md shadow-teal-500/20 hover:shadow-lg hover:shadow-teal-500/30"
            >
              <Sparkles size={18} />
              Start Interview
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
