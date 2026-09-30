import type { MetadataRoute } from "next";
import { getBlogPosts, getProjects } from "@/lib/wordpress";

const siteUrl = "https://ashishshrmaa.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts] = await Promise.all([getProjects(), getBlogPosts()]);

  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/terms-and-conditions`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/projects`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/blog`, changeFrequency: "weekly", priority: 0.8 },
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${encodeURIComponent(project.slug)}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${encodeURIComponent(post.slug)}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
