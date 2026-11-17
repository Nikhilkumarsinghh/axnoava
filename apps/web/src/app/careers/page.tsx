import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { catalog } from "@/data/catalog";
import { photoAny } from "@/lib/photos";
export const metadata:Metadata={title:"Careers & Talent Community | AXNOVATECH",description:"Explore 20 technology role families and register interest in future AXNOVATECH opportunities. Vacancies are published only when confirmed.",alternates:{canonical:"/careers"}};
export default function Careers(){
 const hero=photoAny("sec-careers","about-team","hero-team");
 return <main className="m-page axn-company-page">
  <section className="m-phero m-phero-ph">{hero&&<img className="m-banner" src={hero} alt="" fetchPriority="high"/>}<div className="container-x"><p className="m-kicker m-amber">CAREERS / PEOPLE & CULTURE</p><h1>Bring curiosity, craft and ownership to meaningful technology work.</h1><p>We are building a technology practice where people solve real business problems, keep learning and take responsibility for the quality of their work.</p><div className="m-facts"><span><b>{catalog.careers.length} role families</b>explore capability areas</span><span><b>Openings by confirmation</b>no invented vacancies</span><Link href="/contact?type=Careers" className="m-btn">Register interest <ArrowRight size={16}/></Link></div></div></section>
  <section className="container-x axn-detail-intro"><p className="axn-section-eyebrow">ROLE FAMILIES</p><h2>Explore where your skills <em>can contribute.</em></h2><p className="axn-section-lead">These role-family pages describe areas of expertise and typical responsibilities. They are not active job advertisements unless a specific opening is marked as open.</p><div className="axn-industry-directory">{catalog.careers.map((x,i)=>{const img=photoAny(`career-${x.slug}`,"sec-careers","about-team");return <Link href={`/careers/${x.slug}`} key={x.slug} className="axn-industry-card">{img&&<img src={img} alt="" loading="lazy"/>}<div><small>ROLE FAMILY / {String(i+1).padStart(2,"0")}</small><h3>{x.title}</h3><p>{x.description}</p><b>Explore role <ArrowUpRight size={15}/></b></div></Link>;})}</div></section>
  <section className="axn-detail-paper"><div className="container-x axn-detail-split"><div><p className="axn-section-eyebrow">OUR CULTURE</p><h2>Good work needs <em>clarity and trust.</em></h2></div><ul className="axn-deliverables"><li>Responsibilities and expectations shared before work begins.</li><li>Respect for privacy, confidentiality and secure access.</li><li>Learning, feedback and knowledge sharing.</li><li>No recruitment or interview fees. Never share OTPs or banking passwords.</li></ul></div></section>
 </main>;
}
