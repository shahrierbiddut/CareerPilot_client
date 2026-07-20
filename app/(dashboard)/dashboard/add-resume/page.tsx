"use client";

import { useState, useRef } from "react";
import { UploadCloud, ArrowLeft, Save, Zap, File as FileIcon, X } from "lucide-react";
import Link from "next/link";
import { createResume } from "@/app/lib/resumeApi";
import { useRouter } from "next/navigation";

export default function AddResumePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "engineering",
    experienceLevel: "mid",
    skills: "",
    targetJobRole: ""
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFile = (file: File) => {
    if (file) {
      setUploadedFile(file);
      // Simulate file parsing
      setFormData(prev => ({
        ...prev,
        title: prev.title || file.name.replace(/\.[^/.]+$/, ""),
        content: prev.content || "Experience: Senior Software Engineer at Tech Corp (2018-2023).\nEducation: B.Sc. in Computer Science.\nSkills: JavaScript, React, Node.js, Python, SQL.\n(This text was automatically extracted from your uploaded file.)"
      }));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = async (status: "draft" | "analyzed") => {
    if (!formData.title || !formData.content) {
      alert("Please fill in Title and Content at minimum.");
      return;
    }

    try {
      setIsSubmitting(true);
      const dataToSubmit = {
        ...formData,
        skills: formData.skills.split(",").map(s => s.trim()).filter(Boolean),
        status
      };
      
      const res = await createResume(dataToSubmit);
      
      if (status === "analyzed") {
        // Theoretically we could call analyze API right here or handle it in backend
        // Since we are simulating, we just saved. Let's redirect to list where they can analyze,
        // or redirect to analyze route. Actually, better redirect to list for now to keep flow simple.
      }
      
      router.push("/dashboard/my-resumes");
      router.refresh();
    } catch (error) {
      console.error("Failed to save resume", error);
      alert("Failed to save resume.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/dashboard/my-resumes"
          className="p-2 -ml-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Add New Resume
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Create a new resume manually or upload a file.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Main Form */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6">Basic Information</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Resume Title <span className="text-red-500">*</span></label>
                <input 
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Senior Frontend Engineer" 
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cp-primary/20 focus:border-cp-primary/50 text-zinc-900 dark:text-white transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Target Job Role</label>
                <input 
                  type="text"
                  name="targetJobRole"
                  value={formData.targetJobRole}
                  onChange={handleChange}
                  placeholder="e.g. React Developer" 
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cp-primary/20 focus:border-cp-primary/50 text-zinc-900 dark:text-white transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Short Description</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="A brief note about this resume version..." 
                  rows={2}
                  className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cp-primary/20 focus:border-cp-primary/50 text-zinc-900 dark:text-white transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Category</label>
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cp-primary/20 focus:border-cp-primary/50 text-zinc-900 dark:text-white transition-all"
                  >
                    <option value="engineering">Engineering</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="management">Management</option>
                    <option value="sales">Sales</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Experience Level</label>
                  <select 
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cp-primary/20 focus:border-cp-primary/50 text-zinc-900 dark:text-white transition-all"
                  >
                    <option value="entry">Entry Level (0-2 years)</option>
                    <option value="mid">Mid Level (3-5 years)</option>
                    <option value="senior">Senior Level (5+ years)</option>
                    <option value="lead">Lead / Manager</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Skills (comma separated)</label>
                <input 
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="React, TypeScript, Node.js..." 
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cp-primary/20 focus:border-cp-primary/50 text-zinc-900 dark:text-white transition-all"
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6">Resume Content <span className="text-red-500">*</span></h2>
            <p className="text-sm text-zinc-500 mb-4">Paste the text content of your resume here. This will be analyzed by our AI.</p>
            <textarea 
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Experience... Education... Skills..." 
              rows={12}
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cp-primary/20 focus:border-cp-primary/50 text-zinc-900 dark:text-white transition-all resize-none font-mono text-xs"
            />
          </div>
        </div>

        {/* Sidebar / Upload */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Upload File</h2>
            <p className="text-xs text-zinc-500 mb-4">Upload a PDF or DOCX file to automatically extract text (simulated feature).</p>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileSelect} 
              className="hidden" 
              accept=".pdf,.docx,.doc,.txt"
            />

            {!uploadedFile ? (
              <div 
                className={`w-full p-8 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-4 transition-colors cursor-pointer ${
                  isDragging 
                    ? "border-cp-primary bg-cp-primary/5" 
                    : "border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/30 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                }`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <UploadCloud size={24} />
                </div>
                <div className="text-center pointer-events-none">
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Click or drag file here
                  </p>
                  <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider font-semibold">
                    PDF, DOCX up to 5MB
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full p-4 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 bg-white dark:bg-zinc-900 rounded-xl shadow-sm shrink-0">
                    <FileIcon size={20} className="text-blue-500" />
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">{uploadedFile.name}</p>
                    <p className="text-xs text-zinc-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button 
                  onClick={removeFile}
                  className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors shrink-0"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm flex flex-col gap-3">
            <button 
              onClick={() => handleSave("draft")}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
            >
              <Save size={18} />
              Save as Draft
            </button>
            <button 
              onClick={() => handleSave("analyzed")}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-95 disabled:opacity-50"
            >
              <Zap size={18} fill="currentColor" />
              Save & Analyze
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
