"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  ChevronRight,
  Clock,
  Eye,
  Heart,
  Bookmark,
  Share2,
  Calendar,
  User,
  ArrowRight,
  Sparkles,
  Send,
  CheckCircle2,
  TrendingUp,
  Tag
} from "lucide-react";
import ScrollReveal from "../components/ui/ScrollReveal";
import "./blog.css";

// ─── TYPES ───
type SortOption = "latest" | "popular" | "trending";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatarGradient: string;
  };
  publishDate: string;
  readingTime: string;
  views: number;
  likes: number;
  summary: string;
  image: string;
  isFeatured?: boolean;
  isTrending?: boolean;
}

// ─── DATA ───
const CATEGORIES = [
  "All",
  "Resume Tips",
  "Interview Tips",
  "Career Growth",
  "AI Tools",
  "Productivity",
  "Remote Jobs",
  "Freelancing",
  "Portfolio",
  "LinkedIn",
  "Job Search",
];

const POPULAR_TAGS = [
  "AI Resume", "Tech Interviews", "Negotiation", "Remote Work", "Product Management", "FAANG", "Networking", "Career Pivot", "ATS Systems"
];

const BLOG_POSTS: BlogPost[] = [
  {
    id: "b1",
    title: "How AI is changing the landscape of tech recruitment in 2024",
    slug: "ai-tech-recruitment-2024",
    category: "AI Tools",
    tags: ["AI Tools", "Tech Interviews", "ATS Systems"],
    author: { name: "Jessica Lee", avatarGradient: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)" },
    publishDate: "Jan 12, 2024",
    readingTime: "8 min read",
    views: 45200,
    likes: 1205,
    summary: "Discover how top tech companies are utilizing AI to screen candidates, and how you can optimize your application to pass the algorithms.",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=800&h=500",
    isFeatured: true,
  },
  {
    id: "b2",
    title: "5 fatal resume mistakes that trigger ATS rejection immediately",
    slug: "5-fatal-resume-mistakes-ats",
    category: "Resume Tips",
    tags: ["Resume Tips", "ATS Systems"],
    author: { name: "David Chen", avatarGradient: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)" },
    publishDate: "Jan 08, 2024",
    readingTime: "5 min read",
    views: 32100,
    likes: 892,
    summary: "Are you applying but hearing nothing back? Your resume formatting might be confusing the Applicant Tracking Systems.",
    image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=800&h=500",
    isTrending: true,
  },
  {
    id: "b3",
    title: "The behavioral interview decoded: Using the STAR method effectively",
    slug: "behavioral-interview-star-method",
    category: "Interview Tips",
    tags: ["Tech Interviews", "FAANG"],
    author: { name: "Michael Roberts", avatarGradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)" },
    publishDate: "Jan 03, 2024",
    readingTime: "10 min read",
    views: 28400,
    likes: 950,
    summary: "A comprehensive guide to answering 'Tell me about a time when...' questions using Situation, Task, Action, and Result.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800&h=500",
    isTrending: true,
  },
  {
    id: "b4",
    title: "How to negotiate a 20% higher salary in a tough market",
    slug: "negotiate-higher-salary",
    category: "Career Growth",
    tags: ["Negotiation", "Career Growth"],
    author: { name: "Sarah Jenkins", avatarGradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)" },
    publishDate: "Dec 28, 2023",
    readingTime: "7 min read",
    views: 52000,
    likes: 2100,
    summary: "Exact scripts and strategies to use when the recruiter asks for your salary expectations.",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800&h=500",
    isTrending: true,
  },
  {
    id: "b5",
    title: "Mastering the Remote Job Search in 2024",
    slug: "mastering-remote-job-search",
    category: "Remote Jobs",
    tags: ["Remote Work", "Job Search"],
    author: { name: "Alex Turing", avatarGradient: "linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)" },
    publishDate: "Dec 20, 2023",
    readingTime: "6 min read",
    views: 19500,
    likes: 640,
    summary: "Remote roles are more competitive than ever. Here is how to stand out to distributed teams.",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800&h=500",
  },
  {
    id: "b6",
    title: "Revamp your LinkedIn profile in 30 minutes",
    slug: "revamp-linkedin-profile",
    category: "LinkedIn",
    tags: ["LinkedIn", "Networking"],
    author: { name: "Emily Watson", avatarGradient: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)" },
    publishDate: "Dec 15, 2023",
    readingTime: "4 min read",
    views: 41200,
    likes: 1540,
    summary: "Small tweaks to your headline and about section that dramatically increase recruiter inbound messages.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800&h=500",
    isTrending: true,
  },
  {
    id: "b7",
    title: "Transitioning from Engineer to Product Manager",
    slug: "engineer-to-product-manager",
    category: "Career Growth",
    tags: ["Product Management", "Career Pivot"],
    author: { name: "David Chen", avatarGradient: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)" },
    publishDate: "Dec 10, 2023",
    readingTime: "12 min read",
    views: 15800,
    likes: 420,
    summary: "The mindset shift required to move from writing code to defining the product vision.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800&h=500",
  },
  {
    id: "b8",
    title: "Building a Design Portfolio that actually converts",
    slug: "design-portfolio-converts",
    category: "Portfolio",
    tags: ["Portfolio", "Tech Interviews"],
    author: { name: "Jessica Lee", avatarGradient: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)" },
    publishDate: "Dec 05, 2023",
    readingTime: "9 min read",
    views: 22100,
    likes: 890,
    summary: "Stop focusing just on pretty visuals. Hiring managers want to see your problem-solving process.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800&h=500",
  },
  {
    id: "b9",
    title: "10 AI Tools to 10x your Job Search",
    slug: "10-ai-tools-job-search",
    category: "AI Tools",
    tags: ["AI Tools", "Job Search", "Productivity"],
    author: { name: "Alex Turing", avatarGradient: "linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)" },
    publishDate: "Nov 28, 2023",
    readingTime: "5 min read",
    views: 65400,
    likes: 3200,
    summary: "From automated application tracking to AI cover letter generators, these tools will save you hours.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800&h=500",
    isTrending: true,
  },
  {
    id: "b10",
    title: "How to survive a 7-round FAANG interview loop",
    slug: "survive-faang-interview",
    category: "Interview Tips",
    tags: ["Tech Interviews", "FAANG"],
    author: { name: "Michael Roberts", avatarGradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)" },
    publishDate: "Nov 20, 2023",
    readingTime: "15 min read",
    views: 38900,
    likes: 1800,
    summary: "Mental frameworks and pacing strategies to avoid burnout during all-day onsite interviews.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800&h=500",
  },
  {
    id: "b11",
    title: "Freelancing vs Full-time: Making the jump",
    slug: "freelancing-vs-full-time",
    category: "Freelancing",
    tags: ["Freelancing", "Career Growth"],
    author: { name: "Sarah Jenkins", avatarGradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)" },
    publishDate: "Nov 15, 2023",
    readingTime: "8 min read",
    views: 12400,
    likes: 310,
    summary: "Understanding the financial and mental implications of leaving a salaried position to work for yourself.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800&h=500",
  },
  {
    id: "b12",
    title: "Deep Work: Productivity hacks for engineers",
    slug: "deep-work-engineers",
    category: "Productivity",
    tags: ["Productivity", "Remote Work"],
    author: { name: "Emily Watson", avatarGradient: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)" },
    publishDate: "Nov 02, 2023",
    readingTime: "6 min read",
    views: 18700,
    likes: 540,
    summary: "How to block distractions and achieve flow state when you have a mountain of tickets to clear.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800&h=500",
  }
];

// ─── MAIN COMPONENT ───
export default function BlogPageClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  
  // Newsletter state
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success">("idle");

  const featuredPost = BLOG_POSTS.find(p => p.isFeatured) || BLOG_POSTS[0];
  const trendingPosts = BLOG_POSTS.filter(p => p.isTrending).sort((a, b) => b.views - a.views).slice(0, 5);

  const filteredPosts = useMemo(() => {
    let result = BLOG_POSTS.filter(p => p.id !== featuredPost.id);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    result = [...result].sort((a, b) => {
      if (sortBy === "popular") return b.views - a.views;
      if (sortBy === "trending") return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    });

    return result;
  }, [searchQuery, activeCategory, sortBy, featuredPost.id]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribeStatus("loading");
    setTimeout(() => {
      setSubscribeStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      
      {/* ─── HERO SECTION ─── */}
      <section className="blog-hero-bg overflow-hidden pt-16 pb-12 px-6 relative border-b border-zinc-200/60">
        <div className="shape-blob h-[400px] w-[400px] bg-blue-500/10 -top-20 -right-20 absolute pointer-events-none" />
        <div className="shape-blob h-[300px] w-[300px] bg-purple-500/10 top-40 -left-20 absolute pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-cp-primary mb-6">
              <Sparkles size={14} />
              <span>CareerPilot AI Blog</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 tracking-tight mb-6 leading-tight">
              Career Insights & <br /> <span className="text-gradient">AI Learning Resources</span>
            </h1>
            
            <p className="text-lg text-zinc-600 mb-10 max-w-2xl mx-auto">
              Explore expert articles about resumes, interviews, AI careers, and professional growth to stay ahead in your journey.
            </p>

            {/* Search Bar & Sort */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-3xl mx-auto">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-zinc-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-11 pr-4 py-3.5 border border-zinc-200 rounded-2xl bg-white/80 backdrop-blur-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-cp-primary focus:border-transparent shadow-sm transition-all text-base"
                  placeholder="Search articles, topics, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-1 bg-white border border-zinc-200 rounded-xl p-1.5 shadow-sm shrink-0 w-full md:w-auto">
                {[
                  { id: "latest", label: "Latest" },
                  { id: "popular", label: "Popular" },
                  { id: "trending", label: "Trending" }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSortBy(opt.id as SortOption)}
                    className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      sortBy === opt.id ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:text-zinc-700"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── CATEGORY PILLS ─── */}
      <section className="border-b border-zinc-200 bg-white sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-1 items-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-cp-primary text-white shadow-sm"
                    : "bg-zinc-50 text-zinc-600 border border-zinc-200 hover:bg-zinc-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* ─── FEATURED ARTICLE ─── */}
        {!searchQuery && activeCategory === "All" && sortBy === "latest" && (
          <ScrollReveal>
            <div className="mb-16 group cursor-pointer relative rounded-3xl overflow-hidden bg-zinc-900 shadow-xl border border-zinc-200/20">
              <Image src={featuredPost.image} alt={featuredPost.title} fill className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
              
              <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col justify-end min-h-[400px] md:min-h-[500px]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-cp-primary text-white text-xs font-bold rounded-md shadow-sm">
                    {featuredPost.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-zinc-300 text-sm font-medium">
                    <Clock size={14} /> {featuredPost.readingTime}
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight group-hover:text-blue-200 transition-colors max-w-4xl">
                  {featuredPost.title}
                </h2>
                
                <p className="text-lg text-zinc-300 max-w-3xl mb-8 line-clamp-2">
                  {featuredPost.summary}
                </p>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border-2 border-white/20" style={{ background: featuredPost.author.avatarGradient }} />
                    <div>
                      <p className="text-white font-semibold text-sm">{featuredPost.author.name}</p>
                      <p className="text-zinc-400 text-xs">{featuredPost.publishDate}</p>
                    </div>
                  </div>
                  
                  <Link href={`/blog/${featuredPost.slug}`} className="px-6 py-3 bg-white text-zinc-900 font-bold rounded-xl hover:bg-zinc-100 transition-colors flex items-center gap-2">
                    Read Article <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* ─── MAIN BLOG GRID ─── */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-zinc-900 mb-8 border-b border-zinc-200 pb-4">
              {searchQuery ? "Search Results" : "Latest Articles"}
            </h3>
            
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                {filteredPosts.map((post, i) => (
                  <ScrollReveal key={post.id} className={`delay-[${(i % 4) * 100}ms] h-full`}>
                    <div className="blog-card rounded-2xl group flex flex-col h-full bg-white relative">
                      
                      {/* Cover Image Placeholder */}
                      <div className="cover-image-container h-48 w-full overflow-hidden relative border-b border-zinc-100">
                        <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute top-4 left-4">
                          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-zinc-900 text-xs font-bold rounded-md shadow-sm">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <Link href={`/blog/${post.slug}`} className="block mb-3 group-hover:text-cp-primary transition-colors">
                          <h3 className="text-xl font-bold text-zinc-900 leading-snug line-clamp-2">
                            {post.title}
                          </h3>
                        </Link>
                        
                        <p className="text-zinc-500 text-sm mb-6 line-clamp-3">
                          {post.summary}
                        </p>

                        <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full" style={{ background: post.author.avatarGradient }} />
                            <div>
                              <p className="text-zinc-900 font-semibold text-xs">{post.author.name}</p>
                              <p className="text-zinc-500 text-[10px]">{post.publishDate} • {post.readingTime}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 text-zinc-400">
                            <button className="hover:text-cp-primary transition-colors"><Bookmark size={16} /></button>
                            <button className="hover:text-cp-primary transition-colors"><Share2 size={16} /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-zinc-200">
                <div className="mx-auto w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-zinc-400" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 mb-2">No articles found</h3>
                <p className="text-zinc-500 max-w-sm mx-auto mb-6">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  className="px-6 py-2 bg-zinc-900 text-white font-medium rounded-xl hover:bg-zinc-800 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* ─── SIDEBAR ─── */}
          <aside className="w-full lg:w-80 shrink-0 space-y-10">
            
            {/* Trending Section */}
            <ScrollReveal className="delay-100">
              <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
                <h4 className="font-bold text-zinc-900 flex items-center gap-2 mb-6">
                  <TrendingUp size={18} className="text-cp-primary" /> Trending Now
                </h4>
                
                <div className="space-y-5">
                  {trendingPosts.map((post, idx) => (
                    <Link href={`/blog/${post.slug}`} key={post.id} className="group flex gap-4 items-start">
                      <span className="text-3xl font-bold text-zinc-200 group-hover:text-cp-primary/30 transition-colors">
                        0{idx + 1}
                      </span>
                      <div>
                        <h5 className="font-semibold text-sm text-zinc-900 group-hover:text-cp-primary line-clamp-2 mb-1 transition-colors">
                          {post.title}
                        </h5>
                        <p className="text-xs text-zinc-500 flex items-center gap-2">
                          <Eye size={12} /> {(post.views / 1000).toFixed(1)}k views
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Popular Tags */}
            <ScrollReveal className="delay-200">
              <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
                <h4 className="font-bold text-zinc-900 flex items-center gap-2 mb-6">
                  <Tag size={18} className="text-cp-primary" /> Popular Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_TAGS.map(tag => (
                    <button 
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="tag-pill px-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-600"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            
          </aside>
        </div>
      </div>

      {/* ─── NEWSLETTER SECTION ─── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="relative rounded-3xl overflow-hidden bg-[#0A0A0A] border border-white/10 shadow-2xl">
              <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cp-primary/30 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/30 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none" />
              
              <div className="relative p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
                    Get weekly career insights.
                  </h2>
                  <p className="text-lg text-zinc-400 max-w-md mx-auto md:mx-0">
                    Join 50,000+ professionals receiving top-tier advice on resume building, interviews, and AI trends.
                  </p>
                </div>

                <div className="w-full max-w-md shrink-0">
                  {subscribeStatus === "success" ? (
                    <div className="flex flex-col items-center justify-center p-8 bg-white/5 border border-white/10 rounded-2xl text-center">
                      <CheckCircle2 size={32} className="text-emerald-400 mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">You're on the list!</h3>
                      <button onClick={() => setSubscribeStatus("idle")} className="mt-4 text-sm font-semibold text-zinc-400 hover:text-white transition-colors">
                        Subscribe another email
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="relative group">
                      <div className="relative flex flex-col sm:flex-row items-center gap-3 p-2 bg-zinc-900/80 border border-white/10 rounded-2xl backdrop-blur-xl">
                        <input
                          type="email"
                          required
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={subscribeStatus === "loading"}
                          className="w-full bg-transparent px-4 py-3 text-white placeholder-zinc-500 focus:outline-none"
                        />
                        <button
                          type="submit"
                          disabled={subscribeStatus === "loading"}
                          className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-zinc-900 hover:bg-zinc-200 transition-colors"
                        >
                          {subscribeStatus === "loading" ? "Subscribing..." : "Subscribe"}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-3xl p-10 md:p-16 text-center text-white shadow-xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Start Improving Your Career Today
              </h2>
              <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                Use our AI tools to analyze your resume, practice interviews, and land your dream job faster.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/register"
                  className="px-8 py-4 bg-white text-cp-primary font-bold rounded-xl shadow-lg hover:-translate-y-1 transition-transform"
                >
                  Get Started for Free
                </Link>
                <Link
                  href="/explore"
                  className="px-8 py-4 bg-white/10 text-white border border-white/20 font-bold rounded-xl hover:bg-white/20 transition-colors"
                >
                  Explore AI Tools
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
