import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { catalog } from "@/data/catalog";
import { photoAny } from "@/lib/photos";
export const metadata:Metadata={title:"Industries | Technology Solutions by Sector",description:"Explore AXNOVATECH industry technology capabilities for banking, healthcare, retail, education, manufacturing, logistics, energy, government and more.",alternates:{canonical:"/industries"}};
export default function Industries(){
 const hero=photoAny("sec-industries","hero-server","hero-team");
 return <main className="m-page axn-company-page">
  <section className="m-phero m-phero-ph">{hero&&<img className="m-banner" src={hero} alt="" fetchPriority="high"/>}<div className="container-x"><p className="m-kicker m-amber">INDUSTRIES / DOMAIN CONTEXT</p><h1>Technology shaped around the realities of your industry.</h1><p>Every sector has its own users, operating model, information needs and risks. Explore how digital platforms, integrations and automation can support the work that matters.</p><div className="m-facts"><span><b>{catalog.industries.length} industry areas</b>dedicated overview pages</span><span><b>Context first</b>workflow and domain discovery</span><Link href="/contact" className="m-btn">Discuss your industry <ArrowRight size={16}/></Link></div></div></section>
  <section className="container-x axn-detail-intro"><p className="axn-section-eyebrow">INDUSTRY DIRECTORY</p><h2>Explore the sectors <em>we are building for.</em></h2><div className="axn-industry-directory">{catalog.industries.map((x,i)=>{const img=photoAny(`ind-${x.slug}`,"sec-industries","hero-team");return <Link href={`/industries/${x.slug}`} key={x.slug} className="axn-industry-card">{img&&<img src={img} alt="" loading="lazy"/>}<div><small>INDUSTRY / {String(i+1).padStart(2,"0")}</small><h3>{x.title}</h3><p>{x.description}</p><b>Explore sector <ArrowUpRight size={15}/></b></div></Link>;})}</div></section>
  <section className="axn-related"><div className="container-x"><p className="axn-section-eyebrow">NEXT STEP</p><h2>Start with your <em>operating challenge.</em></h2><div className="axn-related-grid"><Link href="/services"><span>Explore technology services</span><ArrowUpRight size={17}/></Link><Link href="/solutions"><span>Explore digital solutions</span><ArrowUpRight size={17}/></Link><Link href="/contact"><span>Talk to AXNOVATECH</span><ArrowUpRight size={17}/></Link></div></div></section>
 </main>;
}
