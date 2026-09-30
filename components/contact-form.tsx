"use client";

import { FormEvent, useState } from "react";
import { useSiteSettings } from "@/components/site-settings-provider";

type SubmissionState = "idle" | "sending" | "success" | "error";
type FormType = "contact" | "quote";

export function ContactForm({ type = "contact" }: { type?: FormType }) {
  const settings = useSiteSettings();
  const services = (settings.quote_services ?? "Website Development\nWordPress Development\nReact / Next.js\nE-Commerce\nSEO\nOther").split(/\r?\n/).filter(Boolean);
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [feedback, setFeedback] = useState("");
  const isQuote = type === "quote";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setFeedback("");
    const form = event.currentTarget;
    const values = new FormData(form);
    const service = String(values.get("service") || "").trim();
    const budget = String(values.get("budget") || "").trim();
    const details = String(values.get("details") || "").trim();
    const message = isQuote
      ? `${details}${budget ? `\n\nBudget: ${budget}` : ""}`
      : String(values.get("contact-message") || "").trim();
    const subject = isQuote
      ? `Quote request: ${service || "Project"}`
      : String(values.get("subject") || "").trim();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "contact-name": values.get(isQuote ? "name" : "contact-name"),
          "contact-email": values.get(isQuote ? "email" : "contact-email"),
          "contact-phone": values.get(isQuote ? "phone" : "contact-phone") || "",
          subject,
          "contact-message": message,
          type,
          website: values.get("website") || "",
        }),
      });
      const result: { message?: string } = await response.json();
      if (!response.ok) throw new Error(result.message || "Your enquiry could not be sent.");

      setStatus("success");
      setFeedback(result.message || "Thank you. Your enquiry has been received.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Your enquiry could not be sent. Please try again.");
      console.error("Portfolio enquiry submission failed.", error);
    }
  }

  return (
    <form className="rnt-contact-form row contact-form" onSubmit={handleSubmit}>
      <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="col-md-6 form-group">
        <label htmlFor={`${type}-name`}>Your name</label>
        <input autoComplete="name" id={`${type}-name`} name={isQuote ? "name" : "contact-name"} placeholder="Your full name" maxLength={200} required />
      </div>
      <div className="col-md-6 form-group">
        <label htmlFor={`${type}-email`}>Email address</label>
        <input autoComplete="email" id={`${type}-email`} name={isQuote ? "email" : "contact-email"} placeholder="you@example.com" maxLength={320} required type="email" />
      </div>
      <div className="col-md-6 form-group">
        <label htmlFor={`${type}-phone`}>Phone <span>(optional)</span></label>
        <input autoComplete="tel" id={`${type}-phone`} name={isQuote ? "phone" : "contact-phone"} placeholder="+91 00000 00000" maxLength={80} type="tel" />
      </div>
      {isQuote ? (
        <>
          <div className="col-md-6 form-group">
            <label htmlFor="quote-service">What do you need?</label>
            <select id="quote-service" name="service" defaultValue="">
              <option value="">Select a service</option>
              {services.map(service => <option key={service}>{service}</option>)}
            </select>
          </div>
          <div className="col-12 form-group">
            <label htmlFor="quote-budget">Estimated budget <span>(optional)</span></label>
            <input id="quote-budget" name="budget" maxLength={100} placeholder="Your approximate budget" />
          </div>
          <div className="col-12 form-group">
            <label htmlFor="quote-details">Project details</label>
            <textarea id="quote-details" name="details" placeholder="Goals, timeline, and any other useful details..." maxLength={9000} required rows={5} />
          </div>
        </>
      ) : (
        <>
          <div className="col-12 form-group">
            <label htmlFor="contact-subject">What can I help you with?</label>
            <input id="contact-subject" name="subject" maxLength={200} placeholder="Website, app or something else" />
          </div>
          <div className="col-12 form-group">
            <label htmlFor="contact-message">A little about your project</label>
            <textarea id="contact-message" name="contact-message" placeholder="Goals, timeline, or anything else I should know..." maxLength={9000} required rows={5} />
          </div>
        </>
      )}
      <div className="col-12">
        <button className="rn-btn" disabled={status === "sending"} type="submit">
          {status === "sending" ? "Sending..." : isQuote ? "Request a quote" : "Send message"}
          <span aria-hidden="true"> ↗</span>
        </button>
        <p aria-live="polite" className={`form-status ${status}`}>
          {feedback}
        </p>
      </div>
    </form>
  );
}
