# AXNOVATECH V78 — QA and handover

## Completed in this source package
- Rebuilt the corrupted About page and removed the duplicate import/JSX block that caused `Expected '</', got ':'`.
- Added the five business pillars to the homepage, main navigation, footer, About page and sitemap.
- Added five dedicated `/pillars/<division>` pages with service capability grids, outcome sections and an enquiry form embedded on the same page.
- Added a global **Discuss a project** action that opens the enquiry form in a modal without navigating away.
- Added the five divisions to the enquiry service selector.
- Routed the contact API default recipient to `nikhilkauriya04@gmail.com`.
- Replaced runtime Unsplash image URLs with locally hosted, unique SVG technology visuals; removed remote image host configuration.
- Added an 8-second locally hosted AXNOVATECH motion film for the homepage film section.
- Updated the design tokens and responsive styles to midnight navy, electric blue, cyan and off-white.
- Updated favicon metadata, division SEO metadata, structured data and sitemap entries.
- Added static asset caching headers and additional security headers.
- Hardened the chat endpoint with content-type, request-size, payload and rate-limit checks.
- Kept reviews and named team profiles honest: no fabricated ratings, client logos or employee profiles.

## Validation performed
- All application `.ts` and `.tsx` source files passed TypeScript transpile syntax checks.
- `next.config.ts`, sitemap and root layout passed syntax transpilation.
- All 1,691 generated SVG assets parsed as valid XML.
- The local homepage MP4 was verified as an 8-second H.264 video.
- Literal image slots referenced by the app were checked against the local media directory.

## Not yet verified
A full `next build` could not be completed in this environment because dependency installation timed out and left an incomplete `node_modules` directory (`next` executable unavailable). This is an environment limitation, not a claimed successful production build. Run the installation and build commands below on your Ubuntu machine before deployment.

## First run on Ubuntu
From the extracted `AXNOVATECH-V78` folder:

```bash
npm install --no-audit --no-fund
cp apps/web/.env.example apps/web/.env.local
nano apps/web/.env.local
```

Set the SMTP values in `apps/web/.env.local`:
- `CONTACT_TO_EMAIL=nikhilkauriya04@gmail.com`
- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=465`
- `SMTP_USER=your_verified_sending_mailbox@gmail.com`
- `SMTP_PASS=your_google_app_password`
- `NEXT_PUBLIC_SITE_URL=https://your-real-domain.example`

Then start the site:

```bash
npm run dev:web
```

Open `http://localhost:3000`.

## Production verification
```bash
npm run build -w @axnovatech/web
npm run start -w @axnovatech/web
```

Check the homepage, all five `/pillars/` pages, contact modal, contact API with configured SMTP, mobile navigation, sitemap and robots file before production deployment.

## Production caveats
- SMTP must be configured with a verified sending mailbox. The source archive contains placeholders only; it does not contain credentials.
- The form API uses an in-process rate limiter. Add CDN/WAF rate limiting at the production edge for multi-instance/serverless deployments.
- No website can be guaranteed impossible to hack. Keep dependencies patched, use HTTPS, protect credentials, enable backups and monitor logs.
- AXNOVA PRODUCTS entries are proposed product concepts, not launched products. AXNO PAY must not process payments before all required banking, payment-network and regulatory approvals.
- Client reviews remain unpublished until genuine, approved customer feedback is available.
- Confirm the actual production domain and replace the example URL in environment configuration.
