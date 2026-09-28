import Link from "next/link";
import { getProjects, plainText } from "@/lib/wordpress";

export const metadata = {
  title: "Portfolio | Ashish Sharma",
  description: "Selected web development projects by Ashish Sharma.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="project-main">
      <section className="breadcrumb-band">
        <div className="shell">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Portfolio</span>
          </nav>
          <span className="eyebrow">SELECTED WORK</span>
          <h1>Projects built to make a difference.</h1>
          <p>Explore web applications, websites, and digital products.</p>
        </div>
      </section>
      <section className="shell blog-section" aria-label="Portfolio projects">
        <div className="blog-grid">
          {projects.map((project) => (
            <article className="blog-card project-card" key={project.id}>
              <Link className="blog-card-link" href={`/projects/${encodeURIComponent(project.slug)}`}>
                {project.thumbnail_image && <img src={project.thumbnail_image} alt={plainText(project.title)} loading="lazy" />}
                <div className="blog-card-body">
                  <span className="eyebrow">{plainText(project.category || "Web development")}</span>
                  <h2>{plainText(project.title)}</h2>
                  {project.content && <p>{plainText(project.content)}</p>}
                  {project.tech && <span className="text-link">{plainText(project.tech)}</span>}
                </div>
              </Link>
            </article>
          ))}
        </div>
        {!projects.length && <p>No projects have been published yet.</p>}
      </section>
    </main>
  );
}
