type ContactNotification = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  type: "contact" | "quote";
};

const defaultRecipient = "ashishshrmaa@outlook.com";

export async function sendContactNotification(notification: ContactNotification): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY?.trim();
  const fromEmail = process.env.BREVO_FROM_EMAIL?.trim();
  const fromName = process.env.BREVO_FROM_NAME?.trim() || "Ashish Sharma Portfolio";
  const to = process.env.CONTACT_NOTIFICATION_EMAIL?.trim() || defaultRecipient;

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
      to: [{ email: to }],
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
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Brevo rejected the notification (${response.status}).`);
  }
}
