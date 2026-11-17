import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, CheckCircle2, ShieldCheck, Workflow, Compass } from "lucide-react";
import { pillars, getPillar } from "@/data/pillars";
import { ContactForm } from "@/components/contact-form";
import { photo, video } from "@/lib/photos";

export function generateStaticParams() { return pillars.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{slug:string}> }): Promise<Metadata> {
  const { slug } = await params; const p = getPillar(slug);
  if (!p) return { title: "Division not found | AXNOVATECH" };
  return { title: `${p.name} | AXNOVATECH`, description: p.summary, alternates: { canonical: `/pillars/${p.slug}` }, openGraph: { title: `${p.name} | AXNOVATECH`, description: p.summary } };
}
export default async function PillarPage({ params }: { params: Promise<{slug:string}> }) {
  const { slug } = await params; const p = getPillar(slug); if (!p) notFound();
  return <main className="axn-pillar-page">
    <section className={`axn-pillar-hero axn-pillar-${p.visual}`}><div className="container-x axn-pillar-hero-grid">
      <div><p className="axn-section-eyebrow">AXNOVATECH / BUSINESS DIVISION</p><h1>{p.name}</h1><h2>{p.strapline}</h2><p>{p.summary}</p><div className="axn-pillar-actions"><a href="#pillar-enquiry" className="axn-primary-btn">Discuss a project <ArrowUpRight size={17}/></a><Link href="/about" className="axn-secondary-btn">Explore AXNOVATECH <ArrowRight size={16}/></Link></div></div>
      <div className="axn-pillar-art" aria-hidden="true">{photo(`pillar-${p.slug}`) ? <img className="axn-pillar-art-image" src={photo(`pillar-${p.slug}`)} alt={`${p.name} technology capability`} fetchPriority="high"/> : null}{video(p.slug) ? <video className="axn-pillar-art-video" src={video(p.slug) || undefined} poster={photo(`pillar-${p.slug}`) || undefined} autoPlay muted loop playsInline preload="none"/> : null}<div className="axn-pillar-art-orbit"/><div className="axn-pillar-art-core"><span>{p.name.split(" ")[1]?.slice(0,2) || "AX"}</span><small>BUILD / CONNECT / EVOLVE</small></div><i/><b/><em/></div>
    </div></section>
    <section className="container-x axn-pillar-intro"><p className="axn-section-eyebrow">WHAT THIS DIVISION DOES</p><h2>Technology that moves <em>business forward.</em></h2><p>{p.description}</p></section>
    <section className="axn-pillar-services"><div className="container-x"><div className="axn-pillar-section-head"><div><p className="axn-section-eyebrow">CAPABILITIES</p><h2>What we can help you build.</h2></div><span>01 — 08</span></div><div className="axn-pillar-service-grid">{p.services.map((s,i)=><article key={s}><small>{String(i+1).padStart(2,"0")}</small><h3>{s}</h3><ArrowUpRight size={17}/></article>)}</div></div></section>
    <section className="container-x axn-pillar-outcomes"><div><p className="axn-section-eyebrow">THE DELIVERY FOCUS</p><h2>Designed around <em>real outcomes.</em></h2></div><div className="axn-pillar-outcome-list">{p.outcomes.map(x=><p key={x}><CheckCircle2 size={19}/>{x}</p>)}</div></section>
    {p.productNote && <section className="container-x axn-product-note"><ShieldCheck size={20}/><p>{p.productNote}</p></section>}
    <section id="pillar-enquiry" className="axn-pillar-enquiry"><div className="container-x axn-pillar-enquiry-grid"><div><p className="axn-section-eyebrow">START A CONVERSATION</p><h2>Let's discuss what <em>you need to achieve.</em></h2><p>Share a little about your business challenge. The enquiry form stays on this page so you can explain the requirement without losing context.</p><div className="axn-pillar-trust"><span><Compass size={17}/> Clear scope</span><span><Workflow size={17}/> Practical delivery</span><span><ShieldCheck size={17}/> Security considered</span></div></div><div className="axn-pillar-form"><ContactForm initialService={p.name}/></div></div></section>
    <section className="container-x axn-pillar-related"><p className="axn-section-eyebrow">EXPLORE OTHER DIVISIONS</p><div>{pillars.filter(x=>x.slug!==p.slug).map(x=><Link href={`/pillars/${x.slug}`} key={x.slug}>{x.name}<ArrowUpRight size={15}/></Link>)}</div></section>
  </main>;
}
