import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Ashish Sharma",
  description: "How Ashish Sharma's portfolio website handles contact and quote enquiries.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="How information is handled when you visit this website or send an enquiry."
      sections={[
        {
          heading: "Who this policy covers",
          paragraphs: [
            "This policy applies to the portfolio website at ashishshrmaa.vercel.app, operated by Ashish Sharma. It describes information handled through this website and its contact and quote forms.",
          ],
        },
        {
          heading: "Information you provide",
          paragraphs: [
            "When you send a contact or quote enquiry, the website may receive the information you enter. Phone number and budget are optional where marked.",
          ],
          bullets: [
            "Contact form: name, email address, optional phone number, project type and message.",
            "Quote form: name, email address, optional phone number, requested service, optional budget and project details.",
          ],
        },
        {
          heading: "How enquiry information is used",
          paragraphs: [
            "Enquiry information is used to read and respond to your message, discuss or prepare a project quote, and manage the related business conversation. Do not include passwords, payment-card details, government identification numbers, health information or other sensitive information in a form.",
          ],
        },
        {
          heading: "Where submissions go",
          paragraphs: [
            "Form submissions are sent by the website's server to its WordPress contact service. The WordPress service is configured to store submissions for review and may send an email notification to the site's configured enquiry address. Website hosting, WordPress hosting and email delivery providers may process the information to provide those services.",
            "Email is not guaranteed to be an encrypted or confidential channel from end to end. The website does not sell or rent enquiry information.",
          ],
        },
        {
          heading: "Retention and your choices",
          paragraphs: [
            "Enquiries are kept in the website's WordPress submission records and notification inboxes for as long as needed to respond, manage the enquiry and maintain relevant business records. The exact deletion schedule depends on the site administrator and service providers.",
            "To ask about, correct or request deletion of information you submitted, contact ashishshrmaa@outlook.com and identify the enquiry. Some records may need to be retained where required for legitimate business or legal purposes.",
          ],
        },
        {
          heading: "Website operation, cookies and external services",
          paragraphs: [
            "The website uses hosting and application services to deliver pages and process requests. Those providers may process technical information such as request and security logs. This website does not intentionally use advertising or cross-site tracking technologies.",
            "Links to services such as WhatsApp, LinkedIn, Google Maps or project websites take you to third-party services. Their operators handle information under their own privacy notices; this website does not control their practices.",
          ],
        },
        {
          heading: "Children and policy updates",
          paragraphs: [
            "This professional portfolio is not directed to children, and the contact forms are not intended for children to submit personal information.",
            "This policy may be updated when the website or its data handling changes. The date at the top of the page indicates the latest revision.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            "Questions or requests about this policy can be sent to ashishshrmaa@outlook.com.",
          ],
        },
      ]}
    />
  );
}
