"use client";
import Image from "next/image";
import { ArrowRight, Calendar, User, Sparkles } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "../ui/ScrollReveal";

const blogs = [
  {
    id: 1,
    title: "How AI is changing the landscape of tech recruitment in 2024",
    category: "Industry Trends",
    author: "Jessica Lee",
    date: "Jan 12, 2024",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=800&h=500",
  },
  {
    id: 2,
    title: "5 fatal resume mistakes that trigger ATS rejection immediately",
    category: "Resume Tips",
    author: "David Chen",
    date: "Jan 08, 2024",
    image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=800&h=500",
  },
  {
    id: 3,
    title: "The behavioral interview decoded: Using the STAR method effectively",
    category: "Interview Prep",
    author: "Michael Roberts",
    date: "Jan 03, 2024",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800&h=500",
  },
];

export default function BlogSection() {
  return (
    <section className="bg-white py-16 sm:py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 z-10 relative">
        
        <ScrollReveal className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-cp-primary mb-6">
            <Sparkles size={14} />
            <span>Latest Insights</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl mb-4">
            From the <span className="text-gradient">Blog</span>
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto mb-8">
            Stay up to date with the latest strategies for tech recruitment, interview prep, and career growth.
          </p>
        </ScrollReveal>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="group flex flex-col rounded-2xl bg-white shadow-sm border border-zinc-100 overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300"
            >
              {/* Image */}
              <div className="relative w-full h-56 overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block rounded bg-cp-primary/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-white shadow-sm">
                    {blog.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-xl font-bold text-zinc-900 leading-tight mb-4 group-hover:text-cp-primary transition-colors">
                  <Link href={`/blog/${blog.id}`}>
                    <span className="absolute inset-0" />
                    {blog.title}
                  </Link>
                </h3>
                
                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-zinc-500 pt-4 border-t border-zinc-100">
                  <div className="flex items-center gap-1.5">
                    <User size={14} className="text-zinc-400" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-zinc-400" />
                    <span>{blog.date}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="btn-outline inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold"
          >
            Read All Articles
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
