# AXNOVATECH Visual Refresh

## What changed
- Replaced the abstract gold 3D knot in the homepage hero with a photo-led editorial layout.
- Added a real-world media collage for team collaboration, software development and infrastructure.
- Added a cinematic video treatment to the delivery/process section. The video is optional; if no video is downloaded, the section uses the team photo as its poster.
- Added responsive mobile styling and reduced-motion support.
- Added a local Pixabay media downloader so images are stored in `public/` rather than permanently hotlinked.

## Fetch the media
From the repository root:
```bash
npm run media:setup
```
This downloads curated Pixabay photos into `apps/web/public/photos/`. To also fetch a short Pixabay business/technology video, add `PIXABAY_API_KEY=your_key` to `apps/web/.env.local` and rerun the command.

Pixabay image source pages:
- https://pixabay.com/photos/business-team-meeting-web-app-app-8640890/
- https://pixabay.com/photos/code-coding-programming-html-2558220/
- https://pixabay.com/photos/technology-servers-server-1587673/
- https://pixabay.com/photos/software-development-developer-6523979/

Video source is selected from the Pixabay API using the configured key. Credits are written to `apps/web/public/MEDIA-CREDITS.txt`.

## Run
```bash
npm run media:setup
npm run dev:web
```
Then refresh `http://localhost:3000` with Ctrl+Shift+R.
