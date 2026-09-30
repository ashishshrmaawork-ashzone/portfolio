"use client";

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
        {projects.map((project) => {
          const title = plainText(project.title);
          const thumbnail = getSafeUrl(project.thumbnail_image);
          const poster = getSafeUrl(project.poster_image);
          const image = thumbnail || poster;
          const preview = poster || thumbnail;
          const details = `/projects/${encodeURIComponent(project.slug)}`;

          return (
            <article className="project-gallery-card" key={project.id}>
              {image ? (
                <img
                  className="project-gallery-image"
                  src={image}
                  alt=""
                  loading="lazy"
                />
              ) : (
                <div className="project-gallery-placeholder" aria-hidden="true">
                  {title.slice(0, 1)}
                </div>
              )}
              <div className="project-gallery-shade" />
              <div className="project-gallery-caption">
                <h2>{title}</h2>
              </div>
              <div className="project-gallery-actions">
                <button
                  type="button"
                  className="js-project-preview"
                  data-preview-image={preview ?? ""}
                  data-project-title={title}
                  data-project-category={plainText(project.category || "Web development")}
                  data-project-url={getSafeUrl(project.url) ?? ""}
                  data-project-details={details}
                  aria-label={`Preview ${title}`}
                >
                  View full page
                </button>
              </div>
            </article>
          );
        })}
      </div>

    </>
  );
}
