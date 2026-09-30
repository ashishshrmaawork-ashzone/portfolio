"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { plainText, type PortfolioProject } from "@/lib/wordpress";

function getProjectUrl(url: string): string | null {
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
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const selectedProjectUrl = selectedProject ? getProjectUrl(selectedProject.url) : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selectedProject && dialog && !dialog.open) {
      dialog.showModal();
    }
  }, [selectedProject]);

  return (
    <>
      <div className="project-gallery">
        {projects.map((project) => {
          const title = plainText(project.title);
          const image = project.thumbnail_image || project.poster_image;

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
                <span className="project-gallery-category">
                  {plainText(project.category || "Web development")}
                </span>
                <h2>{title}</h2>
              </div>
              <div className="project-gallery-actions">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  aria-label={`Preview ${title}`}
                >
                  View full page
                </button>
                <Link href={`/projects/${encodeURIComponent(project.slug)}`}>
                  Project details
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      <dialog
        className="project-preview-dialog"
        ref={dialogRef}
        aria-label={selectedProject ? `${plainText(selectedProject.title)} preview` : "Project preview"}
        onClose={() => setSelectedProject(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) {
            dialogRef.current?.close();
          }
        }}
      >
        {selectedProject && (
          <>
            <div className="project-preview-toolbar">
              <div>
                <span>{plainText(selectedProject.category || "Web development")}</span>
                <h2>{plainText(selectedProject.title)}</h2>
              </div>
              <div className="project-preview-toolbar-actions">
                {selectedProjectUrl && (
                  <a
                    href={selectedProjectUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit live site <span aria-hidden="true">↗</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => dialogRef.current?.close()}
                  aria-label="Close project preview"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="project-preview-content">
              {(selectedProject.poster_image || selectedProject.thumbnail_image) ? (
                <img
                  src={selectedProject.poster_image || selectedProject.thumbnail_image}
                  alt={`${plainText(selectedProject.title)} full-page preview`}
                />
              ) : (
                <p>No project preview image is available.</p>
              )}
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
