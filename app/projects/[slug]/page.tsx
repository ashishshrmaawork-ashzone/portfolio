import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjects, plainText } from "@/lib/wordpress";

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
    description: plainText(project.content).slice(0, 160),
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
  const image = project.poster_image || project.thumbnail_image;

  return (
    <main className="project-main">
      <div className="shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span aria-hidden="true">/</span>
          <Link href="/projects">Portfolio</Link><span aria-hidden="true">/</span>
          <span aria-current="page">{plainText(project.title)}</span>
        </nav>
        <section className="project-intro">
          <div>
            <span className="eyebrow">{plainText(project.category || "Web development")}</span>
            <h1>{plainText(project.title)}</h1>
          </div>
          <span className="project-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        </section>
        {image && (
          <figure className="project-preview">
            <img src={image} alt={`${plainText(project.title)} project preview`} />
            <figcaption><span>{plainText(project.category)}</span><span>{plainText(project.date)}</span></figcaption>
          </figure>
        )}
        <section className="project-overview">
          <div>
            <span className="eyebrow">OVERVIEW</span>
            <h2>About this project</h2>
            <p className="project-description">{plainText(project.content) || "Project details coming soon."}</p>
          </div>
          <aside className="project-summary">
            <h2>Project details</h2>
            <dl>
              <div><dt>Category</dt><dd>{plainText(project.category || "Web development")}</dd></div>
              {project.tech && <div><dt>Technologies</dt><dd>{plainText(project.tech)}</dd></div>}
              {project.date && <div><dt>Completed</dt><dd>{plainText(project.date)}</dd></div>}
            </dl>
            {project.url && <a className="text-link" href={project.url} target="_blank" rel="noreferrer">Visit live project ↗</a>}
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
