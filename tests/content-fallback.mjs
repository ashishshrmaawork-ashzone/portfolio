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
          content: "",
          thumbnail_image: "",
          poster_image: "",
          url: "",
          category: "",
          tech: "",
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
  assert.deepEqual(apiPosts.map((post) => post.slug), ["api-article"]);
  console.log("PASS API-first content with saved-data fallback");
} finally {
  globalThis.fetch = originalFetch;
  console.error = originalError;
}
