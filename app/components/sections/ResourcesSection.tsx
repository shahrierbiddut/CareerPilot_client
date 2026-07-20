"use client";
import Image from "next/image";
import { ArrowRight, BookOpen, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "../ui/ScrollReveal";

const resources = [
  {
    id: 1,
    title: "Mastering the Modern Resume Format",
    category: "Resume Writing",
    date: "Oct 12, 2023",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600&h=400",
    gradient: "from-blue-500/20 to-blue-600/20"
  },
  {
    id: 2,
    title: "How to Answer 'Tell Me About Yourself'",
    category: "Interview Guide",
    date: "Nov 05, 2023",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600&h=400",
    gradient: "from-violet-500/20 to-purple-600/20"
  },
  {
    id: 3,
    title: "Navigating Career Transitions with AI",
    category: "Career Articles",
    date: "Nov 28, 2023",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600&h=400",
    gradient: "from-teal-500/20 to-emerald-600/20"
  },
  {
    id: 4,
    title: "Top 10 High-Income Skills for 2024",
    category: "Learning Paths",
    date: "Dec 10, 2023",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600&h=400",
    gradient: "from-orange-500/20 to-amber-600/20"
  },
];

export default function ResourcesSection() {
  return (
    <section className="bg-zinc-50 py-16 sm:py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 z-10 relative">
        
        <ScrollReveal className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-cp-primary mb-6">
            <Sparkles size={14} />
            <span>Knowledge Base</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl mb-4">
            Career <span className="text-gradient">Resources</span>
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto mb-8">
            Expert articles, guides, and templates to help you navigate your career journey.
          </p>
          <Link href="/resources" className="inline-flex items-center gap-2 text-sm font-bold text-cp-primary hover:text-cp-accent transition-colors">
            View all resources
            <ArrowRight size={16} />
          </Link>
        </ScrollReveal>

        {/* Resource Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="group relative flex flex-col rounded-2xl bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-zinc-100 transition-all duration-300 hover:shadow-[0_16px_40px_rgba(37,99,235,0.12)] hover:-translate-y-2 cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-48 w-full overflow-hidden">
                <div className={`absolute inset-0 z-10 bg-gradient-to-t ${resource.gradient} mix-blend-multiply opacity-60 group-hover:opacity-40 transition-opacity`} />
                <Image
                  src={resource.image}
                  alt={resource.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-zinc-800 shadow-sm">
                    <BookOpen size={12} className="text-cp-primary" />
                    {resource.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 mb-3">
                  <Clock size={12} />
                  <span>{resource.date}</span>
                </div>
                <h3 className="text-lg font-bold text-zinc-900 leading-snug mb-6 group-hover:text-cp-primary transition-colors line-clamp-2">
                  {resource.title}
                </h3>
                
                <div className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-cp-primary opacity-80 group-hover:opacity-100 transition-all">
                  Read More
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
