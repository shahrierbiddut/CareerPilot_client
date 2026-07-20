import { fetchAPI } from "./api";

// Create and analyze a resume using the AI engine
export const analyzeResumeAI = (data: any) => fetchAPI("/ai/analyze", {
  method: "POST",
  body: JSON.stringify(data)
});

// Get all AI analyses for the user
export const getAnalysisHistory = () => fetchAPI("/ai/history", { cache: 'no-store' });

// Get a specific AI analysis by ID
export const getAnalysisById = (id: string) => fetchAPI(`/ai/history/${id}`, { cache: 'no-store' });
