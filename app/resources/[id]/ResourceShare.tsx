"use client";

import { useState } from "react";
import { Link as LinkIcon, Mail, Check } from "lucide-react";

// Custom SVG Icons since Lucide removed brand icons
const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function ResourceShare() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    // In a real app, this would be: navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareButtons = [
    { name: "LinkedIn", icon: <LinkedinIcon size={18} />, color: "bg-[#0077b5] text-white hover:bg-[#006097]" },
    { name: "Twitter/X", icon: <TwitterIcon size={18} />, color: "bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200" },
    { name: "Facebook", icon: <FacebookIcon size={18} />, color: "bg-[#1877f2] text-white hover:bg-[#166fe5]" },
    { name: "Email", icon: <Mail size={18} />, color: "bg-zinc-600 text-white hover:bg-zinc-700" },
  ];

  return (
    <div className="mt-12 p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
      <div>
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Share this resource</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Know someone who could benefit from this? Share it with your network!
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold hover:border-cp-primary hover:text-cp-primary transition-all duration-200 shadow-sm"
        >
          {copied ? <Check size={18} className="text-emerald-500" /> : <LinkIcon size={18} />}
          {copied ? "Copied!" : "Copy Link"}
        </button>

        {/* Social Icons */}
        <div className="flex items-center gap-2">
          {shareButtons.map((btn) => (
            <button
              key={btn.name}
              title={`Share on ${btn.name}`}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${btn.color}`}
            >
              {btn.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
