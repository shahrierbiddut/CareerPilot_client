"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { getInterviewSession } from "@/app/lib/interviewApi";
import { 
  ArrowLeft, Download, Share2, Copy, Sparkles, Target, 
  CheckCircle2, BookOpen, Briefcase, Award, MessageSquare, ChevronDown
} from "lucide-react";

export default function InterviewReportPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [expandedQ, setExpandedQ] = useState<number | null>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInterviewSession(id);
        setData(response);
      } catch (error) {
        console.error("Failed to load interview report");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data || !data.finalReport) {
    return (
      <div className="w-full text-center py-20">
        <p className="text-zinc-500">Report not found or interview not completed.</p>
        <button onClick={() => router.push("/dashboard/ai/interview-coach")} className="mt-4 text-teal-600 font-medium">Go Back</button>
      </div>
    );
  }

  const report = data.finalReport;
  const bd = report.scoreBreakdown || {};

  return (
    <div className="w-full max-w-7xl mx-auto pb-12 animate-fade-in space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <button onClick={() => router.push("/dashboard/ai/interview-coach")} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-2 text-sm font-medium transition-colors mb-2">
            <ArrowLeft size={16} /> Back to Setup
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Interview Report</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Role: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{data.jobRole}</span> • 
            Type: <span className="font-semibold text-zinc-700 dark:text-zinc-300 ml-1">{data.interviewType}</span>
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-teal-500/20">
            <Download size={18} /> Export PDF
          </button>
        </div>
      </div>

      {/* Top Section - Scores */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Overall Score */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <div className="bg-teal-100 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 text-xs font-bold px-2 py-1 rounded-md">
              {data.aiProvider === "grok" ? "🤖 Grok" : data.aiProvider === "gemini" ? "✨ Gemini" : "🧪 Mock"}
            </div>
          </div>
          
          <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-6">Overall Score</h2>
          
          <div className="relative w-32 h-32 flex items-center justify-center mb-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" className="stroke-zinc-100 dark:stroke-zinc-800" strokeWidth="8" fill="none" />
              <circle 
                cx="50" cy="50" r="40" 
                className={`transition-all duration-1000 ease-out ${report.overallScore >= 80 ? 'stroke-emerald-500' : report.overallScore >= 60 ? 'stroke-yellow-500' : 'stroke-red-500'}`}
                strokeWidth="8" fill="none" 
                strokeDasharray={`${(report.overallScore || 0) * 2.51} 251`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-bold text-zinc-900 dark:text-white">{report.overallScore}</span>
            </div>
          </div>
          
          <div className={`px-4 py-1.5 rounded-full text-sm font-bold border ${
            report.hiringReadiness?.includes("Strong") ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20" :
            report.hiringReadiness?.includes("No Hire") ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20" :
            "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-500/10 dark:text-teal-400 dark:border-teal-500/20"
          }`}>
            {report.hiringReadiness || "Needs Review"}
          </div>
        </div>

        {/* Breakdown */}
        <div className="lg:col-span-2 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/10 dark:to-emerald-900/10 border border-teal-100 dark:border-teal-800/30 rounded-3xl p-6 sm:p-8">
          <h2 className="text-lg font-bold text-teal-900 dark:text-teal-400 flex items-center gap-2 mb-6">
            <Award size={20} /> Skill Breakdown
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Communication", score: bd.communication },
              { label: "Technical", score: bd.technical },
              { label: "Problem Solving", score: bd.problemSolving },
              { label: "Confidence", score: bd.confidence },
              { label: "Grammar & Vocab", score: bd.grammar }
            ].map((stat, i) => (
              <div key={i} className="bg-white/60 dark:bg-black/20 p-4 rounded-2xl border border-teal-200 dark:border-teal-800/30 flex items-center justify-between">
                <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{stat.label}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${stat.score >= 80 ? 'bg-emerald-500' : stat.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                      style={{ width: `${stat.score || 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold w-6 text-right text-zinc-900 dark:text-white">{stat.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Interview Log */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <MessageSquare size={22} className="text-teal-500" /> Interview Timeline
          </h2>
          
          <div className="space-y-4">
            {data.questions?.map((q: any, idx: number) => {
              if (!q.userAnswer) return null; // Skip un-answered
              const isExpanded = expandedQ === idx;
              
              return (
                <div key={idx} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm transition-all">
                  {/* Header (Clickable) */}
                  <div 
                    onClick={() => setExpandedQ(isExpanded ? null : idx)}
                    className="p-5 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 flex gap-4 items-start"
                  >
                    <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center shrink-0 text-teal-700 dark:text-teal-300 font-bold text-sm">
                      Q{idx + 1}
                    </div>
                    <div className="flex-1 pr-4">
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 leading-relaxed">{q.question}</p>
                      <div className="flex gap-4 mt-2 text-xs font-semibold">
                        <span className="text-emerald-600 dark:text-emerald-400">Score: {q.evaluation?.answerScore || 0}</span>
                      </div>
                    </div>
                    <ChevronDown size={20} className={`text-zinc-400 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                  </div>
                  
                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="p-5 pt-0 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                      <div className="mt-4 space-y-6">
                        <div>
                          <p className="text-xs font-bold text-zinc-500 uppercase mb-2">Your Answer</p>
                          <p className="text-sm text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 whitespace-pre-wrap leading-relaxed">
                            {q.userAnswer}
                          </p>
                        </div>
                        
                        {q.evaluation && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                              <p className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase mb-2 flex items-center gap-1"><CheckCircle2 size={14}/> Strengths</p>
                              <ul className="space-y-1">
                                {q.evaluation.strengths?.map((s: string, i: number) => <li key={i} className="text-sm text-emerald-700 dark:text-emerald-300">• {s}</li>)}
                              </ul>
                            </div>
                            <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-100 dark:border-red-800/30">
                              <p className="text-xs font-bold text-red-800 dark:text-red-400 uppercase mb-2 flex items-center gap-1"><Target size={14}/> To Improve</p>
                              <ul className="space-y-1">
                                {q.evaluation.suggestions?.map((s: string, i: number) => <li key={i} className="text-sm text-red-700 dark:text-red-300">• {s}</li>)}
                              </ul>
                            </div>
                            {q.evaluation.betterAnswer && (
                              <div className="sm:col-span-2 bg-indigo-50 dark:bg-indigo-900/10 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
                                <p className="text-xs font-bold text-indigo-800 dark:text-indigo-400 uppercase mb-2 flex items-center gap-1"><Sparkles size={14}/> Better Answer Example</p>
                                <p className="text-sm text-indigo-700 dark:text-indigo-300 italic">"{q.evaluation.betterAnswer}"</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column - Recommendations */}
        <div className="space-y-6">
          
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2 mb-4">
              <Target size={16} className="text-teal-500" /> Topics to Study
            </h3>
            <div className="flex flex-wrap gap-2">
              {report.recommendedTopics?.map((t: string, i: number) => (
                <span key={i} className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg text-xs font-semibold border border-zinc-200 dark:border-zinc-700">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2 mb-4">
              <Briefcase size={16} className="text-emerald-500" /> Action Plan
            </h3>
            <ul className="space-y-3">
              {report.recommendedPractice?.map((p: string, i: number) => (
                <li key={i} className="text-sm text-zinc-700 dark:text-zinc-300 flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" /> {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2 mb-4">
              <BookOpen size={16} className="text-teal-500" /> Learning Resources
            </h3>
            <ul className="space-y-2">
              {report.learningResources?.map((r: string, i: number) => (
                <li key={i} className="px-3 py-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg text-sm text-zinc-800 dark:text-zinc-200 font-medium">
                  {r}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
