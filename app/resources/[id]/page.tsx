import { notFound } from "next/navigation";
import ResourceHero from "./ResourceHero";
import ResourceContent from "./ResourceContent";
import type { FullResourceData } from "@/app/lib/types";

async function getResource(id: string): Promise<FullResourceData | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/resources/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const resource = await getResource(id);
  if (!resource) return { title: "Resource Not Found" };
  return {
    title: `${resource.title} | CareerPilot AI`,
    description: resource.excerpt,
  };
}

export default async function ResourceDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const resource = await getResource(id);

  if (!resource) return notFound();

  return (
    <div className="min-h-screen bg-white dark:bg-[#070710]">
      <ResourceHero resource={resource} />
      <ResourceContent resource={resource} />
    </div>
  );
}
