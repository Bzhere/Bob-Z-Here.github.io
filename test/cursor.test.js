import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const lanyardSource = await readFile(new URL("../src/components/Lanyard/Lanyard.jsx", import.meta.url), "utf8");
const catCursorUrl = new URL("../assets/cat-cursor.png", import.meta.url);

test("desktop custom cursor uses the cat artwork", async () => {
  await access(catCursorUrl);
  assert.match(html, /<div class="cat-cursor" aria-hidden="true"><\/div>/);
  assert.match(html, /\.cat-cursor\s*\{[^}]*background-image:\s*url\("assets\/cat-cursor\.png"\)/s);
  assert.match(html, /const catCursor = document\.querySelector\("\.cat-cursor"\)/);
  assert.equal(html.includes("metal-cursor"), false);
});

test("lanyard does not restore the native cursor on desktop", () => {
  assert.equal(lanyardSource.includes("document.body.style.cursor"), false);
});
