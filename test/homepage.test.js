import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

test("contact links render clean arrow glyphs instead of mojibake", () => {
  assert.equal(/\uFFFD|\u951F/.test(html), false);
  assert.match(
    html,
    /<a href="mailto:mason-zgy@qq.com">mason-zgy@qq.com <span aria-hidden="true">&rarr;<\/span><\/a>/
  );
  assert.match(
    html,
    /<a href="\/" data-back-home>Back to Top <span aria-hidden="true">&uarr;<\/span><\/a>/
  );
  assert.match(html, /backHomeLink\.addEventListener\("click"/);
  assert.match(html, /window\.location\.assign\(backHomeLink\.href\)/);
});

test("hero carousel images fill the display frame", () => {
  assert.match(html, /\.hero-frame img\s*\{[^}]*object-fit:\s*cover;/s);
});

test("hero carousel uses build-resolved image URLs", () => {
  assert.match(html, /function resolveImageSource\(selector,\s*fallback\)/);
  assert.equal(/image:\s*"assets\/(?:hero-denim|crimson-hero|western-hero)\.webp"/.test(html), false);
});
