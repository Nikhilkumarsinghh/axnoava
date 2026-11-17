import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import { photoAny, video } from "@/lib/photos";

export function ServiceVideoHero({ title, eyebrow, description, slug, videoSlot, posterSlot, cta = "Discuss this service" }: {
  title: string; eyebrow: string; description: string; slug: string; videoSlot?: string; posterSlot?: string; cta?: string;
}) {
  const movie = video(videoSlot || `service-${slug}`) || video("delivery") || video("intro");
  const poster = photoAny(posterSlot || `service-${slug}`, `fam-${slug}`, "hero-code", "sec-services");
  return <section className="axn-service-film" aria-label={`${title} service introduction`}>
    {movie ? <video className="axn-service-film-video" src={movie} poster={poster || undefined} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" /> :
      poster ? <img className="axn-service-film-video" src={poster} alt="" fetchPriority="high" /> : <div className="axn-service-film-fallback" />}
    <div className="axn-service-film-shade" />
    <div className="axn-service-film-content container-x">
      <p className="axn-film-eyebrow"><span />{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>
      <div className="axn-film-actions"><Link href="#project-enquiry" className="axn-primary">{cta}<ArrowUpRight size={18}/></Link><span><Play size={14}/>{movie ? "CINEMATIC SERVICE OVERVIEW" : "SERVICE OVERVIEW"}</span></div>
      <div className="axn-film-bottom"><span>AXNOVATECH / ENGINEERED FOR BUSINESS</span><span>DISCOVER · DESIGN · BUILD · EVOLVE</span></div>
    </div>
  </section>;
}
