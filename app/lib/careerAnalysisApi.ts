import { fetchAPI } from "./api";

export const startCareerAnalysisSession = (data: any = {}) => fetchAPI("/career-analysis/start", {
  method: "POST",
  body: JSON.stringify(data)
});

export const sendCareerChatMessage = (sessionId: string, message: string, aiProvider?: string) => fetchAPI(`/career-analysis/${sessionId}/chat`, {
  method: "POST",
  body: JSON.stringify({ message, aiProvider })
});

export const getCareerAnalysisSession = (sessionId: string) => fetchAPI(`/career-analysis/${sessionId}`, { cache: 'no-store' });

export const getCareerAnalysisHistory = () => fetchAPI("/career-analysis/history", { cache: 'no-store' });
