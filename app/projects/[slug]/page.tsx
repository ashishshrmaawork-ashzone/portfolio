import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjects, plainText } from "@/lib/wordpress";

function safeHttpUrl(value: string): string | null {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:"
      ? parsed.href
      : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = (await getProjects()).find((item) => item.slug === slug);
  if (!project) return { title: "Project not found | Ashish Sharma" };

  return {
    title: `${plainText(project.title)} | Ashish Sharma`,
    description: plainText(project.short_description || project.excerpt || project.content).slice(0, 160),
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projects = await getProjects();
  const index = projects.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();

  const project = projects[index];
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const image = safeHttpUrl(project.detail_image) || safeHttpUrl(project.thumbnail_image);
  const description = project.short_description || project.excerpt || project.content;
  const technologies = project.technologies.map((technology) => technology.name).join(", ");

  return (
    <main className="project-main portfolio-detail-page">
      <div className="portfolio-accent-band" aria-hidden="true" />
      <section className="portfolio-breadcrumb-band">
        <div className="portfolio-breadcrumb-shell">
          <nav className="portfolio-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/projects">Portfolio</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{plainText(project.title)}</span>
          </nav>
        </div>
      </section>
      <div className="shell portfolio-detail-shell">
        <section className="project-intro">
          <div>
            <span className="eyebrow">{plainText(project.category || "Web development")}</span>
            <h1>{plainText(project.title)}</h1>
          </div>
          <span className="project-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        </section>
        {image && (
          <figure className="project-preview monitor-preview">
            <div className="monitor-frame">
              <div
                className="monitor-screen"
                role="region"
                aria-label={`${plainText(project.title)} website preview on monitor. Scroll inside the screen to view the full page.`}
                tabIndex={0}
              >
                <Image
                  src={image}
                  alt={`${plainText(project.title)} full-page website preview`}
                  width={1200}
                  height={800}
                  sizes="(max-width: 767px) 100vw, 1040px"
                  quality={70}
                  priority
                />
              </div>
            </div>
            <div className="monitor-stand" aria-hidden="true">
              <div className="monitor-stand-neck" />
              <div className="monitor-stand-foot" />
            </div>
            <figcaption>
              <span>{plainText(project.category)}</span>
              <span>Scroll inside the monitor screen to view the full page</span>
              <span>{plainText(project.date)}</span>
            </figcaption>
          </figure>
        )}
        <section className="project-overview">
          <div>
            <span className="eyebrow">OVERVIEW</span>
            <h2>About this project</h2>
            <p className="project-description">{plainText(description) || "Project details coming soon."}</p>
          </div>
          <aside className="project-summary">
            <h2>Project details</h2>
            <dl>
              <div><dt>Category</dt><dd>{plainText(project.category || "Web development")}</dd></div>
              {technologies && <div><dt>Technologies</dt><dd>{plainText(technologies)}</dd></div>}
              {project.client && <div><dt>Client</dt><dd>{plainText(project.client)}</dd></div>}
              {(project.year || project.date) && <div><dt>Completed</dt><dd>{plainText(project.year || project.date)}</dd></div>}
            </dl>
          </aside>
        </section>
        <section className="project-cta">
          <div><span className="eyebrow">HAVE A PROJECT IN MIND?</span><h2>Let’s build something useful.</h2></div>
          <Link className="button" href="/#quote">Request a quote <span aria-hidden="true">↗</span></Link>
        </section>
        {projects.length > 1 && (
          <nav className="project-pager" aria-label="More projects">
            <Link href={`/projects/${encodeURIComponent(previous.slug)}`}><small>← Previous project</small><strong>{plainText(previous.title)}</strong></Link>
            <Link href={`/projects/${encodeURIComponent(next.slug)}`}><small>Next project →</small><strong>{plainText(next.title)}</strong></Link>
          </nav>
        )}
      </div>
    </main>
  );
}
