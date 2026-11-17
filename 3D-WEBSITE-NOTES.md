# AXNOVATECH 3D Website Upgrade

## What's included
- Redesigned 3D-inspired homepage with mouse-responsive perspective, floating glass cube, orbital rings, lighting and motion.
- Responsive mobile layout and reduced-motion accessibility handling.
- Updated sticky navigation and AXNOVATECH SVG wordmark.
- Integrated SVG brand assets under `apps/web/public/brand/`.
- Service cards, portfolio concept cards, process section and CTA panel.

## Run locally
From the project root:

```bash
cd apps/web
npm install
npm run dev
```

Open http://localhost:3000.

## Important before launch
- The portfolio cards are visual concept directions, not verified client case studies. Replace them with real projects and accurate outcomes before publishing.
- Update `metadataBase` and SEO metadata in `apps/web/src/app/layout.tsx` to the final verified production domain.
- The existing API, database, payment and mobile starter are separate foundations and still require configuration, integration tests, secure secrets, payment webhooks and production deployment before being treated as live services.
- This version uses CSS 3D transforms rather than a WebGL renderer to keep the hero lightweight and mobile-friendly.

## Visual refinement v3
- Replaced the minimal footer with a multi-column enterprise footer, contact strip, policy navigation and social links.
- Added a unique layered 3D "AXN Engine" section with rotating orbital rings, floating glass prism, depth grid and labelled capability layers.
- Homepage service cards now have full-card links to their matching service detail pages; portfolio concept cards open the work listing.
- Footer navigation includes company, capabilities and policy routes.
- External social links are generic platform destinations; replace with official AXNOVATECH profiles before launch.
