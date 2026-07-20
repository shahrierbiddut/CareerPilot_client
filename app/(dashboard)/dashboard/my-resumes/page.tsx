"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Eye, Edit, Trash2, Zap, FileText } from "lucide-react";
import Link from "next/link";
import { getResumes, deleteResume, analyzeResume } from "@/app/lib/resumeApi";
import { useRouter } from "next/navigation";

export default function MyResumesPage() {
  const [resumes, setResumes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setIsLoading(true);
      const data = await getResumes();
      setResumes(data);
    } catch (error) {
      console.error("Failed to fetch resumes", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resume?")) return;
    try {
      await deleteResume(id);
      setResumes(resumes.filter((r) => r._id !== id));
      // Optional: Add a success toast here
    } catch (error) {
      console.error("Failed to delete resume", error);
    }
  };

  const handleAnalyze = async (id: string) => {
    try {
      // In a real app, show a loading state on this specific row
      await analyzeResume(id);
      router.push(`/dashboard/my-resumes/${id}`);
    } catch (error) {
      console.error("Failed to analyze resume", error);
    }
  };

  const filteredResumes = resumes.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
            My Resumes
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage, organize, and analyze all your resumes.</p>
        </div>
        <Link 
          href="/dashboard/add-resume"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-cp-primary hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cp-primary/30 active:scale-95"
        >
          <Plus size={18} />
          <span>Add Resume</span>
        </Link>
      </div>

      {/* Data Table Container */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden relative">
        
        {/* Table Search / Filters */}
        <div className="p-4 sm:p-6 border-b border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between gap-4 items-center bg-zinc-50/50 dark:bg-zinc-900/50">
          <div className="relative w-full max-w-sm group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-cp-primary transition-colors">
              <Search size={16} />
            </div>
            <input 
              type="text" 
              placeholder="Search by title or category..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-cp-primary/50 rounded-xl text-sm outline-none transition-all placeholder:text-zinc-500 shadow-sm dark:text-white"
            />
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <select className="px-4 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm outline-none text-zinc-700 dark:text-zinc-300 shadow-sm w-full sm:w-auto">
              <option value="">All Categories</option>
              <option value="engineering">Engineering</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="p-10 flex flex-col items-center justify-center space-y-4">
            <div className="w-8 h-8 border-4 border-cp-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-zinc-500">Loading resumes...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredResumes.length === 0 && (
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-400 mb-4">
              <FileText size={32} />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">No resumes found</h3>
            <p className="text-zinc-500 max-w-sm mb-6">You haven't created any resumes yet, or none match your search criteria.</p>
            <Link 
              href="/dashboard/add-resume"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-900 font-semibold rounded-xl transition-all"
            >
              <Plus size={18} />
              <span>Create Your First Resume</span>
            </Link>
          </div>
        )}

        {/* Table Desktop */}
        {!isLoading && filteredResumes.length > 0 && (
          <div className="overflow-x-auto hidden md:block">
            <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-300">
              <thead className="text-xs uppercase bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 font-semibold">
                <tr>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap">Resume Details</th>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap">Status</th>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap">Scores</th>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap">Last Updated</th>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/50">
                {filteredResumes.map((resume) => (
                  <tr key={resume._id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-semibold text-zinc-900 dark:text-white text-base">{resume.title}</span>
                        <span className="text-xs text-zinc-500 mt-0.5">{resume.category} • {resume.experienceLevel}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {resume.status === 'analyzed' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-medium text-xs border border-emerald-200 dark:border-emerald-500/20">
                          <Zap size={12} fill="currentColor" /> Analyzed
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 font-medium text-xs border border-amber-200 dark:border-amber-500/20">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Resume</span>
                          <span className={`font-bold ${resume.resumeScore >= 80 ? 'text-emerald-600 dark:text-emerald-400' : resume.resumeScore >= 60 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>
                            {resume.resumeScore || 0}/100
                          </span>
                        </div>
                        <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800"></div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">ATS</span>
                          <span className={`font-bold ${resume.atsScore >= 80 ? 'text-emerald-600 dark:text-emerald-400' : resume.atsScore >= 60 ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-600 dark:text-zinc-400'}`}>
                            {resume.atsScore || 0}%
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-zinc-500 dark:text-zinc-400 text-sm">
                      {new Date(resume.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/dashboard/my-resumes/${resume._id}`} className="p-2 text-zinc-500 hover:text-cp-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title="View Details">
                          <Eye size={18} />
                        </Link>
                        <button onClick={() => handleAnalyze(resume._id)} className="p-2 text-zinc-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors" title="Analyze with AI">
                          <Zap size={18} />
                        </button>
                        <button onClick={() => handleDelete(resume._id)} className="p-2 text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Delete Resume">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Mobile Cards */}
        {!isLoading && filteredResumes.length > 0 && (
          <div className="md:hidden divide-y divide-zinc-200 dark:divide-zinc-800">
            {filteredResumes.map((resume) => (
              <div key={resume._id} className="p-4 flex flex-col gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white text-base leading-tight mb-1">{resume.title}</h3>
                    <p className="text-xs text-zinc-500">{resume.category} • Updated {new Date(resume.updatedAt).toLocaleDateString()}</p>
                  </div>
                  {resume.status === 'analyzed' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-medium text-[10px] border border-emerald-200 dark:border-emerald-500/20">
                      <Zap size={10} fill="currentColor" /> Analyzed
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 font-medium text-[10px] border border-amber-200 dark:border-amber-500/20">
                      Draft
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
                  <div className="flex flex-col flex-1">
                    <span className="text-[10px] text-zinc-500 uppercase font-semibold">Resume Score</span>
                    <span className="font-bold text-lg text-zinc-900 dark:text-white">{resume.resumeScore || 0}/100</span>
                  </div>
                  <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-800"></div>
                  <div className="flex flex-col flex-1">
                    <span className="text-[10px] text-zinc-500 uppercase font-semibold">ATS Score</span>
                    <span className="font-bold text-lg text-zinc-900 dark:text-white">{resume.atsScore || 0}%</span>
                  </div>
                </div>

                <div className="flex gap-2 w-full pt-1">
                  <Link href={`/dashboard/my-resumes/${resume._id}`} className="flex-1 flex items-center justify-center gap-2 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold rounded-lg transition-colors">
                    <Eye size={14} /> View
                  </Link>
                  <button onClick={() => handleAnalyze(resume._id)} className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 text-xs font-semibold rounded-lg transition-colors">
                    <Zap size={14} /> Analyze
                  </button>
                  <button onClick={() => handleDelete(resume._id)} className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors border border-transparent hover:border-red-200 dark:hover:border-red-900/50">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
