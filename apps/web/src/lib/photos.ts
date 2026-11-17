import fs from "node:fs";
import path from "node:path";

const candidates = [
  path.join(process.cwd(), "public"),
  path.join(process.cwd(), "apps", "web", "public"),
  path.join(process.cwd(), "..", "..", "public"),
];
const publicRoot =
  candidates.find((dir) => fs.existsSync(path.join(dir, "videos", "axnovatech-brand-film.mp4"))) ||
  candidates.find((dir) => fs.existsSync(path.join(dir, "photos"))) ||
  candidates[0];
const publicFile = (...parts: string[]) => path.join(publicRoot, ...parts);
const safeSlot = (slot: string) =>
  slot.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function existingPhoto(stem: string): string | null {
  for (const ext of ["jpg", "jpeg", "webp", "png"]) {
    const file = `${stem}.${ext}`;
    if (fs.existsSync(publicFile("photos", file))) return file;
  }
  return null;
}
function chooseForSlot(key: string): string | null {
  // Only return the exact content slot. Never substitute another section's photo:
  // that is what caused the same few images to appear across the site.
  return existingPhoto(key);
}
function localPhoto(slot: string): string {
  const file = chooseForSlot(safeSlot(slot));
  return file ? `/photos/${file}` : "";
}

/** Exact, self-hosted Pixabay assets. Empty string means the slot still needs downloading. */
export const rasterPhoto = (slot: string): string => localPhoto(slot);
export const photo = (slot: string) => localPhoto(slot);
export const photoAny = (...slots: string[]) => {
  for (const slot of slots) {
    const file = chooseForSlot(safeSlot(slot));
    if (file) return `/photos/${file}`;
  }
  return "";
};

/** Self-hosted Pixabay video, downloaded by media:setup. */
export const video = (slot: string) => {
  const file = path.join("videos", `${safeSlot(slot)}.mp4`);
  return fs.existsSync(publicFile(file)) ? `/${file}` : null;
};

type Meta = { user: string; page: string };
let cache: Record<string, Meta> | null = null;
export function credit(slot: string): Meta | null {
  if (!cache) {
    try { cache = JSON.parse(fs.readFileSync(publicFile("photos", "manifest.json"), "utf8")); }
    catch { cache = {}; }
  }
  return cache?.[slot] ?? null;
}
