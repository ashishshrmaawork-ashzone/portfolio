import { loadSiteSettings } from "@/lib/wordpress";
import Link from "next/link";
import { ProjectGallery } from "@/components/project-gallery";
import { getProjects } from "@/lib/wordpress";

export const metadata = {
  title: "Portfolio | Ashish Sharma",
  description: "Selected web development projects by Ashish Sharma.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  const settings = await loadSiteSettings();
  return (
    <main className="project-main">
      <section className="breadcrumb-band">
        <div className="shell">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Portfolio</span>
          </nav>
          <span className="eyebrow">{settings.portfolio_eyebrow ?? "Selected work"}</span>
          <h1>{settings.portfolio_title ?? "My Portfolio"}</h1>
          <p>Explore web applications, websites, and digital products.</p>
        </div>
      </section>
      <section className="shell blog-section" aria-label="Portfolio projects">
        <ProjectGallery projects={projects} />
        {!projects.length && <p>No projects have been published yet.</p>}
      </section>
    </main>
  );
}
