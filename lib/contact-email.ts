type ContactNotification = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  type: "contact" | "quote";
};

const defaultRecipient = "ashishshrmaa@outlook.com";

async function sendBrevoEmail(email: {
  to: string;
  replyTo: { email: string; name: string };
  subject: string;
  textContent: string;
}): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY?.trim();
  const fromEmail = process.env.BREVO_FROM_EMAIL?.trim();
  const fromName = process.env.BREVO_FROM_NAME?.trim() || "Ashish Sharma Portfolio";

  if (!apiKey) throw new Error("BREVO_API_KEY is not configured.");
  if (!fromEmail) throw new Error("BREVO_FROM_EMAIL is not configured.");

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    signal: AbortSignal.timeout(10_000),
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: fromName, email: fromEmail },
      to: [{ email: email.to }],
      replyTo: email.replyTo,
      subject: email.subject,
      textContent: email.textContent,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Brevo rejected the email (${response.status}).`);
  }
}

export async function sendContactNotification(notification: ContactNotification): Promise<void> {
  const to = process.env.CONTACT_NOTIFICATION_EMAIL?.trim() || defaultRecipient;

  await sendBrevoEmail({
    to,
    replyTo: { email: notification.email, name: notification.name },
    subject: `[Portfolio ${notification.type}] ${notification.subject || "New enquiry"}`,
    textContent: [
      `Name: ${notification.name}`,
      `Email: ${notification.email}`,
      `Phone: ${notification.phone || "Not provided"}`,
      `Type: ${notification.type}`,
      `Subject: ${notification.subject || "Not provided"}`,
      "",
      notification.message,
    ].join("\n"),
  });
}

export async function sendContactConfirmation(notification: ContactNotification): Promise<void> {
  const ownerEmail = process.env.CONTACT_NOTIFICATION_EMAIL?.trim() || defaultRecipient;

  await sendBrevoEmail({
    to: notification.email,
    replyTo: { email: ownerEmail, name: process.env.BREVO_FROM_NAME?.trim() || "Ashish Sharma" },
    subject: notification.type === "quote"
      ? "We received your quote request"
      : "We received your enquiry",
    textContent: [
      `Hi ${notification.name},`,
      "",
      notification.type === "quote"
        ? "Thank you for submitting your quote request."
        : "Thank you for contacting me.",
      "Your message has been received, and I’ll be in touch with you soon.",
      "",
      "Best regards,",
      process.env.BREVO_FROM_NAME?.trim() || "Ashish Sharma",
    ].join("\n"),
  });
}
