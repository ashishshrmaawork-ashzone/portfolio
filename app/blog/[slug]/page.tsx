import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPosts, plainText } from "@/lib/wordpress";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getBlogPosts()).find((item) => item.slug === slug);
  if (!post) return { title: "Article not found | Ashish Sharma" };
  return {
    title: `${plainText(post.title)} | Ashish Sharma`,
    description: plainText(post.excerpt).slice(0, 160),
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();

  const title = plainText(post.title);
  const paragraphs = plainText(post.content)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <main id="blog-main">
      <section className="breadcrumb-band">
        <div className="shell">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">/</span>
            <Link href="/blog">Blog</Link><span aria-hidden="true">/</span>
            <span aria-current="page">{title}</span>
          </nav>
          <span className="eyebrow">{post.category}</span>
          <h1>{title}</h1>
          <p>{plainText(post.excerpt)}</p>
        </div>
      </section>
      <section className="shell article-section">
        {post.featured_image && <img className="article-cover" src={post.featured_image} alt="" width="1200" height="600" />}
        <article className="article-layout">
          <div id="article-body">
            {paragraphs.map((paragraph, index) => <p key={`${index}-${paragraph.slice(0, 30)}`}>{paragraph}</p>)}
          </div>
          <aside className="article-sidebar">
            <h2>Keep exploring</h2>
            <Link className="text-link" href="/blog">All articles →</Link>
            <p>Interested in a project? <Link href="/#contacts">Get in touch</Link>.</p>
          </aside>
        </article>
        <section className="related-section">
          <div className="related-heading"><h2>More articles</h2><Link className="text-link" href="/blog">All articles →</Link></div>
          <div className="blog-grid">
            {posts.filter((item) => item.slug !== post.slug).slice(0, 3).map((item) => (
              <article className="blog-card" key={item.id}>
                <Link className="blog-card-link" href={`/blog/${encodeURIComponent(item.slug)}`}>
                  {item.featured_image && <img src={item.featured_image} alt="" width="800" height="500" loading="lazy" />}
                  <div className="blog-card-body"><span className="eyebrow">{item.category}</span><h2>{plainText(item.title)}</h2><p>{plainText(item.excerpt)}</p></div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
