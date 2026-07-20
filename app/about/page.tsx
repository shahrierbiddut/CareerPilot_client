import AboutPageClient from "./AboutPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | CareerPilot AI",
  description: "CareerPilot AI helps professionals create better resumes, prepare for interviews, and accelerate career growth using intelligent AI tools.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
