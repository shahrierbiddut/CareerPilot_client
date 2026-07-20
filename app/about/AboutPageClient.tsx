"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Target,
  Eye,
  Heart,
  BrainCircuit,
  Bot,
  Map,
  MessageSquare,
  FileSearch,
  Wand2,
  UploadCloud,
  LineChart,
  Lightbulb,
  ShieldCheck,
  Lock,
  BookOpen,
  TrendingUp,
  MonitorPlay,
  ArrowRight,
  Database,
  Globe,
  Terminal,
  Cpu,
  CheckCircle2
} from "lucide-react";
import ScrollReveal from "../components/ui/ScrollReveal";
import StatisticsSection from "../components/sections/StatisticsSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import FAQSection from "../components/sections/FAQSection";
import "./about.css";

// ─── DATA ───
const STORY_CARDS = [
  {
    title: "Our Mission",
    icon: Target,
    desc: "To democratize access to elite career coaching by providing intelligent, data-driven AI tools that help professionals land their dream jobs faster.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Our Vision",
    icon: Eye,
    desc: "A world where every job seeker has the exact knowledge, confidence, and preparation needed to succeed in any interview and career transition.",
    color: "from-purple-500 to-fuchsia-500"
  },
  {
    title: "Our Philosophy",
    icon: Heart,
    desc: "We believe that technology should empower human potential. Our AI is designed not to replace human effort, but to augment your capabilities.",
    color: "from-emerald-500 to-teal-500"
  }
];

const FEATURES = [
  { title: "AI Resume Analysis", desc: "Instantly score your resume against ATS algorithms and get line-by-line feedback.", icon: FileSearch, color: "bg-blue-50 text-blue-600" },
  { title: "AI Interview Coach", desc: "Practice with realistic voice or text-based mock interviews tailored to your target role.", icon: Bot, color: "bg-purple-50 text-purple-600" },
  { title: "Career Roadmaps", desc: "Generate step-by-step learning paths to pivot into new industries or earn promotions.", icon: Map, color: "bg-emerald-50 text-emerald-600" },
  { title: "Career Assistant", desc: "24/7 AI chatbot to answer your career questions, write emails, and review offers.", icon: MessageSquare, color: "bg-orange-50 text-orange-600" },
  { title: "ATS Optimization", desc: "Identify missing keywords and reformat your experience to match job descriptions.", icon: Wand2, color: "bg-pink-50 text-pink-600" },
  { title: "Smart Recommendations", desc: "Receive personalized course and project ideas to bridge your skill gaps.", icon: BrainCircuit, color: "bg-teal-50 text-teal-600" }
];

const PROCESS_STEPS = [
  { step: 1, title: "Upload Profile", desc: "Upload your resume or connect your LinkedIn profile.", icon: UploadCloud },
  { step: 2, title: "AI Analysis", desc: "Our engine scans your data against millions of data points.", icon: BrainCircuit },
  { step: 3, title: "Get Recommendations", desc: "Review actionable feedback and customized learning paths.", icon: Lightbulb },
  { step: 4, title: "Accelerate Growth", desc: "Ace your interviews and negotiate better salary offers.", icon: LineChart }
];

const CORE_VALUES = [
  { title: "Innovation", desc: "We constantly push the boundaries of what AI can do for career development.", icon: Lightbulb },
  { title: "Trust", desc: "We provide honest, transparent feedback that actually helps you improve.", icon: ShieldCheck },
  { title: "Privacy", desc: "Your data is yours. We never sell your personal information to third parties.", icon: Lock },
  { title: "Learning", desc: "We foster an environment of continuous education for our users and our team.", icon: BookOpen },
  { title: "Growth", desc: "Every tool we build is focused on one metric: your professional success.", icon: TrendingUp }
];

const TECH_STACK = [
  { name: "React", icon: Globe, color: "text-sky-500" },
  { name: "TypeScript", icon: Terminal, color: "text-blue-600" },
  { name: "Node.js", icon: Database, color: "text-green-500" },
  { name: "MongoDB", icon: Database, color: "text-emerald-500" },
  { name: "LLM (AI)", icon: Cpu, color: "text-purple-500" }
];

export default function AboutPageClient() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      
      {/* ─── HERO SECTION ─── */}
      <section className="about-hero-bg overflow-hidden pt-20 pb-16 px-6 relative border-b border-zinc-200/60">
        <div className="about-shape-blob h-[500px] w-[500px] bg-blue-500/10 -top-20 -right-20 absolute pointer-events-none" />
        <div className="about-shape-blob h-[400px] w-[400px] bg-purple-500/10 top-40 -left-20 absolute pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 pt-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-cp-primary mb-6 shadow-sm">
              <Sparkles size={14} />
              <span>About CareerPilot AI</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-zinc-900 tracking-tight mb-6 leading-[1.1]">
              Empowering Careers <br /> <span className="text-gradient">with AI</span>
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              CareerPilot AI helps professionals create better resumes, prepare for interviews, and accelerate career growth using intelligent, data-driven tools.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── OUR STORY ─── */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STORY_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <ScrollReveal key={card.title} className={`delay-[${i * 100}ms]`}>
                <div className="about-glass-card rounded-3xl p-8 h-full flex flex-col shadow-lg shadow-blue-900/5 bg-white/80">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-6 shadow-md`}>
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 mb-4">{card.title}</h3>
                  <p className="text-zinc-600 leading-relaxed flex-1">{card.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ─── WHY CAREERPILOT AI ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-4">Why CareerPilot AI</h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">Everything you need to land your dream job, all in one intelligent platform.</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <ScrollReveal key={feature.title} className={`delay-[${(i % 3) * 100}ms]`}>
                  <div className="flex gap-4 group">
                    <div className={`shrink-0 w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-cp-primary transition-colors">{feature.title}</h3>
                      <p className="text-zinc-600 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── OUR PROCESS ─── */}
      <section className="py-24 bg-zinc-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <ScrollReveal className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-4">How It Works</h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">A seamless workflow designed to transform your career trajectory in 4 simple steps.</p>
          </ScrollReveal>

          <div className="relative">
            <div className="process-connector" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {PROCESS_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <ScrollReveal key={step.title} className={`delay-[${i * 100}ms]`}>
                    <div className="flex flex-col items-center text-center group">
                      <div className="w-16 h-16 rounded-2xl bg-white shadow-xl shadow-blue-900/5 flex items-center justify-center border border-blue-100 mb-6 relative group-hover:scale-110 transition-transform">
                        <Icon size={28} className="text-cp-primary" />
                        <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold flex items-center justify-center shadow-md">
                          {step.step}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-zinc-900 mb-3">{step.title}</h3>
                      <p className="text-zinc-600 text-sm">{step.desc}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATISTICS ─── */}
      <StatisticsSection />

      {/* ─── OUR CORE VALUES ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="mb-16 md:text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-zinc-600 max-w-2xl md:mx-auto">The principles that guide our team and the products we build.</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_VALUES.map((val, i) => {
              const Icon = val.icon;
              return (
                <ScrollReveal key={val.title} className={`delay-[${(i % 3) * 100}ms]`}>
                  <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100 hover:border-blue-200 hover:shadow-lg transition-all group h-full">
                    <Icon size={32} className="text-cp-primary mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold text-zinc-900 mb-3">{val.title}</h3>
                    <p className="text-zinc-600">{val.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TECH STACK ─── */}
      <section className="py-24 bg-zinc-900 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000&h=1000')] bg-cover bg-center opacity-5" />
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Powered by Modern Technology</h2>
            <p className="text-zinc-400 mb-16 max-w-2xl mx-auto">Built for speed, security, and intelligence using industry-leading frameworks.</p>
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {TECH_STACK.map((tech, i) => {
                const Icon = tech.icon;
                return (
                  <div key={tech.name} className="tech-logo-wrapper flex flex-col items-center gap-3 group cursor-default">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
                      <Icon size={32} className={tech.color} />
                    </div>
                    <span className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors">{tech.name}</span>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── MEET THE PLATFORM (INTERACTIVE) ─── */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-4">Meet the Platform</h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">Get a glimpse of the powerful tools waiting for you inside the dashboard.</p>
          </ScrollReveal>

          <div className="bg-zinc-50 rounded-3xl p-2 md:p-8 border border-zinc-200">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              
              {/* TABS */}
              <div className="w-full md:w-1/3 flex flex-col gap-2 p-4">
                {[
                  { title: "Resume Analyzer", desc: "Line-by-line ATS scoring.", icon: FileSearch },
                  { title: "Interview Coach", desc: "Voice & text mock interviews.", icon: MonitorPlay },
                  { title: "Career Roadmap", desc: "Step-by-step career planning.", icon: Map }
                ].map((tab, i) => (
                  <button
                    key={tab.title}
                    onClick={() => setActiveTab(i)}
                    className={`text-left p-4 rounded-xl transition-all flex gap-4 items-start ${
                      activeTab === i 
                        ? "bg-white shadow-md border border-zinc-200" 
                        : "hover:bg-zinc-100 border border-transparent"
                    }`}
                  >
                    <div className={`mt-1 ${activeTab === i ? "text-cp-primary" : "text-zinc-400"}`}>
                      <tab.icon size={24} />
                    </div>
                    <div>
                      <h4 className={`font-bold ${activeTab === i ? "text-zinc-900" : "text-zinc-600"}`}>{tab.title}</h4>
                      <p className="text-sm text-zinc-500">{tab.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* MOCK PREVIEW */}
              <div className="w-full md:w-2/3 h-[300px] md:h-[400px] rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl relative overflow-hidden flex items-center justify-center">
                <div className="absolute top-0 w-full h-8 bg-zinc-800 border-b border-zinc-700 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                
                {activeTab === 0 && (
                  <div className="text-center animate-fade-in p-8">
                    <div className="w-24 h-24 rounded-full border-4 border-emerald-500 border-t-transparent mx-auto mb-6 flex items-center justify-center animate-spin">
                      <span className="text-2xl font-bold text-white animate-none">85</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Resume Score: Strong</h3>
                    <p className="text-zinc-400">ATS formatting passed. 2 keyword gaps found.</p>
                  </div>
                )}
                {activeTab === 1 && (
                  <div className="text-center animate-fade-in p-8">
                    <MonitorPlay size={64} className="text-blue-500 mx-auto mb-6 opacity-80" />
                    <h3 className="text-2xl font-bold text-white mb-2">&quot;Tell me about a time...&quot;</h3>
                    <div className="w-48 h-2 bg-zinc-800 rounded-full mx-auto mt-6 overflow-hidden">
                      <div className="w-2/3 h-full bg-blue-500 animate-pulse" />
                    </div>
                  </div>
                )}
                {activeTab === 2 && (
                  <div className="text-center animate-fade-in p-8 w-full max-w-sm">
                    <div className="flex flex-col gap-4">
                      <div className="w-full p-4 bg-zinc-800 rounded-lg flex items-center justify-between border border-zinc-700">
                        <span className="text-white font-medium">Learn React Native</span>
                        <CheckCircle2 size={20} className="text-emerald-500" />
                      </div>
                      <div className="w-full p-4 bg-zinc-800 rounded-lg flex items-center justify-between border border-zinc-700">
                        <span className="text-white font-medium">Build 2 mobile apps</span>
                        <div className="w-5 h-5 rounded-full border-2 border-zinc-500" />
                      </div>
                      <div className="w-full p-4 bg-zinc-800/50 rounded-lg flex items-center justify-between border border-zinc-700/50 opacity-50">
                        <span className="text-white font-medium">Apply for Mobile roles</span>
                        <Lock size={16} className="text-zinc-500" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <TestimonialsSection />

      {/* ─── FAQ ─── */}
      <FAQSection />

      {/* ─── CTA ─── */}
      <section className="py-20 relative overflow-hidden bg-zinc-900 border-t border-zinc-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-zinc-900 to-zinc-900" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Ready to land your dream job?
            </h2>
            <p className="text-xl text-zinc-400 mb-10">
              Join thousands of professionals who are accelerating their careers with AI.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/register"
                className="btn-gradient px-8 py-4 rounded-xl text-white font-bold shadow-lg hover:shadow-blue-500/25 transition-all text-lg flex items-center justify-center gap-2"
              >
                Get Started for Free <ArrowRight size={20} />
              </Link>
              <Link
                href="/explore"
                className="px-8 py-4 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-all text-lg border border-white/10 flex items-center justify-center"
              >
                Explore Platform
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
