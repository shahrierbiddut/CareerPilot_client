"use client";
import { ArrowUpRight, Users, Target, FileText, Video } from "lucide-react";
import { useEffect, useState } from "react";

const stats = [
  {
    title: "Resumes Analyzed",
    value: "1.2M+",
    trend: "+24%",
    icon: FileText,
    color: "from-blue-500 to-blue-600",
    chart: "bar",
  },
  {
    title: "Interview Sessions",
    value: "850K+",
    trend: "+18%",
    icon: Video,
    color: "from-violet-500 to-purple-600",
    chart: "line",
  },
  {
    title: "Career Success Rate",
    value: "94.2%",
    trend: "+3.4%",
    icon: Target,
    color: "from-emerald-500 to-green-600",
    chart: "progress",
  },
  {
    title: "Active Users",
    value: "150K+",
    trend: "+42%",
    icon: Users,
    color: "from-amber-500 to-orange-500",
    chart: "sparkline",
  },
];

function MiniBarChart() {
  return (
    <div className="flex items-end gap-1 h-12">
      {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
        <div key={i} className="w-2 rounded-t-sm bg-blue-500/20" style={{ height: "100%" }}>
          <div
            className="w-full rounded-t-sm bg-blue-600 transition-all duration-1000 ease-out animate-grow-up"
            style={{ height: `${h}%` }}
          />
        </div>
      ))}
    </div>
  );
}

function MiniLineChart() {
  return (
    <div className="h-12 w-full flex items-center">
      <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
        <path
          d="M0,35 Q10,25 20,30 T40,20 T60,25 T80,10 T100,5"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-violet-500 drop-shadow-[0_2px_4px_rgba(139,92,246,0.3)] animate-draw-line"
          style={{ strokeDasharray: 200, strokeDashoffset: 0 }}
        />
        <circle cx="100" cy="5" r="4" fill="currentColor" className="text-violet-600 animate-fade-in delay-700" />
      </svg>
    </div>
  );
}

function ProgressCircle() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setTimeout(() => setProgress(94), 300);
  }, []);

  return (
    <div className="relative flex items-center justify-center h-12 w-12">
      <svg className="w-full h-full transform -rotate-90">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-emerald-100" />
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="currentColor"
          strokeWidth="6"
          fill="transparent"
          strokeDasharray="125.6"
          strokeDashoffset={125.6 - (125.6 * progress) / 100}
          strokeLinecap="round"
          className="text-emerald-500 transition-all duration-1500 ease-out"
        />
      </svg>
    </div>
  );
}

function Sparkline() {
  return (
    <div className="h-12 w-full flex items-end gap-0.5">
      {[10, 25, 20, 40, 35, 55, 50, 70, 65, 85, 80, 100].map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-xs bg-gradient-to-t from-orange-500/10 to-orange-500 transition-all duration-700 animate-grow-up"
          style={{ height: `${h}%`, animationDelay: `${i * 50}ms` }}
        />
      ))}
    </div>
  );
}

import ScrollReveal from "../ui/ScrollReveal";
import { Sparkles } from "lucide-react";

export default function StatisticsSection() {
  return (
    <section className="relative bg-[#0A0A0A] py-16 sm:py-24 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cp-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
        
        <ScrollReveal className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-cp-primary mb-6">
            <Sparkles size={14} />
            <span>Platform Growth</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-4">
            Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-cp-primary to-purple-500">Analytics</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Trusted by professionals worldwide to deliver measurable career growth.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="group relative rounded-2xl bg-white/[0.04] border border-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06] hover:border-white/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-8">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10 shadow-lg`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <div className="flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full text-xs font-semibold">
                    <ArrowUpRight size={14} />
                    {stat.trend}
                  </div>
                </div>

                <div>
                  <h3 className="text-zinc-400 text-sm font-medium mb-1">{stat.title}</h3>
                  <div className="text-3xl font-bold text-white mb-6 tracking-tight">
                    {stat.value}
                  </div>

                  {/* Dynamic Chart Area */}
                  <div className="h-12 w-full opacity-80 group-hover:opacity-100 transition-opacity">
                    {stat.chart === "bar" && <MiniBarChart />}
                    {stat.chart === "line" && <MiniLineChart />}
                    {stat.chart === "progress" && <ProgressCircle />}
                    {stat.chart === "sparkline" && <Sparkline />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
