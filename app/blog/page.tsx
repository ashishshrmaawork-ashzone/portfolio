import { loadSiteSettings } from "@/lib/wordpress";
import Link from "next/link";
import { BlogList } from "@/components/blog-list";
import { getBlogPosts } from "@/lib/wordpress";

export const metadata = {
  title: "Blog | Ashish Sharma",
  description: "Notes on planning, design and building better digital experiences.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  const settings = await loadSiteSettings();
  return (
    <main id="blog-main">
      <section className="breadcrumb-band">
        <div className="shell">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Blog</span>
          </nav>
          <span className="eyebrow">{settings.blog_eyebrow ?? "Articles"}</span>
          <h1>{settings.blog_title ?? "Ideas for better digital experiences."}</h1>
          <p>{settings.blog_intro ?? "Notes on building better websites."}</p>
        </div>
      </section>
      <BlogList posts={posts} />
    </main>
  );
}
