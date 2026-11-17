import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { catalog } from "@/data/catalog";
import { photoAny } from "@/lib/photos";
import { getDetailContent } from "@/data/expanded-content";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";

const allowed=Object.keys(catalog).filter(section=>!["services","businessSolutions","about","insights"].includes(section));
const getEntry=(section:string,slug:string)=>catalog[section]?.find(item=>item.slug===slug);
export async function generateMetadata({params}:{params:Promise<{section:string;slug:string}>}):Promise<Metadata>{
 const {section,slug}=await params;const entry=getEntry(section,slug);if(!entry)return{};
 const label=section==="industries"?"Industry":section==="solutions"?"Solution":section==="work"?"Work":section==="careers"?"Career":section;
 return{title:`${entry.title} | AXNOVATECH ${label}`,description:`${entry.description} Explore the approach, capabilities, implementation stages and next steps.`,alternates:{canonical:`/${section}/${slug}`},openGraph:{title:`${entry.title} | AXNOVATECH`,description:entry.description,type:"website"}};
}
export function generateStaticParams(){return allowed.flatMap(section=>catalog[section].map(item=>({section,slug:item.slug})));}
export default async function DetailPage({params}:{params:Promise<{section:string;slug:string}>}){
 const {section,slug}=await params;const entry=getEntry(section,slug);if(!entry)notFound();
 const data=getDetailContent(section,entry);
 const label=section.charAt(0).toUpperCase()+section.slice(1);
 const image=photoAny(`${section==="industries"?"ind":section==="solutions"?"sol":section==="work"?"work":section==="careers"?"career":"sec"}-${slug}`,`sec-${section}`,"hero-team","hero-code");
 const related=(catalog[section]||[]).filter(x=>x.slug!==slug).slice(0,6);
 return <main className="axn-generic-detail">
  <section className="axn-generic-hero">
   {image&&<img src={image} alt="" fetchPriority="high"/>}<div className="axn-generic-shade"/>
   <div className="container-x"><p className="axn-film-eyebrow"><span/>{`AXNOVATECH / ${label.toUpperCase()}`}</p><h1>{entry.title}</h1><p>{data.intro}</p><div className="axn-film-actions"><Link href={`/contact?service=${encodeURIComponent(entry.title)}`} className="axn-primary">Discuss this requirement <ArrowUpRight size={18}/></Link><span>DISCOVER · DESIGN · DELIVER</span></div></div>
  </section>
  <section className="container-x axn-detail-intro"><p className="axn-section-eyebrow">01 / BUSINESS OUTCOMES</p><h2>What better can <em>look like.</em></h2><div className="axn-outcome-grid">{data.outcomes.map((x,i)=><article key={x}><span>0{i+1}</span><CheckCircle2 size={19}/><p>{x}</p></article>)}</div></section>
  <section className="axn-detail-paper"><div className="container-x"><p className="axn-section-eyebrow">02 / CAPABILITIES & USE CASES</p><h2>Designed around <em>real workflows.</em></h2><div className="axn-capability-grid">{data.capabilities.map((x,i)=><article key={x.title}><small>CAPABILITY / 0{i+1}</small><h3>{x.title}</h3><p>{x.body}</p></article>)}</div></div></section>
  <section className="container-x axn-detail-intro"><p className="axn-section-eyebrow">03 / IMPLEMENTATION APPROACH</p><h2>From understanding to <em>adoption.</em></h2><div className="axn-delivery-grid">{data.delivery.map(x=><article key={x.title}><h3>{x.title}</h3><p>{x.body}</p></article>)}</div></section>
  <section className="axn-detail-paper"><div className="container-x axn-detail-split"><div><p className="axn-section-eyebrow">04 / DELIVERABLES</p><h2>Clear outputs. <em>Clear ownership.</em></h2><p className="axn-section-lead">The final proposal confirms which deliverables apply, what is excluded, what the client must provide and how acceptance will be reviewed.</p></div><ul className="axn-deliverables">{data.deliverables.map(x=><li key={x}><CheckCircle2 size={18}/>{x}</li>)}</ul></div></section>
  <section className="container-x axn-detail-intro"><p className="axn-section-eyebrow">05 / FREQUENTLY ASKED QUESTIONS</p><h2>Things worth <em>knowing.</em></h2><div className="axn-detail-faq">{data.faqs.map(x=><details key={x.q}><summary>{x.q}</summary><p>{x.a}</p></details>)}</div></section>
  <section className="axn-related"><div className="container-x"><p className="axn-section-eyebrow">06 / EXPLORE MORE</p><h2>Related {label.toLowerCase()} <em>topics.</em></h2><div className="axn-related-grid">{related.map(x=><Link key={x.slug} href={`/${section}/${x.slug}`}><span>{x.title}</span><ArrowUpRight size={17}/></Link>)}</div><div className="axn-service-cta"><div><small>HAVE A REQUIREMENT?</small><h2>Let's define a practical next step.</h2><p>Share the business context, user needs and constraints. We will review fit and scope before making a proposal.</p></div><Link href={`/contact?service=${encodeURIComponent(entry.title)}`} className="axn-primary">Contact our team <ArrowRight size={17}/></Link></div></div></section>
 </main>;
}
