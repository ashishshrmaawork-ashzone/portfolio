"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSiteSettings } from "@/components/site-settings-provider";
import { plainText, type PortfolioProject, type ResumeEntry, type Service, type Testimonial } from "@/lib/wordpress";

type LoadState<T> = { data: T[]; loading: boolean; error: boolean };

function useCollection<T>(name: string): LoadState<T> {
  const [state, setState] = useState<LoadState<T>>({
    data: [],
    loading: true,
    error: false,
  });

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch(`/api/portfolio/${name}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`${name} request failed (${response.status}).`);
        }
        const result: unknown = await response.json();
        if (!Array.isArray(result)) {
          throw new Error(`WordPress returned an invalid ${name} collection.`);
        }
        setState({ data: result as T[], loading: false, error: false });
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error(`Portfolio ${name} failed to load.`, error);
        setState({ data: [], loading: false, error: true });
      }
    }

    void load();
    return () => controller.abort();
  }, [name]);

  return state;
}

function CollectionStatus({ state, noun }: { state: LoadState<unknown>; noun: string }) {
  if (state.loading) return <p role="status">Loading {noun}…</p>;
  if (state.error) return <p role="status">Could not load {noun}. Please refresh to try again.</p>;
  if (!state.data.length) return <p role="status">No {noun} published yet.</p>;
  return null;
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="section-title text-center">
      <span className="subtitle">{eyebrow}</span>
      <h2 className="title">{title}</h2>
    </div>
  );
}

export function PortfolioSections() {
  const settings = useSiteSettings();
  const services = useCollection<Service>("services");
  const projects = useCollection<PortfolioProject>("projects");
  const work = useCollection<ResumeEntry>("workexperience");
  const education = useCollection<ResumeEntry>("education");
  const testimonials = useCollection<Testimonial>("testimonials");

  return (
    <>
      <section className="rn-service-area rn-section-gap section-separator" id="features">
        <div className="container">
          <SectionTitle
            eyebrow={settings.services_eyebrow || "Features"}
            title={settings.services_title || "What I Do"}
          />
          <div className="row row--25 mt--10">
            {services.data.map((service) => (
              <div className="col-lg-6 col-xl-4 col-md-6 col-12 mt--30" key={service.id}>
                <article className="rn-service">
                  <div className="inner">
                    <div className="content">
                      <h3 className="title">{plainText(service.title)}</h3>
                      <p className="description">{plainText(service.content)}</p>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
          <CollectionStatus state={services} noun="services" />
        </div>
      </section>

      <section className="rn-portfolio-area rn-section-gap section-separator" id="portfolio">
        <div className="container">
          <SectionTitle
            eyebrow={settings.portfolio_eyebrow || "Selected work"}
            title={settings.portfolio_title || "My Portfolio"}
          />
          <div className="row row--25 mt--10">
            {projects.data.slice(0, 6).map((project) => (
              <div className="col-lg-6 col-xl-4 col-md-6 col-12 mt--30" key={project.id}>
                <article className="rn-portfolio">
                  {project.thumbnail_image && (
                    <div className="thumbnail">
                      {/* WordPress stores portfolio images in its media library. */}
                      <img src={project.thumbnail_image} alt={plainText(project.title)} loading="lazy" />
                    </div>
                  )}
                  <div className="content">
                    <div className="category-info">
                      <div className="category-list">{plainText(project.category || "Web development")}</div>
                    </div>
                    <h3 className="title">{plainText(project.title)}</h3>
                    {project.tech && <p className="project-tech">{plainText(project.tech)}</p>}
                    <Link className="project-details-link" href={`/projects/${encodeURIComponent(project.slug)}`}>
                      Read more <span aria-hidden="true">↗</span>
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
          <CollectionStatus state={projects} noun="projects" />
          <div className="portfolio-view-more">
            <Link className="rn-btn" href="/projects">View all projects <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className="rn-resume-area rn-section-gap section-separator" id="resume">
        <div className="container">
          <SectionTitle
            eyebrow={settings.resume_eyebrow || "Experience"}
            title={settings.resume_title || "My Resume"}
          />
          <div className="resume-columns">
            <ResumeList title="Work experience" entries={work.data} state={work} />
            <ResumeList title="Education" entries={education.data} state={education} />
          </div>
        </div>
      </section>

      <section className="rn-testimonial-area rn-section-gap section-separator" id="testimonial">
        <div className="container">
          <SectionTitle
            eyebrow={settings.testimonials_eyebrow || "Client testimonials"}
            title={settings.testimonials_title || "Good work. Great partnerships."}
          />
          {settings.testimonials_intro && <p className="testimonial-intro">{settings.testimonials_intro}</p>}
          <div className="stories-grid">
            {testimonials.data.map((testimonial) => (
              <article className="story-card" key={testimonial.id}>
                <div className="story-body">
                  <h3>{plainText(testimonial.review_title || testimonial.title)}</h3>
                  {testimonial.review && <blockquote>{plainText(testimonial.review)}</blockquote>}
                  {testimonial.review_detail && <p>{plainText(testimonial.review_detail)}</p>}
                  <div className="story-author">
                    {testimonial.photo && <img src={testimonial.photo} alt="" width="48" height="48" loading="lazy" />}
                    <div>
                      <strong>{plainText(testimonial.title)}</strong>
                      <span>{plainText(testimonial.designation)}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <CollectionStatus state={testimonials} noun="testimonials" />
        </div>
      </section>
    </>
  );
}

function ResumeList({
  title,
  entries,
  state,
}: {
  title: string;
  entries: ResumeEntry[];
  state: LoadState<ResumeEntry>;
}) {
  return (
    <section className="resume-list">
      <h3>{title}</h3>
      {entries.map((entry) => (
        <article className="resume-single-list" key={entry.id}>
          <h4>{plainText(entry.title)}</h4>
          <p className="resume-date">{plainText(entry.experience)}</p>
          <p>{plainText(entry.content)}</p>
        </article>
      ))}
      <CollectionStatus state={state} noun={title.toLowerCase()} />
    </section>
  );
}
