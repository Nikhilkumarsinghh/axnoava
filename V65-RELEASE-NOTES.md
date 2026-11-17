# AXNOVATECH V65 — Operations MVP

## Shipped in this package
- `/ops` internal workspace with Overview, Leads and Projects tabs.
- Admin-key-protected API routes for metrics, lead status changes, lead-to-project conversion, project status and task creation.
- Contact form submits lead data to the CRM API and sends the existing email notification in parallel.
- PostgreSQL Prisma models for company/location/inquiry type, projects, tasks and proposals.
- Initial and additive migration SQL, environment templates and setup/security documentation.
- Honeypot filtering and basic in-memory public lead rate limiting.

## Verification
- Syntax transpilation passed for the changed TypeScript/TSX files.
- Full Next.js/API build and Prisma client generation could not be run in this environment because the copied project did not contain the required workspace executables (`next`, `prisma`, `express`, `@prisma/client`). Run `npm ci`, then the documented generation/migration and build commands locally.
- No live deployment or live database migration was performed.

## Not yet shipped
- Per-user staff authentication / MFA / RBAC.
- Customer login and client portal.
- Proposal creation and approval UI, contract/e-sign, invoices and reconciliation.
- Production-grade distributed rate limiting, background retry queue and audit log.
