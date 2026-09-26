import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found section-wrap">
      <span className="eyebrow">404 · PAGE NOT FOUND</span>
      <h1>Looks like this one went off-script.</h1>
      <p>The page you&apos;re looking for isn&apos;t here. Let&apos;s get you back to the good stuff.</p>
      <Link className="button" href="/#home">Back to home <span aria-hidden="true">↗</span></Link>
    </main>
  );
}
