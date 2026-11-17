# AXNOVATECH Full-stack Starter

Includes a responsive Next.js website, Expo mobile app, Express API, PostgreSQL/Prisma schema, lead capture, Razorpay order/signature verification foundation, SEO routes and policy page drafts.

## Requirements
Node.js 20+, npm 10+, PostgreSQL 15+ (or Docker).

## Setup
1. Copy `.env.example` to `.env` and change secrets.
2. `npm ci`
3. `docker compose up -d db`
4. `npm run db:generate`
5. `npm run db:migrate`
6. `npm run dev`

Website: http://localhost:3000  
API health: http://localhost:4000/health

Mobile: `npm run dev:mobile`

## Important
This is a development foundation, not a security-audited production system. Razorpay requires merchant onboarding and API keys. AdSense approval is Google's decision; this project only provides technical/policy foundations. Replace all example domain/contact details, publish original content, complete policies, configure consent, security, backups, monitoring, email, payment webhooks and store compliance before launch. Never publish invented testimonials, clients, certifications or metrics.


## Run the expanded website (Ubuntu / Linux)
After extracting the ZIP, open a terminal in the `AXNOVATECH` folder (the folder containing the root `package.json`):

```bash
npm ci
npm run dev:web
```

Open `http://localhost:3000`. Do not run `cd AXNOVATECH/apps/web` unless you have first navigated into the extracted `AXNOVATECH` folder. The workspace root command above installs the monorepo dependencies.

The content library includes 20 topic pages each for Services, Business Solutions, Industries, Digital Solutions, About, Work concepts, Careers and Insights. These are reusable, data-driven detail pages (140 total), not 140 unrelated codebases. Work entries are explicitly concept examples, and leadership, vacancies, customer results and company claims must be verified before publishing.

## AXNOVATECH launch checklist (important)

Before publishing the site:
- Set `NEXT_PUBLIC_SITE_URL` to the exact production domain (including `https://`).
- Set `CONTACT_TO_EMAIL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` and `SMTP_PASS` in the hosting provider. The contact form intentionally does not contain a personal-email fallback.
- Verify the mailbox by submitting a real test enquiry after deployment.
- Confirm the company address, phone, legal entity details, GST details (if applicable), pricing and service availability before publishing them.
- Add only genuine client reviews, team profiles, customer logos, certifications and outcome metrics. The team list and review list are empty by default to prevent invented claims.
- The work page contains the configured AXNOVATECH and UniqueToo examples. Confirm permissions, project scope and public links before treating any entry as a client case study.
- Configure a persistent rate limiter/WAF at the hosting or edge layer before high-volume production use. The API route's in-memory limiter is a basic abuse deterrent and does not share state across serverless instances.
- Review privacy, terms, refund and cookie policy text with a qualified professional before accepting payments or processing sensitive customer data.

## Build and deploy

```bash
npm ci
npm run build
npm run dev:web
```

Deploy the Next.js app in `apps/web` using the workspace-aware root install/build commands. Configure the environment variables in the hosting dashboard; never commit `.env.local` or credentials.


## AXNOVATECH website delivery update

The marketing website lives in `apps/web`. For local preview, run `npm ci` from the repository root and then `npm run dev:web`. Configure `apps/web/.env.local` from `apps/web/.env.example` for production enquiry email. Read `docs/AXNOVATECH_LAUNCH_RUNBOOK.md` before deployment.

The site now includes dedicated local-business and technology-partnership landing pages, quote-based pricing (until a verified rate card is approved), expanded lead qualification fields, and more accurate publication claims. The contact form requires SMTP configuration. Legal policy pages remain drafts and require review. A production CRM, authenticated client portal, retail POS, and payment processing are not included as live capabilities in this website build.


## V65 — AXNOVATECH Operations Workspace

V65 adds an internal operations MVP at `/ops`:
- Lead CRM with enquiry statuses and conversion to projects.
- Project register with delivery status tracking and task creation.
- Overview metrics for incoming leads and active delivery.
- Website enquiry form integration with the CRM API.
- Server-side admin API key gate; key is entered into the workspace and held in session storage.

See `docs/AXNOVATECH_OPERATIONS_MVP.md` for setup, routes and production security requirements.

**Important:** The operations workspace is an internal MVP using a shared admin key. Before onboarding staff or clients, implement individual accounts, role-based access, MFA, audit logs and session revocation. Proposal, client approval, invoicing and customer-facing portal flows are planned next, not represented as complete in V65.

## V71 enterprise website update

The website now uses a TCS-inspired enterprise navigation structure (original AXNOVATECH design), a five-slide homepage carousel, a service-first two-step contact form, full-screen service video heroes, 20 dedicated business solution pages, richer section-specific detail pages, company story and founder/team information, and an expanded FAQ centre.

### Local photos and video (V78.2)
The current build includes optimized, self-hosted WebP images in `apps/web/public/photos/` and a locally hosted H.264 capability film in `apps/web/public/videos/axnovatech-brand-film.mp4`. The included media works without a Pixabay key or third-party image host. To start locally, run `npm ci` and `npm run dev:web` from the repository root.

## AXNOVATECH V78 divisions and media
The website now presents five divisions: AXNOVA DIGITAL, AXNOVA AI, AXNOVA CLOUD, AXNOVA ENTERPRISE and AXNOVA PRODUCTS. Each division has a dedicated page under `/pillars/` and an enquiry form embedded on that page. A site-wide **Discuss a project** button opens the enquiry form without navigating away.

Twelve optimized photorealistic WebP visuals and the homepage capability film are served locally from `apps/web/public`, so the site does not depend on third-party image hosts at runtime.

For email delivery, copy `apps/web/.env.example` to `apps/web/.env.local` and configure a verified SMTP mailbox. Set the destination inbox through the server-side `CONTACT_TO_EMAIL` environment variable; the address is not rendered in the website UI.


## V78.3 — Real Pixabay photography and capability UX patch

This release fixes a critical mismatch from the previous build: the Pixabay downloader saves `.jpg` files, but the prior photo resolver only checked `.webp`. V78.3 now resolves `.jpg`, `.jpeg`, `.webp`, and `.png`, and prioritizes each page's own named photo slot to avoid repeating the same image. The homepage capability section is now four photographic cards rather than four plain text panels. The brand film has native playback controls.

### Use the Pixabay key already configured in V77
Copy the private env file from your existing V77 folder into this release (the key is never included in this ZIP):

```bash
cp ~/Downloads/AXNOVATECH-V77/apps/web/.env.local ~/Downloads/AXNOVATECH-V78.3/apps/web/.env.local
```

Then from the V78.3 repository root run:

```bash
npm ci
npm run media:setup -- --soft
npm run qa:source
npm run check:media -w @axnovatech/web
npm run dev:web
```

The media setup downloads unique Pixabay photos for page slots and video clips into `apps/web/public/photos` and `apps/web/public/videos`. It may take several minutes because it respects Pixabay's API rate limit. Keep `.env.local` private and do not commit it.


## V79 real Pixabay photography setup

1. Add `PIXABAY_API_KEY` to `apps/web/.env.local` (do not commit it).
2. Run `npm ci`.
3. Run `npm run media:homepage` to fetch distinct Pixabay photographs for the homepage, all five division cards and detail pages, industries, services, case studies, plus two videos.
4. Run `npm run check:media -w @axnovatech/web`.
5. Run `npm run dev:web`.

Run `npm run media:setup` instead of `media:homepage` to fetch the complete photo/video library for all inner pages. V79 no longer falls back to shared placeholder photos; only exact, self-hosted Pixabay slots are used.
