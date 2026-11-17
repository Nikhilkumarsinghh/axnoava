import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const web = path.join(root, "apps", "web");
const requiredPages = ["/", "/pillars/axnova-digital", "/pillars/axnova-ai", "/pillars/axnova-cloud", "/pillars/axnova-enterprise", "/pillars/axnova-products", "/contact"];
const slugs = ["axnova-digital", "axnova-ai", "axnova-cloud", "axnova-enterprise", "axnova-products"];
const requiredAssets = ["public/images/axn-cinematic-hero.webp", "public/videos/axnovatech-brand-film.mp4", "public/favicon.svg", ...["digital", "ai", "cloud", "enterprise", "products"].map((x) => `public/images/pillars/${x}.svg`)];
const failures = [];
for (const route of requiredPages) {
  const file = route === "/" ? "src/app/page.tsx" : route === "/contact" ? "src/app/contact/page.tsx" : "src/app/pillars/[slug]/page.tsx";
  if (!fs.existsSync(path.join(web, file))) failures.push(`Missing page source for ${route}: ${file}`);
}
for (const asset of requiredAssets) if (!fs.existsSync(path.join(web, asset))) failures.push(`Missing asset: ${asset}`);
const pillarSource = fs.readFileSync(path.join(web, "src/data/pillars.ts"), "utf8");
for (const slug of slugs) if (!pillarSource.includes(`slug:"${slug}"`)) failures.push(`Missing pillar data: ${slug}`);
const contactSource = fs.readFileSync(path.join(web, "src/app/api/contact/route.ts"), "utf8");
for (const key of ["CONTACT_TO_EMAIL", "SMTP_HOST", "SMTP_USER", "SMTP_PASS", "sendMail"]) if (!contactSource.includes(key)) failures.push(`Contact email route missing ${key}`);
const video = fs.readFileSync(path.join(web, "public/videos/axnovatech-brand-film.mp4"));
if (video.length < 100_000 || video.toString("ascii", 4, 8) !== "ftyp") failures.push("Brand film MP4 is missing, too small or invalid.");
if (failures.length) { console.error("AXNOVATECH source QA failed:"); for (const f of failures) console.error(`- ${f}`); process.exit(1); }
console.log("AXNOVATECH source QA passed.");
console.log(`- ${requiredPages.length} route sources checked (dynamic division routes are generated from data).`);
console.log(`- ${requiredAssets.length} core media/brand assets present.`);
console.log(`- ${slugs.length} business divisions present.`);
console.log("- SMTP email delivery route and required configuration hooks present.");
console.log("- Local MP4 brand film container validated.");
