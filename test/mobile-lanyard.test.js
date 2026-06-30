import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const lanyardCss = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");
const lanyardSource = await readFile(new URL("../src/components/Lanyard/Lanyard.jsx", import.meta.url), "utf8");

test("mobile lanyard remains reachable without blocking page scroll", () => {
  assert.match(lanyardCss, /#reactbits-lanyard-root\s*\{[^}]*touch-action:\s*none;/s);
  assert.match(lanyardCss, /width:\s*min\(720px,\s*96vw\);/);
  assert.match(lanyardCss, /height:\s*900px;/);
  assert.match(lanyardCss, /#reactbits-lanyard-root:has\(\.reactbits-lanyard-shell\.is-hidden\)\s*\{[^}]*pointer-events:\s*none;/s);
  assert.match(lanyardCss, /#reactbits-lanyard-root:has\(\.reactbits-lanyard-shell\.is-hidden\) \.reactbits-lanyard-shell\s*\{[^}]*pointer-events:\s*none;/s);
  assert.match(lanyardCss, /@media \(max-width:\s*560px\)\s*\{[^}]*#reactbits-lanyard-root\s*\{[^}]*right:\s*-12px;[^}]*width:\s*min\(58vw,\s*260px\);[^}]*height:\s*380px;[^}]*touch-action:\s*pan-y;/s);
  assert.match(lanyardCss, /\.reactbits-lanyard-shell,\s*\.reactbits-lanyard-shell canvas\s*\{[^}]*touch-action:\s*pan-y;/s);
  assert.match(lanyardSource, /name="mobile-card-hit-area"/);
  assert.match(lanyardSource, /<group\s+scale=\{2\.5\}/);
  assert.match(lanyardSource, /<boxGeometry args=\{\[2\.4,\s*3\.3,\s*0\.16\]\}/);
});
