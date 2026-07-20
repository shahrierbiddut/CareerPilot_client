"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Edit, Trash2, Download, Share2, Zap, CheckCircle2, AlertTriangle, AlertCircle, Sparkles, FileText, Briefcase, Award, TrendingUp } from "lucide-react";
import Link from "next/link";
import { getResumeById, analyzeResume, deleteResume } from "@/app/lib/resumeApi";
import { useRouter, useParams } from "next/navigation";

export default function ResumeDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  
  const [resume, setResume] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    fetchResume();
  }, [id]);

  const fetchResume = async () => {
    try {
      setIsLoading(true);
      const data = await getResumeById(id);
      setResume(data);
    } catch (error) {
      console.error("Failed to fetch resume", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyze = async () => {
    try {
      setIsAnalyzing(true);
      const data = await analyzeResume(id);
      setResume(data);
    } catch (error) {
      console.error("Failed to analyze resume", error);
      alert("Failed to analyze resume");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this resume?")) return;
    try {
      await deleteResume(id);
      router.push("/dashboard/my-resumes");
    } catch (error) {
      console.error("Failed to delete resume", error);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-20 space-y-4">
        <div className="w-10 h-10 border-4 border-cp-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-zinc-500 font-medium">Loading resume details...</p>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="w-full text-center p-20">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Resume Not Found</h2>
        <p className="text-zinc-500 mb-6">The resume you are looking for does not exist or has been deleted.</p>
        <Link href="/dashboard/my-resumes" className="text-cp-primary hover:underline">Back to My Resumes</Link>
      </div>
    );
  }

  const hasAnalysis = resume.status === "analyzed" && resume.aiAnalysis;

  return (
    <div className="w-full max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard/my-resumes"
            className="p-2 -ml-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                {resume.title}
              </h1>
              {hasAnalysis ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-medium text-xs border border-emerald-200 dark:border-emerald-500/20">
                  <Zap size={12} fill="currentColor" /> Analyzed
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 font-medium text-xs border border-amber-200 dark:border-amber-500/20">
                  Draft
                </span>
              )}
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              {resume.category} • {resume.experienceLevel} • Last updated {new Date(resume.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button onClick={handleDelete} className="p-2.5 text-zinc-500 hover:text-red-600 bg-white dark:bg-zinc-900 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl border border-zinc-200 dark:border-zinc-800 transition-colors shadow-sm">
            <Trash2 size={18} />
          </button>
          <button className="p-2.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-white bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-800 transition-colors shadow-sm">
            <Share2 size={18} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-800 transition-colors shadow-sm">
            <Download size={16} /> Export
          </button>
          <button 
            onClick={handleAnalyze} 
            disabled={isAnalyzing}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-95 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Sparkles size={16} fill="currentColor" />
            )}
            {hasAnalysis ? "Re-Analyze" : "Analyze Resume"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Analytics & Feedback */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Score Gauges */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm overflow-hidden">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6">Resume Analytics</h2>
            
            {!hasAnalysis ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-500 mx-auto mb-4">
                  <Sparkles size={32} />
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Analysis Pending</h3>
                <p className="text-sm text-zinc-500 mb-6 max-w-sm mx-auto">Click "Analyze Resume" to generate scores and detailed AI feedback for this resume.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: "Resume Score", score: resume.resumeScore, color: "text-blue-500" },
                  { label: "ATS Score", score: resume.atsScore, color: "text-emerald-500" },
                  { label: "Readability", score: resume.readabilityScore, color: "text-purple-500" },
                  { label: "Skill Match", score: resume.skillMatchPercent, color: "text-orange-500" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-zinc-800/60 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-100/50 dark:to-zinc-900/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className={`text-4xl font-bold tracking-tight mb-2 ${item.color}`}>{item.score}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">{item.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI Analysis Details */}
          {hasAnalysis && resume.aiAnalysis && (
            <div className="space-y-6 animate-fade-in-up">
              
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-6 text-white shadow-lg shadow-blue-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Sparkles size={120} />
                </div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 relative z-10">
                  <Bot size={24} /> AI Professional Summary
                </h2>
                <p className="text-blue-50 leading-relaxed relative z-10">
                  {resume.aiAnalysis.professionalSummary}
                </p>
                <div className="mt-6 pt-6 border-t border-white/20 relative z-10">
                  <p className="font-semibold mb-2">Overall Feedback</p>
                  <p className="text-sm text-blue-100">{resume.aiAnalysis.overallFeedback}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
                  <h3 className="font-semibold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2">
                    <CheckCircle2 size={18} /> Strengths
                  </h3>
                  <ul className="space-y-3">
                    {resume.aiAnalysis.strengths.map((s: string, i: number) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
                  <h3 className="font-semibold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
                    <AlertTriangle size={18} /> Weaknesses
                  </h3>
                  <ul className="space-y-3">
                    {resume.aiAnalysis.weaknesses.map((w: string, i: number) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></div>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
                  <h3 className="font-semibold text-amber-600 dark:text-amber-400 mb-4 flex items-center gap-2">
                    <AlertCircle size={18} /> Missing Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {resume.aiAnalysis.missingSkills.map((s: string, i: number) => (
                      <span key={i} className="px-3 py-1.5 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-medium rounded-lg border border-amber-200 dark:border-amber-500/20">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
                  <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-2">
                    <Briefcase size={18} /> Recommended Roles
                  </h3>
                  <ul className="space-y-3">
                    {resume.aiAnalysis.recommendedJobRoles.map((r: string, i: number) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm font-medium text-zinc-900 dark:text-white">
                        <div className="mt-1 flex items-center justify-center w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 shrink-0 text-[10px]">
                          {i+1}
                        </div>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Right Column: Resume Details */}
        <div className="space-y-6">
          
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Document</h2>
              <button className="text-sm font-semibold text-cp-primary hover:text-blue-700 flex items-center gap-1.5 transition-colors">
                <Edit size={14} /> Edit
              </button>
            </div>
            
            <div className="space-y-5">
              <div>
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Target Job Role</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">{resume.targetJobRole || "Not specified"}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {resume.skills.map((s: string, i: number) => (
                    <span key={i} className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-[10px] font-semibold rounded uppercase">
                      {s}
                    </span>
                  ))}
                  {resume.skills.length === 0 && <span className="text-sm text-zinc-500">None specified</span>}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Content Preview</p>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl max-h-64 overflow-y-auto custom-scrollbar">
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap font-mono leading-relaxed">
                    {resume.content}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Simple internal icon for Bot
function Bot(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}
