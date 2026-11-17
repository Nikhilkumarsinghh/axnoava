# AXNOVATECH website launch runbook

## Local development

Requirements: Node.js 20+ and npm 10+. From the repository root:

```bash
npm ci
npm run dev:web
```

Open `http://localhost:3000`. The website uses the Next.js app in `apps/web`. The separate API workspace and PostgreSQL services are not required to preview the marketing website.

## Contact form email

Copy `apps/web/.env.example` to `apps/web/.env.local` and configure:

- `NEXT_PUBLIC_SITE_URL`: the real canonical production URL, including `https://`.
- `CONTACT_TO_EMAIL`: the business inbox that should receive enquiries.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`: credentials for the chosen transactional email provider.

Never commit `.env.local` or expose SMTP credentials in browser code. The form returns a configuration error until valid mail settings are present. Send a test enquiry after deployment and verify both receipt and reply-to behaviour.

## Production hosting

Deploy the Next.js app using a supported Node.js hosting provider. Set the app root to `apps/web` if deploying the workspace app directly, or use the monorepo root with the web workspace build commands. Build command: `npm run build -w @axnovatech/web`. Start command: `npm run start -w @axnovatech/web`. Set Node.js 20+ and configure the environment variables above in the host dashboard.

Before changing DNS, verify the real domain and account ownership. Add the host-provided DNS records, enable HTTPS, and set `NEXT_PUBLIC_SITE_URL` to the final canonical URL. The source currently has a fallback domain for local metadata; do not rely on that fallback if the actual domain differs.

## Pre-launch checklist

- [ ] Confirm legal business name, registration details and official contact email/phone.
- [ ] Confirm domain ownership and production URL.
- [ ] Review every service claim against delivery capacity and partner agreements.
- [ ] Approve the rate card before publishing any numerical prices. This build uses quote-based pricing.
- [ ] Add only genuine case studies and client-approved testimonials. Concept work must be labelled as concept work.
- [ ] Review Privacy, Terms, Refund and Cookie policies with a qualified professional. Current policy pages are drafts and are not legal advice.
- [ ] Configure SMTP and test the contact and review submission flows.
- [ ] Add persistent rate limiting / bot protection at the hosting edge. The in-process Map limiter is only a basic safeguard and is not shared across serverless instances.
- [ ] Configure analytics only after consent and privacy disclosures are reviewed. Optional analytics and advertising scripts are not enabled in this build.
- [ ] Test navigation, all forms, mobile breakpoints, keyboard access, reduced motion, 404s, sitemap and robots.
- [ ] Run `npm run build` from the repository root and resolve all errors before release.
- [ ] Test a real deployment on desktop and mobile, then check Search Console after indexing.

## Important implementation boundaries

The website currently provides a lead form that sends email through SMTP when configured, a review submission flow that emails the team for moderation, and a rule-based chat fallback. It does not yet include a production CRM database, authenticated client portal, live payment processing, a retail POS product, or an automated project delivery system. Those are separate product builds and must not be advertised as live functionality until implemented and tested.
