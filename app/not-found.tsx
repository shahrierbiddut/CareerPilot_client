import Link from "next/link";
import { FileQuestion, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-24 px-4 text-center">
      {/* Illustration Container */}
      <div className="relative flex items-center justify-center w-40 h-40 mb-8">
        <div className="absolute inset-0 bg-cp-primary/10 dark:bg-cp-primary/20 rounded-full animate-pulse" />
        <div className="absolute inset-6 bg-cp-primary/20 dark:bg-cp-primary/30 rounded-full" />
        <FileQuestion size={48} className="text-cp-primary relative z-10" />
        
        {/* Floating Elements for illustration effect */}
        <div className="absolute top-4 right-4 p-2.5 bg-white dark:bg-zinc-800 rounded-full shadow-lg animate-bounce" style={{ animationDuration: '3s' }}>
          <Search size={16} className="text-amber-500" />
        </div>
      </div>
      
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4 animate-fade-in">
        Page <span className="text-gradient">Not Found</span>
      </h1>
      
      <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-lg mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: '100ms' }}>
        We couldn't find the page you're looking for. It might have been moved, deleted, or perhaps the URL is incorrect.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <Link 
          href="/"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors w-full sm:w-auto justify-center"
        >
          <ArrowLeft size={18} />
          Go to Home
        </Link>
        <Link 
          href="/explore"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cp-primary text-white font-semibold hover:bg-blue-700 shadow-lg shadow-cp-primary/30 transition-colors w-full sm:w-auto justify-center"
        >
          <Search size={18} />
          Explore Resources
        </Link>
      </div>
    </div>
  );
}
