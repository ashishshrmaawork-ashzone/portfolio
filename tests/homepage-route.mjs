import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const homepage = await readFile(new URL("../components/homepage.tsx", import.meta.url), "utf8");
const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
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
console.log("PASS React JSX homepage, styles, forms, scripts and API-populated sections");
