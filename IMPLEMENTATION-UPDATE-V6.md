# AXNOVATECH UI/UX + functional update V6

This update is based on the supplied V5 project source.

## Implemented
- First-visit cookie consent dialog with Accept all, Reject optional and Customize controls.
- Cookie preferences stored in browser localStorage (essential is always on; optional analytics and marketing choices are stored separately).
- Cookie settings can be reopened from the footer and from the Cookie Policy page.
- Cookie Policy remains an explanatory policy page; it is no longer being used as a substitute for a consent popup.
- Reusable enterprise split hero with animated CSS 3D AXN object for contact and policy pages.
- Added a 3D AXN motif to the Services, Industries, Solutions, Work, Insights and Careers landing pages.
- Existing homepage and About page retain their dedicated 3D visual systems.
- Footer styling upgraded to a deep navy enterprise footer with clearer link hierarchy and cookie controls.
- Mobile navigation exposes dropdown links when the menu is open.
- Added /who-we-are route redirecting to /about.
- Reduced-motion handling for newly added decorative animations.

## Run
From the project root:

```bash
npm install
npm run dev:web
```

Open http://localhost:3000.

## Important before production
- The consent manager stores preferences but does not activate any analytics or advertising scripts. Only add such scripts after implementing consent-aware loading and updating the policy to match actual vendors.
- Legal pages are drafts and need review against actual business operations and applicable law.
- Replace generic social profile links and sample contact information with verified official company details.
- npm install timed out in the build environment, so a production build could not be verified here.
