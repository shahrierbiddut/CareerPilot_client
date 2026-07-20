"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { getAnalysisById } from "@/app/lib/aiApi";
import ScoreGauge from "../../components/ScoreGauge";
import RadarChart from "../../components/RadarChart";
import RoadmapTimeline from "../../components/RoadmapTimeline";
import SkillBadge from "../../components/SkillBadge";
import { 
  ArrowLeft, Download, Share2, Copy, AlertTriangle, 
  CheckCircle2, XCircle, TrendingUp, Sparkles, BookOpen, 
  Briefcase, MessageSquare, Map, Clock 
} from "lucide-react";

export default function AIReportDashboard({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAnalysisById(id);
        setData(response);
      } catch (error) {
        console.error("Failed to load analysis");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data || !data.aiAnalysis) {
    return (
      <div className="w-full text-center py-20">
        <p className="text-zinc-500">Analysis not found.</p>
        <button onClick={() => router.push("/dashboard/ai/resume-analyzer")} className="mt-4 text-blue-600 font-medium">Go Back</button>
      </div>
    );
  }

  const { aiAnalysis: ai } = data;

  const radarData = [
    { subject: 'ATS', A: ai.scores.ats, fullMark: 100 },
    { subject: 'Format', A: ai.scores.formatting, fullMark: 100 },
    { subject: 'Keywords', A: ai.scores.keywordOptimization, fullMark: 100 },
    { subject: 'Skills', A: ai.scores.skillMatch, fullMark: 100 },
    { subject: 'Industry', A: ai.scores.industryMatch, fullMark: 100 },
    { subject: 'Readability', A: ai.scores.readability, fullMark: 100 },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto pb-12 animate-fade-in space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <button onClick={() => router.push("/dashboard/ai/resume-analyzer")} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-2 text-sm font-medium transition-colors mb-2">
            <ArrowLeft size={16} /> Back to Analyzer
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">AI Resume Report</h1>
          <p className="text-sm text-zinc-500 mt-1">Generated for: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{data.title}</span></p>
        </div>
        <div className="flex gap-3">
          <button className="p-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors tooltip" title="Copy Link">
            <Copy size={18} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white text-sm font-semibold transition-colors">
            <Share2 size={18} className="text-zinc-500" /> Share
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-blue-500/20">
            <Download size={18} /> Export PDF
          </button>
        </div>
      </div>

      {/* Exec Summary & Main Scores */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border border-blue-100 dark:border-blue-800/30 rounded-3xl p-6 sm:p-8">
          <h2 className="text-lg font-bold text-blue-900 dark:text-blue-400 flex items-center gap-2 mb-4">
            <Sparkles size={20} /> Executive Summary
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm sm:text-base">
            {ai.executiveSummary}
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 px-4 py-2 rounded-lg text-sm font-semibold border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <span className="text-zinc-500">AI Engine:</span>
              <span className="text-zinc-900 dark:text-white flex items-center gap-1">
                {data.aiProvider === 'grok' && <><span className="text-xl">🤖</span> Grok</>}
                {data.aiProvider === 'gemini' && <><span className="text-xl">✨</span> Gemini</>}
                {(!data.aiProvider || data.aiProvider === 'mock') && <><span className="text-xl">🧪</span> Mock Engine</>}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 px-4 py-2 rounded-lg text-sm font-semibold border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <span className="text-zinc-500">Target Role:</span>
              <span className="text-zinc-900 dark:text-white">{data.targetJobRole || "Not specified"}</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 px-4 py-2 rounded-lg text-sm font-semibold border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <span className="text-zinc-500">AI Confidence:</span>
              <span className="text-emerald-600 dark:text-emerald-400">{ai.scores.confidence}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 flex flex-col items-center justify-center shadow-sm">
          <ScoreGauge score={ai.scores.resume} label="Overall Resume Score" size="lg" />
        </div>
      </div>

      {/* Sub Scores Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: "ATS Compatibility", score: ai.scores.ats },
          { label: "Skill Match", score: ai.scores.skillMatch },
          { label: "Formatting", score: ai.scores.formatting },
          { label: "Readability", score: ai.scores.readability },
        ].map((item, i) => (
          <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 flex items-center justify-center shadow-sm">
            <ScoreGauge score={item.score} label={item.label} size="sm" />
          </div>
        ))}
      </div>

      {/* Detailed Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-6">
                <TrendingUp size={18} className="text-emerald-500" /> Key Strengths
              </h3>
              <ul className="space-y-4">
                {ai.strengths.map((str: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-6">
                <AlertTriangle size={18} className="text-amber-500" /> Areas to Improve
              </h3>
              <ul className="space-y-4">
                {ai.weaknesses.map((wk: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                    <XCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                    <span>{wk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Skill Analysis */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-6">Detected Skills</h3>
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Technical</p>
                <div className="flex flex-wrap gap-2">
                  {ai.skillAnalysis.technical.map((s: string) => <SkillBadge key={s} skill={s} type="technical" />)}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Soft & Leadership</p>
                <div className="flex flex-wrap gap-2">
                  {ai.skillAnalysis.soft.map((s: string) => <SkillBadge key={s} skill={s} type="soft" />)}
                  {ai.skillAnalysis.leadership.map((s: string) => <SkillBadge key={s} skill={s} type="leadership" />)}
                </div>
              </div>
            </div>
          </div>

          {/* Missing Skills & Keywords */}
          <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-3xl p-6 sm:p-8">
            <h3 className="text-base font-bold text-red-900 dark:text-red-400 mb-6">Missing Elements (Critical)</h3>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">Missing Skills</p>
                <ul className="space-y-3">
                  {ai.missingSkills.map((ms: any, i: number) => (
                    <li key={i} className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-red-100 dark:border-red-900/30 text-sm">
                      <span className="font-bold text-red-600 dark:text-red-400">{ms.skill}</span>
                      <p className="text-zinc-600 dark:text-zinc-400 mt-1 text-xs">{ms.reason}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">Missing ATS Keywords</p>
                <ul className="space-y-3">
                  {ai.missingKeywords.map((mk: any, i: number) => (
                    <li key={i} className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-red-100 dark:border-red-900/30 text-sm">
                      <span className="font-bold text-zinc-800 dark:text-zinc-200">{mk.keyword}</span> — <span className="text-zinc-500 text-xs">Add to {mk.section}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* Right Col */}
        <div className="space-y-8">
          
          {/* Radar Chart */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-2">Performance Radar</h3>
            <RadarChart data={radarData} />
          </div>

          {/* Priority Actions */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">Priority Actions</h3>
            <div className="space-y-3">
              {ai.priorityImprovements.map((pi: any, i: number) => (
                <div key={i} className="p-3 rounded-xl border border-zinc-100 dark:border-zinc-800/60 flex items-start gap-3">
                  <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${
                    pi.priority === 'high' ? 'bg-red-500' : pi.priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                  }`} />
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 font-medium">{pi.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Career Recommendations */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2 mb-6">
              <Briefcase size={16} className="text-blue-500" /> Career Matches
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-zinc-500 mb-2">Recommended Roles</p>
                <div className="flex flex-wrap gap-2">
                  {ai.careerRecommendations.roles.map((r: string) => (
                    <span key={r} className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-md text-xs font-medium text-zinc-800 dark:text-zinc-200">{r}</span>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <p className="text-xs font-semibold text-zinc-500 mb-2">Est. Salary Range</p>
                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{ai.careerRecommendations.salaryRange}</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Roadmap & Interview Prep */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
        
        {/* Roadmap */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-2">
            <Map size={20} className="text-indigo-500" /> Custom Career Roadmap
          </h2>
          <p className="text-sm text-zinc-500 mb-6">Step-by-step guide to achieving your target role.</p>
          <RoadmapTimeline data={ai.careerRoadmap} />
        </div>

        {/* Interview Prep */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-2">
            <MessageSquare size={20} className="text-purple-500" /> Interview Preparation
          </h2>
          <p className="text-sm text-zinc-500 mb-6">Likely questions based on your resume profile.</p>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-3 bg-zinc-100 dark:bg-zinc-800/50 inline-block px-3 py-1 rounded-lg">Behavioral</h4>
              <ul className="space-y-3">
                {ai.interviewPrep.behavioral.map((q: string, i: number) => (
                  <li key={i} className="text-sm text-zinc-700 dark:text-zinc-300 flex items-start gap-2">
                    <span className="text-purple-500 font-bold">Q:</span> {q}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-3 bg-zinc-100 dark:bg-zinc-800/50 inline-block px-3 py-1 rounded-lg">Technical</h4>
              <ul className="space-y-3">
                {ai.interviewPrep.technical.map((q: string, i: number) => (
                  <li key={i} className="text-sm text-zinc-700 dark:text-zinc-300 flex items-start gap-2">
                    <span className="text-purple-500 font-bold">Q:</span> {q}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 p-4 bg-purple-50 dark:bg-purple-900/10 rounded-2xl border border-purple-100 dark:border-purple-900/30">
            <h4 className="text-sm font-bold text-purple-900 dark:text-purple-400 mb-2 flex items-center gap-2">
              <BookOpen size={16} /> Recommended Learning
            </h4>
            <ul className="text-sm text-zinc-700 dark:text-zinc-300 space-y-2 list-disc list-inside ml-1">
              {ai.learningRecommendations.courses.map((c: string, i: number) => <li key={i}>{c}</li>)}
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
}
