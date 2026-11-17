import Image from "next/image";
/** Responsive, lazy-loaded content photo with a designed fallback. */
export function Pic({ src, alt, ratio }: { src: string | null; alt: string; ratio?: string }) {
  return src ? <Image className="m-pic" src={src} alt={alt} width={1400} height={1000}
    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 48vw"
    quality={75} loading="lazy" decoding="async"
    style={ratio ? { aspectRatio: ratio } : undefined} /> :
    <div className="m-pic m-pic-fb" role="img" aria-label={alt} style={ratio ? { aspectRatio: ratio } : undefined}><i /><i /><i /></div>;
}
