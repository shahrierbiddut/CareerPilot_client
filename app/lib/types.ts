import type { ResourceType } from "@/app/explore/components/ResourceCard";

export interface Review {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  rating: number;
  date: string;
  comment: string;
}

export interface FullResourceData {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  type: ResourceType;
  level: string;
  industry: string;
  difficulty: string;
  price: string;
  date: string;
  readTime: string;
  rating: number;
  image: string;
  gradient: string;
  author: { name: string; avatar: string; role: string };
  description: string;
  whatYouLearn: string[];
  tableOfContents: string[];
  tags: string[];
  
  gallery?: string[];
  objectives?: string[];
  summary?: string;
  language?: string;
  format?: string;
  lastUpdated?: string;

  skills?: string[];
  benefits?: string[];
  reviews?: Review[];
}
