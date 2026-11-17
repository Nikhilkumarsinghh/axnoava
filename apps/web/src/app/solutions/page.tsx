import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { catalog } from "@/data/catalog";
import { photoAny } from "@/lib/photos";
export const metadata:Metadata={title:"Digital Solutions | Business & Enterprise Platforms",description:"Explore 20 AXNOVATECH solution areas across portals, customer experience, automation, AI, document intelligence, analytics and enterprise workflows.",alternates:{canonical:"/solutions"}};
export default function Solutions(){
 const hero=photoAny("sec-solutions","auto-1","hero-code");
 return <main className="m-page axn-company-page">
  <section className="m-phero m-phero-ph">{hero&&<img className="m-banner" src={hero} alt="" fetchPriority="high"/>}<div className="container-x"><p className="m-kicker m-amber">PRODUCTS & SOLUTIONS</p><h1>Connected digital solutions for real business challenges.</h1><p>Explore solution patterns that connect customer experience, internal operations, data and automation. Each solution is adapted to your users, workflows, existing systems and operating requirements.</p><div className="m-facts"><span><b>{catalog.solutions.length} solution areas</b>dedicated topic pages</span><span><b>Workflow-led</b>designed around your process</span><Link href="/contact" className="m-btn">Discuss a solution <ArrowRight size={16}/></Link></div></div></section>
  <section className="container-x axn-detail-intro"><p className="axn-section-eyebrow">SOLUTION DIRECTORY</p><h2>Explore the solution <em>portfolio.</em></h2><div className="axn-industry-directory">{catalog.solutions.map((x,i)=>{const img=photoAny(`sol-${x.slug}`,"sec-solutions","hero-code");return <Link href={`/solutions/${x.slug}`} key={x.slug} className="axn-industry-card">{img&&<img src={img} alt="" loading="lazy"/>}<div><small>SOLUTION / {String(i+1).padStart(2,"0")}</small><h3>{x.title}</h3><p>{x.description}</p><b>Explore solution <ArrowUpRight size={15}/></b></div></Link>;})}</div></section>
  <section className="axn-related"><div className="container-x"><p className="axn-section-eyebrow">RELATED PORTFOLIOS</p><h2>Explore more ways <em>to work with us.</em></h2><div className="axn-related-grid"><Link href="/services"><span>Technology services</span><ArrowUpRight size={17}/></Link><Link href="/business-solutions"><span>Business solutions</span><ArrowUpRight size={17}/></Link><Link href="/enterprise-solutions"><span>Enterprise solutions</span><ArrowUpRight size={17}/></Link></div></div></section>
 </main>;
}
