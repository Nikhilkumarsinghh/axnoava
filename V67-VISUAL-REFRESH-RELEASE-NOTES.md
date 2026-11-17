# AXNOVATECH V67 — Visual Refresh

## Homepage experience
- Replaced the floating abstract 3D knot with a real-photography-led hero composition.
- New visual hierarchy: local business, software engineering, and cloud/infrastructure imagery.
- Stronger contrast, more editorial typography, warmer amber brand accent, and tighter CTAs.
- Responsive composition for desktop, tablet and mobile.
- Added reduced-motion considerations.

## Real media
- Added `npm run media:setup`.
- Downloads four curated Pixabay photographs locally into `apps/web/public/photos/`.
- Stores attribution/source pages in `apps/web/public/MEDIA-CREDITS.txt`.
- If `PIXABAY_API_KEY` is configured in `apps/web/.env.local`, it also fetches a suitable Pixabay business/technology MP4 into `apps/web/public/videos/intro.mp4`.
- Pixabay's API documentation says images should be downloaded to the app/server rather than permanently hotlinked; this workflow stores them locally.

## Start
```bash
npm run media:setup
npm run dev:web
```
Open `http://localhost:3000` and hard-refresh with `Ctrl + Shift + R`.

## Verification status
- TSX syntax transpilation passed for the changed homepage and hero media component.
- Media downloader JavaScript syntax check passed.
- ZIP integrity check passed.
- A full Next.js production build was not run in this environment because the project dependencies are not installed in this working container.
