import { fetchAPI } from "./api";

// Get all resumes for the user
export const getResumes = () => fetchAPI("/resumes", { cache: 'no-store' });

// Get a single resume by ID
export const getResumeById = (id: string) => fetchAPI(`/resumes/${id}`, { cache: 'no-store' });

// Create a new resume
export const createResume = (data: any) => fetchAPI("/resumes", {
  method: "POST",
  body: JSON.stringify(data)
});

// Update an existing resume
export const updateResume = (id: string, data: any) => fetchAPI(`/resumes/${id}`, {
  method: "PUT",
  body: JSON.stringify(data)
});

// Delete a resume
export const deleteResume = (id: string) => fetchAPI(`/resumes/${id}`, {
  method: "DELETE"
});

// Analyze a resume with AI
export const analyzeResume = (id: string) => fetchAPI(`/resumes/${id}/analyze`, {
  method: "POST"
});
