"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ProjectGallery } from "@/components/project-gallery";
import type { PortfolioProject } from "@/lib/wordpress";

export function HomePortfolioSection() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProjects() {
      try {
        const response = await fetch("/api/portfolio/projects", {
          signal: controller.signal,
        });
        if (!response.ok) return;

        const result: unknown = await response.json();
        if (Array.isArray(result)) {
          setProjects(result as PortfolioProject[]);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Portfolio projects failed to load.", error);
        }
      } finally {
        if (!controller.signal.aborted) setLoaded(true);
      }
    }

    void loadProjects();
    return () => controller.abort();
  }, []);

  return (
    <section className="rn-portfolio-area rn-section-gap section-separator" id="portfolio">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <span className="subtitle">Visit my portfolio and keep your feedback</span>
              <h2 className="title">My Portfolio</h2>
            </div>
          </div>
        </div>
        {projects.length > 0 && <ProjectGallery projects={projects.slice(0, 8)} />}
        {loaded && projects.length === 0 && (
          <p className="text-center" role="status">
            No projects published yet.
          </p>
        )}
        {projects.length > 0 && (
          <div className="portfolio-view-more">
            <Link className="rn-btn" href="/projects">
              View all projects <span aria-hidden="true">↗</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
