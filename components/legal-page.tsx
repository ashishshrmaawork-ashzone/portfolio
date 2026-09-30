import Link from "next/link";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export function LegalPage({
  title,
  description,
  sections,
}: {
  title: string;
  description: string;
  sections: LegalSection[];
}) {
  return (
    <main className="legal-page">
      <div className="portfolio-accent-band" aria-hidden="true" />
      <section className="portfolio-breadcrumb-band">
        <div className="portfolio-breadcrumb-shell">
          <nav className="portfolio-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{title}</span>
          </nav>
          <span className="portfolio-breadcrumb-eyebrow">SITE INFORMATION</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </section>
      <div className="shell legal-content">
        {sections.map((section) => (
          <section aria-labelledby={`legal-${section.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} key={section.heading}>
            <h2 id={`legal-${section.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets && (
              <ul>
                {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
