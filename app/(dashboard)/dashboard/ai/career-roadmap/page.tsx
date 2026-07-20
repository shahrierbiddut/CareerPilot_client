"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Map, AlertCircle } from "lucide-react";

export default function AICareerRoadmapPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    goal: "Become a Senior Frontend Engineer",
    targetRole: "Senior Frontend Engineer",
    experienceLevel: "Mid-Level",
    industry: "Technology",
    skills: "React, TypeScript, CSS",
    country: "Global",
    expectedSalary: "$100,000",
    learningTimePerWeek: "10 hours",
    aiProvider: "grok",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.goal || !formData.targetRole) {
      setError("Please provide a career goal and target role.");
      return;
    }

    // Save pending data to local storage so the thinking page can pick it up
    localStorage.setItem("cp_ai_pending_roadmap", JSON.stringify({
      ...formData,
      skills: formData.skills.split(",").map(s => s.trim()).filter(Boolean)
    }));

    router.push("/dashboard/ai/career-roadmap/thinking");
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-12 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Map size={24} className="text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
            AI Career Roadmap
          </h1>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 pl-13">Generate a personalized career growth roadmap based on your goals, skills, and experience.</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/50">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
            <Sparkles size={18} className="text-purple-500" />
            Roadmap Details
          </h2>
        </div>
        
        <form onSubmit={handleGenerate} className="p-6 sm:p-8 space-y-6">
          {error && (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium flex items-center gap-2">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Career Goal *</label>
              <input 
                type="text" 
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                placeholder="e.g. Become a Senior Developer in 1 year"
                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 text-zinc-900 dark:text-white transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Target Job Role *</label>
              <input 
                type="text" 
                name="targetRole"
                value={formData.targetRole}
                onChange={handleChange}
                placeholder="e.g. Senior Frontend Engineer"
                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 text-zinc-900 dark:text-white transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Current Experience Level</label>
              <select 
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 text-zinc-900 dark:text-white transition-all"
              >
                <option value="Student/New Grad">Student / New Grad</option>
                <option value="Entry-Level">Entry-Level (0-2 years)</option>
                <option value="Mid-Level">Mid-Level (3-5 years)</option>
                <option value="Senior">Senior (6-10 years)</option>
                <option value="Executive">Executive (10+ years)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Preferred Industry</label>
              <select 
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 text-zinc-900 dark:text-white transition-all"
              >
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Web3/Crypto">Web3 / Crypto</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Current Skills (Comma separated)</label>
              <input 
                type="text" 
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g. React, TypeScript, Node.js, Communication"
                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 text-zinc-900 dark:text-white transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Preferred Country / Region</label>
              <input 
                type="text" 
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="e.g. USA, Remote, Europe"
                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 text-zinc-900 dark:text-white transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Expected Salary (Optional)</label>
              <input 
                type="text" 
                name="expectedSalary"
                value={formData.expectedSalary}
                onChange={handleChange}
                placeholder="e.g. $120k - $150k"
                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 text-zinc-900 dark:text-white transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Learning Time Per Week</label>
              <select 
                name="learningTimePerWeek"
                value={formData.learningTimePerWeek}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 text-zinc-900 dark:text-white transition-all"
              >
                <option value="5 hours">Light (~5 hours/week)</option>
                <option value="10 hours">Moderate (~10 hours/week)</option>
                <option value="20 hours">Intensive (~20 hours/week)</option>
                <option value="40 hours">Full-Time (~40+ hours/week)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">AI Provider</label>
              <select 
                name="aiProvider"
                value={formData.aiProvider}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 text-zinc-900 dark:text-white transition-all"
              >
                <option value="grok">🤖 Grok (xAI)</option>
                <option value="gemini">✨ Gemini (Google)</option>
                <option value="mock">🧪 Mock Engine (Fallback)</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
            <button 
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30"
            >
              <Sparkles size={18} />
              Generate AI Roadmap
            </button>
            <button 
              type="button"
              onClick={() => setFormData({ goal: "", targetRole: "", experienceLevel: "Mid-Level", industry: "Technology", skills: "", country: "", expectedSalary: "", learningTimePerWeek: "10 hours", aiProvider: "grok" })}
              className="px-6 py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-semibold rounded-xl transition-colors"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
