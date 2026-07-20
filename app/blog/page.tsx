import BlogPageClient from "./BlogPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Insights | CareerPilot AI",
  description: "Explore expert articles about resumes, interviews, AI careers, and professional growth.",
};

export default function BlogPage() {
  return <BlogPageClient />;
}
