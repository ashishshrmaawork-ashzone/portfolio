"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { BlogPost } from "@/lib/wordpress";
import { plainText } from "@/lib/wordpress";

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const [category, setCategory] = useState("All");
  const categories = useMemo(
    () => ["All", ...new Set(posts.map((post) => post.category).filter(Boolean))],
    [posts],
  );
  const visiblePosts = posts.filter(
    (post) => category === "All" || post.category === category,
  );

  return (
    <section className="shell blog-section" aria-label="Articles">
      <div className="blog-toolbar">
        <div className="blog-filters" role="group" aria-label="Filter articles">
          {categories.map((item) => (
            <button
              aria-pressed={category === item}
              key={item}
              onClick={() => setCategory(item)}
              type="button"
            >
              {item === "All" ? "All articles" : item}
            </button>
          ))}
        </div>
        <span id="article-count" role="status">
          {visiblePosts.length} {visiblePosts.length === 1 ? "article" : "articles"}
        </span>
      </div>
      <div className="blog-grid">
        {visiblePosts.map((post) => (
          <article className="blog-card" key={post.id}>
            <Link className="blog-card-link" href={`/blog/${encodeURIComponent(post.slug)}`}>
              {post.featured_image && <img src={post.featured_image} alt="" width="800" height="500" loading="lazy" />}
              <div className="blog-card-body">
                <span className="eyebrow">{post.category}</span>
                <h2>{plainText(post.title)}</h2>
                <p>{plainText(post.excerpt)}</p>
                <span className="text-link">Read article ↗</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
      {!visiblePosts.length && <p>No articles have been published yet.</p>}
    </section>
  );
}
