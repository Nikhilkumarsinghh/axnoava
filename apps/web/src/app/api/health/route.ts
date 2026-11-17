import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
const publicCandidates = [path.join(process.cwd(), "public"), path.join(process.cwd(), "apps", "web", "public")];
const publicRoot = publicCandidates.find((dir) => fs.existsSync(path.join(dir, "videos", "axnovatech-brand-film.mp4"))) || publicCandidates[0];
const required = [
  "videos/axnovatech-brand-film.mp4",
  "images/axn-cinematic-hero.webp",
  "images/pillars/digital.svg",
  "images/pillars/ai.svg",
  "images/pillars/cloud.svg",
  "images/pillars/enterprise.svg",
  "images/pillars/products.svg",
];
export async function GET() {
  const missing = required.filter((asset) => !fs.existsSync(path.join(publicRoot, asset)));
  return NextResponse.json({ status: missing.length ? "degraded" : "ok", service: "AXNOVATECH web", media: { required: required.length, available: required.length - missing.length, missing } }, { status: missing.length ? 503 : 200, headers: { "Cache-Control": "no-store" } });
}
