const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  const isBrowser = typeof window !== "undefined";
  const baseUrl = isBrowser ? "" : API_URL;
  const url = `${baseUrl}/api${endpoint}`;
  
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    credentials: "include",
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.status}`);
  }

  return response.json();
};

export const getResources = () => fetchAPI("/resources", { cache: 'no-store' });
export const getResourceById = (id: string) => fetchAPI(`/resources/${id}`, { cache: 'no-store' });
