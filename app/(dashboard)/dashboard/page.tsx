import Link from "next/link";
import { Plus, MoreVertical } from "lucide-react";

export default function DashboardHome() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
          Dashboard Home
        </h1>
        <Link 
          href="/my-resumes"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-cp-primary hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cp-primary/30 active:scale-95"
        >
          <Plus size={18} />
          <span>Add Resume</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Resume Score Card (Gauge) */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm hover:shadow-md transition-shadow relative">
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-semibold text-zinc-900 dark:text-white">Resume Score</h3>
            <button className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors">
              <MoreVertical size={18} />
            </button>
          </div>
          
          <div className="flex flex-col items-center justify-center py-4">
            {/* SVG Gauge */}
            <div className="relative w-48 h-24 overflow-hidden flex justify-center">
              {/* Background Track */}
              <svg viewBox="0 0 100 50" className="w-full h-full absolute top-0 left-0">
                <path 
                  d="M 10 50 A 40 40 0 0 1 90 50" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="8" 
                  strokeLinecap="round" 
                  className="text-zinc-100 dark:text-zinc-800"
                />
                {/* Foreground Track (60%) */}
                <path 
                  d="M 10 50 A 40 40 0 0 1 90 50" 
                  fill="none" 
                  stroke="url(#blue-gradient)" 
                  strokeWidth="8" 
                  strokeLinecap="round" 
                  strokeDasharray="125.6" 
                  strokeDashoffset="50.24" // 125.6 * (1 - 0.6)
                  className="drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                />
                <defs>
                  <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Center Text */}
              <div className="absolute bottom-0 text-center w-full flex flex-col items-center justify-end pb-2">
                <span className="text-4xl font-bold text-zinc-900 dark:text-white">60</span>
                <span className="text-xs text-zinc-500 font-medium tracking-wide uppercase mt-1">Score</span>
              </div>
            </div>
            
            <button className="mt-8 px-6 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
              Analyze
            </button>
          </div>
        </div>

        {/* Interview Score Chart */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-semibold text-zinc-900 dark:text-white">Interview Score</h3>
            <button className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors">
              <MoreVertical size={18} />
            </button>
          </div>
          
          <div className="h-40 w-full relative flex items-end justify-between px-2 pb-6">
            {/* Simplified SVG Line Chart */}
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 w-full h-full px-2 pb-6 pt-2">
              <path 
                d="M 0 30 Q 15 20 25 25 T 50 10 T 75 15 T 100 5" 
                fill="none" 
                stroke="url(#green-gradient)" 
                strokeWidth="2.5" 
                className="drop-shadow-md"
              />
              <path 
                d="M 0 30 Q 15 20 25 25 T 50 10 T 75 15 T 100 5 L 100 40 L 0 40 Z" 
                fill="url(#green-fade)" 
                className="opacity-50"
              />
              
              {/* Highlight Point */}
              <circle cx="50" cy="10" r="3" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="50" y1="10" x2="50" y2="40" stroke="#10b981" strokeWidth="1" strokeDasharray="2,2" className="opacity-50" />
              
              <defs>
                <linearGradient id="green-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0ea5e9" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <linearGradient id="green-fade" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute bottom-0 left-0 w-full flex justify-between px-4 text-xs font-medium text-zinc-400">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-sky-400"></div> View</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-emerald-400"></div> 25 bit...</div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Completed Sessions */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Completed Sessions</h3>
          <p className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">3</p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-zinc-600 dark:text-zinc-400">Completed</span>
            </div>
            <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-3 overflow-hidden border border-zinc-200/50 dark:border-zinc-700/50">
              <div className="bg-cp-primary h-full rounded-full transition-all duration-1000 ease-out" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>

        {/* Career Progress */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Career Progress</h3>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-7 invisible">Space</p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-zinc-600 dark:text-zinc-400">Progress</span>
              <span className="font-bold text-zinc-900 dark:text-white">100%</span>
            </div>
            <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-3 overflow-hidden border border-zinc-200/50 dark:border-zinc-700/50">
              <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
