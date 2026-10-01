import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { stripTypeScriptTypes } from "node:module";

const source = await readFile(new URL("../lib/wordpress.ts", import.meta.url), "utf8");
const wordpress = await import(
  `data:text/javascript;base64,${Buffer.from(stripTypeScriptTypes(source)).toString("base64")}`
);
const originalFetch = globalThis.fetch;
const originalError = console.error;
console.error = () => {};

try {
  globalThis.fetch = async () => {
    throw new Error("Simulated WordPress outage");
  };

  const fallbackProjects = await wordpress.getProjects();
  const fallbackPosts = await wordpress.getBlogPosts();
  assert.equal(fallbackProjects.length, 11);
  assert.equal(fallbackProjects[0].slug, "softart");
  assert.equal(fallbackPosts.length, 3);
  assert.equal(fallbackPosts[0].slug, "plan-your-website");

  globalThis.fetch = async (input) => {
    const url = String(input);
    if (url.includes("/portfolio-page")) {
      return Response.json({
        success: true,
        total_pages: 1,
        data: [{
          id: 999,
          title: "API project only",
          slug: "api-only",
          excerpt: "",
          content: "",
          thumbnail_image: "",
          detail_image: "https://example.com/detail.png",
          client: "",
          year: "2025",
          technologies: [{ id: 4, name: "React", slug: "react" }],
          short_description: "A React project.",
          category: "Frontend Development",
          categories: [{ id: 2, name: "Frontend Development", slug: "frontend-development" }],
          date: "",
        }],
      });
    }
    if (url.includes("/wp/v2/posts")) {
      return Response.json([{
        id: 1000,
        slug: "api-article",
        status: "publish",
        date: "2026-09-30",
        title: { rendered: "API article only" },
      }], { headers: { "X-WP-TotalPages": "1" } });
    }
    throw new Error(`Unexpected request: ${url}`);
  };

  const apiProjects = await wordpress.getProjects();
  const apiPosts = await wordpress.getBlogPosts();
  assert.deepEqual(apiProjects.map((project) => project.slug), ["api-only"]);
  assert.equal(apiProjects[0].detail_image, "https://example.com/detail.png");
  assert.deepEqual(apiProjects[0].technologies.map((technology) => technology.name), ["React"]);
  assert.equal("url" in apiProjects[0], false);
  assert.equal("poster_image" in apiProjects[0], false);
  assert.deepEqual(apiPosts.map((post) => post.slug), ["api-article"]);

  let projectsCacheMode;
  globalThis.fetch = async (input, init) => {
    if (!String(input).includes("/portfolio-page")) {
      throw new Error(`Unexpected request: ${String(input)}`);
    }
    projectsCacheMode = { cache: init?.cache, revalidate: init?.next?.revalidate };
    return Response.json({ success: true, total_pages: 1, data: [] });
  };
  await wordpress.getProjects();
  assert.deepEqual(projectsCacheMode, { cache: undefined, revalidate: 0 });

  const resumeRequests = [];
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    resumeRequests.push({ url, revalidate: init?.next?.revalidate });
    const education = url.endsWith("/education");
    return Response.json([{
      id: education ? 2001 : 2002,
      title: education ? "Current education" : "Current experience",
      experience: "Current period",
      content: "Latest content from WordPress",
    }]);
  };

  const workExperience = await wordpress.getWorkExperience();
  const education = await wordpress.getEducation();
  assert.equal(workExperience[0].content, "Latest content from WordPress");
  assert.equal(education[0].content, "Latest content from WordPress");
  assert.equal(resumeRequests.length, 2);
  assert.ok(resumeRequests.every((request) => request.revalidate === 0));
  console.log("PASS API-first content, saved-data fallback, and fresh resume API data");
} finally {
  globalThis.fetch = originalFetch;
  console.error = originalError;
}
