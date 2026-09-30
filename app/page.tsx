import { HomepageScripts } from "@/components/homepage-scripts";
import { homepageMarkup } from "@/components/homepage-markup";

export default function HomePage() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: homepageMarkup }} />
      <HomepageScripts />
    </>
  );
}
