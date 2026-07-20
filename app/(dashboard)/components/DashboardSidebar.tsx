"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { fetchAPI } from "@/app/lib/api";
import { 
  LayoutDashboard, 
  FileText, 
  Sparkles, 
  User, 
  LogOut, 
  Settings,
  ChevronLeft,
  X,
  Map,
  MessageSquare,
  FileSearch,
  Bot,
  BarChart2,
  LifeBuoy,
  BookOpen,
  Zap
} from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (val: boolean) => void;
}

export default function DashboardSidebar({ 
  isCollapsed, 
  setIsCollapsed, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const navigationGroups = [
    {
      title: "Menu",
      links: [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "My Resume", href: "/dashboard/my-resumes", icon: FileText },
      ]
    },
    {
      title: "AI Tools",
      links: [
        { name: "Resume Analyzer", href: "/dashboard/ai/resume-analyzer", icon: FileSearch },
        { name: "Interview Coach", href: "/dashboard/ai/interview-coach", icon: MessageSquare },
        { name: "Career Analysis", href: "/dashboard/ai/career-analysis", icon: Bot },
        { name: "Career Roadmap", href: "/dashboard/ai/career-roadmap", icon: Map },
      ]
    },
    {
      title: "Account",
      links: [
        { name: "Analytics", href: "/analytics", icon: BarChart2 },
        { name: "Profile", href: "/dashboard/profile", icon: User },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
      ]
    }
  ];

  const bottomLinks = [
    { name: "Support", href: "/support", icon: LifeBuoy },
    { name: "Documentation", href: "/docs", icon: BookOpen },
    { 
      name: "Logout", 
      href: "#", 
      icon: LogOut, 
      textClass: "text-red-400 group-hover:text-red-300",
      onClick: async (e: any) => {
        e.preventDefault();
        try {
          await fetchAPI("/auth/logout", { method: "POST" });
        } catch (error) {
          console.error("Logout failed", error);
        }
        router.push("/login");
        router.refresh();
      }
    },
  ];

  const renderLink = (link: any) => {
    const isActive = pathname === link.href;
    const Icon = link.icon;
    
    return (
      <Link 
        key={link.name} 
        href={link.href}
        onClick={(e) => {
          setIsMobileMenuOpen(false);
          if (link.onClick) link.onClick(e);
        }}
        className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
          isActive 
            ? "bg-blue-600/10 text-blue-400 font-medium" 
            : "text-slate-400 hover:text-white hover:bg-slate-800/50"
        }`}
      >
        <div className="flex items-center justify-center w-6 h-6 shrink-0">
          <Icon size={20} className={`${isActive ? "text-blue-400" : "text-slate-400 group-hover:text-white"} transition-colors ${link.textClass || ""}`} />
        </div>
        
        <span className={`whitespace-nowrap transition-all duration-300 ${isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"} ${link.textClass || ""}`}>
          {link.name}
        </span>

        {/* Tooltip for collapsed state */}
        {isCollapsed && (
          <div className="absolute left-full ml-4 px-3 py-1.5 bg-slate-800 text-white text-xs font-medium rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50 whitespace-nowrap shadow-xl border border-slate-700">
            {link.name}
          </div>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        flex flex-col
        bg-[#0B1120] text-slate-300
        transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
        shadow-[4px_0_24px_rgba(0,0,0,0.1)] lg:shadow-none
        border-r border-slate-800/80
        ${isCollapsed ? "w-[80px]" : "w-[280px]"}
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        
        {/* Header / Logo */}
        <div className="h-20 flex items-center justify-between px-6 shrink-0 relative border-b border-slate-800/50">
          <Link href="/" className="flex items-center gap-3 overflow-hidden" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
              <Sparkles size={16} className="text-white" fill="currentColor" />
            </div>
            <span className={`font-bold text-xl text-white tracking-tight whitespace-nowrap transition-all duration-300 ${isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"}`}>
              CareerPilot <span className="text-blue-400 font-medium">AI</span>
            </span>
          </Link>
          
          <button 
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 scrollbar-none">
          {navigationGroups.map((group, i) => (
            <div key={i} className="flex flex-col gap-1 relative">
              {/* Group Title - With tooltip logic for collapsed state if desired, but we hide it */}
              <div className={`px-3 mb-2 text-xs font-semibold tracking-wider text-slate-500 uppercase transition-opacity duration-300 ${isCollapsed ? 'opacity-0 h-0 hidden' : 'opacity-100'}`}>
                {group.title}
              </div>
              {/* Divider for collapsed state instead of title */}
              {isCollapsed && i > 0 && (
                <div className="w-8 h-px bg-slate-800 mx-auto mb-2 mt-1"></div>
              )}
              {group.links.map(renderLink)}
            </div>
          ))}
        </div>

        {/* Bottom Links */}
        <div className="p-4 border-t border-slate-800/50">
          <div className="flex flex-col gap-1">
            {bottomLinks.map(renderLink)}
          </div>
          
          {/* Version / Feature Flag - Hidden when collapsed */}
          <div className={`mt-4 px-3 flex items-center justify-between text-xs text-slate-500 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 h-0 hidden' : 'opacity-100'}`}>
            <span>CareerPilot AI</span>
            <span className="bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700 font-medium">v2.4.0</span>
          </div>
        </div>

        {/* Collapse Toggle (Desktop Only) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-3.5 top-24 w-7 h-7 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full items-center justify-center border border-slate-700 shadow-xl transition-transform hover:scale-110 z-10"
        >
          <ChevronLeft size={16} className={`transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`} />
        </button>
      </aside>
    </>
  );
}
