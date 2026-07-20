"use client";
import { useState } from "react";
import { Send, CheckCircle2, Sparkles } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <section className="bg-white py-16 sm:py-24 relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 lg:px-8 relative z-10">
        
        <div className="relative rounded-3xl overflow-hidden bg-[#0A0A0A] border border-white/10 shadow-[0_32px_64px_rgba(37,99,235,0.15)]">
          
          {/* Decorative Gradients */}
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cp-primary/30 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/30 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none" />
          
          <div className="relative p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
            
            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-cp-accent mb-6 backdrop-blur-md">
                <Sparkles size={14} />
                <span>Stay Ahead in Your Career</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
                Get weekly career insights.
              </h2>
              <p className="text-lg text-zinc-400 max-w-md mx-auto md:mx-0">
                Join 50,000+ professionals receiving top-tier advice on resume building, interviews, and AI trends.
              </p>
            </div>

            {/* Form / Success State */}
            <div className="w-full max-w-md shrink-0">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm animate-fade-in text-center">
                  <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                    <CheckCircle2 size={24} className="text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">You're on the list!</h3>
                  <p className="text-sm text-zinc-400">Keep an eye on your inbox for the latest updates and resources.</p>
                  <button 
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm font-semibold text-white px-6 py-2.5 rounded-full bg-gradient-to-r from-cp-primary/80 to-purple-600/80 shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] hover:brightness-110 transition-all duration-300"
                  >
                    Subscribe another email
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative group">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cp-primary to-purple-500 opacity-20 group-hover:opacity-40 blur transition duration-500" />
                  <div className="relative flex flex-col sm:flex-row items-center gap-3 p-2 bg-zinc-900/80 border border-white/10 rounded-2xl backdrop-blur-xl">
                    <input
                      type="email"
                      required
                      placeholder="Enter your professional email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === "loading"}
                      className="w-full bg-transparent px-4 py-3 text-white placeholder-zinc-500 focus:outline-none disabled:opacity-50"
                      aria-label="Email address"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-zinc-900 transition-all hover:bg-zinc-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {status === "loading" ? (
                        <div className="h-4 w-4 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          Subscribe <Send size={16} />
                        </>
                      )}
                    </button>
                  </div>
                  <p className="mt-3 text-xs text-zinc-500 text-center sm:text-left px-2">
                    We care about your data. Read our <a href="/privacy" className="underline hover:text-zinc-300">Privacy Policy</a>.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
