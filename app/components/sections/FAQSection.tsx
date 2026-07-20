"use client";
import { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "../ui/ScrollReveal";

const faqs = [
  {
    category: "Resume Analysis",
    question: "How does the AI Resume Analyzer work?",
    answer: "Our AI scans your resume against millions of successful job applications and industry standards. It checks for ATS compatibility, identifies missing keywords related to your target role, highlights formatting errors, and provides actionable suggestions to improve your score.",
  },
  {
    category: "Interview Coaching",
    question: "Are the mock interview questions tailored to my job?",
    answer: "Yes! When you input your target job title and company, our AI generates highly specific behavioral and technical questions that are currently being asked in real interviews for that exact role.",
  },
  {
    category: "AI Features",
    question: "How accurate is the Career Roadmap?",
    answer: "The Career Roadmap uses real-time market data to identify the exact skills in demand for your desired career trajectory. It boasts a 92% accuracy rate in predicting necessary skills for promotions within the tech and business sectors.",
  },
  {
    category: "Pricing",
    question: "Is CareerPilot AI completely free?",
    answer: "We offer a robust Free plan that includes basic resume analysis and limited interview prep. For advanced features like unlimited mock interviews, cover letter generation, and detailed career roadmaps, we offer affordable premium plans.",
  },
  {
    category: "Account",
    question: "Can I delete my data and account?",
    answer: "Absolutely. You have full control over your data. You can export your data or permanently delete your account and all associated documents from your account settings at any time.",
  },
  {
    category: "Privacy",
    question: "Is my resume data kept private?",
    answer: "We take your privacy seriously. Your data is encrypted at rest and in transit. We do not sell your personal information or resume data to third-party advertisers or recruiters without your explicit consent.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-zinc-50 py-16 sm:py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        <ScrollReveal className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-cp-primary mb-6">
            <Sparkles size={14} />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Everything you need to know about CareerPilot AI. Can't find the answer you're looking for? <Link href="/contact" className="font-semibold text-cp-primary hover:underline">Chat to our team</Link>.
          </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-start">
          
          {/* Left Column - Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-cp-primary/10 border border-zinc-200 hidden lg:block">
            <div className="aspect-[4/3] relative w-full">
              <img 
                src="https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?auto=format&fit=crop&q=80&w=1000" 
                alt="Professional workspace" 
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-cp-primary/20 to-transparent mix-blend-multiply" />
            </div>
          </div>

          {/* Right Column - Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              
              return (
                <div 
                  key={index}
                  className={`rounded-2xl border transition-all duration-300 ${
                    isOpen ? "border-cp-primary/30 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]" : "border-zinc-200 bg-white/50 hover:bg-white hover:border-zinc-300 hover:shadow-sm"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between p-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <div className="flex flex-col gap-1 pr-4">
                      <span className="text-xs font-bold text-cp-primary tracking-wider uppercase">
                        {faq.category}
                      </span>
                      <span className={`text-lg font-semibold transition-colors duration-300 ${isOpen ? "text-cp-primary" : "text-zinc-900"}`}>
                        {faq.question}
                      </span>
                    </div>
                    <div className={`flex shrink-0 h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? "bg-cp-primary/10 text-cp-primary shadow-inner" : "bg-zinc-100 text-zinc-400"}`}>
                      <ChevronDown size={20} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </div>
                  </button>
                  
                  <div 
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="p-6 pt-0 text-zinc-600 leading-relaxed border-t border-zinc-100 mt-2">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
        </div>
      </div>
    </section>
  );
}
