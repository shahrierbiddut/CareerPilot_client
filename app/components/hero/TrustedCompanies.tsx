"use client";

import { useState } from "react";
import ScrollReveal from "../ui/ScrollReveal";
import { Sparkles } from "lucide-react";

// Company logos with their brand colors for hover effect
const companies = [
  {
    name: "Google",
    color: "#4285F4",
    logo: (hovered: boolean) => (
      <svg viewBox="0 0 120 40" className="h-8 w-auto" aria-label="Google">
        <text
          x="0" y="32"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
          fontSize="32"
          fill={hovered ? "#4285F4" : "#9ca3af"}
          style={{ transition: "fill 0.3s ease" }}
        >G</text>
        <text
          x="22" y="32"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
          fontSize="32"
          fill={hovered ? "#EA4335" : "#9ca3af"}
          style={{ transition: "fill 0.3s ease" }}
        >o</text>
        <text
          x="42" y="32"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
          fontSize="32"
          fill={hovered ? "#FBBC05" : "#9ca3af"}
          style={{ transition: "fill 0.3s ease" }}
        >o</text>
        <text
          x="62" y="32"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
          fontSize="32"
          fill={hovered ? "#4285F4" : "#9ca3af"}
          style={{ transition: "fill 0.3s ease" }}
        >g</text>
        <text
          x="82" y="32"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
          fontSize="32"
          fill={hovered ? "#34A853" : "#9ca3af"}
          style={{ transition: "fill 0.3s ease" }}
        >l</text>
        <text
          x="94" y="32"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
          fontSize="32"
          fill={hovered ? "#EA4335" : "#9ca3af"}
          style={{ transition: "fill 0.3s ease" }}
        >e</text>
      </svg>
    ),
  },
  {
    name: "Microsoft",
    color: "#00a4ef",
    logo: (hovered: boolean) => (
      <div className="flex items-center gap-2">
        {/* Windows logo grid */}
        <div className="grid grid-cols-2 gap-0.5">
          {["#f25022", "#7fba00", "#00a4ef", "#ffb900"].map((c, i) => (
            <div
              key={i}
              className="h-3 w-3 rounded-sm transition-all duration-300"
              style={{ backgroundColor: hovered ? c : "#9ca3af" }}
            />
          ))}
        </div>
        <span
          className="text-lg font-semibold tracking-tight transition-colors duration-300"
          style={{ color: hovered ? "#374151" : "#9ca3af" }}
        >
          Microsoft
        </span>
      </div>
    ),
  },
  {
    name: "Amazon",
    color: "#FF9900",
    logo: (hovered: boolean) => (
      <span
        className="text-2xl font-bold tracking-tight transition-colors duration-300"
        style={{ fontFamily: "Georgia, serif", color: hovered ? "#131921" : "#9ca3af" }}
      >
        amazon
        <span style={{ color: hovered ? "#FF9900" : "#9ca3af", transition: "color 0.3s ease" }}>.</span>
      </span>
    ),
  },
  {
    name: "Meta",
    color: "#0082FB",
    logo: (hovered: boolean) => (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 40 25" className="h-6 w-auto">
          <path
            d="M6 12.5C6 8.36 8.7 5 12 5c1.75 0 3.3.85 4.5 2.2C17.7 5.85 19.25 5 21 5c3.3 0 6 3.36 6 7.5S24.3 20 21 20c-1.75 0-3.3-.85-4.5-2.2C15.3 19.15 13.75 20 12 20 8.7 20 6 16.64 6 12.5z"
            fill={hovered ? "#0082FB" : "#9ca3af"}
            style={{ transition: "fill 0.3s ease" }}
          />
        </svg>
        <span
          className="text-xl font-bold transition-colors duration-300"
          style={{ color: hovered ? "#0082FB" : "#9ca3af" }}
        >
          Meta
        </span>
      </div>
    ),
  },
  {
    name: "Netflix",
    color: "#E50914",
    logo: (hovered: boolean) => (
      <span
        className="text-2xl font-black tracking-tighter transition-colors duration-300"
        style={{ color: hovered ? "#E50914" : "#9ca3af" }}
      >
        NETFLIX
      </span>
    ),
  },
  {
    name: "Spotify",
    color: "#1DB954",
    logo: (hovered: boolean) => (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="h-7 w-7">
          <circle cx="12" cy="12" r="12" fill={hovered ? "#1DB954" : "#9ca3af"} style={{ transition: "fill 0.3s" }} />
          <path d="M17 16.5c-.2.3-.6.4-.9.2-2.5-1.5-5.5-1.9-9.1-1-0.4.1-.8-.2-.8-.6 0-.4.2-.7.6-.8 3.9-.9 7.3-.5 10.1 1.1.3.2.4.7.1 1.1zM18.2 13.7c-.3.4-.7.5-1.1.3-2.8-1.7-7.1-2.2-10.4-1.2-.4.1-.9-.1-1-.6-.1-.4.1-.9.6-1 3.7-1.1 8.4-.6 11.6 1.3.4.3.5.8.3 1.2zM18.3 10.8c-3.4-2-9-2.2-12.2-1.2-.5.2-1-.1-1.2-.6-.2-.5.1-1 .6-1.2 3.7-1.1 9.9-.9 13.8 1.4.5.3.6.9.3 1.4-.3.5-.9.6-1.3.2z" fill="white"/>
        </svg>
        <span
          className="text-xl font-bold transition-colors duration-300"
          style={{ color: hovered ? "#1DB954" : "#9ca3af" }}
        >
          Spotify
        </span>
      </div>
    ),
  },
  {
    name: "Adobe",
    color: "#FA0F00",
    logo: (hovered: boolean) => (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 32 32" className="h-7 w-7">
          <path
            d="M0 0h32v32H0z"
            fill={hovered ? "#FA0F00" : "#9ca3af"}
            style={{ transition: "fill 0.3s" }}
          />
          <path d="M18.5 7L26 25h-5.5l-1.5-4.5H15L18.5 7zM13.5 7L6 25h5.5l1.2-3.5h6.3l-3.5-9L13.5 7z" fill="white"/>
        </svg>
        <span
          className="text-xl font-bold transition-colors duration-300"
          style={{ color: hovered ? "#FA0F00" : "#9ca3af" }}
        >
          Adobe
        </span>
      </div>
    ),
  },
  {
    name: "IBM",
    color: "#006699",
    logo: (hovered: boolean) => (
      <span
        className="text-3xl font-black tracking-wider transition-colors duration-300"
        style={{ color: hovered ? "#006699" : "#9ca3af" }}
      >
        IBM
      </span>
    ),
  },
];

function LogoItem({ company }: { company: (typeof companies)[number] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex min-w-[140px] items-center justify-center px-8 py-4 cursor-default select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {company.logo(hovered)}
    </div>
  );
}

export default function TrustedCompanies() {
  // Duplicate for seamless infinite scroll
  const doubled = [...companies, ...companies];

  return (
    <section className="bg-white py-16 border-t border-zinc-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <ScrollReveal className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-cp-primary mb-6">
            <Sparkles size={14} />
            <span>Trusted Companies</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl mb-4">
            Prepare for opportunities at <span className="text-gradient">leading companies.</span>
          </h2>
        </ScrollReveal>

        {/* Scrolling Logos Marquee */}
        <div className="logo-marquee">
          <div className="logo-track">
            {doubled.map((company, i) => (
              <LogoItem key={`${company.name}-${i}`} company={company} />
            ))}
          </div>
        </div>

        {/* Static logos (shown on reduced motion preference) */}
        <noscript>
          <div className="flex flex-wrap items-center justify-center gap-8 pt-4">
            {companies.map((company) => (
              <div key={company.name} className="text-zinc-400">
                {company.logo(false)}
              </div>
            ))}
          </div>
        </noscript>
      </div>
    </section>
  );
}
