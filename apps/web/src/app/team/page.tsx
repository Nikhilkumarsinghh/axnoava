import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Braces, Cloud, Database, Palette, ShieldCheck, Workflow } from "lucide-react";
import { site } from "@/data/site-config";
import { photoAny } from "@/lib/photos";
export const metadata:Metadata={title:"Our Team & Leadership",description:"Meet AXNOVATECH founder Nikhil Kumar and explore the engineering disciplines assembled around each client engagement.",alternates:{canonical:"/team"}};
const disciplines=[
 [Braces,"Software engineering","Frontend, backend, mobile applications, APIs and platform architecture.","ENGINEERING"],
 [Palette,"Product design & experience","User research, product strategy, interface design and accessible design systems.","DESIGN"],
 [Database,"Data & AI","Data pipelines, analytics, AI assistants, automation and evaluation.","INTELLIGENCE"],
 [Cloud,"Cloud & platform operations","Cloud foundations, DevOps, CI/CD, monitoring, reliability and cost control.","PLATFORM"],
 [ShieldCheck,"Quality & security","Quality engineering, application testing, secure development and release readiness.","TRUST"],
 [Workflow,"Delivery & client success","Discovery, project planning, communication, documentation and support.","DELIVERY"]
] as const;
export default function TeamPage(){
 const founder=site.founder;
 const teamPhoto=photoAny("about-team","hero-team","sec-about");
 return <main className="m-page axn-company-page">
  <section className="m-phero m-phero-ph"><div className="container-x"><p className="m-kicker m-amber">PEOPLE / LEADERSHIP</p><h1>People who take ownership of the work.</h1><p>AXNOVATECH is a founder-led technology practice being built around engineering discipline, practical business outcomes and long-term client relationships.</p><div className="m-facts"><span><b>Founder-led</b>one clear point of accountability</span><span><b>Specialist disciplines</b>roles matched to each engagement</span><Link href="/contact" className="m-btn">Work with our team <ArrowRight size={16}/></Link></div></div></section>
  <section className="container-x axn-company-founder"><div className="axn-founder-mark">AXN</div><div><p className="axn-section-eyebrow">FOUNDER & COMPANY LEAD</p><h2>{founder.name}</h2><h3>{founder.title} · AXNOVATECH</h3><p>{founder.note}</p><p>The founder's role is to set the company direction, understand client requirements, shape delivery partnerships and protect the standards expected from every engagement.</p><Link href="/about" className="axn-text-link">Read the company story <ArrowUpRight size={16}/></Link></div></section>
  {teamPhoto&&<section className="axn-team-photo"><img src={teamPhoto} alt="Abstract visual representing AXNOVATECH engineering disciplines" loading="lazy"/><div><small>ONE TEAM / SHARED OWNERSHIP</small><h2>Different disciplines. One delivery standard.</h2></div></section>}
  <section className="axn-detail-paper"><div className="container-x"><p className="axn-section-eyebrow">OUR DELIVERY DISCIPLINES</p><h2>Capabilities that come together <em>around your project.</em></h2><p className="axn-section-lead">These are the functional roles needed to deliver projects. Named employee profiles will be published only after people have joined, their responsibilities are confirmed and they have approved their public profiles.</p><div className="axn-capability-grid">{disciplines.map(([Icon,title,body,label],i)=><article key={title}><small>DISCIPLINE / 0{i+1} · {label}</small><h3><Icon size={20}/> {title}</h3><p>{body}</p></article>)}</div></div></section>
  <section className="container-x axn-detail-intro"><p className="axn-section-eyebrow">HOW WE BUILD THE TEAM</p><h2>Right expertise for <em>the right scope.</em></h2><div className="axn-delivery-grid"><article><h3>01 / Define the work</h3><p>We break the requirement into workstreams, responsibilities, dependencies and acceptance criteria.</p></article><article><h3>02 / Assign ownership</h3><p>The proposal identifies the project lead, communication route and roles required for the agreed scope.</p></article><article><h3>03 / Introduce contributors</h3><p>People working on the engagement are introduced at kickoff with their responsibilities and review expectations.</p></article><article><h3>04 / Stay accountable</h3><p>Progress, risks, decisions and changes are communicated through the agreed project cadence.</p></article></div></section>
  <section className="axn-related"><div className="container-x"><p className="axn-section-eyebrow">CAREERS & COLLABORATION</p><h2>Help build the next chapter.</h2><div className="axn-related-grid"><Link href="/careers"><span>Explore careers and role families</span><ArrowUpRight size={17}/></Link><Link href="/technology-partners"><span>Become a technology partner</span><ArrowUpRight size={17}/></Link><Link href="/contact"><span>Discuss a project</span><ArrowUpRight size={17}/></Link></div></div></section>
 </main>;
}
