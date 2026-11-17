# AXNOVATECH V71 — Enterprise Website Expansion

## Main changes
- Homepage now has an automatic, user-controllable image/video slider with five capability slides, captions, progress bars and previous/next controls.
- Rebuilt the main navigation as a TCS-inspired enterprise mega-menu: What we do, Products & solutions, Who we are, Insights and Our work. It is original AXNOVATECH styling and content, not copied TCS code or assets.
- Updated the brand system to deep navy, cobalt blue and mint; replaced the logo lockups and favicon with a consistent vector identity.
- Contact page is a two-step enquiry flow: visitors must choose a service first; only then are personal and project detail fields revealed.
- All 20 core service detail pages now have dedicated routes at `/services/capabilities/[slug]`, rich content, delivery phases, deliverables, FAQs, SEO metadata, Service/FAQ structured data and a full-screen cinematic video hero.
- Service family and nested service-topic pages also use full-screen video heroes.
- Added 20 business-solution detail pages at `/business-solutions/[slug]`, with tailored modules and workflows.
- Expanded industry, solutions, work-concept, career and insight directories to 20 topics each; each detail page has section-specific content, FAQs, implementation guidance and deliverables.
- Expanded the company story, purpose, mission, vision, values and founder-led leadership information.
- Added a dedicated Team page. It names the founder but does not invent staff members; specialist roles are shown as delivery disciplines until actual people, biographies and consent are confirmed.
- Added a 25-question FAQ knowledge centre and FAQ structured data.
- Added local Pixabay photo/video setup, unique image slots for service, business solution, industry, solution, work and career pages, plus an image/video credit manifest.
- Updated sitemap, page metadata, canonical URLs, Open Graph fields and navigation.

## Page inventory
- Services: 20 capability pages + 7 service-family overview pages + nested family topic pages.
- Business solutions: 20 dedicated detail pages.
- Industries: 20 dedicated pages.
- Digital solutions: 20 dedicated pages.
- Company/About: 20 catalog pages plus the 10 manually written company pages.
- Work: 20 concept/reference pages plus published entries.
- Careers: 20 role-family pages.
- Insights: 20 knowledge topic pages plus the 5 editorial articles already in the source.
- Team: 1 dedicated page.
- FAQ: 25 questions across five categories.

## Pixabay media
The repository contains the media downloader and all media slot definitions. The build environment used for this revision could not reach Pixabay's host, so the real photos/videos are downloaded on the user's machine with the supplied API key; they are not replaced with generated or invented imagery.

1. Copy `apps/web/.env.local.example` to `apps/web/.env.local`.
2. Set `PIXABAY_API_KEY` to the key you supplied. Keep `.env.local` private and out of GitHub.
3. From the repository root run:
   ```bash
   npm run media:setup
   ```
4. The script downloads local images and cinematic videos into `apps/web/public/photos` and `apps/web/public/videos`, and writes `MEDIA-CREDITS.txt`.
5. Start the website:
   ```bash
   npm run dev:web
   ```

The media script downloads 200 editorial photo slots and 11 reusable background videos. Each individual service page has its own real-photo slot and selects a relevant cinematic film by service family; business solution pages use their own photos and a dedicated business-operations film. Missing media falls back to an intentional branded visual rather than a broken image.

## Validation
- ZIP archive integrity and route/content inventory are checked during packaging.
- The full Next.js production build is not claimed as passed in this environment; run `npm ci` and `npm run build` locally before deployment.
- Before public launch, verify the production domain, contact email/phone, SMTP, API origin, legal policies, actual team profiles, active job vacancies and all case-study publication permissions.
