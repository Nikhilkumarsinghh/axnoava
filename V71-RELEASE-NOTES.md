# AXNOVATECH V71 — Enterprise Website Upgrade

- Five-slide homepage image/video carousel with controls and auto-advance.
- TCS-inspired mega navigation, restructured into What we do, Products & solutions, Who we are, Insights and Our work.
- New AXNOVATECH navy/cobalt/mint visual identity, logo lockups and favicon.
- Contact form now starts with service selection; personal and project fields appear only after Continue.
- 20 dedicated technology service pages with service-family full-screen cinematic video heroes, 4 tailored feature modules, delivery process, deliverables, FAQs and SEO schema.
- 20 business solution pages with tailored modules and a shared business-operations film, plus unique photo slots.
- 20 pages each for industries, digital solutions, company/about topics, portfolio concepts, careers role families and insight topics.
- Company story, vision, mission, values, founder profile, team disciplines and 25 FAQs.
- 200 Pixabay photo slots and 11 video slots configured in the local media setup script.
- Sitemap, canonical URLs, Open Graph metadata, FAQ schema and service schema updated.

## Verification
- `node --check apps/web/scripts/media-setup.mjs` passed.
- TypeScript/TSX syntax transpilation passed for 65 source files with zero syntax diagnostics.
- Full Next.js production build was not run because dependencies are not installed in this environment and network access to the package registry is unavailable.
- Pixabay media downloads must be run locally after setting the API key in `apps/web/.env.local`. The API key is deliberately not included in the ZIP or source control.
