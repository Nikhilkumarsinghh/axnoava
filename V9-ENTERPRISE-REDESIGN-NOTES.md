# AXNOVATECH V9 — Enterprise redesign

## Design direction
The navigation and content hierarchy were reworked after reviewing the information architecture on the official TCS website and the public Accenture site. This is an original AXNOVATECH design, not a copy of their branding or proprietary assets.

## Implemented
- Rebuilt desktop navigation with enterprise categories: What we do, Industries, Solutions, Insights, Who we are, Careers and Contact us.
- Added structured dropdown panels with overview links and keyboard/Escape/outside-click close behavior.
- Reworked mobile navigation as a full-height, scrollable accordion-style menu.
- Rebuilt the footer into corporate columns for capabilities, industries, company and connect, with policy links and contact paths.
- Generated and added a bespoke cinematic 3D AXN hero image at `apps/web/public/images/axn-cinematic-hero.png`.
- Added a slow cinematic drift treatment and responsive overlays so hero copy remains readable.
- Rewrote homepage hero positioning and added a trust framework covering governance, security-minded delivery, quality and transparent ownership.
- Refined color palette to enterprise navy, white, slate and restrained blue/cyan accents.
- Added responsive breakpoints and reduced-motion handling.

## Trust and accuracy
- No fake customer logos, fabricated testimonials, unsupported employee counts, certifications, office locations or delivery statistics were added.
- The trust framework describes proposed delivery practices; publish formal certifications, SLAs or compliance claims only after they are verified.
- Existing concept work remains labelled as illustrative and not verified client work.
- Footer location wording is limited to India; add a registered office address only after it is confirmed.

## Video note
The current hero uses a generated cinematic 3D still with CSS motion, not a real recorded video. Add a licensed/owned MP4/WebM loop once an approved AXNOVATECH motion asset is available; do not rely on random third-party video URLs in production.

## Verification
A full Next.js build was not run in this environment because package installation did not complete within the available runtime. Run `npm install` and `npm run build` locally before deployment.
