"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Portfolio page failed to load.", error);
  }, [error]);

  return (
    <main className="not-found section-wrap">
      <span className="eyebrow">SOMETHING WENT WRONG</span>
      <h1>The portfolio couldn&apos;t load right now.</h1>
      <p>Please try again in a moment. If the problem continues, get in touch by email.</p>
      <button className="button" onClick={() => reset()} type="button">
        Try again <span aria-hidden="true">↻</span>
      </button>
    </main>
  );
}
