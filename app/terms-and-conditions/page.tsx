import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms & Conditions | Ashish Sharma",
  description: "Terms for using Ashish Sharma's portfolio website and enquiry forms.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      description="Terms for browsing this portfolio and contacting Ashish about a project."
      sections={[
        {
          heading: "Using this website",
          paragraphs: [
            "This website presents information about Ashish Sharma's work and services. You may browse it for lawful, personal and informational purposes. By using the site, you agree not to disrupt its operation or misuse its forms or services.",
          ],
          bullets: [
            "Do not submit knowingly false, unlawful, abusive or unsolicited bulk messages.",
            "Do not attempt to gain unauthorized access to the site, its hosting, APIs or WordPress services.",
            "Do not use the site in a way that violates applicable law or another person's rights.",
          ],
        },
        {
          heading: "Portfolio content and intellectual property",
          paragraphs: [
            "Unless a page says otherwise, the site's original text, visual design, logo and code are owned by or used by Ashish Sharma and may not be copied, republished or commercially reused without permission.",
            "Project names, screenshots, marks and other third-party materials shown in the portfolio remain the property of their respective owners. Their appearance is for project-identification and portfolio purposes and does not imply that those owners endorse this website.",
          ],
        },
        {
          heading: "Enquiries and project agreements",
          paragraphs: [
            "Submitting a contact or quote form is a request to start a conversation; it does not create a client relationship, reserve availability, or form a contract. Any project scope, fees, timeline, deliverables, ownership and support obligations must be agreed separately in writing.",
            "Please provide information you are entitled to share. Information submitted through a form is handled as described in the Privacy Policy.",
          ],
        },
        {
          heading: "Accuracy and availability",
          paragraphs: [
            "Portfolio descriptions and service information are provided for general information and may change. Reasonable care is taken to keep the site available and content current, but uninterrupted access, completeness or error-free operation is not guaranteed.",
            "To the extent permitted by applicable law, this website and its content are provided without warranties. Nothing in these terms excludes rights or remedies that cannot legally be excluded.",
          ],
        },
        {
          heading: "External websites",
          paragraphs: [
            "This website may link to third-party sites or services. Those destinations are operated independently, and their content, availability and terms are their operators' responsibility. A link does not imply endorsement.",
          ],
        },
        {
          heading: "Changes and contact",
          paragraphs: [
            "These terms may be updated when the website or its services change. Continued use after an update means you are using the current version, subject to applicable law.",
            "Questions about these terms can be sent to ashishshrmaa@outlook.com.",
          ],
        },
      ]}
    />
  );
}
