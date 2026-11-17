# AXNOVATECH V77 — Enterprise Website

## What changed
- Fixed low-contrast About directory cards.
- Replaced the dark, low-contrast six-stage strip on service detail pages with readable responsive process cards.
- Added an in-page project enquiry form to service topic, service family, capability and business-solution pages. "Get a quote", "Talk to sales" and similar CTAs now scroll to the form on the same page.
- All enquiry and review forms use `/api/contact` and send to `nikhilkauriya04@gmail.com` by default.
- Removed the founder profile/card from the homepage. Replaced it with company-wide capability areas.
- Rebuilt the AXNOVATECH wordmark using the symbol plus a clean text lockup.
- Insights cards now use unique named Pixabay media slots (`ins-topic-<slug>`) instead of repeating `ins-0`.
- Homepage editorial sections use dedicated photo slots so the hero slide images are not reused in the sections below.
- Shared content photos and high-traffic homepage cards use Next Image responsive AVIF/WebP optimization with lazy loading.
- Hero carousel auto-advances every 5.6 seconds, pauses when the browser tab is hidden, and respects reduced-motion preferences.
- Added baseline security headers and bounded in-memory form rate limiting.

## Setup
1. Copy `.env.example` to `.env.local` in `apps/web`.
2. Set a real SMTP sending mailbox and SMTP app password. For Gmail, use a Google App Password on an account with 2-Step Verification; never use your normal Google password.
3. Keep `.env.local` out of Git.
4. Run `npm install` at the monorepo root if dependencies are not installed.
5. From the web app directory, run `npm run media:setup` to download the site's Pixabay photos and videos locally. This uses `PIXABAY_API_KEY` in `apps/web/.env.local`; keep the key private.
6. Run `npm run dev` for local testing and `npm run build` before production.

## Production security
- HTTPS is mandatory. Configure TLS at the hosting provider.
- Add WAF/provider-level rate limits and bot protection. The route's in-memory limiter is only a baseline and resets on deploy/serverless instance changes.
- Configure SMTP sender authentication (SPF, DKIM, DMARC) for the sending domain.
- Use a managed secret store for SMTP credentials and API keys.
- Do not collect payment card details or sensitive personal information through the enquiry form.
- Run dependency audit, Lighthouse, accessibility checks and an external security review before launch.

## Truthful brand policy
Do not publish invented staff names, client logos, client reviews, certifications, office addresses, project metrics or enterprise references. Add verified facts only after obtaining approval and evidence.

## Research principles applied
The information architecture follows enterprise patterns visible on TCS's official site: service families, industry navigation, products/platforms, company information, careers and clear contact entry points. Performance and metadata practices follow official Next.js and Google Search Central guidance. See the project handover in chat for source links.
