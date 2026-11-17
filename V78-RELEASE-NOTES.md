# AXNOVATECH V78 — enterprise brand rebuild

## Included
- Repaired the duplicated/corrupted About page JSX and rebuilt its content structure.
- Added five first-class divisions: AXNOVA DIGITAL, AXNOVA AI, AXNOVA CLOUD, AXNOVA ENTERPRISE and AXNOVA PRODUCTS.
- Added division navigation, home-page division cards, dedicated division detail routes and on-page project enquiry forms.
- Added local, self-hosted SVG brand artwork for the site's visual slots to eliminate broken Unsplash/Pixabay runtime dependencies.
- Added a lightweight 8-second AXNOVATECH motion film used by the existing homepage film section.
- Updated the visual system with a midnight-navy / electric-blue / cyan palette and responsive layouts.
- Added division URLs to the XML sitemap.
- Added `qualities: [75, 78]` to Next Image configuration to remove the quality warning.
- Set the enquiry recipient to `nikhilkauriya04@gmail.com`.

## Honest launch constraints
- Email delivery requires valid SMTP credentials in `apps/web/.env.local` or deployment environment variables. The project intentionally contains placeholders, not passwords.
- `CONTACT_TO_EMAIL` is the destination. `SMTP_USER` and `SMTP_PASS` must belong to a verified sending mailbox. For Gmail, use an App Password with 2-Step Verification.
- The AXNOVA PRODUCTS names shown are concepts only. No claim is made that they are live products. AXNO PAY must not process payments until all required banking, payment network and regulatory approvals are secured.
- The reviews section remains an honest empty state until real client reviews are approved. No fake Google ratings, client logos or fabricated team profiles are added.
- Replace `https://axnovatech.com` with the final verified domain if the production domain differs.
- Security headers and application-level validation are included, but no website can be guaranteed impossible to hack. Configure HTTPS, WAF/CDN rate limits, backups, monitoring and dependency updates at the hosting layer.

## Local run
From the repository root:
```bash
npm install
cp apps/web/.env.example apps/web/.env.local
# Edit SMTP values and NEXT_PUBLIC_SITE_URL
npm run dev:web
```

Open http://localhost:3000.

## Production build
```bash
npm run build -w @axnovatech/web
```

## Note on visual assets
The default website artwork is locally hosted SVG illustration, not stock photography. Add approved/licensed photographic assets or original team photos as they become available. The local media system is designed so broken third-party image URLs cannot take down page sections.
