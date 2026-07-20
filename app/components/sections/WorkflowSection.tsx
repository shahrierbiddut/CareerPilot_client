import {
  Upload,
  ScanSearch,
  Lightbulb,
  Sparkles,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload Resume",
    description:
      "Upload your existing resume in PDF or DOCX format. Our AI reads every line instantly.",
    gradient: "from-blue-500 to-blue-600",
    color: "#2563EB",
    lightBg: "bg-blue-50",
    lightText: "text-blue-600",
  },
  {
    step: "02",
    icon: ScanSearch,
    title: "AI Analysis",
    description:
      "Deep AI analysis scans for ATS score, formatting, keyword density, and grammar across 50+ criteria.",
    gradient: "from-violet-500 to-purple-600",
    color: "#7C3AED",
    lightBg: "bg-violet-50",
    lightText: "text-violet-600",
  },
  {
    step: "03",
    icon: Lightbulb,
    title: "Skill Detection",
    description:
      "Cross-references your extracted skills against millions of live job postings to identify critical gaps and benchmark your proficiency for target roles.",
    gradient: "from-amber-500 to-orange-500",
    color: "#F59E0B",
    lightBg: "bg-amber-50",
    lightText: "text-amber-600",
  },
  {
    step: "04",
    icon: Sparkles,
    title: "Smart Recommendations",
    description:
      "Personalized AI recommendations to improve your resume, close skill gaps, and boost your profile.",
    gradient: "from-teal-500 to-cyan-500",
    color: "#14B8A6",
    lightBg: "bg-teal-50",
    lightText: "text-teal-600",
  },
  {
    step: "05",
    icon: TrendingUp,
    title: "Career Improvement Plan",
    description:
      "Receive a structured roadmap with milestones, recommended courses, and a clear timeline to succeed.",
    gradient: "from-rose-500 to-pink-500",
    color: "#F43F5E",
    lightBg: "bg-rose-50",
    lightText: "text-rose-600",
  },
  {
    step: "06",
    icon: CheckCircle2,
    title: "Interview Ready",
    description:
      "Practice AI mock interviews, refine your answers, and walk into every interview with full confidence.",
    gradient: "from-emerald-500 to-green-500",
    color: "#10B981",
    lightBg: "bg-emerald-50",
    lightText: "text-emerald-600",
  },
];

import ScrollReveal from "../ui/ScrollReveal";

export default function WorkflowSection() {
  return (
    <section className="relative bg-white py-16 sm:py-24 overflow-hidden">
      {/* Subtle gradient background accent */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full opacity-20"
        style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.18) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-cp-primary mb-6">
            <Sparkles size={14} />
            <span>How It Works</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl mb-4">
            AI Workflow <span className="text-gradient">Section</span>
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Visual step-by-step timeline — from raw resume to interview-ready professional.
          </p>
        </ScrollReveal>

        {/* Workflow Timeline */}
        <div className="relative">
          {/* Vertical connector line (desktop) */}
          <div className="absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-px -translate-x-1/2 lg:block"
            style={{ background: "linear-gradient(to bottom, #2563EB, #7C3AED, #14B8A6, #F59E0B, #F43F5E, #10B981)" }}
          />

          <div className="flex flex-col gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={step.step}
                  className={`relative flex flex-col items-center gap-6 lg:flex-row lg:gap-0 ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content Card */}
                  <div className={`flex-1 ${isEven ? "lg:pr-16" : "lg:pl-16"} w-full`}>
                    <div
                      className="workflow-card group relative rounded-2xl bg-white p-6 transition-all duration-300 cursor-default"
                      style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.07)", border: "1px solid rgba(0,0,0,0.06)" }}
                    >
                      {/* Hover accent bar */}
                      <div
                        className="absolute left-0 top-0 h-full w-1 rounded-l-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{ background: `linear-gradient(to bottom, ${step.color}, transparent)` }}
                      />

                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div
                          className={`shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${step.gradient} shadow-md`}
                        >
                          <Icon size={22} className="text-white" />
                        </div>

                        <div>
                          <div className={`mb-1 text-xs font-bold ${step.lightText} uppercase tracking-wider`}>
                            Step {step.step}
                          </div>
                          <h3 className="mb-2 text-lg font-bold text-zinc-900 group-hover:text-zinc-700 transition-colors">
                            {step.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-zinc-500">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center circle on timeline */}
                  <div className="hidden lg:flex shrink-0 z-10 items-center justify-center">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full text-white text-xs font-bold shadow-lg ring-4 ring-white"
                      style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}cc)` }}
                    >
                      {step.step}
                    </div>
                  </div>

                  {/* Mobile step badge */}
                  <div
                    className="lg:hidden flex h-9 w-9 items-center justify-center rounded-full text-white text-xs font-bold shadow-md"
                    style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}cc)` }}
                    aria-hidden="true"
                  >
                    {step.step}
                  </div>

                  {/* Empty spacer for alternating layout */}
                  <div className="hidden flex-1 lg:block" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 flex flex-col items-center gap-4 text-center">
          <p className="text-lg font-semibold text-zinc-700">
            Ready to transform your career?
          </p>
          <a
            href="/get-started"
            className="btn-gradient inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold"
          >
            <Sparkles size={16} />
            Start for Free — No Credit Card Needed
          </a>
        </div>
      </div>
    </section>
  );
}
