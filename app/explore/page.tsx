import ExplorePageClient from "./ExplorePageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Resources | CareerPilot AI",
  description: "Browse our library of premium career resources, resume templates, interview guides, and learning paths.",
};

export default function ExplorePage() {
  return <ExplorePageClient />;
}
