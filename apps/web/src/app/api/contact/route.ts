import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const TO = process.env.CONTACT_TO_EMAIL || "";
const FROM_NAME = (process.env.SMTP_FROM_NAME || "AXNOVATECH Website").replace(/[\"\r\n]/g, " ").slice(0, 80);
const hits = new Map<string, number[]>();
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));

export async function POST(req: Request) {
  if (!req.headers.get("content-type")?.includes("application/json")) return NextResponse.json({ error: "Content-Type must be application/json." }, { status: 415 });
  const declaredLength = Number(req.headers.get("content-length") || 0);
  if (declaredLength > 20_000) return NextResponse.json({ error: "Your message is too large. Please shorten it and try again." }, { status: 413 });
  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (raw.length > 20_000) return NextResponse.json({ error: "Your message is too large. Please shorten it and try again." }, { status: 413 });
    body = JSON.parse(raw);
  } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  if (body.website) return NextResponse.json({ ok: true }); // honeypot

  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  if (origin && host) {
    try {
      const parsed = new URL(origin);
      if (parsed.host !== host) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
    } catch { return NextResponse.json({ error: "Invalid request origin." }, { status: 403 }); }
  }
  const ip = (req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown").slice(0, 80);
  const now = Date.now();
  // Keep the in-memory guard bounded; production should also enable provider/WAF rate limits.
  if (hits.size > 5000) for (const [key, values] of hits) if (!values.some((t) => now - t < 10 * 60_000)) hits.delete(key);
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  if (recent.length >= 5) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  hits.set(ip, [...recent, now]);

  const clean = (k: string, max = 2000) => String(body[k] ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max);
  const name = clean("name", 120), email = clean("email", 160), phone = clean("phone", 40);
  const company = clean("company", 160), location = clean("location", 120), budget = clean("budget", 80);
  const service = clean("service", 120), message = clean("message", 4000);
  const allowedTypes = ["New project", "Partnership", "Careers", "Support & maintenance", "Media & other", "Client review"];
  const requestedType = clean("type", 40);
  const type = allowedTypes.includes(requestedType) ? requestedType : "Website enquiry";
  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10)
    return NextResponse.json({ error: "Please enter a valid name, email and a message of at least 10 characters." }, { status: 400 });

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !TO) {
    console.error("[contact] SMTP is not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS and CONTACT_TO_EMAIL.");
    return NextResponse.json({ error: "The enquiry email service is temporarily unavailable. Please try again later." }, { status: 503 });
  }
  try {
    const port = Number(SMTP_PORT || 465);
    const transporter = nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS }, connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000 });
    await transporter.sendMail({
      from: `"${FROM_NAME}" <${SMTP_USER}>`,
      to: TO,
      replyTo: `"${name.replace(/["\r\n]/g, " ").slice(0, 100)}" <${email}>`,
      subject: `[AXNOVATECH] ${type}: ${name.replace(/[\r\n]/g, " ").slice(0, 100)}${service ? " - " + service.replace(/[\r\n]/g, " ") : ""}`,
      text: `Type: ${type}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\nLocation: ${location}\nBudget: ${budget}\nService: ${service}\n\n${message}`,
      html: `<h2>${esc(type)}</h2><p><b>Name:</b> ${esc(name)}<br><b>Email:</b> ${esc(email)}<br><b>Phone:</b> ${esc(phone)}<br><b>Company:</b> ${esc(company)}<br><b>Location:</b> ${esc(location)}<br><b>Budget:</b> ${esc(budget)}<br><b>Service:</b> ${esc(service)}</p><p style="white-space:pre-wrap">${esc(message)}</p>`,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact] send failed", e);
    return NextResponse.json({ error: "We could not send your message. Please try again shortly." }, { status: 502 });
  }
}
