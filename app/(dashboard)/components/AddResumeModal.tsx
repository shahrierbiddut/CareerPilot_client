import { X, UploadCloud } from "lucide-react";
import { useState } from "react";

interface AddResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddResumeModal({ isOpen, onClose }: AddResumeModalProps) {
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 w-full max-w-lg shadow-2xl shadow-black/20 overflow-hidden animate-fade-in-up">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/50">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Add Resume</h2>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Resume Title
            </label>
            <input 
              type="text"
              placeholder="e.g. Senior Frontend Engineer" 
              className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cp-primary/20 focus:border-cp-primary/50 text-zinc-900 dark:text-white transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Content
            </label>
            <textarea 
              placeholder="Paste your resume text here..." 
              rows={4}
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cp-primary/20 focus:border-cp-primary/50 text-zinc-900 dark:text-white transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              File Upload
            </label>
            <div 
              className={`w-full p-6 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer ${
                isDragging 
                  ? "border-cp-primary bg-cp-primary/5" 
                  : "border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/30 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
              }`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
            >
              <div className="w-10 h-10 rounded-full bg-cp-primary/10 flex items-center justify-center text-cp-primary">
                <UploadCloud size={20} />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Click or drag file to this area to upload
                </p>
                <p className="text-xs text-zinc-500 mt-1">
                  Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-cp-primary hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-cp-primary/20 transition-all active:scale-95"
          >
            Add Resume
          </button>
        </div>

      </div>
    </div>
  );
}
