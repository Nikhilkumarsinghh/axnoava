# AXNOVATECH V7 implementation notes

## What changed
- Reworked the homepage into a conversion-oriented agency journey: services, project concepts, delivery process, engagement stages, tangible deliverables, engagement models and FAQs.
- Removed the decorative fake avatar proof strip and replaced it with an honest delivery promise. No fabricated client logos, project metrics, awards or testimonials were added.
- Rebuilt the header dropdown behavior: pointer hover, keyboard focus, click-to-toggle, Escape-to-close and outside-click close. Dropdown links are removed from tab order while closed.
- Added high-contrast hover/focus states for navigation, service cards, industry cards, footer links and CTA buttons.
- Reworked the footer hierarchy and removed generic social-platform homepage links that could mislead visitors.
- Improved the shared service/industry/solution detail page with capability cards and business-value use cases instead of a wall of paragraphs.
- Kept the About Us page and its 3D AXN cube; page hero 3D visuals remain part of the shared visual system.
- Cookie preferences remain a functional browser-side consent UI. Optional analytics/marketing scripts are NOT loaded by this UI alone; connect scripts to the saved consent state before enabling tracking.

## Run
From the repository root:
```bash
npm install
npm run dev:web
```
Then open http://localhost:3000.

## Before public launch
- Replace placeholder contact details and confirm that the displayed email/domain is monitored.
- Add only genuine client work, testimonials, employee profiles, certifications and company statistics.
- Have privacy, cookie, terms and refund policies reviewed for the actual business.
- Integrate the enquiry form with a secure backend/CRM and test delivery.
- Configure real analytics only after consent-aware loading is implemented.
- Run `npm run build` and test desktop/mobile navigation, forms, keyboard access and reduced-motion behavior.
