# Z·GY Personal Portrait Page

This is a static single-page portrait website for Z·GY. It can be opened directly in a browser or hosted with any static site service.

## Local Preview

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Then open `http://127.0.0.1:4173/index.html`.

## Image Structure

- Original photos are stored in `pictures/`.
- The page uses optimized WebP files from `assets/` for faster loading.
- To replace a portrait, keep the same file name in `assets/` and overwrite the corresponding WebP file.

## Page Structure

- `hero`: main Z·GY identity section.
- `denim`: cool gray denim portraits.
- `crimson`: red studio and black suit portraits.
- `vintage`: vintage interior and western leather portraits.
- `contact`: contact and back-to-top links.

## Interaction Details

- The navigation bar subtly tightens after scrolling.
- Portrait cards use bottom-aligned full-image display, so the subject is not cropped.
- Portrait cards include soft reveal, hover sheen, and pointer-based tilt effects.
- Reduced-motion users receive simplified transitions automatically.

## GitHub Pages Deployment

1. Create a GitHub repository named `<your-username>.github.io` for a user site, or any repository name for a project site.
2. Upload `index.html`, `README.md`, and the `assets/` directory to the repository root.
3. If this is a project site, go to repository `Settings` -> `Pages`, choose `Deploy from a branch`, select the `main` branch and `/root`, then save.
4. If this is a user site named `<your-username>.github.io`, GitHub Pages will publish from the default branch root.
5. Wait for the Pages build to finish, then open `https://<your-username>.github.io/` for a user site or `https://<your-username>.github.io/<repo-name>/` for a project site.

Keep `index.html` in the repository root so GitHub Pages can use it as the homepage.
