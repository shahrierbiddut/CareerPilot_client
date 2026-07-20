"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Bug,
  Lightbulb,
  Briefcase,
  User,
  ArrowRight,
  Map as MapIcon
} from "lucide-react";
import ScrollReveal from "../components/ui/ScrollReveal";
import FAQSection from "../components/sections/FAQSection";
import "./contact.css";

// ─── DATA ───
const CONTACT_CARDS = [
  { icon: Mail, title: "Email", info: "support@careerpilot.ai", desc: "Our friendly team is here to help." },
  { icon: Phone, title: "Phone", info: "+1 (800) 123-4567", desc: "Mon-Fri from 9am to 6pm." },
  { icon: Clock, title: "Office Hours", info: "9:00 AM - 6:00 PM", desc: "Pacific Standard Time (PST)" },
  { icon: MapPin, title: "Location", info: "San Francisco, CA", desc: "Remote-first, global team." }
];

const SUPPORT_CATEGORIES = [
  { id: "general", label: "General Questions", icon: HelpCircle },
  { id: "technical", label: "Technical Support", icon: Bug },
  { id: "feature", label: "Feature Request", icon: Lightbulb },
  { id: "business", label: "Business Inquiry", icon: Briefcase },
  { id: "career", label: "Career Support", icon: User }
];

const SOCIAL_LINKS = [
  { 
    name: "LinkedIn", 
    icon: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>, 
    color: "hover:text-[#0A66C2] hover:bg-[#0A66C2]/10" 
  },
  { 
    name: "GitHub", 
    icon: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>, 
    color: "hover:text-[#333] hover:bg-zinc-200" 
  },
  { 
    name: "Twitter", 
    icon: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>, 
    color: "hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10" 
  },
  { 
    name: "Facebook", 
    icon: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>, 
    color: "hover:text-[#1877F2] hover:bg-[#1877F2]/10" 
  },
  { 
    name: "Instagram", 
    icon: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>, 
    color: "hover:text-[#E4405F] hover:bg-[#E4405F]/10" 
  }
];

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // ─── HANDLERS ───
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setFormData(prev => ({ ...prev, subject: categoryId }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowToast(true);
      setFormData({ name: "", email: "", subject: "general", message: "" });
      
      // Auto-hide toast
      setTimeout(() => setShowToast(false), 4000);
    }, 1500);
  };

  const clearForm = () => {
    setFormData({ name: "", email: "", subject: "general", message: "" });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col relative pb-20 md:pb-0">
      
      {/* ─── TOAST NOTIFICATION ─── */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up flex items-center gap-3 bg-zinc-900 text-white px-6 py-4 rounded-2xl shadow-2xl border border-zinc-800">
          <CheckCircle2 size={24} className="text-emerald-500" />
          <div>
            <h4 className="font-bold text-sm">Message Sent!</h4>
            <p className="text-zinc-400 text-xs">We&apos;ll get back to you within 24 hours.</p>
          </div>
        </div>
      )}

      {/* ─── HERO SECTION ─── */}
      <section className="contact-hero-bg overflow-hidden pt-20 pb-16 px-6 relative border-b border-zinc-200/60">
        <div className="contact-shape-blob h-[500px] w-[500px] bg-blue-500/10 -top-20 -right-20 absolute pointer-events-none" />
        <div className="contact-shape-blob h-[400px] w-[400px] bg-purple-500/10 top-40 -left-20 absolute pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 pt-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-cp-primary mb-6 shadow-sm">
              <Mail size={14} />
              <span>Get in Touch</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-zinc-900 tracking-tight mb-6 leading-[1.1]">
              Contact <span className="text-gradient">CareerPilot AI</span>
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed">
              Have questions about our tools, pricing, or need technical support? We&apos;re here to help you navigate your career journey.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── CONTACT CARDS ─── */}
      <section className="py-12 px-6 max-w-7xl mx-auto relative z-10 -mt-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONTACT_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <ScrollReveal key={card.title} className={`delay-[${i * 100}ms]`}>
                <div className="contact-glass-card rounded-2xl p-6 flex flex-col items-center text-center shadow-lg shadow-blue-900/5 bg-white/80 h-full">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-cp-primary flex items-center justify-center mb-4">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-bold text-zinc-900 mb-1">{card.title}</h3>
                  <p className="font-medium text-cp-primary text-sm mb-2">{card.info}</p>
                  <p className="text-zinc-500 text-xs">{card.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ─── MAIN CONTACT FORM & SIDEBAR ─── */}
      <section className="py-16 px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* FORM AREA */}
          <div className="lg:w-2/3">
            <ScrollReveal>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-zinc-900 mb-4">Send us a message</h2>
                <p className="text-zinc-600">Fill out the form below and we&apos;ll get back to you as soon as possible.</p>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-zinc-700 mb-3">How can we help you?</label>
                <div className="flex overflow-x-auto gap-3 pb-2 hide-scrollbar">
                  {SUPPORT_CATEGORIES.map(category => {
                    const CatIcon = category.icon;
                    const isActive = formData.subject === category.id;
                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => handleCategoryClick(category.id)}
                        className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-all ${
                          isActive 
                            ? "bg-cp-primary border-cp-primary text-white shadow-md shadow-blue-500/20" 
                            : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300"
                        }`}
                      >
                        <CatIcon size={16} />
                        {category.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-zinc-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className={`contact-form-input ${errors.name ? 'error' : ''}`}
                    />
                    {errors.name && (
                      <div className="flex items-center gap-1.5 text-red-500 text-xs mt-2 font-medium">
                        <AlertCircle size={14} /> {errors.name}
                      </div>
                    )}
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-zinc-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`contact-form-input ${errors.email ? 'error' : ''}`}
                    />
                    {errors.email && (
                      <div className="flex items-center gap-1.5 text-red-500 text-xs mt-2 font-medium">
                        <AlertCircle size={14} /> {errors.email}
                      </div>
                    )}
                  </div>
                </div>

                {/* Subject Dropdown (syncs with categories) */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-zinc-700 mb-2">Subject</label>
                  <div className="relative">
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="contact-form-input appearance-none"
                    >
                      {SUPPORT_CATEGORIES.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-500">
                      <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-zinc-700 mb-2">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleChange}
                    className={`contact-form-input resize-none ${errors.message ? 'error' : ''}`}
                  />
                  {errors.message && (
                    <div className="flex items-center gap-1.5 text-red-500 text-xs mt-2 font-medium">
                      <AlertCircle size={14} /> {errors.message}
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-gradient flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} /> Send Message
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={clearForm}
                    disabled={isSubmitting}
                    className="py-4 px-8 rounded-xl font-bold border border-zinc-200 text-zinc-600 bg-white hover:bg-zinc-50 transition-colors disabled:opacity-50"
                  >
                    Clear Form
                  </button>
                </div>
              </form>
            </ScrollReveal>
          </div>

          {/* SIDEBAR */}
          <div className="lg:w-1/3">
            <ScrollReveal className="delay-200">
              <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-xl shadow-zinc-200/50 sticky top-24">
                <h3 className="text-xl font-bold text-zinc-900 mb-6">Office Information</h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center shrink-0 border border-zinc-100">
                      <MapPin size={20} className="text-zinc-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-zinc-900 text-sm mb-1">Headquarters</h4>
                      <p className="text-zinc-600 text-sm leading-relaxed">
                        123 Tech Boulevard, Suite 400<br />
                        San Francisco, CA 94105<br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center shrink-0 border border-zinc-100">
                      <Clock size={20} className="text-zinc-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-zinc-900 text-sm mb-1">Working Hours</h4>
                      <p className="text-zinc-600 text-sm">
                        Monday - Friday: 9AM - 6PM PST<br />
                        Saturday - Sunday: Closed
                      </p>
                    </div>
                  </div>
                  
                  <div className="w-full h-px bg-zinc-100 my-2" />

                  <div>
                    <h4 className="font-semibold text-zinc-900 text-sm mb-3">Connect with us</h4>
                    <div className="flex gap-3">
                      {SOCIAL_LINKS.map(social => {
                        const SocialIcon = social.icon;
                        return (
                          <a
                            key={social.name}
                            href="#"
                            className={`w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center border border-zinc-100 text-zinc-500 transition-all ${social.color}`}
                            aria-label={social.name}
                          >
                            <SocialIcon size={18} />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h4 className="font-semibold text-cp-primary text-sm mb-1">Enterprise Sales</h4>
                    <p className="text-zinc-600 text-sm mb-2">Looking for a team plan?</p>
                    <a href="mailto:sales@careerpilot.ai" className="text-sm font-bold text-blue-600 hover:underline">
                      sales@careerpilot.ai
                    </a>
                  </div>

                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ─── MAP SECTION (PLACEHOLDER) ─── */}
      <section className="py-12 max-w-7xl mx-auto px-6 w-full">
        <ScrollReveal>
          <div className="w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden relative border border-zinc-200 shadow-lg">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000&h=600')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-16 h-16 bg-cp-primary rounded-full flex items-center justify-center text-white shadow-[0_0_0_8px_rgba(37,99,235,0.2)] animate-pulse">
                <MapIcon size={32} />
              </div>
              <div className="mt-4 bg-white px-4 py-2 rounded-lg font-bold text-zinc-900 shadow-xl">
                San Francisco HQ
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ─── FAQ ─── */}
      <FAQSection />

      {/* ─── CTA ─── */}
      <section className="py-20 relative overflow-hidden bg-zinc-900 border-t border-zinc-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-zinc-900 to-zinc-900" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Need immediate help?
            </h2>
            <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
              Check out our comprehensive Help Center or ask our AI Career Assistant directly from your dashboard.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/dashboard/ai/career-assistant"
                className="btn-gradient px-8 py-4 rounded-xl text-white font-bold shadow-lg text-lg flex items-center justify-center gap-2"
              >
                Chat with AI Assistant <ArrowRight size={20} />
              </Link>
              <Link
                href="/faq"
                className="px-8 py-4 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-all text-lg border border-white/10 flex items-center justify-center"
              >
                Go to Help Center
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
