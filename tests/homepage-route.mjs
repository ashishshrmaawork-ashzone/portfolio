import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { stripTypeScriptTypes } from "node:module";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const source = await readFile(new URL("../components/homepage-markup.ts", import.meta.url), "utf8");
const moduleUrl = `data:text/javascript;base64,${Buffer.from(stripTypeScriptTypes(source)).toString("base64")}`;
const { homepageMarkup } = await import(moduleUrl);

for (const id of ["home", "features", "portfolio", "resume", "testimonial", "contacts", "quoteModal"]) {
  assert.match(homepageMarkup, new RegExp(`id="${id}"`), `homepage section ${id} is present`);
}
assert.match(homepageMarkup, /id="contact-form"/);
assert.match(homepageMarkup, /class="quote-form"/);
assert.match(homepageMarkup, /data-site-header/);
assert.match(homepageMarkup, /data-site-footer/);
assert.doesNotMatch(homepageMarkup, /<script\b/i);

const scriptsComponent = await readFile(new URL("../components/homepage-scripts.tsx", import.meta.url), "utf8");
const scriptsBlock = scriptsComponent.match(/const scripts = \[([\s\S]*?)\];/);
assert.ok(scriptsBlock, "homepage script manifest exists");
const scriptNames = [...scriptsBlock[1].matchAll(/"([^"]+\.js)"/g)].map((match) => match[1]);
assert.ok(scriptNames.length > 0, "homepage scripts are configured");
for (const scriptName of scriptNames) {
  await access(join(fileURLToPath(new URL("../public/assets/js/", import.meta.url)), scriptName));
}

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
assert.match(page, /dangerouslySetInnerHTML/);
assert.match(page, /<HomepageScripts/);
const contentScript = await readFile(new URL("../public/assets/js/dynamic-content.js", import.meta.url), "utf8");
assert.match(contentScript, /fetch\('\/api\/contact'/);
assert.match(contentScript, /request\('\/api\/portfolio\/' \+ name\)/);
assert.match(contentScript, /type: quote \? 'quote' : 'contact'/);
assert.doesNotMatch(contentScript, /localPreview/);
const config = await readFile(new URL("../next.config.ts", import.meta.url), "utf8");
assert.doesNotMatch(config, /rewrites\s*\(/, "homepage is no longer served by a static rewrite");
console.log("PASS Next.js homepage markup, forms, scripts and assets");
