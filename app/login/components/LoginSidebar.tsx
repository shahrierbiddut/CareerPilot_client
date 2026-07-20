import Link from "next/link";
import { LineChart, CheckSquare, Star, Sparkles, TrendingUp } from "lucide-react";

export default function LoginSidebar() {
  const highlights = [
    {
      title: "AI-Powered Insights",
      description: "Get personalized career recommendations based on market trends.",
      icon: <LineChart className="w-5 h-5 text-blue-200" />,
      bg: "bg-blue-500/20",
    },
    {
      title: "Resume Analysis",
      description: "Improve your resume and stand out to top recruiters instantly.",
      icon: <CheckSquare className="w-5 h-5 text-blue-200" />,
      bg: "bg-blue-500/20",
    },
    {
      title: "Interview Coach",
      description: "Practice interviews and boost confidence with live AI feedback.",
      icon: <TrendingUp className="w-5 h-5 text-blue-200" />,
      bg: "bg-blue-500/20",
    },
  ];

  return (
    <div className="hidden lg:flex flex-col w-full max-w-[480px] xl:max-w-[550px] bg-gradient-to-b from-[#2563EB] to-[#1e40af] p-12 text-white relative overflow-hidden rounded-[2.5rem] shadow-2xl">
      
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#3b82f6]/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#60a5fa]/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />
      
      {/* Logo */}
      <div className="relative z-10 mb-12">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-white text-[#2563EB] flex items-center justify-center font-black text-xl shadow-lg group-hover:scale-105 transition-transform">
            CP
          </div>
          <span className="font-bold text-2xl tracking-tight">CareerPilot AI</span>
        </Link>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <h1 className="text-4xl xl:text-5xl font-bold leading-[1.15] tracking-tight mb-4">
          Welcome<br />Back!
        </h1>
        <p className="text-blue-100 text-lg mb-12 max-w-sm leading-relaxed">
          Sign in to continue your career growth journey with AI.
        </p>

        {/* Feature List */}
        <div className="space-y-6 mb-12">
          {highlights.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm">
              <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${item.bg} border border-white/10 flex items-center justify-center shadow-inner`}>
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-white text-base leading-tight mb-1">{item.title}</h3>
                <p className="text-blue-100/80 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof Badge */}
        <div className="mt-auto pt-8 border-t border-white/10">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
              ].map((img, i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#1e40af] bg-white overflow-hidden shrink-0">
                  <img src={img} alt="User avatar" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-0.5 text-amber-400 mb-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-xs font-medium text-blue-100">
                Join 50,000+ professionals who are advancing their careers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
