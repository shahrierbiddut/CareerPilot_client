"use client";

import { useEffect, useState, useRef } from "react";
import { 
  Bot, Send, Activity, BrainCircuit, Lightbulb, TrendingUp, Target, 
  Menu, X, Sparkles, BookOpen, ChevronRight, Save, LayoutDashboard
} from "lucide-react";
import { startCareerAnalysisSession, sendCareerChatMessage } from "@/app/lib/careerAnalysisApi";

export default function CareerAnalysisPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("grok");
  
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize session
  useEffect(() => {
    const initSession = async () => {
      try {
        const aiProvider = localStorage.getItem("cp_ai_provider") || "grok";
        setSelectedProvider(aiProvider);
        const res = await startCareerAnalysisSession({ aiProvider });
        setSession(res);
      } catch (error) {
        console.error("Failed to start session", error);
      } finally {
        setLoading(false);
      }
    };
    initSession();
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [session?.messages, streamingText]);

  // Simulated Streaming Effect
  const simulateStreaming = async (fullText: string) => {
    setStreamingText("");
    const chars = fullText.split("");
    let current = "";
    
    for (let i = 0; i < chars.length; i++) {
      current += chars[i];
      setStreamingText(current);
      // Random delay between 10ms and 30ms for typing effect
      await new Promise(r => setTimeout(r, Math.random() * 20 + 10));
    }
    return current;
  };

  const handleSendMessage = async (e?: React.FormEvent, presetMessage?: string) => {
    e?.preventDefault();
    const textToSend = presetMessage || message;
    if (!textToSend.trim() || submitting || !session) return;

    setSubmitting(true);
    setMessage("");

    // Optimistic UI for User
    const updatedSession = { ...session };
    updatedSession.messages.push({ role: "user", content: textToSend });
    setSession(updatedSession);

    try {
      const res = await sendCareerChatMessage(session._id, textToSend, selectedProvider);
      
      // We don't push the assistant message immediately. We simulate streaming.
      await simulateStreaming(res.message);
      
      // Once streaming is done, apply the actual state
      setStreamingText("");
      const finalSession = { ...session };
      finalSession.messages.push({ role: "assistant", content: res.message });
      finalSession.memory = res.memory;
      finalSession.metrics = res.metrics;
      setSession(finalSession);

    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[calc(100vh-8rem)] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const metrics = session?.metrics || {};
  const memory = session?.memory || {};
  const history = session?.messages || [];

  const suggestedPrompts = [
    "Improve my resume", "Find missing skills", "Recommend jobs", 
    "Career roadmap", "Salary negotiation", "Learning plan"
  ];

  return (
    <div className="w-full h-[calc(100vh-6rem)] -mt-2 animate-fade-in flex flex-col">
      
      {/* Top Mobile/Tablet Nav */}
      <div className="lg:hidden flex items-center justify-between mb-4 bg-white dark:bg-zinc-900 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 shrink-0">
        <button onClick={() => setLeftDrawerOpen(true)} className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          <Activity size={18} className="text-violet-500" /> Metrics
        </button>
        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
          Career AI
        </span>
        <button onClick={() => setRightDrawerOpen(true)} className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          Memory <BrainCircuit size={18} className="text-fuchsia-500" />
        </button>
      </div>

      <div className="flex-1 flex gap-6 min-h-0 relative">
        
        {/* LEFT PANEL: Metrics (Hidden on Mobile/Tablet) */}
        <div className={`
          absolute lg:relative z-20 h-full w-80 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 flex flex-col gap-6 overflow-y-auto shadow-xl lg:shadow-none transition-transform duration-300
          ${leftDrawerOpen ? "translate-x-0" : "-translate-x-[120%] lg:translate-x-0"}
        `}>
          {leftDrawerOpen && (
            <button onClick={() => setLeftDrawerOpen(false)} className="lg:hidden absolute top-4 right-4 text-zinc-400">
              <X size={20} />
            </button>
          )}

          <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold text-lg">
            <Activity className="text-violet-500" /> Career Health
          </div>

          <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-900/10 dark:to-fuchsia-900/10 p-5 rounded-2xl border border-violet-100 dark:border-violet-800/30 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-violet-800 dark:text-violet-400 uppercase">Overall Score</p>
              <p className="text-3xl font-black text-violet-950 dark:text-violet-200 mt-1">{metrics.healthScore}</p>
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-violet-500 flex items-center justify-center font-bold text-violet-600 dark:text-violet-400">
              {metrics.healthScore}%
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase mb-3">Status</p>
            <div className="bg-zinc-100 dark:bg-zinc-800/50 px-4 py-2 rounded-xl text-sm font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
              {metrics.readinessStatus}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase mb-3">Skill Overview</p>
            <div className="space-y-3">
              {[
                { label: "Technical", val: metrics.skillOverview?.technical || 50 },
                { label: "Soft Skills", val: metrics.skillOverview?.soft || 50 },
                { label: "Leadership", val: metrics.skillOverview?.leadership || 50 }
              ].map(s => (
                <div key={s.label}>
                  <div className="flex justify-between text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                    <span>{s.label}</span>
                    <span>{s.val}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 rounded-full" style={{ width: `${s.val}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase mb-3 flex items-center gap-1"><Lightbulb size={14}/> Suggestions</p>
            <ul className="space-y-2">
              {metrics.learningSuggestions?.map((s: string, i: number) => (
                <li key={i} className="text-sm text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-950 p-2.5 rounded-lg border border-zinc-100 dark:border-zinc-800 flex items-start gap-2">
                  <TrendingUp size={16} className="text-violet-500 shrink-0 mt-0.5" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CENTER PANEL: Chat Interface */}
        <div className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm flex flex-col min-w-0 overflow-hidden relative">
          
          {/* Header */}
          <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-md shadow-violet-500/20">
                <Bot size={22} className="text-white" />
              </div>
              <div>
                <h2 className="font-bold text-zinc-900 dark:text-white">AI Career Assistant</h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] uppercase font-bold text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/30 px-1.5 py-0.5 rounded">Engine</span>
                  <select 
                    value={selectedProvider}
                    onChange={(e) => {
                      setSelectedProvider(e.target.value);
                      localStorage.setItem("cp_ai_provider", e.target.value);
                    }}
                    className="text-xs bg-transparent border-none text-zinc-500 focus:ring-0 p-0 cursor-pointer outline-none"
                  >
                    <option value="grok">Grok (xAI)</option>
                    <option value="gemini">Gemini (Google)</option>
                    <option value="mock">Mock (Testing)</option>
                  </select>
                </div>
              </div>
            </div>
            <button className="text-zinc-400 hover:text-zinc-600 p-2"><LayoutDashboard size={18} /></button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {history.map((msg: any, i: number) => (
              <div key={i} className={`flex items-start gap-3 w-11/12 sm:w-5/6 ${msg.role === 'user' ? 'ml-auto justify-end' : ''}`}>
                {msg.role !== 'user' && (
                  <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center shrink-0 mt-1 border border-violet-200 dark:border-violet-800/50">
                    <Sparkles size={16} className="text-violet-600 dark:text-violet-400" />
                  </div>
                )}
                <div className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user' 
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-tr-sm border border-zinc-200 dark:border-zinc-700' 
                    : 'bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white rounded-tl-sm shadow-md shadow-violet-500/10'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Streaming Message */}
            {submitting && (
              <div className="flex items-start gap-3 w-11/12 sm:w-5/6 animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center shrink-0 mt-1 border border-violet-200 dark:border-violet-800/50">
                  <Sparkles size={16} className="text-violet-600 dark:text-violet-400" />
                </div>
                <div className="p-4 rounded-2xl rounded-tl-sm text-sm leading-relaxed whitespace-pre-wrap bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white shadow-md min-h-[50px] relative w-full">
                  {!streamingText ? (
                    <div className="flex items-center gap-1.5 py-1">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-75"></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-150"></div>
                    </div>
                  ) : (
                    <span>{streamingText}<span className="inline-block w-1.5 h-4 bg-white/80 ml-1 animate-pulse align-middle"></span></span>
                  )}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts (Only show if history is just 1 message) */}
          {history.length <= 1 && !submitting && (
            <div className="px-4 pb-2 overflow-x-auto whitespace-nowrap hide-scrollbar">
              <div className="flex gap-2">
                {suggestedPrompts.map(p => (
                  <button 
                    key={p} 
                    onClick={() => handleSendMessage(undefined, p)}
                    className="px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold hover:bg-violet-50 hover:text-violet-600 dark:hover:bg-violet-500/20 dark:hover:text-violet-400 transition-colors border border-zinc-200 dark:border-zinc-700 whitespace-nowrap"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <form onSubmit={(e) => handleSendMessage(e)} className="relative flex items-end gap-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-2 focus-within:ring-2 ring-violet-500/20 focus-within:border-violet-500/50 transition-all shadow-inner">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about your career, resume, or goals..."
                className="w-full bg-transparent px-3 py-2 max-h-[150px] min-h-[44px] resize-none focus:outline-none text-sm text-zinc-900 dark:text-white"
                disabled={submitting}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <button
                type="submit"
                disabled={!message.trim() || submitting}
                className="p-3 bg-violet-600 hover:bg-violet-700 disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 text-white rounded-xl transition-colors shadow-sm shrink-0"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT PANEL: Memory (Hidden on Mobile/Tablet) */}
        <div className={`
          absolute lg:relative right-0 z-20 h-full w-72 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 flex flex-col gap-6 overflow-y-auto shadow-xl lg:shadow-none transition-transform duration-300
          ${rightDrawerOpen ? "translate-x-0" : "translate-x-[120%] lg:translate-x-0"}
        `}>
          {rightDrawerOpen && (
            <button onClick={() => setRightDrawerOpen(false)} className="lg:hidden absolute top-4 right-4 text-zinc-400">
              <X size={20} />
            </button>
          )}

          <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold text-lg">
            <BrainCircuit className="text-fuchsia-500" /> AI Memory
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            The AI builds a continuous understanding of your profile across conversations.
          </p>

          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase mb-3 flex items-center gap-1"><Target size={14}/> Known Goals</p>
              <div className="flex flex-wrap gap-2">
                {memory.userGoals?.length ? memory.userGoals.map((g: string, i: number) => (
                  <span key={i} className="px-2.5 py-1 bg-fuchsia-50 dark:bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-400 rounded border border-fuchsia-200 dark:border-fuchsia-500/20 text-xs font-semibold">
                    {g}
                  </span>
                )) : <span className="text-xs text-zinc-400 italic">No goals recorded yet.</span>}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase mb-3 flex items-center gap-1"><BookOpen size={14}/> Recognized Skills</p>
              <div className="flex flex-wrap gap-2">
                {memory.knownSkills?.length ? memory.knownSkills.map((s: string, i: number) => (
                  <span key={i} className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded border border-zinc-200 dark:border-zinc-700 text-xs font-semibold">
                    {s}
                  </span>
                )) : <span className="text-xs text-zinc-400 italic">No skills recorded yet.</span>}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <p className="text-xs font-bold text-zinc-500 uppercase mb-3 flex items-center gap-1"><Save size={14}/> Saved Context</p>
              <ul className="space-y-3">
                {memory.savedAdvice?.length ? memory.savedAdvice.map((a: string, i: number) => (
                  <li key={i} className="text-xs text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                    <ChevronRight size={14} className="text-fuchsia-500 shrink-0" />
                    {a}
                  </li>
                )) : <li className="text-xs text-zinc-400 italic">No context saved yet.</li>}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
