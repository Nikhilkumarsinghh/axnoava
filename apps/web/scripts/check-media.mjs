import fs from "node:fs";
import path from "node:path";

const publicRoot = path.resolve(process.cwd(), "public");
const photoDir = path.join(publicRoot, "photos");
const videoDir = path.join(publicRoot, "videos");
const requiredPhotos = [
  "hero-team", "home-film-poster",
  "home-slide-digital", "home-slide-ai", "home-slide-cloud", "home-slide-enterprise", "home-slide-products",
  "home-pillar-digital", "home-pillar-ai", "home-pillar-cloud", "home-pillar-enterprise", "home-pillar-products",
  "pillar-axnova-digital", "pillar-axnova-ai", "pillar-axnova-cloud", "pillar-axnova-enterprise", "pillar-axnova-products",
  "fam-web-development", "fam-mobile-app-development", "fam-ai-machine-learning",
  "fam-cloud-computing", "fam-cybersecurity", "fam-ui-ux-design",
  "ind-banking-financial-services", "ind-healthcare", "ind-retail-e-commerce",
  "ind-education-edtech", "ind-manufacturing", "ind-logistics-supply-chain",
  "ind-real-estate", "ind-government-public-sector",
  "work-uniquetoo-platform", "work-axnovatech-platform",
  "home-local-business", "home-automation"
];
const requiredVideos = ["intro", "delivery"];
let failed = false;
function findPhoto(slot) {
  for (const ext of ["jpg", "jpeg", "webp", "png"]) {
    const f = path.join(photoDir, `${slot}.${ext}`);
    if (fs.existsSync(f) && fs.statSync(f).size > 1000) return f;
  }
  return null;
}
let manifest = {};
try { manifest = JSON.parse(fs.readFileSync(path.join(photoDir, "manifest.json"), "utf8")); }
catch { console.error("FAIL photos/manifest.json is missing or invalid"); failed = true; }

for (const slot of requiredPhotos) {
  const file = findPhoto(slot);
  console.log(`${file ? "PASS" : "FAIL"} photo ${slot}${file ? " -> " + path.basename(file) : ""}`);
  failed ||= !file;
}
for (const slot of requiredVideos) {
  const file = path.join(videoDir, `${slot}.mp4`);
  const ok = fs.existsSync(file) && fs.statSync(file).size > 100000;
  console.log(`${ok ? "PASS" : "FAIL"} video ${slot}.mp4`);
  failed ||= !ok;
}
const seen = new Map();
for (const slot of requiredPhotos) {
  const meta = manifest[slot];
  if (!meta?.id) {
    console.error(`FAIL missing Pixabay source metadata for ${slot}`);
    failed = true;
    continue;
  }
  const id = String(meta.id);
  if (seen.has(id)) {
    console.error(`FAIL duplicate Pixabay photo ID ${id}: ${seen.get(id)} and ${slot}`);
    failed = true;
  } else seen.set(id, slot);
}
if (failed) process.exit(1);
console.log(`PASS ${requiredPhotos.length} required photos, ${requiredVideos.length} videos, ${seen.size} unique Pixabay photo IDs.`);
