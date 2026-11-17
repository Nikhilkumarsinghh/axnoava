# AXNOVATECH V8 — image and content notes

## Visual changes
- Added photo-led homepage storytelling (collaboration, software engineering, delivery).
- Added photo-led About Us sections.
- Added image banners and photographic topic cards across Services, Industries, Solutions, Work, Insights and Careers.
- Added contextual imagery to every shared detail page.
- Added hover zoom, dark photo overlays, editorial captions and responsive image crops.
- Fixed the pale-blue service-card hover state so headings, descriptions, tags and icons remain readable.
- Retained the AXN 3D cube/orbital identity and the enterprise blue/white/navy palette.

## Photography
Images are remotely loaded from Unsplash image CDN URLs. The site therefore needs an internet connection to display them. These are illustrative stock images, not photos of AXNOVATECH staff, offices, customers or completed projects. Replace with owned/licensed company photography before presenting them as actual company evidence. Review the current Unsplash license and any image-specific rights before production use:
https://unsplash.com/license

## Portfolio integrity
The three homepage portfolio tiles remain clearly marked as project concepts. No client names, project results, testimonials, staff biographies or company performance metrics have been invented. Add real case studies only when AXNOVATECH has permission to publish them.

## Run locally
From the repository root:
```bash
npm install
npm run dev:web
```
Open http://localhost:3000.

## Production checklist
- Verify all remote photography loads from the production domain.
- Replace stock images with genuine team, office, product and project photography where available.
- Connect contact and career forms to a secure API/CRM, validate server-side, and test email delivery.
- Integrate analytics and advertising scripts with the cookie-consent state before enabling optional tracking.
- Review legal policies for the actual registered business and operating model.
- Run `npm run build`, then test navigation, forms, mobile layout, keyboard accessibility and reduced-motion mode.
