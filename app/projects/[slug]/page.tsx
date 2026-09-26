import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, plainText } from "@/lib/wordpress";

export const dynamic = "force-dynamic";
export const revalidate = 300;

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  return {
    title: project ? `${project.title} | Ashish Sharma` : "Project not found | Ashish Sharma",
    description: project ? plainText(project.content || project.title).slice(0, 160) : undefined,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const description = plainText(project.content);
  const projectImage = [project.poster_image, project.thumbnail_image].find((image) =>
    image?.startsWith("https://"),
  );

  return (
    <main className="project-detail section-wrap">
      <Link className="back-link" href="/#portfolio">← Back to selected work</Link>
      <div className="project-detail-heading">
        <span className="eyebrow">{project.category || "SELECTED WORK"}</span>
        <h1>{project.title}</h1>
        {description && <p>{description}</p>}
      </div>
      {projectImage && (
        <img
          className="project-detail-image"
          src={projectImage}
          alt={`${project.title} project`}
        />
      )}
      <div className="project-detail-info">
        {project.tech && <div><span className="eyebrow">BUILT WITH</span><p>{project.tech}</p></div>}
        {project.url && (
          <a className="button" href={project.url} target="_blank" rel="noreferrer">
            Visit live project <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </main>
  );
}
