"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Check, FileText, Map, MessageSquare, Sparkles, TrendingUp } from "lucide-react";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [notifications, setNotifications] = useState([
    { id: 1, title: "Resume Analysis Completed", desc: "Your software engineer resume scored 85%. View suggestions.", icon: FileText, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30", unread: true, time: "2m ago" },
    { id: 2, title: "Interview Feedback Ready", desc: "Review your performance for the Frontend Developer mock interview.", icon: MessageSquare, color: "text-teal-500", bg: "bg-teal-100 dark:bg-teal-900/30", unread: true, time: "1h ago" },
    { id: 3, title: "Career Roadmap Updated", desc: "We've added new skills to your custom roadmap.", icon: Map, color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-900/30", unread: false, time: "1d ago" },
    { id: 4, title: "New AI Recommendation", desc: "Based on your profile, consider learning React Native.", icon: Sparkles, color: "text-fuchsia-500", bg: "bg-fuchsia-100 dark:bg-fuchsia-900/30", unread: false, time: "2d ago" },
    { id: 5, title: "Weekly Career Progress", desc: "You've completed 3 roadmap milestones this week!", icon: TrendingUp, color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/30", unread: false, time: "5d ago" }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-cp-primary transition-all border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-cp-primary focus:ring-offset-2 dark:focus:ring-offset-black"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white dark:border-zinc-900 rounded-full"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-white dark:bg-zinc-900 shadow-xl border border-zinc-200 dark:border-zinc-800 animate-fade-in origin-top-right z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/50">
            <h3 className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              Notifications
              {unreadCount > 0 && (
                <span className="bg-cp-primary/10 text-cp-primary text-xs px-2 py-0.5 rounded-full">{unreadCount} New</span>
              )}
            </h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllRead}
                className="text-xs font-semibold text-cp-primary hover:text-cp-primary/80 flex items-center gap-1"
              >
                <Check size={14} /> Mark all read
              </button>
            )}
          </div>

          <div className="max-h-[350px] overflow-y-auto">
            {notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`px-4 py-3 border-b border-zinc-50 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer flex gap-3 \${notification.unread ? 'bg-cp-primary/5 dark:bg-cp-primary/10' : ''}`}
              >
                <div className={`w-10 h-10 rounded-full \${notification.bg} flex items-center justify-center shrink-0`}>
                  <notification.icon size={18} className={notification.color} />
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-sm font-semibold \${notification.unread ? 'text-zinc-900 dark:text-white' : 'text-zinc-700 dark:text-zinc-300'}`}>
                      {notification.title}
                    </p>
                    <span className="text-[10px] text-zinc-500 whitespace-nowrap">{notification.time}</span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2">
                    {notification.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-2 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 text-center">
            <button className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
