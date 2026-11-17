# AXNOVATECH About UI redesign

This revision replaces the previous paragraph-led About page with a corporate editorial layout:
- TCS-inspired enterprise navigation and visual hierarchy (without copying TCS branding)
- Animated CSS 3D AXN cube with three orbital rings and floating markers
- Purpose-led visual panels instead of a wall of paragraph cards
- Connected capabilities illustration
- Compact 20-topic index linking to the existing About detail routes
- Responsive layouts and reduced-motion support

Run from the repository root:

```bash
npm install
npm run dev:web
```

Then open http://localhost:3000/about.

The 3D artwork is CSS-based, so no external 3D model download or WebGL dependency is required. Replace placeholder company details and unverified claims before public launch.
