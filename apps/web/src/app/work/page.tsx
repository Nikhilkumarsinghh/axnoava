import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site-config";
import { catalog } from "@/data/catalog";
import { photoAny } from "@/lib/photos";
export const metadata:Metadata={title:"Our Work | Projects & Product Concepts",description:"Explore AXNOVATECH published project work and clearly labelled concept blueprints across software, business platforms and digital products.",alternates:{canonical:"/work"}};
export default function Work(){
 const hero=photoAny("sec-work","hero-team","hero-code");
 return <main className="m-page axn-company-page">
  <section className="m-phero m-phero-ph">{hero&&<img className="m-banner" src={hero} alt="" fetchPriority="high"/>}<div className="container-x"><p className="m-kicker m-amber">OUR WORK / PORTFOLIO</p><h1>Real delivery. Transparent concepts. No inflated claims.</h1><p>Explore published work and reference concepts. We clearly distinguish verified project deliveries from in-house concepts and product directions.</p><div className="m-facts"><span><b>{site.caseStudies.length} published entries</b>status disclosed</span><span><b>{catalog.work.length} concepts</b>reference blueprints</span></div></div></section>
  <section className="container-x axn-detail-intro"><p className="axn-section-eyebrow">PUBLISHED PROJECTS</p><h2>What is available <em>to review today.</em></h2>{site.caseStudies.map((c,i)=><article className="m-work" key={c.title}><div className="m-work-n">0{i+1}</div><div><small>{c.client} · {c.industry}</small><h2>{c.title}</h2><p><b>Challenge.</b> {c.challenge}</p>{c.built&&<><b>What we built</b><ul>{c.built.map(x=><li key={x}>{x}</li>)}</ul></>}<p><b>Status / result.</b> {c.result}</p>{c.stack&&<div className="m-chips">{c.stack.map(x=><span key={x}>{x}</span>)}</div>}<Link href={c.href} className="m-more">View project <ArrowUpRight size={16}/></Link></div></article>)}
   <p className="m-tab-note">Client case studies are added only when publication permission and outcome details are confirmed.</p>
  </section>
  <section className="axn-detail-paper"><div className="container-x"><p className="axn-section-eyebrow">CONCEPTS & REFERENCE BLUEPRINTS</p><h2>Explore product <em>directions.</em></h2><p className="axn-section-lead">These pages describe concept briefs and demonstration directions. They are not represented as paid client engagements or production deployments.</p><div className="axn-industry-directory">{catalog.work.map((x,i)=>{const img=photoAny(`work-${x.slug}`,"sec-work","hero-code");return <Link href={`/work/${x.slug}`} key={x.slug} className="axn-industry-card">{img&&<img src={img} alt="" loading="lazy"/>}<div><small>CONCEPT / {String(i+1).padStart(2,"0")}</small><h3>{x.title}</h3><p>{x.description}</p><b>Explore concept <ArrowUpRight size={15}/></b></div></Link>;})}</div></div></section>
 </main>;
}
