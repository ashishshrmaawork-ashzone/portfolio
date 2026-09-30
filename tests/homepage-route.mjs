import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const homepage = await readFile(new URL("../components/homepage.tsx", import.meta.url), "utf8");
const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
assert.match(page, /title:\s*"Ashish Sharma \| Full Stack Developer & Web Solutions Expert"/);
assert.match(page, /canonical:\s*"\/"/);
assert.match(page, /openGraph:/);
assert.match(page, /twitter:/);
const styles = await readFile(new URL("../app/homepage.css", import.meta.url), "utf8");

for (const id of ["home", "features", "portfolio", "resume", "testimonial", "contacts", "quoteModal"]) {
  assert.match(homepage, new RegExp(`id="${id}"`), `homepage section ${id} is present`);
}
assert.match(homepage, /id="contact-form"/);
assert.match(homepage, /className="quote-form"/);
assert.match(homepage, /id="quote-captcha"/);
assert.match(homepage, /<select id="quote-service"[^>]*defaultValue=""/);
assert.doesNotMatch(homepage, /\sselected(?:\s|>)/);
assert.doesNotMatch(homepage, /â|ï¿½/, "homepage copy is valid UTF-8");
assert.match(homepage, /<SiteHeader\s*\/>/);
assert.match(homepage, /<SiteFooter\b/);
assert.match(homepage, /<HomepageScripts\s*\/>/);
assert.doesNotMatch(homepage, /dangerouslySetInnerHTML|homepageMarkup|String\.raw|<style\b/i);
assert.match(page, /import "\.\/homepage\.css"/);
assert.match(page, /<Homepage\s*\/>/);
assert.doesNotMatch(page, /dangerouslySetInnerHTML|homepageMarkup/);
assert.doesNotMatch(styles, /<style\b|<\/style>/i);

const scriptsComponent = await readFile(new URL("../components/homepage-scripts.tsx", import.meta.url), "utf8");
const scriptsBlock = scriptsComponent.match(/const scripts = \[([\s\S]*?)\];/);
assert.ok(scriptsBlock, "homepage script manifest exists");
const scriptNames = [...scriptsBlock[1].matchAll(/"([^"]+\.js)"/g)].map((match) => match[1]);
assert.ok(scriptNames.length > 0, "homepage scripts are configured");
assert.ok(!scriptNames.includes("site-layout.js"), "React components render the shared homepage chrome");
for (const scriptName of scriptNames) {
  await access(join(fileURLToPath(new URL("../public/assets/js/", import.meta.url)), scriptName));
}

const contentScript = await readFile(new URL("../public/assets/js/dynamic-content.js", import.meta.url), "utf8");
assert.match(contentScript, /fetch\('\/api\/contact'/);
assert.match(contentScript, /request\('\/api\/portfolio\/' \+ name\)/);
assert.match(contentScript, /type: quote \? 'quote' : 'contact'/);
for (const collection of ["services", "projects", "workexperience", "education"]) {
  assert.ok(contentScript.includes(collection), `${collection} remains API-populated`);
}
const testimonialScript = await readFile(new URL("../public/assets/js/testimonial-slider.js", import.meta.url), "utf8");
assert.match(testimonialScript, /collection\('testimonials'\)/, "testimonials remain API-populated");
assert.doesNotMatch(contentScript, /localPreview/);

const config = await readFile(new URL("../next.config.ts", import.meta.url), "utf8");
assert.doesNotMatch(config, /rewrites\s*\(/, "homepage is no longer served by a static rewrite");
assert.match(config, /X-Robots-Tag/);
const robots = await readFile(new URL("../app/robots.ts", import.meta.url), "utf8");
assert.match(robots, /allow:\s*"\/"/);
assert.match(robots, /disallow:\s*\["\/api\/"\]/);
assert.match(robots, /sitemap\.xml/);
const sitemap = await readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8");
assert.match(sitemap, /getProjects/);
assert.match(sitemap, /getBlogPosts/);
assert.match(sitemap, /\/privacy-policy/);
assert.match(sitemap, /\/terms-and-conditions/);
const footer = await readFile(new URL("../components/site-footer.tsx", import.meta.url), "utf8");
assert.match(footer, /href="\/privacy-policy">Privacy Policy/);
assert.match(footer, /href="\/terms-and-conditions">Terms &amp; Conditions/);
const privacy = await readFile(new URL("../app/privacy-policy/page.tsx", import.meta.url), "utf8");
const terms = await readFile(new URL("../app/terms-and-conditions/page.tsx", import.meta.url), "utf8");
assert.match(privacy, /title: "Privacy Policy \| Ashish Sharma"/);
assert.match(privacy, /WordPress contact service/);
assert.match(privacy, /ashishshrmaa@outlook\.com/);
assert.match(terms, /title: "Terms & Conditions \| Ashish Sharma"/);
assert.match(terms, /Enquiries and project agreements/);
console.log("PASS React homepage, SEO metadata, and legal pages");
