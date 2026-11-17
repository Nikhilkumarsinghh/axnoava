import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { faqGroups } from "@/data/faq-data";
export const metadata:Metadata={title:"Frequently Asked Questions | AXNOVATECH",description:"Answers about AXNOVATECH services, software pricing, project timelines, engineering, cybersecurity, ownership, careers and partnerships.",alternates:{canonical:"/faq"}};
export default function FAQPage(){
 const total=faqGroups.reduce((sum,g)=>sum+g.items.length,0);
 const faqSchema={"@context":"https://schema.org","@type":"FAQPage","mainEntity":faqGroups.flatMap(group=>group.items.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}})))};
 return <main className="m-page axn-company-page">
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema).replace(/</g,"\\u003c")}}/>
  <section className="m-phero"><div className="container-x"><p className="m-kicker m-amber">SUPPORT / KNOWLEDGE CENTRE</p><h1>Clear answers before the first conversation.</h1><p>Explore practical information about services, project delivery, pricing, security, ownership, careers and partnerships.</p><div className="m-facts"><span><b>{total} questions</b>five topic areas</span><span><b>Plain language</b>clear expectations</span><Link href="/contact" className="m-btn">Ask a question <ArrowRight size={16}/></Link></div></div></section>
  <section className="container-x axn-detail-intro">{faqGroups.map((group,i)=><section className="axn-faq-category" key={group.title}><p className="axn-section-eyebrow">0{i+1} / KNOWLEDGE AREA</p><h2>{group.title}</h2><div className="axn-detail-faq">{group.items.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>)}</section>
  <section className="axn-related"><div className="container-x"><p className="axn-section-eyebrow">STILL HAVE A QUESTION?</p><h2>Let's talk through <em>your requirement.</em></h2><Link href="/contact" className="axn-primary">Contact AXNOVATECH <ArrowRight size={17}/></Link></div></section>
 </main>;
}
