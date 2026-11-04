import { readFile } from "node:fs/promises";
import { stripTypeScriptTypes } from "node:module";
import assert from "node:assert/strict";

const source = await readFile(new URL("../lib/contact-email.ts", import.meta.url), "utf8");
const { sendContactConfirmation, sendContactNotification } = await import(
  "data:text/javascript;base64," +
    Buffer.from(stripTypeScriptTypes(source)).toString("base64")
);

process.env.BREVO_API_KEY = "test-api-key";
process.env.BREVO_FROM_EMAIL = "notifications@example.com";
process.env.BREVO_FROM_NAME = "Portfolio";
delete process.env.CONTACT_NOTIFICATION_EMAIL;

const requests = [];
globalThis.fetch = async (url, options) => {
  requests.push({ url, options });
  return new Response(null, { status: 200 });
};

await sendContactNotification({
  name: "Test User",
  email: "visitor@example.com",
  phone: "123",
  subject: "New site",
  message: "Project details",
  type: "contact",
});

assert.equal(requests.length, 1);
assert.equal(requests[0].url, "https://api.brevo.com/v3/smtp/email");
assert.equal(requests[0].options.headers["api-key"], "test-api-key");
assert.deepEqual(JSON.parse(requests[0].options.body), {
  sender: { name: "Portfolio", email: "notifications@example.com" },
  to: [{ email: "ashishshrmaa@outlook.com" }],
  replyTo: { email: "visitor@example.com", name: "Test User" },
  subject: "[Portfolio contact] New site",
  textContent: "Name: Test User\nEmail: visitor@example.com\nPhone: 123\nType: contact\nSubject: New site\n\nProject details",
});

process.env.CONTACT_NOTIFICATION_EMAIL = "owner@example.com";
await sendContactConfirmation({
  name: "Test User",
  email: "visitor@example.com",
  phone: "123",
  subject: "New site",
  message: "Project details",
  type: "contact",
});
assert.equal(requests.length, 2);
assert.deepEqual(JSON.parse(requests[1].options.body), {
  sender: { name: "Portfolio", email: "notifications@example.com" },
  to: [{ email: "visitor@example.com" }],
  replyTo: { email: "owner@example.com", name: "Portfolio" },
  subject: "We received your enquiry",
  textContent: "Hi Test User,\n\nThank you for contacting me.\nYour message has been received, and I’ll be in touch with you soon.\n\nBest regards,\nPortfolio",
});

globalThis.fetch = async () => new Response(null, { status: 403 });
await assert.rejects(
  sendContactNotification({
    name: "Test User",
    email: "visitor@example.com",
    phone: "",
    subject: "",
    message: "Project details",
    type: "quote",
  }),
  /Brevo rejected the email \(403\)/,
);

delete process.env.BREVO_API_KEY;
await assert.rejects(
  sendContactNotification({
    name: "Test User",
    email: "visitor@example.com",
    phone: "",
    subject: "",
    message: "Project details",
    type: "contact",
  }),
  /BREVO_API_KEY is not configured/,
);

console.log("PASS Brevo notification payload, recipient, reply-to, and provider failures");
