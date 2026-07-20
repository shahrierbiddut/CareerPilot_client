"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Mail, Lock, Eye, EyeOff, Check, CheckCircle2, ArrowRight } from "lucide-react";
import { fetchAPI } from "@/app/lib/api";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Password validation checks
  const checks = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
  };
  
  const isValidPassword = Object.values(checks).every(Boolean);
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetchAPI("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password
        })
      });
      setTimeout(() => {
        router.push("/login?registered=true");
        router.refresh();
      }, 500);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
    <div className="w-full max-w-[480px] bg-white dark:bg-zinc-900 rounded-3xl p-8 sm:p-12 shadow-xl shadow-zinc-200/20 dark:shadow-black/40 border border-zinc-100 dark:border-zinc-800">
      
      <div className="mb-10 text-center sm:text-left">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Create your account</h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">Please fill in the details to get started</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">Full Name</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-cp-primary transition-colors">
              <User size={18} />
            </div>
            <input 
              type="text" 
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-cp-primary dark:focus:border-cp-primary focus:ring-2 focus:ring-cp-primary/20 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">Email</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-cp-primary transition-colors">
              <Mail size={18} />
            </div>
            <input 
              type="email" 
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-cp-primary dark:focus:border-cp-primary focus:ring-2 focus:ring-cp-primary/20 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">Password</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-cp-primary transition-colors">
              <Lock size={18} />
            </div>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-cp-primary dark:focus:border-cp-primary focus:ring-2 focus:ring-cp-primary/20 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
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

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">Confirm Password</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-cp-primary transition-colors">
              <Lock size={18} />
            </div>
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              placeholder="••••••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className={`w-full pl-11 pr-12 py-3.5 rounded-xl border bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600 ${
                formData.confirmPassword.length > 0 
                  ? passwordsMatch 
                    ? "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/20" 
                    : "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : "border-zinc-200 dark:border-zinc-800 focus:border-cp-primary dark:focus:border-cp-primary focus:ring-cp-primary/20"
              }`}
              required
            />
            <button 
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Password Requirements Checklist */}
        <div className="pt-2 pb-4">
          <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2">Password must contain:</p>
          <div className="space-y-1.5">
            <div className={`flex items-center gap-2 text-xs font-medium transition-colors ${checks.length ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-500 dark:text-zinc-500"}`}>
              {checks.length ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Check size={14} className="opacity-50" />}
              At least 8 characters
            </div>
            <div className={`flex items-center gap-2 text-xs font-medium transition-colors ${checks.uppercase ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-500 dark:text-zinc-500"}`}>
              {checks.uppercase ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Check size={14} className="opacity-50" />}
              One uppercase letter
            </div>
            <div className={`flex items-center gap-2 text-xs font-medium transition-colors ${checks.number ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-500 dark:text-zinc-500"}`}>
              {checks.number ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Check size={14} className="opacity-50" />}
              One number
            </div>
            <div className={`flex items-center gap-2 text-xs font-medium transition-colors ${checks.special ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-500 dark:text-zinc-500"}`}>
              {checks.special ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Check size={14} className="opacity-50" />}
              One special character
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={!isValidPassword || !passwordsMatch || isLoading}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Create Account
              <ArrowRight size={18} className="opacity-80" />
            </>
          )}
        </button>

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

        {/* Login Link */}
        <p className="text-center text-sm font-medium text-zinc-600 dark:text-zinc-400 pt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-bold hover:underline underline-offset-2">
            Login
          </Link>
        </p>

      </form>
    </div>
  );
}
