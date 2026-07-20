"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, UploadCloud, FileText, Bot, AlertCircle } from "lucide-react";

export default function AIResumeAnalyzerPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: "",
    category: "Software Engineering",
    targetJobRole: "",
    experienceLevel: "Mid-Level",
    aiProvider: "grok",
    content: "",
    skills: "",
  });

  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit.");
      return;
    }

    setIsUploading(true);
    setError("");

    // Simulate file reading and parsing
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        title: prev.title || file.name.split(".")[0],
        content: `Extracted content from ${file.name}...\n\nExperience:\n- Software Engineer at Tech Corp (2020-2023)\n- Developed scalable web applications using React and Node.js.\n- Increased system performance by 30% through database optimization.\n\nEducation:\n- BS Computer Science\n\nSkills:\nJavaScript, TypeScript, React, Next.js, Node.js, Express, MongoDB, PostgreSQL.`,
      }));
      setIsUploading(false);
    }, 1500);
  };

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      setError("Please provide a resume title and content.");
      return;
    }

    // Save pending data to local storage so the thinking page can pick it up
    localStorage.setItem("cp_ai_pending_resume", JSON.stringify({
      ...formData,
      skills: formData.skills.split(",").map(s => s.trim()).filter(Boolean)
    }));

    router.push("/dashboard/ai/resume-analyzer/thinking");
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-12 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Bot size={24} className="text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
            AI Resume Analyzer
          </h1>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 pl-13">Upload or paste your resume and receive an AI-powered professional career report.</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/50">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
            <FileText size={18} className="text-cp-primary" />
            Resume Input
          </h2>
        </div>
        
        <form onSubmit={handleAnalyze} className="p-6 sm:p-8 space-y-6">
          {error && (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium flex items-center gap-2">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Resume Title *</label>
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Senior Frontend Developer 2024"
                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cp-primary/20 focus:border-cp-primary/50 text-zinc-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Target Job Role</label>
              <input 
                type="text" 
                name="targetJobRole"
                value={formData.targetJobRole}
                onChange={handleChange}
                placeholder="e.g. Lead Frontend Engineer"
                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cp-primary/20 focus:border-cp-primary/50 text-zinc-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Category</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cp-primary/20 focus:border-cp-primary/50 text-zinc-900 dark:text-white"
              >
                <option value="Software Engineering">Software Engineering</option>
                <option value="Product Management">Product Management</option>
                <option value="Data Science">Data Science</option>
                <option value="Design & UX">Design & UX</option>
                <option value="Marketing">Marketing</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Experience Level</label>
              <select 
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cp-primary/20 focus:border-cp-primary/50 text-zinc-900 dark:text-white"
              >
                <option value="Entry-Level">Entry-Level (0-2 years)</option>
                <option value="Mid-Level">Mid-Level (3-5 years)</option>
                <option value="Senior">Senior (6-10 years)</option>
                <option value="Executive">Executive (10+ years)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">AI Provider</label>
              <select 
                name="aiProvider"
                value={formData.aiProvider}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cp-primary/20 focus:border-cp-primary/50 text-zinc-900 dark:text-white"
              >
                <option value="grok">🤖 Grok (xAI)</option>
                <option value="gemini">✨ Gemini (Google)</option>
                <option value="mock">🧪 Mock Engine (Fallback)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">File Upload (Optional)</label>
            <div className="relative border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-8 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-center">
              <input 
                type="file" 
                accept=".pdf,.docx,.txt"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  {isUploading ? (
                    <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <UploadCloud size={24} />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                    {isUploading ? "Extracting text..." : "Click or drag file to upload"}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">Supports PDF, DOCX, TXT (Max 5MB)</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 flex justify-between">
              Resume Content *
              <span className="text-xs font-normal text-zinc-500">Paste your resume text here</span>
            </label>
            <textarea 
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Experience... Education... Skills..."
              rows={8}
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cp-primary/20 focus:border-cp-primary/50 text-zinc-900 dark:text-white resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Specific Skills (Comma separated)</label>
            <input 
              type="text" 
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g. React, TypeScript, Node.js"
              className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cp-primary/20 focus:border-cp-primary/50 text-zinc-900 dark:text-white"
            />
          </div>

          <div className="flex gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
            <button 
              type="submit"
              disabled={isUploading}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-50"
            >
              <Sparkles size={18} />
              Analyze Resume with AI
            </button>
            <button 
              type="button"
              onClick={() => setFormData({ title: "", category: "Software Engineering", targetJobRole: "", experienceLevel: "Mid-Level", aiProvider: "grok", content: "", skills: "" })}
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
