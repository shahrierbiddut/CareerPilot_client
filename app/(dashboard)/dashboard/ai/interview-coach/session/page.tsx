"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { startInterview, submitAnswer, endInterview } from "@/app/lib/interviewApi";
import { 
  Timer, Target, MessageSquare, Send, StopCircle, 
  ChevronRight, CheckCircle2, AlertCircle, Bot
} from "lucide-react";

export default function AIInterviewSessionPage() {
  const router = useRouter();
  
  const [session, setSession] = useState<any>(null);
  const [config, setConfig] = useState<any>(null);
  
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [history, setHistory] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [ending, setEnding] = useState(false);
  
  const [timeRemaining, setTimeRemaining] = useState(15 * 60); // 15 mins default
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, currentQuestion]);

  useEffect(() => {
    const initInterview = async () => {
      const savedConfig = localStorage.getItem("cp_ai_interview_config");
      if (!savedConfig) {
        router.push("/dashboard/ai/interview-coach");
        return;
      }
      
      const parsedConfig = JSON.parse(savedConfig);
      setConfig(parsedConfig);
      
      // Parse duration
      const durationMins = parseInt(parsedConfig.duration.split(" ")[0]) || 15;
      setTimeRemaining(durationMins * 60);

      try {
        const res = await startInterview(parsedConfig);
        setSession(res);
        setCurrentQuestion(res.question);
      } catch (error) {
        console.error("Failed to start", error);
      } finally {
        setLoading(false);
      }
    };

    initInterview();
  }, [router]);

  // Timer Effect
  useEffect(() => {
    if (loading || ending || timeRemaining <= 0) return;
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleEndInterview();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [loading, ending, timeRemaining]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleEndInterview = async () => {
    if (!session || ending) return;
    setEnding(true);
    try {
      await endInterview(session.sessionId);
      localStorage.removeItem("cp_ai_interview_config");
      router.push(`/dashboard/ai/interview-coach/report/${session.sessionId}`);
    } catch (error) {
      console.error("End interview failed", error);
      setEnding(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerText.trim() || submitting || !session) return;

    setSubmitting(true);
    
    // Optimistic UI for User Answer
    const userAns = answerText;
    setAnswerText("");

    try {
      const res = await submitAnswer(session.sessionId, userAns);
      
      // Update history with evaluated answer
      setHistory(prev => [
        ...prev, 
        { 
          question: currentQuestion, 
          answer: userAns, 
          evaluation: res.evaluation 
        }
      ]);
      
      // Set Next Question
      setCurrentQuestion(res.nextQuestion);
    } catch (error) {
      console.error("Submit failed", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-zinc-500 font-medium">Preparing your AI Interviewer...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto pb-6 h-[calc(100vh-8rem)] flex flex-col animate-fade-in">
      
      {/* Header Panel */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 mb-4 flex items-center justify-between shadow-sm shrink-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-semibold">
            <Target size={18} className="text-teal-500" />
            {config?.jobRole} ({config?.interviewType})
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold border ${timeRemaining < 60 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'}`}>
            <Timer size={14} />
            {formatTime(timeRemaining)}
          </div>
        </div>
        
        <button 
          onClick={handleEndInterview}
          disabled={ending}
          className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-semibold transition-colors border border-red-200 dark:border-red-500/30"
        >
          {ending ? "Ending..." : (
            <><StopCircle size={16} /> End Interview</>
          )}
        </button>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-0">
        
        {/* Scrollable Conversation */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8">
          
          {history.length === 0 && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-teal-50 dark:bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-teal-100 dark:border-teal-500/20">
                <Bot size={32} className="text-teal-500" />
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium">The interview has started. Good luck!</p>
            </div>
          )}

          {/* History Items */}
          {history.map((item, i) => (
            <div key={i} className="space-y-4">
              {/* AI Question */}
              <div className="flex items-start gap-3 w-11/12 sm:w-5/6">
                <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center shrink-0 mt-1">
                  <Bot size={16} className="text-teal-700 dark:text-teal-300" />
                </div>
                <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-2xl rounded-tl-sm text-zinc-900 dark:text-zinc-100 text-sm leading-relaxed">
                  {item.question}
                </div>
              </div>

              {/* User Answer */}
              <div className="flex items-start justify-end gap-3 w-11/12 sm:w-5/6 ml-auto">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-4 rounded-2xl rounded-tr-sm text-sm leading-relaxed whitespace-pre-wrap shadow-sm">
                  {item.answer}
                </div>
              </div>

              {/* Inline AI Evaluation Feedback */}
              {item.evaluation && (
                <div className="flex justify-end w-11/12 sm:w-5/6 ml-auto mt-2">
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 p-3 rounded-xl text-xs flex gap-4 w-full">
                    <div className="shrink-0 flex flex-col items-center justify-center p-2 bg-white dark:bg-zinc-950 rounded-lg border border-emerald-100 dark:border-emerald-800">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg">{item.evaluation.answerScore}</span>
                      <span className="text-[10px] text-zinc-500 font-semibold uppercase">Score</span>
                    </div>
                    <div>
                      <p className="font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1 mb-1">
                        <CheckCircle2 size={12} /> Instant Feedback
                      </p>
                      <p className="text-zinc-700 dark:text-zinc-400 mb-2">
                        {item.evaluation.strengths[0]}. {item.evaluation.suggestions[0]}
                      </p>
                      {item.evaluation.betterAnswer && (
                        <div className="bg-white/60 dark:bg-black/20 p-2 rounded border border-emerald-100 dark:border-emerald-800/30">
                          <span className="font-bold text-zinc-900 dark:text-zinc-300">Pro Tip: </span>
                          <span className="text-zinc-600 dark:text-zinc-400 italic">"{item.evaluation.betterAnswer}"</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Current Question */}
          <div className="flex items-start gap-3 w-11/12 sm:w-5/6 animate-slide-up">
            <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center shrink-0 mt-1 shadow-sm border border-teal-200 dark:border-teal-800">
              <Bot size={16} className="text-teal-700 dark:text-teal-300" />
            </div>
            <div className="bg-zinc-100 dark:bg-zinc-800 p-4 sm:p-5 rounded-2xl rounded-tl-sm text-zinc-900 dark:text-zinc-100 text-sm leading-relaxed border border-zinc-200 dark:border-zinc-700 shadow-sm relative">
              {submitting ? (
                <div className="flex items-center gap-1.5 py-1">
                  <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce delay-150"></div>
                </div>
              ) : (
                <>
                  <span className="absolute -top-3 left-4 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-teal-200 dark:border-teal-800">Question {history.length + 1}</span>
                  {currentQuestion}
                </>
              )}
            </div>
          </div>
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shrink-0">
          <form onSubmit={handleSubmit} className="relative">
            <textarea
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder="Type your answer here... (be as detailed as you would in a real interview)"
              className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 pr-14 min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500/50 text-sm text-zinc-900 dark:text-white transition-all shadow-inner"
              disabled={submitting || ending}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                  handleSubmit(e);
                }
              }}
            />
            <div className="absolute right-3 bottom-3 flex gap-2">
              <button
                type="button"
                onClick={() => setAnswerText("I don't know the answer to this question. Could we skip it?")}
                disabled={submitting || ending}
                className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors tooltip"
                title="Skip / I don't know"
              >
                <ChevronRight size={20} />
              </button>
              <button
                type="submit"
                disabled={!answerText.trim() || submitting || ending}
                className="p-2 bg-teal-600 hover:bg-teal-700 disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 text-white rounded-lg transition-colors shadow-sm"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
          <div className="mt-2 text-xs text-zinc-400 font-medium flex justify-between">
            <span>Pro tip: Use STAR method (Situation, Task, Action, Result) for behavioral questions.</span>
            <span>Press Ctrl+Enter to send</span>
          </div>
        </div>
      </div>

    </div>
  );
}
