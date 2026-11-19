import { NextResponse } from "next/server";
import {
  isAuthorizedCronRequest,
  publishAutomaticBlogPost,
} from "@/lib/blog-automation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) {
    return NextResponse.json({ message: "Blog publishing cron is not configured." }, { status: 503 });
  }
  if (!isAuthorizedCronRequest(request, secret)) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    const result = await publishAutomaticBlogPost();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Automatic blog publishing failed.", error);
    return NextResponse.json(
      { message: "Automatic blog publishing failed. Check the function logs and credentials." },
      { status: 502 },
    );
  }
}
