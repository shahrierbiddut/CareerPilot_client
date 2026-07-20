import { fetchAPI } from "./api";

export const startInterview = (data: any) => fetchAPI("/interview/start", {
  method: "POST",
  body: JSON.stringify(data)
});

export const submitAnswer = (sessionId: string, answer: string) => fetchAPI(`/interview/${sessionId}/answer`, {
  method: "POST",
  body: JSON.stringify({ answer })
});

export const endInterview = (sessionId: string) => fetchAPI(`/interview/${sessionId}/end`, {
  method: "POST"
});

export const getInterviewSession = (sessionId: string) => fetchAPI(`/interview/${sessionId}`, { cache: 'no-store' });

export const getInterviewHistory = () => fetchAPI("/interview/history", { cache: 'no-store' });
