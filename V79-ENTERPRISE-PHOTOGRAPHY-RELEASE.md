# AXNOVATECH V79 — Photographic enterprise redesign

## Why this release exists
The V78.3 archive still contained a small set of legacy `.webp` placeholder visuals. The old resolver could fall back to a small shared photo pool, so different sections could display the same image. The previous media checker also expected obsolete `.webp` filenames and a video filename that the Pixabay downloader did not create.

## Changes
- Removed generic photo fallback and cross-slot image aliases. An exact slot is now required; missing assets remain visibly empty instead of reusing an unrelated photo.
- Added unique Pixabay photo slots for the homepage hero slides, all five AXNOVA divisions, division detail pages and two portfolio stories.
- Added a manifest audit that detects duplicate Pixabay image IDs and re-downloads duplicate slots.
- Added a homepage-first media command and corrected media validation for `.jpg`, `.jpeg`, `.webp` and `.png`.
- Rebuilt the five-division section as a clean photographic enterprise card system with responsive layouts, image-led hierarchy and restrained 3D hover motion.
- Improved service, industry and case-study image presentation.
- Kept the existing auto-rotating hero carousel, video film section, contact form and brand favicon.
- Preserved all five business pillars and honest operational copy; no unverified client counts or partner claims were added.

## Real Pixabay setup
Add `PIXABAY_API_KEY` to `apps/web/.env.local` (never commit this file), then run:

```bash
npm ci
npm run media:homepage
npm run check:media -w @axnovatech/web
npm run dev:web
```

This downloads homepage hero, division, service, industry, case-study and video assets locally. To populate every inner page as well, run `npm run media:setup` instead of `npm run media:homepage`. Pixabay results are downloaded and self-hosted; the site does not hotlink the Pixabay CDN.

## Verification
- `node --check apps/web/scripts/media-setup.mjs`: passed
- `node --check apps/web/scripts/check-media.mjs`: passed
- `npm run qa:source`: passed
- Full production build: not run in this offline environment.
- Pixabay downloads: not run here because the runtime has no outbound DNS/network access and the private API key is not bundled in the uploaded archive. Run the media commands locally with your existing key.
