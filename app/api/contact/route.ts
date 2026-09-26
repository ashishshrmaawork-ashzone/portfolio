import { NextResponse } from "next/server";
import { submitContactMessage } from "@/lib/wordpress";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
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

  const name = payload["contact-name"].trim();
  const email = payload["contact-email"].trim();
  const subject = payload.subject.trim();
  const message = payload["contact-message"].trim();

  if (!name || !email || !message || name.length > 200 || email.length > 320 || subject.length > 200 || message.length > 10_000) {
    return NextResponse.json({ message: "Please check the contact details and try again." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  let response: Response;
  try {
    response = await submitContactMessage({
      name,
      phone: payload["contact-phone"].trim(),
      email,
      subject,
      message,
    });
  } catch (error) {
    console.error("WordPress contact request failed.", error);
    return NextResponse.json(
      { message: "The contact service is unavailable. Please try again later." },
      { status: 502 },
    );
  }
  const responseText = await response.text();
  let responseData: { message?: string; success?: boolean } = {};

  if (responseText) {
    try {
      responseData = JSON.parse(responseText) as { message?: string; success?: boolean };
    } catch {
      console.error("WordPress contact endpoint returned an invalid response.");
      return NextResponse.json(
        { message: "The contact service returned an invalid response. Please try again later." },
        { status: 502 },
      );
    }
  }

  if (!response.ok || responseData.success === false) {
    return NextResponse.json(
      { message: responseData.message || "WordPress could not accept your message." },
      { status: response.ok ? 502 : response.status },
    );
  }

  return NextResponse.json({ message: responseData.message || "Message sent." });
}
