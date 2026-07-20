"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";
import ScrollReveal from "../ui/ScrollReveal";

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    profession: "Product Manager at TechCorp",
    image: "https://i.pravatar.cc/150?img=47",
    rating: 5,
    review:
      "The AI Resume Analyzer completely transformed my job search. It caught keyword gaps I would have never noticed, and the Mock Interview feature gave me the exact confidence I needed to land my dream role at TechCorp.",
  },
  {
    id: 2,
    name: "David Chen",
    profession: "Software Engineer",
    image: "https://i.pravatar.cc/150?img=11",
    rating: 5,
    review:
      "I was struggling to get past ATS filters for months. After using CareerPilot's smart recommendations to tweak my resume and cover letter, my interview rate went up by 300%. The AI career roadmap is remarkably accurate.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    profession: "Marketing Director",
    image: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    review:
      "As someone pivoting into a new industry, the skill detection feature was invaluable. It told me exactly what I needed to learn to be competitive. The premium UI and dashboard make it a joy to use every single day.",
  },
  {
    id: 4,
    name: "Marcus Johnson",
    profession: "Data Analyst",
    image: "https://i.pravatar.cc/150?img=15",
    rating: 5,
    review:
      "CareerPilot feels like having a senior mentor available 24/7. The personalized interview questions it generated for my specific target company were almost identical to what I was actually asked. Highly recommended!",
  },
  {
    id: 5,
    name: "Jessica Taylor",
    profession: "UX Designer",
    image: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    review:
      "The feedback on my portfolio and cover letters was incredibly precise. CareerPilot helped me highlight my strengths in a way that resonated perfectly with top design agencies. I landed three offers in one month!",
  },
];

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      // Scroll by one full visible width of the container
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-zinc-50 py-16 sm:py-24 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
        
        <ScrollReveal className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-cp-primary mb-6">
            <Sparkles size={14} />
            <span>Success Stories</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl mb-4">
            Loved by <span className="text-gradient">professionals</span> everywhere.
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Join thousands of job seekers who have accelerated their careers, optimized their resumes, and aced their interviews using our AI tools.
          </p>
        </ScrollReveal>

        <div className="relative group">
          
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 md:-left-6 top-[calc(50%-1.5rem)] -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 shadow-[0_4px_20px_rgba(0,0,0,0.08)] opacity-40 transition-all duration-300 hover:opacity-100 hover:border-cp-primary hover:bg-cp-primary hover:text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-110 hidden md:flex"
            aria-label="Previous testimonials"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 md:-right-6 top-[calc(50%-1.5rem)] -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 shadow-[0_4px_20px_rgba(0,0,0,0.08)] opacity-40 transition-all duration-300 hover:opacity-100 hover:border-cp-primary hover:bg-cp-primary hover:text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-110 hidden md:flex"
            aria-label="Next testimonials"
          >
            <ChevronRight size={24} />
          </button>

          {/* Scrollable Container */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-12 pt-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 lg:-mx-8 lg:px-8 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="snap-center shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <div className="relative rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(37,99,235,0.08)] transition-all duration-300 border border-zinc-100 h-full flex flex-col group hover:-translate-y-1">
                  <Quote size={40} className="absolute top-6 right-6 text-cp-primary/5 group-hover:text-cp-primary/10 transition-colors duration-300" />
                  
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  
                  <p className="text-base leading-relaxed text-zinc-600 mb-8 flex-1 relative z-10">
                    "{testimonial.review}"
                  </p>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="relative">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="rounded-full ring-2 ring-cp-primary/10 group-hover:ring-cp-primary/30 transition-all duration-300"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 w-3.5 h-3.5 rounded-full border-2 border-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900 text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-zinc-500">{testimonial.profession}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
