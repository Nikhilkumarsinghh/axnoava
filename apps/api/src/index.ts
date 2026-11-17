import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { z } from "zod";
import Razorpay from "razorpay";
import crypto from "crypto";
import { prisma } from "./db";

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.WEB_ORIGIN || "http://localhost:3000" }));
app.use(express.json({ limit: "30kb" }));
app.get("/health", (_q, r) => r.json({ ok: true, service: "AXNOVATECH API" }));

const leadSchema = z.object({
  name: z.string().min(2).max(100), email: z.string().email(),
  company: z.string().max(160).optional().or(z.literal("")),
  location: z.string().max(120).optional().or(z.literal("")),
  inquiryType: z.string().max(60).optional(),
  phone: z.string().max(30).optional().or(z.literal("")),
  service: z.string().max(100).optional(), budget: z.string().max(100).optional(),
  message: z.string().min(10).max(5000),
  website: z.string().max(200).optional()
});
const leadHits = new Map<string, number[]>();
app.post("/api/leads", async (q, r) => {
  const p = leadSchema.safeParse(q.body);
  if (!p.success) return r.status(400).json({ error: "Please check submitted details." });
  if (p.data.website) return r.status(201).json({ ok: true, filtered: true });
  const now = Date.now();
  const recent = (leadHits.get(q.ip) || []).filter((time) => now - time < 10 * 60_000);
  if (recent.length >= 5) return r.status(429).json({ error: "Too many enquiries. Please try again later." });
  leadHits.set(q.ip, [...recent, now]);
  const { website: _website, ...leadData } = p.data;
  try { const lead = await prisma.lead.create({ data: leadData }); return r.status(201).json({ ok: true, id: lead.id }); }
  catch (e) { console.error(e); return r.status(500).json({ error: "Unable to save inquiry." }); }
});

// Private internal API. ADMIN_API_KEY must be a random secret of at least 32 characters.
const safeEqual = (a: string, b: string) => { const aa = Buffer.from(a), bb = Buffer.from(b); return aa.length === bb.length && crypto.timingSafeEqual(aa, bb); };
const requireAdmin: express.RequestHandler = (req, res, next) => {
  const key = process.env.ADMIN_API_KEY || "";
  const supplied = req.header("authorization")?.replace(/^Bearer\s+/i, "") || "";
  if (key.length < 32 || !safeEqual(supplied, key)) { res.status(401).json({ error: "Admin authentication required." }); return; }
  next();
};
app.get("/api/admin/overview", requireAdmin, async (_q, r) => {
  try {
    const [leads, projects, openLeads, activeProjects, wonLeads] = await Promise.all([
      prisma.lead.count(), prisma.project.count(),
      prisma.lead.count({ where: { status: { in: ["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL"] } } }),
      prisma.project.count({ where: { status: { in: ["IN_PROGRESS", "REVIEW"] } } }),
      prisma.lead.count({ where: { status: "WON" } })
    ]);
    r.json({ leads, projects, openLeads, activeProjects, wonLeads });
  } catch (e) { console.error(e); r.status(500).json({ error: "Could not load overview." }); }
});
app.get("/api/admin/leads", requireAdmin, async (_q, r) => {
  try { r.json(await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 100 })); }
  catch (e) { console.error(e); r.status(500).json({ error: "Could not load leads." }); }
});
app.patch("/api/admin/leads/:id", requireAdmin, async (q, r) => {
  const p = z.object({ status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "WON", "LOST"]) }).safeParse(q.body);
  if (!p.success) return r.status(400).json({ error: "Invalid lead status." });
  try { r.json(await prisma.lead.update({ where: { id: String(q.params.id) }, data: { status: p.data.status } })); }
  catch (e) { console.error(e); r.status(404).json({ error: "Lead not found." }); }
});
app.post("/api/admin/leads/:id/projects", requireAdmin, async (q, r) => {
  const p = z.object({ title: z.string().min(3).max(160), description: z.string().max(5000).optional() }).safeParse(q.body);
  if (!p.success) return r.status(400).json({ error: "Enter a valid project title." });
  try {
    const project = await prisma.project.create({ data: { ...p.data, leadId: String(q.params.id), status: "PROPOSAL" } });
    await prisma.lead.update({ where: { id: String(q.params.id) }, data: { status: "PROPOSAL" } });
    r.status(201).json(project);
  } catch (e) { console.error(e); r.status(500).json({ error: "Could not create project." }); }
});
app.get("/api/admin/projects", requireAdmin, async (_q, r) => {
  try { r.json(await prisma.project.findMany({ include: { lead: true, tasks: true, proposals: true }, orderBy: { updatedAt: "desc" }, take: 100 })); }
  catch (e) { console.error(e); r.status(500).json({ error: "Could not load projects." }); }
});
app.patch("/api/admin/projects/:id", requireAdmin, async (q, r) => {
  const p = z.object({ status: z.enum(["INQUIRY", "PROPOSAL", "IN_PROGRESS", "REVIEW", "COMPLETED", "ON_HOLD", "CANCELLED"]) }).safeParse(q.body);
  if (!p.success) return r.status(400).json({ error: "Invalid project status." });
  try { r.json(await prisma.project.update({ where: { id: String(q.params.id) }, data: { status: p.data.status } })); }
  catch (e) { console.error(e); r.status(404).json({ error: "Project not found." }); }
});
app.post("/api/admin/projects/:id/tasks", requireAdmin, async (q, r) => {
  const p = z.object({ title: z.string().min(2).max(160), description: z.string().max(2000).optional() }).safeParse(q.body);
  if (!p.success) return r.status(400).json({ error: "Invalid task." });
  try { r.status(201).json(await prisma.projectTask.create({ data: { ...p.data, projectId: String(q.params.id) } })); }
  catch (e) { console.error(e); r.status(500).json({ error: "Could not create task." }); }
});

const orderSchema = z.object({ amountPaise: z.number().int().min(100).max(50000000) });
app.post("/api/payments/order", async (q, r) => {
  const p = orderSchema.safeParse(q.body);
  if (!p.success) return r.status(400).json({ error: "Invalid amount." });
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) return r.status(503).json({ error: "Payment gateway is not configured." });
  try {
    const rz = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
    const order = await rz.orders.create({ amount: p.data.amountPaise, currency: "INR", receipt: "axn_" + Date.now() });
    await prisma.payment.create({ data: { providerOrderId: order.id, amount: p.data.amountPaise, receipt: order.receipt } });
    return r.status(201).json({ orderId: order.id, amount: order.amount, currency: order.currency, keyId: process.env.RAZORPAY_KEY_ID });
  } catch (e) { console.error(e); return r.status(500).json({ error: "Could not create order." }); }
});
app.post("/api/payments/verify", async (q, r) => {
  const p = z.object({ razorpay_order_id: z.string(), razorpay_payment_id: z.string(), razorpay_signature: z.string() }).safeParse(q.body);
  if (!p.success) return r.status(400).json({ error: "Invalid verification payload." });
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return r.status(503).json({ error: "Gateway not configured." });
  const expected = crypto.createHmac("sha256", secret).update(p.data.razorpay_order_id + "|" + p.data.razorpay_payment_id).digest("hex");
  const a = Buffer.from(expected), b = Buffer.from(p.data.razorpay_signature);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return r.status(400).json({ error: "Signature verification failed." });
  try { await prisma.payment.update({ where: { providerOrderId: p.data.razorpay_order_id }, data: { providerPaymentId: p.data.razorpay_payment_id, status: "CAPTURED" } }); return r.json({ ok: true }); }
  catch (e) { console.error(e); return r.status(500).json({ error: "Could not update payment." }); }
});
app.listen(Number(process.env.API_PORT || 4000), () => console.log("AXNOVATECH API listening"));
