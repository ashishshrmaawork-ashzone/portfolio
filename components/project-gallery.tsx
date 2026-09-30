"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const selectedProjectUrl = selectedProject ? getSafeUrl(selectedProject.url) : null;
  const selectedProjectPoster = selectedProject
    ? getSafeUrl(selectedProject.poster_image)
    : null;
  const selectedProjectThumbnail = selectedProject
    ? getSafeUrl(selectedProject.thumbnail_image)
    : null;

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
          const thumbnail = getSafeUrl(project.thumbnail_image);
          const poster = getSafeUrl(project.poster_image);
          const image = thumbnail || poster;

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
                  onClick={() => setSelectedProject(project)}
                  aria-label={`Preview ${title}`}
                >
                  View full page
                </button>
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
                <Link href={`/projects/${encodeURIComponent(selectedProject.slug)}`}>
                  Project details
                </Link>
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
              {(selectedProjectPoster || selectedProjectThumbnail) ? (
                <img
                  src={selectedProjectPoster || selectedProjectThumbnail || ""}
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
