import type { Metadata } from "next";
import Link from "next/link";
import { ResumePrintButton } from "@/components/resume-print-button";
import {
  getEducation,
  getProjects,
  getWorkExperience,
  isPlaceholderResumeCopy,
  plainText,
} from "@/lib/wordpress";
import styles from "./resume.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Resume | Ashish Sharma",
  description:
    "Ashish Sharma's resume, including current work experience, education, technical skills, and portfolio projects.",
  alternates: {
    canonical: "/resume",
  },
};

function cleanText(value: string) {
  return plainText(value).replace(/\s+/g, " ").trim();
}

function projectSummary(value: string) {
  const summary = cleanText(value);
  if (isPlaceholderResumeCopy(summary)) return "";
  return summary.length > 180 ? `${summary.slice(0, 177).trimEnd()}...` : summary;
}

function canonicalTechnology(value: string) {
  const technology = cleanText(value);
  const normalized = technology.toLowerCase();
  const aliases: Record<string, string> = {
    js: "JavaScript",
    javascript: "JavaScript",
    "javascript development": "JavaScript",
    wordpress: "WordPress",
    "wordpress development": "WordPress",
    "php development": "PHP",
    "custom php development": "PHP",
    "php backend development": "PHP",
  };

  if (aliases[normalized]) return aliases[normalized];
  if (/(development|developemt|integration|backend|frontend)/i.test(technology)) {
    return "";
  }
  return technology;
}

function uniqueTechnologies(values: string[], limit: number) {
  const seen = new Set<string>();
  return values
    .map(canonicalTechnology)
    .filter((technology) => {
      const key = technology.toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, limit);
}

export default async function ResumePage() {
  const [projects, experience, education] = await Promise.all([
    getProjects(),
    getWorkExperience(),
    getEducation(),
  ]);
  const technologies = uniqueTechnologies(
    [
      "PHP",
      "WordPress",
      "JavaScript",
      "React",
      "Next.js",
      ...projects.flatMap((project) =>
        (project.technologies ?? []).map((technology) => technology.name),
      ),
    ],
    18,
  );

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.toolbar}>
          <Link className={styles.backLink} href="/">
            <span aria-hidden="true">&larr;</span> Back to portfolio
          </Link>
          <div className={styles.downloadGroup}>
            <span>Choose &quot;Save as PDF&quot; in the print dialog.</span>
            <ResumePrintButton className={styles.downloadButton} />
          </div>
        </div>

        <article className={styles.resume} aria-label="Ashish Sharma resume">
          <header className={styles.header}>
            <div className={styles.identity}>
              <span className={styles.eyebrow}>PROFESSIONAL RESUME</span>
              <h1>Ashish Sharma</h1>
              <p>Full Stack Developer</p>
            </div>
            <address className={styles.contact}>
              <a href="mailto:ashishshrmaa@outlook.com">
                ashishshrmaa@outlook.com
              </a>
              <a href="https://ashishshrmaa.vercel.app">
                ashishshrmaa.vercel.app
              </a>
              <a href="https://wa.me/919928686337">+91 99286 86337</a>
            </address>
          </header>

          <section className={styles.section} aria-labelledby="resume-profile">
            <h2 id="resume-profile">Profile</h2>
            <p className={styles.profile}>
              Full-stack developer building fast, useful digital products with
              PHP, WordPress, JavaScript, React, and Next.js - from planning and
              development through deployment.
            </p>
          </section>

          <section className={styles.section} aria-labelledby="resume-skills">
            <h2 id="resume-skills">Technical Skills</h2>
            <ul className={styles.skills}>
              {technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </section>

          <section className={styles.section} aria-labelledby="resume-experience">
            <h2 id="resume-experience">Work Experience</h2>
            {experience.length > 0 ? (
              <div className={styles.entries}>
                {experience.map((entry) => {
                  const period = cleanText(entry.experience);
                  const description = cleanText(entry.content);

                  return (
                    <article className={styles.entry} key={entry.id}>
                      <div className={styles.entryHeading}>
                        <h3>{cleanText(entry.title)}</h3>
                        {period && <p>{period}</p>}
                      </div>
                      {description && (
                        <p className={styles.description}>{description}</p>
                      )}
                    </article>
                  );
                })}
              </div>
            ) : (
              <p className={styles.emptyState}>
                No work experience is available yet.
              </p>
            )}
          </section>

          <section className={styles.section} aria-labelledby="resume-education">
            <h2 id="resume-education">Education</h2>
            {education.length > 0 ? (
              <div className={styles.entries}>
                {education.map((entry) => {
                  const period = cleanText(entry.experience);
                  const description = cleanText(entry.content);

                  return (
                    <article className={styles.entry} key={entry.id}>
                      <div className={styles.entryHeading}>
                        <h3>{cleanText(entry.title)}</h3>
                        {period && <p>{period}</p>}
                      </div>
                      {description && (
                        <p className={styles.description}>{description}</p>
                      )}
                    </article>
                  );
                })}
              </div>
            ) : (
              <p className={styles.emptyState}>
                No education details are available yet.
              </p>
            )}
          </section>

          <section className={styles.section} aria-labelledby="resume-projects">
            <h2 id="resume-projects">Portfolio Projects</h2>
            {projects.length > 0 ? (
              <div className={styles.projectGrid}>
                {projects.map((project) => {
                  const summary = projectSummary(
                    project.short_description || project.excerpt || project.content,
                  );
                  const projectTechnologies = uniqueTechnologies(
                    (project.technologies ?? []).map((technology) => technology.name),
                    4,
                  );

                  return (
                    <article className={styles.project} key={project.id}>
                      <div className={styles.projectHeading}>
                        <h3>
                          <Link href={`/projects/${encodeURIComponent(project.slug)}`}>
                            {cleanText(project.title)}
                          </Link>
                        </h3>
                        <p>
                          {[cleanText(project.category), cleanText(project.year)]
                            .filter(Boolean)
                            .join(" | ")}
                        </p>
                      </div>
                      {summary && <p className={styles.description}>{summary}</p>}
                      {projectTechnologies.length > 0 && (
                        <p className={styles.projectTech}>
                          {projectTechnologies.join(" | ")}
                        </p>
                      )}
                    </article>
                  );
                })}
              </div>
            ) : (
              <p className={styles.emptyState}>
                No portfolio projects are available yet.
              </p>
            )}
          </section>
        </article>
      </div>
    </main>
  );
}
