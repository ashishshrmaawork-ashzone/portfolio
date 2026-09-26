import { redirect } from "next/navigation";
// The beforeFiles rewrite serves the original HTML at /. This is a fallback.
export default function HomePage() { redirect("/index.html"); }
