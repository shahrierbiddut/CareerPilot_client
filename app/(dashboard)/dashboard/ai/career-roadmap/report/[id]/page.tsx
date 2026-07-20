"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { getRoadmapById, updateRoadmapProgress } from "@/app/lib/careerRoadmapApi";
import { 
  ArrowLeft, Download, Share2, Copy, Sparkles,
  Map, Target, Zap, BookOpen, Briefcase, CheckCircle2,
  Clock, GitBranch, Terminal
} from "lucide-react";

// Simple skill badge component
const RoadmapSkillBadge = ({ skill, type = "default" }: { skill: string, type?: "technical" | "soft" | "default" }) => {
  const colors = {
    technical: "bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-500/20",
    soft: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20",
    default: "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700"
  };
  return (
    <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${colors[type]}`}>
      {skill}
    </span>
  );
};

export default function CareerRoadmapReportPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRoadmapById(id);
        setData(response);
        if (response.completedGoals) {
          setCompletedTasks(response.completedGoals);
        }
      } catch (error) {
        console.error("Failed to load roadmap analysis");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const toggleTask = async (taskName: string) => {
    if (isUpdating) return;
    setIsUpdating(true);
    
    let newCompleted = [...completedTasks];
    if (newCompleted.includes(taskName)) {
      newCompleted = newCompleted.filter(t => t !== taskName);
    } else {
      newCompleted.push(taskName);
    }
    
    setCompletedTasks(newCompleted);

    try {
      await updateRoadmapProgress(id, newCompleted);
    } catch (err) {
      console.error("Failed to save progress", err);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full text-center py-20">
        <p className="text-zinc-500">Roadmap not found.</p>
        <button onClick={() => router.push("/dashboard/ai/career-roadmap")} className="mt-4 text-purple-600 font-medium">Go Back</button>
      </div>
    );
  }

  // Calculate Progress
  let totalTasks = 0;
  if (data.timeline) {
    Object.values(data.timeline).forEach((tasks: any) => {
      totalTasks += tasks.length;
    });
  }
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;

  return (
    <div className="w-full max-w-7xl mx-auto pb-12 animate-fade-in space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <button onClick={() => router.push("/dashboard/ai/career-roadmap")} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-2 text-sm font-medium transition-colors mb-2">
            <ArrowLeft size={16} /> Back to Creator
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">AI Career Roadmap</h1>
          <p className="text-sm text-zinc-500 mt-1">Goal: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{data.goal}</span></p>
        </div>
        <div className="flex gap-3">
          <button className="p-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors tooltip" title="Copy Link">
            <Copy size={18} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white text-sm font-semibold transition-colors">
            <Share2 size={18} className="text-zinc-500" /> Share
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-purple-500/20">
            <Download size={18} /> Export PDF
          </button>
        </div>
      </div>

      {/* Exec Summary & Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 border border-purple-100 dark:border-purple-800/30 rounded-3xl p-6 sm:p-8">
          <h2 className="text-lg font-bold text-purple-900 dark:text-purple-400 flex items-center gap-2 mb-4">
            <Sparkles size={20} /> Executive Summary
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm sm:text-base">
            {data.executiveSummary}
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between bg-white/50 dark:bg-black/20 p-4 rounded-2xl border border-purple-200 dark:border-purple-800/30 gap-4">
            <div className="flex-1 text-center sm:text-left">
              <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Current Level</p>
              <p className="text-sm font-medium text-zinc-900 dark:text-white">{data.currentLevel}</p>
            </div>
            <div className="hidden sm:flex text-purple-400 px-4">
              <ArrowLeft size={24} className="rotate-180" />
            </div>
            <div className="flex-1 text-center sm:text-right">
              <p className="text-xs text-purple-500 uppercase font-bold mb-1">Target Level</p>
              <p className="text-sm font-medium text-zinc-900 dark:text-white">{data.targetLevel}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 flex flex-col items-center justify-center shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <div className="bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 text-xs font-bold px-2 py-1 rounded-md">
              {data.aiProvider === "grok" ? "🤖 Grok" : data.aiProvider === "gemini" ? "✨ Gemini" : "🧪 Mock"}
            </div>
          </div>
          
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-6">Roadmap Progress</h3>
          
          {/* Circular Progress */}
          <div className="relative w-32 h-32 flex items-center justify-center mb-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" className="stroke-zinc-100 dark:stroke-zinc-800" strokeWidth="8" fill="none" />
              <circle 
                cx="50" cy="50" r="40" 
                className="stroke-purple-500 transition-all duration-1000 ease-out" 
                strokeWidth="8" fill="none" 
                strokeDasharray={`${progressPercent * 2.51} 251`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-bold text-zinc-900 dark:text-white">{progressPercent}%</span>
            </div>
          </div>
          
          <div className="flex gap-4 text-center">
            <div>
              <p className="text-xl font-bold text-zinc-900 dark:text-white">{completedTasks.length}</p>
              <p className="text-xs text-zinc-500">Completed</p>
            </div>
            <div className="w-px bg-zinc-200 dark:bg-zinc-800"></div>
            <div>
              <p className="text-xl font-bold text-zinc-900 dark:text-white">{totalTasks - completedTasks.length}</p>
              <p className="text-xs text-zinc-500">Pending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Timeline & Skills */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Timeline Section */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-6">
              <Map size={20} className="text-indigo-500" /> Interactive Career Timeline
            </h2>
            
            <div className="space-y-8 pl-2">
              {[
                { title: "First 30 Days", data: data.timeline?.days30 },
                { title: "60 Days", data: data.timeline?.days60 },
                { title: "90 Days", data: data.timeline?.days90 },
                { title: "6 Months", data: data.timeline?.months6 },
                { title: "1 Year", data: data.timeline?.year1 },
              ].map((phase, i) => (
                <div key={i} className="relative">
                  {/* Vertical Line */}
                  {i < 4 && <div className="absolute left-2.5 top-8 bottom-[-2rem] w-px bg-zinc-200 dark:bg-zinc-800"></div>}
                  
                  <div className="flex items-start gap-4">
                    <div className="w-5 h-5 mt-1 rounded-full bg-indigo-100 dark:bg-indigo-900 border-4 border-white dark:border-zinc-900 z-10 shrink-0"></div>
                    <div className="w-full">
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-3">{phase.title}</h4>
                      <div className="space-y-2">
                        {phase.data?.map((task: string, idx: number) => {
                          const isCompleted = completedTasks.includes(task);
                          return (
                            <div 
                              key={idx}
                              onClick={() => toggleTask(task)}
                              className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                                isCompleted 
                                  ? "bg-purple-50 dark:bg-purple-900/10 border-purple-200 dark:border-purple-800/50" 
                                  : "bg-zinc-50 dark:bg-zinc-800/30 border-zinc-200 dark:border-zinc-800 hover:border-purple-300 dark:hover:border-purple-700"
                              }`}
                            >
                              <div className="mt-0.5 shrink-0">
                                {isCompleted ? (
                                  <CheckCircle2 size={18} className="text-purple-600 dark:text-purple-400" />
                                ) : (
                                  <div className="w-[18px] h-[18px] rounded-full border-2 border-zinc-300 dark:border-zinc-600"></div>
                                )}
                              </div>
                              <span className={`text-sm ${isCompleted ? "text-purple-900 dark:text-purple-300 line-through opacity-70" : "text-zinc-700 dark:text-zinc-300"}`}>
                                {task}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Gaps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-4">
                <Terminal size={18} className="text-purple-500" /> Technical Skills to Learn
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.technicalSkills?.map((s: string) => <RoadmapSkillBadge key={s} skill={s} type="technical" />)}
              </div>
            </div>
            
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-4">
                <Target size={18} className="text-indigo-500" /> Soft Skills to Develop
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.softSkills?.map((s: string) => <RoadmapSkillBadge key={s} skill={s} type="soft" />)}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column - Recommendations & Strategies */}
        <div className="space-y-8">
          
          {/* Job Matches */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2 mb-4">
              <Briefcase size={16} className="text-purple-500" /> Target Roles
            </h3>
            <ul className="space-y-2">
              {data.recommendations?.jobs?.map((job: string, i: number) => (
                <li key={i} className="px-3 py-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg text-sm text-zinc-800 dark:text-zinc-200 font-medium">
                  {job}
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Materials */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2 mb-4">
              <BookOpen size={16} className="text-indigo-500" /> Recommended Learning
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-zinc-500 mb-2">Courses</p>
                <ul className="space-y-1">
                  {data.courses?.map((c: string, i: number) => <li key={i} className="text-sm text-zinc-700 dark:text-zinc-300">• {c}</li>)}
                </ul>
              </div>
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <p className="text-xs font-semibold text-zinc-500 mb-2">Books</p>
                <ul className="space-y-1">
                  {data.books?.map((b: string, i: number) => <li key={i} className="text-sm text-zinc-700 dark:text-zinc-300">• {b}</li>)}
                </ul>
              </div>
            </div>
          </div>

          {/* Projects & GitHub */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2 mb-4">
              <GitBranch size={16} className="text-purple-500" /> Portfolio Projects
            </h3>
            <ul className="space-y-3">
              {data.projects?.map((proj: string, i: number) => (
                <li key={i} className="text-sm text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800">
                  {proj}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
