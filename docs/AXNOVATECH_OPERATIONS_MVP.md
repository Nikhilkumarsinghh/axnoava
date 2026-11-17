# AXNOVATECH Operations Workspace (MVP)

## Included
- Private `/ops` workspace (noindex) with overview, lead CRM and project register.
- Website contact submissions are sent to the email handler and separately saved to the API lead store when the API is available.
- Lead status workflow: NEW → CONTACTED → QUALIFIED → PROPOSAL → WON / LOST.
- Convert a lead into a project; update project status; add delivery tasks.
- Prisma models for project tasks and proposals, ready for the next proposal workflow phase.
- Admin API protected by a server-side `ADMIN_API_KEY` (minimum 32 characters; use 64 hex characters).

## Local setup
1. Copy root `.env.example` to `.env` and set `DATABASE_URL`, `API_PORT`, `WEB_ORIGIN`, `ADMIN_API_KEY`, and payment keys only if payments are enabled.
2. Copy `apps/web/.env.example` to `apps/web/.env.local`; set `NEXT_PUBLIC_API_URL=http://localhost:4000` and your real `NEXT_PUBLIC_SITE_URL`.
3. Configure PostgreSQL and run from repository root:
   ```bash
   npm install
   npm run db:generate
   npm run db:migrate
   ```
   The included migrations are for a fresh database. If your current production database already contains the old Prisma tables but has no `_prisma_migrations` history, do not run this initial migration directly; first baseline the existing schema with a database backup and a reviewed Prisma baseline procedure.
4. Start API and web in separate terminals:
   ```bash
   npm run dev:api
   npm run dev:web
   ```
5. Open `http://localhost:3000/ops`; paste the `ADMIN_API_KEY` value.

## Production requirements before public launch
- Put the API behind HTTPS and restrict CORS to the exact production website origin.
- Store `ADMIN_API_KEY` only as a server environment secret; never commit `.env` files.
- This shared-key workspace is an internal MVP, not a replacement for per-user accounts, role-based access control, MFA, audit logs or session revocation. Build those before adding multiple staff members or customer-facing access.
- Configure database backups, monitoring, rate limiting/WAF, retention/deletion policy and restore testing.
- Add an email notification/CRM reconciliation queue so temporary API outages do not lose lead records.
- Implement proposal creation, client approval, e-signature, invoices, verified payment webhooks, client portal permissions and automated delivery notifications before calling the whole business lifecycle automated.

## API routes
- `POST /api/leads`
- `GET /api/admin/overview`
- `GET /api/admin/leads`
- `PATCH /api/admin/leads/:id`
- `POST /api/admin/leads/:id/projects`
- `GET /api/admin/projects`
- `PATCH /api/admin/projects/:id`
- `POST /api/admin/projects/:id/tasks`

All `/api/admin/*` endpoints require `Authorization: Bearer <ADMIN_API_KEY>`.
