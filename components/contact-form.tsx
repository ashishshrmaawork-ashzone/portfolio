"use client";

import { FormEvent, useState } from "react";

type SubmissionState = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<SubmissionState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result: { message?: string } = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Your message could not be sent.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      console.error("Contact form submission failed.", error);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          Your name
          <input autoComplete="name" name="contact-name" placeholder="Jane Smith" required />
        </label>
        <label>
          Phone <span>(optional)</span>
          <input autoComplete="tel" name="contact-phone" placeholder="+1 555 000 0000" type="tel" />
        </label>
      </div>
      <label>
        Email address
        <input
          autoComplete="email"
          name="contact-email"
          placeholder="you@example.com"
          required
          type="email"
        />
      </label>
      <label>
        What can I help you with?
        <input name="subject" placeholder="Website, app or something else" />
      </label>
      <label>
        A little about your project
        <textarea
          name="contact-message"
          placeholder="Goals, timeline, or anything else I should know..."
          required
          rows={4}
        />
      </label>
      <button className="button" disabled={status === "sending"} type="submit">
        {status === "sending" ? "Sending..." : "Send message"} <span aria-hidden="true">↗</span>
      </button>
      <p aria-live="polite" className={`form-status ${status}`}>
        {status === "success" && "Thanks for reaching out. Your message has been sent."}
        {status === "error" && "Sorry, your message could not be sent. Please email me directly."}
      </p>
    </form>
  );
}
