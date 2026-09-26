import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { ResumeTabs } from "@/components/resume-tabs";
import {
  getEducation,
  getProjects,
  getServices,
  getTestimonials,
  getWorkExperience,
} from "@/lib/wordpress";

export const dynamic = "force-dynamic";
export const revalidate = 300;

function SectionHeading({
  label,
  title,
  intro,
}: {
  label: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{label}</span>
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
  );
}

export default async function HomePage() {
  const [services, projects, experience, education, testimonials] = await Promise.all([
    getServices(),
    getProjects(),
    getWorkExperience(),
    getEducation(),
    getTestimonials(),
  ]);

  return (
    <main>
      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <span className="eyebrow"><span className="status-dot" /> AVAILABLE FOR SELECT PROJECTS</span>
          <h1>
            Hey, I&apos;m <span>Ashish Sharma.</span>
            <br />
            I build for the <em>web.</em>
          </h1>
          <p className="hero-description">
            Full stack developer turning good ideas into fast, reliable digital experiences — from the
            first line of code to the final deployment.
          </p>
          <div className="hero-actions">
            <Link className="button" href="#portfolio">
              Explore my work <span aria-hidden="true">↗</span>
            </Link>
            <Link className="text-link" href="#contacts">
              Let&apos;s talk <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="hero-facts" aria-label="Career highlights">
            <div><strong>10<span>+</span></strong><small>Years building</small></div>
            <div><strong>50<span>+</span></strong><small>Projects delivered</small></div>
            <div><strong>Full</strong><small>Stack, end to end</small></div>
          </div>
        </div>
        <div className="hero-art">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="code-window">
            <div className="window-bar"><span /><span /><span /><small>ashish.dev</small></div>
            <div className="code-lines" aria-label="Code preview">
              <p><span>const</span> developer = {"{"}</p>
              <p className="code-indent">name: <b>&quot;Ashish Sharma&quot;</b>,</p>
              <p className="code-indent">focus: <b>&quot;building for people&quot;</b>,</p>
              <p className="code-indent">stack: [<i>React</i>, <i>Next.js</i>],</p>
              <p className="code-indent">available: <em>true</em></p>
              <p>{"};"}</p>
              <div className="code-cursor" />
            </div>
            <div className="window-footer"><span className="status-dot" /> All systems go <span>↗</span></div>
          </div>
          <div className="floating-tag tag-top">{"<"} good ideas {"/>"}</div>
          <div className="floating-tag tag-bottom">build · ship · improve</div>
          <img className="hero-stack-art" src="/assets/images/tech-stack.svg" alt="" />
        </div>
      </section>

      <section className="services section-wrap section-pad" id="features">
        <SectionHeading
          label="WHAT I DO"
          title="Good work, from first sketch to launch."
          intro="The right mix of creative thinking and solid engineering to take your next idea further."
        />
        <div className="service-grid">
          {services.map((service, index) => (
            <article className="service-card" key={service.id}>
              <div className="service-card-top">
                <span className="service-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="service-arrow" aria-hidden="true">↗</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.content}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio section-pad" id="portfolio">
        <div className="section-wrap">
          <SectionHeading
            label="SELECTED WORK"
            title="A few things I’ve helped bring to life."
            intro="Real projects, real people, and plenty of lessons along the way."
          />
          <div className="project-grid">
            {projects.map((project, index) => (
              <article className="project-card" key={project.id}>
                <Link className="project-image" href={`/projects/${project.slug}`}>
                  {project.thumbnail_image ? (
                    <img src={project.thumbnail_image} alt={`${project.title} project preview`} loading="lazy" />
                  ) : (
                    <span className="project-placeholder">{project.title}</span>
                  )}
                  <span className="project-count">{String(index + 1).padStart(2, "0")}</span>
                  <span className="project-open" aria-hidden="true">↗</span>
                </Link>
                <div className="project-meta">
                  <div>
                    <span className="project-category">{project.category || "Web development"}</span>
                    <h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3>
                  </div>
                  <Link className="project-link" href={`/projects/${project.slug}`} aria-label={`View ${project.title}`}>
                    ↗
                  </Link>
                </div>
                {project.tech && <p className="project-tech">{project.tech}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="resume section-wrap section-pad" id="resume">
        <SectionHeading
          label="THE JOURNEY SO FAR"
          title="A little about my path."
          intro="Every role and every project has added a new perspective to the way I build."
        />
        <ResumeTabs experience={experience} education={education} />
      </section>

      <section className="testimonials section-pad" id="testimonial">
        <div className="section-wrap">
          <SectionHeading
            label="KIND WORDS"
            title="Better work happens together."
            intro="A few words from the people I’ve had the pleasure of working with."
          />
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <figure className="testimonial-card" key={item.id}>
                <span className="quote-mark" aria-hidden="true">“</span>
                <blockquote>{item.review}</blockquote>
                <figcaption>
                  {item.photo && <img src={item.photo} alt="" loading="lazy" />}
                  <span><strong>{item.title}</strong><small>{item.designation}</small></span>
                </figcaption>
                <p className="testimonial-project">{item.review_title} · {item.review_detail}</p>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="contact section-wrap section-pad" id="contacts">
        <div className="contact-copy">
          <span className="eyebrow">HAVE A PROJECT IN MIND?</span>
          <h2>Let&apos;s make<br />something <em>great.</em></h2>
          <p>Tell me what you&apos;re thinking. I&apos;ll bring the curiosity, clear communication, and a plan to make it happen.</p>
          <a className="contact-email" href="mailto:ashishshrmaa@outlook.com">ashishshrmaa@outlook.com <span aria-hidden="true">↗</span></a>
          <a className="contact-whatsapp" href="https://wa.me/919928686337" target="_blank" rel="noreferrer">Or say hello on WhatsApp ↗</a>
        </div>
        <div className="contact-form-wrap">
          <div className="form-heading">
            <span className="eyebrow">YOUR NEXT MOVE</span>
            <h3>Tell me about it.</h3>
            <p>Share a few details and I&apos;ll get back to you.</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
