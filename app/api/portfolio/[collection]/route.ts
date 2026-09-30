import { NextResponse } from "next/server";
import {
  getBlogPosts,
  getEducation,
  getProjects,
  getServices,
  getTestimonials,
  getWorkExperience,
} from "@/lib/wordpress";
const collections = {
  blog: getBlogPosts,
  services: getServices, projects: getProjects, workexperience: getWorkExperience,
  education: getEducation, testimonials: getTestimonials,
};
export async function GET(_request: Request, { params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  if (!Object.prototype.hasOwnProperty.call(collections, collection)) {
    return NextResponse.json({ message: "Collection not found." }, { status: 404 });
  }
  try {
    const data = await collections[collection as keyof typeof collections]();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control":
          collection === "blog"
            ? "public, s-maxage=60, stale-while-revalidate=120"
            : "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Portfolio collection failed:", collection, error);
    return NextResponse.json({ message: "Content is temporarily unavailable. Please try again." }, { status: 502 });
  }
}
