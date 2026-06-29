# ZGY Personal Portrait Page

This is a Vite-powered single-page portrait website for ZGY. The page keeps the original portrait gallery and adds a React Bits lanyard badge built with Three.js and Rapier physics.

## Local Preview

```powershell
npm install
npm run dev -- --port 4173
```

Then open `http://127.0.0.1:4173/index.html`.

## Production Build

```powershell
npm run build
npm run preview -- --port 4174
```

The production HTML is generated in `dist/index.html`.

## Image Structure

- Original photos are stored in `pictures/`.
- The page uses optimized WebP files from `assets/` for faster loading.
- To replace a portrait, keep the same file name in `assets/` and overwrite the corresponding WebP file.

## Page Structure

- `hero`: main ZGY identity section.
- `denim`: cool gray denim portraits.
- `crimson`: red studio and black suit portraits.
- `vintage`: vintage interior and western leather portraits.
- `contact`: contact and back-to-top links.

## Interaction Details

- The upper-right lanyard badge uses the React Bits Lanyard component with real WebGL physics and drag interaction.
- The navigation bar subtly tightens after scrolling.
- Portrait cards use bottom-aligned full-image display, so the subject is not cropped.
- Portrait cards include soft reveal, hover sheen, and pointer-based tilt effects.
- Reduced-motion users receive simplified transitions automatically.

## GitHub Pages Deployment

Build with `npm run build` and deploy the generated `dist/` directory with your GitHub Pages workflow or Pages deployment tool.