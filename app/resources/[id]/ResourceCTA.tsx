"use client";

import { FileText, Video, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ResourceCTA() {
  return (
    <div className="mt-24 mb-12 relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-zinc-800 shadow-2xl p-10 md:p-16 lg:p-20 text-center flex flex-col items-center">
      
      {/* Background Gradients & Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Core Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-blue-900/20 to-purple-900/40 opacity-80" />
        
        {/* Glowing Orbs */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-cp-primary/30 rounded-full blur-[80px]" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px]" />
        
        {/* Grid Pattern overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-blue-200 text-sm font-semibold mb-6">
          <Sparkles size={16} className="text-blue-300" />
          Take the next step
        </div>
        
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
          Ready to improve your career?
        </h2>
        
        <p className="text-lg text-zinc-300 mb-10 leading-relaxed font-medium max-w-xl mx-auto">
          Put what you've learned into practice. Use our AI-powered tools to instantly optimize your resume or master your interview skills.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link 
            href="/resume-analyzer"
            className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-2xl bg-cp-primary text-white font-bold hover:bg-blue-600 shadow-xl shadow-cp-primary/20 hover:shadow-cp-primary/40 hover:-translate-y-1 transition-all duration-300"
          >
            <FileText size={20} />
            Analyze Resume
            <ArrowRight size={18} className="opacity-70 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            href="/interview-practice"
            className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold hover:bg-white/20 hover:-translate-y-1 transition-all duration-300"
          >
            <Video size={20} />
            Start Interview Practice
          </Link>
        </div>
      </div>
    </div>
  );
}
