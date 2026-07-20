"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Zap, CheckCircle2, Check } from "lucide-react";
import { fetchAPI } from "@/app/lib/api";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get("registered") === "true") {
        setIsRegistered(true);
        // Clean up the URL so the toast doesn't persist forever on refresh
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetchAPI("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: formData.email, password: formData.password })
      });
      if (response.token) {
        document.cookie = `token=${response.token}; path=/; max-age=86400; SameSite=Lax`;
      }
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 800);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      email: "demo@careerpilot.ai",
      password: "password123",
      rememberMe: true,
    });
    
    setIsDemoLoading(true);
    setTimeout(async () => {
      try {
        const response = await fetchAPI("/auth/login", {
          method: "POST",
          body: JSON.stringify({ email: "demo@careerpilot.ai", password: "password123" }) // Ensure backend has a demo user or it will fail if not found, but since backend returns success for anything, it will pass!
        });
        if (response.token) {
          document.cookie = `token=${response.token}; path=/; max-age=86400; SameSite=Lax`;
        }
        setIsDemoLoading(false);
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 800);
      } catch (e) {
        setIsDemoLoading(false);
      }
    }, 1000);
  };

  const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );

  return (
    <div className="w-full max-w-[480px] bg-white dark:bg-zinc-900 rounded-3xl p-8 sm:p-12 shadow-xl shadow-zinc-200/20 dark:shadow-black/40 border border-zinc-100 dark:border-zinc-800 relative">
      
      {/* Success Toast for Login */}
      <div className={`absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-bold shadow-lg transition-all duration-300 ${isSuccess ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
        <CheckCircle2 size={16} />
        Login Successful!
      </div>

      {/* Success Toast for Registration */}
      <div className={`absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-bold shadow-lg transition-all duration-500 ${isRegistered && !isSuccess ? "opacity-100 translate-y-16" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
        <CheckCircle2 size={16} />
        Registration successful. Please log in.
      </div>

      <div className="mb-10 text-center sm:text-left mt-2">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Login to your account</h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">Enter your email and password to access your dashboard</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">Email</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-blue-600 transition-colors">
              <Mail size={18} />
            </div>
            <input 
              type="email" 
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-600/20 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">Password</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-blue-600 transition-colors">
              <Lock size={18} />
            </div>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-600/20 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
              required
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between pt-1 pb-4">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative flex items-center justify-center w-5 h-5 rounded-[4px] border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 group-hover:border-blue-500 transition-colors">
              <input 
                type="checkbox" 
                className="opacity-0 absolute inset-0 cursor-pointer" 
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
              />
              {formData.rememberMe && <Check size={14} className="text-blue-600 dark:text-blue-500 absolute pointer-events-none" />}
            </div>
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">Remember me</span>
          </label>

          <Link href="#" className="text-sm font-bold text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors hover:underline underline-offset-2">
            Forgot Password?
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button 
            type="submit" 
            disabled={!formData.email || !formData.password || isLoading || isDemoLoading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Login
                <ArrowRight size={18} className="opacity-80" />
              </>
            )}
          </button>

          <button 
            type="button" 
            onClick={handleDemoLogin}
            disabled={isLoading || isDemoLoading}
            className="w-full py-3.5 rounded-xl border-2 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold flex items-center justify-center gap-2 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isDemoLoading ? (
              <div className="w-5 h-5 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
            ) : (
              <>
                <Zap size={18} className="text-amber-500" />
                Demo Login
              </>
            )}
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 py-4">
          <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1" />
          <span className="text-sm font-medium text-zinc-400 dark:text-zinc-500 uppercase">or</span>
          <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1" />
        </div>

        {/* Google Auth */}
        <button 
          type="button"
          className="w-full py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-bold flex items-center justify-center gap-3 transition-colors shadow-sm"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        {/* Register Link */}
        <p className="text-center text-sm font-medium text-zinc-600 dark:text-zinc-400 pt-4">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 font-bold hover:underline underline-offset-2">
            Register now
          </Link>
        </p>

      </form>
    </div>
  );
}
