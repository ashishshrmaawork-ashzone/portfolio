import { ProjectGallery } from "@/components/project-gallery";
import { getProjects } from "@/lib/wordpress";

export const metadata = {
  title: "Portfolio | Ashish Sharma",
  description: "Selected web development projects by Ashish Sharma.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="portfolio-page">
      <div className="portfolio-accent-band" aria-hidden="true" />
      <section className="portfolio-gallery-section" aria-labelledby="portfolio-heading">
        <h1 className="visually-hidden" id="portfolio-heading">Selected portfolio projects</h1>
        <ProjectGallery projects={projects} />
        {!projects.length && <p>No projects have been published yet.</p>}
      </section>
    </main>
  );
}
