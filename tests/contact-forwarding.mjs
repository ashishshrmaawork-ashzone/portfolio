import { readFile } from "node:fs/promises";
import { stripTypeScriptTypes } from "node:module";
import assert from "node:assert/strict";

const requests = [];
globalThis.fetch = async (url, options) => {
  requests.push({ url, options });
  return Response.json({ success: true });
};

const source = (await readFile(new URL("../lib/wordpress.ts", import.meta.url), "utf8"));
const wordpress = await import(
  "data:text/javascript;base64," +
    Buffer.from(stripTypeScriptTypes(source)).toString("base64")
);

for (const [type, subject] of [["contact", "Website"], ["quote", "Quote: Website"]]) {
  await wordpress.submitContactMessage({
    name: "Test",
    email: "test@example.com",
    phone: "123",
    subject: type === "quote" ? "Quote: Website" : "Website",
    message: "Project details",
    type,
  });
}

assert.equal(requests.length, 2);
for (const [index, { url, options }] of requests.entries()) {
  assert.equal(url, "https://reactapp.kgkrealty.com/ashportfolio/wp-json/custom/v1/contact");
  assert.equal(options.method, "POST");
  assert.deepEqual(JSON.parse(options.body), {
    name: "Test",
    email: "test@example.com",
    phone: "123",
    subject: ["Website", "Quote: Website"][index],
    message: "Project details",
  });
}
console.log("PASS contact and quote submissions use the live WordPress contact endpoint contract");
