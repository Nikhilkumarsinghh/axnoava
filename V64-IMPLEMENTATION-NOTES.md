# AXNOVATECH V64 implementation notes

## Business positioning and information architecture
- Added a clear three-part homepage positioning: local business technology, enterprise delivery and automation/software solutions.
- Added dedicated `/business-solutions`, `/enterprise-solutions` and `/technology-partners` landing pages.
- Added service-family overview routes for all seven service families, so navigation and service catalogue links resolve to real pages.
- Expanded local business segments to include retail, food/hospitality, appointment-led services, education, wholesale/distribution and clinics.
- Added the new pages to navigation, footer and sitemap.

## Trust, conversion and content accuracy
- Replaced unsupported team-size/seniority, office-location and response-time claims with verifiable, scope-based language.
- Removed development-only sample testimonials from the homepage; real reviews remain configuration-driven.
- Replaced unapproved numerical rate-card amounts with custom-quote messaging throughout pricing and service pages.
- Distinguished UniqueToo public work from the AXNOVATECH in-house website under development.
- Added company, location and budget fields to the enquiry form and included them in the SMTP enquiry email.
- Added request-size checks, content-type validation, field sanitization and enquiry-type allowlisting to the contact endpoint.

## Search and technical foundations
- Added unique metadata to catalogue detail pages and metadata to Solutions and Careers landing pages.
- Added Organization and WebSite JSON-LD without an unverified street address or fabricated social profiles.
- Updated robots and sitemap generation to use the configured production URL and include new routes and service-family pages.
- Marked draft legal pages as noindex until they are reviewed and finalized.
- Clarified cookie consent copy; optional analytics and advertising tags are not active in this build.

## Documentation
- Added `docs/AXNOVATECH_LAUNCH_RUNBOOK.md` with local run, hosting, SMTP, domain and pre-launch requirements.
- Updated README and production checklist.

## Verification status
- 52 TypeScript/TSX source files parsed using the globally available TypeScript transpiler with no syntax diagnostics.
- Local import path audit passed.
- JSON files parse and CSS brace counts are balanced.
- A full Next.js production build could not be run in this environment: `npm ci` timed out and the `next` executable is not installed. Run `npm ci` then `npm run build` locally before deployment.
