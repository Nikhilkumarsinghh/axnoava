# AXNOVATECH V70: real media + trust layout

## What changed
- Fixed two build-breaking bugs from V67: `cookies/page.tsx` ("use client" + metadata) and the missing `photo` import on the homepage.
- New `apps/web/scripts/media-setup.mjs`: uses the Pixabay API to download ~55 different photos (hero, 7 service families, 20 industries, section banners, insights) and 2 videos into `public/photos` and `public/videos`. Each slot has its own search queries, no photo is used twice, credits go to `public/MEDIA-CREDITS.txt`.
- `prebuild` runs the script only if photos are missing and never fails the build, so Netlify/Vercel deploys also get real photos once `PIXABAY_API_KEY` is set there.
- Every inner page hero (services, industries, about, work, pricing, process, contact, partners ...) now gets its own photo banner. Unsplash hotlinks were removed.
- Homepage: photo cards for services, photo tiles for industries, a "local businesses" section, video section, readable dark section (was grey text on yellow).
- Cookie banner is now a small corner card (it used to cover the whole hero).
- Fonts are self-hosted (removed the render-blocking Google Fonts @import).
- Designed fallbacks (blueprint grid) show if a photo is not downloaded yet, no more empty "AXNO" boxes.

## Run
```bash
cd AXNOVATECH-V70
npm install
echo "PIXABAY_API_KEY=YOUR_KEY" >> apps/web/.env.local
npm run media:setup      # downloads photos + videos (about 60 API calls, ~2 min)
npm run dev:web          # http://localhost:3000, then Ctrl+Shift+R
```
Options: `npm run media:setup -- --force` (re-pick all), `-- --only=hero-team,intro` (one slot).
To change a picture, edit the queries in `media-setup.mjs` or drop your own `slot-name.jpg` into `public/photos`.

## Still needs your real facts (not invented)
`apps/web/src/data/site-config.ts`: email, phone, registered business name/GSTIN, real client reviews, real case studies, team members.
