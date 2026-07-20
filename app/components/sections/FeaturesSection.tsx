import {
  FileSearch,
  Mic2,
  BrainCircuit,
  PenLine,
  Map,
  BarChart3,
  Sparkles
} from "lucide-react";
import ScrollReveal from "../ui/ScrollReveal";

const features = [
  {
    icon: FileSearch,
    title: "Resume Analyzer",
    description:
      "AI scans your resume for ATS compatibility, keyword gaps, formatting issues, and scores it against top industry benchmarks.",
    gradient: "from-blue-500 to-blue-700",
    glow: "rgba(37,99,235,0.15)",
    delay: "0ms",
  },
  {
    icon: Mic2,
    title: "Interview Coach",
    description:
      "Practice with AI-generated interview questions tailored to your role. Get instant feedback on your answers and confidence score.",
    gradient: "from-violet-500 to-purple-700",
    glow: "rgba(124,58,237,0.15)",
    delay: "80ms",
  },
  {
    icon: BrainCircuit,
    title: "AI Career Assistant",
    description:
      "Your personal AI career guide available 24/7. Get tailored advice on career moves, skill building, and job search strategies.",
    gradient: "from-teal-500 to-cyan-600",
    glow: "rgba(20,184,166,0.15)",
    delay: "160ms",
  },
  {
    icon: PenLine,
    title: "Cover Letter Generator",
    description:
      "Generate compelling, personalized cover letters in seconds. Tailored to each job description with the right tone and keywords.",
    gradient: "from-rose-500 to-pink-600",
    glow: "rgba(244,63,94,0.15)",
    delay: "240ms",
  },
  {
    icon: Map,
    title: "Career Roadmap",
    description:
      "Visualize your career journey with a custom roadmap. Identify skills to learn, milestones to hit, and timelines to follow.",
    gradient: "from-orange-500 to-amber-600",
    glow: "rgba(249,115,22,0.15)",
    delay: "320ms",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description:
      "Track job applications, interview stages, skill improvements, and overall career health with beautiful dashboards.",
    gradient: "from-emerald-500 to-green-600",
    glow: "rgba(16,185,129,0.15)",
    delay: "400ms",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-white py-16 sm:py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <ScrollReveal className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-cp-primary mb-6">
            <Sparkles size={14} />
            <span>Premium Features</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl mb-4">
            Powerful AI <span className="text-gradient">Career Tools</span>
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Everything you need to land your dream job, powered by advanced artificial intelligence.
          </p>
        </ScrollReveal>

        {/* Feature Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="feature-card group relative flex flex-col rounded-2xl bg-white p-7 transition-all duration-300"
                style={
                  {
                    "--glow": feature.glow,
                    animationDelay: feature.delay,
                    boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                  } as React.CSSProperties
                }
              >
                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${feature.glow} 0%, transparent 70%)`,
                  }}
                />

                {/* Gradient border on hover */}
                <div className="feature-card-border absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Icon */}
                <div
                  className={`relative z-10 mb-5 inline-flex h-13 w-13 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg`}
                  style={{ width: "52px", height: "52px" }}
                >
                  <Icon size={24} className="text-white" />
                </div>

                {/* Title */}
                <h3 className="relative z-10 mb-2.5 text-lg font-bold text-zinc-900 transition-colors group-hover:text-cp-primary">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="relative z-10 flex-1 text-sm leading-relaxed text-zinc-500">
                  {feature.description}
                </p>

                {/* Learn more arrow */}
                <div className="relative z-10 mt-5 flex items-center gap-1.5 text-xs font-semibold text-zinc-500 opacity-60 transition-all duration-300 group-hover:text-cp-primary group-hover:opacity-100 group-hover:translate-x-1 group-hover:drop-shadow-[0_0_8px_rgba(37,99,235,0.4)]">
                  <span>Learn more</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
