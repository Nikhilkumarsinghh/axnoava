# V11 - working end-to-end update
- /api/contact: real email delivery to nikhilkauriya04@gmail.com via SMTP (nodemailer). Set SMTP_* in apps/web/.env.local (see apps/web/.env.example), also on Netlify/Vercel env settings.
- Contact form rewired (no separate API server needed). Honeypot + rate limit built in.
- Hero: dependency-free canvas 3D globe (pauses off-screen, reduced-motion safe).
- Scroll reveal animations + smooth page fade transition.
- SEO: JSON-LD Organization, canonical, OG/Twitter, robots.txt fixed to real domain, sitemap (161 pages).
- Footer links to uniquetoo.in. Production build verified: 161 pages OK.
Run: npm install && npm run dev:web   (cd AXNOVATECH first)

- V11: real WebGL hero (three.js, metal knot + glass rings + particles), ink+amber palette, plain-spoken hero copy.

- V12: MNC-style homepage (capabilities list, why us, industries, engagement models, stack, leadership + enquiry). Edit apps/web/src/data/site-config.ts with verified facts (clients, case studies, founder photo, phone, address); empty sections hide automatically.

- V13: new header/footer, /pricing, /process, /review, reviews section (config-driven, no fake reviews), UniqueToo as real case study, blue reduced to graphite+amber. CONFIRM prices in site-config.ts.

- V14: black/white/yellow palette, TCS-style full-width mega menu, new logo+favicon, About (10 PLACEHOLDER team members + office map), Contact with map, pricing explorer (service tabs -> Starter/Business/Enterprise), team strip on home. Sample reviews show only in dev.

- V15: cream/white/yellow palette (no black), Pricing/Process removed from nav (footer+home only), distinct Industries / Our work / Insights pages with 5 real articles.
