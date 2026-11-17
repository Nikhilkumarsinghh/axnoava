import { NextResponse } from "next/server";
import { site } from "@/data/site-config";
import { families } from "@/data/services-data";
export const runtime = "nodejs";
const hits = new Map<string, number[]>();
const services = site.pricing.map((p) => p.name).join(", ");
const SYSTEM = `You are the AXNOVATECH website assistant. AXNOVATECH is structured around five divisions: AXNOVA DIGITAL (websites, applications and software engineering), AXNOVA AI (AI assistants and automation), AXNOVA CLOUD (cloud, DevOps and cybersecurity), AXNOVA ENTERPRISE (enterprise platforms, integrations and technology partnerships), and AXNOVA PRODUCTS (in-house SaaS product development). The company is being developed and serves businesses across India subject to confirmed delivery capacity. Divisions and services: ${families.map((f) => f.name).join(", ")}. Services include ${services}. Pricing is confirmed in a written proposal after discovery; do not invent prices or delivery timelines. Process: Discover, Plan and quote, Design, Build against agreed milestones, Test and secure, Launch and support. Project tracking and review cadence are agreed for each engagement. Source-code and intellectual-property terms are documented in the agreement; NDA can be discussed on request. Rules: never invent clients, awards, numbers, certifications or promises. If unsure, say so and point to /contact. Answer in the user's language, in under 90 words, friendly and clear. Encourage sharing project details via /contact for a written quote.`;
function local(q: string) {
  const s = q.toLowerCase();
  if (/price|cost|pricing|charge|budget|rate/.test(s)) return "We prepare a written quote after understanding the requirements, integrations, timeline and delivery model. See /pricing or share your needs at /contact.";
  if (/shop|kirana|retail|store|salon|restaurant|pharmacy|inventory|pos/.test(s)) return "We can scope business websites, ecommerce, POS, billing, inventory, booking and customer-management solutions around your workflow. Explore /business-solutions and share your requirements at /contact.";
  if (/partner|white.?label|subcontract|agency|outsourc/.test(s)) return "We are open to discussing white-label development, subcontracting and project-based engineering partnerships, subject to scope and capacity. See /technology-partners.";
  if (/crm|erp|portal|automation|workflow/.test(s)) return "We can scope CRM, ERP, client portals, billing, helpdesk and workflow automation, and integrate them with existing tools. See /services/enterprise-software.";
  if (/process|how do you work|steps|timeline/.test(s)) return "Our process covers discovery, planning and proposal, design, development, testing, deployment and support. Review cadence and milestones are agreed for each project. Details at /process.";
  if (/where|location|address|office|map/.test(s)) return "We coordinate meetings by appointment. Share your location and preferred meeting format at /contact.";
  if (/career|job|hiring|intern/.test(s)) return "Please see /careers or choose Careers on /contact and share your profile.";
  if (/ai|chatbot|machine/.test(s)) return "AXNOVA AI covers AI chatbots, document processing, knowledge assistants and workflow automation. See /pillars/axnova-ai.";
  if (/contact|call|email|talk|human|quote|discuss/.test(s)) return "Use the Discuss a project button on any page or visit /contact. Share your requirement so the team can review fit and propose next steps.";
  return "I can help with services, local business software, enterprise projects, partnerships and our delivery process. For a scoped proposal, share your requirements at /contact.";
}
export async function POST(req: Request) {
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ reply: "Please send a valid message." }, { status: 415, headers: { "Cache-Control": "no-store" } });
  }
  const declaredLength = Number(req.headers.get("content-length") || 0);
  if (declaredLength > 12_000) return NextResponse.json({ reply: "That message is too large. Please shorten it." }, { status: 413 });
  let b: { messages?: { role: string; content: string }[] };
  try {
    const raw = await req.text();
    if (raw.length > 12_000) return NextResponse.json({ reply: "That message is too large. Please shorten it." }, { status: 413 });
    b = JSON.parse(raw);
  } catch { return NextResponse.json({ reply: "Sorry, I could not read that." }, { status: 400 }); }
  if (!b || typeof b !== "object" || !Array.isArray(b.messages)) return NextResponse.json({ reply: "Please send a valid message." }, { status: 400 });

  const ip = (req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown").slice(0, 80), now = Date.now();
  if (hits.size > 5000) for (const [key, times] of hits) if (!times.some((t) => now - t < 10 * 60_000)) hits.delete(key);
  const recent = (hits.get(ip) || []).filter((t) => now - t < 600_000);
  if (recent.length >= 30) return NextResponse.json({ reply: "Please slow down a little and try again shortly." }, { status: 429 });
  hits.set(ip, [...recent, now]);

  const msgs = b.messages.slice(-8).filter((m) => m && typeof m.content === "string").map((m) => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: m.content.slice(0, 800),
  }));
  while (msgs.length && msgs[0].role !== "user") msgs.shift();
  const last = msgs[msgs.length - 1]?.content || "";
  if (!last) return NextResponse.json({ reply: local("") }, { headers: { "Cache-Control": "no-store" } });
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return NextResponse.json({ reply: local(last) }, { headers: { "Cache-Control": "no-store" } });
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST", signal: AbortSignal.timeout(12000),
      headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL || "claude-3-5-haiku-latest", max_tokens: 400, system: SYSTEM, messages: msgs }),
    });
    if (!r.ok) throw new Error(String(r.status));
    const d = await r.json();
    return NextResponse.json({ reply: d.content?.[0]?.text || local(last) }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ reply: local(last) }, { headers: { "Cache-Control": "no-store" } });
  }
}
