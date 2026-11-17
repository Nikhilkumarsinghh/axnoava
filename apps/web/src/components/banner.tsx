import { photo } from "@/lib/photos";
/** Photo behind an inner-page hero. Renders nothing when the photo has not been downloaded yet. */
export function Banner({ slot, fallback }: { slot: string; fallback?: string }) {
  const src = photo(slot) || (fallback ? photo(fallback) : null);
  if (!src) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <><img className="m-banner" src={src} alt="" fetchPriority="high" decoding="async" /><span className="m-banner-shade" aria-hidden="true" /></>;
}
