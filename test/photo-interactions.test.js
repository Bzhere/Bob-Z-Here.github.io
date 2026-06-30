import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

test("photo grids stay clickable above the lanyard overlay", () => {
  assert.match(
    html,
    /\.photo-grid\s*\{[^}]*position:\s*relative;[^}]*z-index:\s*55;/s
  );
  assert.match(html, /\.theme\s*\{[^}]*position:\s*relative;[^}]*z-index:\s*25;/s);
  assert.match(html, /\.photo img\s*\{[^}]*pointer-events:\s*none;/s);
  assert.match(html, /\.photo::after\s*\{[^}]*pointer-events:\s*none;/s);
});
