import ResumeTemplatesClient from "./ResumeTemplatesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Templates | CareerPilot AI",
  description: "Professional, ATS-friendly resume templates to help you land your dream job.",
};

export default function ResumeTemplatesPage() {
  return <ResumeTemplatesClient />;
}
