-- AXNOVATECH CRM and delivery workspace expansion.
ALTER TYPE "LeadStatus" ADD VALUE IF NOT EXISTS 'PROPOSAL';
ALTER TYPE "LeadStatus" ADD VALUE IF NOT EXISTS 'WON';
ALTER TYPE "LeadStatus" ADD VALUE IF NOT EXISTS 'LOST';
ALTER TYPE "ProjectStatus" ADD VALUE IF NOT EXISTS 'ON_HOLD';

ALTER TABLE "Lead"
  ADD COLUMN IF NOT EXISTS "company" TEXT,
  ADD COLUMN IF NOT EXISTS "location" TEXT,
  ADD COLUMN IF NOT EXISTS "inquiryType" TEXT;

ALTER TABLE "Project"
  ADD COLUMN IF NOT EXISTS "budgetPaise" INTEGER,
  ADD COLUMN IF NOT EXISTS "dueDate" TIMESTAMP(3),
  ADD COLUMN IF NOT EXISTS "leadId" TEXT;

CREATE TABLE IF NOT EXISTS "ProjectTask" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "status" TEXT NOT NULL DEFAULT 'TODO',
  "dueDate" TIMESTAMP(3),
  "projectId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ProjectTask_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Proposal" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "scope" TEXT NOT NULL,
  "amountPaise" INTEGER NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'INR',
  "status" TEXT NOT NULL DEFAULT 'DRAFT',
  "validUntil" TIMESTAMP(3),
  "projectId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id")
);

DO $$ BEGIN
  ALTER TABLE "Project" ADD CONSTRAINT "Project_leadId_fkey"
    FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  ALTER TABLE "ProjectTask" ADD CONSTRAINT "ProjectTask_projectId_fkey"
    FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_projectId_fkey"
    FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE INDEX IF NOT EXISTS "Lead_status_createdAt_idx" ON "Lead"("status", "createdAt");
CREATE INDEX IF NOT EXISTS "Project_status_createdAt_idx" ON "Project"("status", "createdAt");
CREATE INDEX IF NOT EXISTS "Project_leadId_idx" ON "Project"("leadId");
CREATE INDEX IF NOT EXISTS "ProjectTask_projectId_status_idx" ON "ProjectTask"("projectId", "status");
