import { NextResponse } from "next/server";
import { submitContactMessage } from "@/lib/wordpress";

export async function POST(request: Request) {
  if (request.headers.get("origin") && request.headers.get("origin") !== new URL(request.url).origin) {
    return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  }
  let payload: unknown;

  try {
    const body = await request.text();
    if (body.length > 24000) return NextResponse.json({ message: "Form is too large." }, { status: 413 });
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json({ message: "Please submit a valid contact form." }, { status: 400 });
  }

  if (
    !payload ||
    typeof payload !== "object" ||
    !("contact-name" in payload) ||
    !("contact-phone" in payload) ||
    !("contact-email" in payload) ||
    !("subject" in payload) ||
    !("contact-message" in payload) ||
    typeof payload["contact-name"] !== "string" ||
    typeof payload["contact-phone"] !== "string" ||
    typeof payload["contact-email"] !== "string" ||
    typeof payload.subject !== "string" ||
    typeof payload["contact-message"] !== "string"
  ) {
    return NextResponse.json({ message: "Please complete the required fields." }, { status: 400 });
  }

  if ("website" in payload && payload.website) return NextResponse.json({ message: "Unable to accept this submission." }, { status: 400 });
  if ("type" in payload && payload.type !== "contact" && payload.type !== "quote") return NextResponse.json({ message: "Invalid enquiry type." }, { status: 400 });
  const name = payload["contact-name"].trim();
  const email = payload["contact-email"].trim();
  const subject = payload.subject.trim();
  const message = payload["contact-message"].trim();
  const phone = payload["contact-phone"].trim();
  const type = "type" in payload && payload.type === "quote" ? "quote" : "contact";

  if (!name || !email || !message || name.length > 200 || email.length > 320 || phone.length > 80 || subject.length > 200 || message.length > 10_000) {
    return NextResponse.json({ message: "Please check the contact details and try again." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  let response: Response;
  try {
    response = await submitContactMessage({
      name,
      phone,
      email,
      subject,
      message,
      type,
    });
  } catch (error) {
    console.error("WordPress contact request failed.", error);
    return NextResponse.json(
      { message: "The contact service is unavailable. Please try again later." },
      { status: 502 },
    );
  }
  let responseData: { message?: string; success?: boolean } = {};

  {
    try {
      const parsed: unknown = await response.json();
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid response shape");
      const data = parsed as Record<string, unknown>;
      responseData = { success: data.success === true, message: typeof data.message === "string" ? data.message : undefined };
    } catch {
      console.error("WordPress contact endpoint returned an invalid response.");
      return NextResponse.json(
        { message: "The contact service returned an invalid response. Please try again later." },
        { status: 502 },
      );
    }
  }

  if (!response.ok || responseData.success !== true) {
    return NextResponse.json(
      { message: responseData.message || "WordPress could not accept your message." },
      { status: response.ok ? 502 : response.status },
    );
  }

  return NextResponse.json({ message: responseData.message || "Message sent." });
}
