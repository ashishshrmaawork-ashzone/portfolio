"use client";

export function ResumePrintButton({ className }: { className: string }) {
  return (
    <button className={className} onClick={() => window.print()} type="button">
      Download Resume (PDF)
    </button>
  );
}
