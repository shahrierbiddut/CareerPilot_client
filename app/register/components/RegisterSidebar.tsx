import Link from "next/link";
import { Compass, Target, FileText, CheckCircle2, ShieldCheck } from "lucide-react";

export default function RegisterSidebar() {
  const features = [
    {
      title: "Personalized Recommendations",
      description: "Get AI suggestions tailored to your goals.",
      icon: <Compass className="w-5 h-5 text-indigo-100" />,
      color: "bg-indigo-500/20",
    },
    {
      title: "Smart Resume Analysis",
      description: "Optimize your resume for better opportunities.",
      icon: <FileText className="w-5 h-5 text-indigo-100" />,
      color: "bg-indigo-500/20",
    },
    {
      title: "Interview Preparation",
      description: "Practice and ace your interviews with AI.",
      icon: <Target className="w-5 h-5 text-indigo-100" />,
      color: "bg-indigo-500/20",
    },
  ];

  return (
    <div className="hidden lg:flex flex-col w-full max-w-[500px] xl:max-w-[600px] bg-gradient-to-br from-[#3b2781] via-[#5b21b6] to-[#4c1d95] p-12 text-white relative overflow-hidden rounded-[2.5rem] shadow-2xl">
      
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/30 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />
      
      {/* Logo */}
      <div className="relative z-10 mb-12">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-white text-[#5b21b6] flex items-center justify-center font-black text-xl shadow-lg group-hover:scale-105 transition-transform">
            CP
          </div>
          <span className="font-bold text-2xl tracking-tight">CareerPilot AI</span>
        </Link>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <h1 className="text-4xl xl:text-5xl font-bold leading-[1.15] tracking-tight mb-4">
          Create your<br />account <span className="inline-block animate-bounce-slow">✨</span>
        </h1>
        <p className="text-indigo-200 text-lg mb-12 max-w-md">
          Join thousands of professionals and take the next step in your career.
        </p>

        {/* Feature List */}
        <div className="space-y-6 mb-12">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className={`mt-1 flex-shrink-0 w-10 h-10 rounded-xl ${feature.color} border border-white/10 flex items-center justify-center shadow-inner backdrop-blur-sm`}>
                {feature.icon}
              </div>
              <div>
                <h3 className="font-bold text-white text-base leading-tight mb-1">{feature.title}</h3>
                <p className="text-indigo-200/80 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Security Badge */}
        <div className="mt-auto">
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <ShieldCheck className="w-8 h-8 text-indigo-300" />
            <div>
              <p className="text-sm font-semibold text-white">Your data is safe with us.</p>
              <p className="text-xs text-indigo-200/70">We never share your information with anyone.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
