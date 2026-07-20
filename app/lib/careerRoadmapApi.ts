import { fetchAPI } from "./api";

// Generate a career roadmap using the AI engine
export const generateCareerRoadmap = (data: any) => fetchAPI("/career-roadmap/generate", {
  method: "POST",
  body: JSON.stringify(data)
});

// Get all AI roadmaps for the user
export const getRoadmapHistory = () => fetchAPI("/career-roadmap/history", { cache: 'no-store' });

// Get a specific AI roadmap by ID
export const getRoadmapById = (id: string) => fetchAPI(`/career-roadmap/${id}`, { cache: 'no-store' });

// Mark items as complete
export const updateRoadmapProgress = (id: string, completedGoals: string[]) => fetchAPI(`/career-roadmap/${id}/progress`, {
  method: "PATCH",
  body: JSON.stringify({ completedGoals })
});
