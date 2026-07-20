"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Download,
  Star,
  CheckCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
  Target,
  FileText,
  ChevronDown,
  LayoutDashboard,
  Sparkles
} from "lucide-react";
import ScrollReveal from "../components/ui/ScrollReveal";
import "./resume-templates.css";

// ─── TYPES ───
type ExperienceLevel = "All" | "Entry Level" | "Mid Level" | "Senior" | "Executive";
type TemplateStyle = "All" | "Modern" | "Minimalist" | "Creative" | "Professional";
type SortOption = "newest" | "popular" | "downloaded";

interface ResumeTemplate {
  id: string;
  name: string;
  category: string;
  industry: string;
  experienceLevel: ExperienceLevel;
  style: TemplateStyle;
  atsScore: number;
  downloads: number;
  rating: number;
  description: string;
  gradient: string; // Used for the fake preview
  isNew?: boolean;
  isPremium?: boolean;
}

// ─── DATA ───
const TEMPLATES: ResumeTemplate[] = [
  {
    id: "t1",
    name: "Tech Innovator",
    category: "Software Engineer",
    industry: "Technology",
    experienceLevel: "Mid Level",
    style: "Modern",
    atsScore: 98,
    downloads: 12450,
    rating: 4.9,
    description: "A clean, modern layout perfect for software engineers and developers. Highly ATS optimized.",
    gradient: "linear-gradient(135deg, #2563EB 0%, #1d4ed8 100%)",
    isNew: true,
  },
  {
    id: "t2",
    name: "Executive Suite",
    category: "Business",
    industry: "Finance",
    experienceLevel: "Executive",
    style: "Professional",
    atsScore: 95,
    downloads: 8320,
    rating: 4.8,
    description: "Traditional and authoritative. Designed for C-level executives and senior management.",
    gradient: "linear-gradient(135deg, #0f172a 0%, #334155 100%)",
  },
  {
    id: "t3",
    name: "Creative Portfolio",
    category: "UI/UX Designer",
    industry: "Creative",
    experienceLevel: "Entry Level",
    style: "Creative",
    atsScore: 88,
    downloads: 15600,
    rating: 4.7,
    description: "Stand out with this vibrant, design-forward template. Ideal for designers and creatives.",
    gradient: "linear-gradient(135deg, #ec4899 0%, #e11d48 100%)",
  },
  {
    id: "t4",
    name: "Campus Ready",
    category: "Student Resume",
    industry: "Various",
    experienceLevel: "Entry Level",
    style: "Minimalist",
    atsScore: 99,
    downloads: 22100,
    rating: 4.9,
    description: "Simple and focused on education and projects. Perfect for fresh graduates.",
    gradient: "linear-gradient(135deg, #14B8A6 0%, #0f766e 100%)",
  },
  {
    id: "t5",
    name: "Growth Marketer",
    category: "Marketing",
    industry: "Marketing",
    experienceLevel: "Mid Level",
    style: "Modern",
    atsScore: 94,
    downloads: 9400,
    rating: 4.6,
    description: "Highlight your campaigns and metrics with this data-driven template.",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
  },
  {
    id: "t6",
    name: "Clinical Pro",
    category: "Healthcare",
    industry: "Healthcare",
    experienceLevel: "Senior",
    style: "Professional",
    atsScore: 97,
    downloads: 6200,
    rating: 4.8,
    description: "Structured to clearly display certifications, clinical experience, and education.",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #0369a1 100%)",
  },
  {
    id: "t7",
    name: "Product Leader",
    category: "Product Manager",
    industry: "Technology",
    experienceLevel: "Senior",
    style: "Minimalist",
    atsScore: 96,
    downloads: 11200,
    rating: 4.9,
    description: "Emphasizes leadership, product launches, and cross-functional team management.",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
    isPremium: true,
  },
  {
    id: "t8",
    name: "Data Scientist",
    category: "Backend Developer",
    industry: "Technology",
    experienceLevel: "Mid Level",
    style: "Modern",
    atsScore: 95,
    downloads: 10500,
    rating: 4.7,
    description: "Perfect for technical roles requiring detailed toolstacks and methodology sections.",
    gradient: "linear-gradient(135deg, #334155 0%, #0f172a 100%)",
  },
  {
    id: "t9",
    name: "Financial Analyst",
    category: "Finance",
    industry: "Finance",
    experienceLevel: "Entry Level",
    style: "Professional",
    atsScore: 99,
    downloads: 8900,
    rating: 4.8,
    description: "Clean, conservative layout that passes all major banking ATS systems.",
    gradient: "linear-gradient(135deg, #166534 0%, #14532d 100%)",
  },
  {
    id: "t10",
    name: "Agency Creative",
    category: "Creative",
    industry: "Creative",
    experienceLevel: "Senior",
    style: "Creative",
    atsScore: 85,
    downloads: 7400,
    rating: 4.5,
    description: "A bold, two-column layout for art directors and senior agency creatives.",
    gradient: "linear-gradient(135deg, #f43f5e 0%, #be123c 100%)",
    isPremium: true,
  },
  {
    id: "t11",
    name: "Full Stack Master",
    category: "Full Stack Developer",
    industry: "Technology",
    experienceLevel: "Senior",
    style: "Modern",
    atsScore: 98,
    downloads: 14200,
    rating: 4.9,
    description: "Showcase frontend and backend skills with balanced, scannable sections.",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
  },
  {
    id: "t12",
    name: "Sales Director",
    category: "Business",
    industry: "Business",
    experienceLevel: "Executive",
    style: "Minimalist",
    atsScore: 94,
    downloads: 5600,
    rating: 4.7,
    description: "Focuses heavily on quotas, revenue generation, and team leadership metrics.",
    gradient: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
  },
];

const CATEGORIES = [
  "All",
  "Student Resume",
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "UI/UX Designer",
  "Product Manager",
  "Marketing",
  "Business",
  "Finance",
  "Healthcare",
  "Creative",
];

const FAQS = [
  {
    question: "Are these templates ATS-friendly?",
    answer: "Yes, all our templates are designed and tested to pass Applicant Tracking Systems. They use standard fonts, clear headings, and parseable layouts to ensure your data is read correctly by recruiting software."
  },
  {
    question: "Can I customize the colors and fonts?",
    answer: "Absolutely. Once you select a template, you can customize the accent colors, font families, and sizing in our Resume Builder to match your personal brand."
  },
  {
    question: "Do I need a premium account to download my resume?",
    answer: "We offer several free templates that you can download as a PDF without a premium account. Some specialized or highly-designed templates are reserved for our Premium members."
  },
  {
    question: "How do I know which template is right for me?",
    answer: "We recommend 'Minimalist' or 'Professional' for traditional industries like Finance or Law. 'Modern' is great for Tech and Business, while 'Creative' is best for design, media, and marketing roles."
  },
  {
    question: "Can the AI help me fill in the template?",
    answer: "Yes! Our AI Career Assistant can help you generate bullet points, summaries, and tailor your experience to match a specific job description once you start building."
  }
];

// ─── MAIN COMPONENT ───
export default function ResumeTemplatesClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeLevel, setActiveLevel] = useState<ExperienceLevel>("All");
  const [activeStyle, setActiveStyle] = useState<TemplateStyle>("All");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Filter and sort logic
  const filteredTemplates = useMemo(() => {
    let result = TEMPLATES;

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
      );
    }

    // Category
    if (activeCategory !== "All") {
      result = result.filter((t) => t.category === activeCategory);
    }

    // Experience Level
    if (activeLevel !== "All") {
      result = result.filter((t) => t.experienceLevel === activeLevel);
    }

    // Style
    if (activeStyle !== "All") {
      result = result.filter((t) => t.style === activeStyle);
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (sortBy === "popular") return b.downloads - a.downloads;
      if (sortBy === "downloaded") return b.downloads - a.downloads;
      if (sortBy === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0;
    });

    return result;
  }, [searchQuery, activeCategory, activeLevel, activeStyle, sortBy]);

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      
      {/* ─── HERO SECTION ─── */}
      <section className="template-hero-bg overflow-hidden pt-16 pb-20 px-6 relative border-b border-zinc-200/60">
        <div className="shape-blob h-[500px] w-[500px] bg-blue-500/10 -top-40 -right-20 absolute pointer-events-none" />
        <div className="shape-blob h-[400px] w-[400px] bg-purple-500/10 top-40 -left-20 absolute pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-cp-primary mb-6">
              <FileText size={14} />
              <span>Resume Templates</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 tracking-tight mb-6 leading-tight">
              Professional <span className="text-gradient">Resume Templates</span>
            </h1>
            
            <p className="text-lg text-zinc-600 mb-10 max-w-2xl mx-auto">
              Choose from ATS-friendly resume templates designed for modern recruiters. 
              Stand out, pass the automated screens, and land your dream job.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-zinc-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-4 border border-zinc-200 rounded-2xl bg-white/80 backdrop-blur-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-cp-primary focus:border-transparent shadow-sm transition-all text-lg"
                placeholder="Search resources, templates, styles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── CATEGORY PILLS ─── */}
      <section className="border-b border-zinc-200 bg-white sticky top-16 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-1 items-center">
            <span className="text-sm font-semibold text-zinc-500 mr-2 flex-shrink-0 flex items-center gap-1">
              <Filter size={14} /> Filter:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-cp-primary text-white shadow-sm"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FILTERS & GRID SECTION ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex flex-wrap gap-3">
            {/* Experience Level Dropdown */}
            <div className="relative">
              <select 
                value={activeLevel}
                onChange={(e) => setActiveLevel(e.target.value as ExperienceLevel)}
                className="appearance-none bg-white border border-zinc-200 text-zinc-700 py-2 pl-4 pr-10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cp-primary focus:border-transparent cursor-pointer shadow-sm"
              >
                <option value="All">Experience Level</option>
                <option value="Entry Level">Entry Level</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior">Senior</option>
                <option value="Executive">Executive</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-zinc-400 pointer-events-none" />
            </div>

            {/* Template Style Dropdown */}
            <div className="relative">
              <select 
                value={activeStyle}
                onChange={(e) => setActiveStyle(e.target.value as TemplateStyle)}
                className="appearance-none bg-white border border-zinc-200 text-zinc-700 py-2 pl-4 pr-10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cp-primary focus:border-transparent cursor-pointer shadow-sm"
              >
                <option value="All">Template Style</option>
                <option value="Modern">Modern</option>
                <option value="Minimalist">Minimalist</option>
                <option value="Creative">Creative</option>
                <option value="Professional">Professional</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-zinc-400 pointer-events-none" />
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-2 bg-white border border-zinc-200 rounded-lg p-1 shadow-sm">
            {[
              { id: "popular", label: "Popular" },
              { id: "newest", label: "Newest" },
              { id: "downloaded", label: "Most Downloaded" }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSortBy(opt.id as SortOption)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  sortBy === opt.id ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:text-zinc-700"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map((template, i) => (
              <ScrollReveal key={template.id} className={`delay-[${(i % 4) * 100}ms]`}>
                <div className="template-card rounded-2xl group flex flex-col h-full bg-white relative">
                  
                  {/* Badges */}
                  <div className="absolute top-3 right-3 z-10 flex gap-2">
                    {template.isNew && (
                      <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                        NEW
                      </span>
                    )}
                    {template.isPremium && (
                      <span className="bg-cp-secondary text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
                        <Zap size={10} /> PRO
                      </span>
                    )}
                  </div>

                  {/* Fake Preview (Image Area) */}
                  <div className="h-64 p-4 border-b border-zinc-100 bg-zinc-50 relative overflow-hidden flex items-center justify-center">
                    <div className="preview-container w-[160px] h-[226px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] rounded-sm overflow-hidden flex flex-col border border-zinc-100/50">
                      {/* Fake Document Header */}
                      <div className="w-full h-[32px] flex items-center justify-center p-2" style={{ background: template.gradient }}>
                        <div className="w-1/2 h-1.5 bg-white/80 rounded-full"></div>
                      </div>
                      
                      {/* Fake Document Body (2 columns) */}
                      <div className="flex-1 flex p-2 gap-2">
                        {/* Left Sidebar */}
                        <div className="w-1/3 flex flex-col gap-1.5 border-r border-zinc-100 pr-1.5 pt-1">
                          <div className="w-6 h-6 rounded-full bg-zinc-200 mb-1 mx-auto"></div>
                          <div className="w-full h-1 bg-zinc-200 rounded"></div>
                          <div className="w-3/4 h-1 bg-zinc-100 rounded"></div>
                          <div className="w-full h-1 bg-zinc-100 rounded"></div>
                          <div className="w-5/6 h-1 bg-zinc-100 rounded mb-1"></div>
                          
                          <div className="w-full h-1 bg-zinc-200 rounded"></div>
                          <div className="w-2/3 h-1 bg-zinc-100 rounded"></div>
                        </div>
                        
                        {/* Right Content */}
                        <div className="w-2/3 flex flex-col gap-1.5 pt-1">
                          <div className="w-1/2 h-1.5 bg-zinc-200 rounded mb-0.5"></div>
                          <div className="w-full h-1 bg-zinc-100 rounded"></div>
                          <div className="w-full h-1 bg-zinc-100 rounded"></div>
                          <div className="w-5/6 h-1 bg-zinc-100 rounded mb-1"></div>
                          
                          <div className="w-1/2 h-1.5 bg-zinc-200 rounded mb-0.5"></div>
                          <div className="w-full h-1 bg-zinc-100 rounded"></div>
                          <div className="w-11/12 h-1 bg-zinc-100 rounded mb-1"></div>
                          
                          <div className="w-1/2 h-1.5 bg-zinc-200 rounded mb-0.5"></div>
                          <div className="w-full h-1 bg-zinc-100 rounded"></div>
                        </div>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="hover-overlay absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto bg-transparent group-hover:bg-zinc-900/10 group-hover:backdrop-blur-sm">
                      <Link 
                        href={`/dashboard/add-resume?template=${template.id}`}
                        className="w-full py-2 bg-cp-primary/90 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 opacity-50 group-hover:opacity-100 group-hover:bg-blue-700 transition-all shadow-sm group-hover:shadow-lg translate-y-2 group-hover:translate-y-0"
                      >
                        Use Template
                      </Link>
                      <button className="w-full py-2 bg-white/70 text-zinc-700 border border-zinc-200/50 rounded-lg text-sm font-semibold opacity-50 group-hover:opacity-100 group-hover:bg-white group-hover:text-zinc-900 group-hover:border-white transition-all shadow-sm group-hover:shadow-md -translate-y-2 group-hover:translate-y-0">
                        Preview
                      </button>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-zinc-900 line-clamp-1" title={template.name}>
                        {template.name}
                      </h3>
                      <div className="flex items-center gap-1 text-amber-500 shrink-0">
                        <Star size={14} className="fill-current" />
                        <span className="text-xs font-bold">{template.rating}</span>
                      </div>
                    </div>

                    <p className="text-sm text-zinc-500 mb-4 line-clamp-2 min-h-[40px]">
                      {template.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                      <span className="text-[11px] font-medium px-2 py-1 bg-zinc-100 text-zinc-600 rounded-md">
                        {template.category}
                      </span>
                      <span className="text-[11px] font-medium px-2 py-1 bg-zinc-100 text-zinc-600 rounded-md">
                        {template.experienceLevel}
                      </span>
                    </div>

                    <div className="pt-4 border-t border-zinc-100 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-1.5 text-emerald-600">
                        <CheckCircle size={14} />
                        <span className="text-xs font-semibold">ATS {template.atsScore}%</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-zinc-400">
                        <Download size={14} />
                        <span className="text-xs font-medium">{(template.downloads / 1000).toFixed(1)}k</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl border border-zinc-200">
            <div className="mx-auto w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-zinc-400" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 mb-2">No templates found</h3>
            <p className="text-zinc-500 max-w-sm mx-auto mb-6">
              We couldn't find any templates matching your filters. Try clearing them to see all templates.
            </p>
            <button 
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
                setActiveLevel("All");
                setActiveStyle("All");
              }}
              className="px-6 py-2 bg-zinc-900 text-white font-medium rounded-xl hover:bg-zinc-800 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* ─── PREMIUM FEATURES ─── */}
      <section className="py-20 bg-white border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
              Why use our <span className="text-gradient">Templates?</span>
            </h2>
            <p className="text-zinc-600 max-w-2xl mx-auto text-lg">
              Every template is engineered to help you pass automated screening systems while impressing human recruiters.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: CheckCircle, title: "ATS Optimized", desc: "Passes all major parsing systems flawlessly." },
              { icon: Zap, title: "Easy Customization", desc: "Change colors and fonts with one click." },
              { icon: LayoutDashboard, title: "Pro Layouts", desc: "Structured to highlight your best assets." },
              { icon: Award, title: "Recruiter Approved", desc: "Designed with feedback from HR professionals." },
              { icon: Sparkles, title: "Modern Design", desc: "Clean, readable, and visually appealing." }
            ].map((feature, idx) => (
              <ScrollReveal key={idx} className={`delay-[${idx * 100}ms]`}>
                <div className="premium-feature-card rounded-2xl p-6 text-center h-full flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-50 text-cp-primary rounded-xl flex items-center justify-center mb-4">
                    <feature.icon size={24} />
                  </div>
                  <h3 className="font-bold text-zinc-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{feature.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-20 bg-zinc-50 border-t border-zinc-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
              How It <span className="text-cp-accent">Works</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative">
            <div className="timeline-connector" />
            
            {[
              { step: 1, icon: FileText, title: "Choose Template", desc: "Select from our library of ATS-friendly designs." },
              { step: 2, icon: Target, title: "Customize", desc: "Add your details manually or let AI generate them." },
              { step: 3, icon: Download, title: "Download PDF", desc: "Export your pixel-perfect resume in seconds." },
              { step: 4, icon: TrendingUp, title: "Apply for Jobs", desc: "Start applying with confidence and land interviews." },
            ].map((item, idx) => (
              <ScrollReveal key={idx} className={`timeline-item delay-[${idx * 150}ms] z-10`}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-cp-primary text-white rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-blue-500/20 ring-4 ring-white">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 mb-2">{item.title}</h3>
                  <p className="text-zinc-500 text-sm">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ SECTION ─── */}
      <section className="py-20 bg-white border-t border-zinc-200">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">Template FAQs</h2>
          </ScrollReveal>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <ScrollReveal key={index} className={`delay-[${index * 50}ms]`}>
                <div 
                  className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                    openFaq === index ? "border-cp-primary/30 bg-blue-50/30" : "border-zinc-200 bg-white hover:border-zinc-300"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-semibold text-zinc-900">{faq.question}</span>
                    <ChevronDown 
                      className={`text-zinc-400 transition-transform duration-300 ${
                        openFaq === index ? "rotate-180 text-cp-primary" : ""
                      }`} 
                      size={20} 
                    />
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="p-6 pt-0 text-zinc-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Start Building Your Resume
                </h2>
                <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                  Join thousands of professionals who have landed their dream jobs using CareerPilot AI.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    href="/dashboard/add-resume"
                    className="px-8 py-4 bg-white text-cp-primary font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    Create Resume
                  </Link>
                  <Link
                    href="/dashboard"
                    className="px-8 py-4 bg-white/10 text-white border border-white/20 font-bold rounded-xl hover:bg-white/20 transition-colors"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
