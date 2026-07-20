"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle,
  Brain,
  FileText,
  Mic,
  TrendingUp,
  LayoutDashboard,
} from "lucide-react";
import "./hero.css";

const chips = [
  { icon: <Brain size={14} className="text-cp-primary" />, label: "AI Analysis", delay: "0s" },
  { icon: <FileText size={14} className="text-purple-600" />, label: "Resume Builder", delay: "0.6s" },
  { icon: <Mic size={14} className="text-cp-accent" />, label: "Mock Interview", delay: "1.2s" },
  { icon: <TrendingUp size={14} className="text-emerald-600" />, label: "Career Growth", delay: "1.8s" },
];

const trustPoints = [
  "No credit card required",
  "Free plan available",
  "AI-powered results",
];

export default function HeroSection() {
  return (
    <section className="hero-gradient-bg relative min-h-[70vh] overflow-hidden pt-8 pb-16">
      {/* Background blobs */}
      <div className="shape-blob h-96 w-96 bg-blue-400/10 -top-20 -left-20" style={{ position: "absolute" }} />
      <div className="shape-blob h-80 w-80 bg-purple-400/10 top-40 -right-20" style={{ position: "absolute" }} />
      <div className="shape-blob h-60 w-60 bg-teal-400/8 bottom-0 left-1/3" style={{ position: "absolute" }} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">

          {/* ─── LEFT SIDE ─── */}
          <div className="flex flex-col items-start gap-6">

            {/* Trust Badge */}
            <div className="trust-badge animate-badge-pop">
              <Sparkles size={13} />
              <span>Trusted by 21,000+ professionals</span>
            </div>

            {/* Headline */}
            <div className="animate-slide-up-delay-1">
              <h1 className="text-5xl font-bold leading-[1.08] tracking-tight text-zinc-900 lg:text-6xl xl:text-7xl">
                Build Better{" "}
                <span className="text-gradient">Resumes.</span>
                <br />
                Ace Every{" "}
                <span className="text-gradient">Interview.</span>
              </h1>
            </div>

            {/* Subheadline */}
            <p className="animate-slide-up-delay-2 max-w-lg text-lg leading-relaxed text-zinc-500 lg:text-xl">
              AI-powered resume analysis, interview coaching, career planning, and job readiness tools.
            </p>

            {/* Trust points */}
            <ul className="animate-slide-up-delay-3 flex flex-wrap gap-x-5 gap-y-2">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm text-zinc-500">
                  <CheckCircle size={14} className="text-cp-accent shrink-0" />
                  {point}
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="animate-slide-up-delay-4 flex flex-wrap items-center gap-4">
              <Link
                href="/get-started"
                id="hero-get-started-btn"
                className="btn-gradient flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
              >
                Get Started
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/dashboard"
                id="hero-dashboard-btn"
                className="btn-outline flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
              >
                <LayoutDashboard size={16} />
                Get Dashboard
              </Link>
            </div>

            {/* Stat Cards */}
            <div className="animate-slide-up-delay-4 flex flex-wrap gap-4 pt-2">
              <div className="stat-card text-center">
                <p className="text-2xl font-bold text-zinc-900">21K+</p>
                <p className="text-xs font-medium text-zinc-400 mt-0.5">Resumes Analyzed</p>
              </div>
              <div className="stat-card text-center">
                <p className="text-2xl font-bold text-zinc-900">1.8K</p>
                <p className="text-xs font-medium text-zinc-400 mt-0.5">Interview Sessions</p>
              </div>
              <div className="stat-card text-center">
                <p className="text-2xl font-bold text-zinc-900">98%</p>
                <p className="text-xs font-medium text-zinc-400 mt-0.5">Satisfaction Rate</p>
              </div>
            </div>
          </div>

          {/* ─── RIGHT SIDE ─── */}
          <div className="flex items-start justify-center lg:justify-end">

            <div className="relative z-10 flex flex-col items-center gap-3">

              {/* ── 4 chips in 2×2 grid ABOVE robot ── */}
              <div className="grid grid-cols-2 gap-2 w-full">
                {chips.map((chip) => (
                  <div
                    key={chip.label}
                    className="icon-chip animate-float-delayed"
                    style={{ animationDelay: chip.delay }}
                  >
                    {chip.icon}
                    <span>{chip.label}</span>
                  </div>
                ))}
              </div>

              {/* ── Glow blob ── */}
              <div
                className="hero-glow-blob absolute pointer-events-none"
                style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
              />

              {/* ── AI Robot — floats independently ── */}
              <div className="animate-float z-10">
                <Image
                  src="/ai-robot.png"
                  alt="CareerPilot AI Robot Assistant"
                  width={320}
                  height={320}
                  className="drop-shadow-2xl"
                  priority
                />
              </div>

              {/* ── Live AI Analysis card — FIXED, same width as robot (320px) ── */}
              <div className="glass-card w-[320px] rounded-2xl p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-cp-accent animate-pulse" />
                    <span className="text-xs font-semibold text-zinc-600">Live AI Analysis</span>
                  </div>
                  <span className="text-xs font-medium text-cp-accent">Running...</span>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Resume Score", val: 87, color: "bg-cp-primary" },
                    { label: "ATS Match", val: 93, color: "bg-cp-accent" },
                    { label: "Skill Gaps", val: 62, color: "bg-purple-500" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="mb-1 flex justify-between">
                        <span className="text-xs font-medium text-zinc-500">{item.label}</span>
                        <span className="text-xs font-bold text-zinc-900">{item.val}%</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
                        <div
                          className={`h-full rounded-full ${item.color}`}
                          style={{ width: `${item.val}%`, transition: "width 1s ease" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>


        </div>
      </div>
    </section>
  );
}
