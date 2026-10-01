"use client";

import Image from "next/image";
import { plainText, type PortfolioProject } from "@/lib/wordpress";

function getSafeUrl(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:"
      ? parsedUrl.href
      : null;
  } catch {
    return null;
  }
}

export function ProjectGallery({ projects }: { projects: PortfolioProject[] }) {
  return (
    <>
      <div className="project-gallery">
        {projects.map((project, index) => {
          const title = plainText(project.title);
          const thumbnail = getSafeUrl(project.thumbnail_image);
          const details = `/projects/${encodeURIComponent(project.slug)}`;

          return (
            <article className="project-gallery-card" key={project.id}>
              {thumbnail ? (
                <Image
                  className="project-gallery-image"
                  src={thumbnail}
                  fill
                  sizes="(max-width: 420px) 100vw, (max-width: 900px) 50vw, 33vw"
                  quality={70}
                  alt=""
                  loading={index < 3 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                />
              ) : (
                <div className="project-gallery-placeholder" aria-hidden="true">
                  {title.slice(0, 1)}
                </div>
              )}
              <div className="project-gallery-shade" />
              <div className="project-gallery-caption">
                <h2>{title}</h2>
                <div className="project-gallery-actions">
                  <a href={details} aria-label={`View project ${title}`}>
                    View project
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

    </>
  );
}
